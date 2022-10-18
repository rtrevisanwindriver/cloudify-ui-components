import React from 'react';

import LiveEditDecorator from 'decorators/LiveEditDecorator';
import type { Story } from '@storybook/react';
import MessageContainer from './MessageContainer';
import type { MessageContainerProps } from './MessageContainer';

export default {
    title: 'Elements/MessageContainer',
    component: MessageContainer,
    decorators: [LiveEditDecorator({ MessageContainer })]
};

type MessageContainerStory = Story<Required<MessageContainerProps>>;

export const basic: MessageContainerStory = () => <MessageContainer />;

basic.storyName = 'Default';

export const loading: MessageContainerStory = () => <MessageContainer loading>Message</MessageContainer>;

export const small: MessageContainerStory = () => <MessageContainer size="small">Message</MessageContainer>;

export const wide: MessageContainerStory = () => <MessageContainer wide>Message</MessageContainer>;

export const alignedLeft: MessageContainerStory = () => <MessageContainer>Message</MessageContainer>;

export const withMargin: MessageContainerStory = () => <MessageContainer margin="50px">Message</MessageContainer>;
