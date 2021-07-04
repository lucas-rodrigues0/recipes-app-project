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
      setColNumber('col-4 d-flex justify-content-center mb-3');
      setColHeight('80%');
      setBtnSize({ minHeight: '400px', width: '260px' });
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
        className="btn btn-outline-light d-flex justify-content-start"
        style={ btnSize }
      >
        <div>
          <img
            className="w-100"
            src={ elem[ `str${type}Thumb` ] }
            alt={ elem[ `str${type}` ] }
            data-testid={ `${index}-card-img` }
          />
          <div>
            <h4 data-testid={ `${index}-card-name` }><strong>{ elem[ `str${type}` ] }</strong></h4>
            <span><small>{ elem[ `id${type}` ] }</small></span>
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
