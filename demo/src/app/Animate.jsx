import React from 'react';
import uniqueId from 'lodash/uniqueId';
import ShowcaseContainer from './ShowcaseContainer/ShowcaseContainer';
import Animate from '../../../src/Animate';
import Clickable from '../../../src/Clickable';
import Input from '../../../src/Input';
import NotificationBar from '../../../src/NotificationBar/NotificationBar';

class AnimateShowcase extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      message: null,
      messages: [],
    };
  }

  sendMessage = () => {
    this.setState({
      messages: [
        ...this.state.messages,
        {
          id: uniqueId(),
          message: this.state.message,
        },
      ],
    });
  };

  render() {
    return (
      <div>
        <h3>Animate</h3>
        <ShowcaseContainer title="Single" className="mt-2">
          <div>
            <div>
              <Clickable onClick={() => this.setState({ show: !this.state.show })}>
                <div className="btn btn-primary">
                  Toggle
                </div>
              </Clickable>
            </div>

            <div className="mt-2">
              <Animate
                enterClassName="slide-down-in"
                leaveClassName="slide-down-out"
              >
                {this.state.show && (
                  <div style={{ width: 50, height: 50, background: '#000' }} />
                )}
              </Animate>
            </div>
          </div>
        </ShowcaseContainer>

        <ShowcaseContainer className="mt-2" title="Multiple">
          <div>
            <Input
              value={this.state.message}
              onChange={message => this.setState({ message })}
              onEnter={this.sendMessage}
            />
          </div>

          <div className="mt-1">
            <Clickable onClick={this.sendMessage}>
              <div className="btn btn-primary">
                Send
              </div>
            </Clickable>
          </div>

          <NotificationBar
            dataSource={this.state.messages}
            onRemove={(index) => {
              const messages = [...this.state.messages];
              messages.splice(index, 1);
              this.setState({ messages });
            }}
          />
        </ShowcaseContainer>
      </div>
    );
  }
}

export default AnimateShowcase;
