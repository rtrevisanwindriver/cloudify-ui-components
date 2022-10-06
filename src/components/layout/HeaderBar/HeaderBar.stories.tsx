import React from 'react';
import type { Story } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { Dropdown } from 'semantic-ui-react';

import DivContainer from 'decorators/DivContainer';
import LiveEditDecorator from 'decorators/LiveEditDecorator';
import HeaderBanner from '../HeaderBanner';
import HeaderBar from './HeaderBar';
import HeaderMenu from '../HeaderMenu';
import MenusBar from '../MenusBar';
import type { HeaderBarProps } from './HeaderBar';

export default {
    title: 'Layout/HeaderBar',
    component: HeaderBar,
    decorators: [LiveEditDecorator({ HeaderBar, HeaderBanner, HeaderMenu, MenusBar, DivContainer, ThemeProvider })]
};

type HeaderBarStory = Story<Required<HeaderBarProps>>;

export const basic: HeaderBarStory = () => (
    <ThemeProvider theme={{ mainColor: 'green', headerTextColor: 'white' }}>
        <HeaderBar>
            <HeaderBanner productName="Product" />
            <MenusBar>
                <HeaderMenu trigger="User">
                    <Dropdown.Item>Profile</Dropdown.Item>
                    <Dropdown.Item>Logout</Dropdown.Item>
                </HeaderMenu>
            </MenusBar>
        </HeaderBar>
    </ThemeProvider>
);
basic.storyName = 'Default';

export const customHeight: HeaderBarStory = () => (
    <ThemeProvider theme={{ mainColor: 'green', headerTextColor: 'white' }}>
        <HeaderBar height="100px">
            <HeaderBanner productName="Product" />
            <MenusBar>
                <HeaderMenu trigger="User">
                    <Dropdown.Item>Profile</Dropdown.Item>
                    <Dropdown.Item>Logout</Dropdown.Item>
                </HeaderMenu>
            </MenusBar>
        </HeaderBar>
    </ThemeProvider>
);

export const noTheme: HeaderBarStory = () => (
    <HeaderBar>
        <HeaderBanner productName="Product" />
        <MenusBar>
            <HeaderMenu trigger="User">
                <Dropdown.Item>Profile</Dropdown.Item>
                <Dropdown.Item>Logout</Dropdown.Item>
            </HeaderMenu>
        </MenusBar>
    </HeaderBar>
);
