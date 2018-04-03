import React from 'react';
import PropTypes from 'prop-types';
import Input from './Input';

const propTypes = {
  candidates: PropTypes.array,
  maxHeight: PropTypes.number,
  onChange: PropTypes.func,
  onSelect: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

const defaultProps = {
  candidates: [],
  maxHeight: 200,
  onBlur: () => null,
  onChange: () => null,
  onFocus: () => null,
  onSelect: () => null,
  placeholder: '',
  value: '',
};

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.fixScroll = ::this.fixScroll;
    this.keyBindAction = ::this.keyBindAction;
    this.state = {
      display: false,
      overIndex: 0,
    };
  }

  fixScroll() {
    const { candidates, maxHeight } = this.props;
    const { overIndex } = this.state;

    if (candidates.length > 0) {
      const itemHeight = +this.listElement.children[0].clientHeight;
      const fullCount = +(maxHeight / itemHeight).toFixed(0);

      if (overIndex > fullCount - 1) {
        this.listElement.scrollTop = (overIndex - (fullCount - 1)) * itemHeight;
      } else {
        this.listElement.scrollTop = 0;
      }
    }
  }

  keyBindAction(e) {
    e.stopPropagation();
    if (e.keyCode === 40) {
      e.preventDefault();
      this.setState({
        overIndex: this.state.overIndex < this.props.candidates.length - 1 ?
          this.state.overIndex + 1 : this.props.candidates.length - 1,
      }, this.fixScroll);
    }
    if (e.keyCode === 38) {
      e.preventDefault();
      this.setState({
        overIndex: this.state.overIndex > 1 ? (this.state.overIndex - 1) : 0,
      }, this.fixScroll);
    }
    if (e.keyCode === 13) {
      if (this.state.overIndex > -1) {
        this.props.onSelect(this.props.candidates[this.state.overIndex].value);
        this.setState({
          overIndex: 0,
          display: false,
        });
      }
    }
  }

  render() {
    const {
      candidates,
      maxHeight,
      onBlur,
      onChange,
      onFocus,
      onSelect,
      placeholder,
      value,
    } = this.props;
    return (
      <div
        style={{
          position: 'relative',
        }}
      >
        <Input
          ref={ref => this.textInpt = ref}
          placeholder={placeholder}
          onBlur={() => setTimeout(() => {
            onBlur();
            this.setState({
              display: false,
            });
          }, 100)}
          onChange={(k, v) => {
            this.setState({
              overIndex: 0,
              display: true,
            }, this.fixScroll);
            onChange(k, v);
          }}
          onFocus={() => {
            onFocus();
            this.setState({
              display: true,
            });
          }}
          value={value}
          onKeyDown={this.keyBindAction}
        />
        <ul
          ref={ref => this.listElement = ref}
          style={{
            position: 'absolute',
            maxHeight: `${maxHeight}px`,
            width: '100%',
            marginTop: '2px',
            border: '1px solid #E0E7EB',
            borderRadius: '2px',
            backgroundColor: '#fff',
            overflow: 'auto',
            transition: 'all .2s ease',
            transform: `scaleY(${this.state.display ? '1' : '0'})`,
            transformOrigin: '0 0',
          }}
        >
          {candidates.map((element, index) => (
            <li
              key={index}
              style={{
                cursor: 'pointer',
                padding: '4px 6px',
                color: this.state.overIndex === index ? '#fff' : null,
                backgroundColor: this.state.overIndex === index ? '#0080ec' : null,
              }}
            >
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(element.value);
                }}
                onMouseOver={() => this.setState({
                  overIndex: index,
                })}
                onMouseOut={() => this.setState({
                  overIndex: -1,
                })}
              >
                {element.title}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

Search.propTypes = propTypes;

Search.defaultProps = defaultProps;

export default Search;
