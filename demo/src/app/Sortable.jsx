import React from 'react';
import debounce from 'lodash/debounce';
import ShowcaseContainer from './ShowcaseContainer/ShowcaseContainer';
import Sortable from '../../../src/Sortable/Sortable';

class SortableShowcase extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: Array(30).fill(0).map((n, index) => ({ value: index })),
    };

    this.onScroll = debounce(this.onScroll.bind(this));

    window.addEventListener('scroll', this.onScroll);
  }

  onScroll() {
    this.sortable.updatePositions();
  }

  render() {
    return (
      <ShowcaseContainer title="Sortable">
        <div className="mt-1" style={{ background: '#F9FAFC', width: 600 }}>
          <Sortable
            ref={(el) => { this.sortable = el; }}
            onChange={({ oldIndex, newIndex }) => {
              const dataSource = [...this.state.dataSource];
              const target = dataSource[oldIndex];
              dataSource.splice(oldIndex, 1);
              dataSource.splice(newIndex, 0, target);
              this.setState({ dataSource });
            }}
          >
            {this.state.dataSource.map(({ value }, index) => (
              <div
                key={`${index + 1}`}
                style={{
                  height: 50,
                  background: '#fff',
                  lineHeight: '50px',
                }}
                className="border-bottom-0"
              >
                {value}
              </div>
            ))}
          </Sortable>
        </div>
      </ShowcaseContainer>
    );
  }
}

export default SortableShowcase;
