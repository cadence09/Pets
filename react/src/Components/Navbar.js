
import React from 'react';
import './Navbar.css';
import { Navbar,Nav} from 'react-bootstrap'



const Navigation = (props) => {
    // console.log(props);
    return (
      

            <div>
            <h1>Pet Gala</h1>
            <Nav.Link href="/">Home</Nav.Link>
           <Nav.Link href="/Dogs">Dogs</Nav.Link>
           <Nav.Link href='/Cats'>Cats</Nav.Link>
            </div>
    

       
    )
}

export default Navigation;