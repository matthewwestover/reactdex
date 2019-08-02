import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom'
import { Form, FormControl, Button, } from 'react-bootstrap';
import Autosuggest from 'react-autosuggest';

const pokemon = [
  'Bulbasaur',
  'Charmander',
  'Squirtle',
  'Rattata',
  'Mewtwo',
];

const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : pokemon.filter(pokemon =>
    pokemon.toLowerCase().slice(0, inputLength) === inputValue
  );
};

const getSuggestionValue = suggestion => suggestion

const renderSuggestion = suggestion => (
  <span>{suggestion}</span>
);

class Search extends Component {
  state = {
    value: '',
    suggestions: [],
  }

  handleSubmit = e => {
    e.preventDefault();
    const search = this.state.value.toLowerCase();
    axios.get(`https://pokeapi.co/api/v2/pokemon/${search}/`)
      .then( res => {
        this.setState({value: '',})
        this.props.history.push(`/pokemon/${res.data.id}`)
      })
  } 

  onChange = (event, {newValue, }) => {
    this.setState({
      value: newValue
    });
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  }

  render() {
    const { value, suggestions } = this.state; 
    const inputProps = {
      placeholder: 'Search',
      value,
      onChange: this.onChange,
      className: 'mr-sm-2',
      type: 'text'
    };
    return(
    <Form inline className="pr-5" onSubmit={this.handleSubmit}>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
      {/* <FormControl 
        type="text" 
        name="Search"
        placeholder="Search" 
        value={value}
        className="mr-sm-2" 
        onChange={this.handleChange}
      /> */}
      <Button variant="primary" onClick={this.handleSubmit}>Search</Button>
    </Form>
    )
  }
}

export default withRouter(Search);