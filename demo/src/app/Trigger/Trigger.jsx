import React from 'react';
import classNames from 'classnames';
import moment from 'moment';

import { DatePicker, DateRangePicker, Popover, Select, Tooltip, Trigger } from '../../../../src';
import { getPopoverContainer } from '../../../..//src/utils/layout';

import style from './style/index.scss';
import ShowcaseContainer from '../ShowcaseContainer/ShowcaseContainer';

function formatDate() {
  return moment().format('YYYY-MM-DD');
}

class ShowcaseTrigger extends React.PureComponent {
  constructor(props) {
    super(props);
    this.popoverElements = {};
    this.state = {
      select: 1,
      date: formatDate(),
      range: {
        start: formatDate(),
        end: formatDate(),
      },
    };
  }

  render() {
    return (
      <ShowcaseContainer title="Trigger">
        {(new Array(1)).fill(0).map((i, index) => (
          <div key={`${index + 1}`} className="mt-1">
            <Trigger
              action="click"
              getPopoverContainer={() => getPopoverContainer(this.wrapper)}
              enterClassName="move-right-in"
              leaveClassName="move-right-out"
              popover={(
                <Popover
                  className={classNames(
                    'p-3',
                    style.popover,
                  )}
                  ref={(el) => { this.popoverElements[index] = el; }}
                >
                  Popover Content
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

        <div className="mt-3 bold">Tooltip</div>
        <div className="mt-1 text-center">
          <Tooltip title="top">
            <div className="d-inline-block">Top</div>
          </Tooltip>

          <Tooltip title="bottom" placement={Popover.placement.BOTTOM}>
            <div className="d-inline-block ml-3">Bottom</div>
          </Tooltip>

          <Tooltip title="left" placement={Popover.placement.LEFT}>
            <div className="d-inline-block ml-3">Left</div>
          </Tooltip>

          <Tooltip title="right" placement={Popover.placement.RIGHT}>
            <div className="d-inline-block ml-3">Right</div>
          </Tooltip>

          <Tooltip title="bottom left" placement={Popover.placement.BOTTOM_LEFT}>
            <div className="d-inline-block ml-3">Bottom Left</div>
          </Tooltip>

          <Tooltip title="bottom right" placement={Popover.placement.BOTTOM_RIGHT}>
            <div className="d-inline-block ml-3">Bottom Right</div>
          </Tooltip>

          <Tooltip title="top left" placement={Popover.placement.TOP_LEFT}>
            <div className="d-inline-block ml-3">Top Left</div>
          </Tooltip>

          <Tooltip title="top right" placement={Popover.placement.TOP_RIGHT}>
            <div className="d-inline-block ml-3">Top Right</div>
          </Tooltip>
        </div>

        <div className="mt-3 bold">Select</div>
        <div className="mt-1">
          <Select
            options={[{
              value: 1,
              title: 'China',
            }, {
              value: 2,
              title: 'Japan',
            }]}
            value={this.state.select}
            onChange={select => this.setState({ select })}
          />
        </div>

        <div className="mt-3 bold">DatePicker</div>
        <div className="mt-1">
          <DatePicker
            value={this.state.date}
            onChange={date => this.setState({ date })}
          />
        </div>

        <div className="mt-3 bold">DateRangePicker</div>
        <div className="mt-1">
          <DateRangePicker
            start={this.state.range.start}
            end={this.state.range.end}
            onChange={({ start, end }) => this.setState({ range: { start, end } })}
          />
        </div>
      </ShowcaseContainer>
    );
  }
}

export default ShowcaseTrigger;
