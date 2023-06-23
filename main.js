import { renderCategories } from './category'

// eslint-disable-next-line no-undef
$(document).ready(function () {
  // eslint-disable-next-line no-undef
  const nav = $('#navbar')

  nav.html(`
    <h2 class='logo'>mealapp</h2>
    <ul>
      <a href="#"><li>Home</li></a>
      <a href="#"><li>Foods</li></a>
      <a href="#"><li>Ingredients</li></a>
      <a href="#"><li>Local Culinary</li></a>
    </ul>
  `)

  renderCategories()
})
