import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import scrollTop from 'dom-helpers/query/scrollTop';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import keyCode from 'keycode';

import Trigger from '../Trigger';
import Clickable from '../Clickable';
import Popover from '../Popover';
import Focusable from '../Focusable';
import Input from '../Input';
import safeSetState from '../safeSetState';

import './style.scss';

@safeSetState
class Select extends React.PureComponent {
  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.any,
      title: PropTypes.string.isRequired,
    })),
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.array,
      PropTypes.bool,
    ]),
    onChange: PropTypes.func,
    className: PropTypes.string,
    defaultTitle: PropTypes.string,
    popoverClassName: PropTypes.string,
    popoverHeight: PropTypes.number,
    getPopoverContainer: PropTypes.func,
    optionRender: PropTypes.func,
    titleRender: PropTypes.func,
    multiple: PropTypes.bool,
    disabled: PropTypes.bool,
    showSearch: PropTypes.bool,
    onSearch: PropTypes.func,
  };

  static defaultProps = {
    options: [],
    value: null,
    onChange: () => {},
    className: null,
    defaultTitle: '请选择',
    popoverClassName: null,
    popoverHeight: 200,
    optionRender: ({ title }) => title,
    titleRender: ({ title }) => title,
    getPopoverContainer: null,
    multiple: false,
    disabled: false,
    showSearch: false,
    onSearch: () => {},
  };

  constructor(props) {
    super(props);

    this.anchor = React.createRef();
    this.popover = null;
    this.optionsContainer = React.createRef();

    this.popoverScrollTop = 0;
  }

  state = {
    active: false,
    width: null,
    optionCache: {},
    keyword: null,
    keyboardNav: null,
  };

  componentWillMount() {
    this.setOptionCache(this.props.options);
  }

  componentDidMount() {
    this.syncWidth();
    window.addEventListener('resize', this.syncWidth);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.options !== this.props.options) {
      this.setOptionCache(nextProps.options);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.multiple && this.state.active && prevProps.value !== this.props.value) {
      this.popover.place();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.syncWidth);
  }

  onSelect(option) {
    if (this.props.multiple) {
      const value = [...(this.props.value || [])];
      const index = value.indexOf(option.value);

      if (index === -1) {
        value.push(option.value);
      } else {
        value.splice(index, 1);
      }

      this.props.onChange(value);
    } else {
      this.props.onChange(option.value);
      this.setActive(false);
    }
  }

  onDocumentKeyDown = (e) => {
    const code = keyCode(e);

    const { keyboardNav } = this.state;

    if (code === 'down' || code === 'up') {
      e.stopPropagation();
      e.preventDefault();

      const { options } = this.props;

      let index = keyboardNav ? options.findIndex(o => o.value === keyboardNav.value) : -1;

      if (code === 'down') {
        index = Math.min(options.length - 1, index + 1);
      } else if (code === 'up') {
        index = Math.max(0, index - 1);
      }

      this.setState({ keyboardNav: options[index] });
    }

    if (code === 'enter') {
      this.onSelect(keyboardNav);
    }

    if (code === 'esc') {
      this.setActive(false);
    }
  };

  setOptionCache(options = []) {
    this.setState({
      optionCache: {
        ...this.state.optionCache,
        ...options.reduce((p, c) => ({
          ...p,
          [c.value]: c,
        }), {}),
      },
    });
  }

  setActive = (active) => {
    this.setState({ active }, () => {
      if (active) {
        scrollTop(this.optionsContainer.current, this.popoverScrollTop);
        document.addEventListener('keydown', this.onDocumentKeyDown);
      } else {
        document.removeEventListener('keydown', this.onDocumentKeyDown);
      }
    });

    if (!active) {
      this.popoverScrollTop = scrollTop(this.optionsContainer.current);
    }
  };

  syncWidth = debounce(() => {
    this.setState({ width: this.anchor.current.clientWidth });
  });

  renderTitle() {
    let title = null;
    const { value, titleRender } = this.props;
    const { optionCache } = this.state;

    if (this.props.multiple) {
      title = (value && value.length > 0)
        ? (
          <div className="select-choice-container">
            {value.map(v => (
              <div className="select-choice" key={v}>
                <span>{titleRender(optionCache[v] || {})}</span>

                {!this.props.disabled && (
                  <Clickable
                    onClick={(e) => {
                      e.stopPropagation();
                      const newValue = [...value];
                      newValue.splice(value.indexOf(v), 1);

                      this.props.onChange(newValue);
                    }}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </Clickable>
                )}
              </div>
            ))}
          </div>
        )
        : null;
    } else {
      title = titleRender(optionCache[value] || {});
    }

    return title || this.props.defaultTitle;
  }

  render() {
    const { value } = this.props;

    return (
      <Trigger
        getPopoverContainer={this.props.getPopoverContainer}
        active={this.state.active}
        onActiveChange={this.setActive}
        enterClassName="slide-down-in"
        leaveClassName="slide-down-out"
        popover={(
          <Popover
            placement={Popover.placement.BOTTOM}
            offset={5}
            hasArrow={false}
            className={classNames(
              'select-popover shadow',
              this.props.popoverClassName,
            )}
            ref={(popover) => { this.popover = popover; }}
          >
            <div>
              {this.props.showSearch && (
                <div className="keyword">
                  <Input
                    value={this.state.keyword}
                    onChange={(keyword) => {
                      this.setState({ keyword });
                      this.props.onSearch(keyword);
                    }}
                    placeholder="请输入关键字"
                  />
                </div>
              )}

              <div
                style={{
                  width: this.state.width,
                  maxHeight: this.props.popoverHeight,
                  overflow: 'auto',
                }}
                ref={this.optionsContainer}
              >
                {this.props.options.map(option => (
                  <Clickable
                    onClick={() => this.onSelect(option)}
                    key={option.value}
                  >
                    <div
                      className={classNames(
                        'select-option',
                        {
                          active: value === option.value
                          || (this.props.multiple && value && value.indexOf(option.value) !== -1)
                          || (this.state.keyboardNav
                            && this.state.keyboardNav.value === option.value),
                        },
                      )}
                    >
                      {this.props.optionRender(option)}
                    </div>
                  </Clickable>
                ))}
              </div>
            </div>
          </Popover>
        )}
      >
        <div>
          <Focusable>
            <div
              className={classNames(
                this.props.className,
                'select custom-select',
                { active: this.state.active },
              )}
              ref={this.anchor}
            >
              {this.renderTitle()}
            </div>
          </Focusable>
        </div>
      </Trigger>
    );
  }
}

export default Select;
