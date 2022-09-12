// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck File not migrated fully to TS
import React from 'react';

import LiveEditDecorator from 'decorators/LiveEditDecorator';
import MessageContainer from './MessageContainer';

export default {
    title: 'Elements/MessageContainer',
    component: MessageContainer,
    decorators: [LiveEditDecorator({ MessageContainer })]
};

// @ts-expect-error TS(2741) FIXME: Property 'children' is missing in type '{}' but re... Remove this comment to see the full error message
export const basic = () => <MessageContainer />;
basic.storyName = 'Default';

export const loading = () => <MessageContainer loading>Message</MessageContainer>;

export const small = () => <MessageContainer size="small">Message</MessageContainer>;

export const wide = () => <MessageContainer wide>Message</MessageContainer>;

export const alignedLeft = () => <MessageContainer>Message</MessageContainer>;

// @ts-expect-error TS(2322) FIXME: Type 'number' is not assignable to type 'string'.
export const withMargin = () => <MessageContainer margin={50}>Message</MessageContainer>;
