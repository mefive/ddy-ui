import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { CustomSelectContext } from '../context';
import './style.scss';

class CustomSelect extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    indicator: PropTypes.node,
  };

  static defaultProps = {
    className: null,
    children: null,
    indicator: null,
  };

  render() {
    const { children } = this.props;

    return (
      <CustomSelectContext.Consumer>
        {(context) => {
          const indicator = this.props.indicator || context.indicator;

          return (
            <div
              {...this.props}
              className={classNames(
                'custom-select',
                this.props.className,
                { 'custom-indicator': indicator != null },
              )}
              ref={(el) => { this.node = el; }}
            >
              {indicator == null
                ? children
                : (
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="flex-grow-1">{children}</div>
                    {indicator}
                  </div>
                )}
            </div>
          );
        }}
      </CustomSelectContext.Consumer>
    );
  }
}

export default CustomSelect;
