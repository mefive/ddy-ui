import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import query from 'dom-helpers/query';
import scrollLeft from 'dom-helpers/query/scrollLeft';
import throttle from 'lodash/throttle';

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
    dataSource: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]),
    rowKey: PropTypes.string,
    pagination: PropTypes.shape({
      page: PropTypes.number,
      enablePagination: PropTypes.bool,
      onPageChange: PropTypes.func,
      totalPages: PropTypes.number,
      rowsPerPage: PropTypes.number,
    }),
    loading: PropTypes.bool,
    height: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
  };

  static defaultProps = {
    caption: null,
    className: null,
    columns: [],
    dataSource: null,
    rowKey: null,
    pagination: null,
    loading: false,
    height: null,
  };

  constructor(props) {
    super(props);

    this.table = React.createRef();
    this.tableHeaderFixed = React.createRef();

    this.state = {
      columnsWidth: {},
    };
  }

  componentDidMount() {
    if (this.props.height != null) {
      this.syncColumnsWidth();
      window.addEventListener('resize', this.syncColumnsWidth);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.syncColumnsWidth);
  }

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

  syncColumnsWidth = throttle(() => {
    let columnsWidth = {};

    const columns = this.table.current.querySelectorAll('thead th');

    [].forEach.call(columns, (column) => {
      const key = column.getAttribute('data-key');
      const width = query.width(column);

      columnsWidth = {
        ...columnsWidth,
        [key]: width,
      };
    });

    this.setState({ columnsWidth });
  });

  syncScroll = () => {
    const tableScrollLeft = scrollLeft(this.table.current);
    scrollLeft(this.tableHeaderFixed.current, tableScrollLeft);
  };

  render() {
    const {
      columns, pagination, loading, height,
    } = this.props;
    let dataSource = this.props.dataSource || [];

    if (pagination != null) {
      dataSource = this.getPagedDataSource(dataSource);
    }

    return (
      <div
        className={classNames(this.props.className, 'table-container')}
      >
        <div
          className="table-responsive"
          style={{ height: height === 'flex' ? null : height }}
        >
          {height != null && (
            <div className="table-header-fixed" ref={this.tableHeaderFixed}>
              <table className="table">
                <TableHeader columns={columns} columnsWidth={this.state.columnsWidth} fixed />
              </table>
            </div>
          )}

          <div className="table-body-scrollable" ref={this.table} onScroll={height && this.syncScroll}>
            <table className="table">
              {this.props.caption != null && (
                <caption>{this.props.caption}</caption>
              )}

              <TableHeader columns={columns} />

              <TableBody columns={columns} dataSource={dataSource} />
            </table>
          </div>

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
      </div>
    );
  }
}

export default Table;
