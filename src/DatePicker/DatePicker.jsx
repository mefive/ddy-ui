import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import Trigger from '../Trigger';
import Calendar from '../Calendar';
import Popover from '../Popover';

import './style.scss';
import Focusable from '../Focusable';
import Clickable from '../Clickable';

class DatePicker extends React.PureComponent {
  static propTypes = {
    type: PropTypes.string,
    className: PropTypes.string,
    width: PropTypes.number,
    value: PropTypes.string,
    onChange: PropTypes.func,
    min: PropTypes.string,
    max: PropTypes.string,
    disabled: PropTypes.bool,
    getPopoverContainer: PropTypes.func,
  };

  static defaultProps = {
    type: Calendar.TYPE_DATE,
    className: null,
    width: null,
    min: null,
    max: null,
    disabled: false,
    getPopoverContainer: null,
    value: moment().format('YYYY-MM-DD'),
    onChange: () => null,
  };

  constructor(props) {
    super(props);

    this.state = {
      active: false,
      cursorWidth: 0,
    };

    this.cursor = React.createRef();
  }

  componentDidMount() {
    this.setCursorWidth();
  }

  setCursorWidth() {
    this.setState({ cursorWidth: this.cursor.current.clientWidth });
  }

  select = (value) => {
    if (value !== this.props.value) {
      this.props.onChange(value);
    }

    this.changeActive(false);
  };

  changeActive = (active) => {
    this.setState({ active });
  };

  moveBack = () => {
    if (this.props.type === Calendar.TYPE_DATE) {
      const value = moment(this.props.value).subtract(1, 'd');

      if (this.props.min == null || value >= moment(this.props.min)) {
        this.props.onChange(value.format('YYYY-MM-DD'));
      }
    } else if (this.props.type === Calendar.TYPE_MONTH) {
      const value = moment(this.props.value).subtract(1, 'M');

      if (this.props.min == null || value >= moment(this.props.min)) {
        this.props.onChange(value.format('YYYY-MM'));
      }
    }
  };

  moveNext = () => {
    if (this.props.type === Calendar.TYPE_DATE) {
      const value = moment(this.props.value).add(1, 'd');

      if (this.props.max == null || value <= moment(this.props.max)) {
        this.props.onChange(value.format('YYYY-MM-DD'));
      }
    } else if (this.props.type === Calendar.TYPE_MONTH) {
      const value = moment(this.props.value).add(1, 'M');

      if (this.props.max == null || value <= moment(this.props.max)) {
        this.props.onChange(value.format('YYYY-MM'));
      }
    }
  };

  render() {
    return (
      <div
        className={classNames(
          'date-picker',
          { [this.props.className]: this.props.className != null },
        )}
        style={{ width: this.props.width }}
      >
        <Clickable onClick={this.moveBack}>
          <i
            className="fas fa-angle-left backward float-left"
            ref={this.cursor}
          />
        </Clickable>

        <Clickable onClick={this.moveNext}>
          <i
            className="fas fa-angle-right forward float-right"
          />
        </Clickable>

        <Trigger
          disabled={this.props.disabled}
          enterClassName="slide-down-in"
          leaveClassName="slide-down-out"
          active={this.state.active}
          getPopoverContainer={this.props.getPopoverContainer}
          popover={(
            <Popover
              placement={Popover.placement.BOTTOM}
              className="p-2"
            >
              <Calendar
                type={this.props.type}
                value={this.props.value}
                onChange={this.select}
                min={this.props.min}
                max={this.props.max}
              />
            </Popover>
          )}
          onActiveChange={this.changeActive}
        >
          <div
            style={{
              marginLeft: this.state.cursorWidth + 10,
              marginRight: this.state.cursorWidth + 10,
            }}
          >
            <Focusable>
              <div
                className={classNames(
                  'custom-select',
                  { active: this.state.active },
                )}
              >
                {this.props.value}
              </div>
            </Focusable>
          </div>
        </Trigger>
      </div>
    );
  }
}

export default DatePicker;
