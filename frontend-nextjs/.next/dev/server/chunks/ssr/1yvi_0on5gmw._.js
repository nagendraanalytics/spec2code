module.exports = [
"[project]/frontend-nextjs/node_modules/@babel/runtime/helpers/arrayLikeToArray.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for(var e = 0, n = Array(a); e < a; e++)n[e] = r[e];
    return n;
}
module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/frontend-nextjs/node_modules/@babel/runtime/helpers/arrayWithoutHoles.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

var arrayLikeToArray = __turbopack_context__.r("[project]/frontend-nextjs/node_modules/@babel/runtime/helpers/arrayLikeToArray.js [app-ssr] (ecmascript)");
function _arrayWithoutHoles(r) {
    if (Array.isArray(r)) return arrayLikeToArray(r);
}
module.exports = _arrayWithoutHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/frontend-nextjs/node_modules/@babel/runtime/helpers/defineProperty.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

var toPropertyKey = __turbopack_context__.r("[project]/frontend-nextjs/node_modules/@babel/runtime/helpers/toPropertyKey.js [app-ssr] (ecmascript)");
function _defineProperty(e, r, t) {
    return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[r] = t, e;
}
module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/frontend-nextjs/node_modules/@babel/runtime/helpers/extends.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

function _extends() {
    return module.exports = _extends = ("TURBOPACK compile-time truthy", 1) ? Object.assign.bind() : "TURBOPACK unreachable", module.exports.__esModule = true, module.exports["default"] = module.exports, _extends.apply(null, arguments);
}
module.exports = _extends, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/frontend-nextjs/node_modules/@babel/runtime/helpers/iterableToArray.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

function _iterableToArray(r) {
    if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
module.exports = _iterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/frontend-nextjs/node_modules/@babel/runtime/helpers/nonIterableSpread.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableSpread, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/frontend-nextjs/node_modules/@babel/runtime/helpers/objectWithoutProperties.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

var objectWithoutPropertiesLoose = __turbopack_context__.r("[project]/frontend-nextjs/node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js [app-ssr] (ecmascript)");
function _objectWithoutProperties(e, t) {
    if (null == e) return {};
    var o, r, i = objectWithoutPropertiesLoose(e, t);
    if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(e);
        for(r = 0; r < n.length; r++)o = n[r], -1 === t.indexOf(o) && ({}).propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
    }
    return i;
}
module.exports = _objectWithoutProperties, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/frontend-nextjs/node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

function _objectWithoutPropertiesLoose(r, e) {
    if (null == r) return {};
    var t = {};
    for(var n in r)if (({}).hasOwnProperty.call(r, n)) {
        if (-1 !== e.indexOf(n)) continue;
        t[n] = r[n];
    }
    return t;
}
module.exports = _objectWithoutPropertiesLoose, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/frontend-nextjs/node_modules/@babel/runtime/helpers/toConsumableArray.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

var arrayWithoutHoles = __turbopack_context__.r("[project]/frontend-nextjs/node_modules/@babel/runtime/helpers/arrayWithoutHoles.js [app-ssr] (ecmascript)");
var iterableToArray = __turbopack_context__.r("[project]/frontend-nextjs/node_modules/@babel/runtime/helpers/iterableToArray.js [app-ssr] (ecmascript)");
var unsupportedIterableToArray = __turbopack_context__.r("[project]/frontend-nextjs/node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js [app-ssr] (ecmascript)");
var nonIterableSpread = __turbopack_context__.r("[project]/frontend-nextjs/node_modules/@babel/runtime/helpers/nonIterableSpread.js [app-ssr] (ecmascript)");
function _toConsumableArray(r) {
    return arrayWithoutHoles(r) || iterableToArray(r) || unsupportedIterableToArray(r) || nonIterableSpread();
}
module.exports = _toConsumableArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/frontend-nextjs/node_modules/@babel/runtime/helpers/toPrimitive.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

var _typeof = __turbopack_context__.r("[project]/frontend-nextjs/node_modules/@babel/runtime/helpers/typeof.js [app-ssr] (ecmascript)")["default"];
function toPrimitive(t, e) {
    if ("object" != _typeof(t) || !t) return t;
    var r;
    if ("undefined" != typeof Symbol && void 0 !== (r = t[Symbol.toPrimitive])) {
        var i = r.call(t, e || "default");
        if ("object" != _typeof(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === e ? String : Number)(t);
}
module.exports = toPrimitive, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/frontend-nextjs/node_modules/@babel/runtime/helpers/toPropertyKey.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

var _typeof = __turbopack_context__.r("[project]/frontend-nextjs/node_modules/@babel/runtime/helpers/typeof.js [app-ssr] (ecmascript)")["default"];
var toPrimitive = __turbopack_context__.r("[project]/frontend-nextjs/node_modules/@babel/runtime/helpers/toPrimitive.js [app-ssr] (ecmascript)");
function toPropertyKey(t) {
    var i = toPrimitive(t, "string");
    return "symbol" == _typeof(i) ? i : i + "";
}
module.exports = toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/frontend-nextjs/node_modules/@babel/runtime/helpers/typeof.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

function _typeof(o) {
    "@babel/helpers - typeof";
    return module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
        return typeof o;
    } : function(o) {
        return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, module.exports.__esModule = true, module.exports["default"] = module.exports, _typeof(o);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/frontend-nextjs/node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

var arrayLikeToArray = __turbopack_context__.r("[project]/frontend-nextjs/node_modules/@babel/runtime/helpers/arrayLikeToArray.js [app-ssr] (ecmascript)");
function _unsupportedIterableToArray(r, a) {
    if (r) {
        if ("string" == typeof r) return arrayLikeToArray(r, a);
        var t = ({}).toString.call(r).slice(8, -1);
        return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? arrayLikeToArray(r, a) : void 0;
    }
}
module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/frontend-nextjs/node_modules/fault/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var formatter = __turbopack_context__.r("[project]/frontend-nextjs/node_modules/format/format.js [app-ssr] (ecmascript)");
var fault = create(Error);
module.exports = fault;
fault.eval = create(EvalError);
fault.range = create(RangeError);
fault.reference = create(ReferenceError);
fault.syntax = create(SyntaxError);
fault.type = create(TypeError);
fault.uri = create(URIError);
fault.create = create;
// Create a new `EConstructor`, with the formatted `format` as a first argument.
function create(EConstructor) {
    FormattedError.displayName = EConstructor.displayName || EConstructor.name;
    return FormattedError;
    //TURBOPACK unreachable
    ;
    function FormattedError(format) {
        if (format) {
            format = formatter.apply(null, arguments);
        }
        return new EConstructor(format);
    }
}
}),
"[project]/frontend-nextjs/node_modules/format/format.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

//
// format - printf-like string formatting for JavaScript
// github.com/samsonjs/format
// @_sjs
//
// Copyright 2010 - 2013 Sami Samhuri <sami@samhuri.net>
//
// MIT License
// http://sjs.mit-license.org
//
;
(function() {
    //// Export the API
    var namespace;
    // CommonJS / Node module
    if ("TURBOPACK compile-time truthy", 1) {
        namespace = module.exports = format;
    } else //TURBOPACK unreachable
    ;
    namespace.format = format;
    namespace.vsprintf = vsprintf;
    if (typeof console !== 'undefined' && typeof console.log === 'function') {
        namespace.printf = printf;
    }
    function printf() {
        console.log(format.apply(null, arguments));
    }
    function vsprintf(fmt, replacements) {
        return format.apply(null, [
            fmt
        ].concat(replacements));
    }
    function format(fmt) {
        var argIndex = 1 // skip initial format argument
        , args = [].slice.call(arguments), i = 0, n = fmt.length, result = '', c, escaped = false, arg, tmp, leadingZero = false, precision, nextArg = function() {
            return args[argIndex++];
        }, slurpNumber = function() {
            var digits = '';
            while(/\d/.test(fmt[i])){
                digits += fmt[i++];
                c = fmt[i];
            }
            return digits.length > 0 ? parseInt(digits) : null;
        };
        for(; i < n; ++i){
            c = fmt[i];
            if (escaped) {
                escaped = false;
                if (c == '.') {
                    leadingZero = false;
                    c = fmt[++i];
                } else if (c == '0' && fmt[i + 1] == '.') {
                    leadingZero = true;
                    i += 2;
                    c = fmt[i];
                } else {
                    leadingZero = true;
                }
                precision = slurpNumber();
                switch(c){
                    case 'b':
                        result += parseInt(nextArg(), 10).toString(2);
                        break;
                    case 'c':
                        arg = nextArg();
                        if (typeof arg === 'string' || arg instanceof String) result += arg;
                        else result += String.fromCharCode(parseInt(arg, 10));
                        break;
                    case 'd':
                        result += parseInt(nextArg(), 10);
                        break;
                    case 'f':
                        tmp = String(parseFloat(nextArg()).toFixed(precision || 6));
                        result += leadingZero ? tmp : tmp.replace(/^0/, '');
                        break;
                    case 'j':
                        result += JSON.stringify(nextArg());
                        break;
                    case 'o':
                        result += '0' + parseInt(nextArg(), 10).toString(8);
                        break;
                    case 's':
                        result += nextArg();
                        break;
                    case 'x':
                        result += '0x' + parseInt(nextArg(), 10).toString(16);
                        break;
                    case 'X':
                        result += '0x' + parseInt(nextArg(), 10).toString(16).toUpperCase();
                        break;
                    default:
                        result += c;
                        break;
                }
            } else if (c === '%') {
                escaped = true;
            } else {
                result += c;
            }
        }
        return result;
    }
})();
}),
"[project]/frontend-nextjs/node_modules/highlight.js/lib/core.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

function deepFreeze(obj) {
    if (obj instanceof Map) {
        obj.clear = obj.delete = obj.set = function() {
            throw new Error('map is read-only');
        };
    } else if (obj instanceof Set) {
        obj.add = obj.clear = obj.delete = function() {
            throw new Error('set is read-only');
        };
    }
    // Freeze self
    Object.freeze(obj);
    Object.getOwnPropertyNames(obj).forEach(function(name) {
        var prop = obj[name];
        // Freeze prop if it is an object
        if (typeof prop == 'object' && !Object.isFrozen(prop)) {
            deepFreeze(prop);
        }
    });
    return obj;
}
var deepFreezeEs6 = deepFreeze;
var _default = deepFreeze;
deepFreezeEs6.default = _default;
/** @implements CallbackResponse */ class Response {
    /**
   * @param {CompiledMode} mode
   */ constructor(mode){
        // eslint-disable-next-line no-undefined
        if (mode.data === undefined) mode.data = {};
        this.data = mode.data;
        this.isMatchIgnored = false;
    }
    ignoreMatch() {
        this.isMatchIgnored = true;
    }
}
/**
 * @param {string} value
 * @returns {string}
 */ function escapeHTML(value) {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;');
}
/**
 * performs a shallow merge of multiple objects into one
 *
 * @template T
 * @param {T} original
 * @param {Record<string,any>[]} objects
 * @returns {T} a single new object
 */ function inherit(original, ...objects) {
    /** @type Record<string,any> */ const result = Object.create(null);
    for(const key in original){
        result[key] = original[key];
    }
    objects.forEach(function(obj) {
        for(const key in obj){
            result[key] = obj[key];
        }
    });
    return result;
}
/**
 * @typedef {object} Renderer
 * @property {(text: string) => void} addText
 * @property {(node: Node) => void} openNode
 * @property {(node: Node) => void} closeNode
 * @property {() => string} value
 */ /** @typedef {{kind?: string, sublanguage?: boolean}} Node */ /** @typedef {{walk: (r: Renderer) => void}} Tree */ /** */ const SPAN_CLOSE = '</span>';
