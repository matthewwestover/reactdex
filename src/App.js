import React, {Component, Fragment} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
;

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Navbar />
        <div className='AppWindow'>
          <Dashboard />
        </div>
      </div>
    );
  }
}

export default App;
