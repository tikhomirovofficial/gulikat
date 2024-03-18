import React, { useState } from 'react';
import ShadowWrapper from "../../../ShadowWrapper";
import styles from "../../productAdditives.module.scss";
import WindowBody from "../../../WhiteWrapper";
import { CloseIcon } from "../../../../../icons";
import { domain } from "../../../../../http/instance/instances";
import RedButton from "../../../../Buttons/RedButton";
import List from "../../../../List";
import SupplementItem from "../../SupplementItem";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { getFromCartAddedSupplements } from "../../../../../utils/products/getFromCartAddedSupplements";
import useProduct from "../../../../../hooks/useProduct";
import { getSupplementsTotalPrice } from "../../../../../utils/products/getSupplementsTotalPrice";
import { handleProductAdditives } from "../../../../../features/modals/modalsSlice";
import useTheme from '../../../../../hooks/useTheme';

const EditProductVariant = () => {
    const gTheme = useTheme()
    const curProduct = useAppSelector(state => state.modals.productAdditivesData)
    //ТОЛЬКО ДЛЯ ОБЫЧНОГО ПРОДУКТА
    const dispatch = useAppDispatch()

    const cart = useAppSelector(state => state.cart.items)
    //const [addedSupplements, setAddedSupplements] = useState<number[]>(getFromCartAddedSupplements(cart, id, additives))
    const { addToCartProduct, inCart, hasDiscount } = useProduct(curProduct.id, [])
    //const additivePrice = getSupplementsTotalPrice(addedSupplements, additives)

    //const saveMode = useAppSelector(state => state.modals.isChangingModeAdditives)
    const handleProductWindow = () => dispatch(handleProductAdditives())
    const noCount = curProduct.count < 1

    // const RenderSupplementsList = () => {
    //     if (additives?.length) {
    //         return <div className={`${styles.additivesListBlock} f-1 gap-10 f-column`}>
    //             <h4 className={gTheme("lt-dark-coal-c", "dk-gray-c")}>Дополнительно</h4>
    //             <List
    //                 listBlockClassname={`${styles.supplementsList} f-column gap-10`}
    //                 list={additives}
    //                 renderItem={
    //                     (item) => <SupplementItem
    //                         addedSupplementsIds={addedSupplements}
    //                         onlyOne={is_multiple_supplements === false}
    //                         setAddedSupplements={setAddedSupplements}
    //                         title={item.title}
    //                         id={item.id}
    //                         price={item.price}

    //                     />}
    //             />
    //         </div>
    //     }
    //     return null
    // }
    return (
        <ShadowWrapper className={`${styles.additivesWindow} f-c-col p-fix h-100v w-100v`}
            onClick={handleProductWindow}>
            <WindowBody className={`${styles.window} f-column`}>
                <div className="w-100p d-f al-end jc-end">
                    <div onClick={handleProductWindow} className={`closeWrapper ${styles.close}`}>
                        <CloseIcon isDark={true} />
                    </div>
                </div>
                <div className={`${styles.additivesContainer} f-row-betw h-100p gap-40`}>
                    <div className={styles.productBlockImage}>
                        <img src={domain + curProduct.image} alt="" />
                    </div>
                    {/* <div style={{backgroundImage: `url(${domain + imageUrl})`}}
                         className={`${styles.productImage}`}></div> */}
                    <div className={`${styles.additivesBarContainer} f-column-betw gap-20 h-100p`}>
                        <div className={`${styles.productAdditivesBar} f-column-betw gap-10`}>
                            <div className="top f-column gap-15">
                                <div className="f-column gap-5">
                                    <div className={styles.weight}>{curProduct.weight} {curProduct.dimensions.title}</div>
                                    <div className={`${styles.titleBlock} jc-between d-f al-center gap-20`}>
                                        <h3>{curProduct.title}</h3>
                                    </div>
                                </div>
                                <div className="f-column gap-5">
                                    <div className={styles.weight}>Состав</div>
                                    <p className={styles.description}>{curProduct.description || "Описание не заполнено"}</p>
                                </div>
                                <div className="f-column gap-5">
                                    <div className={styles.weight}>в 100 граммах</div>
                                    <div className="d-f gap-20">
                                        <div className="f-column">
                                            <div className={styles.productEnergyItem}>
                                                {curProduct.calories}
                                            </div>
                                            <div className={styles.weight}>Ккал</div>
                                        </div>
                                        <div className="f-column">
                                            <div className={styles.productEnergyItem}>
                                                {curProduct.proteins} г
                                            </div>
                                            <div className={styles.weight}>Белки</div>
                                        </div>
                                        <div className="f-column">
                                            <div className={styles.productEnergyItem}>
                                                {curProduct.fats} г
                                            </div>
                                            <div className={styles.weight}>Жиры</div>
                                        </div>
                                        <div className="f-column">
                                            <div className={styles.productEnergyItem}>
                                                {curProduct.carbohydrates} г
                                            </div>
                                            <div className={styles.weight}>Углеводы</div>
                                        </div>

                                    </div>

                                </div>
                                <div className="f-column gap-5">
                                    <div className={styles.weight}>Условия хранения</div>
                                    <p className={styles.textItem}>{curProduct.storeg_temperature}</p>
                                </div>
                                <div className="f-column gap-5">
                                    <div className={styles.weight}>Срок хранения</div>
                                    <p className={styles.textItem}>{curProduct.sheif_life}</p>
                                </div>

                            </div>
                            {/* <div className={`${additives?.length ? "f-1" : ""} content gap-10 f-column-betw`}>
                                <RenderSupplementsList/>
                            </div> */}
                        </div>
                        <div className={`${styles.additivesBtnWrapper} ${gTheme("lt-white-bg", "dk-gray-bg")} d-f al-end f-1 w-100p`}>
                            <RedButton
                                // onClick={saveMode ? saveProduct : addProduct}
                                onClick={addToCartProduct}
                                disabled={noCount}
                                className={`${styles.additivesBtn} pd-10-0`}>

                                {
                                    !noCount ?
                                        !false ?
                                            <div>
                                                Добавить в корзину за {hasDiscount ? ((curProduct.discount_price || 0)) : curProduct.price} ₽
                                            </div> : "Сохранить"
                                        : <div>Товар закончился</div>
                                }
                            </RedButton>
                        </div>

                    </div>

                </div>
            </WindowBody>
        </ShadowWrapper>
    )
}

export default EditProductVariant;