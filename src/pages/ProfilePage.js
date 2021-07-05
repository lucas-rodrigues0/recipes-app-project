import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import desktopImage from '../images/Login_Desktop.png';
import mobileImage from '../images/Login_Mobile.png';

function ProfilePage() {
  const [ bgImage, setBgImage ] = useState('');
  const [ userPosition, setUserPosition ] = useState({});
  const history = useHistory();
  const user = localStorage.getItem('user');
  let email = '';
  if (user) email = JSON.parse(user).email;

  const setImageSize = () => {
    if(window.innerWidth < 400) {
      setBgImage(mobileImage);
      setUserPosition({ fontSize: '22px', position: 'relative', top: '30px', zIndex: '6'});
    } else {
      setBgImage(desktopImage);
      setUserPosition({ fontSize: '26px', zIndex: '6' });
    }
  }

  useEffect(() => {
    setImageSize();
  }, []);

  const removeLocalStorage = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('mealsToken');
    localStorage.removeItem('cocktailsToken');
    localStorage.removeItem('doneRecipes');
    localStorage.removeItem('favoriteRecipes');
    localStorage.removeItem('inProgressRecipes');
    history.push('/');
  };

  const backImage = {
    backgroundImage: `url(${bgImage})`,
    height: '100vh'
  }

  return (
    <section className="bg-image" style={backImage}>
      <Header />
      <section className="d-flex justify-content-end">
        { user
        && <p className="text-light p-3" style={ userPosition } data-testid="profile-email">{ email }</p> }
      </section>
      <section className="container">
        <div style={ { height: '160px' } } />
        <div className="row d-flex align-items-center justify-content-center">
          <div className="col-md-3 px-5 py-3 mask justify-content-center" style={ { backgroundColor: 'rgb(0, 0, 0, 0.8)' } }>
            <button
              type="button"
              data-testid="profile-done-btn"
              onClick={ () => history.push('/receitas-feitas') }
              className="btn btn-outline-light"
              style={{ width: '100%'}}
            >
              Receitas Feitas
            </button>
            <button
              type="button"
              data-testid="profile-favorite-btn"
              onClick={ () => history.push('/receitas-favoritas') }
              className="btn btn-outline-light"
              style={{ width: '100%'}}
            >
              Receitas Favoritas
            </button>
          </div>
        </div>
        <div className="row d-flex align-items-center justify-content-center">
          <div className="col-md-3 px-5 pb-3 mask" style={ { backgroundColor: 'rgb(0, 0, 0, 0.8)' } }>
            <Link to="/">
              <button
                type="button"
                data-testid="profile-logout-btn"
                onClick={ removeLocalStorage }
                className="btn btn-outline-light"
                style={{ width: '100%'}}
              >
                Log Out
              </button>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </section>
  );
}

export default ProfilePage;
