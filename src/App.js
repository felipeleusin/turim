import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import ListaPessoa from './components/ListaPessoas'

class App extends Component {

  state = { pessoa: null, filter: '' }

  handleFilterChange = (ev) => {
    this.setState({ filter: ev.target.value })
  }

  handlePessoaSelected = (pessoa) => {
    this.setState({ pessoa })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />ujhhkhkkhkhkhkhk
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          <input type="text" placeholder="Buscar..." onChange={this.handleFilterChange} value={this.state.filter} />
          <ListaPessoa filter={this.state.filter} onSelected={this.handlePessoaSelected} />
        </p>
      </div>
    );
  }
}

export default App;
