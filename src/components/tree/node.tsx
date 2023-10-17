'use client';
import React, {useEffect, useRef, useState} from 'react';
import {getColorByLevel} from "@/components/utils";
import {HiCheckCircle, HiPlusCircle} from "react-icons/hi";
import {HiMiniPencilSquare, HiMiniXCircle} from "react-icons/hi2";
import {TreeNode} from "@/components/tree/tree";


const Node = ({node, root, setRoot, nodeLevel, style}: {node: TreeNode, root: TreeNode, setRoot: any, style: object, nodeLevel: number }) => {

    const [editMode, setEditMode] = useState<boolean>(false);
    const [localState, setLocalState] = useState<string | null>(node.value);

    useEffect(() => {
        if (localState === null) {
            setEditMode(true);
        }
    }, []);

    function addNode() {
        if (node.children === null) {
            node.children = [];
        }
        node.children?.push(new TreeNode(null, null));
        setRoot({...root});
    }

    function handleCancel() {
        setLocalState(node.value);
        setEditMode(false);
    }

    function handleSave() {
        node.value = localState;
        setRoot({...root});
        setEditMode(false);
    }

    function editCategory() {
        setEditMode(true);
    }

    function findNodeAndRemove(root: TreeNode | null, idToDelete: number): TreeNode | null {
        if (root === null) return null;

        if (root.id === idToDelete) {
            return null;
        }

        if (root.children) {
            // @ts-ignore
            root.children = root.children
                .map(child => findNodeAndRemove(child, idToDelete))
                .filter(Boolean);
        }

        return root;
    }

    function deleteCategory() {
        setRoot({...findNodeAndRemove(root, node.id)});
    }


    function nodeDependsOnMode(): React.JSX.Element {
        if (editMode) {
            return (
                <>
                <span className="node-label" style={style}>
                    <input style={style}
                           value={localState || ''}
                           onChange={(e) => setLocalState(e.target.value)}/>
                </span>
                    <div className="node-menu" style={{display: 'inline-block'}}>
                        <button onClick={handleCancel}><HiMiniXCircle size='1.3rem'/></button>
                        <button onClick={handleSave}><HiCheckCircle size='1.3rem'/></button>
                    </div>
                </>

            )

        } else {
            return (
                <>
                    <span className="node-label" style={style} >{node.value}</span>
                    <div className="node-menu" style={{display: 'inline-block'}}>

                        <button onClick={addNode}><HiPlusCircle size='1.3rem'/></button>
                        {(node.id !== root.id) && <>
                            <button onClick={editCategory}><HiMiniPencilSquare size='1.3rem'/></button>
                            <button onClick={deleteCategory}><HiMiniXCircle size='1.3rem'/></button>
                        </>
                        }
                    </div>

                </>)
        }
    }


    function calculateColor() {
        // console.log("level: " +  nodeLevel);
        return getColorByLevel(nodeLevel);
    }

    const childrenStyle = {
        backgroundColor: calculateColor()
    }


    return (
        <li draggable={node.id === root.id}>
            {nodeDependsOnMode()}
            <ul>
                {
                    node.children && (
                        <>
                            {
                                node.children.map((child, index) =>
                                    <Node key={child.id}
                                          node={child}
                                          root={root}
                                          setRoot={setRoot}
                                          style={childrenStyle}
                                          nodeLevel={nodeLevel + 1}/>
                                )
                            }
                        </>
                    )}
            </ul>
        </li>

    );
}

export default Node;
