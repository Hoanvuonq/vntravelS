import { Dispatch } from '@reduxjs/toolkit';
import axios, { AxiosInstance } from 'axios';
import { jwtDecode } from 'jwt-decode';
import { loginFailed, loginStart, loginSuccess, logoutFailed, logoutStart, logoutSuccess, tokenExpired, loginAdminStart, loginAdminSuccess, loginAdminFailed } from '../../slice/authSlice';
import { IUser } from './type';

interface ILoginResponse {
    success: boolean;
    data?: {
        accessToken: string;
    };
    message?: string;
}
interface IAdminLoginResponse {
    success: boolean;
    data?: {
        adminId: string;
        adminUsername: string;
        token: string;
    };
    message?: string;
}

export const loginUser = async (user: IUser, dispatch: Dispatch<any>): Promise<ILoginResponse> => {
    dispatch(loginStart());
    try {
        const loginData = {
            ...user,
            loginTime: new Date().toISOString(),
        };
        const res = await axios.post(process.env.REACT_APP_API_DEV + 'user/login', loginData);
        console.log('Login API response:', res.data);
        if (res.data && res.data.status) {
            const { encryptedData, accessToken } = res.data.data;
            if (accessToken) {
                localStorage.setItem('accessToken', accessToken);
                dispatch(loginSuccess({ user: encryptedData, token: accessToken }));
                return { success: true, data: { accessToken } };
            }
        }
        return { success: false, message: res.data.message || 'Login failed' };
    } catch (error: any) {
        console.error('Login error:', error.response || error); // Log chi tiết lỗi
        dispatch(loginFailed());
        return { success: false, message: error.response?.data?.message || error.message };
    }
};

export const loginAdmin = async (adminCredentials: { adminUsername: string; adminPassword: string }, dispatch: Dispatch<any>): Promise<IAdminLoginResponse> => {
    dispatch(loginAdminStart());
    try {
        const res = await axios.post(process.env.REACT_APP_API_DEV + 'admin/loginAdmin', adminCredentials);

        if (res.data && res.data.status) {
            const { data } = res.data;
            dispatch(loginAdminSuccess({ admin: data, token: data.token }));
            localStorage.setItem('adminToken', data.token);
            return { success: true, data };
        }
        dispatch(loginAdminFailed());
        return { success: false, message: res.data.message || 'Admin login failed' };
    } catch (error: any) {
        dispatch(loginAdminFailed());
        console.error('Admin login failed:', error.message);
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
                process.env.REACT_APP_API_DEV + 'user/logout',
                {},
                {
                    withCredentials: true,
                },
            )
            .catch((error) => {});
    } catch (error: any) {
        if (error.response) {
            console.error('Logout error:', error.response.data.message || 'An error occurred during logout');
        } else if (error.request) {
            console.error('No response received during logout');
        } else {
            console.error('Error setting up logout request:', error.message);
        }
        dispatch(logoutFailed());
    }
};

export const logOutAdmin = async (dispatch: Dispatch<any>, navigate: any) => {
    dispatch(logoutStart());
    try {
        localStorage.removeItem('adminToken');
        dispatch(logoutSuccess());
        navigate('/loginAdmin');

        axios
            .post(
                process.env.REACT_APP_API_DEV + 'admin/logout',
                {},
                {
                    withCredentials: true,
                },
            )
            .catch((error) => {
                console.error('Failed to connect to admin logout API:', error);
            });
    } catch (error: any) {
        if (error.response) {
            console.error('Logout error:', error.response.data.message || 'An error occurred during logout');
        } else if (error.request) {
            console.error('No response received during logout');
        } else {
            console.error('Error setting up logout request:', error.message);
        }
        dispatch(logoutFailed());
    }
};

export const createAxiosJWT = (dispatch: Dispatch<any>): AxiosInstance => {
    const axiosJWT = axios.create({
        baseURL: process.env.REACT_APP_API_DEV + 'user',
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
        const res = await axios.post(process.env.REACT_APP_API_DEV + 'user/refreshToken', {}, { withCredentials: true });
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
