import React from "react";
import ShadowWrapper from "../ShadowWrapper";
import WindowBody from "../WhiteWrapper";
import { CloseIcon } from "../../../icons";
import styles from "./yourAdress.module.scss"
import { useAppDispatch } from "../../../app/hooks";
import {
    handleDeliveryVariant,
    handleDeliveryWayWindow, handleLogin,
    handleYourAddress
} from "../../../features/modals/modalsSlice";
import RedButton from "../../Buttons/RedButton";
import useToken from "../../../hooks/useToken";

const YourAddressWindow = () => {
    const dispatch = useAppDispatch()
    const token = useToken()

    const handleDeliveryBtn = () => {
        dispatch(handleYourAddress())
        dispatch(handleDeliveryVariant(0))
        dispatch(handleDeliveryWayWindow())
    }

    const handleLoginBtn = () => {
        dispatch(handleYourAddress())
        dispatch(handleLogin())
    }


    return (
        <ShadowWrapper onClick={() => dispatch(handleYourAddress())}>
            <WindowBody className={`${styles.window} f-column`}>
                <div className="w-100p d-f jc-end">
                    <div onClick={() => dispatch(handleYourAddress())} className={"closeWrapper"}>
                        <CloseIcon isDark={true} />
                    </div>
                </div>
                <div className="f-column gap-20">
                    <div className="f-column gap-20">
                        <h2>Ваш адрес</h2>
                        <div className="f-column gap-40">
                            <p className={styles.caption}>Укажите адрес доставки, чтобы мы могли сохранить его для будущих заказов.</p>
                            <div className="f-column gap-10">
                                <RedButton onClick={handleDeliveryBtn} disabled={false} className={"pd-10-0"}>Указать адрес доставки</RedButton>
                            </div>
                        </div>

                    </div>
                    <div className="f-column gap-15">
                        {
                            !token ? <div className={"caption caption-big txt-center"}>Уже есть аккаунт? <span onClick={handleLoginBtn} className={"colorRed cur-pointer"}>Войти</span></div> : null
                        }

                    </div>

                </div>


            </WindowBody>
        </ShadowWrapper>
    );
};

export default YourAddressWindow;