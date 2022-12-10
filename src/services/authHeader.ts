export const authHeader = () => {
    const token = getTokenFromCookies();
    return {
        headers: {
            Authorization: "Bearer " + token,
        },
    };
};

const getTokenFromCookies = () => {
    return JSON.parse(localStorage.getItem('token') || "") 
}