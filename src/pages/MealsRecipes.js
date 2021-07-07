import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';

import fetchMealThunk from '../redux/actions/fetchMealAction';
import { clearRecipesAction } from '../redux/actions/clearRecipesAction';
import clearSearchAction from '../redux/actions/clearSearchAction';
import fetchRecipesMealCatsThunk from '../redux/actions/fetchMealCatRecipesAction';
import { fetchMealIFilterThunk } from '../redux/actions/fetchIngridientsAction';

import Footer from '../components/Footer';
import Header from '../components/Header';
import MealCatsButtons from '../components/MealCatsButton';
import RecipesCards from '../components/RecipesCards';

import desktopImage from '../images/Meals_Desktop.png';
import mobileImage from '../images/Meals_Mobile.png';

function MealsRecipes() {
  const {
    inputValue,
    inputType,
    mealFilter,
    ingredientFilter,
  } = useSelector((state) => state.search);
  const { recipes } = useSelector((state) => state.recipes);
  const [ bgImage, setBgImage ] = useState('');
  const dispatch = useDispatch();

  const setImageSize = () => {
    if(window.innerWidth < 400) {
      setBgImage(mobileImage)
    } else {
      setBgImage(desktopImage)
    }
  }

  const backImage = {
    backgroundImage: `url(${bgImage})`,
    height: '100vh'
  }

  useEffect(() => {
    setImageSize();
  }, []);

  useEffect(() => {
    let fetchMeal;
    if (!ingredientFilter && !mealFilter) {
      fetchMeal = (inputf, typef) => dispatch(fetchMealThunk(inputf, typef));
      fetchMeal(inputValue, inputType);
    }
    if (mealFilter) {
      fetchMeal = (filterf) => dispatch(fetchRecipesMealCatsThunk(filterf));
      fetchMeal(mealFilter);
    }
    if (ingredientFilter && !mealFilter) {
      fetchMeal = (filteri) => dispatch(fetchMealIFilterThunk(filteri));
      fetchMeal(ingredientFilter);
    }
  }, [inputValue, inputType, mealFilter, ingredientFilter]);

  useEffect(() => () => {
    dispatch(clearRecipesAction());
    dispatch(clearSearchAction());
  }, []);

  useEffect(() => {
    if (recipes.length === 1) return <Redirect to={ `/comidas/${recipes[0].idMeal}` } />;
  }, []);

  return (
    <section className="bg-image" style={backImage}>
      {(recipes && recipes.length === 1 && mealFilter === '')
      && <Redirect to={ `/comidas/${recipes[0].idMeal}` } />}
      <section>
        <Header />
        <MealCatsButtons />
      </section>
      <section className="container">
        <div className="row d-flex justify-content-center" style={{ backgroundColor: 'rgb(0, 0, 0, 0.4)'}}>
        { recipes && recipes.map((elem, index) => (
          <RecipesCards
            key={ elem.idMeal }
            path="/comidas"
            elem={ elem }
            index={ index }
            type="Meal"
          />
        )) }
        </div>
      </section>
      <div style={ { height: '60px'} }/>
      <Footer />
    </section>
  );
}

export default MealsRecipes;
