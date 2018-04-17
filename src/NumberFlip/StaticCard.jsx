import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  position: PropTypes.string.isRequired,
  digit: PropTypes.number.isRequired,
};

class StaticCard extends React.Component {
  render() {
    const { position, digit } = this.props;
    return (
      <div className={position}>
        <span>{digit}</span>
      </div>
    );
  }
}

StaticCard.propTypes = propTypes;

export default StaticCard;
