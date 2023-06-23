import axios from 'axios'
import { renderItemDetails } from './itemDetails'

// eslint-disable-next-line no-undef
const app = $('#app')

export const renderCategoryDetails = async (category) => {
  app.html('')

  app.append(`
    <h1 class="category-title">${category} Meals</h1>
    <div id="menus">Loading...</div>
  `)

  const response = await axios.get(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category} `
  )

  const meals = response.data.meals

  // eslint-disable-next-line no-undef
  const mealsMenu = $('#menus')
  mealsMenu.html('')

  meals.forEach((meal) => {
    // eslint-disable-next-line no-undef
    const button = $('<button></button>')
    button.addClass('menu')
    button.html(`
      <h3>${meal.strMeal}</h3>
      <img src=${meal.strMealThumb} />
    `)
    button.on('click', () => renderItemDetails(meal.idMeal))
    mealsMenu.append(button)
  })
}
