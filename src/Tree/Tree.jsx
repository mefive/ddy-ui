import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Input from '../Input';
import './style/index.scss';
import Clickable from '../Clickable';

const propTypes = {
  checkable: PropTypes.bool,
  checkedKeys: PropTypes.arrayOf(PropTypes.any),
  dataSource: PropTypes.arrayOf(PropTypes.any),
  defaultExpandAll: PropTypes.bool,
  defaultExpandedKeys: PropTypes.arrayOf(PropTypes.any),
  defaultCheckedKeys: PropTypes.arrayOf(PropTypes.any),
  defaultSelectedKey: PropTypes.string,
  expandedKeys: PropTypes.arrayOf(PropTypes.any),
  isProperSubset: PropTypes.bool,
  multiple: PropTypes.bool,
  nodeWrap: PropTypes.shape({}),
  onCheck: PropTypes.func,
  onExpand: PropTypes.func,
  onSelect: PropTypes.func,
  selectedKey: PropTypes.string,
  render: PropTypes.func,
  renderNode: PropTypes.func,
};

const defaultProps = {
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
  onCheck: () => {},
  onExpand: () => {},
  onSelect: () => {},
  render: treeNode => treeNode.title,
};

class Tree extends React.PureComponent {
  constructor(props) {
    super(props);
    this.stretchBranch = this.stretchBranch.bind(this);
    this.getCheckedKeys = this.getCheckedKeys.bind(this);
    this.getExpandedKeys = this.getExpandedKeys.bind(this);
    this.getSelectedKey = this.getSelectedKey.bind(this);
    this.getFixedCheckedKeys = this.getFixedCheckedKeys.bind(this);
    this.getParentNodeByKey = this.getParentNodeByKey.bind(this);
    this.getBrotherKeysByKey = this.getBrotherKeysByKey.bind(this);
    this.key2Node = this.key2Node.bind(this);
    this.keys2Nodes = this.keys2Nodes.bind(this);
    this.checkboxIndeterminate = this.checkboxIndeterminate.bind(this);

    this.state = {
      checkedKeys: this.props.defaultCheckedKeys,
      expandedKeys: this.props.defaultExpandedKeys,
      selectedKey: this.props.defaultSelectedKey,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { dataSource } = nextProps;
    if (nextProps.checkedKeys) {
      this.setState({
        checkedKeys: nextProps.checkedKeys,
        expandedKeys: nextProps.expandedKeys || this.state.expandedKeys,
        selectedKey: nextProps.selectedKey || this.state.selectedKey,
      });
    } else if (dataSource) {
      let checkedKeys = [];
      const checkedKeysSet = new Set(this.getCheckedKeys());
      this.getCheckedKeys()
        .forEach((key) => {
          const { children } = this.key2Node(key, dataSource);

          if (children) {
            checkedKeys = checkedKeys.concat(children.map((e, i) =>
              (checkedKeysSet.has(`${key}-${e.key || i}`) ?
                '' : `${key}-${e.key || i}`))).filter(e => e !== '');
          }
        });
      this.setState({
        checkedKeys: this.state.checkedKeys.concat(checkedKeys),
        expandedKeys: nextProps.expandedKeys || this.state.expandedKeys,
        selectedKey: nextProps.selectedKey || this.state.selectedKey,
      });
    }
  }

  getCheckedKeys() {
    return this.props.checkedKeys || this.state.checkedKeys;
  }

  getExpandedKeys() {
    return this.props.expandedKeys || this.state.expandedKeys;
  }

  getSelectedKey() {
    if (this.props.selectedKey === '') {
      return '';
    }
    return this.props.selectedKey || this.state.selectedKey;
  }

  getFixedCheckedKeys(key, value, treeNode) {
    const keys = this.getCheckedKeys();

    if (value) {
      let checkedKeys = [];
      if (treeNode.children) {
        checkedKeys = keys.concat(key)
          .concat(treeNode.children
            .map((e, i) =>
              this.getFixedCheckedKeys(e.key || `${key}-${i}`, value, e)))
          .join()
          .split(',');
      } else {
        checkedKeys = keys.concat(key);
      }
      if (!this.props.isProperSubset
        && this.getBrotherKeysByKey(key).every(e => checkedKeys.indexOf(e) > -1)
      ) {
        const parent = key.split('-').slice(0, -1).join('-');

        const backtrack = (parentKey, all) => {
          if (parentKey !== '' &&
          this.getBrotherKeysByKey(parentKey).every(e => all.indexOf(e) > -1)) {
            return backtrack(
              parentKey.split('-').slice(0, -1).join('-'),
              all.concat(parentKey.split('-').slice(0, -1).join('-')),
            );
          }
          return all;
        };

        checkedKeys = backtrack(parent, checkedKeys.concat(parent));
      }
      return Array.from(new Set(checkedKeys)).filter(e => e);
    }
    // const childrenReg = new RegExp(`^${key}-`);
    return Array.from(new Set(keys.filter(e => (
      e !== key && !(`${e}`.indexOf(`${key}-`) === 0) && !(`${key}`.indexOf(`${e}-`) === 0)))));
  }

  getParentNodeByKey(key) {
    const parentPath = key.split('-').slice(0, -1);
    return parentPath.reduce((p, s) => p.children[s], {
      children: this.props.dataSource,
    });
  }

  getBrotherKeysByKey(key) {
    const parentPath = key.split('-').slice(0, -1);
    if (parentPath === '') {
      return [key];
    }

    const parentKey = parentPath.join('-');
    const parentNode = parentPath.reduce((p, s) => p.children[s] ||
    p.children.find(e => `${e.key.split('-').pop()}` === `${s}`), {
      children: this.props.dataSource,
    });

    return parentNode.children.map((e, i) => e.key || `${parentKey}-${e.key || i}`);
  }

  key2Node(key, dataSource) {
    return key
      .split('-')
      .reduce((p, s) => (p.key ? p.children.find(e => e.key === s) : p.children[s]), {
        key: (dataSource || this.props.dataSource)[0].key,
        children: dataSource || this.props.dataSource,
      });
  }

  keys2Nodes(keys, dataSource) {
    return keys.map(key =>
      this.key2Node(key, dataSource || this.props.dataSource)).filter(e => !!e);
  }

  checkboxIndeterminate(key) {
    if (this.getCheckedKeys().indexOf(key) < 0) {
      if (this.getCheckedKeys().some(e => `${e}`.indexOf(`${key}-`) === 0)) {
        return {
          indeterminate: 'indeterminate',
        };
      }
    }
    return {};
  }

  stretchBranch(treeNode, preKey, level) {
    const key = treeNode.key || preKey;
    const arrowProperty = {
      className: classNames('icon', 'icon-caret-up', 'arrow-property', {
        'arrow-expanded': this.getExpandedKeys().indexOf(key) > -1,
      }),
    };

    const checkboxProperty = {
      onClick: (e) => {
        e.persist();
        e.stopPropagation();
      },

      onChange: treeNode.readOnly ? () => null : (v) => {
        if (this.getCheckedKeys().indexOf(key) > -1 && !v) {
          this.setState({
            checkedKeys: this.getFixedCheckedKeys(key, v, treeNode),
          }, () => this.props.onCheck(this.state.checkedKeys, {
            checked: v,
            node: treeNode,
            checkedNodes: this.keys2Nodes(this.state.checkedKeys),
          }));
        } else if (!this.getCheckedKeys().indexOf(key) > -1 && v) {
          this.setState({
            checkedKeys: this.getFixedCheckedKeys(key, v, treeNode),
          }, () => this.props.onCheck(this.state.checkedKeys, {
            checked: v,
            node: treeNode,
            checkedNodes: this.keys2Nodes(this.state.checkedKeys),
          }));
        }
      },
      disabled: !!treeNode.readOnly,
      readOnly: !!treeNode.readOnly,
      type: 'checkbox',
      value: this.getCheckedKeys().indexOf(key) > -1 ||
      this.getCheckedKeys().some(e => `${key}`.indexOf(`${e}-`) === 0),
    };

    const nodeProperty = {
      className: classNames('node-property', {
        'selected-node': this.getSelectedKey() === key,
      }),
      // onMouseOver: () => this.setState({
      //   hoverNode: key,
      // }),
      // onMouseLeave: () => this.setState({
      //   hoverNode: '',
      // }),
    };

    const nodeWrapProperty = {
      onClick: (event) => {
        event.persist();
        this.setState({
          selectedKey: this.getSelectedKey() === key ? '' : key,
        }, () => this.props.onSelect(this.state.selectedKey, {
          key,
          node: treeNode,
          selected: !(this.state.selectedKey === ''),
          event,
        }));
      },
    };

    if (treeNode.children) {
      return (
        <li key={key}>
          {
            this.props.renderNode ?
            this.props.renderNode(treeNode, key) : (
              <div
                {...nodeWrapProperty}
                data-level={level}
                className={
                  classNames('node-wrap', {
                    selected: this.getSelectedKey() === key,
                  })
                }
              >
                <Clickable
                  onClick={(event) => {
                    event.persist();
                    event.stopPropagation();
                    const set = new Set(this.getExpandedKeys());
                    if (set.has(key)) {
                      set.delete(key);
                    } else {
                      set.add(key);
                    }
                    this.setState({
                      expandedKeys: Array.from(set),
                    }, () => this.props.onExpand(this.state.expandedKeys, {
                      node: treeNode,
                      expanded: set.has(key),
                      expandedNodes: this.keys2Nodes(this.state.expandedKeys),
                      event,
                    }));
                  }}
                >
                  <i {...arrowProperty} />
                </Clickable>
                {this.props.checkable && (
                  <Input
                    {...checkboxProperty}
                    {...this.checkboxIndeterminate(key)}
                  />
                )}
                <div {...nodeProperty}>
                  {this.props.render(treeNode, key)}
                </div>
              </div>
            )
          }
          {
            this.getExpandedKeys().indexOf(key) > -1 && (
              <ul
                className="parent-node"
              >
                {treeNode.children.map((e, i) =>
                  this.stretchBranch(e, `${key}-${i}`, level + 1))}
              </ul>)
          }
        </li>
      );
    }
    return (
      <li key={key}>
        {this.props.renderNode ?
          this.props.renderNode(treeNode, key) : (
            <div
              {...nodeWrapProperty}
              data-level={level}
              className={
                classNames('node-wrap', {
                  selected: this.getSelectedKey() === key,
                })
              }
            >
              <i
                className="icon empty-icon"
              />
              {this.props.checkable && (
                <Input
                  {...checkboxProperty}
                  {...this.checkboxIndeterminate(key)}
                />
              )}
              <div
                {...nodeProperty}
              >
                {this.props.render(treeNode, key)}
              </div>
            </div>
          )}
      </li>
    );
  }

  render() {
    const { dataSource } = this.props;

    return (
      <ul className="tree">
        {dataSource.map((e, i) => this.stretchBranch(e, `${i}`, 0))}
      </ul>
    );
  }
}

Tree.propTypes = propTypes;
Tree.defaultProps = defaultProps;

export default Tree;
