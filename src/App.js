import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import ListaPessoas from './pages/ListaPessoas'
import DetalhePessoa from './pages/DetalhePessoa'

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div className="App-intro">
          <Router>
            <Switch>
              <Route exact path="/" component={ListaPessoas} />
              <Route path="/pessoa/:id" component={DetalhePessoa} />
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
