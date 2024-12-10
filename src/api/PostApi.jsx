import axios from "axios";


const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
})

// Get data from Api
export const getApiData = () => {
    return api.get("/posts")
}

// Delete data from Api
export const deleteApiData = (id) => {
    return api.delete(`/posts/${id}`);
}

// Add data in Api
export const postApiData = (postData) => {
    return api.post("/posts", postData);
}

// Update data in Api
export const updateApiData = (id, postData) => {
    return api.put(`/posts/${id}`, postData);
} 