import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  column: PropTypes.shape({
    align: PropTypes.string,
    key: PropTypes.any,
  }).isRequired,
  record: PropTypes.shape({}).isRequired,
  rowIndex: PropTypes.number.isRequired,
};

const defaultProps = {

};

class TableCell extends React.PureComponent {
  render() {
    const { column, record, rowIndex } = this.props;
    const { getProps = () => {} } = column;

    return (
      <td
        className={classNames({ [`text-${column.align}`]: !!column.align })}
        data-key={column.key}
        style={{
          whiteSpace: column.noWrap ? 'noWrap' : null,
        }}
        {...getProps(record, rowIndex)}
      >
        {column.render != null
          ? column.render(record, rowIndex)
          : record[column.key]
        }
      </td>
    );
  }
}

TableCell.propTypes = propTypes;
TableCell.defaultProps = defaultProps;

export default TableCell;
