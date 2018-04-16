'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('./style/index.scss');

var _Portal = require('../../Portal');

var _Portal2 = _interopRequireDefault(_Portal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  visible: _propTypes2.default.bool,
  children: _propTypes2.default.node,
  className: _propTypes2.default.string
};

var defaultProps = {
  visible: false,
  children: null,
  className: null
};

var SlideDownPopover = function SlideDownPopover(props) {
  return _react2.default.createElement(
    _Portal2.default,
    null,
    _react2.default.createElement(
      'div',
      {
        className: (0, _classnames2.default)('slide-down-popover', props.className, { active: props.visible })
      },
      props.children
    )
  );
};

SlideDownPopover.propTypes = propTypes;
SlideDownPopover.defaultProps = defaultProps;

exports.default = SlideDownPopover;