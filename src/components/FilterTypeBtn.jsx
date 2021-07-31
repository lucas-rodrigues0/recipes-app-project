import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function FilterTypeBtn({ handleSelector }) {
  const [ btnContainerSize, setContainerSize ] = useState('');

  useEffect(() => {
    if (window.innerWidth < 400) {
      setContainerSize('col d-flex  align-items-center justify-content-center py-2');
    } else {
      setContainerSize('col d-flex align-items-center justify-content-center w-25 py-2');
    }

  }, []);

  return (
    <div className={ btnContainerSize } style={ { backgroundColor: 'rgb(0, 0, 0, 0.8)' } }>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        value="all"
        onClick={ (e) => handleSelector(e) }
        className="btn btn-outline-light px-3 py-1 mx-1"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        value="food"
        onClick={ (e) => handleSelector(e) }
        className="btn btn-outline-light px-3 py-1 mx-1"
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        value="drinks"
        onClick={ (e) => handleSelector(e) }
        className="btn btn-outline-light px-3 py-1 mx-1"
      >
        Drinks
      </button>
    </div>
  );
}

FilterTypeBtn.propTypes = {
  handleSelector: PropTypes.func.isRequired,
};
