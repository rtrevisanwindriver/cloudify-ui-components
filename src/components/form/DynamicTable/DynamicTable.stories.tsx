import React from 'react';

import LiveEditDecorator from 'decorators/LiveEditDecorator';
import type { ComponentStory } from '@storybook/react';
import type { DynamicTableValue } from './DynamicTable';
import DynamicTable from './DynamicTable';

export default {
    title: 'Form/DynamicTable',
    component: DynamicTable,
    decorators: [LiveEditDecorator({ DynamicTable })]
};

type DynamicTableStory = ComponentStory<typeof DynamicTable>;

export const basic: DynamicTableStory = () => {
    const [value, setValue] = React.useState<DynamicTableValue>([{ first: 'First row' }, { first: 'Second row' }]);

    return (
        <DynamicTable
            name=""
            value={value}
            onChange={(_event, { value: newValue }) => setValue(newValue)}
            columns={[
                { id: 'first', label: 'First column' },
                { id: 'second', label: 'Second column' }
            ]}
        />
    );
};
