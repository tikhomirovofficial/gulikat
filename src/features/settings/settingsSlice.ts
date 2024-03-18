import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Category, GetCategoriesByAddressRequest, GetCategoriesByAddressResponse} from "../../types/api/api.types";
import {AxiosResponse} from "axios/index";
import {ProductsApi} from "../../http/api/products.api";


type SettingsSliceState = {
    cartDisabled: boolean,
    isLoading: boolean
}

const initialState: SettingsSliceState = {
    cartDisabled: false,
    isLoading: false
}
// export const getSettings = createAsyncThunk(
//     'settings/get',
//     async (request: GetCategoriesByMarketRequest, {dispatch}) => {
//         const res: AxiosResponse<GetCategoriesByMarketResponse> = await ProductsApi.CategoriesByMarket(request)
//         return res.data.category
//     }
// )

export const SettingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {},

    // extraReducers: builder => {
    //     builder.addCase(getSettings.pending, (state, action) => {
    //         state.isLoading = true
    //     })
    //     builder.addCase(getSettings.fulfilled, (state, action) => {
    //         if (action.payload) {
    //             state.cartDisabled = action.payload
    //         }
    //         state.isLoading = false
    //     })
    //     builder.addCase(getSettings.rejected, (state, action) => {
    //         state.isLoading = false
    //     })
    // }

})

export const {} = SettingsSlice.actions


export const settingsReducer = SettingsSlice.reducer