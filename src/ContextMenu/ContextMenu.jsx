import React from 'react';
import PropTypes from 'prop-types';
import scrollTop from 'dom-helpers/query/scrollTop';
import scrollLeft from 'dom-helpers/query/scrollLeft';
import pick from 'lodash/pick';
import isFunction from 'lodash/isFunction';

import Portal from '../Portal';
import Clickable from '../Clickable';
import Animate from '../Animate';
import { PortalContext } from '../context';
import { domRelatedProps } from '../utils/dom';

import './style.scss';

class ContextMenu extends React.PureComponent {
  static propTypes = {
    children: PropTypes.element.isRequired,
    menus: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      value: PropTypes.any,
    })),
    onSelect: PropTypes.func,
    getPopoverContainer: PropTypes.func.isRequired,
  };

  static defaultProps = {
    menus: null,
    onSelect: () => {},
  };

  state = {
    position: null,
  };

  componentWillUnmount() {
    window.removeEventListener('click', this.onBodyClick);
  }

  onContextMenu = (e) => {
    if (this.props.menus != null) {
      e.preventDefault();
      const container = this.props.getPopoverContainer();

      const { left, top } = container.getBoundingClientRect();

      this.setState({
        position: {
          left: (e.clientX - left) + scrollLeft(container),
          top: (e.clientY - top) + scrollTop(container),
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
    const { position } = this.state;

    return React.Children.map(this.props.children, (child, index) => {
      if (index === 0) {
        const domProps = pick(this.props, domRelatedProps);

        return React.cloneElement(
          child,
          {
            ...domProps,
            onContextMenu: this.onContextMenu,
            ref: (el) => {
              if (isFunction(child.ref)) {
                child.ref(el);
              }
            },
          },
        );
      }

      return child;
    }).concat((
      <Animate
        enterDuration={0}
        leaveClassName="fade-out"
        key={React.Children.count(this.props.children)}
      >
        {position != null && (
          <Portal ref={this.portal}>
            <div
              className="popover select-popup context-menu-popup"
              style={{
                left: position.left,
                top: position.top,
              }}
            >
              <Clickable onClick={e => e.stopPropagation()}>
                <div className="context-menu-container">
                  <div>
                    {this.props.menus.map(menu => (
                      <Clickable
                        onClick={() => {
                          this.props.onSelect(menu.value);
                          this.onClose();
                        }}
                        key={menu.value}
                      >
                        <div className="context-menu">
                          {menu.title}
                        </div>
                      </Clickable>
                    ))}
                  </div>
                </div>
              </Clickable>
            </div>
          </Portal>
        )}
      </Animate>
    ));
  }
}

export default React.forwardRef((props, ref) => (
  <PortalContext.Consumer>
    {({ getContainer }) => (
      <ContextMenu
        {...props}
        getPopoverContainer={props.getPopoverContainer || getContainer}
        forwardedRef={ref}
      />
    )}
  </PortalContext.Consumer>
));
