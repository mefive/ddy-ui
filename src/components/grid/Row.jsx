import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  gutter: PropTypes.number,
  children: PropTypes.node,
};

const defaultProps = {
  gutter: null,
  children: null,
};

class Row extends React.PureComponent {
  render() {
    const { gutter } = this.props;

    return (
      <div
        className="row"
        style={{
          marginLeft: gutter == null ? null : gutter / -2,
          marginRight: gutter == null ? null : gutter / -2,
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
