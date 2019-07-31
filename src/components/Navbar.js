import React, {Component} from 'react';
import { Navbar as Nav } from 'react-bootstrap';

class Navbar extends Component {
  render() {
    return(
      <Nav bg='dark' fixed='top' variant='dark'>
        <Nav.Brand href='/'>Pokedex</Nav.Brand>
      </Nav>
    )
  }
}

export default Navbar;