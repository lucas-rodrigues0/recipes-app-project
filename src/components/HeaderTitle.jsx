import React from 'react';
import PropTypes from 'prop-types';

function HeaderTitle({ title }) {
  let newTitle = title;
  const aTitle = title.split('/');
  if (aTitle[ 3 ] === 'area') aTitle.splice(aTitle.length - 1, 1, 'origem');
  if (title.includes('-')) newTitle = title.replace('-f', ' F');

  return (
    <div className="d-flex justify-content-center" style={ {
      backgroundColor: 'rgb(0, 0, 0, 0.6)'
    } }>
      <h1 data-testid="page-title" className="text-light fw-bold" style={ {
        fontFamily: 'Impact, Arial Narrow Bold, sans-serif'
      } }>
        { aTitle.length <= 2 ? newTitle.charAt(1).toUpperCase() + newTitle.slice(2)
          : `${aTitle[ 1 ].charAt(0).toUpperCase() + aTitle[ 1 ].slice(1)} ${aTitle[ aTitle.length - 1 ].charAt(0)
            .toUpperCase()}${aTitle[ aTitle.length - 1 ].slice(1)}` }
      </h1>
    </div>
  );
}

HeaderTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default HeaderTitle;
