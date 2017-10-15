import React from 'react';
import PropTypes from 'prop-types';
import {
  unstable_renderSubtreeIntoContainer as renderSubtreeIntoContainer,
  unmountComponentAtNode,
} from 'react-dom';
import classNames from 'classnames';

const propTypes = {
  className: PropTypes.string,
  getContainer: PropTypes.func,
  onContainerChange: PropTypes.func,
  children: PropTypes.node,
};

const defaultProps = {
  className: null,
  getContainer: null,
  children: null,
  onContainerChange: () => null,
};

class Portal extends React.Component {
  componentDidMount() {
    const { getContainer } = this.props;

    if (getContainer) {
      this.container = getContainer();
    }
    else {
      this.container = document.createElement('div');
      document.body.appendChild(this.container);
      this.renderInner();
    }

    this.props.onContainerChange(this.container.parentNode);
  }

  componentDidUpdate() {
    this.renderInner();
  }

  componentWillUnmount() {
    const { container } = this;
    unmountComponentAtNode(container);
    container.parentNode.removeChild(container);
    this.container = null;
  }

  renderInner() {
    renderSubtreeIntoContainer(
      this,
      React.cloneElement(
        this.props.children,
        {
          className: classNames(
            this.props.children.props.className,
            this.props.className,
          ),
        },
      ),
      this.container,
    );
  }

  render() {
    /* eslint "class-methods-use-this": 0 */
    return null;
  }
}

Portal.propTypes = propTypes;
Portal.defaultProps = defaultProps;

export default Portal;
