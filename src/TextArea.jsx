import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';

const propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func,
  maxLength: PropTypes.number,
  showCounter: PropTypes.bool,
};

const defaultProps = {
  value: null,
  onChange: () => {},
  maxLength: null,
  showCounter: true,
};

class TextArea extends React.PureComponent {
  render() {
    const props = omit(this.props, ['showCounter']);

    return (
      <span>
        <textArea
          {...props}
          onChange={e => this.props.onChange(e.target.value, e)}
        />

        {this.props.showCounter && this.props.maxLength != null && (
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
