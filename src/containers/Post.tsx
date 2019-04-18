import * as React from 'react';
import Content from './Content';
import styles from './styles/Post.module.css';

type TParams =  { 
    title: string;
    from: string;
    url: string;
    author: string;
    created: number;
    image: string;
    headline: boolean;
};

const Post = ({ title, from, url, author, created, image, headline }: TParams) => {
    const [content, setContent] = React.useState(false);
    const showContent = !headline ? () => setContent(!content) : () => {};
    return (
        <article className={headline ? styles.headlineArticle : styles.article} onClick={showContent} style={{backgroundImage: `url(${image})`}}>
            <div className={headline ? styles.headlineContent : styles.content}>
                {/* <span>{`${author} ${new Date(created * 1000).getHours()} hours ago`}</span> */}
                {headline ? <h4>{from}</h4> : null}
                <h2>{title}</h2>
            </div>
            <div className={`${styles.contentContainer} ${content ? styles.contentContainerActive : ''}`}>
            { content ? 
                <Content 
                    url={url}
                    domain={from}
                />
            : null}
            </div>
            {headline ? null :
                <div className={styles.imgContainer}>
                    <img src={image} className={styles.img}/>
                </div>
            }
        </article>
    )
};

export default Post;