import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM, {
  unstable_renderSubtreeIntoContainer,
  unmountComponentAtNode
} from 'react-dom';
import classNames from 'classnames';

const propTypes = {
  className: PropTypes.string,
  getContainer: PropTypes.func,
  onContainerChange: PropTypes.func,
};

const defaultProps = {
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

  componentWillUnmount() {
    const { container } = this;
    unmountComponentAtNode(container);
    container.parentNode.removeChild(container);
    this.container = null;
  }

  componentDidUpdate() {
    this.renderInner();
  }

  renderInner() {
    unstable_renderSubtreeIntoContainer(
      this,
      React.cloneElement(
        this.props.children,
        {
          className: classNames(
            this.props.children.props.className,
            this.props.className
          )
        }
      ),
      this.container
    );
  }

  render() {
    return null;
  }
}

Portal.propTypes = propTypes;
Portal.defaultProps = defaultProps;

export default Portal;