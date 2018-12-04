import React from 'react';
import PropTypes from 'prop-types';

export default (WrappedComponent) => {
  const name = WrappedComponent.displayName || WrappedComponent.name;

  class SafeSetState extends React.Component {
    static propTypes = {
      forwardedRef: PropTypes.func,
    };

    static defaultProps = {
      forwardedRef: () => {},
    };

    static displayName = `safe-set-state-${name}`;

    componentWillUnmount() {
      this.child.setState = () => {};
    }

    render() {
      const { forwardedRef, ...rest } = this.props;

      return (
        <WrappedComponent
          ref={(child) => {
            this.child = child;
            if (forwardedRef) {
              forwardedRef(child);
            }
          }}
          {...rest}
        />
      );
    }
  }

  function forwardRef(props, ref) {
    return <SafeSetState {...props} forwardedRef={ref} />;
  }

  forwardRef.displayName = `forward-ref-${name}`;

  return React.forwardRef(forwardRef);
};
