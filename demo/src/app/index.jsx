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
import Tooltip from './Tooltip';
import Portal from './Portal';
import Spinner from './Spinner';
import Select from './Select';
import NumberFlip from './NumberFlip/index';
import Dialog from './Dialog';
import Form from './Form';
import Grid from './Grid';

const links = [{
  url: 'table',
  title: 'Table',
}, {
  url: 'grid',
  title: 'Grid',
}, {
  url: 'odometerNumber',
  title: 'OdometerNumber',
}, {
  url: 'codeEditor',
  title: 'CodeEditor',
}, {
  url: 'datePicker',
  title: 'DatePicker',
}, {
  url: 'dateRangePicker',
  title: 'DateRangePicker',
}, {
  url: 'fullScreenModal',
  title: 'FullScreenModal',
}, {
  url: 'trigger',
  title: 'Trigger',
}, {
  url: 'tooltip',
  title: 'Tooltip',
}, {
  url: 'portal',
  title: 'Portal',
}, {
  url: 'spinner',
  title: 'Spinner',
}, {
  url: 'select',
  title: 'Select',
}, {
  url: 'numberFlip',
  title: 'NumberFlip',
}, {
  url: 'dialog',
  title: 'Dialog',
}, {
  url: 'form',
  title: 'Form',
}];

const Port = props => (
  <div className="p-3">
    {props.children != null
        ? props.children
        : (
          <ul className={style.navs}>
            {links.map(({ url, title }) => (
              <li key={url}>
                <Link to={url}>
                  {title}
                </Link>
              </li>
            ))}
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
      <Route path="tooltip" component={Tooltip} />
      <Route path="portal" component={Portal} />
      <Route path="spinner" component={Spinner} />
      <Route path="select" component={Select} />
      <Route path="numberFlip" component={NumberFlip} />
      <Route path="dialog" component={Dialog} />
      <Route path="form" component={Form} />
      <Route path="grid" component={Grid} />
    </Route>
  </Router>,
  document.getElementById('main'),
);
