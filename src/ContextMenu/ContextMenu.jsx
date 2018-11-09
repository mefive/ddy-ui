import React from 'react';
import PropTypes from 'prop-types';
import Portal from '../Portal';
import Clickable from '../Clickable';

import './style.scss';
import Animate from '../Animate/Animate';

class ContextMenu extends React.PureComponent {
  static propTypes = {
    children: PropTypes.element.isRequired,
    menus: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      value: PropTypes.any,
    })),
    onSelect: PropTypes.func,
  };

  static defaultProps = {
    menus: null,
    onSelect: () => {},
  };

  constructor(props) {
    super(props);

    this.state = {
      position: null,
    };
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onBodyClick);
  }

  onContextMenu = (e) => {
    if (this.props.menus != null) {
      e.preventDefault();
      this.setState({
        position: {
          left: e.clientX,
          top: e.clientY,
        },
      });
      window.addEventListener('click', this.onBodyClick);
    }
  };

  onBodyClick = () => {
    window.removeEventListener('click', this.onBodyClick);
    this.onClose();
  };

  onClose = () => {
    this.setState({
      position: null,
    });
  };

  render() {
    const child = React.Children.only(this.props.children);
    const { position } = this.state;

    return (
      <React.Fragment>
        {React.cloneElement(
          child,
          {
            ...child.props,
            onContextMenu: this.onContextMenu,
          },
        )}

        <Animate
          enterDuration={0}
          leaveClassName="fade-out"
        >
          {position != null && (
            <Portal>
              <div
                className="popover select-popup context-menu-popup"
                style={{
                  left: position.left,
                  top: position.top,
                }}
              >
                <Clickable onClick={e => e.stopPropagation()}>
                  <div>
                    <ul>
                      {this.props.menus.map(menu => (
                        <Clickable
                          onClick={() => {
                            this.props.onSelect(menu.value);
                            this.onClose();
                          }}
                          key={menu.value}
                        >
                          <li>
                            {menu.title}
                          </li>
                        </Clickable>
                      ))}
                    </ul>
                  </div>
                </Clickable>
              </div>
            </Portal>
          )}
        </Animate>
      </React.Fragment>
    );
  }
}

export default ContextMenu;
