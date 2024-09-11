import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slice/authSlice';
import sidebarReducer from './slice/sidebarSlice';
import menuNavbarSlice from './slice/menuNavbarSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        sidebar: sidebarReducer,
        menuNavbar: menuNavbarSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
