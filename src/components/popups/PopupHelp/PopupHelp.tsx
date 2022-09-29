import React from 'react';
import type { FunctionComponent } from 'react';
import { isEmpty } from 'lodash';
import { Icon } from 'semantic-ui-react';
import Popup from '../Popup';
import type { PopupProps } from '../Popup';

export interface PopupHelpProps extends PopupProps {
    /**
     * force Popup open
     */
    open?: boolean;
}

/**
 * PopupHelp is a component which uses [Popup](https://react.semantic-ui.com/modules/popup) component to display
 * help popup.
 *
 * All props supported by the underlaying `Popup` component are passed down to it.
 */
const PopupHelp: FunctionComponent<PopupHelpProps> = ({
    header = '',
    content,
    trigger = <Icon name="help circle" />,
    ...popupProps
}) => (
    <Popup on={['hover', 'focus']} hoverable wide="very" {...popupProps}>
        {!isEmpty(header) && <Popup.Header>{header}</Popup.Header>}
        <Popup.Trigger>{trigger}</Popup.Trigger>
        <Popup.Content>{content}</Popup.Content>
    </Popup>
);

export default PopupHelp;
