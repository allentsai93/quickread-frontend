import * as React from 'react';
import styles from './styles/HeadlinePost.module.css';
import Post from './Post';

type Source = {
    id: string;
    name: string;
}

type NewsPost = {
    data: {
      source: Source;
      title: string;
      url: string;
      author: string;
      publishedAt: string;
      urlToImage: string;
      description: string;
      content: string;
    };
};

type TParams = {
    posts: NewsPost[];
}
  
const HeadlinePost = ({ posts }: TParams) => {
    return (
        <div className={styles.headlineCarousel}>
        <div className={styles.headlinesContainer}>
          {posts!.slice(0, 1).map((post: any, i: number) => (
            <div key={i} className={styles.headline1}>
              <Post
                title={post.title}
                from={post.source.name}
                url={post.url}
                author={post.source.name}
                created={post.publishedAt}
                image={post.urlToImage}
                description={''}
                headline
              />
            </div>
          ))}
          <div className={styles.subHeadlineContainer}>
            {posts!.slice(1, 3).map(
              (post: any, i: number) => (
                <div key={i}>
                  <Post
                    title={post.title}
                    from={post.source.name}
                    url={post.url}
                    author={post.source.name}
                    created={post.publishedAt}
                    image={post.urlToImage}
                    description={''}
                    headline
                  />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    )
};

export default HeadlinePost;