import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';

import ShareButton from './ShareButton';
import LikeButton from './LikeButton';
import Recomendation from './Recomendation';
import IngredientList from '../components/IngredientList';
import BeginContinueRecipeBtn from './BeginContinueRecipeBtn';

export default function FoodDetailDesktop({ recipe }) {
  const history = useHistory();
  const { pathname } = history.location;
  const type = (pathname.split('/')[ 1 ] === 'comidas') ? 'Meal' : 'Drink';

  return (
    <>
      <div className="row mb-4">
        <div className="col-10">
          <h1 className="display-3 text-center" data-testid="recipe-title">{ recipe[ `str${type}` ] }</h1>
        </div>
        <div className="col-2 d-flex justify-content-end">
          <ShareButton recipeId={ recipe.idMeal } recipeType="comida" />
          <LikeButton recipe={ recipe } />
        </div>
      </div>
      <div className="row justify-content-between">
        <div className="col-4">
          <div className="mb-5">
            <h4>Category:</h4>
            <div className="p-3">
              { type === 'Drink'
                && <p data-testid="recipe-category">{ recipe.strAlcoholic }</p> }
              <p data-testid="recipe-category">{ recipe.strCategory }</p>
            </div>
          </div>
          <img
            data-testid="recipe-photo"
            src={ recipe[ `str${type}Thumb` ] }
            alt="img"
            className="w-100"
          />
        </div>
        <div className="col-2">
          <h4>Ingredients:</h4>
          <div className="p-3">
            <IngredientList />
          </div>
        </div>
        <div className="col-6">
          <h4>Instructions:</h4>
          <div className="p-3">
            <p
              className="lh-base lead w-75"
              data-testid="instructions"
              style={ { textAlign: 'justify', textJustify: 'auto', textIndent: '3em' } }
            >{ recipe.strInstructions }</p>
          </div>
          { type === 'Meal' && (
            <div>
              <h4>Video:</h4>
              <div className="p-3 embed-responsive embed-responsive-16by9">
                <iframe
                  title="Meat"
                  data-testid="video"
                  className="embed-responsive-item"
                  src={ recipe.strYoutube.replace('watch?v=', 'embed/') }
                  allowFullScreen
                />

              </div>
            </div>) }
        </div>
      </div>
      <div className="container w-75 mt-5">
        <div className="row justify-content-center">
          <div className="col d-flex-column justify-content-center">
            <h4>Recomendadas:</h4>
            <Recomendation />
          </div>
        </div>
        <div className="row justify-content-center">
          <BeginContinueRecipeBtn />
        </div>
      </div>
      <div style={ { height: '60px' } } />
    </>
  );
}

FoodDetailDesktop.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string),
};
