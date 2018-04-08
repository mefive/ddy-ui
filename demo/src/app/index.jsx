import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {
  Router,
  Route,
  hashHistory,
  Link,
} from 'react-router';

import style from './style/index.scss';

// pages
import Table from './Table';
import OdometerNumber from './OdometerNumber';
import CodeEditor from './CodeEditor';
import DatePicker from './DatePicker';
import DateRangePicker from './DateRangePicker';
import FullScreenModal from './FullScreenModal';
import Trigger from './Trigger';
import Portal from './Portal';
import Spinner from './Spinner';
import Select from './Select';
import NumberFlip from './NumberFlip/index';

const Port = props => (
  <div className="p-3">
    {props.children != null
        ? props.children
        : (
          <ul className={style.navs}>
            <li>
              <Link to="table">
                Table
              </Link>
            </li>

            <li>
              <Link to="odometerNumber">
                OdometerNumber
              </Link>
            </li>

            <li>
              <Link to="codeEditor">
                CodeEditor
              </Link>
            </li>

            <li>
              <Link to="datePicker">
                DatePicker
              </Link>
            </li>

            <li>
              <Link to="dateRangePicker">
                DateRangePicker
              </Link>
            </li>

            <li>
              <Link to="fullScreenModal">
                FullScreenModal
              </Link>
            </li>

            <li>
              <Link to="trigger">
                Trigger
              </Link>
            </li>

            <li>
              <Link to="portal">
                Portal
              </Link>
            </li>

            <li>
              <Link to="spinner">
                Spinner
              </Link>
            </li>

            <li>
              <Link to="select">
                Select
              </Link>
            </li>

            <li>
              <Link to="numberFlip">
                Number Flip
              </Link>
            </li>
          </ul>
        )
      }
  </div>
);

Port.propTypes = { children: PropTypes.node };
Port.defaultProps = { children: null };

ReactDOM.render(
  <Router
    history={hashHistory}
  >
    <Route path="/" component={Port}>
      <Route path="table" component={Table} />
      <Route path="odometerNumber" component={OdometerNumber} />
      <Route path="codeEditor" component={CodeEditor} />
      <Route path="datePicker" component={DatePicker} />
      <Route path="dateRangePicker" component={DateRangePicker} />
      <Route path="fullScreenModal" component={FullScreenModal} />
      <Route path="trigger" component={Trigger} />
      <Route path="portal" component={Portal} />
      <Route path="spinner" component={Spinner} />
      <Route path="select" component={Select} />
      <Route path="numberFlip" component={NumberFlip} />
    </Route>
  </Router>,
  document.getElementById('main'),
);
