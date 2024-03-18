import {
    AddressAddResponse, AddToCartComboRequest, AddToCartComboResponse,
    AddToCartRequest, AddToCartResponse,
    CartCountSupplementsRequest,
    CartCountSupplementsResponse,
    CartResetResponse,
    EditCartComboRequest, EditCartComboResponse,
    GetCartResponse
} from "../../types/api/api.types";
import { AxiosResponse } from "axios";
import authApi, { api } from "../instance/instances";
import { PATHS } from "./path.api";
import { ChangeCountCartRequest, ChangeCountCartResponse, CartProductDeleteRequest, CartProductDeleteResponse, N_AddToCartProductResponse, N_AddToCartProductRequest, N_GetCartProductResponse, N_GetCartProductRequest } from "../../types/api/cart.api.types";
import { ConvertDataToGetParams } from "../../utils/forms/ConvertDataToGetParams";

export class CartApi {
    static async AddProduct(requestData: N_AddToCartProductRequest): Promise<AxiosResponse<N_AddToCartProductResponse>> {
        const res: AxiosResponse<N_AddToCartProductResponse> = await authApi.post(PATHS.ADD_TO_CART, { ...requestData });
        if (!res.data) {
            throw res
        }
        return res;
    }
    static async AddCombo(requestData: AddToCartComboRequest): Promise<AxiosResponse<AddToCartComboResponse>> {
        const res: AxiosResponse<AddToCartComboResponse> = await authApi.post(PATHS.ADD_TO_CART_COMBO, { ...requestData });
        if (!res.data) {
            throw res
        }
        return res;
    }
    static async EditCombo(requestData: EditCartComboRequest): Promise<AxiosResponse<EditCartComboResponse>> {
        const res: AxiosResponse<EditCartComboResponse> = await authApi.post(PATHS.EDIT_CART_COMBO, { ...requestData });
        if (!res.data) {
            throw res
        }
        return res;
    }

    static async GetProducts(requestData: N_GetCartProductRequest): Promise<AxiosResponse<N_GetCartProductResponse>> {
        const res: AxiosResponse<N_GetCartProductResponse> = await authApi.get(PATHS.VIEW_CART + ConvertDataToGetParams({...requestData}));
        if (!res.data) {
            throw res
        }
        return res;
    }
    static async EditProductCount(requestData: ChangeCountCartRequest): Promise<AxiosResponse<ChangeCountCartResponse>> {
        const res: AxiosResponse<ChangeCountCartResponse> = await authApi.post(PATHS.EDIT_CART_ITEM, { ...requestData });
        if (!res.data) {
            throw res
        }
        return res;
    }
    static async EditSupplementsCount(requestData: CartCountSupplementsRequest): Promise<AxiosResponse<CartCountSupplementsResponse>> {
        const res: AxiosResponse<CartCountSupplementsResponse> = await authApi.post(PATHS.EDIT_CART_SUPPLEMENTS, { ...requestData });
        if (!res.data) {
            throw res
        }
        return res;
    }
    static async RemoveProduct(requestData: CartProductDeleteRequest): Promise<AxiosResponse<CartProductDeleteResponse>> {
        const res: AxiosResponse<CartProductDeleteResponse> = await authApi.post(PATHS.DELETE_CART_ITEM, { ...requestData });
        if (!res.data) {
            throw res
        }
        return res;
    }
    static async Reset(): Promise<AxiosResponse<CartResetResponse>> {
        const res: AxiosResponse<CartResetResponse> = await authApi.get(PATHS.RESET_CART);
        if (!res.data) {
            throw res
        }
        return res;
    }
}