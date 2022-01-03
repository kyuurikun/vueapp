import axios from 'axios'
const basePath = '/projectA'
export const getProduct = () => axios({
    url:  basePath +  '/getProduct',
    method: 'GET'
})
export const getUser = () => axios({
    url:  basePath +  '/getUser',
    method: 'GET'
})
export const getOrders = () => axios({
    url:  basePath +  '/getOrders',
    method: 'GET'
})
export const addProduct = data =>axios({
    url:  basePath +  '/addProduct',
    method: 'POST',
    data
})
export const delProduct = id =>axios({
    url:  basePath +  '/delProduct',
    method: 'GET',
    params: {
        id
    }
})
export const dealOrder = id =>axios({
    url:  basePath +  '/dealOrder',
    method: 'GET',
    params: {
        id
    }
})