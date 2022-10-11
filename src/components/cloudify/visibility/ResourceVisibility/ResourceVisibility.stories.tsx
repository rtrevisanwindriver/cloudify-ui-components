import React from 'react';
import type { Story } from '@storybook/react';

import LiveEditDecorator from 'decorators/LiveEditDecorator';
import ResourceVisibility from './ResourceVisibility';
import type { ResourceVisibilityProps } from './ResourceVisibility';
import type { Visibility } from '../types';

export default {
    title: 'Cloudify/ResourceVisibility',
    component: ResourceVisibility,
    decorators: [LiveEditDecorator({ ResourceVisibility })]
};

type ResourceVisibilityStory = Story<Required<ResourceVisibilityProps>>;

export const unchangeable: ResourceVisibilityStory = () => <ResourceVisibility visibility="tenant" />;
export const changeable: ResourceVisibilityStory = () => {
    const [visibility, setVisibility] = React.useState<Visibility>('private');

    return (
        <ResourceVisibility
            visibility={visibility}
            onSetVisibility={setVisibility}
            allowedSettingTo={['tenant', 'global']}
        />
    );
};
