import type { FunctionComponent, ReactNode } from 'react';
import React from 'react';
import type { DimmerProps } from 'semantic-ui-react';
import { Dimmer, Loader } from 'semantic-ui-react';

export interface LoadingOverlayProps extends DimmerProps {
    /**
     * text message to display under loading icon
     */
    message?: ReactNode;
}

/**
 * LoadingOverlay is an overlay component which uses [Loader](https://react.semantic-ui.com/elements/loader) component from Semantic-UI-React
 * to display loader in center of parent component, covering any sibling components with a dimmer.
 * All props supported by the `Dimmer` component are passed down to it.
 */
export const LoadingOverlay: FunctionComponent<LoadingOverlayProps> = ({ message = null, ...dimmerProps }) => {
    return (
        <Dimmer active inverted {...dimmerProps}>
            <Loader>{message}</Loader>
        </Dimmer>
    );
};

export default LoadingOverlay;
