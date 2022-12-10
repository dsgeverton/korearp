import { faAdd, faEdit, faEye, faEyeSlash, faSave, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ChangeEvent, FormEvent, FormEventHandler, Fragment, useEffect, useState } from "react"
import { api } from "../../services/api"
import { authHeader } from "../../services/authHeader"
import { User } from "../../types/user"

export const Membros = () => {

    const [users, setUsers] = useState<User[]>([])
    const [userInput, setUserInput] = useState({})
    const [nome, setNome] = useState("")
    const [contato, setContato] = useState("")
    const [passport, setPassport] = useState("")
    const [login, setLogin] = useState("")
    const [funcao, setFuncao] = useState<"ADMIN" | "USER">("USER")

    const [showFormAddUser, setShowFormAddUser] = useState(false)
    const [hasEditing, setHasEditing] = useState(false)
    const [hideData, setHideData] = useState(true)

    useEffect(() => {
        const getUsers = async () => {
            api.get('/users', authHeader())
                .then(response => {
                    console.log(response.data)
                    const users: User[] = response.data
                    setUsers(users)
                }).catch(error => {
                    console.log(error)
                })
        }
        getUsers()
    }, [])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>, index: string) => {

        const { name, value } = e.target;
        const list: User[] = [...users];

        const userFiltered = list.find(user => { return user.id === index })
        if (userFiltered) {
            userFiltered.name = value
            list.map(user => {
                if (user.id === index) {
                    user = userFiltered
                }
            })
        }

        console.log(userFiltered)
        setUsers(list);
    };

    const handleEdit = (user: User) => {
        setUserInput(user)
        setHasEditing(!hasEditing)
    }

    const handleSave = () => {
        setUserInput({})
        setHasEditing(!hasEditing)

        if (contato || login || nome || passport || funcao) {
            funcao === "ADMIN" ? setFuncao("ADMIN") : setFuncao("USER")
            const user: User = {
                contact: contato,
                login: login,
                name: nome,
                passport: parseInt(passport),
                role: funcao,
                secret: "mudar123"
            }

            api.post("/register", user,
                authHeader()
            ).then(response => {
                console.log(response)
            })
        }

    }

    return (
        <div className="flex flex-col bg-wallpaper items-center justify-start w-full h-full py-8">
            <div className="flex gap-2 py-3 w-3/5 relative justify-between items-center">
                <h1 className=" text-3xl uppercase font-bold">Membros</h1>
                <div onClick={() => { setShowFormAddUser(true) }} className="flex justify-center items-center gap-2 px-3 py-1 group cursor-pointer rounded-full border border-green-400 hover:bg-green-500 transition-colors">
                    <span className="group-hover:text-white">Adicionar</span>
                    <a className="flex justify-center group-hover:text-white">
                        <FontAwesomeIcon icon={faAdd} />
                    </a>
                </div>
            </div>
            {showFormAddUser &&
                <div className="mb-4 p-4 rounded bg-gray-700 shadow-md">
                    <form className="flex gap-2 text-sm text-white" action="" method="post">
                        <input onChange={(e) => { setNome(e.target.value) }} className="bg-transparent border-0" type="text" name="nome" value={nome} placeholder="Nome" />
                        <input onChange={(e) => { setContato(e.target.value) }} className="bg-transparent border-0" type="text" name="contato" value={contato} placeholder="Contato" />
                        <input onChange={(e) => { setPassport(e.target.value) }} className="bg-transparent border-0" type="text" name="passport" value={passport} maxLength={10} placeholder="Passaporte" />
                        <input onChange={(e) => { setLogin(e.target.value) }} className="bg-transparent border-0" type="text" name="login" value={login} placeholder="Login" />
                        <select onChange={(e) => { setFuncao(e.target.value === "ADMIN" ? "ADMIN" : "USER") }} name="funcao" id="funcao" className="px-0 py-2 rounded-full bg-transparent text-gray-400">
                            <option value="">Selecione uma função</option>
                            <option value="ADMIN">ADMIN</option>
                            <option value="USER">USER</option>
                        </select>
                        <a onClick={() => { handleSave() }} className="text-white flex items-center justify-center cursor-pointer hover:border-green-500 w-8 h-8 border border-gray-400 rounded-full">
                            <FontAwesomeIcon icon={faSave} />
                        </a>
                        <a onClick={() => { setShowFormAddUser(false) }} className="text-white flex items-center justify-center cursor-pointer hover:border-red-500 w-8 h-8 border border-gray-400 rounded-full">
                            <FontAwesomeIcon icon={faXmark} />
                        </a>
                    </form>
                </div>
            }

            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="py-3 px-6">
                                Nome
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Contato
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Passaporte
                            </th>
                            <th scope="col" className="py-3 px-6 flex gap-2 items-center">
                                login
                                {
                                    hideData ?
                                        <FontAwesomeIcon icon={faEyeSlash} onClick={() => { setHideData(!hideData) }} />
                                        :
                                        <FontAwesomeIcon icon={faEye} onClick={() => { setHideData(!hideData) }} />
                                }
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Função
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.length < 1 ?
                                <span className='animate-pulse flex justify-center w-full items-center gap-3 text-gray-900'> Carregando
                                    <div className="w-1 h-1 rounded-full bg-white animate-bounce animation-delay-0"></div>
                                    <div className="w-1 h-1 rounded-full bg-white animate-bounce animation-delay-150"></div>
                                    <div className="w-1 h-1 rounded-full bg-white animate-bounce animation-delay-300"></div>
                                </span>
                                :
                                users.map(user => (

                                    <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {
                                                hasEditing && userInput == user ?
                                                    <input className="bg-transparent border-0" type="text" onChange={(e) => { }} name={"username"} value={user.name} />
                                                    :
                                                    <span>{user.name}</span>
                                            }
                                        </th>
                                        <td className="py-4 px-6">
                                            {
                                                hasEditing && userInput == user ?
                                                    <input className="bg-transparent border-0" type="text" onChange={(e) => { }} name={"username"} value={user.contact} />
                                                    :
                                                    <span>{user.contact}</span>
                                            }

                                        </td>
                                        <td className="py-4 px-6">
                                            {user.passport.toString()}
                                        </td>
                                        <td className="py-4 px-6 flex gap-2">
                                            {hideData ?
                                                <div className="w-36 h-4 bg-slate-500 blur-sm"></div>
                                                :
                                                <span className="w-36">
                                                    {user.login}
                                                </span>
                                            }
                                        </td>
                                        <td className="py-4 px-6">
                                            {user.role}
                                        </td>
                                        <td className="flex items-center py-4 px-6 space-x-3">
                                            {hasEditing && userInput == user
                                                ?
                                                <div className="flex justify-center items-center gap-2 border border-white px-2 py-1 hover:bg-white rounded-full">
                                                    <FontAwesomeIcon icon={faSave} />
                                                    <a onClick={() => { handleSave() }} className="cursor-pointer font-medium text-green-600 dark:text-green-500 ">Salvar</a>
                                                </div>
                                                :
                                                <div className="flex justify-center items-center gap-2 border border-white px-2 py-1 hover:bg-white rounded-full">
                                                    <FontAwesomeIcon icon={faEdit} />
                                                    <a onClick={() => { handleEdit(user) }} className="cursor-pointer font-medium text-blue-600 dark:text-blue-500 ">Edit</a>
                                                </div>
                                            }
                                            <div className="flex justify-center items-center gap-2 border border-white px-2 py-1 hover:bg-white rounded-full">
                                                <FontAwesomeIcon icon={faTrash} />
                                                <a className="cursor-pointer font-medium text-red-600 dark:text-red-500 ">Remove</a>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}