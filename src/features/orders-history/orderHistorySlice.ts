import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {GetOrderRequest} from "../../types/api/api.types";
import {AxiosResponse} from "axios/index";
import {OrderApi} from "../../http/api/order.api";
import { GetOrderResponse, OrderItemApi } from "../../types/api/order.api.types";
import { handleTokenRefreshedRequest } from "../../utils/auth/handleThunkAuth";


type OrderHistorySliceType = {
    loading: boolean
    data: OrderItemApi
}

const initialState: OrderHistorySliceType = {
    data: {
        adress: "",
        datetime: "2023-10-13T09:17:47.712379Z",
        payment_url: "",
        is_payment: false,
        status: {
            id: 0,
            title: ""
        },
        id: 0,
        price: 0,
        products: []
    },
    loading: false

}

export const getOrderById = createAsyncThunk(
    'history/order/get',
    async (request: GetOrderRequest, {dispatch}) => {
        const res: AxiosResponse<GetOrderResponse> = await handleTokenRefreshedRequest(OrderApi.GetData, request)
        return res.data.order
    }
)

export const OrderHistorySlice = createSlice({
    name: "orders/history",
    initialState,
    reducers: {},

    extraReducers: builder => {
        builder.addCase(getOrderById.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getOrderById.fulfilled, (state, action) => {
            if (action.payload) {
                state.data = action.payload
            }
            state.loading = false
        })
        builder.addCase(getOrderById.rejected, (state, action) => {
            state.loading = false
        })
    }

})


export const ordersHistoryReducer = OrderHistorySlice.reducer