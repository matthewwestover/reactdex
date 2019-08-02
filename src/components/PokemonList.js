import React, { Component, Fragment } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';
import InfiniteScroll from 'react-infinite-scroller';
import { Alert } from 'react-bootstrap';

class PokemonList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0',
      items: 20,
      pokemon: [],
      hasMoreItems: true,
      nextHref: null,
    }
  }

  async componentDidMount() {
    await axios.get(this.state.url)
      .then( res => {
        this.setState({ pokemon: res.data.results})
      })
  }
  
  loadMore(page) {
    const updateURL = `https://pokeapi.co/api/v2/pokemon?limit=25&offset=${this.state.items}`
    if(this.state.items===820){
      this.setState({ hasMoreItems: false});
    }else{
        setTimeout(() => {
          axios.get(updateURL)
            .then( res => {
              this.setState({ 
                pokemon: [...this.state.pokemon, ...res.data.results],
                items: this.state.items + 20});
            })
    }, 2000);
    }
  }

  render() {
    const loading = <Alert variant='primary'>Loading Pokemon</Alert>
    return(
      <Fragment>
        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadMore.bind(this)}
          hasMore={this.state.hasMoreItems}
          loader={loading}>
            <div className='row' style={{ justifyContent: 'space-between' }}>
              {this.state.pokemon.map( pokemon => (
              <PokemonCard key= {pokemon.name} name={pokemon.name} url={pokemon.url} />
              ))}
            </div>
        </InfiniteScroll>
      </Fragment>
    )
  }
};

export default PokemonList;
