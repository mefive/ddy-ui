import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class TextArea extends React.PureComponent {
  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    onChange: PropTypes.func,
    maxLength: PropTypes.number,
    showCounter: PropTypes.bool,
    autoFocus: PropTypes.bool,
    className: PropTypes.string,
  };

  static defaultProps = {
    value: null,
    onChange: () => {},
    maxLength: null,
    showCounter: false,
    autoFocus: false,
    className: null,
  };

  componentDidMount() {
    if (this.props.autoFocus) {
      this.input.focus();
    }
  }

  render() {
    const {
      className, showCounter, autoFocus, ...props
    } = this.props;

    return (
      <React.Fragment>
        <textarea
          {...props}

          className={classNames('form-control', className)}
          ref={autoFocus ? (el) => { this.input = el; } : null}
          value={props.value || ''}
          onChange={e => this.props.onChange(e.target.value, e)}
        />

        {showCounter && this.props.maxLength != null && (
          <div className="text-right mt-1">
            {this.props.value == null ? 0 : `${this.props.value}`.length}/{this.props.maxLength}
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default TextArea;