/**
 * Determines if a node needs to be wrapped in <span>
 *
 * @param {Node} node */ const emitsWrappingTags = (node)=>{
    return !!node.kind;
};
/** @type {Renderer} */ class HTMLRenderer {
    /**
   * Creates a new HTMLRenderer
   *
   * @param {Tree} parseTree - the parse tree (must support `walk` API)
   * @param {{classPrefix: string}} options
   */ constructor(parseTree, options){
        this.buffer = "";
        this.classPrefix = options.classPrefix;
        parseTree.walk(this);
    }
    /**
   * Adds texts to the output stream
   *
   * @param {string} text */ addText(text) {
        this.buffer += escapeHTML(text);
    }
    /**
   * Adds a node open to the output stream (if needed)
   *
   * @param {Node} node */ openNode(node) {
        if (!emitsWrappingTags(node)) return;
        let className = node.kind;
        if (!node.sublanguage) {
            className = `${this.classPrefix}${className}`;
        }
        this.span(className);
    }
    /**
   * Adds a node close to the output stream (if needed)
   *
   * @param {Node} node */ closeNode(node) {
        if (!emitsWrappingTags(node)) return;
        this.buffer += SPAN_CLOSE;
    }
    /**
   * returns the accumulated buffer
  */ value() {
        return this.buffer;
    }
    // helpers
    /**
   * Builds a span element
   *
   * @param {string} className */ span(className) {
        this.buffer += `<span class="${className}">`;
    }
}
/** @typedef {{kind?: string, sublanguage?: boolean, children: Node[]} | string} Node */ /** @typedef {{kind?: string, sublanguage?: boolean, children: Node[]} } DataNode */ /**  */ class TokenTree {
    constructor(){
        /** @type DataNode */ this.rootNode = {
            children: []
        };
        this.stack = [
            this.rootNode
        ];
    }
    get top() {
        return this.stack[this.stack.length - 1];
    }
    get root() {
        return this.rootNode;
    }
    /** @param {Node} node */ add(node) {
        this.top.children.push(node);
    }
    /** @param {string} kind */ openNode(kind) {
        /** @type Node */ const node = {
            kind,
            children: []
        };
        this.add(node);
        this.stack.push(node);
    }
    closeNode() {
        if (this.stack.length > 1) {
            return this.stack.pop();
        }
        // eslint-disable-next-line no-undefined
        return undefined;
    }
    closeAllNodes() {
        while(this.closeNode());
    }
    toJSON() {
        return JSON.stringify(this.rootNode, null, 4);
    }
    /**
   * @typedef { import("./html_renderer").Renderer } Renderer
   * @param {Renderer} builder
   */ walk(builder) {
        // this does not
        return this.constructor._walk(builder, this.rootNode);
    // this works
    // return TokenTree._walk(builder, this.rootNode);
    }
    /**
   * @param {Renderer} builder
   * @param {Node} node
   */ static _walk(builder, node) {
        if (typeof node === "string") {
            builder.addText(node);
        } else if (node.children) {
            builder.openNode(node);
            node.children.forEach((child)=>this._walk(builder, child));
            builder.closeNode(node);
        }
        return builder;
    }
    /**
   * @param {Node} node
   */ static _collapse(node) {
        if (typeof node === "string") return;
        if (!node.children) return;
        if (node.children.every((el)=>typeof el === "string")) {
            // node.text = node.children.join("");
            // delete node.children;
            node.children = [
                node.children.join("")
            ];
        } else {
            node.children.forEach((child)=>{
                TokenTree._collapse(child);
            });
        }
    }
}
/**
  Currently this is all private API, but this is the minimal API necessary
  that an Emitter must implement to fully support the parser.

  Minimal interface:

  - addKeyword(text, kind)
  - addText(text)
  - addSublanguage(emitter, subLanguageName)
  - finalize()
  - openNode(kind)
  - closeNode()
  - closeAllNodes()
  - toHTML()

*/ /**
 * @implements {Emitter}
 */ class TokenTreeEmitter extends TokenTree {
    /**
   * @param {*} options
   */ constructor(options){
        super();
        this.options = options;
    }
    /**
   * @param {string} text
   * @param {string} kind
   */ addKeyword(text, kind) {
        if (text === "") {
            return;
        }
        this.openNode(kind);
        this.addText(text);
        this.closeNode();
    }
    /**
   * @param {string} text
   */ addText(text) {
        if (text === "") {
            return;
        }
        this.add(text);
    }
    /**
   * @param {Emitter & {root: DataNode}} emitter
   * @param {string} name
   */ addSublanguage(emitter, name) {
        /** @type DataNode */ const node = emitter.root;
        node.kind = name;
        node.sublanguage = true;
        this.add(node);
    }
    toHTML() {
        const renderer = new HTMLRenderer(this, this.options);
        return renderer.value();
    }
    finalize() {
        return true;
    }
}
/**
 * @param {string} value
 * @returns {RegExp}
 * */ function escape(value) {
    return new RegExp(value.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'), 'm');
}
/**
 * @param {RegExp | string } re
 * @returns {string}
 */ function source(re) {
    if (!re) return null;
    if (typeof re === "string") return re;
    return re.source;
}
/**
 * @param {...(RegExp | string) } args
 * @returns {string}
 */ function concat(...args) {
    const joined = args.map((x)=>source(x)).join("");
    return joined;
}
/**
 * Any of the passed expresssions may match
 *
 * Creates a huge this | this | that | that match
 * @param {(RegExp | string)[] } args
 * @returns {string}
 */ function either(...args) {
    const joined = '(' + args.map((x)=>source(x)).join("|") + ")";
    return joined;
}
/**
 * @param {RegExp} re
 * @returns {number}
 */ function countMatchGroups(re) {
    return new RegExp(re.toString() + '|').exec('').length - 1;
}
/**
 * Does lexeme start with a regular expression match at the beginning
 * @param {RegExp} re
 * @param {string} lexeme
 */ function startsWith(re, lexeme) {
    const match = re && re.exec(lexeme);
    return match && match.index === 0;
}
// BACKREF_RE matches an open parenthesis or backreference. To avoid
// an incorrect parse, it additionally matches the following:
// - [...] elements, where the meaning of parentheses and escapes change
// - other escape sequences, so we do not misparse escape sequences as
//   interesting elements
// - non-matching or lookahead parentheses, which do not capture. These
//   follow the '(' with a '?'.
const BACKREF_RE = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;
// join logically computes regexps.join(separator), but fixes the
// backreferences so they continue to match.
// it also places each individual regular expression into it's own
// match group, keeping track of the sequencing of those match groups
// is currently an exercise for the caller. :-)
/**
 * @param {(string | RegExp)[]} regexps
 * @param {string} separator
 * @returns {string}
 */ function join(regexps, separator = "|") {
    let numCaptures = 0;
    return regexps.map((regex)=>{
        numCaptures += 1;
        const offset = numCaptures;
        let re = source(regex);
        let out = '';
        while(re.length > 0){
            const match = BACKREF_RE.exec(re);
            if (!match) {
                out += re;
                break;
            }
            out += re.substring(0, match.index);
            re = re.substring(match.index + match[0].length);
            if (match[0][0] === '\\' && match[1]) {
                // Adjust the backreference.
                out += '\\' + String(Number(match[1]) + offset);
            } else {
                out += match[0];
                if (match[0] === '(') {
                    numCaptures++;
                }
            }
        }
        return out;
    }).map((re)=>`(${re})`).join(separator);
}
// Common regexps
const MATCH_NOTHING_RE = /\b\B/;
const IDENT_RE = '[a-zA-Z]\\w*';
const UNDERSCORE_IDENT_RE = '[a-zA-Z_]\\w*';
const NUMBER_RE = '\\b\\d+(\\.\\d+)?';
const C_NUMBER_RE = '(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)'; // 0x..., 0..., decimal, float
const BINARY_NUMBER_RE = '\\b(0b[01]+)'; // 0b...
const RE_STARTERS_RE = '!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~';
/**
* @param { Partial<Mode> & {binary?: string | RegExp} } opts
*/ const SHEBANG = (opts = {})=>{
    const beginShebang = /^#![ ]*\//;
    if (opts.binary) {
        opts.begin = concat(beginShebang, /.*\b/, opts.binary, /\b.*/);
    }
    return inherit({
        className: 'meta',
        begin: beginShebang,
        end: /$/,
        relevance: 0,
        /** @type {ModeCallback} */ "on:begin": (m, resp)=>{
            if (m.index !== 0) resp.ignoreMatch();
        }
    }, opts);
};
// Common modes
const BACKSLASH_ESCAPE = {
    begin: '\\\\[\\s\\S]',
    relevance: 0
};
const APOS_STRING_MODE = {
    className: 'string',
    begin: '\'',
    end: '\'',
    illegal: '\\n',
    contains: [
        BACKSLASH_ESCAPE
    ]
};
const QUOTE_STRING_MODE = {
    className: 'string',
    begin: '"',
    end: '"',
    illegal: '\\n',
    contains: [
        BACKSLASH_ESCAPE
    ]
};
const PHRASAL_WORDS_MODE = {
    begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
};
/**
 * Creates a comment mode
 *
 * @param {string | RegExp} begin
 * @param {string | RegExp} end
 * @param {Mode | {}} [modeOptions]
 * @returns {Partial<Mode>}
 */ const COMMENT = function(begin, end, modeOptions = {}) {
    const mode = inherit({
        className: 'comment',
        begin,
        end,
        contains: []
    }, modeOptions);
    mode.contains.push(PHRASAL_WORDS_MODE);
    mode.contains.push({
        className: 'doctag',
        begin: '(?:TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):',
        relevance: 0
    });
    return mode;
};
const C_LINE_COMMENT_MODE = COMMENT('//', '$');
const C_BLOCK_COMMENT_MODE = COMMENT('/\\*', '\\*/');
const HASH_COMMENT_MODE = COMMENT('#', '$');
const NUMBER_MODE = {
    className: 'number',
    begin: NUMBER_RE,
    relevance: 0
};
const C_NUMBER_MODE = {
    className: 'number',
    begin: C_NUMBER_RE,
    relevance: 0
};
const BINARY_NUMBER_MODE = {
    className: 'number',
    begin: BINARY_NUMBER_RE,
    relevance: 0
};
const CSS_NUMBER_MODE = {
    className: 'number',
    begin: NUMBER_RE + '(' + '%|em|ex|ch|rem' + '|vw|vh|vmin|vmax' + '|cm|mm|in|pt|pc|px' + '|deg|grad|rad|turn' + '|s|ms' + '|Hz|kHz' + '|dpi|dpcm|dppx' + ')?',
    relevance: 0
};
const REGEXP_MODE = {
    // this outer rule makes sure we actually have a WHOLE regex and not simply
    // an expression such as:
    //
    //     3 / something
    //
    // (which will then blow up when regex's `illegal` sees the newline)
    begin: /(?=\/[^/\n]*\/)/,
    contains: [
        {
            className: 'regexp',
            begin: /\//,
            end: /\/[gimuy]*/,
            illegal: /\n/,
            contains: [
                BACKSLASH_ESCAPE,
                {
                    begin: /\[/,
                    end: /\]/,
                    relevance: 0,
                    contains: [
                        BACKSLASH_ESCAPE
                    ]
                }
            ]
        }
    ]
};
const TITLE_MODE = {
    className: 'title',
    begin: IDENT_RE,
    relevance: 0
};
const UNDERSCORE_TITLE_MODE = {
    className: 'title',
    begin: UNDERSCORE_IDENT_RE,
    relevance: 0
};
const METHOD_GUARD = {
    // excludes method names from keyword processing
    begin: '\\.\\s*' + UNDERSCORE_IDENT_RE,
    relevance: 0
};
/**
 * Adds end same as begin mechanics to a mode
 *
 * Your mode must include at least a single () match group as that first match
 * group is what is used for comparison
 * @param {Partial<Mode>} mode
 */ const END_SAME_AS_BEGIN = function(mode) {
    return Object.assign(mode, {
        /** @type {ModeCallback} */ 'on:begin': (m, resp)=>{
            resp.data._beginMatch = m[1];
        },
        /** @type {ModeCallback} */ 'on:end': (m, resp)=>{
            if (resp.data._beginMatch !== m[1]) resp.ignoreMatch();
        }
    });
};
var MODES = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    MATCH_NOTHING_RE: MATCH_NOTHING_RE,
    IDENT_RE: IDENT_RE,
    UNDERSCORE_IDENT_RE: UNDERSCORE_IDENT_RE,
    NUMBER_RE: NUMBER_RE,
    C_NUMBER_RE: C_NUMBER_RE,
    BINARY_NUMBER_RE: BINARY_NUMBER_RE,
    RE_STARTERS_RE: RE_STARTERS_RE,
    SHEBANG: SHEBANG,
    BACKSLASH_ESCAPE: BACKSLASH_ESCAPE,
    APOS_STRING_MODE: APOS_STRING_MODE,
    QUOTE_STRING_MODE: QUOTE_STRING_MODE,
    PHRASAL_WORDS_MODE: PHRASAL_WORDS_MODE,
    COMMENT: COMMENT,
    C_LINE_COMMENT_MODE: C_LINE_COMMENT_MODE,
    C_BLOCK_COMMENT_MODE: C_BLOCK_COMMENT_MODE,
    HASH_COMMENT_MODE: HASH_COMMENT_MODE,
    NUMBER_MODE: NUMBER_MODE,
    C_NUMBER_MODE: C_NUMBER_MODE,
    BINARY_NUMBER_MODE: BINARY_NUMBER_MODE,
    CSS_NUMBER_MODE: CSS_NUMBER_MODE,
    REGEXP_MODE: REGEXP_MODE,
    TITLE_MODE: TITLE_MODE,
    UNDERSCORE_TITLE_MODE: UNDERSCORE_TITLE_MODE,
    METHOD_GUARD: METHOD_GUARD,
    END_SAME_AS_BEGIN: END_SAME_AS_BEGIN
});
// Grammar extensions / plugins
// See: https://github.com/highlightjs/highlight.js/issues/2833
// Grammar extensions allow "syntactic sugar" to be added to the grammar modes
// without requiring any underlying changes to the compiler internals.
// `compileMatch` being the perfect small example of now allowing a grammar
// author to write `match` when they desire to match a single expression rather
// than being forced to use `begin`.  The extension then just moves `match` into
// `begin` when it runs.  Ie, no features have been added, but we've just made
// the experience of writing (and reading grammars) a little bit nicer.
// ------
// TODO: We need negative look-behind support to do this properly
/**
 * Skip a match if it has a preceding dot
 *
 * This is used for `beginKeywords` to prevent matching expressions such as
 * `bob.keyword.do()`. The mode compiler automatically wires this up as a
 * special _internal_ 'on:begin' callback for modes with `beginKeywords`
 * @param {RegExpMatchArray} match
 * @param {CallbackResponse} response
 */ function skipIfhasPrecedingDot(match, response) {
    const before = match.input[match.index - 1];
    if (before === ".") {
        response.ignoreMatch();
    }
}
/**
 * `beginKeywords` syntactic sugar
 * @type {CompilerExt}
 */ function beginKeywords(mode, parent) {
    if (!parent) return;
    if (!mode.beginKeywords) return;
    // for languages with keywords that include non-word characters checking for
    // a word boundary is not sufficient, so instead we check for a word boundary
    // or whitespace - this does no harm in any case since our keyword engine
    // doesn't allow spaces in keywords anyways and we still check for the boundary
    // first
    mode.begin = '\\b(' + mode.beginKeywords.split(' ').join('|') + ')(?!\\.)(?=\\b|\\s)';
    mode.__beforeBegin = skipIfhasPrecedingDot;
    mode.keywords = mode.keywords || mode.beginKeywords;
    delete mode.beginKeywords;
    // prevents double relevance, the keywords themselves provide
    // relevance, the mode doesn't need to double it
    // eslint-disable-next-line no-undefined
    if (mode.relevance === undefined) mode.relevance = 0;
}
/**
 * Allow `illegal` to contain an array of illegal values
 * @type {CompilerExt}
 */ function compileIllegal(mode, _parent) {
    if (!Array.isArray(mode.illegal)) return;
    mode.illegal = either(...mode.illegal);
}
/**
 * `match` to match a single expression for readability
 * @type {CompilerExt}
 */ function compileMatch(mode, _parent) {
    if (!mode.match) return;
    if (mode.begin || mode.end) throw new Error("begin & end are not supported with match");
    mode.begin = mode.match;
    delete mode.match;
}
/**
 * provides the default 1 relevance to all modes
 * @type {CompilerExt}
 */ function compileRelevance(mode, _parent) {
    // eslint-disable-next-line no-undefined
    if (mode.relevance === undefined) mode.relevance = 1;
}
// keywords that should have no default relevance value
const COMMON_KEYWORDS = [
    'of',
    'and',
    'for',
    'in',
    'not',
    'or',
    'if',
    'then',
    'parent',
    'list',
    'value' // common variable name
];
const DEFAULT_KEYWORD_CLASSNAME = "keyword";
/**
 * Given raw keywords from a language definition, compile them.
 *
 * @param {string | Record<string,string|string[]> | Array<string>} rawKeywords
 * @param {boolean} caseInsensitive
 */ function compileKeywords(rawKeywords, caseInsensitive, className = DEFAULT_KEYWORD_CLASSNAME) {
    /** @type KeywordDict */ const compiledKeywords = {};
    // input can be a string of keywords, an array of keywords, or a object with
    // named keys representing className (which can then point to a string or array)
    if (typeof rawKeywords === 'string') {
        compileList(className, rawKeywords.split(" "));
    } else if (Array.isArray(rawKeywords)) {
        compileList(className, rawKeywords);
    } else {
        Object.keys(rawKeywords).forEach(function(className) {
            // collapse all our objects back into the parent object
            Object.assign(compiledKeywords, compileKeywords(rawKeywords[className], caseInsensitive, className));
        });
    }
    return compiledKeywords;
    //TURBOPACK unreachable
    ;
    // ---
    /**
   * Compiles an individual list of keywords
   *
   * Ex: "for if when while|5"
   *
   * @param {string} className
   * @param {Array<string>} keywordList
   */ function compileList(className, keywordList) {
        if (caseInsensitive) {
            keywordList = keywordList.map((x)=>x.toLowerCase());
        }
        keywordList.forEach(function(keyword) {
            const pair = keyword.split('|');
            compiledKeywords[pair[0]] = [
                className,
                scoreForKeyword(pair[0], pair[1])
            ];
        });
    }
}
/**
 * Returns the proper score for a given keyword
 *
 * Also takes into account comment keywords, which will be scored 0 UNLESS
 * another score has been manually assigned.
 * @param {string} keyword
 * @param {string} [providedScore]
 */ function scoreForKeyword(keyword, providedScore) {
    // manual scores always win over common keywords
    // so you can force a score of 1 if you really insist
    if (providedScore) {
        return Number(providedScore);
    }
    return commonKeyword(keyword) ? 0 : 1;
}
/**
 * Determines if a given keyword is common or not
 *
 * @param {string} keyword */ function commonKeyword(keyword) {
    return COMMON_KEYWORDS.includes(keyword.toLowerCase());
}
// compilation
/**
 * Compiles a language definition result
 *
 * Given the raw result of a language definition (Language), compiles this so
 * that it is ready for highlighting code.
 * @param {Language} language
 * @param {{plugins: HLJSPlugin[]}} opts
 * @returns {CompiledLanguage}
 */ function compileLanguage(language, { plugins }) {
    /**
   * Builds a regex with the case sensativility of the current language
   *
   * @param {RegExp | string} value
   * @param {boolean} [global]
   */ function langRe(value, global) {
        return new RegExp(source(value), 'm' + (language.case_insensitive ? 'i' : '') + (global ? 'g' : ''));
    }
    /**
    Stores multiple regular expressions and allows you to quickly search for
    them all in a string simultaneously - returning the first match.  It does
    this by creating a huge (a|b|c) regex - each individual item wrapped with ()
    and joined by `|` - using match groups to track position.  When a match is
    found checking which position in the array has content allows us to figure
    out which of the original regexes / match groups triggered the match.

    The match object itself (the result of `Regex.exec`) is returned but also
    enhanced by merging in any meta-data that was registered with the regex.
    This is how we keep track of which mode matched, and what type of rule
    (`illegal`, `begin`, end, etc).
  */ class MultiRegex {
        constructor(){
            this.matchIndexes = {};
            // @ts-ignore
            this.regexes = [];
            this.matchAt = 1;
            this.position = 0;
        }
        // @ts-ignore
        addRule(re, opts) {
            opts.position = this.position++;
            // @ts-ignore
            this.matchIndexes[this.matchAt] = opts;
            this.regexes.push([
                opts,
                re
            ]);
            this.matchAt += countMatchGroups(re) + 1;
        }
        compile() {
            if (this.regexes.length === 0) {
                // avoids the need to check length every time exec is called
                // @ts-ignore
                this.exec = ()=>null;
            }
            const terminators = this.regexes.map((el)=>el[1]);
            this.matcherRe = langRe(join(terminators), true);
            this.lastIndex = 0;
        }
        /** @param {string} s */ exec(s) {
            this.matcherRe.lastIndex = this.lastIndex;
            const match = this.matcherRe.exec(s);
            if (!match) {
                return null;
            }
            // eslint-disable-next-line no-undefined
            const i = match.findIndex((el, i)=>i > 0 && el !== undefined);
            // @ts-ignore
            const matchData = this.matchIndexes[i];
            // trim off any earlier non-relevant match groups (ie, the other regex
            // match groups that make up the multi-matcher)
            match.splice(0, i);
            return Object.assign(match, matchData);
        }
    }
    /*
    Created to solve the key deficiently with MultiRegex - there is no way to
    test for multiple matches at a single location.  Why would we need to do
    that?  In the future a more dynamic engine will allow certain matches to be
    ignored.  An example: if we matched say the 3rd regex in a large group but
    decided to ignore it - we'd need to started testing again at the 4th
    regex... but MultiRegex itself gives us no real way to do that.

    So what this class creates MultiRegexs on the fly for whatever search
    position they are needed.

    NOTE: These additional MultiRegex objects are created dynamically.  For most
    grammars most of the time we will never actually need anything more than the
    first MultiRegex - so this shouldn't have too much overhead.

    Say this is our search group, and we match regex3, but wish to ignore it.

      regex1 | regex2 | regex3 | regex4 | regex5    ' ie, startAt = 0

    What we need is a new MultiRegex that only includes the remaining
    possibilities:

      regex4 | regex5                               ' ie, startAt = 3

    This class wraps all that complexity up in a simple API... `startAt` decides
    where in the array of expressions to start doing the matching. It
    auto-increments, so if a match is found at position 2, then startAt will be
    set to 3.  If the end is reached startAt will return to 0.

    MOST of the time the parser will be setting startAt manually to 0.
  */ class ResumableMultiRegex {
        constructor(){
            // @ts-ignore
            this.rules = [];
            // @ts-ignore
            this.multiRegexes = [];
            this.count = 0;
            this.lastIndex = 0;
            this.regexIndex = 0;
        }
        // @ts-ignore
        getMatcher(index) {
            if (this.multiRegexes[index]) return this.multiRegexes[index];
            const matcher = new MultiRegex();
            this.rules.slice(index).forEach(([re, opts])=>matcher.addRule(re, opts));
            matcher.compile();
            this.multiRegexes[index] = matcher;
            return matcher;
        }
        resumingScanAtSamePosition() {
            return this.regexIndex !== 0;
        }
        considerAll() {
            this.regexIndex = 0;
        }
        // @ts-ignore
        addRule(re, opts) {
            this.rules.push([
                re,
                opts
            ]);
            if (opts.type === "begin") this.count++;
        }
        /** @param {string} s */ exec(s) {
            const m = this.getMatcher(this.regexIndex);
            m.lastIndex = this.lastIndex;
            let result = m.exec(s);
            // The following is because we have no easy way to say "resume scanning at the
            // existing position but also skip the current rule ONLY". What happens is
            // all prior rules are also skipped which can result in matching the wrong
            // thing. Example of matching "booger":
            // our matcher is [string, "booger", number]
            //
            // ....booger....
            // if "booger" is ignored then we'd really need a regex to scan from the
            // SAME position for only: [string, number] but ignoring "booger" (if it
            // was the first match), a simple resume would scan ahead who knows how
            // far looking only for "number", ignoring potential string matches (or
            // future "booger" matches that might be valid.)
            // So what we do: We execute two matchers, one resuming at the same
            // position, but the second full matcher starting at the position after:
            //     /--- resume first regex match here (for [number])
            //     |/---- full match here for [string, "booger", number]
            //     vv
            // ....booger....
            // Which ever results in a match first is then used. So this 3-4 step
            // process essentially allows us to say "match at this position, excluding
            // a prior rule that was ignored".
            //
            // 1. Match "booger" first, ignore. Also proves that [string] does non match.
            // 2. Resume matching for [number]
            // 3. Match at index + 1 for [string, "booger", number]
            // 4. If #2 and #3 result in matches, which came first?
            if (this.resumingScanAtSamePosition()) {
                if (result && result.index === this.lastIndex) ;
                else {
                    const m2 = this.getMatcher(0);
                    m2.lastIndex = this.lastIndex + 1;
                    result = m2.exec(s);
                }
            }
            if (result) {
                this.regexIndex += result.position + 1;
                if (this.regexIndex === this.count) {
                    // wrap-around to considering all matches again
                    this.considerAll();
                }
            }
            return result;
        }
    }
    /**
   * Given a mode, builds a huge ResumableMultiRegex that can be used to walk
   * the content and find matches.
   *
   * @param {CompiledMode} mode
   * @returns {ResumableMultiRegex}
   */ function buildModeRegex(mode) {
        const mm = new ResumableMultiRegex();
        mode.contains.forEach((term)=>mm.addRule(term.begin, {
                rule: term,
                type: "begin"
            }));
        if (mode.terminatorEnd) {
            mm.addRule(mode.terminatorEnd, {
                type: "end"
            });
        }
        if (mode.illegal) {
            mm.addRule(mode.illegal, {
                type: "illegal"
            });
        }
        return mm;
    }
    /** skip vs abort vs ignore
   *
   * @skip   - The mode is still entered and exited normally (and contains rules apply),
   *           but all content is held and added to the parent buffer rather than being
   *           output when the mode ends.  Mostly used with `sublanguage` to build up
   *           a single large buffer than can be parsed by sublanguage.
   *
   *             - The mode begin ands ends normally.
   *             - Content matched is added to the parent mode buffer.
   *             - The parser cursor is moved forward normally.
   *
   * @abort  - A hack placeholder until we have ignore.  Aborts the mode (as if it
   *           never matched) but DOES NOT continue to match subsequent `contains`
   *           modes.  Abort is bad/suboptimal because it can result in modes
   *           farther down not getting applied because an earlier rule eats the
   *           content but then aborts.
   *
   *             - The mode does not begin.
   *             - Content matched by `begin` is added to the mode buffer.
   *             - The parser cursor is moved forward accordingly.
   *
   * @ignore - Ignores the mode (as if it never matched) and continues to match any
   *           subsequent `contains` modes.  Ignore isn't technically possible with
   *           the current parser implementation.
   *
   *             - The mode does not begin.
   *             - Content matched by `begin` is ignored.
   *             - The parser cursor is not moved forward.
   */ /**
   * Compiles an individual mode
   *
   * This can raise an error if the mode contains certain detectable known logic
   * issues.
   * @param {Mode} mode
   * @param {CompiledMode | null} [parent]
   * @returns {CompiledMode | never}
   */ function compileMode(mode, parent) {
        const cmode = mode;
        if (mode.isCompiled) return cmode;
        [
            // do this early so compiler extensions generally don't have to worry about
            // the distinction between match/begin
            compileMatch
        ].forEach((ext)=>ext(mode, parent));
        language.compilerExtensions.forEach((ext)=>ext(mode, parent));
        // __beforeBegin is considered private API, internal use only
        mode.__beforeBegin = null;
        [
            beginKeywords,
            // do this later so compiler extensions that come earlier have access to the
            // raw array if they wanted to perhaps manipulate it, etc.
            compileIllegal,
            // default to 1 relevance if not specified
            compileRelevance
        ].forEach((ext)=>ext(mode, parent));
        mode.isCompiled = true;
        let keywordPattern = null;
        if (typeof mode.keywords === "object") {
            keywordPattern = mode.keywords.$pattern;
            delete mode.keywords.$pattern;
        }
        if (mode.keywords) {
            mode.keywords = compileKeywords(mode.keywords, language.case_insensitive);
        }
        // both are not allowed
        if (mode.lexemes && keywordPattern) {
            throw new Error("ERR: Prefer `keywords.$pattern` to `mode.lexemes`, BOTH are not allowed. (see mode reference) ");
        }
        // `mode.lexemes` was the old standard before we added and now recommend
        // using `keywords.$pattern` to pass the keyword pattern
        keywordPattern = keywordPattern || mode.lexemes || /\w+/;
        cmode.keywordPatternRe = langRe(keywordPattern, true);
        if (parent) {
            if (!mode.begin) mode.begin = /\B|\b/;
            cmode.beginRe = langRe(mode.begin);
            if (mode.endSameAsBegin) mode.end = mode.begin;
            if (!mode.end && !mode.endsWithParent) mode.end = /\B|\b/;
            if (mode.end) cmode.endRe = langRe(mode.end);
            cmode.terminatorEnd = source(mode.end) || '';
            if (mode.endsWithParent && parent.terminatorEnd) {
                cmode.terminatorEnd += (mode.end ? '|' : '') + parent.terminatorEnd;
            }
        }
        if (mode.illegal) cmode.illegalRe = langRe(mode.illegal);
        if (!mode.contains) mode.contains = [];
        mode.contains = [].concat(...mode.contains.map(function(c) {
            return expandOrCloneMode(c === 'self' ? mode : c);
        }));
        mode.contains.forEach(function(c) {
            compileMode(c, cmode);
        });
        if (mode.starts) {
            compileMode(mode.starts, parent);
        }
        cmode.matcher = buildModeRegex(cmode);
        return cmode;
    }
    if (!language.compilerExtensions) language.compilerExtensions = [];
    // self is not valid at the top-level
    if (language.contains && language.contains.includes('self')) {
        throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");
    }
    // we need a null object, which inherit will guarantee
    language.classNameAliases = inherit(language.classNameAliases || {});
    return compileMode(language);
}
/**
 * Determines if a mode has a dependency on it's parent or not
 *
 * If a mode does have a parent dependency then often we need to clone it if
 * it's used in multiple places so that each copy points to the correct parent,
 * where-as modes without a parent can often safely be re-used at the bottom of
 * a mode chain.
 *
 * @param {Mode | null} mode
 * @returns {boolean} - is there a dependency on the parent?
 * */ function dependencyOnParent(mode) {
    if (!mode) return false;
    return mode.endsWithParent || dependencyOnParent(mode.starts);
}
/**
 * Expands a mode or clones it if necessary
 *
 * This is necessary for modes with parental dependenceis (see notes on
 * `dependencyOnParent`) and for nodes that have `variants` - which must then be
 * exploded into their own individual modes at compile time.
 *
 * @param {Mode} mode
 * @returns {Mode | Mode[]}
 * */ function expandOrCloneMode(mode) {
    if (mode.variants && !mode.cachedVariants) {
        mode.cachedVariants = mode.variants.map(function(variant) {
            return inherit(mode, {
                variants: null
            }, variant);
        });
    }
    // EXPAND
    // if we have variants then essentially "replace" the mode with the variants
    // this happens in compileMode, where this function is called from
    if (mode.cachedVariants) {
        return mode.cachedVariants;
    }
    // CLONE
    // if we have dependencies on parents then we need a unique
    // instance of ourselves, so we can be reused with many
    // different parents without issue
    if (dependencyOnParent(mode)) {
        return inherit(mode, {
            starts: mode.starts ? inherit(mode.starts) : null
        });
    }
    if (Object.isFrozen(mode)) {
        return inherit(mode);
    }
    // no special dependency issues, just return ourselves
    return mode;
}
var version = "10.7.3";
// @ts-nocheck
function hasValueOrEmptyAttribute(value) {
    return Boolean(value || value === "");
}
function BuildVuePlugin(hljs) {
    const Component = {
        props: [
            "language",
            "code",
            "autodetect"
        ],
        data: function() {
            return {
                detectedLanguage: "",
                unknownLanguage: false
            };
        },
        computed: {
            className () {
                if (this.unknownLanguage) return "";
                return "hljs " + this.detectedLanguage;
            },
            highlighted () {
                // no idea what language to use, return raw code
                if (!this.autoDetect && !hljs.getLanguage(this.language)) {
                    console.warn(`The language "${this.language}" you specified could not be found.`);
                    this.unknownLanguage = true;
                    return escapeHTML(this.code);
                }
                let result = {};
                if (this.autoDetect) {
                    result = hljs.highlightAuto(this.code);
                    this.detectedLanguage = result.language;
                } else {
                    result = hljs.highlight(this.language, this.code, this.ignoreIllegals);
                    this.detectedLanguage = this.language;
                }
                return result.value;
            },
            autoDetect () {
                return !this.language || hasValueOrEmptyAttribute(this.autodetect);
            },
            ignoreIllegals () {
                return true;
            }
        },
        // this avoids needing to use a whole Vue compilation pipeline just
        // to build Highlight.js
        render (createElement) {
            return createElement("pre", {}, [
                createElement("code", {
                    class: this.className,
                    domProps: {
                        innerHTML: this.highlighted
                    }
                })
            ]);
        }
    };
    const VuePlugin = {
        install (Vue) {
            Vue.component('highlightjs', Component);
        }
    };
    return {
        Component,
        VuePlugin
    };
}
/* plugin itself */ /** @type {HLJSPlugin} */ const mergeHTMLPlugin = {
    "after:highlightElement": ({ el, result, text })=>{
        const originalStream = nodeStream(el);
        if (!originalStream.length) return;
        const resultNode = document.createElement('div');
        resultNode.innerHTML = result.value;
        result.value = mergeStreams(originalStream, nodeStream(resultNode), text);
    }
};
/* Stream merging support functions */ /**
 * @typedef Event
 * @property {'start'|'stop'} event
 * @property {number} offset
 * @property {Node} node
 */ /**
 * @param {Node} node
 */ function tag(node) {
    return node.nodeName.toLowerCase();
}
/**
 * @param {Node} node
 */ function nodeStream(node) {
    /** @type Event[] */ const result = [];
    (function _nodeStream(node, offset) {
        for(let child = node.firstChild; child; child = child.nextSibling){
            if (child.nodeType === 3) {
                offset += child.nodeValue.length;
            } else if (child.nodeType === 1) {
                result.push({
                    event: 'start',
                    offset: offset,
                    node: child
                });
                offset = _nodeStream(child, offset);
                // Prevent void elements from having an end tag that would actually
                // double them in the output. There are more void elements in HTML
                // but we list only those realistically expected in code display.
                if (!tag(child).match(/br|hr|img|input/)) {
                    result.push({
                        event: 'stop',
                        offset: offset,
                        node: child
                    });
                }
            }
        }
        return offset;
    })(node, 0);
    return result;
}
/**
 * @param {any} original - the original stream
 * @param {any} highlighted - stream of the highlighted source
 * @param {string} value - the original source itself
 */ function mergeStreams(original, highlighted, value) {
    let processed = 0;
    let result = '';
    const nodeStack = [];
    function selectStream() {
        if (!original.length || !highlighted.length) {
            return original.length ? original : highlighted;
        }
        if (original[0].offset !== highlighted[0].offset) {
            return original[0].offset < highlighted[0].offset ? original : highlighted;
        }
        /*
    To avoid starting the stream just before it should stop the order is
    ensured that original always starts first and closes last:

    if (event1 == 'start' && event2 == 'start')
      return original;
    if (event1 == 'start' && event2 == 'stop')
      return highlighted;
    if (event1 == 'stop' && event2 == 'start')
      return original;
    if (event1 == 'stop' && event2 == 'stop')
      return highlighted;

    ... which is collapsed to:
    */ return highlighted[0].event === 'start' ? original : highlighted;
    }
    /**
   * @param {Node} node
   */ function open(node) {
        /** @param {Attr} attr */ function attributeString(attr) {
            return ' ' + attr.nodeName + '="' + escapeHTML(attr.value) + '"';
        }
        // @ts-ignore
        result += '<' + tag(node) + [].map.call(node.attributes, attributeString).join('') + '>';
    }
    /**
   * @param {Node} node
   */ function close(node) {
        result += '</' + tag(node) + '>';
    }
    /**
   * @param {Event} event
   */ function render(event) {
        (event.event === 'start' ? open : close)(event.node);
    }
    while(original.length || highlighted.length){
        let stream = selectStream();
        result += escapeHTML(value.substring(processed, stream[0].offset));
        processed = stream[0].offset;
        if (stream === original) {
            /*
      On any opening or closing tag of the original markup we first close
      the entire highlighted node stack, then render the original tag along
      with all the following original tags at the same offset and then
      reopen all the tags on the highlighted stack.
      */ nodeStack.reverse().forEach(close);
            do {
                render(stream.splice(0, 1)[0]);
                stream = selectStream();
            }while (stream === original && stream.length && stream[0].offset === processed)
            nodeStack.reverse().forEach(open);
        } else {
            if (stream[0].event === 'start') {
                nodeStack.push(stream[0].node);
            } else {
                nodeStack.pop();
            }
            render(stream.splice(0, 1)[0]);
        }
    }
    return result + escapeHTML(value.substr(processed));
}
/*

For the reasoning behind this please see:
https://github.com/highlightjs/highlight.js/issues/2880#issuecomment-747275419

*/ /**
 * @type {Record<string, boolean>}
 */ const seenDeprecations = {};
