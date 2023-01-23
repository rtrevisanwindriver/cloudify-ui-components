import { differenceBy, sortBy } from 'lodash';
import type { FunctionComponent } from 'react';
import React from 'react';
import { Icon, Label as LabelComponent } from 'semantic-ui-react';

const newLabelColor = 'blue';
const labelLinesVisibleWithoutScroll = 6;
const maxListHeight = `${labelLinesVisibleWithoutScroll * 2 + 0.2}em`;

export interface Label {
    key: string;
    value: string;
    isInSystem?: boolean;
}

export interface LabelsListProps {
    /**
     * an array of labels to be displayed
     */
    labels: Label[];
    /**
     * change handler called on delete icon click
     */
    onChange: (labels: Label[]) => void;
}

/**
 * Component for displaying list of labels. Each label is accompanied by a delete icon.
 */
export const LabelsList: FunctionComponent<LabelsListProps> = ({ labels, onChange }) => {
    const sortedLabels = sortBy(labels, 'key', 'value');

    return (
        <div
            className="ui multiple dropdown"
            style={{
                paddingRight: '4.1em',
                minHeight: '2em',
                maxHeight: maxListHeight,
                overflow: 'auto',
                maxWidth: '100%'
            }}
        >
            {sortedLabels.map(({ key, value, isInSystem = true }) => {
                return (
                    <LabelComponent
                        key={`${key}:${value}`}
                        as="a"
                        color={isInSystem ? undefined : newLabelColor}
                        onClick={event => event.stopPropagation()}
                    >
                        {key} <span style={{ fontWeight: 'lighter' }}>{value}</span>
                        <Icon
                            name="delete"
                            onClick={() => onChange(differenceBy(labels, [{ key, value }], { key, value }))}
                        />
                    </LabelComponent>
                );
            })}
        </div>
    );
};

export default LabelsList;
