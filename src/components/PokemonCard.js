import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import spinner from '../assets/spinner.gif';
import styled from 'styled-components';

const Sprite = styled.img`
  width: 50% !important;
  display: none;
`


class PokemonCard extends Component {
  state = {
    name: '',
    imageURL: '',
    pokemonIndex: '',
    imageLoading: true,
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
      <Card className='cardStyle col-md-2 col-sm-12' style={{ marginBottom: '1rem'}}>
        <Card.Header>Pokédex #{pokemonIndex}</Card.Header>
        {this.state.imageLoading ? (
          <img
            alt="Loading"
            src={spinner}
            className="card-img-top rounded mx-auto d-block mt-2"
          />
          ) : null}
          <Sprite
            className="card-img-top rounded mx-auto mt-2"
            src={imageURL}
            onLoad={() => this.setState({ imageLoading: false })}
            style={
              this.state.imageLoading
              ? null
              : { display: 'block' }
            }
            />
        <Card.Body className='mx-auto'>
          <Card.Text className='cardName'>{name.toLowerCase().split(' ').map(letter => letter.charAt(0).toUpperCase() + letter.substring(1)).join(' ')}</Card.Text>
        </Card.Body>
      </Card>
    )
  }
};

export default PokemonCard;