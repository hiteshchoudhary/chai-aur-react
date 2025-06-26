// TypeScript Version: 4.7

import { DataNode, Element } from 'domhandler';

/**
 * Parses HTML string to DOM nodes in browser.
 *
 * @param  html - HTML markup.
 * @return      - DOM elements.
 */
export default function HTMLDOMParser(html: string): Array<DataNode | Element>;
