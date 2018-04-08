import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isFunction from 'lodash/isFunction';
import debounce from 'lodash/debounce';
import sortBy from 'lodash/sortBy';

import './style/index.scss';

import TableHeader from './TableHeader';
import TableBody from './TableBody';
import Pagination from '../Pagination/Pagination';
import Portal from '../Portal';

const ASC = 'asc';
const DESC = 'desc';

const propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    title: PropTypes.string,
    sortKey: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    noWrap: PropTypes.bool,
    filterable: PropTypes.bool,
  })),
  dataSource: PropTypes.arrayOf(PropTypes.object),
  expandedRowRender: PropTypes.func,
  rowSelection: PropTypes.shape({
    onChange: PropTypes.func,
    selectedRowKeys: PropTypes.array,
  }),
  rowKey: PropTypes.string,
  defaultSort: PropTypes.shape({
    key: PropTypes.string,
    direction: PropTypes.oneOf([ASC, DESC]),
  }),
  fixColumnCount: PropTypes.number,
  enablePagination: PropTypes.bool,
  page: PropTypes.number,
  totalPages: PropTypes.number,
  rowsPerPage: PropTypes.number,
  onPageChange: PropTypes.func,
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  fixHeader: PropTypes.bool,
  noWrap: PropTypes.bool,
  getPopoverContainer: PropTypes.func,
  fixedHeaderContainer: PropTypes.instanceOf(Node),
  onScroll: PropTypes.func,
  onRowClick: PropTypes.func,
  onRowExpandChange: PropTypes.func,
  // depreciated, will change name to "getRowClassName"
  rowClassName: PropTypes.func,
  getColumnClassName: PropTypes.func,
  renderLoading: PropTypes.func,
  className: PropTypes.string,
  noDataRender: PropTypes.func,
  loading: PropTypes.bool,
  filters: PropTypes.arrayOf(PropTypes.shape({})),
  onFilterChange: PropTypes.func,
  onRowsChange: PropTypes.func,
};

const defaultProps = {
  dataSource: null,
  rowClassName: () => null,
  getColumnClassName: null,
  expandedRowRender: null,
  onRowClick: () => {},
  onRowExpandChange: () => {},
  onPageChange: () => null,
  getPopoverContainer: null,
  height: 0,
  columns: [],
  fixColumnCount: 0,
  enablePagination: false,
  page: 0,
  rowsPerPage: 30,
  fixHeader: false,
  noWrap: false,
  onScroll: () => {},
  renderLoading: null,
  rowKey: null,
  defaultSort: null,
  rowSelection: null,
  totalPages: null,
  className: null,
  noDataRender: null,
  loading: false,
  fixedHeaderContainer: null,
  onRowsChange: () => {},
  filters: null,
  onFilterChange: () => {},
};

