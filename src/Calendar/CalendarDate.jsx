import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import padStart from 'lodash/padStart';
import classNames from 'classnames';

import CalendarData from './CalendarData';

const calendarData = new CalendarData(0);

const weekDaysLang = [
  '日', '一', '二', '三', '四', '五', '六',
];

const propTypes = {
  className: PropTypes.string,
  max: PropTypes.string,
  min: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

const defaultProps = {
  className: null,
  max: '',
  min: '',
  value: moment().format('YYYY-MM-DD'),
  onChange: () => {},
};

class Calendar extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = this.getUpdatedYearMonth();
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.getUpdatedYearMonth(nextProps.value));
  }

  getUpdatedYearMonth(value = this.props.value) {
    return {
      year: moment(value).year(),
      month: moment(value).month() + 1,
    };
  }

  getDate(day) {
    return `${this.state.year}-${padStart(this.state.month, 2, '0')}-${padStart(day, 2, '0')}`;
  }

  changeMonth(action) {
    const date = moment(this.getDate(1));

    if (action === 'prev') {
      date.subtract(1, 'M');
    } else {
      date.add(1, 'M');
    }

    this.setState({
      year: date.year(),
      month: date.month() + 1,
    });
  }

  isDisable(day) {
    const date = this.getDate(day);
    const { max, min } = this.props;

    return (max && moment(date) > moment(max))
      || (min && moment(date) < moment(min));
  }

  render() {
    const {
      className,
      value,
      onChange,
    } = this.props;

    const {
      year,
      month,
    } = this.state;

    const monthDays
      = calendarData.monthDays(year, month - 1);

    return (
      <div
        className={classNames(
          'calendar-month',
          { [className]: !!className },
        )}
      >
        <table className="month-switcher">
          <thead>
            <tr>
              <th
                className="action"
                width={30}
                onClick={() => this.changeMonth('prev')}
              >
                <i className="icon icon-angle-left" />
              </th>
              <th colSpan={5}>
                {year}年{padStart(month, 2, '0')}月
              </th>
              <th
                className="action"
                width={30}
                onClick={() => this.changeMonth('next')}
              >
                <i className="icon icon-angle-right" />
              </th>
            </tr>
          </thead>
        </table>

        <table className="month-table">
          <thead>
            <tr>
              {weekDaysLang.map((i, index) => (
                <th key={`${index + 1}`}>{i}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {monthDays.map((i, rowIndex) => (
              <tr key={`${rowIndex + 1}`}>
                {i.map((j, colIndex) => {
                  const isDisable = this.isDisable(j);

                  return (
                    <td
                      key={`${colIndex + 1}`}
                      className={classNames(
                        'day',
                        { disable: isDisable || !j },
                        { enable: !isDisable && j },
                        { current: this.getDate(j) === value },
                      )}
                      aria-hidden
                      onClick={() => {
                        if (!isDisable && j) {
                          onChange(this.getDate(j));
                        }
                      }}
                    >
                      {j || null}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

Calendar.propTypes = propTypes;
Calendar.defaultProps = defaultProps;

export default Calendar;
