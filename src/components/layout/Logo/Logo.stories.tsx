import React from 'react';
import { ThemeProvider } from 'styled-components';
import type { ComponentStory } from '@storybook/react';

import DivContainer from 'decorators/DivContainer';
import LiveEditDecorator from 'decorators/LiveEditDecorator';
import Logo from './Logo';

export default {
    title: 'Layout/Logo',
    component: Logo,
    decorators: [LiveEditDecorator({ Logo, DivContainer, ThemeProvider })]
};

type LogoStory = ComponentStory<typeof Logo>;

export const basic: LogoStory = () => (
    <DivContainer height={250} backgroundColor="blue">
        <Logo />
    </DivContainer>
);
basic.storyName = 'Default';

export const logoFromTheme: LogoStory = () => (
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

export const logoFromUrl: LogoStory = () => (
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

export const customStyle: LogoStory = () => (
    <DivContainer height={250} backgroundColor="blue">
        <Logo style={{ height: '100%', width: '100%', backgroundPositionX: 'center' }} />
    </DivContainer>
);
