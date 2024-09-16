import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserInfo, IAdminInfo } from 'redux/reducer/apiRequest/type';
import { IUserInfo } from 'api/type';

interface IAuthState {
    userInfo: IUserInfo | null;
    login: {
        currentUser: UserInfo | null;
        isFetching: boolean;
        error: boolean;
        token: string | null;
        isTokenExpired: boolean;
        accessToken: string | null;
    };
    adminLogin: {
        currentAdmin: IAdminInfo | null;
        isFetching: boolean;
        error: boolean;
        token: string | null;
    };
    logout: {
        isFetching: boolean;
        error: boolean;
    };
}

const initialState: IAuthState = {
    userInfo: null,
    login: {
        currentUser: null,
        isFetching: false,
        error: false,
        token: localStorage.getItem('accessToken') || null,
        accessToken: localStorage.getItem('accessToken') || null,
        isTokenExpired: false,
    },
    adminLogin: {
        currentAdmin: null,
        isFetching: false,
        error: false,
        token: localStorage.getItem('adminToken') || null,
    },
    logout: {
        isFetching: false,
        error: false,
    },
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.login.isFetching = true;
            state.login.error = false;
        },
        loginSuccess: (state, action: PayloadAction<{ user: UserInfo; token: string }>) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload.user;
            state.login.token = action.payload.token;
            state.login.accessToken = action.payload.token;
            state.login.isTokenExpired = false;
        },
        loginFailed: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },
        logoutStart: (state) => {
            state.logout.isFetching = true;
            state.logout.error = false;
        },
        logoutSuccess: (state) => {
            state.logout.isFetching = false;
            state.login.currentUser = null;
            state.login.token = null;
            state.login.isTokenExpired = false;
        },
        loginAdminStart: (state) => {
            state.adminLogin.isFetching = true;
            state.adminLogin.error = false;
        },
        loginAdminSuccess: (state, action: PayloadAction<{ admin: IAdminInfo; token: string }>) => {
            state.adminLogin.isFetching = false;
            state.adminLogin.currentAdmin = action.payload.admin;
            state.adminLogin.token = action.payload.token;
        },
        loginAdminFailed: (state) => {
            state.adminLogin.isFetching = false;
            state.adminLogin.error = true;
        },
        logoutAdmin: (state) => {
            state.adminLogin.currentAdmin = null;
            state.adminLogin.token = null;
        },
        logoutFailed: (state) => {
            state.logout.isFetching = false;
            state.logout.error = true;
        },
        tokenExpired: (state) => {
            state.login.isTokenExpired = true;
        },
        setUserInfo: (state, action: PayloadAction<IUserInfo | null>) => {
            state.userInfo = action.payload;
            state.login.currentUser = action.payload;
        },
    },
});

export const { loginStart, loginSuccess, loginFailed, logoutStart, logoutSuccess, logoutFailed, tokenExpired, setUserInfo, loginAdminStart, loginAdminSuccess, loginAdminFailed, logoutAdmin } = authSlice.actions;

export default authSlice.reducer;
