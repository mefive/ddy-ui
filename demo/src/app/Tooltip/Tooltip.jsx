import React from 'react';
import ShowcaseContainer from '../ShowcaseContainer/ShowcaseContainer';

import Tooltip from '../../../../src/Tooltip/Tooltip';
import Popover from '../../../../src/Popover';

import './style.scss';

class ShowcaseTooltip extends React.PureComponent {
  render() {
    return (
      <ShowcaseContainer title="Tooltip">
        <div className="d-flex flex-wrap ml-n1 mt-n2">
          <Tooltip title="top">
            <div className="tooltip-trigger ml-1 mt-2">Top</div>
          </Tooltip>

          <Tooltip
            title="bottom"
            placement={Popover.placement.BOTTOM}
            dark
          >
            <div className="tooltip-trigger ml-1 mt-2">Bottom</div>
          </Tooltip>

          <Tooltip
            title="left"
            placement={Popover.placement.LEFT}
          >
            <div className="tooltip-trigger ml-1 mt-2">Left</div>
          </Tooltip>

          <Tooltip
            title="right"
            placement={Popover.placement.RIGHT}
          >
            <div className="tooltip-trigger ml-1 mt-2">Right</div>
          </Tooltip>

          <Tooltip
            title="top left"
            placement={Popover.placement.TOP_LEFT}
          >
            <div className="tooltip-trigger ml-1 mt-2">Top Left</div>
          </Tooltip>

          <Tooltip
            title="top right"
            placement={Popover.placement.TOP_RIGHT}
          >
            <div className="tooltip-trigger ml-1 mt-2">Top Right</div>
          </Tooltip>

          <Tooltip
            title="bottom left"
            placement={Popover.placement.BOTTOM_LEFT}
          >
            <div className="tooltip-trigger ml-1 mt-2">Bottom Left</div>
          </Tooltip>

          <Tooltip
            title="bottom right"
            placement={Popover.placement.BOTTOM_RIGHT}
          >
            <div className="tooltip-trigger ml-1 mt-2">Bottom Right</div>
          </Tooltip>

          <Tooltip
            title="left top"
            placement={Popover.placement.LEFT_TOP}
          >
            <div className="tooltip-trigger ml-1 mt-2">Left Top</div>
          </Tooltip>

          <Tooltip
            title="left bottom"
            placement={Popover.placement.LEFT_BOTTOM}
          >
            <div className="tooltip-trigger ml-1 mt-2">Left Bottom</div>
          </Tooltip>

          <Tooltip
            title="right top"
            placement={Popover.placement.RIGHT_TOP}
          >
            <div className="tooltip-trigger ml-1 mt-2">Right Top</div>
          </Tooltip>

          <Tooltip
            title="right bottom"
            placement={Popover.placement.RIGHT_BOTTOM}
          >
            <div className="tooltip-trigger ml-1 mt-2">Right Bottom</div>
          </Tooltip>
        </div>
      </ShowcaseContainer>
    );
  }
}

export default ShowcaseTooltip;
