export declare class Permission {
    static read: (role: string) => string;
    static write: (role: string) => string;
    static create: (role: string) => string;
    static update: (role: string) => string;
    static delete: (role: string) => string;
}
