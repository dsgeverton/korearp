import { useEffect, useState } from 'react'

import { faSackDollar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function App() {
  const PARTNER_VALUE = 30
  const NO_PARTNER_VALUE = 20
  const [inputMoney, setInputMoney] = useState('')
  const [isPartner, setIsPartner] = useState(false)
  const [alert, setAlert] = useState(false)

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

  return (
    <div className="App bg-gray-800 h-screen">
      <header className="flex h-[160px] py-4 px-2 justify-center items-center">
        <figure className="absolute flex left-4">
          <img className="w-[128px] rounded-full"
            src="https://storage.hydrus.gg/production/static/anF1yWDmYgwnSxD9WmYTKXjq4gkgVMUu1WzdFrVX.gif"
            alt="KOREIA" />

          <img className="w-[128px] -ml-6" src="https://cdn-icons-png.flaticon.com/512/3909/3909425.png" alt="KOREIA" />

        </figure>
        <h1 className="text-[48px] font-bold text-white">FAMÍLIA KOREA - FLOW ROLEPLAY</h1>
      </header>
      <section className="w-full bg-gray-900 p-4 flex justify-center items-center">

      </section>
      <section className="flex flex-col bg-white py-16 min-h-[400px] relative justify-center items-center gap-4">
        <h1 className="text-xl text-white bg-gray-300 flex w-full justify-center items-center p-2 absolute top-0">SIMULADOR - PINTURA</h1>
        <article className="flex justify-center">
          <div className="flex flex-col gap-1">
            <div className="flex flex-col">
              <div className={`flex ${alert && 'outline'} outline-red-500 border border-gray-500 rounded shadow-lg`}>
                <span className="bg-gray-300 w-7 rounded-l flex justify-center items-center">
                  <FontAwesomeIcon icon={faSackDollar} />
                </span>
                <input onChange={(e) => { setInputMoney(e.target.value) }} placeholder={"Digite apenas números"} className={`rounded-r text-lg p-1 outline-none`} name="input-money" id="input_money" value={inputMoney} />
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
      <footer>
      </footer>
    </div>
  )
}

export default App
