import React from 'react';

import type { DecoratorFn } from '@storybook/react';
import * as InternalComponents from '../components';
import LiveEdit from './LiveEdit/LiveEdit';
import type { LiveEditProps } from './LiveEdit/LiveEdit';

// FIXME: When https://github.com/storybookjs/storybook/issues/6642 is fixed, probably this decorator should be removed/refactored
export default function LiveEditDecorator(scope: LiveEditProps['scope']): DecoratorFn {
    if (process.env.NODE_ENV !== 'test') {
        // eslint-disable-next-line react/display-name
        return (_storyFn, context) => {
            const {
                parameters: {
                    storySource: { source }
                }
            } = context;

            return <LiveEdit source={source} scope={{ ...InternalComponents, ...scope }} />;
        };
    }
    return storyFn => storyFn();
}
