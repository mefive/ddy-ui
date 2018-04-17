'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

require('./style/index.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  checkable: _propTypes2.default.bool,
  checkedKeys: _propTypes2.default.arrayOf(_propTypes2.default.any),
  dataSource: _propTypes2.default.arrayOf(_propTypes2.default.any),
  defaultExpandAll: _propTypes2.default.bool,
  defaultExpandedKeys: _propTypes2.default.arrayOf(_propTypes2.default.any),
  defaultCheckedKeys: _propTypes2.default.arrayOf(_propTypes2.default.any),
  defaultSelectedKey: _propTypes2.default.string,
  expandedKeys: _propTypes2.default.arrayOf(_propTypes2.default.any),
  isProperSubset: _propTypes2.default.bool,
  multiple: _propTypes2.default.bool,
  nodeWrap: _propTypes2.default.shape({}),
  onCheck: _propTypes2.default.func,
  onExpand: _propTypes2.default.func,
  onSelect: _propTypes2.default.func,
  selectedKey: _propTypes2.default.string,
  render: _propTypes2.default.func,
  renderNode: _propTypes2.default.func
};

var defaultProps = {
  checkable: true,
  dataSource: [],
  checkedKeys: [],
  expandedKeys: [],
  selectedKey: [],
  renderNode: null,
  defaultExpandAll: false,
  defaultExpandedKeys: [],
  defaultCheckedKeys: [],
  defaultSelectedKey: '',
  isProperSubset: false,
  multiple: false,
  nodeWrap: {},
  onCheck: function onCheck(k, n) {
    return console.log('onCheck', k, n);
  },
  onExpand: function onExpand(k, n) {
    return console.log('onExpand', k, n);
  },
  onSelect: function onSelect(k, n) {
    return console.log('onSelect', k, n);
  },
  render: function render(treeNode) {
    return treeNode.title;
  }
};

