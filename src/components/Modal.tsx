import * as React from "react";
import styles from "./styles/Modal.module.css";
import useGlobal from "../store";
import { Carousel } from "react-responsive-carousel";

const Modal = () => {
  const [globalState, globalActions] = useGlobal();
  const { modalContent, showModal } = globalState;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.modal} style={{backgroundImage: `url(${modalContent.lead_image_url})`}}>
          <span
            className={styles.closeModal}
            onClick={() => globalActions.modalContent.closeModal()}
          >
            X
          </span>
          <img className={styles.image} src={modalContent.lead_image_url} alt="article image" />
          <div className={styles.content}>
          <h1>{modalContent.title}</h1>
          <h2>{modalContent.excerpt}</h2>
          {modalContent.error ? (
            <div className={styles.contentContainer}>
                  <h3>Original Article</h3>
                  <p>{modalContent.content}</p>
            </div>
          ) : (
            <Carousel
              showThumbs={false}
              showStatus={false}
              showArrows={false}
              showIndicators={false}
              centerMode={true}
              centerSlidePercentage={95}
              swipeable
            >
              <div className={styles.contentContainer}>
                <h3>Summarized Article</h3>
                <p>{modalContent.condensedContent}</p>
              </div>
              <div className={styles.contentContainer}>
                <h3>Original Article</h3>
                <p>{modalContent.content}</p>
              </div>
            </Carousel>
          )}
          <div className={styles.contentStats}>
            <a href={modalContent.url}>{modalContent.domain || "Source"}</a>
            {!modalContent.error ? (
              <p>Summarized Word Count: {modalContent.condensedWordCount}</p>
            ) : null}
            <p>Original Word Count: {modalContent.originalWordCount}</p>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
