import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserInfo, Journey } from 'redux/reducer/apiRequest/type';

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
    journeyHistory: Array<{
        place: string;
        journeyAmount: number;
        profit: number;
        createdAt: string;
        rating: number;
    }>;
    isLoadingJourneyHistory: boolean;
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
    journeyHistory: [],
    isLoadingJourneyHistory: false,
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
                place: string;
                journeyAmount: number;
                rating: number;
            }>,
        ) => {
            state.journey.isFetching = false;
            state.journey.error = false;
            state.journey.journeyCount = action.payload.journeyCount;
            state.journey.maxJourneys = action.payload.maxJourneys;
            if (state.login.currentUser) {
                state.login.currentUser.balance = action.payload.newBalance;
                state.login.currentUser.totalCommission = (state.login.currentUser.totalCommission || 0) + action.payload.profit;
                state.login.currentUser.journeyComplete = state.login.currentUser.journeyComplete || 0;

                const newJourney: Journey = {
                    amount: action.payload.journeyAmount,
                    commission: action.payload.profit,
                    place: action.payload.place,
                    rating: action.payload.rating,
                    _id: Date.now().toString(),
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                };

                if (state.login.currentUser.journeys) {
                    state.login.currentUser.journeys.push(newJourney);
                } else {
                    state.login.currentUser.journeys = [newJourney];
                }
            }
        },

        sendJourneyFailed: (state) => {
            state.journey.isFetching = false;
            state.journey.error = true;
        },

        getUserJourneyHistoryStart: (state) => {
            state.isLoadingJourneyHistory = true;
        },
        getUserJourneyHistorySuccess: (state, action: PayloadAction<IAuthState['journeyHistory']>) => {
            state.isLoadingJourneyHistory = false;
            state.journeyHistory = action.payload;
        },
        getUserJourneyHistoryFailed: (state) => {
            state.isLoadingJourneyHistory = false;
        },
        updateUserBalance: (state, action: PayloadAction<number>) => {
            if (state.user) {
                state.user.balance = action.payload;
            }
        },
        addJourneyToHistory: (
            state,
            action: PayloadAction<{
                place: string;
                journeyAmount: number;
                profit: number;
                createdAt: string;
                rating: number;
            }>,
        ) => {
            if (state.journeyHistory) {
                state.journeyHistory.unshift(action.payload);
            } else {
                state.journeyHistory = [action.payload];
            }
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
    getUserJourneyHistoryStart,
    getUserJourneyHistorySuccess,
    getUserJourneyHistoryFailed,
    updateUserBalance,
    addJourneyToHistory,
} = authSlice.actions;

export default authSlice.reducer;
