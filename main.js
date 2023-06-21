import axios from "axios";

const app = document.getElementById("app");

const renderCategoryDetails = async (category) => {
  app.innerHTML = "";

  app.innerHTML += `
    <h1 class="category-title">${category} Meals</h1>
    <div id="menus">Loading...</div>
  `;

  const response = await axios.get(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category} `
  );

  const { meals } = response.data;

  const mealsMenu = document.getElementById("menus");
  mealsMenu.innerHTML = "";

  meals.forEach((meal) => {
    const button = document.createElement("button");
    button.classList.add("menu");
    button.innerHTML = `
      <h3>${meal.strMeal}</h3>
      <img src=${meal.strMealThumb} />
    `;
    button.addEventListener("click", () => {});
    mealsMenu.appendChild(button);
  });
};

const renderCategories = async () => {
  app.innerHTML = `
    <div class="header-title">
      <h4>mealapp API website</h4>
      <h1>See All The Delicious Foods</h1>
    </div>
    <div id="menus">Loading...</div>
  `;

  const response = await axios.get(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );

  const { categories } = response.data;

  const categoriesMenu = document.getElementById("menus");
  categoriesMenu.innerHTML = "";

  categories.forEach((category) => {
    const button = document.createElement("button");
    button.classList.add("menu");
    button.innerHTML = `
      <h3>${category.strCategory}</h3>
      <img src=${category.strCategoryThumb} />
    `;
    button.addEventListener("click", () =>
      renderCategoryDetails(category.strCategory)
    );
    categoriesMenu.appendChild(button);
  });
};

renderCategories();
