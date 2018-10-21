import React from 'react';
import PropTypes from 'prop-types';
import { flattenWith } from '../utils/array';

class TableBody extends React.PureComponent {
  static propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.any,
      render: PropTypes.func,
    })).isRequired,
    dataSource: PropTypes.arrayOf(PropTypes.object),
    rowKey: PropTypes.string,
  };

  static defaultProps = {
    dataSource: null,
    rowKey: null,
  };

  getLeafColumns() {
    const { columns } = this.props;

    const flattenColumns = flattenWith(columns, (col, parentCol, level) => ({
      level,
      ...col,
    }), 'children');

    return flattenColumns.filter(col => col.children == null);
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
            {columns.map(col => (
              <td key={col.key}>
                {col.render == null
                  ? row[col.key]
                  : col.render(row, index)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
