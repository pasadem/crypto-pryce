import React, { useEffect, useState } from 'react';
import { Form, Img } from 'react-bootstrap';
import getSymbolFromCurrency from 'currency-symbol-map'

export default function Rate({ rate }) {
  const [currentValue, setCurrentValue] = useState('usd');
  const [price, setPrice] = useState('');
  
  useEffect(() => {
    handleSelect(currentValue, priceNames);
  }, [currentValue, priceNames])
  
  
  const handleSelect = (currName, ratesList) => {
    const result = Object.entries(ratesList).filter(([ key ]) => key === currName ).flat()
      setPrice(result)
    };

  const priceNames = rate.market_data.current_price

  return (
    <>
      <div className="col py-3">
        <img
          className="mx-2"
          alt=''
          src={rate.image.small}
          width={20}
          height={20}
        />
          {rate.name}
      </div>
      <div className="col -mx-3 py-3">
        <div className='row'>
          {getSymbolFromCurrency(price[0])} {price[1]}
        </div>
      </div>
      <div className="col py-3">
        {rate.last_updated}
      </div>
      {<div className="col py-2">
        <Form.Select className='w-50'
          value={currentValue}
          onChange={({ target: { value } }) => {
            setCurrentValue(value);
            handleSelect(currentValue, priceNames);
          }}
        >
          {Object.keys(priceNames).map((name) => (
            <option key={name} value={name}>{name.toLocaleUpperCase()}</option>
          ))}
        </Form.Select>
      </div>}
    </>
  );
}