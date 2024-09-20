import Api from './api';
import { IUserInfo } from './type';

const url = '/admin';

interface UsersResponse {
    status: boolean;
    message: string;
    data: IUserInfo[];
}

interface UserResponse {
    status: boolean;
    message: string;
    data: IUserInfo;
}

export const getAllUsers = async (): Promise<IUserInfo[]> => {
    try {
        const response = await Api.get<UsersResponse>(`${url}/getAllUser`);
        if (response.data.status && Array.isArray(response.data.data)) {
            return response.data.data;
        } else {
            console.error('Unexpected response structure:', response.data);
            throw new Error('Unexpected response structure');
        }
    } catch (error) {
        console.error('Error in getAllUsers:', error);
        throw error;
    }
};

export const getUserInfo = async (userId: string): Promise<IUserInfo> => {
    try {
        const response = await Api.get<UserResponse>(`${url}/getUserInfo/${userId}`);
        if (response.data.status && response.data.data) {
            return response.data.data;
        } else {
            console.error('Unexpected response structure:', response.data);
            throw new Error('Unexpected response structure');
        }
    } catch (error) {
        console.error('Error in getUserInfo:', error);
        throw error;
    }
};

export const updateBankInfo = async (userId: string, bankData: any): Promise<any> => {
    try {
        const response = await Api.post(`${url}/updateBankInfo/${userId}`, bankData);
        return response.data;
    } catch (error) {
        console.error('Error in updateBankInfo:', error);
        throw error;
    }
};

export const updateUserInfo = async (userId: string, userData: any): Promise<any> => {
    try {
        const response = await Api.post(`${url}/updateUserInfo/${userId}`, userData);
        return response.data;
    } catch (error) {
        console.error('Error in updateUserInfo :', error);
        throw error;
    }
};

export const updateUserPassword = async (userId: string, passwordData: { newPassword: string }): Promise<any> => {
    try {
        const response = await Api.post(`${url}/updateUserPassword/${userId}`, passwordData);
        return response.data;
    } catch (error) {
        console.error('Error in updateUserPassword:', error);
        throw error;
    }
};

export const searchUser = async (query: string): Promise<IUserInfo[]> => {
    try {
        const response = await Api.get<UsersResponse>(`${url}/searchUser`, { query });
        if (response.data.status && Array.isArray(response.data.data)) {
            return response.data.data;
        } else {
            console.error('Unexpected response structure:', response.data);
            throw new Error('Unexpected response structure');
        }
    } catch (error) {
        console.error('Error in searchUser:', error);
        throw error;
    }
};
