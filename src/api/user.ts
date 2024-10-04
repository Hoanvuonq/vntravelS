import Api from './api';
import CryptoJS from 'crypto-js';
import { IApiResponse, IUsers, IUserInfo, IBankInfo } from './type';

const url = '/user';

const SECRET_KEY = process.env.REACT_APP_ENCRYPTION_KEY || '';

if (!SECRET_KEY) {
    console.error('REACT_APP_ENCRYPTION_KEY is not set in the environment');
}

const decryptData = (encryptedData: string): any => {
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
        const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
        if (!decryptedText) {
            throw new Error('Decryption resulted in empty string');
        }
        return JSON.parse(decryptedText);
    } catch (error) {
        console.error('Decryption error:', error);
        throw new Error('Failed to decrypt user data');
    }
};

export const registerUser = async (user: IUsers & { invitationCode: string }): Promise<IApiResponse> => {
    const reqUrl = `${url}/register`;
    try {
        const res = await Api.post<IApiResponse>(reqUrl, user);
        // Assuming the response data is not encrypted for registration
        return res.data;
    } catch (error: any) {
        console.error('Error Registering User:', error.response ? error.response.data : error.message);
        throw new Error(error.response ? error.response.data.message : 'Failed to register user');
    }
};

export const getUserInformationByToken = async (): Promise<IUserInfo> => {
    const reqUrl = `${url}/userInfo`;
    try {
        const res = await Api.get<{ status: boolean; data: { encryptedData: string } }>(reqUrl);
        if (res.data && res.data.status) {
            const decryptedData = decryptData(res.data.data.encryptedData);
            return decryptedData;
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
        const res = await Api.post<{ status: boolean; data: { encryptedData: string }; message: string }>(reqUrl, bankInfo);
        if (res.data && res.data.status) {
            const decryptedData = decryptData(res.data.data.encryptedData);
            return { success: true, message: 'User information updated successfully', data: decryptedData };
        } else {
            throw new Error(res.data.message || 'Failed to update user information');
        }
    } catch (error: any) {
        console.error('Error updating user info:', error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response ? error.response.data.message : 'An error occurred during update',
        };
    }
};
