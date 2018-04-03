import React from 'react';
import PropTypes from 'prop-types';
import Odometer from 'odometer';

import './style/index.scss';

const propTypes = {
  value: PropTypes.number,
  unit: PropTypes.string,
};

const defaultProps = {
  value: null,
  unit: null,
};

class OdometerNumber extends React.Component {
  componentDidMount() {
    this.od = new Odometer({
      el: this.target,
      value: this.props.value,
      format: '(ddd).ddd',
      theme: 'default',
      duration: 1000,
    });
  }

  componentWillReceiveProps(nextProps) {
    const { value } = nextProps;

    if (value !== this.props.value) {
      if (this.od) {
        this.od.update(value);
      }
    }
  }

  componentWillUnmount() {
    this.od = null;
  }

  render() {
    return (
      <span>
        <span ref={(el) => { this.target = el; }} />
        {this.props.unit && (
          <span style={{ verticalAlign: 'middle', marginLeft: 5 }}>
            {this.props.unit}
          </span>
        )}
      </span>
    );
  }
}

OdometerNumber.propTypes = propTypes;
OdometerNumber.defaultProps = defaultProps;

export default OdometerNumber;
