import React from 'react';

import LiveEditDecorator from 'decorators/LiveEditDecorator';

import type { MenuProps } from 'semantic-ui-react';
import type { Story } from '@storybook/react';
import Menu from './Menu';

export default {
    title: 'Elements/Menu',
    component: Menu,
    decorators: [LiveEditDecorator({ Menu })]
};

type MenuStory = Story<Required<MenuProps>>;

export const example: MenuStory = () => (
    <Menu vertical>
        <Menu.Item>
            <Menu.Header>Products</Menu.Header>
            <Menu.Menu>
                <Menu.Item name="enterprise" onClick={() => {}} />
                <Menu.Item name="consumer" onClick={() => {}} />
            </Menu.Menu>
        </Menu.Item>
        <Menu.Item>
            <Menu.Header>CMS Solutions</Menu.Header>
            <Menu.Menu>
                <Menu.Item name="rails" onClick={() => {}} />
                <Menu.Item name="python" onClick={() => {}} />
                <Menu.Item name="php" onClick={() => {}} />
            </Menu.Menu>
        </Menu.Item>
    </Menu>
);
