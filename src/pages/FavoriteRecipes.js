import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FilterTypeBtn from '../components/FilterTypeBtn';
import Header from '../components/Header';
import ShareButton from '../components/ShareButton';
import FavoritePageLikeBtn from '../components/FavoritePageLikeBtn';
import '../CSS/ProfilePage.css';
import desktopImage from '../images/Login_Desktop.png';
import mobileImage from '../images/Login_Mobile.png';

function FavoriteRecipes() {
  const [ bgImage, setBgImage ] = useState('');
  const [ colNumber, setColNumber ] = useState('');
  const [ colHeight, setColHeight ] = useState('');
  const [ btnSize, setBtnSize ] = useState({});
  const [ imgSize, setImgSize ] = useState({});
  const [ nameSize, setNameSize ] = useState('');
  const [ btnsPosition, setBtnsPosition ] = useState({});
  const [ infoSize, setInfoSize ] = useState({});

  const favoriteRecipesStorage = (localStorage.getItem('favoriteRecipes'))
    ? JSON.parse(localStorage.getItem('favoriteRecipes'))
    : [];
  const [filterSelector, setFilterSelector] = useState('all');
  const [ reRender, setReRender ] = useState(false);

  const setImageSize = () => {
    if(window.innerWidth < 400) {
      setBgImage(mobileImage);
      setColNumber('col-6 d-flex justify-content-center mb-3');
      setColHeight('240px');
      setBtnSize({ minHeight: '240px', minWidth: '130px' });
      setImgSize({ maxHeight: '110px' });
      setNameSize('text-black-50 text-decoration-none');
      setBtnsPosition({ position: 'relative', top: '-45px' });
      setInfoSize({ height: '80px', overflowY: 'scroll' });
    } else {
      setBgImage(desktopImage);
      setColNumber('col-4 d-flex justify-content-center mb-3');
      setColHeight('80%');
      setBtnSize({ minHeight: '400px', minWidth: '260px' });
      setImgSize({ maxWidth: '260px' });
      setNameSize('h4 text-black-50 text-decoration-none mt-1');
      setBtnsPosition({ position: 'relative', top: '-60px' });
      setInfoSize({ height: '160px'});
    }
  }

  useEffect(() => {
    setImageSize();
  }, []);

  function handleSelector({ target }) {
    setFilterSelector(target.value);
  }

  function generateCard(recipe, index) {
    return (
      <section key={ recipe.id } className={ colNumber } style={ { height: colHeight, position: 'relative', zIndex: '4' } }>
        <div className="btn btn-outline-light d-flex-column justify-content-start" style={ btnSize }>
          <div  className="mask h-100" style={{ backgroundColor: 'rgb(255, 255, 255, 0.7)' }}>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <div style={ imgSize }>
                <img
                  className="img-responsive w-100"
                  src={ recipe.image }
                  alt={ recipe.name }
                  data-testid={ `${index}-horizontal-image` }
                />
                <div className="d-flex-column justify-content-start" style={ infoSize }>
                  <p className={ nameSize }
                    data-testid={ `${index}-horizontal-name` }
                  >
                    { recipe.name }
                  </p>
                  <p className="fs-6 small text-black-50 text-decoration-none fw-bold"
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    { (recipe.area)
                      ? `${recipe.area} - ${recipe.category}` : `${recipe.category}` }
                    { (recipe.alcoholicOrNot) && <span>{ recipe.alcoholicOrNot }</span> }
                  </p>
                </div>
              </div>
            </Link>
          </div>
          <div style={ btnsPosition }>
            <ShareButton
              dataTestId={ `${index}-horizontal-share-btn` }
              recipeId={ recipe.id }
              recipeType={ recipe.type }
            />
            <FavoritePageLikeBtn
              dataTestId={ `${index}-horizontal-favorite-btn` }
              recipeId={ recipe.id }
              reRender={ reRender }
              setReRender={ setReRender }
            />
          </div>
        </div>
      </section>
    );
  }

  function generateListOfCards() {
    if (favoriteRecipesStorage.length === 0) {
      return (
        <div className="row">
          <div className="col d-flex justify-content-center w-50">
            <p
              className="h3 text-light text-center fw-bold p-4"
              style={ { backgroundColor: 'rgb(0, 0, 0, 0.5)' } }
            >
              No favorite recipes yet!
            </p>
          </div>
        </div>
      );
    }
    if (filterSelector === 'all' && favoriteRecipesStorage) {
      return (
        <div className="row d-flex justify-content-center" style={ { backgroundColor: 'rgb(0, 0, 0, 0.5)' } }>
          { favoriteRecipesStorage.map((recipe, index) => generateCard(recipe, index)) }
        </div>
      );
    }
    if (filterSelector === 'food' && favoriteRecipesStorage) {
      const filteredRecipes = favoriteRecipesStorage
        .filter((elem) => elem.type === 'comida');
      return (
        <div className="row d-flex justify-content-center" style={ { backgroundColor: 'rgb(0, 0, 0, 0.5)' } }>
          { filteredRecipes.map((recipe, index) => generateCard(recipe, index)) }
        </div>
      );
    }
    if (filterSelector === 'drinks' && favoriteRecipesStorage) {
      const filteredRecipes = favoriteRecipesStorage
        .filter((elem) => elem.type === 'bebida');
      return (
        <div className="row d-flex justify-content-center" style={ { backgroundColor: 'rgb(0, 0, 0, 0.5)' } }>
          { filteredRecipes.map((recipe, index) => generateCard(recipe, index)) }
        </div>
      );
    }
  }

  const backImage = {
    backgroundImage: `url(${bgImage})`,
    height: '100vh'
  }

  return (
    <section className="bg-image" style={backImage}>
      <section >
        <Header />
      </section>
      <section className="container">
        <div style={ { height: '160px' } } />
        <div className="p-3">
          <FilterTypeBtn handleSelector={ handleSelector } />
        </div>
        { generateListOfCards() }
      </section>
      <div style={ { height: '60px'} }/>
    </section>
  );
}

export default FavoriteRecipes;
