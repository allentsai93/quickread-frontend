import * as React from 'react';
import Content from './Content';
import styles from './styles/Post.module.css';

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
    headline: boolean;
};

const Post = ({ title, subreddit, permalink, url, author, created, domain, ups, image, headline }: TParams) => {
    const [content, setContent] = React.useState(false);

    return (
        <article className={headline ? styles.headlineArticle : styles.article} onClick={() => setContent(!content)}>
            <div className={headline ? styles.headlineContent : styles.content}>
                <span>{`Upvotes: ${ups} Posted by u/${author} ${new Date(created * 1000).getHours()} hours ago`}</span>
                <h4>{subreddit}</h4>
                <h2>{title}</h2>
            </div>
            <div className={`${styles.contentContainer} ${content ? styles.contentContainerActive : ''}`}>
            { content ? 
                <Content 
                    url={url}
                    domain={domain}
                    permalink={permalink}
                />
            : null}
            </div>
            {headline ? <img src={image} className={styles.headlineImg}/> :
                <div className={styles.imgContainer}>
                    <img src={image} className={styles.img}/>
                </div>
            }
        </article>
    )
};

export default Post;