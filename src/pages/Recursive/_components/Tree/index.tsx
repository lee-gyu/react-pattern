import { useCallback, useContext, useLayoutEffect, useReducer, useRef } from "react";
import { TreeContext } from "./context"
import type { NodeRenderer, TreeNodeProps, TreeProps } from "./types"
import { clsx } from "clsx";

function nodeReducer(state: object) {
    return {};
}

function Node(props: TreeNodeProps) {
    const { 
        isExpanded,
        addNodeRenderer,
        removeNodeRenderer,
        toggleExpand
    } = useContext(TreeContext);
    const { 
        node,
        expanded = isExpanded(node.key),
        level = 0
    } = props;
    const [_, reducer] = useReducer(nodeReducer, {});
    const hasChildren = node.children?.length > 0;

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useLayoutEffect(() => {
        addNodeRenderer(node.key, reducer);

        return () => removeNodeRenderer(node.key);
    }, [node.key])

    return (
        <li style={{
            marginLeft: level * 20
        }}>
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
            <span className={clsx( "mr-2", !hasChildren && "opacity-0" )}
                onClick={() => hasChildren && toggleExpand(node.key)}>{expanded ? "^" : ">"}</span>
            {node.text}
            {node.children && expanded && <ul>
                {node.children.map(child => <Node key={child.key} node={child} level={level + 1} />)}
            </ul>}
        </li>
    )
}

export default function Tree( props: TreeProps ) {
    const { rootNodes } = props;
    const expandSetRef = useRef(new Set<string>());
    const rendererMapRef = useRef(new Map<string, NodeRenderer>());
    const renderNode = useCallback((key: string) => { 
        rendererMapRef.current.get(key)?.();
    }, []);

    return (
        <TreeContext value={{
            isExpanded(key) {
                return expandSetRef.current.has(key);
            },
            expand(key) {
                expandSetRef.current.add(key);
                renderNode(key);
            },
            collapse(key) {
                expandSetRef.current.delete(key);
                renderNode(key);
            },
            addNodeRenderer(key, renderer) {
                rendererMapRef.current.set(key, renderer);
            },
            removeNodeRenderer(key) {
                rendererMapRef.current.delete(key);
            },
            toggleExpand(key) {
                if (expandSetRef.current.has(key)) {
                    expandSetRef.current.delete(key);
                } else {
                    expandSetRef.current.add(key);
                }
                renderNode(key);
            },
        }}>
            <ul>
                {rootNodes.map(node => <Node key={node.key} node={node} />)}
            </ul>
        </TreeContext>
    )
}

Tree.Node = Node;