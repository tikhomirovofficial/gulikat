import { UserData } from "../user.types";
import { ResponseStatus } from "../common.types";
import { RestaurantDetails } from "../restaurants.types";
import { AddressType } from "../../features/main/mainSlice";
import { N_CityApi } from "../city.types";
import { N_ProductApi } from "../products.types";
import { N_CategoryApi } from "../categories.types";

export type JWT = {
    access?: string,
    refresh?: string
}

export interface Supplement {
    id: number;
    title: string;
    short_description: string;
    image: string;
    supplement_in_cart_id?: number,
    price: number;
}

export type ProductRes = {
    id: number;
    title: string;
    is_multiple_supplements: boolean,
    is_product_day?: boolean
    is_product_week?: boolean
    short_description: string;
    is_discount?: boolean,
    price_discount?: number,
    dimensions: string;
    description: string;
    price: number;
    image: string;
    category: number;
    weight: number;
    supplements: Supplement[];
    composition: string;
}
export type AdditiveItem = {
    id: number,
    title: string,
    image: string
}
export type ComboFields = {
    old_price?: number
    price: number,
    weight: number,
    products?: Array<AdditiveItem>
    drinks?: Array<AdditiveItem>
}
export type Combo = ComboFields & Pick<ProductRes, "title" | "image" | "id">

export type Category = {
    id: number;
    title: string;
    image: string;
};


export type RegistrationRequest = Pick<UserData, "phone">
export type RegistrationResponse = ResponseStatus

export type LoginRequest = {
    username: string,
    password: string
}
export type LoginResponse = JWT & {
    detail?: string
}

export type RefreshRequest = Pick<JWT, "refresh">
export type RefreshResponse = Pick<JWT, "access">

export type ChangeUserRequest = Omit<UserData, "phone">
export type ChangeUserResponse = { user: UserData } & ResponseStatus

export type AddressApiItem = {
    id: number
    adress: string,
    entrance: number,
    floor: number,
    door_code: number
    apartment: number,
    long: number,
    lat: number
}
export type AddressAddRequest = Omit<AddressApiItem, "id">
export type AddressAddResponse = ResponseStatus & Pick<AddressApiItem, "id">

export type UserAddressesResponse = ResponseStatus & {
    adress: Array<AddressApiItem>
}
export type DeleteUserAddressRequest = {
    adress_id: number
}
export type DeleteUserAddressResponse = ResponseStatus

export type GetUserDataResponse = ResponseStatus & {
    user: UserData
}

export type GetByCityAddressesRequest = {
    siti_id: number
}
export type AddressByCityItem = {
    id: number,
    siti: string,
    adress: string,
    long: number,
    lat: number,
    market_id: number,
    work_with: string,
    works_until: string
    time?: Array<string>
}
export type GetByCityAddressesResponse = ResponseStatus & {
    adress: Array<AddressByCityItem>
}

export type GetAddressInfoRequest = {
    adress_id: number
}
export type GetAddressInfoResponse = {
    data: RestaurantDetails
}

export type GetCitiesResponse = {
    siti: N_CityApi[]
} & ResponseStatus

export type GetAddressesByMarketCityRequest = {
    siti_id: number
    market_id: number
}
export type AddressByMarketCity = {
    id: number,
    adress: string,
    market: string,
    long: number,
    lat: number,
    work_with: string,
    works_until: string
}
export type GetAddressesByMarketCityResponse = {
    adress: Array<AddressByMarketCity>
} & ResponseStatus

export type GetProductsByMarketRequest = {
    market_id: number,
    date: string
}
export type N_GetProductByAddressRequest = {
    adress_id: number
}
export type N_GetProductByAddressResponse = {
    products: N_ProductApi[]
} & ResponseStatus


export type GetProductsByMarketResponse = {
    products: ProductRes[];
} & ResponseStatus

export type GetSousesRequest = {}
export type GetSousesResponse = {
    souse: N_ProductApi[]
} & ResponseStatus


export type GetMarketInfoRequest = {
    market_id: number
}

export type GetMarketInfoResponse = {
    shop: {
        id: number,
        name: string,
        short_description: string,
        description: string,
        link: string
    }
} & ResponseStatus


export type GetCategoriesByAddressRequest = {
    adress_id: number
}
export type GetCategoriesByAddressResponse = {
    category: N_CategoryApi[];
} & ResponseStatus


export type GetCombosByMarketRequest = {
    market_id: number
}

