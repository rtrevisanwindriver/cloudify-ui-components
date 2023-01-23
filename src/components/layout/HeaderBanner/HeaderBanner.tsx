import { isBoolean } from 'lodash';
import type { CSSProperties } from 'react';
import React, { useContext } from 'react';
import { Header } from 'semantic-ui-react';
import { ThemeContext } from 'styled-components';
import colors from 'cloudify-ui-common-frontend/styles/_colors.scss';

import { Logo, ProductVersion } from 'components';
import ProductName from './ProductName';
import LicenseEdition from './LicenseEdition';

export interface HeaderBannerProps {
    /**
     * name of the style class to be added to header div block
     */
    className?: string;

    /**
     * CSS style to be added to header div block
     */
    style?: CSSProperties;

    /**
     * product license edition, displayed after the product name
     */
    licenseEdition?: string;

    /**
     * URL for logo, displayed first from the left side, overrides theme parameter `logoUrl`
     */
    logoUrl?: string;

    /**
     * name of the product, displayed as first text after the logo
     */
    productName?: string;

    /**
     * product version, should be specified according to semantic versioning format
     */
    productVersion?: string;

    /**
     * if set to true, then license edition and product version will be displayed, overrides theme parameter `showVersionDetails`
     */
    showVersionDetails?: boolean;
}

/**
 *
 * HeaderBanner is a component displaying application header.
 *
 * * contains: logo, product name, license edition and product version
 * * supports theming:
 *   * `headerTextColor` parameter is used as text color, if not specified then `white` from default colors is chosen
 *   * `logoUrl` parameter is used as URL for Logo component
 *   * `showVersionDetails` parameter is used to determine if license edition and product version should be visible
 */
export function HeaderBanner({
    className = '',
    licenseEdition = '',
    logoUrl,
    productName = '',
    productVersion = '',
    showVersionDetails,
    style
}: HeaderBannerProps) {
    const theme = useContext(ThemeContext) || {};
    const color = theme.headerTextColor || colors.white;
    const url = logoUrl || theme.logoUrl;
    const showDetails = isBoolean(showVersionDetails) ? showVersionDetails : theme.showVersionDetails;

    return (
        <>
            <Logo style={{ float: 'left' }} url={url} />
            <Header
                as="h1"
                style={{
                    float: 'left',
                    margin: '9px 0',
                    padding: 0,
                    height: '100%',
                    color,
                    ...style
                }}
                className={`headerBanner ${className}`}
            >
                <ProductName name={productName} />
                {showDetails && (
                    <>
                        <LicenseEdition edition={licenseEdition} />
                        <ProductVersion version={productVersion} />
                    </>
                )}
            </Header>
        </>
    );
}

export default HeaderBanner;
