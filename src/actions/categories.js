import API from '../service/api';

export const getCategories = async store => {
    const categoriesStatus = "LOADING";
    store.setState({categoriesStatus});

    API.getData(`sources/categorized`).then(data => {
        const categories = data;
        const categoriesStatus = "SUCCESS";
        store.setState({categoriesStatus, categories})
    }).catch(e => {
        const categoriesStatus = "ERROR";
        store.setState({categoriesStatus});
    })
}