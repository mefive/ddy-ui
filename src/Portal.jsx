import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { PortalContext } from './context';

class Portal extends React.PureComponent {
  static propTypes = {
    getContainer: PropTypes.func.isRequired,
    children: PropTypes.node,
    className: PropTypes.string,
    onContainerChange: PropTypes.func,
  };

  static defaultProps = {
    children: null,
    className: null,
    onContainerChange: () => {},
  };

  constructor(props) {
    super(props);

    const container = this.props.getContainer == null ? document.body : this.props.getContainer();
    this.container = container;

    this.wrapper = document.createElement('div');

    container.appendChild(this.wrapper);
  }

  componentDidMount() {
    this.props.onContainerChange(this.container);
  }

  componentWillUnmount() {
    this.wrapper.parentNode.removeChild(this.wrapper);
  }

  render() {
    const child = React.Children.only(this.props.children);

    return ReactDOM.createPortal(React.cloneElement(child, {
      className: classNames(child.props.className, this.props.className),
    }), this.wrapper);
  }
}

export default React.forwardRef((props, ref) => (
  <PortalContext.Consumer>
    {({ getContainer }) => (
      <Portal
        {...props}
        getContainer={props.getContainer || getContainer}
        ref={ref}
      />
    )}
  </PortalContext.Consumer>
));
