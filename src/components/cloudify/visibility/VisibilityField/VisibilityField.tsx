import React from 'react';
import { dropRight, noop } from 'lodash';

import { Popup, VisibilityIcon } from 'components';
import { defaultVisibility, visibilities, visibilityTitle } from '../consts';
import type { Visibility } from '../types';

export interface VisibilityFieldProps {
    /**
     * the current visibility, one from ['tenant', 'private', 'global', 'unknown']
     */
    visibility?: Visibility;

    /**
     * the callback to be called with the new visibility
     */
    onVisibilityChange?: (visibility: Visibility) => void;

    /**
     * should the component not allow changing the global
     */
    disallowGlobal?: boolean;

    /**
     * should the component allow changing visibility
     */
    allowChange?: boolean;

    /**
 
      * name of the style class to be added
      */
    className?: string;
}

/**
 * VisibilityField - allowing the user to choose visibilities for resources by showing the visibility icon and clicking on it to switch.
 *
 * The component accepts a callback function called when visibility is changed (the `onVisibilityChange` prop).
 *
 * All props except `onVisibilityChange`, `disallowGlobal` and `allowChange` are passed down to the underlaying `VisibilityIcon` component.
 */
export function VisibilityField({
    visibility = defaultVisibility,
    onVisibilityChange = noop,
    disallowGlobal,
    allowChange = true,
    ...visibilityIconProps
}: VisibilityFieldProps) {
    const visibilitiesOrder = [visibilities.TENANT.name, visibilities.PRIVATE.name, visibilities.GLOBAL.name];

    const onClick = () => {
        const allowedVisibilities = disallowGlobal ? dropRight(visibilitiesOrder) : visibilitiesOrder;
        const index = allowedVisibilities.indexOf(visibility);
        if (index >= 0 && index < allowedVisibilities.length - 1) {
            onVisibilityChange(allowedVisibilities[index + 1]);
        } else {
            onVisibilityChange(allowedVisibilities[0]);
        }
    };

    return (
        <Popup>
            <Popup.Trigger>
                <VisibilityIcon
                    visibility={visibility}
                    link={allowChange}
                    disabled={!allowChange}
                    showTitle={false}
                    title={null}
                    onClick={onClick}
                    {...visibilityIconProps}
                />
            </Popup.Trigger>
            <Popup.Header>Visibility</Popup.Header>
            <Popup.Content>{visibilityTitle[visibility]}</Popup.Content>
        </Popup>
    );
}

export default VisibilityField;
