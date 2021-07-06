import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from '../components/Login';
import '../CSS/LoginPage.css';
import desktopImage from '../images/Login_Desktop.png';
import mobileImage from '../images/Login_Mobile.png';

function LoginPage() {
  const [ bgImage, setBgImage ] = useState('');

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

  const backImage = {
    backgroundImage: `url(${bgImage})`,
    height: '100vh'
  }

  return (
    <div className="bg-image" style={backImage}>
      <h1 className="login-title">Recipes App</h1>
      <Login />
    </div>
  );
}

export default LoginPage;
