import axios from 'axios'

const api = axios.create({
    baseURL: 'https://rickandmortyapi.com/api',
    headers: { 'X-Custom-Header': 'foobar' }
})


export default {
    all() {
        try {
            return api.get('/character')
        } catch (error) {
            return Promise.reject(error.response);
        }


    },
    search(name, status) {
        try {
            const parseName = name ? `name=${name?.trim()}&` : "";
            const parseStatus = status ? `status=${status?.trim()}` : ""
            const query = parseName + parseStatus
            return api.get('/character?' + query)
        } catch (error) {
            return Promise.reject(error.response);
        }

    },
    searchPaginated(paginated) {
        try {
            return api.get(paginated)
        } catch (error) {
            return Promise.reject(error.response);
        }

    }
}