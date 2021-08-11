import { Story } from '@storybook/react';
import React from 'react';

import DivContainer from 'decorators/DivContainer';
import LiveEditDecorator from 'decorators/LiveEditDecorator';
import KeyIndicator, { KeyIndicatorProps } from './KeyIndicator';

export default {
    title: 'Data/KeyIndicator',
    component: KeyIndicator,
    decorators: [LiveEditDecorator({ KeyIndicator, DivContainer })]
};

export const iconWithLabelAndNumber: Story<Required<KeyIndicatorProps>> = () => (
    <DivContainer>
        <KeyIndicator title="User Stars" icon="star" number={54} />
    </DivContainer>
);

export const iconWithLabel: Story<Required<KeyIndicatorProps>> = () => (
    <DivContainer>
        <KeyIndicator title="Plugins" icon="plug" />
    </DivContainer>
);

export const externalImage: Story<Required<KeyIndicatorProps>> = () => (
    <DivContainer>
        <KeyIndicator
            title="Team members"
            imageSrc="https://react.semantic-ui.com/images/avatar/small/matthew.png"
            number={3}
        />
    </DivContainer>
);
