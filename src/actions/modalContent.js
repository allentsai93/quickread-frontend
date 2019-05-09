import API from '../service/api';

export const setModal = async (store, url) => {
    const showModal = true;
    document.body.classList.add('activeModal');

    API.getData(`summarize/${url}`).then(data => {
        if(data.error) {
            throw data;
        }
        const modalContent = data;
        store.setState({modalContent, showModal});
    }).catch(err => {
        const modalContent = err;
        store.setState({modalContent, showModal});
    })
    
};

export const closeModal = store => {
    const showModal = false;
    document.body.classList.remove('activeModal');
    const modalContent = {};
    store.setState({modalContent, showModal});
}