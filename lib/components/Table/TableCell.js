'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  column: _propTypes2.default.shape({
    align: _propTypes2.default.string,
    key: _propTypes2.default.any
  }).isRequired,
  record: _propTypes2.default.shape({}).isRequired,
  rowIndex: _propTypes2.default.number.isRequired
};

var defaultProps = {};

var TableCell = function (_React$PureComponent) {
  (0, _inherits3.default)(TableCell, _React$PureComponent);

  function TableCell() {
    (0, _classCallCheck3.default)(this, TableCell);
    return (0, _possibleConstructorReturn3.default)(this, (TableCell.__proto__ || (0, _getPrototypeOf2.default)(TableCell)).apply(this, arguments));
  }

  (0, _createClass3.default)(TableCell, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          column = _props.column,
          record = _props.record,
          rowIndex = _props.rowIndex;
      var _column$getProps = column.getProps,
          getProps = _column$getProps === undefined ? function () {} : _column$getProps;


      return _react2.default.createElement(
        'td',
        (0, _extends3.default)({
          className: (0, _classnames2.default)((0, _defineProperty3.default)({}, 'text-' + column.align, !!column.align)),
          'data-key': column.key,
          style: {
            whiteSpace: column.noWrap ? 'noWrap' : null
          }
        }, getProps(record, rowIndex)),
        column.render != null ? column.render(record, rowIndex) : record[column.key]
      );
    }
  }]);
  return TableCell;
}(_react2.default.PureComponent);

TableCell.propTypes = propTypes;
TableCell.defaultProps = defaultProps;

exports.default = TableCell;