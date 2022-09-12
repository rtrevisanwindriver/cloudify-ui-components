import React from 'react';
// @ts-expect-error TS(7016) FIXME: Could not find a declaration file for module 'styl... Remove this comment to see the full error message
import { ThemeProvider } from 'styled-components';

import DivContainer from 'decorators/DivContainer';
import LiveEditDecorator from 'decorators/LiveEditDecorator';
import HeaderBanner from './HeaderBanner';

export default {
    title: 'Layout/HeaderBanner',
    component: HeaderBanner,
    decorators: [LiveEditDecorator({ HeaderBanner, DivContainer, ThemeProvider })]
};

export const basic = () => (
    <DivContainer height={55} backgroundColor="black">
        <HeaderBanner productName="My Product" productVersion="2.3.5" licenseEdition="Premium" showVersionDetails />
    </DivContainer>
);
basic.storyName = 'Default';

export const customLogo = () => (
    <DivContainer height={55} backgroundColor="black">
        <HeaderBanner
            logoUrl="https://upload.wikimedia.org/wikipedia/commons/a/a7/Wikipedia_logo_v3.svg"
            productName="My Product"
            productVersion="2.3.5"
        />
    </DivContainer>
);

export const noVersionDetails = () => (
    <DivContainer height={55} backgroundColor="black">
        <HeaderBanner
            productName="My Product"
            productVersion="2.3.5"
            licenseEdition="Premium"
            showVersionDetails={false}
        />
    </DivContainer>
);

export const dataFromTheme = () => (
    <ThemeProvider
        theme={{
            headerTextColor: 'red',
            logoUrl:
                'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Coca-Cola_logo.svg/1920px-Coca-Cola_logo.svg.png',
            showVersionDetails: true
        }}
    >
        <DivContainer height={55} backgroundColor="black">
            <HeaderBanner productName="Sugar Corps" productVersion="20.10" licenseEdition="Premium" />
        </DivContainer>
    </ThemeProvider>
);

export const dataFromPropsOverridingTheme = () => (
    <ThemeProvider
        theme={{
            headerTextColor: 'red',
            logoUrl:
                'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Coca-Cola_logo.svg/1920px-Coca-Cola_logo.svg.png',
            showVersionDetails: true
        }}
    >
        <DivContainer height={55} backgroundColor="black">
            <HeaderBanner
                productName="Sugar Corps"
                productVersion="20.10"
                licenseEdition="Premium"
                logoUrl="https://upload.wikimedia.org/wikipedia/commons/a/a7/Wikipedia_logo_v3.svg"
                showVersionDetails={false}
            />
        </DivContainer>
    </ThemeProvider>
);
