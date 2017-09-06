import React, { Component } from 'react'
import { keyBy, map } from 'lodash'

class ItemListaPessoa extends Component {
  handleClick = () => {
    this.props.onClick(this.props.pessoa)
  }

  handleRemove = () => {
    this.props.onRemove(this.props.pessoa)
  }

  render() {
    const style = this.props.isDeleted ? { color: 'red' } : {}
    return (<li style={style}><a onClick={this.handleClick}>{this.props.pessoa.name}</a> <button onClick={this.handleRemove}>X</button></li>)
  }
}

export default class ListaPessoas extends Component {
  state = { pessoas: null, deleted: [], page: 1  }

  componentDidMount() {
    this.loadData()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.filter !== this.props.filter) {
      this.setState({ page: 1 })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      (prevProps.filter !== this.props.filter) ||
      (prevState.page !== this.state.page)
    ) {
      this.loadData()
    }
  }

  loadData = () => {
    this.setState({ pessoas: null })
    fetch(`http://swapi.co/api/people?page=${this.state.page}&search=${this.props.filter}`)
    .then((response) => response.json())
    .then((data) => {
      this.setState({ pessoas: keyBy(data.results, 'url') })
    })
  }

  handleRemove = (pessoa) => {
    this.setState((prevState) => ({ deleted: [...prevState.deleted, pessoa.url] }))
  }

  handlePrevious = () => {
    this.setState({ page: this.state.page - 1 })
  }

  handleNext = () => {
    this.setState({ page: this.state.page + 1 })
  }

  render() {
    return (
      <div>
        {this.state.pessoas === null ? (
          <h2>Carregando...</h2>
        ) : (
          <div>
            <ul>
              {map(this.state.pessoas, (pessoa) => (
                <ItemListaPessoa isDeleted={this.state.deleted.includes(pessoa.url)} onRemove={this.handleRemove} onClick={this.props.onPessoaSelected} key={pessoa.url} pessoa={pessoa} />
              ))}
            </ul>
            {this.state.page > 1 && (
              <button onClick={this.handlePrevious}>Anterior</button>
            )}
            <button onClick={this.handleNext}>Próxima</button>
            {this.state.deleted.length > 0 && (
              <div>
              <h4>A Remover:</h4>
              <ul>{this.state.deleted.map((url) => (
                <li>{this.state.pessoas[url].name}</li>
              ))}</ul>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
}
