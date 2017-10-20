import React from 'react';
import ConfirmDialog from './ConfirmDialog';
import Portal from './Portal.js';
require('./Confirm.css');

var ConfirmLink = React.createClass({
  getInitialState: function() {
    return {showConfirm: false};
  },
  getDefaultProps: function() {
    return {
      action: function() {
        return false;
      },
      confirmMessage: 'Are you sure that you want to do this?',
      confirmText: 'Yes please',
      cancelText: 'No thank you',
      disabled: false,
    };
  },
  showHideConfirm: function() {
    if (this.props.disabled)
      return this.state.showConfirm
        ? this.setState({showConfirm: false})
        : undefined;
    if (this.props.skip) return this.props.action();

    this.setState({showConfirm: !this.state.showConfirm});
  },
  render: function() {
    return (
      <span
        className="ReactConfirmLink"
        data-disabled={this.props.disabled}
        onClick={this.showHideConfirm}>
        {this.props.children}
        {this.state.showConfirm ? (
          <Portal>
            <div className="ReactConfirmDialog">
              <ConfirmDialog {...this.props} cancel={this.showHideConfirm} />
            </div>
          </Portal>
        ) : (
          ''
        )}
      </span>
    );
  },
});

export default ConfirmLink;
