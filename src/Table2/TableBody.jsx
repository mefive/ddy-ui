import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { flattenWith } from '../utils/array';

class TableBody extends React.PureComponent {
  static propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.any,
      render: PropTypes.func,
      wrapperRender: PropTypes.func,
      align: PropTypes.string,
      noWrap: PropTypes.bool,
    })).isRequired,
    dataSource: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]),
    rowKey: PropTypes.string,
    noWrap: PropTypes.bool,
  };

  static defaultProps = {
    dataSource: null,
    rowKey: null,
    noWrap: false,
  };

  getLeafColumns() {
    const { columns } = this.props;

    const flattenColumns = flattenWith(columns, (col, parentCol, level) => ({
      level,
      ...col,
    }), 'children');

    return flattenColumns.filter(col => col.children == null);
  }

  renderCell(col, row, rowIndex) {
    const cell = col.render == null
      ? row[col.key]
      : col.render(row, rowIndex);

    if (col.wrapperRender != null) {
      const wrapper = col.wrapperRender(row, rowIndex);

      return wrapper && React.cloneElement(
        wrapper,
        null,
        cell,
      );
    }

    return (
      <td
        key={col.key}
        style={{
          textAlign: col.align,
        }}
        className={classNames({ 'text-nowrap': this.props.noWrap || col.noWrap })}
      >
        {cell}
      </td>
    );
  }

  render() {
    const { dataSource, rowKey } = this.props;
    const columns = this.getLeafColumns();

    if (dataSource == null) {
      return null;
    }

    return (
      <tbody>
        {dataSource.map((row, index) => (
          <tr key={rowKey === null ? index : row[rowKey]}>
            {columns.map(col => this.renderCell(col, row, index))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
