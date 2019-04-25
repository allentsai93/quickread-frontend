import * as React from "react";
import styles from "./styles/LandingPage.module.css";
import API from "../service/api";
import searchIcon from "../assets/search.svg";
import { CSSTransition } from "react-transition-group";

type Source = {
  id: string;
  name: string;
  description: string;
  category: string;
  language: string;
  country: string;
};

const LandingPage = () => {
  const [sources, setSources] = React.useState<null | Source[]>(null);
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [showSubmit, setShowSubmit] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchSource, setSearchSource] = React.useState('');
  const [checkboxInputs, setCheckboxInputs] = React.useState<string[]>([]);
  const [autoSuggest, setAutoSuggest] = React.useState<null | Source[]>(null);
  const categories = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology"
  ];
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    []
  );

  React.useEffect(() => {
    getSources();
  }, []);

  const getSources = () => {
    API.getData(`http://localhost:3001/sources`).then(data => {
      setSources(data.sources);
    });
  };

  // const [selectedCategories, dispatch] = React.useReducer((selectedCategories, { type, value })  => {
  //     switch(type) {
  //         case 'add':
  //             return [...selectedCategories, value];
  //         case 'remove':
  //             return selectedCategories.filter((_:null, index:any) => index !== value);
  //         default:
  //             return selectedCategories;
  //     }
  // }, []);

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
      const filteredSources = sources!.filter(source =>
        source.name.toLowerCase().includes(input)
      );
      if(filteredSources.length) {
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

  const handleSelectedCategory = (cat: string) => {
    if (selectedCategories.includes(cat)) {
      const popCat = [...selectedCategories];
      popCat.splice(selectedCategories.indexOf(cat), 1);
      setSelectedCategories(popCat);
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const handleCheckbox = (id: string) => {
      if(checkboxInputs!.indexOf(id) !== -1) {
          const newCheckboxInputs = [...checkboxInputs];
          newCheckboxInputs.splice(newCheckboxInputs.indexOf(id), 1);
          setCheckboxInputs(newCheckboxInputs);
      } else {
          setCheckboxInputs([...checkboxInputs, id]);
      }
  }

  return (
    <div className={styles.container}>
      <h1>LandingPage</h1>
      <div className={styles.inputContainer}>
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
          <div className={styles.suggestionsBox}>
            {autoSuggest
              ? autoSuggest!.map((source, i) => (
                  <span key={i} onClick={() => setSearchSource(source.id)}>{source.name} <span className={styles.sourceSpan}>News Source</span></span>
                ))
              : null}
          </div>
        </CSSTransition>
      </div>

      <div className={styles.sourcesContainer}>
        {categories.map((cat, i) => {
          return (
            <button
              className={styles.categoryButton}
              key={cat + i}
              onClick={() => handleSelectedCategory(cat)}
            >
              {cat}
            </button>
          );
        })}
      </div>
      {selectedCategories ? (
        <form className={styles.filterForm}>
          {selectedCategories.map((cat, i) => (
            <div
              key={i}
              className={[styles.catContainer, styles[cat]].join(" ")}
            >
              <p>{cat}</p>
              <div className={styles.sourceListContainer}>
              {sources!
                .filter(source => source.category === cat)
                .map((source, i) => {
                  return (
                    <div key={i} className={checkboxInputs && checkboxInputs.includes(source.id) ? [styles.checkboxInputDiv, styles.checkboxInputActive].join(' ') : styles.checkboxInputDiv}>
                      <label htmlFor={source.id}>{source.name}</label>
                      <span className={styles.checkbox}>
                        <input
                          type={"checkbox"}
                          value={source.id}
                          id={source.id}
                          onChange={() => handleCheckbox(source.id)}
                        />
                      </span>
                    </div>
                  );
                })}
                </div>
            </div>
          ))}
        </form>
      ) : null}
    </div>
  );
};

export default LandingPage;
