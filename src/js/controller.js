import "../index.css";
import { state, loadRecipe, loadSearchResults } from "./model";
import recipeView from "./views/recipeView";
import searchView from "./views/searchView";

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

const controlSearchResults = async function () {
  try {
    // 1.- Get search query
    const query = searchView.getQuery();
    if (!query) return;
    // 2.- Cargar los resultados del search
    await loadSearchResults(query);
    // 3.- Render Results
    console.log(state.search.query);
    console.log(state.search.results);
  } catch (error) {
    console.log(error);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};

init();
