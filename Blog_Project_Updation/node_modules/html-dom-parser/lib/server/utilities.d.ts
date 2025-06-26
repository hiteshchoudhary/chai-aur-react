// TypeScript Version: 4.7

type Nodes = Array<Comment | Element | ProcessingInstruction | Text>;

/**
 * Sets root parent to null.
 *
 * @param nodes
 * @return
 */
export function unsetRootParent(nodes: Nodes): Nodes;
