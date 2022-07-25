import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';
import { fetchInitialData, selectors } from '../slices/ratesSlice.js';
import Rate from './Rate.jsx';

const Rates = () => {
  const dispatch = useDispatch();
  const rates = useSelector(selectors.selectAll);
  const loadingStatus = useSelector((state) => state.rates.loading)
  
	useEffect(() => {
	  setInterval(() => dispatch(fetchInitialData()), 3000)
  }, [dispatch]);

	return (
		<Container className='d-flex flex-column pt-6 main '>
			{rates.map((rate) => (
				<div key={rate.id} className="row bg-light my-1 mt-50 row-cols-1 row-cols-sm-2 row-cols-md-4">
					<Rate 
						rate={rate} 
				    />
				</div>
			))}
		</Container>
	);
};

export default Rates;
