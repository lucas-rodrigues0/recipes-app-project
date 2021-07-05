import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { clearRecipesAction } from '../redux/actions/clearRecipesAction';
import fetchMealThunk from '../redux/actions/fetchMealAction';
import desktopImage from '../images/Meals_Desktop.png';
import mobileImage from '../images/Meals_Mobile.png';

function ExploreOrigin() {
  const [ bgImage, setBgImage ] = useState('');
  const [ colNumber, setColNumber ] = useState('');
  const [ colHeight, setColHeight ] = useState('');
  const [ btnSize, setBtnSize ] = useState({});
  const [ imgSize, setImgSize ] = useState({});
  const [ nameSize, setNameSize ] = useState('');
  const [ infoSize, setInfoSize ] = useState({});
  const history = useHistory();
  const dispatch = useDispatch();
  const { recipes } = useSelector((state) => state.recipes);
  const { areaChoosen } = useSelector((state) => state.search);
  const type = areaChoosen !== '' ? 'area' : '';

  const setSizes = () => {
    if(window.innerWidth < 400) {
      setBgImage(mobileImage);
      setColNumber('col-6 d-flex justify-content-center mb-3');
      setColHeight('180px');
      setBtnSize({ minWidth: '130px' });
      setImgSize({ maxWidth: '110px' });
      setNameSize('h6');
      setInfoSize({ height: '60px', overflowY: 'scroll' });
    } else {
      setBgImage(desktopImage);
      setColNumber('col-4 d-flex justify-content-center mb-3');
      setColHeight('80%');
      setBtnSize({ minHeight: '400px', width: '260px' });
      setImgSize({ maxWidth: '260px' });
      setNameSize('h4');
      setInfoSize({});
    }
  }

  useEffect(() => {
    setSizes();
  }, []);

  useEffect(() => {
    const fetchData = (inputf, typef) => dispatch(fetchMealThunk(inputf, typef));
    fetchData(areaChoosen, type);
  }, [areaChoosen, type]);

  useEffect(() => () => {
    dispatch(clearRecipesAction());
  }, []);

  const backImage = {
    backgroundImage: `url(${bgImage})`,
    height: '100vh'
  }

  return (
    <section className="bg-image" style={ backImage }>
      <section>
        <Header />
      </section>
      <div style={ { height: '120px'} }/>
      <section className="container">
        <div className="row d-flex justify-content-center" style={ { backgroundColor: 'rgb(0, 0, 0, 0.4)' } }>

          { recipes && recipes.map((elem, index) => (
              <div className={ colNumber } style={ { height: colHeight, position: 'relative', zIndex: '4' } }>
              <button
                key={ elem.idMeal }
                type="button"
                onClick={ () => history.push(`/comidas/${elem.idMeal}`) }
                data-testid={ `${index}-recipe-card` }
                className="btn btn-outline-light d-flex justify-content-start"
                style={ btnSize }
              >
                <div style={ imgSize }>
                  <img
                    className="img-responsive w-100"
                    src={ elem.strMealThumb }
                    alt={ elem.strMeal }
                    data-testid={ `${index}-card-img` }
                  />
                  <div style={ infoSize }>
                    <p className={ nameSize } data-testid={ `${index}-card-name` }><strong>{ elem.strMeal }</strong></p>
                    <span><small>{ elem.idMeal }</small></span>
                  </div>
                </div>
              </button>
              </div>
            ))}

        </div>
      </section>
      <Footer />
    </section>
  );
}

export default ExploreOrigin;
