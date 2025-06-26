import type { SerializeQueryArgs } from '@reduxjs/toolkit/dist/query/defaultSerializeQueryArgs';
import type { EndpointDefinition } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
export declare function useStableQueryArgs<T>(queryArgs: T, serialize: SerializeQueryArgs<any>, endpointDefinition: EndpointDefinition<any, any, any, any>, endpointName: string): T;
