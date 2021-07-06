import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';

import ShareButton from './ShareButton';
import LikeButton from './LikeButton';
import Recomendation from './Recomendation';
import IngredientList from '../components/IngredientList';
import IngredientInProgressList from '../components/IngredientInProgressList';
import BeginContinueRecipeBtn from './BeginContinueRecipeBtn';
import FinishRecipeBtn from './FinishRecipeBtn';

export default function FoodDetailMobile({ recipe }) {
  const history = useHistory();
  const { pathname } = history.location;
  const type = (pathname.split('/')[ 1 ] === 'comidas') ? 'Meal' : 'Drink';
  const inProgressState = pathname.includes('in-progress');

  return (
    <>
      <div className="row justify-content-between mb-4">
        <h1 className="display-5 text-center" data-testid="recipe-title">{ recipe[ `str${type}` ] }</h1>
        <div className="">
          <ShareButton recipeId={ recipe.idMeal } recipeType="comida" />
          <LikeButton recipe={ recipe } />
        </div>
      </div>
      <div className="row justify-content-between">
        <div>
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
          className="w-100 mb-5"
        />
        <h4>Ingredients:</h4>
        <div className="p-3">
          { (inProgressState) ? <IngredientInProgressList /> : <IngredientList /> }
        </div>
        <h4>Instructions:</h4>
        <div className="p-3">
          <p
            className="lh-base"
            data-testid="instructions"
            style={ { textAlign: 'justify', textJustify: 'auto', textIndent: '3em' } }
          >{ recipe.strInstructions }</p>
        </div>
        { type === 'Meal' && (
          <div className="mb-5">
            <h4>Video:</h4>
            <div className="ratio ratio-16x9">
              <iframe
                title="Meat"
                data-testid="video"
                className=""
                src={ recipe.strYoutube.replace('watch?v=', 'embed/') }
                allowFullScreen
              />
            </div>
          </div>) }
      </div>
      <div className="row justify-content-center mb-5">
        <div className="col d-flex-column justify-content-center">
          <h4 className="mb-3">Recomendation:</h4>
          <Recomendation />
        </div>
      </div>
      <div className="row justify-content-center">
        { (inProgressState) ? <FinishRecipeBtn /> : <BeginContinueRecipeBtn /> }
      </div>
      <div style={ { height: '60px' } } />
    </>
  );
}

FoodDetailMobile.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string),
};
