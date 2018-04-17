'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _TableCell = require('./TableCell');

var _TableCell2 = _interopRequireDefault(_TableCell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  expandedRowRender: _propTypes2.default.func,
  rowKey: _propTypes2.default.string,
  rowClassName: _propTypes2.default.func,
  onRowClick: _propTypes2.default.func,
  rowsState: _propTypes2.default.shape({}),
  rowsHeight: _propTypes2.default.shape({}),
  columns: _propTypes2.default.arrayOf(_propTypes2.default.shape({})),
  dataSource: _propTypes2.default.arrayOf(_propTypes2.default.any)
};

var defaultProps = {
  dataSource: [],
  onRowClick: function onRowClick() {},
  expandedRowRender: null,
  rowKey: null,
  rowClassName: null,
  rowsState: null,
  rowsHeight: null,
  columns: null
};

var TableBody = function (_React$PureComponent) {
  (0, _inherits3.default)(TableBody, _React$PureComponent);

  function TableBody() {
    (0, _classCallCheck3.default)(this, TableBody);
    return (0, _possibleConstructorReturn3.default)(this, (TableBody.__proto__ || (0, _getPrototypeOf2.default)(TableBody)).apply(this, arguments));
  }

  (0, _createClass3.default)(TableBody, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'tbody',
        null,
        this.props.dataSource && this.props.dataSource.map(function (record, rowIndex) {
          var rowState = _this2.props.rowsState['' + rowIndex];

          var rows = [_react2.default.createElement(
            'tr',
            {
              key: _this2.props.rowKey ? record[_this2.props.rowKey] : rowIndex,
              className: (0, _classnames2.default)('row-container', _this2.props.rowClassName(record, rowIndex), { expanded: rowState && rowState.expanded }, { hover: rowState && rowState.hover }),
              onClick: function onClick() {
                return _this2.props.onRowClick(record);
              },
              style: {
                height: _this2.props.rowsHeight ? _this2.props.rowsHeight[rowIndex] : null
              }
            },
            _this2.props.columns.map(function (column, columnIndex) {
              return column.children ? column.children.map(function (child, childColumnIndex) {
                return _react2.default.createElement(_TableCell2.default, {
                  column: child,
                  record: record,
                  rowIndex: rowIndex,
                  key: '' + (childColumnIndex + 1)
                });
              }) : _react2.default.createElement(_TableCell2.default, {
                column: column,
                record: record,
                rowIndex: rowIndex,
                key: '' + (columnIndex + 1)
              });
            })
          )];

          if (_this2.props.expandedRowRender && rowState && rowState.expanded) {
            rows.push(_react2.default.createElement(
              'tr',
              {
                key: rowIndex + 1 + '_detail'
              },
              _react2.default.createElement(
                'td',
                {
                  colSpan: _this2.props.columns.length,
                  className: 'detail-container'
                },
                _this2.props.expandedRowRender(record)
              )
            ));
          }

          return rows;
        })
      );
    }
  }]);
  return TableBody;
}(_react2.default.PureComponent);

TableBody.propTypes = propTypes;
TableBody.defaultProps = defaultProps;

exports.default = TableBody;