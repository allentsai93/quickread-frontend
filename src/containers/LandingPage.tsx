import * as React from 'react';
import styles from './styles/LandingPage.module.css';
import API from '../service/api';
import searchIcon from '../assets/search.svg';
import { CSSTransition } from 'react-transition-group';


const LandingPage = () => {
    const [sources, setSources] = React.useState<null | {id: string, name: string, description: string, category: string, language: string, country: string}>(null);
    const [showSources, setShowSources] = React.useState(false);
    const [showSubmit, setShowSubmit] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState('');

    React.useEffect(() => {
        getSources();
    }, []);

    const getSources = () => {
        API.getData(`http://localhost:3001/sources`)
        .then(data => {
            setSources(data);
        });
    };

    const searchHandler = (term: any) => {
        setSearchTerm(term);
        if(term.length >= 3) {
            setShowSubmit(true);
        } else {
            setShowSubmit(false);
        }
    }

    const submitHandler = (e: any) => {
        e.preventDefault();
    }

    return (
        <div className={styles.container}>
            <h1>LandingPage</h1>
            <div className={styles.inputContainer}>
                <form>
                    <input type={'text'} value={searchTerm} placeholder={'Search for a topic...'} onChange={e => searchHandler(e.target.value)}/>
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
                        <button type={'submit'} onSubmit={submitHandler}><img src={searchIcon}/></button>
                    </CSSTransition>
                </form>
            </div>
            <p>or</p>
            <span className={!showSources ? styles.sourcesBtn : [styles.sourcesBtn, styles.sourcesBtnActive].join(' ')} onClick={() => setShowSources(!showSources)}>Choose a News Source</span>
            <div className={!showSources ? styles.sourcesContainer : [styles.sourcesContainer, styles.sourcesContainerActive].join(' ')}>

            </div>
        </div>
    )
};

export default LandingPage;