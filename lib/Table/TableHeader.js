'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _cloneDeep = require('lodash/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _Trigger = require('../Trigger');

var _Trigger2 = _interopRequireDefault(_Trigger);

var _Popover = require('../Popover');

var _Popover2 = _interopRequireDefault(_Popover);

var _Table = require('./Table');

var _Table2 = _interopRequireDefault(_Table);

var _TableFilterPopover = require('./TableFilterPopover');

var _TableFilterPopover2 = _interopRequireDefault(_TableFilterPopover);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  columns: _propTypes2.default.arrayOf(_propTypes2.default.shape({})),
  columnsWidth: _propTypes2.default.shape({}),
  noWrap: _propTypes2.default.bool,
  onColumnClick: _propTypes2.default.func,
  height: _propTypes2.default.number,
  sort: _propTypes2.default.shape({
    key: _propTypes2.default.string,
    direction: _propTypes2.default.string
  }),
  visible: _propTypes2.default.bool,
  filters: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    key: _propTypes2.default.string,
    values: _propTypes2.default.array,
    items: _propTypes2.default.array
  })),
  getFilterItems: _propTypes2.default.func,
  onFiltersChange: _propTypes2.default.func,
  onSortChange: _propTypes2.default.func,
  getPopoverContainer: _propTypes2.default.func,
  getColumnClassName: _propTypes2.default.func
};

var defaultProps = {
  columns: [],
  onColumnClick: function onColumnClick() {},
  columnsWidth: {},
  visible: true,
  getFilterItems: function getFilterItems() {
    return null;
  },
  getColumnClassName: null,
  onFiltersChange: function onFiltersChange() {},
  onSortChange: function onSortChange() {},
  sort: null,
  height: null,
  filters: null,
  getPopoverContainer: null,
  noWrap: false
};

