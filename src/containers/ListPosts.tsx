import * as React from 'react';
import styles from './styles/ListPosts.module.css';
import Post from "./Post";


const ListPosts = ({posts} : any) => {
    return (
        <ul className={styles.ul}>
        {/* <h2 className={styles.subreddit}>{posts[0].data.subreddit}</h2> */}
        {posts.map((post: any, i: number) => (
          <li className={styles.li} key={i}>
            <Post
              title={post.title}
              from={post.source.name}
              url={post.url}
              author={post.source.name}
              created={post.publishedAt}
              image={post.urlToImage}
              headline={false}
            />
          </li>
        ))}
      </ul>
    )
};

export default ListPosts;