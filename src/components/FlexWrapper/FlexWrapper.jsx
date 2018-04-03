import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import style from './style/index.scss';

const propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
  bottom: PropTypes.number,
  className: PropTypes.string,
  absolute: PropTypes.bool,
  style: PropTypes.shape({}),
  isFixedHeight: PropTypes.bool,
};

const defaultProps = {
  id: null,
  children: null,
  bottom: 0,
  className: null,
  absolute: false,
  style: {},
  isFixedHeight: true,
};

class FlexWrapper extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      absoluteTop: null,
    };
    this.resizeContainer = this.resizeContainer.bind(this);
  }

  componentDidMount() {
    this.resizeContainer();
    window.addEventListener('resize', this.resizeContainer);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeContainer);
  }

  resizeContainer() {
    if (this.container == null) {
      return;
    }


    if (this.props.absolute) {
      if (this.state.absoluteTop != null) {
        return;
      }

      this.setState({ absoluteTop: this.container.offsetTop });
      return;
    }

    const { top } = this.container.getBoundingClientRect();

    this.container.style[this.props.isFixedHeight ? 'height' : 'minHeight']
      = `${window.innerHeight - top - this.props.bottom}px`;
  }

  render() {
    return (
      <div
        id={this.props.id}
        ref={(el) => { this.container = el; }}
        className={classNames(
          this.props.className,
          { 'p-relative': this.props.absolute },
          { [style.absolute]: this.props.absolute && this.state.absoluteTop != null },
        )}
        style={{
          ...this.props.style,
          top: this.state.absoluteTop,
          bottom: this.props.absolute ? this.props.bottom : null,
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

FlexWrapper.propTypes = propTypes;
FlexWrapper.defaultProps = defaultProps;

export default FlexWrapper;
