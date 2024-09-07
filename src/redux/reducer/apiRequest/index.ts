import axios from 'axios';
import { Dispatch } from '@reduxjs/toolkit';
import { IUser } from './type';
import { loginStart, loginSuccess, loginFailed, logoutStart, logoutFailed, logoutSuccess, tokenExpired } from '../../slice/authSlice';

interface LoginResponse {
    success: boolean;
    data?: {
        accessToken: string;
    };
    message?: string;
}

export const loginUser = async (user: IUser, dispatch: Dispatch<any>): Promise<LoginResponse> => {
    dispatch(loginStart());
    try {
        const res = await axios.post('http://localhost:1510/api/user/login', user);
        console.log('API Response:', res.data);

        if (res.data && res.data.status) {
            const { data } = res.data;
            const { accessToken } = data;
            if (accessToken) {
                localStorage.setItem('accessToken', accessToken);
                dispatch(loginSuccess({ user: data, token: accessToken }));
                return { success: true, data: { accessToken } };
            }
        }
        return { success: false, message: 'Login failed' };
    } catch (error: any) {
        dispatch(loginFailed());
        console.error('Login failed:', error.message);
        return { success: false, message: error.message };
    }
};

export const logOutUser = (dispatch: Dispatch<any>, navigate: any) => {
    dispatch(logoutStart());
    try {
        localStorage.removeItem('accessToken');

        dispatch(logoutSuccess());
        navigate('/');
    } catch (error: any) {
        dispatch(logoutFailed());

        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
        } else {
            console.error('Error message:', error.message || error);
        }

        navigate('/');
    }
};

export const axiosJWT = async (config: any, dispatch: Dispatch<any>) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    try {
        const response = await axios(config);
        return response;
    } catch (error: any) {
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
        } else {
            console.error('Error message:', error.message || error);
        }
        if (error.response?.status === 401) {
            localStorage.removeItem('accessToken');
            dispatch(tokenExpired());
            window.location.href = '/';
        }
        throw error;
    }
};
