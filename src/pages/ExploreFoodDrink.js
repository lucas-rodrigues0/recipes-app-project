import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '../components/Button';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { RANDOM_RECIPE } from '../redux/actions';
import { clearRandom, fetchRandomDrinkAction,
  fetchRandomMealAction } from '../redux/actions/randomRecipes';
import mealDesktopImage from '../images/Meals_Desktop.png';
import mealMobileImage from '../images/Meals_Mobile.png';
import drinkDesktopImage from '../images/Drinks_Desktop.png';
import drinkMobileImage from '../images/Drinks_Mobile.png';

function ExploreFoodDrink() {
  const [ bgImage, setBgImage ] = useState('');
  const [ btnSize, setBtnSize ] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const { random } = useSelector((state) => state.recipes);
  const { singleRecipe } = useSelector((state) => state.recipes);
  const { pathname } = history.location;

  const randomClick = () => {
    dispatch({ type: RANDOM_RECIPE });
  };

  const setImageSize = () => {
    if(window.innerWidth < 400 && pathname.split('/')[2] === 'comidas') {
      setBgImage(mealMobileImage);
      setBtnSize('col px-5 py-3 mask justify-content-center');
    } else if(window.innerWidth < 400 && pathname.split('/')[2] === 'bebidas') {
      setBgImage(drinkMobileImage);
      setBtnSize('col px-5 py-3 mask justify-content-center');
    } else if(window.innerWidth >= 400 && pathname.split('/')[2] === 'comidas') {
      setBgImage(mealDesktopImage);
      setBtnSize('col-6 px-5 py-3 mask justify-content-center');
    } else if(window.innerWidth >= 400 && pathname.split('/')[2] === 'bebidas') {
      setBgImage(drinkDesktopImage);
      setBtnSize('col-6 px-5 py-3 mask justify-content-center');
    }
  }

  useEffect(() => {
    setImageSize();
  }, []);

  useEffect(() => {
    let dispatchRecipes;
    if (pathname.split('/')[2] === 'comidas' && singleRecipe.length === 0 && random) {
      dispatchRecipes = () => dispatch(fetchRandomMealAction());
      dispatchRecipes();
    }
    if (pathname.split('/')[2] === 'bebidas' && singleRecipe.length === 0 && random) {
      dispatchRecipes = () => dispatch(fetchRandomDrinkAction());
      dispatchRecipes();
    }
    if (singleRecipe.length === 1 && pathname.split('/')[2] === 'comidas' && random) {
      history.push(`/${pathname.split('/')[2]}/${singleRecipe[0].idMeal}`);
    }
    if (singleRecipe.length === 1 && pathname.split('/')[2] === 'bebidas' && random) {
      history.push(`/${pathname.split('/')[2]}/${singleRecipe[0].idDrink}`);
    }
  }, [random, singleRecipe]);

  useEffect(() => () => dispatch(clearRandom()), []);

  const backImage = {
    backgroundImage: `url(${bgImage})`,
    height: '100vh'
  }

  return (
    <section className="bg-image" style={backImage}>
      <Header />
      <div className="container">
        <div style={ { height: '220px' } } />
        <div className="row d-flex align-items-center justify-content-center">
          <div className={ btnSize } style={ { backgroundColor: 'rgb(0, 0, 0, 0.8)' } }>
            { pathname === '/explorar/comidas' && <Button /> }
            <button
              onClick={ () => history
                .push(`/explorar/${pathname.split('/')[2]}/ingredientes`) }
              data-testid="explore-by-ingredient"
              type="button"
              className="btn btn-outline-light btn-lg d-block w-100 p-2 m-3"
            >
              Por Ingredientes
            </button>
            <button
              onClick={ randomClick }
              data-testid="explore-surprise"
              type="button"
              className="btn btn-outline-light btn-lg d-block w-100 p-2 m-3"
            >
              Me Surpreenda!
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default ExploreFoodDrink;
