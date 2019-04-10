import * as React from 'react';
import API from '../service/api';
import styles from './styles/HeadlinePost.module.css';

type TParams =  { 
    title: string;
    subreddit: string;
    permalink: string;
    url: string;
    author: string;
    created: number;
    domain: string;
    ups: number;
    image: string;
};


const HeadlinePost = ({ title, subreddit, permalink, url, author, created, domain, ups, image }: TParams) => {
    const [content, setContent] = React.useState(false);
    const [data, setData] = React.useState<null | {title: string, author: any, date_published: string, lead_image_url: string, originalWordCount: number, condensedWordCount: number, condensedContent: string, percentCondensed: string}>(null);

    React.useEffect(() => {
        if(!data) {
            API.getData(`http://localhost:3001/summarize/${url}`).then(data => {
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
        }
    }, []);

    return (
        <article className={styles.article} onClick={() => setContent(!content)}>
            <div className={styles.headlineContent}>
                <span>{`Upvotes: ${ups} Posted by u/${author} ${new Date(created * 1000).getHours()} hours ago`}</span>
                <h4>{subreddit}</h4>
                <h2>{title}</h2>
            </div>
            { content && data ? 
                <p>{data.condensedContent}</p>
            : null}
                <img src={image} className={styles.img}/>
        </article>
    )
};

export default HeadlinePost;