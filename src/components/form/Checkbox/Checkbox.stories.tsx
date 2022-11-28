import React from 'react';

import type { ComponentStory } from '@storybook/react';

import LiveEditDecorator from 'decorators/LiveEditDecorator';
import Form from '../Form/Form';

export default {
    title: 'Form/Checkbox',
    component: Form.Checkbox,
    decorators: [LiveEditDecorator({ Form })]
};

type CheckboxStory = ComponentStory<typeof Form.Checkbox>;

export const basic: CheckboxStory = () => (
    <Form.Checkbox label="Notifications" help="Send e-mail notifications about updates" />
);

export const withoutHelp: CheckboxStory = () => <Form.Checkbox label="Notifications" />;

export const Toggle: CheckboxStory = () => <Form.Checkbox toggle label="Newsletter" />;
