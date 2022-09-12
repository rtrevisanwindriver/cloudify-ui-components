import React from 'react';
// @ts-expect-error TS(7016) FIXME: Could not find a declaration file for module 'styl... Remove this comment to see the full error message
import { ThemeProvider } from 'styled-components';
import { Dropdown } from 'semantic-ui-react';

import DivContainer from 'decorators/DivContainer';
import LiveEditDecorator from 'decorators/LiveEditDecorator';
import HeaderBanner from '../HeaderBanner';
import HeaderBar from './HeaderBar';
import HeaderMenu from '../HeaderMenu';
import MenusBar from '../MenusBar';

export default {
    title: 'Layout/HeaderBar',
    component: HeaderBar,
    decorators: [LiveEditDecorator({ HeaderBar, HeaderBanner, HeaderMenu, MenusBar, DivContainer, ThemeProvider })]
};

export const basic = () => (
    <ThemeProvider theme={{ mainColor: 'green', headerTextColor: 'white' }}>
        {/* @ts-expect-error TS(2741) FIXME: Property 'className' is missing in type '{ childre... Remove this comment to see the full error message */}
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

export const customHeight = () => (
    <ThemeProvider theme={{ mainColor: 'green', headerTextColor: 'white' }}>
        {/* @ts-expect-error TS(2741) FIXME: Property 'className' is missing in type '{ childre... Remove this comment to see the full error message */}
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

export const noTheme = () => (
    // @ts-expect-error TS(2741) FIXME: Property 'className' is missing in type '{ childre... Remove this comment to see the full error message
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
