import React from 'react';

import LiveEditDecorator from 'decorators/LiveEditDecorator';

import DivContainer from 'decorators/DivContainer';
import GenericField from './GenericField';
import Form from '../Form';

/*
Some stories are disabled for Storyshots tests due to:
https://github.com/Semantic-Org/Semantic-UI-React/issues/4061
 */
export default {
    title: 'Form/GenericField',
    component: GenericField,
    decorators: [LiveEditDecorator({ DivContainer, GenericField, Form })]
};

export const stringField = () => {
    const [value, setValue] = React.useState('');

    return (
        <Form>
            <GenericField
                name="stringTest"
                required
                label="String"
                value={value}
                onChange={(_event, { value: newValue }) => setValue(newValue)}
                type={GenericField.STRING_TYPE}
                icon="rocket"
                placeholder="Write text..."
            />
        </Form>
    );
};

export const passwordField = () => {
    const [value, setValue] = React.useState('');

    return (
        <Form>
            <GenericField
                name="passwordTest"
                label="Password"
                value={value}
                onChange={(_event, { value: newValue }) => setValue(newValue)}
                type={GenericField.PASSWORD_TYPE}
                icon="key"
            />
        </Form>
    );
};

export const numberField = () => {
    const [value, setValue] = React.useState(5);

    return (
        <Form>
            <GenericField
                name="numberTest"
                label="Number"
                value={value}
                onChange={(_event, { value: newValue }) => setValue(newValue)}
                type={GenericField.NUMBER_TYPE}
                min={1}
                max={10}
            />
        </Form>
    );
};

export const booleanField = () => {
    const [value, setValue] = React.useState(true);

    return (
        <Form>
            <GenericField
                name="booleanTest"
                label="Boolean Test"
                value={value}
                onChange={(_event, { checked: newValue }) => setValue(newValue)}
                type={GenericField.BOOLEAN_TYPE}
            />
        </Form>
    );
};

export const booleanListField = () => {
    const [value, setValue] = React.useState('true');

    return (
        <Form>
            <GenericField
                name="booleanListTest"
                label="Boolean List"
                value={value}
                onChange={(_event, { value: newValue }) => setValue(newValue)}
                type={GenericField.BOOLEAN_LIST_TYPE}
            />
        </Form>
    );
};
booleanListField.parameters = { storyshots: false };

export const listField = () => {
    const [value, setValue] = React.useState('b');

    return (
        <DivContainer height={200}>
            <Form>
                <GenericField
                    name="listTest"
                    label="List"
                    value={value}
                    onChange={(_event, { value: newValue }) => setValue(newValue)}
                    type={GenericField.LIST_TYPE}
                    items={['a', 'b', 'c']}
                />
            </Form>
        </DivContainer>
    );
};
listField.parameters = { storyshots: false };

export const numberListField = () => {
    const [value, setValue] = React.useState(2);

    return (
        <DivContainer height={200}>
            <Form>
                <GenericField
                    name="numberListTest"
                    label="Number List"
                    value={value}
                    onChange={(_event, { value: newValue }) => setValue(newValue)}
                    type={GenericField.NUMBER_LIST_TYPE}
                    items={[1, 2, 3]}
                />
            </Form>
        </DivContainer>
    );
};
numberListField.parameters = { storyshots: false };

export const multiSelectListField = () => {
    const [value, setValue] = React.useState([2, 3, 4]);

    return (
        <DivContainer height={200}>
            <Form>
                <GenericField
                    name="multiSelectListTest"
                    label="Multiselect List"
                    value={value}
                    onChange={(_event, { value: newValue }) => setValue(newValue)}
                    type={GenericField.MULTI_SELECT_LIST_TYPE}
                    items={[1, 2, 3, { value: 4, name: 'four' }, { value: 5, name: 'five' }]}
                />
            </Form>
        </DivContainer>
    );
};
multiSelectListField.parameters = { storyshots: false };

export const editableListField = () => {
    const [value, setValue] = React.useState('b');

    return (
        <DivContainer height={200}>
            <Form>
                <GenericField
                    name="editableListTest"
                    label="Editable List"
                    value={value}
                    onChange={(_event, { value: newValue }) => setValue(newValue)}
                    type={GenericField.EDITABLE_LIST_TYPE}
                    items={['a', 'b', 'c']}
                />
            </Form>
        </DivContainer>
    );
};
editableListField.parameters = { storyshots: false };

export const numberEditableListField = () => {
    const [value, setValue] = React.useState(2);

    return (
        <DivContainer height={200}>
            <Form>
                <GenericField
                    name="numberEditableListTest"
                    label="Number Editable List"
                    value={value}
                    onChange={(_event, { value: newValue }) => setValue(newValue)}
                    type={GenericField.NUMBER_EDITABLE_LIST_TYPE}
                    items={[1, 2, 3]}
                />
            </Form>
        </DivContainer>
    );
};
numberEditableListField.parameters = { storyshots: false };

export const customField = () => {
    const [value, setValue] = React.useState();

    return (
        <DivContainer height={200}>
            <Form>
                <GenericField
                    name="timeFilterTest"
                    label="Time Filter"
                    value={value}
                    onChange={(_event, { value: newValue }) => setValue(newValue)}
                    type={GenericField.CUSTOM_TYPE}
                    component={Form.Date}
                />
            </Form>
        </DivContainer>
    );
};

export const noCustomTypeField = () => (
    <GenericField name="timeFilterTest" label="No component prop specified" type={GenericField.CUSTOM_TYPE} />
);
