import React, {Component, Fragment} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Navbar />
      </Fragment>
    );
  }
}

export default App;
