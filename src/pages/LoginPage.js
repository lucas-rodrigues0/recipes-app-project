import React, { useEffect, useState } from 'react';

import Login from '../components/Login';

import desktopImage from '../images/Login_Desktop.png';
import mobileImage from '../images/Login_Mobile.png';

const styleLogin = {
  backgroundColor: 'rgb(7, 6, 6, 0.7)',
  color: '#e3e0de',
  fontFamily: 'Impact, Arial Narrow Bold, sans-serif',
  fontWeight: '800',
  height: '60px',
  paddingTop: '10px',
  textAlign: 'center',
  width: '100%',
}

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
    <div className="bg-image" style={ backImage }>
      <h1 style={ styleLogin }>Recipes App</h1>
      <Login />
    </div>
  );
}

export default LoginPage;
