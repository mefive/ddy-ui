import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import addClass from 'dom-helpers/class/addClass';
import mimoza from 'mimoza';
import { isOlderIE } from '../utils/browser';

import style from './style.scss';

class FileUploader extends React.PureComponent {
  static propTypes = {
    uploadUrl: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    onError: PropTypes.func,
    onUploadStart: PropTypes.func,
    onUploadEnd: PropTypes.func,
    children: PropTypes.node,
    accept: PropTypes.string,
    canUpload: PropTypes.func,
    params: PropTypes.shape({}),
  };

  static defaultProps = {
    onChange: () => {},
    onError: () => {},
    onUploadStart: () => {},
    onUploadEnd: () => {},
    children: null,
    accept: null,
    canUpload: () => true,
    params: {},
  };

  constructor(props) {
    super(props);

    this.isOlderIE = isOlderIE();
    this.fileInput = React.createRef();
  }

  state = {
    inputKey: 0,
  };

  componentWillUnmount() {
    if (this.clearFrameTimer != null) {
      clearTimeout(this.clearFrameTimer);
    }

    this.clearFrame();
  }

  onFrameLoad = () => {
    try {
      const { frame } = this;

      if (frame != null) {
        const content = frame.contentWindow
          ? frame.contentWindow.document.body
          : frame.contentDocument.document.body;

        const { data: { url, name } } = JSON.parse(content.innerHTML || 'null innerHTML');

        this.props.onChange({ url, name });
      }
    } catch (e) {
      this.props.onError(JSON.stringify(e));
    } finally {
      this.setState({ inputKey: this.state.inputKey + 1 });
      this.clearFrame();
      this.props.onUploadEnd();
    }
  };

  onChange = (e) => {
    const value = e.target.files[0];
    let file;

    if (typeof value === 'string') {
      // IE 9
      file = {
        name: value,
        type: mimoza.getMimeType(value),
      };
    } else {
      file = value;
    }

    if (this.props.canUpload(file)) {
      this.upload();
    }
  };

  upload = () => {
    this.props.onUploadStart();

    if (this.isOlderIE) {
      this.uploadIE();
    } else {
      this.uploadHtml5();
    }
  };

  async uploadHtml5() {
    try {
      const formData = new FormData();

      const file = this.fileInput.current.files[0];

      formData.append('file', file);

      Object.keys(this.props.params).forEach(key => formData.append(key, this.props.params[key]));

      const data = await axios.post(
        this.props.uploadUrl,
        formData,
      );

      this.props.onChange(data);
    } catch (e) {
      let message = null;

      if (e.status === 413) {
        message = '文件过大';
      }

      this.props.onError(e.message || message || JSON.stringify(e));
    } finally {
      this.setState({ inputKey: this.state.inputKey + 1 });
      this.props.onUploadEnd();
    }
  }

  uploadIE() {
    const frame = document.createElement('iframe');

    frame.setAttribute('name', 'file-upload-iframe');
    frame.setAttribute('id', 'file-upload-iframe');
    addClass(frame, 'hidden');

    document.body.appendChild(frame);

    this.frame = frame;

    frame.addEventListener('load', this.onFrameLoad);

    this.form.submit();

    this.clearFrameTimer = setTimeout(() => {
      this.clearFrameTimer = null;
      this.clearFrame();
    }, 5000);
  }

  clearFrame() {
    if (this.frame != null) {
      this.frame.removeEventListener('load', this.onFrameLoad);
      this.frame.parentNode.removeChild(this.frame);
      this.frame = null;
    }
  }

  renderInput() {
    if (this.isOlderIE) {
      return (
        <form
          ref={(el) => { this.form = el; }}
          target="file-upload-iframe"
          method="POST"
          encType="multipart/form-data"
          action={this.props.uploadUrl}
          className={style['file-input']}
        >
          <input
            key={this.state.inputKey}
            type="file"
            onChange={this.onChange}
            name="file"
            className={style['file-input']}
            style={{ cursor: 'pointer' }}
            accept={this.props.accept}
            ref={this.fileInput}
          />
        </form>
      );
    }

    return (
      <input
        key={this.state.inputKey}
        className={style['file-input']}
        type="file"
        onChange={this.onChange}
        name="file"
        style={{ cursor: 'pointer' }}
        accept={this.props.accept}
        ref={this.fileInput}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="p-relative cursor-pointer">
          {this.props.children}

          {this.renderInput()}
        </div>
      </div>
    );
  }
}

export default FileUploader;
