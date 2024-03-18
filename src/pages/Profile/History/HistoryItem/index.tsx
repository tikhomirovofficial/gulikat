import React, { FC } from 'react';
import styles from "../../profile.module.scss";
import { formatNumberWithSpaces } from "../../../../utils/common/numberWithSpaces";
import { domain } from "../../../../http/instance/instances";
import { ArrowMiniRightIcon } from "../../../../icons";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { handleHistoryOrder } from "../../../../features/modals/modalsSlice";
import { getOrderStatus } from "../../../../utils/orders/getOrderStatus";
import { getOrderById } from "../../../../features/orders-history/orderHistorySlice";
import useTheme from '../../../../hooks/useTheme';
import { OrderItemApi } from '../../../../types/api/order.api.types';


const HistoryItem: FC<OrderItemApi> = (props) => {
    const dispatch = useAppDispatch()
    const gTheme = useTheme()
    const { isDarkTheme } = useAppSelector(state => state.main)
    const productsIsDefined = props.products.length > 0 && props.products !== undefined
    const productImage = productsIsDefined ? `${domain}${props.products[0].image}` : "assets/img/additive_plashka.png"

    const openOrderDetails = () => {
        dispatch(getOrderById({ order_id: props.id }))
        dispatch(handleHistoryOrder())
    }


    return (
        <div onClick={openOrderDetails} className={`pd-10 cur-pointer  ${gTheme("lt-orderItemBg", "dk-orderItemBg")} ${styles.orderItem}`}>
            <div className="f-column gap-5">
                <div className="f-row-betw">
                    <div className="f-column">
                        <div className="left d-f al-center gap-10">
                            <div className={`${styles.imgBlock} p-rel`}>
                                <div style={{ backgroundImage: `url(${productImage})` }} className={`${styles.imgItem}`}></div>
                            </div>
                            <div className="f-column-betw al-start">
                                <div className={`${styles.orderInfoTop} ${gTheme("lt-orderInfoTop-c", "dk-orderInfoTop-c")} d-f jc-end`}>
                                    <p>Заказ</p>
                                    <b>№{props.id}</b>
                                </div>
                                <div className={`${styles.orderInfoBottom} ${gTheme("lt-orderInfoBottom-c", "dk-orderInfoBottom-c")} d-f jc-end`}>
                                    <p>Сумма</p>
                                    <b>{formatNumberWithSpaces(~~(props.price))} ₽</b>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="right d-f al-center gap-40">
                        <div className="f-column-betw al-start">
                            <div className={`${styles.orderInfoTop} ${gTheme("lt-orderInfoTop-c", "dk-orderInfoTop-c")} d-f jc-end`}>
                                <p>Статус</p>
                            </div>
                            <div className={`${styles.orderInfoBottom} ${gTheme("lt-orderInfoBottom-c", "dk-orderInfoBottom-c")} d-f jc-end`}>
                                <p>{props.status.title}</p>
                            </div>
                        </div>
                        <div className={"w-content h-content"}>
                            <ArrowMiniRightIcon stroke={isDarkTheme ? "#C3C3C3" : "#434343"} height={26} width={12} />
                        </div>
                    </div>
                </div>
                {
                    !props.is_payment ?
                        <a href={props.payment_url} target={"_blank"} onClick={(e) => e.stopPropagation()} className={`${styles.paymentBtn}`}>
                            <p>Оплатить</p>
                            <div className={styles.line}></div>
                        </a> : null
                }
            </div>
        </div>
    );
};

export default HistoryItem;