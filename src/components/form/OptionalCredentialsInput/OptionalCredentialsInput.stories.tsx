import React from 'react';
import type { ComponentStory } from '@storybook/react';
import LiveEditDecorator from 'decorators/LiveEditDecorator';
import OptionalCredentialsInput from './OptionalCredentialsInput';
import { Form } from '../Form';

export default {
    title: 'Form/OptionalCredentialsInput',
    component: OptionalCredentialsInput,
    decorators: [LiveEditDecorator({ OptionalCredentialsInput, Form })]
};

type OptionalCredentialsInputStory = ComponentStory<typeof OptionalCredentialsInput>;

export const basic: OptionalCredentialsInputStory = () => {
    const [enabled, setEnabled] = React.useState(false);
    return (
        <Form>
            <OptionalCredentialsInput
                enabled={enabled}
                errorsProvider={() => undefined}
                onCredentialsChange={() => {}}
                onEnabledChange={setEnabled}
                onBlur={() => {}}
            />
        </Form>
    );
};
basic.storyName = 'Default';
