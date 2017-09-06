import React, { Component } from 'react'
import { keyBy, map, debounce } from 'lodash'
import { Link } from 'react-router-dom'
import qs from 'query-string'

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
  state = { pessoas: null, deleted: []  }

  componentDidMount() {
    this.loadData()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.location.search !== prevProps.location.search) {
      this.debouceLoad()
    }
  }

  loadData = () => {
    this.setState({ pessoas: null })
    const { page = 1, search = '' } = qs.parse(this.props.location.search)
    fetch(`http://swapi.co/api/people?${qs.stringify({ page, search })}`)
    .then((response) => response.json())
    .then((data) => {
      this.setState({ pessoas: keyBy(data.results, 'url') })
    })
  }

  debouceLoad = debounce(this.loadData, 250)

  handleRemove = (pessoa) => {
    this.setState((prevState) => ({ deleted: [...prevState.deleted, pessoa.url] }))
  }

  handleFilterChange = (ev) => {
    this.props.history.push({ search: `?search=${ev.target.value}` })
  }

  render() {
    const query = qs.parse(this.props.location.search)
    const search = query.search || ''
    const page = parseInt(query.page, 10) || 1

    return (
      <div>
        <input type="text" placeholder="Buscar..." onChange={this.handleFilterChange} value={search} />
        {this.state.pessoas === null ? (
          <h2>Carregando...</h2>
        ) : (
          <div>
            <ul>
              {map(this.state.pessoas, (pessoa) => (
                <ItemListaPessoa isDeleted={this.state.deleted.includes(pessoa.url)} onRemove={this.handleRemove} onClick={this.props.onPessoaSelected} key={pessoa.url} pessoa={pessoa} />
              ))}
            </ul>
            {page > 1 && (
              <Link to={{ search: `?${qs.stringify({ search, page: page - 1 })}` }}>Anterior</Link>
            )}
            <Link to={{ search: `?${qs.stringify({ search, page: page + 1 })}` }}>Próxima</Link>
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
