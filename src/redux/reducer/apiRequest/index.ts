import { Dispatch } from '@reduxjs/toolkit';
import axios, { AxiosInstance } from 'axios';
import { jwtDecode } from 'jwt-decode';
import { loginFailed, loginStart, loginSuccess, logoutFailed, logoutStart, logoutSuccess, tokenExpired } from '../../slice/authSlice';
import { IUser } from './type';

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
        const loginData = {
            ...user,
            loginTime: new Date().toISOString(),
        };
        const res = await axios.post('http://localhost:1510/api/user/login', loginData);
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
export const logOutUser = async (dispatch: Dispatch<any>, navigate: any) => {
    dispatch(logoutStart());
    try {
        localStorage.removeItem('accessToken');
        dispatch(logoutSuccess());
        navigate('/login');

        axios
            .post(
                'http://localhost:1510/api/user/logout',
                {},
                {
                    withCredentials: true,
                },
            )
            .catch((error) => {
                console.error('Failed to connect to logout API:', error);
            });
    } catch (error: any) {
        console.error('Logout failed:', error);
        let errorMessage = 'An error occurred during logout';
        if (error.response) {
            errorMessage = error.response.data.message || errorMessage;
            console.error('Response status:', error.response.status);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error setting up request:', error.message);
        }
        dispatch(logoutFailed());
    }
};

export const createAxiosJWT = (dispatch: Dispatch<any>): AxiosInstance => {
    const axiosJWT = axios.create({
        baseURL: 'http://localhost:1510/api/user',
        withCredentials: true,
    });

    axiosJWT.interceptors.request.use(
        async (config) => {
            if (checkTokenExpiration()) {
                const refreshSuccess = await refreshToken(dispatch);
                if (!refreshSuccess) {
                    dispatch(tokenExpired());
                    window.location.href = '/login';
                    return Promise.reject('Token expired');
                }
            }
            const token = localStorage.getItem('accessToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error),
    );

    axiosJWT.interceptors.response.use(
        (response) => response,
        async (error) => {
            if (error.response?.status === 401) {
                dispatch(tokenExpired());
                window.location.href = '/login';
            }
            return Promise.reject(error);
        },
    );

    return axiosJWT;
};

export const checkTokenExpiration = () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        const decodedToken: any = jwtDecode(token);
        return decodedToken.exp && decodedToken.exp * 1000 < Date.now();
    }
    return false;
};

export const refreshToken = async (dispatch: Dispatch<any>) => {
    try {
        const res = await axios.post('http://localhost:1510/api/user/refreshToken', {}, { withCredentials: true });
        if (res.data && res.data.status) {
            const { accessToken } = res.data.data;
            localStorage.setItem('accessToken', accessToken);
            dispatch(loginSuccess({ user: res.data.data, token: accessToken }));
            return true;
        }
        return false;
    } catch (error) {
        console.error('Refresh token failed:', error);
        dispatch(tokenExpired());
        return false;
    }
};
