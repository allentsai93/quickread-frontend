import React, { Component } from "react";
import API from "../service/api";
import Post from "./Post";
import styles from "./styles/Main.module.css";
import subtract from "../assets/sharp-delete_sweep-24px.svg";
import add from "../assets/sharp-add_circle-24px.svg";
import Button from "../components/Button";
import spinner from "../assets/spinner.svg";
import ListPosts from "./ListPosts";

type RedditPost = {
  data: {
    id: string;
    title: string;
    subreddit: string;
    permalink: string;
    url: string;
    author: string;
    created: number;
    domain: string;
    ups: number;
    parsed: {
      lead_image_url: string;
    };
  };
};

type MyState = {
  redditData: RedditPost[][];
  loaded: boolean;
};
class Main extends Component<{}, MyState> {
  state: MyState = {
    redditData: [],
    loaded: false
  };

  componentDidMount() {
    API.getData("http://localhost:3001/news/parse").then(data => {
      this.setState(prevState => ({
        redditData: [...prevState.redditData, data],
        loaded: true
      }));
    });
  }

  addPostsHandler = () => {
    console.log('hit');
  }

  render() {
    const listOfPosts = this.state.redditData.map((posts, i) => (
      <ListPosts posts={posts} key={i} />
    ));

    return (
      <>
        {this.state.loaded ? (
          <>
            <div className={styles.container}>
              <div className={styles.headlineCarousel}>
                <div className={styles.headlinesContainer}>
                  {this.state.redditData[0]!.slice(0, 1).map((post: any, i) => (
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
                        image={post.data.parsed.lead_image_url}
                        headline
                      />
                    </div>
                  ))}
                  <div className={styles.subHeadlineContainer}>
                    {this.state.redditData[0]!.slice(1, 3).map(
                      (post: any, i) => (
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
                            image={post.data.parsed.lead_image_url}
                            headline
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.listControlContainer}>
                <div className={styles.buttonContainer}>
                  <Button src={subtract} event={this.addPostsHandler}/>
                </div>
                <div className={styles.listContainer}>
                  {listOfPosts}
                </div>
                <div className={styles.buttonContainer}>
                  <Button src={add} event={this.addPostsHandler}/>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className={styles.loadingContainer}>
            <img src={spinner} />
          </div>
        )}
      </>
    );
  }
}

export default Main;
