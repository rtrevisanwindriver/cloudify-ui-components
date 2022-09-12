import React from 'react';
// @ts-expect-error TS(7016) FIXME: Could not find a declaration file for module 'styl... Remove this comment to see the full error message
import { ThemeProvider } from 'styled-components';
import { Dropdown, Icon } from 'semantic-ui-react';

import DivContainer from 'decorators/DivContainer';
import LiveEditDecorator from 'decorators/LiveEditDecorator';
import MenusBar from './MenusBar';
import HeaderMenu from '../HeaderMenu';

export default {
    title: 'Layout/MenusBar',
    component: MenusBar,
    decorators: [LiveEditDecorator({ MenusBar, HeaderMenu, Icon, Dropdown, DivContainer, ThemeProvider })]
};

export const basic = () => (
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

export const noTheme = () => (
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
