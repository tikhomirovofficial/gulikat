import React from 'react';
import styles from '../documents.module.scss'
import useTheme from '../../../hooks/useTheme';

const UserDocument = () => {
    const gTheme = useTheme()
    return (
        <div className={"pageTop"}>
            <div className="wrapper">
                <div className="emptyBlock f-column gap-40">
                    <div className={`sectionTitle ${gTheme("lt-coal-c", "dk-gray-c")}`}>
                        Пользовательское соглашение
                    </div>
                    <p className={`${styles.text} ${gTheme("lt-c", "dk-c")}`}>
                        Здесь будет размещена информация.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserDocument;