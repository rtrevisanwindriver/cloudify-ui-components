import React from 'react';
import type { Story } from '@storybook/react';
import { Dropdown, Icon } from 'semantic-ui-react';

import DivContainer from 'decorators/DivContainer';
import LiveEditDecorator from 'decorators/LiveEditDecorator';
import HeaderMenu from './HeaderMenu';
import type { HeaderMenuProps } from './HeaderMenu';

export default {
    title: 'Layout/HeaderMenu',
    component: HeaderMenu,
    decorators: [LiveEditDecorator({ HeaderMenu, Icon, Dropdown, DivContainer })]
};

type HeaderMenuStory = Story<Required<HeaderMenuProps>>;

export const basic: HeaderMenuStory = () => (
    <DivContainer height={250}>
        <DivContainer height={30}>
            <HeaderMenu trigger="Options">
                <Dropdown.Item>Option A</Dropdown.Item>
                <Dropdown.Item>Option B</Dropdown.Item>
            </HeaderMenu>
        </DivContainer>
    </DivContainer>
);
basic.storyName = 'Default';

export const customTrigger: HeaderMenuStory = () => (
    <DivContainer height={250}>
        <DivContainer height={30}>
            <HeaderMenu
                trigger={
                    <>
                        <Icon name="cogs" /> Options
                    </>
                }
            >
                <Dropdown.Item>Option A</Dropdown.Item>
                <Dropdown.Item>Option B</Dropdown.Item>
            </HeaderMenu>
        </DivContainer>
    </DivContainer>
);
