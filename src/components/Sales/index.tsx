import React, { useRef, useState } from 'react';
import styles from "./sales.module.scss";
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

    const { sales_products } = useAppSelector(state => state.products)
    const [currentSlide, setCurrentSlide] = useState<number>(0)


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
                                        <SaleItem key={item.id} {...item} />
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sales;