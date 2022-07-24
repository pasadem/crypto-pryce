import React, { useEffect, useState } from 'react';
import getSymbolFromCurrency from 'currency-symbol-map'
import { useSelector, useDispatch } from 'react-redux';
import { Col, Container } from 'react-bootstrap';
import { fetchInitialData, selectors } from '../slices/ratesSlice.js';
import CurrencySelect from './RateCurrencySelect.jsx';

const Rates = () => {
	const [ currency, setCurrency ] = useState([])
	console.log(currency)
  const dispatch = useDispatch();
  const rates = useSelector(selectors.selectAll);
  useEffect(() => {
		dispatch(fetchInitialData())
  }, [dispatch]);

  const handleSelect = (currName, ratesList) => {
	const result = Object.values(ratesList).filter((value) => value.code === currName)
    setCurrency(result[0])
	return;
  };

	return (
	<>
		<Container className='pt-5 pb-3'>
			<div className="row font-bold row-cols-1 row-cols-sm-2 row-cols-md-4">
				<div className="col"><h5>Currency</h5></div>
				<div className="col"><h5>Rate</h5></div>
				<div className="col"><h5>Time updated</h5></div>
				<div className="col"><h5>Select Rate Currency</h5></div>
			</div>
		</Container>    
		<Container>
			{rates.map(({ chartName, time, bpi }, id) => (
				<div key={id} className="row bg-light row-cols-1 row-cols-sm-2 row-cols-md-4">
					<div className="col py-2">
						{chartName}
					</div>
					<div className="col py-2">
						<div className='row'>
							<Col>{getSymbolFromCurrency(currency.code)}{currency.rate}</Col>
							<Col>{currency.code}</Col>
						</div>
					</div>
					<div className="col py-2">
						{time.updated}
					</div>
					<div className="col">
						<CurrencySelect 
						bpi={bpi} 
						handleSelect={handleSelect}
						 />
					</div>
				</div>
			))}
	</Container>
	</>
	
	);
};

export default Rates;
