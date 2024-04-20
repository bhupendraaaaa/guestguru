import React, { useState, useEffect } from "react";
import "./Currency.css";


function Currencyconverter() {
  const [sourceCurrency, setSourceCurrency] = useState("USD");
  const [finalCurrency, setfinalCurrency] = useState("NPR");
  const [Amount, setAmount] = useState(0);
  const [totalCurrency, settotalCurrency] = useState(0);
  const [conversionRates, setConversionRates] = useState(null);

  useEffect(() => {
    document.title = "GuestGuru ● Currency Converter";
  }, []);

  useEffect(() => {
  //Change API KEY
    fetch(
      "https://v6.exchangerate-api.com/v6/dae00175499cfddc7330dcec/latest/USD"
    )
      .then((response) => response.json())
      .then((data) => setConversionRates(data.conversion_rates))
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleAmountChange = (e) => {
    setAmount(parseFloat(e.target.value));
    if (conversionRates) {
      const sourceRate = conversionRates[sourceCurrency];
      const targetRate = conversionRates[finalCurrency];
      const conversionRate = targetRate / sourceRate;
      settotalCurrency(parseFloat(e.target.value) * conversionRate);
    }
  };

  const handletotalCurrencyChange = (e) => {
    settotalCurrency(parseFloat(e.target.value));
    if (conversionRates) {
      const sourceRate = conversionRates[sourceCurrency];
      const targetRate = conversionRates[finalCurrency];
      const conversionRate = sourceRate / targetRate;
      setAmount(parseFloat(e.target.value) * conversionRate);
    }
  };

  const handleSourceCurrencyChange = (e) => {
    setSourceCurrency(e.target.value);
    if (conversionRates) {
      const sourceRate = conversionRates[e.target.value];
      const targetRate = conversionRates[finalCurrency];
      const conversionRate = targetRate / sourceRate;
      settotalCurrency(Amount * conversionRate);
    }
  };

  const handlefinalCurrencyChange = (e) => {
    setfinalCurrency(e.target.value);
    if (conversionRates) {
      const sourceRate = conversionRates[sourceCurrency];
      const targetRate = conversionRates[e.target.value];
      const conversionRate = targetRate / sourceRate;
      settotalCurrency(Amount * conversionRate);
    }
  };

  return (
    <>

      <div className="currency-container">
        <div className="currency-header">
          <div className="currency-headline">
            <h1>Currency Exchange!</h1>
          </div>

          <div className="currency-search">
            <div className="currency-left">
              <select
                value={sourceCurrency}
                onChange={handleSourceCurrencyChange}
              >
                {conversionRates &&
                  Object.keys(conversionRates).map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
              </select>

              <input
                type="number"
                value={Amount}
                onChange={handleAmountChange}
              />
            </div>

            <div className="currency-middle">
              <i className="fa-solid fa-arrow-right-arrow-left"></i>
            </div>

            <div className="currency-right">
              <input
                type="number"
                value={totalCurrency}
                onChange={handletotalCurrencyChange}
              />

              <select
                value={finalCurrency}
                onChange={handlefinalCurrencyChange}
              >
                {conversionRates &&
                  Object.keys(conversionRates).map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="currency-result">
            <h2>
              {Amount} {sourceCurrency} equals {totalCurrency.toFixed(2)}{" "}
              {finalCurrency}
            </h2>
          </div>
        </div>
      </div>

    </>
  );
}

export default Currencyconverter;