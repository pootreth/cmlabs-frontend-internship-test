import axios from 'axios'
import { renderCategoryDetails } from './categoryDetails'

// eslint-disable-next-line no-undef
const app = $('#app')

export const renderCategories = async () => {
  app.html(`
    <div class="header-title">
      <h4>mealapp API website</h4>
      <h1>See All The Delicious Foods</h1>
    </div>
    <div id="menus">Loading...</div>
  `)

  const response = await axios.get(
    'https://www.themealdb.com/api/json/v1/1/categories.php'
  )

  const categories = response.data.categories

  // eslint-disable-next-line no-undef
  const categoriesMenu = $('#menus')
  categoriesMenu.html('')

  categories.forEach((category) => {
    // eslint-disable-next-line no-undef
    const button = $('<button></button>')
    button.addClass('menu')
    button.html(`
      <h3>${category.strCategory}</h3>
      <img src=${category.strCategoryThumb} />
    `)
    button.on('click', () => renderCategoryDetails(category.strCategory))
    categoriesMenu.append(button)
  })
}
