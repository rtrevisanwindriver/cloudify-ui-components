import React from 'react';
import { Button, List } from 'semantic-ui-react';
import type { ComponentStory } from '@storybook/react';

import LiveEditDecorator from 'decorators/LiveEditDecorator';
import ErrorMessage from './ErrorMessage';

export default {
    title: 'Elements/ErrorMessage',
    component: ErrorMessage,
    decorators: [LiveEditDecorator({ ErrorMessage, Button, List })]
};
type ErrorMessageStory = ComponentStory<typeof ErrorMessage>;

export const basic: ErrorMessageStory = () => <ErrorMessage error="Invalid Blueprint ID provided" />;
basic.storyName = 'Default';

export const autoHide: ErrorMessageStory = () => <ErrorMessage autoHide error="This error will disappear soon." />;

export const customHeader: ErrorMessageStory = () => (
    <ErrorMessage header="Invalid input" error="Please provide value according to blueprint naming rules." />
);

export const errorsList: ErrorMessageStory = () => (
    <ErrorMessage
        header="Errors in the form"
        error={['Please provide deployment name', 'Please provide agent_private_key_path']}
    />
);

export const errorObject: ErrorMessageStory = () => (
    <ErrorMessage error={{ header: 'Input error', message: 'Please provide agent_private_key_path' }} />
);

export const customComponentError = () => {
    const MissingSecretsError = () => (
        <>
            <Button floated="right">Add missing secrets</Button>
            <p>The following required secrets are missing in this tenant:</p>
            <List bulleted>
                <List.Item>secret key 1</List.Item>
                <List.Item>secret key 2</List.Item>
            </List>
        </>
    );
    return <ErrorMessage header="Missing Secrets Error" error={<MissingSecretsError />} />;
};
