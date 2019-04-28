import * as React from 'react';
import styles from './styles/Card.module.css';
import InputCheckbox from './InputCheckbox';

type tProps = {
  title: string,
  content: Content[],
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

const Card = ({title, content, checkbox} : tProps) => {
    return (
        <div
        key={title}
        className={[styles.catContainer, styles[title]].join(" ")}
      >
        <p>{title}</p>
        <div className={styles.sourceListContainer}>
            {content.map((source:any, i:number) => ( <InputCheckbox id={source.id} name={source.name} key={i} checkboxListener={checkbox}/> ))}
        </div>
      </div>
    )
};

export default Card;