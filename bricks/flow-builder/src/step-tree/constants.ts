import { createContext } from "react";
import { ContextOfWorkbenchTree, ContextOfTreeList } from "./interfaces";

export const WorkbenchTreeContext = createContext<ContextOfWorkbenchTree>({});

export const TreeListContext = createContext<ContextOfTreeList>({});
