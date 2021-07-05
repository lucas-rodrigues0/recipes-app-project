import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import IngredientCard from '../components/IngredientCard';
import { fetchDrinkIngredientThunk } from '../redux/actions/fetchIngridientsAction';
import desktopImage from '../images/Drinks_Desktop.png';
import mobileImage from '../images/Drinks_Mobile.png';

function DrinkIngredient() {
  const [ bgImage, setBgImage ] = useState('');
  const dispatch = useDispatch();
  const { ingredients } = useSelector((state) => state.recipes);

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

  useEffect(() => {
    const dataDispatch = () => dispatch(fetchDrinkIngredientThunk());
    dataDispatch();
  }, []);

  const backImage = {
    backgroundImage: `url(${bgImage})`,
    height: '100vh'
  }

  return (
    <section className="bg-image" style={backImage}>
      <Header />
      <section className="container">
        <div style={ { height: '160px' } } />
        <div className="row d-flex justify-content-center" style={ { backgroundColor: 'rgb(0, 0, 0, 0.4)' } }>
          {ingredients && ingredients
            .map(({ strIngredient1 }, index) => (<IngredientCard
              key={ strIngredient1 }
              ingredient={ strIngredient1 }
              index={ index }
              recipe="drink"
            />)) }
        </div>
        <div style={ { height: '160px' } } />
      </section>
      <Footer />
    </section>
  );
}

export default DrinkIngredient;
