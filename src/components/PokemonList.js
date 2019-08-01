import React, { Component } from 'react';
import PokemonCard from './PokemonCard';

class PokemonList extends Component {
  render() {
    return(
      <div className='row' style={{ justifyContent: 'space-between' }}>
        <PokemonCard />
        <PokemonCard />
        <PokemonCard />
        <PokemonCard />
        <PokemonCard />
        <PokemonCard />
        <PokemonCard />
        <PokemonCard />
        <PokemonCard />
        <PokemonCard />
      </div>
    )
  }
};

export default PokemonList;