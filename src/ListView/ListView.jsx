import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import scrollTop from 'dom-helpers/query/scrollTop';
import throttle from 'lodash/throttle';

import style from './style.scss';
import FlexWrapper from '../FlexWrapper/FlexWrapper';
import Loading from '../Loading/Loading';

class ListView extends React.PureComponent {
  static propTypes = {
    dataSource: PropTypes.arrayOf(PropTypes.any),
    renderRow: PropTypes.func,
    renderFooter: PropTypes.func,
    renderNoData: PropTypes.func,
    className: PropTypes.string,
    onEndReached: PropTypes.func,
    onEndReachedThreshold: PropTypes.number,
    useBodyScroll: PropTypes.bool,
    noData: PropTypes.bool,
  };

  static defaultProps = {
    dataSource: [],
    renderRow: () => null,
    renderFooter: () => null,
    className: null,
    onEndReached: () => {},
    onEndReachedThreshold: 1,
    useBodyScroll: false,
    renderNoData: null,
    noData: false,
  };

  componentDidMount() {
    if (this.props.useBodyScroll) {
      window.addEventListener('scroll', this.onScroll);
    }
  }

  componentWillUnmount() {
    if (this.props.useBodyScroll) {
      window.removeEventListener('scroll', this.onScroll);
    }
  }

  onScroll = throttle(() => {
    const top = scrollTop(this.props.useBodyScroll ? window : this.container);

    const diff = this.props.useBodyScroll
      ? document.body.clientHeight - (window.innerHeight + top)
      : this.container.scrollHeight - (this.container.clientHeight + top);

    if (diff < this.props.onEndReachedThreshold
    ) {
      this.props.onEndReached();
    }
  });

  scrollTop(value) {
    if (this.props.useBodyScroll) {
      scrollTop(window, value);
    } else {
      scrollTop(this.container, value);
    }
  }

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
        {this.props.dataSource.map((item, index) => item && this.props.renderRow(item, index))}

        {this.props.noData && (this.props.renderNoData != null ? this.props.renderNoData() : (
          <FlexWrapper className="position-relative">
            <Loading>没有数据</Loading>
          </FlexWrapper>
        ))}

        {this.props.renderFooter()}
      </div>
    );
  }
}

export default ListView;
