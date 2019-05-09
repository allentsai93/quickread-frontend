import API from '../service/api';

export const getNewsData = async (store, url = 'topheadlines') => {
    const newsDataStatus = "LOADING";
    store.setState({newsDataStatus});
    API.getData(`${url}`).then(data => {
      const newsData = data;
      const newsDataStatus = "SUCCESS";
      store.setState({newsData, newsDataStatus})
    }).catch(e => {
        const newsDataStatus = "ERROR";
        store.setState({newsDataStatus});
    })
}