export type TreeProps = {
    rootNodes: TreeNode[]
}

export type TreeNode = {
    key: string;
    text: string;
    object?: object;
    children?: TreeNode[];
}

export type TreeNodeProps = {
    node: TreeNode;
    level?: number;
    expanded?: boolean;
}

export type NodeRenderer = () => void;