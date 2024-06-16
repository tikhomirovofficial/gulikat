import { useEffect, useMemo, useState } from 'react';
import ShadowWrapper from "../Windows/ShadowWrapper";
import { CloseIcon, InfoCircle } from "../../icons";
import styles from './cart.module.scss'
import RedButton from "../Buttons/RedButton";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { formatNumberWithSpaces } from "../../utils/common/numberWithSpaces";
import { handleCartOpened } from "../../features/modals/modalsSlice";
import { useNavigate } from "react-router-dom";
import CartList from "./CartList";
import useIsWorkTime from "../../hooks/useIsWorkTime";
import useTheme from '../../hooks/useTheme';
import useActualPrice from '../../hooks/useActualPrice';


const Cart = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { items } = useAppSelector(state => state.cart)
    const actualPrice = useActualPrice()
    const { workTimes } = useAppSelector(state => state.main)
    const [classOpened, setClassOpened] = useState(false)
    const { isCurrent } = useIsWorkTime({ ...workTimes, is_around_time: workTimes.isAroundTime })

    const gTheme = useTheme()
    const disabledOrder = !isCurrent || items.some(item => item.product.count === null || item.product.count < 1)

    const handleCloseCart = () => {
        setClassOpened(false)
        setTimeout(() => {
            dispatch(handleCartOpened())
        }, 300)
    }


    const totalCount = useMemo(() => {
        return items.reduce((prev) => {
            return prev + 1
        }, 0)
    }, [items])


    const handleToOrder = () => {
        handleCloseCart()
        navigate("/order")
    }

    const handleToCatalog = () => {
        handleCloseCart()
        navigate("/")
    }

    useEffect(() => {
        setTimeout(() => {
            setClassOpened(true)
        }, 200)
    }, [])

    return (
        <ShadowWrapper onClick={handleCloseCart} className={"d-f jc-end p-fix h-100v w-100v"}>

            <div onClick={e => e.stopPropagation()}
                className={`${styles.cartBlock} ${gTheme("lt-cart", "dk-cart")} ${classOpened ? styles.cartBlockOpened : ""} bg-white f-column p-rel`}>
                <div className={`${styles.top} w-100p d-f al-end jc-end pd-0-20`}>
                    <div onClick={handleCloseCart} className={`closeWrapper`}>
                        <CloseIcon isDark={true} />
                    </div>
                </div>
                <div className={`${styles.content} pd-20 f-1 f-column-betw`}>
                    <div className="f-column gap-25">
                        <div className="itemsBlock f-column">
                            <div className={`${styles.cartBlockTop} ${gTheme("lt-cart", "dk-cart")} f-column gap-20`}>
                                <h2>
                                    {
                                        items.length ? `${totalCount} товаров на ${formatNumberWithSpaces(actualPrice)} ₽` :
                                            "Корзина пуста"
                                    }
                                </h2>
                                {
                                    items.length && !isCurrent ?
                                        <div className={`${styles.info} d-f al-center gap-10`}>
                                            <InfoCircle className={styles.infoIcon} height={18} width={18} />
                                            <p>
                                                Сейчас заказ недоступен <br />
                                                доставка работает с {workTimes.startTime} до {workTimes.endTime}.
                                            </p>
                                        </div> : null
                                }
                                {
                                    !items.length ?
                                        <div className={`d-f gap-10`}>
                                            <InfoCircle className={styles.infoIcon} height={18} width={18} />
                                            <div className={`${styles.emptyText} f-column`}>
                                                <p>
                                                    В вашей корзине пусто, откройте «Меню» <br /> и выберите понравившийся
                                                    товар.
                                                </p>
                                            </div>

                                        </div>
                                        : null
                                }
                            </div>
                            <CartList />

                        </div>
                    </div>
                </div>
                <div className={`${styles.bottom} ${gTheme("lt-cartItem", "dk-cartItem")} f-column gap-15`}>
                    <div className="f-row-betw">
                        <b>Сумма заказа</b>
                        <b>{formatNumberWithSpaces(actualPrice)} ₽</b>
                    </div>
                    {
                        items.length ?
                            <RedButton onClick={handleToOrder}
                                disabled={disabledOrder}
                                className={"w-100p pd-15"}>
                                К оформлению
                            </RedButton> :
                            <RedButton onClick={handleToCatalog}
                                disabled={items.some(item => item.product !== undefined && item.product.id < 0)}
                                className={"w-100p pd-15"}>Перейти в меню</RedButton>
                    }
                </div>
            </div>
        </ShadowWrapper>
    );
};

export default Cart;