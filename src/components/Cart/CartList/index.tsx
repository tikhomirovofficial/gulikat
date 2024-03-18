import React from 'react';
import List from "../../List";
import styles from "../cart.module.scss";
import CartItem from "../CartItem";
import { useAppSelector } from "../../../app/hooks";

const CartList = () => {
    const { items } = useAppSelector(state => state.cart)

    return (
        <List
            listBlockClassname={`${styles.listProducts} f-column gap-5`}
            list={items}
            renderItem={(item) => (
                <CartItem
                    key={item.id}
                    {...item}
                />

            )}
        />
    );
};

export default CartList;