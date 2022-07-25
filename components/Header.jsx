import { Container } from 'react-bootstrap';

export default function Header() {
return (
	<Container className='d-flex header fixed-top flex-column'>    
		<Container className='mb-3'>
			<div className='navbar navbar-dark py-2 px-4 bg-dark'>
				<a className="navbar-brand" href="#">Crypto Coins rates</a> 
			</div>
		</Container>
		<Container className="d-flex">
			<div className="col p-2"><h5>Name</h5></div>
			<div className="col p-2"><h5>Price</h5></div>
			<div className="col p-2"><h5>Last updated</h5></div>
			<div className="col p-2"><h5>Select Price Currency Name</h5></div>
		</Container> 
	</Container>
)};
    