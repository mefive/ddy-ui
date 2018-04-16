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

var _SidePopover = require('../SidePopover');

var _SidePopover2 = _interopRequireDefault(_SidePopover);

var _index = require('./style/index.scss');

var _index2 = _interopRequireDefault(_index);

var _Clickable = require('../../Clickable');

var _Clickable2 = _interopRequireDefault(_Clickable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  visible: _propTypes2.default.bool.isRequired,
  onClose: _propTypes2.default.func.isRequired,
  dataSource: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    id: _propTypes2.default.string,
    name: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
    group: _propTypes2.default.string
  })).isRequired,
  groupList: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    name: _propTypes2.default.string.isRequired,
    id: _propTypes2.default.any.isRequired
  })),
  offset: _propTypes2.default.number,
  onClick: _propTypes2.default.func,
  renderItem: _propTypes2.default.func
};

var defaultProps = {
  groupList: null,
  offset: 0,
  onClick: null,
  renderItem: null
};

var SideNav = function (_React$PureComponent) {
  (0, _inherits3.default)(SideNav, _React$PureComponent);

  function SideNav(props) {
    (0, _classCallCheck3.default)(this, SideNav);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SideNav.__proto__ || (0, _getPrototypeOf2.default)(SideNav)).call(this, props));

    _this.state = {
      // expandedIds: this.props.groupList == null
      //   ? [] : [this.props.groupList[0].id],
      expandedIds: []
    };
    return _this;
  }

  (0, _createClass3.default)(SideNav, [{
    key: 'getDataSource',
    value: function getDataSource() {
      var _this2 = this;

      if (this.props.groupList == null) {
        return this.props.dataSource;
      }

      return this.props.groupList.map(function (group) {
        return {
          group: group,
          children: _this2.props.dataSource.filter(function (data) {
            return data.groupId === group.id;
          })
        };
      });
    }
  }, {
    key: 'renderItems',
    value: function renderItems(dataSource) {
      var _this3 = this;

      return dataSource.map(function (data, index) {
        return _react2.default.createElement(
          'div',
          { className: 'side-nav-item', key: '' + (index + 1) },
          _react2.default.createElement(
            _Clickable2.default,
            {
              onClick: function onClick() {
                if (_this3.props.onClick != null) {
                  _this3.props.onClick(data);
                } else {
                  var target = document.querySelector('#' + data.id);
                  if (target) {
                    window.scrollTo(0, (target.offsetTop || 0) - _this3.props.offset);
                    _this3.props.onClose();
                  }
                }
              }
            },
            _react2.default.createElement(
              'div',
              {
                className: (0, _classnames2.default)('ellipsis', { 'pl-2': _this3.props.groupList != null })
              },
              _this3.props.renderItem != null ? _this3.props.renderItem(data, index) : data.name
            )
          )
        );
      });
    }
  }, {
    key: 'renderGroups',
    value: function renderGroups(dataSource) {
      var _this4 = this;

      return dataSource.filter(function (_ref) {
        var children = _ref.children;
        return children.length > 0;
      }).map(function (_ref2, index) {
        var group = _ref2.group,
            children = _ref2.children;
        return _react2.default.createElement(
          'div',
          {
            className: (0, _classnames2.default)('side-nav-group', { expanded: _this4.state.expandedIds.indexOf(group.id) !== -1 }),
            key: '' + (index + 1)
          },
          _react2.default.createElement(
            'div',
            {
              className: 'side-nav-group-name ellipsis',
              onClick: function onClick() {
                var expandedIdsSet = new _set2.default(_this4.state.expandedIds);

                if (expandedIdsSet.has(group.id)) {
                  expandedIdsSet.delete(group.id);
                } else {
                  expandedIdsSet.add(group.id);
                }

                _this4.setState({ expandedIds: (0, _from2.default)(expandedIdsSet) });
              },
              'aria-hidden': true
            },
            _react2.default.createElement('i', { className: 'icon icon-caret-up' }),
            group.name
          ),
          _react2.default.createElement(
            'div',
            { className: 'side-nav-group-children' },
            _this4.renderItems(children)
          )
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var dataSource = this.getDataSource();

      return _react2.default.createElement(
        _SidePopover2.default,
        {
          visible: this.props.visible,
          onClose: this.props.onClose
        },
        _react2.default.createElement(
          'div',
          { className: 'pl-0 pr-0' },
          _react2.default.createElement(
            'div',
            { className: _index2.default['side-nav'] },
            this.props.groupList == null ? this.renderItems(dataSource) : this.renderGroups(dataSource)
          )
        )
      );
    }
  }]);
  return SideNav;
}(_react2.default.PureComponent);

SideNav.propTypes = propTypes;
SideNav.defaultProps = defaultProps;

exports.default = SideNav;