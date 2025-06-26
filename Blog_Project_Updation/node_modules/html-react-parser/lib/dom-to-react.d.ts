// TypeScript Version: 5.0
/* eslint-disable no-undef, no-unused-vars */

import { DOMNode, HTMLReactParserOptions } from '..';

export { DOMNode, HTMLReactParserOptions };

/**
 * Converts DOM nodes to JSX element(s).
 *
 * @param nodes - DOM nodes.
 * @param options - Parser options.
 * @returns - JSX element(s).
 */
export default function domToReact(
  nodes: DOMNode[],
  options?: HTMLReactParserOptions
): string | JSX.Element | JSX.Element[];
