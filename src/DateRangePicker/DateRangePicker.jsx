import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';

import Trigger from '../Trigger';
import Popover from '../Popover';
import Calendar from '../Calendar';

import './style/index.scss';

const propTypes = {
  type: PropTypes.string,
  start: PropTypes.string,
  end: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  disableCursor: PropTypes.bool,
  getPopoverContainer: PropTypes.func,
  max: PropTypes.string,
  min: PropTypes.string,
  defaultTitle: PropTypes.string,
  dateRender: PropTypes.func,
  onActiveChange: PropTypes.func,
  onCalendarMove: PropTypes.func,
};

const defaultProps = {
  start: moment().subtract().format('YYYY-MM-DD'),
  end: moment().format('YYYY-MM-DD'),
  onChange: () => {},
  disabled: false,
  disableCursor: false,
  getPopoverContainer: null,
  max: null,
  min: null,
  type: Calendar.TYPE_DATE,
  defaultTitle: null,
  dateRender: null,
  onActiveChange: () => {},
  onCalendarMove: () => {},
};

class DateRangePicker extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      start: this.props.start,
      end: this.props.end,
      placement: {
        vertical: Popover.PLACEMENT_BOTTOM,
        horizontal: Popover.PLACEMENT_CENTER,
      },
    };

    this.setActive = this.setActive.bind(this);
  }

  componentWillReceiveProps({ start, end }) {
    if (start !== this.props.start
      || end !== this.props.end
    ) {
      this.setState({ start, end });
    }
  }

  setActive(active) {
    this.setState({ active }, () => {
      if (!active) {
        this.setState({
          start: this.props.start,
          end: this.props.end,
        });
      }
    });
    this.props.onActiveChange(active);
  }

  getValue() {
    if (this.props.start == null || this.props.end == null) {
      return this.props.defaultTitle == null ? '请选择' : this.props.defaultTitle;
    }

    const start
      = this.props.type === Calendar.TYPE_MONTH ? moment(this.props.start).format('YYYY-MM') : this.props.start;

    const end
      = this.props.type === Calendar.TYPE_MONTH ? moment(this.props.end).format('YYYY-MM') : this.props.end;

    return `${start} ~ ${end}`;
  }

  render() {
    return (
      <div
        className={classNames(
          'date-range-picker',
          { 'disable-cursor': this.props.disableCursor },
        )}
      >
        {!this.props.disableCursor && (
          <i
            className="icon icon-angle-left backward float-left"
            aria-hidden
            onClick={() => {
              if (this.props.type === Calendar.TYPE_MONTH) {
                const start = moment(this.props.start).subtract(1, 'M');
                const end = moment(this.props.end).subtract(1, 'M');

                if (this.props.min == null || start >= moment(this.props.min)) {
                  this.props.onChange({
                    start: start.format('YYYY-MM'),
                    end: end.format('YYYY-MM'),
                  });
                }
              } else {
                const start = moment(this.props.start).subtract(1, 'd');
                const end = moment(this.props.end).subtract(1, 'd');

                if (this.props.min == null || start >= moment(this.props.min)) {
                  this.props.onChange({
                    start: start.format('YYYY-MM-DD'),
                    end: end.format('YYYY-MM-DD'),
                  });
                }
              }
            }}
          />
        )}

        {!this.props.disableCursor && (
          <i
            className="icon icon-angle-right forward float-right"
            aria-hidden
            onClick={() => {
              if (this.props.type === Calendar.TYPE_MONTH) {
                const start = moment(this.props.start).add(1, 'M');
                const end = moment(this.props.end).add(1, 'M');

                if (this.props.max == null || end <= moment(this.props.max)) {
                  this.props.onChange({
                    start: start.format('YYYY-MM'),
                    end: end.format('YYYY-MM'),
                  });
                }
              } else {
                const start = moment(this.props.start).add(1, 'd');
                const end = moment(this.props.end).add(1, 'd');

                if (this.props.max == null || end <= moment(this.props.max)) {
                  this.props.onChange({
                    start: start.format('YYYY-MM-DD'),
                    end: end.format('YYYY-MM-DD'),
                  });
                }
              }
            }}
          />
        )}

        <Trigger
          active={this.state.active}
          enterClassName={this.state.placement.vertical === Popover.PLACEMENT_TOP ? 'slide-up-in' : 'slide-down-in'}
          leaveClassName={this.state.placement.vertical === Popover.PLACEMENT_TOP ? 'slide-up-out' : 'slide-down-out'}
          disabled={this.props.disabled}
          getPopoverContainer={this.props.getPopoverContainer}
          onActiveChange={this.setActive}
          popover={
            <Popover
              className="date-range-popover"
              placement={this.state.placement}
              onPlacementChange={placement => this.setState({ placement })}
              offset={10}
            >
              <div className="float-left">
                <Calendar
                  type={this.props.type}
                  value={this.state.start}
                  onChange={start => this.setState({ start })}
                  min={this.props.min}
                  max={this.state.end || this.props.max}
                  dateRender={this.props.dateRender}
                  onCalendarMove={this.props.onCalendarMove}
                />
              </div>

              <div className="float-right">
                <Calendar
                  type={this.props.type}
                  className="last-child"
                  value={this.state.end}
                  onChange={end => this.setState({ end })}
                  min={this.state.start || this.props.min}
                  max={this.props.max}
                  dateRender={this.props.dateRender}
                  onCalendarMove={this.props.onCalendarMove}
                />
              </div>

              <div
                className="actions"
              >
                <div
                  className={classNames(
                    'btn btn-primary',
                    { disabled: this.state.start == null || this.state.end == null },
                  )}
                  onClick={() => {
                    const { start, end } = this.state;

                    if (start == null || end == null) {
                      return;
                    }

                    if (start !== this.props.start
                      || end !== this.props.end
                    ) {
                      this.props.onChange({ start, end });
                    }

                    this.setState({ active: false });
                  }}
                  aria-hidden
                >
                  确定
                </div>
              </div>
            </Popover>
          }
        >
          <div
            style={this.props.disableCursor
              ? null
              : {
                marginLeft: '2.8em',
                marginRight: '2.8em',
              }
            }
          >
            <div
              className={classNames(
                'value',
                { active: this.state.active },
              )}
            >
              {this.getValue()}
            </div>
          </div>
        </Trigger>
      </div>
    );
  }
}

DateRangePicker.propTypes = propTypes;
DateRangePicker.defaultProps = defaultProps;

export default DateRangePicker;
