import React, {Component, Fragment} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import background from './assets/background.jpg'

class App extends Component {
  render() {
    return (
      <div className='App' style={{ background: `url(${background})` }}>
        <Navbar />
        <div className='AppWindow'>
          <Dashboard />
        </div>
      </div>
    );
  }
}

export default App;
