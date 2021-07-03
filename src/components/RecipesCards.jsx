import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';

export default function RecipesCards({ path, elem, type, index }) {
  const [ colNumber, setColNumber ] = useState('');
  const [ colHeight, setColHeight ] = useState('');
  const [ btnSize, setBtnSize ] = useState({ height: '', width: '' });
  const history = useHistory();

  const setColumns = () => {
    if (window.innerWidth < 400) {
      setColNumber('col-6 d-flex justify-content-center');
      setColHeight('160px');
      setBtnSize({ height: '140px', width: '110px' });
    } else {
      setColNumber('col-2 d-flex justify-content-center mb-3');
      setColHeight('70%');
      setBtnSize({ height: '200px', width: '180px' });
    }
  }

  useEffect(() => {
    setColumns();
  }, []);

  return (
    <div className={ colNumber } style={ { height: colHeight } }>
      <button
        type="button"
        onClick={ () => history.push(`${path}/${elem[ `id${type}` ]}`) }
        data-testid={ `${index}-recipe-card` }
        className="btn btn-dark btn-rounded"
        style={ btnSize }
      >
        <div>
          <img
            className="w-100"
            src={ elem[ `str${type}Thumb` ] }
            alt={ elem[ `str${type}` ] }
            data-testid={ `${index}-card-img` }
          />
          <div className="mask" style={ { backgroundColor: 'rgb(0, 0, 0, 0.6)' } }>
            <h4 data-testid={ `${index}-card-name` }>{ elem[ `str${type}` ] }</h4>
            <span>{ elem[ `id${type}` ] }</span>
          </div>
        </div>
      </button>
    </div>
  );
}

RecipesCards.propTypes = {
  path: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  elem: PropTypes.objectOf(PropTypes.string).isRequired,
};
