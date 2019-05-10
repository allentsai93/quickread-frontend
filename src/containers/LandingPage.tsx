import * as React from "react";
import styles from "./styles/LandingPage.module.css";
import searchIcon from "../assets/search.svg";
import { CSSTransition } from "react-transition-group";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Typist from "react-typist";
import Card from "../components/Card";
import AutoSuggest from "../components/AutoSuggest";
import useGlobal from '../store';

type Content = {
  id: string;
  name: string;
  description: string;
  category: string;
  language: string;
  country: string;
};

type Source = {
  category: string;
  content: Content[];
};

const LandingPage = (props: any) => {
  const [globalState, globalActions] = useGlobal();
  const { categoriesStatus, categories } = globalState;
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [showSubmit, setShowSubmit] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchSource, setSearchSource] = React.useState("");
  const [checkboxInputs, setCheckboxInputs] = React.useState<string[]>([]);
  const [autoSuggest, setAutoSuggest] = React.useState<null | Content[]>(null);
  const [uncategorizedData, setUncategorizedData] = React.useState< null | Content[]>(null);
  const [carouselIndex, setCarouselIndex] = React.useState(0);
  const [formSubmit, showFormSubmit] = React.useState(false);

  React.useEffect(() => {
    globalActions.categories.getCategories();
    flattenCategories();
    document.title = "Teeldr - Too Long; Did Read";
    document.body.classList.add('background-teal');
  }, []);

  React.useEffect(() => {
    if (checkboxInputs.length) {
      showFormSubmit(true);
    } else {
      showFormSubmit(false);
    }
  }, [checkboxInputs]);

  const flattenCategories = () => {
    const flattenData = [];
    for (let i = 0; i < categories.length; i++) {
      for (let j = 0; j < categories[i].content.length; j++) {
        flattenData.push(categories[i].content[j]);
      }
    }
    setUncategorizedData(flattenData);
  }

  const searchHandler = (term: any) => {
    setSearchTerm(term);
    if (term.length >= 3) {
      setShowSubmit(true);
      setAutoSuggestions(term);
    } else {
      setShowSubmit(false);
      setAutoSuggestions("");
    }
  };

  const setAutoSuggestions = (input: string) => {
    if (input !== "") {
      const filteredSources = uncategorizedData!.filter(source =>
        source.name.toLowerCase().includes(input)
      );
      if (filteredSources.length) {
        setAutoSuggest(filteredSources);
        setShowSuggestions(true);
      } else {
        setShowSuggestions(false);
      }
    } else {
      setAutoSuggest([]);
      setShowSuggestions(false);
    }
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
  };

  const handleCheckbox = (id: string) => {
    if (checkboxInputs!.indexOf(id) !== -1) {
      const newCheckboxInputs = [...checkboxInputs];
      newCheckboxInputs.splice(newCheckboxInputs.indexOf(id), 1);
      setCheckboxInputs(newCheckboxInputs);
    } else {
      setCheckboxInputs([...checkboxInputs, id]);
    }
  };

  const handleCarousel = (index: number) => {
    setCarouselIndex(index);
  };

  const handleForm = (ev: any) => {
    const queries = [...checkboxInputs].join("+");
    const query = `?category=${queries}`;
    props.history.push(`/news${query}`);
  };

  return (
    <div className={[styles.container, "landing-page"].join(" ")}>
      <div className={styles.landingHeader}>
        <div className={styles.company}>
          <h1>Teeldr</h1>
          <h2>Too Long; Did Read</h2>
        </div>
        <div className={styles.landingCopy}>
          <p>Every day news summarized by robots hard at work.</p>
        </div>
      </div>

      <div className={styles.options}>
        <form className={styles.filterForm}>
          {categoriesStatus == "SUCCESS" && categories && (
            // <Carousel
            //   showThumbs={false}
            //   showStatus={false}
            //   showArrows={false}
            //   showIndicators={false}
            //   centerMode={true}
            //   centerSlidePercentage={50}
            //   swipeable
            //   className={styles.carousel}
            //   onClickItem={handleCarousel}
            //   selectedItem={carouselIndex}
            // >
            //   {categories!.map((cat: Source, i: number) => (
            //     <Card
            //       title={cat.category}
            //       key={cat.category + i.toString()}
            //       content={cat.content}
            //       checkbox={handleCheckbox}
            //     />
            //   ))}
            // </Carousel>
            <>
            {categories!.map((cat: Source, i: number) => (
                <Card
                  title={cat.category}
                  key={cat.category + i.toString()}
                  // content={cat.content}
                  checkbox={handleCheckbox}
                />
            ))}
            </>
          )}
        </form>
      </div>
      {/* <div className={styles.inputContainer}>
        <form>
          <input
            type={"text"}
            value={searchTerm}
            placeholder={"Search for a topic or source"}
            onChange={e => searchHandler(e.target.value)}
          />
          <CSSTransition
            in={showSubmit}
            classNames={{
              exit: styles["exit"],
              enter: styles["enter"],
              enterActive: styles["enterActive"],
              exitActive: styles["exitActive"]
            }}
            timeout={1000}
            mountOnEnter
            unmountOnExit
            appear
          >
            <button type={"submit"} onSubmit={submitHandler}>
              <img src={searchIcon} />
            </button>
          </CSSTransition>
        </form>
        <CSSTransition
          in={showSuggestions}
          classNames={{
            exit: styles["exitSuggestions"],
            enter: styles["enterSuggestions"],
            enterActive: styles["enterActiveSuggestions"],
            exitActive: styles["exitActiveSuggestions"]
          }}
          timeout={500}
          mountOnEnter
          unmountOnExit
          appear
        >
          {autoSuggest ? (
            <AutoSuggest clickEvent={setSearchSource} content={autoSuggest!} />
          ) : (
            <></>
          )}
        </CSSTransition>
      </div> */}
      {/* {checkboxInputs ? 
      message!.split(', ').map(msg => <Typist className={styles.Typist} key={generateKey(msg)} cursor={{hideWhenDone: true}} >
        <span>{msg}</span>
      </Typist>) : null} */}
      {formSubmit ? (
        <div onClick={handleForm} className={styles.submitBtn}>
          Search
        </div>
      ) : (
        // <div onClick={handleForm} className={styles.randomContainer}>
        //   <p>Pick as many sources as you want</p>
        //   <div className={styles.randomBtn}>Or randomize it</div>
        // </div>
        null
      )}
      {uncategorizedData && (
        <div className={styles.background}>
          <div>
            {uncategorizedData.map((data, i) => (
              <span
                className={
                  !checkboxInputs.includes(data.id)
                    ? styles.BgText
                    : [styles.activeBgText, styles.BgText].join(" ")
                }
                key={data.name + i.toString()}
              >
                {data.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
