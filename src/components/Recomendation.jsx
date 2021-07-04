import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import recomendationThunk from '../redux/actions/recomendationAction';
import recomendationThunkDrinks from '../redux/actions/recomendationDrinks';

function Recomendation() {
  const [ carouselImageSize, setCarouselImageSize ] = useState('');
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const { recomendation } = useSelector((state) => state.recomendation);

  const setImageSize = () => {
    if (window.innerWidth < 400) {
      setCarouselImageSize("w-50")
    } else {
      setCarouselImageSize("w-25")
    }
  }

  useEffect(() => {
    setImageSize();
  }, []);

  useEffect(() => {
    let fetchData = '';
    if (pathname.split('/')[ 1 ] === 'bebidas') {
      fetchData = () => dispatch(recomendationThunk(''));
    }
    if (pathname.split('/')[ 1 ] === 'comidas') {
      fetchData = () => dispatch(recomendationThunkDrinks(''));
    }
    fetchData('');
  }, []);

  return (
    <Carousel fade showThumbs={ false }>
      { recomendation.map((element, index) => (
        <div
          key={ index }
          data-testid={ `${index}-recomendation-card` }
          className="row"
        >
          { pathname.split('/')[ 1 ] === 'comidas'
            ? (
              <div className="col">
                <img className={ carouselImageSize } src={ element.strDrinkThumb } alt="drink" />
                <h4 data-testid={ `${index}-recomendation-title` }>{ element.strDrink }</h4>
                <div style={ { height: '20px' } } />
              </div>
            ) : (
              <div className="col">
                <img className={ carouselImageSize } src={ element.strMealThumb } alt="meal" />
                <h4 data-testid={ `${index}-recomendation-title` }>{ element.strMeal }</h4>
                <div style={ { height: '20px' } } />
              </div>
            ) }
        </div>)) }
    </Carousel>
  );
}

export default Recomendation;
