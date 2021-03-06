import * as React from 'react';
import Content from './Content';
import styles from './styles/Post.module.css';
import useGlobal from '../store';

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
    const [globalState, globalActions] = useGlobal();

    const contentHandler = (e: any) => {
        if(!headline) {
            // if(!content) {
            //     setContent(true);
            //     globalActions.modalContent.setModal(url);
            // }
            setContent(true);
            globalActions.modalContent.setModal({ title, from, url, author, created, image, headline, description });
        }
        return false;
    }

    const closeContentHandler = (e: any) => {
        setContent(false);
        return false;
    }

    return (
        <li className={headline ? styles.liHeadline : content ? [styles.activeLi, styles.li].join(' ') : styles.li} onClick={contentHandler}>
            <article className={headline ? styles.headlineArticle : content ? [styles.activeArticle, styles.article].join(' ') : styles.article} style={{backgroundImage: `url(${image})`}}>
                <div className={headline ? styles.headlineContent : image ? styles.content : [styles.content, styles.noimgcontent].join(' ') }>
                    {/* <span>{`${author} ${new Date(created * 1000).getHours()} hours ago`}</span> */}
                    {headline ? <h4>{from}</h4> : null}
                    <h2>{title}</h2>
                    <p>{description}</p>
                </div>
                {/* {content ? <span className={styles.closeBtn} onClick={(e: any) => closeContentHandler(e)}>X</span> : null}
                <div className={`${styles.contentContainer} ${content ? styles.contentContainerActive : ''}`}>
                { content ? 
                    <Content 
                        url={url}
                        domain={from}
                    />
                : null}
                </div> */}
                {!headline && image ? 
                    <div className={styles.imgContainer}>
                        <img src={image} className={styles.img}/>
                        <div className={styles.shadowOverlay}></div>
                    </div> : null
                }
            </article>
        </li>
    )
};

export default Post;