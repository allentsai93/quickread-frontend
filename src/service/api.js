export default {
    getData: (url) => {
        return fetch(url).then(res => res.json());
    }
}