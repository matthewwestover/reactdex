import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Pokemon from './components/Pokemon';
import NoMatch from './components/NoMatch';
import background from './assets/background.jpg'

class App extends Component {
  render() {
    return (
      <div className='App' style={{ background: `url(${background})` }}>
        <Navbar />
        <div className='AppWindow'>
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route exact path='/pokemon/:pokemonIndex' component={Pokemon} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
