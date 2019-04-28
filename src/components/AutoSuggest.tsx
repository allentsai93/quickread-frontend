import * as React from 'react';
import styles from './styles/AutoSuggest.module.css';

type TParams = {
    content: Content[],
    clickEvent: any
}

type Content = {
    id: string;
    name: string;
    description: string;
    category: string;
    language: string;
    country: string;
};

const AutoSuggest = ({content, clickEvent} : TParams) => {
    return (
        <div className={styles.suggestionsBox}>
            {content!.map((source, i) => (
              <span key={i} onClick={() => clickEvent(source.id)}>
                {source.name}{" "}
                <span className={styles.sourceSpan}>News Source</span>
              </span>
            ))}
      </div>
    )
};

export default AutoSuggest;