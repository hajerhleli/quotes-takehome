import axios from 'axios';

const BASE_URL= 'https://dummyjson.com/quotes'

export const fetchQuotes = (limit, skip) => {
    return axios.get(`${BASE_URL}?limit=${limit}&skip=${skip}`)
    .then((res)=> {
        return res.data.quotes
    })
}