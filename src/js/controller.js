import "../index.css";
const apiKey = import.meta.env.VITE_API_KEY;
const url = "https://forkify-api.herokuapp.com/api/v2/recipes";
const recipiesContainer = document.querySelector(".recipe");

const showRecipe = async function () {
  const id = window.location.hash.slice(1);

  let recipe = {
    id: null,
    title: null,
    publisher: null,
    sourceUrl: null,
    image: null,
    servings: null,
    cookingTime: null,
    ingredients: null,
  };
  // 1.- Get data from API
  // id 5ed6604591c37cdc054bc886
  try {
    // const res = await fetch(`${url}/5ed6604591c37cdc054bc886?key=${apiKey}`);
    // const res = await fetch(`${url}/664c8f193e7aa067e94e8438?key=${apiKey}`);
    if (!id) return;
    const res = await fetch(`${url}/${id}?key=${apiKey}`);

    // 1.a Esperar la respuesta y convertirla a JSON
    const data = await res.json();

    if (!res.ok)
      throw new Error(`Message: ${data.message} Status: ${res.status}`);
    const recipeData = data.data.recipe;

    recipe = {
      id: recipeData.id,
      title: recipeData.title,
      publisher: recipeData.publisher,
      sourceUrl: recipeData.source_url,
      image: recipeData.image_url,
      servings: recipeData.servings,
      cookingTime: recipeData.cooking_time,
      ingredients: recipeData.ingredients,
    };
    console.log(recipe);
    // 2.- Render recipies
    const markup = `
        <figure class="recipe__fig">
          <img
            src="${recipe.image}"
            alt="${recipe.title}"
            class="recipe__img w-full h-full object-cover block"
          />
          <h1
            class="recipe__title absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/4 -skew-y-6 text-white font-semibold text-5xl uppercase text-center leading-[1.95] w-3/4"
          >
            <span class="py-5 px-8 bg-gradient-custom box-decoration-clone"
              >${recipe.title}</span
            >
          </h1>
        </figure>

        <div
          class="recipe__details flex items-center px-32 pt-28 pb-14 text-xl justify-between"
        >
          <div class="flex gap-2">
            <div class="recipe__info flex items-center">
              <svg class="recipe__info-icon mr-4">
                <use href="src/img/icons.svg#icon-clock"></use>
              </svg>
              <span
                class="recipe__info-data recipe__info-data--minutes font-bold mr-1"
                >${recipe.cookingTime}</span
              >
              <span class="recipe__info-text uppercase">minutes</span>
            </div>
            <div class="recipe__info flex items-center">
              <svg class="recipe__info-icon mr-4">
                <use href="src/img/icons.svg#icon-users"></use>
              </svg>
              <span
                class="recipe__info-data recipe__info-data--people font-bold mr-1"
                >${recipe.servings}</span
              >
              <span class="recipe__info-text uppercase mr-4">servings</span>

              <div class="recipe__info-buttons flex items-center gap-2">
                <button class="btn--tiny btn--increase-servings">
                  <svg>
                    <use href="src/img/icons.svg#icon-minus-circle"></use>
                  </svg>
                </button>
                <button class="btn--tiny btn--increase-servings">
                  <svg>
                    <use href="src/img/icons.svg#icon-plus-circle"></use>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div class="recipe__user-generated invisible">
            <svg>
              <use href="src/img/icons.svg#icon-user"></use>
            </svg>
          </div>
          <button
            class="btn--round place-self-end bg-gradient-custom p-2 rounded-full"
          >
            <svg class="fill-white">
              <use href="src/img/icons.svg#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div
          class="recipe__ingredients bg-grey-light-2 py-16 px-32 flex flex-col items-center gap-8"
        >
          <h2 class="heading--2 text-primary font-extrabold text-2xl uppercase">
            Recipe ingredients
          </h2>
          <ul class="recipe__ingredient-list grid grid-cols-2">
          ${recipe.ingredients
            .map((ing) => {
              return `
              <li class="recipe__ingredient flex">
              <svg class="recipe__icon mr-4">
                <use href="src/img/icons.svg#icon-check"></use>
              </svg>
              <div class="recipe__quantity mr-1">${ing.quantity}</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ing.unit}</span>
                ${ing.description}
              </div>
            </li>  
              `;
            })
            .join("")}
            
          </ul>
        </div>

        <div
          class="recipe__directions py-16 px-32 flex flex-col items-center gap-8"
        >
          <h2 class="heading--2 text-primary font-extrabold text-2xl uppercase">
            How to cook it
          </h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${recipe.publisher}</span>. Please
            check out directions at their website.
          </p>
          <a
            class="btn--small recipe__btn flex gap-1"
            href="${recipe.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
      </div>
    `;
    recipiesContainer.insertAdjacentHTML("afterbegin", markup);
  } catch (error) {
    // 1.b Manejar los errores
    console.error(error);
  }
};

const events = ["hashchange", "load"];
events.forEach((event) => window.addEventListener(event, showRecipe));
