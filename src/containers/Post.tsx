import * as React from 'react';
import Content from './Content';
import styles from './styles/Post.module.css';

type TParams =  { 
    title: string;
    from: string;
    url: string;
    author: string;
    created: number;
    description: string;
    image: string;
    headline: boolean;
};

const Post = ({ title, from, url, author, created, image, headline, description }: TParams) => {
    const [content, setContent] = React.useState(false);

    const contentHandler = (e: any) => {
        e.stopPropagation();
        if(!headline) {
            if(!content) {
                setContent(true);
            }
        }
        return false;
    }

    const closeContentHandler = (e: any) => {
        e.stopPropagation();
        setContent(false);
        return false;
    }

    return (
        <article className={headline ? styles.headlineArticle : content ? [styles.activeArticle, styles.article].join(' ') : styles.article} onClick={contentHandler} style={{backgroundImage: `url(${image})`}}>
            <div className={headline ? styles.headlineContent : styles.content}>
                {/* <span>{`${author} ${new Date(created * 1000).getHours()} hours ago`}</span> */}
                {headline ? <h4>{from}</h4> : null}
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
            {content ? <span className={styles.closeBtn} onClick={(e: any) => closeContentHandler(e)}>X</span> : null}
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