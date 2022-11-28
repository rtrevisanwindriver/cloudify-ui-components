import React from 'react';
import type { ComponentStory } from '@storybook/react';

import LiveEditDecorator from 'decorators/LiveEditDecorator';
import Form from './Form';

export default {
    title: 'Form/FormDivider',
    component: Form.Divider,
    decorators: [LiveEditDecorator({ Form })]
};

type FormDividerStory = ComponentStory<typeof Form.Divider>;

export const basic: FormDividerStory = () => <Form.Divider>User Data</Form.Divider>;
