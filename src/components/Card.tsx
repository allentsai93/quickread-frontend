import * as React from 'react';
import styles from './styles/Card.module.css';
import InputCheckbox from './InputCheckbox';

type tProps = {
  title: string,
  // content: Content[],
  checkbox: any
}

type Content = {
    id: string;
    name: string;
    description: string;
    category: string;
    language: string;
    country: string;
};

const Card = ({title, checkbox} : tProps) => {
    return (
        <div
        className={[styles.catContainer, styles[title]].join(" ")}
      >
            <InputCheckbox id={title} name={title} checkboxListener={checkbox}/>
      </div>
    )
};

export default Card;