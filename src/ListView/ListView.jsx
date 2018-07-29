import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import getScrollTop from 'dom-helpers/query/scrollTop';
import throttle from 'lodash/throttle';

import style from './style.scss';

class ListView extends React.PureComponent {
  static propTypes = {
    dataSource: PropTypes.arrayOf(PropTypes.any),
    renderRow: PropTypes.func,
    renderFooter: PropTypes.func,
    className: PropTypes.string,
    onEndReached: PropTypes.func,
    onEndReachedThreshold: PropTypes.number,
    useBodyScroll: PropTypes.bool,
  };

  static defaultProps = {
    dataSource: [],
    renderRow: () => null,
    renderFooter: () => null,
    className: null,
    onEndReached: () => {},
    onEndReachedThreshold: 1,
    useBodyScroll: false,
  };

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  onScroll = throttle(() => {
    const scrollTop = getScrollTop(this.props.useBodyScroll ? window : this.container);

    const diff = this.props.useBodyScroll
      ? document.body.clientHeight - (window.innerHeight + scrollTop)
      : this.container.scrollHeight - (this.container.clientHeight + scrollTop);

    if (diff < this.props.onEndReachedThreshold
    ) {
      this.props.onEndReached();
    }
  });

  render() {
    return (
      <div
        className={classNames(
          this.props.className,
          style.container,
          { scrollable: !this.props.useBodyScroll },
        )}
        ref={(el) => { this.container = el; }}
        onScroll={!this.props.useBodyScroll ? this.onScroll : null}
      >
        {this.props.dataSource.map((item, index) => this.props.renderRow(item, index))}

        {this.props.renderFooter()}
      </div>
    );
  }
}

export default ListView;
