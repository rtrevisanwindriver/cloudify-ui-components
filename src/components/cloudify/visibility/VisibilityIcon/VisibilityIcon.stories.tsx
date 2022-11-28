import React from 'react';
import type { ComponentStory } from '@storybook/react';
import LiveEditDecorator from 'decorators/LiveEditDecorator';
import VisibilityIcon from './VisibilityIcon';

export default {
    title: 'Cloudify/VisibilityIcon',
    component: VisibilityIcon,
    decorators: [LiveEditDecorator({ VisibilityIcon })]
};

type VisibilityIconStory = ComponentStory<typeof VisibilityIcon>;

export const unknownVisibility: VisibilityIconStory = () => <VisibilityIcon />;
export const privateVisibility: VisibilityIconStory = () => <VisibilityIcon visibility="private" />;
export const tenantVisibility: VisibilityIconStory = () => <VisibilityIcon visibility="tenant" />;
export const globalVisibility: VisibilityIconStory = () => <VisibilityIcon visibility="global" />;
