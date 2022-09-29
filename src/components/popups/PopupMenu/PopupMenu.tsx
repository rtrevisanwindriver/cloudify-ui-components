import type { FunctionComponent } from 'react';
import React, { useState } from 'react';
import { isEmpty } from 'lodash';
import type { IconProps, PopupProps, SemanticICONS } from 'semantic-ui-react';
import { Icon } from 'semantic-ui-react';
import Popup from '../Popup';
import './PopupMenu.css';

export interface PopupMenuProps extends Omit<IconProps, 'name'> {
    /**
     * primary content
     */
    children: PopupProps['children'];
    /**
     * position for the popover.
     */
    position?: PopupProps['position'];
    /**
     * Offset values in px unit to apply to rendered popup. The basic offset accepts
     * an array with two numbers in the form `[skidding, distance]`. See
     * [Popup in Semantic UI React](https://react.semantic-ui.com/modules/popup) for details.
     */
    offset?: PopupProps['offset'];
    /**
     * popup trigger icon name (see [Icon](https://react.semantic-ui.com/elements/icon))
     */
    icon?: SemanticICONS;
    /**
     * specifies if trigger shall be disabled
     */
    disabled?: boolean;
    /**
     * additional popup help message shown on trigger hover
     */
    help?: string;
    /**
     * if set then the component renders initially open
     */
    defaultOpen?: boolean;
}

/**
 * PopupMenu is a component which uses [Popup](https://react.semantic-ui.com/modules/popup) component to create
 * dropdown menu triggered by [Icon](https://react.semantic-ui.com/elements/icon) button.
 * All props supported by the `Icon` component are passed down to it.
 */
const PopupMenu: FunctionComponent<PopupMenuProps> = ({
    children,
    position = 'bottom right',
    offset = [12, 0],
    icon = 'content',
    disabled = false,
    help = '',
    defaultOpen = false,
    ...iconProps
}) => {
    const [opened, setOpened] = useState(defaultOpen);

    const trigger = isEmpty(help) ? (
        <Icon
            link={!disabled}
            disabled={disabled}
            name={icon}
            onClick={(e: Event) => e.stopPropagation()}
            {...iconProps}
        />
    ) : (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events
        <span onClick={e => e.stopPropagation()}>
            <Popup trigger={<Icon name={icon} link={!disabled} {...iconProps} />} content={help} />
        </span>
    );

    return (
        <Popup
            trigger={trigger}
            on="click"
            position={position}
            className="popupMenu"
            offset={offset}
            open={disabled ? false : opened}
            onClose={() => setOpened(false)}
            onOpen={() => setOpened(true)}
            onClick={(e: Event) => {
                e.stopPropagation();
                setOpened(false);
            }}
        >
            {children}
        </Popup>
    );
};

export default PopupMenu;
