import React from 'react';

import LiveEditDecorator from 'decorators/LiveEditDecorator';
import type { Story } from '@storybook/react';
import type { LoadingProps } from './Loading';
import Loading from './Loading';

export default {
    title: 'Elements/Loading',
    component: Loading,
    decorators: [LiveEditDecorator({ Loading })]
};
type LoadingStory = Story<Required<LoadingProps>>;

export const basic: LoadingStory = () => <Loading />;
basic.storyName = 'Default';

export const customMessage: LoadingStory = () => <Loading message="Loading files" />;
