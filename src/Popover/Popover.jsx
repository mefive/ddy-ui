import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import debounce from 'lodash/debounce';

import './style.scss';

const TOP = 'top';
const BOTTOM = 'bottom';
const LEFT = 'left';
const RIGHT = 'right';

const TOP_LEFT = 'top-left';
const TOP_RIGHT = 'top-right';

const BOTTOM_LEFT = 'bottom-left';
const BOTTOM_RIGHT = 'bottom-right';

const LEFT_TOP = 'left-top';
const LEFT_BOTTOM = 'left-bottom';

const RIGHT_TOP = 'right-top';
const RIGHT_BOTTOM = 'right-bottom';

class Popover extends React.PureComponent {
  static placement = {
    TOP,
    BOTTOM,
    LEFT,
    RIGHT,
    TOP_LEFT,
    TOP_RIGHT,
    BOTTOM_LEFT,
    BOTTOM_RIGHT,
    LEFT_TOP,
    LEFT_BOTTOM,
    RIGHT_TOP,
    RIGHT_BOTTOM,
  };

  static propTypes = {
    className: PropTypes.string,
    placement: PropTypes.string,
    container: PropTypes.instanceOf(Node),
    anchor: PropTypes.instanceOf(Node),
    offset: PropTypes.number,
    children: PropTypes.node,
    style: PropTypes.shape({}),
    hasArrow: PropTypes.bool,
  };

  static defaultProps = {
    className: null,
    container: null,
    anchor: null,
    placement: TOP,
    offset: 0,
    children: null,
    style: {},
    hasArrow: true,
  };

  constructor(props) {
    super(props);

    this.state = {
      style: null,
    };
  }

  componentDidMount() {
    this.hasMounted = true;
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    this.hasMounted = false;
    window.removeEventListener('resize', this.onResize);
  }

  onResize = debounce(() => this.place());

  place = () => {
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

    // offset
    let { offset } = this.props;

    if (this.props.hasArrow) {
      offset += 10;
    }

    const { placement } = this.props;
    const placements = placement.split('-');

    switch (placements[0]) {
      case TOP: {
        marginTop = -offset;
        break;
      }

      case BOTTOM: {
        marginTop = offset;
        break;
      }

      case LEFT: {
        marginLeft = -offset;
        break;
      }

      case RIGHT: {
        marginLeft = offset;
        break;
      }

      default:
        break;
    }

    // placement
    switch (placements[0]) {
      case TOP: {
        top = anchorRect.top - popoverHeight - containerRect.top;
        break;
      }

      case BOTTOM: {
        top = (anchorRect.top + anchorHeight) - containerRect.top;
        break;
      }

      case LEFT: {
        left = anchorRect.left - popoverWidth - containerRect.left;
        break;
      }

      case RIGHT: {
        left = (anchorRect.left + anchorWidth) - containerRect.left;
        break;
      }

      default:
        break;
    }

    // align
    switch (placements[0]) {
      case TOP:
      case BOTTOM: {
        left = (anchorRect.left - containerRect.left) + (0.5 * (anchorWidth - popoverWidth));
        break;
      }

      case LEFT:
      case RIGHT: {
        top = (anchorRect.top - containerRect.top) + (0.5 * (anchorHeight - popoverHeight));
        break;
      }

      default:
        break;
    }

    switch (placements[1]) {
      case LEFT: {
        left -= (0.5 * (anchorWidth - popoverWidth));
        break;
      }

      case RIGHT: {
        left += (0.5 * (anchorWidth - popoverWidth));
        break;
      }

      case TOP: {
        top -= (0.5 * (anchorHeight - popoverHeight));
        break;
      }

      case BOTTOM: {
        top += (0.5 * (anchorHeight - popoverHeight));
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
  };

  render() {
    const placement = this.props.placement.split('-');

    return (
      <div
        className={
          classNames(
            'popover',
            `bs-popover-${placement[0]}`,
            placement[1],
            this.props.className,
          )
        }
        style={{
          ...this.state.style,
          ...this.props.style,
        }}
        ref={(el) => { this.node = el; }}
      >
        <div>
          {this.props.children}

          {this.props.hasArrow && (<div className="arrow" />)}
        </div>
      </div>
    );
  }
}

export default Popover;
