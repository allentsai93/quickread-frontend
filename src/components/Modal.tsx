import * as React from "react";
import styles from "./styles/Modal.module.css";
import useGlobal from "../store";
import spinner from "../assets/spinner.svg";
import SwipeableViews from 'react-swipeable-views';
import Header from "./Header";

const Modal = () => {
  const [globalState, globalActions] = useGlobal();
  const { modalContent, showModal, modalLoaded } = globalState;

  return (
    <>
      <div className={styles.container}>
        <div
          className={styles.modal}
        >
        <Header logo={false} className={styles.header}>
        <span
            className={styles.closeModal}
            onClick={() => globalActions.modalContent.closeModal()}
          >
            Back
          </span>
        </Header>
          <div className={styles.heroContainer}>
            <img
              className={styles.image}
              src={modalContent.image}
              alt="article image"
            />
            <div className={styles.heroText}>
              <h1>{modalContent.title}</h1>
            </div>
          </div>
          <div className={modalLoaded ? [styles.content, styles.loadedContent].join(' ') : styles.content}>
            <h2>{modalContent.description || modalContent.excerpt}</h2>
            {modalLoaded ? (
              <>
                <div className={styles.contentStats}>
                  <a target="_blank" href={modalContent.url}>
                    {modalContent.domain || "Source"}
                  </a>
                  {!modalContent.error ? (
                    <span>
                      Summarized Word Count: {modalContent.condensedWordCount}
                    </span>
                  ) : null}
                  <span>Original Word Count: {modalContent.originalWordCount}</span>
                </div>
                {modalContent.error ? (
                  <div className={styles.contentContainer}>
                    <h3>Original Article</h3>
                    <p>{modalContent.content}</p>
                  </div>
                ) : (
                  <SwipeableViews
                  >
                    <div className={styles.contentContainer}>
                      <h3>Summarized Article</h3>
                      <p>{modalContent.condensedContent}</p>
                    </div>
                    <div className={styles.contentContainer}>
                      <h3>Original Article</h3>
                      <p>{modalContent.content}</p>
                    </div>
                  </SwipeableViews>
                )}
              </>
            ) : (
              <div className={styles.loading}>
                <img src={spinner} className={styles.loadingIcon} alt="loading" />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
