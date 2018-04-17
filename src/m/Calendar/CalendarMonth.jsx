import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import Clickable from '../../Clickable';

const propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  max: PropTypes.string,
  min: PropTypes.string,
};

const defaultProps = {
  value: moment().format('YYYY-MM'),
  onChange: () => {},
  max: null,
  min: null,
};

const monthLangList = [
  '一月', '二月', '三月', '四月', '五月', '六月',
  '七月', '八月', '九月', '十月', '十一月', '十二月',
];

class CalendarMonth extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      year: moment(this.props.value).year(),
    };
  }

  canSelectYear(year) {
    const { max, min } = this.props;

    if (max == null && min == null) {
      return true;
    }

    if (max) {
      return year <= moment(max).year();
    }

    if (min) {
      return year >= moment(min).year();
    }

    return true;
  }

  canSelectMonth(year, month) {
    const { max, min } = this.props;

    if (max == null && min == null) {
      return true;
    }

    const date = moment().year(year).month(month);

    if (max) {
      return date <= moment(max);
    }

    if (min) {
      return date >= moment(min);
    }

    return true;
  }

  renderSwither() {
    const nextYear = moment().year(this.state.year).add(1, 'y').year();
    const lastYear = moment().year(this.state.year).subtract(1, 'y').year();

    return (
      <div className="switcher">
        <Clickable
          onClick={() => {
            if (this.canSelectYear(lastYear)) {
              this.setState({ year: lastYear });
            }
          }}
        >
          <i
            className={classNames(
              'icon icon-angle-left',
              { disable: !this.canSelectYear(lastYear) },
            )}
          />
        </Clickable>
        {this.state.year}
        <Clickable
          onClick={() => {
            if (this.canSelectYear(nextYear)) {
              this.setState({ year: nextYear });
            }
          }}
        >
          <i
            className={classNames(
              'icon icon-angle-right',
              { disable: !this.canSelectYear(nextYear) },
            )}
          />
        </Clickable>
      </div>
    );
  }

  render() {
    const month = moment(this.props.value).month();

    return (
      <div className="calendar-year">
        {this.renderSwither()}

        <div className="mt-1">
          <div className="row">
            {monthLangList.map((monthLang, index) => (
              <div className="col col-width-4" key={`${index + 1}`}>
                <Clickable
                  onClick={() => {
                    if (this.canSelectMonth(this.state.year, index)) {
                      this.props.onChange(moment(this.props.value)
                        .year(this.state.year).month(index).format('YYYY-MM'));
                    }
                  }}
                >
                  <div
                    className={classNames(
                      'month',
                      {
                        active: month === index
                          && this.state.year === moment(this.props.value).year(),
                        disable: !this.canSelectMonth(this.state.year, index),
                      },
                    )}
                  >
                    {monthLang}
                  </div>
                </Clickable>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

CalendarMonth.propTypes = propTypes;
CalendarMonth.defaultProps = defaultProps;

export default CalendarMonth;
