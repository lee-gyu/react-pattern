import Tree from "./_components/Tree";
import type { TreeProps } from "./_components/Tree/types";

const treeProps: TreeProps = {
    rootNodes: [
        {
            key: "A",
            text: "A",
            children: [
                {
                    key: "A-1",
                    text: "A-1",
                },
                {
                    key: "A-2",
                    text: "A-2",
                    children: [
                        {
                            key: "A-2-1",
                            text: "A-2-1",
                        }
                    ]
                },
                {
                    key: "A-3",
                    text: "A-3",
                },
                {
                    key: "A-4",
                    text: "A-4",
                }
            ]
        }
    ]
}

export default function Recursive() {
    return (
        <div>
            <Tree {...treeProps} />
        </div>
    );
}