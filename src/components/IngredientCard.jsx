import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { IngridientFilterAction } from '../redux/actions/fetchIngridientsAction';

function IngredientCard({ index, ingredient, recipe }) {
  const [ colNumber, setColNumber ] = useState('');
  const [ colHeight, setColHeight ] = useState('');
  const [ btnSize, setBtnSize ] = useState({});
  const [ imgSize, setImgSize ] = useState({});
  const [ nameSize, setNameSize ] = useState('');
  const [ infoSize, setInfoSize ] = useState({});
  const history = useHistory();
  const dispatch = useDispatch();

  const setColumns = () => {
    if (window.innerWidth < 400) {
      setColNumber('col-6 d-flex justify-content-center p-3 mb-3');
      setColHeight('180px');
      setBtnSize({ minWidth: '130px' });
      setImgSize({ maxWidth: '110px' });
      setNameSize('h6');
      setInfoSize({ height: '60px', overflowY: 'scroll' });
    } else {
      setColNumber('col-4 d-flex justify-content-center p-3 mb-3');
      setColHeight('80%');
      setBtnSize({ minHeight: '200px', width: '260px' });
      setImgSize({ maxWidth: '200px' });
      setNameSize('h4');
      setInfoSize({})
    }
  }

  useEffect(() => {
    setColumns();
  }, []);


  const handleClick = () => {
    dispatch(IngridientFilterAction(ingredient));
    if (recipe === 'meal') history.push('/comidas');
    if (recipe === 'drink') history.push('/bebidas');
  };

  return (
    <div className={ colNumber } style={ { height: colHeight, position: 'relative', zIndex: '4' } }>
      <button
        type="button"
        data-testid={ `${index}-ingredient-card` }
        onClick={ handleClick }
        className="btn btn-outline-light d-flex justify-content-center"
        style={ btnSize }
      >
        <div style={ imgSize }>
          <div className="img-content">
            <img
              data-testid={ `${index}-card-img` }
              alt={ ingredient }
              src={ recipe === 'meal' ? `https://www.themealdb.com/images/ingredients/${ingredient}-Small.png`
                : `https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png` }
              className="img-responsive"
            />
          </div>
          <div style={ infoSize }>
            <p className={ nameSize } data-testid={ `${index}-card-name` }>{ ingredient }</p>
          </div>
        </div>
      </button>
    </div>
  );
}

IngredientCard.propTypes = {
  index: PropTypes.number.isRequired,
  ingredient: PropTypes.string.isRequired,
  recipe: PropTypes.string.isRequired,
};

export default IngredientCard;
