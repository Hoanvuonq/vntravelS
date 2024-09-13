import axios, { AxiosInstance } from 'axios';
import { Dispatch } from '@reduxjs/toolkit';
import { IUser, UserInfo } from './type';
import {
    loginStart,
    loginSuccess,
    loginFailed,
    logoutStart,
    logoutFailed,
    logoutSuccess,
    tokenExpired,
    getUserInfoStart,
    getUserInfoSuccess,
    getUserInfoFailed,
    updateUserInfoStart,
    updateUserInfoSuccess,
    updateUserInfoFailed,
    sendJourneyStart,
    sendJourneySuccess,
    sendJourneyFailed,
    getUserJourneyHistoryStart,
    getUserJourneyHistorySuccess,
    getUserJourneyHistoryFailed,
} from '../../slice/authSlice';
import { jwtDecode } from 'jwt-decode';
import { AppDispatch } from 'redux/store';
import { updateUserBalance, addJourneyToHistory } from '../../slice/authSlice';

interface LoginResponse {
    success: boolean;
    data?: {
        accessToken: string;
    };
    message?: string;
}

interface ISendJourneyResponse {
    newBalance: number;
    journeyAmount: number;
    profit: number;
    journeyCount: number;
    maxJourneys: number;
    rating: number;
}

interface IJourneyPreviewResponse {
    journeyAmount: number;
    profit: number;
    place: string;
    rating: number;
}

interface IJourneyHistoryResponse {
    status: boolean;
    message: string;
    data: Array<{
        amount: number;
        commission: number;
        place: string;
        rating: number;
        _id: string;
        createdAt: string;
        updatedAt: string;
    }>;
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

export const getUserInformationByToken = () => async (dispatch: AppDispatch) => {
    dispatch(getUserInfoStart());
    try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            throw new Error('No access token found');
        }

        const res = await axios.get<{ status: boolean; data: UserInfo }>('http://localhost:1510/api/user/userInfo', {
            headers: {
                Authorization: `Bearer ${token}`,
                'Cache-Control': 'no-cache',
                Pragma: 'no-cache',
            },
        });

        if (res.data && res.data.status) {
            dispatch(getUserInfoSuccess(res.data.data));
        } else {
            dispatch(getUserInfoFailed());
        }
    } catch (error) {
        console.error('Get user information failed:', error);
        dispatch(getUserInfoFailed());
    }
};

export const updateUserInformation = (bankInfo: { bankAccount: string; bankName: string; bankNumber: string }) => async (dispatch: AppDispatch) => {
    dispatch(updateUserInfoStart());
    try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            throw new Error('No access token found');
        }

        const res = await axios.put<{ status: boolean; data: UserInfo }>('http://localhost:1510/api/user/updateInfo', bankInfo, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (res.data && res.data.status) {
            dispatch(updateUserInfoSuccess(res.data.data));
            return { success: true, message: 'User information updated successfully' };
        } else {
            dispatch(updateUserInfoFailed());
            return { success: false, message: 'Failed to update user information' };
        }
    } catch (error: any) {
        console.error('Update user information failed:', error);
        dispatch(updateUserInfoFailed());
        return { success: false, message: error.response?.data?.message || 'An error occurred during update' };
    }
};

export const previewJourney = () => async (dispatch: AppDispatch) => {
    try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            throw new Error('No access token found');
        }

        const res = await axios.get<{ status: boolean; data: IJourneyPreviewResponse; message: string }>('http://localhost:1510/api/user/previewJourney', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (res.data && res.data.status) {
            return { success: true, data: res.data.data };
        } else {
            return { success: false, message: res.data.message || 'Failed to preview journey' };
        }
    } catch (error: any) {
        console.error('Preview journey failed:', error);
        return { success: false, message: error.response?.data?.message || 'An error occurred while previewing journey' };
    }
};

export const sendJourney = (journeyData: { place: string; journeyAmount: number; profit: number; createdAt: string; rating: number }) => async (dispatch: AppDispatch) => {
    dispatch(sendJourneyStart());
    try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            throw new Error('No access token found');
        }

        const res = await axios.post<{ status: boolean; data: ISendJourneyResponse; message: string }>('http://localhost:1510/api/user/sendJourney', journeyData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (res.data && res.data.status) {
            dispatch(
                sendJourneySuccess({
                    ...res.data.data,
                    place: journeyData.place,
                    journeyAmount: journeyData.journeyAmount,
                    rating: res.data.data.rating,
                }),
            );

            // Update user balance
            dispatch(updateUserBalance(res.data.data.newBalance));

            const newJourney = {
                place: journeyData.place,
                journeyAmount: journeyData.journeyAmount,
                profit: res.data.data.profit,
                createdAt: new Date().toISOString(),
                rating: res.data.data.rating,
            };
            dispatch(addJourneyToHistory(newJourney));

            return { success: true, message: res.data.message, data: res.data.data };
        } else {
            dispatch(sendJourneyFailed());
            return { success: false, message: res.data.message || 'Failed to send journey' };
        }
    } catch (error: any) {
        console.error('Send journey failed:', error);
        dispatch(sendJourneyFailed());
        return { success: false, message: error.response?.data?.message || 'An error occurred while sending journey' };
    }
};

export const getUserJourneyHistory = () => async (dispatch: AppDispatch) => {
    dispatch(getUserJourneyHistoryStart());
    try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            throw new Error('No access token found');
        }

        const res = await axios.get<IJourneyHistoryResponse>('http://localhost:1510/api/user/journeyHistory', {
            headers: {
                Authorization: `Bearer ${token}`,
                'Cache-Control': 'no-cache',
                Pragma: 'no-cache',
            },
        });

        if (res.data && res.data.status) {
            const transformedData = res.data.data.map((journey) => ({
                place: journey.place,
                journeyAmount: journey.amount,
                profit: journey.commission,
                rating: journey.rating,
                createdAt: journey.createdAt,
                ating: journey.rating,
            }));
            dispatch(getUserJourneyHistorySuccess(transformedData));
            return { success: true, data: transformedData };
        } else {
            dispatch(getUserJourneyHistoryFailed());
            return { success: false, message: res.data.message || 'Failed to fetch journey history' };
        }
    } catch (error: any) {
        console.error('Get journey history failed:', error);
        dispatch(getUserJourneyHistoryFailed());
        return { success: false, message: error.response?.data?.message || 'An error occurred while fetching journey history' };
    }
};
