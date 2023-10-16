'use client';
import React, {useEffect, useState} from 'react';
import {PlusIcon} from "@/components/icons/PlusIcon";
import {TreeNode} from "@/components/tree";
import {CancelIcon} from "@/components/icons/CanceIcon";
import {SaveIcon} from "@/components/icons/SaveIcon";
import {EditIcon} from "@/components/icons/EditIcon";
import {DeleteIcon} from "@/components/icons/DeleteIcon";
import {getColorByLevel} from "@/components/utils";


const Node = ({node, root, setRoot, style, nodeLevel}: { node: TreeNode, root: TreeNode, setRoot: any, style: object, nodeLevel: number }) => {

    const [editMode, setEditMode] = useState<boolean>(false);
    const [localState, setLocalState] = useState<string | null>(node.value);

    useEffect(() => {
        if (localState === null) {
            setEditMode(true);
        }
        // else{
        //     setEditMode(false);
        //     console.log('false');
        // }
    }, []);

    function addNode() {
        if (node.children === null) {
            node.children = [];
        }
        node.children?.push(new TreeNode(null, null));
        setRoot({...root});
        // console.log(JSON.stringify(root));
    }

    function handleCancel() {
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
            return null; // This will be used by the parent to remove the node
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


    function drawLineOneChild(childrenCont: number | undefined) {
        if (childrenCont === 0 || childrenCont === undefined) {
            return null;
        }
        if (childrenCont === 1) {
            return <div className="vertical-line"></div>
        }


    }

    function drawLineChildren(childrenCont: number | undefined){
        if (childrenCont !== undefined && childrenCont > 1) {
            return (
                <div className="children-line">
                    <div className="vertical-line-children"></div>
                    <div className="horizontal-line"></div>
                </div>


            )
        }
    }

    function nodeDependsOnMode(): React.JSX.Element {
        // @ts-ignore
        if (editMode) {
            return (
                <>
                    <input value={localState} onChange={(e) => setLocalState(e.target.value)}/>
                    <button onClick={handleCancel}><CancelIcon/></button>
                    <button onClick={handleSave}><SaveIcon/></button>
                </>
            )

        } else {
            return (
                <>
                    <div className="node-container" style={style}>
                        <span className="node-label">{node.value}</span>
                        {drawLineOneChild(node.children?.length)}
                    </div>

                    <button onClick={addNode}><PlusIcon/></button>
                    <button onClick={editCategory}><EditIcon/></button>
                    <button onClick={deleteCategory}><DeleteIcon/></button>
                </>)
        }
    }


    function calculateColor() {
        // console.log("level: " +  nodeLevel);
        return getColorByLevel(nodeLevel);
    }

    const childrenStyle = {
        'background-color' : calculateColor()
    }

    return (
        <div className="node-container" draggable={node.id === root.id} >
            <div className="node">{nodeDependsOnMode()}</div>
            {drawLineChildren(node.children?.length)}
            <div className="level">
                {
                    node.children && (
                    <>
                        {
                            node.children.map((child, index) =>
                                <div key={child.id}>
                                    <Node node={child} root={root} setRoot={setRoot} style={childrenStyle} nodeLevel={nodeLevel+1}/>
                                </div>
                            )
                        }
                    </>
                )}
            </div>
        </div>

    );
}

export default Node;
