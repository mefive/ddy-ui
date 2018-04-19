import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  containerWidth: PropTypes.number.isRequired,
  containerHeight: PropTypes.number.isRequired,
  top: PropTypes.number,
  left: PropTypes.number,
  onTopChange: PropTypes.func,
  onLeftChange: PropTypes.func,
  children: PropTypes.node,
};

const defaultProps = {
  onTopChange: () => {},
  onLeftChange: () => {},
  children: null,
  top: 0,
  left: 0,
};

const defaultState = {
  top: null,
  left: null,
  dragging: false,
};

class Draggable extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { ...defaultState };

    this.startDragging = this.startDragging.bind(this);
    this.stopDragging = this.stopDragging.bind(this);
    this.move = this.move.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.dragging && !prevState.dragging) {
      window.addEventListener('mouseup', this.stopDragging);
      window.addEventListener('mousemove', this.move);
    }
  }

  componentWillUnmount() {
    this.stopDragging();
  }

  getTop() {
    if (this.props.top != null) {
      return this.props.top;
    }

    return this.state.top;
  }

  setTop(top) {
    if (this.props.top != null) {
      this.props.onTopChange(top);
    } else {
      this.setState({ top });
    }
  }

  getLeft() {
    if (this.props.left != null) {
      return this.props.left;
    }

    return this.state.left;
  }

  setLeft(left) {
    if (this.props.left != null) {
      this.props.onLeftChange(left);
    } else {
      this.setState({ left });
    }
  }

  move(e) {
    e.stopPropagation();
    e.preventDefault();

    const { clientX, clientY } = e;

    const deltaX = clientX - this.mouseStart.left;
    const deltaY = clientY - this.mouseStart.top;

    let top = this.draggableItemStart.top + deltaY;
    let left = this.draggableItemStart.left + deltaX;

    const { containerWidth, containerHeight } = this.props;

    if (containerWidth != null) {
      const maxLeft = containerWidth - this.draggableItem.clientWidth;
      left = Math.min(maxLeft, left);
    }

    if (containerHeight != null) {
      const maxTop = containerHeight - this.draggableItem.clientHeight;
      top = Math.min(maxTop, top);
    }

    top = Math.max(top, 0);
    left = Math.max(left, 0);

    this.setTop(top);
    this.setLeft(left);
  }

  startDragging(e) {
    this.setState({ dragging: true });
    this.mouseStart = {
      left: e.clientX,
      top: e.clientY,
    };

    this.draggableItemStart = {
      left: this.getLeft(),
      top: this.getTop(),
    };
  }

  stopDragging() {
    this.setState({ dragging: false });
    window.removeEventListener('mouseup', this.stopDragging);
    window.removeEventListener('mousemove', this.move);
  }

  render() {
    const child = React.Children.only(this.props.children);

    const top = this.getTop();
    const left = this.getLeft();

    const style = {
      ...child.props.style,
      top,
      left,
    };

    return React.cloneElement(
      child,
      {
        ref: (el) => { this.draggableItem = el; },
        style,
        onMouseDown: this.startDragging,
      },
    );
  }
}

Draggable.propTypes = propTypes;
Draggable.defaultProps = defaultProps;

export default Draggable;
