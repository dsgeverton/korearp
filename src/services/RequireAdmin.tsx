import App from "../App";

export const RequireAdmin = ({ children }: { children: JSX.Element }) => {
    const auth = JSON.parse(localStorage.getItem("user") || "")

    console.log(auth)

    if ( (auth && auth.role === 'ADMIN') ) {
        return children;
    }
    
    return <App />;
}