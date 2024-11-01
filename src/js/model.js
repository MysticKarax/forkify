import { API_KEY, API_URL } from "./config";
import { getJSON } from "./helpers";

export const state = {
  recipe: {
    id: null,
    title: null,
    publisher: null,
    sourceUrl: null,
    image: null,
    servings: null,
    cookingTime: null,
    ingredients: null,
  },
  search: {
    query: "",
    results: [],
  },
};

export const loadRecipe = async (id) => {
  try {
    const data = await getJSON(`${API_URL}/${id}?key=${API_KEY}`);
    const recipeData = data.data.recipe;
    state.recipe = {
      id: recipeData.id,
      title: recipeData.title,
      publisher: recipeData.publisher,
      sourceUrl: recipeData.source_url,
      image: recipeData.image_url,
      servings: recipeData.servings,
      cookingTime: recipeData.cooking_time,
      ingredients: recipeData.ingredients,
    };
  } catch (error) {
    throw error;
  }
};

export const loadSearchResults = async function (query) {
  state.search.query = query;
  try {
    const data = await getJSON(`${API_URL}/?search=${query}&key=${API_KEY}`);
    state.search.results = data.data.recipes.map((recipe) => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
  } catch (error) {
    throw error;
  }
};
