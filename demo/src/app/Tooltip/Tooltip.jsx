import React from 'react';
import ShowcaseContainer from '../ShowcaseContainer/ShowcaseContainer';

import style from './style/index.scss';
import Tooltip from '../../../../src/Tooltip/Tooltip';
import Popover from '../../../../src/Popover';

class ShowcaseTooltip extends React.PureComponent {
  render() {
    return (
      <ShowcaseContainer title="Tooltip">
        <div className="mt-2">
          <Tooltip title="top">
            <div className={style.trigger}>Top</div>
          </Tooltip>

          <Tooltip
            title="bottom"
            placement={{
              vertical: Popover.PLACEMENT_BOTTOM,
              horizontal: Popover.PLACEMENT_CENTER,
            }}
          >
            <div className={style.trigger}>Bottom</div>
          </Tooltip>

          <Tooltip
            title="left"
            placement={{
              vertical: Popover.PLACEMENT_CENTER,
              horizontal: Popover.PLACEMENT_LEFT,
            }}
          >
            <div className={style.trigger}>Left</div>
          </Tooltip>

          <Tooltip
            title="right"
            placement={{
              vertical: Popover.PLACEMENT_CENTER,
              horizontal: Popover.PLACEMENT_RIGHT,
            }}
          >
            <div className={style.trigger}>Right</div>
          </Tooltip>

          <Tooltip
            title="bottom left"
            placement={{
              vertical: Popover.PLACEMENT_BOTTOM,
              horizontal: Popover.PLACEMENT_LEFT_ALIGN,
            }}
          >
            <div className={style.trigger}>Bottom Left</div>
          </Tooltip>

          <Tooltip
            title="bottom right"
            placement={{
              vertical: Popover.PLACEMENT_BOTTOM,
              horizontal: Popover.PLACEMENT_RIGHT_ALIGN,
            }}
          >
            <div className={style.trigger}>Bottom Right</div>
          </Tooltip>

          <Tooltip
            title="top left"
            placement={{
              vertical: Popover.PLACEMENT_TOP,
              horizontal: Popover.PLACEMENT_LEFT_ALIGN,
            }}
          >
            <div className={style.trigger}>Top Left</div>
          </Tooltip>

          <Tooltip
            title="top right"
            placement={{
              vertical: Popover.PLACEMENT_TOP,
              horizontal: Popover.PLACEMENT_RIGHT_ALIGN,
            }}
          >
            <div className={style.trigger}>Top Right</div>
          </Tooltip>
        </div>
      </ShowcaseContainer>
    );
  }
}

export default ShowcaseTooltip;
