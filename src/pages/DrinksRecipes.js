import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import fetchDrinkThunk from '../redux/actions/fetchDrinkAction';
import fetchRecipesDrinkCatsThunk from '../redux/actions/fetchDrinkCatRecipesAction';
import { clearRecipesAction } from '../redux/actions/clearRecipesAction';
import clearSearchAction from '../redux/actions/clearSearchAction';
import DrinkCatsButtons from '../components/DrinkCatsButtons';
import { fetchDrinkIFilterThunk } from '../redux/actions/fetchIngridientsAction';
import RecipesCards from '../components/RecipesCards';
import desktopImage from '../images/Drinks_Desktop.png';
import mobileImage from '../images/Drinks_Mobile.png';

function DrinksRecipes() {
  const [ bgImage, setBgImage ] = useState('');
  const dispatch = useDispatch();

  const setImageSize = () => {
    if(window.innerWidth < 400) {
      setBgImage(mobileImage)
    } else {
      setBgImage(desktopImage)
    }
  }

  useEffect(() => {
    setImageSize();
  }, []);

  const {
    inputValue,
    inputType,
    drinkFilter,
    ingredientFilter,
  } = useSelector((state) => state.search);
  const { recipes } = useSelector((state) => state.recipes);

  useEffect(() => {
    let fetchDrink;
    if (!ingredientFilter && !drinkFilter) {
      fetchDrink = (inputf, typef) => dispatch(fetchDrinkThunk(inputf, typef));
      fetchDrink(inputValue, inputType);
    }
    if (drinkFilter) {
      fetchDrink = (filterf) => dispatch(fetchRecipesDrinkCatsThunk(filterf));
      fetchDrink(drinkFilter);
    }
    if (ingredientFilter && !drinkFilter) {
      fetchDrink = (filteri) => dispatch(fetchDrinkIFilterThunk(filteri));
      fetchDrink(ingredientFilter);
    }
  }, [inputValue, inputType, drinkFilter, ingredientFilter]);

  useEffect(() => () => {
    dispatch(clearRecipesAction());
    dispatch(clearSearchAction());
  }, []);

  useEffect(() => {
    if (recipes.length === 1) return <Redirect to={ `/bebidas/${recipes[0].idDrink}` } />;
  }, []);

  const backImage = {
    backgroundImage: `url(${bgImage})`,
    height: '100vh'
  }

  return (
    <section className="bg-image" style={backImage}>
      { recipes && recipes.length === 1
        && <Redirect to={ `/bebidas/${recipes[0].idDrink}` } /> }
      <section>
        <Header />
        <DrinkCatsButtons />
      </section>
      <section className="container">
        <div className="row d-flex justify-content-center p-3" style={{ backgroundColor: 'rgb(0, 0, 0, 0.5)'}}>
        { recipes && recipes.map((elem, index) => (
          <RecipesCards
            key={ elem.idDrink }
            path="/bebidas"
            elem={ elem }
            index={ index }
            type="Drink"
          />
        )) }
          </div>
      </section>
      <div style={ { height: '60px'} }/>
      <Footer />
    </section>
  );
}

export default DrinksRecipes;
