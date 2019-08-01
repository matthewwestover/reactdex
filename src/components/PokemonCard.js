import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

class PokemonCard extends Component {
  render() {
    return(
      <Card text='light' className='cardStyle col-md-2 col-sm-12' style={{ marginBottom: '1rem'}}>
        <Card.Header>Test Header</Card.Header>
        <Card.Body>
          <Card.Text>Test Card</Card.Text>
        </Card.Body>
      </Card>
    )
  }
};

export default PokemonCard;