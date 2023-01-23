import React from 'react';
import type { IconProps } from 'semantic-ui-react';
import { Icon } from 'semantic-ui-react';

export interface CheckmarkProps extends IconProps {
    /**
     * If true the component will be marked as checked
     */
    value?: boolean;
}

/**
 * Checkmark component shows a simple checkbox (read only).
 *
 * All props except `value` are passed down to the underlaying `Icon` component.
 */
export function Checkmark({ value = false, ...iconProps }: CheckmarkProps) {
    return <Icon title={value ? 'Yes' : 'No'} name={value ? 'checkmark box' : 'square outline'} {...iconProps} />;
}

export default Checkmark;
