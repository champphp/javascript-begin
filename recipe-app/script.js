const meals = document.getElementById('meals')
const FavoriteContainer = document.getElementById('fav-meals')
const searchTerm = document.getElementById('search-term')
const searchBtn = document.getElementById('search')
const mealPopup = document.getElementById('meal-popup')
const closePopup = document.getElementById('close-popup')
const mealInfoEl = document.getElementById('meal-info')

const getRandomMeal = async () => {
  const resp = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
  const respData = await resp.json()
  const randomMeal = respData.meals[0]
  // console.log(randomMeal)
  addMeal(randomMeal, true)
}

const getMealById = async (id) => {
  const resp = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
  const respData = await resp.json()
  const meal = respData.meals[0]
  return meal
}

const getMealBySearch = async (term) => {
  const resp = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
  const respData = await resp.json()
  const meal = respData.meals
  return meal
}

const addMeal = (mealData, rendom = false) => {
  // console.log(mealData)
  const meal = document.createElement('div')
  meal.classList.add('meal')
  meal.innerHTML =  `
  <div class="meal-header">
  ${rendom ? `
  <span class="random">
    Random Recipe
  </span>` : '' }
    <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}" />
  </div>
  <div class="meal-body">
    <h4>${mealData.strMeal}</h4>
    <button class="fav-btn">
      <i class="fas fa-heart"></i>
    </button>
  </div>
  `
  const btn = meal.querySelector('.meal-body .fav-btn')
  btn.addEventListener('click',() => {
    if(btn.classList.contains('active')) {
      removeMealsLS(mealData.idMeal)
      btn.classList.remove('active')
    } else{
      addMealsLS(mealData.idMeal)
      btn.classList.add('active')
    }
    fetchFavMeals()
  })

  meal.addEventListener('click', () => {
    showMealInfo(mealData)
  })

  meals.appendChild(meal)
}

const addMealsLS = (mealId) => {
  const mealIds = getMealsLS();
  localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealId]))
}

const removeMealsLS = (mealId) => {
  const mealIds = getMealsLS();
  localStorage.setItem('mealIds', 
    JSON.stringify(mealIds.filter((id) => id !== mealId)))
}

const getMealsLS = () => {
  const mealIds = JSON.parse(localStorage.getItem('mealIds'))
  return mealIds === null ? [] : mealIds
}

const fetchFavMeals = async () => {
  FavoriteContainer.innerHTML = ''
  const mealIds = getMealsLS();
  for (let i = 0; i < mealIds.length; i++) {
    const mealId = mealIds[i];
    const meal = await getMealById(mealId)
    addMealFav(meal)
  }
}

const addMealFav = (mealData) => {
  const Favmeal = document.createElement('li')
  Favmeal.innerHTML =  `
  <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
  <span>${mealData.strMeal}</span>
  <button class="clear"><i class="fas fa-window-close"></i></button>
  `
  const btn = Favmeal.querySelector('.clear')
  btn.addEventListener('click', () => {
    removeMealsLS(mealData.idMeal)
    fetchFavMeals()
  })

  Favmeal.addEventListener('click', () => {
    showMealInfo(mealData)
  })

  FavoriteContainer.appendChild(Favmeal)
}

searchBtn.addEventListener('click', async () => {
  meals.innerHTML = ''
  const search = searchTerm.value
  const mealsList = await getMealBySearch(search)
  if(mealsList) {
    mealsList.forEach((meal) => {
      addMeal(meal)
    })
  }
})

const showMealInfo = (mealData) => {
  mealInfoEl.innerHTML = ''
  const mealEl = document.createElement('div')

  const ingredients = []

  for (let i = 1; i <= 20; i++) {
    if(mealData[`strIngredient${i}`]){
      ingredients.push(`${mealData[`strIngredient${i}`]} - ${mealData[`strMeasure${i}`]}`)
    }else{
      break;
    }
  }

  mealEl.innerHTML = `
  <h1>${mealData.strMeal}</h1>
  <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}" />
  <p>
    ${mealData.strInstructions}
  </p>
  <h3>Ingredient:</h3>
  <ul>
    ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
  </ul>
  `

  mealInfoEl.appendChild(mealEl)

  mealPopup.classList.remove('hidden')
}

closePopup.addEventListener('click', () => {
  mealPopup.classList.add('hidden')
})

getRandomMeal()
fetchFavMeals()