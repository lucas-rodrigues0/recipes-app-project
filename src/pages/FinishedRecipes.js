import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FilterTypeBtn from '../components/FilterTypeBtn';
import Header from '../components/Header';
import ShareButton from '../components/ShareButton';
import desktopImage from '../images/Login_Desktop.png';
import mobileImage from '../images/Login_Mobile.png';


function getTags({ tags }, index) {
  if (!tags) return null;
  if (tags) {
    return (
      <>
        { tags.map((e) => (
          <span
            key={ `${index}${e}` }
            data-testid={ `${index}-${e}-horizontal-tag` }
          >
            { e }
          </span>
        ))}
      </>
    );
  }
}

function FinishedRecipes() {
  const [ bgImage, setBgImage ] = useState('');
  const [ colNumber, setColNumber ] = useState('');
  const [ colHeight, setColHeight ] = useState('');
  const [ btnSize, setBtnSize ] = useState({});
  const [ imgSize, setImgSize ] = useState({});
  const [ nameSize, setNameSize ] = useState('');
  const [ btnsPosition, setBtnsPosition ] = useState({});
  const [ infoSize, setInfoSize ] = useState({});

  const finishedRecipesStorage = (localStorage.getItem('doneRecipes'))
    ? JSON.parse(localStorage.getItem('doneRecipes'))
    : [];
  const [filterSelector, setFilterSelector] = useState('all');

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
          <div className="mask h-100" style={ { backgroundColor: 'rgb(255, 255, 255, 0.7)' } }>
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
                  <div className="">
                    <p className="fs-6 small text-black-50 text-decoration-none fw-bold"
                      data-testid={ `${index}-horizontal-top-text` }
                    >
                      { (recipe.area)
                        ? `${recipe.area} - ${recipe.category}` : `${recipe.category}` }
                      { (recipe.alcoholicOrNot) && <span>{ recipe.alcoholicOrNot }</span> }
                    </p>
                    <span
                      data-testid={ `${index}-horizontal-done-date` }
                    >
                      { `Feita em: ${recipe.doneDate} ` }
                    </span>
                    { getTags(recipe, index) }
                  </div>
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
          </div>
        </div>
      </section>
    );
  }

  function generateListOfCards() {
    if (finishedRecipesStorage.length === 0) {
      return (
        <div className="row">
          <div className="col d-flex justify-content-center w-50">
            <p
              className="h3 text-light text-center fw-bold p-4"
              style={ { backgroundColor: 'rgb(0, 0, 0, 0.5)' } }
            >
              No recipes finished yet!
            </p>
          </div>
        </div>      );
    }
    if (filterSelector === 'all' && finishedRecipesStorage) {
      return (
        <div className="row d-flex justify-content-center" style={ { backgroundColor: 'rgb(0, 0, 0, 0.5)' } }>
          { finishedRecipesStorage.map((recipe, index) => generateCard(recipe, index)) }
        </div>
      );
    }
    if (filterSelector === 'food' && finishedRecipesStorage) {
      const filteredRecipes = finishedRecipesStorage
        .filter((elem) => elem.type === 'comida');
      return (
        <div className="row d-flex justify-content-center" style={ { backgroundColor: 'rgb(0, 0, 0, 0.5)' } }>
          { filteredRecipes.map((recipe, index) => generateCard(recipe, index)) }
        </div>
      );
    }
    if (filterSelector === 'drinks' && finishedRecipesStorage) {
      const filteredRecipes = finishedRecipesStorage
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
      <section>
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

export default FinishedRecipes;
