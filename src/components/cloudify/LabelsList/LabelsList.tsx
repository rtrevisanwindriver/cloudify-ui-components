import { differenceBy, sortBy } from 'lodash';
import React from 'react';
import type { SemanticCOLORS } from 'semantic-ui-react';
import { Icon, Label as LabelComponent } from 'semantic-ui-react';

const labelLinesVisibleWithoutScroll = 6;
const maxListHeight = `${labelLinesVisibleWithoutScroll * 2 + 0.2}em`;

export interface Label {
    key: string;
    value: string;
    isInSystem?: boolean;
}

export type ColoringStrategy<T extends Label> = (label: T) => SemanticCOLORS | undefined;

export interface LabelsListProps<T extends Label> {
    /**
     * an array of labels to be displayed
     */
    labels: T[];
    /**
     * change handler called on delete icon click
     */
    onChange: (labels: T[]) => void;
    /**
     * label color strategy, by default coloring depends on `isInSystem` flag value
     */
    coloringStrategy?: ColoringStrategy<T>;
}

function defaultColoringStrategy(label: Label) {
    const newLabelColor = 'blue';
    return label.isInSystem === false ? newLabelColor : undefined;
}

/**
 * Component for displaying list of labels. Each label is accompanied by a delete icon.
 */
export function LabelsList<T extends Label = Label>({
    labels,
    onChange,
    coloringStrategy = defaultColoringStrategy
}: LabelsListProps<T>) {
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
            {sortedLabels.map(label => {
                const { key, value } = label;
                return (
                    <LabelComponent
                        key={`${key}:${value}`}
                        as="a"
                        color={coloringStrategy(label)}
                        onClick={event => event.stopPropagation()}
                    >
                        {key}: <span style={{ fontWeight: 'lighter' }}> {value}</span>
                        <Icon
                            name="delete"
                            onClick={() => onChange(differenceBy(labels, [{ key, value }], { key, value }))}
                        />
                    </LabelComponent>
                );
            })}
        </div>
    );
}

export default LabelsList;
