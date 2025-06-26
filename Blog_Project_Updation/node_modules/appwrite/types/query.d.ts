declare type QueryTypesSingle = string | number | boolean;
export declare type QueryTypesList = string[] | number[] | boolean[];
export declare type QueryTypes = QueryTypesSingle | QueryTypesList;
export declare class Query {
    static equal: (attribute: string, value: QueryTypes) => string;
    static notEqual: (attribute: string, value: QueryTypes) => string;
    static lessThan: (attribute: string, value: QueryTypes) => string;
    static lessThanEqual: (attribute: string, value: QueryTypes) => string;
    static greaterThan: (attribute: string, value: QueryTypes) => string;
    static greaterThanEqual: (attribute: string, value: QueryTypes) => string;
    static isNull: (attribute: string) => string;
    static isNotNull: (attribute: string) => string;
    static between: (attribute: string, start: string | number, end: string | number) => string;
    static startsWith: (attribute: string, value: string) => string;
    static endsWith: (attribute: string, value: string) => string;
    static select: (attributes: string[]) => string;
    static search: (attribute: string, value: string) => string;
    static orderDesc: (attribute: string) => string;
    static orderAsc: (attribute: string) => string;
    static cursorAfter: (documentId: string) => string;
    static cursorBefore: (documentId: string) => string;
    static limit: (limit: number) => string;
    static offset: (offset: number) => string;
    private static addQuery;
    private static parseValues;
}
export {};
