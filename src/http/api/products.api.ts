import {
    GetCategoriesByAddressRequest,
    GetCategoriesByAddressResponse,
    GetCombosByMarketRequest,
    GetCombosByMarketResponse, GetProductDayByMarketRequest, GetProductDayByMarketResponse,
    GetProductsByMarketRequest,
    GetProductsByMarketResponse, GetSousesRequest, GetSousesResponse, N_GetProductByAddressRequest, N_GetProductByAddressResponse
} from "../../types/api/api.types";
import { AxiosResponse } from "axios";
import { api } from "../instance/instances";
import { PATHS } from "./path.api";
import { ConvertDataToGetParams } from "../../utils/forms/ConvertDataToGetParams";

export class ProductsApi {
    static async ProductsByAddress(requestData: N_GetProductByAddressRequest): Promise<AxiosResponse<N_GetProductByAddressResponse>> {
        const res: AxiosResponse<N_GetProductByAddressResponse> = await api.get(PATHS.PRODUCT_BY_MARKET, { params: requestData });
        return res;
    }
    static async SalesProductsByAddress(requestData: N_GetProductByAddressRequest): Promise<AxiosResponse<N_GetProductByAddressResponse>> {
        const res: AxiosResponse<N_GetProductByAddressResponse> = await api.get(PATHS.SALES_PRODUCT_BY_ADDRESS, { params: requestData });
        return res;
    }
    static async Souses(): Promise<AxiosResponse<GetSousesResponse>> {
        const res: AxiosResponse<GetSousesResponse> = await api.get(PATHS.MARKET_SOUSES);
        return res;
    }

    static async CategoriesByAddress(requestData: GetCategoriesByAddressRequest): Promise<AxiosResponse<GetCategoriesByAddressResponse>> {
        const res: AxiosResponse<GetCategoriesByAddressResponse> = await api.get(PATHS.MARKET_CATEGORIES + ConvertDataToGetParams(requestData));
        return res;
    }

    static async CombosByMarket(requestData: GetCombosByMarketRequest): Promise<AxiosResponse<GetCombosByMarketResponse>> {
        const res: AxiosResponse<GetCombosByMarketResponse> = await api.get(PATHS.MARKET_COMBOS + ConvertDataToGetParams(requestData));
        return res;
    }

    static async ProductDay(requestData: GetProductDayByMarketRequest): Promise<AxiosResponse<GetProductDayByMarketResponse>> {
        const res: AxiosResponse<GetProductDayByMarketResponse> = await api.get(PATHS.MARKET_PRODUCT_OF_THE_DAY + ConvertDataToGetParams(requestData));
        return res;
    }
}