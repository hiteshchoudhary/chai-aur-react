import HTMLReactParser from './index.js';

export var domToReact = HTMLReactParser.domToReact;
export var htmlToDOM = HTMLReactParser.htmlToDOM;
export var attributesToProps = HTMLReactParser.attributesToProps;

// domhandler
export var Comment = HTMLReactParser.Comment;
export var Element = HTMLReactParser.Element;
export var ProcessingInstruction = HTMLReactParser.ProcessingInstruction;
export var Text = HTMLReactParser.Text;

export default HTMLReactParser;
