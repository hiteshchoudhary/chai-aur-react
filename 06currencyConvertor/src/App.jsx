import { useState } from 'react'
import { InputBox } from './components'
import useCurrencyInfo from './hooks/CurrencyInfo'

function App() {
  const [amount, setAmount] = useState()
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("inr")
  const [convertedAmount, setConvertedAmount] = useState();

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);


  const swap = () => {
    setConvertedAmount(amount);
    setAmount(convertedAmount);
    setFrom(to);
    setTo(from);
  };
  
  // Provided the Final Amount
  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to])

  }
  let BackgroundImage = "https://images.pexels.com/photos/730564/pexels-photo-730564.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  return (
    <div className="w-full h-screen flex flex-wrap justify-center items-center 
    bg-cover bg-no-repeat" style={{ backgroundImage: `url('${BackgroundImage}')`, }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 
      backdrop-blur-sm bg-white/20">
          <h1 className='text-slate-200  font-bold text-3xl p-4 text-center'>
            Currency Converter</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();

            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"                amount={amount}
                currencyOption={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                selectCurrency={from}
                onAmountChange={(amount) => setAmount(amount)}

              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 
              border-2 border-white rounded-md bg-blue-600 text-2xl text-white 
              px-2 py-0.5"
                onClick={swap}
              >Swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOption={options}
                onCurrencyChange={(currency) => setTo(currency)}
                selectCurrency={to}
                amountDisable

              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 
          rounded-lg text-xl ">Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
            <button
              type="reset"
              className="mt-2 w-full bg-blue-600 text-white px-4 py-3 rounded-lg text-xl font-bold"
              onClick={(e) => {
                e.preventDefault();
                setAmount(""); // Reset 'amount' to an empty string
                setConvertedAmount(""); // Reset 'convertedAmount' to an empty string
                setFrom("usd")
                setTo("inr")
              }}
            >
              Reset
            </button>

          </form>
        </div>
      </div>
    </div>
  )
}

export default App
