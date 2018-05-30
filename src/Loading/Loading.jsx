import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import style from './style/index.scss';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  vertical: PropTypes.bool,
  horizontal: PropTypes.bool,
};

const defaultProps = {
  children: null,
  className: null,
  vertical: true,
  horizontal: true,
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

    if (this.props.horizontal) {
      message.style.marginLeft = `${-(0.5 * clientWidth)}px`;
    }

    if (this.props.vertical) {
      message.style.marginTop = `${-(0.5 * clientHeight)}px`;
    }
  }

  render() {
    return (
      <div className={classNames(this.props.className, style.container)}>
        <div
          ref={(el) => { this.message = el; }}
          className="message d-inline-block"
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

Loading.propTypes = propTypes;
Loading.defaultProps = defaultProps;

export default Loading;
