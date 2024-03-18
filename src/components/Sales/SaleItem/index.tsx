import React, { FC } from 'react'
import { N_ProductApi } from '../../../types/products.types'
import styles from "../sales.module.scss";
import useTheme from '../../../hooks/useTheme';
import { getImgPath } from '../../../utils/common/getAssetsPath';
import useAppColor from '../../../hooks/useAppColor';
import useProduct from '../../../hooks/useProduct';
import { domain } from '../../../http/instance/instances';

export const SaleItem: FC<N_ProductApi> = (props) => {
    const gTheme = useTheme()
    const mainColor = useAppColor()
    const { inCart, handleCurrentProduct } = useProduct(props.id, [])

    return (
        <div onClick={!inCart ? handleCurrentProduct : undefined} className={"cur-grabbing f-column gap-10"} >
            <div className={styles.image} style={{ backgroundImage: `url(${domain + "/" + props.image})` }}></div>
            <div className="f-column gap-5">
                <h3 className={gTheme("lt-dark-coal-c", "dk-gray-c")}>{props.title}</h3>
                <p className={styles.weight}>{props.weight} {props.dimensions.title}</p>
                <div className="d-f al-center gap-15">
                    <div className="d-f gap-5 al-center">
                        <div className={`sale p-rel`}>
                            <div className={`saleLine p-abs`}></div>
                            <strong className={gTheme("lt-gray-c", "dk-gray-c")}>{props.price} ₽</strong>
                        </div>
                        <b className={styles.price}>{props.discount_price} ₽</b>
                    </div>
                    {
                        inCart ?
                            <svg width="26" height="18" viewBox="0 0 26 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M20.6977 5.25C20.7216 5.19685 20.7328 5.13892 20.7304 5.08074H20.75C20.6661 3.07943 19.0137 1.5 17.0037 1.5C14.9937 1.5 13.3413 3.07943 13.2574 5.08074C13.2475 5.13673 13.2475 5.19401 13.2574 5.25H13.1988C12.2377 5.25 11.2103 5.88448 10.912 7.59005L10.3287 12.2361C9.85143 15.6472 11.608 16.5 13.9014 16.5H20.1189C22.4057 16.5 24.1092 15.2652 23.6849 12.2361L23.1083 7.59005C22.757 5.93223 21.7627 5.25 20.8148 5.25H20.6977ZM19.6199 5.25C19.599 5.19596 19.588 5.13865 19.5872 5.08074C19.5872 3.64262 18.4174 2.47679 16.9743 2.47679C15.5312 2.47679 14.3614 3.64262 14.3614 5.08074C14.3713 5.13673 14.3713 5.19401 14.3614 5.25H19.6199ZM14.8227 9.11143C14.4567 9.11143 14.1599 8.80599 14.1599 8.4292C14.1599 8.05241 14.4567 7.74697 14.8227 7.74697C15.1888 7.74697 15.4856 8.05241 15.4856 8.4292C15.4856 8.80599 15.1888 9.11143 14.8227 9.11143ZM18.5015 8.4292C18.5015 8.80599 18.7983 9.11143 19.1644 9.11143C19.5304 9.11143 19.8272 8.80599 19.8272 8.4292C19.8272 8.05241 19.5304 7.74697 19.1644 7.74697C18.7983 7.74697 18.5015 8.05241 18.5015 8.4292Z" fill={mainColor} />
                                <path d="M1 9.373L3.374 11.746L8.12 7" stroke={mainColor} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg> :
                            <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">

                                <path fill-rule="evenodd" clip-rule="evenodd" d="M18.6977 5.25C18.7216 5.19685 18.7328 5.13892 18.7304 5.08074H18.75C18.6661 3.07943 17.0137 1.5 15.0037 1.5C12.9937 1.5 11.3413 3.07943 11.2574 5.08074C11.2475 5.13673 11.2475 5.19401 11.2574 5.25H11.1988C10.2377 5.25 9.21026 5.88448 8.91198 7.59005L8.32868 12.2361C7.85143 15.6472 9.60796 16.5 11.9014 16.5H18.1189C20.4057 16.5 22.1092 15.2652 21.6849 12.2361L21.1083 7.59005C20.757 5.93223 19.7627 5.25 18.8148 5.25H18.6977ZM17.6199 5.25C17.599 5.19596 17.588 5.13865 17.5872 5.08074C17.5872 3.64262 16.4174 2.47679 14.9743 2.47679C13.5312 2.47679 12.3614 3.64262 12.3614 5.08074C12.3713 5.13673 12.3713 5.19401 12.3614 5.25H17.6199ZM12.8227 9.11143C12.4567 9.11143 12.1599 8.80599 12.1599 8.4292C12.1599 8.05241 12.4567 7.74697 12.8227 7.74697C13.1888 7.74697 13.4856 8.05241 13.4856 8.4292C13.4856 8.80599 13.1888 9.11143 12.8227 9.11143ZM16.5015 8.4292C16.5015 8.80599 16.7983 9.11143 17.1644 9.11143C17.5304 9.11143 17.8272 8.80599 17.8272 8.4292C17.8272 8.05241 17.5304 7.74697 17.1644 7.74697C16.7983 7.74697 16.5015 8.05241 16.5015 8.4292Z" fill={mainColor} />
                                <path d="M6 9.5C6 9.99564 5.5982 10.3974 5.10256 10.3974H3.83333V12.1667C3.83333 12.6269 3.46024 13 3 13V13C2.53976 13 2.16667 12.6269 2.16667 12.1667V10.3974H0.897436C0.401795 10.3974 0 9.99564 0 9.5V9.5C0 9.00436 0.401796 8.60256 0.897436 8.60256H2.16667V6.83333C2.16667 6.3731 2.53976 6 3 6V6C3.46024 6 3.83333 6.3731 3.83333 6.83333V8.60256H5.10256C5.5982 8.60256 6 9.00436 6 9.5V9.5Z" fill={mainColor} />
                            </svg>
                    }


                </div>
            </div>
        </div>
    )
}
