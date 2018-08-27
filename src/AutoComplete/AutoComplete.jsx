import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Input from '../Input';
import { Trigger } from '../index';
import Popover from '../Popover/Popover';

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
    };
  }

  onChange = (keyword) => {
    this.setState({ keyword }, this.search);
  };

  search = () => {
    this.props.getOptions(this.state.keyword)
      .then(options => this.setState({ options }));
  };

  activate = () => {
    this.setState({
      active: true,
    }, this.search);
  };

  deactivate = () => {
    this.setState({
      active: false,
      keyword: null,
    }, () => this.setState({
      options: [],
    }));
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
              {options.length > 0
                ? (
                  <ul>
                    {options.map(opt => (
                      <li>
                        {this.props.renderOption(opt)}
                      </li>
                    ))}
                  </ul>
                )
                : (
                  <div className="auto-complete-no-options">
                    没有匹配结果
                  </div>
                )}

            </Popover>
          )}
        >
          <div>
            <Input
              value={keyword != null ? keyword : value}
              onChange={this.onChange}
              onBlur={this.deactivate}
              onFocus={this.activate}
            />
          </div>
        </Trigger>
      </div>
    );
  }
}

export default AutoComplete;
