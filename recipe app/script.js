const searchBox = document.querySelector(".searchBox");
const searchBtn = document.querySelector(".searchBtn");
const recipeContainer = document.querySelector(".recipe-container");
const recipeDetailContent = document.querySelector(".recipe-details-content");
const recipeCloseBtn = document.querySelector(".recipe-close-btn");

const fetchRecipes = async (query) => {
    try {
        // Fetching recipe data
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();

    
        recipeContainer.innerHTML = "";

        
        if (response.meals) {
            response.meals.forEach((meal) => {
                // Creating recipe card
                const recipeDiv = document.createElement("div");
                recipeDiv.classList.add("recipe");

             
                recipeDiv.innerHTML = `
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                    <h3>${meal.strMeal}</h3>
                    <p>${meal.strCategory}</p>
                    <p>${meal.strArea} Dish</p>
                    `
                    const button = document.createElement("button");
                    button.textContent = "View Recipe";
                    recipeDiv.appendChild(button);

                    button.addEventListener("click", () => {
                        openRecipePopup(meal);
                    });
   
                recipeContainer.appendChild(recipeDiv);
            });
        } 
        else{ 
            recipeContainer.innerHTML = "<p>No recipes found. Try searching for something else!</p>";
        }
    } catch (error) {
        console.error("Error fetching recipes:", error);
        recipeContainer.innerHTML = "<p>Something went wrong. Please try again later.</p>";
    }
};

const fetchIngredients = (meal) => {
    let ingredientList ="";
    for(i=0; i<=20; i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            ingredientList += `<li>${measure} ${ingredient}</li>`
        }
        else{
            break;
        }
    }
    return ingredientList;
}

const openRecipePopup = (meal) =>{
    recipeDetailContent.innerHTML = `
        <h2 class="recipeName">${meal.strMeal}</h2>
        <h3>Ingredients:</h3>
        <ul class="ingredientList">${fetchIngredients(meal)}</ul>
        <div class="recipeInstructions">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>  
        </div>`
        
        recipeDetailContent.parentElement.style.display = "block";
}

recipeCloseBtn.addEventListener("click", () => {
    recipeDetailContent.parentElement.style.display = "none";
})

searchBtn.addEventListener("click", (event) => {
    event.preventDefault(); 
    const query = searchBox.value.trim();
    if (query) {
        fetchRecipes(query);
    }
});