type QueryTypesSingle = string | number | boolean;
export type QueryTypesList = string[] | number[] | boolean[];
export type QueryTypes = QueryTypesSingle | QueryTypesList;

export class Query {
  static equal = (attribute: string, value: QueryTypes): string =>
    Query.addQuery(attribute, "equal", value);

  static notEqual = (attribute: string, value: QueryTypes): string =>
    Query.addQuery(attribute, "notEqual", value);

  static lessThan = (attribute: string, value: QueryTypes): string =>
    Query.addQuery(attribute, "lessThan", value);

  static lessThanEqual = (attribute: string, value: QueryTypes): string =>
    Query.addQuery(attribute, "lessThanEqual", value);

  static greaterThan = (attribute: string, value: QueryTypes): string =>
    Query.addQuery(attribute, "greaterThan", value);

  static greaterThanEqual = (attribute: string, value: QueryTypes): string =>
    Query.addQuery(attribute, "greaterThanEqual", value);

  static isNull = (attribute: string): string =>
    `isNull("${attribute}")`;

  static isNotNull = (attribute: string): string =>
    `isNotNull("${attribute}")`;

  static between = (attribute: string, start: string|number, end: string|number): string =>
    `between("${attribute}", ${Query.parseValues(start)}, ${Query.parseValues(end)})`;

  static startsWith = (attribute: string, value: string): string =>
    Query.addQuery(attribute, "startsWith", value);

  static endsWith = (attribute: string, value: string): string =>
    Query.addQuery(attribute, "endsWith", value);

  static select = (attributes: string[]): string =>
    `select([${attributes.map((attr: string) => `"${attr}"`).join(",")}])`;

  static search = (attribute: string, value: string): string =>
    Query.addQuery(attribute, "search", value);

  static orderDesc = (attribute: string): string =>
    `orderDesc("${attribute}")`;

  static orderAsc = (attribute: string): string =>
    `orderAsc("${attribute}")`;

  static cursorAfter = (documentId: string): string =>
    `cursorAfter("${documentId}")`;

  static cursorBefore = (documentId: string): string =>
    `cursorBefore("${documentId}")`;

  static limit = (limit: number): string =>
    `limit(${limit})`;

  static offset = (offset: number): string =>
    `offset(${offset})`;

  private static addQuery = (attribute: string, method: string, value: QueryTypes): string =>
    value instanceof Array
      ? `${method}("${attribute}", [${value
          .map((v: QueryTypesSingle) => Query.parseValues(v))
          .join(",")}])`
      : `${method}("${attribute}", [${Query.parseValues(value)}])`;

  private static parseValues = (value: QueryTypes): string =>
    typeof value === "string" || value instanceof String
      ? `"${value}"`
      : `${value}`;
}