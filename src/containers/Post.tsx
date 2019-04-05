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
};

const Post = ({ title, subreddit, permalink, url, author, created, domain, ups }: TParams) => {
    const [content, setContent] = React.useState(false);

    return (
        <article className={styles.article} onClick={() => setContent(!content)}>
            <span>{`Upvotes: ${ups} Posted by u/${author} ${new Date(created * 1000).getHours()} hours ago`}</span>
            <h4>{subreddit}</h4>
            <h2>{title}</h2>
            { content ? 
                <Content 
                    url={url}
                    domain={domain}
                    permalink={permalink}
                />
            : null}
        </article>
    )
};

export default Post;