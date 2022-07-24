import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

export default function CurrencySelect({ handleSelect, bpi }) {
  const [curr, setCurr] = useState('USD');

  useEffect(() => {
    handleSelect(curr, bpi)
  });

  return (
    <>
    {<Form.Select className='w-50'
      value={curr}
      onChange={({ target: { value } }) => {
        setCurr(value);
        handleSelect(curr, bpi);
      }}
    >
      {Object.keys(bpi).map((car) => (
        <option key={car} value={car}>{car}</option>
      ))}
    </Form.Select>}
    </>
  );
}