class Table extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columnsWidth: {},
      rowsHeight: {},
      rowsState: {},
      headerHeight: 0,
      showFixedTable: false,
      hasVerticalScrollbar: false,
      hasHorizontalScrollbar: false,
      filters: [],
    };

    if (this.props.defaultSort) {
      this.state.sort = { ...this.props.defaultSort };
    }

    this.state.dataSource = this.getDataSource();

    this.onScroll = debounce(this.onScroll.bind(this), 1);
    this.onResize = debounce(this.onResize.bind(this));
    this.getFilterItems = this.getFilterItems.bind(this);

    this.headerElementsSet = new Set();
    this.scrollLeft = 0;
    this.scrollTop = 0;
  }

  componentDidMount() {
    this.hasMounted = true;

    if (this.props.fixHeader || this.props.fixColumnCount || this.props.height === 'auto') {
      window.addEventListener('resize', this.onResize);
      setTimeout(this.onResize);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataSource !== this.props.dataSource) {
      let filters;

      if (nextProps.filters == null) {
        filters = [];
        this.setState({ filters });
      } else {
        ({ filters } = nextProps);
      }

      const dataSource = this.getDataSource(nextProps.dataSource, this.state.sort, filters);

      this.setState({ dataSource });
    }
  }

  componentDidUpdate({ page, fixedHeaderContainer }, prevState) {
    if (this.props.fixHeader || this.props.fixColumnCount || this.props.height === 'auto') {
      if (prevState.dataSource !== this.state.dataSource
        || page !== this.props.page
      ) {
        this.tableBodyContainer.scrollLeft = 0;
        this.onResize();
        this.onScroll();
      }

      if (fixedHeaderContainer !== this.props.fixedHeaderContainer) {
        this.onScroll();
      }
    }

    if (prevState.dataSource !== this.state.dataSource) {
      this.props.onRowsChange(this.state.dataSource);
    }
  }

  componentWillUnmount() {
    this.hasMounted = false;

    if (this.props.fixHeader || this.props.fixColumnCount) {
      window.removeEventListener('resize', this.onResize);
    }
  }

  onResize() {
    if (!this.hasMounted) {
      return;
    }

    const { tableBodyContainer } = this;

    if (tableBodyContainer) {
      this.setState({
        hasVerticalScrollbar:
        tableBodyContainer.scrollHeight > tableBodyContainer.clientHeight,
      });

      this.setState({
        hasHorizontalScrollbar:
        tableBodyContainer.scrollWidth > tableBodyContainer.clientWidth,
      });

      this.syncWidth();
      this.syncHeight();
    }
  }

  onScroll() {
    let { scrollTop, scrollLeft } = this.tableBodyContainer;

    if (this.props.fixColumnCount) {
      if (scrollLeft === 0) {
        this.setState({ showFixedTable: false });
      } else {
        this.setState({ showFixedTable: true });
      }
    }

    scrollTop = Math.floor(scrollTop);
    scrollLeft = Math.floor(scrollLeft);

    this.props.onScroll(
      this.scrollLeft === scrollLeft ? null : scrollLeft,
      this.scrollTop === scrollTop ? null : scrollTop,
    );

    if (this.scrollLeft !== scrollLeft) {
      this.closeFilter();
    }

    this.scrollTop = scrollTop;
    this.scrollLeft = scrollLeft;

    if (this.props.fixHeader) {
      this.tableHeaderContainer.scrollLeft = scrollLeft;
      if (this.outerHeaderContainer != null) {
        this.outerHeaderContainer.scrollLeft = scrollLeft;
      }
    }

    if (this.props.fixColumnCount && this.fixedTableBodyContainer) {
      this.fixedTableBodyContainer.scrollTop = scrollTop;
    }

    if (this.flowedTableHeader) {
      this.flowedTableHeader.filterPopoverPlace();
    }
  }

  getRowKey(record, recordIndex) {
    const { rowKey } = this.props;

    return rowKey ? record[rowKey] : recordIndex;
  }

  getOnePageDataSource(dataSource = this.state.dataSource) {
    if (dataSource == null) {
      return null;
    }

    let onePageDataSource = dataSource;

    if (this.props.enablePagination) {
      if (this.props.rowsPerPage && this.props.totalPages == null) {
        const start = (this.props.page - 1) * this.props.rowsPerPage;

        onePageDataSource = onePageDataSource.slice(
          start,
          start + this.props.rowsPerPage,
        );
      }
    }

    return onePageDataSource;
  }

  getDataSource(
    dataSource = this.props.dataSource,
    sort = this.state.sort,
    filters = this.getFilters(),
  ) {
    if (dataSource == null) {
      return null;
    }

    let newDataSource = [...dataSource];

    if (filters.length > 0) {
      newDataSource = dataSource.filter(row =>
        filters.every(({ key, values }) =>
          row[key] === undefined || values.indexOf(row[key]) !== -1));
    }

    if (sort && sort.key != null) {
      newDataSource = sortBy(newDataSource, [`${sort.key}`]);

      if (sort.direction === Table.DESC) {
        newDataSource = newDataSource.reverse();
      }
    }

    return newDataSource;
  }

  getFilters() {
    if (this.props.filters != null) {
      return this.props.filters;
    }

    return this.state.filters;
  }

  setFilters(filters) {
    if (this.props.filters != null) {
      this.props.onFilterChange(filters);
    } else {
      this.setState({ filters });
    }
  }

  getFilterItems(filterKey, isActive = false) {
    if (this.props.dataSource == null || this.state.dataSource == null) {
      return [];
    }

    if (!isActive) {
      return Array.from(new Set(this.state.dataSource.map(d => d[filterKey])));
    }

    const items = Array.from(new Set(this.state.dataSource.map(d => d[filterKey])));

    return items;
  }

  closeFilter() {
    this.headerElementsSet.forEach((header) => {
      if (header) {
        header.closeFilter();
      }
    });
  }

  syncWidth() {
    if (!this.props.fixHeader && this.props.height !== 'auto') {
      return;
    }

    const columnsWidth = {};

    // eslint-disable-next-line
    const firstRow = ReactDOM.findDOMNode(this.tableBody)
      .querySelector('tr');

    if (firstRow) {
      [].forEach.call(
        firstRow.querySelectorAll('td'),
        (td, index) => { columnsWidth[`${index}`] = Math.floor(td.offsetWidth); },
      );

      this.setState(
        { columnsWidth },
        () => {
          try {
            let headerHeight = this.tableHeaderContainer.offsetHeight;

            if (!headerHeight) {
              headerHeight = this.tableHeaderContainer.thead.offsetHeight;
            }

            this.setState({ headerHeight });
          } catch (e) {
            console.log(e);
          }
        },
      );
    }
  }

  syncHeight() {
    const rowsHeight = {};

    // eslint-disable-next-line
    const rows = ReactDOM.findDOMNode(this.tableBody)
      .querySelectorAll('tbody tr');

    if (rows) {
      [].forEach.call(rows, (tr, index) => { rowsHeight[`${index}`] = tr.offsetHeight; });

      this.setState({ rowsHeight });
    }
  }

  renderHeader(columns, isFixedTable = false, isFixedHeader = false) {
    return (
      <TableHeader
        columns={columns}
        noWrap={this.props.noWrap}
        columnsWidth={(this.props.fixHeader && isFixedHeader) ? this.state.columnsWidth : undefined}
        sort={this.state.sort}
        filters={this.getFilters()}
        getFilterItems={this.getFilterItems}
        getColumnClassName={this.props.getColumnClassName}
        onFiltersChange={(filters) => {
          if (this.props.page !== 1) {
            this.props.onPageChange(1);
          }
          this.setFilters(filters);
          this.setState({
            dataSource: this.getDataSource(this.props.dataSource, this.state.sort, filters),
          });
        }}
        onSortChange={sort =>
          this.setState({ sort, dataSource: this.getDataSource(this.props.dataSource, sort) })}
        visible={!this.props.fixHeader || isFixedHeader}
        height={isFixedTable ? this.state.headerHeight : null}
        ref={(el) => {
          if (this.props.height === 'auto' && !isFixedTable && !this.props.fixHeader) {
            this.tableHeaderContainer = el;
          }

          if (!isFixedTable) {
            this.flowedTableHeader = el;
          }

          this.headerElementsSet.add(el);
        }}
        getPopoverContainer={this.props.getPopoverContainer}
      />
    );
  }

  renderTable(isFixedTable, dataSource) {
    const { fixHeader, fixColumnCount } = this.props;

    const columns = (isFixedTable && fixColumnCount)
      ? this.props.columns.slice(0, fixColumnCount)
      : [...this.props.columns];

    if (this.props.rowSelection) {
      columns.unshift({
        key: 'row-select',
        renderColumn: () => dataSource && (
          <input
            type="checkbox"
            checked={(() =>
                dataSource != null && dataSource.length > 0
                && dataSource.every((record, recordIndex) => {
                  const key = this.getRowKey(record, recordIndex);
                  return this.props.rowSelection.selectedRowKeys.indexOf(key) !== -1;
                })
            )()}
            onChange={(e) => {
              const { checked } = e.target;

              if (checked) {
                this.props.rowSelection.onChange(dataSource.map((record, recordIndex) =>
                  this.getRowKey(record, recordIndex)));
              } else {
                this.props.rowSelection.onChange([]);
              }
            }}
          />
        ),
        render: (record, recordIndex) => {
          const key = this.getRowKey(record, recordIndex);

          return (
            <input
              type="checkbox"
              checked={this.props.rowSelection.selectedRowKeys
              && this.props.rowSelection.selectedRowKeys.indexOf(key) !== -1
              }
              onChange={(e) => {
                const { checked } = e.target;

                const selectedRowKeysSet
                  = new Set(this.props.rowSelection.selectedRowKeys);

                if (checked) {
                  selectedRowKeysSet.add(key);
                } else {
                  selectedRowKeysSet.delete(key);
                }

                this.props.rowSelection.onChange(Array.from(selectedRowKeysSet));
              }}
            />
          );
        },
      });
    }

    if (!isFixedTable && this.props.expandedRowRender) {
      columns.push({
        key: 'detail-trigger',
        renderColumn: () => null,
        width: 50,
        render: (record, recordIndex) => {
          const rowsState = { ...this.state.rowsState };
          const rowState = rowsState[`${recordIndex}`];

          return (
            <div
              className="detail-trigger-cell"
              aria-hidden
              onClick={() => {
                let expanded = false;

                if (rowState == null) {
                  expanded = true;
                  rowsState[`${recordIndex}`] = { expanded };
                } else {
                  rowState.expanded = !rowState.expanded;
                  ({ expanded } = rowsState);
                }

                this.setState({ rowsState });

                this.props.onRowExpandChange(expanded, record);
              }}
            >
              {this.props.expandedRowRender(record) && (
                <i
                  className={classNames(
                    'icon',
                    { 'icon-plus': !(rowState && rowState.expanded) },
                    { 'icon-minus': rowState && rowState.expanded },
                  )}
                />
              )}
            </div>
          );
        },
      });
    }

    return (
      <div
        className={isFixedTable ? 'table-column-fixed' : 'table-column-flow'}
        style={{
          width: isFixedTable && this.props.height === 'auto'
            ? Object.keys(this.state.columnsWidth).reduce(
              (prev, current, index) => {
                const fixedCount = this.props.rowSelection
                  ? this.props.fixColumnCount + 1
                  : this.props.fixColumnCount;

                if (index < fixedCount) {
                  return prev + this.state.columnsWidth[`${current}`];
                }

                return prev;
              },
              0,
            )
            : null,
          paddingTop: (this.props.fixHeader && this.props.height !== 'auto') ? this.state.headerHeight : null,
        }}
      >
        {fixHeader && (() => {
          const fixHeaderElement = isOutter => (
            <div
              className="table-header"
              style={{ overflowX: this.state.dataSource && this.state.dataSource.length === 0 ? 'auto' : null }}
              ref={(el) => {
                if (!isFixedTable) {
                  if (isOutter) {
                    this.outerHeaderContainer = el;
                  } else {
                    this.tableHeaderContainer = el;
                  }
                }
              }}
            >
              <table cellPadding="0" cellSpacing="0">
                {this.renderHeader(columns, isFixedTable, true)}
              </table>
            </div>
          );

          return (
            <div>
              {fixHeaderElement(false)}

              {this.props.fixedHeaderContainer && (
                <Portal getContainer={() => this.props.fixedHeaderContainer}>
                  {fixHeaderElement(true)}
                </Portal>
              )}
            </div>
          );
        })()}

        <div
          className="table-body"
          style={{
            maxHeight: (this.props.height && this.props.height !== 'auto') ? this.props.height : null,
            top: (this.props.fixHeader && this.props.height === 'auto') ? this.state.headerHeight : null,
          }}
          onScroll={this.onScroll}
          ref={(el) => {
            if (!isFixedTable) {
              this.tableBodyContainer = el;
            } else {
              this.fixedTableBodyContainer = el;
            }
          }}
        >
          <table cellPadding="0" cellSpacing="0">
            {this.renderHeader(columns, isFixedTable)}

            <TableBody
              columns={columns}
              dataSource={dataSource}
              expandedRowRender={this.props.expandedRowRender}
              rowKey={this.props.rowKey}
              rowClassName={this.props.rowClassName}
              onRowClick={this.props.onRowClick}
              rowsState={this.state.rowsState}
              rowsHeight={isFixedTable ? this.state.rowsHeight : null}
              ref={(el) => {
                if (!isFixedTable) {
                  this.tableBody = el;
                }
              }}
            />
          </table>
        </div>
      </div>
    );
  }

  renderNoData() {
    if (Object.keys(this.getFilters()).length > 0) {
      return (
        <div className="default-no-data">
          该筛选条件下无匹配数据
        </div>
      );
    }

    if (isFunction(this.props.noDataRender)) {
      return this.props.noDataRender();
    }

    return (
      <div className="default-no-data">
        没有数据
      </div>
    );
  }

  renderPager() {
    const dataSourceLength = this.state.dataSource ? this.state.dataSource.length : 0;

    const hasPager = this.props.enablePagination
      && (this.props.rowsPerPage == null || dataSourceLength > this.props.rowsPerPage);

    if (!hasPager) {
      return null;
    }

    return (
      <Pagination
        className="table-pagination"
        total={dataSourceLength}
        page={this.props.page}
        totalPages={this.props.totalPages}
        rowsPerPage={this.props.rowsPerPage}
        onChange={this.props.onPageChange}
      />
    );
  }

  render() {
    const dataSourceLength = this.state.dataSource ? this.state.dataSource.length : 0;

    const hasPager = this.props.enablePagination
      && (this.props.rowsPerPage == null || dataSourceLength > this.props.rowsPerPage);

    return (
      <div
        className={classNames(
          'table',
          { [this.props.className]: !!this.props.className },
          { 'has-horizontal-scrollbar': this.state.hasHorizontalScrollbar },
          { 'has-vertical-scrollbar': this.state.hasVerticalScrollbar },
          { 'has-pager': hasPager },
          { flexible: this.props.height === 'auto' },
          { 'fix-header': this.props.fixHeader },
        )}
      >
        <div
          className="table-wrapper"
        >
          {this.renderTable(false, this.props.loading ? null : this.getOnePageDataSource())}

          {!!this.props.fixColumnCount
          && this.state.showFixedTable
          && this.renderTable(true, this.props.loading ? null : this.getOnePageDataSource())}

          {(this.props.loading || this.props.dataSource == null) && (
            <div className="loading">
              {this.props.renderLoading !== null
                ? this.props.renderLoading()
                : (
                  <div className="default-loading">
                    加载中...
                  </div>
                )
              }
            </div>
          )}

          {!this.props.loading
          && this.state.dataSource != null
          && this.state.dataSource.length === 0
          && (
            <div className="no-data">
              {this.renderNoData()}
            </div>
          )}
        </div>

        <div className="pager-container">
          {this.renderPager()}
        </div>
      </div>
    );
  }
}

Table.propTypes = propTypes;
Table.defaultProps = defaultProps;
Table.ASC = ASC;
Table.DESC = DESC;

export default Table;
