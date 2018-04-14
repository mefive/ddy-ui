import React from 'react';
import random from 'lodash/random';
import { NumberFlip } from '../../../../src/components';

import style from './style/index.scss';
import ShowcaseContainer from '../ShowcaseContainer/ShowcaseContainer';

class NumberFlipShowcase extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      value: 200,
    };
  }

  render() {
    return (
      <ShowcaseContainer title="Number Flip">
        <div className="mt-1">
          <div
            className="btn btn-primary"
            aria-hidden
            onClick={() => this.setState({ value: random(200, 3000) })}
          >+
          </div>
          <div
            className="btn btn-error ml-1"
            aria-hidden
            onClick={() => this.setState({ value: random(200, 3000) })}
          >-
          </div>
        </div>

        <div className="mt-1">
          {this.state.value}
        </div>

        <div className="mt-1">
          <NumberFlip
            className={style['number-flip']}
            value={this.state.value}
          />
        </div>
      </ShowcaseContainer>
    );
  }
}

export default NumberFlipShowcase;
