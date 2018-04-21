import React from 'react';
import PropTypes from 'prop-types';

import FileUploader from '../FileUploader';

import style from './style/index.scss';

const propTypes = {
  uploadUrl: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
  onChange: PropTypes.func,
};

const defaultProps = {
  value: null,
  onChange: () => {},
};

class ImageUploader extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      url: null,
    };
  }

  componentDidUpdate({ value }) {
    if (value !== this.props.value) {
      if (this.props.value != null
        && typeof this.props.value === 'object'
        && this.props.value.type.startsWith('image')
      ) {
        this.uploader.upload();
      }
    }
  }

  render() {
    return (
      <FileUploader
        {...this.props}
        onChange={(file) => {
          if (typeof file === 'string') {
            this.setState({ url: file });
          }

          this.props.onChange(file);
        }}
        ref={(el) => { this.uploader = el; }}
      >
        <div
          className={style.trigger}
          style={{ width: 200, height: 200, lineHeight: '200px' }}
        >
          {this.state.url == null
            ? '请选择'
            : (
              <img src={this.state.url} alt="file" style={{ width: '100%', height: 'auto' }} />
            )}
        </div>
      </FileUploader>
    );
  }
}

ImageUploader.propTypes = propTypes;
ImageUploader.defaultProps = defaultProps;

export default ImageUploader;
