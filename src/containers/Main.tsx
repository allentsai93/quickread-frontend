import React, { Component } from "react";
import API from "../service/api";
import Post from "./Post";
import styles from "./styles/Main.module.css";
import subtract from "../assets/sharp-delete_sweep-24px.svg";
import add from "../assets/sharp-add_circle-24px.svg";
import Button from "../components/Button";
import spinner from "../assets/spinner.svg";
import ListPosts from "./ListPosts";
declare const require:(moduleId:string) => any;
const { Swipeable } = require('react-swipeable');

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
  headlinePosts: RedditPost[];
  loaded: boolean;
  showSelection: boolean;
  showSpinner: boolean;
  positionX0: any;
  positionX1: any;
  positionX2: any;
  [key: string]: any;
};
class Main extends Component<{}, MyState> {
  state: MyState = {
    redditData: [],
    headlinePosts: [],
    loaded: false,
    showSelection: false,
    showSpinner: false,
    positionX0: 10,
    positionX1: 10,
    positionX2: 10
  };

  componentDidMount() {
    API.getData("http://localhost:3001/news/parse").then(data => {
      this.setState(prevState => ({
        redditData: [...prevState.redditData, data],
        headlinePosts: data.slice(0, 3),
        loaded: true
      }));
    });
  }

  addPostsHandler = (ev: string) => {
    this.setState({ showSpinner: true, showSelection: false }, () => {
      API.getData("http://localhost:3001/news/parse").then(data => {
        this.setState(prevState => ({
          redditData: [...prevState.redditData, data],
          showSpinner: false
        }));
      });
    });
  };

  showSelectionHandler = () => {
    this.setState(prevState => ({ showSelection: !prevState.showSelection }));
  };

  onSwipeMove = (event: any, pos: string) => {
    if(event.absX >= 10 && event.absX <= 150 && event.dir === 'Right') {
      this.setState({
        [pos]: event.absX
      })
    }
  }

  onSwipeEnd = (pos: string, index: number) => {
    if(this.state[pos] >= 100) {
      let nextState = [...this.state.redditData];
      nextState.splice(index, 1);
      this.setState({
        [pos]: 10,
        redditData: nextState
      });
    } else {
      this.setState({
        [pos]: 10
      });
    }
  }

  render() {
    const listOfPosts = this.state.redditData.map((posts, i) => {
      const pos = `positionX${i}`;
      return (
      <Swipeable
        style={{
          borderLeft: `${this.state[pos]}px solid #630e0e`,
          margin: '10px',
          borderRadius: '10px'
        }}
        trackMouse
        onSwiping={(e: any) => { this.onSwipeMove(e, pos); }}
        onSwiped={() => { this.onSwipeEnd(pos, i); }}
        key={i}>
        <ListPosts posts={posts} />
      </Swipeable>
    )});

    return (
      <>
        {this.state.loaded ? (
          <>
            <div className={styles.container}>
              <div className={styles.headlineCarousel}>
                <div className={styles.headlinesContainer}>
                  {this.state.headlinePosts!.slice(0, 1).map((post: any) => (
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
                    {this.state.headlinePosts!.slice(1, 3).map(
                      (post: any) => (
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
                <div className={styles.listContainer}>
                  {listOfPosts}
                  {this.state.showSelection ? (
                    <ul>
                      <li onClick={() => this.addPostsHandler("test")}>
                        Option 1
                      </li>
                      <li onClick={() => this.addPostsHandler("test")}>
                        Option 2
                      </li>
                      <li onClick={() => this.addPostsHandler("test")}>
                        Option 3
                      </li>
                      <li onClick={() => this.addPostsHandler("test")}>
                        Option 4
                      </li>
                    </ul>
                  ) : null}
                  {this.state.showSpinner ? (
                    <div className={styles.loadingContainerMore}>
                      <img src={spinner} />
                    </div>
                  ) : null}
                </div>
                <div className={styles.buttonContainer}>
                  <Button src={add} event={this.showSelectionHandler} />
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
