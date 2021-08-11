import React, { ComponentProps, ReactElement } from 'react';
import { map } from 'lodash';
import { Dropdown as SemanticUiReactDropdown } from 'semantic-ui-react';

/**
 * Dropdown is a component which extends [Dropdown](https://react.semantic-ui.com/modules/dropdown) component from Semantic-UI-React framework.
 * It has `clearable` prop set by default and adds 'option-value' field containing string value of and option to options list.
 * All other props supported by the `Dropdown` component are passed down to it.
 *
 * See [Dropdown](https://react.semantic-ui.com/modules/dropdown) component from Semantic-UI-React framework for details about props and usage details.
 */
export default class Dropdown extends SemanticUiReactDropdown {
    render(): ReactElement {
        const addOptionValueAttribute = (options: ComponentProps<typeof SemanticUiReactDropdown>['options']) => {
            return map(options, option => ({ ...option, 'option-value': String(option.value) || 'empty-option' }));
        };
        const props = { ...this.props };
        if (props.options) {
            props.options = addOptionValueAttribute(props.options);
        }

        return <SemanticUiReactDropdown clearable {...props} />;
    }
}
