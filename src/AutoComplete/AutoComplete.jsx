import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import keyCode from 'keycode';
import debounce from 'lodash/debounce';

import Input from '../Input';
import Popover from '../Popover';
import Trigger from '../Trigger';
import Clickable from '../Clickable';

import './style.scss';

class AutoComplete extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.any]),
    optionCache: PropTypes.shape({}),
    onChange: PropTypes.func,
    getOptions: PropTypes.func,
    renderOption: PropTypes.func,
    renderTitle: PropTypes.func,
    popoverClassName: PropTypes.string,
    multiple: PropTypes.bool,
  };

  static defaultProps = {
    className: null,
    value: null,
    onChange: () => {},
    getOptions: async () => [],
    renderOption: opt => opt.title,
    renderTitle: opt => opt.title,
    popoverClassName: null,
    optionCache: {},
    multiple: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      active: false,
      options: [],
      optionCache: {},
      keyword: null,
      width: null,
      selected: null,
    };
  }

  componentWillMount() {
    this.setOptionCache();
  }

  componentDidMount() {
    this.syncWidth();
  }

  componentWillReceiveProps({ optionCache }) {
    if (optionCache !== this.props.optionCache) {
      this.setOptionCache(optionCache);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onDocumentClick);
    document.removeEventListener('keydown', this.onDocumentKeyDown);
  }

  onKeywordChange = (keyword) => {
    this.setState({ keyword }, this.search);
  };

  onChange = (value) => {
    if (!this.props.multiple) {
      this.props.onChange(value);
    } else if (this.props.value.indexOf(value) === -1 && value != null) {
      this.props.onChange([
        ...(this.props.value || []),
        value,
      ]);
    }
  };

  onDocumentKeyDown = (e) => {
    const code = keyCode(e);

    if (code === 'down' || code === 'up') {
      e.stopPropagation();
      e.preventDefault();
      const { options } = this.state;
      let index = options.findIndex(o => o.value === this.state.selected);

      if (code === 'down') {
        index = Math.min(options.length - 1, index + 1);
      } else if (code === 'up') {
        index = Math.max(0, index - 1);
      }

      this.setState({ selected: (options[index] || {}).value });
    }

    if (code === 'enter') {
      this.onChange(this.state.selected);
      this.deactivate();
    }
  };

  setOptionCache(optionCache = this.props.optionCache) {
    this.setState({
      optionCache: {
        ...this.state.optionCache,
        ...optionCache,
      },
    });
  }

  syncWidth() {
    this.setState({ width: this.trigger.clientWidth });
  }

  search = debounce(() => {
    this.props.getOptions(this.state.keyword)
      .then((options) => {
        this.setState({
          options,
          optionCache: {
            ...this.state.optionCache,
            ...options.reduce((p, c) => ({
              ...p,
              [c.value]: c,
            }), {}),
          },
          selected: options[0] ? options[0].value : null,
        });

        if (!this.state.active) {
          this.activate();
        }
      });
  }, 600);

  activate = () => {
    this.setState({
      active: true,
      selected: this.props.multiple ? null : this.props.value,
    }, () => {
      document.addEventListener('click', this.onDocumentClick);
      document.addEventListener('keydown', this.onDocumentKeyDown);
    });
  };

  deactivate = () => {
    this.setState({
      active: false,
    }, () => {
      document.removeEventListener('click', this.onDocumentClick);
      document.removeEventListener('keydown', this.onDocumentKeyDown);
    });
  };

  renderTitle() {
    if (!this.props.multiple) {
      if (this.props.value == null) {
        return '请选择';
      }

      const opt = this.state.optionCache[this.props.value];

      if (opt == null) {
        return '加载中...';
      }

      return this.props.renderTitle(opt);
    }

    if (this.props.value == null || this.props.value.length === 0) {
      return '请选择';
    }

    const opts = this.props.value.map(value => this.state.optionCache[value]);

    if (opts.some(o => o == null)) {
      return '加载中...';
    }

    return (
      <ul className="ddy-select-multi-items">
        {opts.map((opt, index) => (
          <li key={opt.value}>
            {this.props.renderTitle(opt)}

            <Clickable
              onClick={(e) => {
                e.stopPropagation();
                const value = [...this.props.value];
                value.splice(index, 1);
                this.props.onChange(value);
              }}
            >
              <i className="icon icon-times" />
            </Clickable>
          </li>
          ))}
      </ul>
    );
  }

  render() {
    const { options } = this.state;

    return (
      <div
        className={classNames(
          'ddy-auto-complete',
          this.props.className,
        )}
      >
        <Trigger
          active={this.state.active}
          onActiveChange={(active) => {
            if (active) {
              this.activate();
            } else {
              this.deactivate();
            }
          }}
          action="click"
          enterClassName="slide-down-in"
          leaveClassName="slide-down-out"
          popover={(
            <Popover
              placement={Popover.placement.BOTTOM}
              offset={5}
              className={
                classNames(
                  'select-popup ddy-auto-complete-popover',
                  this.props.popoverClassName,
                )}
            >
              <div className="wrapper" style={{ width: this.state.width }}>
                <div className="keyword">
                  <Input
                    value={this.state.keyword}
                    onChange={this.onKeywordChange}
                    placeholder="请输入关键字"
                  />
                </div>

                <div className="options">
                  {options.length > 0
                    ? (
                      <ul>
                        {options.map(opt => (
                          <Clickable
                            onClick={() => {
                              this.onChange(opt.value);
                              this.deactivate();
                            }}
                            key={opt.value}
                          >
                            <li
                              className={classNames({
                                selected: this.state.selected === opt.value,
                              })}
                              onMouseEnter={() => this.setState({ selected: opt.value })}
                            >
                              {this.props.renderOption(opt)}
                            </li>
                          </Clickable>
                        ))}
                      </ul>
                    )
                    : (
                      <div className="no-data">
                        没有匹配结果
                      </div>
                    )}
                </div>
              </div>
            </Popover>
          )}
        >
          <div
            className="select"
            ref={(el) => { this.trigger = el; }}
          >
            <div
              className={classNames(
                'select-trigger',
                { active: this.state.active },
              )}
            >
              {this.renderTitle()}

              <div className="trigger-icon">
                <i className="icon icon-caret-down" />
              </div>
            </div>
          </div>
        </Trigger>
      </div>
    );
  }
}

export default AutoComplete;
