import React from 'react';
import type { FunctionComponent, CSSProperties } from 'react';
import { Menu } from 'semantic-ui-react';
import type { MenuProps } from 'semantic-ui-react';

export interface MenusBarProps extends Pick<MenuProps, 'className'> {
    /**
     * CSS style
     */
    style?: CSSProperties;
}

/**
 * MenusBar is a styled component wrapper for Menu component. It is dedicated to be used inside `HeaderBar` components.
 * Children can be components created with use of `HeaderMenu` components.
 */
const MenusBar: FunctionComponent<MenusBarProps> = ({ className = '', children, style }) => {
    return (
        <Menu
            inverted
            secondary
            className={`menusBar ${className}`}
            style={{ marginLeft: 'auto', height: '100%', ...style }}
            floated="right"
        >
            {children}
        </Menu>
    );
};

export default MenusBar;
