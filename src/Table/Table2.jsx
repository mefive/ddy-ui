import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Loading from '../Loading';
import TableHeader from './TableHeader2';
import TableBody from './TableBody2';
import Pagination from '../Pagination';

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
    pagination: PropTypes.shape({
      page: PropTypes.number,
      enablePagination: PropTypes.bool,
      onPageChange: PropTypes.func,
      totalPages: PropTypes.number,
      rowsPerPage: PropTypes.number,
    }),
    loading: PropTypes.bool,
  };

  static defaultProps = {
    caption: null,
    className: null,
    columns: [],
    dataSource: null,
    rowKey: null,
    pagination: null,
    loading: false,
  };

  getPagedDataSource(dataSource) {
    if (this.props.pagination == null) {
      return dataSource;
    }

    const { page, totalPages, rowsPerPage } = this.props.pagination;

    if (totalPages != null) {
      return dataSource;
    }

    const start = (page - 1) * rowsPerPage;

    return dataSource.slice(start, start + rowsPerPage);
  }

  render() {
    const {
      columns, rowKey, pagination, loading,
    } = this.props;
    let dataSource = this.props.dataSource || [];

    if (pagination != null) {
      dataSource = this.getPagedDataSource(dataSource);
    }

    return (
      <React.Fragment>
        <div
          className={classNames(
            'table-container table-responsive',
            this.props.className,
            { loading },
          )}
        >
          <table className="table">
            {this.props.caption != null && (
              <caption>{this.props.caption}</caption>
            )}

            <TableHeader columns={columns} />

            <TableBody columns={columns} dataSource={dataSource} />
          </table>

          {loading && (
            <Loading>加载中...</Loading>
          )}

          {!loading && dataSource.length === 0 && (
            <Loading>
              没有数据
            </Loading>
          )}
        </div>

        {pagination != null && (
          <Pagination
            {...pagination}
            total={(this.props.dataSource || []).length}
          />
        )}
      </React.Fragment>
    );
  }
}

export default Table;
