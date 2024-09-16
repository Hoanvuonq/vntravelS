import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInformationByToken } from 'api/user';
import ToastProvider from 'hooks/useToastProvider';
import { IUserInfo } from 'api/type';
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
        setIsLoading(true);
        try {
            const fetchedUserInfo = await getUserInformationByToken();
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
        fetchUserInfo();
    }, [fetchUserInfo]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            fetchUserInfo();
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
