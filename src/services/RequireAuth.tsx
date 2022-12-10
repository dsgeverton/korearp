import App from "../App";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const auth = JSON.parse(localStorage.getItem("user") || "")
    const token = JSON.parse(localStorage.getItem("token") || "")


    console.log(auth, token.length)

    if ( (auth && auth.toString().length ) && ( token && token.length )) {
        return children;
    }
    
    return <App />;
}