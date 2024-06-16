import React from 'react';
import styles from "../../pages/Main/main.module.scss";
import { GulicatLongLogo, VkIcon } from "../../icons";
import { Link } from "react-router-dom";
import { useAppSelector } from '../../app/hooks';
import { formatPhoneNumber } from '../../utils/forms/formatePhone';
import useTheme from '../../hooks/useTheme';

const Footer = () => {
    const { phone } = useAppSelector(state => state.main)

    const gTheme = useTheme()

    return (
        <footer className={`${styles.footer} ${gTheme("lt-light-black-bg", "dk-gray-bg")} pd-40-0`}>
            <div className="wrapper">
                <div className={`${styles.block} gap-40 f-column`}>
                    <nav className={"d-f jc-between flex-wrap"}>
                        <div className={`${styles.navColumn} ${styles.navLogoColumn} f-column gap-10`}>
                            <Link to={"/"}>
                                <GulicatLongLogo fill={"white"} />
                            </Link>
                            <Link className={styles.navItem} to={"/empty"}>О нас</Link>
                        </div>
                        <div className={`${styles.navColumn} f-column gap-10`}>
                            <b className={styles.navItem}>Документы</b>
                            <Link className={styles.navItem} to={"/public-selling"}>Публичная оферта</Link>
                            <Link className={styles.navItem} to={"/user-document"}>Пользовательское соглашение</Link>
                        </div>
                        <div className={`${styles.navColumn} ${styles.navColumnContacts} f-column gap-10`}>
                            <b className={styles.navItem}>Контакты</b>
                            <a className={styles.navItem} href="mailto:artem.tikhomirov22@gmai.com">artem.tikhomirov22@gmai.com</a>
                            <a className={styles.navItem} href={`tel:${phone}`}>{formatPhoneNumber(phone)}</a>
                            <div className={`${styles.socials} d-f gap-10`}>
                                <a target={"_blank"} href="https://vk.com/gulyakin86" className={`${styles.item} f-c-col`}>
                                    <VkIcon />
                                </a>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </footer>
    );
};

export default Footer;