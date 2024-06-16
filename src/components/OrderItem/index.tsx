import React, { FC } from 'react';
import styles from "../../pages/Order/order.module.scss";
import { domain } from "../../http/instance/instances";
import { formatNumberWithSpaces } from "../../utils/common/numberWithSpaces";
import useTheme from '../../hooks/useTheme';
import { HasID } from '../../types/common.types';

type OrderItemProps = {
    id: number,
    image: string,
    title: string,
    description: string,
    discount_price: number,
    price: number,
    count: number
    discount_procent: number
} & HasID

const OrderItem: FC<OrderItemProps> = (props) => {

    const additivePrice = 0
    const gTheme = useTheme()
    const hasDiscount =  props.discount_procent > 0

    return (
        <div className={`${styles.part} ${styles.product} pd-15 d-f gap-10`}>
            <div style={{ backgroundImage: `url(${domain + "/" + props.image})` }}
                className={`bg-cover ${styles.image}`}></div>
            <div className="f-column-betw f-1 gap-5">
                <div className="top f-column gap-5">
                    <div className="d-f gap-10">
                        <h4>{props.title} × {props.count}</h4>
                    </div>
                </div>
                <div className="d-f al-end gap-10">
                    {
                       hasDiscount ?
                            <div className={`sale p-rel`}>
                                <div className={`saleLine p-abs`}></div>
                                <strong className={gTheme("lt-gray-c", "dk-gray-c")}>{(props.price + additivePrice) * (props?.count !== undefined ? props.count : 0)} ₽</strong>
                            </div> : null
                    }
                    <strong className={`${styles.price} ${gTheme("c-black", "c-black")}`}>{formatNumberWithSpaces(((hasDiscount ? ~~props.discount_price : props.price) + additivePrice) *  (props?.count !== undefined ? props.count : 0))} ₽</strong>
                </div>

            </div>
        </div>
    )
}

export default OrderItem;