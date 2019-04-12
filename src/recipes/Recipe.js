import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router'
import { Link, withRouter } from 'react-router-dom'

import axios from 'axios'
import apiUrl from '../apiConfig'

// import { Link } from 'react-router-dom'
// import spinner component from react bootstrap

class Recipe extends Component {
  constructor () {
    super()

    this.state = {
      recipe: null,
      shouldRedirect: false
    }
  }

  componentDidMount = () => {
    console.log('Recipes component mounted', this.props.user)
    axios({
      url: `${apiUrl}/recipes/${this.props.match.params.id}`,
      method: 'get',
      headers: {
        Authorization: `Token token=${this.props.user.token}`
      }
    })
      .then(response => (
        this.setState({ recipe: response.data.recipe })
      ))
      .catch(console.log)
  }

  handleOnDelete = event => {
    axios({
      url: `${apiUrl}/recipes/${this.props.match.params.id}`,
      method: 'delete',
      headers: {
        Authorization: `Token token=${this.props.user.token}`
      }
    })
      .then(() => this.setState({ shouldRedirect: true }))
      .catch(console.log)
  }

  render () {
    if (!this.state.recipe) {
      return <p>loading...</p>
    }

    if (this.state.shouldRedirect) {
      return <Redirect to={{
        pathname: '/recipes'
      }} />
    }

    console.log('Recipe component renders')
    const { id, name, date, rating, fermented, ingredients, notes } = this.state.recipe
    return (
      <Fragment>
        <h2>Recipe</h2>
        <p>Name: {name}</p>
        <p>Date: {date}</p>
        <p>Rating: {rating}</p>
        <p>fermented? {fermented ? 'yes' : 'no'}</p>
        <p>ingredients: {ingredients}</p>
        <p>notes: {notes}</p>
        <button key={id} onClick={this.handleOnDelete}>Delete</button>
        <Link to={this.props.match.url + '/edit'}><button>Edit</button></Link>
      </Fragment>
    )
  }
}

// Will pass props to router upon export
export default withRouter(Recipe)
