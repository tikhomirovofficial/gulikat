import React, { FC } from 'react';
import List from "../../../components/List";
import HistoryItem from "./HistoryItem";
import { OrderItemApi } from '../../../types/api/order.api.types';

type OrdersHistoryListProps = {
    orders: OrderItemApi[]
}
const OrdersHistoryList: FC<OrdersHistoryListProps> = ({ orders }) => {

    return (
        <List
            list={orders}
            listBlockClassname={"gap-10 f-column"}
            renderItem={(order) => <HistoryItem {...order}/>}
        />
    );
};

export default OrdersHistoryList;