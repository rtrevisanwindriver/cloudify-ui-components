import React from 'react';

import * as InternalComponents from '../components';
import LiveEdit from './LiveEdit/LiveEdit';

// FIXME: When https://github.com/storybookjs/storybook/issues/6642 is fixed, probably this decorator should be removed/refactored
// @ts-expect-error TS(7006) FIXME: Parameter 'scope' implicitly has an 'any' type.
export default function LiveEditDecorator(scope) {
    if (process.env.NODE_ENV !== 'test') {
        // @ts-expect-error TS(6133) FIXME: 'storyFn' is declared but its value is never read.
        // eslint-disable-next-line react/display-name
        return (storyFn, context) => {
            const {
                parameters: {
                    storySource: { source }
                }
            } = context;

            return <LiveEdit source={source} scope={{ ...InternalComponents, ...scope }} />;
        };
    }
    // @ts-expect-error TS(7006) FIXME: Parameter 'storyFn' implicitly has an 'any' type.
    return storyFn => storyFn();
}
