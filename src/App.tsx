import { Fragment, useEffect, useState } from 'react'

import { faSackDollar, faCarSide, faHandHoldingDollar, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Login } from './components/Login';

function App() {
  const PARTNER_VALUE = 30
  const NO_PARTNER_VALUE = 20
  const [inputMoney, setInputMoney] = useState('')
  const [isPartner, setIsPartner] = useState(false)
  const [alert, setAlert] = useState(false)
  const [hasLogged, setHasLogged] = useState(false)
  const [loginStatusInvalid, setLoginStatusInvalid] = useState(false)
  const [showLoginForm, setShowLoginForm] = useState(false)

  const admin = {
    username: "admin",
    password: "admin"
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  })

  useEffect(() => {
    console.log(inputMoney)
    if (inputMoney == '' || inputMoney == null || inputMoney == undefined) setAlert(false)
    else {

      if (!(inputMoney.match('^[0-9]*$'))) {
        setAlert(true)
      } else {
        setAlert(false)
      }
    }
  }, [inputMoney])

  async function handleLogin(username:string, passwd:string) {
    if (username === admin.username && passwd === admin.password) {
      console.log("logado")
      setShowLoginForm(false)
      setHasLogged(true)
      setLoginStatusInvalid(false)
    } else {
      console.log("usuário ou senha inválido")
      setLoginStatusInvalid(true)
    }
  }

  async function handleLogoff() {
    setAlert(false)
    setShowLoginForm(false)
    setHasLogged(false)
    setInputMoney("")
    setIsPartner(false)
    setLoginStatusInvalid(false)
  }

  return (
    <div className="App bg-gray-800 min-h-screen relative">
      <header className="flex h-[160px] py-4 px-2 justify-center items-center">
        <figure className="absolute flex left-4">
          <img className="w-[128px] rounded-full"
            src="https://storage.hydrus.gg/production/static/anF1yWDmYgwnSxD9WmYTKXjq4gkgVMUu1WzdFrVX.gif"
            alt="KOREIA" />

          <img className="w-[128px] -ml-6 animate-spin" src="https://cdn-icons-png.flaticon.com/512/3909/3909425.png" alt="KOREIA" />

        </figure>
        <h1 className="text-[48px] font-bold text-white">FAMÍLIA KOREA - FLOW ROLEPLAY</h1>
      </header>
      <nav className="w-full bg-gray-900 p-4 flex justify-end items-center">
        <menu>
          <ul className='text-white flex gap-2'>
            {
              hasLogged ? (
                <Fragment>
                  <li className='uppercase border border-white px-4 py-2 cursor-pointer hover:bg-white hover:text-black hover:border-black transition-colors duration-300'>
                    <a href="#simulador" className='flex gap-2 justify-center items-center'>
                      <FontAwesomeIcon icon={faCarSide} />
                      simulador
                    </a>
                  </li>
                  <li className='uppercase border border-white px-4 py-2 cursor-pointer hover:bg-white hover:text-black hover:border-black transition-colors duration-300'>
                    <a href="#tabela-precos" className='flex gap-2 justify-center items-center'><FontAwesomeIcon icon={faHandHoldingDollar} />tebela de preços</a>
                  </li>
                  <li className='uppercase border border-white px-4 py-2 cursor-pointer hover:bg-white hover:text-black hover:border-black transition-colors duration-300'>
                  <a onClick={() => {handleLogoff()}} className='flex gap-2 justify-center items-center'>
                    <FontAwesomeIcon icon={faRightToBracket} />
                    sair
                  </a>
                </li>
                </Fragment>
              ) :
                <li className='uppercase border border-white px-4 py-2 cursor-pointer hover:bg-white hover:text-black hover:border-black transition-colors duration-300'>
                  <a onClick={() => {setShowLoginForm(true)}} className='flex gap-2 justify-center items-center'>
                    <FontAwesomeIcon icon={faRightToBracket} />
                    Login
                  </a>
                </li>
            }

          </ul>
        </menu>
      </nav>
      {
        hasLogged ?
          (
            <Fragment>
              <section id='simulador' className="flex flex-col bg-white py-16 min-h-[400px] relative justify-center items-center gap-4">
                <h1 className="text-xl text-white bg-gray-300 flex w-full justify-center items-center p-2 absolute top-0">SIMULADOR - PINTURA</h1>
                <article className="flex justify-center">
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-col">
                      <div className={`flex ${alert && 'outline'} outline-red-500 border border-gray-500 rounded shadow-lg`}>
                        <span className="bg-gray-300 w-7 rounded-l flex justify-center items-center">
                          <FontAwesomeIcon icon={faSackDollar} />
                        </span>
                        <input onChange={(e) => { setInputMoney(e.target.value) }} placeholder={"Digite apenas números"} className={`rounded-r text-lg w-[256px] p-1 outline-none`} name="input-money" id="input_money" value={inputMoney} />
                      </div>
                      {
                        alert && (
                          <span className='flex justify-center items-center'>Digite apenas números!</span>
                        )
                      }
                    </div>
                    <div className="flex gap-2 ml-6">
                      <div className='flex items-center justify-center'>
                        <input className='w-4 h-4' onChange={(e) => { setIsPartner(e.target.checked) }} type="checkbox" name="is-partner" id="is_partner" />
                      </div>
                      <label htmlFor="is-partner">Possui parceria?</label>
                    </div>
                  </div>
                </article>
                {
                  ((inputMoney || inputMoney > "0") && !alert) ? (
                    <article id="result_field" className="bg-gray-700 w-[60%] p-4 text-white rounded">
                      <label htmlFor="">Valor à pagar: </label>
                      <span id="payment_value">
                        {isPartner ?
                          formatter.format((parseFloat(inputMoney) * (PARTNER_VALUE / 100)))
                          :
                          formatter.format(parseFloat(inputMoney) * (NO_PARTNER_VALUE / 100))
                        }
                      </span>
                    </article>) : ""
                }
              </section>
              <section id='tabela-precos' className='mt-8 flex flex-col bg-gray-300 py-16 min-h-[400px] relative justify-center items-center gap-4'>
                <h1 className="text-xl text-white bg-gray-600 flex w-full justify-center items-center p-2 absolute top-0">TABELA DE PREÇOS</h1>
                <article>

                  <span className='animate-pulse flex justify-center items-center gap-3 text-xl'> Em desenvolvimento
                    <div className="w-2 h-2 rounded-full bg-white animate-bounce animation-delay-0"></div>
                    <div className="w-2 h-2 rounded-full bg-white animate-bounce animation-delay-150"></div>
                    <div className="w-2 h-2 rounded-full bg-white animate-bounce animation-delay-300"></div>
                  </span>
                </article>
              </section>
            </Fragment>
          ) :
          (
            <div className='flex justify-center items-center w-full h-auto p-2'>
              <h1 className='text-white uppercase'>faça o login para exibir o conteúdo</h1>
            </div>
          )
      }
      {
        showLoginForm && (
          <Login showLogin={setShowLoginForm} handleLogin={handleLogin} loginStatusInvalid={loginStatusInvalid} setLoginStatusInvalid={setLoginStatusInvalid} />
        )
      }
      <footer className='mt-8 px-4 py-8 bg-black text-white absolute text-center bottom-0 w-full'>
        <span className='flex justify-center items-center gap-2'>Desenvolvido por
          <a
            className='cursor-pointer flex items-center gap-2 w-24 px-4 py-1 border border-orange-400 rounded-full'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-discord" viewBox="0 0 16 16"> <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z" /> </svg>Vert
          </a>&copy; 2022
        </span>
      </footer>
    </div>
  )
}

export default App
