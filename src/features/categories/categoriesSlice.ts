import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Category, GetCategoriesByAddressRequest, GetCategoriesByAddressResponse} from "../../types/api/api.types";
import {AxiosResponse} from "axios/index";
import {ProductsApi} from "../../http/api/products.api";
import { N_CategoryApi } from "../../types/categories.types";


type CategoriesSliceState = {
    category: N_CategoryApi[],
    isLoading: boolean
}

const initialState: CategoriesSliceState = {
    category: [],
    isLoading: false
}
export const getCategoriesByAddress = createAsyncThunk(
    'categories/by-address',
    async (request: GetCategoriesByAddressRequest, {dispatch}) => {
        const res: AxiosResponse<GetCategoriesByAddressResponse> = await ProductsApi.CategoriesByAddress(request)
        return res.data.category
    }
)

export const CategoriesSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},

    extraReducers: builder => {
        builder.addCase(getCategoriesByAddress.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(getCategoriesByAddress.fulfilled, (state, action) => {
            if (action.payload) {
                state.category = action.payload
            }
            state.isLoading = false
        })
        builder.addCase(getCategoriesByAddress.rejected, (state, action) => {
            state.isLoading = false
        })
    }

})

export const {} = CategoriesSlice.actions


export const categoriesReducer = CategoriesSlice.reducer