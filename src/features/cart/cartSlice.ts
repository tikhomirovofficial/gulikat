import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    AddToCartComboRequest,
    AddToCartComboResponse,
    CartCountSupplementsRequest,
    CartCountSupplementsResponse,
    CartResetResponse,
    EditCartComboRequest,
    EditCartComboResponse,

} from "../../types/api/api.types";
import { AxiosResponse } from "axios";
import { handleTokenRefreshedRequest } from "../../utils/auth/handleThunkAuth";
import { CartApi } from "../../http/api/cart.api";
import { ChangeCountCartRequest, ChangeCountCartResponse, CartProductDeleteRequest, N_AddToCartProductRequest, N_AddToCartProductResponse, N_CartProduct, N_GetCartProductResponse, N_GetCartProductRequest, CartProductDeleteResponse } from "../../types/api/cart.api.types";


type DefferedAddingProduct = {
    id: number,
    is_combo: boolean,
    selected_product?: number
    supplements?: number[]
} | null

type CartSliceState = {
    items: Array<N_CartProduct>,
    cartLoading: boolean,
    addProductAfterLogin: DefferedAddingProduct,
    addProductAfterAddress: DefferedAddingProduct,
    totalPrice: number,
    totalDiscountPrice?: number,
    notDiscountTotalPrice: number,
    cartAdded: boolean,
    cartClassOpened: boolean
    cartAddedPopupInfo: {
        title: string
        weight: number
    }
    cartCounts: Record<string, number>
}

const initialState: CartSliceState = {
    items: [],
    cartLoading: false,
    addProductAfterLogin: null,
    addProductAfterAddress: null,
    totalPrice: 0,
    notDiscountTotalPrice: 0,
    totalDiscountPrice: 0,
    cartCounts: {},
    cartAdded: true,
    cartClassOpened: false,
    cartAddedPopupInfo: { title: "", weight: 0 }

}

export const getCart = createAsyncThunk(
    'cart/get',
    async (request: N_GetCartProductRequest, { dispatch }) => {
        const res: AxiosResponse<N_GetCartProductResponse> = await handleTokenRefreshedRequest(CartApi.GetProducts, request)
        return res.data
    }
)
export const addToCart = createAsyncThunk(
    'cart/add',
    async (request: N_AddToCartProductRequest, { dispatch }) => {
        const res: AxiosResponse<N_AddToCartProductResponse> = await handleTokenRefreshedRequest(CartApi.AddProduct, request)
        return res.data
    }
)
export const addToCartCombo = createAsyncThunk(
    'cart/add/combo',
    async (request: AddToCartComboRequest, { dispatch }) => {

        const res: AxiosResponse<AddToCartComboResponse> = await handleTokenRefreshedRequest(CartApi.AddCombo, { combo: request.combo })
        return {
            combo: request.combo,
            combo_prod: request.combo_prod,
            data: res.data
        }
    }
)
export const editCartCombo = createAsyncThunk(
    'cart/edit/combo',
    async (request: EditCartComboRequest, { dispatch }) => {

        const res: AxiosResponse<EditCartComboResponse> = await handleTokenRefreshedRequest(CartApi.EditCombo, { combos: request.combos })
        return {
            data: res.data
        }
    }
)
export const editCountCart = createAsyncThunk(
    'cart/edit',
    async (request: ChangeCountCartRequest, { dispatch }) => {
        const res: AxiosResponse<ChangeCountCartResponse> = await handleTokenRefreshedRequest(CartApi.EditProductCount, request)
        return res.data
    }
)
export const editSupplementsCountCart = createAsyncThunk(
    'cart/supplements/edit',
    async (request: CartCountSupplementsRequest, { dispatch }) => {

        const res: AxiosResponse<CartCountSupplementsResponse> = await handleTokenRefreshedRequest(CartApi.EditSupplementsCount, request)
        return {
            cart_id: request.cart_id,
            supplements_list: res.data.supplements_list
        }
    }
)
export const removeFromCart = createAsyncThunk(
    'cart/remove',
    async (request: CartProductDeleteRequest, { dispatch }) => {
        const res: AxiosResponse<CartProductDeleteResponse> = await handleTokenRefreshedRequest(CartApi.RemoveProduct, {
            cart_id: request.cart_id
        })
        return {
            data: res.data,
            cart_id: request.cart_id
        }
    }
)
export const resetCart = createAsyncThunk(
    'cart/reset',
    async (_, { dispatch }) => {
        const res: AxiosResponse<CartResetResponse> = await handleTokenRefreshedRequest(CartApi.Reset)
        return res.data
    }
)

