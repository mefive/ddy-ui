'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

var _remove = require('lodash/remove');

var _remove2 = _interopRequireDefault(_remove);

require('./style/index.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var INIT = 'init';
var MOUNTED = 'mounted';
var ANIMATED = 'animated';
var LEAVING = 'leaving';
var NO_KEY = 'no_key';

var propTypes = {
  enterClassName: _propTypes2.default.string,
  leaveClassName: _propTypes2.default.string,
  enterDuration: _propTypes2.default.number,
  leaveDuration: _propTypes2.default.number,
  activeClass: _propTypes2.default.string,
  children: _propTypes2.default.node
};

var defaultProps = {
  enterDuration: 200,
  leaveDuration: 200,
  enterClassName: 'enter',
  leaveClassName: 'leave',
  activeClass: 'active',
  children: null
};

var Animate = function (_Component) {
  (0, _inherits3.default)(Animate, _Component);

  function Animate(props) {
    (0, _classCallCheck3.default)(this, Animate);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Animate.__proto__ || (0, _getPrototypeOf2.default)(Animate)).call(this, props));

    _this.state = {
      status: INIT,
      children: [],
      statusMap: {}
    };

    var statusMap = {};

    if (_this.props.children) {
      var children = [];

      _react2.default.Children.forEach(_this.props.children, function (child, index) {
        var key = child.key || NO_KEY;
        statusMap[key] = { status: INIT, index: index };
        children.push({ index: index, child: child });
      });

      _this.state = (0, _extends3.default)({}, _this.state, {
        statusMap: statusMap,
        children: children
      });

      setTimeout(function () {
        return _this.processMount();
      });
    }
    return _this;
  }

  (0, _createClass3.default)(Animate, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.hasMounted = true;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      if (!(0, _isEqual2.default)(nextProps.children, this.props.children)) {
        var statusMap = (0, _extends3.default)({}, this.state.statusMap);

        var children = [];
        var newKeys = _react2.default.Children.map(nextProps.children, function (i) {
          return i ? i.key || NO_KEY : null;
        });
        // console.log('newKeys', newKeys);

        // flag new item to INIT,
        _react2.default.Children.forEach(nextProps.children, function (child, index) {
          if (child == null) {
            return;
          }

          var key = child.key || NO_KEY;

          if (!(key in statusMap)) {
            statusMap[key] = {
              status: INIT,
              index: index
            };
          }

          children.push({ index: index, child: child });
        });

        var hasLeavingChild = false;

        // abandoned item to LEAVING
        (0, _keys2.default)(statusMap).forEach(function (key) {
          if (!newKeys || newKeys.indexOf(key) === -1) {
            statusMap[key].status = LEAVING;

            hasLeavingChild = true;

            children.push({
              index: statusMap[key].index,
              child: _this2.state.children.find(function (i) {
                return (i.child.key || NO_KEY) === key;
              }).child
            });
          }
        });

        // console.log(sortBy(children, ['index']));
        this.setState({ children: children, statusMap: statusMap });

        if (hasLeavingChild) {
          setTimeout(function () {
            return _this2.processLeave();
          }, nextProps.leaveDuration);
        }
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var _this3 = this;

      if (!(0, _isEqual2.default)(prevProps.children, this.props.children)) {
        setTimeout(function () {
          return _this3.processMount();
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.hasMounted = false;
    }
  }, {
    key: 'getClassName',
    value: function getClassName(status) {
      var className = [];

      if (status === LEAVING) {
        className.push(this.props.leaveClassName);
      }

      if (status !== INIT) {
        className.push(this.props.activeClass);
      }

      if (status === MOUNTED) {
        className.push(this.props.enterClassName);
      }

      // console.log('calculated className', status, className, classNames(...className));

      return _classnames2.default.apply(undefined, className);
    }
  }, {
    key: 'processMount',
    value: function processMount() {
      var _this4 = this;

      // console.log('processMount');

      if (!this.hasMounted) {
        return;
      }

      var statusMap = (0, _extends3.default)({}, this.state.statusMap);

      (0, _keys2.default)(statusMap).forEach(function (key) {
        if (statusMap[key].status === INIT) {
          statusMap[key].status = MOUNTED;
        }
      });

      this.setState({ statusMap: statusMap });

      setTimeout(function () {
        return _this4.processEnter();
      }, this.props.enterDuration);
    }
  }, {
    key: 'processEnter',
    value: function processEnter() {
      // console.log('processEnter');

      if (!this.hasMounted) {
        return;
      }

      var statusMap = (0, _extends3.default)({}, this.state.statusMap);

      (0, _keys2.default)(statusMap).forEach(function (key) {
        if (statusMap[key].status === MOUNTED) {
          statusMap[key].status = ANIMATED;
        }
      });

      this.setState({ statusMap: statusMap });
    }
  }, {
    key: 'processLeave',
    value: function processLeave() {
      // console.log('processLeave');

      if (!this.hasMounted) {
        return;
      }

      var statusMap = (0, _extends3.default)({}, this.state.statusMap);
      var children = [].concat((0, _toConsumableArray3.default)(this.state.children));

      (0, _keys2.default)(statusMap).forEach(function (key) {
        if (statusMap[key].status === LEAVING) {
          delete statusMap[key];
          (0, _remove2.default)(children, function (i) {
            return (i.child.key || NO_KEY) === key;
          });
        }
      });

      // console.log('children leave', children);

      this.setState({ statusMap: statusMap, children: children });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var children = this.state.children;


      if (children.length === 0 || children[0] == null) {
        children = null;
      }

      return _react2.default.createElement(
        'span',
        null,
        children && (children.length > 1 ? children.map(function (_ref) {
          var child = _ref.child;
          return _react2.default.cloneElement(child, {
            className: (0, _classnames2.default)('animation', child.props.className, _this5.getClassName(_this5.state.statusMap[child.key || NO_KEY].status))
          });
        })
        // for the case that single child with no key
        : _react2.default.cloneElement(children[0].child, {
          className: (0, _classnames2.default)('animation', children[0].child.props.className, this.getClassName(this.state.statusMap[children[0].child.key || NO_KEY].status))
        }))
      );
    }
  }]);
  return Animate;
}(_react.Component);

Animate.propTypes = propTypes;
Animate.defaultProps = defaultProps;

exports.default = Animate;