/**
 * @param {string} message
 */ const error = (message)=>{
    console.error(message);
};
/**
 * @param {string} message
 * @param {any} args
 */ const warn = (message, ...args)=>{
    console.log(`WARN: ${message}`, ...args);
};
/**
 * @param {string} version
 * @param {string} message
 */ const deprecated = (version, message)=>{
    if (seenDeprecations[`${version}/${message}`]) return;
    console.log(`Deprecated as of ${version}. ${message}`);
    seenDeprecations[`${version}/${message}`] = true;
};
/*
Syntax highlighting with language autodetection.
https://highlightjs.org/
*/ const escape$1 = escapeHTML;
const inherit$1 = inherit;
const NO_MATCH = Symbol("nomatch");
/**
 * @param {any} hljs - object that is extended (legacy)
 * @returns {HLJSApi}
 */ const HLJS = function(hljs) {
    // Global internal variables used within the highlight.js library.
    /** @type {Record<string, Language>} */ const languages = Object.create(null);
    /** @type {Record<string, string>} */ const aliases = Object.create(null);
    /** @type {HLJSPlugin[]} */ const plugins = [];
    // safe/production mode - swallows more errors, tries to keep running
    // even if a single syntax or parse hits a fatal error
    let SAFE_MODE = true;
    const fixMarkupRe = /(^(<[^>]+>|\t|)+|\n)/gm;
    const LANGUAGE_NOT_FOUND = "Could not find the language '{}', did you forget to load/include a language module?";
    /** @type {Language} */ const PLAINTEXT_LANGUAGE = {
        disableAutodetect: true,
        name: 'Plain text',
        contains: []
    };
    // Global options used when within external APIs. This is modified when
    // calling the `hljs.configure` function.
    /** @type HLJSOptions */ let options = {
        noHighlightRe: /^(no-?highlight)$/i,
        languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
        classPrefix: 'hljs-',
        tabReplace: null,
        useBR: false,
        languages: null,
        // beta configuration options, subject to change, welcome to discuss
        // https://github.com/highlightjs/highlight.js/issues/1086
        __emitter: TokenTreeEmitter
    };
    /* Utility functions */ /**
   * Tests a language name to see if highlighting should be skipped
   * @param {string} languageName
   */ function shouldNotHighlight(languageName) {
        return options.noHighlightRe.test(languageName);
    }
    /**
   * @param {HighlightedHTMLElement} block - the HTML element to determine language for
   */ function blockLanguage(block) {
        let classes = block.className + ' ';
        classes += block.parentNode ? block.parentNode.className : '';
        // language-* takes precedence over non-prefixed class names.
        const match = options.languageDetectRe.exec(classes);
        if (match) {
            const language = getLanguage(match[1]);
            if (!language) {
                warn(LANGUAGE_NOT_FOUND.replace("{}", match[1]));
                warn("Falling back to no-highlight mode for this block.", block);
            }
            return language ? match[1] : 'no-highlight';
        }
        return classes.split(/\s+/).find((_class)=>shouldNotHighlight(_class) || getLanguage(_class));
    }
    /**
   * Core highlighting function.
   *
   * OLD API
   * highlight(lang, code, ignoreIllegals, continuation)
   *
   * NEW API
   * highlight(code, {lang, ignoreIllegals})
   *
   * @param {string} codeOrlanguageName - the language to use for highlighting
   * @param {string | HighlightOptions} optionsOrCode - the code to highlight
   * @param {boolean} [ignoreIllegals] - whether to ignore illegal matches, default is to bail
   * @param {CompiledMode} [continuation] - current continuation mode, if any
   *
   * @returns {HighlightResult} Result - an object that represents the result
   * @property {string} language - the language name
   * @property {number} relevance - the relevance score
   * @property {string} value - the highlighted HTML code
   * @property {string} code - the original raw code
   * @property {CompiledMode} top - top of the current mode stack
   * @property {boolean} illegal - indicates whether any illegal matches were found
  */ function highlight(codeOrlanguageName, optionsOrCode, ignoreIllegals, continuation) {
        let code = "";
        let languageName = "";
        if (typeof optionsOrCode === "object") {
            code = codeOrlanguageName;
            ignoreIllegals = optionsOrCode.ignoreIllegals;
            languageName = optionsOrCode.language;
            // continuation not supported at all via the new API
            // eslint-disable-next-line no-undefined
            continuation = undefined;
        } else {
            // old API
            deprecated("10.7.0", "highlight(lang, code, ...args) has been deprecated.");
            deprecated("10.7.0", "Please use highlight(code, options) instead.\nhttps://github.com/highlightjs/highlight.js/issues/2277");
            languageName = codeOrlanguageName;
            code = optionsOrCode;
        }
        /** @type {BeforeHighlightContext} */ const context = {
            code,
            language: languageName
        };
        // the plugin can change the desired language or the code to be highlighted
        // just be changing the object it was passed
        fire("before:highlight", context);
        // a before plugin can usurp the result completely by providing it's own
        // in which case we don't even need to call highlight
        const result = context.result ? context.result : _highlight(context.language, context.code, ignoreIllegals, continuation);
        result.code = context.code;
        // the plugin can change anything in result to suite it
        fire("after:highlight", result);
        return result;
    }
    /**
   * private highlight that's used internally and does not fire callbacks
   *
   * @param {string} languageName - the language to use for highlighting
   * @param {string} codeToHighlight - the code to highlight
   * @param {boolean?} [ignoreIllegals] - whether to ignore illegal matches, default is to bail
   * @param {CompiledMode?} [continuation] - current continuation mode, if any
   * @returns {HighlightResult} - result of the highlight operation
  */ function _highlight(languageName, codeToHighlight, ignoreIllegals, continuation) {
        /**
     * Return keyword data if a match is a keyword
     * @param {CompiledMode} mode - current mode
     * @param {RegExpMatchArray} match - regexp match data
     * @returns {KeywordData | false}
     */ function keywordData(mode, match) {
            const matchText = language.case_insensitive ? match[0].toLowerCase() : match[0];
            return Object.prototype.hasOwnProperty.call(mode.keywords, matchText) && mode.keywords[matchText];
        }
        function processKeywords() {
            if (!top.keywords) {
                emitter.addText(modeBuffer);
                return;
            }
            let lastIndex = 0;
            top.keywordPatternRe.lastIndex = 0;
            let match = top.keywordPatternRe.exec(modeBuffer);
            let buf = "";
            while(match){
                buf += modeBuffer.substring(lastIndex, match.index);
                const data = keywordData(top, match);
                if (data) {
                    const [kind, keywordRelevance] = data;
                    emitter.addText(buf);
                    buf = "";
                    relevance += keywordRelevance;
                    if (kind.startsWith("_")) {
                        // _ implied for relevance only, do not highlight
                        // by applying a class name
                        buf += match[0];
                    } else {
                        const cssClass = language.classNameAliases[kind] || kind;
                        emitter.addKeyword(match[0], cssClass);
                    }
                } else {
                    buf += match[0];
                }
                lastIndex = top.keywordPatternRe.lastIndex;
                match = top.keywordPatternRe.exec(modeBuffer);
            }
            buf += modeBuffer.substr(lastIndex);
            emitter.addText(buf);
        }
        function processSubLanguage() {
            if (modeBuffer === "") return;
            /** @type HighlightResult */ let result = null;
            if (typeof top.subLanguage === 'string') {
                if (!languages[top.subLanguage]) {
                    emitter.addText(modeBuffer);
                    return;
                }
                result = _highlight(top.subLanguage, modeBuffer, true, continuations[top.subLanguage]);
                continuations[top.subLanguage] = result.top;
            } else {
                result = highlightAuto(modeBuffer, top.subLanguage.length ? top.subLanguage : null);
            }
            // Counting embedded language score towards the host language may be disabled
            // with zeroing the containing mode relevance. Use case in point is Markdown that
            // allows XML everywhere and makes every XML snippet to have a much larger Markdown
            // score.
            if (top.relevance > 0) {
                relevance += result.relevance;
            }
            emitter.addSublanguage(result.emitter, result.language);
        }
        function processBuffer() {
            if (top.subLanguage != null) {
                processSubLanguage();
            } else {
                processKeywords();
            }
            modeBuffer = '';
        }
        /**
     * @param {Mode} mode - new mode to start
     */ function startNewMode(mode) {
            if (mode.className) {
                emitter.openNode(language.classNameAliases[mode.className] || mode.className);
            }
            top = Object.create(mode, {
                parent: {
                    value: top
                }
            });
            return top;
        }
        /**
     * @param {CompiledMode } mode - the mode to potentially end
     * @param {RegExpMatchArray} match - the latest match
     * @param {string} matchPlusRemainder - match plus remainder of content
     * @returns {CompiledMode | void} - the next mode, or if void continue on in current mode
     */ function endOfMode(mode, match, matchPlusRemainder) {
            let matched = startsWith(mode.endRe, matchPlusRemainder);
            if (matched) {
                if (mode["on:end"]) {
                    const resp = new Response(mode);
                    mode["on:end"](match, resp);
                    if (resp.isMatchIgnored) matched = false;
                }
                if (matched) {
                    while(mode.endsParent && mode.parent){
                        mode = mode.parent;
                    }
                    return mode;
                }
            }
            // even if on:end fires an `ignore` it's still possible
            // that we might trigger the end node because of a parent mode
            if (mode.endsWithParent) {
                return endOfMode(mode.parent, match, matchPlusRemainder);
            }
        }
        /**
     * Handle matching but then ignoring a sequence of text
     *
     * @param {string} lexeme - string containing full match text
     */ function doIgnore(lexeme) {
            if (top.matcher.regexIndex === 0) {
                // no more regexs to potentially match here, so we move the cursor forward one
                // space
                modeBuffer += lexeme[0];
                return 1;
            } else {
                // no need to move the cursor, we still have additional regexes to try and
                // match at this very spot
                resumeScanAtSamePosition = true;
                return 0;
            }
        }
        /**
     * Handle the start of a new potential mode match
     *
     * @param {EnhancedMatch} match - the current match
     * @returns {number} how far to advance the parse cursor
     */ function doBeginMatch(match) {
            const lexeme = match[0];
            const newMode = match.rule;
            const resp = new Response(newMode);
            // first internal before callbacks, then the public ones
            const beforeCallbacks = [
                newMode.__beforeBegin,
                newMode["on:begin"]
            ];
            for (const cb of beforeCallbacks){
                if (!cb) continue;
                cb(match, resp);
                if (resp.isMatchIgnored) return doIgnore(lexeme);
            }
            if (newMode && newMode.endSameAsBegin) {
                newMode.endRe = escape(lexeme);
            }
            if (newMode.skip) {
                modeBuffer += lexeme;
            } else {
                if (newMode.excludeBegin) {
                    modeBuffer += lexeme;
                }
                processBuffer();
                if (!newMode.returnBegin && !newMode.excludeBegin) {
                    modeBuffer = lexeme;
                }
            }
            startNewMode(newMode);
            // if (mode["after:begin"]) {
            //   let resp = new Response(mode);
            //   mode["after:begin"](match, resp);
            // }
            return newMode.returnBegin ? 0 : lexeme.length;
        }
        /**
     * Handle the potential end of mode
     *
     * @param {RegExpMatchArray} match - the current match
     */ function doEndMatch(match) {
            const lexeme = match[0];
            const matchPlusRemainder = codeToHighlight.substr(match.index);
            const endMode = endOfMode(top, match, matchPlusRemainder);
            if (!endMode) {
                return NO_MATCH;
            }
            const origin = top;
            if (origin.skip) {
                modeBuffer += lexeme;
            } else {
                if (!(origin.returnEnd || origin.excludeEnd)) {
                    modeBuffer += lexeme;
                }
                processBuffer();
                if (origin.excludeEnd) {
                    modeBuffer = lexeme;
                }
            }
            do {
                if (top.className) {
                    emitter.closeNode();
                }
                if (!top.skip && !top.subLanguage) {
                    relevance += top.relevance;
                }
                top = top.parent;
            }while (top !== endMode.parent)
            if (endMode.starts) {
                if (endMode.endSameAsBegin) {
                    endMode.starts.endRe = endMode.endRe;
                }
                startNewMode(endMode.starts);
            }
            return origin.returnEnd ? 0 : lexeme.length;
        }
        function processContinuations() {
            const list = [];
            for(let current = top; current !== language; current = current.parent){
                if (current.className) {
                    list.unshift(current.className);
                }
            }
            list.forEach((item)=>emitter.openNode(item));
        }
        /** @type {{type?: MatchType, index?: number, rule?: Mode}}} */ let lastMatch = {};
        /**
     *  Process an individual match
     *
     * @param {string} textBeforeMatch - text preceeding the match (since the last match)
     * @param {EnhancedMatch} [match] - the match itself
     */ function processLexeme(textBeforeMatch, match) {
            const lexeme = match && match[0];
            // add non-matched text to the current mode buffer
            modeBuffer += textBeforeMatch;
            if (lexeme == null) {
                processBuffer();
                return 0;
            }
            // we've found a 0 width match and we're stuck, so we need to advance
            // this happens when we have badly behaved rules that have optional matchers to the degree that
            // sometimes they can end up matching nothing at all
            // Ref: https://github.com/highlightjs/highlight.js/issues/2140
            if (lastMatch.type === "begin" && match.type === "end" && lastMatch.index === match.index && lexeme === "") {
                // spit the "skipped" character that our regex choked on back into the output sequence
                modeBuffer += codeToHighlight.slice(match.index, match.index + 1);
                if (!SAFE_MODE) {
                    /** @type {AnnotatedError} */ const err = new Error('0 width match regex');
                    err.languageName = languageName;
                    err.badRule = lastMatch.rule;
                    throw err;
                }
                return 1;
            }
            lastMatch = match;
            if (match.type === "begin") {
                return doBeginMatch(match);
            } else if (match.type === "illegal" && !ignoreIllegals) {
                // illegal match, we do not continue processing
                /** @type {AnnotatedError} */ const err = new Error('Illegal lexeme "' + lexeme + '" for mode "' + (top.className || '<unnamed>') + '"');
                err.mode = top;
                throw err;
            } else if (match.type === "end") {
                const processed = doEndMatch(match);
                if (processed !== NO_MATCH) {
                    return processed;
                }
            }
            // edge case for when illegal matches $ (end of line) which is technically
            // a 0 width match but not a begin/end match so it's not caught by the
            // first handler (when ignoreIllegals is true)
            if (match.type === "illegal" && lexeme === "") {
                // advance so we aren't stuck in an infinite loop
                return 1;
            }
            // infinite loops are BAD, this is a last ditch catch all. if we have a
            // decent number of iterations yet our index (cursor position in our
            // parsing) still 3x behind our index then something is very wrong
            // so we bail
            if (iterations > 100000 && iterations > match.index * 3) {
                const err = new Error('potential infinite loop, way more iterations than matches');
                throw err;
            }
            /*
      Why might be find ourselves here?  Only one occasion now.  An end match that was
      triggered but could not be completed.  When might this happen?  When an `endSameasBegin`
      rule sets the end rule to a specific match.  Since the overall mode termination rule that's
      being used to scan the text isn't recompiled that means that any match that LOOKS like
      the end (but is not, because it is not an exact match to the beginning) will
      end up here.  A definite end match, but when `doEndMatch` tries to "reapply"
      the end rule and fails to match, we wind up here, and just silently ignore the end.

      This causes no real harm other than stopping a few times too many.
      */ modeBuffer += lexeme;
            return lexeme.length;
        }
        const language = getLanguage(languageName);
        if (!language) {
            error(LANGUAGE_NOT_FOUND.replace("{}", languageName));
            throw new Error('Unknown language: "' + languageName + '"');
        }
        const md = compileLanguage(language, {
            plugins
        });
        let result = '';
        /** @type {CompiledMode} */ let top = continuation || md;
        /** @type Record<string,CompiledMode> */ const continuations = {}; // keep continuations for sub-languages
        const emitter = new options.__emitter(options);
        processContinuations();
        let modeBuffer = '';
        let relevance = 0;
        let index = 0;
        let iterations = 0;
        let resumeScanAtSamePosition = false;
        try {
            top.matcher.considerAll();
            for(;;){
                iterations++;
                if (resumeScanAtSamePosition) {
                    // only regexes not matched previously will now be
                    // considered for a potential match
                    resumeScanAtSamePosition = false;
                } else {
                    top.matcher.considerAll();
                }
                top.matcher.lastIndex = index;
                const match = top.matcher.exec(codeToHighlight);
                // console.log("match", match[0], match.rule && match.rule.begin)
                if (!match) break;
                const beforeMatch = codeToHighlight.substring(index, match.index);
                const processedCount = processLexeme(beforeMatch, match);
                index = match.index + processedCount;
            }
            processLexeme(codeToHighlight.substr(index));
            emitter.closeAllNodes();
            emitter.finalize();
            result = emitter.toHTML();
            return {
                // avoid possible breakage with v10 clients expecting
                // this to always be an integer
                relevance: Math.floor(relevance),
                value: result,
                language: languageName,
                illegal: false,
                emitter: emitter,
                top: top
            };
        } catch (err) {
            if (err.message && err.message.includes('Illegal')) {
                return {
                    illegal: true,
                    illegalBy: {
                        msg: err.message,
                        context: codeToHighlight.slice(index - 100, index + 100),
                        mode: err.mode
                    },
                    sofar: result,
                    relevance: 0,
                    value: escape$1(codeToHighlight),
                    emitter: emitter
                };
            } else if (SAFE_MODE) {
                return {
                    illegal: false,
                    relevance: 0,
                    value: escape$1(codeToHighlight),
                    emitter: emitter,
                    language: languageName,
                    top: top,
                    errorRaised: err
                };
            } else {
                throw err;
            }
        }
    }
    /**
   * returns a valid highlight result, without actually doing any actual work,
   * auto highlight starts with this and it's possible for small snippets that
   * auto-detection may not find a better match
   * @param {string} code
   * @returns {HighlightResult}
   */ function justTextHighlightResult(code) {
        const result = {
            relevance: 0,
            emitter: new options.__emitter(options),
            value: escape$1(code),
            illegal: false,
            top: PLAINTEXT_LANGUAGE
        };
        result.emitter.addText(code);
        return result;
    }
    /**
  Highlighting with language detection. Accepts a string with the code to
  highlight. Returns an object with the following properties:

  - language (detected language)
  - relevance (int)
  - value (an HTML string with highlighting markup)
  - second_best (object with the same structure for second-best heuristically
    detected language, may be absent)

    @param {string} code
    @param {Array<string>} [languageSubset]
    @returns {AutoHighlightResult}
  */ function highlightAuto(code, languageSubset) {
        languageSubset = languageSubset || options.languages || Object.keys(languages);
        const plaintext = justTextHighlightResult(code);
        const results = languageSubset.filter(getLanguage).filter(autoDetection).map((name)=>_highlight(name, code, false));
        results.unshift(plaintext); // plaintext is always an option
        const sorted = results.sort((a, b)=>{
            // sort base on relevance
            if (a.relevance !== b.relevance) return b.relevance - a.relevance;
            // always award the tie to the base language
            // ie if C++ and Arduino are tied, it's more likely to be C++
            if (a.language && b.language) {
                if (getLanguage(a.language).supersetOf === b.language) {
                    return 1;
                } else if (getLanguage(b.language).supersetOf === a.language) {
                    return -1;
                }
            }
            // otherwise say they are equal, which has the effect of sorting on
            // relevance while preserving the original ordering - which is how ties
            // have historically been settled, ie the language that comes first always
            // wins in the case of a tie
            return 0;
        });
        const [best, secondBest] = sorted;
        /** @type {AutoHighlightResult} */ const result = best;
        result.second_best = secondBest;
        return result;
    }
    /**
  Post-processing of the highlighted markup:

  - replace TABs with something more useful
  - replace real line-breaks with '<br>' for non-pre containers

    @param {string} html
    @returns {string}
  */ function fixMarkup(html) {
        if (!(options.tabReplace || options.useBR)) {
            return html;
        }
        return html.replace(fixMarkupRe, (match)=>{
            if (match === '\n') {
                return options.useBR ? '<br>' : match;
            } else if (options.tabReplace) {
                return match.replace(/\t/g, options.tabReplace);
            }
            return match;
        });
    }
    /**
   * Builds new class name for block given the language name
   *
   * @param {HTMLElement} element
   * @param {string} [currentLang]
   * @param {string} [resultLang]
   */ function updateClassName(element, currentLang, resultLang) {
        const language = currentLang ? aliases[currentLang] : resultLang;
        element.classList.add("hljs");
        if (language) element.classList.add(language);
    }
    /** @type {HLJSPlugin} */ const brPlugin = {
        "before:highlightElement": ({ el })=>{
            if (options.useBR) {
                el.innerHTML = el.innerHTML.replace(/\n/g, '').replace(/<br[ /]*>/g, '\n');
            }
        },
        "after:highlightElement": ({ result })=>{
            if (options.useBR) {
                result.value = result.value.replace(/\n/g, "<br>");
            }
        }
    };
    const TAB_REPLACE_RE = /^(<[^>]+>|\t)+/gm;
    /** @type {HLJSPlugin} */ const tabReplacePlugin = {
        "after:highlightElement": ({ result })=>{
            if (options.tabReplace) {
                result.value = result.value.replace(TAB_REPLACE_RE, (m)=>m.replace(/\t/g, options.tabReplace));
            }
        }
    };
    /**
   * Applies highlighting to a DOM node containing code. Accepts a DOM node and
   * two optional parameters for fixMarkup.
   *
   * @param {HighlightedHTMLElement} element - the HTML element to highlight
  */ function highlightElement(element) {
        /** @type HTMLElement */ let node = null;
        const language = blockLanguage(element);
        if (shouldNotHighlight(language)) return;
        // support for v10 API
        fire("before:highlightElement", {
            el: element,
            language: language
        });
        node = element;
        const text = node.textContent;
        const result = language ? highlight(text, {
            language,
            ignoreIllegals: true
        }) : highlightAuto(text);
        // support for v10 API
        fire("after:highlightElement", {
            el: element,
            result,
            text
        });
        element.innerHTML = result.value;
        updateClassName(element, language, result.language);
        element.result = {
            language: result.language,
            // TODO: remove with version 11.0
            re: result.relevance,
            relavance: result.relevance
        };
        if (result.second_best) {
            element.second_best = {
                language: result.second_best.language,
                // TODO: remove with version 11.0
                re: result.second_best.relevance,
                relavance: result.second_best.relevance
            };
        }
    }
    /**
   * Updates highlight.js global options with the passed options
   *
   * @param {Partial<HLJSOptions>} userOptions
   */ function configure(userOptions) {
        if (userOptions.useBR) {
            deprecated("10.3.0", "'useBR' will be removed entirely in v11.0");
            deprecated("10.3.0", "Please see https://github.com/highlightjs/highlight.js/issues/2559");
        }
        options = inherit$1(options, userOptions);
    }
    /**
   * Highlights to all <pre><code> blocks on a page
   *
   * @type {Function & {called?: boolean}}
   */ // TODO: remove v12, deprecated
    const initHighlighting = ()=>{
        if (initHighlighting.called) return;
        initHighlighting.called = true;
        deprecated("10.6.0", "initHighlighting() is deprecated.  Use highlightAll() instead.");
        const blocks = document.querySelectorAll('pre code');
        blocks.forEach(highlightElement);
    };
    // Higlights all when DOMContentLoaded fires
    // TODO: remove v12, deprecated
    function initHighlightingOnLoad() {
        deprecated("10.6.0", "initHighlightingOnLoad() is deprecated.  Use highlightAll() instead.");
        wantsHighlight = true;
    }
    let wantsHighlight = false;
    /**
   * auto-highlights all pre>code elements on the page
   */ function highlightAll() {
        // if we are called too early in the loading process
        if (document.readyState === "loading") {
            wantsHighlight = true;
            return;
        }
        const blocks = document.querySelectorAll('pre code');
        blocks.forEach(highlightElement);
    }
    function boot() {
        // if a highlight was requested before DOM was loaded, do now
        if (wantsHighlight) highlightAll();
    }
    // make sure we are in the browser environment
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    /**
   * Register a language grammar module
   *
   * @param {string} languageName
   * @param {LanguageFn} languageDefinition
   */ function registerLanguage(languageName, languageDefinition) {
        let lang = null;
        try {
            lang = languageDefinition(hljs);
        } catch (error$1) {
            error("Language definition for '{}' could not be registered.".replace("{}", languageName));
            // hard or soft error
            if (!SAFE_MODE) {
                throw error$1;
            } else {
                error(error$1);
            }
            // languages that have serious errors are replaced with essentially a
            // "plaintext" stand-in so that the code blocks will still get normal
            // css classes applied to them - and one bad language won't break the
            // entire highlighter
            lang = PLAINTEXT_LANGUAGE;
        }
        // give it a temporary name if it doesn't have one in the meta-data
        if (!lang.name) lang.name = languageName;
        languages[languageName] = lang;
        lang.rawDefinition = languageDefinition.bind(null, hljs);
        if (lang.aliases) {
            registerAliases(lang.aliases, {
                languageName
            });
        }
    }
    /**
   * Remove a language grammar module
   *
   * @param {string} languageName
   */ function unregisterLanguage(languageName) {
        delete languages[languageName];
        for (const alias of Object.keys(aliases)){
            if (aliases[alias] === languageName) {
                delete aliases[alias];
            }
        }
    }
    /**
   * @returns {string[]} List of language internal names
   */ function listLanguages() {
        return Object.keys(languages);
    }
    /**
    intended usage: When one language truly requires another

    Unlike `getLanguage`, this will throw when the requested language
    is not available.

    @param {string} name - name of the language to fetch/require
    @returns {Language | never}
  */ function requireLanguage(name) {
        deprecated("10.4.0", "requireLanguage will be removed entirely in v11.");
        deprecated("10.4.0", "Please see https://github.com/highlightjs/highlight.js/pull/2844");
        const lang = getLanguage(name);
        if (lang) {
            return lang;
        }
        const err = new Error('The \'{}\' language is required, but not loaded.'.replace('{}', name));
        throw err;
    }
    /**
   * @param {string} name - name of the language to retrieve
   * @returns {Language | undefined}
   */ function getLanguage(name) {
        name = (name || '').toLowerCase();
        return languages[name] || languages[aliases[name]];
    }
    /**
   *
   * @param {string|string[]} aliasList - single alias or list of aliases
   * @param {{languageName: string}} opts
   */ function registerAliases(aliasList, { languageName }) {
        if (typeof aliasList === 'string') {
            aliasList = [
                aliasList
            ];
        }
        aliasList.forEach((alias)=>{
            aliases[alias.toLowerCase()] = languageName;
        });
    }
    /**
   * Determines if a given language has auto-detection enabled
   * @param {string} name - name of the language
   */ function autoDetection(name) {
        const lang = getLanguage(name);
        return lang && !lang.disableAutodetect;
    }
    /**
   * Upgrades the old highlightBlock plugins to the new
   * highlightElement API
   * @param {HLJSPlugin} plugin
   */ function upgradePluginAPI(plugin) {
        // TODO: remove with v12
        if (plugin["before:highlightBlock"] && !plugin["before:highlightElement"]) {
            plugin["before:highlightElement"] = (data)=>{
                plugin["before:highlightBlock"](Object.assign({
                    block: data.el
                }, data));
            };
        }
        if (plugin["after:highlightBlock"] && !plugin["after:highlightElement"]) {
            plugin["after:highlightElement"] = (data)=>{
                plugin["after:highlightBlock"](Object.assign({
                    block: data.el
                }, data));
            };
        }
    }
    /**
   * @param {HLJSPlugin} plugin
   */ function addPlugin(plugin) {
        upgradePluginAPI(plugin);
        plugins.push(plugin);
    }
    /**
   *
   * @param {PluginEvent} event
   * @param {any} args
   */ function fire(event, args) {
        const cb = event;
        plugins.forEach(function(plugin) {
            if (plugin[cb]) {
                plugin[cb](args);
            }
        });
    }
    /**
  Note: fixMarkup is deprecated and will be removed entirely in v11

  @param {string} arg
  @returns {string}
  */ function deprecateFixMarkup(arg) {
        deprecated("10.2.0", "fixMarkup will be removed entirely in v11.0");
        deprecated("10.2.0", "Please see https://github.com/highlightjs/highlight.js/issues/2534");
        return fixMarkup(arg);
    }
    /**
   *
   * @param {HighlightedHTMLElement} el
   */ function deprecateHighlightBlock(el) {
        deprecated("10.7.0", "highlightBlock will be removed entirely in v12.0");
        deprecated("10.7.0", "Please use highlightElement now.");
        return highlightElement(el);
    }
    /* Interface definition */ Object.assign(hljs, {
        highlight,
        highlightAuto,
        highlightAll,
        fixMarkup: deprecateFixMarkup,
        highlightElement,
        // TODO: Remove with v12 API
        highlightBlock: deprecateHighlightBlock,
        configure,
        initHighlighting,
        initHighlightingOnLoad,
        registerLanguage,
        unregisterLanguage,
        listLanguages,
        getLanguage,
        registerAliases,
        requireLanguage,
        autoDetection,
        inherit: inherit$1,
        addPlugin,
        // plugins for frameworks
        vuePlugin: BuildVuePlugin(hljs).VuePlugin
    });
    hljs.debugMode = function() {
        SAFE_MODE = false;
    };
    hljs.safeMode = function() {
        SAFE_MODE = true;
    };
    hljs.versionString = version;
    for(const key in MODES){
        // @ts-ignore
        if (typeof MODES[key] === "object") {
            // @ts-ignore
            deepFreezeEs6(MODES[key]);
        }
    }
    // merge all the modes/regexs into our main object
    Object.assign(hljs, MODES);
    // built-in plugins, likely to be moved out of core in the future
    hljs.addPlugin(brPlugin); // slated to be removed in v11
    hljs.addPlugin(mergeHTMLPlugin);
    hljs.addPlugin(tabReplacePlugin);
    return hljs;
};
// export an "instance" of the highlighter
var highlight = HLJS({});
module.exports = highlight;
}),
"[project]/frontend-nextjs/node_modules/highlight.js/lib/languages/python.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

