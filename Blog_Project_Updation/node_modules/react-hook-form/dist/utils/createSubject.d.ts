import { Noop } from '../types';
export type Observer<T> = {
    next: (value: T) => void;
};
export type Subscription = {
    unsubscribe: Noop;
};
export type Subject<T> = {
    readonly observers: Observer<T>[];
    subscribe: (value: Observer<T>) => Subscription;
    unsubscribe: Noop;
} & Observer<T>;
export default function createSubject<T>(): Subject<T>;
//# sourceMappingURL=createSubject.d.ts.map