import React from 'react';
import { DoubleBounce, Tooltip } from '../../../src';
import ShowcaseContainer from './ShowcaseContainer/ShowcaseContainer';

class Spinner extends React.PureComponent {
  render() {
    return (
      <ShowcaseContainer title="Spinner">
        <div className="bold">Double Bounce</div>
        <div className="mt-1">
          <Tooltip title='点击去"服务中心"订阅节点'>
            <div className="ml-3 d-inline-block align-middle" style={{ width: 40, height: 40 }} />
          </Tooltip>

          <Tooltip title='点击去"服务中心"订阅节点'>
            <div className="d-inline-block">
              <DoubleBounce className="align-middle" />
            </div>
          </Tooltip>

          <Tooltip title='点击去"服务中心"订阅节点'>
            <div className="d-inline-block">
              <DoubleBounce size={20} color="#61C177" className="align-middle" />
            </div>
          </Tooltip>
        </div>
      </ShowcaseContainer>
    );
  }
}

export default Spinner;
