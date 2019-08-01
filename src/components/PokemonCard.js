import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

class PokemonCard extends Component {
  state = {
    name: '',
    imageURL: '',
    pokemonIndex: '',
  }

  componentDidMount() {
    const {name, url} = this.props;
    const pokemonIndex = url.split('/')[url.split('/').length - 2]
    const imageURL = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`;

    this.setState({name, imageURL, pokemonIndex})
  }

  render() {
    const {name, imageURL, pokemonIndex} = this.state;

    return(
      <Card text='light' className='cardStyle col-md-2 col-sm-12' style={{ marginBottom: '1rem'}}>
        <Card.Header>{name}</Card.Header>
        <Card.Body>
          <Card.Text>Test Card</Card.Text>
        </Card.Body>
      </Card>
    )
  }
};

export default PokemonCard;