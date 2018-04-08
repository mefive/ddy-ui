import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';

import '../DateRangePicker/style/index.scss';

import Select from '../Select/Select';
import Trigger from '../Trigger';
import Popover from '../Popover';
import Calendar from '../Calendar';

const propTypes = {
  start: PropTypes.string,
  end: PropTypes.string,
  onChange: PropTypes.func,
};

const defaultProps = {
  start: null,
  end: null,
  onChange: () => null,
};

function getDate(diff = 0, unit = 'd') {
  return moment().add(diff, unit).format('YYYY-MM-DD');
}

class DateRangeSelect extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      options: [
        { value: 'today', title: '今日' },
        { value: '7days', title: '最近7天' },
        { value: '30days', title: '最近30天' },
        { value: 'custom', title: '自定义' },
      ],
      selectValue: null,
      customActive: false,
      selectDisabled: false,
      start: null,
      end: null,
    };
  }

  componentDidMount() {
    this.updateStates(this.props.start, this.props.end);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.start !== this.props.start
      || nextProps.end !== this.props.end
    ) {
      this.updateStates(nextProps.start, nextProps.end);
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.selectValue !== nextState.selectValue) {
      if (nextState.selectValue === 'custom') {
        this.setState({
          customActive: true,
          selectDisabled: true,
        });
      } else {
        this.setState({
          selectDisabled: false,
        });
      }
    }
  }

  updateStates(start, end) {
    this.setState({
      start,
      end,
      selectValue: this.getSelectValue(start, end),
    });
  }

  getSelectValue(start, end) {
    const diff = moment.duration(moment(end) - moment(start));
    let selectValue = null;

    if (moment(end).format('YYYY-MM-DD') === getDate()) {
      switch (diff.days()) {
        case 0: {
          selectValue = 'today';
          break;
        }

        case 6: {
          selectValue = '7days';
          break;
        }

        case 30: {
          selectValue = '30days';
          break;
        }
      }
    }

    return selectValue;
  }

  getValue(value) {
    let start;
    let end;

    switch (value) {
      case 'custom': {
        ({ start, end } = this.state);
        break;
      }

      case '7days': {
        start = getDate(-6);
        end = getDate();
        break;
      }

      case '30days': {
        start = getDate(-30);
        end = getDate();
        break;
      }

      case 'today': {
        start = getDate();
        end = getDate();
        break;
      }

      default: {
        ({ start, end } = this.state);
        break;
      }
    }

    return {
      start, end,
    };
  }

  getTitle() {
    const { start, end }
      = this.getValue(this.state.selectValue);

    return `${start} 至 ${end}`;
  }

  render() {
    const {
      className,
      width,
      value,
      onChange,
      max,
      min,
    } = this.props;

    const {
      options,
      customActive,
      selectValue,
      selectDisabled,
      start,
      end,
    } = this.state;

    return (
      <div
        className={classNames(
          'date-range-select',
          { [className]: !!className },
        )}
      >
        <Trigger
          active={customActive}
          enterClassName="slide-down-in"
          leaveClassName="slide-down-out"
          disabled={!selectDisabled}
          getPopoverContainer={this.props.getPopoverContainer}
          popover={
            <Popover
              className="date-range-popover"
              placement="bottom"
              offset={10}
            >
              <div className="float-left">
                <Calendar
                  value={start}
                  onChange={start => this.setState({ start })}
                  max={end}
                  min={min}
                />
              </div>

              <div className="float-right">
                <Calendar
                  className="last-child"
                  value={end}
                  onChange={end => this.setState({ end })}
                  max={max}
                  min={start}
                />
              </div>

              <div
                className="actions"
              >
                <div
                  className="btn btn-primary"
                  onClick={() => {
                    this.setState({
                      customActive: false,
                    });

                    if (start !== this.props.start
                      || end !== this.props.end
                    ) {
                      onChange({ start, end });
                    } else {
                      this.setState({
                        selectValue: this.getSelectValue(start, end),
                      });
                    }
                  }}
                >
                  确定
                </div>
              </div>
            </Popover>
          }
          onActiveChange={(active) => {
            const { start, end } = this.props;

            this.setState({
              customActive: false,
              start,
              end,
              selectValue: this.getSelectValue(start, end),
            });
          }}
        >
          <span>
            <Select
              width={width}
              disabled={selectDisabled}
              options={options}
              value={selectValue}
              title={this.getTitle()}
              getPopoverContainer={this.props.getPopoverContainer}
              onChange={(value) => {
                if (value !== 'custom') {
                  onChange(this.getValue(value));
                } else {
                  this.setState({ selectValue: value });
                }
              }}
            />
          </span>
        </Trigger>
      </div>
    );
  }
}

DateRangeSelect.propTypes = propTypes;
DateRangeSelect.defaultProps = defaultProps;

export default DateRangeSelect;
