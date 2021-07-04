import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import userAction from '../redux/actions/userAction';

export default function Login() {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ verification, setVerification ] = useState(false);
  const [ redirect, setRedirect ] = useState(false);

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(userAction({ email, password }));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
    setRedirect(true);
  };

  useEffect(() => {
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/i;
    const PASSWORD_LENGTH = 6;

    if (regexEmail.test(email) && password.length > PASSWORD_LENGTH) {
      setVerification(true);
    }
    if (!regexEmail.test(email) || password.length <= PASSWORD_LENGTH) {
      setVerification(false);
    }
  }, [ email, password.length ]);

  return (
    <div className="row d-flex align-items-center justify-content-center">
      <form className="p-5 mt-5 col-md-3 mask" style={ { backgroundColor: 'rgb(0, 0, 0, 0.6)' } }>
        { redirect && <Redirect to="/comidas" /> }
        <div className="container flex-column align-items-center justify-content-center">
          <div>
            <label htmlFor="email-login" className="row form-label">
              Email address
              <input
                id="email-login"
                type="email"
                name="email"
                data-testid="email-input"
                value={ email }
                onChange={ ({ target }) => setEmail(target.value) }
              />
            </label>
          </div>
          <div>
            <label htmlFor="password-login" className="row form-label">
              Password
              <input
                id="password-login"
                type="password"
                name="password"
                data-testid="password-input"
                value={ password }
                onChange={ ({ target }) => setPassword(target.value) }
              />
            </label>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button
            type="button"
            data-testid="login-submit-btn"
            onClick={ handleClick }
            disabled={ !verification }
            className="mt-3 btn btn-outline-light"
          >
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
}
