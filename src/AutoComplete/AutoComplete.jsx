import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import keyCode from 'keycode';
import debounce from 'lodash/debounce';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import Input from '../Input';
import Popover from '../Popover';
import Trigger from '../Trigger';
import Clickable from '../Clickable';

import '../Select/style/index.scss';
import './style.scss';
import Focusable from '../Focusable';

class AutoComplete extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.any]),
    options: PropTypes.arrayOf(PropTypes.shape({})),
    onChange: PropTypes.func,
    getOptions: PropTypes.func,
    renderOption: PropTypes.func,
    renderTitle: PropTypes.func,
    renderNoMatch: PropTypes.func,
    popoverClassName: PropTypes.string,
    multiple: PropTypes.bool,
    showSuggestions: PropTypes.bool,
    getPopoverContainer: PropTypes.func,
    debounceInterval: PropTypes.number,
    disabled: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.shape({
        add: PropTypes.bool,
        remove: PropTypes.bool,
      }),
    ]),
  };

  static defaultProps = {
    className: null,
    value: null,
    onChange: () => {},
    getOptions: async () => [],
    renderOption: opt => opt.title,
    renderTitle: opt => opt.title,
    renderNoMatch: () => '没有匹配数据',
    popoverClassName: null,
    options: [],
    multiple: false,
    showSuggestions: true,
    getPopoverContainer: null,
    debounceInterval: 600,
    disabled: false,
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

  componentWillReceiveProps({ options }) {
    if (options !== this.props.options) {
      this.setOptionCache(options);
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

      const options = this.props.showSuggestions ? this.state.options : this.props.options;

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

  get disableAdd() {
    return this.props.disabled === true || this.props.disabled.add;
  }

  get disableRemove() {
    return this.props.disabled === true || this.props.disabled.remove;
  }

  setOptionCache(options = this.props.options) {
    if (options) {
      this.setState({
        optionCache: {
          ...this.state.optionCache,
          ...options.reduce((p, c) => ({ ...p, [c.value]: c }), {}),
        },
      });
    }
  }

  getOptions() {
    return this.state.options;
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
  }, this.props.debounceInterval);

  activate = () => {
    this.setState({
      active: true,
      selected: this.props.multiple ? null : this.props.value,
    }, () => {
      if (this.props.showSuggestions) {
        this.search();
      }

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
      <div className="ddy-select-multi-items">
        {opts.map((opt, index) => (
          <div key={opt.value} className="select-multi-item">
            {this.props.renderTitle(opt)}

            {!this.disableRemove && (
              <Clickable
                onClick={(e) => {
                  e.stopPropagation();
                  const value = [...this.props.value];
                  value.splice(index, 1);
                  this.props.onChange(value);
                }}
              >
                <FontAwesomeIcon icon={faTimes} className="ml-0" />
              </Clickable>
            )}
          </div>
        ))}
      </div>
    );
  }

  render() {
    const options = this.props.showSuggestions ? this.state.options : this.props.options;

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
          getPopoverContainer={this.props.getPopoverContainer}
          disabled={this.disableAdd}
          popover={(
            <Popover
              placement={Popover.placement.BOTTOM}
              offset={5}
              className={
                classNames(
                  'select-popup ddy-auto-complete-popover shadow',
                  this.props.popoverClassName,
                )}
              hasArrow={false}
            >
              <div className="wrapper" style={{ width: this.state.width }}>
                {this.props.showSuggestions && (
                  <div className="keyword">
                    <Input
                      value={this.state.keyword}
                      onChange={this.onKeywordChange}
                      placeholder="请输入关键字"
                    />
                  </div>
                )}

                <div className="selections" style={{ maxHeight: 200 }}>
                  {options.length > 0
                    ? (
                      <div>
                        {options.map(opt => (
                          <Clickable
                            onClick={() => {
                              this.onChange(opt.value);
                              this.deactivate();
                            }}
                            key={opt.value}
                          >
                            <div
                              className={classNames(
                                'selection',
                                { selected: this.state.selected === opt.value },
                              )}
                              onMouseEnter={() => this.setState({ selected: opt.value })}
                            >
                              {this.props.renderOption(opt)}
                            </div>
                          </Clickable>
                        ))}
                      </div>
                    )
                    : (
                      <div className="no-data">
                        {this.props.showSuggestions ? this.props.renderNoMatch(this.state.keyword) : '加载中...'}
                      </div>
                    )}
                </div>
              </div>
            </Popover>
          )}
        >
          <div
            className={classNames('select', { disabled: this.disableAdd })}
            ref={(el) => { this.trigger = el; }}
          >
            <Focusable>
              <div
                className={classNames(
                  'custom-select',
                  { active: this.state.active },
                )}
                role="button"
              >
                {this.renderTitle()}
              </div>
            </Focusable>
          </div>
        </Trigger>
      </div>
    );
  }
}

export default AutoComplete;
