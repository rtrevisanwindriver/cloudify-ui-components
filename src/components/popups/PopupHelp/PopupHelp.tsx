import type { FunctionComponent } from 'react';
import React from 'react';
import { isEmpty } from 'lodash';
import { Icon } from 'semantic-ui-react';
import { Popup } from 'components';
import type { PopupProps } from '../Popup';

export interface PopupHelpProps extends PopupProps {
    /**
     * force Popup open
     */
    open?: boolean;
}

const defaultPopupOffset: PopupProps['offset'] = [-12, 0];

/**
 * PopupHelp is a component which uses [Popup](https://react.semantic-ui.com/modules/popup) component to display
 * help popup.
 *
 * All props supported by the underlaying `Popup` component are passed down to it.
 */
export const PopupHelp: FunctionComponent<PopupHelpProps> = ({
    header = '',
    content,
    trigger = <Icon name="help circle" />,
    ...popupProps
}) => (
    <Popup on={['hover', 'focus']} hoverable wide="very" offset={defaultPopupOffset} {...popupProps}>
        {!isEmpty(header) && <Popup.Header>{header}</Popup.Header>}
        <Popup.Trigger>{trigger}</Popup.Trigger>
        <Popup.Content>{content}</Popup.Content>
    </Popup>
);

export default PopupHelp;
