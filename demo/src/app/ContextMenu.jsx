import React from 'react';
import ShowcaseContainer from './ShowcaseContainer';
import ContextMenu from '../../../src/ContextMenu/ContextMenu';
import Tooltip from '../../../src/Tooltip/Tooltip';

class ContextMenuShowcase extends React.PureComponent {
  render() {
    return (
      <ShowcaseContainer title="Context Menu">
        <div>
          <Tooltip title="123">
            <div className="d-inline-block">
              <ContextMenu
                menus={[{
                  title: '删除',
                  value: 'delete',
                }]}
              >
                <div className="btn btn-primary">
                  Context Menu
                </div>
              </ContextMenu>
            </div>
          </Tooltip>
        </div>
      </ShowcaseContainer>
    );
  }
}

export default ContextMenuShowcase;
