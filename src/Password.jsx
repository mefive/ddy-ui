import React from 'react';
import Input from './Input';
import Clickable from './Clickable';

class Password extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showPlaintext: false,
    };
  }

  render() {
    const { showPlaintext } = this.state;

    return (
      <div className="position-relative">
        <Input
          {...this.props}
          style={{ paddingRight: 60 }}
          type={showPlaintext ? 'text' : 'password'}
        />

        <Clickable
          onClick={() =>
            this.setState({ showPlaintext: !showPlaintext })}
        >
          <span
            className="text-primary position-absolute font-size-sm"
            style={{
              right: 20,
              top: '50%',
              marginTop: -9,
            }}
          >
            {showPlaintext ? '关闭' : '显示'}明文
          </span>
        </Clickable>
      </div>
    );
  }
}

export default Password;
