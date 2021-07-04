import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import fetchMealActionId from '../redux/actions/fetchMealId';
import fetchDrinkActionId from '../redux/actions/fetchDrink';
import { clearSingleRecipe } from '../redux/actions/clearRecipesAction';
import FoodDetailDesktop from '../components/FoodDetailDesktop';
import FoodDetailMobile from '../components/FoodDetailMobile';

function FoodDetail() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { pathname } = history.location;
  const arrayId = pathname.split('/')[2];
  const { singleRecipe } = useSelector((state) => state.recipes);

  useEffect(() => {
    let fetchData;
    if (pathname.split('/')[1] === 'comidas' && singleRecipe.length === 0) {
      fetchData = (id) => dispatch(fetchMealActionId(id));
      fetchData(arrayId);
    }
    if (pathname.split('/')[1] === 'bebidas' && singleRecipe.length === 0) {
      fetchData = (id) => dispatch(fetchDrinkActionId(id));
      fetchData(arrayId);
    }
  }, []);

  useEffect(() => () => dispatch(clearSingleRecipe()), []);

  const recipe = singleRecipe && singleRecipe[ 0 ];

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
      { renderMeal() }
    </div>
  );
}

export default FoodDetail;
