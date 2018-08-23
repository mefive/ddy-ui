import React from 'react';
import ShowcaseContainer from './ShowcaseContainer';
import ContextMenu from '../../../src/ContextMenu/ContextMenu';

class ContextMenuShowcase extends React.PureComponent {
  render() {
    return (
      <ShowcaseContainer>
        <div>
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
      </ShowcaseContainer>
    );
  }
}

export default ContextMenuShowcase;
