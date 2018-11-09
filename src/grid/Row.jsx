import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  className: PropTypes.string,
  gutter: PropTypes.number,
  children: PropTypes.node,
  style: PropTypes.shape({}),
};

const defaultProps = {
  className: null,
  gutter: null,
  children: null,
  style: {},
};

class Row extends React.PureComponent {
  render() {
    const { gutter } = this.props;

    return (
      <div
        className={classNames('row', this.props.className)}
        style={{
          marginLeft: gutter == null ? 0 : gutter / -2,
          marginRight: gutter == null ? 0 : gutter / -2,
          ...this.props.style,
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

Row.propTypes = propTypes;
Row.defaultProps = defaultProps;

export default Row;
