import React, { Component, Fragment } from 'react'

import axios from 'axios'
import apiUrl from '../apiConfig'

// import { Link } from 'react-router-dom'
// import spinner component from react bootstrap

class Recipes extends Component {
  constructor () {
    super()

    this.state = {
      recipes: [],
      isLoaded: false
    }
  }

  componentDidMount = () => {
    console.log('Recipes component mounted', this.props.user)
    axios({
      url: `${apiUrl}/recipes`,
      method: 'get',
      headers: {
        Authorization: `Token token=${this.props.user.token}`
      }
    })
      .then(response => (
        this.setState({
          isLoaded: true,
          recipes: response.data.recipes
        })
      ))
      .catch(console.log)
  }

  render () {
    if (this.state.recipes.length === 0) {
      return <p>loading...</p>
    }
    console.log('Recipes component renders')

    return (
      <Fragment>
        <h2>Recipes:</h2>
        <ul>
          {this.state.recipes.map(recipe => (
            <li key={recipe.id}>
              {recipe.name}
            </li>
          ))}
        </ul>
      </Fragment>
    )
  }
}

export default Recipes
