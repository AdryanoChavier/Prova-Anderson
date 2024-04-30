import axios from 'axios'

const api = axios.create({
    baseURL:'http://10.136.63.225:3000/'
})

export default api;