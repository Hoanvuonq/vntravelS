import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    login: {
        currentUser: any | null;
        isFetching: boolean;
        error: boolean;
        token: string | null;
        isTokenExpired: boolean;
    };
    logout: {
        isFetching: boolean;
        error: boolean;
    };
    userInfo: {
        isFetching: boolean;
        error: boolean;
    };
}

const initialState: AuthState = {
    login: {
        currentUser: null,
        isFetching: false,
        error: false,
        token: localStorage.getItem('accessToken') || null,
        isTokenExpired: false,
    },
    logout: {
        isFetching: false,
        error: false,
    },
    userInfo: {
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
        loginSuccess: (state, action: PayloadAction<{ user: any; token: string }>) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload.user;
            state.login.token = action.payload.token;
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
        logoutFailed: (state) => {
            state.logout.isFetching = false;
            state.logout.error = true;
        },
        tokenExpired: (state) => {
            state.login.isTokenExpired = true;
        },
        getUserInfoStart: (state) => {
            state.userInfo.isFetching = true;
            state.userInfo.error = false;
        },
        getUserInfoSuccess: (state, action: PayloadAction<any>) => {
            state.userInfo.isFetching = false;
            state.login.currentUser = action.payload;
            state.userInfo.error = false;
        },
        getUserInfoFailed: (state) => {
            state.userInfo.isFetching = false;
            state.userInfo.error = true;
        },
    },
});

export const {
    loginStart,
    loginSuccess,
    loginFailed,
    logoutStart,
    logoutSuccess,
    logoutFailed,
    tokenExpired,
    getUserInfoStart,
    getUserInfoSuccess,
    getUserInfoFailed
} = authSlice.actions;
export default authSlice.reducer;
