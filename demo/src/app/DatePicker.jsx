import React from 'react';
import moment from 'moment';

import ShowcaseContainer from './ShowcaseContainer';
import DatePicker from '../../../src/DatePicker/DatePicker';

class ShowcaseDatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: moment().format('YYYY-MM-DD'),
    };
  }

  render() {
    return (
      <ShowcaseContainer title="DatePicker">
        <div>
          <DatePicker
            value={this.state.value}
            onChange={value => this.setState({ value })}
          />
        </div>
      </ShowcaseContainer>
    );
  }
}

export default ShowcaseDatePicker;
