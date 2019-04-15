import * as React from 'react';
import styles from './styles/Button.module.css';

type TParams = {
    src: string;
    event: (ev: any) => void;
}

const Button = ({ src, event } : TParams) => {
    return (
        <span className={styles.Button} onClick={event}>
            <img src={src} />
        </span>
    )
};

export default Button;