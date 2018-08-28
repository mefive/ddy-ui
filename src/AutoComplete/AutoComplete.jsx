import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import contains from 'dom-helpers/query/contains';
import keyCode from 'keycode';

import Input from '../Input';
import Popover from '../Popover';
import Trigger from '../Trigger';
import Clickable from '../Clickable';

import './style.scss';

class AutoComplete extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.any]),
    onChange: PropTypes.func,
    getOptions: PropTypes.func,
    renderOption: PropTypes.func,
    popoverClassName: PropTypes.string,
  };

  static defaultProps = {
    className: null,
    value: null,
    onChange: () => {},
    getOptions: async () => [],
    renderOption: option => option.title,
    popoverClassName: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      active: false,
      options: [],
      keyword: null,
      width: null,
      selected: null,
    };
  }

  componentDidMount() {
    this.syncWidth();
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onDocumentClick);
    document.removeEventListener('keydown', this.onDocumentKeyDown);
  }

  onChange = (keyword) => {
    this.setState({ keyword }, this.search);
  };

  onDocumentClick = (e) => {
    const { target } = e;

    if (contains(this.popover, target) || contains(this.trigger, target)) {
      e.stopPropagation();
      return;
    }

    this.deactivate();
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
      this.props.onChange(this.state.selected);
      this.deactivate();
    }
  };

  syncWidth() {
    this.setState({ width: this.trigger.clientWidth });
  }

  search = () => {
    this.props.getOptions(this.state.keyword)
      .then(options =>
        this.setState({ options, selected: options[0] ? options[0].value : null }));
  };

  activate = () => {
    this.setState({
      active: true,
    }, () => {
      document.addEventListener('click', this.onDocumentClick);
      document.addEventListener('keydown', this.onDocumentKeyDown);
      this.search();
    });
  };

  deactivate = () => {
    this.setState({
      active: false,
    }, () => {
      document.removeEventListener('click', this.onDocumentClick);
      document.removeEventListener('keydown', this.onDocumentKeyDown);
      this.setState({
        options: [],
        keyword: this.props.value,
      });
    });
  };

  render() {
    const { keyword, options } = this.state;
    const { value } = this.props;

    return (
      <div
        className={classNames(
          'ddy-auto-complete',
          this.props.className,
        )}
      >
        <Trigger
          active={this.state.active}
          action="none"
          onActiveChange={active => this.setState({ active })}
          enterClassName="slide-down-in"
          leaveClassName="slide-down-out"
          popover={(
            <Popover
              placement={{
                vertical: Popover.PLACEMENT_BOTTOM,
                horizontal: Popover.PLACEMENT_CENTER,
              }}
              className={
                classNames(
                  'select-popup ddy-auto-complete-popover',
                  this.props.popoverClassName,
                )}
            >
              <div
                style={{ width: this.state.width }}
                ref={(el) => { this.popover = el; }}
              >
                {options.length > 0
                  ? (
                    <ul>
                      {options.map(opt => (
                        <Clickable
                          onClick={() => {
                            this.props.onChange(opt.value);
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
            </Popover>
          )}
        >
          <div ref={(el) => { this.trigger = el; }}>
            <Input
              value={keyword != null ? keyword : value}
              onChange={this.onChange}
              onFocus={this.activate}
            />
          </div>
        </Trigger>
      </div>
    );
  }
}

export default AutoComplete;
