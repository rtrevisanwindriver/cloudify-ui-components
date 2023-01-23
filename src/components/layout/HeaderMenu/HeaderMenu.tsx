import type { CSSProperties, FunctionComponent } from 'react';
import React from 'react';
import styled from 'styled-components';
import type { DropdownProps } from 'semantic-ui-react';
import { Dropdown } from 'semantic-ui-react';

const StyledDropdown = styled(Dropdown)`
    .dropdown.icon {
        margin: 0 0 0 0.4em !important;
        vertical-align: middle;
    }
`;

export interface HeaderMenuProps extends Pick<DropdownProps, 'trigger' | 'className' | 'onClose'> {
    /**
     * CSS style
     */
    style?: CSSProperties;
}

/**
 * HeaderMenu is a styled component wrapper for Dropdown.Menu. It is dedicated to be used in header bars,
 * inside `HeaderBar` or `MenusBar` components.
 */
export const HeaderMenu: FunctionComponent<HeaderMenuProps> = ({ children, style, ...headerMenuProps }) => {
    return (
        <StyledDropdown
            item
            pointing="top right"
            style={{
                padding: '5px 10px',
                height: '100%',
                ...style
            }}
            {...headerMenuProps}
        >
            <Dropdown.Menu>{children}</Dropdown.Menu>
        </StyledDropdown>
    );
};

export default HeaderMenu;
