import React from 'react';

import ShowcaseContainer from './ShowcaseContainer/index';

import Trigger from '../../../src/Trigger';
import Popover from '../../../src/Popover/Popover';

class ShowcaseTrigger extends React.PureComponent {
  constructor(props) {
    super(props);

    this.popoverElements = {};
  }

  render() {
    return (
      <ShowcaseContainer title="Trigger">
        {(new Array(1)).fill(0).map((i, index) => (
          <div key={`${index + 1}`} className="mt-1">
            <Trigger
              action="click"
              enterClassName="move-up-in"
              leaveClassName="move-up-out"
              popover={(
                <Popover
                  ref={(el) => { this.popoverElements[index] = el; }}
                >
                  <div className="popover-header">
                    Popover Header
                  </div>
                  <div className="popover-body">
                    Popover Content
                  </div>
                </Popover>
              )}
            >
              <div
                className="btn btn-primary"
                aria-hidden
              >
                Show Popover
              </div>
            </Trigger>
          </div>
        ))}
      </ShowcaseContainer>
    );
  }
}

export default ShowcaseTrigger;
