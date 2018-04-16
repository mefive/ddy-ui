'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultOptions = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _cloneDeep = require('lodash/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _merge = require('lodash/merge');

var _merge2 = _interopRequireDefault(_merge);

var _highcharts = require('highcharts');

var _highcharts2 = _interopRequireDefault(_highcharts);

require('./style/index.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('highcharts/modules/exporting')(_highcharts2.default);
require('highcharts/modules/no-data-to-display')(_highcharts2.default);

var propTypes = {
  className: _propTypes2.default.string,
  options: _propTypes2.default.shape({}),
  height: _propTypes2.default.number,
  series: _propTypes2.default.arrayOf(_propTypes2.default.object),
  categories: _propTypes2.default.arrayOf(_propTypes2.default.any),
  hideLegend: _propTypes2.default.bool,
  max: _propTypes2.default.number,
  selects: _propTypes2.default.arrayOf(_propTypes2.default.any)
};

var defaultProps = {
  className: null,
  series: null,
  categories: [],
  options: null,
  height: 200,
  selects: [],
  hideLegend: false,
  max: null
};

_highcharts2.default.setOptions({
  lang: { thousandsSep: ',' }
});

function formatSeries(series, max, selects) {
  var newSeries = series;

  if (series) {
    if (selects.length > 0) {
      newSeries = series.filter(function (i, index) {
        return selects.indexOf(index) !== -1;
      });
    }

    if (max) {
      newSeries = series.slice(0, max);
    }

    var _newSeries = newSeries,
        length = _newSeries.length;


    newSeries.forEach(function (i, index) {
      var rt = i;

      rt.zIndex = length - index;

      if (rt.visible == null) {
        rt.visible = true;
      }

      if (index === 0) {
        rt.lineWidth = 2;
      }
    });
  }

  return newSeries;
}

var defaultOptions = exports.defaultOptions = {
  chart: {
    type: 'line',
    events: {
      load: function load() {
        this.showLoading();
        this.hasData = function () {
          return true;
        };
      }
    }
  },
  credits: { enabled: false },
  title: {
    text: '',
    x: -20, // center
    style: { display: 'none' }
  },
  colors: ['#0080ec', '#29c664', '#ff5c3c', '#9f7bf9', '#ffb128', '#c849df', '#ff3d74', '#1fd8af', '#badd66', '#3cb3ff'],
  xAxis: {
    categories: [],
    crosshair: {
      width: 1,
      color: '#D8D8D8',
      dashStyle: 'Solid'
    }
  },
  yAxis: {
    title: { text: '' }
  },
  lang: {
    noData: '没有数据',
    loading: '加载中...'
  },
  noData: {
    style: {
      fontWeight: '300',
      fontSize: '16px',
      color: '#a0a0a0'
    }
  },
  loading: {
    style: {
      fontWeight: '300',
      fontSize: '16px',
      color: '#a0a0a0'
    }
  },
  tooltip: {
    valueSuffix: '',
    shared: true
  },
  plotOptions: {
    series: {
      marker: {
        fillColor: 'white',
        lineColor: null,
        lineWidth: 1,
        symbol: 'circle',
        radius: 3
      },
      states: {
        hover: {
          lineWidth: 2
        }
      }
    }
  },
  legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'middle',
    borderWidth: 0,
    enabled: false
  },
  series: [],
  exporting: {
    enabled: false
  }
};

