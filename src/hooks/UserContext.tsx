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

        if (!accessToken && !adminToken) {
            console.log('No token found, skipping user info fetch');
            return;
        }

        setIsLoading(true);
        try {
            let fetchedUserInfo: IUserInfo | IUserInfo[] | null = null;
            if (accessToken) {
                fetchedUserInfo = await getUserInformationByToken();
            } else if (adminToken) {
                fetchedUserInfo = await getAllUsers();
            }

            console.log('Fetched User Info:', fetchedUserInfo);
            if (fetchedUserInfo && !Array.isArray(fetchedUserInfo) && Object.keys(fetchedUserInfo).length > 0) {
                if (fetchedUserInfo.isBlocked) {
                    alert('Your account has been blocked. Logging out.');
                    dispatch(tokenExpired());
                    logOutUser(dispatch, (window.location.href = accessToken ? '/login' : '/loginAdmin'));
                } else {
                    dispatch(setUserInfo(fetchedUserInfo));
                }
            } else {
                console.error('User info is empty or invalid');
            }
        } catch (error) {
            console.error('Failed to fetch user information:', error);
        } finally {
            setIsLoading(false);
        }
    }, [dispatch]);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const adminToken = localStorage.getItem('adminToken');
        if (accessToken || adminToken) {
            fetchUserInfo();
        }

        const intervalId = setInterval(() => {
            if (accessToken || adminToken) {
                fetchUserInfo();
            }
        }, 60000);

        return () => clearInterval(intervalId);
    }, [fetchUserInfo]);

    return <UserContext.Provider value={{ userInfo: reduxUserInfo, fetchUserInfo, isLoading }}>{children}</UserContext.Provider>;
};

export const useUserInfo = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUserInfo must be used within a UserProvider');
    }
    return context;
};
