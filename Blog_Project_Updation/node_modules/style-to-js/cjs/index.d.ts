import { CamelCaseOptions } from './utilities';
type StyleObject = Record<string, string>;
interface StyleToJSOptions extends CamelCaseOptions {
}
export default function StyleToJS(style: string, options?: StyleToJSOptions): StyleObject;
export {};
