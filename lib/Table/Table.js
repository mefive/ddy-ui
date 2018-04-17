'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _debounce = require('lodash/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _sortBy = require('lodash/sortBy');

var _sortBy2 = _interopRequireDefault(_sortBy);

require('./style/index.scss');

var _TableHeader = require('./TableHeader');

var _TableHeader2 = _interopRequireDefault(_TableHeader);

var _TableBody = require('./TableBody');

var _TableBody2 = _interopRequireDefault(_TableBody);

var _Pagination = require('../Pagination/Pagination');

var _Pagination2 = _interopRequireDefault(_Pagination);

var _Portal = require('../Portal');

var _Portal2 = _interopRequireDefault(_Portal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ASC = 'asc';
var DESC = 'desc';

var propTypes = {
  columns: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    key: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
    title: _propTypes2.default.string,
    sortKey: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
    noWrap: _propTypes2.default.bool,
    filterable: _propTypes2.default.bool
  })),
  dataSource: _propTypes2.default.arrayOf(_propTypes2.default.object),
  expandedRowRender: _propTypes2.default.func,
  rowSelection: _propTypes2.default.shape({
    onChange: _propTypes2.default.func,
    selectedRowKeys: _propTypes2.default.array
  }),
  rowKey: _propTypes2.default.string,
  defaultSort: _propTypes2.default.shape({
    key: _propTypes2.default.string,
    direction: _propTypes2.default.oneOf([ASC, DESC])
  }),
  fixColumnCount: _propTypes2.default.number,
  enablePagination: _propTypes2.default.bool,
  page: _propTypes2.default.number,
  totalPages: _propTypes2.default.number,
  rowsPerPage: _propTypes2.default.number,
  onPageChange: _propTypes2.default.func,
  height: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
  fixHeader: _propTypes2.default.bool,
  noWrap: _propTypes2.default.bool,
  getPopoverContainer: _propTypes2.default.func,
  fixedHeaderContainer: _propTypes2.default.instanceOf(Node),
  onScroll: _propTypes2.default.func,
  onRowClick: _propTypes2.default.func,
  onRowExpandChange: _propTypes2.default.func,
  // depreciated, will change name to "getRowClassName"
  rowClassName: _propTypes2.default.func,
  getColumnClassName: _propTypes2.default.func,
  renderLoading: _propTypes2.default.func,
  className: _propTypes2.default.string,
  noDataRender: _propTypes2.default.func,
  loading: _propTypes2.default.bool,
  filters: _propTypes2.default.arrayOf(_propTypes2.default.shape({})),
  onFilterChange: _propTypes2.default.func,
  onRowsChange: _propTypes2.default.func
};

var defaultProps = {
  dataSource: null,
  rowClassName: function rowClassName() {
    return null;
  },
  getColumnClassName: null,
  expandedRowRender: null,
  onRowClick: function onRowClick() {},
  onRowExpandChange: function onRowExpandChange() {},
  onPageChange: function onPageChange() {
    return null;
  },
  getPopoverContainer: null,
  height: 0,
  columns: [],
  fixColumnCount: 0,
  enablePagination: false,
  page: 0,
  rowsPerPage: 30,
  fixHeader: false,
  noWrap: false,
  onScroll: function onScroll() {},
  renderLoading: null,
  rowKey: null,
  defaultSort: null,
  rowSelection: null,
  totalPages: null,
  className: null,
  noDataRender: null,
  loading: false,
  fixedHeaderContainer: null,
  onRowsChange: function onRowsChange() {},
  filters: null,
  onFilterChange: function onFilterChange() {}
};

