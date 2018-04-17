import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';
import Highcharts from 'highcharts';
import './style/index.scss';

require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/no-data-to-display')(Highcharts);

const propTypes = {
  className: PropTypes.string,
  options: PropTypes.shape({}),
  height: PropTypes.number,
  series: PropTypes.arrayOf(PropTypes.object),
  categories: PropTypes.arrayOf(PropTypes.any),
  hideLegend: PropTypes.bool,
  max: PropTypes.number,
  selects: PropTypes.arrayOf(PropTypes.any),
};

const defaultProps = {
  className: null,
  series: null,
  categories: [],
  options: null,
  height: 200,
  selects: [],
  hideLegend: false,
  max: null,
};

Highcharts.setOptions({
  lang: { thousandsSep: ',' },
});

function formatSeries(series, max, selects) {
  let newSeries = series;

  if (series) {
    if (selects.length > 0) {
      newSeries = series.filter((i, index) =>
        selects.indexOf(index) !== -1);
    }

    if (max) {
      newSeries = series.slice(0, max);
    }

    const { length } = newSeries;

    newSeries.forEach((i, index) => {
      const rt = i;

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

export const defaultOptions = {
  chart: {
    type: 'line',
    events: {
      load() {
        this.showLoading();
        this.hasData = () => true;
      },
    },
  },
  credits: { enabled: false },
  title: {
    text: '',
    x: -20, // center
    style: { display: 'none' },
  },
  colors: [
    '#0080ec', '#29c664', '#ff5c3c', '#9f7bf9', '#ffb128', '#c849df',
    '#ff3d74', '#1fd8af', '#badd66', '#3cb3ff',
  ],
  xAxis: {
    categories: [],
    crosshair: {
      width: 1,
      color: '#D8D8D8',
      dashStyle: 'Solid',
    },
  },
  yAxis: {
    title: { text: '' },
  },
  lang: {
    noData: '没有数据',
    loading: '加载中...',
  },
  noData: {
    style: {
      fontWeight: '300',
      fontSize: '16px',
      color: '#a0a0a0',
    },
  },
  loading: {
    style: {
      fontWeight: '300',
      fontSize: '16px',
      color: '#a0a0a0',
    },
  },
  tooltip: {
    valueSuffix: '',
    shared: true,
  },
  plotOptions: {
    series: {
      marker: {
        fillColor: 'white',
        lineColor: null,
        lineWidth: 1,
        symbol: 'circle',
        radius: 3,
      },
      states: {
        hover: {
          lineWidth: 2,
        },
      },
    },
  },
  legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'middle',
    borderWidth: 0,
    enabled: false,
  },
  series: [],
  exporting: {
    enabled: false,
  },
};

class Chart extends React.Component {
  constructor(props) {
    super(props);

    const options = this.props.options == null
      ? { ...defaultOptions }
      : { ...defaultOptions, ...this.props.options };

    this.state = {
      series: this.props.series && cloneDeep(formatSeries(
        this.props.series,
        this.props.max,
        this.props.selects,
      )),
      categories: this.props.categories && cloneDeep(this.props.categories),
      options,
    };
  }

  componentDidMount() {
    this.createChart(true);
  }

  componentWillReceiveProps({
    max, selects, options, categories, series,
  }) {
    if (this.props.series !== series) {
      this.setState({
        series: cloneDeep(formatSeries(series, max, selects)),
        categories: cloneDeep(categories),
      });
    } else if (this.props.series && this.props.selects !== selects) {
      this.setState({
        series: formatSeries(
          cloneDeep(this.props.series),
          max,
          selects,
        ),
      });
    }

    if (this.props.options !== options) {
      this.setState({
        options: {
          ...defaultOptions,
          ...options,
        },
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.series !== this.props.series) {
      this.createChart(true);
    } else if (prevState.series !== this.state.series) {
      // when visible changed or selects changed
      this.createChart(true);
    } else if (prevState.options !== this.state.options && this.props.series != null) {
      this.createChart(true);
    }
  }

  toggleVisible(index) {
    const { series } = this.state;

    series[index].visible = !series[index].visible;

    this.setState({ series: [...series] });
  }

  createChart(needSetCategories) {
    if (this.chart) {
      this.chart.destroy();
    }

    const { height } = this.props;
    const { options } = this.state;

    const chart
      = new Highcharts.Chart(merge(options, {
        chart: {
          renderTo: this.chartWrapper,
          height,
        },
      }));

    this.chart = chart;

    this.chart.showLoading();

    const { series, categories } = this.state;

    if (series == null) {
      return;
    }

    series.forEach(i => this.chart.addSeries(i));

    if (series.length !== 0) {
      chart.hasData = () => true;
      chart.hideLoading();
    } else {
      chart.hasData = () => false;
      chart.hideLoading();
      chart.showNoData();
    }

    if (needSetCategories) {
      chart.xAxis[0].setCategories(categories);
    }

    chart.series.forEach((i) => {
      const s = series.find(j => j.name === i.name);
      if (s) {
        s.color = i.color;
      }
    });

    this.setState({ series });
  }

  resize() {
    if (this.chart) {
      this.chart.reflow();
    }
  }

  render() {
    // const { className, height, hideLegend } = this.props;
    const { series } = this.state;

    return (
      <div
        className={classNames(
          'chart',
          { [this.props.className]: this.props.className != null },
        )}
      >
        <div
          className="chart-wrapper"
          ref={(el) => { this.chartWrapper = el; }}
          style={{ height: this.props.height }}
        />

        {series && series.length > 0 && !this.props.hideLegend && (
          <div className="chart-legend">
            {series.map((i, index) => (
              <div
                className="label"
                key={`${index + 1}`}
                data-series-name={i.name}
                data-visible={i.visible}
                onClick={() => this.toggleVisible(index)}
                aria-hidden
              >
                <div
                  className="checkbox"
                  style={{ backgroundColor: i.visible ? i.color : null }}
                />
                {i.name}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

Chart.propTypes = propTypes;
Chart.defaultProps = defaultProps;

export default Chart;
