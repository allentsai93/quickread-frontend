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
import { Carousel } from "react-responsive-carousel";
import useGlobal from "../store";
import { CSSTransition } from "react-transition-group";
import Modal from "../components/Modal";

type Source = {
  id: string;
  name: string;
};

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
};

const Main = (props: any) => {
  const [globalState, globalActions] = useGlobal();
  const { newsDataStatus, newsData, showModal } = globalState;

  React.useEffect(() => {
    let url = "topheadlines";

    if (props.location.search) {
      const searchParams = new URLSearchParams(props.location.search);
      const search = searchParams
        .get("q")!
        .split(" ")
        .join(",");
      const title = searchParams
        .get("q")!
        .split(" ")
        .join(", ");
      url = `sources/news/noparse?q=${search}`;
      document.title = `Teeldr - ${title}`;
    } else {
      document.title = `Teeldr - Top Headlines`;
    }
    globalActions.newsData.getNewsData(url);
  }, []);

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
              {/* <div className={styles.Controls}>
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
                </div> */}
              <div className={styles.listContainer}>
                {newsData && newsData.length > 1 ? (
                  <Carousel
                    showThumbs={false}
                    showStatus={false}
                    showArrows={false}
                    showIndicators={false}
                    centerMode={true}
                    centerSlidePercentage={95}
                    swipeable
                    // onClickItem={handleCarousel}
                    // selectedItem={carouselIndex}
                  >
                    {listOfPosts}
                  </Carousel>
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
