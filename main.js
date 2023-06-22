import axios from 'axios'

const app = document.getElementById('app')

const renderItemDetails = async (idMeal) => {
  app.innerHTML = ''

  const response = await axios.get(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
  )

  const meal = response.data.meals[0]

  app.innerHTML += `
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
  `

  const ul = document.getElementById('ingredients')
  for (let index = 1; index <= 20; index++) {
    const measure = meal[`strMeasure${index}`]
    const ingredient = meal[`strIngredient${index}`]

    if (measure.trim() !== '' && ingredient.trim() !== '') {
      ul.innerHTML += `<li>${measure} ${ingredient}</li>`
    }
  }
}

const renderCategoryDetails = async (category) => {
  app.innerHTML = ''

  app.innerHTML += `
    <h1 class="category-title">${category} Meals</h1>
    <div id="menus">Loading...</div>
  `

  const response = await axios.get(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category} `
  )

  const meals = response.data.meals

  const mealsMenu = document.getElementById('menus')
  mealsMenu.innerHTML = ''

  meals.forEach((meal) => {
    const button = document.createElement('button')
    button.classList.add('menu')
    button.innerHTML = `
      <h3>${meal.strMeal}</h3>
      <img src=${meal.strMealThumb} />
    `
    button.addEventListener('click', () => renderItemDetails(meal.idMeal))
    mealsMenu.appendChild(button)
  })
}

const renderCategories = async () => {
  app.innerHTML = `
    <div class="header-title">
      <h4>mealapp API website</h4>
      <h1>See All The Delicious Foods</h1>
    </div>
    <div id="menus">Loading...</div>
  `

  const response = await axios.get(
    'https://www.themealdb.com/api/json/v1/1/categories.php'
  )

  const categories = response.data.categories

  const categoriesMenu = document.getElementById('menus')
  categoriesMenu.innerHTML = ''

  categories.forEach((category) => {
    const button = document.createElement('button')
    button.classList.add('menu')
    button.innerHTML = `
      <h3>${category.strCategory}</h3>
      <img src=${category.strCategoryThumb} />
    `
    button.addEventListener('click', () =>
      renderCategoryDetails(category.strCategory)
    )
    categoriesMenu.appendChild(button)
  })
}

renderCategories()
