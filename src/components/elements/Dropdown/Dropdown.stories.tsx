import React from 'react';
import type { Story } from '@storybook/react';

import DivContainer from 'decorators/DivContainer';
import LiveEditDecorator from 'decorators/LiveEditDecorator';
import type { DropdownProps } from 'semantic-ui-react';
import Dropdown from './Dropdown';

export default {
    title: 'Elements/Dropdown',
    component: Dropdown,
    decorators: [LiveEditDecorator({ Dropdown, DivContainer })]
};
type DropdownStory = Story<Required<DropdownProps>>;

export const basic: DropdownStory = () => {
    const options = [
        { text: 'Blue', value: 'blue' },
        { text: 'Red', value: 'red' },
        { text: 'White', value: 'white' }
    ];
    const [value, setValue] = React.useState(options[0].value);

    return (
        <DivContainer>
            <Dropdown
                search
                selection
                options={options}
                value={value}
                onChange={(_event, { value: v }) => setValue(v as string)}
            />
        </DivContainer>
    );
};
basic.storyName = 'Default';

export const withEmptyOption: DropdownStory = () => {
    const options = [
        { text: 'Blue', value: 'blue' },
        { text: 'Red', value: 'red' },
        { text: 'White', value: 'white' },
        { text: '', value: '' }
    ];
    const [value, setValue] = React.useState(options[0].value);

    return (
        <DivContainer>
            <Dropdown
                search
                selection
                options={options}
                value={value}
                onChange={(_event, { value: v }) => setValue(v as string)}
            />
        </DivContainer>
    );
};

export const empty: DropdownStory = () => <Dropdown />;
