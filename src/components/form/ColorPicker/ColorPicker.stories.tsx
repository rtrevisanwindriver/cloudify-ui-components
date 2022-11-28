import type { ComponentStory } from '@storybook/react';
import React from 'react';

import Form from '../Form/Form';

export default {
    title: 'Form/ColorPicker',
    component: Form.ColorPicker,
    argTypes: {
        value: {
            control: 'color'
        }
    }
};

type ColorPickerStory = ComponentStory<typeof Form.ColorPicker>;

export const basic: ColorPickerStory = args => <Form.ColorPicker {...args} />;
basic.storyName = 'Default';
basic.args = {
    name: '',
    value: '#000000',
    onChange: (...args) => {
        // eslint-disable-next-line no-console
        console.log('changed', ...args);
    }
};
