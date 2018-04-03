import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* eslint-disable */
import {
 unstable_renderSubtreeIntoContainer,
 unmountComponentAtNode,
} from 'react-dom';
/* eslint-enable */

import classNames from 'classnames';

const propTypes = {
  getContainer: PropTypes.func,
  onContainerChange: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
};

const defaultProps = {
  getContainer: null,
  onContainerChange: () => null,
  children: null,
  className: null,
};

class Portal extends Component {
  componentDidMount() {
    const { getContainer } = this.props;

    if (getContainer) {
      this.container = getContainer();
    } else {
      this.container = document.createElement('div');
      document.body.appendChild(this.container);
      this.renderInner();
    }

    this.props.onContainerChange(this.container.parentNode);

    if (this.props.children != null) {
      this.renderInner();
    }
  }

  componentDidUpdate() {
    this.renderInner();
  }

  componentWillUnmount() {
    const { container } = this;
    unmountComponentAtNode(container);
    if (container.parentNode != null) {
      container.parentNode.removeChild(container);
    }
    this.container = null;
  }

  renderInner() {
    unstable_renderSubtreeIntoContainer(
      this,
      React.cloneElement(
        this.props.children,
        {
          className: classNames(
            this.props.children.props ? this.props.children.props.className : null,
            this.props.className,
          ),
        },
      ),
      this.container,
    );
  }

  render() {
    return null;
  }
}

Portal.propTypes = propTypes;
Portal.defaultProps = defaultProps;

export default Portal;
