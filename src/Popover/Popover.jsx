import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import debounce from 'lodash/debounce';

import './style/index.scss';

const PLACEMENT_TOP = 'top';
const PLACEMENT_TOP_ALIGN = 'top-align';
const PLACEMENT_BOTTOM = 'bottom';
const PLACEMENT_BOTTOM_ALIGN = 'bottom-align';
const PLACEMENT_LEFT = 'left';
const PLACEMENT_LEFT_ALIGN = 'left-align';
const PLACEMENT_RIGHT = 'right';
const PLACEMENT_RIGHT_ALIGN = 'right-align';
const PLACEMENT_CENTER = 'center';

const propTypes = {
  className: PropTypes.string,
  placement: PropTypes.shape({
    vertical: PropTypes.string,
    horizontal: PropTypes.string,
  }),
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
  placement: {
    vertical: PLACEMENT_TOP,
    horizontal: PLACEMENT_CENTER,
  },
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

  // getPlacement() {
  //   let { placement } = this.props;
  //
  //   if (this.node == null) {
  //     return placement;
  //   }
  //
  //
  // }

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

    switch (this.props.placement.vertical) {
      case PLACEMENT_TOP: {
        marginTop = -this.props.offset;
        top = anchorRect.top - popoverHeight - containerRect.top;
        break;
      }

      case PLACEMENT_TOP_ALIGN: {
        marginTop = 0;
        top = anchorRect.top - containerRect.top;
        break;
      }

      case PLACEMENT_BOTTOM: {
        marginTop = this.props.offset;
        top = (anchorRect.top + anchorHeight) - containerRect.top;
        break;
      }

      case PLACEMENT_BOTTOM_ALIGN: {
        marginTop = this.props.offset;
        top = (anchorRect.top + anchorHeight) - containerRect.top;
        break;
      }

      case PLACEMENT_CENTER: {
        marginTop = 0;
        top = (anchorRect.top - containerRect.top - (popoverHeight / 2)) + (anchorHeight / 2);
        break;
      }

      default:
        break;
    }

    switch (this.props.placement.horizontal) {
      case PLACEMENT_LEFT: {
        left = anchorRect.left - this.props.offset - popoverWidth - containerRect.left;
        marginLeft = 0;
        break;
      }

      case PLACEMENT_LEFT_ALIGN: {
        left = anchorRect.left - containerRect.left;
        marginLeft = 0;
        break;
      }

      case PLACEMENT_RIGHT: {
        left = anchorRect.left + anchorWidth + this.props.offset;
        marginLeft = 0;
        break;
      }

      case PLACEMENT_RIGHT_ALIGN: {
        left = (anchorRect.left + anchorWidth) - popoverWidth - containerRect.left;
        marginLeft = 0;
        break;
      }

      case PLACEMENT_CENTER: {
        left = (anchorRect.left + (anchorWidth / 2)) - containerRect.left;
        marginLeft = -(popoverWidth / 2);
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
            `place-${this.props.placement.vertical}`,
            `place-${this.props.placement.horizontal}`,
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

Popover.PLACEMENT_TOP = PLACEMENT_TOP;
Popover.PLACEMENT_TOP_ALIGN = PLACEMENT_TOP_ALIGN;
Popover.PLACEMENT_BOTTOM = PLACEMENT_BOTTOM;
Popover.PLACEMENT_BOTTOM_ALIGN = PLACEMENT_BOTTOM_ALIGN;
Popover.PLACEMENT_LEFT = PLACEMENT_LEFT;
Popover.PLACEMENT_LEFT_ALIGN = PLACEMENT_LEFT_ALIGN;
Popover.PLACEMENT_RIGHT = PLACEMENT_RIGHT;
Popover.PLACEMENT_RIGHT_ALIGN = PLACEMENT_RIGHT_ALIGN;
Popover.PLACEMENT_CENTER = PLACEMENT_CENTER;

Popover.propTypes = propTypes;
Popover.defaultProps = defaultProps;

export default Popover;
