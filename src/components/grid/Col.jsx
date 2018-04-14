import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import pick from 'lodash/pick';

const layoutTypes = PropTypes.shape({
  span: PropTypes.number,
  offset: PropTypes.number,
});

const propTypes = {
  /* eslint-disable */
  xs: layoutTypes,
  sm: layoutTypes,
  md: layoutTypes,
  lg: layoutTypes,
  xl: layoutTypes,
  xxl: layoutTypes,
  /* eslint-enable */

  className: PropTypes.string,
  gutter: PropTypes.number,
  children: PropTypes.node,
};

const defaultProps = {
  xs: null,
  sm: null,
  md: null,
  lg: null,
  xl: null,
  xxl: null,

  className: null,
  gutter: null,
  children: null,
};

class Col extends React.PureComponent {
  getBreakPointClassNames() {
    const breakPoints = pick(this.props, ['xs', 'sm', 'md', 'lg', 'xl', 'xxl']);
    const classes = {};

    Object.keys(breakPoints).forEach((key) => {
      const breakPoint = breakPoints[key];

      if (breakPoint != null) {
        classes[`col-${key}-${breakPoint.span}`] = breakPoint.span != null;
        classes[`col-${key}-offset-${breakPoint.offset}`] = breakPoint.offset != null;
      }
    });

    return classNames(classes);
  }

  render() {
    const { gutter } = this.props;

    return (
      <div
        className={classNames(
          this.props.className,
          this.getBreakPointClassNames(),
        )}
        style={{
          paddingLeft: gutter == null ? null : gutter / 2,
          paddingRight: gutter == null ? null : gutter / 2,
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

Col.propTypes = propTypes;
Col.defaultProps = defaultProps;

export default Col;
