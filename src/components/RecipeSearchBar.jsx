import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import searchAction from '../redux/actions/searchAction';

export default function RecipeSearchBar() {
  const [ inputValue, setInputValue ] = useState('');
  const [ inputType, setInputType ] = useState('');

  const dispatch = useDispatch();

  const handleClick = () => {
    if (inputType === 'first-letter' && inputValue.length !== 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
      setInputValue('');
    } else {
      dispatch(searchAction({ inputValue, inputType }));
    }
  };

  return (
    <form action="" className="container-fluid d-flex-column justify-content-center" style={ { backgroundColor: 'rgb(0, 0, 0, 0.6)' } }>
      <div className="row w-75">
        <div className="col-1" />
        <div className="col-6 d-flex justify-content-center">
          <label htmlFor="ingredient" className="text-light form-check-label ml-4 mr-5">
            <input
              data-testid="ingredient-search-radio"
              type="radio"
              id="ingredient"
              value="ingredient"
              name="inputType"
              checked={ inputType === 'ingredient' }
              onChange={ ({ target }) => setInputType(target.value) }
              className="form-check-input"
            />
            Ingrediente
          </label>
          <label htmlFor="name" className="text-light form-check-label mr-5">
            <input
              data-testid="name-search-radio"
              type="radio"
              id="name"
              value="name"
              name="inputType"
              checked={ inputType === 'name' }
              onChange={ ({ target }) => setInputType(target.value) }
              className="form-check-input"
            />
            Nome
          </label>
          <label htmlFor="first-letter" className="text-light form-check-label mr-5">
            <input
              data-testid="first-letter-search-radio"
              type="radio"
              id="first-letter"
              value="first-letter"
              name="inputType"
              checked={ inputType === 'first-letter' }
              onChange={ ({ target }) => setInputType(target.value) }
              className="form-check-input"
            />
            Primeira Letra
          </label>
        </div>
        <div className="col-5" />
      </div>
      <div className="row w-75 mt-2">
        <div className="col-2" />
        <div className="col-6">

          <label htmlFor="search-input" className="text-light m-0">
            <input
              placeholder="Buscar receita"
              type="text"
              data-testid="search-input"
              id="search-input"
              value={ inputValue }
              onChange={ ({ target }) => setInputValue(target.value) }
              className="form-control-sm"
            />
          </label>
          <button
            type="button"
            data-testid="exec-search-btn"
            onClick={ handleClick }
            className="btn btn-outline-light btn-sm ml-4"
          >
            Pesquisar
          </button>
        </div>
        <div className="col-4" />
      </div>
    </form>
  );
}
