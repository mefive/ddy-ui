import React from 'react';
import PropType from 'prop-types';

const propTypes = {
  renderContainer: PropType.func,
};

const defaultProps = {
  renderContainer: null,
};

class Test extends React.PureComponent {
  renderContent() {
    return (
      <div>123</div>
    );
  }

  render() {
    return (
      <div>
        <div className="bold">Text</div>
        <div>
          {this.props.renderContainer == null
            ? this.renderContent()
            : this.props.renderContainer(this.renderContent())
          }
        </div>
      </div>
    );
  }
}

Test.propTypes = propTypes;
Test.defaultProps = defaultProps;

export default Test;
