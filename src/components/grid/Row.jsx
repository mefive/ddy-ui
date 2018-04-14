import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  className: PropTypes.string,
  gutter: PropTypes.number,
  children: PropTypes.node,
};

const defaultProps = {
  className: null,
  gutter: null,
  children: null,
};

class Row extends React.PureComponent {
  render() {
    const { gutter } = this.props;

    return (
      <div
        className={classNames('row', this.props.className)}
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
