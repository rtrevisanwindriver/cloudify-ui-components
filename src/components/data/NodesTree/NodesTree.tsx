import React from 'react';
import { castArray, compact, isEmpty } from 'lodash';
import Tree, { TreeNode } from 'rc-tree';
import type { TreeProps } from 'rc-tree/lib/Tree';
import 'rc-tree/assets/index.css';
import { Loading } from 'components';

export interface NodesTreeProps extends Partial<TreeProps> {
    /**
     * whether can be selected
     */
    selectable?: boolean;
    /**
     * whether show icon
     */
    showIcon?: boolean;
    /**
     * whether show line
     */
    showLine?: boolean;
}

/**
 * NodesTree is a tree component, it wraps [rc-tree](https://tree-react-component.vercel.app/) component.
 *
 * All props supported by the rc-tree component are passed down to it.
 *
 * See [rc-tree](https://tree-react-component.vercel.app/) component for details about props and detailed usage information.
 */
export function NodesTree({
    children,
    treeData = [],
    selectable = false,
    showIcon = false,
    showLine = true,
    ...treeProps
}: NodesTreeProps): JSX.Element {
    if (!isEmpty(children)) {
        return (
            <Tree showIcon={showIcon} showLine={showLine} selectable={selectable} {...treeProps}>
                {compact(castArray(children))}
            </Tree>
        );
    }
    return treeData.length ? (
        <Tree showIcon={showIcon} showLine={showLine} selectable={selectable} {...treeProps} treeData={treeData} />
    ) : (
        <Loading />
    );
}

NodesTree.Node = TreeNode;

export default NodesTree;
