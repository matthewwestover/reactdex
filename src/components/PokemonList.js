import React, { Component, Fragment } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';

class PokemonList extends Component {
  state = {
    url: 'https://pokeapi.co/api/v2/pokemon',
    pokemon: null,
  }

  // ?limit=807&offset=0

  async componentDidMount() {
    await axios.get(this.state.url)
      .then( res => {
        this.setState({ pokemon: res.data.results})
      })
  }

  render() {
    return(
      <Fragment>
        {this.state.pokemon ? (
          <div className='row' style={{ justifyContent: 'space-between' }}>
            {this.state.pokemon.map( pokemon => (
              <PokemonCard key= {pokemon.name} name={pokemon.name} url={pokemon.url} />
              ))}
          </div>
        ) : (
          <h1>Loading Pokémon</h1>
        )}
      </Fragment>
    )
  }
};

export default PokemonList;