var TableHeader = function (_React$PureComponent) {
  (0, _inherits3.default)(TableHeader, _React$PureComponent);

  function TableHeader(props) {
    (0, _classCallCheck3.default)(this, TableHeader);

    var _this = (0, _possibleConstructorReturn3.default)(this, (TableHeader.__proto__ || (0, _getPrototypeOf2.default)(TableHeader)).call(this, props));

    _this.state = {
      filterActiveIndex: null,
      filters: []
    };
    return _this;
  }

  (0, _createClass3.default)(TableHeader, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref) {
      var filters = _ref.filters;

      if (filters !== this.props.filters) {
        this.setFilters(filters);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, _ref2) {
      var filterActiveIndex = _ref2.filterActiveIndex;

      if (!filterActiveIndex && this.filterActiveIndex != null) {
        this.setFilters();
      }
    }
  }, {
    key: 'setFilters',
    value: function setFilters() {
      var filters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props.filters;

      this.setState({
        filters: (0, _cloneDeep2.default)(filters)
      });
    }
  }, {
    key: 'getFiltersByChangedFilter',
    value: function getFiltersByChangedFilter(filter) {
      var filters = [].concat((0, _toConsumableArray3.default)(this.state.filters));
      var index = filters.findIndex(function (f) {
        return f.key === filter.key;
      });

      if (index === -1) {
        filters.push(filter);
      } else {
        filters.splice(index, 1, filter);
      }

      return filters;
    }
  }, {
    key: 'filterPopoverPlace',
    value: function filterPopoverPlace() {
      if (this.popover) {
        this.popover.place();
      }
    }
  }, {
    key: 'closeFilter',
    value: function closeFilter() {
      this.setState({ filterActiveIndex: null });
    }
  }, {
    key: 'renderFilter',
    value: function renderFilter(column, index) {
      var _this2 = this;

      return _react2.default.createElement(
        _Trigger2.default,
        {
          active: this.state.filterActiveIndex === index,
          onActiveChange: function onActiveChange(active) {
            return _this2.setState({
              filterActiveIndex: active ? index : null
            });
          },
          getPopoverContainer: this.props.getPopoverContainer,
          renderPopover: function renderPopover() {
            var filter = _this2.state.filters.find(function (f) {
              return f.key === '' + column.key;
            });

            var isLast = filter === _this2.state.filters[_this2.state.filters.length - 1];

            var filterItems = filter == null || !isLast ? _this2.props.getFilterItems(column.key) : filter.items;

            return _react2.default.createElement(
              _Popover2.default,
              {
                placement: _this2.props.columns.length - 1 === index ? _Popover2.default.placement.BOTTOM_RIGHT : _Popover2.default.placement.BOTTOM_LEFT,
                className: 'table-filter-popover',
                ref: function ref(el) {
                  _this2.popover = el;
                }
              },
              _react2.default.createElement(_TableFilterPopover2.default, {
                column: column,
                filterItems: filterItems,
                filter: filter,
                onFilterChange: function onFilterChange(f) {
                  return _this2.setState({ filters: _this2.getFiltersByChangedFilter(f) });
                },
                isInFilters: _this2.props.filters.some(function (f) {
                  return f.key === '' + column.key;
                }),
                isLast: isLast,
                onConfirm: function onConfirm(f) {
                  return _this2.setState({
                    filterActiveIndex: null,
                    filters: _this2.getFiltersByChangedFilter(f)
                  }, function () {
                    return _this2.props.onFiltersChange((0, _cloneDeep2.default)(_this2.state.filters));
                  });
                },
                onClear: function onClear() {
                  _this2.setState({ filterActiveIndex: null }, function () {
                    var filters = [].concat((0, _toConsumableArray3.default)(_this2.state.filters));
                    var deleteIndex = filters.findIndex(function (f) {
                      return f.key === '' + column.key;
                    });
                    if (deleteIndex !== -1) {
                      filters.splice(deleteIndex, 1);
                      _this2.props.onFiltersChange(filters);
                    }
                  });
                }
              })
            );
          },
          enterClassName: 'slide-down-in',
          leaveClassName: 'slide-down-out'
        },
        _react2.default.createElement('i', {
          className: (0, _classnames2.default)('icon icon-filter align-middle ml-1', { 'text-primary bold': this.props.filters.some(function (f) {
              return f.key === '' + column.key;
            }) }),
          role: 'button'
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var children = [];
      var indexCounter = 0;

      this.props.columns.forEach(function (column) {
        if (column.children) {
          children = children.concat(column.children.map(function (child) {
            indexCounter += 1;
            return (0, _extends3.default)({}, child, { index: indexCounter - 1 });
          }));
        } else {
          indexCounter += 1;
        }
      });

      return _react2.default.createElement(
        'thead',
        {
          className: (0, _classnames2.default)({ invisible: !this.props.visible }),
          ref: function ref(el) {
            _this3.thead = el;
          }
        },
        _react2.default.createElement(
          'tr',
          {
            style: {
              height: this.props.visible ? this.props.height : null
            }
          },
          this.props.columns.map(function (column, index) {
            var direction = void 0;

            if (_this3.props.sort && column.sortKey === _this3.props.sort.key) {
              direction = _this3.props.sort.direction === _Table2.default.ASC ? _Table2.default.ASC : _Table2.default.DESC;
            } else {
              direction = null;
            }

            var columnClassName = void 0;

            if (_this3.props.getColumnClassName) {
              columnClassName = _this3.props.getColumnClassName(column, index);
            }

            return _react2.default.createElement(
              'th',
              {
                key: column.key,
                'data-key': column.key,
                className: (0, _classnames2.default)((0, _defineProperty3.default)({}, 'text-' + column.align, !!column.align), (0, _defineProperty3.default)({}, columnClassName, columnClassName != null)),
                style: {
                  whiteSpace: _this3.props.noWrap || column.noWrap ? 'nowrap' : null,
                  width: column.width || null
                },
                rowSpan: function () {
                  if (children.length > 0) {
                    return column.children ? 1 : 2;
                  }
                  return null;
                }(),
                colSpan: function () {
                  if (children.length > 0) {
                    return column.children ? column.children.length : 1;
                  }
                  return null;
                }(),
                onClick: function onClick() {
                  if (_this3.state.filterActiveIndex == null && column.sortKey) {
                    _this3.props.onColumnClick(column);
                  }
                }
              },
              _react2.default.createElement(
                'div',
                {
                  style: {
                    width: column.children ? null : _this3.props.columnsWidth[index] || column.width || null,
                    position: 'relative'
                  },
                  ref: '' + index
                },
                column.renderColumn ? column.renderColumn(column) : _react2.default.createElement(
                  'span',
                  null,
                  _react2.default.createElement(
                    'span',
                    { className: 'bold' },
                    column.title
                  ),
                  column.sortKey != null && _react2.default.createElement(
                    'span',
                    {
                      className: 'ml-1',
                      'aria-hidden': true,
                      onClick: function onClick() {
                        var sort = direction == null ? { key: column.key } : (0, _extends3.default)({}, _this3.props.sort);

                        var newDirection = void 0;

                        if (direction == null) {
                          newDirection = _Table2.default.DESC;
                        } else {
                          newDirection = direction === _Table2.default.ASC ? _Table2.default.DESC : _Table2.default.ASC;
                        }

                        _this3.props.onSortChange((0, _extends3.default)({}, sort, {
                          direction: newDirection
                        }));
                      },
                      role: 'button'
                    },
                    _react2.default.createElement('i', {
                      className: (0, _classnames2.default)('icon icon-half-arrow-up align-middle', { 'text-primary': direction === _Table2.default.ASC })
                    }),
                    _react2.default.createElement('i', {
                      className: (0, _classnames2.default)('icon icon-half-arrow-down align-middle', { 'text-primary': direction === _Table2.default.DESC }),
                      style: { marginLeft: 2, marginRight: '-0.5em' }
                    })
                  ),
                  column.filterable && _this3.renderFilter(column, index)
                )
              )
            );
          })
        ),
        children.length > 0 && _react2.default.createElement(
          'tr',
          null,
          children.map(function (column) {
            return _react2.default.createElement(
              'th',
              {
                key: column.key,
                'data-key': column.key,
                className: (0, _classnames2.default)({ sortable: !!column.sortKey }, (0, _defineProperty3.default)({}, 'text-' + column.align, !!column.align)),
                style: {
                  whiteSpace: _this3.props.noWrap || column.noWrap ? 'nowrap' : null
                }
              },
              _react2.default.createElement(
                'div',
                {
                  style: {
                    width: _this3.props.columnsWidth[column.index] || column.width || null
                  }
                },
                column.renderColumn ? column.renderColumn(column) : column.title
              )
            );
          })
        )
      );
    }
  }]);
  return TableHeader;
}(_react2.default.PureComponent);

TableHeader.propTypes = propTypes;
TableHeader.defaultProps = defaultProps;

exports.default = TableHeader;