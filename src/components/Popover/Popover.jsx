import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import debounce from 'lodash/debounce';

import './style/index.scss';

const propTypes = {
  className: PropTypes.string,
  placement: PropTypes.string,
  container: PropTypes.instanceOf(Node),
  anchor: PropTypes.instanceOf(Node),
  offset: PropTypes.number,
  children: PropTypes.node,
  style: PropTypes.shape({}),
};

const defaultProps = {
  className: null,
  container: null,
  anchor: null,
  placement: 'top',
  offset: 10,
  children: null,
  style: {},
};

const placement = {
  TOP: 'top',
  TOP_RIGHT: 'top-right',
  TOP_LEFT: 'top-left',
  BOTTOM: 'bottom',
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_RIGHT: 'bottom-right',
  RIGHT: 'right',
  RIGHT_TOP: 'right-top',
  LEFT: 'left',
};

class Popover extends Component {
  constructor(props) {
    super(props);

    this.state = {
      style: null,
    };

    this.onResize = debounce(this.onResize.bind(this));
    this.place = this.place.bind(this);
  }

  componentDidMount() {
    this.hasMounted = true;
    window.addEventListener('resize', this.onResize);
    this.place();
  }

  componentDidUpdate({ container, anchor }) {
    if (container !== this.props.container
      || anchor !== this.props.anchor
    ) {
      this.place();
    }
  }

  componentWillUnmount() {
    this.hasMounted = false;
    window.removeEventListener('resize', this.onResize);
  }

  onResize() {
    this.place();
  }

  place() {
    if (!this.hasMounted || this.props.container == null || this.props.anchor == null) {
      return;
    }

    const containerRect = this.props.container.getBoundingClientRect();

    const anchorRect = this.props.anchor.getBoundingClientRect();
    const anchorHeight = anchorRect.height;
    const anchorWidth = anchorRect.width;

    const popoverRect = this.node.getBoundingClientRect();
    const popoverHeight = popoverRect.height;
    const popoverWidth = popoverRect.width;

    let left = 0;
    let top = 0;
    let marginLeft = 0;
    let marginTop = 0;

    switch (this.props.placement) {
      case placement.TOP: {
        left = (anchorRect.left + (anchorWidth / 2)) - containerRect.left;
        marginLeft = -(popoverWidth / 2);
        marginTop = -this.props.offset;
        top = anchorRect.top - popoverHeight - 0 - containerRect.top;
        break;
      }

      case placement.TOP_RIGHT: {
        left = (anchorRect.left + anchorWidth) - popoverWidth - containerRect.left;
        marginTop = -this.props.offset;
        top = anchorRect.top - popoverHeight - containerRect.top;
        break;
      }

      case placement.TOP_LEFT: {
        left = anchorRect.left - containerRect.left;
        marginTop = -this.props.offset;
        top = anchorRect.top - popoverHeight - containerRect.top;
        break;
      }

      case placement.BOTTOM: {
        left = (anchorRect.left + (anchorWidth / 2)) - containerRect.left;
        marginLeft = -(popoverWidth / 2);
        marginTop = this.props.offset;
        top = (anchorRect.top + anchorHeight) - containerRect.top;
        break;
      }

      case placement.BOTTOM_LEFT: {
        left = anchorRect.left - containerRect.left;
        marginTop = this.props.offset;
        top = (anchorRect.top + anchorHeight) - containerRect.top;
        break;
      }

      case placement.BOTTOM_RIGHT: {
        left = (anchorRect.left + anchorWidth) - popoverWidth - containerRect.left;
        marginTop = this.props.offset;
        top = (anchorRect.top + anchorHeight) - containerRect.top;
        break;
      }

      case placement.RIGHT: {
        left = anchorRect.left + anchorWidth + this.props.offset;
        marginLeft = 0;
        marginTop = 0;
        top = (anchorRect.top - containerRect.top - (popoverHeight / 2)) + (anchorHeight / 2);
        break;
      }

      case placement.RIGHT_TOP: {
        left = (anchorRect.left + anchorWidth + this.props.offset) - containerRect.left;
        marginLeft = 0;
        marginTop = 0;
        top = anchorRect.top - containerRect.top;
        break;
      }

      case placement.LEFT: {
        left = anchorRect.left - this.props.offset - popoverWidth - containerRect.left;
        marginLeft = 0;
        marginTop = 0;
        top = (anchorRect.top - containerRect.top - (popoverHeight / 2)) + (anchorHeight / 2);
        break;
      }

      default:
        break;
    }

    if (this.props.container !== document.body) {
      top += this.props.container.scrollTop;
      left += this.props.container.scrollLeft;
    }

    if (!Number.isNaN(left)
      && !Number.isNaN(top)
      && !Number.isNaN(marginLeft)
      && !Number.isNaN(marginTop)
    ) {
      this.setState({
        style: {
          left, top, marginLeft, marginTop,
        },
      });
    } else {
      console.log('error', this.props.container, this.props.anchor);
    }
  }

  render() {
    return (
      <div
        className={
          classNames(
            'popover',
            `place-${this.props.placement}`,
            { [this.props.className]: this.props.className != null },
          )
        }
        style={{
          ...this.state.style,
          zIndex: 2,
          ...this.props.style,
        }}
        ref={(el) => { this.node = el; }}
      >
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

Popover.placement = placement;
Popover.propTypes = propTypes;
Popover.defaultProps = defaultProps;

export default Popover;
