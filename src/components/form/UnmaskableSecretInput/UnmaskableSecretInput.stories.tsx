import React from 'react';
import type { ComponentStory } from '@storybook/react';
import LiveEditDecorator from 'decorators/LiveEditDecorator';
import UnmaskableSecretInput from './UnmaskableSecretInput';

export default {
    title: 'Form/UnmaskableSecretInput',
    component: UnmaskableSecretInput,
    decorators: [LiveEditDecorator({ UnmaskableSecretInput })]
};

type UnmaskableSecretInputStory = ComponentStory<typeof UnmaskableSecretInput>;

export const basic: UnmaskableSecretInputStory = () => <UnmaskableSecretInput />;
basic.storyName = 'Default';
