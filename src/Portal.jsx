import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

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

class Portal extends React.PureComponent {
  constructor(props) {
    super(props);

    const { getContainer } = this.props;

    if (getContainer) {
      this.container = getContainer();
    } else {
      this.container = document.createElement('div');
      document.body.appendChild(this.container);
    }
  }

  componentDidMount() {
    this.props.onContainerChange(this.container.parentNode);
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
