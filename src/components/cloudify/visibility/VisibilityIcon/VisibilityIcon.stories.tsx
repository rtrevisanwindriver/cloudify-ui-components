import React from 'react';
import type { Story } from '@storybook/react';
import LiveEditDecorator from 'decorators/LiveEditDecorator';
import VisibilityIcon from './VisibilityIcon';
import type { VisibilityIconProps } from './VisibilityIcon';

export default {
    title: 'Cloudify/VisibilityIcon',
    component: VisibilityIcon,
    decorators: [LiveEditDecorator({ VisibilityIcon })]
};

type VisibilityIconStory = Story<Required<VisibilityIconProps>>;

export const unknownVisibility: VisibilityIconStory = () => <VisibilityIcon />;
export const privateVisibility: VisibilityIconStory = () => <VisibilityIcon visibility="private" />;
export const tenantVisibility: VisibilityIconStory = () => <VisibilityIcon visibility="tenant" />;
export const globalVisibility: VisibilityIconStory = () => <VisibilityIcon visibility="global" />;
