import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './style2.scss';

class Table extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    caption: PropTypes.string,
    columns: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      key: PropTypes.any,
      render: PropTypes.func,
      width: PropTypes.number,
    })),
    dataSource: PropTypes.arrayOf(PropTypes.object),
    rowKey: PropTypes.string,
  };

  static defaultProps = {
    caption: null,
    className: null,
    columns: [],
    dataSource: null,
    rowKey: null,
  };

  render() {
    const { dataSource, columns, rowKey } = this.props;

    return (
      <div
        className={classNames(
          'table-container table-responsive',
          this.props.className,
        )}
      >
        <table className="table">
          <caption>{this.props.caption}</caption>
          <thead>
            <tr>
              {columns.map(col => (
                <th
                  key={col.key}
                  scope="col"
                  width={col.width}
                >
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {dataSource != null && dataSource.map((row, index) => (
              <tr key={rowKey != null ? row[rowKey] : index}>
                {columns.map(col => (
                  <td key={col.key}>
                    {col.render != null ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;
