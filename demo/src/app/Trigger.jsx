import React from 'react';

import ShowcaseContainer from './ShowcaseContainer/index';

import Trigger from '../../../src/Trigger';
import Popover from '../../../src/Popover/Popover';
import Clickable from '../../../src/Clickable';

class ShowcaseTrigger extends React.PureComponent {
  state = {
    active: false,
  };

  render() {
    const { active } = this.state;

    return (
      <ShowcaseContainer title="Trigger">
        <div className="mt-1">
          <Trigger
            active={active}
            enterClassName="move-up-in"
            leaveClassName="move-up-out"
            action={Trigger.action.HOVER_HOLD}
            leaveDelay={300}
            onActiveChange={a => this.setState({ active: a })}
            popover={() => (
              <Popover>
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
      </ShowcaseContainer>
    );
  }
}

export default ShowcaseTrigger;
