import axios from "axios"


// const base_url = "http://localhost:5000/api"
const base_url = "https://real-estate-listing-back-end.onrender.com/api"

const token = localStorage.getItem("persist:root") ==null ?"": JSON.parse(JSON.parse(localStorage?.getItem("persist:root"))?.currentUser)?.token
console.log(token)
export const publicRequest = axios.create({
    baseURL: base_url
})

export const userRequest = axios.create({
    baseURL: base_url,
    headers: {
        "Authorization": `Bearer ${token}`
    }
})