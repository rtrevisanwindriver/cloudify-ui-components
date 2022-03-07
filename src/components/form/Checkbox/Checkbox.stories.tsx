import React from 'react';

import type { Story } from '@storybook/react';

import LiveEditDecorator from 'decorators/LiveEditDecorator';
import type { CheckboxProps } from './Checkbox';
import Form from '../Form/Form';

export default {
    title: 'Form/Checkbox',
    component: Form.Checkbox,
    decorators: [LiveEditDecorator({ Form })]
};

export const basic: Story<Required<CheckboxProps>> = () => (
    <Form.Checkbox label="Notifications" help="Send e-mail notifications about updates" />
);

export const withoutHelp: Story<Required<CheckboxProps>> = () => <Form.Checkbox label="Notifications" />;

export const Toggle: Story<Required<CheckboxProps>> = () => <Form.Checkbox toggle label="Newsletter" />;
