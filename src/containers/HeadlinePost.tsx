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

type NewsSource = {
  query: string;
  status: string;
  articles: NewsPost[];
}

type TParams = {
    posts: NewsSource[];
}
  
const HeadlinePost = ({ posts }: TParams) => {
    return (
        <div className={styles.headlineCarousel}>
        <div className={styles.headlinesContainer}>
          {posts!.slice(0, 1).map((post: any, i: number) => {
            if(post.articles[0].urlToImage) {
            return ( <div key={i} className={styles.headline1}>
              <Post
                title={post.query}
                from={post.articles[0].source.name}
                url={post.articles[0].url}
                author={post.articles[0].source.name}
                created={post.articles[0].publishedAt}
                image={post.articles[0].urlToImage}
                description={''}
                sourceId={post.articles[0].source.id}
                headline
              />
            </div> )
            }
          })}
          <div className={posts!.length > 1 ? styles.subHeadlineContainer : ''}>
            {posts!.slice(1, 3).map(
              (post: any, i: number) => {
                if(post.articles[0].urlToImage) {
                return ( <div key={i}>
                  <Post
                    title={post.query}
                    from={post.articles[0].source.name}
                    url={post.articles[0].url}
                    author={post.articles[0].source.name}
                    created={post.articles[0].publishedAt}
                    image={post.articles[0].urlToImage}
                    description={''}
                    sourceId={post.articles[0].source.id}
                    headline
                  />
                </div> )}
              }
            )}
          </div>
        </div>
      </div>
    )
};

export default HeadlinePost;