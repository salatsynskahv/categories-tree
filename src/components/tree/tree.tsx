import '../../app/tree.css';
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