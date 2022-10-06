import React from 'react';
import type { Story } from '@storybook/react';
import { ThemeProvider } from 'styled-components';

import DivContainer from 'decorators/DivContainer';
import LiveEditDecorator from 'decorators/LiveEditDecorator';
import FullScreenSegment from './FullScreenSegment';
import type { FullScreenSegmentProps } from './FullScreenSegment';

export default {
    title: 'Layout/FullScreenSegment',
    component: FullScreenSegment,
    decorators: [LiveEditDecorator({ FullScreenSegment, DivContainer, ThemeProvider })]
};

type FullScreenSegmentStory = Story<Required<FullScreenSegmentProps>>;

export const basic: FullScreenSegmentStory = () => (
    <DivContainer height={250}>
        <FullScreenSegment>Test</FullScreenSegment>
    </DivContainer>
);
basic.storyName = 'Default';

export const colored: FullScreenSegmentStory = () => (
    <DivContainer height={250}>
        <ThemeProvider theme={{ mainColor: 'green' }}>
            <FullScreenSegment>Test</FullScreenSegment>
        </ThemeProvider>
    </DivContainer>
);

export const styled: FullScreenSegmentStory = () => (
    <DivContainer height={250}>
        <FullScreenSegment style={{ borderRadius: 10, textAlign: 'center' }}>Test</FullScreenSegment>
    </DivContainer>
);
