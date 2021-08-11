import React, { FunctionComponent } from 'react';
import { Icon, Image, Statistic, SemanticICONS } from 'semantic-ui-react';

export interface KeyIndicatorProps {
    /**
     * Label appearing at the bottom of the component
     */
    title?: string;

    /**
     * Name of the icon to be displayed
     */
    icon?: SemanticICONS;

    /**
     * URL of the image to be displayed
     */
    imageSrc?: string;

    /**
     * Numerical value to be displayed
     */
    number?: number;
}

/**
 * `KeyIndicator` - a simple component showing a counter along with label and an image (Semantic UI icon or an image
 * specified by URL)
 *
 * List of available icons can be found [here](https://react.semantic-ui.com/elements/icon)
 */
const KeyIndicator: FunctionComponent<KeyIndicatorProps> = ({ title, icon, imageSrc, number }) => {
    return (
        <div
            style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                overflow: 'hidden'
            }}
        >
            <Statistic
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    whiteSpace: 'nowrap'
                }}
            >
                <Statistic.Value>
                    {imageSrc && (
                        <Image
                            src={imageSrc}
                            style={{ maxHeight: '4rem', verticalAlign: 'bottom', marginBottom: '0.25rem' }}
                            inline
                        />
                    )}
                    {icon && <Icon name={icon} />} {Number.isFinite(number) && number}
                </Statistic.Value>
                <Statistic.Label>{title}</Statistic.Label>
            </Statistic>
        </div>
    );
};
export default KeyIndicator;
