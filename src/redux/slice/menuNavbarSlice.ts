import { createSlice } from '@reduxjs/toolkit';

interface MenuNavbarState {
    isOpen: boolean;
}

const initialState: MenuNavbarState = {
    isOpen: false,
};

const menuNavbarSlice = createSlice({
    name: 'menuNavbar',
    initialState,
    reducers: {
        openMenuNavbar: (state) => {
            state.isOpen = true;
        },
        closeMenuNavbar: (state) => {
            state.isOpen = false;
        },
        toggleMenuNavbar: (state) => {
            state.isOpen = !state.isOpen;
        },
    },
});

export const { openMenuNavbar, closeMenuNavbar, toggleMenuNavbar } = menuNavbarSlice.actions;
export default menuNavbarSlice.reducer;
