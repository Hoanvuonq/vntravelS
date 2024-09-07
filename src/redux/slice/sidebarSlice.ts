import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SidebarState {
    isOpenSidebar: boolean;
}

const initialState: SidebarState = {
    isOpenSidebar: false,
};

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        toggleSidebar: (state, action: PayloadAction<boolean | undefined>) => {
            state.isOpenSidebar = action.payload !== undefined ? action.payload : !state.isOpenSidebar;
        },
    },
});

export const { toggleSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
