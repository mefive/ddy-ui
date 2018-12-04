import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import SidePopover from '../SidePopover';

import style from './style/index.scss';
import Clickable from '../../Clickable';

const propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  dataSource: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    group: PropTypes.string,
  })).isRequired,
  groupList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.any.isRequired,
  })),
  offset: PropTypes.number,
  onClick: PropTypes.func,
  renderItem: PropTypes.func,
};

const defaultProps = {
  groupList: null,
  offset: 0,
  onClick: null,
  renderItem: null,
};

class SideNav extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      // expandedIds: this.props.groupList == null
      //   ? [] : [this.props.groupList[0].id],
      expandedIds: [],
    };
  }

  getDataSource() {
    if (this.props.groupList == null) {
      return this.props.dataSource;
    }

    return this.props.groupList.map(group => ({
      group,
      children: this.props.dataSource.filter(data => data.groupId === group.id),
    }));
  }

  renderItems(dataSource) {
    return dataSource.map((data, index) => (
      <div className="side-nav-item" key={`${index + 1}`}>
        <Clickable
          onClick={() => {
            if (this.props.onClick != null) {
              this.props.onClick(data);
            } else {
              const target = document.querySelector(`#${data.id}`);
              if (target) {
                window.scrollTo(0, (target.offsetTop || 0) - this.props.offset);
                this.props.onClose();
              }
            }
          }}
        >
          <div
            className={classNames(
              'ellipsis',
              { 'pl-2': this.props.groupList != null },
            )}
          >
            {this.props.renderItem != null ? this.props.renderItem(data, index) : data.name}
          </div>
        </Clickable>
      </div>
    ));
  }

  renderGroups(dataSource) {
    return dataSource
      .filter(({ children }) => children.length > 0)
      .map(({ group, children }, index) => (
        <div
          className={classNames(
            'side-nav-group',
            { expanded: this.state.expandedIds.indexOf(group.id) !== -1 },
          )}
          key={`${index + 1}`}
        >
          <div
            className="side-nav-group-name ellipsis"
            onClick={() => {
              const expandedIdsSet = new Set(this.state.expandedIds);

              if (expandedIdsSet.has(group.id)) {
                expandedIdsSet.delete(group.id);
              } else {
                expandedIdsSet.add(group.id);
              }

              this.setState({ expandedIds: Array.from(expandedIdsSet) });
            }}
            aria-hidden
          >
            <i className="icon icon-caret-up" />
            {group.name}
          </div>
          <div className="side-nav-group-children">
            {this.renderItems(children)}
          </div>
        </div>
      ));
  }

  render() {
    const dataSource = this.getDataSource();

    return (
      <SidePopover
        visible={this.props.visible}
        onClose={this.props.onClose}
      >
        <div className="pl-0 pr-0">
          <div className={style['side-nav']}>
            {this.props.groupList == null
              ? this.renderItems(dataSource)
              : this.renderGroups(dataSource)
            }
          </div>
        </div>
      </SidePopover>
    );
  }
}

SideNav.propTypes = propTypes;
SideNav.defaultProps = defaultProps;

export default SideNav;
