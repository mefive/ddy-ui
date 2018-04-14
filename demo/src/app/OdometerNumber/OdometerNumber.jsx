import React from 'react';
import { OdometerNumber } from '../../../../src/components';
import calendarBackgoundImage from './images/calendar.png';
import ShowcaseContainer from '../ShowcaseContainer/ShowcaseContainer';

class ShowcaseOdometerNumber extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 1001.01,
      count: 0,
    };
  }

  render() {
    return (
      <ShowcaseContainer title={"Odometer Number"}>
        <div className="bold">Float Number</div>
        <div className="mt-1">
          <OdometerNumber value={this.state.size} unit="MB" />
          <div>
            <div
              className="btn btn-primary"
              aria-hidden
              onClick={() => this.setState({ size: this.state.size + 0.1 })}
            >
              Add
            </div>
          </div>
        </div>

        <div className="bold mt-3">Calendar Flip</div>
        <div className="mt-1">
          <div>
            <div className="p-relative d-inline-block">
              <img
                src={calendarBackgoundImage}
                alt="calendar"
                style={{ width: 150, height: 'auto' }}
              />
              <div
                className="p-absolute text-center"
                style={{
                  top: 29,
                  left: 0,
                  width: '100%',
                  color: '#F84647',
                  fontSize: 100,
                  lineHeight: 1,
              }}
              >
                <OdometerNumber value={this.state.count} />
              </div>
            </div>
          </div>
          <div
            className="btn btn-primary"
            aria-hidden
            onClick={() => this.setState({ count: this.state.count + 3 })}
          >
            Add
          </div>
        </div>
      </ShowcaseContainer>
    );
  }
}

export default ShowcaseOdometerNumber;
