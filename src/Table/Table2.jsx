import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import query from 'dom-helpers/query';
import scrollLeft from 'dom-helpers/query/scrollLeft';
import scrollTop from 'dom-helpers/query/scrollTop';
import classHelper from 'dom-helpers/class';
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
      align: PropTypes.string,
      noWrap: PropTypes.bool,
      fixed: PropTypes.bool,
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
    noWrap: PropTypes.bool,
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
    noWrap: false,
  };

  constructor(props) {
    super(props);

    this.table = React.createRef();
    this.tableHeaderFixed = React.createRef();
    this.tableContainerColumnFixed = React.createRef();
    this.tableColumnFixed = React.createRef();

    this.state = {
      columns: [],
      columnsWidth: {},
    };
  }

  componentWillMount() {
    this.updateColumns();
  }

  componentDidMount() {
    if (this.props.height != null) {
      this.updateColumnsWidth();
      window.addEventListener('resize', this.updateColumnsWidth);
    }
  }

  componentWillReceiveProps({ columns, height }) {
    if (columns !== this.props.columns) {
      this.updateColumns(columns);
    }
  }

  componentDidUpdate({ height }) {
    if (height == null && this.props.height != null) {
      this.updateColumnsWidth();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateColumnsWidth);
  }

  onScroll = () => {
    const tableHeaderFixed = this.tableHeaderFixed.current;
    const tableContainerColumnFixed = this.tableContainerColumnFixed.current;
    const tableColumnFixed = this.tableColumnFixed.current;

    const tableScrollLeft = scrollLeft(this.table.current);
    const tableScrollTop = scrollTop(this.table.current);

    if (tableHeaderFixed) {
      scrollLeft(tableHeaderFixed, tableScrollLeft);
    }

    if (tableColumnFixed) {
      scrollTop(tableColumnFixed, tableScrollTop);

      if (tableScrollLeft > 0) {
        classHelper.addClass(tableContainerColumnFixed, 'shadow');
      } else {
        classHelper.removeClass(tableContainerColumnFixed, 'shadow');
      }
    }
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

  updateColumns = (columns = this.props.columns) => {
    const fixed = [];
    const rest = [];

    columns.forEach((col) => {
      if (col.fixed) {
        fixed.push(col);
      } else {
        rest.push(col);
      }
    });

    this.setState({ columns: [...fixed, ...rest] });
  };

  updateColumnsWidth = throttle(() => {
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

  render() {
    const {
      pagination, loading, height, noWrap,
    } = this.props;

    const { columns } = this.state;

    let dataSource = this.props.dataSource || [];

    if (pagination != null) {
      dataSource = this.getPagedDataSource(dataSource);
    }

    const columnsFixed = columns.filter(({ fixed }) => fixed);

    return (
      <div
        className={classNames(
          this.props.className,
          'table-container',
          { loading },
        )}
      >
        <div
          className="table-responsive"
          style={{ height: height === 'flex' ? null : height }}
        >
          {height != null && (
            <div className="table-header-fixed" ref={this.tableHeaderFixed}>
              <table className="table">
                <TableHeader columns={columns} columnsWidth={this.state.columnsWidth} />
              </table>
            </div>
          )}

          <div className="table-body-scrollable" ref={this.table} onScroll={height && this.onScroll}>
            <table className="table">
              {this.props.caption != null && (
                <caption>{this.props.caption}</caption>
              )}

              <TableHeader columns={columns} noWrap={noWrap} />

              <TableBody columns={columns} dataSource={dataSource} noWrap={noWrap} />
            </table>
          </div>

          {columnsFixed.length > 0 && (
            <div className="table-column-fixed" ref={this.tableContainerColumnFixed}>
              {height != null && (
                <div className="table-header-fixed">
                  <table className="table">
                    <TableHeader columns={columnsFixed} columnsWidth={this.state.columnsWidth} />
                  </table>
                </div>
              )}

              <div className="table-body-scrollable" ref={this.tableColumnFixed}>
                <table className="table">
                  <TableHeader columns={columnsFixed} noWrap={noWrap} />

                  <TableBody columns={columnsFixed} dataSource={dataSource} noWrap={noWrap} />
                </table>
              </div>
            </div>
          )}
        </div>

        {loading && (
          <Loading>加载中...</Loading>
        )}

        {!loading && dataSource.length === 0 && (
          <Loading>
            没有数据
          </Loading>
        )}

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
