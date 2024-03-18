import React, { FC } from 'react';
import { CartProductItem } from "../../../types/api/api.types";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
    handleProductAdditives,
    setChangingAdditivesMode,
    setProductAdditivesData
} from "../../../features/modals/modalsSlice";
import styles from "../cart.module.scss";
import { domain } from "../../../http/instance/instances";
import { addProduct, addToCart, editCountCart, removeFromCart, removeProduct } from "../../../features/cart/cartSlice";
import { MiniClose, MinusIcon, PlusIcon } from "../../../icons";
import { formatNumberWithSpaces } from "../../../utils/common/numberWithSpaces";
import useTheme from '../../../hooks/useTheme';
import useProduct from '../../../hooks/useProduct';
import { N_CartProduct } from '../../../types/api/cart.api.types';

type CartItemProps = {
    canNotBeAdded?: boolean,
    canBeChanged?: boolean,
    is_combo?: boolean
} & CartProductItem

const CartItem: FC<N_CartProduct> = (props) => {
    const dispatch = useAppDispatch()
    const gTheme = useTheme()
    const { items, combos } = useAppSelector(state => state.products)
    const { handleCurrentProduct, inCart, hasDiscount, handleMinusProduct, handlePlusProduct } = useProduct(props.product.id, [])
    const { addressFrom } = useAppSelector(state => state.main)

    const handleChange = () => {
        dispatch(setChangingAdditivesMode(true))
        if (!props.is_combo) {
            //const findedProduct = items.filter(item => product !== undefined ? item.id === product.id : null)[0]
            handleCurrentProduct()
            return;
        }
        //const findedCombo = combos.filter(item => item.id === product.id)[0]
        handleCurrentProduct()
        dispatch(handleProductAdditives())

    }

    // const supplementsPrice = props.supplements.length > 0 ? supplements.reduce((a, b) => {
    //     return a + b.price
    // }, 0) : 0

    const getCanBeChanged = () => {
        if (props.product !== undefined) {
            // if (!is_combo) {
            //     return items.some(item => item?.supplements.length > 0 && item.id === product.id)
            // }
            // return true
            return props.is_combo
        }
        return null
    }
    const canNotBeAdded = props.product.count === null || props.product.count < 1
    const canBeChanged = getCanBeChanged()

    const { isDarkTheme } = useAppSelector(state => state.main)
    return (
        props.product !== undefined ?
            <div className={`${styles.cartItem} ${gTheme("lt-cartItem", "dk-cartItem")} ${canNotBeAdded ? styles.cartItemDisabled : ""} pd-15 bg-white `}>
                <div className={`${styles.itemInfo} w-100p d-f gap-15`}>
                    <div className={styles.imageBlock}>
                        <img src={`${domain}${props.product.image}`} alt="" />
                    </div>
                    {/* <div style={{ backgroundImage: `url("${domain}${product.image}")` }}
                        className={`${styles.image} bg-cover`}></div> */}
                    <div className="text f-column gap-5 f-1 al-self-center">
                        <div className={"f-column gap-5"}>
                            <b>{props.product.title}</b>
                            <p>{props.product.description}</p>
                            {/* {
                                supplements.length > 0 ?
                                    <p>+ {supplements.map(item => item.title).join(", ")}</p>
                                    : null
                            } */}

                        </div>
                        {
                            canNotBeAdded ?
                                <div className={`${styles.error} colorError`}>
                                    Не можем добавить к заказу. Замените на другое блюдо.
                                </div> : null
                        }

                    </div>
                    <div className="h-100p">
                        <div onClick={() => dispatch(removeFromCart({
                            cart_id: props.id,
                            adress_id: addressFrom
                        }))} className="close cur-pointer w-content h-content">
                            <MiniClose />
                        </div>
                    </div>

                </div>
                <div className={`${styles.itemBottom} f-row-betw`}>
                    {
                        !canNotBeAdded ?
                            <>
                                <div className="d-f al-end gap-10">
                                    {
                                        hasDiscount ?
                                            <div className={`sale p-rel`}>
                                                <div className={`saleLine p-abs`}></div>
                                                <strong className={gTheme("lt-gray-c", "dk-gray-c")}>{(props.product.price * props.count) + 0} ₽</strong>
                                            </div> : null
                                    }
                                    <b className={styles.price}>
                                        {formatNumberWithSpaces(((hasDiscount ? props.product.discount_price || 0 : props.product.price) + 0) * props.count)} ₽
                                    </b>
                                </div>

                                <div className="d-f gap-20">
                                    {
                                        canBeChanged ? <div onClick={handleChange}
                                            className={`cur-pointer ${styles.delete} ${gTheme("lt-active-c", "dk-active-c")}`}>Изменить</div> : null
                                    }

                                    <div className={"d-f al-center gap-5"}>
                                        <div onClick={() => handleMinusProduct(false)} className={"cur-pointer f-c-col"}><MinusIcon fill={isDarkTheme ? "#C8C7CC" : "#434343"} width={12} />
                                        </div>

                                        <div className={styles.count}>{props.count}</div>
                                        <div onClick={handlePlusProduct} className={"cur-pointer f-c-col"}><PlusIcon fill={isDarkTheme ? "#C8C7CC" : "#434343"} width={12} />
                                        </div>
                                    </div>
                                </div>

                            </> :
                            <div className="w-100p jc-end d-f">
                                <div onClick={() => dispatch(removeProduct(props.id))}
                                    className={`cur-pointer ${gTheme("lt-active-c", "dk-active-c")} ${styles.delete}`}>Удалить
                                </div>
                            </div>
                    }

                </div>
            </div> : null
    )
}

export default CartItem;