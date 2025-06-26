// TypeScript Version: 5.0
/* eslint-disable no-unused-vars */

export type Attributes = Record<string, string>;

export type Props = Record<string, string> & {
  style: Record<string, string>;
};

/**
 * Converts HTML/SVG DOM attributes to React props.
 *
 * @param attributes - HTML/SVG DOM attributes.
 * @param nodeName - DOM node name.
 * @returns - React props.
 */
export default function attributesToProps(
  attributes: Attributes,
  nodeName?: string
): Props;
