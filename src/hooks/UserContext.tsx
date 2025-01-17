import { IUserInfo } from 'api/type';
import { getUserInformationByToken } from 'api/user';
import { getAllUsers } from 'api/admin';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo, tokenExpired } from 'redux/slice/authSlice';
import { RootState } from 'redux/store';
import { logOutUser } from 'redux/reducer/apiRequest';

interface UserContextType {
    userInfo: IUserInfo | null;
    fetchUserInfo: () => Promise<void>;
    fetchAdminUserInfo: () => Promise<void>;
    isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const dispatch = useDispatch();
    const reduxUserInfo = useSelector((state: RootState) => state.auth.userInfo);
    const [isLoading, setIsLoading] = useState(false);

    const fetchUserInfo = useCallback(async () => {
        const accessToken = localStorage.getItem('accessToken');
        const adminToken = localStorage.getItem('adminToken');

        if (!accessToken && !adminToken) return;

        setIsLoading(true);
        try {
            const fetchedUserInfo = accessToken ? await getUserInformationByToken() : await getAllUsers();

            if (fetchedUserInfo && !Array.isArray(fetchedUserInfo) && Object.keys(fetchedUserInfo).length > 0) {
                if (fetchedUserInfo.isBlocked) {
                    alert('Your account has been blocked. Logging out.');
                    dispatch(tokenExpired());
                    logOutUser(dispatch, (window.location.href = accessToken ? '/login' : '/loginAdmin'));
                } else {
                    dispatch(setUserInfo(fetchedUserInfo));
                }
            }
        } catch (error) {
            console.error('Failed to fetch user information:', error);
        } finally {
            setIsLoading(false);
        }
    }, [dispatch]);

    const fetchAdminUserInfo = useCallback(async () => {
        setIsLoading(true);
        try {
            const fetchedUserInfo = await getAllUsers();
            dispatch(setUserInfo(fetchedUserInfo[0]));
        } catch (error) {
            console.error('Failed to fetch admin user information:', error);
        } finally {
            setIsLoading(false);
        }
    }, [dispatch]);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const adminToken = localStorage.getItem('adminToken');
        if (accessToken || adminToken) fetchUserInfo();

        const intervalId = setInterval(() => {
            fetchUserInfo();
            fetchAdminUserInfo(); // Ensure this is called to update admin data
        }, 60000); // Fetch every 60 seconds

        return () => clearInterval(intervalId);
    }, [fetchUserInfo, fetchAdminUserInfo]);

    return <UserContext.Provider value={{ userInfo: reduxUserInfo, fetchUserInfo, fetchAdminUserInfo, isLoading }}>{children}</UserContext.Provider>;
};

export const useUserInfo = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUserInfo must be used within a UserProvider');
    }
    return context;
};
