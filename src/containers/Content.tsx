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
        }).catch(err => {
            const testData = {
                title: 'This is a test title',
                author: 'Test McTesty',
                date_published: 'April 51, 2019',
                lead_image_url: '',
                originalWordCount: 323,
                condensedWordCount: 123,
                condensedContent: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
                percentCondensed: '47%'
            }
            setData(testData)
        })
    }, []);

    return (
        <div>
            { data ? 
                <div className={styles.scrapedContent}>
                    {data.lead_image_url ? <img src={data.lead_image_url}/> : null}
                    {data.condensedContent ? <p>{data.condensedContent}</p> : <p>Sorry, the article content could not be scraped.</p>}
                    <h3>{`Published ${data.date_published} by ${data.author}`}</h3>
                    <span className={styles.data}>
                        <span className={styles.datatext}>{`Condensed word count: ${data.condensedWordCount}, Original word count: ${data.originalWordCount}`}</span>
                        <span className={styles.datatext}>{`Article Link: `}<a href={url}>{url}</a></span>
                        <span className={styles.datatext}>{`Reddit Link: `}<a href={permalink}>{permalink}</a></span>
                        <span className={styles.datatext}>{`Scraped from: `}<a href={url}>{url}</a></span>
                    </span>
                </div>
            : <p>Summarizing...</p>
            }
        </div>
    )
}

export default Content;