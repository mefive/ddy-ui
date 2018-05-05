import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  position: PropTypes.string.isRequired,
  digit: PropTypes.number.isRequired,
};

const StaticCard = (props) => {
  const { position, digit } = props;
  return (
    <div className={position}>
      <span>{digit}</span>
    </div>
  );
};

StaticCard.propTypes = propTypes;

export default StaticCard;
