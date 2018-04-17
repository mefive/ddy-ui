import React from 'react';
import PropTypes from 'prop-types';

import style from './style/index.scss';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {
  children: null,
};

class Loading extends React.PureComponent {
  componentDidMount() {
    this.pin();
  }

  componentDidUpdate({ children }) {
    if (children !== this.props.children) {
      this.pin();
    }
  }

  pin() {
    const { message } = this;
    const { clientWidth, clientHeight } = message;

    message.style.marginLeft = `${-(0.5 * clientWidth)}px`;
    message.style.marginTop = `${-(0.5 * clientHeight)}px`;
  }

  render() {
    return (
      <div className={style.container}>
        <span
          ref={(el) => { this.message = el; }}
          className={style.message}
        >
          {this.props.children}
        </span>
      </div>
    );
  }
}

Loading.propTypes = propTypes;
Loading.defaultProps = defaultProps;

export default Loading;
