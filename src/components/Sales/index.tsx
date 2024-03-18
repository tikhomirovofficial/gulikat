import React, { useRef, useState } from 'react';
import styles from "./sales.module.scss";
import { Link } from "react-router-dom";
import { getImgPath } from "../../utils/common/getAssetsPath";
import { ArrowRight, SafeArrowIcon } from "../../icons";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { SwiperProps } from "swiper/swiper-react";
import useTheme from '../../hooks/useTheme';
import useAppColor from '../../hooks/useAppColor';
import { useAppSelector } from '../../app/hooks';
import { SaleItem } from './SaleItem';

const Sales = () => {
    const salesSliderRef = useRef<SwiperProps>(null)
    const gTheme = useTheme()
    
    const { salesProductsLoading, sales_products } = useAppSelector(state => state.products)
    const [currentSlide, setCurrentSlide] = useState<number>(0)
    const handleNext = () => {
        salesSliderRef.current.swiper.slideNext();
    }

    const handlePrev = () => {
        salesSliderRef.current.swiper.slidePrev();
    }


    return (
        <div className={`${styles.promo}`}>
            <div className="wrapper">
                <div className="block f-column">
                    <div className={`${styles.promos} w-100p p-rel`}>
                        <Swiper
                            spaceBetween={20}
                            onActiveIndexChange={(slider: SwiperProps) => {
                                setCurrentSlide(slider.activeIndex)
                            }}
                            ref={salesSliderRef}
                            slidesPerView={"auto"} className={`${styles.container} w-100 f-row-betw`}>
                            {
                                sales_products.map(item => (
                                    <SwiperSlide className={styles.item}>
                                        <SaleItem key={item.id} {...item}/>
                                    </SwiperSlide>
                                ))
                            }



                        </Swiper>
                        {/* <div
                            className={`${styles.arrowWrapper} ${styles.salesArrowRight}  promosArrowWrapper h-100p f-c-col p-abs right-0 top-0`}>
                            <div onClick={handleNext} className={`${styles.arrow} f-c-col`}>
                                <div className={`w-content h-content`}>
                                    <SafeArrowIcon width={7} />
                                </div>

                            </div>
                        </div>
                        <div
                            className={`${styles.arrowWrapper}   ${styles.salesArrowLeft}  promosArrowWrapper h-100p f-c-col p-abs left-0 top-0`}>
                            <div onClick={handlePrev} className={`${styles.arrow} f-c-col`}>
                                <div style={{ transform: `rotateZ(180deg)`, marginTop: -3 }} className={`w-content h-content`}>
                                    <SafeArrowIcon width={7} />
                                </div>

                            </div>
                        </div> */}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Sales;