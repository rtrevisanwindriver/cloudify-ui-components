import PropTypes from 'prop-types';
import React, { useContext } from 'react';
// @ts-expect-error TS(7016) FIXME: Could not find a declaration file for module 'styl... Remove this comment to see the full error message
import styled, { ThemeContext } from 'styled-components';
import colors from 'cloudify-ui-common/styles/_colors.scss';

const StyledDiv = styled.div`
  width: 100%;
  height: ${
      // @ts-expect-error TS(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
      props => props.height
  };
  line-height: ${
      // @ts-expect-error TS(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
      props => props.height
  };
  background-color: ${
      // @ts-expect-error TS(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
      props => props.backgroundColor
  };
  color: ${
      // @ts-expect-error TS(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
      props => props.color
  } !important;
  display: inline-flex;
}`;

/**
 *
 * HeaderBar is a component block to be used as a container for all application header components.
 *
 * Application header components can be: `HeaderBanner`, `MenusBar`, `HeaderMenu`, `Logo`.
 *
 * Other components in most cases can fit here as well.
 *
 * It uses a `div` element as a wrapper - all props supported by the `div` element are passed down to it.
 *
 * It supports theming:
 *
 * * `mainColor` parameter is used as a background color, if not specified then `blueNormal` from default colors is chosen
 * * `headerTextColor` parameter is used as a text color, if not specified then `white` from default colors is chosen
 */
// @ts-expect-error TS(7031) FIXME: Binding element 'children' implicitly has an 'any'... Remove this comment to see the full error message
export default function HeaderBar({ children, className, ...divProps }) {
    const theme = useContext(ThemeContext) || {};
    // @ts-expect-error TS(2571) FIXME: Object is of type 'unknown'.
    const backgroundColor = theme.mainColor || colors.blueNormal;
    // @ts-expect-error TS(2571) FIXME: Object is of type 'unknown'.
    const color = theme.headerTextColor || colors.white;

    return (
        <StyledDiv backgroundColor={backgroundColor} color={color} className={`headerBar ${className}`} {...divProps}>
            {children}
        </StyledDiv>
    );
}

HeaderBar.propTypes = {
    /**
     * elements displayed inside the Segment
     */
    children: PropTypes.node.isRequired,

    /**
     * name of the style class to be added to header bar div block
     */
    className: PropTypes.string,

    /**
     * height of the header bar, provided as string (passed directly to CSS)
     */
    height: PropTypes.string
};

HeaderBar.defaultProps = {
    className: '',
    height: '55px'
};
