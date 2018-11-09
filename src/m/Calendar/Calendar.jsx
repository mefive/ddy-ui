import React from 'react';
import PropTypes from 'prop-types';
import CalendarDate from './CalendarDate';
import CalendarMonth from './CalendarMonth';

import './style/index.scss';

const TYPE_DATE = 'type_date';
const TYPE_MONTH = 'type_month';

const propTypes = {
  type: PropTypes.string,
};

const defaultProps = {
  type: TYPE_DATE,
};

class Calendar extends React.PureComponent {
  render() {
    return (
      <div className="calendar">
        {this.props.type === TYPE_DATE
          ? <CalendarDate {...this.props} />
          : <CalendarMonth {...this.props} />
        }
      </div>
    );
  }
}

Calendar.propTypes = propTypes;
Calendar.defaultProps = defaultProps;

Calendar.TYPE_DATE = TYPE_DATE;
Calendar.TYPE_MONTH = TYPE_MONTH;

export default Calendar;
