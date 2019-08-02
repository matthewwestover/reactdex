import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom'
import { Form, FormControl, Button } from 'react-bootstrap';

class Search extends Component {
  state = {
    value: '',
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

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  }

  render() {
    const { value } = this.state; 
    return(
    <Form inline className="pr-5" onSubmit={this.handleSubmit}>
      <FormControl 
        type="text" 
        name="Search"
        placeholder="Search" 
        value={value}
        className="mr-sm-2" 
        onChange={this.handleChange}
      />
      <Button variant="primary" onClick={this.handleSubmit}>Search</Button>
    </Form>
    )
  }
}

export default withRouter(Search);