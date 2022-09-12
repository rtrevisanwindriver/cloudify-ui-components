import React from 'react';

import LiveEditDecorator from 'decorators/LiveEditDecorator';
import PopupConfirm from './PopupConfirm';

export default {
    title: 'Popups/PopupConfirm',
    component: PopupConfirm,
    decorators: [LiveEditDecorator({ PopupConfirm })]
};

// @ts-expect-error TS(2739) FIXME: Type '{ trigger: Element; content: string; }' is m... Remove this comment to see the full error message
export const basic = () => <PopupConfirm trigger={<button type="button">Delete</button>} content="Delete this file?" />;
basic.storyName = 'Default';

export const noCancelButton = () => (
    // @ts-expect-error TS(2739) FIXME: Type '{ trigger: Element; onCanConfirm: () => stri... Remove this comment to see the full error message
    <PopupConfirm trigger={<button type="button">Delete</button>} onCanConfirm={() => 'Delete this file?'} />
);

export const initiallyOpen = () => (
    <div style={{ paddingTop: 80 }}>
        {/* @ts-expect-error TS(2739) FIXME: Type '{ trigger: Element; defaultOpen: true; conte... Remove this comment to see the full error message */}
        <PopupConfirm trigger={<button type="button">Delete</button>} defaultOpen content="Delete this file?" />
    </div>
);
