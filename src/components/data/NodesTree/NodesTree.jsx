import React from 'react';
import _ from 'lodash';
import Tree, { TreeNode } from 'rc-tree';
import 'rc-tree/assets/index.css';

import Loading from 'components/elements/Loading';
import './NodesTree.css';

/**
 * NodesTree is a tree component, it wraps [rc-tree](http://react-component.github.io/tree/) component.
 *
 * All props supported by the rc-tree component are passed down to it.
 *
 * See [rc-tree](http://react-component.github.io/tree/) component for details about props and detailed usage information.
 */
export default function NodesTree(props) {
    const { children, treeData, ...treeProps } = props;
    if (!_.isEmpty(children)) {
        return <Tree {...treeProps}>{_.compact(_.castArray(children))}</Tree>;
    }
    const loop = data => {
        return _.compact(data).map(item => {
            if (item.children) {
                return (
                    <TreeNode key={item.key} title={item.title}>
                        {loop(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode key={item.key} title={item.title} />;
        });
    };

    return treeData.length ? <Tree {...treeProps}>{loop(treeData)}</Tree> : <Loading />;
}

NodesTree.Node = TreeNode;
NodesTree.propTypes = Tree.propTypes;

NodesTree.defaultProps = {
    className: '',
    treeData: [],
    selectable: false,
    showIcon: false,
    showLine: true
};
