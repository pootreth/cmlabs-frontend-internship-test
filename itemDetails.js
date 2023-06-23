import axios from 'axios'

// eslint-disable-next-line no-undef
const app = $('#app')

export const renderItemDetails = async (idMeal) => {
  app.html('')

  const response = await axios.get(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
  )

  const meal = response.data.meals[0]

  app.append(`
    <h1 class="items-title">${meal.strMeal}</h1>
    <div class="item-details">
      <p>${meal.strArea} Culinary</p>
      <div class="row-above">
        <img src=${meal.strMealThumb} />
        <div class="col-kanan">
          <div class="item-instruction">
            <h3>Instructions</h3>
            <h5>${meal.strInstructions}</h5>
          </div>
          <div class="item-recipe">
            <h3>Recipes</h3>
            <ul id="ingredients"></ul>
          </div>
        </div>
      </div>
    </div>
  `)

  // eslint-disable-next-line no-undef
  const ul = $('#ingredients')
  for (let index = 1; index <= 20; index++) {
    const measure = meal[`strMeasure${index}`]
    const ingredient = meal[`strIngredient${index}`]

    if (measure.trim() !== '' && ingredient.trim() !== '') {
      ul.append(`<li>${measure} ${ingredient}</li>`)
    }
  }
}
