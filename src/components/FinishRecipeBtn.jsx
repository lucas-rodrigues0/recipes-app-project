import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { findKey } from '../services/index';

function FinishRecipeBtn() {
  const { singleRecipe } = useSelector((state) => state.recipes);
  const history = useHistory();
  const arrayMeat = singleRecipe[ 0 ];
  const [ meatStorage, setMeatStorage ] = useState([]);

  const { pathname } = history.location;
  const arrayId = pathname.split('/')[ 2 ];

  useEffect(() => {
    const storage = localStorage.getItem('inProgressRecipes')
      && JSON.parse(localStorage.getItem('inProgressRecipes')).meals;
    setMeatStorage((storage && storage[ arrayId ]) ? storage[ arrayId ] : []);
  }, []);
  console.log(arrayMeat, 'consolelog');
  const verifyDisable = () => {
    const ingredientLength = findKey(arrayMeat, 'strIngredient').length;
    if (meatStorage && meatStorage.length === ingredientLength) {
      return false;
    }
    return true;
  };

  return (
    <button
      data-testid="finish-recipe-btn"
      type="button"
      disabled={ verifyDisable() }
      onClick={ () => {
        history.push('/receitas-feitas');
      } }
      className="regular-button beginRecipe-btn"
    >
      Finalizar Receita
    </button>
  )
};

export default FinishRecipeBtn;
