import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import scrollTop from 'dom-helpers/query/scrollTop';

import './style/index.scss';
import Ghost from './Ghost';

const propTypes = {
  children: PropTypes.node,
  onChange: PropTypes.func.isRequired,
};

const defaultProps = {
  children: null,
};

const SCROLL_DIRECTION_DOWN = 'down';
const SCROLL_DIRECTION_UP = 'up';

class Sortable extends React.PureComponent {
  constructor(props) {
    super(props);

    this.nodes = [];
    this.newIndex = null;

    this.state = {
      draggingIndex: null,
      ghostStyle: null,
    };

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.updatePositions = this.updatePositions.bind(this);
    this.scroll = this.scroll.bind(this);
  }

  componentWillUnmount() {
    window.removeEventListener('mouseup', this.onMouseUp);
    window.removeEventListener('mousemove', this.onMouseMove);
    this.clearScrollTimer();
  }

  onMouseDown(e, index) {
    const { clientX, clientY } = e;
    const { top, left } = e.target.getBoundingClientRect();
    const width = e.target.clientWidth;
    const height = e.target.clientHeight;

    this.setState({
      draggingIndex: index,
      ghostStyle: {
        top, left, width, height, clientX, clientY,
      },
    });

    this.updatePositions(true);

    window.addEventListener('mouseup', this.onMouseUp);
    window.addEventListener('mousemove', this.onMouseMove);
  }

  onMouseUp() {
    window.removeEventListener('mouseup', this.onMouseUp);
    window.removeEventListener('mousemove', this.onMouseMove);

    if (this.newIndex != null && this.state.draggingIndex !== this.newIndex) {
      this.props.onChange({
        oldIndex: this.state.draggingIndex,
        newIndex: this.newIndex,
      });
    }

    // eslint-disable-next-line
    this.nodes.forEach((node) => { node.style.transform = null; });
    this.newIndex = null;
    this.setState({ draggingIndex: null });
  }

  onMouseMove(e) {
    const { clientY } = e;

    let scrollDirection = null;

    if (clientY < this.containerPosition.top) {
      scrollDirection = SCROLL_DIRECTION_UP;
    } else if (clientY > this.containerPosition.bottom) {
      scrollDirection = SCROLL_DIRECTION_DOWN;
    }

    if (scrollDirection != null) {
      if (this.animationFrame == null) {
        this.scrollDirection = scrollDirection;
        this.startScrolling();
      }
    } else {
      this.clearScrollTimer();
      this.updatePositions();
    }

    const { draggingIndex } = this.state;

    this.newIndex = null;

    let bucketTop = null;
    let bucketBottom = null;

    this.positions.forEach((pos, index) => {
      let translateY = 0;

      if (index < draggingIndex) {
        if (clientY < pos.bottom) {
          translateY = pos.bottom - pos.top;
        }
      } else if (index > draggingIndex) {
        if (clientY > pos.top) {
          translateY = -(pos.bottom - pos.top);
        }
      }

      if (translateY !== 0) {
        if (bucketTop == null) {
          bucketTop = index;
        }

        bucketBottom = index;
      }

      this.nodes[index].style.transform = `translateY(${translateY}px)`;
    });

    if (bucketTop > draggingIndex) {
      this.newIndex = bucketBottom;
    } else if (bucketBottom < draggingIndex) {
      this.newIndex = bucketTop;
    }
  }

  startScrolling() {
    this.animationFrame = window.requestAnimationFrame(this.scroll);
  }

  scroll() {
    scrollTop(
      this.container,
      this.container.scrollTop + (this.scrollDirection === SCROLL_DIRECTION_DOWN ? 5 : -5),
    );

    this.startScrolling();
  }

  clearScrollTimer() {
    if (this.animationFrame) {
      window.cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }

  updatePositions(force = false) {
    if (force || this.state.draggingIndex != null) {
      this.positions = this.nodes.map((n) => {
        const t = n.getBoundingClientRect().top;
        return {
          top: t,
          bottom: t + n.clientHeight,
        };
      });

      const containerTop = this.container.getBoundingClientRect().top;

      this.containerPosition = {
        top: containerTop,
        bottom: containerTop + this.container.clientHeight,
      };
    }
  }

  render() {
    return (
      <div
        className={classNames(
          'sortable',
          { 'is-dragging': this.state.draggingIndex != null },
        )}
        style={{ height: 400 }}
        ref={(el) => { this.container = el; }}
      >
        {React.Children.map(this.props.children, (child, index) => React.cloneElement(
          child,
          {
            className: classNames(child.props.className, 'sortable-item'),
            onMouseDown: e => this.onMouseDown(e, index),
            style: {
              ...(child.props.style || {}),
              visibility: index === this.state.draggingIndex ? 'hidden' : null,
            },
            ref: (el) => {
              if (child.props.ref) {
                child.props.ref(el);
              }

              this.nodes[index] = el;
            },
          },
        ))}

        {this.state.draggingIndex != null && (
          <Ghost
            style={this.state.ghostStyle}
          >
            {this.props.children[this.state.draggingIndex]}
          </Ghost>
        )}
      </div>
    );
  }
}

Sortable.propTypes = propTypes;
Sortable.defaultProps = defaultProps;

export default Sortable;
