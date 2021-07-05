import React from 'react';
import { useHistory } from 'react-router';

function Button() {
  const history = useHistory();
  return (
    <button
      onClick={ () => history.push('/explorar/comidas/area') }
      data-testid="explore-by-area"
      type="button"
      className="btn btn-outline-light btn-lg d-block w-100 p-2 m-3"
    >
      Por Local de Origem
    </button>
  );
}

export default Button;
