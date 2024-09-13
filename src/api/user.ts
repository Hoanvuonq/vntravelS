import Api from './api';
import { IApiResponse, IUsers, IUserInfo, IBankInfo } from './type';

const url = '/user';

export const registerUser = async (user: IUsers): Promise<IApiResponse> => {
    const reqUrl = `${url}/register`;
    try {
        const res = await Api.post<IApiResponse>(reqUrl, user);
        return res.data;
    } catch (error: any) {
        console.error('Error Registering User:', error.response ? error.response.data : error.message);
        throw new Error(error.response ? error.response.data.message : 'Failed to register user');
    }
};

export const getUserInformationByToken = async (): Promise<IUserInfo> => {
    const reqUrl = `${url}/userInfo`;
    try {
        const res = await Api.get<{ status: boolean; data: IUserInfo }>(reqUrl);
        if (res.data && res.data.status) {
            return res.data.data;
        } else {
            throw new Error('Failed to fetch user information');
        }
    } catch (error: any) {
        console.error('Error fetching user info:', error.response ? error.response.data : error.message);
        throw new Error(error.response ? error.response.data.message : 'Failed to fetch user information');
    }
};

export const updateUserInformation = async (bankInfo: IBankInfo): Promise<{ success: boolean; message: string; data?: IUserInfo }> => {
    const reqUrl = `${url}/updateInfo`;
    try {
        const res = await Api.post<{ status: boolean; data: IUserInfo }>(reqUrl, bankInfo);
        if (res.data && res.data.status) {
            return { success: true, message: 'User information updated successfully', data: res.data.data };
        } else {
            throw new Error('Failed to update user information');
        }
    } catch (error: any) {
        console.error('Error updating user info:', error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data.message : 'An error occurred during update',
        };
    }
};
