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

          <Tooltip title="bottom" placement={Popover.placement.BOTTOM}>
            <div className={style.trigger}>Bottom</div>
          </Tooltip>

          <Tooltip title="left" placement={Popover.placement.LEFT}>
            <div className={style.trigger}>Left</div>
          </Tooltip>

          <Tooltip title="right" placement={Popover.placement.RIGHT}>
            <div className={style.trigger}>Right</div>
          </Tooltip>

          <Tooltip title="bottom left" placement={Popover.placement.BOTTOM_LEFT}>
            <div className={style.trigger}>Bottom Left</div>
          </Tooltip>

          <Tooltip title="bottom right" placement={Popover.placement.BOTTOM_RIGHT}>
            <div className={style.trigger}>Bottom Right</div>
          </Tooltip>

          <Tooltip title="top left" placement={Popover.placement.TOP_LEFT}>
            <div className={style.trigger}>Top Left</div>
          </Tooltip>

          <Tooltip title="top right" placement={Popover.placement.TOP_RIGHT}>
            <div className={style.trigger}>Top Right</div>
          </Tooltip>
        </div>
      </ShowcaseContainer>
    );
  }
}

export default ShowcaseTooltip;
