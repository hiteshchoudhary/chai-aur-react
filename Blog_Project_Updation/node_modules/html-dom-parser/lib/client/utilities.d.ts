// TypeScript Version: 4.7

import { Comment, Element, ProcessingInstruction, Text } from 'domhandler';

/**
 * Formats DOM attributes to a hash map.
 *
 * @param  attributes - List of attributes.
 * @return            - Map of attribute name to value.
 */
export function formatAttributes(
  attributes: NamedNodeMap
): Record<string, string>;

/**
 * Transforms DOM nodes to `domhandler` nodes.
 *
 * @param  nodes     - DOM nodes.
 * @param  parent    - Parent node.
 * @param  directive - Directive.
 * @return           - Nodes.
 */
export function formatDOM(
  nodes: NodeList,
  parent?: Element | null,
  directive?: string
): Array<Comment | Element | ProcessingInstruction | Text>;
