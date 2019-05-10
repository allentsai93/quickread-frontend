import React from "react";
import styles from "./styles/Main.module.css";
import subtract from "../assets/sharp-delete_sweep-24px.svg";
import add from "../assets/sharp-add_circle-24px.svg";
import Button from "../components/Button";
import spinner from "../assets/spinner.svg";
import ListPosts from "./ListPosts";
import Header from "../components/Header";
import HeadlinePost from "./HeadlinePost";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import useGlobal from "../store";
import { CSSTransition } from "react-transition-group";
import Modal from "../components/Modal";
import SwipeableViews from 'react-swipeable-views';

type Source = {
  id: string;
  name: string;
};

type NewsPost = {
    source: Source;
    title: string;
    url: string;
    author: string;
    publishedAt: string;
    urlToImage: string;
    description: string;
    content: string;
};

type NewsSource = {
  query: string;
  status: string;
  articles: NewsPost[];
};

const Main = (props: any) => {
  const [globalState, globalActions] = useGlobal();
  const { newsDataStatus, newsData, showModal, categories } = globalState;
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    let url = "topheadlines";

    if (props.location.search) {
      const searchParams = new URLSearchParams(props.location.search);
      const search = searchParams
        .get("category")!
        .split(" ")
        .join(",");
      const title = searchParams
        .get("category")!
        .split(" ")
        .join(", ");
      url = `topheadlines?category=${search}`;
      document.title = `Teeldr - ${title}`;
    } else {
      document.title = `Teeldr - Top Headlines`;
    }
    globalActions.newsData.getNewsData(url);
  }, []);

  const changedIndex = (e: any) => {
    setIndex(e);
  }

  const addNewList = () => {

  }

  const listOfPosts =
    newsDataStatus == "SUCCESS"
      ? newsData.map((source: NewsSource, i: number) => (
          <ListPosts key={i} posts={source.articles} query={source.query} />
        ))
      : null;

  return (
    <>
      <Header />
      {newsDataStatus == "SUCCESS" ? (
        <>
          <div className={[styles.container, "main-page"].join(" ")}>
            <HeadlinePost posts={newsData} />
            <div className={styles.listControlContainer}>
              <div className={styles.controls}>
                <span onClick={addNewList} className={styles.control}>+</span>
                {newsData ? newsData.map((source: NewsSource, i: number) => (
                  <span key={i} onClick={() => setIndex(i)} className={index === i ? [styles.active, styles.control].join(' ') : styles.control}>{source.query}</span>
                )) : null}
              </div>
              <div className={styles.listContainer}>
                {newsData && newsData.length > 1 ? (
                  <SwipeableViews
                    index={index}
                    onChangeIndex={changedIndex}
                    animateHeight={true}
                  >
                    {listOfPosts}
                  </SwipeableViews>
                ) : (
                  listOfPosts
                )}
                {/* {this.state.showSpinner ? (
                    <div className={styles.loadingContainerMore}>
                      <img src={spinner} />
                    </div>
                  ) : null} */}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className={styles.loadingContainer}>
          <img src={spinner} />
        </div>
      )}
      <CSSTransition
        in={showModal}
        classNames={{
          exit: styles["exitModal"],
          enter: styles["enterModal"],
          enterActive: styles["enterActiveModal"],
          exitActive: styles["exitActiveModal"]
        }}
        timeout={150}
        mountOnEnter
        unmountOnExit
        appear
      >
        <Modal />
      </CSSTransition>
    </>
  );
};

export default Main;
