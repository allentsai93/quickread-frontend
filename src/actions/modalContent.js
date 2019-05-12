import API from '../service/api';

export const setModal = async (store, content) => {
    const showModal = true;
    const modalContent = content;
    document.body.classList.add('activeModal');
    store.setState({showModal, modalContent});
    API.getData(`summarize/${content.url}`).then(data => {
        if(data.error) {
            throw data;
        }
        const modalContent = {...content, ...data};
        const modalLoaded = true;
        store.setState({modalContent, modalLoaded});
    }).catch(err => {
        const modalContent = {...content, ...err};
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