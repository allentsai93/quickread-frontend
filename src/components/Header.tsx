import * as React from 'react';
import { Link } from "react-router-dom";
import styles from './styles/Header.module.css';


const Header = (props: any) => {
    return (
        <header className={props.className || styles.header}>
          {props.logo ? <Link to="/" className={styles.logo}>Teeldr<span className={styles.beta}>Beta</span></Link> : null}
          {props.children}
        </header>
    )
};

export default Header;