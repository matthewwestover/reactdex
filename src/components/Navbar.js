import React, {Component} from 'react';
import { Navbar, Nav, } from 'react-bootstrap';
import Search from './Search'
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
          {/* <Nav.Link href='/team'>Team Builder</Nav.Link> */}
          {/* <Nav.Link href='/about'>About</Nav.Link> */}
        </Nav>
        <Search />
      </Navbar>
    )
  }
}

export default NavStuff;