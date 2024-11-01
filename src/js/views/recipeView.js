import fracty from "fracty";

class RecipeView {
  _parentElement = document.querySelector(".recipe");
  _data;
  _errorMessage = "No recipes found for your query. Please try again!";
  _message;
  render(data) {
    if (!data) return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    this._clean();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _clean() {
    this._parentElement.innerHTML = "";
  }

  renderSpinner() {
    const markup = `
      <div class="flex justify-center items-center w-full p-10">
        <svg class="h-14 w-14 fill-primary animate-spin">
            <use href="src/img/icons.svg#icon-loader"></use>
        </svg>
      </div>
      `;

    const markupTailwind = `
        <div class="flex justify-center items-center w-full p-10">
            <div class="h-14 w-14 border-primary rounded-full border-b-2 animate-spin">
            </div>
        </div>
      `;
    this._clean();
    this._parentElement.insertAdjacentHTML("afterbegin", markupTailwind);
  }

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error flex items-center w-full p-4 gap-4 mt-8">
        <div>
          <svg class="fill-primary size-6">
            <use href="src/img/icons.svg#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
        
      </div> 
    `;

    this._clean();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderMessage(message = this._message) {
    const markup = `
    <div class="message">
      <div>
        <svg>
          <use href="src/img/icons.svg#icon-smile"></use>
        </svg>
      </div>
      <p>Start by searching for a recipe or an ingredient. Have fun!</p>
    </div> 
    `;
    this._clean();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _generateMarkup() {
    return `
        
        <figure class="recipe__fig">
          <img
            src="${this._data.image}"
            alt="${this._data.title}"
            class="recipe__img w-full h-full object-cover block"
          />
          <h1
            class="recipe__title absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/4 -skew-y-6 text-white font-semibold text-5xl uppercase text-center leading-[1.95] w-3/4"
          >
            <span class="py-5 px-8 bg-gradient-custom box-decoration-clone"
              >${this._data.title}</span
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
                >${this._data.cookingTime}</span
              >
              <span class="recipe__info-text uppercase">minutes</span>
            </div>
            <div class="recipe__info flex items-center">
              <svg class="recipe__info-icon mr-4">
                <use href="src/img/icons.svg#icon-users"></use>
              </svg>
              <span
                class="recipe__info-data recipe__info-data--people font-bold mr-1"
                >${this._data.servings}</span
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
          ${this._data.ingredients.map(this._generateMarkupIngredient).join("")}
          
            
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
            <span class="recipe__publisher">${
              this._data.publisher
            }</span>. Please
            check out directions at their website.
          </p>
          <a
            class="btn--small recipe__btn flex gap-1"
            href="${this._data.sourceUrl}"
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
  }
  _generateMarkupIngredient(ing) {
    return `<li class="recipe__ingredient flex">
              <svg class="recipe__icon mr-4">
                <use href="src/img/icons.svg#icon-check"></use>
              </svg>
              <div class="recipe__quantity mr-1">${
                ing.quantity ? fracty(ing.quantity) : ""
              }</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ing.unit}</span>
                ${ing.description}
              </div>
            </li> `;
  }

  /**
   * Publisher --> Subscriber
   * Adds event listeners for 'hashchange' and 'load' events to the window object.
   * When these events are triggered, the provided handler function is executed.*
   * @param {Function} handler - The function to be executed when the events are triggered.
   */
  addHandlerRender(handler) {
    const events = ["hashchange", "load"];
    events.forEach((event) => window.addEventListener(event, handler));
  }
}

export default new RecipeView();
