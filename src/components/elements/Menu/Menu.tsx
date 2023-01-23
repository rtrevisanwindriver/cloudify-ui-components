import React from 'react';
import { Menu as SemanticUiReactMenu } from 'semantic-ui-react';
import MenuItem from './MenuItem';

/**
 * Menu is a component which extends [Menu](https://react.semantic-ui.com/collections/menu/) component from Semantic-UI-React framework.
 * It has added 'option-value' to every Menu.Item. All props supported by the `Menu` component are passed down to it.
 *
 * See [Menu](https://react.semantic-ui.com/collections/menu/) component from Semantic-UI-React framework for details about props and usage details.
 */
export class Menu extends SemanticUiReactMenu {
    render() {
        const props = { ...this.props };
        return <SemanticUiReactMenu {...props} />;
    }
}
Menu.Item = MenuItem;

export default Menu;