export type GetProductDayByMarketRequest = {
    market_id: number,
    date: string
}
export type GetProductDayByMarketResponse = {
    product: ProductRes
} & ResponseStatus

export type GetCombosByMarketResponse = {
    combos: Combo[]
} & ResponseStatus

export type AddToCartItem = {
    product: number,
    supplements?: Array<{
        id: number,
        count: number
    }>
    count: number
}
export type AddToCartCombo = {
    id: number,
    selected_product: number,
    count: number
}
export type AddToCartComboRequest = {
    combo: AddToCartCombo[]
    combo_prod: Combo
}
export type AddToCartComboResponse = AddToCartResponse
export type EditCartComboRequest = {
    combos: AddToCartCombo[]
    combo_id: number
}
export type EditCartComboResponse = {
    product: CartProductItem[]
} & ResponseStatus

export type AddToCartRequest = {
    products: AddToCartItem[]
}
export type AddToCartResponse = {
    id: number
    list_id: number[]

} & ResponseStatus


export type CartProductItem = {
    is_combo: boolean,
    id: number,
    product: {
        id: number
        dimensions: string
        title: string,
        short_description: string
        image: string
        price: number
        is_discount?: boolean
        price_discount?: number
        composition: string
        products?: AdditiveItem[]
        drinks?: AdditiveItem[]
        selected_product?: {
            id: number,
            title: string
        }
    }
    count: number
    supplements: Array<Supplement>
}
export type GetCartResponse = {
    cart: Array<CartProductItem>
    price: number,
    total_price_discount?: number,
    supplement_counts: Record<string, number>
} & ResponseStatus



export type CartCountSupplementsRequest = {
    cart_id: number,
    supplements: Array<{
        supplements_id: number,
        supplement_in_cart_id: number,
        added: boolean
    }>
}
export type CartCountSupplementsResponse = {
    supplements_list: Array<Supplement>
} & ResponseStatus

export type CartResetResponse = ResponseStatus

export type GetDeliveryListResponse = {
    delivery_list: Array<{
        id: number,
        title: string
    }>
} & ResponseStatus

export type GetPaymentListResponse = {
    payment_list: Array<{
        id: number,
        title: string
    }>
} & ResponseStatus

export type GetDeliverySettingsResponse = {
    car_min: number
    people_min: number
} & ResponseStatus

//Если тип доставки самовывоз, то передайте marekt_adress_id, а user_adress_id можете не передавать
export type CreateOrderRequest = {
    user_adress_id?: number,
    marekt_adress_id?: number,
    is_call: boolean,
    count_tools: number,
    time_delivery: string,
    delivery_type: number,
    pyment_type: number,
    change_with?: number
}


export type SendPaymentRequest = {
    order_id: number
}
export type SendPaymentResponse = ResponseStatus


export type GetOrderRequest = {
    order_id: number
}


export type GetBookingsRequest = {
    siti_id: number
}

export type GetBookingsResponse = {
    booking: AddressType[]
} & ResponseStatus

export type BookingCreateRequest = {
    adress: number,
    time: string,
    date: string,
    count_guest: string | number,
    name: string,
    phone: string
}
export type BookingCreateResponse = ResponseStatus
export type MarketByCityItem = {
    id: number,
    link: number,
    market: string
}

export type GetMarketsByCityRequest = {
    siti_id: number
}
export type GetMarketsByCityResponse = {
    market: MarketByCityItem[]
} & ResponseStatus

export type GetOrderDeliveryRequest = {
    lat: number
    lon: number
    siti_id: number
}
export type OrderDeliveryDetails = {
    delivery_type: number
    price: number
}
export type GetOrderDeliveryResponse = OrderDeliveryDetails & ResponseStatus

export type CanOrderByCityRequest = {
    siti_id: number
}
export type CanOrderByCityResponse = ResponseStatus

export type CanOrderAddressesByCityRequest = {
    siti_id: number,
    adress_id: number
}


export type DeliveryAddress = {
    id: number
    adress: string
    market: {
        id: number
        name: string
        short_description: string
        link: number
    }
    lat: number
    long: number
    is_around_clock: boolean
    time: Array<Array<string>>
    phone: string
    timeaone: string
    image: string[]
}
export type CanOrderAddressesByCityResponse = {
    adress: Array<AddressByCityItem>
    delivery_adress: DeliveryAddress
} & ResponseStatus