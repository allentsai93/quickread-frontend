export default {
    getData: (url) => {
        return fetch(url).then(res => res.json());
    },
    getUrlId: (id) => {
        switch(id) {
            
        }
    },
    buildUrlString: (ids = []) => {
        return ids.map(id => {

        });
    },
    getStateFromUrl: (ids = []) => {
        
    }
}