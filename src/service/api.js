const apiUrl = process.env.NODE_ENV === 'production' ? 'http://54.188.14.207:3001/' : 'http://localhost:3001/';

export default {
    getData: (url) => {
        return fetch(`${apiUrl + url}`).then(res => res.json());
    },
    getUrlId: (id) => {
        switch(id) {
            
        }
    },
    buildUrlString: (ids = []) => {
        return ids.map((id, i) => {
            return i !== 0 ? `&s=${id}` : `s=${id}`
        });
    },
    getStateFromUrl: (ids = []) => {

    }
}