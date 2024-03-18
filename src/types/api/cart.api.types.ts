import { HasID, ResponseStatus } from "../common.types"
import { N_ProductApi } from "../products.types"

export type N_CartProduct = {
    product: N_ProductApi
    selected_drink?: number
    is_combo?: boolean
    count: number
} & HasID

export type N_AddToCartProductRequest = {
    products_id: number,
    adress_id: number,
    count: number
}
export type N_AddToCartProductResponse = {
    cart_id: number
    product: N_ProductApi
    price_discount: number,
    price: number
} & ResponseStatus

export type N_GetCartProductRequest = {
    adress_id: number
}
export type N_GetCartProductResponse = {
    cart: N_CartProduct[]
    price_discount: number,
    price: number
}
export type CartProductDeleteRequest = {
    cart_id: number,
    adress_id: number
}
export type CartProductDeleteResponse = {
    price_discount: number,
    price: number
} & ResponseStatus

export type ChangeCountCartRequest = {
    cart_id: number,
    adress_id: number,
    count: number
}
export type ChangeCountCartResponse = {
    cart_id: number
    product: N_ProductApi
    count: number
    price_discount: number,
    price: number
} & ResponseStatus