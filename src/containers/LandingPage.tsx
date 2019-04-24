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
  const [showSources, setShowSources] = React.useState(false);
  const [showSubmit, setShowSubmit] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
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
    } else {
      setShowSubmit(false);
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

  return (
    <div className={styles.container}>
      <h1>LandingPage</h1>
      <div className={styles.inputContainer}>
        <form>
          <input
            type={"text"}
            value={searchTerm}
            placeholder={"Search for a topic..."}
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
            <div key={i} className={[styles.catContainer, styles[cat]].join(' ')}>
              <p>{cat}</p>
              {sources!
                .filter(source => source.category === cat)
                .map((source, i) => {
                  return (
                    <div key={i} className={styles.checkboxInputDiv}>
                      <span className={styles.checkbox}>
                        <input
                          type={"checkbox"}
                          value={source.id}
                          id={source.id}
                        />
                      </span>
                      <label htmlFor={source.id}>{source.name}</label>
                    </div>
                  );
                })}
            </div>
          ))}
        </form>
      ) : null}
    </div>
  );
};

export default LandingPage;
