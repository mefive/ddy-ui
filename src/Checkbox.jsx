import React from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import Input from './Input';

class Checkbox extends React.PureComponent {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.bool,
    label: PropTypes.string,
  };

  static defaultProps = {
    onChange: () => {},
    value: null,
    label: null,
  };

  constructor(props) {
    super(props);

    this.id = uniqueId();
  }

  render() {
    return (
      <div className="custom-control custom-checkbox">
        <Input
          type="checkbox"
          className="custom-control-input"
          id={this.id}
          value={this.props.value}
          onChange={this.props.onChange}
        />

        <label
          className="custom-control-label"
          htmlFor={this.id}
        >
          {this.props.label}
        </label>
      </div>
    );
  }
}

export default Checkbox;
