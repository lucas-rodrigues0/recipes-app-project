import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import IngredientCard from '../components/IngredientCard';
import { fetchIngredientThunk } from '../redux/actions/fetchIngridientsAction';
import desktopImage from '../images/Meals_Desktop.png';
import mobileImage from '../images/Meals_Mobile.png';

function FoodIngredient() {
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
    const dataDispatch = () => dispatch(fetchIngredientThunk());
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
            .map(({ strIngredient }, index) => (<IngredientCard
              key={ strIngredient }
              ingredient={ strIngredient }
              index={ index }
              recipe="meal"
            />))}
        </div>
        <div style={ { height: '160px' } } />
      </section>
      <Footer />
    </section>
  );
}

export default FoodIngredient;
