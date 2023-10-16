'use client';
import React, {useState} from 'react';
import Node from './node';
import {generateUniqueId} from "@/components/utils";


export class TreeNode {
    public id: number;
    public children: TreeNode[] | null;
    public value: string | null;

    constructor(children: TreeNode[] | null, value: string | null) {
        this.id = generateUniqueId();
        this.children = children;
        this.value = value;
    }
}

const Tree = ({treeStyle}: {treeStyle : object}) => {
    const [rootNode, setRootNode] = useState(new TreeNode(null, 'Category'));

    const rootStyle = {
        cursor: 'move',
        border: '1px dashed var(--border-color)'
    };


    return (

            <div className="tree" style={treeStyle}  >
                <Node node={rootNode} root={rootNode} setRoot={setRootNode} style={rootStyle} nodeLevel={0} />
            </div>
    )

}

export default Tree;