import * as React from "react";
import API from "../service/api";
import Post from "./Post";
import styles from "./styles/Main.module.css";

const Main: React.FC = () => {
  const [redditData, setRedditData] = React.useState<null | []>([]);

  React.useEffect(() => {
    API.getData("https://www.reddit.com/r/news.json").then(data => {
      setRedditData(data.data.children);
    });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.headlinesContainer}>
        {redditData!.slice(0, 1).map((post: any, i) => (
          <div key={post.data.id} className={styles.headline1}>
            <Post
              title={post.data.title}
              subreddit={post.data.subreddit}
              permalink={post.data.permalink}
              url={post.data.url}
              author={post.data.author}
              created={post.data.created}
              domain={post.data.domain}
              ups={post.data.ups}
            />
          </div>
        ))}
        <div className={styles.subHeadlineContainer}>
          {redditData!.slice(1, 3).map((post: any, i) => (
            <div key={post.data.id}>
              <Post
                title={post.data.title}
                subreddit={post.data.subreddit}
                permalink={post.data.permalink}
                url={post.data.url}
                author={post.data.author}
                created={post.data.created}
                domain={post.data.domain}
                ups={post.data.ups}
              />
            </div>
          ))}
        </div>
      </div>
      <ul className={styles.ul}>
        {redditData!.slice(3).map((post: any) => (
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
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Main;
