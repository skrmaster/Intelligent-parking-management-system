import axios from 'axios'

export default {
    createToken (username, password) {
        return axios.post('/api/login', { username, password })
    }
}
