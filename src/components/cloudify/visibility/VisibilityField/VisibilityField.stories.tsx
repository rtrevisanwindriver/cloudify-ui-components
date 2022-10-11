import React from 'react';
import type { Story } from '@storybook/react';
import LiveEditDecorator from 'decorators/LiveEditDecorator';

import VisibilityField from './VisibilityField';
import type { VisibilityFieldProps } from './VisibilityField';
import type { Visibility } from '../types';

export default {
    title: 'Cloudify/VisibilityField',
    component: VisibilityField,
    decorators: [LiveEditDecorator({ VisibilityField })]
};

type VisibilityFieldStory = Story<Required<VisibilityFieldProps>>;

export const unchangeable: VisibilityFieldStory = () => <VisibilityField visibility="global" allowChange={false} />;
export const changeable: VisibilityFieldStory = () => {
    const [visibility, setVisibility] = React.useState<Visibility>('private');
    return <VisibilityField visibility={visibility} onVisibilityChange={setVisibility} />;
};
export const disallowGlobal: VisibilityFieldStory = () => {
    const [visibility, setVisibility] = React.useState<Visibility>('private');
    return <VisibilityField visibility={visibility} onVisibilityChange={setVisibility} disallowGlobal />;
};
