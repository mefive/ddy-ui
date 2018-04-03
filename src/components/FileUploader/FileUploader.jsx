import React from 'react';
import PropTypes from 'prop-types';

import './style/index.scss';

const propTypes = {
  multiple: PropTypes.bool,
  onChange: PropTypes.func,
  onProgress: PropTypes.func,
  onComplete: PropTypes.func,
};

const defaultProps = {
  multiple: true,
};

class FileUploader extends React.Component {
  upload(files) {

  }

  render() {
    const { trigger } = this.props;

    return (
      <div className="file-uploader">
        {trigger}
        <div className="file-uploader-trigger">
          <input
            type="file"
            multiple={this.props.multiple}
            onChange={e => this.upload(e.target.files)}
          />
        </div>
      </div>
    );
  }
}

FileUploader.propTypes = propTypes;
FileUploader.defaultProps = defaultProps;

export default FileUploader;
