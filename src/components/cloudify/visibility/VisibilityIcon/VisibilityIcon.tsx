import React from 'react';
import { find } from 'lodash';
import type { IconProps } from 'semantic-ui-react';
import { Icon } from 'semantic-ui-react';

import { Popup } from 'components';
import { defaultVisibility, visibilities } from '../consts';
import type { Visibility } from '../types';

export interface VisibilityIconProps extends IconProps {
    /**
     * visibility, one from ['private', 'tenant', 'global', 'unknown']
     */
    visibility?: Visibility;
    /**
     * if set to true, then on hovering icon title will be shown in popup
     */
    showTitle?: boolean;
}

/**
 * VisibilityIcon - a component showing an visibility icon depending on resource visibility.
 *
 * All props supported by the `Icon` component are passed down to it.
 */
export function VisibilityIcon({
    visibility = defaultVisibility,
    showTitle = true,
    ...iconProps
}: VisibilityIconProps) {
    const data = find(visibilities, { name: visibility }) || visibilities.UNKNOWN;

    return showTitle ? (
        <Popup trigger={<Icon name={data.icon} color={data.color} {...iconProps} />} content={data.title} />
    ) : (
        <Icon name={data.icon} color={data.color} {...iconProps} />
    );
}

export default VisibilityIcon;
