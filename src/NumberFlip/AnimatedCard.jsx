import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  position: PropTypes.string.isRequired,
  digit: PropTypes.number.isRequired,
  animation: PropTypes.string.isRequired,
};

const AnimatedCard = (props) => {
  const { position, digit, animation } = props;
  return (
    <div className={`flipCard ${position} ${animation}`}>
      <span>{digit}</span>
    </div>
  );
};

AnimatedCard.propTypes = propTypes;

export default AnimatedCard;
