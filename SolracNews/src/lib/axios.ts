import axios from "axios";
export const api = axios.create({
    baseURL: 'http://newsapi.org/v2/'
})