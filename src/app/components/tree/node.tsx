'use client';
import React, {useEffect, useRef, useState} from 'react';
import {getColorByLevel, iconSize, LevelColors} from "@/app/utils";
import {HiCheckCircle, HiPlusCircle} from "react-icons/hi";
import {HiMiniPencilSquare, HiMiniXCircle} from "react-icons/hi2";
import {TreeNode} from "@/app/components/tree/tree";


const Node = ({node, root, setRoot, nodeLevel, style}: { node: TreeNode, root: TreeNode, setRoot: any, style: object, nodeLevel: number }) => {

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

    function deleteCategory(): void {
        setRoot({...findNodeAndRemove(root, node.id)});
    }


    function nodeDependsOnMode(): React.JSX.Element {
        const hasChildren: boolean = Boolean(node.children && node.children.length > 0);
        if (editMode) {
            return (
                <>
                <div className={hasChildren ? "node-label addLine" : "node-label"} style={style}>
                    <input style={style}
                           value={localState || ''}
                           onChange={(e) => setLocalState(e.target.value)}/>
                </div>
                    <div className="node-menu" style={{display: 'inline-block'}}>
                        <button onClick={handleCancel}><HiMiniXCircle size={iconSize}/></button>
                        <button onClick={handleSave}><HiCheckCircle size={iconSize}/></button>
                    </div>
                </>

            )

        } else {
            return (
                <>
                    <div className={hasChildren ? "node-label addLine" : "node-label"}
                          style={style}>{node.value}</div>
                    <div className="node-menu" style={{display: 'inline-block'}}>

                        <button onClick={addNode}><HiPlusCircle size={iconSize}/></button>
                        {(node.id !== root.id) && <>
                            <button onClick={editCategory}><HiMiniPencilSquare size={iconSize}/></button>
                            <button onClick={deleteCategory}><HiMiniXCircle size={iconSize}/></button>
                        </>
                        }
                    </div>

                </>)
        }
    }
    function calculateColor(): LevelColors {
        return getColorByLevel(nodeLevel);
    }

    const childrenStyle = {
        backgroundColor: calculateColor().background,
        color: calculateColor().color
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
