import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func,
  maxLength: PropTypes.number,
  showCounter: PropTypes.bool,
  autoFocus: PropTypes.bool,
};

const defaultProps = {
  value: null,
  onChange: () => {},
  maxLength: null,
  showCounter: false,
  autoFocus: false,
};

class TextArea extends React.PureComponent {
  componentDidMount() {
    if (this.props.autoFocus) {
      this.input.focus();
    }
  }

  render() {
    const { showCounter, autoFocus, ...props } = this.props;

    return (
      <span>
        <textarea
          ref={autoFocus ? (el) => { this.input = el; } : null}
          {...props}
          value={props.value || ''}
          onChange={e => this.props.onChange(e.target.value, e)}
        />

        {showCounter && this.props.maxLength != null && (
          <div className="text-right mt-1">
            {this.props.value == null ? 0 : `${this.props.value}`.length}/{this.props.maxLength}
          </div>
        )}
      </span>
    );
  }
}

TextArea.propTypes = propTypes;
TextArea.defaultProps = defaultProps;

export default TextArea;
