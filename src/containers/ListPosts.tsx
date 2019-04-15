import * as React from 'react';
import styles from './styles/ListPosts.module.css';
import Post from "./Post";


const ListPosts = ({posts} : any) => {
    return (
        <ul className={styles.ul}>
        <h2 className={styles.subreddit}>{posts[0].data.subreddit}</h2>
        {posts.map((post: any) => (
          <li className={styles.li} key={post.data.id}>
            <Post
              title={post.data.title}
              subreddit={post.data.subreddit}
              permalink={post.data.permalink}
              url={post.data.url}
              author={post.data.author}
              created={post.data.created}
              domain={post.data.domain}
              ups={post.data.ups}
              image={post.data.parsed.lead_image_url}
              headline={false}
            />
          </li>
        ))}
      </ul>
    )
};

export default ListPosts;