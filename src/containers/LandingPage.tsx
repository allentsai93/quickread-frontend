import * as React from 'react';
import styles from './styles/LandingPage.module.css';
import API from '../service/api';

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

    const searchHandler = (e: any) => {
        setSearchTerm(e);
    }

    return (
        <div className={styles.container}>
            <h1>LandingPage</h1>
            <div className={styles.inputContainer}>
                <input type={'text'} value={searchTerm} placeholder={'Search for a topic...'} onChange={e => searchHandler(e.target.value)}/>
            </div>
            <p>or</p>
            <p>Choose a News Source</p>
            <div className={styles.sourcesContainer}>

            </div>
        </div>
    )
};

export default LandingPage;