import React from 'react';

import LiveEditDecorator from 'decorators/LiveEditDecorator';
import NodesTree from './NodesTree';

export default {
    title: 'Data/NodesTree',
    component: NodesTree,
    decorators: [LiveEditDecorator({ NodesTree })]
};

export const expanded = () => (
    <NodesTree defaultExpandAll>
        {/* @ts-expect-error TS(2739) FIXME: Type '{ children: Element[]; title: string; key: s... Remove this comment to see the full error message */}
        <NodesTree.Node title="Encyclopaedia" key="encyclopaedia">
            {/* @ts-expect-error TS(2739) FIXME: Type '{ title: string; key: string; }' is missing ... Remove this comment to see the full error message */}
            <NodesTree.Node title="Science" key="science" />
            {/* @ts-expect-error TS(2739) FIXME: Type '{ children: Element[]; title: string; key: s... Remove this comment to see the full error message */}
            <NodesTree.Node title="Culture" key="culture">
                {/* @ts-expect-error TS(2739) FIXME: Type '{ title: string; key: string; }' is missing ... Remove this comment to see the full error message */}
                <NodesTree.Node title="Art" key="art" />
                {/* @ts-expect-error TS(2739) FIXME: Type '{ title: string; key: string; }' is missing ... Remove this comment to see the full error message */}
                <NodesTree.Node title="Craft" key="craft" />
            </NodesTree.Node>
        </NodesTree.Node>
    </NodesTree>
);

export const collapsed = () => (
    <NodesTree>
        {/* @ts-expect-error TS(2739) FIXME: Type '{ children: Element[]; title: string; key: s... Remove this comment to see the full error message */}
        <NodesTree.Node title="Encyclopaedia" key="encyclopaedia">
            {/* @ts-expect-error TS(2739) FIXME: Type '{ title: string; key: string; }' is missing ... Remove this comment to see the full error message */}
            <NodesTree.Node title="Science" key="science" />
            {/* @ts-expect-error TS(2739) FIXME: Type '{ children: Element[]; title: string; key: s... Remove this comment to see the full error message */}
            <NodesTree.Node title="Culture" key="culture">
                {/* @ts-expect-error TS(2739) FIXME: Type '{ title: string; key: string; }' is missing ... Remove this comment to see the full error message */}
                <NodesTree.Node title="Art" key="art" />
                {/* @ts-expect-error TS(2739) FIXME: Type '{ title: string; key: string; }' is missing ... Remove this comment to see the full error message */}
                <NodesTree.Node title="Craft" key="craft" />
            </NodesTree.Node>
        </NodesTree.Node>
    </NodesTree>
);

export const selectable = () => (
    <NodesTree defaultExpandAll selectable>
        {/* @ts-expect-error TS(2739) FIXME: Type '{ children: Element[]; title: string; key: s... Remove this comment to see the full error message */}
        <NodesTree.Node title="Encyclopaedia" key="encyclopaedia">
            {/* @ts-expect-error TS(2739) FIXME: Type '{ title: string; key: string; }' is missing ... Remove this comment to see the full error message */}
            <NodesTree.Node title="Science" key="science" />
            {/* @ts-expect-error TS(2739) FIXME: Type '{ children: Element[]; title: string; key: s... Remove this comment to see the full error message */}
            <NodesTree.Node title="Culture" key="culture">
                {/* @ts-expect-error TS(2739) FIXME: Type '{ title: string; key: string; }' is missing ... Remove this comment to see the full error message */}
                <NodesTree.Node title="Art" key="art" />
                {/* @ts-expect-error TS(2739) FIXME: Type '{ title: string; key: string; }' is missing ... Remove this comment to see the full error message */}
                <NodesTree.Node title="Craft" key="craft" />
            </NodesTree.Node>
        </NodesTree.Node>
    </NodesTree>
);
export const withIcons = () => (
    <NodesTree defaultExpandAll showIcon>
        {/* @ts-expect-error TS(2739) FIXME: Type '{ children: Element[]; title: string; key: s... Remove this comment to see the full error message */}
        <NodesTree.Node title="Encyclopaedia" key="encyclopaedia">
            {/* @ts-expect-error TS(2739) FIXME: Type '{ title: string; key: string; }' is missing ... Remove this comment to see the full error message */}
            <NodesTree.Node title="Science" key="science" />
            {/* @ts-expect-error TS(2739) FIXME: Type '{ children: Element[]; title: string; key: s... Remove this comment to see the full error message */}
            <NodesTree.Node title="Culture" key="culture">
                {/* @ts-expect-error TS(2739) FIXME: Type '{ title: string; key: string; }' is missing ... Remove this comment to see the full error message */}
                <NodesTree.Node title="Art" key="art" />
                {/* @ts-expect-error TS(2739) FIXME: Type '{ title: string; key: string; }' is missing ... Remove this comment to see the full error message */}
                <NodesTree.Node title="Craft" key="craft" />
            </NodesTree.Node>
        </NodesTree.Node>
    </NodesTree>
);

export const withTreeData = () => (
    <NodesTree
        defaultExpandAll
        treeData={[
            {
                key: 'encyclopaedia',
                title: 'Encyclopaedia',
                children: [
                    { key: 'science', title: 'Science' },
                    {
                        key: 'culture',
                        title: 'Culture',
                        children: [
                            { key: 'art', title: 'Art' },
                            { key: 'craft', title: 'Craft' }
                        ]
                    }
                ]
            }
        ]}
    />
);
