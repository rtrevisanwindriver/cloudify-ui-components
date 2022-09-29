import React from 'react';
import type { Story } from '@storybook/react';

import Menu from 'components/elements/Menu';
import LiveEditDecorator from 'decorators/LiveEditDecorator';
import PopupMenu from './PopupMenu';
import type { PopupMenuProps } from './PopupMenu';

export default {
    title: 'Popups/PopupMenu',
    component: PopupMenu,
    decorators: [LiveEditDecorator({ PopupMenu })]
};

type PopupMenuStory = Story<Required<PopupMenuProps>>;

export const basic: PopupMenuStory = () => (
    <PopupMenu>
        <Menu pointing vertical>
            <Menu.Item icon="users" content="Edit group's users" name="users" onClick={() => {}} />
            <Menu.Item icon="user" content="Edit group's tenants" name="tenants" onClick={() => {}} />
            <Menu.Item icon="trash" content="Delete" name="delete" onClick={() => {}} />
        </Menu>
    </PopupMenu>
);
basic.storyName = 'Default';

export const helpPopup: PopupMenuStory = () => (
    <PopupMenu help="Choose your favourite fruit">
        <Menu pointing vertical>
            <Menu.Item content="Orange" name="orange" onClick={() => {}} />
            <Menu.Item content="Apple" name="apple" onClick={() => {}} />
            <Menu.Item content="Cherry" name="cherry" onClick={() => {}} />
        </Menu>
    </PopupMenu>
);

export const customIcon: PopupMenuStory = () => (
    <PopupMenu icon="arrow down" bordered>
        <Menu pointing vertical>
            <Menu.Item content="Orange" name="orange" onClick={() => {}} />
            <Menu.Item content="Apple" name="apple" onClick={() => {}} />
            <Menu.Item content="Cherry" name="cherry" onClick={() => {}} />
        </Menu>
    </PopupMenu>
);
export const customPosition: PopupMenuStory = () => (
    <PopupMenu position="top center" offset={[50, 50]}>
        <Menu pointing vertical>
            <Menu.Item content="Orange" name="orange" onClick={() => {}} />
            <Menu.Item content="Apple" name="apple" onClick={() => {}} />
            <Menu.Item content="Cherry" name="cherry" onClick={() => {}} />
        </Menu>
    </PopupMenu>
);
export const initiallyOpen: PopupMenuStory = () => (
    <div style={{ paddingBottom: 120 }}>
        <PopupMenu defaultOpen>
            <Menu pointing vertical>
                <Menu.Item icon="users" content="Edit group's users" />
                <Menu.Item icon="user" content="Edit group's tenants" />
                <Menu.Item icon="trash" content="Delete" />
            </Menu>
        </PopupMenu>
    </div>
);
