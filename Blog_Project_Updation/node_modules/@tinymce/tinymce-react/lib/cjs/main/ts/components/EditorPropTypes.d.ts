import * as PropTypes from 'prop-types';
import { IEvents } from '../Events';
import { IProps } from './Editor';
export type CopyProps<T> = {
    [P in keyof T]: PropTypes.Requireable<unknown>;
};
export type IEventPropTypes = CopyProps<IEvents>;
export interface IEditorPropTypes extends IEventPropTypes, CopyProps<IProps> {
}
export declare const eventPropTypes: IEventPropTypes;
export declare const EditorPropTypes: IEditorPropTypes;
