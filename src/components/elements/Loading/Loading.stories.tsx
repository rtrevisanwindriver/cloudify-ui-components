import React from 'react';

import LiveEditDecorator from 'decorators/LiveEditDecorator';
import type { ComponentStory } from '@storybook/react';
import Loading from './Loading';

export default {
    title: 'Elements/Loading',
    component: Loading,
    decorators: [LiveEditDecorator({ Loading })]
};
type LoadingStory = ComponentStory<typeof Loading>;

export const basic: LoadingStory = () => <Loading />;
basic.storyName = 'Default';

export const customMessage: LoadingStory = () => <Loading message="Loading files" />;
