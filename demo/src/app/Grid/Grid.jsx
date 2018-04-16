import React from 'react';
import ShowcaseContainer from '../ShowcaseContainer/ShowcaseContainer';
import { Row, Col } from '../../../../src';
import style from './style/index.scss';

const GUTTER = 20;

class Grid extends React.PureComponent {
  renderCol(key) {
    return (
      <Col
        key={key}
        className="mt-2"
        gutter={GUTTER}
        xs={{ span: 12 }}
        sm={{ span: 6 }}
        md={{ span: 4 }}
        lg={{ span: 3 }}
        xl={{ span: 2 }}
        xxl={{ span: 1 }}
      >
        <div className={style.col}>col</div>
      </Col>
    );
  }

  render() {
    return (
      <ShowcaseContainer title="Grid">
        <Row gutter={GUTTER}>
          {(() => {
            const cols = [];

            for (let i = 0; i < 20; i += 1) {
              cols.push(this.renderCol(i));
            }

            return cols;
          })()}
        </Row>
      </ShowcaseContainer>
    );
  }
}

export default Grid;