var Chart = function (_React$Component) {
  (0, _inherits3.default)(Chart, _React$Component);

  function Chart(props) {
    (0, _classCallCheck3.default)(this, Chart);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Chart.__proto__ || (0, _getPrototypeOf2.default)(Chart)).call(this, props));

    var options = _this.props.options == null ? (0, _extends3.default)({}, defaultOptions) : (0, _extends3.default)({}, defaultOptions, _this.props.options);

    _this.state = {
      series: _this.props.series && (0, _cloneDeep2.default)(formatSeries(_this.props.series, _this.props.max, _this.props.selects)),
      categories: _this.props.categories && (0, _cloneDeep2.default)(_this.props.categories),
      options: options
    };
    return _this;
  }

  (0, _createClass3.default)(Chart, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.createChart(true);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref) {
      var max = _ref.max,
          selects = _ref.selects,
          options = _ref.options,
          categories = _ref.categories,
          series = _ref.series;

      if (this.props.series !== series) {
        this.setState({
          series: (0, _cloneDeep2.default)(formatSeries(series, max, selects)),
          categories: (0, _cloneDeep2.default)(categories)
        });
      } else if (this.props.series && this.props.selects !== selects) {
        this.setState({
          series: formatSeries((0, _cloneDeep2.default)(this.props.series), max, selects)
        });
      }

      if (this.props.options !== options) {
        this.setState({
          options: (0, _extends3.default)({}, defaultOptions, options)
        });
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevProps.series !== this.props.series) {
        this.createChart(true);
      } else if (prevState.series !== this.state.series) {
        // when visible changed or selects changed
        this.createChart(true);
      } else if (prevState.options !== this.state.options && this.props.series != null) {
        this.createChart(true);
      }
    }
  }, {
    key: 'toggleVisible',
    value: function toggleVisible(index) {
      var series = this.state.series;


      series[index].visible = !series[index].visible;

      this.setState({ series: [].concat((0, _toConsumableArray3.default)(series)) });
    }
  }, {
    key: 'createChart',
    value: function createChart(needSetCategories) {
      var _this2 = this;

      if (this.chart) {
        this.chart.destroy();
      }

      var height = this.props.height;
      var options = this.state.options;


      var chart = new _highcharts2.default.Chart((0, _merge2.default)(options, {
        chart: {
          renderTo: this.chartWrapper,
          height: height
        }
      }));

      this.chart = chart;

      this.chart.showLoading();

      var _state = this.state,
          series = _state.series,
          categories = _state.categories;


      if (series == null) {
        return;
      }

      series.forEach(function (i) {
        return _this2.chart.addSeries(i);
      });

      if (series.length !== 0) {
        chart.hasData = function () {
          return true;
        };
        chart.hideLoading();
      } else {
        chart.hasData = function () {
          return false;
        };
        chart.hideLoading();
        chart.showNoData();
      }

      if (needSetCategories) {
        chart.xAxis[0].setCategories(categories);
      }

      chart.series.forEach(function (i) {
        var s = series.find(function (j) {
          return j.name === i.name;
        });
        if (s) {
          s.color = i.color;
        }
      });

      this.setState({ series: series });
    }
  }, {
    key: 'resize',
    value: function resize() {
      if (this.chart) {
        this.chart.reflow();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      // const { className, height, hideLegend } = this.props;
      var series = this.state.series;


      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)('chart', (0, _defineProperty3.default)({}, this.props.className, this.props.className != null))
        },
        _react2.default.createElement('div', {
          className: 'chart-wrapper',
          ref: function ref(el) {
            _this3.chartWrapper = el;
          },
          style: { height: this.props.height }
        }),
        series && series.length > 0 && !this.props.hideLegend && _react2.default.createElement(
          'div',
          { className: 'chart-legend' },
          series.map(function (i, index) {
            return _react2.default.createElement(
              'div',
              {
                className: 'label',
                key: '' + (index + 1),
                'data-series-name': i.name,
                'data-visible': i.visible,
                onClick: function onClick() {
                  return _this3.toggleVisible(index);
                },
                'aria-hidden': true
              },
              _react2.default.createElement('div', {
                className: 'checkbox',
                style: { backgroundColor: i.visible ? i.color : null }
              }),
              i.name
            );
          })
        )
      );
    }
  }]);
  return Chart;
}(_react2.default.Component);

Chart.propTypes = propTypes;
Chart.defaultProps = defaultProps;

exports.default = Chart;