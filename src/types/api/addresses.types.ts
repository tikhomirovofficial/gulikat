import { ResponseStatus } from "../common.types"

export type GetNearestAddressRequest = {
    user_adress_id: number
    siti_id: number
}
export type GetNearestAddressResponse = {
    adress: number
} & ResponseStatus