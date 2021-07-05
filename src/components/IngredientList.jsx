import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { findKey } from '../services';

const IngredientList = () => {
  const { singleRecipe } = useSelector((state) => state.recipes);
  const ingredient = findKey(singleRecipe[ 0 ], 'strIngredient');
  const measure = findKey(singleRecipe[ 0 ], 'strMeasure');
  // const history = useHistory();

  // const { pathname } = history.location;

  // const inProgressIngredients = () => {
  //   const ingredient = findKey(arrayMeat, 'strIngredient');
  //   const measure = findKey(arrayMeat, 'strMeasure');
  //   return ingredient.map((nome, index) => {
  //     if (nome) {
  //       return (
  //         <div key={ index } data-testid={ `${index}-ingredient-step` }>
  //           <label
  //             htmlFor={ nome }
  //             className={ meatStorage && meatStorage.includes(nome) ? 'completed' : '' }
  //           >
  //             <input
  //               type="checkbox"
  //               id={ nome }
  //               name={ nome }
  //               value={ nome }
  //               onChange={ (event) => {
  //                 handleChecked(event);
  //                 saveLocalStorage(arrayId, nome);
  //               } }
  //               checked={ meatStorage && meatStorage.includes(nome) }
  //             />
  //             { ` ${nome} - ${measure[ index ]}` }
  //           </label>
  //         </div>
  //       );
  //     }
  //     return undefined;
  //   });
  // };

  return ingredient.map((nome, index) => (
    <p
      data-testid={ `${index}-ingredient-name-and-measure` }
      key={ index }
    >
      { `${nome} - ${measure[ index ]}` }
    </p>
  ));
};

export default IngredientList;
