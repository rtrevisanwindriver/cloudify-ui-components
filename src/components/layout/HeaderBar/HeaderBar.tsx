import type { CSSProperties, FunctionComponent } from 'react';
import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import colors from 'cloudify-ui-common-frontend/styles/_colors.scss';

interface StyledDivProps {
    backgroundColor: CSSProperties['backgroundColor'];
    height: HTMLDivElement['style']['height'];
}

const StyledDiv = styled.div<StyledDivProps>`
    width: 100%;
    height: ${props => props.height};
    line-height: ${props => props.height};
    background-color: ${props => props.backgroundColor};
    color: ${props => props.color} !important;
    display: inline-flex;
`;

export interface HeaderBarProps {
    /**
     * name of the style class to be added to header bar div block
     */
    className?: string;
    /**
     * height of the header bar, provided as string (passed directly to CSS)
     */
    height?: StyledDivProps['height'];
}

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
export const HeaderBar: FunctionComponent<HeaderBarProps> = ({ children, className = '', height = '55px' }) => {
    const theme = useContext(ThemeContext) || {};
    const backgroundColor = theme.mainColor || colors.blueNormal;
    const color = theme.headerTextColor || colors.white;

    return (
        <StyledDiv backgroundColor={backgroundColor} color={color} className={`headerBar ${className}`} height={height}>
            {children}
        </StyledDiv>
    );
};

export default HeaderBar;
