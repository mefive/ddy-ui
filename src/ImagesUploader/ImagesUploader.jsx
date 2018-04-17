import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Input from '../Input';

import './style/index.scss';

const propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  // value: PropTypes.array,
  max: PropTypes.number,
  onChange: PropTypes.func,
};

const defaultProps = {
  width: 67,
  height: 125,
  value: [],
  max: 5,
  onChange: () => null,
};

class ImagesUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

  render() {
    const { value, width, height } = this.props;

    return (
      <span>
        <div className="help-block">
          请上传3-5张截图（尺寸保持一致），单张图片不超过1M。
          截图不能小于320*480像素，推荐480*800像素。JPG、PNG格式。
        </div>

        <div className="images-uploader">
          <ul>
            {value && value.map((url, index) => (
              <li className="image-item" key={index}>
                <div
                  style={{ width, height, lineHeight: `${height}px` }}
                >
                  <img src={url} />

                  <div
                    className="image-actions"
                    style={{ inlineHeight: height }}
                  >
                    <div>
                      <i
                        className="icon icon-trash"
                        onClick={() => this.props.onChange({
                        type: 'remove',
                        index,
                      })}
                      />
                    </div>
                  </div>
                </div>
              </li>
          ))}

            {value.length < this.props.max && (
            <li className="image-select">
              <div
                style={{ width, height, lineHeight: `${height}px` }}
              >
                <div className="image-select-text">
                  <i className="icon icon-upload" />
                  <br />
                  上传
                </div>

                <Input
                  type="file"
                  onChange={(v, e) => {
                    e.stopPropagation();

                    if (v) {
                      this.props.onChange({
                        type: 'add',
                        value: v,
                      });
                    }

                    e.target.value = '';
                  }}
                />
              </div>
            </li>
          )}
          </ul>
        </div>
      </span>
    );
  }
}

ImagesUploader.propTypes = propTypes;
ImagesUploader.defaultProps = defaultProps;

export default ImagesUploader;
