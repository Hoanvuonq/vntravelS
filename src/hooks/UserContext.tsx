import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { getUserInformationByToken } from 'api/user';
import ToastProvider from 'hooks/useToastProvider';
import { IUserInfo } from 'api/type';

interface UserContextType {
    userInfo: IUserInfo | null;
    fetchUserInfo: () => Promise<void>;
    isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userInfo, setUserInfo] = useState<IUserInfo | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchUserInfo = useCallback(async () => {
        setIsLoading(true);
        try {
            const fetchedUserInfo = await getUserInformationByToken();
            if (fetchedUserInfo && Object.keys(fetchedUserInfo).length > 0) {
                setUserInfo(fetchedUserInfo);
            } else {
                console.error('User info is empty or invalid');
                ToastProvider('error', 'Không thể lấy thông tin người dùng');
            }
        } catch (error) {
            console.error('Failed to fetch user information:', error);
            ToastProvider('error', 'Không thể lấy thông tin người dùng');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUserInfo();
    }, [fetchUserInfo]);

    return <UserContext.Provider value={{ userInfo, fetchUserInfo, isLoading }}>{children}</UserContext.Provider>;
};

export const useUserInfo = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUserInfo must be used within a UserProvider');
    }
    return context;
};
