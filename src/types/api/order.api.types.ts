import { ResponseStatus } from "../common.types"
import { N_ProductApi } from "../products.types"

export type N_OrderCreateRequest = {
    user_adress_id: number,
    is_call: boolean,
    siti_id: number,
    adress_id: number,
    time?: string
}
export type N_OrderCreateResponse = {
    order_id: number,
    payment_url: string
} & ResponseStatus


export type GetOrderDetailsItem = {
    order_id: number,
    datetime: string,
    price: number,
    is_payment: false,
    is_active: true,
    products: string[]
    address: string
}
export type OrderItemProduct = Pick<N_ProductApi, "id" | "discount_price" | "price" | "title" | "image" | "discount_procent" | "count">;

export type OrderItemApi = {
    id: number,
    datetime: string,
    price: number,
    payment_url: string,
    is_payment: boolean,
    status: {
        id: number,
        title: string
    }
    adress: string,
    products: OrderItemProduct[]
}

export type GetOrderResponse = {
    order: OrderItemApi
} & ResponseStatus


export type GetHistoryOrdersResponse = {
    order: OrderItemApi[]
} & ResponseStatus