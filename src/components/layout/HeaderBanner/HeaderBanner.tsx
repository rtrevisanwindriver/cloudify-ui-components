import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Header } from 'semantic-ui-react';
// @ts-expect-error TS(7016) FIXME: Could not find a declaration file for module 'styl... Remove this comment to see the full error message
import { ThemeContext } from 'styled-components';
import colors from 'cloudify-ui-common/styles/_colors.scss';

import Logo from '../Logo';
import ProductName from './ProductName';
import ProductVersion from '../ProductVersion';
import LicenseEdition from './LicenseEdition';

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
export default function HeaderBanner({
    // @ts-expect-error TS(7031) FIXME: Binding element 'className' implicitly has an 'any... Remove this comment to see the full error message
    className,
    // @ts-expect-error TS(7031) FIXME: Binding element 'licenseEdition' implicitly has an... Remove this comment to see the full error message
    licenseEdition,
    // @ts-expect-error TS(7031) FIXME: Binding element 'logoUrl' implicitly has an 'any' ... Remove this comment to see the full error message
    logoUrl,
    // @ts-expect-error TS(7031) FIXME: Binding element 'productName' implicitly has an 'a... Remove this comment to see the full error message
    productName,
    // @ts-expect-error TS(7031) FIXME: Binding element 'productVersion' implicitly has an... Remove this comment to see the full error message
    productVersion,
    // @ts-expect-error TS(7031) FIXME: Binding element 'showVersionDetails' implicitly ha... Remove this comment to see the full error message
    showVersionDetails,
    // @ts-expect-error TS(7031) FIXME: Binding element 'style' implicitly has an 'any' ty... Remove this comment to see the full error message
    style
}) {
    const theme = useContext(ThemeContext) || {};
    // @ts-expect-error TS(2571) FIXME: Object is of type 'unknown'.
    const color = theme.headerTextColor || colors.white;
    // @ts-expect-error TS(2571) FIXME: Object is of type 'unknown'.
    const url = logoUrl || theme.logoUrl;
    // @ts-expect-error TS(2571) FIXME: Object is of type 'unknown'.
    const showDetails = _.isBoolean(showVersionDetails) ? showVersionDetails : theme.showVersionDetails;

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
                        {/* @ts-expect-error TS(2786) FIXME: 'LicenseEdition' cannot be used as a JSX component... Remove this comment to see the full error message */}
                        <LicenseEdition edition={licenseEdition} />
                        <ProductVersion version={productVersion} />
                    </>
                )}
            </Header>
        </>
    );
}

HeaderBanner.propTypes = {
    /**
     * name of the style class to be added to header div block
     */
    className: PropTypes.string,

    /**
     * CSS style to be added to header div block
     */
    style: PropTypes.shape({}),

    /**
     * product license edition, displayed after the product name
     */
    licenseEdition: PropTypes.string,

    /**
     * URL for logo, displayed first from the left side, overrides theme parameter `logoUrl`
     */
    logoUrl: PropTypes.string,

    /**
     * name of the product, displayed as first text after the logo
     */
    productName: PropTypes.string,

    /**
     * product version, should be specified according to semantic versioning format
     */
    productVersion: PropTypes.string,

    /**
     * if set to true, then license edition and product version will be displayed, overrides theme parameter `showVersionDetails`
     */
    showVersionDetails: PropTypes.bool
};

HeaderBanner.defaultProps = {
    className: '',
    style: null,
    licenseEdition: '',
    logoUrl: '',
    productName: '',
    productVersion: '',
    showVersionDetails: undefined
};
