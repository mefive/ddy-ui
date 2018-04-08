import React from 'react';
import PropTypes from 'prop-types';

import './style/index.scss';

const DEFAULT_STYLE = 'default';
const FLIP_STYLE = 'flip';

const propTypes = {
  bgColor: PropTypes.string,
  flipTrue: PropTypes.string,
  flipFalse: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.oneOf([DEFAULT_STYLE, FLIP_STYLE]),
  value: PropTypes.bool,
  width: PropTypes.number,
};

const defaultProps = {
  bgColor: '#86d993',
  flipTrue: 'YES',
  flipFalse: 'NO',
  onChange: () => null,
  style: DEFAULT_STYLE,
  value: false,
  width: 60,
};

class ToggleButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        value: nextProps.value,
      });
    }
  }

  render() {
    const {
      bgColor, flipTrue, flipFalse, style, width,
    } = this.props;
    const value = this.props.value || this.state.value;

    switch (style) {
      case FLIP_STYLE:
        return (
          <div
            id="toggle-flip-button"
            style={{
              boxShadow: value ? 'none' : null,
              height: width / 2,
              width,
            }}
            onClick={() => {
              this.setState({
                value: !value,
              });
              this.props.onChange();
            }}
          >
            <div
              className={`true-button ${value ? 'active' : ''}`}
              style={{
                  lineHeight: `${width / 2}px`,
                }}
            >
              {flipTrue}
            </div>
            <div
              className={`false-button ${value ? '' : 'active'}`}
              style={{
                  lineHeight: `${width / 2}px`,
                }}
            >
              {flipFalse}
            </div>
          </div>
        );
      case DEFAULT_STYLE:
      default:
        return (
          <div
            id="toggle-button"
            style={{
              boxShadow: value ? 'none' : null,
              height: width / 2,
              width,
            }}
            onClick={() => {
              this.setState({
                value: !value,
              });
              this.props.onChange();
            }}
          >
            <div
              className="button-bg"
              style={{
                backgroundColor: value ? bgColor : null,
              }}
            >
              <div
                className="button"
                style={{
                  left: value ? width / 2 : null,
                }}
              />
            </div>
          </div>
        );
    }
  }
}

ToggleButton.propTypes = propTypes;
ToggleButton.defaultProps = defaultProps;
ToggleButton.DEFAULT_STYLE = DEFAULT_STYLE;
ToggleButton.FLIP_STYLE = FLIP_STYLE;

export default ToggleButton;
