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
