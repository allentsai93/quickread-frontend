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

type MyState = {
  newsData: NewsPost[][];
  headlinePosts: NewsPost[];
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
    newsData: [],
    headlinePosts: [],
    loaded: false,
    showSelection: false,
    showSpinner: false,
    positionX0: 10,
    positionX1: 10,
    positionX2: 10
  };

  componentDidMount() {
    API.getData("http://localhost:3001/topheadlines/").then(data => {
      console.log(data);
      this.setState(prevState => ({
        newsData: [...prevState.newsData, data.articles],
        headlinePosts: data.articles.slice(0, 3),
        loaded: true
      }));
    });
  }

  addPostsHandler = (ev: string) => {
    this.setState({ showSpinner: true, showSelection: false }, () => {
      API.getData(`http://localhost:3001/${ev}/parse`).then(data => {
        this.setState(prevState => ({
          newsData: [...prevState.newsData, data],
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
      let nextState = [...this.state.newsData];
      nextState.splice(index, 1);
      this.setState({
        [pos]: 10,
        newsData: nextState
      });
    } else {
      this.setState({
        [pos]: 10
      });
    }
  }

  render() {
    const listOfPosts = this.state.newsData.map((posts, i) => {
      const pos = `positionX${i}`;
      return (
      <Swipeable
        style={{
          borderLeft: `${this.state[pos]}px solid #630e0e`,
          margin: '10px',
          borderRadius: '10px',
          flex: '3',
          width: 'auto'
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
                  {this.state.headlinePosts!.slice(0, 1).map((post: any, i: number) => (
                    <div key={i} className={styles.headline1}>
                      <Post
                        title={post.title}
                        from={post.source.name}
                        url={post.url}
                        author={post.source.name}
                        created={post.publishedAt}
                        image={post.urlToImage}
                        headline
                      />
                    </div>
                  ))}
                  <div className={styles.subHeadlineContainer}>
                    {this.state.headlinePosts!.slice(1, 3).map(
                      (post: any, i: number) => (
                        <div key={i}>
                          <Post
                            title={post.title}
                            from={post.source.name}
                            url={post.url}
                            author={post.source.name}
                            created={post.publishedAt}
                            image={post.urlToImage}
                            headline
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.listControlContainer}>
              <div className={styles.Controls}>
                  <Button src={add} event={this.showSelectionHandler} />
                  {this.state.showSelection ? (
                    <ul className={styles.activeList}>
                      <li onClick={() => this.addPostsHandler("news")}>
                        Option 1
                      </li>
                      <li onClick={() => this.addPostsHandler("anythinggoesnews")}>
                        Option 2
                      </li>
                      <li onClick={() => this.addPostsHandler("truereddit")}>
                        Option 3
                      </li>
                      <li onClick={() => this.addPostsHandler("redditdotcom")}>
                        Option 4
                      </li>
                    </ul>
                  ) : <ul></ul>}
                </div>
                <div className={styles.listContainer}>
                  {listOfPosts}
                  {this.state.showSpinner ? (
                    <div className={styles.loadingContainerMore}>
                      <img src={spinner} />
                    </div>
                  ) : null}
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
