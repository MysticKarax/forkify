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
