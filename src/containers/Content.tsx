import * as React from 'react';
import API from '../service/api';
import styles from './styles/Content.module.css';

type TParams = {
    url: string;
    permalink: string;
    domain: string;
}

const Content = ({url, permalink, domain} : TParams) => {
    const [data, setData] = React.useState<null | {title: string, author: any, date_published: string, lead_image_url: string, originalWordCount: number, condensedWordCount: number, condensedContent: string, percentCondensed: string}>(null);

    React.useEffect(() => {
        API.getData(`http://localhost:3001/${url}`).then(data => {
            setData(data);
        })
    }, []);

    return (
        <div>
            { data ? 
                <>
                    {data.lead_image_url ? <img src={data.lead_image_url}/> : null}
                    {data.condensedContent ? <p>{data.condensedContent}</p> : <p>Sorry, the article content could not be scraped.</p>}
                    <h3>{`Published ${data.date_published} by ${data.author}`}</h3>
                    <span className={styles.data}>
                        <span>{`Condensed word count: ${data.condensedWordCount}, Original word count: ${data.originalWordCount}`}</span>
                        <span>{`Article Link: ${url}, Reddit Link: ${permalink}`}</span>
                        <span>{`Scraped from ${url}`}</span>
                    </span>
                </>
            : <p>Summarizing...</p>
            }
        </div>
    )
}

export default Content;