export const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        cartAddedOpen: state => {
            state.cartAdded = true
            state.cartClassOpened = true

        },
        setCartAddedPopupInfo: (state, action: PayloadAction<{
            title: string,
            weight: number
        }>) => {
            state.cartAddedPopupInfo = {
                title: action.payload.title,
                weight: action.payload.weight
            }
        },
        resetCartAddedPopupInfo: state => {
            state.cartAddedPopupInfo = {
                title: "",
                weight: 0
            }
        },
        cartAddedClose: state => {
            state.cartClassOpened = false
        },
        setProductAfterLogin: (state, action: PayloadAction<DefferedAddingProduct>) => {
            state.addProductAfterLogin = action.payload
        },
        setProductAfterAddress: (state, action: PayloadAction<DefferedAddingProduct>) => {
            state.addProductAfterAddress = action.payload
        },
        addProduct: (state, action: PayloadAction<N_CartProduct>) => {
            state.items = [
                ...state.items,
                action.payload
            ]
        },
        plusProduct: (state, action: PayloadAction<number>) => {

        },
        minusProduct: (state, action: PayloadAction<number>) => {
        },
        removeProduct: (state, action: PayloadAction<number>) => {

        },
        setTotalPrice: (state, action: PayloadAction<number>) => {
            state.totalPrice = ~~(action.payload)
        },
        setDiscountPrice: (state, action: PayloadAction<number>) => {
            state.totalDiscountPrice = ~~(action.payload)
        }
    },
    extraReducers: builder => {

        builder.addCase(getCart.fulfilled, (state, action) => {
            if (action.payload) {
                state.items = action.payload.cart
                state.totalPrice = action.payload.price
                state.totalDiscountPrice = action.payload.price_discount
                state.cartCounts = {}
                state.cartLoading = false
            }

        })
        builder.addCase(getCart.pending, (state, action) => {
            state.cartLoading = true
        })
        builder.addCase(getCart.rejected, (state, action) => {
            state.cartLoading = false
        })

        builder.addCase(addToCart.fulfilled, (state, action) => {
            if (action.payload) {
                state.totalPrice = action.payload.price
                state.totalDiscountPrice = action.payload.price_discount
                state.items = [
                    ...state.items,
                    {
                        id: action.payload.cart_id,
                        product: action.payload.product,
                        count: 1
                    }
                ]
            }
        })

        builder.addCase(editCountCart.fulfilled, (state, action) => {
            if (action.payload) {
                const newState = state.items.map(item => {
                    if (item.id === action.payload.cart_id) {
                        item.count = action.payload.count
                        return item
                    }
                    return item
                })
                state.totalPrice = action.payload.price
                state.totalDiscountPrice = action.payload.price_discount
                state.items = newState
            }
        })

        builder.addCase(removeFromCart.fulfilled, (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload.cart_id)
            state.totalPrice = action.payload.data.price
            state.totalDiscountPrice = action.payload.data.price_discount
        })

        builder.addCase(resetCart.fulfilled, (state, action) => {
            state.items = []
        })


    }
})

export const {
    addProduct,
    plusProduct,
    minusProduct,
    setTotalPrice,
    setDiscountPrice,
    removeProduct,
    setProductAfterLogin,
    setProductAfterAddress,
    cartAddedClose,
    setCartAddedPopupInfo,
    resetCartAddedPopupInfo,
    cartAddedOpen
} = CartSlice.actions


export const cartReducer = CartSlice.reducer