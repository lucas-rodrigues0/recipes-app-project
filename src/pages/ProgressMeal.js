import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import fetchMealActionId from '../redux/actions/fetchMealId';
import '../CSS/Completed.css';
import FoodDetailDesktop from '../components/FoodDetailDesktop';
import FoodDetailMobile from '../components/FoodDetailMobile';

function ProgressMeal() {
  const { singleRecipe } = useSelector((state) => state.recipes);
  const history = useHistory();
  const recipe = singleRecipe && singleRecipe[ 0 ];
  const dispatch = useDispatch();

  const { pathname } = history.location;
  const arrayId = pathname.split('/')[2];

  useEffect(() => {
    const fetchData = (id) => dispatch(fetchMealActionId(id));
    fetchData(arrayId);
  }, []);

  let renderDetail;
  if (window.innerWidth < 750) {
    renderDetail = <FoodDetailMobile recipe={ recipe } />;
    } else {
      renderDetail = <FoodDetailDesktop recipe={ recipe } />;
  }

  const renderMeal = () => recipe !== undefined && (
    <>
      { renderDetail }
    </>
  );

  return (
    <div className="container-fluid text-light fw-bold p-3 mt-3">
      {renderMeal()}
    </div>
  );
}

export default ProgressMeal;
