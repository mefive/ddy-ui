import React from 'react';
import ShowcaseContainer from '../ShowcaseContainer/ShowcaseContainer';

import Tooltip from '../../../../src/Tooltip/Tooltip';
import Popover from '../../../../src/Popover';

import './style.scss';

const ShowcaseTooltip = () => (
  <ShowcaseContainer title="Tooltip">
    <div className="d-flex flex-wrap ml-n3 mt-n3">
      <Tooltip title="top">
        <div className="tooltip-trigger ml-3 mt-3">Top</div>
      </Tooltip>

      <Tooltip
        title="bottom"
        placement={Popover.placement.BOTTOM}
        dark
      >
        <div className="tooltip-trigger ml-3 mt-3">Bottom</div>
      </Tooltip>

      <Tooltip
        title="left"
        placement={Popover.placement.LEFT}
      >
        <div className="tooltip-trigger ml-3 mt-3">Left</div>
      </Tooltip>

      <Tooltip
        title="right"
        placement={Popover.placement.RIGHT}
      >
        <div className="tooltip-trigger ml-3 mt-3">Right</div>
      </Tooltip>

      <Tooltip
        title="top left"
        placement={Popover.placement.TOP_LEFT}
      >
        <div className="tooltip-trigger ml-3 mt-3">Top Left</div>
      </Tooltip>

      <Tooltip
        title="top right"
        placement={Popover.placement.TOP_RIGHT}
      >
        <div className="tooltip-trigger ml-3 mt-3">Top Right</div>
      </Tooltip>

      <Tooltip
        title="bottom left"
        placement={Popover.placement.BOTTOM_LEFT}
      >
        <div className="tooltip-trigger ml-3 mt-3">Bottom Left</div>
      </Tooltip>

      <Tooltip
        title="bottom right"
        placement={Popover.placement.BOTTOM_RIGHT}
      >
        <div className="tooltip-trigger ml-3 mt-3">Bottom Right</div>
      </Tooltip>

      <Tooltip
        title="left top"
        placement={Popover.placement.LEFT_TOP}
      >
        <div className="tooltip-trigger ml-3 mt-3">Left Top</div>
      </Tooltip>

      <Tooltip
        title="left bottom"
        placement={Popover.placement.LEFT_BOTTOM}
      >
        <div className="tooltip-trigger ml-3 mt-3">Left Bottom</div>
      </Tooltip>

      <Tooltip
        title="right top"
        placement={Popover.placement.RIGHT_TOP}
      >
        <div className="tooltip-trigger ml-3 mt-3">Right Top</div>
      </Tooltip>

      <Tooltip
        title="right bottom"
        placement={Popover.placement.RIGHT_BOTTOM}
      >
        <div className="tooltip-trigger ml-3 mt-3">Right Bottom</div>
      </Tooltip>
    </div>
  </ShowcaseContainer>
);

export default ShowcaseTooltip;
