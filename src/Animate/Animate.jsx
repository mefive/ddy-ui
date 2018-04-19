import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isEqual from 'lodash/isEqual';
import remove from 'lodash/remove';

import './style/index.scss';

const INIT = 'init';
const MOUNTED = 'mounted';
const ANIMATED = 'animated';
const LEAVING = 'leaving';
const NO_KEY = 'no_key';

const propTypes = {
  enterClassName: PropTypes.string,
  leaveClassName: PropTypes.string,
  enterDuration: PropTypes.number,
  leaveDuration: PropTypes.number,
  activeClass: PropTypes.string,
  children: PropTypes.node,
};

const defaultProps = {
  enterDuration: 200,
  leaveDuration: 200,
  enterClassName: 'enter',
  leaveClassName: 'leave',
  activeClass: 'active',
  children: null,
};

class Animate extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      status: INIT,
      children: [],
      statusMap: {},
    };

    const statusMap = {};

    if (this.props.children) {
      const children = [];

      React.Children.forEach(this.props.children, (child, index) => {
        const key = child.key || NO_KEY;
        statusMap[key] = { status: INIT, index };
        children.push({ index, child });
      });

      this.state = {
        ...this.state,
        statusMap,
        children,
      };

      setTimeout(() => this.processMount());
    }
  }

  componentDidMount() {
    this.hasMounted = true;
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.children, this.props.children)) {
      const statusMap = { ...this.state.statusMap };

      const children = [];
      const newKeys = React.Children.map(nextProps.children, i => (i ? (i.key || NO_KEY) : null));
      // console.log('newKeys', newKeys);

      // flag new item to INIT,
      React.Children.forEach(nextProps.children, (child, index) => {
        if (child == null) {
          return;
        }

        const key = child.key || NO_KEY;

        if (!(key in statusMap)) {
          statusMap[key] = {
            status: INIT,
            index,
          };
        }

        children.push({ index, child });
      });

      let hasLeavingChild = false;

      // abandoned item to LEAVING
      Object.keys(statusMap).forEach((key) => {
        if (!newKeys || newKeys.indexOf(key) === -1) {
          statusMap[key].status = LEAVING;

          hasLeavingChild = true;

          children.push({
            index: statusMap[key].index,
            child: this.state.children.find(i => (i.child.key || NO_KEY) === key).child,
          });
        }
      });

      // console.log(sortBy(children, ['index']));
      this.setState({ children, statusMap });

      if (hasLeavingChild) {
        setTimeout(() => this.processLeave(), nextProps.leaveDuration);
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.children, this.props.children)) {
      setTimeout(() => this.processMount());
    }
  }

  componentWillUnmount() {
    this.hasMounted = false;
  }

  getClassName(status) {
    const className = [];

    if (status === LEAVING) {
      className.push(this.props.leaveClassName);
    }

    if (status !== INIT) {
      className.push(this.props.activeClass);
    }

    if (status === MOUNTED) {
      className.push(this.props.enterClassName);
    }

    // console.log('calculated className', status, className, classNames(...className));

    return classNames(...className);
  }

  processMount() {
    // console.log('processMount');

    if (!this.hasMounted) {
      return;
    }

    const statusMap = { ...this.state.statusMap };

    Object.keys(statusMap).forEach((key) => {
      if (statusMap[key].status === INIT) {
        statusMap[key].status = MOUNTED;
      }
    });

    this.setState({ statusMap });

    setTimeout(() => this.processEnter(), this.props.enterDuration);
  }

  processEnter() {
    // console.log('processEnter');

    if (!this.hasMounted) {
      return;
    }

    const statusMap = { ...this.state.statusMap };

    Object.keys(statusMap).forEach((key) => {
      if (statusMap[key].status === MOUNTED) {
        statusMap[key].status = ANIMATED;
      }
    });

    this.setState({ statusMap });
  }

  processLeave() {
    // console.log('processLeave');

    if (!this.hasMounted) {
      return;
    }

    const statusMap = { ...this.state.statusMap };
    const children = [...this.state.children];

    Object.keys(statusMap).forEach((key) => {
      if (statusMap[key].status === LEAVING) {
        delete statusMap[key];
        remove(children, i => (i.child.key || NO_KEY) === key);
      }
    });

    // console.log('children leave', children);

    this.setState({ statusMap, children });
  }


  render() {
    let { children } = this.state;

    if (children.length === 0 || children[0] == null) {
      children = null;
    }

    return (
      <span>
        {children && (
          children.length > 1
            ? children.map(({ child }) => React.cloneElement(
            child,
            {
              className: classNames(
                'animation',
                child.props.className,
                this.getClassName(this.state.statusMap[child.key || NO_KEY].status),
              ),
            },
            ))
            // for the case that single child with no key
            : React.cloneElement(
            children[0].child,
            {
              className: classNames(
                'animation',
                children[0].child.props.className,
                this.getClassName(this.state.statusMap[children[0].child.key || NO_KEY].status),
              ),
            },
            )
        )
        }
      </span>
    );
  }
}

Animate.propTypes = propTypes;
Animate.defaultProps = defaultProps;

export default Animate;
