import React from 'react';
import PropTypes from 'prop-types';

import FileUploader from '../FileUploader';

import style from './style/index.scss';

const propTypes = {
  uploadUrl: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
  onChange: PropTypes.func,
  width: PropTypes.number,
};

const defaultProps = {
  value: null,
  onChange: () => {},
  width: 200,
};

class ImageUploader extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      url: null,
      error: null,
    };
  }

  componentDidUpdate({ value }) {
    if (value !== this.props.value
      && typeof this.props.value === 'object'
      && this.props.value.type.startsWith('image')
    ) {
      this.uploader.upload();
    }
  }

  render() {
    return (
      <div className="d-inline-block" style={{ width: this.props.width }}>
        <FileUploader
          {...this.props}
          onChange={(file) => {
            if (typeof file === 'string') {
              this.setState({ url: file });
              this.props.onChange(file);
            } else if (file != null && typeof file === 'object') {
              if (file.type.startsWith('image')) {
                this.setState({ error: null });
                this.props.onChange(file);
              } else {
                this.setState({ error: '请选择图片' });
              }
            }
          }}
          ref={(el) => { this.uploader = el; }}
        >
          <div
            className={style.trigger}
            style={{ minHeight: this.props.width, lineHeight: 0 }}
          >
            {this.state.url == null
              ? (
                <span style={{ lineHeight: `${this.props.width}px` }}>
                  <i className="icon icon-plus align-middle" style={{ fontSize: this.props.width / 2 }} />
                </span>
              )
              : (
                <img src={this.state.url} alt="file" style={{ width: '100%', height: 'auto' }} />
              )}
          </div>
        </FileUploader>

        {this.state.error && (
          <div className="mt-1 text-sm text-error">
            {this.state.error}
          </div>
        )}
      </div>
    );
  }
}

ImageUploader.propTypes = propTypes;
ImageUploader.defaultProps = defaultProps;

export default ImageUploader;
