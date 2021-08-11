import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Icon } from 'semantic-ui-react';
import Popup from '../Popup';

/**
 * PopupHelp is a component which uses [Popup](https://react.semantic-ui.com/modules/popup) component to display
 * help popup.
 *
 * All props supported by the underlaying `Popup` component are passed down to it.
 */
export default function PopupHelp(props) {
    const { header, content, trigger, ...popupProps } = props;
    return (
        <Popup on={['hover', 'focus']} hoverable wide="very" {...popupProps}>
            {!_.isEmpty(header) && <Popup.Header>{header}</Popup.Header>}
            <Popup.Trigger>{trigger}</Popup.Trigger>
            <Popup.Content>{content}</Popup.Content>
        </Popup>
    );
}

PopupHelp.propTypes = {
    /**
     * content help popup content
     */
    content: PropTypes.node.isRequired,
    /**
     * help popup header
     */
    header: PropTypes.node,
    /**
     * help popup triggering element (on hover and focus)
     */
    trigger: PropTypes.node
};

PopupHelp.defaultProps = {
    header: '',
    trigger: <Icon name="help circle" />
};
