import "../index.css";
import { state, loadRecipe } from "./model";
import recipeView from "./views/recipeView";

const controlRecipes = async function () {
  const id = window.location.hash.slice(1);

  if (!id) return;
  recipeView.renderSpinner();
  try {
    // 1.- Get data from API
    await loadRecipe(id);

    console.log(state.recipe);
    // 2.- Render recipies
    recipeView.render(state.recipe);
  } catch (error) {
    // 1.b Manejar los errores

    recipeView.renderError();
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};

init();
