//declaring everything as model means that we would use model.state and model.loadRecipe to access
import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

//this is a hot module replacement. this is just for parcel. It means when one module is changed, it triggers a rebuild and that new modified bundle will get injected into the browser without triggering a whole page reload
if (module.hot) {
  module.hot.accept();
}

const recipeContainer = document.querySelector('.recipe');

//https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    //loading recipe
    //need to await return as it's calling an async function and a promise is bieng returned
    await model.loadRecipe(id);

    //rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};

controlRecipes();

['hashchange', 'load'].forEach(evt =>
  window.addEventListener(evt, controlRecipes)
);
