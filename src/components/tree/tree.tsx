import '../../app/tree.css';
import {useState} from "react";
import Node from "@/components/tree/node";
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

export const Tree = () => {
    const [rootNode, setRootNode] = useState(new TreeNode(null, 'Category'));

    const rootStyle = {
        border: '1px dashed var(--border-color)'
    };

    return (
        <ul className="tree">
            <Node node={rootNode} root={rootNode} setRoot={setRootNode} style={rootStyle} nodeLevel={0}/>
        </ul>
    )
}