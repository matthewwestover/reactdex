import React, {Component} from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import Logo from '../assets/PokemonLogo.png'

class NavStuff extends Component {
  render() {
    return(
      <Navbar bg='red' fixed='top' variant='dark'>
        <Navbar.Brand href="/" className="pl-5">
          <img
            src={Logo}
            alt="Pokemon"
            height="40px"
          />
        </Navbar.Brand>
        <Nav className="mr-auto" style={{ color: 'white !important'}}>
          <Nav.Link href="/">Pokédex</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Coming Soon!" className="mr-sm-2" disabled />
          <Button variant="primary" disabled>Search</Button>
        </Form>
      </Navbar>
    )
  }
}

export default NavStuff;