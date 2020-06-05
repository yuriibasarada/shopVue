import axios from 'axios'

export default {
    GET_BRANDS({commit}) {
        return axios('http://127.0.0.1:8000/brand', {method: 'GET'})
            .then(response => {
                commit('SET_BRANDS', response.data)
            })
            .catch(error => {
                console.log(error)
            })
    },
    GET_MATERIALS({commit}) {
        return axios('http://127.0.0.1:8000/material', {method: 'GET'})
            .then(response => {
                commit('SET_MATERIALS', response.data)
            })
            .catch(error => {
                console.log(error)
            })
    },
    GET_CATEGORIES({commit}) {
        return axios('http://127.0.0.1:8000/category', {method: 'GET'})
            .then(response => {
                commit('SET_CATEGORIES', response.data)
            })
            .catch(error => {
                console.log(error)
            })
    },
    GET_PRODUCTS({commit}, {limit, page, category_id, sort_by, sort_type}) {
        return axios('http://127.0.0.1:8000/product', {
            method: 'GET', params: {
                limit,
                page,
                category_id,
                sort_by,
                sort_type
            }
        })
            .then(response => {
                commit('SET_PRODUCTS', response.data)
            })
            .catch(error => {
                console.log(error)
            })
    },
}