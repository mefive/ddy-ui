import React from 'react';
import PropTypes from 'prop-types';
import Input from '../../../../src/Input';

class EditingInput extends React.PureComponent {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.any]),
    onBlur: PropTypes.func,
  };

  static defaultProps = {
    value: null,
    onBlur: () => {},
  };

  state = {
    value: this.props.value,
  };

  render() {
    return (
      <div style={{ minWidth: 100 }}>
        <Input
          {...this.props}
          value={this.state.value}
          onChange={value => this.setState({ value })}
          onBlur={() => this.props.onBlur(this.state.value)}j
        />
      </div>
    );
  }
}

export default EditingInput;
