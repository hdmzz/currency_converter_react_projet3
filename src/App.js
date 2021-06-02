import './App.css';
import { useEffect, useState } from 'react'
import CurrencyRow from './CurrencyRow'

const BASE_URL = 'http://api.exchangeratesapi.io/v1/latest?access_key=cf8dc5d8edb1a671f7275934d762fa45&format=1'

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()

  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        const firstCurrency = Object.keys(data.rates)[0]
        setCurrencyOptions([data.base, ...Object.keys(data.rates)])
        setFromCurrency(data.base)
        setToCurrency(firstCurrency)
      })
  }, [])
  return (
    <>
      <h1>Convert</h1>
      <CurrencyRow 
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={e => setFromCurrency(e.target.value)}
      />
      <div className="equals">=</div>
      <CurrencyRow 
        currencyOptions={currencyOptions}fi
        selectedCurrency={toCurrency}
        onChangeCurrency={e => setToCurrency(e.target.value)}
      />
    </>
  );
}

export default App;
