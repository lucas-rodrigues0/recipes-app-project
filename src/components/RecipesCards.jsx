import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';

export default function RecipesCards({ path, elem, type, index }) {
  const [ colNumber, setColNumber ] = useState('');
  const [ colHeight, setColHeight ] = useState('');
  const [ btnSize, setBtnSize ] = useState({});
  const [ imgSize, setImgSize ] = useState({});
  const [ nameSize, setNameSize ] = useState('');
  const [ infoSize, setInfoSize ] = useState({});
  const history = useHistory();

  const setColumns = () => {
    if (window.innerWidth < 400) {
      setColNumber('col-6 d-flex justify-content-center mb-3');
      setColHeight('180px');
      setBtnSize({ minWidth: '130px' });
      setImgSize({ maxWidth: '110px' });
      setNameSize('h6');
      setInfoSize({ height: '60px', overflowY: 'scroll' });
    } else {
      setColNumber('col-4 d-flex justify-content-center mb-3');
      setColHeight('80%');
      setBtnSize({ minHeight: '400px', width: '260px' });
      setImgSize({ maxWidth: '260px' });
      setNameSize('h4');
      setInfoSize({})
    }
  }

  useEffect(() => {
    setColumns();
  }, []);

  return (
    <div className={ colNumber } style={ { height: colHeight, position: 'relative', zIndex: '4' } }>
      <button
        type="button"
        onClick={ () => history.push(`${path}/${elem[ `id${type}` ]}`) }
        data-testid={ `${index}-recipe-card` }
        className="btn btn-outline-light d-flex justify-content-start"
        style={ btnSize }
      >
        <div style={ imgSize }>
          <img
            className="img-responsive w-100"
            src={ elem[ `str${type}Thumb` ] }
            alt={ elem[ `str${type}` ] }
            data-testid={ `${index}-card-img` }
          />
          <div style={ infoSize }>
            <p className={ nameSize } data-testid={ `${index}-card-name` }>
              <strong>{ elem[ `str${type}` ] }</strong>
            </p>
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
