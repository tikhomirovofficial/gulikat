import { ProductsApi } from "../http/api/products.api";
import { Supplement } from "./api/api.types";
import { N_CategoryApi } from "./categories.types";
import { HasID } from "./common.types";

export type N_ProductDimensions = {
    title: string
} & HasID
export type N_ProductApi = {
    category: N_CategoryApi
    title: string
    description: string
    price: number
    weight: number
    dimensions: N_ProductDimensions
    fats: number
    calories: number,
    proteins: number,
    carbohydrates: number
    storeg_temperature: string
    sheif_life: string
    image: string
    discount_price: number,
    discount_procent: number,
    is_activ: boolean
    count: number
} & HasID

export type N_ProductProps = {
    inCart?: boolean
    isDiscount?: boolean
} & N_ProductApi

export type N_ProductCurrent = {
    cart_id?: number
    is_combo: boolean
} & N_ProductApi

export type Product = {
    price: number
    imageUrl: string,
    name: string,
    is_multiple_supplements?: boolean,
    is_discount?: boolean,
    price_discount?: number,
    description: string,
    weight: number,
    dimensions: string
}

export type AdditiveProduct = Pick<Product, "name" | "imageUrl" | "price">

export type ProductAdditiveData = {
    id: number
    currentAdditive: number,
    cart_id?: number,
    is_combo: boolean,
    additives: Array<Supplement>
} & Product
