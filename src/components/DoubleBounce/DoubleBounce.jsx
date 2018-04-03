import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import style from './style/index.scss';

const propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  className: PropTypes.string,
};

const defaultProps = {
  size: 20,
  color: '#333',
  className: null,
};

class DoubleBounce extends React.PureComponent {
  render() {
    return (
      <div
        className={classNames(style.spinner, this.props.className)}
        style={{
          width: this.props.size,
          height: this.props.size,
        }}
      >
        <div
          className={style['double-bounce1']}
          style={{
            backgroundColor: this.props.color,
          }}
        />
        <div
          className={style['double-bounce2']}
          style={{
            backgroundColor: this.props.color,
          }}
        />
      </div>
    );
  }
}

DoubleBounce.propTypes = propTypes;
DoubleBounce.defaultProps = defaultProps;

export default DoubleBounce;
