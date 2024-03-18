import React, { FC } from 'react';
import { ButtonProps, HasChildrenProps, HasClassName } from "../../../types/components.types";
import styles from './redButton.module.scss'
import useTheme from '../../../hooks/useTheme';

const RedButton: FC<HasChildrenProps & HasClassName & ButtonProps> = ({ children, onClick, className, disabled = false }) => {
    const gTheme = useTheme();

    return (
        <button disabled={disabled} onClick={onClick} className={`${className} ${gTheme(`${disabled ? "lt-disabled-lt-bg" : "lt-active-bg"} ${disabled ? "lt-gray-c" : "c-black"}`, "dk-dark-gray-c dk-active-bg")} f-c-col ${styles.button} ${styles.buttonDark}`}>{children}</button>
    );
};

export default RedButton;