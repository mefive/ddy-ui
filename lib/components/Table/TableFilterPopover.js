'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

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

var _Input = require('../Input');

var _Input2 = _interopRequireDefault(_Input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  column: _propTypes2.default.shape({
    key: _propTypes2.default.any
  }).isRequired,
  filterItems: _propTypes2.default.arrayOf(_propTypes2.default.any).isRequired,
  filter: _propTypes2.default.shape({
    values: _propTypes2.default.any,
    items: _propTypes2.default.array
  }),
  onFilterChange: _propTypes2.default.func.isRequired,
  isInFilters: _propTypes2.default.bool.isRequired,
  isLast: _propTypes2.default.bool.isRequired,
  onConfirm: _propTypes2.default.func.isRequired,
  onClear: _propTypes2.default.func.isRequired
};

var defaultProps = {
  filter: null
};

var TableFilterPopover = function (_React$PureComponent) {
  (0, _inherits3.default)(TableFilterPopover, _React$PureComponent);

  function TableFilterPopover(props) {
    (0, _classCallCheck3.default)(this, TableFilterPopover);

    var _this = (0, _possibleConstructorReturn3.default)(this, (TableFilterPopover.__proto__ || (0, _getPrototypeOf2.default)(TableFilterPopover)).call(this, props));

    _this.state = {
      query: null
    };

    _this.onConfirm = _this.onConfirm.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(TableFilterPopover, [{
    key: 'onConfirm',
    value: function onConfirm() {
      var filter = this.props.filter;


      if (filter == null) {
        filter = {
          key: '' + this.props.column.key,
          values: this.getFilteredValues(this.props.filterItems),
          items: this.props.filterItems
        };
      } else {
        filter.values = this.getFilteredValues(filter.values);
      }

      this.props.onConfirm(filter);
    }
  }, {
    key: 'getFilteredValues',
    value: function getFilteredValues(values) {
      var _this2 = this;

      return values.filter(function (f) {
        if (_this2.state.query == null) {
          return true;
        }

        if ('空白'.indexOf(_this2.state.query) !== -1 && f == null) {
          return true;
        }

        return ('' + f).indexOf(_this2.state.query) !== -1;
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var filteredItems = this.getFilteredValues(this.props.filterItems);

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'p-1' },
          _react2.default.createElement(_Input2.default, {
            value: this.state.query,
            onChange: function onChange(query) {
              return _this3.setState({ query: query });
            },
            maxLength: 100,
            onKeyPress: function onKeyPress(e) {
              if (e.charCode === 13) {
                if (filteredItems.length > 0) {
                  _this3.onConfirm();
                }
              }
            }
          })
        ),
        _react2.default.createElement(
          'div',
          {
            style: {
              maxHeight: 200,
              minWidth: 200,
              maxWidth: 300,
              overflowY: 'auto'
            }
          },
          function () {
            return filteredItems.map(function (item, itemIndex) {
              return (
                // eslint-disable-next-line
                _react2.default.createElement(
                  'label',
                  {
                    key: '' + (itemIndex + 1),
                    className: 'filter-item d-block'
                  },
                  _react2.default.createElement(
                    'div',
                    { className: 'p-1 ellipsis' },
                    _react2.default.createElement(_Input2.default, {
                      value: _this3.props.filter == null || _this3.props.filter.values.indexOf(item) !== -1,
                      type: 'checkbox',
                      className: 'mr-0',
                      onChange: function onChange(checked) {
                        if (_this3.props.filterItems.length === 1) {
                          return;
                        }

                        var valuesSet = _this3.props.filter == null ? new _set2.default(_this3.props.filterItems) : new _set2.default(_this3.props.filter.values);

                        if (checked) {
                          valuesSet.add(item);
                        } else {
                          valuesSet.delete(item);
                        }

                        var values = (0, _from2.default)(valuesSet);

                        _this3.props.onFilterChange({
                          key: '' + _this3.props.column.key,
                          values: values,
                          items: _this3.props.isLast && _this3.props.filter != null ? _this3.props.filter.items : _this3.props.filterItems
                        });
                      }
                    }),
                    _react2.default.createElement(
                      'span',
                      null,
                      item == null ? '空白' : item
                    )
                  )
                )
              );
            });
          }()
        ),
        _react2.default.createElement(
          'div',
          { className: 'p-1' },
          this.props.filterItems.length > 1 && _react2.default.createElement(
            'div',
            { className: 'text-sm' },
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(_Input2.default, {
                type: 'checkbox',
                className: 'mr-0',
                value: this.props.filter ? this.props.filter.values.length === this.props.filter.items.length : true,
                onChange: function onChange(all) {
                  _this3.props.onFilterChange({
                    key: '' + _this3.props.column.key,
                    values: all ? _this3.props.filterItems : [],
                    items: _this3.props.isLast && _this3.props.filter != null ? _this3.props.filter.items : _this3.props.filterItems
                  });
                }
              }),
              _react2.default.createElement(
                'span',
                { className: 'text-primary mr-0' },
                '\u5168\u90E8'
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'mt-1' },
            _react2.default.createElement(
              'div',
              {
                className: (0, _classnames2.default)('btn btn-sm btn-primary', { disabled: filteredItems.length === 0 }),
                'aria-hidden': true,
                onClick: function onClick() {
                  if (filteredItems.length === 0) {
                    return;
                  }

                  _this3.onConfirm();
                }
              },
              '\u786E\u5B9A'
            ),
            this.props.isInFilters && _react2.default.createElement(
              'div',
              {
                className: 'btn btn-sm btn-outline-primary ml-1',
                'aria-hidden': true,
                onClick: function onClick() {
                  _this3.props.onClear();
                }
              },
              '\u6E05\u7A7A'
            )
          )
        )
      );
    }
  }]);
  return TableFilterPopover;
}(_react2.default.PureComponent);

TableFilterPopover.propTypes = propTypes;
TableFilterPopover.defaultProps = defaultProps;

exports.default = TableFilterPopover;