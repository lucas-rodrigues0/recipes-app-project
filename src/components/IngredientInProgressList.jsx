import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { findKey } from '../services';

const IngredientInProgressList = () => {
  const [ meatStorage, setMeatStorage ] = useState([]);
  const { singleRecipe } = useSelector((state) => state.recipes);
  const history = useHistory();
  const ingredient = findKey(singleRecipe[ 0 ], 'strIngredient');
  const measure = findKey(singleRecipe[ 0 ], 'strMeasure');

  const { pathname } = history.location;
  const arrayId = pathname.split('/')[ 2 ];

  useEffect(() => {
    const storage = localStorage.getItem('inProgressRecipes')
      && JSON.parse(localStorage.getItem('inProgressRecipes')).meals;
    setMeatStorage((storage && storage[ arrayId ]) ? storage[ arrayId ] : []);
  }, []);

  function saveLocalStorage(id, name) {
    const getStorage = localStorage.getItem('inProgressRecipes')
      && JSON.parse(localStorage.getItem('inProgressRecipes'));

    const localState = meatStorage.includes(name)
      ? meatStorage.filter((e) => e !== name)
      : meatStorage.concat(name);
    setMeatStorage(localState);

    const newStorage = getStorage
      ? Object.assign(getStorage, { meals: { [ id ]: localState } })
      : { meals: { [ id ]: localState } };

    localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
  }

  const handleChecked = ({ target }) => {
    const { parentNode } = target;
    const { checked } = target;
    if (checked) {
      parentNode.className = 'completed';
    } else {
      parentNode.className = '';
    }
  };

  return ingredient.map((nome, index) => {
    if (nome) {
      return (
        <div key={ index } data-testid={ `${index}-ingredient-step` }>
          <label
            htmlFor={ nome }
            className={ meatStorage && meatStorage.includes(nome) ? 'completed' : '' }
          >
            <input
              type="checkbox"
              id={ nome }
              name={ nome }
              value={ nome }
              onChange={ (event) => {
                handleChecked(event);
                saveLocalStorage(arrayId, nome);
              } }
              checked={ meatStorage && meatStorage.includes(nome) }
            />
            { ` ${nome} - ${measure[ index ]}` }
          </label>
        </div>
      );
    }
    return undefined;
  });
};

export default IngredientInProgressList;
