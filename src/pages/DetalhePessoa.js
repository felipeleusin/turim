import React, { Component } from 'react'

export default class DetalhePessoa extends Component {
  state = { pessoa: null }

  componentDidMount() {
    fetch(`http://swapi.co/api/people/${this.props.match.params.id}`)
    .then((response) => response.json())
    .then((pessoa) => { this.setState({ pessoa })})
  }

  render() {
    return (<div>
      <h1>Oie {this.props.match.params.id}</h1>
      {this.state.pessoa === null ? (
        <h2>Carregando...</h2>
      ) : (
        <h2>{this.state.pessoa.name}</h2>
      )}
      </div>
    )
  }
}
