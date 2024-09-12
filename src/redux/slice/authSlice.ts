import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserInfo } from 'redux/reducer/apiRequest/type';

interface IAuthState {
    login: {
        currentUser: UserInfo | null;
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
    updateInfo: {
        isFetching: boolean;
        error: boolean;
    };
    journey: {
        isFetching: boolean;
        error: boolean;
        journeyCount: number;
        maxJourneys: number;
    };
    user: UserInfo | null;
}

const initialState: IAuthState = {
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
    updateInfo: {
        isFetching: false,
        error: false,
    },
    journey: {
        isFetching: false,
        error: false,
        journeyCount: 0,
        maxJourneys: 0,
    },
    user: null,
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
        getUserInfoSuccess: (state, action: PayloadAction<UserInfo>) => {
            state.userInfo.isFetching = false;
            state.login.currentUser = action.payload;
            state.userInfo.error = false;
        },
        getUserInfoFailed: (state) => {
            state.userInfo.isFetching = false;
            state.userInfo.error = true;
        },
        updateUserInfoStart: (state) => {
            state.updateInfo.isFetching = true;
            state.updateInfo.error = false;
        },
        updateUserInfoSuccess: (state, action: PayloadAction<UserInfo>) => {
            state.updateInfo.isFetching = false;
            state.login.currentUser = action.payload;
            state.updateInfo.error = false;
        },
        updateUserInfoFailed: (state) => {
            state.updateInfo.isFetching = false;
            state.updateInfo.error = true;
        },
        sendJourneyStart: (state) => {
            state.journey.isFetching = true;
            state.journey.error = false;
        },
        sendJourneySuccess: (
            state,
            action: PayloadAction<{
                newBalance: number;
                profit: number;
                journeyCount: number;
                maxJourneys: number;
            }>,
        ) => {
            state.journey.isFetching = false;
            state.journey.error = false;
            state.journey.journeyCount = action.payload.journeyCount;
            state.journey.maxJourneys = action.payload.maxJourneys;
            if (state.login.currentUser) {
                state.login.currentUser.points = action.payload.newBalance;
            }
        },
        sendJourneyFailed: (state) => {
            state.journey.isFetching = false;
            state.journey.error = true;
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
    getUserInfoFailed,
    updateUserInfoStart,
    updateUserInfoSuccess,
    updateUserInfoFailed,
    sendJourneyStart,
    sendJourneySuccess,
    sendJourneyFailed,
} = authSlice.actions;

export default authSlice.reducer;
