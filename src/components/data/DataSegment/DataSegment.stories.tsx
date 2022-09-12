import React from 'react';

import { Button } from 'semantic-ui-react';
import LiveEditDecorator from 'decorators/LiveEditDecorator';

import DataSegment from './DataSegment';

export default {
    title: 'Data/DataSegment',
    component: DataSegment,
    decorators: [LiveEditDecorator({ Button, DataSegment })]
};
export const simple = () => (
    <DataSegment>
        {[1, 2, 3, 4].map(item => (
            // @ts-expect-error TS(2339) FIXME: Property 'Item' does not exist on type 'typeof Dat... Remove this comment to see the full error message
            <DataSegment.Item key={item}>
                <h2>Item {item}</h2>
                {/* @ts-expect-error TS(2339) FIXME: Property 'Item' does not exist on type 'typeof Dat... Remove this comment to see the full error message */}
            </DataSegment.Item>
        ))}
    </DataSegment>
);

export const selectable = () => {
    const [selected, setSelected] = React.useState(1);
    return (
        <DataSegment>
            {[1, 2, 3, 4].map(item => (
                // @ts-expect-error TS(2339) FIXME: Property 'Item' does not exist on type 'typeof Dat... Remove this comment to see the full error message
                <DataSegment.Item key={item} selected={item === selected} onClick={() => setSelected(item)}>
                    <h2>Item {item}</h2>
                    {/* @ts-expect-error TS(2339) FIXME: Property 'Item' does not exist on type 'typeof Dat... Remove this comment to see the full error message */}
                </DataSegment.Item>
            ))}
        </DataSegment>
    );
};

export const pagination = () => {
    const [pageSize, setPageSize] = React.useState(3);

    return (
        <DataSegment
            // @ts-expect-error TS(2322) FIXME: Type '{ children: Element[]; fetchData: ({ gridPar... Remove this comment to see the full error message
            fetchData={({ gridParams: { pageSize: ps } }) => setPageSize(ps)}
            totalSize={10}
            pageSize={pageSize}
        >
            {[1, 2, 3, 4].map(item => (
                // @ts-expect-error TS(2339) FIXME: Property 'Item' does not exist on type 'typeof Dat... Remove this comment to see the full error message
                <DataSegment.Item key={item}>
                    <h2>Item {item}</h2>
                    {/* @ts-expect-error TS(2339) FIXME: Property 'Item' does not exist on type 'typeof Dat... Remove this comment to see the full error message */}
                </DataSegment.Item>
            ))}
        </DataSegment>
    );
};

export const searchFilter = () => (
    // @ts-expect-error TS(2322) FIXME: Type '{ children: Element[]; searchable: true; }' ... Remove this comment to see the full error message
    <DataSegment searchable>
        {[1, 2, 3, 4].map(item => (
            // @ts-expect-error TS(2339) FIXME: Property 'Item' does not exist on type 'typeof Dat... Remove this comment to see the full error message
            <DataSegment.Item key={item}>
                <h2>Item {item}</h2>
                {/* @ts-expect-error TS(2339) FIXME: Property 'Item' does not exist on type 'typeof Dat... Remove this comment to see the full error message */}
            </DataSegment.Item>
        ))}
    </DataSegment>
);

export const actionButtons = () => (
    <DataSegment>
        {/* @ts-expect-error TS(2339) FIXME: Property 'Action' does not exist on type 'typeof D... Remove this comment to see the full error message */}
        <DataSegment.Action>
            <Button color="green" content="Deploy" icon="rocket" />
            <Button color="orange" content="Add" icon="add" />
            {/* @ts-expect-error TS(2339) FIXME: Property 'Action' does not exist on type 'typeof D... Remove this comment to see the full error message */}
        </DataSegment.Action>
        {[1, 2, 3, 4].map(item => (
            // @ts-expect-error TS(2339) FIXME: Property 'Item' does not exist on type 'typeof Dat... Remove this comment to see the full error message
            <DataSegment.Item key={item}>
                <h2>Item {item}</h2>
                {/* @ts-expect-error TS(2339) FIXME: Property 'Item' does not exist on type 'typeof Dat... Remove this comment to see the full error message */}
            </DataSegment.Item>
        ))}
    </DataSegment>
);

export const empty = () => (
    // @ts-expect-error TS(2322) FIXME: Type '{ children: Element; totalSize: number; }' i... Remove this comment to see the full error message
    <DataSegment totalSize={0}>
        {/* @ts-expect-error TS(2339) FIXME: Property 'Item' does not exist on type 'typeof Dat... Remove this comment to see the full error message */}
        <DataSegment.Item>
            <h2>Item</h2>
            {/* @ts-expect-error TS(2339) FIXME: Property 'Item' does not exist on type 'typeof Dat... Remove this comment to see the full error message */}
        </DataSegment.Item>
    </DataSegment>
);
