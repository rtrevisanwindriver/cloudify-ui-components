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
// @ts-expect-error TS(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
export default function NodesTree(props) {
    const { children, treeData, ...treeProps } = props;
    if (!_.isEmpty(children)) {
        return <Tree {...treeProps}>{_.compact(_.castArray(children))}</Tree>;
    }
    // @ts-expect-error TS(7006) FIXME: Parameter 'data' implicitly has an 'any' type.
    const loop = data => {
        return _.compact(data).map(item => {
            // @ts-expect-error TS(2571) FIXME: Object is of type 'unknown'.
            if (item.children) {
                return (
                    // @ts-expect-error TS(2739) FIXME: Type '{ children: Element[]; key: any; title: any;... Remove this comment to see the full error message
                    <TreeNode key={item.key} title={item.title}>
                        {/* @ts-expect-error TS(2571) FIXME: Object is of type 'unknown'. */}
                        {loop(item.children)}
                    </TreeNode>
                );
            }
            // @ts-expect-error TS(2739) FIXME: Type '{ key: any; title: any; }' is missing the fo... Remove this comment to see the full error message
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
