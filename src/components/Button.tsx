import * as React from 'react';
import styles from './styles/Button.module.css';

type TParams = {
    src: string
}

const Button = ({ src } : TParams) => {
    return (
        <span className={styles.Button}>
            <img src={src} />
        </span>
    )
};

export default Button;