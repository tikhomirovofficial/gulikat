import {
    cartAddedClose,
    cartAddedOpen,

    setCartAddedPopupInfo
} from "../features/cart/cartSlice";
import {useAppDispatch} from "../app/hooks";


const UseCartAdd = () => {
    const dispatch = useAppDispatch()
    const handleOpenAddedPopup = (title: string, weight: number) => {
        dispatch(setCartAddedPopupInfo({
            title,
            weight
        }))
        dispatch(cartAddedOpen())

        setTimeout(() => {
            dispatch(cartAddedClose())
        }, 2000)
    }
    return handleOpenAddedPopup

};

export default UseCartAdd;