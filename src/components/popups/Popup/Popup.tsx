import type { FunctionComponent, ReactNode } from 'react';
import React, { isValidElement } from 'react';
import _ from 'lodash';
import type { PopupProps as SemanticUiPopupProps } from 'semantic-ui-react';
import { Popup as PopupSemanticUiReact } from 'semantic-ui-react';
import Wrapper from './Wrapper';

export type PopupProps = SemanticUiPopupProps;
export interface AdditionalPopupProperties {
    Header: typeof PopupSemanticUiReact.Header;
    Content: typeof PopupSemanticUiReact.Content;
    Trigger: typeof Wrapper;
}

/**
 * Popup is a component which wraps [Popup](https://react.semantic-ui.com/modules/popup) used to
 * display additional information popup.
 *
 * All props supported by the undelaying `Popup` component are passed down to it.
 *
 * See [Popup](https://react.semantic-ui.com/modules/popup) component from Semantic-UI-React for details about props.
 */
const Popup: FunctionComponent<PopupProps> & AdditionalPopupProperties = props => {
    const { trigger: triggerFromProps, children: childrenFromProps, ...rest } = props;
    let trigger = triggerFromProps;
    let children = childrenFromProps;

    React.Children.forEach(children, child => {
        if (isValidElement(child) && child.type === Wrapper) {
            trigger = child.props.children;
            children = _.without(childrenFromProps as ReactNode[], child);
        }
    });

    return (
        <PopupSemanticUiReact {...rest} trigger={trigger}>
            {children}
        </PopupSemanticUiReact>
    );
};
export default Popup;

Popup.propTypes = PopupSemanticUiReact.propTypes;
Popup.Header = PopupSemanticUiReact.Header;
Popup.Content = PopupSemanticUiReact.Content;
Popup.Trigger = Wrapper;