var Table = function (_React$PureComponent) {
  (0, _inherits3.default)(Table, _React$PureComponent);

  function Table(props) {
    (0, _classCallCheck3.default)(this, Table);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Table.__proto__ || (0, _getPrototypeOf2.default)(Table)).call(this, props));

    _this.state = {
      columnsWidth: {},
      rowsHeight: {},
      rowsState: {},
      headerHeight: 0,
      showFixedTable: false,
      hasVerticalScrollbar: false,
      hasHorizontalScrollbar: false,
      filters: []
    };

    if (_this.props.defaultSort) {
      _this.state.sort = (0, _extends3.default)({}, _this.props.defaultSort);
    }

    _this.state.dataSource = _this.getDataSource();

    _this.onScroll = (0, _debounce2.default)(_this.onScroll.bind(_this), 1);
    _this.onResize = (0, _debounce2.default)(_this.onResize.bind(_this));
    _this.getFilterItems = _this.getFilterItems.bind(_this);

    _this.headerElementsSet = new _set2.default();
    _this.scrollLeft = 0;
    _this.scrollTop = 0;
    return _this;
  }

  (0, _createClass3.default)(Table, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.hasMounted = true;

      if (this.props.fixHeader || this.props.fixColumnCount || this.props.height === 'auto') {
        window.addEventListener('resize', this.onResize);
        setTimeout(this.onResize);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.dataSource !== this.props.dataSource) {
        var filters = void 0;

        if (nextProps.filters == null) {
          filters = [];
          this.setState({ filters: filters });
        } else {
          filters = nextProps.filters;
        }

        var dataSource = this.getDataSource(nextProps.dataSource, this.state.sort, filters);

        this.setState({ dataSource: dataSource });
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(_ref, prevState) {
      var page = _ref.page,
          fixedHeaderContainer = _ref.fixedHeaderContainer;

      if (this.props.fixHeader || this.props.fixColumnCount || this.props.height === 'auto') {
        if (prevState.dataSource !== this.state.dataSource || page !== this.props.page) {
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
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.hasMounted = false;

      if (this.props.fixHeader || this.props.fixColumnCount) {
        window.removeEventListener('resize', this.onResize);
      }
    }
  }, {
    key: 'onResize',
    value: function onResize() {
      if (!this.hasMounted) {
        return;
      }

      var tableBodyContainer = this.tableBodyContainer;


      if (tableBodyContainer) {
        this.setState({
          hasVerticalScrollbar: tableBodyContainer.scrollHeight > tableBodyContainer.clientHeight
        });

        this.setState({
          hasHorizontalScrollbar: tableBodyContainer.scrollWidth > tableBodyContainer.clientWidth
        });

        this.syncWidth();
        this.syncHeight();
      }
    }
  }, {
    key: 'onScroll',
    value: function onScroll() {
      var _tableBodyContainer = this.tableBodyContainer,
          scrollTop = _tableBodyContainer.scrollTop,
          scrollLeft = _tableBodyContainer.scrollLeft;


      if (this.props.fixColumnCount) {
        if (scrollLeft === 0) {
          this.setState({ showFixedTable: false });
        } else {
          this.setState({ showFixedTable: true });
        }
      }

      scrollTop = Math.floor(scrollTop);
      scrollLeft = Math.floor(scrollLeft);

      this.props.onScroll(this.scrollLeft === scrollLeft ? null : scrollLeft, this.scrollTop === scrollTop ? null : scrollTop);

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
  }, {
    key: 'getRowKey',
    value: function getRowKey(record, recordIndex) {
      var rowKey = this.props.rowKey;


      return rowKey ? record[rowKey] : recordIndex;
    }
  }, {
    key: 'getOnePageDataSource',
    value: function getOnePageDataSource() {
      var dataSource = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state.dataSource;

      if (dataSource == null) {
        return null;
      }

      var onePageDataSource = dataSource;

      if (this.props.enablePagination) {
        if (this.props.rowsPerPage && this.props.totalPages == null) {
          var start = (this.props.page - 1) * this.props.rowsPerPage;

          onePageDataSource = onePageDataSource.slice(start, start + this.props.rowsPerPage);
        }
      }

      return onePageDataSource;
    }
  }, {
    key: 'getDataSource',
    value: function getDataSource() {
      var dataSource = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props.dataSource;
      var sort = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.state.sort;
      var filters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.getFilters();

      if (dataSource == null) {
        return null;
      }

      var newDataSource = [].concat((0, _toConsumableArray3.default)(dataSource));

      if (filters.length > 0) {
        newDataSource = dataSource.filter(function (row) {
          return filters.every(function (_ref2) {
            var key = _ref2.key,
                values = _ref2.values;
            return row[key] === undefined || values.indexOf(row[key]) !== -1;
          });
        });
      }

      if (sort && sort.key != null) {
        newDataSource = (0, _sortBy2.default)(newDataSource, ['' + sort.key]);

        if (sort.direction === Table.DESC) {
          newDataSource = newDataSource.reverse();
        }
      }

      return newDataSource;
    }
  }, {
    key: 'getFilters',
    value: function getFilters() {
      if (this.props.filters != null) {
        return this.props.filters;
      }

      return this.state.filters;
    }
  }, {
    key: 'setFilters',
    value: function setFilters(filters) {
      if (this.props.filters != null) {
        this.props.onFilterChange(filters);
      } else {
        this.setState({ filters: filters });
      }
    }
  }, {
    key: 'getFilterItems',
    value: function getFilterItems(filterKey) {
      var isActive = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (this.props.dataSource == null || this.state.dataSource == null) {
        return [];
      }

      if (!isActive) {
        return (0, _from2.default)(new _set2.default(this.state.dataSource.map(function (d) {
          return d[filterKey];
        })));
      }

      var items = (0, _from2.default)(new _set2.default(this.state.dataSource.map(function (d) {
        return d[filterKey];
      })));

      return items;
    }
  }, {
    key: 'closeFilter',
    value: function closeFilter() {
      this.headerElementsSet.forEach(function (header) {
        if (header) {
          header.closeFilter();
        }
      });
    }
  }, {
    key: 'syncWidth',
    value: function syncWidth() {
      var _this2 = this;

      if (!this.props.fixHeader && this.props.height !== 'auto') {
        return;
      }

      var columnsWidth = {};

      // eslint-disable-next-line
      var firstRow = _reactDom2.default.findDOMNode(this.tableBody).querySelector('tr');

      if (firstRow) {
        [].forEach.call(firstRow.querySelectorAll('td'), function (td, index) {
          columnsWidth['' + index] = Math.floor(td.offsetWidth);
        });

        this.setState({ columnsWidth: columnsWidth }, function () {
          try {
            var headerHeight = _this2.tableHeaderContainer.offsetHeight;

            if (!headerHeight) {
              headerHeight = _this2.tableHeaderContainer.thead.offsetHeight;
            }

            _this2.setState({ headerHeight: headerHeight });
          } catch (e) {
            console.log(e);
          }
        });
      }
    }
  }, {
    key: 'syncHeight',
    value: function syncHeight() {
      var rowsHeight = {};

      // eslint-disable-next-line
      var rows = _reactDom2.default.findDOMNode(this.tableBody).querySelectorAll('tbody tr');

      if (rows) {
        [].forEach.call(rows, function (tr, index) {
          rowsHeight['' + index] = tr.offsetHeight;
        });

        this.setState({ rowsHeight: rowsHeight });
      }
    }
  }, {
    key: 'renderHeader',
    value: function renderHeader(columns) {
      var _this3 = this;

      var isFixedTable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var isFixedHeader = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      return _react2.default.createElement(_TableHeader2.default, {
        columns: columns,
        noWrap: this.props.noWrap,
        columnsWidth: this.props.fixHeader && isFixedHeader ? this.state.columnsWidth : undefined,
        sort: this.state.sort,
        filters: this.getFilters(),
        getFilterItems: this.getFilterItems,
        getColumnClassName: this.props.getColumnClassName,
        onFiltersChange: function onFiltersChange(filters) {
          if (_this3.props.page !== 1) {
            _this3.props.onPageChange(1);
          }
          _this3.setFilters(filters);
          _this3.setState({
            dataSource: _this3.getDataSource(_this3.props.dataSource, _this3.state.sort, filters)
          });
        },
        onSortChange: function onSortChange(sort) {
          return _this3.setState({ sort: sort, dataSource: _this3.getDataSource(_this3.props.dataSource, sort) });
        },
        visible: !this.props.fixHeader || isFixedHeader,
        height: isFixedTable ? this.state.headerHeight : null,
        ref: function ref(el) {
          if (_this3.props.height === 'auto' && !isFixedTable && !_this3.props.fixHeader) {
            _this3.tableHeaderContainer = el;
          }

          if (!isFixedTable) {
            _this3.flowedTableHeader = el;
          }

          _this3.headerElementsSet.add(el);
        },
        getPopoverContainer: this.props.getPopoverContainer
      });
    }
  }, {
    key: 'renderTable',
    value: function renderTable(isFixedTable, dataSource) {
      var _this4 = this;

      var _props = this.props,
          fixHeader = _props.fixHeader,
          fixColumnCount = _props.fixColumnCount;


      var columns = isFixedTable && fixColumnCount ? this.props.columns.slice(0, fixColumnCount) : [].concat((0, _toConsumableArray3.default)(this.props.columns));

      if (this.props.rowSelection) {
        columns.unshift({
          key: 'row-select',
          renderColumn: function renderColumn() {
            return dataSource && _react2.default.createElement('input', {
              type: 'checkbox',
              checked: function () {
                return dataSource != null && dataSource.length > 0 && dataSource.every(function (record, recordIndex) {
                  var key = _this4.getRowKey(record, recordIndex);
                  return _this4.props.rowSelection.selectedRowKeys.indexOf(key) !== -1;
                });
              }(),
              onChange: function onChange(e) {
                var checked = e.target.checked;


                if (checked) {
                  _this4.props.rowSelection.onChange(dataSource.map(function (record, recordIndex) {
                    return _this4.getRowKey(record, recordIndex);
                  }));
                } else {
                  _this4.props.rowSelection.onChange([]);
                }
              }
            });
          },
          render: function render(record, recordIndex) {
            var key = _this4.getRowKey(record, recordIndex);

            return _react2.default.createElement('input', {
              type: 'checkbox',
              checked: _this4.props.rowSelection.selectedRowKeys && _this4.props.rowSelection.selectedRowKeys.indexOf(key) !== -1,
              onChange: function onChange(e) {
                var checked = e.target.checked;


                var selectedRowKeysSet = new _set2.default(_this4.props.rowSelection.selectedRowKeys);

                if (checked) {
                  selectedRowKeysSet.add(key);
                } else {
                  selectedRowKeysSet.delete(key);
                }

                _this4.props.rowSelection.onChange((0, _from2.default)(selectedRowKeysSet));
              }
            });
          }
        });
      }

      if (!isFixedTable && this.props.expandedRowRender) {
        columns.push({
          key: 'detail-trigger',
          renderColumn: function renderColumn() {
            return null;
          },
          width: 50,
          render: function render(record, recordIndex) {
            var rowsState = (0, _extends3.default)({}, _this4.state.rowsState);
            var rowState = rowsState['' + recordIndex];

            return _react2.default.createElement(
              'div',
              {
                className: 'detail-trigger-cell',
                'aria-hidden': true,
                onClick: function onClick() {
                  var expanded = false;

                  if (rowState == null) {
                    expanded = true;
                    rowsState['' + recordIndex] = { expanded: expanded };
                  } else {
                    rowState.expanded = !rowState.expanded;
                    expanded = rowsState.expanded;
                  }

                  _this4.setState({ rowsState: rowsState });

                  _this4.props.onRowExpandChange(expanded, record);
                }
              },
              _this4.props.expandedRowRender(record) && _react2.default.createElement('i', {
                className: (0, _classnames2.default)('icon', { 'icon-plus': !(rowState && rowState.expanded) }, { 'icon-minus': rowState && rowState.expanded })
              })
            );
          }
        });
      }

      return _react2.default.createElement(
        'div',
        {
          className: isFixedTable ? 'table-column-fixed' : 'table-column-flow',
          style: {
            width: isFixedTable && this.props.height === 'auto' ? (0, _keys2.default)(this.state.columnsWidth).reduce(function (prev, current, index) {
              var fixedCount = _this4.props.rowSelection ? _this4.props.fixColumnCount + 1 : _this4.props.fixColumnCount;

              if (index < fixedCount) {
                return prev + _this4.state.columnsWidth['' + current];
              }

              return prev;
            }, 0) : null,
            paddingTop: this.props.fixHeader && this.props.height !== 'auto' ? this.state.headerHeight : null
          }
        },
        fixHeader && function () {
          var fixHeaderElement = function fixHeaderElement(isOutter) {
            return _react2.default.createElement(
              'div',
              {
                className: 'table-header',
                style: { overflowX: _this4.state.dataSource && _this4.state.dataSource.length === 0 ? 'auto' : null },
                ref: function ref(el) {
                  if (!isFixedTable) {
                    if (isOutter) {
                      _this4.outerHeaderContainer = el;
                    } else {
                      _this4.tableHeaderContainer = el;
                    }
                  }
                }
              },
              _react2.default.createElement(
                'table',
                { cellPadding: '0', cellSpacing: '0' },
                _this4.renderHeader(columns, isFixedTable, true)
              )
            );
          };

          return _react2.default.createElement(
            'div',
            null,
            fixHeaderElement(false),
            _this4.props.fixedHeaderContainer && _react2.default.createElement(
              _Portal2.default,
              { getContainer: function getContainer() {
                  return _this4.props.fixedHeaderContainer;
                } },
              fixHeaderElement(true)
            )
          );
        }(),
        _react2.default.createElement(
          'div',
          {
            className: 'table-body',
            style: {
              maxHeight: this.props.height && this.props.height !== 'auto' ? this.props.height : null,
              top: this.props.fixHeader && this.props.height === 'auto' ? this.state.headerHeight : null
            },
            onScroll: this.onScroll,
            ref: function ref(el) {
              if (!isFixedTable) {
                _this4.tableBodyContainer = el;
              } else {
                _this4.fixedTableBodyContainer = el;
              }
            }
          },
          _react2.default.createElement(
            'table',
            { cellPadding: '0', cellSpacing: '0' },
            this.renderHeader(columns, isFixedTable),
            _react2.default.createElement(_TableBody2.default, {
              columns: columns,
              dataSource: dataSource,
              expandedRowRender: this.props.expandedRowRender,
              rowKey: this.props.rowKey,
              rowClassName: this.props.rowClassName,
              onRowClick: this.props.onRowClick,
              rowsState: this.state.rowsState,
              rowsHeight: isFixedTable ? this.state.rowsHeight : null,
              ref: function ref(el) {
                if (!isFixedTable) {
                  _this4.tableBody = el;
                }
              }
            })
          )
        )
      );
    }
  }, {
    key: 'renderNoData',
    value: function renderNoData() {
      if ((0, _keys2.default)(this.getFilters()).length > 0) {
        return _react2.default.createElement(
          'div',
          { className: 'default-no-data' },
          '\u8BE5\u7B5B\u9009\u6761\u4EF6\u4E0B\u65E0\u5339\u914D\u6570\u636E'
        );
      }

      if ((0, _isFunction2.default)(this.props.noDataRender)) {
        return this.props.noDataRender();
      }

      return _react2.default.createElement(
        'div',
        { className: 'default-no-data' },
        '\u6CA1\u6709\u6570\u636E'
      );
    }
  }, {
    key: 'renderPager',
    value: function renderPager() {
      var dataSourceLength = this.state.dataSource ? this.state.dataSource.length : 0;

      var hasPager = this.props.enablePagination && (this.props.rowsPerPage == null || dataSourceLength > this.props.rowsPerPage);

      if (!hasPager) {
        return null;
      }

      return _react2.default.createElement(_Pagination2.default, {
        className: 'table-pagination',
        total: dataSourceLength,
        page: this.props.page,
        totalPages: this.props.totalPages,
        rowsPerPage: this.props.rowsPerPage,
        onChange: this.props.onPageChange
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var dataSourceLength = this.state.dataSource ? this.state.dataSource.length : 0;

      var hasPager = this.props.enablePagination && (this.props.rowsPerPage == null || dataSourceLength > this.props.rowsPerPage);

      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)('table', (0, _defineProperty3.default)({}, this.props.className, !!this.props.className), { 'has-horizontal-scrollbar': this.state.hasHorizontalScrollbar }, { 'has-vertical-scrollbar': this.state.hasVerticalScrollbar }, { 'has-pager': hasPager }, { flexible: this.props.height === 'auto' }, { 'fix-header': this.props.fixHeader })
        },
        _react2.default.createElement(
          'div',
          {
            className: 'table-wrapper'
          },
          this.renderTable(false, this.props.loading ? null : this.getOnePageDataSource()),
          !!this.props.fixColumnCount && this.state.showFixedTable && this.renderTable(true, this.props.loading ? null : this.getOnePageDataSource()),
          (this.props.loading || this.props.dataSource == null) && _react2.default.createElement(
            'div',
            { className: 'loading' },
            this.props.renderLoading !== null ? this.props.renderLoading() : _react2.default.createElement(
              'div',
              { className: 'default-loading' },
              '\u52A0\u8F7D\u4E2D...'
            )
          ),
          !this.props.loading && this.state.dataSource != null && this.state.dataSource.length === 0 && _react2.default.createElement(
            'div',
            { className: 'no-data' },
            this.renderNoData()
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'pager-container' },
          this.renderPager()
        )
      );
    }
  }]);
  return Table;
}(_react2.default.PureComponent);

Table.propTypes = propTypes;
Table.defaultProps = defaultProps;
Table.ASC = ASC;
Table.DESC = DESC;

exports.default = Table;