import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import RmcDatePicker from 'rmc-date-picker';
import RmcPopPicker from 'rmc-date-picker/lib/Popup';
import 'rmc-picker/assets/index.css';
import 'rmc-date-picker/assets/index.css';
import 'rmc-picker/assets/popup.css';

const MODE_DATE = 'date';
const MODE_TIME = 'time';
const MODE_DATETIME = 'datetime';
const MODE_YEAR = 'year';
const MODE_MONTH = 'month';

const propTypes = {
  mode: PropTypes.string,
  minDate: PropTypes.instanceOf(moment),
  maxDate: PropTypes.instanceOf(moment),
  value: PropTypes.instanceOf(moment),
  onChange: PropTypes.func,
  popupTitle: PropTypes.string,
  children: PropTypes.node,
};

const defaultProps = {
  mode: MODE_DATE,
  minDate: null,
  maxDate: null,
  value: null,
  popupTitle: '请选择',
  onChange: () => null,
  children: null,
};

class DatePicker extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      maxDate: this.props.maxDate && this.props.maxDate.toDate(),
      minDate: this.props.minDate && this.props.minDate.toDate(),
      value: this.props.value == null ? new Date() : this.props.value.toDate(),
    };
  }

  componentWillReceiveProps({ value, maxDate, minDate }) {
    if (value !== this.props.value) {
      this.setState({ value: value == null ? new Date() : value.toDate() });
    }

    if (maxDate !== this.props.maxDate) {
      this.setState({ maxDate: maxDate.toDate() });
    }

    if (minDate !== this.props.minDate) {
      this.setState({ minDate: minDate.toDate() });
    }
  }

  render() {
    const datePicker = (
      <RmcDatePicker
        rootNativeProps={{ 'data-xx': 'yy' }}
        defaultDate={new Date()}
        mode={this.props.mode}
        maxDate={this.state.maxDate}
        minDate={this.state.minDate}
      />
    );

    return (
      <RmcPopPicker
        datePicker={datePicker}
        transitionName="rmc-picker-popup-slide-fade"
        maskTransitionName="rmc-picker-popup-fade"
        title={this.props.popupTitle}
        date={this.state.value}
        onChange={value => this.props.onChange(moment(value))}
        okText="确定"
        dismissText="取消"
      >
        {this.props.children}
      </RmcPopPicker>
    );
  }
}

DatePicker.propTypes = propTypes;
DatePicker.defaultProps = defaultProps;

DatePicker.MODE_DATE = MODE_DATE;
DatePicker.MODE_TIME = MODE_TIME;
DatePicker.MODE_DATETIME = MODE_DATETIME;
DatePicker.MODE_YEAR = MODE_YEAR;
DatePicker.MODE_MONTH = MODE_MONTH;

export default DatePicker;