var Tree = function (_React$Component) {
  (0, _inherits3.default)(Tree, _React$Component);

  function Tree(props) {
    (0, _classCallCheck3.default)(this, Tree);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Tree.__proto__ || (0, _getPrototypeOf2.default)(Tree)).call(this, props));

    _this.stretchBranch = _this.stretchBranch.bind(_this);
    _this.getCheckedKeys = _this.getCheckedKeys.bind(_this);
    _this.getExpandedKeys = _this.getExpandedKeys.bind(_this);
    _this.getSelectedKey = _this.getSelectedKey.bind(_this);
    _this.getFixedCheckedKeys = _this.getFixedCheckedKeys.bind(_this);
    _this.getParentNodeByKey = _this.getParentNodeByKey.bind(_this);
    _this.getBrotherKeysByKey = _this.getBrotherKeysByKey.bind(_this);
    _this.key2Node = _this.key2Node.bind(_this);
    _this.keys2Nodes = _this.keys2Nodes.bind(_this);
    _this.checkboxIndeterminate = _this.checkboxIndeterminate.bind(_this);

    _this.state = {
      checkedKeys: _this.props.defaultCheckedKeys,
      expandedKeys: _this.props.defaultExpandedKeys,
      selectedKey: _this.props.defaultSelectedKey
    };
    return _this;
  }

  (0, _createClass3.default)(Tree, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      var dataSource = nextProps.dataSource;

      if (nextProps.checkedKeys) {
        this.setState({
          checkedKeys: nextProps.checkedKeys,
          expandedKeys: nextProps.expandedKeys || this.state.expandedKeys,
          selectedKey: nextProps.selectedKey || this.state.selectedKey
        });
      } else if (dataSource) {
        var checkedKeys = [];
        var checkedKeysSet = new _set2.default(this.getCheckedKeys());
        this.getCheckedKeys().forEach(function (key) {
          var _key2Node = _this2.key2Node(key, dataSource),
              children = _key2Node.children;

          if (children) {
            checkedKeys = checkedKeys.concat(children.map(function (e, i) {
              return checkedKeysSet.has(key + '-' + (e.key || i)) ? '' : key + '-' + (e.key || i);
            })).filter(function (e) {
              return e !== '';
            });
          }
        });
        this.setState({
          checkedKeys: this.state.checkedKeys.concat(checkedKeys),
          expandedKeys: nextProps.expandedKeys || this.state.expandedKeys,
          selectedKey: nextProps.selectedKey || this.state.selectedKey
        });
      }
    }
  }, {
    key: 'getCheckedKeys',
    value: function getCheckedKeys() {
      return this.props.checkedKeys || this.state.checkedKeys;
    }
  }, {
    key: 'getExpandedKeys',
    value: function getExpandedKeys() {
      return this.props.expandedKeys || this.state.expandedKeys;
    }
  }, {
    key: 'getSelectedKey',
    value: function getSelectedKey() {
      if (this.props.selectedKey === '') {
        return '';
      }
      return this.props.selectedKey || this.state.selectedKey;
    }
  }, {
    key: 'getFixedCheckedKeys',
    value: function getFixedCheckedKeys(key, value, treeNode) {
      var _this3 = this;

      var keys = this.getCheckedKeys();

      if (value) {
        var checkedKeys = [];
        if (treeNode.children) {
          checkedKeys = keys.concat(key).concat(treeNode.children.map(function (e, i) {
            return _this3.getFixedCheckedKeys(e.key || key + '-' + i, value, e);
          })).join().split(',');
        } else {
          checkedKeys = keys.concat(key);
        }
        if (!this.props.isProperSubset && this.getBrotherKeysByKey(key).every(function (e) {
          return checkedKeys.indexOf(e) > -1;
        })) {
          var parent = key.split('-').slice(0, -1).join('-');

          var backtrack = function backtrack(parentKey, all) {
            if (parentKey !== '' && _this3.getBrotherKeysByKey(parentKey).every(function (e) {
              return all.indexOf(e) > -1;
            })) {
              return backtrack(parentKey.split('-').slice(0, -1).join('-'), all.concat(parentKey.split('-').slice(0, -1).join('-')));
            }
            return all;
          };

          checkedKeys = backtrack(parent, checkedKeys.concat(parent));
        }
        return (0, _from2.default)(new _set2.default(checkedKeys)).filter(function (e) {
          return e;
        });
      }
      // const childrenReg = new RegExp(`^${key}-`);
      return (0, _from2.default)(new _set2.default(keys.filter(function (e) {
        return e !== key && !(('' + e).indexOf(key + '-') === 0) && !(('' + key).indexOf(e + '-') === 0);
      })));
    }
  }, {
    key: 'getParentNodeByKey',
    value: function getParentNodeByKey(key) {
      var parentPath = key.split('-').slice(0, -1);
      return parentPath.reduce(function (p, s) {
        return p.children[s];
      }, {
        children: this.props.dataSource
      });
    }
  }, {
    key: 'getBrotherKeysByKey',
    value: function getBrotherKeysByKey(key) {
      var parentPath = key.split('-').slice(0, -1);
      if (parentPath === '') {
        return [key];
      }

      var parentKey = parentPath.join('-');
      var parentNode = parentPath.reduce(function (p, s) {
        return p.children[s] || p.children.find(function (e) {
          return '' + e.key.split('-').pop() === '' + s;
        });
      }, {
        children: this.props.dataSource
      });

      return parentNode.children.map(function (e, i) {
        return e.key || parentKey + '-' + (e.key || i);
      });
    }
  }, {
    key: 'key2Node',
    value: function key2Node(key, dataSource) {
      return key.split('-').reduce(function (p, s) {
        return p.key ? p.children.find(function (e) {
          return e.key === s;
        }) : p.children[s];
      }, {
        key: (dataSource || this.props.dataSource)[0].key,
        children: dataSource || this.props.dataSource
      });
    }
  }, {
    key: 'keys2Nodes',
    value: function keys2Nodes(keys, dataSource) {
      var _this4 = this;

      return keys.map(function (key) {
        return _this4.key2Node(key, dataSource || _this4.props.dataSource);
      }).filter(function (e) {
        return !!e;
      });
    }
  }, {
    key: 'checkboxIndeterminate',
    value: function checkboxIndeterminate(key) {
      if (this.getCheckedKeys().indexOf(key) < 0) {
        if (this.getCheckedKeys().some(function (e) {
          return ('' + e).indexOf(key + '-') === 0;
        })) {
          return {
            indeterminate: 'indeterminate'
          };
        }
      }
      return {};
    }
  }, {
    key: 'stretchBranch',
    value: function stretchBranch(treeNode, preKey, level) {
      var _this5 = this;

      var key = treeNode.key || preKey;
      var arrowProperty = {
        className: (0, _classnames2.default)('icon', 'icon-caret-up', 'arrow-property', {
          'arrow-expanded': this.getExpandedKeys().indexOf(key) > -1
        })
      };

      var checkboxProperty = {
        onClick: function onClick(e) {
          e.persist();
          e.stopPropagation();
        },

        onChange: treeNode.readOnly ? function () {
          return null;
        } : function (v) {
          if (_this5.getCheckedKeys().indexOf(key) > -1 && !v) {
            _this5.setState({
              checkedKeys: _this5.getFixedCheckedKeys(key, v, treeNode)
            }, function () {
              return _this5.props.onCheck(_this5.state.checkedKeys, {
                checked: v,
                node: treeNode,
                checkedNodes: _this5.keys2Nodes(_this5.state.checkedKeys)
              });
            });
          } else if (!_this5.getCheckedKeys().indexOf(key) > -1 && v) {
            _this5.setState({
              checkedKeys: _this5.getFixedCheckedKeys(key, v, treeNode)
            }, function () {
              return _this5.props.onCheck(_this5.state.checkedKeys, {
                checked: v,
                node: treeNode,
                checkedNodes: _this5.keys2Nodes(_this5.state.checkedKeys)
              });
            });
          }
        },
        disabled: !!treeNode.readOnly,
        readOnly: !!treeNode.readOnly,
        type: 'checkbox',
        value: this.getCheckedKeys().indexOf(key) > -1 || this.getCheckedKeys().some(function (e) {
          return ('' + key).indexOf(e + '-') === 0;
        })
      };

      var nodeProperty = {
        className: (0, _classnames2.default)('node-property', {
          'selected-node': this.getSelectedKey() === key
        })
        // onMouseOver: () => this.setState({
        //   hoverNode: key,
        // }),
        // onMouseLeave: () => this.setState({
        //   hoverNode: '',
        // }),
      };

      var nodeWrapProperty = {
        onClick: function onClick(event) {
          event.persist();
          _this5.setState({
            selectedKey: _this5.getSelectedKey() === key ? '' : key
          }, function () {
            return _this5.props.onSelect(_this5.state.selectedKey, {
              key: key,
              node: treeNode,
              selected: !(_this5.state.selectedKey === ''),
              event: event
            });
          });
        }
      };

      if (treeNode.children) {
        return _react2.default.createElement(
          'li',
          { key: key },
          this.props.renderNode ? this.props.renderNode(treeNode, key) : _react2.default.createElement(
            'div',
            (0, _extends3.default)({}, nodeWrapProperty, {
              'data-level': level,
              className: (0, _classnames2.default)('node-wrap', {
                selected: this.getSelectedKey() === key
              })
            }),
            _react2.default.createElement('i', (0, _extends3.default)({}, arrowProperty, {
              'aria-hidden': true,
              onClick: function onClick(event) {
                event.persist();
                event.stopPropagation();
                var set = new _set2.default(_this5.getExpandedKeys());
                if (set.has(key)) {
                  set.delete(key);
                } else {
                  set.add(key);
                }
                _this5.setState({
                  expandedKeys: (0, _from2.default)(set)
                }, function () {
                  return _this5.props.onExpand(_this5.state.expandedKeys, {
                    node: treeNode,
                    expanded: set.has(key),
                    expandedNodes: _this5.keys2Nodes(_this5.state.expandedKeys),
                    event: event
                  });
                });
              }
            })),
            this.props.checkable && _react2.default.createElement(_Input2.default, (0, _extends3.default)({}, checkboxProperty, this.checkboxIndeterminate(key))),
            _react2.default.createElement(
              'div',
              nodeProperty,
              this.props.render(treeNode, key)
            )
          ),
          this.getExpandedKeys().indexOf(key) > -1 && _react2.default.createElement(
            'ul',
            {
              className: 'parent-node'
            },
            treeNode.children.map(function (e, i) {
              return _this5.stretchBranch(e, key + '-' + i, level + 1);
            })
          )
        );
      }
      return _react2.default.createElement(
        'li',
        { key: key },
        this.props.renderNode ? this.props.renderNode(treeNode, key) : _react2.default.createElement(
          'div',
          (0, _extends3.default)({}, nodeWrapProperty, {
            'data-level': level,
            className: (0, _classnames2.default)('node-wrap', {
              selected: this.getSelectedKey() === key
            })
          }),
          _react2.default.createElement('i', {
            className: 'icon empty-icon'
          }),
          this.props.checkable && _react2.default.createElement(_Input2.default, (0, _extends3.default)({}, checkboxProperty, this.checkboxIndeterminate(key))),
          _react2.default.createElement(
            'div',
            nodeProperty,
            this.props.render(treeNode, key)
          )
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this6 = this;

      var dataSource = this.props.dataSource;


      return _react2.default.createElement(
        'ul',
        { className: 'tree' },
        dataSource.map(function (e, i) {
          return _this6.stretchBranch(e, '' + i, 0);
        })
      );
    }
  }]);
  return Tree;
}(_react2.default.Component);

Tree.propTypes = propTypes;
Tree.defaultProps = defaultProps;

exports.default = Tree;