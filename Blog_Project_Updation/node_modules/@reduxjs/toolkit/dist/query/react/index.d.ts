import { CreateApi } from '@reduxjs/toolkit/query';
import { reactHooksModule, reactHooksModuleName } from './module';
export * from '@reduxjs/toolkit/query';
export { ApiProvider } from './ApiProvider';
declare const createApi: CreateApi<typeof import("@reduxjs/toolkit/dist/query/core/module").coreModuleName | typeof reactHooksModuleName>;
export type { TypedUseQueryHookResult, TypedUseQueryStateResult, TypedUseQuerySubscriptionResult, TypedUseMutationResult, } from './buildHooks';
export { createApi, reactHooksModule };
