import { useEffect } from 'react';
import LoginWindow from "./components/Windows/Login";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import YourAddressWindow from "./components/Windows/YourAdress";
import ProductAdditives from "./components/Windows/ProductAdditives";
import CookiePopup from "./components/CookiePopup";
import DeliveryWay from "./components/Windows/DeliveryWay";
import NewAddress from "./components/Windows/NewAddress";
import AppRoutes from "./router/AppRoutes";
import Cart from "./components/Cart";
import { getCart, } from "./features/cart/cartSlice";
import { ScrollToTop } from "./components/ServiceComponents";
import { getAddressesUser } from "./features/profile/profileSlice";
import useToken from "./hooks/useToken";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { getProductsByAddress, getSalesProductsByAddress } from "./features/products/productsSlice";
import { getCategoriesByAddress } from "./features/categories/categoriesSlice";
import { addToStorage, getFromStorage } from "./utils/common/LocalStorageExplorer";
import {
    getCities,
    getNearestAddress,
    setBaseAddress,
    setIsMobile,
    setIsPhone,

} from "./features/main/mainSlice";
import { setOrderForm } from "./features/forms/formsSlice";
import HeaderMobile from "./components/Header/mobile";
import MenuMobile from "./components/MenuMobile";
import CartWidget from "./components/Cart/widget";
import SuccessWindow from "./components/Windows/SuccessWindow";
import HistoryOrderWindow from "./components/Windows/HistoryOrder";

const MOBILE_WIDTH = 1100
const SMALL_WIDTH = 800


function App() {
    const dispatch = useAppDispatch()
    const token = useToken()
    const {
        loginOpened,
        yourAddress,
        cartOpened,
        cookiesAccepted,
        deliveryWay,
        productAdditives,
        newAddress,
        orderHistory,
        addressSuccess,
    } = useAppSelector(state => state.modals)

    const { mobileMenu } = useAppSelector(state => state.modals)
    const { items } = useAppSelector(state => state.cart)
    const orderForm = useAppSelector(state => state.forms.orderForm)

    const { market, cities, currentGeo, isMobile, cityAddresses, isDarkTheme, baseAddress, addressFrom, addressFromLoading } = useAppSelector(state => state.main)

    const handleResize = () => {
        dispatch(setIsMobile(window.innerWidth <= MOBILE_WIDTH))
        dispatch(setIsPhone(window.innerWidth <= SMALL_WIDTH))
    }

    useEffect(() => {
        window.addEventListener('resize', () => {
            setTimeout(handleResize, 800)
        })
        handleResize()
    }, [])

    useEffect(() => {
        if (orderForm?.restaurant != -1 || orderForm?.addressId != -1) {
            addToStorage("order_form", {
                restaurant: orderForm.restaurant,
                address: orderForm.address.val,
                addressId: orderForm.addressId

            })
        }
    }, [orderForm])

    useEffect(() => {
        if (token) {
            if (orderForm.addressId !== -1 && currentGeo.city !== 0) {
                dispatch(getNearestAddress({
                    siti_id: currentGeo.city,
                    user_adress_id: orderForm.addressId
                }))
            }
        }

    }, [orderForm.addressId, currentGeo.city, token])

    useEffect(() => {
        if (addressFrom !== -1 && addressFrom !== undefined) {
            dispatch(getCart({ adress_id: addressFrom }))
        }
    }, [addressFrom])


    useEffect(() => {
        if (!cities.length) {
            dispatch(getCities())
        }
        const gettedOrderForm = getFromStorage("order_form")
        if (gettedOrderForm !== undefined && gettedOrderForm !== null) {
            const restaurantId = gettedOrderForm?.restaurant
            const addressId = gettedOrderForm?.addressId
            if (restaurantId != -1 || addressId != -1) {
                dispatch(setOrderForm({
                    restaurant: gettedOrderForm.restaurant,
                    address: gettedOrderForm.address,
                    addressId: gettedOrderForm.addressId
                }))
            }
        }
    }, [market])

    useEffect(() => {
        if (token) {
            dispatch(getAddressesUser())
        }
    }, [token])

    useEffect(() => {
        if (isDarkTheme) {
            document.body.classList.add("dk-white-bg")
        }
    }, [isDarkTheme])

    useEffect(() => {
        window.scrollTo(0, 0)
        if (cities.length > 0) {
            const currentBaseAddress = cities.find(item => item.id === currentGeo.city)?.base_adress_id || -1
            dispatch(setBaseAddress(currentBaseAddress))
        }
    }, [cities, currentGeo.city])

    useEffect(() => {
        if (!addressFromLoading) {
            const baseAddressDefined = baseAddress !== -1 && baseAddress !== undefined
            const addressFromDefined = addressFrom !== -1 && addressFrom !== undefined

            if (addressFromDefined) {
                dispatch(getCategoriesByAddress({ adress_id: addressFrom }))
                dispatch(getProductsByAddress({ adress_id: addressFrom }))
                dispatch(getSalesProductsByAddress({ adress_id: addressFrom }))
            } else {
                if (baseAddressDefined) {
                    dispatch(getCategoriesByAddress({ adress_id: baseAddress }))
                    dispatch(getProductsByAddress({ adress_id: baseAddress }))
                    dispatch(getSalesProductsByAddress({ adress_id: baseAddress }))
                }
            }
        }
    }, [baseAddress, addressFrom, addressFromLoading])

    useEffect(() => {
        console.log(items);
    }, [items])

    useEffect(() => {
        const appNode = document.body
        if (appNode !== null && (mobileMenu || deliveryWay.opened)) {
            appNode?.classList.add("of-y-hide")
        } else {
            appNode?.classList.remove("of-y-hide")
        }
    }, [mobileMenu, deliveryWay.opened])

    return (
        <>
            <ScrollToTop />
            <div className={`App f-column jc-between`}>
                <div className="f-column">
                    {isMobile ? <HeaderMobile /> : <Header />}
                    <AppRoutes isAuth={false} />
                </div>
                <Footer />
                <SuccessWindow closeHandle={() => { }} isOpened={addressSuccess.opened} title={addressSuccess.title} />
                {isMobile ? <CartWidget /> : null}
                {loginOpened ? <LoginWindow /> : null}
                {yourAddress ? <YourAddressWindow /> : null}
                {deliveryWay.opened ? <DeliveryWay /> : null}
                {productAdditives ? <ProductAdditives /> : null}
                {orderHistory ? <HistoryOrderWindow /> : null}
                {newAddress ? <NewAddress /> : null}
                {cartOpened ? <Cart /> : null}
                <CookiePopup isOpened={cookiesAccepted} />
            </div>
            {isMobile ? <MenuMobile /> : null}
        </>


    );
}

export default App;
