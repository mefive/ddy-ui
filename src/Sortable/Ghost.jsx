import React from 'react';
import PropTypes from 'prop-types';
import style from 'dom-helpers/style';
import Portal from '../Portal';

const propTypes = {
  style: PropTypes.shape({
    width: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    clientX: PropTypes.number,
    clientY: PropTypes.number,
  }).isRequired,
  children: PropTypes.node.isRequired,
};

class Ghost extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onMouseMove = this.onMouseMove.bind(this);
  }

  componentDidMount() {
    const { left, top } = this.props.style;

    style(this.node, 'left', `${left}px`);
    style(this.node, 'top', `${top}px`);

    window.addEventListener('mousemove', this.onMouseMove);
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.onMouseMove);
  }

  onMouseMove(e) {
    const { clientX, clientY } = e;
    const { left, top } = this.props.style;

    const deltaX = clientX - this.props.style.clientX;
    const deltaY = clientY - this.props.style.clientY;

    style(this.node, 'left', `${left + deltaX}px`);
    style(this.node, 'top', `${top + deltaY}px`);
  }

  render() {
    return (
      <Portal>
        <div
          className="sortable-ghost"
          style={{
            width: this.props.style.width,
          }}
          ref={(el) => { this.node = el; }}
        >
          {this.props.children}
        </div>
      </Portal>
    );
  }
}

Ghost.propTypes = propTypes;

export default Ghost;
