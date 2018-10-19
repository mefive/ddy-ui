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
    page: PropTypes.number,
    onPageChange: PropTypes.func,
    totalPages: PropTypes.number,
    rowsPerPage: PropTypes.number,
  };

  static defaultProps = {
    caption: null,
    className: null,
    columns: [],
    dataSource: null,
    rowKey: null,
    page: 1,
    onPageChange: () => {},
    totalPages: null,
    rowsPerPage: null,
  };

  getPagedDataSource(dataSource) {
    const { page, totalPages, rowsPerPage } = this.props;

    if (totalPages != null) {
      return dataSource;
    }

    const start = page * rowsPerPage;

    return dataSource.slice(start, start + rowsPerPage);
  }

  render() {
    const { dataSource, columns, rowKey } = this.props;

    return (
      <React.Fragment>
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
      </React.Fragment>
    );
  }
}

export default Table;
