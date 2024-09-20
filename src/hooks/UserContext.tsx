import { IUserInfo } from 'api/type';
import { getUserInformationByToken } from 'api/user';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo } from 'redux/slice/authSlice';
import { RootState } from 'redux/store';

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
            const token = accessToken || adminToken;
            const fetchedUserInfo = await getUserInformationByToken();
            console.log('Fetched User Info:', fetchedUserInfo);
            if (fetchedUserInfo && Object.keys(fetchedUserInfo).length > 0) {
                dispatch(setUserInfo(fetchedUserInfo));
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
    }, [fetchUserInfo]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const accessToken = localStorage.getItem('accessToken');
            const adminToken = localStorage.getItem('adminToken');
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
