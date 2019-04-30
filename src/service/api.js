export default {
    getData: (url) => {
        return fetch(url).then(res => res.json());
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