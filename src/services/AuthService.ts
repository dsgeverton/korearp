import { User } from "../types/user";
import { api } from "./api";

export const login = (username: string, password: string) => {
    console.log(username, password)
    return api
        .post("/login", {
            username,
            password
        })
        .then(response => {
            if (response.data.result.token) {
                console.log(response.data)
                localStorage.setItem("token", JSON.stringify(response.data.result.token));
            }

            return response.data.result.user;
        });
}

export const logoff = () => {
    localStorage.clear()
}
