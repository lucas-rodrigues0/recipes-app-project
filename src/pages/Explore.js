import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../CSS/Explore.css';
import desktopImage from '../images/Login_Desktop.png';
import mobileImage from '../images/Login_Mobile.png';

function Explore() {
  const [ bgImage, setBgImage ] = useState('');
  const [ btnSize, setBtnSize ] = useState('');
  const history = useHistory();

  const setImageSize = () => {
    if(window.innerWidth < 400) {
      setBgImage(mobileImage);
      setBtnSize('col px-5 py-3 mask justify-content-center');
    } else {
      setBgImage(desktopImage);
      setBtnSize('col-6 px-5 py-3 mask justify-content-center');
    }
  }

  useEffect(() => {
    setImageSize();
  }, []);

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
            <button
              onClick={ () => history.push('/explorar/comidas') }
              data-testid="explore-food"
              type="button"
              className="btn btn-outline-light btn-lg d-block w-100 p-2 m-3"
            >
              Explorar Comidas
            </button>
            <button
              onClick={ () => history.push('/explorar/bebidas') }
              data-testid="explore-drinks"
              type="button"
              className="btn btn-outline-light btn-lg d-block w-100 p-2 m-3"
            >
              Explorar Bebidas
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default Explore;
