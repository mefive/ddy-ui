'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

require('./style/index.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  total: _propTypes2.default.number,
  page: _propTypes2.default.number,
  totalPages: _propTypes2.default.number,
  rowsPerPage: _propTypes2.default.number,
  onChange: _propTypes2.default.func,
  className: _propTypes2.default.string
};

var defaultProps = {};

var Pagination = function (_React$Component) {
  (0, _inherits3.default)(Pagination, _React$Component);

  function Pagination() {
    (0, _classCallCheck3.default)(this, Pagination);
    return (0, _possibleConstructorReturn3.default)(this, (Pagination.__proto__ || (0, _getPrototypeOf2.default)(Pagination)).apply(this, arguments));
  }

  (0, _createClass3.default)(Pagination, [{
    key: 'getItem',
    value: function getItem(page) {
      var _this2 = this;

      return _react2.default.createElement(
        'span',
        {
          className: (0, _classnames2.default)('page-item', { current: page === this.props.page }),
          'aria-hidden': true,
          key: page,
          onClick: function onClick() {
            if (page !== _this2.props.page) {
              _this2.props.onChange(page);
            }
          }
        },
        page
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          total = _props.total,
          rowsPerPage = _props.rowsPerPage,
          page = _props.page,
          totalPages = _props.totalPages;


      if (totalPages != null) {
        if (totalPages === 1) {
          return null;
        }
      } else if (rowsPerPage != null && total < rowsPerPage) {
        return null;
      }

      var isFirstPage = page === 1;

      if (totalPages == null) {
        totalPages = Math.ceil(total / rowsPerPage);
      }

      var isLastPage = page === totalPages;

      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)('pagination', (0, _defineProperty3.default)({}, this.props.className, !!this.props.className))
        },
        _react2.default.createElement(
          'div',
          {
            className: (0, _classnames2.default)('btn', 'btn-outline-primary', { disabled: isFirstPage }),
            'aria-hidden': true,
            onClick: function onClick() {
              if (!isFirstPage) {
                _this3.props.onChange(page - 1);
              }
            }
          },
          _react2.default.createElement('i', { className: 'icon icon-angle-left' }),
          '\u4E0A\u4E00\u9875'
        ),
        _react2.default.createElement(
          'span',
          { className: 'page' },
          function () {
            var pageItems = [];

            if (totalPages < 10) {
              for (var i = 1; i <= totalPages; i++) {
                pageItems.push(_this3.getItem(i));
              }

              return pageItems;
            }

            if (page < 4) {
              for (var _i = 1; _i <= 5; _i += 1) {
                pageItems.push(_this3.getItem(_i));
              }

              pageItems.push(_react2.default.createElement(
                'span',
                { className: 'ellipsis', key: 'ellipsis' },
                ' ... '
              ));
              pageItems.push(_this3.getItem(totalPages));

              return pageItems;
            }

            if (page > totalPages - 4) {
              pageItems.push(_this3.getItem(1));
              pageItems.push(_react2.default.createElement(
                'span',
                { className: 'ellipsis', key: 'ellipsis' },
                ' ... '
              ));

              for (var _i2 = totalPages - 4; _i2 <= totalPages; _i2 += 1) {
                pageItems.push(_this3.getItem(_i2));
              }

              return pageItems;
            }

            pageItems.push(_this3.getItem(1));
            pageItems.push(_react2.default.createElement(
              'span',
              { className: 'ellipsis', key: 'ellipsis1' },
              ' ... '
            ));

            for (var _i3 = page - 2; _i3 <= page + 2; _i3 += 1) {
              pageItems.push(_this3.getItem(_i3));
            }

            pageItems.push(_react2.default.createElement(
              'span',
              { className: 'ellipsis', key: 'ellipsis2' },
              ' ... '
            ));
            pageItems.push(_this3.getItem(totalPages));

            return pageItems;
          }()
        ),
        _react2.default.createElement(
          'div',
          {
            className: (0, _classnames2.default)('btn', 'btn-outline-primary', { disabled: isLastPage }),
            'aria-hidden': true,
            onClick: function onClick() {
              if (!isLastPage) {
                _this3.props.onChange(page + 1);
              }
            }
          },
          '\u4E0B\u4E00\u9875',
          _react2.default.createElement('i', { className: 'icon icon-angle-right' })
        )
      );
    }
  }]);
  return Pagination;
}(_react2.default.Component);

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;

exports.default = Pagination;