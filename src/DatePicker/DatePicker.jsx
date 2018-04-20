import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';

import './style/index.scss';

import Trigger from '../Trigger';
import Calendar from '../Calendar';
import Popover from '../Popover';

const propTypes = {
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

const defaultProps = {
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

class DatePicker extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      placement: {
        vertical: Popover.PLACEMENT_BOTTOM,
        horizontal: Popover.PLACEMENT_CENTER,
      },
    };

    this.changeActive = this.changeActive.bind(this);
    this.select = this.select.bind(this);
    this.moveBack = this.moveBack.bind(this);
    this.moveNext = this.moveNext.bind(this);
  }

  select(value) {
    if (value !== this.props.value) {
      this.props.onChange(value);
    }

    this.changeActive(false);
  }

  changeActive(active) {
    this.setState({ active });
  }

  moveBack() {
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
  }

  moveNext() {
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
  }

  render() {
    return (
      <div
        className={classNames(
          'date-picker',
          { [this.props.className]: this.props.className != null },
        )}
        style={{ width: this.props.width }}
      >
        <i
          className="icon icon-angle-left backward float-left"
          aria-hidden
          onClick={this.moveBack}
        />

        <i
          className="icon icon-angle-right forward float-right"
          aria-hidden
          onClick={this.moveNext}
        />

        <Trigger
          disabled={this.props.disabled}
          enterClassName={this.state.placement.vertical === Popover.PLACEMENT_TOP ? 'slide-up-in' : 'slide-down-in'}
          leaveClassName={this.state.placement.vertical === Popover.PLACEMENT_TOP ? 'slide-up-out' : 'slide-down-out'}
          active={this.state.active}
          getPopoverContainer={this.props.getPopoverContainer}
          popover={(
            <Popover
              placement={this.state.placement}
              onPlacementChange={placement => this.setState({ placement })}
              className="date-picker-popover"
              offset={10}
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
              marginLeft: '2.8em',
              marginRight: '2.8em',
            }}
          >
            <div
              className={classNames(
                'value',
                { active: this.state.active },
              )}
            >
              {this.props.value}
            </div>
          </div>
        </Trigger>
      </div>
    );
  }
}

DatePicker.propTypes = propTypes;
DatePicker.defaultProps = defaultProps;

export default DatePicker;
