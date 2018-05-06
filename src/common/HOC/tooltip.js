import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'react-tippy';

const validationTooltip = (ReactComponent, tooltipProps) => () => {
  let isFocus = false;
  // FIXME: Нужно обдумать момент с фокусом, сейчас будет работать как костыль
  return class TooltippedComponent extends PureComponent {
    static propTypes = {
      ...ReactComponent.propTypes,
      tooltipText: PropTypes.string,
    };

    static defaultProps = {
      tooltipText: null,
    };

    static getDerivedStateFromProps(nextProps, prevState) {
      const { tooltipText } = nextProps;
      return tooltipText && isFocus ? { ...prevState, showTooltip: true } : { ...prevState, showTooltip: false };
    }

    state = {
      showTooltip: false,
    };

    onFocus = (...args) => {
      isFocus = true;
      const { showTooltip } = this.state;
      const { onFocus, tooltipText } = this.props;
      if ((tooltipText || tooltipText === undefined) && !showTooltip) {
        this.setState({ showTooltip: true });
      }
      return !onFocus || onFocus(...args);
    };

    onBlur = (...args) => {
      isFocus = false;
      const { onBlur } = this.props;
      this.setState({ isFocused: false, showTooltip: false });
      return !onBlur || onBlur(...args);
    };

    focus = () => {
      this.component.focus();
    };

    render() {
      const { tooltipText } = this.props;
      const { showTooltip } = this.state;
      return (
        <Tooltip title={tooltipText} open={showTooltip} {...tooltipProps}>
          <ReactComponent
            ref={(el) => {
              this.component = el;
            }}
            {...this.props}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
          />
        </Tooltip>
      );
    }
  };
};

export default validationTooltip;
