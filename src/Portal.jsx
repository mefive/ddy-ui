import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import classNames from 'classnames';

const propTypes = {
  getContainer: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
};

const defaultProps = {
  getContainer: null,
  children: null,
  className: null,
};

class Portal extends React.PureComponent {
  constructor(props) {
    super(props);

    const container = this.props.getContainer == null ? document.body : this.props.getContainer();

    this.container = document.createElement('div');

    container.appendChild(this.container);
  }

  componentWillUnmount() {
    this.container.parentNode.removeChild(this.container);
  }

  render() {
    const children = React.cloneElement(
      this.props.children,
      {
        className: classNames(
          this.props.children.props ? this.props.children.props.className : null,
          this.props.className,
        ),
      },
    );

    return ReactDOM.createPortal(children, this.container);
  }
}

Portal.propTypes = propTypes;
Portal.defaultProps = defaultProps;

export default Portal;
