import React from "react";
import axios from "axios";
const url = "http://localhost:3000/";
const urlApi = "http://localhost:3000/";

const LoginReq =  async (inputData) =>{
    let result = null
    await axios.post(`${url}api/portal/portallogin`, inputData).then(response => {
        result = response.data
    }).catch(err => {
        if (err) {
            result = err.response.data
        }
    });
    return result
}


const CategoryAdd =  async (formData) =>{
    let result = null
    axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("token");
    await axios.post(`${url}api/portal/categoryAdd`, formData).then(response => {
        result = response.data
    }).catch(err => {
        if (err) {
            result = err.response.data
        }
    });
    return result
}

const GetAllCategory =  async () =>{
    let result = null
    axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("token");
    await axios.get(`${url}api/portal/GetAllCategory`).then(response => {
        result = response.data
    }).catch(err => {
        if (err) {
            result = err.response.data
        }
    });
    return result
}

const EditCategoryByID =  async (id) =>{
    let result = null
    const categoryID = {cID:id};
    axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("token");
    await axios.post(`${url}api/portal/EditCategory`,categoryID).then(response => {
        result = response.data
    }).catch(err => {
        if (err) {
            result = err.response.data
        }
    });
    return result
}
const CategoryEdit =  async (formData) =>{
    let result = null
    axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("token");
    await axios.post(`${url}api/portal/CategoryUpdate`, formData).then(response => {
        result = response.data
    }).catch(err => {
        if (err) {
            result = err.response.data
        }
    });
    return result
}
const DeleteCategory =  async (id) =>{
    let result = null
    const caegoryId = {cId : id}
    axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("token");
    await axios.post(`${url}api/portal/CategoryDelete`, caegoryId).then(response => {
        result = response.data
    }).catch(err => {
        if (err) {
            result = err.response.data
        }
    });
    return result
}

const GetAllProducts =  async () =>{
    let result = null
    axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("token");
    await axios.get(`${url}api/portal/GetAllProducts`).then(response => {
        result = response.data
    }).catch(err => {
        if (err) {
            result = err.response.data
        }
    });
    return result
}

const ProductAdd =  async (formData) =>{
    let result = null
    axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("token");
    await axios.post(`${url}api/portal/ProductAdd`, formData).then(response => {
        result = response.data
    }).catch(err => {
        if (err) {
            result = err.response.data
        }
    });
    return result
}


const ProductEdit =  async (formData) =>{
    let result = null
    axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("token");
    await axios.post(`${url}api/portal/ProductEdit`, formData).then(response => {
        result = response.data
    }).catch(err => {
        if (err) {
            result = err.response.data
        }
    });
    return result
}
const DeleteProduct = async (id) =>{
    let result = null
    axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("token");
    await axios.get(`${url}api/portal/ProductDelete/${id}`).then(response => {
        result = response.data
    }).catch(err => {
        if (err) {
            result = err.response.data
        }
    });
    return result
}

const orderHistory  = async (id) => {
    let result = null
    axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("token");
    await axios.get(`${url}api/portal/orders`).then(response => {
        result = response.data
    }).catch(err => {
        if (err) {
            result = err.response.data
        }
    });
    return result
}



export {LoginReq,urlApi,url,CategoryAdd,GetAllCategory,EditCategoryByID,CategoryEdit,DeleteCategory,GetAllProducts,ProductAdd,ProductEdit,DeleteProduct,orderHistory}
