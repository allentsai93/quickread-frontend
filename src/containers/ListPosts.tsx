import * as React from 'react';
import styles from './styles/ListPosts.module.css';
import Post from "./Post";


const ListPosts = ({posts, query} : any) => {
    return (
        <ul className={styles.ul}>
        <li className={styles.categoryTitle}>{query}</li>
        {posts.map((post: any, i: number) => (
            <Post
              title={post.title}
              from={post.source.name}
              url={post.url}
              author={post.source.name}
              created={post.publishedAt}
              image={post.urlToImage}
              description={post.description}
              headline={false}
            />
        ))}
      </ul>
    )
};

export default ListPosts;