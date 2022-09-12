import React from 'react';
// @ts-expect-error TS(7016) FIXME: Could not find a declaration file for module 'styl... Remove this comment to see the full error message
import { ThemeProvider } from 'styled-components';

import DivContainer from 'decorators/DivContainer';
import LiveEditDecorator from 'decorators/LiveEditDecorator';
import Logo from './Logo';

export default {
    title: 'Layout/Logo',
    component: Logo,
    decorators: [LiveEditDecorator({ Logo, DivContainer, ThemeProvider })]
};

export const basic = () => (
    <DivContainer height={250} backgroundColor="blue">
        <Logo />
    </DivContainer>
);
basic.storyName = 'Default';

export const logoFromTheme = () => (
    <ThemeProvider
        theme={{
            logoUrl:
                'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Coca-Cola_logo.svg/1920px-Coca-Cola_logo.svg.png'
        }}
    >
        <DivContainer height={60}>
            <Logo />
        </DivContainer>
    </ThemeProvider>
);

export const logoFromUrl = () => (
    <ThemeProvider
        theme={{
            logoUrl:
                'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Coca-Cola_logo.svg/1920px-Coca-Cola_logo.svg.png'
        }}
    >
        <DivContainer height={60}>
            <Logo url="https://upload.wikimedia.org/wikipedia/commons/a/a7/Wikipedia_logo_v3.svg" />
        </DivContainer>
    </ThemeProvider>
);

export const customStyle = () => (
    <DivContainer height={250} backgroundColor="blue">
        <Logo style={{ height: '100%', width: '100%', backgroundPositionX: 'center' }} />
    </DivContainer>
);
