import API from '../service/api';

export const setModal = async (store, url) => {
    const showModal = true;
    document.body.classList.add('activeModal');
    store.setState({showModal});
    API.getData(`summarize/${url}`).then(data => {
        if(data.error) {
            throw data;
        }
        const modalContent = data;
        const modalLoaded = true;
        store.setState({modalContent, modalLoaded});
    }).catch(err => {
        const modalContent = err;
        const modalLoaded = true;
        store.setState({modalContent, modalLoaded});
    })

};

export const closeModal = store => {
    const showModal = false;
    const modalLoaded = false;
    document.body.classList.remove('activeModal');
    const modalContent = {};
    store.setState({modalContent, showModal, modalLoaded});
}