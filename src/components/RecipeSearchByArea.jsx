import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchAreaThunk from '../redux/actions/fetchAreaAction';
import selectAreaAction from '../redux/actions/SelectAreaAction';

function RecipeSearchByArea() {
  const [ selectPositionCol, setSelectPositionCol ] = useState('');
  const [ selectPositionSpace, setSelectPositionSpace ] = useState('');
  const [ selectPositionForm, setSelectPositionForm ] = useState('');
  const [ area, setArea ] = useState('');
  const { areas } = useSelector((state) => state.search);
  const dispatch = useDispatch();

  const setResponsive = () => {
    if (window.innerWidth < 700) {
      setSelectPositionCol('col');
      setSelectPositionSpace('');
      setSelectPositionForm('form-select w-75');
    } else {
      setSelectPositionCol('col ml-5');
      setSelectPositionSpace('col-1');
      setSelectPositionForm('form-select w-25 p-1');
    }
  }

  useEffect(() => {
    setResponsive();
  }, []);

  useEffect(() => {
    const fetchData = () => dispatch(fetchAreaThunk());
    fetchData();
  }, []);

  const handleChange = (e) => {
    setArea(e.target.value);
    dispatch(selectAreaAction(e.target.value));
  };

  return (
    <div className="row mt-3 ml-2">
      <div className={ selectPositionSpace } />
      <div className={ selectPositionCol }>
        <select
          data-testid="explore-by-area-dropdown"
          value={ area }
          onChange={ handleChange }
          className={ selectPositionForm }
          aria-label="Default select"
        >
          { areas && areas.map((meal, i) => (
            <option
              key={ i }
              data-testid={ `${meal.strArea}-option` }
              value={ meal.strArea === 'All' ? '' : meal.strArea }
            >
              { meal.strArea }
            </option>)) }
        </select>
      </div>
    </div>
  );
}

export default RecipeSearchByArea;
