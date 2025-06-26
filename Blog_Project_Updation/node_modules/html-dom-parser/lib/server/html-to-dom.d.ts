// TypeScript Version: 4.7

import {
  Comment,
  DomHandlerOptions,
  Element,
  ProcessingInstruction,
  Text
} from 'domhandler';

/**
 * Parses HTML string to DOM nodes in Node.js.
 *
 * This is the same method as `require('htmlparser2').parseDOM`
 * https://github.com/fb55/htmlparser2/blob/v6.0.0/src/index.ts#L29-L41
 *
 * @param html - HTML markup.
 * @param options - Parser options (https://github.com/fb55/domhandler/tree/v5.0.3#readme).
 * @returns - DOM nodes.
 */
export default function HTMLDOMParser(
  html: string,
  options?: DomHandlerOptions
): Array<Comment | Element | ProcessingInstruction | Text>;
