import { isEmpty, size } from 'lodash';
import type { CSSProperties, FunctionComponent } from 'react';
import React, { useMemo } from 'react';
import colors from 'cloudify-ui-common-frontend/styles/_colors.scss';

export interface ProductVersionProps {
    /**
     * Full Cloudify version string
     */
    version: string;
    /**
     * Optional CSS style
     */
    style?: CSSProperties;
}

/**
 * Formats and displays short version label (major.minor) based on passed full Cloudify version string.
 */
export const ProductVersion: FunctionComponent<ProductVersionProps> = ({ version, style }) => {
    const shortVersion = useMemo(() => {
        const versionMatches = version.match(/^(\d+)\.(\d+).*$/);
        const major = !!versionMatches && size(versionMatches) >= 2 ? versionMatches[1] : '';
        const minor = !!versionMatches && size(versionMatches) >= 3 ? versionMatches[2] : '';
        return `${major}${minor ? `.${minor}` : ''}`;
    }, [version]);

    if (isEmpty(shortVersion)) return null;

    return <span style={{ color: colors.greyNormal, verticalAlign: 'middle', ...style }}> {shortVersion}</span>;
};

export default ProductVersion;
