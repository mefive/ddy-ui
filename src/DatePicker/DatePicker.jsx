import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import Trigger from '../Trigger';
import Calendar from '../Calendar';
import Popover from '../Popover';
import Focusable from '../Focusable';
import Clickable from '../Clickable';

import './style.scss';
import CustomSelect from '../CustomSelect/CustomSelect';

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
    disableCursor: PropTypes.bool,
    getPopoverContainer: PropTypes.func,
    defaultTitle: PropTypes.string,
    availableDates: PropTypes.arrayOf(PropTypes.string),
    renderTitle: PropTypes.func,
  };

  static defaultProps = {
    type: Calendar.TYPE_DATE,
    className: null,
    width: null,
    min: null,
    max: null,
    disabled: false,
    disableCursor: false,
    getPopoverContainer: null,
    value: moment().format('YYYY-MM-DD'),
    onChange: () => null,
    availableDates: null,
    defaultTitle: '请选择',
    renderTitle: value => value,
  };

  constructor(props) {
    super(props);

    this.state = {
      active: false,
    };
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
        {!this.props.disableCursor && (
          <Clickable onClick={this.moveBack}>
            <div className="cursor-move mr-1">
              <FontAwesomeIcon icon={faAngleLeft} />
            </div>
          </Clickable>
        )}

        <Trigger
          disabled={this.props.disabled}
          enterClassName="slide-down-in"
          leaveClassName="slide-down-out"
          active={this.state.active}
          getPopoverContainer={this.props.getPopoverContainer}
          popover={(
            <Popover
              placement={Popover.placement.BOTTOM}
              className="p-2 shadow"
            >
              <Calendar
                type={this.props.type}
                value={this.props.value}
                onChange={this.select}
                min={this.props.min}
                max={this.props.max}
                availableDates={this.props.availableDates}
              />
            </Popover>
          )}
          onActiveChange={this.changeActive}
        >
          <div className="trigger">
            <Focusable>
              <CustomSelect
                className={classNames({ active: this.state.active })}
                role="button"
              >
                {this.props.renderTitle(this.props.value) || this.props.defaultTitle}
              </CustomSelect>
            </Focusable>
          </div>
        </Trigger>

        {!this.props.disableCursor && (
          <Clickable onClick={this.moveNext}>
            <div className="cursor-move ml-1">
              <FontAwesomeIcon icon={faAngleRight} />
            </div>
          </Clickable>
        )}
      </div>
    );
  }
}

export default DatePicker;
