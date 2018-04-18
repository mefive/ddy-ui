import React from 'react';
import moment from 'moment';
import ShowcaseContainer from './ShowcaseContainer';
import DateRangePicker from '../../../src/DateRangePicker/DateRangePicker';

class ShowcaseDateRangePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start: moment().subtract().format('YYYY-MM-DD'),
      end: moment().format('YYYY-MM-DD'),
    };
  }

  render() {
    return (
      <ShowcaseContainer title="DateRangePicker">
        <div>
          <DateRangePicker
            start={this.state.start}
            end={this.state.end}
            onChange={({ start, end }) =>
              this.setState({ start, end })}
          />
        </div>
      </ShowcaseContainer>
    );
  }
}

export default ShowcaseDateRangePicker;
