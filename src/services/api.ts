import axios from "axios"

const baseURL = "https://korearp-api.vercel.app"

export const api =
    axios.create({
        baseURL: baseURL
    })