/**
 * @param {string} value
 * @returns {RegExp}
 * */ /**
 * @param {RegExp | string } re
 * @returns {string}
 */ function source(re) {
    if (!re) return null;
    if (typeof re === "string") return re;
    return re.source;
}
/**
 * @param {RegExp | string } re
 * @returns {string}
 */ function lookahead(re) {
    return concat('(?=', re, ')');
}
/**
 * @param {...(RegExp | string) } args
 * @returns {string}
 */ function concat(...args) {
    const joined = args.map((x)=>source(x)).join("");
    return joined;
}
/*
Language: Python
Description: Python is an interpreted, object-oriented, high-level programming language with dynamic semantics.
Website: https://www.python.org
Category: common
*/ function python(hljs) {
    const RESERVED_WORDS = [
        'and',
        'as',
        'assert',
        'async',
        'await',
        'break',
        'class',
        'continue',
        'def',
        'del',
        'elif',
        'else',
        'except',
        'finally',
        'for',
        'from',
        'global',
        'if',
        'import',
        'in',
        'is',
        'lambda',
        'nonlocal|10',
        'not',
        'or',
        'pass',
        'raise',
        'return',
        'try',
        'while',
        'with',
        'yield'
    ];
    const BUILT_INS = [
        '__import__',
        'abs',
        'all',
        'any',
        'ascii',
        'bin',
        'bool',
        'breakpoint',
        'bytearray',
        'bytes',
        'callable',
        'chr',
        'classmethod',
        'compile',
        'complex',
        'delattr',
        'dict',
        'dir',
        'divmod',
        'enumerate',
        'eval',
        'exec',
        'filter',
        'float',
        'format',
        'frozenset',
        'getattr',
        'globals',
        'hasattr',
        'hash',
        'help',
        'hex',
        'id',
        'input',
        'int',
        'isinstance',
        'issubclass',
        'iter',
        'len',
        'list',
        'locals',
        'map',
        'max',
        'memoryview',
        'min',
        'next',
        'object',
        'oct',
        'open',
        'ord',
        'pow',
        'print',
        'property',
        'range',
        'repr',
        'reversed',
        'round',
        'set',
        'setattr',
        'slice',
        'sorted',
        'staticmethod',
        'str',
        'sum',
        'super',
        'tuple',
        'type',
        'vars',
        'zip'
    ];
    const LITERALS = [
        '__debug__',
        'Ellipsis',
        'False',
        'None',
        'NotImplemented',
        'True'
    ];
    // https://docs.python.org/3/library/typing.html
    // TODO: Could these be supplemented by a CamelCase matcher in certain
    // contexts, leaving these remaining only for relevance hinting?
    const TYPES = [
        "Any",
        "Callable",
        "Coroutine",
        "Dict",
        "List",
        "Literal",
        "Generic",
        "Optional",
        "Sequence",
        "Set",
        "Tuple",
        "Type",
        "Union"
    ];
    const KEYWORDS = {
        $pattern: /[A-Za-z]\w+|__\w+__/,
        keyword: RESERVED_WORDS,
        built_in: BUILT_INS,
        literal: LITERALS,
        type: TYPES
    };
    const PROMPT = {
        className: 'meta',
        begin: /^(>>>|\.\.\.) /
    };
    const SUBST = {
        className: 'subst',
        begin: /\{/,
        end: /\}/,
        keywords: KEYWORDS,
        illegal: /#/
    };
    const LITERAL_BRACKET = {
        begin: /\{\{/,
        relevance: 0
    };
    const STRING = {
        className: 'string',
        contains: [
            hljs.BACKSLASH_ESCAPE
        ],
        variants: [
            {
                begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?'''/,
                end: /'''/,
                contains: [
                    hljs.BACKSLASH_ESCAPE,
                    PROMPT
                ],
                relevance: 10
            },
            {
                begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?"""/,
                end: /"""/,
                contains: [
                    hljs.BACKSLASH_ESCAPE,
                    PROMPT
                ],
                relevance: 10
            },
            {
                begin: /([fF][rR]|[rR][fF]|[fF])'''/,
                end: /'''/,
                contains: [
                    hljs.BACKSLASH_ESCAPE,
                    PROMPT,
                    LITERAL_BRACKET,
                    SUBST
                ]
            },
            {
                begin: /([fF][rR]|[rR][fF]|[fF])"""/,
                end: /"""/,
                contains: [
                    hljs.BACKSLASH_ESCAPE,
                    PROMPT,
                    LITERAL_BRACKET,
                    SUBST
                ]
            },
            {
                begin: /([uU]|[rR])'/,
                end: /'/,
                relevance: 10
            },
            {
                begin: /([uU]|[rR])"/,
                end: /"/,
                relevance: 10
            },
            {
                begin: /([bB]|[bB][rR]|[rR][bB])'/,
                end: /'/
            },
            {
                begin: /([bB]|[bB][rR]|[rR][bB])"/,
                end: /"/
            },
            {
                begin: /([fF][rR]|[rR][fF]|[fF])'/,
                end: /'/,
                contains: [
                    hljs.BACKSLASH_ESCAPE,
                    LITERAL_BRACKET,
                    SUBST
                ]
            },
            {
                begin: /([fF][rR]|[rR][fF]|[fF])"/,
                end: /"/,
                contains: [
                    hljs.BACKSLASH_ESCAPE,
                    LITERAL_BRACKET,
                    SUBST
                ]
            },
            hljs.APOS_STRING_MODE,
            hljs.QUOTE_STRING_MODE
        ]
    };
    // https://docs.python.org/3.9/reference/lexical_analysis.html#numeric-literals
    const digitpart = '[0-9](_?[0-9])*';
    const pointfloat = `(\\b(${digitpart}))?\\.(${digitpart})|\\b(${digitpart})\\.`;
    const NUMBER = {
        className: 'number',
        relevance: 0,
        variants: [
            // exponentfloat, pointfloat
            // https://docs.python.org/3.9/reference/lexical_analysis.html#floating-point-literals
            // optionally imaginary
            // https://docs.python.org/3.9/reference/lexical_analysis.html#imaginary-literals
            // Note: no leading \b because floats can start with a decimal point
            // and we don't want to mishandle e.g. `fn(.5)`,
            // no trailing \b for pointfloat because it can end with a decimal point
            // and we don't want to mishandle e.g. `0..hex()`; this should be safe
            // because both MUST contain a decimal point and so cannot be confused with
            // the interior part of an identifier
            {
                begin: `(\\b(${digitpart})|(${pointfloat}))[eE][+-]?(${digitpart})[jJ]?\\b`
            },
            {
                begin: `(${pointfloat})[jJ]?`
            },
            // decinteger, bininteger, octinteger, hexinteger
            // https://docs.python.org/3.9/reference/lexical_analysis.html#integer-literals
            // optionally "long" in Python 2
            // https://docs.python.org/2.7/reference/lexical_analysis.html#integer-and-long-integer-literals
            // decinteger is optionally imaginary
            // https://docs.python.org/3.9/reference/lexical_analysis.html#imaginary-literals
            {
                begin: '\\b([1-9](_?[0-9])*|0+(_?0)*)[lLjJ]?\\b'
            },
            {
                begin: '\\b0[bB](_?[01])+[lL]?\\b'
            },
            {
                begin: '\\b0[oO](_?[0-7])+[lL]?\\b'
            },
            {
                begin: '\\b0[xX](_?[0-9a-fA-F])+[lL]?\\b'
            },
            // imagnumber (digitpart-based)
            // https://docs.python.org/3.9/reference/lexical_analysis.html#imaginary-literals
            {
                begin: `\\b(${digitpart})[jJ]\\b`
            }
        ]
    };
    const COMMENT_TYPE = {
        className: "comment",
        begin: lookahead(/# type:/),
        end: /$/,
        keywords: KEYWORDS,
        contains: [
            {
                begin: /# type:/
            },
            // comment within a datatype comment includes no keywords
            {
                begin: /#/,
                end: /\b\B/,
                endsWithParent: true
            }
        ]
    };
    const PARAMS = {
        className: 'params',
        variants: [
            // Exclude params in functions without params
            {
                className: "",
                begin: /\(\s*\)/,
                skip: true
            },
            {
                begin: /\(/,
                end: /\)/,
                excludeBegin: true,
                excludeEnd: true,
                keywords: KEYWORDS,
                contains: [
                    'self',
                    PROMPT,
                    NUMBER,
                    STRING,
                    hljs.HASH_COMMENT_MODE
                ]
            }
        ]
    };
    SUBST.contains = [
        STRING,
        NUMBER,
        PROMPT
    ];
    return {
        name: 'Python',
        aliases: [
            'py',
            'gyp',
            'ipython'
        ],
        keywords: KEYWORDS,
        illegal: /(<\/|->|\?)|=>/,
        contains: [
            PROMPT,
            NUMBER,
            {
                // very common convention
                begin: /\bself\b/
            },
            {
                // eat "if" prior to string so that it won't accidentally be
                // labeled as an f-string
                beginKeywords: "if",
                relevance: 0
            },
            STRING,
            COMMENT_TYPE,
            hljs.HASH_COMMENT_MODE,
            {
                variants: [
                    {
                        className: 'function',
                        beginKeywords: 'def'
                    },
                    {
                        className: 'class',
                        beginKeywords: 'class'
                    }
                ],
                end: /:/,
                illegal: /[${=;\n,]/,
                contains: [
                    hljs.UNDERSCORE_TITLE_MODE,
                    PARAMS,
                    {
                        begin: /->/,
                        endsWithParent: true,
                        keywords: KEYWORDS
                    }
                ]
            },
            {
                className: 'meta',
                begin: /^[\t ]*@/,
                end: /(?=#)|$/,
                contains: [
                    NUMBER,
                    PARAMS,
                    STRING
                ]
            }
        ]
    };
}
module.exports = python;
}),
"[project]/frontend-nextjs/node_modules/highlight.js/lib/languages/r.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

/**
 * @param {string} value
 * @returns {RegExp}
 * */ /**
 * @param {RegExp | string } re
 * @returns {string}
 */ function source(re) {
    if (!re) return null;
    if (typeof re === "string") return re;
    return re.source;
}
/**
 * @param {RegExp | string } re
 * @returns {string}
 */ function lookahead(re) {
    return concat('(?=', re, ')');
}
/**
 * @param {...(RegExp | string) } args
 * @returns {string}
 */ function concat(...args) {
    const joined = args.map((x)=>source(x)).join("");
    return joined;
}
/*
Language: R
Description: R is a free software environment for statistical computing and graphics.
Author: Joe Cheng <joe@rstudio.org>
Contributors: Konrad Rudolph <konrad.rudolph@gmail.com>
Website: https://www.r-project.org
Category: common,scientific
*/ /** @type LanguageFn */ function r(hljs) {
    // Identifiers in R cannot start with `_`, but they can start with `.` if it
    // is not immediately followed by a digit.
    // R also supports quoted identifiers, which are near-arbitrary sequences
    // delimited by backticks (`…`), which may contain escape sequences. These are
    // handled in a separate mode. See `test/markup/r/names.txt` for examples.
    // FIXME: Support Unicode identifiers.
    const IDENT_RE = /(?:(?:[a-zA-Z]|\.[._a-zA-Z])[._a-zA-Z0-9]*)|\.(?!\d)/;
    const SIMPLE_IDENT = /[a-zA-Z][a-zA-Z_0-9]*/;
    return {
        name: 'R',
        // only in Haskell, not R
        illegal: /->/,
        keywords: {
            $pattern: IDENT_RE,
            keyword: 'function if in break next repeat else for while',
            literal: 'NULL NA TRUE FALSE Inf NaN NA_integer_|10 NA_real_|10 ' + 'NA_character_|10 NA_complex_|10',
            built_in: // Builtin constants
            'LETTERS letters month.abb month.name pi T F ' + // Primitive functions
            // These are all the functions in `base` that are implemented as a
            // `.Primitive`, minus those functions that are also keywords.
            'abs acos acosh all any anyNA Arg as.call as.character ' + 'as.complex as.double as.environment as.integer as.logical ' + 'as.null.default as.numeric as.raw asin asinh atan atanh attr ' + 'attributes baseenv browser c call ceiling class Conj cos cosh ' + 'cospi cummax cummin cumprod cumsum digamma dim dimnames ' + 'emptyenv exp expression floor forceAndCall gamma gc.time ' + 'globalenv Im interactive invisible is.array is.atomic is.call ' + 'is.character is.complex is.double is.environment is.expression ' + 'is.finite is.function is.infinite is.integer is.language ' + 'is.list is.logical is.matrix is.na is.name is.nan is.null ' + 'is.numeric is.object is.pairlist is.raw is.recursive is.single ' + 'is.symbol lazyLoadDBfetch length lgamma list log max min ' + 'missing Mod names nargs nzchar oldClass on.exit pos.to.env ' + 'proc.time prod quote range Re rep retracemem return round ' + 'seq_along seq_len seq.int sign signif sin sinh sinpi sqrt ' + 'standardGeneric substitute sum switch tan tanh tanpi tracemem ' + 'trigamma trunc unclass untracemem UseMethod xtfrm'
        },
        compilerExtensions: [
            // allow beforeMatch to act as a "qualifier" for the match
            // the full match begin must be [beforeMatch][begin]
            (mode, parent)=>{
                if (!mode.beforeMatch) return;
                // starts conflicts with endsParent which we need to make sure the child
                // rule is not matched multiple times
                if (mode.starts) throw new Error("beforeMatch cannot be used with starts");
                const originalMode = Object.assign({}, mode);
                Object.keys(mode).forEach((key)=>{
                    delete mode[key];
                });
                mode.begin = concat(originalMode.beforeMatch, lookahead(originalMode.begin));
                mode.starts = {
                    relevance: 0,
                    contains: [
                        Object.assign(originalMode, {
                            endsParent: true
                        })
                    ]
                };
                mode.relevance = 0;
                delete originalMode.beforeMatch;
            }
        ],
        contains: [
            // Roxygen comments
            hljs.COMMENT(/#'/, /$/, {
                contains: [
                    {
                        // Handle `@examples` separately to cause all subsequent code
                        // until the next `@`-tag on its own line to be kept as-is,
                        // preventing highlighting. This code is example R code, so nested
                        // doctags shouldn’t be treated as such. See
                        // `test/markup/r/roxygen.txt` for an example.
                        className: 'doctag',
                        begin: '@examples',
                        starts: {
                            contains: [
                                {
                                    begin: /\n/
                                },
                                {
                                    begin: /#'\s*(?=@[a-zA-Z]+)/,
                                    endsParent: true
                                },
                                {
                                    begin: /#'/,
                                    end: /$/,
                                    excludeBegin: true
                                }
                            ]
                        }
                    },
                    {
                        // Handle `@param` to highlight the parameter name following
                        // after.
                        className: 'doctag',
                        begin: '@param',
                        end: /$/,
                        contains: [
                            {
                                className: 'variable',
                                variants: [
                                    {
                                        begin: IDENT_RE
                                    },
                                    {
                                        begin: /`(?:\\.|[^`\\])+`/
                                    }
                                ],
                                endsParent: true
                            }
                        ]
                    },
                    {
                        className: 'doctag',
                        begin: /@[a-zA-Z]+/
                    },
                    {
                        className: 'meta-keyword',
                        begin: /\\[a-zA-Z]+/
                    }
                ]
            }),
            hljs.HASH_COMMENT_MODE,
            {
                className: 'string',
                contains: [
                    hljs.BACKSLASH_ESCAPE
                ],
                variants: [
                    hljs.END_SAME_AS_BEGIN({
                        begin: /[rR]"(-*)\(/,
                        end: /\)(-*)"/
                    }),
                    hljs.END_SAME_AS_BEGIN({
                        begin: /[rR]"(-*)\{/,
                        end: /\}(-*)"/
                    }),
                    hljs.END_SAME_AS_BEGIN({
                        begin: /[rR]"(-*)\[/,
                        end: /\](-*)"/
                    }),
                    hljs.END_SAME_AS_BEGIN({
                        begin: /[rR]'(-*)\(/,
                        end: /\)(-*)'/
                    }),
                    hljs.END_SAME_AS_BEGIN({
                        begin: /[rR]'(-*)\{/,
                        end: /\}(-*)'/
                    }),
                    hljs.END_SAME_AS_BEGIN({
                        begin: /[rR]'(-*)\[/,
                        end: /\](-*)'/
                    }),
                    {
                        begin: '"',
                        end: '"',
                        relevance: 0
                    },
                    {
                        begin: "'",
                        end: "'",
                        relevance: 0
                    }
                ]
            },
            {
                className: 'number',
                relevance: 0,
                beforeMatch: /([^a-zA-Z0-9._])/,
                variants: [
                    // TODO: replace with negative look-behind when available
                    // { begin: /(?<![a-zA-Z0-9._])0[xX][0-9a-fA-F]+\.[0-9a-fA-F]*[pP][+-]?\d+i?/ },
                    // { begin: /(?<![a-zA-Z0-9._])0[xX][0-9a-fA-F]+([pP][+-]?\d+)?[Li]?/ },
                    // { begin: /(?<![a-zA-Z0-9._])(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?[Li]?/ }
                    {
                        // Special case: only hexadecimal binary powers can contain fractions.
                        match: /0[xX][0-9a-fA-F]+\.[0-9a-fA-F]*[pP][+-]?\d+i?/
                    },
                    {
                        match: /0[xX][0-9a-fA-F]+([pP][+-]?\d+)?[Li]?/
                    },
                    {
                        match: /(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?[Li]?/
                    }
                ]
            },
            {
                // infix operator
                begin: '%',
                end: '%'
            },
            // relevance boost for assignment
            {
                begin: concat(SIMPLE_IDENT, "\\s+<-\\s+")
            },
            {
                // escaped identifier
                begin: '`',
                end: '`',
                contains: [
                    {
                        begin: /\\./
                    }
                ]
            }
        ]
    };
}
module.exports = r;
}),
"[project]/frontend-nextjs/node_modules/highlight.js/lib/languages/sas.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

/*
Language: SAS
Author: Mauricio Caceres <mauricio.caceres.bravo@gmail.com>
Description: Syntax Highlighting for SAS
*/ function sas(hljs) {
    // Data step and PROC SQL statements
    const SAS_KEYWORDS = 'do if then else end until while ' + '' + 'abort array attrib by call cards cards4 catname continue ' + 'datalines datalines4 delete delim delimiter display dm drop ' + 'endsas error file filename footnote format goto in infile ' + 'informat input keep label leave length libname link list ' + 'lostcard merge missing modify options output out page put ' + 'redirect remove rename replace retain return select set skip ' + 'startsas stop title update waitsas where window x systask ' + '' + 'add and alter as cascade check create delete describe ' + 'distinct drop foreign from group having index insert into in ' + 'key like message modify msgtype not null on or order primary ' + 'references reset restrict select set table unique update ' + 'validate view where';
    // Built-in SAS functions
    const SAS_FUN = 'abs|addr|airy|arcos|arsin|atan|attrc|attrn|band|' + 'betainv|blshift|bnot|bor|brshift|bxor|byte|cdf|ceil|' + 'cexist|cinv|close|cnonct|collate|compbl|compound|' + 'compress|cos|cosh|css|curobs|cv|daccdb|daccdbsl|' + 'daccsl|daccsyd|dacctab|dairy|date|datejul|datepart|' + 'datetime|day|dclose|depdb|depdbsl|depdbsl|depsl|' + 'depsl|depsyd|depsyd|deptab|deptab|dequote|dhms|dif|' + 'digamma|dim|dinfo|dnum|dopen|doptname|doptnum|dread|' + 'dropnote|dsname|erf|erfc|exist|exp|fappend|fclose|' + 'fcol|fdelete|fetch|fetchobs|fexist|fget|fileexist|' + 'filename|fileref|finfo|finv|fipname|fipnamel|' + 'fipstate|floor|fnonct|fnote|fopen|foptname|foptnum|' + 'fpoint|fpos|fput|fread|frewind|frlen|fsep|fuzz|' + 'fwrite|gaminv|gamma|getoption|getvarc|getvarn|hbound|' + 'hms|hosthelp|hour|ibessel|index|indexc|indexw|input|' + 'inputc|inputn|int|intck|intnx|intrr|irr|jbessel|' + 'juldate|kurtosis|lag|lbound|left|length|lgamma|' + 'libname|libref|log|log10|log2|logpdf|logpmf|logsdf|' + 'lowcase|max|mdy|mean|min|minute|mod|month|mopen|' + 'mort|n|netpv|nmiss|normal|note|npv|open|ordinal|' + 'pathname|pdf|peek|peekc|pmf|point|poisson|poke|' + 'probbeta|probbnml|probchi|probf|probgam|probhypr|' + 'probit|probnegb|probnorm|probt|put|putc|putn|qtr|' + 'quote|ranbin|rancau|ranexp|rangam|range|rank|rannor|' + 'ranpoi|rantbl|rantri|ranuni|repeat|resolve|reverse|' + 'rewind|right|round|saving|scan|sdf|second|sign|' + 'sin|sinh|skewness|soundex|spedis|sqrt|std|stderr|' + 'stfips|stname|stnamel|substr|sum|symget|sysget|' + 'sysmsg|sysprod|sysrc|system|tan|tanh|time|timepart|' + 'tinv|tnonct|today|translate|tranwrd|trigamma|' + 'trim|trimn|trunc|uniform|upcase|uss|var|varfmt|' + 'varinfmt|varlabel|varlen|varname|varnum|varray|' + 'varrayx|vartype|verify|vformat|vformatd|vformatdx|' + 'vformatn|vformatnx|vformatw|vformatwx|vformatx|' + 'vinarray|vinarrayx|vinformat|vinformatd|vinformatdx|' + 'vinformatn|vinformatnx|vinformatw|vinformatwx|' + 'vinformatx|vlabel|vlabelx|vlength|vlengthx|vname|' + 'vnamex|vtype|vtypex|weekday|year|yyq|zipfips|zipname|' + 'zipnamel|zipstate';
    // Built-in macro functions
    const SAS_MACRO_FUN = 'bquote|nrbquote|cmpres|qcmpres|compstor|' + 'datatyp|display|do|else|end|eval|global|goto|' + 'if|index|input|keydef|label|left|length|let|' + 'local|lowcase|macro|mend|nrbquote|nrquote|' + 'nrstr|put|qcmpres|qleft|qlowcase|qscan|' + 'qsubstr|qsysfunc|qtrim|quote|qupcase|scan|str|' + 'substr|superq|syscall|sysevalf|sysexec|sysfunc|' + 'sysget|syslput|sysprod|sysrc|sysrput|then|to|' + 'trim|unquote|until|upcase|verify|while|window';
    return {
        name: 'SAS',
        case_insensitive: true,
        keywords: {
            literal: 'null missing _all_ _automatic_ _character_ _infile_ ' + '_n_ _name_ _null_ _numeric_ _user_ _webout_',
            meta: SAS_KEYWORDS
        },
        contains: [
            {
                // Distinct highlight for proc <proc>, data, run, quit
                className: 'keyword',
                begin: /^\s*(proc [\w\d_]+|data|run|quit)[\s;]/
            },
            {
                // Macro variables
                className: 'variable',
                begin: /&[a-zA-Z_&][a-zA-Z0-9_]*\.?/
            },
            {
                // Special emphasis for datalines|cards
                className: 'emphasis',
                begin: /^\s*datalines|cards.*;/,
                end: /^\s*;\s*$/
            },
            {
                className: 'built_in',
                begin: '%(' + SAS_MACRO_FUN + ')'
            },
            {
                // User-defined macro functions highlighted after
                className: 'name',
                begin: /%[a-zA-Z_][a-zA-Z_0-9]*/
            },
            {
                className: 'meta',
                begin: '[^%](' + SAS_FUN + ')[\(]'
            },
            {
                className: 'string',
                variants: [
                    hljs.APOS_STRING_MODE,
                    hljs.QUOTE_STRING_MODE
                ]
            },
            hljs.COMMENT('\\*', ';'),
            hljs.C_BLOCK_COMMENT_MODE
        ]
    };
}
module.exports = sas;
}),
"[project]/frontend-nextjs/node_modules/highlight.js/lib/languages/sql.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

/**
 * @param {string} value
 * @returns {RegExp}
 * */ /**
 * @param {RegExp | string } re
 * @returns {string}
 */ function source(re) {
    if (!re) return null;
    if (typeof re === "string") return re;
    return re.source;
}
/**
 * @param {...(RegExp | string) } args
 * @returns {string}
 */ function concat(...args) {
    const joined = args.map((x)=>source(x)).join("");
    return joined;
}
/**
 * Any of the passed expresssions may match
 *
 * Creates a huge this | this | that | that match
 * @param {(RegExp | string)[] } args
 * @returns {string}
 */ function either(...args) {
    const joined = '(' + args.map((x)=>source(x)).join("|") + ")";
    return joined;
}
/*
 Language: SQL
 Website: https://en.wikipedia.org/wiki/SQL
 Category: common, database
 */ function sql(hljs) {
    const COMMENT_MODE = hljs.COMMENT('--', '$');
    const STRING = {
        className: 'string',
        variants: [
            {
                begin: /'/,
                end: /'/,
                contains: [
                    {
                        begin: /''/
                    }
                ]
            }
        ]
    };
    const QUOTED_IDENTIFIER = {
        begin: /"/,
        end: /"/,
        contains: [
            {
                begin: /""/
            }
        ]
    };
    const LITERALS = [
        "true",
        "false",
        // Not sure it's correct to call NULL literal, and clauses like IS [NOT] NULL look strange that way.
        // "null",
        "unknown"
    ];
    const MULTI_WORD_TYPES = [
        "double precision",
        "large object",
        "with timezone",
        "without timezone"
    ];
    const TYPES = [
        'bigint',
        'binary',
        'blob',
        'boolean',
        'char',
        'character',
        'clob',
        'date',
        'dec',
        'decfloat',
        'decimal',
        'float',
        'int',
        'integer',
        'interval',
        'nchar',
        'nclob',
        'national',
        'numeric',
        'real',
        'row',
        'smallint',
        'time',
        'timestamp',
        'varchar',
        'varying',
        'varbinary'
    ];
    const NON_RESERVED_WORDS = [
        "add",
        "asc",
        "collation",
        "desc",
        "final",
        "first",
        "last",
        "view"
    ];
    // https://jakewheat.github.io/sql-overview/sql-2016-foundation-grammar.html#reserved-word
    const RESERVED_WORDS = [
        "abs",
        "acos",
        "all",
        "allocate",
        "alter",
        "and",
        "any",
        "are",
        "array",
        "array_agg",
        "array_max_cardinality",
        "as",
        "asensitive",
        "asin",
        "asymmetric",
        "at",
        "atan",
        "atomic",
        "authorization",
        "avg",
        "begin",
        "begin_frame",
        "begin_partition",
        "between",
        "bigint",
        "binary",
        "blob",
        "boolean",
        "both",
        "by",
        "call",
        "called",
        "cardinality",
        "cascaded",
        "case",
        "cast",
        "ceil",
        "ceiling",
        "char",
        "char_length",
        "character",
        "character_length",
        "check",
        "classifier",
        "clob",
        "close",
        "coalesce",
        "collate",
        "collect",
        "column",
        "commit",
        "condition",
        "connect",
        "constraint",
        "contains",
        "convert",
        "copy",
        "corr",
        "corresponding",
        "cos",
        "cosh",
        "count",
        "covar_pop",
        "covar_samp",
        "create",
        "cross",
        "cube",
        "cume_dist",
        "current",
        "current_catalog",
        "current_date",
        "current_default_transform_group",
        "current_path",
        "current_role",
        "current_row",
        "current_schema",
        "current_time",
        "current_timestamp",
        "current_path",
        "current_role",
        "current_transform_group_for_type",
        "current_user",
        "cursor",
        "cycle",
        "date",
        "day",
        "deallocate",
        "dec",
        "decimal",
        "decfloat",
        "declare",
        "default",
        "define",
        "delete",
        "dense_rank",
        "deref",
        "describe",
        "deterministic",
        "disconnect",
        "distinct",
        "double",
        "drop",
        "dynamic",
        "each",
        "element",
        "else",
        "empty",
        "end",
        "end_frame",
        "end_partition",
        "end-exec",
        "equals",
        "escape",
        "every",
        "except",
        "exec",
        "execute",
        "exists",
        "exp",
        "external",
        "extract",
        "false",
        "fetch",
        "filter",
        "first_value",
        "float",
        "floor",
        "for",
        "foreign",
        "frame_row",
        "free",
        "from",
        "full",
        "function",
        "fusion",
        "get",
        "global",
        "grant",
        "group",
        "grouping",
        "groups",
        "having",
        "hold",
        "hour",
        "identity",
        "in",
        "indicator",
        "initial",
        "inner",
        "inout",
        "insensitive",
        "insert",
        "int",
        "integer",
        "intersect",
        "intersection",
        "interval",
        "into",
        "is",
        "join",
        "json_array",
        "json_arrayagg",
        "json_exists",
        "json_object",
        "json_objectagg",
        "json_query",
        "json_table",
        "json_table_primitive",
        "json_value",
        "lag",
        "language",
        "large",
        "last_value",
        "lateral",
        "lead",
        "leading",
        "left",
        "like",
        "like_regex",
        "listagg",
        "ln",
        "local",
        "localtime",
        "localtimestamp",
        "log",
        "log10",
        "lower",
        "match",
        "match_number",
        "match_recognize",
        "matches",
        "max",
        "member",
        "merge",
        "method",
        "min",
        "minute",
        "mod",
        "modifies",
        "module",
        "month",
        "multiset",
        "national",
        "natural",
        "nchar",
        "nclob",
        "new",
        "no",
        "none",
        "normalize",
        "not",
        "nth_value",
        "ntile",
        "null",
        "nullif",
        "numeric",
        "octet_length",
        "occurrences_regex",
        "of",
        "offset",
        "old",
        "omit",
        "on",
        "one",
        "only",
        "open",
        "or",
        "order",
        "out",
        "outer",
        "over",
        "overlaps",
        "overlay",
        "parameter",
        "partition",
        "pattern",
        "per",
        "percent",
        "percent_rank",
        "percentile_cont",
        "percentile_disc",
        "period",
        "portion",
        "position",
        "position_regex",
        "power",
        "precedes",
        "precision",
        "prepare",
        "primary",
        "procedure",
        "ptf",
        "range",
        "rank",
        "reads",
        "real",
        "recursive",
        "ref",
        "references",
        "referencing",
        "regr_avgx",
        "regr_avgy",
        "regr_count",
        "regr_intercept",
        "regr_r2",
        "regr_slope",
        "regr_sxx",
        "regr_sxy",
        "regr_syy",
        "release",
        "result",
        "return",
        "returns",
        "revoke",
        "right",
        "rollback",
        "rollup",
        "row",
        "row_number",
        "rows",
        "running",
        "savepoint",
        "scope",
        "scroll",
        "search",
        "second",
        "seek",
        "select",
        "sensitive",
        "session_user",
        "set",
        "show",
        "similar",
        "sin",
        "sinh",
        "skip",
        "smallint",
        "some",
        "specific",
        "specifictype",
        "sql",
        "sqlexception",
        "sqlstate",
        "sqlwarning",
        "sqrt",
        "start",
        "static",
        "stddev_pop",
        "stddev_samp",
        "submultiset",
        "subset",
        "substring",
        "substring_regex",
        "succeeds",
        "sum",
        "symmetric",
        "system",
        "system_time",
        "system_user",
        "table",
        "tablesample",
        "tan",
        "tanh",
        "then",
        "time",
        "timestamp",
        "timezone_hour",
        "timezone_minute",
        "to",
        "trailing",
        "translate",
        "translate_regex",
        "translation",
        "treat",
        "trigger",
        "trim",
        "trim_array",
        "true",
        "truncate",
        "uescape",
        "union",
        "unique",
        "unknown",
        "unnest",
        "update   ",
        "upper",
        "user",
        "using",
        "value",
        "values",
        "value_of",
        "var_pop",
        "var_samp",
        "varbinary",
        "varchar",
        "varying",
        "versioning",
        "when",
        "whenever",
        "where",
        "width_bucket",
        "window",
        "with",
        "within",
        "without",
        "year"
    ];
    // these are reserved words we have identified to be functions
    // and should only be highlighted in a dispatch-like context
    // ie, array_agg(...), etc.
    const RESERVED_FUNCTIONS = [
        "abs",
        "acos",
        "array_agg",
        "asin",
        "atan",
        "avg",
        "cast",
        "ceil",
        "ceiling",
        "coalesce",
        "corr",
        "cos",
        "cosh",
        "count",
        "covar_pop",
        "covar_samp",
        "cume_dist",
        "dense_rank",
        "deref",
        "element",
        "exp",
        "extract",
        "first_value",
        "floor",
        "json_array",
        "json_arrayagg",
        "json_exists",
        "json_object",
        "json_objectagg",
        "json_query",
        "json_table",
        "json_table_primitive",
        "json_value",
        "lag",
        "last_value",
        "lead",
        "listagg",
        "ln",
        "log",
        "log10",
        "lower",
        "max",
        "min",
        "mod",
        "nth_value",
        "ntile",
        "nullif",
        "percent_rank",
        "percentile_cont",
        "percentile_disc",
        "position",
        "position_regex",
        "power",
        "rank",
        "regr_avgx",
        "regr_avgy",
        "regr_count",
        "regr_intercept",
        "regr_r2",
        "regr_slope",
        "regr_sxx",
        "regr_sxy",
        "regr_syy",
        "row_number",
        "sin",
        "sinh",
        "sqrt",
        "stddev_pop",
        "stddev_samp",
        "substring",
        "substring_regex",
        "sum",
        "tan",
        "tanh",
        "translate",
        "translate_regex",
        "treat",
        "trim",
        "trim_array",
        "unnest",
        "upper",
        "value_of",
        "var_pop",
        "var_samp",
        "width_bucket"
    ];
    // these functions can
    const POSSIBLE_WITHOUT_PARENS = [
        "current_catalog",
        "current_date",
        "current_default_transform_group",
        "current_path",
        "current_role",
        "current_schema",
        "current_transform_group_for_type",
        "current_user",
        "session_user",
        "system_time",
        "system_user",
        "current_time",
        "localtime",
        "current_timestamp",
        "localtimestamp"
    ];
    // those exist to boost relevance making these very
    // "SQL like" keyword combos worth +1 extra relevance
    const COMBOS = [
        "create table",
        "insert into",
        "primary key",
        "foreign key",
        "not null",
        "alter table",
        "add constraint",
        "grouping sets",
        "on overflow",
        "character set",
        "respect nulls",
        "ignore nulls",
        "nulls first",
        "nulls last",
        "depth first",
        "breadth first"
    ];
    const FUNCTIONS = RESERVED_FUNCTIONS;
    const KEYWORDS = [
        ...RESERVED_WORDS,
        ...NON_RESERVED_WORDS
    ].filter((keyword)=>{
        return !RESERVED_FUNCTIONS.includes(keyword);
    });
    const VARIABLE = {
        className: "variable",
        begin: /@[a-z0-9]+/
    };
    const OPERATOR = {
        className: "operator",
        begin: /[-+*/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?/,
        relevance: 0
    };
    const FUNCTION_CALL = {
        begin: concat(/\b/, either(...FUNCTIONS), /\s*\(/),
        keywords: {
            built_in: FUNCTIONS
        }
    };
    // keywords with less than 3 letters are reduced in relevancy
    function reduceRelevancy(list, { exceptions, when } = {}) {
        const qualifyFn = when;
        exceptions = exceptions || [];
        return list.map((item)=>{
            if (item.match(/\|\d+$/) || exceptions.includes(item)) {
                return item;
            } else if (qualifyFn(item)) {
                return `${item}|0`;
            } else {
                return item;
            }
        });
    }
    return {
        name: 'SQL',
        case_insensitive: true,
        // does not include {} or HTML tags `</`
        illegal: /[{}]|<\//,
        keywords: {
            $pattern: /\b[\w\.]+/,
            keyword: reduceRelevancy(KEYWORDS, {
                when: (x)=>x.length < 3
            }),
            literal: LITERALS,
            type: TYPES,
            built_in: POSSIBLE_WITHOUT_PARENS
        },
        contains: [
            {
                begin: either(...COMBOS),
                keywords: {
                    $pattern: /[\w\.]+/,
                    keyword: KEYWORDS.concat(COMBOS),
                    literal: LITERALS,
                    type: TYPES
                }
            },
            {
                className: "type",
                begin: either(...MULTI_WORD_TYPES)
            },
            FUNCTION_CALL,
            VARIABLE,
            STRING,
            QUOTED_IDENTIFIER,
            hljs.C_NUMBER_MODE,
            hljs.C_BLOCK_COMMENT_MODE,
            COMMENT_MODE,
            OPERATOR
        ]
    };
}
module.exports = sql;
}),
"[project]/frontend-nextjs/node_modules/lowlight/lib/core.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var high = __turbopack_context__.r("[project]/frontend-nextjs/node_modules/highlight.js/lib/core.js [app-ssr] (ecmascript)");
var fault = __turbopack_context__.r("[project]/frontend-nextjs/node_modules/fault/index.js [app-ssr] (ecmascript)");
exports.highlight = highlight;
exports.highlightAuto = highlightAuto;
exports.registerLanguage = registerLanguage;
exports.listLanguages = listLanguages;
exports.registerAlias = registerAlias;
Emitter.prototype.addText = text;
Emitter.prototype.addKeyword = addKeyword;
Emitter.prototype.addSublanguage = addSublanguage;
Emitter.prototype.openNode = open;
Emitter.prototype.closeNode = close;
Emitter.prototype.closeAllNodes = noop;
Emitter.prototype.finalize = noop;
Emitter.prototype.toHTML = toHtmlNoop;
var defaultPrefix = 'hljs-';
// Highlighting `value` in the language `name`.
function highlight(name, value, options) {
    var before = high.configure({});
    var settings = options || {};
    var prefix = settings.prefix;
    var result;
    if (typeof name !== 'string') {
        throw fault('Expected `string` for name, got `%s`', name);
    }
    if (!high.getLanguage(name)) {
        throw fault('Unknown language: `%s` is not registered', name);
    }
    if (typeof value !== 'string') {
        throw fault('Expected `string` for value, got `%s`', value);
    }
    if (prefix === null || prefix === undefined) {
        prefix = defaultPrefix;
    }
    high.configure({
        __emitter: Emitter,
        classPrefix: prefix
    });
    result = high.highlight(value, {
        language: name,
        ignoreIllegals: true
    });
    high.configure(before || {});
    /* istanbul ignore if - Highlight.js seems to use this (currently) for broken
   * grammars, so let’s keep it in there just to be sure. */ if (result.errorRaised) {
        throw result.errorRaised;
    }
    return {
        relevance: result.relevance,
        language: result.language,
        value: result.emitter.rootNode.children
    };
}
function highlightAuto(value, options) {
    var settings = options || {};
    var subset = settings.subset || high.listLanguages();
    var prefix = settings.prefix;
    var length = subset.length;
    var index = -1;
    var result;
    var secondBest;
    var current;
    var name;
    if (prefix === null || prefix === undefined) {
        prefix = defaultPrefix;
    }
    if (typeof value !== 'string') {
        throw fault('Expected `string` for value, got `%s`', value);
    }
    secondBest = {
        relevance: 0,
        language: null,
        value: []
    };
    result = {
        relevance: 0,
        language: null,
        value: []
    };
    while(++index < length){
        name = subset[index];
        if (!high.getLanguage(name)) {
            continue;
        }
        current = highlight(name, value, options);
        current.language = name;
        if (current.relevance > secondBest.relevance) {
            secondBest = current;
        }
        if (current.relevance > result.relevance) {
            secondBest = result;
            result = current;
        }
    }
    if (secondBest.language) {
        result.secondBest = secondBest;
    }
    return result;
}
// Register a language.
function registerLanguage(name, syntax) {
    high.registerLanguage(name, syntax);
}
// Get a list of all registered languages.
function listLanguages() {
    return high.listLanguages();
}
// Register more aliases for an already registered language.
function registerAlias(name, alias) {
    var map = name;
    var key;
    if (alias) {
        map = {};
        map[name] = alias;
    }
    for(key in map){
        high.registerAliases(map[key], {
            languageName: key
        });
    }
}
function Emitter(options) {
    this.options = options;
    this.rootNode = {
        children: []
    };
    this.stack = [
        this.rootNode
    ];
}
function addKeyword(value, name) {
    this.openNode(name);
    this.addText(value);
    this.closeNode();
}
function addSublanguage(other, name) {
    var stack = this.stack;
    var current = stack[stack.length - 1];
    var results = other.rootNode.children;
    var node = name ? {
        type: 'element',
        tagName: 'span',
        properties: {
            className: [
                name
            ]
        },
        children: results
    } : results;
    current.children = current.children.concat(node);
}
function text(value) {
    var stack = this.stack;
    var current;
    var tail;
    if (value === '') return;
    current = stack[stack.length - 1];
    tail = current.children[current.children.length - 1];
    if (tail && tail.type === 'text') {
        tail.value += value;
    } else {
        current.children.push({
            type: 'text',
            value: value
        });
    }
}
function open(name) {
    var stack = this.stack;
    var className = this.options.classPrefix + name;
    var current = stack[stack.length - 1];
    var child = {
        type: 'element',
        tagName: 'span',
        properties: {
            className: [
                className
            ]
        },
        children: []
    };
    current.children.push(child);
    stack.push(child);
}
function close() {
    this.stack.pop();
}
function toHtmlNoop() {
    return '';
}
function noop() {}
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/check.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconData",
    ()=>__iconData,
    "default",
    ()=>Check
]);
/**
 * @license lucide-react v1.58.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-ssr] (ecmascript)");
;
const __iconData = {
    name: "check",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M20 6 9 17l-5-5",
                key: "1gmf2c"
            }
        ]
    ]
};
__iconData.node;
const Check = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/check.mjs [app-ssr] (ecmascript) <export default as Check>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Check",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/check.mjs [app-ssr] (ecmascript)");
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/chevron-down.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconData",
    ()=>__iconData,
    "default",
    ()=>ChevronDown
]);
/**
 * @license lucide-react v1.58.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-ssr] (ecmascript)");
;
const __iconData = {
    name: "chevron-down",
    size: 24,
    node: [
        [
            "path",
            {
                d: "m6 9 6 6 6-6",
                key: "qrunsl"
            }
        ]
    ]
};
__iconData.node;
const ChevronDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/chevron-down.mjs [app-ssr] (ecmascript) <export default as ChevronDown>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChevronDown",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/chevron-down.mjs [app-ssr] (ecmascript)");
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/circle-alert.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconData",
    ()=>__iconData,
    "default",
    ()=>CircleAlert
]);
/**
 * @license lucide-react v1.58.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-ssr] (ecmascript)");
;
const __iconData = {
    name: "circle-alert",
    size: 24,
    node: [
        [
            "circle",
            {
                cx: "12",
                cy: "12",
                r: "10",
                key: "1mglay"
            }
        ],
        [
            "line",
            {
                x1: "12",
                x2: "12",
                y1: "8",
                y2: "12",
                key: "1pkeuh"
            }
        ],
        [
            "line",
            {
                x1: "12",
                x2: "12.01",
                y1: "16",
                y2: "16",
                key: "4dfq90"
            }
        ]
    ],
    aliases: [
        "alert-circle"
    ]
};
__iconData.node;
const CircleAlert = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/circle-alert.mjs [app-ssr] (ecmascript) <export default as AlertCircle>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AlertCircle",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/circle-alert.mjs [app-ssr] (ecmascript)");
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/circle-check.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconData",
    ()=>__iconData,
    "default",
    ()=>CircleCheck
]);
/**
 * @license lucide-react v1.58.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-ssr] (ecmascript)");
;
const __iconData = {
    name: "circle-check",
    size: 24,
    node: [
        [
            "circle",
            {
                cx: "12",
                cy: "12",
                r: "10",
                key: "1mglay"
            }
        ],
        [
            "path",
            {
                d: "m16 9-5.5 5.5L8 12",
                key: "xofnsj"
            }
        ]
    ],
    aliases: [
        "check-circle-2"
    ]
};
__iconData.node;
const CircleCheck = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/circle-check.mjs [app-ssr] (ecmascript) <export default as CheckCircle2>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CheckCircle2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/circle-check.mjs [app-ssr] (ecmascript)");
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/circle-dot.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconData",
    ()=>__iconData,
    "default",
    ()=>CircleDot
]);
/**
 * @license lucide-react v1.58.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-ssr] (ecmascript)");
;
const __iconData = {
    name: "circle-dot",
    size: 24,
    node: [
        [
            "circle",
            {
                cx: "12",
                cy: "12",
                r: "1",
                key: "41hilf"
            }
        ],
        [
            "circle",
            {
                cx: "12",
                cy: "12",
                r: "10",
                key: "1mglay"
            }
        ]
    ]
};
__iconData.node;
const CircleDot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/circle-dot.mjs [app-ssr] (ecmascript) <export default as CircleDot>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CircleDot",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$dot$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$dot$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/circle-dot.mjs [app-ssr] (ecmascript)");
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/circle-x.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconData",
    ()=>__iconData,
    "default",
    ()=>CircleX
]);
/**
 * @license lucide-react v1.58.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-ssr] (ecmascript)");
;
const __iconData = {
    name: "circle-x",
    size: 24,
    node: [
        [
            "circle",
            {
                cx: "12",
                cy: "12",
                r: "10",
                key: "1mglay"
            }
        ],
        [
            "path",
            {
                d: "m15 9-6 6",
                key: "1uzhvr"
            }
        ],
        [
            "path",
            {
                d: "m9 9 6 6",
                key: "z0biqf"
            }
        ]
    ],
    aliases: [
        "x-circle"
    ]
};
__iconData.node;
const CircleX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/circle-x.mjs [app-ssr] (ecmascript) <export default as XCircle>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "XCircle",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/circle-x.mjs [app-ssr] (ecmascript)");
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/copy.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconData",
    ()=>__iconData,
    "default",
    ()=>Copy
]);
/**
 * @license lucide-react v1.58.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-ssr] (ecmascript)");
;
const __iconData = {
    name: "copy",
    size: 24,
    node: [
        [
            "rect",
            {
                width: "14",
                height: "14",
                x: "8",
                y: "8",
                rx: "2",
                ry: "2",
                key: "17jyea"
            }
        ],
        [
            "path",
            {
                d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
                key: "zix9uf"
            }
        ]
    ]
};
__iconData.node;
const Copy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/copy.mjs [app-ssr] (ecmascript) <export default as Copy>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Copy",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/copy.mjs [app-ssr] (ecmascript)");
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/download.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconData",
    ()=>__iconData,
    "default",
    ()=>Download
]);
/**
 * @license lucide-react v1.58.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-ssr] (ecmascript)");
;
const __iconData = {
    name: "download",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M12 15V3",
                key: "m9g1x1"
            }
        ],
        [
            "path",
            {
                d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
                key: "ih7n3h"
            }
        ],
        [
            "path",
            {
                d: "m7 10 5 5 5-5",
                key: "brsn70"
            }
        ]
    ]
};
__iconData.node;
const Download = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/download.mjs [app-ssr] (ecmascript) <export default as Download>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Download",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/download.mjs [app-ssr] (ecmascript)");
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/info.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconData",
    ()=>__iconData,
    "default",
    ()=>Info
]);
/**
 * @license lucide-react v1.58.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-ssr] (ecmascript)");
;
const __iconData = {
    name: "info",
    size: 24,
    node: [
        [
            "circle",
            {
                cx: "12",
                cy: "12",
                r: "10",
                key: "1mglay"
            }
        ],
        [
            "path",
            {
                d: "M12 16v-4",
                key: "1dtifu"
            }
        ],
        [
            "path",
            {
                d: "M12 8h.01",
                key: "e9boi3"
            }
        ]
    ]
};
__iconData.node;
const Info = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/info.mjs [app-ssr] (ecmascript) <export default as Info>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Info",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/info.mjs [app-ssr] (ecmascript)");
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/loader-circle.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconData",
    ()=>__iconData,
    "default",
    ()=>LoaderCircle
]);
/**
 * @license lucide-react v1.58.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-ssr] (ecmascript)");
;
const __iconData = {
    name: "loader-circle",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M21 12a9 9 0 1 1-6.219-8.56",
                key: "13zald"
            }
        ]
    ],
    aliases: [
        "loader-2"
    ]
};
__iconData.node;
const LoaderCircle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/loader-circle.mjs [app-ssr] (ecmascript) <export default as Loader2>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Loader2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/loader-circle.mjs [app-ssr] (ecmascript)");
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/maximize-2.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconData",
    ()=>__iconData,
    "default",
    ()=>Maximize2
]);
/**
 * @license lucide-react v1.58.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-ssr] (ecmascript)");
;
const __iconData = {
    name: "maximize-2",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M15 3h6v6",
                key: "1q9fwt"
            }
        ],
        [
            "path",
            {
                d: "m21 3-7 7",
                key: "1l2asr"
            }
        ],
        [
            "path",
            {
                d: "m3 21 7-7",
                key: "tjx5ai"
            }
        ],
        [
            "path",
            {
                d: "M9 21H3v-6",
                key: "wtvkvv"
            }
        ]
    ]
};
__iconData.node;
const Maximize2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/maximize-2.mjs [app-ssr] (ecmascript) <export default as Maximize2>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Maximize2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/maximize-2.mjs [app-ssr] (ecmascript)");
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/minimize-2.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconData",
    ()=>__iconData,
    "default",
    ()=>Minimize2
]);
/**
 * @license lucide-react v1.58.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-ssr] (ecmascript)");
;
const __iconData = {
    name: "minimize-2",
    size: 24,
    node: [
        [
            "path",
            {
                d: "m14 10 7-7",
                key: "oa77jy"
            }
        ],
        [
            "path",
            {
                d: "M20 10h-6V4",
                key: "mjg0md"
            }
        ],
        [
            "path",
            {
                d: "m3 21 7-7",
                key: "tjx5ai"
            }
        ],
        [
            "path",
            {
                d: "M4 14h6v6",
                key: "rmj7iw"
            }
        ]
    ]
};
__iconData.node;
const Minimize2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/minimize-2.mjs [app-ssr] (ecmascript) <export default as Minimize2>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Minimize2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minimize$2d$2$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minimize$2d$2$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/minimize-2.mjs [app-ssr] (ecmascript)");
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/play.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconData",
    ()=>__iconData,
    "default",
    ()=>Play
]);
/**
 * @license lucide-react v1.58.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-ssr] (ecmascript)");
;
const __iconData = {
    name: "play",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
                key: "10ikf1"
            }
        ]
    ]
};
__iconData.node;
const Play = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/play.mjs [app-ssr] (ecmascript) <export default as Play>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Play",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/play.mjs [app-ssr] (ecmascript)");
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/shield-check.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconData",
    ()=>__iconData,
    "default",
    ()=>ShieldCheck
]);
/**
 * @license lucide-react v1.58.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-ssr] (ecmascript)");
;
const __iconData = {
    name: "shield-check",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
                key: "oel41y"
            }
        ],
        [
            "path",
            {
                d: "m9 12 2 2 4-4",
                key: "dzmm74"
            }
        ]
    ]
};
__iconData.node;
const ShieldCheck = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/shield-check.mjs [app-ssr] (ecmascript) <export default as ShieldCheck>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ShieldCheck",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/shield-check.mjs [app-ssr] (ecmascript)");
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/sparkles.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconData",
    ()=>__iconData,
    "default",
    ()=>Sparkles
]);
/**
 * @license lucide-react v1.58.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-ssr] (ecmascript)");
;
const __iconData = {
    name: "sparkles",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
                key: "1s2grr"
            }
        ],
        [
            "path",
            {
                d: "M20 2v4",
                key: "1rf3ol"
            }
        ],
        [
            "path",
            {
                d: "M22 4h-4",
                key: "gwowj6"
            }
        ],
        [
            "circle",
            {
                cx: "4",
                cy: "20",
                r: "2",
                key: "6kqj1y"
            }
        ]
    ],
    aliases: [
        "stars"
    ]
};
__iconData.node;
const Sparkles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/sparkles.mjs [app-ssr] (ecmascript) <export default as Sparkles>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Sparkles",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/sparkles.mjs [app-ssr] (ecmascript)");
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/text-wrap.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconData",
    ()=>__iconData,
    "default",
    ()=>TextWrap
]);
/**
 * @license lucide-react v1.58.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-ssr] (ecmascript)");
;
const __iconData = {
    name: "text-wrap",
    size: 24,
    node: [
        [
            "path",
            {
                d: "m16 16-3 3 3 3",
                key: "117b85"
            }
        ],
        [
            "path",
            {
                d: "M3 12h14.5a1 1 0 0 1 0 7H13",
                key: "18xa6z"
            }
        ],
        [
            "path",
            {
                d: "M3 19h6",
                key: "1ygdsz"
            }
        ],
        [
            "path",
            {
                d: "M3 5h18",
                key: "1u36vt"
            }
        ]
    ],
    aliases: [
        "wrap-text"
    ]
};
__iconData.node;
const TextWrap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/text-wrap.mjs [app-ssr] (ecmascript) <export default as WrapText>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WrapText",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$text$2d$wrap$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$text$2d$wrap$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/text-wrap.mjs [app-ssr] (ecmascript)");
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/triangle-alert.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconData",
    ()=>__iconData,
    "default",
    ()=>TriangleAlert
]);
/**
 * @license lucide-react v1.58.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-ssr] (ecmascript)");
;
const __iconData = {
    name: "triangle-alert",
    size: 24,
    node: [
        [
            "path",
            {
                d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
                key: "wmoenq"
            }
        ],
        [
            "path",
            {
                d: "M12 9v4",
                key: "juzpu7"
            }
        ],
        [
            "path",
            {
                d: "M12 17h.01",
                key: "p32p05"
            }
        ]
    ],
    aliases: [
        "alert-triangle"
    ]
};
__iconData.node;
const TriangleAlert = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/triangle-alert.mjs [app-ssr] (ecmascript) <export default as AlertTriangle>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AlertTriangle",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/triangle-alert.mjs [app-ssr] (ecmascript)");
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/wand-sparkles.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconData",
    ()=>__iconData,
    "default",
    ()=>WandSparkles
]);
/**
 * @license lucide-react v1.58.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-ssr] (ecmascript)");
;
const __iconData = {
    name: "wand-sparkles",
    size: 24,
    node: [
        [
            "path",
            {
                d: "m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72",
                key: "ul74o6"
            }
        ],
        [
            "path",
            {
                d: "m14 7 3 3",
                key: "1r5n42"
            }
        ],
        [
            "path",
            {
                d: "M5 6v4",
                key: "ilb8ba"
            }
        ],
        [
            "path",
            {
                d: "M19 14v4",
                key: "blhpug"
            }
        ],
        [
            "path",
            {
                d: "M10 2v2",
                key: "7u0qdc"
            }
        ],
        [
            "path",
            {
                d: "M7 8H3",
                key: "zfb6yr"
            }
        ],
        [
            "path",
            {
                d: "M21 16h-4",
                key: "1cnmox"
            }
        ],
        [
            "path",
            {
                d: "M11 3H9",
                key: "1obp7u"
            }
        ]
    ],
    aliases: [
        "wand-2"
    ]
};
__iconData.node;
const WandSparkles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/wand-sparkles.mjs [app-ssr] (ecmascript) <export default as Wand2>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Wand2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wand$2d$sparkles$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wand$2d$sparkles$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/wand-sparkles.mjs [app-ssr] (ecmascript)");
}),
"[project]/frontend-nextjs/node_modules/react-syntax-highlighter/dist/esm/checkForListedLanguage.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = function(astGenerator, language) {
    var langs = astGenerator.listLanguages();
    return langs.indexOf(language) !== -1;
};
}),
"[project]/frontend-nextjs/node_modules/react-syntax-highlighter/dist/esm/create-element.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createChildren",
    ()=>createChildren,
    "createClassNameString",
    ()=>createClassNameString,
    "createStyleObject",
    ()=>createStyleObject,
    "default",
    ()=>createElement
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$extends$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/@babel/runtime/helpers/extends.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$defineProperty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/@babel/runtime/helpers/defineProperty.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function(r) {
            return Object.getOwnPropertyDescriptor(e, r).enumerable;
        })), t.push.apply(t, o);
    }
    return t;
}
function _objectSpread(e) {
    for(var r = 1; r < arguments.length; r++){
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$defineProperty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(e, r, t[r]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
        });
    }
    return e;
}
;
// Get all possible permutations of all power sets
//
// Super simple, non-algorithmic solution since the
// number of class names will not be greater than 4
function powerSetPermutations(arr) {
    var arrLength = arr.length;
    if (arrLength === 0 || arrLength === 1) return arr;
    if (arrLength === 2) {
        // prettier-ignore
        return [
            arr[0],
            arr[1],
            "".concat(arr[0], ".").concat(arr[1]),
            "".concat(arr[1], ".").concat(arr[0])
        ];
    }
    if (arrLength === 3) {
        return [
            arr[0],
            arr[1],
            arr[2],
            "".concat(arr[0], ".").concat(arr[1]),
            "".concat(arr[0], ".").concat(arr[2]),
            "".concat(arr[1], ".").concat(arr[0]),
            "".concat(arr[1], ".").concat(arr[2]),
            "".concat(arr[2], ".").concat(arr[0]),
            "".concat(arr[2], ".").concat(arr[1]),
            "".concat(arr[0], ".").concat(arr[1], ".").concat(arr[2]),
            "".concat(arr[0], ".").concat(arr[2], ".").concat(arr[1]),
            "".concat(arr[1], ".").concat(arr[0], ".").concat(arr[2]),
            "".concat(arr[1], ".").concat(arr[2], ".").concat(arr[0]),
            "".concat(arr[2], ".").concat(arr[0], ".").concat(arr[1]),
            "".concat(arr[2], ".").concat(arr[1], ".").concat(arr[0])
        ];
    }
    if (arrLength >= 4) {
        // Currently does not support more than 4 extra
        // class names (after `.token` has been removed)
        return [
            arr[0],
            arr[1],
            arr[2],
            arr[3],
            "".concat(arr[0], ".").concat(arr[1]),
            "".concat(arr[0], ".").concat(arr[2]),
            "".concat(arr[0], ".").concat(arr[3]),
            "".concat(arr[1], ".").concat(arr[0]),
            "".concat(arr[1], ".").concat(arr[2]),
            "".concat(arr[1], ".").concat(arr[3]),
            "".concat(arr[2], ".").concat(arr[0]),
            "".concat(arr[2], ".").concat(arr[1]),
            "".concat(arr[2], ".").concat(arr[3]),
            "".concat(arr[3], ".").concat(arr[0]),
            "".concat(arr[3], ".").concat(arr[1]),
            "".concat(arr[3], ".").concat(arr[2]),
            "".concat(arr[0], ".").concat(arr[1], ".").concat(arr[2]),
            "".concat(arr[0], ".").concat(arr[1], ".").concat(arr[3]),
            "".concat(arr[0], ".").concat(arr[2], ".").concat(arr[1]),
            "".concat(arr[0], ".").concat(arr[2], ".").concat(arr[3]),
            "".concat(arr[0], ".").concat(arr[3], ".").concat(arr[1]),
            "".concat(arr[0], ".").concat(arr[3], ".").concat(arr[2]),
            "".concat(arr[1], ".").concat(arr[0], ".").concat(arr[2]),
            "".concat(arr[1], ".").concat(arr[0], ".").concat(arr[3]),
            "".concat(arr[1], ".").concat(arr[2], ".").concat(arr[0]),
            "".concat(arr[1], ".").concat(arr[2], ".").concat(arr[3]),
            "".concat(arr[1], ".").concat(arr[3], ".").concat(arr[0]),
            "".concat(arr[1], ".").concat(arr[3], ".").concat(arr[2]),
            "".concat(arr[2], ".").concat(arr[0], ".").concat(arr[1]),
            "".concat(arr[2], ".").concat(arr[0], ".").concat(arr[3]),
            "".concat(arr[2], ".").concat(arr[1], ".").concat(arr[0]),
            "".concat(arr[2], ".").concat(arr[1], ".").concat(arr[3]),
            "".concat(arr[2], ".").concat(arr[3], ".").concat(arr[0]),
            "".concat(arr[2], ".").concat(arr[3], ".").concat(arr[1]),
            "".concat(arr[3], ".").concat(arr[0], ".").concat(arr[1]),
            "".concat(arr[3], ".").concat(arr[0], ".").concat(arr[2]),
            "".concat(arr[3], ".").concat(arr[1], ".").concat(arr[0]),
            "".concat(arr[3], ".").concat(arr[1], ".").concat(arr[2]),
            "".concat(arr[3], ".").concat(arr[2], ".").concat(arr[0]),
            "".concat(arr[3], ".").concat(arr[2], ".").concat(arr[1]),
            "".concat(arr[0], ".").concat(arr[1], ".").concat(arr[2], ".").concat(arr[3]),
            "".concat(arr[0], ".").concat(arr[1], ".").concat(arr[3], ".").concat(arr[2]),
            "".concat(arr[0], ".").concat(arr[2], ".").concat(arr[1], ".").concat(arr[3]),
            "".concat(arr[0], ".").concat(arr[2], ".").concat(arr[3], ".").concat(arr[1]),
            "".concat(arr[0], ".").concat(arr[3], ".").concat(arr[1], ".").concat(arr[2]),
            "".concat(arr[0], ".").concat(arr[3], ".").concat(arr[2], ".").concat(arr[1]),
            "".concat(arr[1], ".").concat(arr[0], ".").concat(arr[2], ".").concat(arr[3]),
            "".concat(arr[1], ".").concat(arr[0], ".").concat(arr[3], ".").concat(arr[2]),
            "".concat(arr[1], ".").concat(arr[2], ".").concat(arr[0], ".").concat(arr[3]),
            "".concat(arr[1], ".").concat(arr[2], ".").concat(arr[3], ".").concat(arr[0]),
            "".concat(arr[1], ".").concat(arr[3], ".").concat(arr[0], ".").concat(arr[2]),
            "".concat(arr[1], ".").concat(arr[3], ".").concat(arr[2], ".").concat(arr[0]),
            "".concat(arr[2], ".").concat(arr[0], ".").concat(arr[1], ".").concat(arr[3]),
            "".concat(arr[2], ".").concat(arr[0], ".").concat(arr[3], ".").concat(arr[1]),
            "".concat(arr[2], ".").concat(arr[1], ".").concat(arr[0], ".").concat(arr[3]),
            "".concat(arr[2], ".").concat(arr[1], ".").concat(arr[3], ".").concat(arr[0]),
            "".concat(arr[2], ".").concat(arr[3], ".").concat(arr[0], ".").concat(arr[1]),
            "".concat(arr[2], ".").concat(arr[3], ".").concat(arr[1], ".").concat(arr[0]),
            "".concat(arr[3], ".").concat(arr[0], ".").concat(arr[1], ".").concat(arr[2]),
            "".concat(arr[3], ".").concat(arr[0], ".").concat(arr[2], ".").concat(arr[1]),
            "".concat(arr[3], ".").concat(arr[1], ".").concat(arr[0], ".").concat(arr[2]),
            "".concat(arr[3], ".").concat(arr[1], ".").concat(arr[2], ".").concat(arr[0]),
            "".concat(arr[3], ".").concat(arr[2], ".").concat(arr[0], ".").concat(arr[1]),
            "".concat(arr[3], ".").concat(arr[2], ".").concat(arr[1], ".").concat(arr[0])
        ];
    }
}
var classNameCombinations = {};
function getClassNameCombinations(classNames) {
    if (classNames.length === 0 || classNames.length === 1) return classNames;
    var key = classNames.join('.');
    if (!classNameCombinations[key]) {
        classNameCombinations[key] = powerSetPermutations(classNames);
    }
    return classNameCombinations[key];
}
function createStyleObject(classNames) {
    var elementStyle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var stylesheet = arguments.length > 2 ? arguments[2] : undefined;
    var nonTokenClassNames = classNames.filter(function(className) {
        return className !== 'token';
    });
    var classNamesCombinations = getClassNameCombinations(nonTokenClassNames);
    return classNamesCombinations.reduce(function(styleObject, className) {
        return _objectSpread(_objectSpread({}, styleObject), stylesheet[className]);
    }, elementStyle);
}
function createClassNameString(classNames) {
    return classNames.join(' ');
}
function createChildren(stylesheet, useInlineStyles) {
    var childrenCount = 0;
    return function(children) {
        childrenCount += 1;
        return children.map(function(child, i) {
            return createElement({
                node: child,
                stylesheet: stylesheet,
                useInlineStyles: useInlineStyles,
                key: "code-segment-".concat(childrenCount, "-").concat(i)
            });
        });
    };
}
function createElement(_ref) {
    var node = _ref.node, stylesheet = _ref.stylesheet, _ref$style = _ref.style, style = _ref$style === void 0 ? {} : _ref$style, useInlineStyles = _ref.useInlineStyles, key = _ref.key;
    var properties = node.properties, type = node.type, TagName = node.tagName, value = node.value;
    if (type === 'text') {
        return value;
    } else if (TagName) {
        var childrenCreator = createChildren(stylesheet, useInlineStyles);
        var props;
        if (!useInlineStyles) {
            props = _objectSpread(_objectSpread({}, properties), {}, {
                className: createClassNameString(properties.className)
            });
        } else {
            var allStylesheetSelectors = Object.keys(stylesheet).reduce(function(classes, selector) {
                selector.split('.').forEach(function(className) {
                    if (!classes.includes(className)) classes.push(className);
                });
                return classes;
            }, []);
            // For compatibility with older versions of react-syntax-highlighter
            var startingClassName = properties.className && properties.className.includes('token') ? [
                'token'
            ] : [];
            var className = properties.className && startingClassName.concat(properties.className.filter(function(className) {
                return !allStylesheetSelectors.includes(className);
            }));
            props = _objectSpread(_objectSpread({}, properties), {}, {
                className: createClassNameString(className) || undefined,
                style: createStyleObject(properties.className, Object.assign({}, properties.style, style), stylesheet)
            });
        }
        var children = childrenCreator(node.children);
        return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(TagName, (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$extends$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])({
            key: key
        }, props), children);
    }
}
}),
"[project]/frontend-nextjs/node_modules/react-syntax-highlighter/dist/esm/highlight.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$objectWithoutProperties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/@babel/runtime/helpers/objectWithoutProperties.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$toConsumableArray$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/@babel/runtime/helpers/toConsumableArray.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$defineProperty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/@babel/runtime/helpers/defineProperty.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$react$2d$syntax$2d$highlighter$2f$dist$2f$esm$2f$create$2d$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/react-syntax-highlighter/dist/esm/create-element.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$react$2d$syntax$2d$highlighter$2f$dist$2f$esm$2f$checkForListedLanguage$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/react-syntax-highlighter/dist/esm/checkForListedLanguage.js [app-ssr] (ecmascript)");
;
;
;
var _excluded = [
    "language",
    "children",
    "style",
    "customStyle",
    "codeTagProps",
    "useInlineStyles",
    "showLineNumbers",
    "showInlineLineNumbers",
    "startingLineNumber",
    "lineNumberContainerStyle",
    "lineNumberStyle",
    "wrapLines",
    "wrapLongLines",
    "lineProps",
    "renderer",
    "PreTag",
    "CodeTag",
    "code",
    "astGenerator"
];
function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function(r) {
            return Object.getOwnPropertyDescriptor(e, r).enumerable;
        })), t.push.apply(t, o);
    }
    return t;
}
function _objectSpread(e) {
    for(var r = 1; r < arguments.length; r++){
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$defineProperty$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(e, r, t[r]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
        });
    }
    return e;
}
;
;
;
var newLineRegex = /\n/g;
function getNewLines(str) {
    return str.match(newLineRegex);
}
function getAllLineNumbers(_ref) {
    var lines = _ref.lines, startingLineNumber = _ref.startingLineNumber, style = _ref.style;
    return lines.map(function(_, i) {
        var number = i + startingLineNumber;
        return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("span", {
            key: "line-".concat(i),
            className: "react-syntax-highlighter-line-number",
            style: typeof style === 'function' ? style(number) : style
        }, "".concat(number, "\n"));
    });
}
function AllLineNumbers(_ref2) {
    var codeString = _ref2.codeString, codeStyle = _ref2.codeStyle, _ref2$containerStyle = _ref2.containerStyle, containerStyle = _ref2$containerStyle === void 0 ? {
        "float": 'left',
        paddingRight: '10px'
    } : _ref2$containerStyle, _ref2$numberStyle = _ref2.numberStyle, numberStyle = _ref2$numberStyle === void 0 ? {} : _ref2$numberStyle, startingLineNumber = _ref2.startingLineNumber;
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("code", {
        style: Object.assign({}, codeStyle, containerStyle)
    }, getAllLineNumbers({
        lines: codeString.replace(/\n$/, '').split('\n'),
        style: numberStyle,
        startingLineNumber: startingLineNumber
    }));
}
function getEmWidthOfNumber(num) {
    return "".concat(num.toString().length, ".25em");
}
function getInlineLineNumber(lineNumber, inlineLineNumberStyle) {
    return {
        type: 'element',
        tagName: 'span',
        properties: {
            key: "line-number--".concat(lineNumber),
            className: [
                'comment',
                'linenumber',
                'react-syntax-highlighter-line-number'
            ],
            style: inlineLineNumberStyle
        },
        children: [
            {
                type: 'text',
                value: lineNumber
            }
        ]
    };
}
function assembleLineNumberStyles(lineNumberStyle, lineNumber, largestLineNumber) {
    // minimally necessary styling for line numbers
    var defaultLineNumberStyle = {
        display: 'inline-block',
        minWidth: getEmWidthOfNumber(largestLineNumber),
        paddingRight: '1em',
        textAlign: 'right',
        userSelect: 'none'
    };
    // prep custom styling
    var customLineNumberStyle = typeof lineNumberStyle === 'function' ? lineNumberStyle(lineNumber) : lineNumberStyle;
    // combine
    var assembledStyle = _objectSpread(_objectSpread({}, defaultLineNumberStyle), customLineNumberStyle);
    return assembledStyle;
}
function createLineElement(_ref3) {
    var children = _ref3.children, lineNumber = _ref3.lineNumber, lineNumberStyle = _ref3.lineNumberStyle, largestLineNumber = _ref3.largestLineNumber, showInlineLineNumbers = _ref3.showInlineLineNumbers, _ref3$lineProps = _ref3.lineProps, lineProps = _ref3$lineProps === void 0 ? {} : _ref3$lineProps, _ref3$className = _ref3.className, className = _ref3$className === void 0 ? [] : _ref3$className, showLineNumbers = _ref3.showLineNumbers, wrapLongLines = _ref3.wrapLongLines, _ref3$wrapLines = _ref3.wrapLines, wrapLines = _ref3$wrapLines === void 0 ? false : _ref3$wrapLines;
    var properties = wrapLines ? _objectSpread({}, typeof lineProps === 'function' ? lineProps(lineNumber) : lineProps) : {};
    properties['className'] = properties['className'] ? [].concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$toConsumableArray$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(properties['className'].trim().split(/\s+/)), (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$toConsumableArray$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(className)) : className;
    if (lineNumber && showInlineLineNumbers) {
        var inlineLineNumberStyle = assembleLineNumberStyles(lineNumberStyle, lineNumber, largestLineNumber);
        children.unshift(getInlineLineNumber(lineNumber, inlineLineNumberStyle));
    }
    if (wrapLongLines & showLineNumbers) {
        properties.style = _objectSpread({
            display: 'flex'
        }, properties.style);
    }
    return {
        type: 'element',
        tagName: 'span',
        properties: properties,
        children: children
    };
}
function flattenCodeTree(tree) {
    var className = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var newTree = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    if (tree.length === undefined) {
        tree = [
            tree
        ];
    }
    for(var i = 0; i < tree.length; i++){
        var node = tree[i];
        if (node.type === 'text') {
            newTree.push(createLineElement({
                children: [
                    node
                ],
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$toConsumableArray$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(new Set(className))
            }));
        } else if (node.children) {
            var _node$properties;
            var classNames = className.concat(((_node$properties = node.properties) === null || _node$properties === void 0 ? void 0 : _node$properties.className) || []);
            flattenCodeTree(node.children, classNames).forEach(function(i) {
                return newTree.push(i);
            });
        }
    }
    return newTree;
}
function processLines(codeTree, wrapLines, lineProps, showLineNumbers, showInlineLineNumbers, startingLineNumber, largestLineNumber, lineNumberStyle, wrapLongLines) {
    var _ref4;
    var tree = flattenCodeTree(codeTree.value);
    var newTree = [];
    var lastLineBreakIndex = -1;
    var index = 0;
    function createWrappedLine(children, lineNumber) {
        var className = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
        return createLineElement({
            children: children,
            lineNumber: lineNumber,
            lineNumberStyle: lineNumberStyle,
            largestLineNumber: largestLineNumber,
            showInlineLineNumbers: showInlineLineNumbers,
            lineProps: lineProps,
            className: className,
            showLineNumbers: showLineNumbers,
            wrapLongLines: wrapLongLines,
            wrapLines: wrapLines
        });
    }
    function createUnwrappedLine(children, lineNumber) {
        if (showLineNumbers && lineNumber && showInlineLineNumbers) {
            var inlineLineNumberStyle = assembleLineNumberStyles(lineNumberStyle, lineNumber, largestLineNumber);
            children.unshift(getInlineLineNumber(lineNumber, inlineLineNumberStyle));
        }
        return children;
    }
    function createLine(children, lineNumber) {
        var className = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
        return wrapLines || className.length > 0 ? createWrappedLine(children, lineNumber, className) : createUnwrappedLine(children, lineNumber);
    }
    var _loop = function _loop() {
        var node = tree[index];
        var value = node.children[0].value;
        var newLines = getNewLines(value);
        if (newLines) {
            var splitValue = value.split('\n');
            splitValue.forEach(function(text, i) {
                var lineNumber = showLineNumbers && newTree.length + startingLineNumber;
                var newChild = {
                    type: 'text',
                    value: "".concat(text, "\n")
                };
                // if it's the first line
                if (i === 0) {
                    var _children = tree.slice(lastLineBreakIndex + 1, index).concat(createLineElement({
                        children: [
                            newChild
                        ],
                        className: node.properties.className
                    }));
                    var _line = createLine(_children, lineNumber);
                    newTree.push(_line);
                // if it's the last line
                } else if (i === splitValue.length - 1) {
                    var stringChild = tree[index + 1] && tree[index + 1].children && tree[index + 1].children[0];
                    var lastLineInPreviousSpan = {
                        type: 'text',
                        value: "".concat(text)
                    };
                    if (stringChild) {
                        var newElem = createLineElement({
                            children: [
                                lastLineInPreviousSpan
                            ],
                            className: node.properties.className
                        });
                        tree.splice(index + 1, 0, newElem);
                    } else {
                        var _children2 = [
                            lastLineInPreviousSpan
                        ];
                        var _line2 = createLine(_children2, lineNumber, node.properties.className);
                        newTree.push(_line2);
                    }
                // if it's neither the first nor the last line
                } else {
                    var _children3 = [
                        newChild
                    ];
                    var _line3 = createLine(_children3, lineNumber, node.properties.className);
                    newTree.push(_line3);
                }
            });
            lastLineBreakIndex = index;
        }
        index++;
    };
    while(index < tree.length){
        _loop();
    }
    if (lastLineBreakIndex !== tree.length - 1) {
        var children = tree.slice(lastLineBreakIndex + 1, tree.length);
        if (children && children.length) {
            var lineNumber = showLineNumbers && newTree.length + startingLineNumber;
            var line = createLine(children, lineNumber);
            newTree.push(line);
        }
    }
    return wrapLines ? newTree : (_ref4 = []).concat.apply(_ref4, newTree);
}
function defaultRenderer(_ref5) {
    var rows = _ref5.rows, stylesheet = _ref5.stylesheet, useInlineStyles = _ref5.useInlineStyles;
    return rows.map(function(node, i) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$react$2d$syntax$2d$highlighter$2f$dist$2f$esm$2f$create$2d$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])({
            node: node,
            stylesheet: stylesheet,
            useInlineStyles: useInlineStyles,
            key: "code-segment-".concat(i)
        });
    });
}
// only highlight.js has the highlightAuto method
function isHighlightJs(astGenerator) {
    return astGenerator && typeof astGenerator.highlightAuto !== 'undefined';
}
function getCodeTree(_ref6) {
    var astGenerator = _ref6.astGenerator, language = _ref6.language, code = _ref6.code, defaultCodeValue = _ref6.defaultCodeValue;
    // figure out whether we're using lowlight/highlight or refractor/prism
    // then attempt highlighting accordingly
    // lowlight/highlight?
    if (isHighlightJs(astGenerator)) {
        var hasLanguage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$react$2d$syntax$2d$highlighter$2f$dist$2f$esm$2f$checkForListedLanguage$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(astGenerator, language);
        if (language === 'text') {
            return {
                value: defaultCodeValue,
                language: 'text'
            };
        } else if (hasLanguage) {
            return astGenerator.highlight(language, code);
        } else {
            return astGenerator.highlightAuto(code);
        }
    }
    // must be refractor/prism, then
    try {
        return language && language !== 'text' ? {
            value: astGenerator.highlight(code, language)
        } : {
            value: defaultCodeValue
        };
    } catch (e) {
        return {
            value: defaultCodeValue
        };
    }
}
function __TURBOPACK__default__export__(defaultAstGenerator, defaultStyle) {
    return function SyntaxHighlighter(_ref7) {
        var _code$match$length, _code$match;
        var language = _ref7.language, children = _ref7.children, _ref7$style = _ref7.style, style = _ref7$style === void 0 ? defaultStyle : _ref7$style, _ref7$customStyle = _ref7.customStyle, customStyle = _ref7$customStyle === void 0 ? {} : _ref7$customStyle, _ref7$codeTagProps = _ref7.codeTagProps, codeTagProps = _ref7$codeTagProps === void 0 ? {
            className: language ? "language-".concat(language) : undefined,
            style: _objectSpread(_objectSpread({}, style['code[class*="language-"]']), style["code[class*=\"language-".concat(language, "\"]")])
        } : _ref7$codeTagProps, _ref7$useInlineStyles = _ref7.useInlineStyles, useInlineStyles = _ref7$useInlineStyles === void 0 ? true : _ref7$useInlineStyles, _ref7$showLineNumbers = _ref7.showLineNumbers, showLineNumbers = _ref7$showLineNumbers === void 0 ? false : _ref7$showLineNumbers, _ref7$showInlineLineN = _ref7.showInlineLineNumbers, showInlineLineNumbers = _ref7$showInlineLineN === void 0 ? true : _ref7$showInlineLineN, _ref7$startingLineNum = _ref7.startingLineNumber, startingLineNumber = _ref7$startingLineNum === void 0 ? 1 : _ref7$startingLineNum, lineNumberContainerStyle = _ref7.lineNumberContainerStyle, _ref7$lineNumberStyle = _ref7.lineNumberStyle, lineNumberStyle = _ref7$lineNumberStyle === void 0 ? {} : _ref7$lineNumberStyle, wrapLines = _ref7.wrapLines, _ref7$wrapLongLines = _ref7.wrapLongLines, wrapLongLines = _ref7$wrapLongLines === void 0 ? false : _ref7$wrapLongLines, _ref7$lineProps = _ref7.lineProps, lineProps = _ref7$lineProps === void 0 ? {} : _ref7$lineProps, renderer = _ref7.renderer, _ref7$PreTag = _ref7.PreTag, PreTag = _ref7$PreTag === void 0 ? 'pre' : _ref7$PreTag, _ref7$CodeTag = _ref7.CodeTag, CodeTag = _ref7$CodeTag === void 0 ? 'code' : _ref7$CodeTag, _ref7$code = _ref7.code, code = _ref7$code === void 0 ? (Array.isArray(children) ? children[0] : children) || '' : _ref7$code, astGenerator = _ref7.astGenerator, rest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$objectWithoutProperties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(_ref7, _excluded);
        astGenerator = astGenerator || defaultAstGenerator;
        var allLineNumbers = showLineNumbers ? /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(AllLineNumbers, {
            containerStyle: lineNumberContainerStyle,
            codeStyle: codeTagProps.style || {},
            numberStyle: lineNumberStyle,
            startingLineNumber: startingLineNumber,
            codeString: code
        }) : null;
        var defaultPreStyle = style.hljs || style['pre[class*="language-"]'] || {
            backgroundColor: '#fff'
        };
        var generatorClassName = isHighlightJs(astGenerator) ? 'hljs' : 'prismjs';
        var preProps = useInlineStyles ? Object.assign({}, rest, {
            style: Object.assign({}, defaultPreStyle, customStyle)
        }) : Object.assign({}, rest, {
            className: rest.className ? "".concat(generatorClassName, " ").concat(rest.className) : generatorClassName,
            style: Object.assign({}, customStyle)
        });
        if (wrapLongLines) {
            codeTagProps.style = _objectSpread({
                whiteSpace: 'pre-wrap'
            }, codeTagProps.style);
        } else {
            codeTagProps.style = _objectSpread({
                whiteSpace: 'pre'
            }, codeTagProps.style);
        }
        if (!astGenerator) {
            return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(PreTag, preProps, allLineNumbers, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(CodeTag, codeTagProps, code));
        }
        /*
     * Some custom renderers rely on individual row elements so we need to turn wrapLines on
     * if renderer is provided and wrapLines is undefined.
     */ if (wrapLines === undefined && renderer || wrapLongLines) wrapLines = true;
        renderer = renderer || defaultRenderer;
        var defaultCodeValue = [
            {
                type: 'text',
                value: code
            }
        ];
        var codeTree = getCodeTree({
            astGenerator: astGenerator,
            language: language,
            code: code,
            defaultCodeValue: defaultCodeValue
        });
        if (codeTree.language === null) {
            codeTree.value = defaultCodeValue;
        }
        // pre-determine largest line number so that we can force minWidth on all linenumber elements
        var lineBreakCount = (_code$match$length = (_code$match = code.match(/\n/g)) === null || _code$match === void 0 ? void 0 : _code$match.length) !== null && _code$match$length !== void 0 ? _code$match$length : 0;
        var largestLineNumber = startingLineNumber + lineBreakCount;
        var rows = processLines(codeTree, wrapLines, lineProps, showLineNumbers, showInlineLineNumbers, startingLineNumber, largestLineNumber, lineNumberStyle, wrapLongLines);
        return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(PreTag, preProps, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(CodeTag, codeTagProps, !showInlineLineNumbers && allLineNumbers, renderer({
            rows: rows,
            stylesheet: style,
            useInlineStyles: useInlineStyles
        })));
    };
}
}),
"[project]/frontend-nextjs/node_modules/react-syntax-highlighter/dist/esm/languages/hljs/python.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$highlight$2e$js$2f$lib$2f$languages$2f$python$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/highlight.js/lib/languages/python.js [app-ssr] (ecmascript)");
;
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$highlight$2e$js$2f$lib$2f$languages$2f$python$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"];
}),
"[project]/frontend-nextjs/node_modules/react-syntax-highlighter/dist/esm/languages/hljs/r.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$highlight$2e$js$2f$lib$2f$languages$2f$r$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/highlight.js/lib/languages/r.js [app-ssr] (ecmascript)");
;
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$highlight$2e$js$2f$lib$2f$languages$2f$r$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"];
}),
"[project]/frontend-nextjs/node_modules/react-syntax-highlighter/dist/esm/languages/hljs/sas.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$highlight$2e$js$2f$lib$2f$languages$2f$sas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/highlight.js/lib/languages/sas.js [app-ssr] (ecmascript)");
;
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$highlight$2e$js$2f$lib$2f$languages$2f$sas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"];
}),
"[project]/frontend-nextjs/node_modules/react-syntax-highlighter/dist/esm/languages/hljs/sql.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$highlight$2e$js$2f$lib$2f$languages$2f$sql$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/highlight.js/lib/languages/sql.js [app-ssr] (ecmascript)");
;
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$highlight$2e$js$2f$lib$2f$languages$2f$sql$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"];
}),
"[project]/frontend-nextjs/node_modules/react-syntax-highlighter/dist/esm/light.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$react$2d$syntax$2d$highlighter$2f$dist$2f$esm$2f$highlight$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/react-syntax-highlighter/dist/esm/highlight.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lowlight$2f$lib$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lowlight/lib/core.js [app-ssr] (ecmascript)");
;
;
var SyntaxHighlighter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$react$2d$syntax$2d$highlighter$2f$dist$2f$esm$2f$highlight$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lowlight$2f$lib$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {});
SyntaxHighlighter.registerLanguage = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lowlight$2f$lib$2f$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].registerLanguage;
const __TURBOPACK__default__export__ = SyntaxHighlighter;
}),
"[project]/frontend-nextjs/node_modules/react-syntax-highlighter/dist/esm/styles/hljs/atom-one-dark.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = {
    "hljs": {
        "display": "block",
        "overflowX": "auto",
        "padding": "0.5em",
        "color": "#abb2bf",
        "background": "#282c34"
    },
    "hljs-comment": {
        "color": "#5c6370",
        "fontStyle": "italic"
    },
    "hljs-quote": {
        "color": "#5c6370",
        "fontStyle": "italic"
    },
    "hljs-doctag": {
        "color": "#c678dd"
    },
    "hljs-keyword": {
        "color": "#c678dd"
    },
    "hljs-formula": {
        "color": "#c678dd"
    },
    "hljs-section": {
        "color": "#e06c75"
    },
    "hljs-name": {
        "color": "#e06c75"
    },
    "hljs-selector-tag": {
        "color": "#e06c75"
    },
    "hljs-deletion": {
        "color": "#e06c75"
    },
    "hljs-subst": {
        "color": "#e06c75"
    },
    "hljs-literal": {
        "color": "#56b6c2"
    },
    "hljs-string": {
        "color": "#98c379"
    },
    "hljs-regexp": {
        "color": "#98c379"
    },
    "hljs-addition": {
        "color": "#98c379"
    },
    "hljs-attribute": {
        "color": "#98c379"
    },
    "hljs-meta-string": {
        "color": "#98c379"
    },
    "hljs-built_in": {
        "color": "#e6c07b"
    },
    "hljs-class .hljs-title": {
        "color": "#e6c07b"
    },
    "hljs-attr": {
        "color": "#d19a66"
    },
    "hljs-variable": {
        "color": "#d19a66"
    },
    "hljs-template-variable": {
        "color": "#d19a66"
    },
    "hljs-type": {
        "color": "#d19a66"
    },
    "hljs-selector-class": {
        "color": "#d19a66"
    },
    "hljs-selector-attr": {
        "color": "#d19a66"
    },
    "hljs-selector-pseudo": {
        "color": "#d19a66"
    },
    "hljs-number": {
        "color": "#d19a66"
    },
    "hljs-symbol": {
        "color": "#61aeee"
    },
    "hljs-bullet": {
        "color": "#61aeee"
    },
    "hljs-link": {
        "color": "#61aeee",
        "textDecoration": "underline"
    },
    "hljs-meta": {
        "color": "#61aeee"
    },
    "hljs-selector-id": {
        "color": "#61aeee"
    },
    "hljs-title": {
        "color": "#61aeee"
    },
    "hljs-emphasis": {
        "fontStyle": "italic"
    },
    "hljs-strong": {
        "fontWeight": "bold"
    }
};
}),
];

//# sourceMappingURL=1yvi_0on5gmw._.js.map