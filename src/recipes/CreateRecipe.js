import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router'

import axios from 'axios'
import apiUrl from '../apiConfig'

class CreateRecipe extends Component {
  constructor () {
    super()

    this.state = {
      recipe: {
        name: '',
        date: '',
        rating: 0,
        fermented: false,
        ingredients: '',
        notes: ''
      },
      created: false
    }
  }

  handleSubmit = event => {
    event.preventDefault()

    const { recipe } = this.state

    axios({
      url: `${apiUrl}/recipes`,
      method: 'post',
      headers: {
        Authorization: `Token token=${this.props.user.token}`
      },
      data: { recipe }
    })
      .then(response => (
        this.setState({
          created: true,
          recipes: response.data.recipes
        })
      ))
      .catch(console.log)
  }

  handleChange = event => {
    event.preventDefault()

    const inputName = event.target.name

    // fix checkbox to be true or false instead of 'on' or ''
    const updatedInputValue = event.target.type === 'checkbox' ? event.target.checked : event.target.value

    // spread operator to copy this.state object into new object
    const updatedRecipe = { ...this.state.recipe, [inputName]: updatedInputValue }
    this.setState({ recipe: updatedRecipe })
  }

  render () {
    const { name, date, rating, fermented, ingredients, notes } = this.state.recipe

    if (this.state.created) {
      return <Redirect to='/recipes' />
    }
    return (
      <Fragment>
        <form className="auth-form" onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            value={name}
            name="name"
            onChange={this.handleChange}
          />
          <label htmlFor="date">Date</label>
          <input
            type="date"
            value={date}
            name="date"
            onChange={this.handleChange}
          />
          <label htmlFor="rating">Rating</label>
          <input
            type="number"
            value={rating}
            name="rating"
            onChange={this.handleChange}
          />
          <label htmlFor="fermented">Fermented?</label>
          <input
            type="checkbox"
            value={fermented}
            name="fermented"
            onChange={this.handleChange}
          />
          <label htmlFor="ingredients">Ingredients</label>
          <input
            type="textarea"
            value={ingredients}
            name="ingredients"
            onChange={this.handleChange}
          />
          <label htmlFor="notes">Notes</label>
          <input
            type="textarea"
            value={notes}
            name="notes"
            onChange={this.handleChange}
          />
          <input type="submit"/>
        </form>
      </Fragment>
    )
  }
}

export default CreateRecipe
