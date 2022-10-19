import React from 'react';
import type { Story } from '@storybook/react';

import LiveEditDecorator from 'decorators/LiveEditDecorator';
import Form from './Form';
import type { FormDividerProps } from './FormDivider';

export default {
    title: 'Form/FormDivider',
    component: Form.Divider,
    decorators: [LiveEditDecorator({ Form })]
};

type FormDividerStory = Story<Required<FormDividerProps>>;

export const basic: FormDividerStory = () => <Form.Divider>User Data</Form.Divider>;
