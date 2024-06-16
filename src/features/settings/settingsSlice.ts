import { createSlice } from "@reduxjs/toolkit";


type SettingsSliceState = {
    cartDisabled: boolean,
    isLoading: boolean
}

const initialState: SettingsSliceState = {
    cartDisabled: false,
    isLoading: false
}

export const SettingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {},
})

export const { } = SettingsSlice.actions


export const settingsReducer = SettingsSlice.reducer