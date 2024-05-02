const axios = require("axios");


const baseapi = 'http://localhost:4000/api';

export const fetchData = async (route) => {
    let result = await axios.get(`${baseapi}${route}`)
        .then(response =>  response.data.data)
        .catch(error => { throw error })

        return result;
}

export const addRecord = async (route, data)=>{
    let result = await axios.post(`${baseapi}${route}`, data)
        .then(response => response.data)
        .catch(error => { throw error })

    return result;
}

export const updateRecord = async (route, data)=>{
    let result = await axios.patch(`${baseapi}${route}`, data)
        .then(response => response.data)
        .catch(error => { throw error })

    return result;
}

export const deleteRecord = async (route, data)=>{
    let result = await axios.delete(`${baseapi}${route}`, data)
        .then(response => response.data)
        .catch(error => { throw error })

    return result;
}