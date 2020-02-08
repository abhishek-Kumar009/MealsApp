import {
  RECIPES
} from '../../data/dummy-data';
const initialState = {
  recipes: RECIPES,
  filteredRecipes: RECIPES,
  favoriteRecipes: []
};
import {
  TOGGLE_FAV,
  SET_FILTERS
} from '../actions/recipes';

const RecipesReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAV:
      const existingIndex = state.favoriteRecipes.findIndex(
        recipe => recipe.id === action.recId
      );
      if (existingIndex >= 0) {
        const updatedFavRec = [...state.favoriteRecipes];

        updatedFavRec.splice(existingIndex, 1);

        return {
          ...state,
          favoriteRecipes: updatedFavRec
        };
      } else {
        const recipe = state.recipes.find(rec => rec.id === action.recId);
        const updatedFavRec = [...state.favoriteRecipes];

        updatedFavRec.unshift(recipe);


        return {
          ...state,
          favoriteRecipes: updatedFavRec
        };
      }
      case SET_FILTERS:
        let updatedFilterRecipes = [...state.recipes];
        const {
          glutenFree, vegetarian, vegan, lactoseFree
        } = action.filters;

        updatedFilterRecipes = updatedFilterRecipes.filter(recipe => {
          const {
            isGlutenFree,
            isVegan,
            isVegetarian,
            isLactoseFree
          } = recipe;
          if (!(glutenFree === true && isGlutenFree === false) && !(vegetarian === true && isVegetarian === false) && !(vegan === true && isVegan === false) && !(lactoseFree === true && isLactoseFree === false)) {
            return recipe;
          }
        });
        return {
          ...state,
          filteredRecipes: updatedFilterRecipes
        }

        default:
          return state;
  }
};

export default RecipesReducer;