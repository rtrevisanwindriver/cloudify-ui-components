import React from 'react';
import type { Story } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { Dropdown, Icon } from 'semantic-ui-react';

import DivContainer from 'decorators/DivContainer';
import LiveEditDecorator from 'decorators/LiveEditDecorator';
import MenusBar from './MenusBar';
import type { MenusBarProps } from './MenusBar';
import HeaderMenu from '../HeaderMenu';

export default {
    title: 'Layout/MenusBar',
    component: MenusBar,
    decorators: [LiveEditDecorator({ MenusBar, HeaderMenu, Icon, Dropdown, DivContainer, ThemeProvider })]
};

type MenusBarStory = Story<Required<MenusBarProps>>;

export const basic: MenusBarStory = () => (
    <DivContainer height={250}>
        <DivContainer height={55} backgroundColor="black">
            <ThemeProvider theme={{ headerTextColor: 'red' }}>
                <MenusBar>
                    <HeaderMenu
                        trigger={
                            <>
                                <Icon name="help" /> Help
                            </>
                        }
                    >
                        <Dropdown.Item>Link A</Dropdown.Item>
                        <Dropdown.Item>Link B</Dropdown.Item>
                    </HeaderMenu>
                    <HeaderMenu
                        trigger={
                            <>
                                <Icon name="user" /> User
                            </>
                        }
                    >
                        <Dropdown.Item>Option A</Dropdown.Item>
                        <Dropdown.Item>Option B</Dropdown.Item>
                    </HeaderMenu>
                </MenusBar>
            </ThemeProvider>
        </DivContainer>
    </DivContainer>
);
basic.storyName = 'Default';

export const noTheme: MenusBarStory = () => (
    <DivContainer height={250}>
        <DivContainer height={55} backgroundColor="black">
            <MenusBar>
                <HeaderMenu
                    trigger={
                        <>
                            <Icon name="help" /> Help
                        </>
                    }
                >
                    <Dropdown.Item>Link A</Dropdown.Item>
                    <Dropdown.Item>Link B</Dropdown.Item>
                </HeaderMenu>
            </MenusBar>
        </DivContainer>
    </DivContainer>
);
