import React from 'react';
import { CodeEditor } from '../../../src/components';
import ShowcaseContainer from './ShowcaseContainer';

const defaultState = {
  value: '',
  insert: null,
  focus: false,
  cursor: null,
};

class ShowCaseCodeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...defaultState };
  }

  render() {
    return (
      <ShowcaseContainer title="CodeEditor">
        <CodeEditor
          value={this.state.value}
          insert={this.state.insert}
          cursor={this.state.cursor}
          focus={this.state.focus}
          onChange={value => this.setState({ value })}
          onFocus={() => this.setState({ focus: true })}
          onBlur={() => this.setState({ focus: false })}
          onClearInsert={() => this.setState({ insert: null })}
        />
        <div style={{ marginTop: 20 }}>
          <div
            className="btn btn-primary"
            aria-hidden
            onClick={() => this.setState({ focus: true })}
          >
            Focus
          </div>

          <div
            className="btn btn-primary ml-1"
            aria-hidden
            onClick={() => this.setState({ value: 'SELECT  FROM "1999:online_dw_01".newtable LIMIT 1000', cursor: 7 })}
          >
            Set Value
          </div>

          <div
            className="btn btn-primary ml-1"
            aria-hidden
            onClick={() => this.setState({ insert: 'tableName' })}
          >
            Set Value
          </div>

          <div
            className="btn btn-primary ml-1"
            aria-hidden
            onClick={() => this.setState({ ...defaultState })}
          >
            Clear
          </div>
        </div>
      </ShowcaseContainer>
    );
  }
}

export default ShowCaseCodeEditor;
