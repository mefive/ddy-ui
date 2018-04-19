import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style/index.scss';
import Clickable from '../Clickable';

const STYLE_DEFAULT = 'default';
const STYLE_FLIP = 'flip';

const propTypes = {
  bgColor: PropTypes.string,
  flipTrue: PropTypes.string,
  flipFalse: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.oneOf([STYLE_DEFAULT, STYLE_FLIP]),
  value: PropTypes.bool,
  width: PropTypes.number,
};

const defaultProps = {
  bgColor: '#86d993',
  flipTrue: 'YES',
  flipFalse: 'NO',
  onChange: () => null,
  style: STYLE_DEFAULT,
  value: false,
  width: 60,
};

class ToggleButton extends React.PureComponent {
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
      case STYLE_FLIP:
        return (
          <Clickable
            onClick={() => {
              this.setState({
                value: !value,
              });
              this.props.onChange();
            }}
          >
            <div
              className="toggle-flip-button"
              style={{
                boxShadow: value ? 'none' : null,
                height: width / 2,
                width,
              }}

            >
              <div
                className={classNames(
                  'true-button',
                  { active: value != null },
                )}
                style={{ lineHeight: `${width / 2}px` }}
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
          </Clickable>
        );
      case STYLE_DEFAULT:
      default:
        return (
          <Clickable
            onClick={() => {
              this.setState({
                value: !value,
              });
              this.props.onChange();
            }}
          >
            <div
              className="toggle-button"
              style={{
                boxShadow: value ? 'none' : null,
                height: width / 2,
                width,
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
          </Clickable>
        );
    }
  }
}

ToggleButton.propTypes = propTypes;
ToggleButton.defaultProps = defaultProps;

ToggleButton.STYLE_DEFAULT = STYLE_DEFAULT;
ToggleButton.STYLE_FLIP = STYLE_FLIP;

export default ToggleButton;
