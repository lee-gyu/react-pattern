import React from "react";
import type { NodeRenderer } from "./types";

export type TreeContextType = {
    isExpanded: (key: string) => boolean;
    expand(key: string): void;
    collapse(key: string): void;
    addNodeRenderer(key: string, renderer: NodeRenderer): void;
    removeNodeRenderer(key: string): void;
    toggleExpand(key: string): void;
}

export const TreeContext = React.createContext<TreeContextType>({} as TreeContextType);