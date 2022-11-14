import { Fragment, useState } from "react";

export function Login(props:any) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [alert, setAlert] = useState(false)

    function handleCheckLogin() {
        if (username === "" || password === "") {
            setAlert(true)
        } else {
            setAlert(false)
            props.handleLogin(username, password)
        }
    }

    return (
        <Fragment>
            <div className="flex flex-col w-[400px] bg-gray-200 p-2 relative my-auto mx-auto rounded gap-4 shadow-lg">
                <div className="w-full flex justify-end">
                    <a className="cursor-pointer text-xl font-bold bg-red-400 px-2 rounded-full"
                    onClick={() => {props.showLogin(false)}}>X</a>
                </div>
                <input onChange={(e) => {setUsername(e.target.value)}} className={`p-2 rounded ${alert && "border border-red-400"}`} type="text" placeholder="Login" value={username}/>
                <input onChange={(e) => {setPassword(e.target.value)}} className={`p-2 rounded ${alert && "border border-red-400"}`} type="password" placeholder="Senha" value={password} />
                {alert && (
                    <span>Preencha os campos em branco</span>
                )}
                <button onClick={() => {handleCheckLogin()}} className="uppercase border border-white p-2 rounded">Entrar</button>
            </div>
        </Fragment>
    )
}