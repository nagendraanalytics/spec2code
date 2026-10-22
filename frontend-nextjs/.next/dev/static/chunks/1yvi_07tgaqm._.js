(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/frontend-nextjs/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>_arrayLikeToArray
]);
function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for(var e = 0, n = Array(a); e < a; e++)n[e] = r[e];
    return n;
}
;
}),
"[project]/frontend-nextjs/node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>_arrayWithoutHoles
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$arrayLikeToArray$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js [app-client] (ecmascript)");
;
function _arrayWithoutHoles(r) {
    if (Array.isArray(r)) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$arrayLikeToArray$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(r);
}
;
}),
"[project]/frontend-nextjs/node_modules/@babel/runtime/helpers/esm/defineProperty.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>_defineProperty
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$toPropertyKey$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/@babel/runtime/helpers/esm/toPropertyKey.js [app-client] (ecmascript)");
;
function _defineProperty(e, r, t) {
    return (r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$toPropertyKey$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(r)) in e ? Object.defineProperty(e, r, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[r] = t, e;
}
;
}),
"[project]/frontend-nextjs/node_modules/@babel/runtime/helpers/esm/extends.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>_extends
]);
function _extends() {
    return _extends = ("TURBOPACK compile-time truthy", 1) ? Object.assign.bind() : "TURBOPACK unreachable", _extends.apply(null, arguments);
}
;
}),
"[project]/frontend-nextjs/node_modules/@babel/runtime/helpers/esm/iterableToArray.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>_iterableToArray
]);
function _iterableToArray(r) {
    if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
;
}),
"[project]/frontend-nextjs/node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>_nonIterableSpread
]);
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
;
}),
"[project]/frontend-nextjs/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>_objectWithoutProperties
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$objectWithoutPropertiesLoose$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js [app-client] (ecmascript)");
;
function _objectWithoutProperties(e, t) {
    if (null == e) return {};
    var o, r, i = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$objectWithoutPropertiesLoose$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(e, t);
    if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(e);
        for(r = 0; r < n.length; r++)o = n[r], -1 === t.indexOf(o) && ({}).propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
    }
    return i;
}
;
}),
"[project]/frontend-nextjs/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>_objectWithoutPropertiesLoose
]);
function _objectWithoutPropertiesLoose(r, e) {
    if (null == r) return {};
    var t = {};
    for(var n in r)if (({}).hasOwnProperty.call(r, n)) {
        if (-1 !== e.indexOf(n)) continue;
        t[n] = r[n];
    }
    return t;
}
;
}),
"[project]/frontend-nextjs/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>_toConsumableArray
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$arrayWithoutHoles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$iterableToArray$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/@babel/runtime/helpers/esm/iterableToArray.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$unsupportedIterableToArray$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$nonIterableSpread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js [app-client] (ecmascript)");
;
;
;
;
function _toConsumableArray(r) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$arrayWithoutHoles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(r) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$iterableToArray$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(r) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$unsupportedIterableToArray$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(r) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$nonIterableSpread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])();
}
;
}),
"[project]/frontend-nextjs/node_modules/@babel/runtime/helpers/esm/toPrimitive.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>toPrimitive
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$typeof$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/@babel/runtime/helpers/esm/typeof.js [app-client] (ecmascript)");
;
function toPrimitive(t, e) {
    if ("object" != (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$typeof$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(t) || !t) return t;
    var r;
    if ("undefined" != typeof Symbol && void 0 !== (r = t[Symbol.toPrimitive])) {
        var i = r.call(t, e || "default");
        if ("object" != (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$typeof$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === e ? String : Number)(t);
}
;
}),
"[project]/frontend-nextjs/node_modules/@babel/runtime/helpers/esm/toPropertyKey.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>toPropertyKey
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$typeof$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/@babel/runtime/helpers/esm/typeof.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$toPrimitive$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/@babel/runtime/helpers/esm/toPrimitive.js [app-client] (ecmascript)");
;
;
function toPropertyKey(t) {
    var i = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$toPrimitive$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(t, "string");
    return "symbol" == (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$typeof$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(i) ? i : i + "";
}
;
}),
"[project]/frontend-nextjs/node_modules/@babel/runtime/helpers/esm/typeof.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>_typeof
]);
function _typeof(o) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
        return typeof o;
    } : function(o) {
        return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
}
;
}),
"[project]/frontend-nextjs/node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>_unsupportedIterableToArray
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$arrayLikeToArray$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js [app-client] (ecmascript)");
;
function _unsupportedIterableToArray(r, a) {
    if (r) {
        if ("string" == typeof r) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$arrayLikeToArray$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(r, a);
        var t = ({}).toString.call(r).slice(8, -1);
        return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$arrayLikeToArray$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(r, a) : void 0;
    }
}
;
}),
"[project]/frontend-nextjs/node_modules/fault/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var formatter = __turbopack_context__.r("[project]/frontend-nextjs/node_modules/format/format.js [app-client] (ecmascript)");
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
"[project]/frontend-nextjs/node_modules/format/format.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

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
"[project]/frontend-nextjs/node_modules/highlight.js/lib/core.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

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
    if (typeof window !== 'undefined' && window.addEventListener) {
        window.addEventListener('DOMContentLoaded', boot, false);
    }
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
"[project]/frontend-nextjs/node_modules/highlight.js/lib/languages/python.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

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
"[project]/frontend-nextjs/node_modules/highlight.js/lib/languages/r.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

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
"[project]/frontend-nextjs/node_modules/highlight.js/lib/languages/sas.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

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
"[project]/frontend-nextjs/node_modules/highlight.js/lib/languages/sql.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

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
"[project]/frontend-nextjs/node_modules/lowlight/lib/core.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var high = __turbopack_context__.r("[project]/frontend-nextjs/node_modules/highlight.js/lib/core.js [app-client] (ecmascript)");
var fault = __turbopack_context__.r("[project]/frontend-nextjs/node_modules/fault/index.js [app-client] (ecmascript)");
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
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/arrow-right.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconData",
    ()=>__iconData,
    "default",
    ()=>ArrowRight
]);
/**
 * @license lucide-react v1.58.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
;
const __iconData = {
    name: "arrow-right",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M5 12h14",
                key: "1ays0h"
            }
        ],
        [
            "path",
            {
                d: "m12 5 7 7-7 7",
                key: "xquz4c"
            }
        ]
    ]
};
__iconData.node;
const ArrowRight = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/arrow-right.mjs [app-client] (ecmascript) <export default as ArrowRight>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ArrowRight",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/arrow-right.mjs [app-client] (ecmascript)");
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/check.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
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
const Check = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/check.mjs [app-client] (ecmascript) <export default as Check>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Check",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/check.mjs [app-client] (ecmascript)");
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/chevron-down.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
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
const ChevronDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/chevron-down.mjs [app-client] (ecmascript) <export default as ChevronDown>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChevronDown",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/chevron-down.mjs [app-client] (ecmascript)");
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/circle-alert.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
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
const CircleAlert = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/circle-alert.mjs [app-client] (ecmascript) <export default as AlertCircle>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AlertCircle",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/circle-alert.mjs [app-client] (ecmascript)");
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/circle-check.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
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
const CircleCheck = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/circle-check.mjs [app-client] (ecmascript) <export default as CheckCircle2>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CheckCircle2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/circle-check.mjs [app-client] (ecmascript)");
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/circle-dot.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
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
const CircleDot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/circle-dot.mjs [app-client] (ecmascript) <export default as CircleDot>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CircleDot",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$dot$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$dot$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/circle-dot.mjs [app-client] (ecmascript)");
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/circle-x.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
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
const CircleX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/circle-x.mjs [app-client] (ecmascript) <export default as XCircle>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "XCircle",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/circle-x.mjs [app-client] (ecmascript)");
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/copy.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
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
const Copy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/copy.mjs [app-client] (ecmascript) <export default as Copy>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Copy",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/copy.mjs [app-client] (ecmascript)");
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/download.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
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
const Download = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/download.mjs [app-client] (ecmascript) <export default as Download>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Download",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/download.mjs [app-client] (ecmascript)");
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/file-text.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconData",
    ()=>__iconData,
    "default",
    ()=>FileText
]);
/**
 * @license lucide-react v1.58.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
;
const __iconData = {
    name: "file-text",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
                key: "1oefj6"
            }
        ],
        [
            "path",
            {
                d: "M14 2v5a1 1 0 0 0 1 1h5",
                key: "wfsgrz"
            }
        ],
        [
            "path",
            {
                d: "M10 9H8",
                key: "b1mrlr"
            }
        ],
        [
            "path",
            {
                d: "M16 13H8",
                key: "t4e002"
            }
        ],
        [
            "path",
            {
                d: "M16 17H8",
                key: "z1uh3a"
            }
        ]
    ]
};
__iconData.node;
const FileText = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/file-text.mjs [app-client] (ecmascript) <export default as FileText>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FileText",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/file-text.mjs [app-client] (ecmascript)");
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/info.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
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
const Info = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/info.mjs [app-client] (ecmascript) <export default as Info>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Info",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/info.mjs [app-client] (ecmascript)");
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/loader-circle.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
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
const LoaderCircle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/loader-circle.mjs [app-client] (ecmascript) <export default as Loader2>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Loader2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/loader-circle.mjs [app-client] (ecmascript)");
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/maximize-2.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
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
const Maximize2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/maximize-2.mjs [app-client] (ecmascript) <export default as Maximize2>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Maximize2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/maximize-2.mjs [app-client] (ecmascript)");
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/minimize-2.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
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
const Minimize2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/minimize-2.mjs [app-client] (ecmascript) <export default as Minimize2>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Minimize2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minimize$2d$2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minimize$2d$2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/minimize-2.mjs [app-client] (ecmascript)");
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/panel-right-close.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconData",
    ()=>__iconData,
    "default",
    ()=>PanelRightClose
]);
/**
 * @license lucide-react v1.58.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
;
const __iconData = {
    name: "panel-right-close",
    size: 24,
    node: [
        [
            "rect",
            {
                width: "18",
                height: "18",
                x: "3",
                y: "3",
                rx: "2",
                key: "afitv7"
            }
        ],
        [
            "path",
            {
                d: "M15 3v18",
                key: "14nvp0"
            }
        ],
        [
            "path",
            {
                d: "m8 9 3 3-3 3",
                key: "12hl5m"
            }
        ]
    ]
};
__iconData.node;
const PanelRightClose = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/panel-right-close.mjs [app-client] (ecmascript) <export default as PanelRightClose>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PanelRightClose",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$panel$2d$right$2d$close$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$panel$2d$right$2d$close$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/panel-right-close.mjs [app-client] (ecmascript)");
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/panel-right-open.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconData",
    ()=>__iconData,
    "default",
    ()=>PanelRightOpen
]);
/**
 * @license lucide-react v1.58.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
;
const __iconData = {
    name: "panel-right-open",
    size: 24,
    node: [
        [
            "rect",
            {
                width: "18",
                height: "18",
                x: "3",
                y: "3",
                rx: "2",
                key: "afitv7"
            }
        ],
        [
            "path",
            {
                d: "M15 3v18",
                key: "14nvp0"
            }
        ],
        [
            "path",
            {
                d: "m10 15-3-3 3-3",
                key: "1pgupc"
            }
        ]
    ]
};
__iconData.node;
const PanelRightOpen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/panel-right-open.mjs [app-client] (ecmascript) <export default as PanelRightOpen>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PanelRightOpen",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$panel$2d$right$2d$open$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$panel$2d$right$2d$open$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/panel-right-open.mjs [app-client] (ecmascript)");
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/play.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
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
const Play = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/play.mjs [app-client] (ecmascript) <export default as Play>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Play",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/play.mjs [app-client] (ecmascript)");
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/rotate-ccw.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconData",
    ()=>__iconData,
    "default",
    ()=>RotateCcw
]);
/**
 * @license lucide-react v1.58.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
;
const __iconData = {
    name: "rotate-ccw",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
                key: "1357e3"
            }
        ],
        [
            "path",
            {
                d: "M3 3v5h5",
                key: "1xhq8a"
            }
        ]
    ]
};
__iconData.node;
const RotateCcw = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/rotate-ccw.mjs [app-client] (ecmascript) <export default as RotateCcw>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RotateCcw",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/rotate-ccw.mjs [app-client] (ecmascript)");
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/shield-check.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
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
const ShieldCheck = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/shield-check.mjs [app-client] (ecmascript) <export default as ShieldCheck>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ShieldCheck",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/shield-check.mjs [app-client] (ecmascript)");
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/sparkles.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
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
const Sparkles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/sparkles.mjs [app-client] (ecmascript) <export default as Sparkles>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Sparkles",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/sparkles.mjs [app-client] (ecmascript)");
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/text-wrap.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
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
const TextWrap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/text-wrap.mjs [app-client] (ecmascript) <export default as WrapText>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WrapText",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$text$2d$wrap$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$text$2d$wrap$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/text-wrap.mjs [app-client] (ecmascript)");
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/triangle-alert.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
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
const TriangleAlert = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/triangle-alert.mjs [app-client] (ecmascript) <export default as AlertTriangle>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AlertTriangle",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/triangle-alert.mjs [app-client] (ecmascript)");
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/wand-sparkles.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
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
const WandSparkles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/wand-sparkles.mjs [app-client] (ecmascript) <export default as Wand2>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Wand2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wand$2d$sparkles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wand$2d$sparkles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/wand-sparkles.mjs [app-client] (ecmascript)");
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/x.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconData",
    ()=>__iconData,
    "default",
    ()=>X
]);
/**
 * @license lucide-react v1.58.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
;
const __iconData = {
    name: "x",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M18 6 6 18",
                key: "1bl5f8"
            }
        ],
        [
            "path",
            {
                d: "m6 6 12 12",
                key: "d8bk6v"
            }
        ]
    ]
};
__iconData.node;
const X = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/x.mjs [app-client] (ecmascript) <export default as X>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "X",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/x.mjs [app-client] (ecmascript)");
}),
"[project]/frontend-nextjs/node_modules/nearley/lib/nearley.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

(function(root, factory) {
    if (("TURBOPACK compile-time value", "object") === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.nearley = factory();
    }
})(/*TURBOPACK member replacement*/ __turbopack_context__.e, function() {
    function Rule(name, symbols, postprocess) {
        this.id = ++Rule.highestId;
        this.name = name;
        this.symbols = symbols; // a list of literal | regex class | nonterminal
        this.postprocess = postprocess;
        return this;
    }
    Rule.highestId = 0;
    Rule.prototype.toString = function(withCursorAt) {
        var symbolSequence = typeof withCursorAt === "undefined" ? this.symbols.map(getSymbolShortDisplay).join(' ') : this.symbols.slice(0, withCursorAt).map(getSymbolShortDisplay).join(' ') + " ● " + this.symbols.slice(withCursorAt).map(getSymbolShortDisplay).join(' ');
        return this.name + " → " + symbolSequence;
    };
    // a State is a rule at a position from a given starting point in the input stream (reference)
    function State(rule, dot, reference, wantedBy) {
        this.rule = rule;
        this.dot = dot;
        this.reference = reference;
        this.data = [];
        this.wantedBy = wantedBy;
        this.isComplete = this.dot === rule.symbols.length;
    }
    State.prototype.toString = function() {
        return "{" + this.rule.toString(this.dot) + "}, from: " + (this.reference || 0);
    };
    State.prototype.nextState = function(child) {
        var state = new State(this.rule, this.dot + 1, this.reference, this.wantedBy);
        state.left = this;
        state.right = child;
        if (state.isComplete) {
            state.data = state.build();
            // Having right set here will prevent the right state and its children
            // form being garbage collected
            state.right = undefined;
        }
        return state;
    };
    State.prototype.build = function() {
        var children = [];
        var node = this;
        do {
            children.push(node.right.data);
            node = node.left;
        }while (node.left)
        children.reverse();
        return children;
    };
    State.prototype.finish = function() {
        if (this.rule.postprocess) {
            this.data = this.rule.postprocess(this.data, this.reference, Parser.fail);
        }
    };
    function Column(grammar, index) {
        this.grammar = grammar;
        this.index = index;
        this.states = [];
        this.wants = {}; // states indexed by the non-terminal they expect
        this.scannable = []; // list of states that expect a token
        this.completed = {}; // states that are nullable
    }
    Column.prototype.process = function(nextColumn) {
        var states = this.states;
        var wants = this.wants;
        var completed = this.completed;
        for(var w = 0; w < states.length; w++){
            var state = states[w];
            if (state.isComplete) {
                state.finish();
                if (state.data !== Parser.fail) {
                    // complete
                    var wantedBy = state.wantedBy;
                    for(var i = wantedBy.length; i--;){
                        var left = wantedBy[i];
                        this.complete(left, state);
                    }
                    // special-case nullables
                    if (state.reference === this.index) {
                        // make sure future predictors of this rule get completed.
                        var exp = state.rule.name;
                        (this.completed[exp] = this.completed[exp] || []).push(state);
                    }
                }
            } else {
                // queue scannable states
                var exp = state.rule.symbols[state.dot];
                if (typeof exp !== 'string') {
                    this.scannable.push(state);
                    continue;
                }
                // predict
                if (wants[exp]) {
                    wants[exp].push(state);
                    if (completed.hasOwnProperty(exp)) {
                        var nulls = completed[exp];
                        for(var i = 0; i < nulls.length; i++){
                            var right = nulls[i];
                            this.complete(state, right);
                        }
                    }
                } else {
                    wants[exp] = [
                        state
                    ];
                    this.predict(exp);
                }
            }
        }
    };
    Column.prototype.predict = function(exp) {
        var rules = this.grammar.byName[exp] || [];
        for(var i = 0; i < rules.length; i++){
            var r = rules[i];
            var wantedBy = this.wants[exp];
            var s = new State(r, 0, this.index, wantedBy);
            this.states.push(s);
        }
    };
    Column.prototype.complete = function(left, right) {
        var copy = left.nextState(right);
        this.states.push(copy);
    };
    function Grammar(rules, start) {
        this.rules = rules;
        this.start = start || this.rules[0].name;
        var byName = this.byName = {};
        this.rules.forEach(function(rule) {
            if (!byName.hasOwnProperty(rule.name)) {
                byName[rule.name] = [];
            }
            byName[rule.name].push(rule);
        });
    }
    // So we can allow passing (rules, start) directly to Parser for backwards compatibility
    Grammar.fromCompiled = function(rules, start) {
        var lexer = rules.Lexer;
        if (rules.ParserStart) {
            start = rules.ParserStart;
            rules = rules.ParserRules;
        }
        var rules = rules.map(function(r) {
            return new Rule(r.name, r.symbols, r.postprocess);
        });
        var g = new Grammar(rules, start);
        g.lexer = lexer; // nb. storing lexer on Grammar is iffy, but unavoidable
        return g;
    };
    function StreamLexer() {
        this.reset("");
    }
    StreamLexer.prototype.reset = function(data, state) {
        this.buffer = data;
        this.index = 0;
        this.line = state ? state.line : 1;
        this.lastLineBreak = state ? -state.col : 0;
    };
    StreamLexer.prototype.next = function() {
        if (this.index < this.buffer.length) {
            var ch = this.buffer[this.index++];
            if (ch === '\n') {
                this.line += 1;
                this.lastLineBreak = this.index;
            }
            return {
                value: ch
            };
        }
    };
    StreamLexer.prototype.save = function() {
        return {
            line: this.line,
            col: this.index - this.lastLineBreak
        };
    };
    StreamLexer.prototype.formatError = function(token, message) {
        // nb. this gets called after consuming the offending token,
        // so the culprit is index-1
        var buffer = this.buffer;
        if (typeof buffer === 'string') {
            var lines = buffer.split("\n").slice(Math.max(0, this.line - 5), this.line);
            var nextLineBreak = buffer.indexOf('\n', this.index);
            if (nextLineBreak === -1) nextLineBreak = buffer.length;
            var col = this.index - this.lastLineBreak;
            var lastLineDigits = String(this.line).length;
            message += " at line " + this.line + " col " + col + ":\n\n";
            message += lines.map(function(line, i) {
                return pad(this.line - lines.length + i + 1, lastLineDigits) + " " + line;
            }, this).join("\n");
            message += "\n" + pad("", lastLineDigits + col) + "^\n";
            return message;
        } else {
            return message + " at index " + (this.index - 1);
        }
        //TURBOPACK unreachable
        ;
        function pad(n, length) {
            var s = String(n);
            return Array(length - s.length + 1).join(" ") + s;
        }
    };
    function Parser(rules, start, options) {
        if (rules instanceof Grammar) {
            var grammar = rules;
            var options = start;
        } else {
            var grammar = Grammar.fromCompiled(rules, start);
        }
        this.grammar = grammar;
        // Read options
        this.options = {
            keepHistory: false,
            lexer: grammar.lexer || new StreamLexer
        };
        for(var key in options || {}){
            this.options[key] = options[key];
        }
        // Setup lexer
        this.lexer = this.options.lexer;
        this.lexerState = undefined;
        // Setup a table
        var column = new Column(grammar, 0);
        var table = this.table = [
            column
        ];
        // I could be expecting anything.
        column.wants[grammar.start] = [];
        column.predict(grammar.start);
        // TODO what if start rule is nullable?
        column.process();
        this.current = 0; // token index
    }
    // create a reserved token for indicating a parse fail
    Parser.fail = {};
    Parser.prototype.feed = function(chunk) {
        var lexer = this.lexer;
        lexer.reset(chunk, this.lexerState);
        var token;
        while(true){
            try {
                token = lexer.next();
                if (!token) {
                    break;
                }
            } catch (e) {
                // Create the next column so that the error reporter
                // can display the correctly predicted states.
                var nextColumn = new Column(this.grammar, this.current + 1);
                this.table.push(nextColumn);
                var err = new Error(this.reportLexerError(e));
                err.offset = this.current;
                err.token = e.token;
                throw err;
            }
            // We add new states to table[current+1]
            var column = this.table[this.current];
            // GC unused states
            if (!this.options.keepHistory) {
                delete this.table[this.current - 1];
            }
            var n = this.current + 1;
            var nextColumn = new Column(this.grammar, n);
            this.table.push(nextColumn);
            // Advance all tokens that expect the symbol
            var literal = token.text !== undefined ? token.text : token.value;
            var value = lexer.constructor === StreamLexer ? token.value : token;
            var scannable = column.scannable;
            for(var w = scannable.length; w--;){
                var state = scannable[w];
                var expect = state.rule.symbols[state.dot];
                // Try to consume the token
                // either regex or literal
                if (expect.test ? expect.test(value) : expect.type ? expect.type === token.type : expect.literal === literal) {
                    // Add it
                    var next = state.nextState({
                        data: value,
                        token: token,
                        isToken: true,
                        reference: n - 1
                    });
                    nextColumn.states.push(next);
                }
            }
            // Next, for each of the rules, we either
            // (a) complete it, and try to see if the reference row expected that
            //     rule
            // (b) predict the next nonterminal it expects by adding that
            //     nonterminal's start state
            // To prevent duplication, we also keep track of rules we have already
            // added
            nextColumn.process();
            // If needed, throw an error:
            if (nextColumn.states.length === 0) {
                // No states at all! This is not good.
                var err = new Error(this.reportError(token));
                err.offset = this.current;
                err.token = token;
                throw err;
            }
            // maybe save lexer state
            if (this.options.keepHistory) {
                column.lexerState = lexer.save();
            }
            this.current++;
        }
        if (column) {
            this.lexerState = lexer.save();
        }
        // Incrementally keep track of results
        this.results = this.finish();
        // Allow chaining, for whatever it's worth
        return this;
    };
    Parser.prototype.reportLexerError = function(lexerError) {
        var tokenDisplay, lexerMessage;
        // Planning to add a token property to moo's thrown error
        // even on erroring tokens to be used in error display below
        var token = lexerError.token;
        if (token) {
            tokenDisplay = "input " + JSON.stringify(token.text[0]) + " (lexer error)";
            lexerMessage = this.lexer.formatError(token, "Syntax error");
        } else {
            tokenDisplay = "input (lexer error)";
            lexerMessage = lexerError.message;
        }
        return this.reportErrorCommon(lexerMessage, tokenDisplay);
    };
    Parser.prototype.reportError = function(token) {
        var tokenDisplay = (token.type ? token.type + " token: " : "") + JSON.stringify(token.value !== undefined ? token.value : token);
        var lexerMessage = this.lexer.formatError(token, "Syntax error");
        return this.reportErrorCommon(lexerMessage, tokenDisplay);
    };
    Parser.prototype.reportErrorCommon = function(lexerMessage, tokenDisplay) {
        var lines = [];
        lines.push(lexerMessage);
        var lastColumnIndex = this.table.length - 2;
        var lastColumn = this.table[lastColumnIndex];
        var expectantStates = lastColumn.states.filter(function(state) {
            var nextSymbol = state.rule.symbols[state.dot];
            return nextSymbol && typeof nextSymbol !== "string";
        });
        if (expectantStates.length === 0) {
            lines.push('Unexpected ' + tokenDisplay + '. I did not expect any more input. Here is the state of my parse table:\n');
            this.displayStateStack(lastColumn.states, lines);
        } else {
            lines.push('Unexpected ' + tokenDisplay + '. Instead, I was expecting to see one of the following:\n');
            // Display a "state stack" for each expectant state
            // - which shows you how this state came to be, step by step.
            // If there is more than one derivation, we only display the first one.
            var stateStacks = expectantStates.map(function(state) {
                return this.buildFirstStateStack(state, []) || [
                    state
                ];
            }, this);
            // Display each state that is expecting a terminal symbol next.
            stateStacks.forEach(function(stateStack) {
                var state = stateStack[0];
                var nextSymbol = state.rule.symbols[state.dot];
                var symbolDisplay = this.getSymbolDisplay(nextSymbol);
                lines.push('A ' + symbolDisplay + ' based on:');
                this.displayStateStack(stateStack, lines);
            }, this);
        }
        lines.push("");
        return lines.join("\n");
    };
    Parser.prototype.displayStateStack = function(stateStack, lines) {
        var lastDisplay;
        var sameDisplayCount = 0;
        for(var j = 0; j < stateStack.length; j++){
            var state = stateStack[j];
            var display = state.rule.toString(state.dot);
            if (display === lastDisplay) {
                sameDisplayCount++;
            } else {
                if (sameDisplayCount > 0) {
                    lines.push('    ^ ' + sameDisplayCount + ' more lines identical to this');
                }
                sameDisplayCount = 0;
                lines.push('    ' + display);
            }
            lastDisplay = display;
        }
    };
    Parser.prototype.getSymbolDisplay = function(symbol) {
        return getSymbolLongDisplay(symbol);
    };
    /*
    Builds a the first state stack. You can think of a state stack as the call stack
    of the recursive-descent parser which the Nearley parse algorithm simulates.
    A state stack is represented as an array of state objects. Within a
    state stack, the first item of the array will be the starting
    state, with each successive item in the array going further back into history.

    This function needs to be given a starting state and an empty array representing
    the visited states, and it returns an single state stack.

    */ Parser.prototype.buildFirstStateStack = function(state, visited) {
        if (visited.indexOf(state) !== -1) {
            // Found cycle, return null
            // to eliminate this path from the results, because
            // we don't know how to display it meaningfully
            return null;
        }
        if (state.wantedBy.length === 0) {
            return [
                state
            ];
        }
        var prevState = state.wantedBy[0];
        var childVisited = [
            state
        ].concat(visited);
        var childResult = this.buildFirstStateStack(prevState, childVisited);
        if (childResult === null) {
            return null;
        }
        return [
            state
        ].concat(childResult);
    };
    Parser.prototype.save = function() {
        var column = this.table[this.current];
        column.lexerState = this.lexerState;
        return column;
    };
    Parser.prototype.restore = function(column) {
        var index = column.index;
        this.current = index;
        this.table[index] = column;
        this.table.splice(index + 1);
        this.lexerState = column.lexerState;
        // Incrementally keep track of results
        this.results = this.finish();
    };
    // nb. deprecated: use save/restore instead!
    Parser.prototype.rewind = function(index) {
        if (!this.options.keepHistory) {
            throw new Error('set option `keepHistory` to enable rewinding');
        }
        // nb. recall column (table) indicies fall between token indicies.
        //        col 0   --   token 0   --   col 1
        this.restore(this.table[index]);
    };
    Parser.prototype.finish = function() {
        // Return the possible parsings
        var considerations = [];
        var start = this.grammar.start;
        var column = this.table[this.table.length - 1];
        column.states.forEach(function(t) {
            if (t.rule.name === start && t.dot === t.rule.symbols.length && t.reference === 0 && t.data !== Parser.fail) {
                considerations.push(t);
            }
        });
        return considerations.map(function(c) {
            return c.data;
        });
    };
    function getSymbolLongDisplay(symbol) {
        var type = typeof symbol;
        if (type === "string") {
            return symbol;
        } else if (type === "object") {
            if (symbol.literal) {
                return JSON.stringify(symbol.literal);
            } else if (symbol instanceof RegExp) {
                return 'character matching ' + symbol;
            } else if (symbol.type) {
                return symbol.type + ' token';
            } else if (symbol.test) {
                return 'token matching ' + String(symbol.test);
            } else {
                throw new Error('Unknown symbol type: ' + symbol);
            }
        }
    }
    function getSymbolShortDisplay(symbol) {
        var type = typeof symbol;
        if (type === "string") {
            return symbol;
        } else if (type === "object") {
            if (symbol.literal) {
                return JSON.stringify(symbol.literal);
            } else if (symbol instanceof RegExp) {
                return symbol.toString();
            } else if (symbol.type) {
                return '%' + symbol.type;
            } else if (symbol.test) {
                return '<' + String(symbol.test) + '>';
            } else {
                throw new Error('Unknown symbol type: ' + symbol);
            }
        }
    }
    return {
        Parser: Parser,
        Grammar: Grammar,
        Rule: Rule
    };
});
}),
"[project]/frontend-nextjs/node_modules/react-syntax-highlighter/dist/esm/checkForListedLanguage.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/frontend-nextjs/node_modules/react-syntax-highlighter/dist/esm/create-element.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/@babel/runtime/helpers/esm/extends.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$defineProperty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/@babel/runtime/helpers/esm/defineProperty.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
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
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$defineProperty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(e, r, t[r]);
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
        return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(TagName, (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({
            key: key
        }, props), children);
    }
}
}),
"[project]/frontend-nextjs/node_modules/react-syntax-highlighter/dist/esm/highlight.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$objectWithoutProperties$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$toConsumableArray$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$defineProperty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/@babel/runtime/helpers/esm/defineProperty.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$react$2d$syntax$2d$highlighter$2f$dist$2f$esm$2f$create$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/react-syntax-highlighter/dist/esm/create-element.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$react$2d$syntax$2d$highlighter$2f$dist$2f$esm$2f$checkForListedLanguage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/react-syntax-highlighter/dist/esm/checkForListedLanguage.js [app-client] (ecmascript)");
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
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$defineProperty$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(e, r, t[r]);
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
        return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement("span", {
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
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement("code", {
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
    properties['className'] = properties['className'] ? [].concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$toConsumableArray$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(properties['className'].trim().split(/\s+/)), (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$toConsumableArray$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(className)) : className;
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
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$toConsumableArray$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(new Set(className))
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
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$react$2d$syntax$2d$highlighter$2f$dist$2f$esm$2f$create$2d$element$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({
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
        var hasLanguage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$react$2d$syntax$2d$highlighter$2f$dist$2f$esm$2f$checkForListedLanguage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(astGenerator, language);
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
        } : _ref7$codeTagProps, _ref7$useInlineStyles = _ref7.useInlineStyles, useInlineStyles = _ref7$useInlineStyles === void 0 ? true : _ref7$useInlineStyles, _ref7$showLineNumbers = _ref7.showLineNumbers, showLineNumbers = _ref7$showLineNumbers === void 0 ? false : _ref7$showLineNumbers, _ref7$showInlineLineN = _ref7.showInlineLineNumbers, showInlineLineNumbers = _ref7$showInlineLineN === void 0 ? true : _ref7$showInlineLineN, _ref7$startingLineNum = _ref7.startingLineNumber, startingLineNumber = _ref7$startingLineNum === void 0 ? 1 : _ref7$startingLineNum, lineNumberContainerStyle = _ref7.lineNumberContainerStyle, _ref7$lineNumberStyle = _ref7.lineNumberStyle, lineNumberStyle = _ref7$lineNumberStyle === void 0 ? {} : _ref7$lineNumberStyle, wrapLines = _ref7.wrapLines, _ref7$wrapLongLines = _ref7.wrapLongLines, wrapLongLines = _ref7$wrapLongLines === void 0 ? false : _ref7$wrapLongLines, _ref7$lineProps = _ref7.lineProps, lineProps = _ref7$lineProps === void 0 ? {} : _ref7$lineProps, renderer = _ref7.renderer, _ref7$PreTag = _ref7.PreTag, PreTag = _ref7$PreTag === void 0 ? 'pre' : _ref7$PreTag, _ref7$CodeTag = _ref7.CodeTag, CodeTag = _ref7$CodeTag === void 0 ? 'code' : _ref7$CodeTag, _ref7$code = _ref7.code, code = _ref7$code === void 0 ? (Array.isArray(children) ? children[0] : children) || '' : _ref7$code, astGenerator = _ref7.astGenerator, rest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$objectWithoutProperties$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(_ref7, _excluded);
        astGenerator = astGenerator || defaultAstGenerator;
        var allLineNumbers = showLineNumbers ? /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(AllLineNumbers, {
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
            return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(PreTag, preProps, allLineNumbers, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(CodeTag, codeTagProps, code));
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
        return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(PreTag, preProps, /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(CodeTag, codeTagProps, !showInlineLineNumbers && allLineNumbers, renderer({
            rows: rows,
            stylesheet: style,
            useInlineStyles: useInlineStyles
        })));
    };
}
}),
"[project]/frontend-nextjs/node_modules/react-syntax-highlighter/dist/esm/languages/hljs/python.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$highlight$2e$js$2f$lib$2f$languages$2f$python$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/highlight.js/lib/languages/python.js [app-client] (ecmascript)");
;
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$highlight$2e$js$2f$lib$2f$languages$2f$python$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"];
}),
"[project]/frontend-nextjs/node_modules/react-syntax-highlighter/dist/esm/languages/hljs/r.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$highlight$2e$js$2f$lib$2f$languages$2f$r$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/highlight.js/lib/languages/r.js [app-client] (ecmascript)");
;
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$highlight$2e$js$2f$lib$2f$languages$2f$r$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"];
}),
"[project]/frontend-nextjs/node_modules/react-syntax-highlighter/dist/esm/languages/hljs/sas.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$highlight$2e$js$2f$lib$2f$languages$2f$sas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/highlight.js/lib/languages/sas.js [app-client] (ecmascript)");
;
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$highlight$2e$js$2f$lib$2f$languages$2f$sas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"];
}),
"[project]/frontend-nextjs/node_modules/react-syntax-highlighter/dist/esm/languages/hljs/sql.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$highlight$2e$js$2f$lib$2f$languages$2f$sql$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/highlight.js/lib/languages/sql.js [app-client] (ecmascript)");
;
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$highlight$2e$js$2f$lib$2f$languages$2f$sql$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"];
}),
"[project]/frontend-nextjs/node_modules/react-syntax-highlighter/dist/esm/light.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$react$2d$syntax$2d$highlighter$2f$dist$2f$esm$2f$highlight$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/react-syntax-highlighter/dist/esm/highlight.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lowlight$2f$lib$2f$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lowlight/lib/core.js [app-client] (ecmascript)");
;
;
var SyntaxHighlighter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$react$2d$syntax$2d$highlighter$2f$dist$2f$esm$2f$highlight$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lowlight$2f$lib$2f$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {});
SyntaxHighlighter.registerLanguage = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lowlight$2f$lib$2f$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].registerLanguage;
const __TURBOPACK__default__export__ = SyntaxHighlighter;
}),
"[project]/frontend-nextjs/node_modules/react-syntax-highlighter/dist/esm/styles/hljs/atom-one-dark.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/allDialects.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "bigquery",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$bigquery$2f$bigquery$2e$formatter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bigquery"],
    "clickhouse",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$clickhouse$2f$clickhouse$2e$formatter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clickhouse"],
    "db2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$db2$2f$db2$2e$formatter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db2"],
    "db2i",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$db2i$2f$db2i$2e$formatter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db2i"],
    "duckdb",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$duckdb$2f$duckdb$2e$formatter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["duckdb"],
    "hive",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$hive$2f$hive$2e$formatter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hive"],
    "mariadb",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$mariadb$2f$mariadb$2e$formatter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mariadb"],
    "mysql",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$mysql$2f$mysql$2e$formatter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mysql"],
    "n1ql",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$n1ql$2f$n1ql$2e$formatter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["n1ql"],
    "plsql",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$plsql$2f$plsql$2e$formatter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["plsql"],
    "postgresql",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$postgresql$2f$postgresql$2e$formatter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["postgresql"],
    "redshift",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$redshift$2f$redshift$2e$formatter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["redshift"],
    "singlestoredb",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$singlestoredb$2f$singlestoredb$2e$formatter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["singlestoredb"],
    "snowflake",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$snowflake$2f$snowflake$2e$formatter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["snowflake"],
    "spark",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$spark$2f$spark$2e$formatter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spark"],
    "sql",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$sql$2f$sql$2e$formatter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sql"],
    "sqlite",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$sqlite$2f$sqlite$2e$formatter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sqlite"],
    "tidb",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$tidb$2f$tidb$2e$formatter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tidb"],
    "transactsql",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$transactsql$2f$transactsql$2e$formatter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transactsql"],
    "trino",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$trino$2f$trino$2e$formatter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trino"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$allDialects$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/allDialects.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$bigquery$2f$bigquery$2e$formatter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/bigquery/bigquery.formatter.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$clickhouse$2f$clickhouse$2e$formatter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/clickhouse/clickhouse.formatter.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$db2$2f$db2$2e$formatter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/db2/db2.formatter.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$db2i$2f$db2i$2e$formatter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/db2i/db2i.formatter.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$duckdb$2f$duckdb$2e$formatter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/duckdb/duckdb.formatter.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$hive$2f$hive$2e$formatter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/hive/hive.formatter.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$mariadb$2f$mariadb$2e$formatter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/mariadb/mariadb.formatter.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$mysql$2f$mysql$2e$formatter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/mysql/mysql.formatter.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$tidb$2f$tidb$2e$formatter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/tidb/tidb.formatter.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$n1ql$2f$n1ql$2e$formatter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/n1ql/n1ql.formatter.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$plsql$2f$plsql$2e$formatter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/plsql/plsql.formatter.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$postgresql$2f$postgresql$2e$formatter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/postgresql/postgresql.formatter.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$redshift$2f$redshift$2e$formatter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/redshift/redshift.formatter.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$spark$2f$spark$2e$formatter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/spark/spark.formatter.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$sqlite$2f$sqlite$2e$formatter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/sqlite/sqlite.formatter.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$sql$2f$sql$2e$formatter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/sql/sql.formatter.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$trino$2f$trino$2e$formatter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/trino/trino.formatter.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$transactsql$2f$transactsql$2e$formatter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/transactsql/transactsql.formatter.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$singlestoredb$2f$singlestoredb$2e$formatter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/singlestoredb/singlestoredb.formatter.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$snowflake$2f$snowflake$2e$formatter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/snowflake/snowflake.formatter.js [app-client] (ecmascript)");
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/allDialects.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/dialect.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createDialect",
    ()=>createDialect
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$Tokenizer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/lexer/Tokenizer.js [app-client] (ecmascript)");
;
const cache = new Map();
const createDialect = (options)=>{
    let dialect = cache.get(options);
    if (!dialect) {
        dialect = dialectFromOptions(options);
        cache.set(options, dialect);
    }
    return dialect;
};
const dialectFromOptions = (dialectOptions)=>({
        tokenizer: new __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$Tokenizer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](dialectOptions.tokenizerOptions, dialectOptions.name),
        formatOptions: processDialectFormatOptions(dialectOptions)
    });
const processDialectFormatOptions = ({ tokenizerOptions, formatOptions: options })=>{
    var _a, _b;
    return {
        alwaysDenseOperators: options.alwaysDenseOperators || [],
        onelineClauses: Object.fromEntries(options.onelineClauses.map((name)=>[
                name,
                true
            ])),
        tabularOnelineClauses: Object.fromEntries(((_a = options.tabularOnelineClauses) !== null && _a !== void 0 ? _a : options.onelineClauses).map((name)=>[
                name,
                true
            ])),
        identifierDashes: Boolean((_b = tokenizerOptions.identChars) === null || _b === void 0 ? void 0 : _b.dashes)
    };
};
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/expandPhrases.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Performs expandSinglePhrase() on array
 */ __turbopack_context__.s([
    "expandPhrases",
    ()=>expandPhrases,
    "expandSinglePhrase",
    ()=>expandSinglePhrase
]);
const expandPhrases = (phrases)=>phrases.flatMap(expandSinglePhrase);
const expandSinglePhrase = (phrase)=>buildCombinations(parsePhrase(phrase)).map(stripExtraWhitespace);
const stripExtraWhitespace = (text)=>text.replace(/ +/g, ' ').trim();
const parsePhrase = (text)=>({
        type: 'mandatory_block',
        items: parseAlteration(text, 0)[0]
    });
const parseAlteration = (text, index, expectClosing)=>{
    const alterations = [];
    while(text[index]){
        const [term, newIndex] = parseConcatenation(text, index);
        alterations.push(term);
        index = newIndex;
        if (text[index] === '|') {
            index++;
        } else if (text[index] === '}' || text[index] === ']') {
            if (expectClosing !== text[index]) {
                throw new Error(`Unbalanced parenthesis in: ${text}`);
            }
            index++;
            return [
                alterations,
                index
            ];
        } else if (index === text.length) {
            if (expectClosing) {
                throw new Error(`Unbalanced parenthesis in: ${text}`);
            }
            return [
                alterations,
                index
            ];
        } else {
            throw new Error(`Unexpected "${text[index]}"`);
        }
    }
    return [
        alterations,
        index
    ];
};
const parseConcatenation = (text, index)=>{
    const items = [];
    while(true){
        const [term, newIndex] = parseTerm(text, index);
        if (term) {
            items.push(term);
            index = newIndex;
        } else {
            break;
        }
    }
    return items.length === 1 ? [
        items[0],
        index
    ] : [
        {
            type: 'concatenation',
            items
        },
        index
    ];
};
const parseTerm = (text, index)=>{
    if (text[index] === '{') {
        return parseMandatoryBlock(text, index + 1);
    } else if (text[index] === '[') {
        return parseOptionalBlock(text, index + 1);
    } else {
        let word = '';
        while(text[index] && /[A-Za-z0-9_ ]/.test(text[index])){
            word += text[index];
            index++;
        }
        return [
            word,
            index
        ];
    }
};
const parseMandatoryBlock = (text, index)=>{
    const [items, newIndex] = parseAlteration(text, index, '}');
    return [
        {
            type: 'mandatory_block',
            items
        },
        newIndex
    ];
};
const parseOptionalBlock = (text, index)=>{
    const [items, newIndex] = parseAlteration(text, index, ']');
    return [
        {
            type: 'optional_block',
            items
        },
        newIndex
    ];
};
const buildCombinations = (node)=>{
    if (typeof node === 'string') {
        return [
            node
        ];
    } else if (node.type === 'concatenation') {
        return node.items.map(buildCombinations).reduce(stringCombinations, [
            ''
        ]);
    } else if (node.type === 'mandatory_block') {
        return node.items.flatMap(buildCombinations);
    } else if (node.type === 'optional_block') {
        return [
            '',
            ...node.items.flatMap(buildCombinations)
        ];
    } else {
        throw new Error(`Unknown node type: ${node}`);
    }
};
const stringCombinations = (xs, ys)=>{
    const results = [];
    for (const x of xs){
        for (const y of ys){
            results.push(x + y);
        }
    }
    return results;
};
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/formatter/ExpressionFormatter.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ExpressionFormatter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/formatter/config.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/lexer/token.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$ast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/parser/ast.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/formatter/Layout.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$tabularStyle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/formatter/tabularStyle.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$InlineLayout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/formatter/InlineLayout.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
class ExpressionFormatter {
    constructor({ cfg, dialectCfg, params, layout, inline = false, enclosingParenthesis }){
        this.inline = false;
        this.nodes = [];
        this.index = -1;
        this.cfg = cfg;
        this.dialectCfg = dialectCfg;
        this.inline = inline;
        this.params = params;
        this.layout = layout;
        this.enclosingParenthesis = enclosingParenthesis;
    }
    format(nodes) {
        this.nodes = nodes;
        for(this.index = 0; this.index < this.nodes.length; this.index++){
            this.formatNode(this.nodes[this.index]);
        }
        return this.layout;
    }
    formatNode(node) {
        this.formatComments(node.leadingComments);
        this.formatNodeWithoutComments(node);
        this.formatComments(node.trailingComments);
    }
    formatNodeWithoutComments(node) {
        switch(node.type){
            case __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$ast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].function_call:
                return this.formatFunctionCall(node);
            case __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$ast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].parameterized_data_type:
                return this.formatParameterizedDataType(node);
            case __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$ast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].array_subscript:
                return this.formatArraySubscript(node);
            case __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$ast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].property_access:
                return this.formatPropertyAccess(node);
            case __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$ast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].parenthesis:
                return this.formatParenthesis(node);
            case __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$ast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].between_predicate:
                return this.formatBetweenPredicate(node);
            case __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$ast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].case_expression:
                return this.formatCaseExpression(node);
            case __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$ast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].case_when:
                return this.formatCaseWhen(node);
            case __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$ast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].case_else:
                return this.formatCaseElse(node);
            case __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$ast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].clause:
                return this.formatClause(node);
            case __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$ast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].set_operation:
                return this.formatSetOperation(node);
            case __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$ast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].limit_clause:
                return this.formatLimitClause(node);
            case __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$ast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].all_columns_asterisk:
                return this.formatAllColumnsAsterisk(node);
            case __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$ast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].literal:
                return this.formatLiteral(node);
            case __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$ast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].identifier:
                return this.formatIdentifier(node);
            case __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$ast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].parameter:
                return this.formatParameter(node);
            case __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$ast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].operator:
                return this.formatOperator(node);
            case __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$ast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].comma:
                return this.formatComma(node);
            case __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$ast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].line_comment:
                return this.formatLineComment(node);
            case __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$ast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].block_comment:
                return this.formatBlockComment(node);
            case __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$ast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].disable_comment:
                return this.formatBlockComment(node);
            case __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$ast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].data_type:
                return this.formatDataType(node);
            case __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$ast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].keyword:
                return this.formatKeywordNode(node);
        }
    }
    formatFunctionCall(node) {
        this.withComments(node.nameKw, ()=>{
            this.layout.add(this.showFunctionKw(node.nameKw));
        });
        this.formatNode(node.parenthesis);
    }
    formatParameterizedDataType(node) {
        this.withComments(node.dataType, ()=>{
            this.layout.add(this.showDataType(node.dataType));
        });
        this.formatNode(node.parenthesis);
    }
    formatArraySubscript(node) {
        let formattedArray;
        switch(node.array.type){
            case __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$ast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].data_type:
                formattedArray = this.showDataType(node.array);
                break;
            case __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$ast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].keyword:
                formattedArray = this.showKw(node.array);
                break;
            default:
                formattedArray = this.showIdentifier(node.array);
                break;
        }
        this.withComments(node.array, ()=>{
            this.layout.add(formattedArray);
        });
        this.formatNode(node.parenthesis);
    }
    formatPropertyAccess(node) {
        this.formatNode(node.object);
        this.layout.add(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].NO_SPACE, node.operator);
        this.formatNode(node.property);
    }
    formatParenthesis(node) {
        const inlineLayout = this.formatInlineExpression(node.children, node.openParen);
        if (inlineLayout) {
            this.layout.add(node.openParen);
            this.layout.add(...inlineLayout.getLayoutItems());
            this.layout.add(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].NO_SPACE, node.closeParen, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].SPACE);
        } else {
            this.layout.add(node.openParen, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].NEWLINE);
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isTabularStyle"])(this.cfg)) {
                this.layout.add(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].INDENT);
                this.layout = this.formatSubExpression(node.children, node.openParen);
            } else {
                this.layout.indentation.increaseBlockLevel();
                this.layout.add(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].INDENT);
                this.layout = this.formatSubExpression(node.children, node.openParen);
                this.layout.indentation.decreaseBlockLevel();
            }
            this.layout.add(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].NEWLINE, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].INDENT, node.closeParen, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].SPACE);
        }
    }
    formatBetweenPredicate(node) {
        this.layout.add(this.showKw(node.betweenKw), __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].SPACE);
        this.layout = this.formatSubExpression(node.expr1);
        this.layout.add(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].NO_SPACE, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].SPACE, this.showNonTabularKw(node.andKw), __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].SPACE);
        this.layout = this.formatSubExpression(node.expr2);
        this.layout.add(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].NO_SPACE, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].SPACE);
    }
    formatCaseExpression(node) {
        this.formatNode(node.caseKw);
        this.layout.indentation.increaseBlockLevel();
        this.layout = this.formatSubExpression(node.expr);
        this.layout = this.formatSubExpression(node.clauses);
        this.layout.indentation.decreaseBlockLevel();
        this.layout.add(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].NEWLINE, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].INDENT);
        this.formatNode(node.endKw);
    }
    formatCaseWhen(node) {
        this.layout.add(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].NEWLINE, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].INDENT);
        this.formatNode(node.whenKw);
        this.layout = this.formatSubExpression(node.condition);
        this.formatNode(node.thenKw);
        this.layout = this.formatSubExpression(node.result);
    }
    formatCaseElse(node) {
        this.layout.add(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].NEWLINE, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].INDENT);
        this.formatNode(node.elseKw);
        this.layout = this.formatSubExpression(node.result);
    }
    formatClause(node) {
        if (this.isOnelineClause(node)) {
            this.formatClauseInOnelineStyle(node);
        } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isTabularStyle"])(this.cfg)) {
            this.formatClauseInTabularStyle(node);
        } else {
            this.formatClauseInIndentedStyle(node);
        }
    }
    isOnelineClause(node) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isTabularStyle"])(this.cfg)) {
            return this.dialectCfg.tabularOnelineClauses[node.nameKw.text];
        } else {
            return this.dialectCfg.onelineClauses[node.nameKw.text];
        }
    }
    formatClauseInIndentedStyle(node) {
        this.layout.add(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].NEWLINE, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].INDENT, this.showKw(node.nameKw), __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].NEWLINE);
        this.layout.indentation.increaseTopLevel();
        this.layout.add(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].INDENT);
        this.layout = this.formatSubExpression(node.children);
        this.layout.indentation.decreaseTopLevel();
    }
    formatClauseInOnelineStyle(node) {
        this.layout.add(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].NEWLINE, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].INDENT, this.showKw(node.nameKw), __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].SPACE);
        this.layout = this.formatSubExpression(node.children);
    }
    formatClauseInTabularStyle(node) {
        this.layout.add(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].NEWLINE, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].INDENT, this.showKw(node.nameKw), __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].SPACE);
        this.layout.indentation.increaseTopLevel();
        this.layout = this.formatSubExpression(node.children);
        this.layout.indentation.decreaseTopLevel();
    }
    formatSetOperation(node) {
        this.layout.add(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].NEWLINE, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].INDENT, this.showKw(node.nameKw), __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].NEWLINE);
        this.layout.add(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].INDENT);
        this.layout = this.formatSubExpression(node.children);
    }
    formatLimitClause(node) {
        this.withComments(node.limitKw, ()=>{
            this.layout.add(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].NEWLINE, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].INDENT, this.showKw(node.limitKw));
        });
        this.layout.indentation.increaseTopLevel();
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isTabularStyle"])(this.cfg)) {
            this.layout.add(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].SPACE);
        } else {
            this.layout.add(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].NEWLINE, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].INDENT);
        }
        if (node.offset) {
            this.layout = this.formatSubExpression(node.offset);
            this.layout.add(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].NO_SPACE, ',', __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].SPACE);
            this.layout = this.formatSubExpression(node.count);
        } else {
            this.layout = this.formatSubExpression(node.count);
        }
        this.layout.indentation.decreaseTopLevel();
    }
    formatAllColumnsAsterisk(_node) {
        this.layout.add('*', __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].SPACE);
    }
    formatLiteral(node) {
        this.layout.add(node.text, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].SPACE);
    }
    formatIdentifier(node) {
        this.layout.add(this.showIdentifier(node), __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].SPACE);
    }
    formatParameter(node) {
        this.layout.add(this.params.get(node), __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].SPACE);
    }
    formatOperator({ text }) {
        // In dialects that allow dashes inside identifiers (e.g. BigQuery) the "-"
        // operator must keep its surrounding spaces. Densing "a - b" into "a-b"
        // would otherwise re-parse as a single dashed identifier.
        if (text === '-' && this.dialectCfg.identifierDashes) {
            this.layout.add(text, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].SPACE);
        } else if (/^OPERATOR\s*\(/iu.test(text)) {
            // PostgreSQL's "OPERATOR(schema.+)" is a keyword-like operator. Densing it
            // would glue it to its operands ("aOPERATOR(...)b") and re-parse as invalid
            // SQL, so keep its surrounding spaces even with denseOperators.
            this.layout.add(text, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].SPACE);
        } else if (this.cfg.denseOperators || this.dialectCfg.alwaysDenseOperators.includes(text)) {
            this.layout.add(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].NO_SPACE, text);
        } else if (text === ':' && this.enclosingParenthesis === '[') {
            // Array slice colon (e.g. arr[1:5]) should be formatted as dense
            this.layout.add(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].NO_SPACE, text);
        } else if (text === ':') {
            this.layout.add(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].NO_SPACE, text, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].SPACE);
        } else {
            this.layout.add(text, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].SPACE);
        }
    }
    formatComma(_node) {
        if (!this.inline) {
            this.layout.add(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].NO_SPACE, ',', __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].NEWLINE, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].INDENT);
        } else {
            this.layout.add(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].NO_SPACE, ',', __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].SPACE);
        }
    }
    withComments(node, fn) {
        this.formatComments(node.leadingComments);
        fn();
        this.formatComments(node.trailingComments);
    }
    formatComments(comments) {
        if (!comments) {
            return;
        }
        comments.forEach((com)=>{
            if (com.type === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$ast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].line_comment) {
                this.formatLineComment(com);
            } else {
                this.formatBlockComment(com);
            }
        });
    }
    formatLineComment(node) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMultiline"])(node.precedingWhitespace || '')) {
            this.layout.add(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].NEWLINE, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].INDENT, node.text, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].MANDATORY_NEWLINE, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].INDENT);
        } else if (this.layout.getLayoutItems().length > 0) {
            this.layout.add(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].NO_NEWLINE, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].SPACE, node.text, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].MANDATORY_NEWLINE, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].INDENT);
        } else {
            // comment is the first item in code - no need to add preceding spaces
            this.layout.add(node.text, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].MANDATORY_NEWLINE, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].INDENT);
        }
    }
    formatBlockComment(node) {
        if (node.type === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$ast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].block_comment && this.isStandaloneBlockComment(node)) {
            this.splitBlockComment(node.text).forEach((line)=>{
                this.layout.add(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].NEWLINE, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].INDENT, line);
            });
            this.layout.add(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].NEWLINE, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].INDENT);
        } else {
            this.layout.add(node.text, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].SPACE);
        }
    }
    // True when:
    //
    // - the source text had a newline before the comment
    // - the comment itself is multi-line
    // - we have already added a newline to output text (right before this to-be added comment)
    //
    // The last one will ensure the comment position stays idempotent - so that
    // re-formatting the same SQL won't result in comment position changing.
    isStandaloneBlockComment(node) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMultiline"])(node.text) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMultiline"])(node.precedingWhitespace || '') || this.layout.isAtStartOfLine();
    }
    isDocComment(comment) {
        const lines = comment.split(/\n/);
        return(// first line starts with /* or /**
        /^\/\*\*?$/.test(lines[0]) && // intermediate lines start with *
        lines.slice(1, lines.length - 1).every((line)=>/^\s*\*/.test(line)) && // last line ends with */
        /^\s*\*\/$/.test((0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["last"])(lines)));
    }
    // Breaks up block comment to multiple lines.
    // For example this doc-comment (dots representing leading whitespace):
    //
    //   ..../**
    //   .....* Some description here
    //   .....* and here too
    //   .....*/
    //
    // gets broken to this array (note the leading single spaces):
    //
    //   [ '/**',
    //     '.* Some description here',
    //     '.* and here too',
    //     '.*/' ]
    //
    // However, a normal comment (non-doc-comment) like this:
    //
    //   ..../*
    //   ....Some description here
    //   ....*/
    //
    // gets broken to this array (no leading spaces):
    //
    //   [ '/*',
    //     'Some description here',
    //     '*/' ]
    //
    splitBlockComment(comment) {
        if (this.isDocComment(comment)) {
            return comment.split(/\n/).map((line)=>{
                if (/^\s*\*/.test(line)) {
                    return ' ' + line.replace(/^\s*/, '');
                } else {
                    return line;
                }
            });
        } else {
            return comment.split(/\n/).map((line)=>line.replace(/^\s*/, ''));
        }
    }
    formatSubExpression(nodes, enclosingParenthesis = this.enclosingParenthesis) {
        return new ExpressionFormatter({
            cfg: this.cfg,
            dialectCfg: this.dialectCfg,
            params: this.params,
            layout: this.layout,
            inline: this.inline,
            enclosingParenthesis
        }).format(nodes);
    }
    formatInlineExpression(nodes, enclosingParenthesis = this.enclosingParenthesis) {
        const oldParamIndex = this.params.getPositionalParameterIndex();
        try {
            return new ExpressionFormatter({
                cfg: this.cfg,
                dialectCfg: this.dialectCfg,
                params: this.params,
                layout: new __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$InlineLayout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](this.cfg.expressionWidth),
                inline: true,
                enclosingParenthesis
            }).format(nodes);
        } catch (e) {
            if (e instanceof __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$InlineLayout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InlineLayoutError"]) {
                // While formatting, some of the positional parameters might have
                // been consumed, which increased the current parameter index.
                // We reset the index to an earlier state, so we can run the
                // formatting again and re-consume these parameters in non-inline mode.
                this.params.setPositionalParameterIndex(oldParamIndex);
                return undefined;
            } else {
                // forward all unexpected errors
                throw e;
            }
        }
    }
    formatKeywordNode(node) {
        switch(node.tokenType){
            case __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].RESERVED_JOIN:
                return this.formatJoin(node);
            case __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].AND:
            case __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].OR:
            case __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].XOR:
                return this.formatLogicalOperator(node);
            default:
                return this.formatKeyword(node);
        }
    }
    formatJoin(node) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isTabularStyle"])(this.cfg)) {
            // in tabular style JOINs are at the same level as clauses
            this.layout.indentation.decreaseTopLevel();
            this.layout.add(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].NEWLINE, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].INDENT, this.showKw(node), __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].SPACE);
            this.layout.indentation.increaseTopLevel();
        } else {
            this.layout.add(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].NEWLINE, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].INDENT, this.showKw(node), __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].SPACE);
        }
    }
    formatKeyword(node) {
        this.layout.add(this.showKw(node), __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].SPACE);
    }
    formatLogicalOperator(node) {
        if (this.cfg.logicalOperatorNewline === 'before') {
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isTabularStyle"])(this.cfg)) {
                // In tabular style AND/OR is placed on the same level as clauses
                this.layout.indentation.decreaseTopLevel();
                this.layout.add(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].NEWLINE, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].INDENT, this.showKw(node), __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].SPACE);
                this.layout.indentation.increaseTopLevel();
            } else {
                this.layout.add(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].NEWLINE, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].INDENT, this.showKw(node), __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].SPACE);
            }
        } else {
            this.layout.add(this.showKw(node), __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].NEWLINE, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].INDENT);
        }
    }
    formatDataType(node) {
        this.layout.add(this.showDataType(node), __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].SPACE);
    }
    showKw(node) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$tabularStyle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isTabularToken"])(node.tokenType)) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$tabularStyle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(this.showNonTabularKw(node), this.cfg.indentStyle);
        } else {
            return this.showNonTabularKw(node);
        }
    }
    // Like showKw(), but skips tabular formatting
    showNonTabularKw(node) {
        switch(this.cfg.keywordCase){
            case 'preserve':
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["equalizeWhitespace"])(node.raw);
            case 'upper':
                return node.text;
            case 'lower':
                return node.text.toLowerCase();
        }
    }
    showFunctionKw(node) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$tabularStyle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isTabularToken"])(node.tokenType)) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$tabularStyle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(this.showNonTabularFunctionKw(node), this.cfg.indentStyle);
        } else {
            return this.showNonTabularFunctionKw(node);
        }
    }
    // Like showFunctionKw(), but skips tabular formatting
    showNonTabularFunctionKw(node) {
        switch(this.cfg.functionCase){
            case 'preserve':
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["equalizeWhitespace"])(node.raw);
            case 'upper':
                return node.text;
            case 'lower':
                return node.text.toLowerCase();
        }
    }
    showIdentifier(node) {
        if (node.quoted) {
            return node.text;
        } else {
            switch(this.cfg.identifierCase){
                case 'preserve':
                    return node.text;
                case 'upper':
                    return node.text.toUpperCase();
                case 'lower':
                    return node.text.toLowerCase();
            }
        }
    }
    showDataType(node) {
        switch(this.cfg.dataTypeCase){
            case 'preserve':
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["equalizeWhitespace"])(node.raw);
            case 'upper':
                return node.text;
            case 'lower':
                return node.text.toLowerCase();
        }
    }
}
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/formatter/Formatter.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Formatter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/formatter/config.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Params$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/formatter/Params.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$createParser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/parser/createParser.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$ExpressionFormatter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/formatter/ExpressionFormatter.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/formatter/Layout.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Indentation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/formatter/Indentation.js [app-client] (ecmascript)");
;
;
;
;
;
;
class Formatter {
    constructor(dialect, cfg){
        this.dialect = dialect;
        this.cfg = cfg;
        this.params = new __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Params$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](this.cfg.params);
    }
    /**
     * Formats an SQL query.
     * @param {string} query - The SQL query string to be formatted
     * @return {string} The formatter query
     */ format(query) {
        const ast = this.parse(query);
        const formattedQuery = this.formatAst(ast);
        return formattedQuery.trimEnd();
    }
    parse(query) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$createParser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createParser"])(this.dialect.tokenizer).parse(query, this.cfg.paramTypes || {});
    }
    formatAst(statements) {
        return statements.map((stat)=>this.formatStatement(stat)).join('\n'.repeat(this.cfg.linesBetweenQueries + 1));
    }
    formatStatement(statement) {
        const layout = new __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$ExpressionFormatter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]({
            cfg: this.cfg,
            dialectCfg: this.dialect.formatOptions,
            params: this.params,
            layout: new __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](new __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Indentation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$config$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["indentString"])(this.cfg)))
        }).format(statement.children);
        if (!statement.hasSemicolon) {
        // do nothing
        } else if (this.cfg.newlineBeforeSemicolon) {
            layout.add(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].NEWLINE, ';');
        } else {
            layout.add(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].NO_NEWLINE, ';');
        }
        return layout.toString();
    }
}
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/formatter/Indentation.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Indentation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/utils.js [app-client] (ecmascript)");
;
const INDENT_TYPE_TOP_LEVEL = 'top-level';
const INDENT_TYPE_BLOCK_LEVEL = 'block-level';
class Indentation {
    /**
     * @param {string} indent A string to indent with
     */ constructor(indent){
        this.indent = indent;
        this.indentTypes = [];
    }
    /**
     * Returns indentation string for single indentation step.
     */ getSingleIndent() {
        return this.indent;
    }
    /**
     * Returns current indentation level
     */ getLevel() {
        return this.indentTypes.length;
    }
    /**
     * Increases indentation by one top-level indent.
     */ increaseTopLevel() {
        this.indentTypes.push(INDENT_TYPE_TOP_LEVEL);
    }
    /**
     * Increases indentation by one block-level indent.
     */ increaseBlockLevel() {
        this.indentTypes.push(INDENT_TYPE_BLOCK_LEVEL);
    }
    /**
     * Decreases indentation by one top-level indent.
     * Does nothing when the previous indent is not top-level.
     */ decreaseTopLevel() {
        if (this.indentTypes.length > 0 && (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["last"])(this.indentTypes) === INDENT_TYPE_TOP_LEVEL) {
            this.indentTypes.pop();
        }
    }
    /**
     * Decreases indentation by one block-level indent.
     * If there are top-level indents within the block-level indent,
     * throws away these as well.
     */ decreaseBlockLevel() {
        while(this.indentTypes.length > 0){
            const type = this.indentTypes.pop();
            if (type !== INDENT_TYPE_TOP_LEVEL) {
                break;
            }
        }
    }
}
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/formatter/InlineLayout.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InlineLayoutError",
    ()=>InlineLayoutError,
    "default",
    ()=>InlineLayout
]);
// eslint-disable-next-line max-classes-per-file
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Indentation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/formatter/Indentation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/formatter/Layout.js [app-client] (ecmascript)");
;
;
class InlineLayout extends __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] {
    constructor(expressionWidth){
        super(new __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Indentation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]('')); // no indentation in inline layout
        this.expressionWidth = expressionWidth;
        this.length = 0;
        // Keeps track of the trailing whitespace,
        // so that we can decrease length when encountering WS.NO_SPACE,
        // but only when there actually is a space to remove.
        this.trailingSpace = false;
    }
    add(...items) {
        items.forEach((item)=>this.addToLength(item));
        if (this.length > this.expressionWidth) {
            // We have exceeded the allowable width
            throw new InlineLayoutError();
        }
        super.add(...items);
    }
    addToLength(item) {
        if (typeof item === 'string') {
            this.length += item.length;
            this.trailingSpace = false;
        } else if (item === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].MANDATORY_NEWLINE || item === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].NEWLINE) {
            // newlines not allowed within inline block
            throw new InlineLayoutError();
        } else if (item === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].INDENT || item === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].SINGLE_INDENT || item === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].SPACE) {
            if (!this.trailingSpace) {
                this.length++;
                this.trailingSpace = true;
            }
        } else if (item === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].NO_NEWLINE || item === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Layout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WS"].NO_SPACE) {
            if (this.trailingSpace) {
                this.trailingSpace = false;
                this.length--;
            }
        }
    }
}
class InlineLayoutError extends Error {
}
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/formatter/Layout.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WS",
    ()=>WS,
    "default",
    ()=>Layout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/utils.js [app-client] (ecmascript)");
;
var WS;
(function(WS) {
    WS[WS["SPACE"] = 0] = "SPACE";
    WS[WS["NO_SPACE"] = 1] = "NO_SPACE";
    WS[WS["NO_NEWLINE"] = 2] = "NO_NEWLINE";
    WS[WS["NEWLINE"] = 3] = "NEWLINE";
    WS[WS["MANDATORY_NEWLINE"] = 4] = "MANDATORY_NEWLINE";
    WS[WS["INDENT"] = 5] = "INDENT";
    WS[WS["SINGLE_INDENT"] = 6] = "SINGLE_INDENT";
})(WS = WS || (WS = {}));
class Layout {
    constructor(indentation){
        this.indentation = indentation;
        this.items = [];
    }
    /**
     * Appends token strings and whitespace modifications to SQL string.
     */ add(...items) {
        for (const item of items){
            switch(item){
                case WS.SPACE:
                    this.items.push(WS.SPACE);
                    break;
                case WS.NO_SPACE:
                    this.trimHorizontalWhitespace();
                    break;
                case WS.NO_NEWLINE:
                    this.trimWhitespace();
                    break;
                case WS.NEWLINE:
                    this.trimHorizontalWhitespace();
                    this.addNewline(WS.NEWLINE);
                    break;
                case WS.MANDATORY_NEWLINE:
                    this.trimHorizontalWhitespace();
                    this.addNewline(WS.MANDATORY_NEWLINE);
                    break;
                case WS.INDENT:
                    this.addIndentation();
                    break;
                case WS.SINGLE_INDENT:
                    this.items.push(WS.SINGLE_INDENT);
                    break;
                default:
                    // Don't glue a layout item starting with "-" directly onto one ending with
                    // "-": that forms "--", which re-parses as a line comment and
                    // swallows the rest of the line (e.g. densing "a - -b" into "a--b").
                    if (item.startsWith('-') && this.lastItemEndsWith('-')) {
                        this.items.push(WS.SPACE);
                    }
                    this.items.push(item);
            }
        }
    }
    lastItemEndsWith(suffix) {
        const lastItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["last"])(this.items);
        return typeof lastItem === 'string' && lastItem.endsWith(suffix);
    }
    trimHorizontalWhitespace() {
        while(isHorizontalWhitespace((0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["last"])(this.items))){
            this.items.pop();
        }
    }
    trimWhitespace() {
        while(isRemovableWhitespace((0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["last"])(this.items))){
            this.items.pop();
        }
    }
    addNewline(newline) {
        if (this.items.length > 0) {
            switch((0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["last"])(this.items)){
                case WS.NEWLINE:
                    this.items.pop();
                    this.items.push(newline);
                    break;
                case WS.MANDATORY_NEWLINE:
                    break;
                default:
                    this.items.push(newline);
                    break;
            }
        }
    }
    addIndentation() {
        for(let i = 0; i < this.indentation.getLevel(); i++){
            this.items.push(WS.SINGLE_INDENT);
        }
    }
    /**
     * Returns the final SQL string.
     */ toString() {
        return this.items.map((item)=>this.itemToString(item)).join('');
    }
    /**
     * Returns the internal layout data
     */ getLayoutItems() {
        return this.items;
    }
    /**
     * True when some content has already been added and nothing but indentation
     * has been emitted since the last newline, meaning the next token would be
     * placed at the start of a fresh (non-first) line.
     */ isAtStartOfLine() {
        for(let i = this.items.length - 1; i >= 0; i--){
            const item = this.items[i];
            if (item === WS.SINGLE_INDENT) {
                continue;
            }
            return item === WS.NEWLINE || item === WS.MANDATORY_NEWLINE;
        }
        return false;
    }
    itemToString(item) {
        switch(item){
            case WS.SPACE:
                return ' ';
            case WS.NEWLINE:
            case WS.MANDATORY_NEWLINE:
                return '\n';
            case WS.SINGLE_INDENT:
                return this.indentation.getSingleIndent();
            default:
                return item;
        }
    }
}
const isHorizontalWhitespace = (item)=>item === WS.SPACE || item === WS.SINGLE_INDENT;
const isRemovableWhitespace = (item)=>item === WS.SPACE || item === WS.SINGLE_INDENT || item === WS.NEWLINE;
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/formatter/Params.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Handles placeholder replacement with given params.
 */ __turbopack_context__.s([
    "default",
    ()=>Params
]);
class Params {
    constructor(params){
        this.params = params;
        this.index = 0;
    }
    /**
     * Returns param value that matches given placeholder with param key.
     */ get({ key, text }) {
        if (!this.params) {
            return text;
        }
        if (key) {
            return this.params[key];
        }
        return this.params[this.index++];
    }
    /**
     * Returns index of current positional parameter.
     */ getPositionalParameterIndex() {
        return this.index;
    }
    /**
     * Sets index of current positional parameter.
     */ setPositionalParameterIndex(i) {
        this.index = i;
    }
}
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/formatter/config.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Utility functions for config options
/**
 * Creates a string to use for one step of indentation.
 */ __turbopack_context__.s([
    "indentString",
    ()=>indentString,
    "isTabularStyle",
    ()=>isTabularStyle
]);
function indentString(cfg) {
    if (cfg.indentStyle === 'tabularLeft' || cfg.indentStyle === 'tabularRight') {
        return ' '.repeat(10);
    }
    if (cfg.useTabs) {
        return '\t';
    }
    return ' '.repeat(cfg.tabWidth);
}
function isTabularStyle(cfg) {
    return cfg.indentStyle === 'tabularLeft' || cfg.indentStyle === 'tabularRight';
}
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/formatter/tabularStyle.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>toTabularFormat,
    "isTabularToken",
    ()=>isTabularToken
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/lexer/token.js [app-client] (ecmascript)");
;
function toTabularFormat(tokenText, indentStyle) {
    if (indentStyle === 'standard') {
        return tokenText;
    }
    let tail = []; // rest of keyword
    if (tokenText.length >= 10 && tokenText.includes(' ')) {
        // split for long keywords like INNER JOIN or UNION DISTINCT
        [tokenText, ...tail] = tokenText.split(' ');
    }
    if (indentStyle === 'tabularLeft') {
        tokenText = tokenText.padEnd(9, ' ');
    } else {
        tokenText = tokenText.padStart(9, ' ');
    }
    return tokenText + [
        '',
        ...tail
    ].join(' ');
}
function isTabularToken(type) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLogicalOperator"])(type) || type === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].RESERVED_CLAUSE || type === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].RESERVED_SELECT || type === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].RESERVED_SET_OPERATION || type === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].RESERVED_JOIN || type === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].LIMIT;
}
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/bigquery/bigquery.formatter.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "bigquery",
    ()=>bigquery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/expandPhrases.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/lexer/token.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$bigquery$2f$bigquery$2e$functions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/bigquery/bigquery.functions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$bigquery$2f$bigquery$2e$keywords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/bigquery/bigquery.keywords.js [app-client] (ecmascript)");
;
;
;
;
const reservedSelect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'SELECT [ALL | DISTINCT] [AS STRUCT | AS VALUE]'
]);
const reservedClauses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    // Queries: https://cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax
    'WITH [RECURSIVE]',
    'FROM',
    'WHERE',
    'GROUP BY',
    'HAVING',
    'QUALIFY',
    'WINDOW',
    'PARTITION BY',
    'ORDER BY',
    'LIMIT',
    'OFFSET',
    'OMIT RECORD IF',
    // Data modification: https://cloud.google.com/bigquery/docs/reference/standard-sql/dml-syntax
    // - insert:
    'INSERT [INTO]',
    'VALUES',
    // - update:
    'SET',
    // - merge:
    'MERGE [INTO]',
    'WHEN [NOT] MATCHED [BY SOURCE | BY TARGET] [THEN]',
    'UPDATE SET',
    'CLUSTER BY',
    'FOR SYSTEM_TIME AS OF',
    'WITH CONNECTION',
    'WITH PARTITION COLUMNS',
    'REMOTE WITH CONNECTION'
]);
const standardOnelineClauses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'CREATE [OR REPLACE] [TEMP|TEMPORARY|SNAPSHOT|EXTERNAL] TABLE [IF NOT EXISTS]'
]);
const tabularOnelineClauses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    // - create:
    // https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language
    'CREATE [OR REPLACE] [MATERIALIZED] VIEW [IF NOT EXISTS]',
    // - update:
    'UPDATE',
    // - delete:
    'DELETE [FROM]',
    // - drop table:
    'DROP [SNAPSHOT | EXTERNAL] TABLE [IF EXISTS]',
    // - alter table:
    'ALTER TABLE [IF EXISTS]',
    'ADD COLUMN [IF NOT EXISTS]',
    'DROP COLUMN [IF EXISTS]',
    'RENAME TO',
    'ALTER COLUMN [IF EXISTS]',
    'SET DEFAULT COLLATE',
    'SET OPTIONS',
    'DROP NOT NULL',
    'SET DATA TYPE',
    // - alter schema
    'ALTER SCHEMA [IF EXISTS]',
    // - alter view
    'ALTER [MATERIALIZED] VIEW [IF EXISTS]',
    // - alter bi_capacity
    'ALTER BI_CAPACITY',
    // - truncate:
    'TRUNCATE TABLE',
    // - create schema
    'CREATE SCHEMA [IF NOT EXISTS]',
    'DEFAULT COLLATE',
    // stored procedures
    'CREATE [OR REPLACE] [TEMP|TEMPORARY|TABLE] FUNCTION [IF NOT EXISTS]',
    'CREATE [OR REPLACE] PROCEDURE [IF NOT EXISTS]',
    // row access policy
    'CREATE [OR REPLACE] ROW ACCESS POLICY [IF NOT EXISTS]',
    'GRANT TO',
    'FILTER USING',
    // capacity
    'CREATE CAPACITY',
    'AS JSON',
    // reservation
    'CREATE RESERVATION',
    // assignment
    'CREATE ASSIGNMENT',
    // search index
    'CREATE SEARCH INDEX [IF NOT EXISTS]',
    // drop
    'DROP SCHEMA [IF EXISTS]',
    'DROP [MATERIALIZED] VIEW [IF EXISTS]',
    'DROP [TABLE] FUNCTION [IF EXISTS]',
    'DROP PROCEDURE [IF EXISTS]',
    'DROP ROW ACCESS POLICY',
    'DROP ALL ROW ACCESS POLICIES',
    'DROP CAPACITY [IF EXISTS]',
    'DROP RESERVATION [IF EXISTS]',
    'DROP ASSIGNMENT [IF EXISTS]',
    'DROP SEARCH INDEX [IF EXISTS]',
    'DROP [IF EXISTS]',
    // DCL, https://cloud.google.com/bigquery/docs/reference/standard-sql/data-control-language
    'GRANT',
    'REVOKE',
    // Script, https://cloud.google.com/bigquery/docs/reference/standard-sql/scripting
    'DECLARE',
    'EXECUTE IMMEDIATE',
    'LOOP',
    'END LOOP',
    'REPEAT',
    'END REPEAT',
    'WHILE',
    'END WHILE',
    'BREAK',
    'LEAVE',
    'CONTINUE',
    'ITERATE',
    'FOR',
    'END FOR',
    'BEGIN',
    'BEGIN TRANSACTION',
    'COMMIT TRANSACTION',
    'ROLLBACK TRANSACTION',
    'RAISE',
    'RETURN',
    'CALL',
    // Debug, https://cloud.google.com/bigquery/docs/reference/standard-sql/debugging-statements
    'ASSERT',
    // Other, https://cloud.google.com/bigquery/docs/reference/standard-sql/other-statements
    'EXPORT DATA'
]);
const reservedSetOperations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'UNION {ALL | DISTINCT}',
    'EXCEPT DISTINCT',
    'INTERSECT DISTINCT'
]);
const reservedJoins = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'JOIN',
    '{LEFT | RIGHT | FULL} [OUTER] JOIN',
    '{INNER | CROSS} JOIN'
]);
const reservedKeywordPhrases = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    // https://cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#tablesample_operator
    'TABLESAMPLE SYSTEM',
    // From DDL: https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language
    'ANY TYPE',
    'ALL COLUMNS',
    'NOT DETERMINISTIC',
    // inside window definitions
    '{ROWS | RANGE} BETWEEN',
    // comparison operator
    'IS [NOT] DISTINCT FROM'
]);
const reservedDataTypePhrases = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([]);
const bigquery = {
    name: 'bigquery',
    tokenizerOptions: {
        reservedSelect,
        reservedClauses: [
            ...reservedClauses,
            ...tabularOnelineClauses,
            ...standardOnelineClauses
        ],
        reservedSetOperations,
        reservedJoins,
        reservedKeywordPhrases,
        reservedDataTypePhrases,
        reservedKeywords: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$bigquery$2f$bigquery$2e$keywords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keywords"],
        reservedDataTypes: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$bigquery$2f$bigquery$2e$keywords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dataTypes"],
        reservedFunctionNames: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$bigquery$2f$bigquery$2e$functions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["functions"],
        extraParens: [
            '[]'
        ],
        stringTypes: [
            // The triple-quoted strings are listed first, so they get matched first.
            // Otherwise the first two quotes of """ will get matched as an empty "" string.
            {
                quote: '""".."""',
                prefixes: [
                    'R',
                    'B',
                    'RB',
                    'BR'
                ]
            },
            {
                quote: "'''..'''",
                prefixes: [
                    'R',
                    'B',
                    'RB',
                    'BR'
                ]
            },
            '""-bs',
            "''-bs",
            {
                quote: '""-raw',
                prefixes: [
                    'R',
                    'B',
                    'RB',
                    'BR'
                ],
                requirePrefix: true
            },
            {
                quote: "''-raw",
                prefixes: [
                    'R',
                    'B',
                    'RB',
                    'BR'
                ],
                requirePrefix: true
            }
        ],
        identTypes: [
            '``'
        ],
        identChars: {
            dashes: true
        },
        paramTypes: {
            positional: true,
            named: [
                '@'
            ],
            quoted: [
                '@'
            ]
        },
        variableTypes: [
            {
                regex: String.raw`@@\w+`
            }
        ],
        lineCommentTypes: [
            '--',
            '#'
        ],
        operators: [
            '&',
            '|',
            '^',
            '~',
            '>>',
            '<<',
            '||',
            '=>'
        ],
        postProcess
    },
    formatOptions: {
        onelineClauses: [
            ...standardOnelineClauses,
            ...tabularOnelineClauses
        ],
        tabularOnelineClauses
    }
};
function postProcess(tokens) {
    return detectArraySubscripts(combineParameterizedTypes(tokens));
}
// Converts OFFSET token inside array from RESERVED_CLAUSE to RESERVED_FUNCTION_NAME
// See: https://cloud.google.com/bigquery/docs/reference/standard-sql/functions-and-operators#array_subscript_operator
function detectArraySubscripts(tokens) {
    let prevToken = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EOF_TOKEN"];
    return tokens.map((token)=>{
        if (token.text === 'OFFSET' && prevToken.text === '[') {
            prevToken = token;
            return Object.assign(Object.assign({}, token), {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].RESERVED_FUNCTION_NAME
            });
        } else {
            prevToken = token;
            return token;
        }
    });
}
// Combines multiple tokens forming a parameterized type like STRUCT<ARRAY<INT64>> into a single token
function combineParameterizedTypes(tokens) {
    var _a;
    const processed = [];
    for(let i = 0; i < tokens.length; i++){
        const token = tokens[i];
        if ((__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isToken"].ARRAY(token) || __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isToken"].STRUCT(token)) && ((_a = tokens[i + 1]) === null || _a === void 0 ? void 0 : _a.text) === '<') {
            const endIndex = findClosingAngleBracketIndex(tokens, i + 1);
            const typeDefTokens = tokens.slice(i, endIndex + 1);
            processed.push({
                type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].IDENTIFIER,
                raw: typeDefTokens.map(formatTypeDefToken('raw')).join(''),
                text: typeDefTokens.map(formatTypeDefToken('text')).join(''),
                start: token.start
            });
            i = endIndex;
        } else {
            processed.push(token);
        }
    }
    return processed;
}
const formatTypeDefToken = (key)=>(token)=>{
        if (token.type === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].IDENTIFIER || token.type === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].COMMA) {
            return token[key] + ' ';
        } else {
            return token[key];
        }
    };
function findClosingAngleBracketIndex(tokens, startIndex) {
    let level = 0;
    for(let i = startIndex; i < tokens.length; i++){
        const token = tokens[i];
        if (token.text === '<') {
            level++;
        } else if (token.text === '>') {
            level--;
        } else if (token.text === '>>') {
            level -= 2;
        }
        if (level === 0) {
            return i;
        }
    }
    return tokens.length - 1;
}
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/bigquery/bigquery.functions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "functions",
    ()=>functions
]);
const functions = [
    // https://cloud.google.com/bigquery/docs/reference/standard-sql/aead_encryption_functions
    'KEYS.NEW_KEYSET',
    'KEYS.ADD_KEY_FROM_RAW_BYTES',
    'AEAD.DECRYPT_BYTES',
    'AEAD.DECRYPT_STRING',
    'AEAD.ENCRYPT',
    'KEYS.KEYSET_CHAIN',
    'KEYS.KEYSET_FROM_JSON',
    'KEYS.KEYSET_TO_JSON',
    'KEYS.ROTATE_KEYSET',
    'KEYS.KEYSET_LENGTH',
    // https://cloud.google.com/bigquery/docs/reference/standard-sql/aggregate_analytic_functions
    'ANY_VALUE',
    'ARRAY_AGG',
    'AVG',
    'CORR',
    'COUNT',
    'COUNTIF',
    'COVAR_POP',
    'COVAR_SAMP',
    'MAX',
    'MIN',
    'ST_CLUSTERDBSCAN',
    'STDDEV_POP',
    'STDDEV_SAMP',
    'STRING_AGG',
    'SUM',
    'VAR_POP',
    'VAR_SAMP',
    // https://cloud.google.com/bigquery/docs/reference/standard-sql/aggregate_functions
    'ANY_VALUE',
    'ARRAY_AGG',
    'ARRAY_CONCAT_AGG',
    'AVG',
    'BIT_AND',
    'BIT_OR',
    'BIT_XOR',
    'COUNT',
    'COUNTIF',
    'LOGICAL_AND',
    'LOGICAL_OR',
    'MAX',
    'MIN',
    'STRING_AGG',
    'SUM',
    // https://cloud.google.com/bigquery/docs/reference/standard-sql/approximate_aggregate_functions
    'APPROX_COUNT_DISTINCT',
    'APPROX_QUANTILES',
    'APPROX_TOP_COUNT',
    'APPROX_TOP_SUM',
    // https://cloud.google.com/bigquery/docs/reference/standard-sql/array_functions
    // 'ARRAY',
    'ARRAY_CONCAT',
    'ARRAY_LENGTH',
    'ARRAY_TO_STRING',
    'GENERATE_ARRAY',
    'GENERATE_DATE_ARRAY',
    'GENERATE_TIMESTAMP_ARRAY',
    'ARRAY_REVERSE',
    'OFFSET',
    'SAFE_OFFSET',
    'ORDINAL',
    'SAFE_ORDINAL',
    // https://cloud.google.com/bigquery/docs/reference/standard-sql/bit_functions
    'BIT_COUNT',
    // https://cloud.google.com/bigquery/docs/reference/standard-sql/conversion_functions
    // 'CASE',
    'PARSE_BIGNUMERIC',
    'PARSE_NUMERIC',
    'SAFE_CAST',
    // https://cloud.google.com/bigquery/docs/reference/standard-sql/date_functions
    'CURRENT_DATE',
    'EXTRACT',
    'DATE',
    'DATE_ADD',
    'DATE_SUB',
    'DATE_DIFF',
    'DATE_TRUNC',
    'DATE_FROM_UNIX_DATE',
    'FORMAT_DATE',
    'LAST_DAY',
    'PARSE_DATE',
    'UNIX_DATE',
    // https://cloud.google.com/bigquery/docs/reference/standard-sql/datetime_functions
    'CURRENT_DATETIME',
    'DATETIME',
    'EXTRACT',
    'DATETIME_ADD',
    'DATETIME_SUB',
    'DATETIME_DIFF',
    'DATETIME_TRUNC',
    'FORMAT_DATETIME',
    'LAST_DAY',
    'PARSE_DATETIME',
    // https://cloud.google.com/bigquery/docs/reference/standard-sql/debugging_functions
    'ERROR',
    // https://cloud.google.com/bigquery/docs/reference/standard-sql/federated_query_functions
    'EXTERNAL_QUERY',
    // https://cloud.google.com/bigquery/docs/reference/standard-sql/geography_functions
    'S2_CELLIDFROMPOINT',
    'S2_COVERINGCELLIDS',
    'ST_ANGLE',
    'ST_AREA',
    'ST_ASBINARY',
    'ST_ASGEOJSON',
    'ST_ASTEXT',
    'ST_AZIMUTH',
    'ST_BOUNDARY',
    'ST_BOUNDINGBOX',
    'ST_BUFFER',
    'ST_BUFFERWITHTOLERANCE',
    'ST_CENTROID',
    'ST_CENTROID_AGG',
    'ST_CLOSESTPOINT',
    'ST_CLUSTERDBSCAN',
    'ST_CONTAINS',
    'ST_CONVEXHULL',
    'ST_COVEREDBY',
    'ST_COVERS',
    'ST_DIFFERENCE',
    'ST_DIMENSION',
    'ST_DISJOINT',
    'ST_DISTANCE',
    'ST_DUMP',
    'ST_DWITHIN',
    'ST_ENDPOINT',
    'ST_EQUALS',
    'ST_EXTENT',
    'ST_EXTERIORRING',
    'ST_GEOGFROM',
    'ST_GEOGFROMGEOJSON',
    'ST_GEOGFROMTEXT',
    'ST_GEOGFROMWKB',
    'ST_GEOGPOINT',
    'ST_GEOGPOINTFROMGEOHASH',
    'ST_GEOHASH',
    'ST_GEOMETRYTYPE',
    'ST_INTERIORRINGS',
    'ST_INTERSECTION',
    'ST_INTERSECTS',
    'ST_INTERSECTSBOX',
    'ST_ISCOLLECTION',
    'ST_ISEMPTY',
    'ST_LENGTH',
    'ST_MAKELINE',
    'ST_MAKEPOLYGON',
    'ST_MAKEPOLYGONORIENTED',
    'ST_MAXDISTANCE',
    'ST_NPOINTS',
    'ST_NUMGEOMETRIES',
    'ST_NUMPOINTS',
    'ST_PERIMETER',
    'ST_POINTN',
    'ST_SIMPLIFY',
    'ST_SNAPTOGRID',
    'ST_STARTPOINT',
    'ST_TOUCHES',
    'ST_UNION',
    'ST_UNION_AGG',
    'ST_WITHIN',
    'ST_X',
    'ST_Y',
    // https://cloud.google.com/bigquery/docs/reference/standard-sql/hash_functions
    'FARM_FINGERPRINT',
    'MD5',
    'SHA1',
    'SHA256',
    'SHA512',
    // https://cloud.google.com/bigquery/docs/reference/standard-sql/hll_functions
    'HLL_COUNT.INIT',
    'HLL_COUNT.MERGE',
    'HLL_COUNT.MERGE_PARTIAL',
    'HLL_COUNT.EXTRACT',
    // https://cloud.google.com/bigquery/docs/reference/standard-sql/interval_functions
    'MAKE_INTERVAL',
    'EXTRACT',
    'JUSTIFY_DAYS',
    'JUSTIFY_HOURS',
    'JUSTIFY_INTERVAL',
    // https://cloud.google.com/bigquery/docs/reference/standard-sql/json_functions
    'JSON_EXTRACT',
    'JSON_QUERY',
    'JSON_EXTRACT_SCALAR',
    'JSON_VALUE',
    'JSON_EXTRACT_ARRAY',
    'JSON_QUERY_ARRAY',
    'JSON_EXTRACT_STRING_ARRAY',
    'JSON_VALUE_ARRAY',
    'TO_JSON_STRING',
    // https://cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions
    'ABS',
    'SIGN',
    'IS_INF',
    'IS_NAN',
    'IEEE_DIVIDE',
    'RAND',
    'SQRT',
    'POW',
    'POWER',
    'EXP',
    'LN',
    'LOG',
    'LOG10',
    'GREATEST',
    'LEAST',
    'DIV',
    'SAFE_DIVIDE',
    'SAFE_MULTIPLY',
    'SAFE_NEGATE',
    'SAFE_ADD',
    'SAFE_SUBTRACT',
    'MOD',
    'ROUND',
    'TRUNC',
    'CEIL',
    'CEILING',
    'FLOOR',
    'COS',
    'COSH',
    'ACOS',
    'ACOSH',
    'SIN',
    'SINH',
    'ASIN',
    'ASINH',
    'TAN',
    'TANH',
    'ATAN',
    'ATANH',
    'ATAN2',
    'RANGE_BUCKET',
    // https://cloud.google.com/bigquery/docs/reference/standard-sql/navigation_functions
    'FIRST_VALUE',
    'LAST_VALUE',
    'NTH_VALUE',
    'LEAD',
    'LAG',
    'PERCENTILE_CONT',
    'PERCENTILE_DISC',
    // https://cloud.google.com/bigquery/docs/reference/standard-sql/net_functions
    'NET.IP_FROM_STRING',
    'NET.SAFE_IP_FROM_STRING',
    'NET.IP_TO_STRING',
    'NET.IP_NET_MASK',
    'NET.IP_TRUNC',
    'NET.IPV4_FROM_INT64',
    'NET.IPV4_TO_INT64',
    'NET.HOST',
    'NET.PUBLIC_SUFFIX',
    'NET.REG_DOMAIN',
    // https://cloud.google.com/bigquery/docs/reference/standard-sql/numbering_functions
    'RANK',
    'DENSE_RANK',
    'PERCENT_RANK',
    'CUME_DIST',
    'NTILE',
    'ROW_NUMBER',
    // https://cloud.google.com/bigquery/docs/reference/standard-sql/security_functions
    'SESSION_USER',
    // https://cloud.google.com/bigquery/docs/reference/standard-sql/statistical_aggregate_functions
    'CORR',
    'COVAR_POP',
    'COVAR_SAMP',
    'STDDEV_POP',
    'STDDEV_SAMP',
    'STDDEV',
    'VAR_POP',
    'VAR_SAMP',
    'VARIANCE',
    // https://cloud.google.com/bigquery/docs/reference/standard-sql/string_functions
    'ASCII',
    'BYTE_LENGTH',
    'CHAR_LENGTH',
    'CHARACTER_LENGTH',
    'CHR',
    'CODE_POINTS_TO_BYTES',
    'CODE_POINTS_TO_STRING',
    'CONCAT',
    'CONTAINS_SUBSTR',
    'ENDS_WITH',
    'FORMAT',
    'FROM_BASE32',
    'FROM_BASE64',
    'FROM_HEX',
    'INITCAP',
    'INSTR',
    'LEFT',
    'LENGTH',
    'LPAD',
    'LOWER',
    'LTRIM',
    'NORMALIZE',
    'NORMALIZE_AND_CASEFOLD',
    'OCTET_LENGTH',
    'REGEXP_CONTAINS',
    'REGEXP_EXTRACT',
    'REGEXP_EXTRACT_ALL',
    'REGEXP_INSTR',
    'REGEXP_REPLACE',
    'REGEXP_SUBSTR',
    'REPLACE',
    'REPEAT',
    'REVERSE',
    'RIGHT',
    'RPAD',
    'RTRIM',
    'SAFE_CONVERT_BYTES_TO_STRING',
    'SOUNDEX',
    'SPLIT',
    'STARTS_WITH',
    'STRPOS',
    'SUBSTR',
    'SUBSTRING',
    'TO_BASE32',
    'TO_BASE64',
    'TO_CODE_POINTS',
    'TO_HEX',
    'TRANSLATE',
    'TRIM',
    'UNICODE',
    'UPPER',
    // https://cloud.google.com/bigquery/docs/reference/standard-sql/time_functions
    'CURRENT_TIME',
    'TIME',
    'EXTRACT',
    'TIME_ADD',
    'TIME_SUB',
    'TIME_DIFF',
    'TIME_TRUNC',
    'FORMAT_TIME',
    'PARSE_TIME',
    // https://cloud.google.com/bigquery/docs/reference/standard-sql/timestamp_functions
    'CURRENT_TIMESTAMP',
    'EXTRACT',
    'STRING',
    'TIMESTAMP',
    'TIMESTAMP_ADD',
    'TIMESTAMP_SUB',
    'TIMESTAMP_DIFF',
    'TIMESTAMP_TRUNC',
    'FORMAT_TIMESTAMP',
    'PARSE_TIMESTAMP',
    'TIMESTAMP_SECONDS',
    'TIMESTAMP_MILLIS',
    'TIMESTAMP_MICROS',
    'UNIX_SECONDS',
    'UNIX_MILLIS',
    'UNIX_MICROS',
    // https://cloud.google.com/bigquery/docs/reference/standard-sql/uuid_functions
    'GENERATE_UUID',
    // https://cloud.google.com/bigquery/docs/reference/standard-sql/conditional_expressions
    'COALESCE',
    'IF',
    'IFNULL',
    'NULLIF',
    // https://cloud.google.com/bigquery/docs/reference/legacy-sql
    // legacyAggregate
    'AVG',
    'BIT_AND',
    'BIT_OR',
    'BIT_XOR',
    'CORR',
    'COUNT',
    'COVAR_POP',
    'COVAR_SAMP',
    'EXACT_COUNT_DISTINCT',
    'FIRST',
    'GROUP_CONCAT',
    'GROUP_CONCAT_UNQUOTED',
    'LAST',
    'MAX',
    'MIN',
    'NEST',
    'NTH',
    'QUANTILES',
    'STDDEV',
    'STDDEV_POP',
    'STDDEV_SAMP',
    'SUM',
    'TOP',
    'UNIQUE',
    'VARIANCE',
    'VAR_POP',
    'VAR_SAMP',
    // legacyBitwise
    'BIT_COUNT',
    // legacyCasting
    'BOOLEAN',
    'BYTES',
    'CAST',
    'FLOAT',
    'HEX_STRING',
    'INTEGER',
    'STRING',
    // legacyComparison
    // expr 'IN',
    'COALESCE',
    'GREATEST',
    'IFNULL',
    'IS_INF',
    'IS_NAN',
    'IS_EXPLICITLY_DEFINED',
    'LEAST',
    'NVL',
    // legacyDatetime
    'CURRENT_DATE',
    'CURRENT_TIME',
    'CURRENT_TIMESTAMP',
    'DATE',
    'DATE_ADD',
    'DATEDIFF',
    'DAY',
    'DAYOFWEEK',
    'DAYOFYEAR',
    'FORMAT_UTC_USEC',
    'HOUR',
    'MINUTE',
    'MONTH',
    'MSEC_TO_TIMESTAMP',
    'NOW',
    'PARSE_UTC_USEC',
    'QUARTER',
    'SEC_TO_TIMESTAMP',
    'SECOND',
    'STRFTIME_UTC_USEC',
    'TIME',
    'TIMESTAMP',
    'TIMESTAMP_TO_MSEC',
    'TIMESTAMP_TO_SEC',
    'TIMESTAMP_TO_USEC',
    'USEC_TO_TIMESTAMP',
    'UTC_USEC_TO_DAY',
    'UTC_USEC_TO_HOUR',
    'UTC_USEC_TO_MONTH',
    'UTC_USEC_TO_WEEK',
    'UTC_USEC_TO_YEAR',
    'WEEK',
    'YEAR',
    // legacyIp
    'FORMAT_IP',
    'PARSE_IP',
    'FORMAT_PACKED_IP',
    'PARSE_PACKED_IP',
    // legacyJson
    'JSON_EXTRACT',
    'JSON_EXTRACT_SCALAR',
    // legacyMath
    'ABS',
    'ACOS',
    'ACOSH',
    'ASIN',
    'ASINH',
    'ATAN',
    'ATANH',
    'ATAN2',
    'CEIL',
    'COS',
    'COSH',
    'DEGREES',
    'EXP',
    'FLOOR',
    'LN',
    'LOG',
    'LOG2',
    'LOG10',
    'PI',
    'POW',
    'RADIANS',
    'RAND',
    'ROUND',
    'SIN',
    'SINH',
    'SQRT',
    'TAN',
    'TANH',
    // legacyRegex
    'REGEXP_MATCH',
    'REGEXP_EXTRACT',
    'REGEXP_REPLACE',
    // legacyString
    'CONCAT',
    // expr CONTAINS 'str'
    'INSTR',
    'LEFT',
    'LENGTH',
    'LOWER',
    'LPAD',
    'LTRIM',
    'REPLACE',
    'RIGHT',
    'RPAD',
    'RTRIM',
    'SPLIT',
    'SUBSTR',
    'UPPER',
    // legacyTableWildcard
    'TABLE_DATE_RANGE',
    'TABLE_DATE_RANGE_STRICT',
    'TABLE_QUERY',
    // legacyUrl
    'HOST',
    'DOMAIN',
    'TLD',
    // legacyWindow
    'AVG',
    'COUNT',
    'MAX',
    'MIN',
    'STDDEV',
    'SUM',
    'CUME_DIST',
    'DENSE_RANK',
    'FIRST_VALUE',
    'LAG',
    'LAST_VALUE',
    'LEAD',
    'NTH_VALUE',
    'NTILE',
    'PERCENT_RANK',
    'PERCENTILE_CONT',
    'PERCENTILE_DISC',
    'RANK',
    'RATIO_TO_REPORT',
    'ROW_NUMBER',
    // legacyMisc
    'CURRENT_USER',
    'EVERY',
    'FROM_BASE64',
    'HASH',
    'FARM_FINGERPRINT',
    'IF',
    'POSITION',
    'SHA1',
    'SOME',
    'TO_BASE64',
    // other
    'BQ.JOBS.CANCEL',
    'BQ.REFRESH_MATERIALIZED_VIEW',
    // ddl
    'OPTIONS',
    // pivot
    'PIVOT',
    'UNPIVOT'
];
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/bigquery/bigquery.keywords.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "dataTypes",
    ()=>dataTypes,
    "keywords",
    ()=>keywords
]);
const keywords = [
    // https://cloud.google.com/bigquery/docs/reference/standard-sql/lexical#reserved_keywords
    'ALL',
    'AND',
    'ANY',
    'AS',
    'ASC',
    'ASSERT_ROWS_MODIFIED',
    'AT',
    'BETWEEN',
    'BY',
    'CASE',
    'CAST',
    'COLLATE',
    'CONTAINS',
    'CREATE',
    'CROSS',
    'CUBE',
    'CURRENT',
    'DEFAULT',
    'DEFINE',
    'DESC',
    'DISTINCT',
    'ELSE',
    'END',
    'ENUM',
    'ESCAPE',
    'EXCEPT',
    'EXCLUDE',
    'EXISTS',
    'EXTRACT',
    'FALSE',
    'FETCH',
    'FOLLOWING',
    'FOR',
    'FROM',
    'FULL',
    'GROUP',
    'GROUPING',
    'GROUPS',
    'HASH',
    'HAVING',
    'IF',
    'IGNORE',
    'IN',
    'INNER',
    'INTERSECT',
    'INTO',
    'IS',
    'JOIN',
    'LATERAL',
    'LEFT',
    'LIMIT',
    'LOOKUP',
    'MERGE',
    'NATURAL',
    'NEW',
    'NO',
    'NOT',
    'NULL',
    'NULLS',
    'OF',
    'ON',
    'OR',
    'ORDER',
    'OUTER',
    'OVER',
    'PARTITION',
    'PRECEDING',
    'PROTO',
    'RANGE',
    'RECURSIVE',
    'RESPECT',
    'RIGHT',
    'ROLLUP',
    'ROWS',
    'SELECT',
    'SET',
    'SOME',
    'TABLE',
    'TABLESAMPLE',
    'THEN',
    'TO',
    'TREAT',
    'TRUE',
    'UNBOUNDED',
    'UNION',
    'UNNEST',
    'USING',
    'WHEN',
    'WHERE',
    'WINDOW',
    'WITH',
    'WITHIN',
    // misc
    'SAFE',
    // https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language
    'LIKE',
    'COPY',
    'CLONE',
    'IN',
    'OUT',
    'INOUT',
    'RETURNS',
    'LANGUAGE',
    'CASCADE',
    'RESTRICT',
    'DETERMINISTIC'
];
const dataTypes = [
    // https://cloud.google.com/bigquery/docs/reference/standard-sql/data-types
    'ARRAY',
    'BOOL',
    'BYTES',
    'DATE',
    'DATETIME',
    'GEOGRAPHY',
    'INTERVAL',
    'INT64',
    'INT',
    'SMALLINT',
    'INTEGER',
    'BIGINT',
    'TINYINT',
    'BYTEINT',
    'NUMERIC',
    'DECIMAL',
    'BIGNUMERIC',
    'BIGDECIMAL',
    'FLOAT64',
    'STRING',
    'STRUCT',
    'TIME',
    'TIMEZONE'
];
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/clickhouse/clickhouse.formatter.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clickhouse",
    ()=>clickhouse
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/expandPhrases.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/lexer/token.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$clickhouse$2f$clickhouse$2e$functions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/clickhouse/clickhouse.functions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$clickhouse$2f$clickhouse$2e$keywords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/clickhouse/clickhouse.keywords.js [app-client] (ecmascript)");
;
;
;
;
const reservedSelect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'SELECT [DISTINCT]',
    // https://clickhouse.com/docs/sql-reference/statements/alter/view
    'MODIFY QUERY SELECT [DISTINCT]'
]);
const reservedClauses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'SET',
    // https://clickhouse.com/docs/sql-reference/statements/select
    'WITH',
    'FROM',
    'SAMPLE',
    'PREWHERE',
    'WHERE',
    'GROUP BY',
    'HAVING',
    'QUALIFY',
    'ORDER BY',
    'LIMIT',
    'SETTINGS',
    'INTO OUTFILE',
    'FORMAT',
    // https://clickhouse.com/docs/sql-reference/window-functions
    'WINDOW',
    'PARTITION BY',
    // https://clickhouse.com/docs/sql-reference/statements/insert-into
    'INSERT INTO',
    'VALUES',
    // https://clickhouse.com/docs/sql-reference/statements/create/view#refreshable-materialized-view
    'DEPENDS ON',
    // https://clickhouse.com/docs/sql-reference/statements/move
    'MOVE {USER | ROLE | QUOTA | SETTINGS PROFILE | ROW POLICY}',
    // https://clickhouse.com/docs/sql-reference/statements/grant
    'GRANT',
    // https://clickhouse.com/docs/sql-reference/statements/revoke
    'REVOKE',
    // https://clickhouse.com/docs/sql-reference/statements/check-grant
    'CHECK GRANT',
    // https://clickhouse.com/docs/sql-reference/statements/set-role
    'SET [DEFAULT] ROLE [NONE | ALL | ALL EXCEPT]',
    // https://clickhouse.com/docs/sql-reference/statements/optimize
    'DEDUPLICATE BY',
    // https://clickhouse.com/docs/sql-reference/statements/alter/statistics
    'MODIFY STATISTICS',
    // Used for ALTER INDEX ... TYPE and ALTER STATISTICS ... TYPE
    'TYPE',
    // https://clickhouse.com/docs/sql-reference/statements/alter
    'ALTER USER [IF EXISTS]',
    'ALTER [ROW] POLICY [IF EXISTS]',
    // https://clickhouse.com/docs/sql-reference/statements/drop
    'DROP {USER | ROLE | QUOTA | PROFILE | SETTINGS PROFILE | ROW POLICY | POLICY} [IF EXISTS]'
]);
const standardOnelineClauses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    // https://clickhouse.com/docs/sql-reference/statements/create
    'CREATE [OR REPLACE] [TEMPORARY] TABLE [IF NOT EXISTS]'
]);
const tabularOnelineClauses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'ALL EXCEPT',
    'ON CLUSTER',
    // https://clickhouse.com/docs/sql-reference/statements/update
    'UPDATE',
    // https://clickhouse.com/docs/sql-reference/statements/system
    'SYSTEM RELOAD {DICTIONARIES | DICTIONARY | FUNCTIONS | FUNCTION | ASYNCHRONOUS METRICS}',
    'SYSTEM DROP {DNS CACHE | MARK CACHE | ICEBERG METADATA CACHE | TEXT INDEX DICTIONARY CACHE | TEXT INDEX HEADER CACHE | TEXT INDEX POSTINGS CACHE | REPLICA | DATABASE REPLICA | UNCOMPRESSED CACHE | COMPILED EXPRESSION CACHE | QUERY CONDITION CACHE | QUERY CACHE | FORMAT SCHEMA CACHE | FILESYSTEM CACHE}',
    'SYSTEM FLUSH LOGS',
    'SYSTEM RELOAD {CONFIG | USERS}',
    'SYSTEM SHUTDOWN',
    'SYSTEM KILL',
    'SYSTEM FLUSH DISTRIBUTED',
    'SYSTEM START DISTRIBUTED SENDS',
    'SYSTEM {STOP | START} {LISTEN | MERGES | TTL MERGES | MOVES | FETCHES | REPLICATED SENDS | REPLICATION QUEUES | PULLING REPLICATION LOG}',
    'SYSTEM {SYNC | RESTART | RESTORE} REPLICA',
    'SYSTEM {SYNC | RESTORE} DATABASE REPLICA',
    'SYSTEM RESTART REPLICAS',
    'SYSTEM UNFREEZE',
    'SYSTEM WAIT LOADING PARTS',
    'SYSTEM {LOAD | UNLOAD} PRIMARY KEY',
    'SYSTEM {STOP | START} [REPLICATED] VIEW',
    'SYSTEM {STOP | START} VIEWS',
    'SYSTEM {REFRESH | CANCEL | WAIT} VIEW',
    'WITH NAME',
    // https://clickhouse.com/docs/sql-reference/statements/show
    'SHOW [CREATE] {TABLE | TEMPORARY TABLE | DICTIONARY | VIEW | DATABASE}',
    'SHOW DATABASES [[NOT] {LIKE | ILIKE}]',
    'SHOW [FULL] [TEMPORARY] TABLES [FROM | IN]',
    'SHOW [EXTENDED] [FULL] COLUMNS {FROM | IN}',
    // https://clickhouse.com/docs/sql-reference/statements/attach
    'ATTACH {TABLE | DICTIONARY | DATABASE} [IF NOT EXISTS]',
    // https://clickhouse.com/docs/sql-reference/statements/detach
    'DETACH {TABLE | DICTIONARY | DATABASE} [IF EXISTS]',
    'PERMANENTLY',
    'SYNC',
    // https://clickhouse.com/docs/sql-reference/statements/drop
    'DROP {DICTIONARY | DATABASE | PROFILE | VIEW | FUNCTION | NAMED COLLECTION} [IF EXISTS]',
    'DROP [TEMPORARY] TABLE [IF EXISTS] [IF EMPTY]',
    // https://clickhouse.com/docs/sql-reference/statements/alter/table#rename
    'RENAME TO',
    // https://clickhouse.com/docs/sql-reference/statements/exists
    'EXISTS [TEMPORARY] {TABLE | DICTIONARY | DATABASE}',
    // https://clickhouse.com/docs/sql-reference/statements/kill
    'KILL QUERY',
    // https://clickhouse.com/docs/sql-reference/statements/optimize
    'OPTIMIZE TABLE',
    // https://clickhouse.com/docs/sql-reference/statements/rename
    'RENAME {TABLE | DICTIONARY | DATABASE}',
    // https://clickhouse.com/docs/sql-reference/statements/exchange
    'EXCHANGE {TABLES | DICTIONARIES}',
    // https://clickhouse.com/docs/sql-reference/statements/truncate
    'TRUNCATE TABLE [IF EXISTS]',
    // https://clickhouse.com/docs/sql-reference/statements/execute_as
    'EXECUTE AS',
    // https://clickhouse.com/docs/sql-reference/statements/use
    'USE',
    'TO',
    // https://clickhouse.com/docs/sql-reference/statements/undrop
    'UNDROP TABLE',
    // https://clickhouse.com/docs/sql-reference/statements/create
    'CREATE {DATABASE | NAMED COLLECTION} [IF NOT EXISTS]',
    'CREATE [OR REPLACE] {VIEW | DICTIONARY} [IF NOT EXISTS]',
    'CREATE MATERIALIZED VIEW [IF NOT EXISTS]',
    'CREATE FUNCTION',
    'CREATE {USER | ROLE | QUOTA | SETTINGS PROFILE} [IF NOT EXISTS | OR REPLACE]',
    'CREATE [ROW] POLICY [IF NOT EXISTS | OR REPLACE]',
    // https://clickhouse.com/docs/sql-reference/statements/create/table#replace-table
    'REPLACE [TEMPORARY] TABLE [IF NOT EXISTS]',
    // https://clickhouse.com/docs/sql-reference/statements/alter
    'ALTER {ROLE | QUOTA | SETTINGS PROFILE} [IF EXISTS]',
    'ALTER [TEMPORARY] TABLE',
    'ALTER NAMED COLLECTION [IF EXISTS]',
    // https://clickhouse.com/docs/sql-reference/statements/alter/user
    'GRANTEES',
    'NOT IDENTIFIED',
    'RESET AUTHENTICATION METHODS TO NEW',
    '{IDENTIFIED | ADD IDENTIFIED} [WITH | BY]',
    '[ADD | DROP] HOST {LOCAL | NAME | REGEXP | IP | LIKE}',
    'VALID UNTIL',
    'DROP [ALL] {PROFILES | SETTINGS}',
    '{ADD | MODIFY} SETTINGS',
    'ADD PROFILES',
    // https://clickhouse.com/docs/sql-reference/statements/alter/apply-deleted-mask
    'APPLY DELETED MASK',
    'IN PARTITION',
    // https://clickhouse.com/docs/sql-reference/statements/alter/column
    '{ADD | DROP | RENAME | CLEAR | COMMENT | MODIFY | ALTER | MATERIALIZE} COLUMN',
    // https://clickhouse.com/docs/sql-reference/statements/alter/partition
    '{DETACH | DROP | ATTACH | FETCH | MOVE} {PART | PARTITION}',
    'DROP DETACHED {PART | PARTITION}',
    '{FORGET | REPLACE} PARTITION',
    'CLEAR COLUMN',
    '{FREEZE | UNFREEZE} [PARTITION]',
    'CLEAR INDEX',
    'TO {DISK | VOLUME}',
    '[DELETE | REWRITE PARTS] IN PARTITION',
    // https://clickhouse.com/docs/sql-reference/statements/alter/setting
    '{MODIFY | RESET} SETTING',
    // https://clickhouse.com/docs/sql-reference/statements/alter/delete
    'DELETE WHERE',
    // https://clickhouse.com/docs/sql-reference/statements/alter/order-by
    'MODIFY ORDER BY',
    // https://clickhouse.com/docs/sql-reference/statements/alter/sample-by
    '{MODIFY | REMOVE} SAMPLE BY',
    // https://clickhouse.com/docs/sql-reference/statements/alter/skipping-index
    '{ADD | MATERIALIZE | CLEAR} INDEX [IF NOT EXISTS]',
    'DROP INDEX [IF EXISTS]',
    'GRANULARITY',
    'AFTER',
    'FIRST',
    // https://clickhouse.com/docs/sql-reference/statements/alter/constraint
    'ADD CONSTRAINT [IF NOT EXISTS]',
    'DROP CONSTRAINT [IF EXISTS]',
    // https://clickhouse.com/docs/sql-reference/statements/alter/ttl
    'MODIFY TTL',
    'REMOVE TTL',
    // https://clickhouse.com/docs/sql-reference/statements/alter/statistics
    'ADD STATISTICS [IF NOT EXISTS]',
    '{DROP | CLEAR} STATISTICS [IF EXISTS]',
    'MATERIALIZE STATISTICS [ALL | IF EXISTS]',
    // https://clickhouse.com/docs/sql-reference/statements/alter/quota
    'KEYED BY',
    'NOT KEYED',
    'FOR [RANDOMIZED] INTERVAL',
    // https://clickhouse.com/docs/sql-reference/statements/alter/row-policy
    'AS {PERMISSIVE | RESTRICTIVE}',
    'FOR SELECT',
    // https://clickhouse.com/docs/sql-reference/statements/alter/projection
    'ADD PROJECTION [IF NOT EXISTS]',
    '{DROP | MATERIALIZE | CLEAR} PROJECTION [IF EXISTS]',
    // https://clickhouse.com/docs/sql-reference/statements/create/view#refreshable-materialized-view
    'REFRESH {EVERY | AFTER}',
    'RANDOMIZE FOR',
    'APPEND',
    'APPEND TO',
    // https://clickhouse.com/docs/sql-reference/statements/delete
    'DELETE FROM',
    // https://clickhouse.com/docs/sql-reference/statements/explain
    'EXPLAIN [AST | SYNTAX | QUERY TREE | PLAN | PIPELINE | ESTIMATE | TABLE OVERRIDE]',
    // https://clickhouse.com/docs/sql-reference/statements/grant
    'GRANT ON CLUSTER',
    'GRANT CURRENT GRANTS',
    'WITH GRANT OPTION',
    // https://clickhouse.com/docs/sql-reference/statements/revoke
    'REVOKE ON CLUSTER',
    'ADMIN OPTION FOR',
    // https://clickhouse.com/docs/sql-reference/statements/check-table
    'CHECK TABLE',
    'PARTITION ID',
    // https://clickhouse.com/docs/sql-reference/statements/describe-table
    '{DESC | DESCRIBE} TABLE'
]);
const reservedSetOperations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    // https://clickhouse.com/docs/sql-reference/statements/select/union
    'UNION [ALL | DISTINCT]',
    // https://clickhouse.com/docs/sql-reference/statements/parallel_with
    'PARALLEL WITH'
]);
const reservedJoins = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    // https://clickhouse.com/docs/sql-reference/statements/select/join
    '[GLOBAL] [INNER|LEFT|RIGHT|FULL|CROSS] [OUTER|SEMI|ANTI|ANY|ALL|ASOF] JOIN',
    // https://clickhouse.com/docs/sql-reference/statements/select/array-join
    '[LEFT] ARRAY JOIN'
]);
const reservedKeywordPhrases = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    '{ROWS | RANGE} BETWEEN',
    'ALTER MATERIALIZE STATISTICS'
]);
const clickhouse = {
    name: 'clickhouse',
    tokenizerOptions: {
        reservedSelect,
        reservedClauses: [
            ...reservedClauses,
            ...standardOnelineClauses,
            ...tabularOnelineClauses
        ],
        reservedSetOperations,
        reservedJoins,
        reservedKeywordPhrases,
        reservedKeywords: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$clickhouse$2f$clickhouse$2e$keywords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keywords"],
        reservedDataTypes: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$clickhouse$2f$clickhouse$2e$keywords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dataTypes"],
        reservedFunctionNames: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$clickhouse$2f$clickhouse$2e$functions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["functions"],
        extraParens: [
            '[]',
            '{}'
        ],
        lineCommentTypes: [
            '#',
            '--'
        ],
        nestedBlockComments: false,
        underscoresInNumbers: true,
        stringTypes: [
            '$$',
            "''-qq-bs"
        ],
        identTypes: [
            '""-qq-bs',
            '``'
        ],
        paramTypes: {
            // https://clickhouse.com/docs/sql-reference/syntax#defining-and-using-query-parameters
            custom: [
                {
                    // Parameters are like {foo:Uint64} or {foo:Map(String, String)}
                    // We include `'` in the negated character class to be a little sneaky:
                    // map literals have quoted keys, and we use this to avoid confusing
                    // them for named parameters. This means that the map literal `{'foo':1}`
                    // will be formatted as `{'foo': 1}` rather than `{foo: 1}`.
                    regex: String.raw`\{[^:']+:[^}]+\}`,
                    key: (v)=>{
                        const match = /\{([^:]+):/.exec(v);
                        return match ? match[1].trim() : v;
                    }
                }
            ]
        },
        operators: [
            // Strings, arithmetic
            '%',
            '||',
            // Ternary
            '?',
            ':',
            // Comparison
            '==',
            '<=>',
            // Lambda creation
            '->'
        ],
        postProcess
    },
    formatOptions: {
        onelineClauses: [
            ...standardOnelineClauses,
            ...tabularOnelineClauses
        ],
        tabularOnelineClauses
    }
};
/**
 * 1. Formats GRANT statements to use RESERVED_KEYWORD instead of RESERVED_SELECT
 *    for SELECT GRANTs
 * 2. Formats SET(100) as RESERVED_FUNCTION_NAME instead of RESERVED_KEYWORD
 *    so it appears as a function rather than a statement.
 */ function postProcess(tokens) {
    return tokens.map((token, i)=>{
        const nextToken = tokens[i + 1] || __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EOF_TOKEN"];
        const prevToken = tokens[i - 1] || __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EOF_TOKEN"];
        // If we have queries like
        // > GRANT SELECT, INSERT ON db.table TO john
        // > GRANT SELECT(a, b), SELECT(c) ON db.table TO john
        // we want to format them as
        // > GRANT
        // >   SELECT,
        // >   INSERT ON db.table
        // > TO john
        // > GRANT
        // >   SELECT(a, b),
        // >   SELECT(c) ON db.table
        // > TO john
        // To do this we need to convert the SELECT keyword to a RESERVED_KEYWORD.
        if (token.type === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].RESERVED_SELECT && (nextToken.type === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].COMMA || prevToken.type === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].RESERVED_CLAUSE || prevToken.type === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].COMMA)) {
            return Object.assign(Object.assign({}, token), {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].RESERVED_KEYWORD
            });
        }
        // We should format `set(100)` as-is rather than `SET (100)`
        if (__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isToken"].SET(token) && nextToken.type === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].OPEN_PAREN) {
            return Object.assign(Object.assign({}, token), {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].RESERVED_FUNCTION_NAME
            });
        }
        return token;
    });
}
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/clickhouse/clickhouse.functions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "functions",
    ()=>functions
]);
const functions = [
    // Derived from `select name from system.functions order by name;` on Clickhouse Cloud
    // as of November 14, 2025.
    'BIT_AND',
    'BIT_OR',
    'BIT_XOR',
    'BLAKE3',
    'CAST',
    'CHARACTER_LENGTH',
    'CHAR_LENGTH',
    'COVAR_POP',
    'COVAR_SAMP',
    'CRC32',
    'CRC32IEEE',
    'CRC64',
    'DATE',
    'DATE_DIFF',
    'DATE_FORMAT',
    'DATE_TRUNC',
    'DAY',
    'DAYOFMONTH',
    'DAYOFWEEK',
    'DAYOFYEAR',
    'FORMAT_BYTES',
    'FQDN',
    'FROM_BASE64',
    'FROM_DAYS',
    'FROM_UNIXTIME',
    'HOUR',
    'INET6_ATON',
    'INET6_NTOA',
    'INET_ATON',
    'INET_NTOA',
    'IPv4CIDRToRange',
    'IPv4NumToString',
    'IPv4NumToStringClassC',
    'IPv4StringToNum',
    'IPv4StringToNumOrDefault',
    'IPv4StringToNumOrNull',
    'IPv4ToIPv6',
    'IPv6CIDRToRange',
    'IPv6NumToString',
    'IPv6StringToNum',
    'IPv6StringToNumOrDefault',
    'IPv6StringToNumOrNull',
    'JSONAllPaths',
    'JSONAllPathsWithTypes',
    'JSONArrayLength',
    'JSONDynamicPaths',
    'JSONDynamicPathsWithTypes',
    'JSONExtract',
    'JSONExtractArrayRaw',
    'JSONExtractArrayRawCaseInsensitive',
    'JSONExtractBool',
    'JSONExtractBoolCaseInsensitive',
    'JSONExtractCaseInsensitive',
    'JSONExtractFloat',
    'JSONExtractFloatCaseInsensitive',
    'JSONExtractInt',
    'JSONExtractIntCaseInsensitive',
    'JSONExtractKeys',
    'JSONExtractKeysAndValues',
    'JSONExtractKeysAndValuesCaseInsensitive',
    'JSONExtractKeysAndValuesRaw',
    'JSONExtractKeysAndValuesRawCaseInsensitive',
    'JSONExtractKeysCaseInsensitive',
    'JSONExtractRaw',
    'JSONExtractRawCaseInsensitive',
    'JSONExtractString',
    'JSONExtractStringCaseInsensitive',
    'JSONExtractUInt',
    'JSONExtractUIntCaseInsensitive',
    'JSONHas',
    'JSONKey',
    'JSONLength',
    'JSONMergePatch',
    'JSONSharedDataPaths',
    'JSONSharedDataPathsWithTypes',
    'JSONType',
    'JSON_ARRAY_LENGTH',
    'JSON_EXISTS',
    'JSON_QUERY',
    'JSON_VALUE',
    'L1Distance',
    'L1Norm',
    'L1Normalize',
    'L2Distance',
    'L2Norm',
    'L2Normalize',
    'L2SquaredDistance',
    'L2SquaredNorm',
    'LAST_DAY',
    'LinfDistance',
    'LinfNorm',
    'LinfNormalize',
    'LpDistance',
    'LpNorm',
    'LpNormalize',
    'MACNumToString',
    'MACStringToNum',
    'MACStringToOUI',
    'MAP_FROM_ARRAYS',
    'MD4',
    'MD5',
    'MILLISECOND',
    'MINUTE',
    'MONTH',
    'OCTET_LENGTH',
    'QUARTER',
    'REGEXP_EXTRACT',
    'REGEXP_MATCHES',
    'REGEXP_REPLACE',
    'RIPEMD160',
    'SCHEMA',
    'SECOND',
    'SHA1',
    'SHA224',
    'SHA256',
    'SHA384',
    'SHA512',
    'SHA512_256',
    'STD',
    'STDDEV_POP',
    'STDDEV_SAMP',
    'ST_LineFromWKB',
    'ST_MLineFromWKB',
    'ST_MPolyFromWKB',
    'ST_PointFromWKB',
    'ST_PolyFromWKB',
    'SUBSTRING_INDEX',
    'SVG',
    'TIMESTAMP_DIFF',
    'TO_BASE64',
    'TO_DAYS',
    'TO_UNIXTIME',
    'ULIDStringToDateTime',
    'URLHash',
    'URLHierarchy',
    'URLPathHierarchy',
    'UTCTimestamp',
    'UTC_timestamp',
    'UUIDNumToString',
    'UUIDStringToNum',
    'UUIDToNum',
    'UUIDv7ToDateTime',
    'VAR_POP',
    'VAR_SAMP',
    'YEAR',
    'YYYYMMDDToDate',
    'YYYYMMDDToDate32',
    'YYYYMMDDhhmmssToDateTime',
    'YYYYMMDDhhmmssToDateTime64',
    '_CAST',
    '__actionName',
    '__bitBoolMaskAnd',
    '__bitBoolMaskOr',
    '__bitSwapLastTwo',
    '__bitWrapperFunc',
    '__getScalar',
    '__patchPartitionID',
    '__scalarSubqueryResult',
    'abs',
    'accurateCast',
    'accurateCastOrDefault',
    'accurateCastOrNull',
    'acos',
    'acosh',
    'addDate',
    'addDays',
    'addHours',
    'addInterval',
    'addMicroseconds',
    'addMilliseconds',
    'addMinutes',
    'addMonths',
    'addNanoseconds',
    'addQuarters',
    'addSeconds',
    'addTupleOfIntervals',
    'addWeeks',
    'addYears',
    'addressToLine',
    'addressToLineWithInlines',
    'addressToSymbol',
    'aes_decrypt_mysql',
    'aes_encrypt_mysql',
    'age',
    'aggThrow',
    'alphaTokens',
    'analysisOfVariance',
    'anova',
    'any',
    'anyHeavy',
    'anyLast',
    'anyLastRespectNulls',
    'anyLast_respect_nulls',
    'anyRespectNulls',
    'anyValueRespectNulls',
    'any_respect_nulls',
    'any_value',
    'any_value_respect_nulls',
    'appendTrailingCharIfAbsent',
    'approx_top_count',
    'approx_top_k',
    'approx_top_sum',
    'argMax',
    'argMin',
    'array',
    'arrayAUC',
    'arrayAUCPR',
    'arrayAll',
    'arrayAvg',
    'arrayCompact',
    'arrayConcat',
    'arrayCount',
    'arrayCumSum',
    'arrayCumSumNonNegative',
    'arrayDifference',
    'arrayDistinct',
    'arrayDotProduct',
    'arrayElement',
    'arrayElementOrNull',
    'arrayEnumerate',
    'arrayEnumerateDense',
    'arrayEnumerateDenseRanked',
    'arrayEnumerateUniq',
    'arrayEnumerateUniqRanked',
    'arrayExists',
    'arrayFill',
    'arrayFilter',
    'arrayFirst',
    'arrayFirstIndex',
    'arrayFirstOrNull',
    'arrayFlatten',
    'arrayFold',
    'arrayIntersect',
    'arrayJaccardIndex',
    'arrayJoin',
    'arrayLast',
    'arrayLastIndex',
    'arrayLastOrNull',
    'arrayLevenshteinDistance',
    'arrayLevenshteinDistanceWeighted',
    'arrayMap',
    'arrayMax',
    'arrayMin',
    'arrayNormalizedGini',
    'arrayPRAUC',
    'arrayPartialReverseSort',
    'arrayPartialShuffle',
    'arrayPartialSort',
    'arrayPopBack',
    'arrayPopFront',
    'arrayProduct',
    'arrayPushBack',
    'arrayPushFront',
    'arrayROCAUC',
    'arrayRandomSample',
    'arrayReduce',
    'arrayReduceInRanges',
    'arrayResize',
    'arrayReverse',
    'arrayReverseFill',
    'arrayReverseSort',
    'arrayReverseSplit',
    'arrayRotateLeft',
    'arrayRotateRight',
    'arrayShiftLeft',
    'arrayShiftRight',
    'arrayShingles',
    'arrayShuffle',
    'arraySimilarity',
    'arraySlice',
    'arraySort',
    'arraySplit',
    'arrayStringConcat',
    'arraySum',
    'arraySymmetricDifference',
    'arrayUnion',
    'arrayUniq',
    'arrayWithConstant',
    'arrayZip',
    'arrayZipUnaligned',
    'array_agg',
    'array_concat_agg',
    'ascii',
    'asin',
    'asinh',
    'assumeNotNull',
    'atan',
    'atan2',
    'atanh',
    'authenticatedUser',
    'avg',
    'avgWeighted',
    'bar',
    'base32Decode',
    'base32Encode',
    'base58Decode',
    'base58Encode',
    'base64Decode',
    'base64Encode',
    'base64URLDecode',
    'base64URLEncode',
    'basename',
    'bech32Decode',
    'bech32Encode',
    'bin',
    'bitAnd',
    'bitCount',
    'bitHammingDistance',
    'bitNot',
    'bitOr',
    'bitPositionsToArray',
    'bitRotateLeft',
    'bitRotateRight',
    'bitShiftLeft',
    'bitShiftRight',
    'bitSlice',
    'bitTest',
    'bitTestAll',
    'bitTestAny',
    'bitXor',
    'bitmapAnd',
    'bitmapAndCardinality',
    'bitmapAndnot',
    'bitmapAndnotCardinality',
    'bitmapBuild',
    'bitmapCardinality',
    'bitmapContains',
    'bitmapHasAll',
    'bitmapHasAny',
    'bitmapMax',
    'bitmapMin',
    'bitmapOr',
    'bitmapOrCardinality',
    'bitmapSubsetInRange',
    'bitmapSubsetLimit',
    'bitmapToArray',
    'bitmapTransform',
    'bitmapXor',
    'bitmapXorCardinality',
    'bitmaskToArray',
    'bitmaskToList',
    'blockNumber',
    'blockSerializedSize',
    'blockSize',
    'boundingRatio',
    'buildId',
    'byteHammingDistance',
    'byteSize',
    'byteSlice',
    'byteSwap',
    'caseWithExpr',
    'caseWithExpression',
    'caseWithoutExpr',
    'caseWithoutExpression',
    'catboostEvaluate',
    'categoricalInformationValue',
    'cbrt',
    'ceil',
    'ceiling',
    'changeDay',
    'changeHour',
    'changeMinute',
    'changeMonth',
    'changeSecond',
    'changeYear',
    'char',
    'cityHash64',
    'clamp',
    'coalesce',
    'colorOKLCHToSRGB',
    'colorSRGBToOKLCH',
    'compareSubstrings',
    'concat',
    'concatAssumeInjective',
    'concatWithSeparator',
    'concatWithSeparatorAssumeInjective',
    'concat_ws',
    'connectionId',
    'connection_id',
    'contingency',
    'convertCharset',
    'corr',
    'corrMatrix',
    'corrStable',
    'cos',
    'cosh',
    'cosineDistance',
    'count',
    'countDigits',
    'countEqual',
    'countMatches',
    'countMatchesCaseInsensitive',
    'countSubstrings',
    'countSubstringsCaseInsensitive',
    'countSubstringsCaseInsensitiveUTF8',
    'covarPop',
    'covarPopMatrix',
    'covarPopStable',
    'covarSamp',
    'covarSampMatrix',
    'covarSampStable',
    'cramersV',
    'cramersVBiasCorrected',
    'curdate',
    'currentDatabase',
    'currentProfiles',
    'currentQueryID',
    'currentRoles',
    'currentSchemas',
    'currentUser',
    'current_database',
    'current_date',
    'current_query_id',
    'current_schemas',
    'current_timestamp',
    'current_user',
    'cutFragment',
    'cutIPv6',
    'cutQueryString',
    'cutQueryStringAndFragment',
    'cutToFirstSignificantSubdomain',
    'cutToFirstSignificantSubdomainCustom',
    'cutToFirstSignificantSubdomainCustomRFC',
    'cutToFirstSignificantSubdomainCustomWithWWW',
    'cutToFirstSignificantSubdomainCustomWithWWWRFC',
    'cutToFirstSignificantSubdomainRFC',
    'cutToFirstSignificantSubdomainWithWWW',
    'cutToFirstSignificantSubdomainWithWWWRFC',
    'cutURLParameter',
    'cutWWW',
    'damerauLevenshteinDistance',
    'dateDiff',
    'dateName',
    'dateTime64ToSnowflake',
    'dateTime64ToSnowflakeID',
    'dateTimeToSnowflake',
    'dateTimeToSnowflakeID',
    'dateTimeToUUIDv7',
    'dateTrunc',
    'date_bin',
    'date_diff',
    'decodeHTMLComponent',
    'decodeURLComponent',
    'decodeURLFormComponent',
    'decodeXMLComponent',
    'decrypt',
    'defaultProfiles',
    'defaultRoles',
    'defaultValueOfArgumentType',
    'defaultValueOfTypeName',
    'degrees',
    'deltaSum',
    'deltaSumTimestamp',
    'demangle',
    'denseRank',
    'dense_rank',
    'detectCharset',
    'detectLanguage',
    'detectLanguageMixed',
    'detectLanguageUnknown',
    'detectProgrammingLanguage',
    'detectTonality',
    'dictGet',
    'dictGetAll',
    'dictGetChildren',
    'dictGetDate',
    'dictGetDateOrDefault',
    'dictGetDateTime',
    'dictGetDateTimeOrDefault',
    'dictGetDescendants',
    'dictGetFloat32',
    'dictGetFloat32OrDefault',
    'dictGetFloat64',
    'dictGetFloat64OrDefault',
    'dictGetHierarchy',
    'dictGetIPv4',
    'dictGetIPv4OrDefault',
    'dictGetIPv6',
    'dictGetIPv6OrDefault',
    'dictGetInt16',
    'dictGetInt16OrDefault',
    'dictGetInt32',
    'dictGetInt32OrDefault',
    'dictGetInt64',
    'dictGetInt64OrDefault',
    'dictGetInt8',
    'dictGetInt8OrDefault',
    'dictGetOrDefault',
    'dictGetOrNull',
    'dictGetString',
    'dictGetStringOrDefault',
    'dictGetUInt16',
    'dictGetUInt16OrDefault',
    'dictGetUInt32',
    'dictGetUInt32OrDefault',
    'dictGetUInt64',
    'dictGetUInt64OrDefault',
    'dictGetUInt8',
    'dictGetUInt8OrDefault',
    'dictGetUUID',
    'dictGetUUIDOrDefault',
    'dictHas',
    'dictIsIn',
    'displayName',
    'distanceL1',
    'distanceL2',
    'distanceL2Squared',
    'distanceLinf',
    'distanceLp',
    'distinctDynamicTypes',
    'distinctJSONPaths',
    'distinctJSONPathsAndTypes',
    'divide',
    'divideDecimal',
    'divideOrNull',
    'domain',
    'domainRFC',
    'domainWithoutWWW',
    'domainWithoutWWWRFC',
    'dotProduct',
    'dumpColumnStructure',
    'dynamicElement',
    'dynamicType',
    'e',
    'editDistance',
    'editDistanceUTF8',
    'empty',
    'emptyArrayDate',
    'emptyArrayDateTime',
    'emptyArrayFloat32',
    'emptyArrayFloat64',
    'emptyArrayInt16',
    'emptyArrayInt32',
    'emptyArrayInt64',
    'emptyArrayInt8',
    'emptyArrayString',
    'emptyArrayToSingle',
    'emptyArrayUInt16',
    'emptyArrayUInt32',
    'emptyArrayUInt64',
    'emptyArrayUInt8',
    'enabledProfiles',
    'enabledRoles',
    'encodeURLComponent',
    'encodeURLFormComponent',
    'encodeXMLComponent',
    'encrypt',
    'endsWith',
    'endsWithUTF8',
    'entropy',
    'equals',
    'erf',
    'erfc',
    'errorCodeToName',
    'estimateCompressionRatio',
    'evalMLMethod',
    'exp',
    'exp10',
    'exp2',
    'exponentialMovingAverage',
    'exponentialTimeDecayedAvg',
    'exponentialTimeDecayedCount',
    'exponentialTimeDecayedMax',
    'exponentialTimeDecayedSum',
    'extract',
    'extractAll',
    'extractAllGroups',
    'extractAllGroupsHorizontal',
    'extractAllGroupsVertical',
    'extractGroups',
    'extractKeyValuePairs',
    'extractKeyValuePairsWithEscaping',
    'extractTextFromHTML',
    'extractURLParameter',
    'extractURLParameterNames',
    'extractURLParameters',
    'factorial',
    'farmFingerprint64',
    'farmHash64',
    'file',
    'filesystemAvailable',
    'filesystemCapacity',
    'filesystemUnreserved',
    'finalizeAggregation',
    'financialInternalRateOfReturn',
    'financialInternalRateOfReturnExtended',
    'financialNetPresentValue',
    'financialNetPresentValueExtended',
    'firstLine',
    'firstSignificantSubdomain',
    'firstSignificantSubdomainCustom',
    'firstSignificantSubdomainCustomRFC',
    'firstSignificantSubdomainRFC',
    'firstValueRespectNulls',
    'first_value',
    'first_value_respect_nulls',
    'flameGraph',
    'flatten',
    'flattenTuple',
    'floor',
    // We do not include FORMAT as a function, because it's also a keyword.
    // FORMAT clauses are fairly common: https://clickhouse.com/docs/sql-reference/statements/select/format
    // 'format',
    'formatDateTime',
    'formatDateTimeInJodaSyntax',
    'formatQuery',
    'formatQueryOrNull',
    'formatQuerySingleLine',
    'formatQuerySingleLineOrNull',
    'formatReadableDecimalSize',
    'formatReadableQuantity',
    'formatReadableSize',
    'formatReadableTimeDelta',
    'formatRow',
    'formatRowNoNewline',
    'fragment',
    'fromDaysSinceYearZero',
    'fromDaysSinceYearZero32',
    'fromModifiedJulianDay',
    'fromModifiedJulianDayOrNull',
    'fromUTCTimestamp',
    'fromUnixTimestamp',
    'fromUnixTimestamp64Micro',
    'fromUnixTimestamp64Milli',
    'fromUnixTimestamp64Nano',
    'fromUnixTimestamp64Second',
    'fromUnixTimestampInJodaSyntax',
    'from_utc_timestamp',
    'fullHostName',
    'fuzzBits',
    'gccMurmurHash',
    'gcd',
    'generateRandomStructure',
    'generateSerialID',
    'generateSnowflakeID',
    'generateULID',
    'generateUUIDv4',
    'generateUUIDv7',
    'geoDistance',
    'geoToH3',
    'geoToS2',
    'geohashDecode',
    'geohashEncode',
    'geohashesInBox',
    'getClientHTTPHeader',
    'getMacro',
    'getMaxTableNameLengthForDatabase',
    'getMergeTreeSetting',
    'getOSKernelVersion',
    'getServerPort',
    'getServerSetting',
    'getSetting',
    'getSettingOrDefault',
    'getSizeOfEnumType',
    'getSubcolumn',
    'getTypeSerializationStreams',
    'globalIn',
    'globalInIgnoreSet',
    'globalNotIn',
    'globalNotInIgnoreSet',
    'globalNotNullIn',
    'globalNotNullInIgnoreSet',
    'globalNullIn',
    'globalNullInIgnoreSet',
    'globalVariable',
    'greatCircleAngle',
    'greatCircleDistance',
    'greater',
    'greaterOrEquals',
    'greatest',
    'groupArray',
    'groupArrayInsertAt',
    'groupArrayIntersect',
    'groupArrayLast',
    'groupArrayMovingAvg',
    'groupArrayMovingSum',
    'groupArraySample',
    'groupArraySorted',
    'groupBitAnd',
    'groupBitOr',
    'groupBitXor',
    'groupBitmap',
    'groupBitmapAnd',
    'groupBitmapOr',
    'groupBitmapXor',
    'groupConcat',
    'groupNumericIndexedVector',
    'groupUniqArray',
    'group_concat',
    'h3CellAreaM2',
    'h3CellAreaRads2',
    'h3Distance',
    'h3EdgeAngle',
    'h3EdgeLengthKm',
    'h3EdgeLengthM',
    'h3ExactEdgeLengthKm',
    'h3ExactEdgeLengthM',
    'h3ExactEdgeLengthRads',
    'h3GetBaseCell',
    'h3GetDestinationIndexFromUnidirectionalEdge',
    'h3GetFaces',
    'h3GetIndexesFromUnidirectionalEdge',
    'h3GetOriginIndexFromUnidirectionalEdge',
    'h3GetPentagonIndexes',
    'h3GetRes0Indexes',
    'h3GetResolution',
    'h3GetUnidirectionalEdge',
    'h3GetUnidirectionalEdgeBoundary',
    'h3GetUnidirectionalEdgesFromHexagon',
    'h3HexAreaKm2',
    'h3HexAreaM2',
    'h3HexRing',
    'h3IndexesAreNeighbors',
    'h3IsPentagon',
    'h3IsResClassIII',
    'h3IsValid',
    'h3Line',
    'h3NumHexagons',
    'h3PointDistKm',
    'h3PointDistM',
    'h3PointDistRads',
    'h3ToCenterChild',
    'h3ToChildren',
    'h3ToGeo',
    'h3ToGeoBoundary',
    'h3ToParent',
    'h3ToString',
    'h3UnidirectionalEdgeIsValid',
    'h3kRing',
    'halfMD5',
    'has',
    'hasAll',
    'hasAny',
    'hasColumnInTable',
    'hasSubsequence',
    'hasSubsequenceCaseInsensitive',
    'hasSubsequenceCaseInsensitiveUTF8',
    'hasSubsequenceUTF8',
    'hasSubstr',
    'hasThreadFuzzer',
    'hasToken',
    'hasTokenCaseInsensitive',
    'hasTokenCaseInsensitiveOrNull',
    'hasTokenOrNull',
    'hex',
    'hilbertDecode',
    'hilbertEncode',
    'histogram',
    'hiveHash',
    'hop',
    'hopEnd',
    'hopStart',
    'hostName',
    'hostname',
    'hypot',
    'icebergBucket',
    'icebergHash',
    'icebergTruncate',
    'identity',
    'idnaDecode',
    'idnaEncode',
    'if',
    'ifNotFinite',
    'ifNull',
    'ignore',
    // ilike() is a function, but the ILIKE keyword is very common in SQL.
    // 'ilike',
    'inIgnoreSet',
    'indexHint',
    'indexOf',
    'indexOfAssumeSorted',
    'initcap',
    'initcapUTF8',
    'initialQueryID',
    'initialQueryStartTime',
    'initial_query_id',
    'initial_query_start_time',
    'initializeAggregation',
    'instr',
    'intDiv',
    'intDivOrNull',
    'intDivOrZero',
    'intExp10',
    'intExp2',
    'intHash32',
    'intHash64',
    'intervalLengthSum',
    'isConstant',
    'isDecimalOverflow',
    'isDynamicElementInSharedData',
    'isFinite',
    'isIPAddressInRange',
    'isIPv4String',
    'isIPv6String',
    'isInfinite',
    'isMergeTreePartCoveredBy',
    'isNaN',
    'isNotDistinctFrom',
    'isNotNull',
    'isNull',
    'isNullable',
    'isValidJSON',
    'isValidUTF8',
    'isZeroOrNull',
    'jaroSimilarity',
    'jaroWinklerSimilarity',
    'javaHash',
    'javaHashUTF16LE',
    'joinGet',
    'joinGetOrNull',
    'jsonMergePatch',
    'jumpConsistentHash',
    'kafkaMurmurHash',
    'keccak256',
    'kolmogorovSmirnovTest',
    'kostikConsistentHash',
    'kql_array_sort_asc',
    'kql_array_sort_desc',
    'kurtPop',
    'kurtSamp',
    'lag',
    'lagInFrame',
    'largestTriangleThreeBuckets',
    'lastValueRespectNulls',
    'last_value',
    'last_value_respect_nulls',
    'lcase',
    'lcm',
    'lead',
    'leadInFrame',
    'least',
    'left',
    'leftPad',
    'leftPadUTF8',
    'leftUTF8',
    'lemmatize',
    'length',
    'lengthUTF8',
    'less',
    'lessOrEquals',
    'levenshteinDistance',
    'levenshteinDistanceUTF8',
    'lgamma',
    // like() is a function, but the ILIKE keyword is very common in SQL.
    // 'like',
    'ln',
    'locate',
    'log',
    'log10',
    'log1p',
    'log2',
    'logTrace',
    'lowCardinalityIndices',
    'lowCardinalityKeys',
    'lower',
    'lowerUTF8',
    'lpad',
    'ltrim',
    'lttb',
    'makeDate',
    'makeDate32',
    'makeDateTime',
    'makeDateTime64',
    'mannWhitneyUTest',
    'map',
    'mapAdd',
    'mapAll',
    'mapApply',
    'mapConcat',
    'mapContains',
    'mapContainsKey',
    'mapContainsKeyLike',
    'mapContainsValue',
    'mapContainsValueLike',
    'mapExists',
    'mapExtractKeyLike',
    'mapExtractValueLike',
    'mapFilter',
    'mapFromArrays',
    'mapFromString',
    'mapKeys',
    'mapPartialReverseSort',
    'mapPartialSort',
    'mapPopulateSeries',
    'mapReverseSort',
    'mapSort',
    'mapSubtract',
    'mapUpdate',
    'mapValues',
    'match',
    'materialize',
    'max',
    'max2',
    'maxIntersections',
    'maxIntersectionsPosition',
    'maxMappedArrays',
    'meanZTest',
    'median',
    'medianBFloat16',
    'medianBFloat16Weighted',
    'medianDD',
    'medianDeterministic',
    'medianExact',
    'medianExactHigh',
    'medianExactLow',
    'medianExactWeighted',
    'medianExactWeightedInterpolated',
    'medianGK',
    'medianInterpolatedWeighted',
    'medianTDigest',
    'medianTDigestWeighted',
    'medianTiming',
    'medianTimingWeighted',
    'mergeTreePartInfo',
    'metroHash64',
    'mid',
    'min',
    'min2',
    'minMappedArrays',
    'minSampleSizeContinous',
    'minSampleSizeContinuous',
    'minSampleSizeConversion',
    'minus',
    'mismatches',
    'mod',
    'modOrNull',
    'modulo',
    'moduloLegacy',
    'moduloOrNull',
    'moduloOrZero',
    'monthName',
    'mortonDecode',
    'mortonEncode',
    'multiFuzzyMatchAllIndices',
    'multiFuzzyMatchAny',
    'multiFuzzyMatchAnyIndex',
    'multiIf',
    'multiMatchAllIndices',
    'multiMatchAny',
    'multiMatchAnyIndex',
    'multiSearchAllPositions',
    'multiSearchAllPositionsCaseInsensitive',
    'multiSearchAllPositionsCaseInsensitiveUTF8',
    'multiSearchAllPositionsUTF8',
    'multiSearchAny',
    'multiSearchAnyCaseInsensitive',
    'multiSearchAnyCaseInsensitiveUTF8',
    'multiSearchAnyUTF8',
    'multiSearchFirstIndex',
    'multiSearchFirstIndexCaseInsensitive',
    'multiSearchFirstIndexCaseInsensitiveUTF8',
    'multiSearchFirstIndexUTF8',
    'multiSearchFirstPosition',
    'multiSearchFirstPositionCaseInsensitive',
    'multiSearchFirstPositionCaseInsensitiveUTF8',
    'multiSearchFirstPositionUTF8',
    'multiply',
    'multiplyDecimal',
    'murmurHash2_32',
    'murmurHash2_64',
    'murmurHash3_128',
    'murmurHash3_32',
    'murmurHash3_64',
    'negate',
    'neighbor',
    'nested',
    'netloc',
    'ngramDistance',
    'ngramDistanceCaseInsensitive',
    'ngramDistanceCaseInsensitiveUTF8',
    'ngramDistanceUTF8',
    'ngramMinHash',
    'ngramMinHashArg',
    'ngramMinHashArgCaseInsensitive',
    'ngramMinHashArgCaseInsensitiveUTF8',
    'ngramMinHashArgUTF8',
    'ngramMinHashCaseInsensitive',
    'ngramMinHashCaseInsensitiveUTF8',
    'ngramMinHashUTF8',
    'ngramSearch',
    'ngramSearchCaseInsensitive',
    'ngramSearchCaseInsensitiveUTF8',
    'ngramSearchUTF8',
    'ngramSimHash',
    'ngramSimHashCaseInsensitive',
    'ngramSimHashCaseInsensitiveUTF8',
    'ngramSimHashUTF8',
    'ngrams',
    'nonNegativeDerivative',
    'normL1',
    'normL2',
    'normL2Squared',
    'normLinf',
    'normLp',
    'normalizeL1',
    'normalizeL2',
    'normalizeLinf',
    'normalizeLp',
    'normalizeQuery',
    'normalizeQueryKeepNames',
    'normalizeUTF8NFC',
    'normalizeUTF8NFD',
    'normalizeUTF8NFKC',
    'normalizeUTF8NFKD',
    'normalizedQueryHash',
    'normalizedQueryHashKeepNames',
    // not() is a function, but the NOT keyword is very common in SQL.
    // 'not',
    'notEmpty',
    'notEquals',
    'notILike',
    'notIn',
    'notInIgnoreSet',
    'notLike',
    'notNullIn',
    'notNullInIgnoreSet',
    'nothing',
    'nothingNull',
    'nothingUInt64',
    'now',
    'now64',
    'nowInBlock',
    'nowInBlock64',
    'nth_value',
    'ntile',
    'nullIf',
    'nullIn',
    'nullInIgnoreSet',
    'numbers',
    'numericIndexedVectorAllValueSum',
    'numericIndexedVectorBuild',
    'numericIndexedVectorCardinality',
    'numericIndexedVectorGetValue',
    'numericIndexedVectorPointwiseAdd',
    'numericIndexedVectorPointwiseDivide',
    'numericIndexedVectorPointwiseEqual',
    'numericIndexedVectorPointwiseGreater',
    'numericIndexedVectorPointwiseGreaterEqual',
    'numericIndexedVectorPointwiseLess',
    'numericIndexedVectorPointwiseLessEqual',
    'numericIndexedVectorPointwiseMultiply',
    'numericIndexedVectorPointwiseNotEqual',
    'numericIndexedVectorPointwiseSubtract',
    'numericIndexedVectorShortDebugString',
    'numericIndexedVectorToMap',
    'overlay',
    'overlayUTF8',
    'parseDateTime',
    'parseDateTime32BestEffort',
    'parseDateTime32BestEffortOrNull',
    'parseDateTime32BestEffortOrZero',
    'parseDateTime64',
    'parseDateTime64BestEffort',
    'parseDateTime64BestEffortOrNull',
    'parseDateTime64BestEffortOrZero',
    'parseDateTime64BestEffortUS',
    'parseDateTime64BestEffortUSOrNull',
    'parseDateTime64BestEffortUSOrZero',
    'parseDateTime64InJodaSyntax',
    'parseDateTime64InJodaSyntaxOrNull',
    'parseDateTime64InJodaSyntaxOrZero',
    'parseDateTime64OrNull',
    'parseDateTime64OrZero',
    'parseDateTimeBestEffort',
    'parseDateTimeBestEffortOrNull',
    'parseDateTimeBestEffortOrZero',
    'parseDateTimeBestEffortUS',
    'parseDateTimeBestEffortUSOrNull',
    'parseDateTimeBestEffortUSOrZero',
    'parseDateTimeInJodaSyntax',
    'parseDateTimeInJodaSyntaxOrNull',
    'parseDateTimeInJodaSyntaxOrZero',
    'parseDateTimeOrNull',
    'parseDateTimeOrZero',
    'parseReadableSize',
    'parseReadableSizeOrNull',
    'parseReadableSizeOrZero',
    'parseTimeDelta',
    'partitionID',
    'partitionId',
    'path',
    'pathFull',
    'percentRank',
    'percent_rank',
    'pi',
    'plus',
    'pmod',
    'pmodOrNull',
    'pointInEllipses',
    'pointInPolygon',
    'polygonAreaCartesian',
    'polygonAreaSpherical',
    'polygonConvexHullCartesian',
    'polygonPerimeterCartesian',
    'polygonPerimeterSpherical',
    'polygonsDistanceCartesian',
    'polygonsDistanceSpherical',
    'polygonsEqualsCartesian',
    'polygonsIntersectCartesian',
    'polygonsIntersectSpherical',
    'polygonsIntersectionCartesian',
    'polygonsIntersectionSpherical',
    'polygonsSymDifferenceCartesian',
    'polygonsSymDifferenceSpherical',
    'polygonsUnionCartesian',
    'polygonsUnionSpherical',
    'polygonsWithinCartesian',
    'polygonsWithinSpherical',
    'port',
    'portRFC',
    'position',
    'positionCaseInsensitive',
    'positionCaseInsensitiveUTF8',
    'positionUTF8',
    'positiveModulo',
    'positiveModuloOrNull',
    'positive_modulo',
    'positive_modulo_or_null',
    'pow',
    'power',
    'printf',
    'proportionsZTest',
    'protocol',
    'punycodeDecode',
    'punycodeEncode',
    'quantile',
    'quantileBFloat16',
    'quantileBFloat16Weighted',
    'quantileDD',
    'quantileDeterministic',
    'quantileExact',
    'quantileExactExclusive',
    'quantileExactHigh',
    'quantileExactInclusive',
    'quantileExactLow',
    'quantileExactWeighted',
    'quantileExactWeightedInterpolated',
    'quantileGK',
    'quantileInterpolatedWeighted',
    'quantileTDigest',
    'quantileTDigestWeighted',
    'quantileTiming',
    'quantileTimingWeighted',
    'quantiles',
    'quantilesBFloat16',
    'quantilesBFloat16Weighted',
    'quantilesDD',
    'quantilesDeterministic',
    'quantilesExact',
    'quantilesExactExclusive',
    'quantilesExactHigh',
    'quantilesExactInclusive',
    'quantilesExactLow',
    'quantilesExactWeighted',
    'quantilesExactWeightedInterpolated',
    'quantilesGK',
    'quantilesInterpolatedWeighted',
    'quantilesTDigest',
    'quantilesTDigestWeighted',
    'quantilesTiming',
    'quantilesTimingWeighted',
    'queryID',
    'queryString',
    'queryStringAndFragment',
    'query_id',
    'radians',
    'rand',
    'rand32',
    'rand64',
    'randBernoulli',
    'randBinomial',
    'randCanonical',
    'randChiSquared',
    'randConstant',
    'randExponential',
    'randFisherF',
    'randLogNormal',
    'randNegativeBinomial',
    'randNormal',
    'randPoisson',
    'randStudentT',
    'randUniform',
    'randomFixedString',
    'randomPrintableASCII',
    'randomString',
    'randomStringUTF8',
    // range() is a function, but the RANGE keyword is important for window functions.
    // 'range',
    'rank',
    'rankCorr',
    'readWKBLineString',
    'readWKBMultiLineString',
    'readWKBMultiPolygon',
    'readWKBPoint',
    'readWKBPolygon',
    'readWKTLineString',
    'readWKTMultiLineString',
    'readWKTMultiPolygon',
    'readWKTPoint',
    'readWKTPolygon',
    'readWKTRing',
    'regexpExtract',
    'regexpQuoteMeta',
    'regionHierarchy',
    'regionIn',
    'regionToArea',
    'regionToCity',
    'regionToContinent',
    'regionToCountry',
    'regionToDistrict',
    'regionToName',
    'regionToPopulation',
    'regionToTopContinent',
    'reinterpret',
    'reinterpretAsDate',
    'reinterpretAsDateTime',
    'reinterpretAsFixedString',
    'reinterpretAsFloat32',
    'reinterpretAsFloat64',
    'reinterpretAsInt128',
    'reinterpretAsInt16',
    'reinterpretAsInt256',
    'reinterpretAsInt32',
    'reinterpretAsInt64',
    'reinterpretAsInt8',
    'reinterpretAsString',
    'reinterpretAsUInt128',
    'reinterpretAsUInt16',
    'reinterpretAsUInt256',
    'reinterpretAsUInt32',
    'reinterpretAsUInt64',
    'reinterpretAsUInt8',
    'reinterpretAsUUID',
    'repeat',
    'replace',
    'replaceAll',
    'replaceOne',
    'replaceRegexpAll',
    'replaceRegexpOne',
    'replicate',
    'retention',
    'reverse',
    'reverseUTF8',
    'revision',
    'right',
    'rightPad',
    'rightPadUTF8',
    'rightUTF8',
    'round',
    'roundAge',
    'roundBankers',
    'roundDown',
    'roundDuration',
    'roundToExp2',
    'rowNumberInAllBlocks',
    'rowNumberInBlock',
    'row_number',
    'rpad',
    'rtrim',
    'runningAccumulate',
    'runningConcurrency',
    'runningDifference',
    'runningDifferenceStartingWithFirstValue',
    's2CapContains',
    's2CapUnion',
    's2CellsIntersect',
    's2GetNeighbors',
    's2RectAdd',
    's2RectContains',
    's2RectIntersection',
    's2RectUnion',
    's2ToGeo',
    'scalarProduct',
    'searchAll',
    'searchAny',
    'sequenceCount',
    'sequenceMatch',
    'sequenceMatchEvents',
    'sequenceNextNode',
    'seriesDecomposeSTL',
    'seriesOutliersDetectTukey',
    'seriesPeriodDetectFFT',
    'serverTimeZone',
    'serverTimezone',
    'serverUUID',
    'shardCount',
    'shardNum',
    'showCertificate',
    'sigmoid',
    'sign',
    'simpleJSONExtractBool',
    'simpleJSONExtractFloat',
    'simpleJSONExtractInt',
    'simpleJSONExtractRaw',
    'simpleJSONExtractString',
    'simpleJSONExtractUInt',
    'simpleJSONHas',
    'simpleLinearRegression',
    'sin',
    'singleValueOrNull',
    'sinh',
    'sipHash128',
    'sipHash128Keyed',
    'sipHash128Reference',
    'sipHash128ReferenceKeyed',
    'sipHash64',
    'sipHash64Keyed',
    'skewPop',
    'skewSamp',
    'sleep',
    'sleepEachRow',
    'snowflakeIDToDateTime',
    'snowflakeIDToDateTime64',
    'snowflakeToDateTime',
    'snowflakeToDateTime64',
    'soundex',
    'space',
    'sparkBar',
    'sparkbar',
    'sparseGrams',
    'sparseGramsHashes',
    'sparseGramsHashesUTF8',
    'sparseGramsUTF8',
    'splitByAlpha',
    'splitByChar',
    'splitByNonAlpha',
    'splitByRegexp',
    'splitByString',
    'splitByWhitespace',
    'sqid',
    'sqidDecode',
    'sqidEncode',
    'sqrt',
    'startsWith',
    'startsWithUTF8',
    'stddevPop',
    'stddevPopStable',
    'stddevSamp',
    'stddevSampStable',
    'stem',
    'stochasticLinearRegression',
    'stochasticLogisticRegression',
    'str_to_date',
    'str_to_map',
    'stringBytesEntropy',
    'stringBytesUniq',
    'stringJaccardIndex',
    'stringJaccardIndexUTF8',
    'stringToH3',
    'structureToCapnProtoSchema',
    'structureToProtobufSchema',
    'studentTTest',
    'subBitmap',
    'subDate',
    'substr',
    'substring',
    'substringIndex',
    'substringIndexUTF8',
    'substringUTF8',
    'subtractDays',
    'subtractHours',
    'subtractInterval',
    'subtractMicroseconds',
    'subtractMilliseconds',
    'subtractMinutes',
    'subtractMonths',
    'subtractNanoseconds',
    'subtractQuarters',
    'subtractSeconds',
    'subtractTupleOfIntervals',
    'subtractWeeks',
    'subtractYears',
    'sum',
    'sumCount',
    'sumKahan',
    'sumMapFiltered',
    'sumMapFilteredWithOverflow',
    'sumMapWithOverflow',
    'sumMappedArrays',
    'sumWithOverflow',
    'svg',
    'synonyms',
    'tan',
    'tanh',
    'tcpPort',
    'tgamma',
    'theilsU',
    'throwIf',
    'tid',
    'timeDiff',
    'timeSeriesDeltaToGrid',
    'timeSeriesDerivToGrid',
    'timeSeriesFromGrid',
    'timeSeriesGroupArray',
    'timeSeriesIdToTags',
    'timeSeriesIdToTagsGroup',
    'timeSeriesIdeltaToGrid',
    'timeSeriesInstantDeltaToGrid',
    'timeSeriesInstantRateToGrid',
    'timeSeriesIrateToGrid',
    'timeSeriesLastToGrid',
    'timeSeriesLastTwoSamples',
    'timeSeriesPredictLinearToGrid',
    'timeSeriesRange',
    'timeSeriesRateToGrid',
    'timeSeriesResampleToGridWithStaleness',
    'timeSeriesStoreTags',
    'timeSeriesTagsGroupToTags',
    'timeSlot',
    'timeSlots',
    'timeZone',
    'timeZoneOf',
    'timeZoneOffset',
    'time_bucket',
    'timestamp',
    'timestampDiff',
    'timestamp_diff',
    'timezone',
    'timezoneOf',
    'timezoneOffset',
    'toBFloat16',
    'toBFloat16OrNull',
    'toBFloat16OrZero',
    'toBool',
    'toColumnTypeName',
    'toDate',
    'toDate32',
    'toDate32OrDefault',
    'toDate32OrNull',
    'toDate32OrZero',
    'toDateOrDefault',
    'toDateOrNull',
    'toDateOrZero',
    'toDateTime',
    'toDateTime32',
    'toDateTime64',
    'toDateTime64OrDefault',
    'toDateTime64OrNull',
    'toDateTime64OrZero',
    'toDateTimeOrDefault',
    'toDateTimeOrNull',
    'toDateTimeOrZero',
    'toDayOfMonth',
    'toDayOfWeek',
    'toDayOfYear',
    'toDaysSinceYearZero',
    'toDecimal128',
    'toDecimal128OrDefault',
    'toDecimal128OrNull',
    'toDecimal128OrZero',
    'toDecimal256',
    'toDecimal256OrDefault',
    'toDecimal256OrNull',
    'toDecimal256OrZero',
    'toDecimal32',
    'toDecimal32OrDefault',
    'toDecimal32OrNull',
    'toDecimal32OrZero',
    'toDecimal64',
    'toDecimal64OrDefault',
    'toDecimal64OrNull',
    'toDecimal64OrZero',
    'toDecimalString',
    'toFixedString',
    'toFloat32',
    'toFloat32OrDefault',
    'toFloat32OrNull',
    'toFloat32OrZero',
    'toFloat64',
    'toFloat64OrDefault',
    'toFloat64OrNull',
    'toFloat64OrZero',
    'toHour',
    'toIPv4',
    'toIPv4OrDefault',
    'toIPv4OrNull',
    'toIPv4OrZero',
    'toIPv6',
    'toIPv6OrDefault',
    'toIPv6OrNull',
    'toIPv6OrZero',
    'toISOWeek',
    'toISOYear',
    'toInt128',
    'toInt128OrDefault',
    'toInt128OrNull',
    'toInt128OrZero',
    'toInt16',
    'toInt16OrDefault',
    'toInt16OrNull',
    'toInt16OrZero',
    'toInt256',
    'toInt256OrDefault',
    'toInt256OrNull',
    'toInt256OrZero',
    'toInt32',
    'toInt32OrDefault',
    'toInt32OrNull',
    'toInt32OrZero',
    'toInt64',
    'toInt64OrDefault',
    'toInt64OrNull',
    'toInt64OrZero',
    'toInt8',
    'toInt8OrDefault',
    'toInt8OrNull',
    'toInt8OrZero',
    'toInterval',
    'toIntervalDay',
    'toIntervalHour',
    'toIntervalMicrosecond',
    'toIntervalMillisecond',
    'toIntervalMinute',
    'toIntervalMonth',
    'toIntervalNanosecond',
    'toIntervalQuarter',
    'toIntervalSecond',
    'toIntervalWeek',
    'toIntervalYear',
    'toJSONString',
    'toLastDayOfMonth',
    'toLastDayOfWeek',
    'toLowCardinality',
    'toMillisecond',
    'toMinute',
    'toModifiedJulianDay',
    'toModifiedJulianDayOrNull',
    'toMonday',
    'toMonth',
    'toMonthNumSinceEpoch',
    'toNullable',
    'toQuarter',
    'toRelativeDayNum',
    'toRelativeHourNum',
    'toRelativeMinuteNum',
    'toRelativeMonthNum',
    'toRelativeQuarterNum',
    'toRelativeSecondNum',
    'toRelativeWeekNum',
    'toRelativeYearNum',
    'toSecond',
    'toStartOfDay',
    'toStartOfFifteenMinutes',
    'toStartOfFiveMinute',
    'toStartOfFiveMinutes',
    'toStartOfHour',
    'toStartOfISOYear',
    'toStartOfInterval',
    'toStartOfMicrosecond',
    'toStartOfMillisecond',
    'toStartOfMinute',
    'toStartOfMonth',
    'toStartOfNanosecond',
    'toStartOfQuarter',
    'toStartOfSecond',
    'toStartOfTenMinutes',
    'toStartOfWeek',
    'toStartOfYear',
    'toString',
    'toStringCutToZero',
    'toTime',
    'toTime64',
    'toTime64OrNull',
    'toTime64OrZero',
    'toTimeOrNull',
    'toTimeOrZero',
    'toTimeWithFixedDate',
    'toTimeZone',
    'toTimezone',
    'toTypeName',
    'toUInt128',
    'toUInt128OrDefault',
    'toUInt128OrNull',
    'toUInt128OrZero',
    'toUInt16',
    'toUInt16OrDefault',
    'toUInt16OrNull',
    'toUInt16OrZero',
    'toUInt256',
    'toUInt256OrDefault',
    'toUInt256OrNull',
    'toUInt256OrZero',
    'toUInt32',
    'toUInt32OrDefault',
    'toUInt32OrNull',
    'toUInt32OrZero',
    'toUInt64',
    'toUInt64OrDefault',
    'toUInt64OrNull',
    'toUInt64OrZero',
    'toUInt8',
    'toUInt8OrDefault',
    'toUInt8OrNull',
    'toUInt8OrZero',
    'toUTCTimestamp',
    'toUUID',
    'toUUIDOrDefault',
    'toUUIDOrNull',
    'toUUIDOrZero',
    'toUnixTimestamp',
    'toUnixTimestamp64Micro',
    'toUnixTimestamp64Milli',
    'toUnixTimestamp64Nano',
    'toUnixTimestamp64Second',
    'toValidUTF8',
    'toWeek',
    'toYYYYMM',
    'toYYYYMMDD',
    'toYYYYMMDDhhmmss',
    'toYear',
    'toYearNumSinceEpoch',
    'toYearWeek',
    'to_utc_timestamp',
    'today',
    'tokens',
    'topK',
    'topKWeighted',
    'topLevelDomain',
    'topLevelDomainRFC',
    'transactionID',
    'transactionLatestSnapshot',
    'transactionOldestSnapshot',
    'transform',
    'translate',
    'translateUTF8',
    'trim',
    'trimBoth',
    'trimLeft',
    'trimRight',
    'trunc',
    // truncate() is a function, but the TRUNCATE keyword is a statement type.
    // 'truncate',
    'tryBase32Decode',
    'tryBase58Decode',
    'tryBase64Decode',
    'tryBase64URLDecode',
    'tryDecrypt',
    'tryIdnaEncode',
    'tryPunycodeDecode',
    'tumble',
    'tumbleEnd',
    'tumbleStart',
    'tuple',
    'tupleConcat',
    'tupleDivide',
    'tupleDivideByNumber',
    'tupleElement',
    'tupleHammingDistance',
    'tupleIntDiv',
    'tupleIntDivByNumber',
    'tupleIntDivOrZero',
    'tupleIntDivOrZeroByNumber',
    'tupleMinus',
    'tupleModulo',
    'tupleModuloByNumber',
    'tupleMultiply',
    'tupleMultiplyByNumber',
    'tupleNames',
    'tupleNegate',
    'tuplePlus',
    'tupleToNameValuePairs',
    'ucase',
    'unbin',
    'unhex',
    'uniq',
    'uniqCombined',
    'uniqCombined64',
    'uniqExact',
    'uniqHLL12',
    'uniqTheta',
    'uniqThetaIntersect',
    'uniqThetaNot',
    'uniqThetaUnion',
    'uniqUpTo',
    'upper',
    'upperUTF8',
    'uptime',
    'user',
    'validateNestedArraySizes',
    'varPop',
    'varPopStable',
    'varSamp',
    'varSampStable',
    'variantElement',
    'variantType',
    'vectorDifference',
    'vectorSum',
    'version',
    'visibleWidth',
    'visitParamExtractBool',
    'visitParamExtractFloat',
    'visitParamExtractInt',
    'visitParamExtractRaw',
    'visitParamExtractString',
    'visitParamExtractUInt',
    'visitParamHas',
    'week',
    'welchTTest',
    'widthBucket',
    'width_bucket',
    'windowFunnel',
    'windowID',
    'wkb',
    'wkt',
    'wordShingleMinHash',
    'wordShingleMinHashArg',
    'wordShingleMinHashArgCaseInsensitive',
    'wordShingleMinHashArgCaseInsensitiveUTF8',
    'wordShingleMinHashArgUTF8',
    'wordShingleMinHashCaseInsensitive',
    'wordShingleMinHashCaseInsensitiveUTF8',
    'wordShingleMinHashUTF8',
    'wordShingleSimHash',
    'wordShingleSimHashCaseInsensitive',
    'wordShingleSimHashCaseInsensitiveUTF8',
    'wordShingleSimHashUTF8',
    'wyHash64',
    'xor',
    'xxHash32',
    'xxHash64',
    'xxh3',
    'yandexConsistentHash',
    'yearweek',
    'yesterday',
    'zookeeperSessionUptime',
    // Table Engines
    // https://clickhouse.com/docs/engines/table-engines
    'MergeTree',
    'ReplacingMergeTree',
    'SummingMergeTree',
    'AggregatingMergeTree',
    'CollapsingMergeTree',
    'VersionedCollapsingMergeTree',
    'GraphiteMergeTree',
    'CoalescingMergeTree',
    // Database Engines
    // https://clickhouse.com/docs/engines/database-engines
    'Atomic',
    'Shared',
    'Lazy',
    'Replicated',
    'PostgreSQL',
    'MySQL',
    'SQLite',
    // Disabling this because it's more likely to be used in a GRANT statement as a permission.
    // 'Backup',
    'MaterializedPostgreSQL',
    'DataLakeCatalog'
];
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/clickhouse/clickhouse.keywords.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "dataTypes",
    ()=>dataTypes,
    "keywords",
    ()=>keywords
]);
const keywords = [
    // Derived from https://github.com/ClickHouse/ClickHouse/blob/827a7ef9f6d727ef511fea7785a1243541509efb/tests/fuzz/dictionaries/keywords.dict#L4
    'ACCESS',
    'ACTION',
    'ADD',
    'ADMIN',
    'AFTER',
    'ALGORITHM',
    'ALIAS',
    'ALL',
    'ALLOWED_LATENESS',
    'ALTER',
    'AND',
    'ANTI',
    'APPEND',
    'APPLY',
    'AS',
    'ASC',
    'ASCENDING',
    'ASOF',
    'ASSUME',
    'AST',
    'ASYNC',
    'ATTACH',
    'AUTO_INCREMENT',
    'AZURE',
    'BACKUP',
    'BAGEXPANSION',
    'BASE_BACKUP',
    'BCRYPT_HASH',
    'BCRYPT_PASSWORD',
    'BEGIN',
    'BETWEEN',
    'BIDIRECTIONAL',
    'BOTH',
    'BY',
    'CACHE',
    'CACHES',
    'CASCADE',
    'CASE',
    'CHANGE',
    'CHANGEABLE_IN_READONLY',
    'CHANGED',
    'CHARACTER',
    'CHECK',
    'CLEANUP',
    'CLEAR',
    'CLUSTER',
    'CLUSTERS',
    'CLUSTER_HOST_IDS',
    'CN',
    'CODEC',
    'COLLATE',
    'COLLECTION',
    'COLUMN',
    'COLUMNS',
    'COMMENT',
    'COMMIT',
    'COMPRESSION',
    'CONST',
    'CONSTRAINT',
    'CREATE',
    'CROSS',
    'CUBE',
    'CURRENT',
    'D',
    'DATA',
    'DATABASE',
    'DATABASES',
    'DAYS',
    'DD',
    'DDL',
    'DEDUPLICATE',
    'DEFAULT',
    'DEFINER',
    'DELAY',
    'DELETE',
    'DELETED',
    'DEPENDS',
    'DESC',
    'DESCENDING',
    'DESCRIBE',
    'DETACH',
    'DETACHED',
    'DICTIONARIES',
    'DICTIONARY',
    'DISK',
    'DISTINCT',
    'DIV',
    'DOUBLE_SHA1_HASH',
    'DOUBLE_SHA1_PASSWORD',
    'DROP',
    'ELSE',
    'ENABLED',
    'END',
    'ENFORCED',
    'ENGINE',
    'ENGINES',
    'EPHEMERAL',
    'ESTIMATE',
    'EVENT',
    'EVENTS',
    'EVERY',
    'EXCEPT',
    'EXCHANGE',
    'EXISTS',
    'EXPLAIN',
    'EXPRESSION',
    'EXTENDED',
    'EXTERNAL',
    'FAKE',
    'FALSE',
    'FETCH',
    'FIELDS',
    'FILESYSTEM',
    'FILL',
    'FILTER',
    'FINAL',
    'FIRST',
    'FOLLOWING',
    'FOR',
    'FOREIGN',
    'FORMAT',
    'FREEZE',
    'FROM',
    'FULL',
    'FULLTEXT',
    'FUNCTION',
    'FUNCTIONS',
    'GLOBAL',
    'GRANT',
    'GRANTEES',
    'GRANTS',
    'GRANULARITY',
    'GROUP',
    'GROUPING',
    'GROUPS',
    'H',
    'HASH',
    'HAVING',
    'HDFS',
    'HH',
    'HIERARCHICAL',
    'HOST',
    'HOURS',
    'HTTP',
    // Disabling this because it's a keyword, but formats far more than
    // it should.
    // 'ID',
    'IDENTIFIED',
    'ILIKE',
    'IN',
    'INDEX',
    'INDEXES',
    'INDICES',
    'INFILE',
    'INHERIT',
    'INJECTIVE',
    'INNER',
    'INSERT',
    'INTERPOLATE',
    'INTERSECT',
    'INTERVAL',
    'INTO',
    'INVISIBLE',
    'INVOKER',
    'IP',
    'IS',
    'IS_OBJECT_ID',
    'JOIN',
    'JWT',
    'KERBEROS',
    'KEY',
    'KEYED',
    'KEYS',
    'KILL',
    'KIND',
    'LARGE',
    'LAST',
    'LAYOUT',
    'LDAP',
    'LEADING',
    'LEVEL',
    'LIFETIME',
    'LIGHTWEIGHT',
    'LIKE',
    'LIMIT',
    'LIMITS',
    'LINEAR',
    'LIST',
    'LIVE',
    'LOCAL',
    'M',
    'MASK',
    'MATERIALIZED',
    'MCS',
    'MEMORY',
    'MERGES',
    'METRICS',
    'MI',
    'MICROSECOND',
    'MICROSECONDS',
    'MILLISECONDS',
    'MINUTES',
    'MM',
    'MODIFY',
    'MONTHS',
    'MOVE',
    'MS',
    'MUTATION',
    'N',
    'NAME',
    'NAMED',
    'NANOSECOND',
    'NANOSECONDS',
    'NEXT',
    'NO',
    'NONE',
    'NOT',
    'NO_PASSWORD',
    'NS',
    'NULL',
    'NULLS',
    'OBJECT',
    'OFFSET',
    'ON',
    'ONLY',
    'OPTIMIZE',
    'OPTION',
    'OR',
    'ORDER',
    'OUTER',
    'OUTFILE',
    'OVER',
    'OVERRIDABLE',
    'OVERRIDE',
    'PART',
    'PARTIAL',
    'PARTITION',
    'PARTITIONS',
    'PART_MOVE_TO_SHARD',
    'PASTE',
    'PERIODIC',
    'PERMANENTLY',
    'PERMISSIVE',
    'PERSISTENT',
    'PIPELINE',
    'PLAINTEXT_PASSWORD',
    'PLAN',
    'POLICY',
    'POPULATE',
    'PRECEDING',
    'PRECISION',
    'PREWHERE',
    'PRIMARY',
    'PRIVILEGES',
    'PROCESSLIST',
    'PROFILE',
    'PROJECTION',
    'PROTOBUF',
    'PULL',
    'Q',
    'QQ',
    'QUALIFY',
    'QUARTERS',
    'QUERY',
    'QUOTA',
    'RANDOMIZE',
    'RANDOMIZED',
    'RANGE',
    'READONLY',
    'REALM',
    'RECOMPRESS',
    'RECURSIVE',
    'REFERENCES',
    'REFRESH',
    'REGEXP',
    'REMOVE',
    'RENAME',
    'RESET',
    'RESPECT',
    'RESTORE',
    'RESTRICT',
    'RESTRICTIVE',
    'RESUME',
    'REVOKE',
    'ROLE',
    'ROLES',
    'ROLLBACK',
    'ROLLUP',
    'ROW',
    'ROWS',
    'S',
    'S3',
    'SALT',
    'SAMPLE',
    'SAN',
    'SCHEME',
    'SECONDS',
    'SECURITY',
    'SELECT',
    'SEMI',
    'SEQUENTIAL',
    'SERVER',
    'SET',
    'SETS',
    'SETTING',
    'SETTINGS',
    'SHA256_HASH',
    'SHA256_PASSWORD',
    'SHARD',
    'SHOW',
    'SIGNED',
    'SIMPLE',
    'SNAPSHOT',
    'SOURCE',
    'SPATIAL',
    'SQL',
    'SQL_TSI_DAY',
    'SQL_TSI_HOUR',
    'SQL_TSI_MICROSECOND',
    'SQL_TSI_MILLISECOND',
    'SQL_TSI_MINUTE',
    'SQL_TSI_MONTH',
    'SQL_TSI_NANOSECOND',
    'SQL_TSI_QUARTER',
    'SQL_TSI_SECOND',
    'SQL_TSI_WEEK',
    'SQL_TSI_YEAR',
    'SS',
    'SSH_KEY',
    'SSL_CERTIFICATE',
    'STALENESS',
    'START',
    'STATISTICS',
    'STDOUT',
    'STEP',
    'STORAGE',
    'STRICT',
    'STRICTLY_ASCENDING',
    'SUBPARTITION',
    'SUBPARTITIONS',
    'SUSPEND',
    'SYNC',
    'SYNTAX',
    'SYSTEM',
    'TABLE',
    'TABLES',
    'TAGS',
    'TEMPORARY',
    'TEST',
    'THAN',
    'THEN',
    'TIES',
    'TIME',
    'TO',
    'TOP',
    'TOTALS',
    'TRACKING',
    'TRAILING',
    'TRANSACTION',
    'TREE',
    'TRIGGER',
    'TRUE',
    'TRUNCATE',
    'TTL',
    'TYPE',
    'TYPEOF',
    'UNBOUNDED',
    'UNDROP',
    'UNFREEZE',
    'UNION',
    'UNIQUE',
    'UNSET',
    'UNSIGNED',
    'UNTIL',
    'UPDATE',
    'URL',
    'USE',
    'USING',
    'UUID',
    'VALID',
    'VALUES',
    'VARYING',
    'VIEW',
    'VISIBLE',
    'VOLUME',
    'WATCH',
    'WATERMARK',
    'WEEKS',
    'WHEN',
    'WHERE',
    'WINDOW',
    'WITH',
    'WITH_ITEMINDEX',
    'WK',
    'WRITABLE',
    'WW',
    'YEARS',
    'YY',
    'YYYY',
    'ZKPATH'
];
const dataTypes = [
    // Derived from `SELECT name FROM system.data_type_families ORDER BY name` on Clickhouse Cloud
    // as of November 14, 2025.
    'AGGREGATEFUNCTION',
    'ARRAY',
    'BFLOAT16',
    'BIGINT',
    'BIGINT SIGNED',
    'BIGINT UNSIGNED',
    'BINARY',
    'BINARY LARGE OBJECT',
    'BINARY VARYING',
    'BIT',
    'BLOB',
    'BYTE',
    'BYTEA',
    'BOOL',
    'CHAR',
    'CHAR LARGE OBJECT',
    'CHAR VARYING',
    'CHARACTER',
    'CHARACTER LARGE OBJECT',
    'CHARACTER VARYING',
    'CLOB',
    'DEC',
    'DOUBLE',
    'DOUBLE PRECISION',
    'DATE',
    'DATE32',
    'DATETIME',
    'DATETIME32',
    'DATETIME64',
    'DECIMAL',
    'DECIMAL128',
    'DECIMAL256',
    'DECIMAL32',
    'DECIMAL64',
    'DYNAMIC',
    'ENUM',
    'ENUM',
    'ENUM16',
    'ENUM8',
    'FIXED',
    'FLOAT',
    'FIXEDSTRING',
    'FLOAT32',
    'FLOAT64',
    'GEOMETRY',
    'INET4',
    'INET6',
    'INT',
    'INT SIGNED',
    'INT UNSIGNED',
    'INT1',
    'INT1 SIGNED',
    'INT1 UNSIGNED',
    'INTEGER',
    'INTEGER SIGNED',
    'INTEGER UNSIGNED',
    'IPV4',
    'IPV6',
    'INT128',
    'INT16',
    'INT256',
    'INT32',
    'INT64',
    'INT8',
    'INTERVALDAY',
    'INTERVALHOUR',
    'INTERVALMICROSECOND',
    'INTERVALMILLISECOND',
    'INTERVALMINUTE',
    'INTERVALMONTH',
    'INTERVALNANOSECOND',
    'INTERVALQUARTER',
    'INTERVALSECOND',
    'INTERVALWEEK',
    'INTERVALYEAR',
    'JSON',
    'LONGBLOB',
    'LONGTEXT',
    'LINESTRING',
    'LOWCARDINALITY',
    'MEDIUMBLOB',
    'MEDIUMINT',
    'MEDIUMINT SIGNED',
    'MEDIUMINT UNSIGNED',
    'MEDIUMTEXT',
    'MAP',
    'MULTILINESTRING',
    'MULTIPOLYGON',
    'NATIONAL CHAR',
    'NATIONAL CHAR VARYING',
    'NATIONAL CHARACTER',
    'NATIONAL CHARACTER LARGE OBJECT',
    'NATIONAL CHARACTER VARYING',
    'NCHAR',
    'NCHAR LARGE OBJECT',
    'NCHAR VARYING',
    'NUMERIC',
    'NVARCHAR',
    'NESTED',
    'NOTHING',
    'NULLABLE',
    'OBJECT',
    'POINT',
    'POLYGON',
    'REAL',
    'RING',
    'SET',
    'SIGNED',
    'SINGLE',
    'SMALLINT',
    'SMALLINT SIGNED',
    'SMALLINT UNSIGNED',
    'SIMPLEAGGREGATEFUNCTION',
    'STRING',
    'TEXT',
    'TIMESTAMP',
    'TINYBLOB',
    'TINYINT',
    'TINYINT SIGNED',
    'TINYINT UNSIGNED',
    'TINYTEXT',
    'TIME',
    'TIME64',
    'TUPLE',
    'UINT128',
    'UINT16',
    'UINT256',
    'UINT32',
    'UINT64',
    'UINT8',
    'UNSIGNED',
    'UUID',
    'VARBINARY',
    'VARCHAR',
    'VARCHAR2',
    'VARIANT',
    'YEAR',
    'BOOL',
    'BOOLEAN'
];
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/db2/db2.formatter.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "db2",
    ()=>db2
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/expandPhrases.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$db2$2f$db2$2e$functions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/db2/db2.functions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$db2$2f$db2$2e$keywords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/db2/db2.keywords.js [app-client] (ecmascript)");
;
;
;
const reservedSelect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'SELECT [ALL | DISTINCT]'
]);
const reservedClauses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    // queries
    'WITH',
    'FROM',
    'WHERE',
    'GROUP BY',
    'HAVING',
    'PARTITION BY',
    'ORDER BY [INPUT SEQUENCE]',
    'LIMIT',
    'OFFSET',
    'FETCH NEXT',
    'FOR UPDATE [OF]',
    'FOR {READ | FETCH} ONLY',
    'FOR {RR | CS | UR | RS} [USE AND KEEP {SHARE | UPDATE | EXCLUSIVE} LOCKS]',
    'WAIT FOR OUTCOME',
    'SKIP LOCKED DATA',
    'INTO',
    // Data modification
    // - insert:
    'INSERT INTO',
    'VALUES',
    // - update:
    'SET',
    // - merge:
    'MERGE INTO',
    'WHEN [NOT] MATCHED [THEN]',
    'UPDATE SET',
    'INSERT'
]);
const standardOnelineClauses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'CREATE [GLOBAL TEMPORARY | EXTERNAL] TABLE [IF NOT EXISTS]'
]);
const tabularOnelineClauses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    // - create:
    'CREATE [OR REPLACE] VIEW',
    // - update:
    'UPDATE',
    'WHERE CURRENT OF',
    'WITH {RR | RS | CS | UR}',
    // - delete:
    'DELETE FROM',
    // - drop table:
    'DROP TABLE [IF EXISTS]',
    // alter table:
    'ALTER TABLE',
    'ADD [COLUMN]',
    'DROP [COLUMN]',
    'RENAME COLUMN',
    'ALTER [COLUMN]',
    'SET DATA TYPE',
    'SET NOT NULL',
    'DROP {DEFAULT | GENERATED | NOT NULL}',
    // - truncate:
    'TRUNCATE [TABLE]',
    // https://www.ibm.com/docs/en/db2/11.5?topic=s-statements
    'ALLOCATE',
    'ALTER AUDIT POLICY',
    'ALTER BUFFERPOOL',
    'ALTER DATABASE PARTITION GROUP',
    'ALTER DATABASE',
    'ALTER EVENT MONITOR',
    'ALTER FUNCTION',
    'ALTER HISTOGRAM TEMPLATE',
    'ALTER INDEX',
    'ALTER MASK',
    'ALTER METHOD',
    'ALTER MODULE',
    'ALTER NICKNAME',
    'ALTER PACKAGE',
    'ALTER PERMISSION',
    'ALTER PROCEDURE',
    'ALTER SCHEMA',
    'ALTER SECURITY LABEL COMPONENT',
    'ALTER SECURITY POLICY',
    'ALTER SEQUENCE',
    'ALTER SERVER',
    'ALTER SERVICE CLASS',
    'ALTER STOGROUP',
    'ALTER TABLESPACE',
    'ALTER THRESHOLD',
    'ALTER TRIGGER',
    'ALTER TRUSTED CONTEXT',
    'ALTER TYPE',
    'ALTER USAGE LIST',
    'ALTER USER MAPPING',
    'ALTER VIEW',
    'ALTER WORK ACTION SET',
    'ALTER WORK CLASS SET',
    'ALTER WORKLOAD',
    'ALTER WRAPPER',
    'ALTER XSROBJECT',
    'ALTER STOGROUP',
    'ALTER TABLESPACE',
    'ALTER TRIGGER',
    'ALTER TRUSTED CONTEXT',
    'ALTER VIEW',
    'ASSOCIATE [RESULT SET] {LOCATOR | LOCATORS}',
    'AUDIT',
    'BEGIN DECLARE SECTION',
    'CALL',
    'CLOSE',
    'COMMENT ON',
    'COMMIT [WORK]',
    'CONNECT',
    'CREATE [OR REPLACE] [PUBLIC] ALIAS',
    'CREATE AUDIT POLICY',
    'CREATE BUFFERPOOL',
    'CREATE DATABASE PARTITION GROUP',
    'CREATE EVENT MONITOR',
    'CREATE [OR REPLACE] FUNCTION',
    'CREATE FUNCTION MAPPING',
    'CREATE HISTOGRAM TEMPLATE',
    'CREATE [UNIQUE] INDEX',
    'CREATE INDEX EXTENSION',
    'CREATE [OR REPLACE] MASK',
    'CREATE [SPECIFIC] METHOD',
    'CREATE [OR REPLACE] MODULE',
    'CREATE [OR REPLACE] NICKNAME',
    'CREATE [OR REPLACE] PERMISSION',
    'CREATE [OR REPLACE] PROCEDURE',
    'CREATE ROLE',
    'CREATE SCHEMA',
    'CREATE SECURITY LABEL [COMPONENT]',
    'CREATE SECURITY POLICY',
    'CREATE [OR REPLACE] SEQUENCE',
    'CREATE SERVICE CLASS',
    'CREATE SERVER',
    'CREATE STOGROUP',
    'CREATE SYNONYM',
    'CREATE [LARGE | REGULAR | {SYSTEM | USER} TEMPORARY] TABLESPACE',
    'CREATE THRESHOLD',
    'CREATE {TRANSFORM | TRANSFORMS} FOR',
    'CREATE [OR REPLACE] TRIGGER',
    'CREATE TRUSTED CONTEXT',
    'CREATE [OR REPLACE] TYPE',
    'CREATE TYPE MAPPING',
    'CREATE USAGE LIST',
    'CREATE USER MAPPING FOR',
    'CREATE [OR REPLACE] VARIABLE',
    'CREATE WORK ACTION SET',
    'CREATE WORK CLASS SET',
    'CREATE WORKLOAD',
    'CREATE WRAPPER',
    'DECLARE',
    'DECLARE GLOBAL TEMPORARY TABLE',
    'DESCRIBE [INPUT | OUTPUT]',
    'DISCONNECT',
    'DROP [PUBLIC] ALIAS',
    'DROP AUDIT POLICY',
    'DROP BUFFERPOOL',
    'DROP DATABASE PARTITION GROUP',
    'DROP EVENT MONITOR',
    'DROP [SPECIFIC] FUNCTION',
    'DROP FUNCTION MAPPING',
    'DROP HISTOGRAM TEMPLATE',
    'DROP INDEX [EXTENSION]',
    'DROP MASK',
    'DROP [SPECIFIC] METHOD',
    'DROP MODULE',
    'DROP NICKNAME',
    'DROP PACKAGE',
    'DROP PERMISSION',
    'DROP [SPECIFIC] PROCEDURE',
    'DROP ROLE',
    'DROP SCHEMA',
    'DROP SECURITY LABEL [COMPONENT]',
    'DROP SECURITY POLICY',
    'DROP SEQUENCE',
    'DROP SERVER',
    'DROP SERVICE CLASS',
    'DROP STOGROUP',
    'DROP TABLE HIERARCHY',
    'DROP {TABLESPACE | TABLESPACES}',
    'DROP {TRANSFORM | TRANSFORMS}',
    'DROP THRESHOLD',
    'DROP TRIGGER',
    'DROP TRUSTED CONTEXT',
    'DROP TYPE [MAPPING]',
    'DROP USAGE LIST',
    'DROP USER MAPPING FOR',
    'DROP VARIABLE',
    'DROP VIEW [HIERARCHY]',
    'DROP WORK {ACTION | CLASS} SET',
    'DROP WORKLOAD',
    'DROP WRAPPER',
    'DROP XSROBJECT',
    'END DECLARE SECTION',
    'EXECUTE [IMMEDIATE]',
    'EXPLAIN {PLAN [SECTION] | ALL}',
    'FETCH [FROM]',
    'FLUSH {BUFFERPOOL | BUFFERPOOLS} ALL',
    'FLUSH EVENT MONITOR',
    'FLUSH FEDERATED CACHE',
    'FLUSH OPTIMIZATION PROFILE CACHE',
    'FLUSH PACKAGE CACHE [DYNAMIC]',
    'FLUSH AUTHENTICATION CACHE [FOR ALL]',
    'FREE LOCATOR',
    'GET DIAGNOSTICS',
    'GOTO',
    'GRANT',
    'INCLUDE',
    'ITERATE',
    'LEAVE',
    'LOCK TABLE',
    'LOOP',
    'OPEN',
    'PIPE',
    'PREPARE',
    'REFRESH TABLE',
    'RELEASE',
    'RELEASE [TO] SAVEPOINT',
    'RENAME [TABLE | INDEX | STOGROUP | TABLESPACE]',
    'REPEAT',
    'RESIGNAL',
    'RETURN',
    'REVOKE',
    'ROLLBACK [WORK] [TO SAVEPOINT]',
    'SAVEPOINT',
    'SET COMPILATION ENVIRONMENT',
    'SET CONNECTION',
    'SET CURRENT',
    'SET ENCRYPTION PASSWORD',
    'SET EVENT MONITOR STATE',
    'SET INTEGRITY',
    'SET PASSTHRU',
    'SET PATH',
    'SET ROLE',
    'SET SCHEMA',
    'SET SERVER OPTION',
    'SET {SESSION AUTHORIZATION | SESSION_USER}',
    'SET USAGE LIST',
    'SIGNAL',
    'TRANSFER OWNERSHIP OF',
    'WHENEVER {NOT FOUND | SQLERROR | SQLWARNING}',
    'WHILE'
]);
const reservedSetOperations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'UNION [ALL]',
    'EXCEPT [ALL]',
    'INTERSECT [ALL]'
]);
const reservedJoins = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'JOIN',
    '{LEFT | RIGHT | FULL} [OUTER] JOIN',
    '{INNER | CROSS} JOIN'
]);
const reservedKeywordPhrases = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'ON DELETE',
    'ON UPDATE',
    'SET NULL',
    '{ROWS | RANGE} BETWEEN'
]);
const reservedDataTypePhrases = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([]);
const db2 = {
    name: 'db2',
    tokenizerOptions: {
        reservedSelect,
        reservedClauses: [
            ...reservedClauses,
            ...standardOnelineClauses,
            ...tabularOnelineClauses
        ],
        reservedSetOperations,
        reservedJoins,
        reservedKeywordPhrases,
        reservedDataTypePhrases,
        reservedKeywords: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$db2$2f$db2$2e$keywords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keywords"],
        reservedDataTypes: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$db2$2f$db2$2e$keywords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dataTypes"],
        reservedFunctionNames: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$db2$2f$db2$2e$functions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["functions"],
        extraParens: [
            '[]'
        ],
        stringTypes: [
            {
                quote: "''-qq",
                prefixes: [
                    'G',
                    'N',
                    'U&'
                ]
            },
            {
                quote: "''-raw",
                prefixes: [
                    'X',
                    'BX',
                    'GX',
                    'UX'
                ],
                requirePrefix: true
            }
        ],
        identTypes: [
            `""-qq`
        ],
        identChars: {
            first: '@#$',
            rest: '@#$'
        },
        paramTypes: {
            positional: true,
            named: [
                ':'
            ]
        },
        paramChars: {
            first: '@#$',
            rest: '@#$'
        },
        operators: [
            '**',
            '%',
            '|',
            '&',
            '^',
            '~',
            '¬=',
            '¬>',
            '¬<',
            '!>',
            '!<',
            '^=',
            '^>',
            '^<',
            '||',
            '->',
            '=>'
        ]
    },
    formatOptions: {
        onelineClauses: [
            ...standardOnelineClauses,
            ...tabularOnelineClauses
        ],
        tabularOnelineClauses
    }
};
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/db2/db2.functions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "functions",
    ()=>functions
]);
const functions = [
    // https://www.ibm.com/docs/en/db2/11.5?topic=bif-aggregate-functions
    'ARRAY_AGG',
    'AVG',
    'CORRELATION',
    'COUNT',
    'COUNT_BIG',
    'COVARIANCE',
    'COVARIANCE_SAMP',
    'CUME_DIST',
    'GROUPING',
    'LISTAGG',
    'MAX',
    'MEDIAN',
    'MIN',
    'PERCENTILE_CONT',
    'PERCENTILE_DISC',
    'PERCENT_RANK',
    'REGR_AVGX',
    'REGR_AVGY',
    'REGR_COUNT',
    'REGR_INTERCEPT',
    'REGR_ICPT',
    'REGR_R2',
    'REGR_SLOPE',
    'REGR_SXX',
    'REGR_SXY',
    'REGR_SYY',
    'STDDEV',
    'STDDEV_SAMP',
    'SUM',
    'VARIANCE',
    'VARIANCE_SAMP',
    'XMLAGG',
    'XMLGROUP',
    // https://www.ibm.com/docs/en/db2/11.5?topic=bif-scalar-functions
    'ABS',
    'ABSVAL',
    'ACOS',
    'ADD_DAYS',
    'ADD_HOURS',
    'ADD_MINUTES',
    'ADD_MONTHS',
    'ADD_SECONDS',
    'ADD_YEARS',
    'AGE',
    'ARRAY_DELETE',
    'ARRAY_FIRST',
    'ARRAY_LAST',
    'ARRAY_NEXT',
    'ARRAY_PRIOR',
    'ASCII',
    'ASCII_STR',
    'ASIN',
    'ATAN',
    'ATAN2',
    'ATANH',
    'BITAND',
    'BITANDNOT',
    'BITOR',
    'BITXOR',
    'BITNOT',
    'BPCHAR',
    'BSON_TO_JSON',
    'BTRIM',
    'CARDINALITY',
    'CEILING',
    'CEIL',
    'CHARACTER_LENGTH',
    'CHR',
    'COALESCE',
    'COLLATION_KEY',
    'COLLATION_KEY_BIT',
    'COMPARE_DECFLOAT',
    'CONCAT',
    'COS',
    'COSH',
    'COT',
    'CURSOR_ROWCOUNT',
    'DATAPARTITIONNUM',
    'DATE_PART',
    'DATE_TRUNC',
    'DAY',
    'DAYNAME',
    'DAYOFMONTH',
    'DAYOFWEEK',
    'DAYOFWEEK_ISO',
    'DAYOFYEAR',
    'DAYS',
    'DAYS_BETWEEN',
    'DAYS_TO_END_OF_MONTH',
    'DBPARTITIONNUM',
    'DECFLOAT',
    'DECFLOAT_FORMAT',
    'DECODE',
    'DECRYPT_BIN',
    'DECRYPT_CHAR',
    'DEGREES',
    'DEREF',
    'DIFFERENCE',
    'DIGITS',
    'DOUBLE_PRECISION',
    'EMPTY_BLOB',
    'EMPTY_CLOB',
    'EMPTY_DBCLOB',
    'EMPTY_NCLOB',
    'ENCRYPT',
    'EVENT_MON_STATE',
    'EXP',
    'EXTRACT',
    'FIRST_DAY',
    'FLOOR',
    'FROM_UTC_TIMESTAMP',
    'GENERATE_UNIQUE',
    'GETHINT',
    'GREATEST',
    'HASH',
    'HASH4',
    'HASH8',
    'HASHEDVALUE',
    'HEX',
    'HEXTORAW',
    'HOUR',
    'HOURS_BETWEEN',
    'IDENTITY_VAL_LOCAL',
    'IFNULL',
    'INITCAP',
    'INSERT',
    'INSTR',
    'INSTR2',
    'INSTR4',
    'INSTRB',
    'INTNAND',
    'INTNOR',
    'INTNXOR',
    'INTNNOT',
    'ISNULL',
    'JSON_ARRAY',
    'JSON_OBJECT',
    'JSON_QUERY',
    'JSON_TO_BSON',
    'JSON_VALUE',
    'JULIAN_DAY',
    'LAST_DAY',
    'LCASE',
    'LEAST',
    'LEFT',
    'LENGTH',
    'LENGTH2',
    'LENGTH4',
    'LENGTHB',
    'LN',
    'LOCATE',
    'LOCATE_IN_STRING',
    'LOG10',
    'LONG_VARCHAR',
    'LONG_VARGRAPHIC',
    'LOWER',
    'LPAD',
    'LTRIM',
    'MAX',
    'MAX_CARDINALITY',
    'MICROSECOND',
    'MIDNIGHT_SECONDS',
    'MIN',
    'MINUTE',
    'MINUTES_BETWEEN',
    'MOD',
    'MONTH',
    'MONTHNAME',
    'MONTHS_BETWEEN',
    'MULTIPLY_ALT',
    'NEXT_DAY',
    'NEXT_MONTH',
    'NEXT_QUARTER',
    'NEXT_WEEK',
    'NEXT_YEAR',
    'NORMALIZE_DECFLOAT',
    'NOW',
    'NULLIF',
    'NVL',
    'NVL2',
    'OCTET_LENGTH',
    'OVERLAY',
    'PARAMETER',
    'POSITION',
    'POSSTR',
    'POW',
    'POWER',
    'QUANTIZE',
    'QUARTER',
    'QUOTE_IDENT',
    'QUOTE_LITERAL',
    'RADIANS',
    'RAISE_ERROR',
    'RAND',
    'RANDOM',
    'RAWTOHEX',
    'REC2XML',
    'REGEXP_COUNT',
    'REGEXP_EXTRACT',
    'REGEXP_INSTR',
    'REGEXP_LIKE',
    'REGEXP_MATCH_COUNT',
    'REGEXP_REPLACE',
    'REGEXP_SUBSTR',
    'REPEAT',
    'REPLACE',
    'RID',
    'RID_BIT',
    'RIGHT',
    'ROUND',
    'ROUND_TIMESTAMP',
    'RPAD',
    'RTRIM',
    'SECLABEL',
    'SECLABEL_BY_NAME',
    'SECLABEL_TO_CHAR',
    'SECOND',
    'SECONDS_BETWEEN',
    'SIGN',
    'SIN',
    'SINH',
    'SOUNDEX',
    'SPACE',
    'SQRT',
    'STRIP',
    'STRLEFT',
    'STRPOS',
    'STRRIGHT',
    'SUBSTR',
    'SUBSTR2',
    'SUBSTR4',
    'SUBSTRB',
    'SUBSTRING',
    'TABLE_NAME',
    'TABLE_SCHEMA',
    'TAN',
    'TANH',
    'THIS_MONTH',
    'THIS_QUARTER',
    'THIS_WEEK',
    'THIS_YEAR',
    'TIMESTAMP_FORMAT',
    'TIMESTAMP_ISO',
    'TIMESTAMPDIFF',
    'TIMEZONE',
    'TO_CHAR',
    'TO_CLOB',
    'TO_DATE',
    'TO_HEX',
    'TO_MULTI_BYTE',
    'TO_NCHAR',
    'TO_NCLOB',
    'TO_NUMBER',
    'TO_SINGLE_BYTE',
    'TO_TIMESTAMP',
    'TO_UTC_TIMESTAMP',
    'TOTALORDER',
    'TRANSLATE',
    'TRIM',
    'TRIM_ARRAY',
    'TRUNC_TIMESTAMP',
    'TRUNCATE',
    'TRUNC',
    'TYPE_ID',
    'TYPE_NAME',
    'TYPE_SCHEMA',
    'UCASE',
    'UNICODE_STR',
    'UPPER',
    'VALUE',
    'VARCHAR_BIT_FORMAT',
    'VARCHAR_FORMAT',
    'VARCHAR_FORMAT_BIT',
    'VERIFY_GROUP_FOR_USER',
    'VERIFY_ROLE_FOR_USER',
    'VERIFY_TRUSTED_CONTEXT_ROLE_FOR_USER',
    'WEEK',
    'WEEK_ISO',
    'WEEKS_BETWEEN',
    'WIDTH_BUCKET',
    'XMLATTRIBUTES',
    'XMLCOMMENT',
    'XMLCONCAT',
    'XMLDOCUMENT',
    'XMLELEMENT',
    'XMLFOREST',
    'XMLNAMESPACES',
    'XMLPARSE',
    'XMLPI',
    'XMLQUERY',
    'XMLROW',
    'XMLSERIALIZE',
    'XMLTEXT',
    'XMLVALIDATE',
    'XMLXSROBJECTID',
    'XSLTRANSFORM',
    'YEAR',
    'YEARS_BETWEEN',
    'YMD_BETWEEN',
    // https://www.ibm.com/docs/en/db2/11.5?topic=bif-table-functions
    'BASE_TABLE',
    'JSON_TABLE',
    'UNNEST',
    'XMLTABLE',
    // https://www.ibm.com/docs/en/db2/11.5?topic=expressions-olap-specification
    // Additional function names not already present in the aggregate functions list
    'RANK',
    'DENSE_RANK',
    'NTILE',
    'LAG',
    'LEAD',
    'ROW_NUMBER',
    'FIRST_VALUE',
    'LAST_VALUE',
    'NTH_VALUE',
    'RATIO_TO_REPORT',
    // Type casting
    'CAST'
];
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/db2/db2.keywords.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "dataTypes",
    ()=>dataTypes,
    "keywords",
    ()=>keywords
]);
const keywords = [
    // https://www.ibm.com/docs/en/db2/11.5?topic=sql-reserved-schema-names-reserved-words
    'ACTIVATE',
    'ADD',
    'AFTER',
    'ALIAS',
    'ALL',
    'ALLOCATE',
    'ALLOW',
    'ALTER',
    'AND',
    'ANY',
    'AS',
    'ASENSITIVE',
    'ASSOCIATE',
    'ASUTIME',
    'AT',
    'ATTRIBUTES',
    'AUDIT',
    'AUTHORIZATION',
    'AUX',
    'AUXILIARY',
    'BEFORE',
    'BEGIN',
    'BETWEEN',
    'BINARY',
    'BUFFERPOOL',
    'BY',
    'CACHE',
    'CALL',
    'CALLED',
    'CAPTURE',
    'CARDINALITY',
    'CASCADED',
    'CASE',
    'CAST',
    'CHECK',
    'CLONE',
    'CLOSE',
    'CLUSTER',
    'COLLECTION',
    'COLLID',
    'COLUMN',
    'COMMENT',
    'COMMIT',
    'CONCAT',
    'CONDITION',
    'CONNECT',
    'CONNECTION',
    'CONSTRAINT',
    'CONTAINS',
    'CONTINUE',
    'COUNT',
    'COUNT_BIG',
    'CREATE',
    'CROSS',
    'CURRENT',
    'CURRENT_DATE',
    'CURRENT_LC_CTYPE',
    'CURRENT_PATH',
    'CURRENT_SCHEMA',
    'CURRENT_SERVER',
    'CURRENT_TIME',
    'CURRENT_TIMESTAMP',
    'CURRENT_TIMEZONE',
    'CURRENT_USER',
    'CURSOR',
    'CYCLE',
    'DATA',
    'DATABASE',
    'DATAPARTITIONNAME',
    'DATAPARTITIONNUM',
    'DAY',
    'DAYS',
    'DB2GENERAL',
    'DB2GENRL',
    'DB2SQL',
    'DBINFO',
    'DBPARTITIONNAME',
    'DBPARTITIONNUM',
    'DEALLOCATE',
    'DECLARE',
    'DEFAULT',
    'DEFAULTS',
    'DEFINITION',
    'DELETE',
    'DENSERANK',
    'DENSE_RANK',
    'DESCRIBE',
    'DESCRIPTOR',
    'DETERMINISTIC',
    'DIAGNOSTICS',
    'DISABLE',
    'DISALLOW',
    'DISCONNECT',
    'DISTINCT',
    'DO',
    'DOCUMENT',
    'DROP',
    'DSSIZE',
    'DYNAMIC',
    'EACH',
    'EDITPROC',
    'ELSE',
    'ELSEIF',
    'ENABLE',
    'ENCODING',
    'ENCRYPTION',
    'END',
    'END-EXEC',
    'ENDING',
    'ERASE',
    'ESCAPE',
    'EVERY',
    'EXCEPT',
    'EXCEPTION',
    'EXCLUDING',
    'EXCLUSIVE',
    'EXECUTE',
    'EXISTS',
    'EXIT',
    'EXPLAIN',
    'EXTENDED',
    'EXTERNAL',
    'EXTRACT',
    'FENCED',
    'FETCH',
    'FIELDPROC',
    'FILE',
    'FINAL',
    'FIRST1',
    'FOR',
    'FOREIGN',
    'FREE',
    'FROM',
    'FULL',
    'FUNCTION',
    'GENERAL',
    'GENERATED',
    'GET',
    'GLOBAL',
    'GO',
    'GOTO',
    'GRANT',
    'GRAPHIC',
    'GROUP',
    'HANDLER',
    'HASH',
    'HASHED_VALUE',
    'HAVING',
    'HINT',
    'HOLD',
    'HOUR',
    'HOURS',
    'IDENTITY',
    'IF',
    'IMMEDIATE',
    'IMPORT',
    'IN',
    'INCLUDING',
    'INCLUSIVE',
    'INCREMENT',
    'INDEX',
    'INDICATOR',
    'INDICATORS',
    'INF',
    'INFINITY',
    'INHERIT',
    'INNER',
    'INOUT',
    'INSENSITIVE',
    'INSERT',
    'INTEGRITY',
    'INTERSECT',
    'INTO',
    'IS',
    'ISNULL',
    'ISOBID',
    'ISOLATION',
    'ITERATE',
    'JAR',
    'JAVA',
    'JOIN',
    'KEEP',
    'KEY',
    'LABEL',
    'LANGUAGE',
    'LAST3',
    'LATERAL',
    'LC_CTYPE',
    'LEAVE',
    'LEFT',
    'LIKE',
    'LIMIT',
    'LINKTYPE',
    'LOCAL',
    'LOCALDATE',
    'LOCALE',
    'LOCALTIME',
    'LOCALTIMESTAMP',
    'LOCATOR',
    'LOCATORS',
    'LOCK',
    'LOCKMAX',
    'LOCKSIZE',
    'LOOP',
    'MAINTAINED',
    'MATERIALIZED',
    'MAXVALUE',
    'MICROSECOND',
    'MICROSECONDS',
    'MINUTE',
    'MINUTES',
    'MINVALUE',
    'MODE',
    'MODIFIES',
    'MONTH',
    'MONTHS',
    'NAN',
    'NEW',
    'NEW_TABLE',
    'NEXTVAL',
    'NO',
    'NOCACHE',
    'NOCYCLE',
    'NODENAME',
    'NODENUMBER',
    'NOMAXVALUE',
    'NOMINVALUE',
    'NONE',
    'NOORDER',
    'NORMALIZED',
    'NOT2',
    'NOTNULL',
    'NULL',
    'NULLS',
    'NUMPARTS',
    'OBID',
    'OF',
    'OFF',
    'OFFSET',
    'OLD',
    'OLD_TABLE',
    'ON',
    'OPEN',
    'OPTIMIZATION',
    'OPTIMIZE',
    'OPTION',
    'OR',
    'ORDER',
    'OUT',
    'OUTER',
    'OVER',
    'OVERRIDING',
    'PACKAGE',
    'PADDED',
    'PAGESIZE',
    'PARAMETER',
    'PART',
    'PARTITION',
    'PARTITIONED',
    'PARTITIONING',
    'PARTITIONS',
    'PASSWORD',
    'PATH',
    'PERCENT',
    'PIECESIZE',
    'PLAN',
    'POSITION',
    'PRECISION',
    'PREPARE',
    'PREVVAL',
    'PRIMARY',
    'PRIQTY',
    'PRIVILEGES',
    'PROCEDURE',
    'PROGRAM',
    'PSID',
    'PUBLIC',
    'QUERY',
    'QUERYNO',
    'RANGE',
    'RANK',
    'READ',
    'READS',
    'RECOVERY',
    'REFERENCES',
    'REFERENCING',
    'REFRESH',
    'RELEASE',
    'RENAME',
    'REPEAT',
    'RESET',
    'RESIGNAL',
    'RESTART',
    'RESTRICT',
    'RESULT',
    'RESULT_SET_LOCATOR',
    'RETURN',
    'RETURNS',
    'REVOKE',
    'RIGHT',
    'ROLE',
    'ROLLBACK',
    'ROUND_CEILING',
    'ROUND_DOWN',
    'ROUND_FLOOR',
    'ROUND_HALF_DOWN',
    'ROUND_HALF_EVEN',
    'ROUND_HALF_UP',
    'ROUND_UP',
    'ROUTINE',
    'ROW',
    'ROWNUMBER',
    'ROWS',
    'ROWSET',
    'ROW_NUMBER',
    'RRN',
    'RUN',
    'SAVEPOINT',
    'SCHEMA',
    'SCRATCHPAD',
    'SCROLL',
    'SEARCH',
    'SECOND',
    'SECONDS',
    'SECQTY',
    'SECURITY',
    'SELECT',
    'SENSITIVE',
    'SEQUENCE',
    'SESSION',
    'SESSION_USER',
    'SET',
    'SIGNAL',
    'SIMPLE',
    'SNAN',
    'SOME',
    'SOURCE',
    'SPECIFIC',
    'SQL',
    'SQLID',
    'STACKED',
    'STANDARD',
    'START',
    'STARTING',
    'STATEMENT',
    'STATIC',
    'STATMENT',
    'STAY',
    'STOGROUP',
    'STORES',
    'STYLE',
    'SUBSTRING',
    'SUMMARY',
    'SYNONYM',
    'SYSFUN',
    'SYSIBM',
    'SYSPROC',
    'SYSTEM',
    'SYSTEM_USER',
    'TABLE',
    'TABLESPACE',
    'THEN',
    'TO',
    'TRANSACTION',
    'TRIGGER',
    'TRIM',
    'TRUNCATE',
    'TYPE',
    'UNDO',
    'UNION',
    'UNIQUE',
    'UNTIL',
    'UPDATE',
    'USAGE',
    'USER',
    'USING',
    'VALIDPROC',
    'VALUE',
    'VALUES',
    'VARIABLE',
    'VARIANT',
    'VCAT',
    'VERSION',
    'VIEW',
    'VOLATILE',
    'VOLUMES',
    'WHEN',
    'WHENEVER',
    'WHERE',
    'WHILE',
    'WITH',
    'WITHOUT',
    'WLM',
    'WRITE',
    'XMLELEMENT',
    'XMLEXISTS',
    'XMLNAMESPACES',
    'YEAR',
    'YEARS'
];
const dataTypes = [
    // https://www.ibm.com/docs/en/db2-for-zos/12?topic=columns-data-types
    'ARRAY',
    'BIGINT',
    'BINARY',
    'BLOB',
    'BOOLEAN',
    'CCSID',
    'CHAR',
    'CHARACTER',
    'CLOB',
    'DATE',
    'DATETIME',
    'DBCLOB',
    'DEC',
    'DECIMAL',
    'DOUBLE',
    'DOUBLE PRECISION',
    'FLOAT',
    'FLOAT4',
    'FLOAT8',
    'GRAPHIC',
    'INT',
    'INT2',
    'INT4',
    'INT8',
    'INTEGER',
    'INTERVAL',
    'LONG VARCHAR',
    'LONG VARGRAPHIC',
    'NCHAR',
    'NCHR',
    'NCLOB',
    'NVARCHAR',
    'NUMERIC',
    'SMALLINT',
    'REAL',
    'TIME',
    'TIMESTAMP',
    'VARBINARY',
    'VARCHAR',
    'VARGRAPHIC'
];
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/db2i/db2i.formatter.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "db2i",
    ()=>db2i
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/expandPhrases.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$db2i$2f$db2i$2e$functions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/db2i/db2i.functions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$db2i$2f$db2i$2e$keywords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/db2i/db2i.keywords.js [app-client] (ecmascript)");
;
;
;
const reservedSelect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'SELECT [ALL | DISTINCT]'
]);
const reservedClauses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    // queries
    'WITH [RECURSIVE]',
    'INTO',
    'FROM',
    'WHERE',
    'GROUP BY',
    'HAVING',
    'PARTITION BY',
    'ORDER [SIBLINGS] BY [INPUT SEQUENCE]',
    'LIMIT',
    'OFFSET',
    'FETCH {FIRST | NEXT}',
    'FOR UPDATE [OF]',
    'FOR READ ONLY',
    'OPTIMIZE FOR',
    // Data modification
    // - insert:
    'INSERT INTO',
    'VALUES',
    // - update:
    'SET',
    // - merge:
    'MERGE INTO',
    'WHEN [NOT] MATCHED [THEN]',
    'UPDATE SET',
    'DELETE',
    'INSERT',
    // Data definition - table
    'FOR SYSTEM NAME'
]);
const standardOnelineClauses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'CREATE [OR REPLACE] TABLE'
]);
const tabularOnelineClauses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    // - create:
    'CREATE [OR REPLACE] [RECURSIVE] VIEW',
    // - update:
    'UPDATE',
    'WHERE CURRENT OF',
    'WITH {NC | RR | RS | CS | UR}',
    // - delete:
    'DELETE FROM',
    // - drop table:
    'DROP TABLE',
    // alter table:
    'ALTER TABLE',
    'ADD [COLUMN]',
    'ALTER [COLUMN]',
    'DROP [COLUMN]',
    'SET DATA TYPE',
    'SET {GENERATED ALWAYS | GENERATED BY DEFAULT}',
    'SET NOT NULL',
    'SET {NOT HIDDEN | IMPLICITLY HIDDEN}',
    'SET FIELDPROC',
    'DROP {DEFAULT | NOT NULL | GENERATED | IDENTITY | ROW CHANGE TIMESTAMP | FIELDPROC}',
    // - truncate:
    'TRUNCATE [TABLE]',
    // other
    'SET [CURRENT] SCHEMA',
    'SET CURRENT_SCHEMA',
    // https://www.ibm.com/docs/en/i/7.5?topic=reference-statements
    'ALLOCATE CURSOR',
    'ALLOCATE [SQL] DESCRIPTOR [LOCAL | GLOBAL] SQL',
    'ALTER [SPECIFIC] {FUNCTION | PROCEDURE}',
    'ALTER {MASK | PERMISSION | SEQUENCE | TRIGGER}',
    'ASSOCIATE [RESULT SET] {LOCATOR | LOCATORS}',
    'BEGIN DECLARE SECTION',
    'CALL',
    'CLOSE',
    'COMMENT ON {ALIAS | COLUMN | CONSTRAINT | INDEX | MASK | PACKAGE | PARAMETER | PERMISSION | SEQUENCE | TABLE | TRIGGER | VARIABLE | XSROBJECT}',
    'COMMENT ON [SPECIFIC] {FUNCTION | PROCEDURE | ROUTINE}',
    'COMMENT ON PARAMETER SPECIFIC {FUNCTION | PROCEDURE | ROUTINE}',
    'COMMENT ON [TABLE FUNCTION] RETURN COLUMN',
    'COMMENT ON [TABLE FUNCTION] RETURN COLUMN SPECIFIC [PROCEDURE | ROUTINE]',
    'COMMIT [WORK] [HOLD]',
    'CONNECT [TO | RESET] USER',
    'CREATE [OR REPLACE] {ALIAS | FUNCTION | MASK | PERMISSION | PROCEDURE | SEQUENCE | TRIGGER | VARIABLE}',
    'CREATE [ENCODED VECTOR] INDEX',
    'CREATE UNIQUE [WHERE NOT NULL] INDEX',
    'CREATE SCHEMA',
    'CREATE TYPE',
    'DEALLOCATE [SQL] DESCRIPTOR [LOCAL | GLOBAL]',
    'DECLARE CURSOR',
    'DECLARE GLOBAL TEMPORARY TABLE',
    'DECLARE',
    'DESCRIBE CURSOR',
    'DESCRIBE INPUT',
    'DESCRIBE [OUTPUT]',
    'DESCRIBE {PROCEDURE | ROUTINE}',
    'DESCRIBE TABLE',
    'DISCONNECT ALL [SQL]',
    'DISCONNECT [CURRENT]',
    'DROP {ALIAS | INDEX | MASK | PACKAGE | PERMISSION | SCHEMA | SEQUENCE | TABLE | TYPE | VARIABLE | XSROBJECT} [IF EXISTS]',
    'DROP [SPECIFIC] {FUNCTION | PROCEDURE | ROUTINE} [IF EXISTS]',
    'END DECLARE SECTION',
    'EXECUTE [IMMEDIATE]',
    // 'FETCH {NEXT | PRIOR | FIRST | LAST | BEFORE | AFTER | CURRENT} [FROM]',
    'FREE LOCATOR',
    'GET [SQL] DESCRIPTOR [LOCAL | GLOBAL]',
    'GET [CURRENT | STACKED] DIAGNOSTICS',
    'GRANT {ALL [PRIVILEGES] | ALTER | EXECUTE} ON {FUNCTION | PROCEDURE | ROUTINE | PACKAGE | SCHEMA | SEQUENCE | TABLE | TYPE | VARIABLE | XSROBJECT}',
    'HOLD LOCATOR',
    'INCLUDE',
    'LABEL ON {ALIAS | COLUMN | CONSTRAINT | INDEX | MASK | PACKAGE | PERMISSION | SEQUENCE | TABLE | TRIGGER | VARIABLE | XSROBJECT}',
    'LABEL ON [SPECIFIC] {FUNCTION | PROCEDURE | ROUTINE}',
    'LOCK TABLE',
    'OPEN',
    'PREPARE',
    'REFRESH TABLE',
    'RELEASE',
    'RELEASE [TO] SAVEPOINT',
    'RENAME [TABLE | INDEX] TO',
    'REVOKE {ALL [PRIVILEGES] | ALTER | EXECUTE} ON {FUNCTION | PROCEDURE | ROUTINE | PACKAGE | SCHEMA | SEQUENCE | TABLE | TYPE | VARIABLE | XSROBJECT}',
    'ROLLBACK [WORK] [HOLD | TO SAVEPOINT]',
    'SAVEPOINT',
    'SET CONNECTION',
    'SET CURRENT {DEBUG MODE | DECFLOAT ROUNDING MODE | DEGREE | IMPLICIT XMLPARSE OPTION | TEMPORAL SYSTEM_TIME}',
    'SET [SQL] DESCRIPTOR [LOCAL | GLOBAL]',
    'SET ENCRYPTION PASSWORD',
    'SET OPTION',
    'SET {[CURRENT [FUNCTION]] PATH | CURRENT_PATH}',
    'SET RESULT SETS [WITH RETURN [TO CALLER | TO CLIENT]]',
    'SET SESSION AUTHORIZATION',
    'SET SESSION_USER',
    'SET TRANSACTION',
    'SIGNAL SQLSTATE [VALUE]',
    'TAG',
    'TRANSFER OWNERSHIP OF',
    'WHENEVER {NOT FOUND | SQLERROR | SQLWARNING}'
]);
const reservedSetOperations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'UNION [ALL]',
    'EXCEPT [ALL]',
    'INTERSECT [ALL]'
]);
const reservedJoins = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'JOIN',
    '{LEFT | RIGHT | FULL} [OUTER] JOIN',
    '[LEFT | RIGHT] EXCEPTION JOIN',
    '{INNER | CROSS} JOIN'
]);
const reservedKeywordPhrases = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'ON DELETE',
    'ON UPDATE',
    'SET NULL',
    '{ROWS | RANGE} BETWEEN'
]);
const reservedDataTypePhrases = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([]);
const db2i = {
    name: 'db2i',
    tokenizerOptions: {
        reservedSelect,
        reservedClauses: [
            ...reservedClauses,
            ...standardOnelineClauses,
            ...tabularOnelineClauses
        ],
        reservedSetOperations,
        reservedJoins,
        reservedKeywordPhrases,
        reservedDataTypePhrases,
        reservedKeywords: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$db2i$2f$db2i$2e$keywords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keywords"],
        reservedDataTypes: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$db2i$2f$db2i$2e$keywords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dataTypes"],
        reservedFunctionNames: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$db2i$2f$db2i$2e$functions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["functions"],
        nestedBlockComments: true,
        extraParens: [
            '[]'
        ],
        stringTypes: [
            {
                quote: "''-qq",
                prefixes: [
                    'G',
                    'N'
                ]
            },
            {
                quote: "''-raw",
                prefixes: [
                    'X',
                    'BX',
                    'GX',
                    'UX'
                ],
                requirePrefix: true
            }
        ],
        identTypes: [
            `""-qq`
        ],
        identChars: {
            first: '@#$',
            rest: '@#$'
        },
        paramTypes: {
            positional: true,
            named: [
                ':'
            ]
        },
        paramChars: {
            first: '@#$',
            rest: '@#$'
        },
        operators: [
            '**',
            '¬=',
            '¬>',
            '¬<',
            '!>',
            '!<',
            '||',
            '=>'
        ]
    },
    formatOptions: {
        onelineClauses: [
            ...standardOnelineClauses,
            ...tabularOnelineClauses
        ],
        tabularOnelineClauses
    }
};
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/db2i/db2i.functions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "functions",
    ()=>functions
]);
const functions = [
    // https://www.ibm.com/docs/en/i/7.5?topic=functions-aggregate
    // TODO: 'ANY', - conflicts with test for ANY predicate in 'operators.ys'!!
    'ARRAY_AGG',
    'AVG',
    'CORR',
    'CORRELATION',
    'COUNT',
    'COUNT_BIG',
    'COVAR_POP',
    'COVARIANCE',
    'COVAR',
    'COVAR_SAMP',
    'COVARIANCE_SAMP',
    'EVERY',
    'GROUPING',
    'JSON_ARRAYAGG',
    'JSON_OBJECTAGG',
    'LISTAGG',
    'MAX',
    'MEDIAN',
    'MIN',
    'PERCENTILE_CONT',
    'PERCENTILE_DISC',
    // https://www.ibm.com/docs/en/i/7.5?topic=functions-regression'
    'REGR_AVGX',
    'REGR_AVGY',
    'REGR_COUNT',
    'REGR_INTERCEPT',
    'REGR_R2',
    'REGR_SLOPE',
    'REGR_SXX',
    'REGR_SXY',
    'REGR_SYY',
    'SOME',
    'STDDEV_POP',
    'STDDEV',
    'STDDEV_SAMP',
    'SUM',
    'VAR_POP',
    'VARIANCE',
    'VAR',
    'VAR_SAMP',
    'VARIANCE_SAMP',
    'XMLAGG',
    'XMLGROUP',
    // https://www.ibm.com/docs/en/i/7.5?topic=functions-scalar
    'ABS',
    'ABSVAL',
    'ACOS',
    'ADD_DAYS',
    'ADD_HOURS',
    'ADD_MINUTES',
    'ADD_MONTHS',
    'ADD_SECONDS',
    'ADD_YEARS',
    'ANTILOG',
    'ARRAY_MAX_CARDINALITY',
    'ARRAY_TRIM',
    'ASCII',
    'ASIN',
    'ATAN',
    'ATAN2',
    'ATANH',
    'BASE64_DECODE',
    'BASE64_ENCODE',
    'BIT_LENGTH',
    'BITAND',
    'BITANDNOT',
    'BITNOT',
    'BITOR',
    'BITXOR',
    'BSON_TO_JSON',
    'CARDINALITY',
    'CEIL',
    'CEILING',
    'CHAR_LENGTH',
    'CHARACTER_LENGTH',
    'CHR',
    'COALESCE',
    'COMPARE_DECFLOAT',
    'CONCAT',
    'CONTAINS',
    'COS',
    'COSH',
    'COT',
    'CURDATE',
    'CURTIME',
    'DATABASE',
    'DATAPARTITIONNAME',
    'DATAPARTITIONNUM',
    'DAY',
    'DAYNAME',
    'DAYOFMONTH',
    'DAYOFWEEK_ISO',
    'DAYOFWEEK',
    'DAYOFYEAR',
    'DAYS',
    'DBPARTITIONNAME',
    'DBPARTITIONNUM',
    'DECFLOAT_FORMAT',
    'DECFLOAT_SORTKEY',
    'DECRYPT_BINARY',
    'DECRYPT_BIT',
    'DECRYPT_CHAR',
    'DECRYPT_DB',
    'DEGREES',
    'DIFFERENCE',
    'DIGITS',
    'DLCOMMENT',
    'DLLINKTYPE',
    'DLURLCOMPLETE',
    'DLURLPATH',
    'DLURLPATHONLY',
    'DLURLSCHEME',
    'DLURLSERVER',
    'DLVALUE',
    'DOUBLE_PRECISION',
    'DOUBLE',
    'ENCRPYT',
    'ENCRYPT_AES',
    'ENCRYPT_AES256',
    'ENCRYPT_RC2',
    'ENCRYPT_TDES',
    'EXP',
    'EXTRACT',
    'FIRST_DAY',
    'FLOOR',
    'GENERATE_UNIQUE',
    'GET_BLOB_FROM_FILE',
    'GET_CLOB_FROM_FILE',
    'GET_DBCLOB_FROM_FILE',
    'GET_XML_FILE',
    'GETHINT',
    'GREATEST',
    'HASH_MD5',
    'HASH_ROW',
    'HASH_SHA1',
    'HASH_SHA256',
    'HASH_SHA512',
    'HASH_VALUES',
    'HASHED_VALUE',
    'HEX',
    'HEXTORAW',
    'HOUR',
    'HTML_ENTITY_DECODE',
    'HTML_ENTITY_ENCODE',
    'HTTP_DELETE_BLOB',
    'HTTP_DELETE',
    'HTTP_GET_BLOB',
    'HTTP_GET',
    'HTTP_PATCH_BLOB',
    'HTTP_PATCH',
    'HTTP_POST_BLOB',
    'HTTP_POST',
    'HTTP_PUT_BLOB',
    'HTTP_PUT',
    'IDENTITY_VAL_LOCAL',
    'IFNULL',
    'INSERT',
    'INSTR',
    'INTERPRET',
    'ISFALSE',
    'ISNOTFALSE',
    'ISNOTTRUE',
    'ISTRUE',
    'JSON_ARRAY',
    'JSON_OBJECT',
    'JSON_QUERY',
    'JSON_TO_BSON',
    'JSON_UPDATE',
    'JSON_VALUE',
    'JULIAN_DAY',
    'LAND',
    'LAST_DAY',
    'LCASE',
    'LEAST',
    'LEFT',
    'LENGTH',
    'LN',
    'LNOT',
    'LOCATE_IN_STRING',
    'LOCATE',
    'LOG10',
    'LOR',
    'LOWER',
    'LPAD',
    'LTRIM',
    'MAX_CARDINALITY',
    'MAX',
    'MICROSECOND',
    'MIDNIGHT_SECONDS',
    'MIN',
    'MINUTE',
    'MOD',
    'MONTH',
    'MONTHNAME',
    'MONTHS_BETWEEN',
    'MQREAD',
    'MQREADCLOB',
    'MQRECEIVE',
    'MQRECEIVECLOB',
    'MQSEND',
    'MULTIPLY_ALT',
    'NEXT_DAY',
    'NORMALIZE_DECFLOAT',
    'NOW',
    'NULLIF',
    'NVL',
    'OCTET_LENGTH',
    'OVERLAY',
    'PI',
    'POSITION',
    'POSSTR',
    'POW',
    'POWER',
    'QUANTIZE',
    'QUARTER',
    'RADIANS',
    'RAISE_ERROR',
    'RANDOM',
    'RAND',
    'REGEXP_COUNT',
    'REGEXP_INSTR',
    'REGEXP_REPLACE',
    'REGEXP_SUBSTR',
    'REPEAT',
    'REPLACE',
    'RID',
    'RIGHT',
    'ROUND_TIMESTAMP',
    'ROUND',
    'RPAD',
    'RRN',
    'RTRIM',
    'SCORE',
    'SECOND',
    'SIGN',
    'SIN',
    'SINH',
    'SOUNDEX',
    'SPACE',
    'SQRT',
    'STRIP',
    'STRLEFT',
    'STRPOS',
    'STRRIGHT',
    'SUBSTR',
    'SUBSTRING',
    'TABLE_NAME',
    'TABLE_SCHEMA',
    'TAN',
    'TANH',
    'TIMESTAMP_FORMAT',
    'TIMESTAMP_ISO',
    'TIMESTAMPDIFF_BIG',
    'TIMESTAMPDIFF',
    'TO_CHAR',
    'TO_CLOB',
    'TO_DATE',
    'TO_NUMBER',
    'TO_TIMESTAMP',
    'TOTALORDER',
    'TRANSLATE',
    'TRIM_ARRAY',
    'TRIM',
    'TRUNC_TIMESTAMP',
    'TRUNC',
    'TRUNCATE',
    'UCASE',
    'UPPER',
    'URL_DECODE',
    'URL_ENCODE',
    'VALUE',
    'VARBINARY_FORMAT',
    'VARCHAR_BIT_FORMAT',
    'VARCHAR_FORMAT_BINARY',
    'VARCHAR_FORMAT',
    'VERIFY_GROUP_FOR_USER',
    'WEEK_ISO',
    'WEEK',
    'WRAP',
    'XMLATTRIBUTES',
    'XMLCOMMENT',
    'XMLCONCAT',
    'XMLDOCUMENT',
    'XMLELEMENT',
    'XMLFOREST',
    'XMLNAMESPACES',
    'XMLPARSE',
    'XMLPI',
    'XMLROW',
    'XMLSERIALIZE',
    'XMLTEXT',
    'XMLVALIDATE',
    'XOR',
    'XSLTRANSFORM',
    'YEAR',
    'ZONED',
    // https://www.ibm.com/docs/en/i/7.5?topic=functions-table
    'BASE_TABLE',
    'HTTP_DELETE_BLOB_VERBOSE',
    'HTTP_DELETE_VERBOSE',
    'HTTP_GET_BLOB_VERBOSE',
    'HTTP_GET_VERBOSE',
    'HTTP_PATCH_BLOB_VERBOSE',
    'HTTP_PATCH_VERBOSE',
    'HTTP_POST_BLOB_VERBOSE',
    'HTTP_POST_VERBOSE',
    'HTTP_PUT_BLOB_VERBOSE',
    'HTTP_PUT_VERBOSE',
    'JSON_TABLE',
    'MQREADALL',
    'MQREADALLCLOB',
    'MQRECEIVEALL',
    'MQRECEIVEALLCLOB',
    'XMLTABLE',
    // https://www.ibm.com/docs/en/db2-for-zos/11?topic=functions-row
    'UNPACK',
    // https://www.ibm.com/docs/en/i/7.5?topic=expressions-olap-specifications
    'CUME_DIST',
    'DENSE_RANK',
    'FIRST_VALUE',
    'LAG',
    'LAST_VALUE',
    'LEAD',
    'NTH_VALUE',
    'NTILE',
    'PERCENT_RANK',
    'RANK',
    'RATIO_TO_REPORT',
    'ROW_NUMBER',
    // Type casting
    'CAST'
];
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/db2i/db2i.keywords.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "dataTypes",
    ()=>dataTypes,
    "keywords",
    ()=>keywords
]);
const keywords = [
    // https://www.ibm.com/docs/en/i/7.5?topic=words-reserved
    // TODO: This list likely contains all keywords, not only the reserved ones,
    // try to filter it down to just the reserved keywords.
    'ABSENT',
    'ACCORDING',
    'ACCTNG',
    'ACTION',
    'ACTIVATE',
    'ADD',
    'ALIAS',
    'ALL',
    'ALLOCATE',
    'ALLOW',
    'ALTER',
    'AND',
    'ANY',
    'APPEND',
    'APPLNAME',
    'ARRAY',
    'ARRAY_AGG',
    'ARRAY_TRIM',
    'AS',
    'ASC',
    'ASENSITIVE',
    'ASSOCIATE',
    'ATOMIC',
    'ATTACH',
    'ATTRIBUTES',
    'AUTHORIZATION',
    'AUTONOMOUS',
    'BEFORE',
    'BEGIN',
    'BETWEEN',
    'BIND',
    'BSON',
    'BUFFERPOOL',
    'BY',
    'CACHE',
    'CALL',
    'CALLED',
    'CARDINALITY',
    'CASE',
    'CAST',
    'CHECK',
    'CL',
    'CLOSE',
    'CLUSTER',
    'COLLECT',
    'COLLECTION',
    'COLUMN',
    'COMMENT',
    'COMMIT',
    'COMPACT',
    'COMPARISONS',
    'COMPRESS',
    'CONCAT',
    'CONCURRENT',
    'CONDITION',
    'CONNECT',
    'CONNECT_BY_ROOT',
    'CONNECTION',
    'CONSTANT',
    'CONSTRAINT',
    'CONTAINS',
    'CONTENT',
    'CONTINUE',
    'COPY',
    'COUNT',
    'COUNT_BIG',
    'CREATE',
    'CREATEIN',
    'CROSS',
    'CUBE',
    'CUME_DIST',
    'CURRENT',
    'CURRENT_DATE',
    'CURRENT_PATH',
    'CURRENT_SCHEMA',
    'CURRENT_SERVER',
    'CURRENT_TIME',
    'CURRENT_TIMESTAMP',
    'CURRENT_TIMEZONE',
    'CURRENT_USER',
    'CURSOR',
    'CYCLE',
    'DATABASE',
    'DATAPARTITIONNAME',
    'DATAPARTITIONNUM',
    'DAY',
    'DAYS',
    'DB2GENERAL',
    'DB2GENRL',
    'DB2SQL',
    'DBINFO',
    'DBPARTITIONNAME',
    'DBPARTITIONNUM',
    'DEACTIVATE',
    'DEALLOCATE',
    'DECLARE',
    'DEFAULT',
    'DEFAULTS',
    'DEFER',
    'DEFINE',
    'DEFINITION',
    'DELETE',
    'DELETING',
    'DENSE_RANK',
    'DENSERANK',
    'DESC',
    'DESCRIBE',
    'DESCRIPTOR',
    'DETACH',
    'DETERMINISTIC',
    'DIAGNOSTICS',
    'DISABLE',
    'DISALLOW',
    'DISCONNECT',
    'DISTINCT',
    'DO',
    'DOCUMENT',
    'DROP',
    'DYNAMIC',
    'EACH',
    'ELSE',
    'ELSEIF',
    'EMPTY',
    'ENABLE',
    'ENCODING',
    'ENCRYPTION',
    'END',
    'END-EXEC',
    'ENDING',
    'ENFORCED',
    'ERROR',
    'ESCAPE',
    'EVERY',
    'EXCEPT',
    'EXCEPTION',
    'EXCLUDING',
    'EXCLUSIVE',
    'EXECUTE',
    'EXISTS',
    'EXIT',
    'EXTEND',
    'EXTERNAL',
    'EXTRACT',
    'FALSE',
    'FENCED',
    'FETCH',
    'FIELDPROC',
    'FILE',
    'FINAL',
    'FIRST_VALUE',
    'FOR',
    'FOREIGN',
    'FORMAT',
    'FREE',
    'FREEPAGE',
    'FROM',
    'FULL',
    'FUNCTION',
    'GBPCACHE',
    'GENERAL',
    'GENERATED',
    'GET',
    'GLOBAL',
    'GO',
    'GOTO',
    'GRANT',
    'GROUP',
    'HANDLER',
    'HASH',
    'HASH_ROW',
    'HASHED_VALUE',
    'HAVING',
    'HINT',
    'HOLD',
    'HOUR',
    'HOURS',
    // 'ID', Not actually a reserved keyword
    'IDENTITY',
    'IF',
    'IGNORE',
    'IMMEDIATE',
    'IMPLICITLY',
    'IN',
    'INCLUDE',
    'INCLUDING',
    'INCLUSIVE',
    'INCREMENT',
    'INDEX',
    'INDEXBP',
    'INDICATOR',
    'INF',
    'INFINITY',
    'INHERIT',
    'INLINE',
    'INNER',
    'INOUT',
    'INSENSITIVE',
    'INSERT',
    'INSERTING',
    'INTEGRITY',
    'INTERPRET',
    'INTERSECT',
    'INTO',
    'IS',
    'ISNULL',
    'ISOLATION',
    'ITERATE',
    'JAVA',
    'JOIN',
    'JSON',
    'JSON_ARRAY',
    'JSON_ARRAYAGG',
    'JSON_EXISTS',
    'JSON_OBJECT',
    'JSON_OBJECTAGG',
    'JSON_QUERY',
    'JSON_TABLE',
    'JSON_VALUE',
    'KEEP',
    'KEY',
    'KEYS',
    'LABEL',
    'LAG',
    'LANGUAGE',
    'LAST_VALUE',
    'LATERAL',
    'LEAD',
    'LEAVE',
    'LEFT',
    'LEVEL2',
    'LIKE',
    'LIMIT',
    'LINKTYPE',
    'LISTAGG',
    'LOCAL',
    'LOCALDATE',
    'LOCALTIME',
    'LOCALTIMESTAMP',
    'LOCATION',
    'LOCATOR',
    'LOCK',
    'LOCKSIZE',
    'LOG',
    'LOGGED',
    'LOOP',
    'MAINTAINED',
    'MASK',
    'MATCHED',
    'MATERIALIZED',
    'MAXVALUE',
    'MERGE',
    'MICROSECOND',
    'MICROSECONDS',
    'MINPCTUSED',
    'MINUTE',
    'MINUTES',
    'MINVALUE',
    'MIRROR',
    'MIXED',
    'MODE',
    'MODIFIES',
    'MONTH',
    'MONTHS',
    'NAMESPACE',
    'NAN',
    'NATIONAL',
    'NCHAR',
    'NCLOB',
    'NESTED',
    'NEW',
    'NEW_TABLE',
    'NEXTVAL',
    'NO',
    'NOCACHE',
    'NOCYCLE',
    'NODENAME',
    'NODENUMBER',
    'NOMAXVALUE',
    'NOMINVALUE',
    'NONE',
    'NOORDER',
    'NORMALIZED',
    'NOT',
    'NOTNULL',
    'NTH_VALUE',
    'NTILE',
    'NULL',
    'NULLS',
    'NVARCHAR',
    'OBID',
    'OBJECT',
    'OF',
    'OFF',
    'OFFSET',
    'OLD',
    'OLD_TABLE',
    'OMIT',
    'ON',
    'ONLY',
    'OPEN',
    'OPTIMIZE',
    'OPTION',
    'OR',
    'ORDER',
    'ORDINALITY',
    'ORGANIZE',
    'OUT',
    'OUTER',
    'OVER',
    'OVERLAY',
    'OVERRIDING',
    'PACKAGE',
    'PADDED',
    'PAGE',
    'PAGESIZE',
    'PARAMETER',
    'PART',
    'PARTITION',
    'PARTITIONED',
    'PARTITIONING',
    'PARTITIONS',
    'PASSING',
    'PASSWORD',
    'PATH',
    'PCTFREE',
    'PERCENT_RANK',
    'PERCENTILE_CONT',
    'PERCENTILE_DISC',
    'PERIOD',
    'PERMISSION',
    'PIECESIZE',
    'PIPE',
    'PLAN',
    'POSITION',
    'PREPARE',
    'PREVVAL',
    'PRIMARY',
    'PRIOR',
    'PRIQTY',
    'PRIVILEGES',
    'PROCEDURE',
    'PROGRAM',
    'PROGRAMID',
    'QUERY',
    'RANGE',
    'RANK',
    'RATIO_TO_REPORT',
    'RCDFMT',
    'READ',
    'READS',
    'RECOVERY',
    'REFERENCES',
    'REFERENCING',
    'REFRESH',
    'REGEXP_LIKE',
    'RELEASE',
    'RENAME',
    'REPEAT',
    'RESET',
    'RESIGNAL',
    'RESTART',
    'RESULT',
    'RESULT_SET_LOCATOR',
    'RETURN',
    'RETURNING',
    'RETURNS',
    'REVOKE',
    'RID',
    'RIGHT',
    'ROLLBACK',
    'ROLLUP',
    'ROUTINE',
    'ROW',
    'ROW_NUMBER',
    'ROWNUMBER',
    'ROWS',
    'RRN',
    'RUN',
    'SAVEPOINT',
    'SBCS',
    'SCALAR',
    'SCHEMA',
    'SCRATCHPAD',
    'SCROLL',
    'SEARCH',
    'SECOND',
    'SECONDS',
    'SECQTY',
    'SECURED',
    'SELECT',
    'SENSITIVE',
    'SEQUENCE',
    'SESSION',
    'SESSION_USER',
    'SET',
    'SIGNAL',
    'SIMPLE',
    'SKIP',
    'SNAN',
    'SOME',
    'SOURCE',
    'SPECIFIC',
    'SQL',
    'SQLID',
    'SQLIND_DEFAULT',
    'SQLIND_UNASSIGNED',
    'STACKED',
    'START',
    'STARTING',
    'STATEMENT',
    'STATIC',
    'STOGROUP',
    'SUBSTRING',
    'SUMMARY',
    'SYNONYM',
    'SYSTEM_TIME',
    'SYSTEM_USER',
    'TABLE',
    'TABLESPACE',
    'TABLESPACES',
    'TAG',
    'THEN',
    'THREADSAFE',
    'TO',
    'TRANSACTION',
    'TRANSFER',
    'TRIGGER',
    'TRIM',
    'TRIM_ARRAY',
    'TRUE',
    'TRUNCATE',
    'TRY_CAST',
    'TYPE',
    'UNDO',
    'UNION',
    'UNIQUE',
    'UNIT',
    'UNKNOWN',
    'UNNEST',
    'UNTIL',
    'UPDATE',
    'UPDATING',
    'URI',
    'USAGE',
    'USE',
    'USER',
    'USERID',
    'USING',
    'VALUE',
    'VALUES',
    'VARIABLE',
    'VARIANT',
    'VCAT',
    'VERSION',
    'VERSIONING',
    'VIEW',
    'VOLATILE',
    'WAIT',
    'WHEN',
    'WHENEVER',
    'WHERE',
    'WHILE',
    'WITH',
    'WITHIN',
    'WITHOUT',
    'WRAPPED',
    'WRAPPER',
    'WRITE',
    'WRKSTNNAME',
    'XMLAGG',
    'XMLATTRIBUTES',
    'XMLCAST',
    'XMLCOMMENT',
    'XMLCONCAT',
    'XMLDOCUMENT',
    'XMLELEMENT',
    'XMLFOREST',
    'XMLGROUP',
    'XMLNAMESPACES',
    'XMLPARSE',
    'XMLPI',
    'XMLROW',
    'XMLSERIALIZE',
    'XMLTABLE',
    'XMLTEXT',
    'XMLVALIDATE',
    'XSLTRANSFORM',
    'XSROBJECT',
    'YEAR',
    'YEARS',
    'YES',
    'ZONE'
];
const dataTypes = [
    // https://www.ibm.com/docs/en/i/7.2?topic=iaodsd-odbc-data-types-how-they-correspond-db2-i-database-types
    'ARRAY',
    'BIGINT',
    'BINARY',
    'BIT',
    'BLOB',
    'BOOLEAN',
    'CCSID',
    'CHAR',
    'CHARACTER',
    'CLOB',
    'DATA',
    'DATALINK',
    'DATE',
    'DBCLOB',
    'DECFLOAT',
    'DECIMAL',
    'DEC',
    'DOUBLE',
    'DOUBLE PRECISION',
    'FLOAT',
    'GRAPHIC',
    'INT',
    'INTEGER',
    'LONG',
    'NUMERIC',
    'REAL',
    'ROWID',
    'SMALLINT',
    'TIME',
    'TIMESTAMP',
    'VARBINARY',
    'VARCHAR',
    'VARGRAPHIC',
    'XML'
];
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/duckdb/duckdb.formatter.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "duckdb",
    ()=>duckdb
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/expandPhrases.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$duckdb$2f$duckdb$2e$functions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/duckdb/duckdb.functions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$duckdb$2f$duckdb$2e$keywords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/duckdb/duckdb.keywords.js [app-client] (ecmascript)");
;
;
;
const reservedSelect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'SELECT [ALL | DISTINCT]'
]);
const reservedClauses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    // queries
    'WITH [RECURSIVE]',
    'FROM',
    'WHERE',
    'GROUP BY [ALL]',
    'HAVING',
    'WINDOW',
    'PARTITION BY',
    'ORDER BY [ALL]',
    'LIMIT',
    'OFFSET',
    // 'USING' (conflicts with 'USING' in JOIN)
    'USING SAMPLE',
    'QUALIFY',
    // Data manipulation
    // - insert:
    'INSERT [OR REPLACE] INTO',
    'VALUES',
    'DEFAULT VALUES',
    // - update:
    'SET',
    // other:
    'RETURNING'
]);
const standardOnelineClauses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'CREATE [OR REPLACE] [TEMPORARY | TEMP] TABLE [IF NOT EXISTS]'
]);
const tabularOnelineClauses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    // TABLE
    // - update:
    'UPDATE',
    // - insert:
    'ON CONFLICT',
    // - delete:
    'DELETE FROM',
    // - drop table:
    'DROP TABLE [IF EXISTS]',
    // - truncate
    'TRUNCATE',
    // - alter table:
    'ALTER TABLE',
    'ADD [COLUMN] [IF NOT EXISTS]',
    'ADD PRIMARY KEY',
    'DROP [COLUMN] [IF EXISTS]',
    'ALTER [COLUMN]',
    'RENAME [COLUMN]',
    'RENAME TO',
    'SET [DATA] TYPE',
    '{SET | DROP} DEFAULT',
    '{SET | DROP} NOT NULL',
    // MACRO / FUNCTION
    'CREATE [OR REPLACE] [TEMPORARY | TEMP] {MACRO | FUNCTION}',
    'DROP MACRO [TABLE] [IF EXISTS]',
    'DROP FUNCTION [IF EXISTS]',
    // INDEX
    'CREATE [UNIQUE] INDEX [IF NOT EXISTS]',
    'DROP INDEX [IF EXISTS]',
    // SCHEMA
    'CREATE [OR REPLACE] SCHEMA [IF NOT EXISTS]',
    'DROP SCHEMA [IF EXISTS]',
    // SECRET
    'CREATE [OR REPLACE] [PERSISTENT | TEMPORARY] SECRET [IF NOT EXISTS]',
    'DROP [PERSISTENT | TEMPORARY] SECRET [IF EXISTS]',
    // SEQUENCE
    'CREATE [OR REPLACE] [TEMPORARY | TEMP] SEQUENCE',
    'DROP SEQUENCE [IF EXISTS]',
    // VIEW
    'CREATE [OR REPLACE] [TEMPORARY | TEMP] VIEW [IF NOT EXISTS]',
    'DROP VIEW [IF EXISTS]',
    'ALTER VIEW',
    // TYPE
    'CREATE TYPE',
    'DROP TYPE [IF EXISTS]',
    // other
    'ANALYZE',
    'ATTACH [DATABASE] [IF NOT EXISTS]',
    'DETACH [DATABASE] [IF EXISTS]',
    'CALL',
    '[FORCE] CHECKPOINT',
    'COMMENT ON [TABLE | COLUMN | VIEW | INDEX | SEQUENCE | TYPE | MACRO | MACRO TABLE]',
    'COPY [FROM DATABASE]',
    'DESCRIBE',
    'EXPORT DATABASE',
    'IMPORT DATABASE',
    'INSTALL',
    'LOAD',
    'PIVOT',
    'PIVOT_WIDER',
    'UNPIVOT',
    'EXPLAIN [ANALYZE]',
    // plain SET conflicts with SET clause in UPDATE
    'SET {LOCAL | SESSION | GLOBAL}',
    'RESET [LOCAL | SESSION | GLOBAL]',
    '{SET | RESET} VARIABLE',
    'SUMMARIZE',
    'BEGIN TRANSACTION',
    'ROLLBACK',
    'COMMIT',
    'ABORT',
    'USE',
    'VACUUM [ANALYZE]',
    // prepared statements
    'PREPARE',
    'EXECUTE',
    'DEALLOCATE [PREPARE]'
]);
const reservedSetOperations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'UNION [ALL | BY NAME]',
    'EXCEPT [ALL]',
    'INTERSECT [ALL]'
]);
const reservedJoins = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'JOIN',
    '{LEFT | RIGHT | FULL} [OUTER] JOIN',
    '{INNER | CROSS} JOIN',
    '{NATURAL | ASOF} [INNER] JOIN',
    '{NATURAL | ASOF} {LEFT | RIGHT | FULL} [OUTER] JOIN',
    'POSITIONAL JOIN',
    'ANTI JOIN',
    'SEMI JOIN'
]);
const reservedKeywordPhrases = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    '{ROWS | RANGE | GROUPS} BETWEEN',
    'SIMILAR TO',
    'IS [NOT] DISTINCT FROM'
]);
const reservedDataTypePhrases = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'TIMESTAMP WITH TIME ZONE'
]);
const duckdb = {
    name: 'duckdb',
    tokenizerOptions: {
        reservedSelect,
        reservedClauses: [
            ...reservedClauses,
            ...standardOnelineClauses,
            ...tabularOnelineClauses
        ],
        reservedSetOperations,
        reservedJoins,
        reservedKeywordPhrases,
        reservedDataTypePhrases,
        supportsXor: true,
        reservedKeywords: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$duckdb$2f$duckdb$2e$keywords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keywords"],
        reservedDataTypes: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$duckdb$2f$duckdb$2e$keywords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dataTypes"],
        reservedFunctionNames: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$duckdb$2f$duckdb$2e$functions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["functions"],
        nestedBlockComments: true,
        extraParens: [
            '[]',
            '{}'
        ],
        underscoresInNumbers: true,
        stringTypes: [
            '$$',
            "''-qq",
            {
                quote: "''-qq-bs",
                prefixes: [
                    'E'
                ],
                requirePrefix: true
            },
            {
                quote: "''-raw",
                prefixes: [
                    'B',
                    'X'
                ],
                requirePrefix: true
            }
        ],
        identTypes: [
            `""-qq`
        ],
        identChars: {
            rest: '$'
        },
        // TODO: named params $foo currently conflict with $$-quoted strings
        paramTypes: {
            positional: true,
            numbered: [
                '$'
            ],
            quoted: [
                '$'
            ]
        },
        operators: [
            // Arithmetic:
            '//',
            '%',
            '**',
            '^',
            '!',
            // Bitwise:
            '&',
            '|',
            '~',
            '<<',
            '>>',
            // Cast:
            '::',
            // Comparison:
            '==',
            // Lambda & JSON:
            '->',
            // JSON:
            '->>',
            // key-value separator:
            ':',
            // Named function params:
            ':=',
            '=>',
            // Pattern matching:
            '~~',
            '!~~',
            '~~*',
            '!~~*',
            '~~~',
            // Regular expressions:
            '~',
            '!~',
            '~*',
            '!~*',
            // String:
            '^@',
            '||',
            // INET extension:
            '>>=',
            '<<='
        ]
    },
    formatOptions: {
        alwaysDenseOperators: [
            '::'
        ],
        onelineClauses: [
            ...standardOnelineClauses,
            ...tabularOnelineClauses
        ],
        tabularOnelineClauses
    }
};
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/duckdb/duckdb.functions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "functions",
    ()=>functions
]);
const functions = [
    // Functions from DuckDB (excluding those that start with an underscore):
    // SELECT DISTINCT upper(function_name) AS function_name
    // FROM duckdb_functions()
    // WHERE function_name SIMILAR TO '^[a-z].*'
    // ORDER BY function_name
    'ABS',
    'ACOS',
    'ADD',
    'ADD_PARQUET_KEY',
    'AGE',
    'AGGREGATE',
    'ALIAS',
    'ALL_PROFILING_OUTPUT',
    'ANY_VALUE',
    'APPLY',
    'APPROX_COUNT_DISTINCT',
    'APPROX_QUANTILE',
    'ARBITRARY',
    'ARGMAX',
    'ARGMIN',
    'ARG_MAX',
    'ARG_MAX_NULL',
    'ARG_MIN',
    'ARG_MIN_NULL',
    'ARRAY_AGG',
    'ARRAY_AGGR',
    'ARRAY_AGGREGATE',
    'ARRAY_APPEND',
    'ARRAY_APPLY',
    'ARRAY_CAT',
    'ARRAY_CONCAT',
    'ARRAY_CONTAINS',
    'ARRAY_COSINE_SIMILARITY',
    'ARRAY_CROSS_PRODUCT',
    'ARRAY_DISTANCE',
    'ARRAY_DISTINCT',
    'ARRAY_DOT_PRODUCT',
    'ARRAY_EXTRACT',
    'ARRAY_FILTER',
    'ARRAY_GRADE_UP',
    'ARRAY_HAS',
    'ARRAY_HAS_ALL',
    'ARRAY_HAS_ANY',
    'ARRAY_INDEXOF',
    'ARRAY_INNER_PRODUCT',
    'ARRAY_INTERSECT',
    'ARRAY_LENGTH',
    'ARRAY_POP_BACK',
    'ARRAY_POP_FRONT',
    'ARRAY_POSITION',
    'ARRAY_PREPEND',
    'ARRAY_PUSH_BACK',
    'ARRAY_PUSH_FRONT',
    'ARRAY_REDUCE',
    'ARRAY_RESIZE',
    'ARRAY_REVERSE',
    'ARRAY_REVERSE_SORT',
    'ARRAY_SELECT',
    'ARRAY_SLICE',
    'ARRAY_SORT',
    'ARRAY_TO_JSON',
    'ARRAY_TO_STRING',
    'ARRAY_TRANSFORM',
    'ARRAY_UNIQUE',
    'ARRAY_VALUE',
    'ARRAY_WHERE',
    'ARRAY_ZIP',
    'ARROW_SCAN',
    'ARROW_SCAN_DUMB',
    'ASCII',
    'ASIN',
    'ATAN',
    'ATAN2',
    'AVG',
    'BASE64',
    'BIN',
    'BITSTRING',
    'BITSTRING_AGG',
    'BIT_AND',
    'BIT_COUNT',
    'BIT_LENGTH',
    'BIT_OR',
    'BIT_POSITION',
    'BIT_XOR',
    'BOOL_AND',
    'BOOL_OR',
    'CARDINALITY',
    'CBRT',
    'CEIL',
    'CEILING',
    'CENTURY',
    'CHECKPOINT',
    'CHR',
    'COLLATIONS',
    'COL_DESCRIPTION',
    'COMBINE',
    'CONCAT',
    'CONCAT_WS',
    'CONSTANT_OR_NULL',
    'CONTAINS',
    'COPY_DATABASE',
    'CORR',
    'COS',
    'COT',
    'COUNT',
    'COUNT_IF',
    'COUNT_STAR',
    'COVAR_POP',
    'COVAR_SAMP',
    'CREATE_SORT_KEY',
    'CURRENT_CATALOG',
    'CURRENT_DATABASE',
    'CURRENT_DATE',
    'CURRENT_LOCALTIME',
    'CURRENT_LOCALTIMESTAMP',
    'CURRENT_QUERY',
    'CURRENT_ROLE',
    'CURRENT_SCHEMA',
    'CURRENT_SCHEMAS',
    'CURRENT_SETTING',
    'CURRENT_USER',
    'CURRVAL',
    'DAMERAU_LEVENSHTEIN',
    'DATABASE_LIST',
    'DATABASE_SIZE',
    'DATEDIFF',
    'DATEPART',
    'DATESUB',
    'DATETRUNC',
    'DATE_ADD',
    'DATE_DIFF',
    'DATE_PART',
    'DATE_SUB',
    'DATE_TRUNC',
    'DAY',
    'DAYNAME',
    'DAYOFMONTH',
    'DAYOFWEEK',
    'DAYOFYEAR',
    'DECADE',
    'DECODE',
    'DEGREES',
    'DISABLE_CHECKPOINT_ON_SHUTDOWN',
    'DISABLE_OBJECT_CACHE',
    'DISABLE_OPTIMIZER',
    'DISABLE_PRINT_PROGRESS_BAR',
    'DISABLE_PROFILE',
    'DISABLE_PROFILING',
    'DISABLE_PROGRESS_BAR',
    'DISABLE_VERIFICATION',
    'DISABLE_VERIFY_EXTERNAL',
    'DISABLE_VERIFY_FETCH_ROW',
    'DISABLE_VERIFY_PARALLELISM',
    'DISABLE_VERIFY_SERIALIZER',
    'DIVIDE',
    'DUCKDB_COLUMNS',
    'DUCKDB_CONSTRAINTS',
    'DUCKDB_DATABASES',
    'DUCKDB_DEPENDENCIES',
    'DUCKDB_EXTENSIONS',
    'DUCKDB_FUNCTIONS',
    'DUCKDB_INDEXES',
    'DUCKDB_KEYWORDS',
    'DUCKDB_MEMORY',
    'DUCKDB_OPTIMIZERS',
    'DUCKDB_SCHEMAS',
    'DUCKDB_SECRETS',
    'DUCKDB_SEQUENCES',
    'DUCKDB_SETTINGS',
    'DUCKDB_TABLES',
    'DUCKDB_TEMPORARY_FILES',
    'DUCKDB_TYPES',
    'DUCKDB_VIEWS',
    'EDIT',
    'EDITDIST3',
    'ELEMENT_AT',
    'ENABLE_CHECKPOINT_ON_SHUTDOWN',
    'ENABLE_OBJECT_CACHE',
    'ENABLE_OPTIMIZER',
    'ENABLE_PRINT_PROGRESS_BAR',
    'ENABLE_PROFILE',
    'ENABLE_PROFILING',
    'ENABLE_PROGRESS_BAR',
    'ENABLE_VERIFICATION',
    'ENCODE',
    'ENDS_WITH',
    'ENTROPY',
    'ENUM_CODE',
    'ENUM_FIRST',
    'ENUM_LAST',
    'ENUM_RANGE',
    'ENUM_RANGE_BOUNDARY',
    'EPOCH',
    'EPOCH_MS',
    'EPOCH_NS',
    'EPOCH_US',
    'ERA',
    'ERROR',
    'EVEN',
    'EXP',
    'FACTORIAL',
    'FAVG',
    'FDIV',
    'FILTER',
    'FINALIZE',
    'FIRST',
    'FLATTEN',
    'FLOOR',
    'FMOD',
    'FORCE_CHECKPOINT',
    'FORMAT',
    'FORMATREADABLEDECIMALSIZE',
    'FORMATREADABLESIZE',
    'FORMAT_BYTES',
    'FORMAT_PG_TYPE',
    'FORMAT_TYPE',
    'FROM_BASE64',
    'FROM_BINARY',
    'FROM_HEX',
    'FROM_JSON',
    'FROM_JSON_STRICT',
    'FSUM',
    'FUNCTIONS',
    'GAMMA',
    'GCD',
    'GENERATE_SERIES',
    'GENERATE_SUBSCRIPTS',
    'GEN_RANDOM_UUID',
    'GEOMEAN',
    'GEOMETRIC_MEAN',
    'GETENV',
    'GET_BIT',
    'GET_BLOCK_SIZE',
    'GET_CURRENT_TIME',
    'GET_CURRENT_TIMESTAMP',
    'GLOB',
    'GRADE_UP',
    'GREATEST',
    'GREATEST_COMMON_DIVISOR',
    'GROUP_CONCAT',
    'HAMMING',
    'HASH',
    'HAS_ANY_COLUMN_PRIVILEGE',
    'HAS_COLUMN_PRIVILEGE',
    'HAS_DATABASE_PRIVILEGE',
    'HAS_FOREIGN_DATA_WRAPPER_PRIVILEGE',
    'HAS_FUNCTION_PRIVILEGE',
    'HAS_LANGUAGE_PRIVILEGE',
    'HAS_SCHEMA_PRIVILEGE',
    'HAS_SEQUENCE_PRIVILEGE',
    'HAS_SERVER_PRIVILEGE',
    'HAS_TABLESPACE_PRIVILEGE',
    'HAS_TABLE_PRIVILEGE',
    'HEX',
    'HISTOGRAM',
    'HOUR',
    'ICU_CALENDAR_NAMES',
    'ICU_SORT_KEY',
    'ILIKE_ESCAPE',
    'IMPORT_DATABASE',
    'INDEX_SCAN',
    'INET_CLIENT_ADDR',
    'INET_CLIENT_PORT',
    'INET_SERVER_ADDR',
    'INET_SERVER_PORT',
    'INSTR',
    'IN_SEARCH_PATH',
    'ISFINITE',
    'ISINF',
    'ISNAN',
    'ISODOW',
    'ISOYEAR',
    'JACCARD',
    'JARO_SIMILARITY',
    'JARO_WINKLER_SIMILARITY',
    // 'JSON',
    'JSON_ARRAY',
    'JSON_ARRAY_LENGTH',
    'JSON_CONTAINS',
    'JSON_DESERIALIZE_SQL',
    'JSON_EXECUTE_SERIALIZED_SQL',
    'JSON_EXTRACT',
    'JSON_EXTRACT_PATH',
    'JSON_EXTRACT_PATH_TEXT',
    'JSON_EXTRACT_STRING',
    'JSON_GROUP_ARRAY',
    'JSON_GROUP_OBJECT',
    'JSON_GROUP_STRUCTURE',
    'JSON_KEYS',
    'JSON_MERGE_PATCH',
    'JSON_OBJECT',
    'JSON_QUOTE',
    'JSON_SERIALIZE_PLAN',
    'JSON_SERIALIZE_SQL',
    'JSON_STRUCTURE',
    'JSON_TRANSFORM',
    'JSON_TRANSFORM_STRICT',
    'JSON_TYPE',
    'JSON_VALID',
    'JULIAN',
    'KAHAN_SUM',
    'KURTOSIS',
    'KURTOSIS_POP',
    'LAST',
    'LAST_DAY',
    'LCASE',
    'LCM',
    'LEAST',
    'LEAST_COMMON_MULTIPLE',
    'LEFT',
    'LEFT_GRAPHEME',
    'LEN',
    'LENGTH',
    'LENGTH_GRAPHEME',
    'LEVENSHTEIN',
    'LGAMMA',
    'LIKE_ESCAPE',
    'LIST',
    'LISTAGG',
    'LIST_AGGR',
    'LIST_AGGREGATE',
    'LIST_ANY_VALUE',
    'LIST_APPEND',
    'LIST_APPLY',
    'LIST_APPROX_COUNT_DISTINCT',
    'LIST_AVG',
    'LIST_BIT_AND',
    'LIST_BIT_OR',
    'LIST_BIT_XOR',
    'LIST_BOOL_AND',
    'LIST_BOOL_OR',
    'LIST_CAT',
    'LIST_CONCAT',
    'LIST_CONTAINS',
    'LIST_COSINE_SIMILARITY',
    'LIST_COUNT',
    'LIST_DISTANCE',
    'LIST_DISTINCT',
    'LIST_DOT_PRODUCT',
    'LIST_ELEMENT',
    'LIST_ENTROPY',
    'LIST_EXTRACT',
    'LIST_FILTER',
    'LIST_FIRST',
    'LIST_GRADE_UP',
    'LIST_HAS',
    'LIST_HAS_ALL',
    'LIST_HAS_ANY',
    'LIST_HISTOGRAM',
    'LIST_INDEXOF',
    'LIST_INNER_PRODUCT',
    'LIST_INTERSECT',
    'LIST_KURTOSIS',
    'LIST_KURTOSIS_POP',
    'LIST_LAST',
    'LIST_MAD',
    'LIST_MAX',
    'LIST_MEDIAN',
    'LIST_MIN',
    'LIST_MODE',
    'LIST_PACK',
    'LIST_POSITION',
    'LIST_PREPEND',
    'LIST_PRODUCT',
    'LIST_REDUCE',
    'LIST_RESIZE',
    'LIST_REVERSE',
    'LIST_REVERSE_SORT',
    'LIST_SELECT',
    'LIST_SEM',
    'LIST_SKEWNESS',
    'LIST_SLICE',
    'LIST_SORT',
    'LIST_STDDEV_POP',
    'LIST_STDDEV_SAMP',
    'LIST_STRING_AGG',
    'LIST_SUM',
    'LIST_TRANSFORM',
    'LIST_UNIQUE',
    'LIST_VALUE',
    'LIST_VAR_POP',
    'LIST_VAR_SAMP',
    'LIST_WHERE',
    'LIST_ZIP',
    'LN',
    'LOG',
    'LOG10',
    'LOG2',
    'LOWER',
    'LPAD',
    'LSMODE',
    'LTRIM',
    'MAD',
    'MAKE_DATE',
    'MAKE_TIME',
    'MAKE_TIMESTAMP',
    'MAKE_TIMESTAMPTZ',
    'MAP',
    'MAP_CONCAT',
    'MAP_ENTRIES',
    'MAP_EXTRACT',
    'MAP_FROM_ENTRIES',
    'MAP_KEYS',
    'MAP_VALUES',
    'MAX',
    'MAX_BY',
    'MD5',
    'MD5_NUMBER',
    'MD5_NUMBER_LOWER',
    'MD5_NUMBER_UPPER',
    'MEAN',
    'MEDIAN',
    'METADATA_INFO',
    'MICROSECOND',
    'MILLENNIUM',
    'MILLISECOND',
    'MIN',
    'MINUTE',
    'MIN_BY',
    'MISMATCHES',
    'MOD',
    'MODE',
    'MONTH',
    'MONTHNAME',
    'MULTIPLY',
    'NEXTAFTER',
    'NEXTVAL',
    'NFC_NORMALIZE',
    'NOT_ILIKE_ESCAPE',
    'NOT_LIKE_ESCAPE',
    'NOW',
    'NULLIF',
    'OBJ_DESCRIPTION',
    'OCTET_LENGTH',
    'ORD',
    'PARQUET_FILE_METADATA',
    'PARQUET_KV_METADATA',
    'PARQUET_METADATA',
    'PARQUET_SCAN',
    'PARQUET_SCHEMA',
    'PARSE_DIRNAME',
    'PARSE_DIRPATH',
    'PARSE_FILENAME',
    'PARSE_PATH',
    'PG_COLLATION_IS_VISIBLE',
    'PG_CONF_LOAD_TIME',
    'PG_CONVERSION_IS_VISIBLE',
    'PG_FUNCTION_IS_VISIBLE',
    'PG_GET_CONSTRAINTDEF',
    'PG_GET_EXPR',
    'PG_GET_VIEWDEF',
    'PG_HAS_ROLE',
    'PG_IS_OTHER_TEMP_SCHEMA',
    'PG_MY_TEMP_SCHEMA',
    'PG_OPCLASS_IS_VISIBLE',
    'PG_OPERATOR_IS_VISIBLE',
    'PG_OPFAMILY_IS_VISIBLE',
    'PG_POSTMASTER_START_TIME',
    'PG_SIZE_PRETTY',
    'PG_TABLE_IS_VISIBLE',
    'PG_TIMEZONE_NAMES',
    'PG_TS_CONFIG_IS_VISIBLE',
    'PG_TS_DICT_IS_VISIBLE',
    'PG_TS_PARSER_IS_VISIBLE',
    'PG_TS_TEMPLATE_IS_VISIBLE',
    'PG_TYPEOF',
    'PG_TYPE_IS_VISIBLE',
    'PI',
    'PLATFORM',
    'POSITION',
    'POW',
    'POWER',
    'PRAGMA_COLLATIONS',
    'PRAGMA_DATABASE_SIZE',
    'PRAGMA_METADATA_INFO',
    'PRAGMA_PLATFORM',
    'PRAGMA_SHOW',
    'PRAGMA_STORAGE_INFO',
    'PRAGMA_TABLE_INFO',
    'PRAGMA_USER_AGENT',
    'PRAGMA_VERSION',
    'PREFIX',
    'PRINTF',
    'PRODUCT',
    'QUANTILE',
    'QUANTILE_CONT',
    'QUANTILE_DISC',
    'QUARTER',
    'RADIANS',
    'RANDOM',
    'RANGE',
    'READFILE',
    'READ_BLOB',
    'READ_CSV',
    'READ_CSV_AUTO',
    'READ_JSON',
    'READ_JSON_AUTO',
    'READ_JSON_OBJECTS',
    'READ_JSON_OBJECTS_AUTO',
    'READ_NDJSON',
    'READ_NDJSON_AUTO',
    'READ_NDJSON_OBJECTS',
    'READ_PARQUET',
    'READ_TEXT',
    'REDUCE',
    'REGEXP_ESCAPE',
    'REGEXP_EXTRACT',
    'REGEXP_EXTRACT_ALL',
    'REGEXP_FULL_MATCH',
    'REGEXP_MATCHES',
    'REGEXP_REPLACE',
    'REGEXP_SPLIT_TO_ARRAY',
    'REGEXP_SPLIT_TO_TABLE',
    'REGR_AVGX',
    'REGR_AVGY',
    'REGR_COUNT',
    'REGR_INTERCEPT',
    'REGR_R2',
    'REGR_SLOPE',
    'REGR_SXX',
    'REGR_SXY',
    'REGR_SYY',
    'REPEAT',
    'REPEAT_ROW',
    'REPLACE',
    'RESERVOIR_QUANTILE',
    'REVERSE',
    'RIGHT',
    'RIGHT_GRAPHEME',
    'ROUND',
    'ROUNDBANKERS',
    'ROUND_EVEN',
    'ROW',
    'ROW_TO_JSON',
    'RPAD',
    'RTRIM',
    'SECOND',
    'SEM',
    'SEQ_SCAN',
    'SESSION_USER',
    'SETSEED',
    'SET_BIT',
    'SHA256',
    'SHA3',
    'SHELL_ADD_SCHEMA',
    'SHELL_ESCAPE_CRNL',
    'SHELL_IDQUOTE',
    'SHELL_MODULE_SCHEMA',
    'SHELL_PUTSNL',
    'SHOBJ_DESCRIPTION',
    'SHOW',
    'SHOW_DATABASES',
    'SHOW_TABLES',
    'SHOW_TABLES_EXPANDED',
    'SIGN',
    'SIGNBIT',
    'SIN',
    'SKEWNESS',
    'SNIFF_CSV',
    'SPLIT',
    'SPLIT_PART',
    'SQL_AUTO_COMPLETE',
    'SQRT',
    'STARTS_WITH',
    'STATS',
    'STDDEV',
    'STDDEV_POP',
    'STDDEV_SAMP',
    'STORAGE_INFO',
    'STRFTIME',
    'STRING_AGG',
    'STRING_SPLIT',
    'STRING_SPLIT_REGEX',
    'STRING_TO_ARRAY',
    'STRIP_ACCENTS',
    'STRLEN',
    'STRPOS',
    'STRPTIME',
    'STRUCT_EXTRACT',
    'STRUCT_INSERT',
    'STRUCT_PACK',
    'STR_SPLIT',
    'STR_SPLIT_REGEX',
    'SUBSTR',
    'SUBSTRING',
    'SUBSTRING_GRAPHEME',
    'SUBTRACT',
    'SUFFIX',
    'SUM',
    'SUMKAHAN',
    'SUMMARY',
    'SUM_NO_OVERFLOW',
    'TABLE_INFO',
    'TAN',
    'TEST_ALL_TYPES',
    'TEST_VECTOR_TYPES',
    'TIMEZONE',
    'TIMEZONE_HOUR',
    'TIMEZONE_MINUTE',
    'TIME_BUCKET',
    'TODAY',
    'TO_BASE',
    'TO_BASE64',
    'TO_BINARY',
    'TO_CENTURIES',
    'TO_DAYS',
    'TO_DECADES',
    'TO_HEX',
    'TO_HOURS',
    'TO_JSON',
    'TO_MICROSECONDS',
    'TO_MILLENNIA',
    'TO_MILLISECONDS',
    'TO_MINUTES',
    'TO_MONTHS',
    'TO_SECONDS',
    'TO_TIMESTAMP',
    'TO_WEEKS',
    'TO_YEARS',
    'TRANSACTION_TIMESTAMP',
    'TRANSLATE',
    'TRIM',
    'TRUNC',
    'TRY_STRPTIME',
    'TXID_CURRENT',
    'TYPEOF',
    'UCASE',
    'UNBIN',
    'UNHEX',
    'UNICODE',
    'UNION_EXTRACT',
    'UNION_TAG',
    'UNION_VALUE',
    'UNNEST',
    'UNPIVOT_LIST',
    'UPPER',
    'USER',
    'USER_AGENT',
    'UUID',
    'VARIANCE',
    'VAR_POP',
    'VAR_SAMP',
    'VECTOR_TYPE',
    'VERIFY_EXTERNAL',
    'VERIFY_FETCH_ROW',
    'VERIFY_PARALLELISM',
    'VERIFY_SERIALIZER',
    'VERSION',
    'WEEK',
    'WEEKDAY',
    'WEEKOFYEAR',
    'WHICH_SECRET',
    'WRITEFILE',
    'XOR',
    'YEAR',
    'YEARWEEK',
    // Keywords that also need to be listed as functions
    'CAST',
    'COALESCE',
    // 'NULL', we really prefer treating it as keyword
    'RANK',
    'ROW_NUMBER'
];
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/duckdb/duckdb.keywords.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "dataTypes",
    ()=>dataTypes,
    "keywords",
    ()=>keywords
]);
const keywords = [
    // Keywords from DuckDB:
    // SELECT upper(keyword_name)
    // FROM duckdb_keywords()
    // WHERE keyword_category = 'reserved'
    // ORDER BY keyword_name
    'ALL',
    'ANALYSE',
    'ANALYZE',
    'AND',
    'ANY',
    'AS',
    'ASC',
    'ATTACH',
    'ASYMMETRIC',
    'BOTH',
    'CASE',
    'CAST',
    'CHECK',
    'COLLATE',
    'COLUMN',
    'CONSTRAINT',
    'CREATE',
    'DEFAULT',
    'DEFERRABLE',
    'DESC',
    'DESCRIBE',
    'DETACH',
    'DISTINCT',
    'DO',
    'ELSE',
    'END',
    'EXCEPT',
    'FALSE',
    'FETCH',
    'FOR',
    'FOREIGN',
    'FROM',
    'GRANT',
    'GROUP',
    'HAVING',
    'IN',
    'INITIALLY',
    'INTERSECT',
    'INTO',
    'IS',
    'LATERAL',
    'LEADING',
    'LIMIT',
    'NOT',
    'NULL',
    'OFFSET',
    'ON',
    'ONLY',
    'OR',
    'ORDER',
    'PIVOT',
    'PIVOT_LONGER',
    'PIVOT_WIDER',
    'PLACING',
    'PRIMARY',
    'REFERENCES',
    'RETURNING',
    'SELECT',
    'SHOW',
    'SOME',
    'SUMMARIZE',
    'SYMMETRIC',
    'TABLE',
    'THEN',
    'TO',
    'TRAILING',
    'TRUE',
    'UNION',
    'UNIQUE',
    'UNPIVOT',
    'USING',
    'VARIADIC',
    'WHEN',
    'WHERE',
    'WINDOW',
    'WITH'
];
const dataTypes = [
    // Types from DuckDB:
    // SELECT DISTINCT upper(type_name)
    // FROM duckdb_types()
    // ORDER BY type_name
    'ARRAY',
    'BIGINT',
    'BINARY',
    'BIT',
    'BITSTRING',
    'BLOB',
    'BOOL',
    'BOOLEAN',
    'BPCHAR',
    'BYTEA',
    'CHAR',
    'DATE',
    'DATETIME',
    'DEC',
    'DECIMAL',
    'DOUBLE',
    'ENUM',
    'FLOAT',
    'FLOAT4',
    'FLOAT8',
    'GUID',
    'HUGEINT',
    'INET',
    'INT',
    'INT1',
    'INT128',
    'INT16',
    'INT2',
    'INT32',
    'INT4',
    'INT64',
    'INT8',
    'INTEGER',
    'INTEGRAL',
    'INTERVAL',
    'JSON',
    'LIST',
    'LOGICAL',
    'LONG',
    'MAP',
    // 'NULL' is a keyword
    'NUMERIC',
    'NVARCHAR',
    'OID',
    'REAL',
    'ROW',
    'SHORT',
    'SIGNED',
    'SMALLINT',
    'STRING',
    'STRUCT',
    'TEXT',
    'TIME',
    'TIMESTAMP_MS',
    'TIMESTAMP_NS',
    'TIMESTAMP_S',
    'TIMESTAMP_US',
    'TIMESTAMP',
    'TIMESTAMPTZ',
    'TIMETZ',
    'TINYINT',
    'UBIGINT',
    'UHUGEINT',
    'UINT128',
    'UINT16',
    'UINT32',
    'UINT64',
    'UINT8',
    'UINTEGER',
    'UNION',
    'USMALLINT',
    'UTINYINT',
    'UUID',
    'VARBINARY',
    'VARCHAR'
];
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/hive/hive.formatter.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "hive",
    ()=>hive
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/expandPhrases.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$hive$2f$hive$2e$functions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/hive/hive.functions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$hive$2f$hive$2e$keywords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/hive/hive.keywords.js [app-client] (ecmascript)");
;
;
;
const reservedSelect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'SELECT [ALL | DISTINCT]'
]);
const reservedClauses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    // queries
    'WITH',
    'FROM',
    'WHERE',
    'GROUP BY',
    'HAVING',
    'WINDOW',
    'PARTITION BY',
    'ORDER BY',
    'SORT BY',
    'CLUSTER BY',
    'DISTRIBUTE BY',
    'LIMIT',
    // Data manipulation
    // - insert:
    //   Hive does not actually support plain INSERT INTO, only INSERT INTO TABLE
    //   but it's a nuisance to not support it, as all other dialects do.
    'INSERT INTO [TABLE]',
    'VALUES',
    // - update:
    'SET',
    // - merge:
    'MERGE INTO',
    'WHEN [NOT] MATCHED [THEN]',
    'UPDATE SET',
    'INSERT [VALUES]',
    // - insert overwrite directory:
    //   https://cwiki.apache.org/confluence/display/Hive/LanguageManual+DML#LanguageManualDML-Writingdataintothefilesystemfromqueries
    'INSERT OVERWRITE [LOCAL] DIRECTORY',
    // - load:
    //   https://cwiki.apache.org/confluence/display/Hive/LanguageManual+DML#LanguageManualDML-Loadingfilesintotables
    'LOAD DATA [LOCAL] INPATH',
    '[OVERWRITE] INTO TABLE'
]);
const standardOnelineClauses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'CREATE [TEMPORARY] [EXTERNAL] TABLE [IF NOT EXISTS]'
]);
const tabularOnelineClauses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    // - create:
    'CREATE [MATERIALIZED] VIEW [IF NOT EXISTS]',
    // - update:
    'UPDATE',
    // - delete:
    'DELETE FROM',
    // - drop table:
    'DROP TABLE [IF EXISTS]',
    // - alter table:
    'ALTER TABLE',
    'RENAME TO',
    // - truncate:
    'TRUNCATE [TABLE]',
    // other
    'ALTER',
    'CREATE',
    'USE',
    'DESCRIBE',
    'DROP',
    'FETCH',
    'SHOW',
    'STORED AS',
    'STORED BY',
    'ROW FORMAT'
]);
const reservedSetOperations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'UNION [ALL | DISTINCT]'
]);
const reservedJoins = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'JOIN',
    '{LEFT | RIGHT | FULL} [OUTER] JOIN',
    '{INNER | CROSS} JOIN',
    // non-standard joins
    'LEFT SEMI JOIN'
]);
const reservedPhrases = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    '{ROWS | RANGE} BETWEEN'
]);
const reservedDataTypePhrases = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([]);
const hive = {
    name: 'hive',
    tokenizerOptions: {
        reservedSelect,
        reservedClauses: [
            ...reservedClauses,
            ...standardOnelineClauses,
            ...tabularOnelineClauses
        ],
        reservedSetOperations,
        reservedJoins,
        reservedKeywordPhrases: reservedPhrases,
        reservedDataTypePhrases,
        reservedKeywords: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$hive$2f$hive$2e$keywords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keywords"],
        reservedDataTypes: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$hive$2f$hive$2e$keywords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dataTypes"],
        reservedFunctionNames: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$hive$2f$hive$2e$functions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["functions"],
        extraParens: [
            '[]'
        ],
        stringTypes: [
            '""-bs',
            "''-bs"
        ],
        identTypes: [
            '``'
        ],
        variableTypes: [
            {
                quote: '{}',
                prefixes: [
                    '$'
                ],
                requirePrefix: true
            }
        ],
        operators: [
            '%',
            '~',
            '^',
            '|',
            '&',
            '<=>',
            '==',
            '!',
            '||'
        ]
    },
    formatOptions: {
        onelineClauses: [
            ...standardOnelineClauses,
            ...tabularOnelineClauses
        ],
        tabularOnelineClauses
    }
};
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/hive/hive.functions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "functions",
    ()=>functions
]);
const functions = [
    // https://cwiki.apache.org/confluence/display/Hive/LanguageManual+UDF
    // math
    'ABS',
    'ACOS',
    'ASIN',
    'ATAN',
    'BIN',
    'BROUND',
    'CBRT',
    'CEIL',
    'CEILING',
    'CONV',
    'COS',
    'DEGREES',
    // 'E',
    'EXP',
    'FACTORIAL',
    'FLOOR',
    'GREATEST',
    'HEX',
    'LEAST',
    'LN',
    'LOG',
    'LOG10',
    'LOG2',
    'NEGATIVE',
    'PI',
    'PMOD',
    'POSITIVE',
    'POW',
    'POWER',
    'RADIANS',
    'RAND',
    'ROUND',
    'SHIFTLEFT',
    'SHIFTRIGHT',
    'SHIFTRIGHTUNSIGNED',
    'SIGN',
    'SIN',
    'SQRT',
    'TAN',
    'UNHEX',
    'WIDTH_BUCKET',
    // array
    'ARRAY_CONTAINS',
    'MAP_KEYS',
    'MAP_VALUES',
    'SIZE',
    'SORT_ARRAY',
    // conversion
    'BINARY',
    'CAST',
    // date
    'ADD_MONTHS',
    'DATE',
    'DATE_ADD',
    'DATE_FORMAT',
    'DATE_SUB',
    'DATEDIFF',
    'DAY',
    'DAYNAME',
    'DAYOFMONTH',
    'DAYOFYEAR',
    'EXTRACT',
    'FROM_UNIXTIME',
    'FROM_UTC_TIMESTAMP',
    'HOUR',
    'LAST_DAY',
    'MINUTE',
    'MONTH',
    'MONTHS_BETWEEN',
    'NEXT_DAY',
    'QUARTER',
    'SECOND',
    'TIMESTAMP',
    'TO_DATE',
    'TO_UTC_TIMESTAMP',
    'TRUNC',
    'UNIX_TIMESTAMP',
    'WEEKOFYEAR',
    'YEAR',
    // conditional
    'ASSERT_TRUE',
    'COALESCE',
    'IF',
    'ISNOTNULL',
    'ISNULL',
    'NULLIF',
    'NVL',
    // string
    'ASCII',
    'BASE64',
    'CHARACTER_LENGTH',
    'CHR',
    'CONCAT',
    'CONCAT_WS',
    'CONTEXT_NGRAMS',
    'DECODE',
    'ELT',
    'ENCODE',
    'FIELD',
    'FIND_IN_SET',
    'FORMAT_NUMBER',
    'GET_JSON_OBJECT',
    'IN_FILE',
    'INITCAP',
    'INSTR',
    'LCASE',
    'LENGTH',
    'LEVENSHTEIN',
    'LOCATE',
    'LOWER',
    'LPAD',
    'LTRIM',
    'NGRAMS',
    'OCTET_LENGTH',
    'PARSE_URL',
    'PRINTF',
    'QUOTE',
    'REGEXP_EXTRACT',
    'REGEXP_REPLACE',
    'REPEAT',
    'REVERSE',
    'RPAD',
    'RTRIM',
    'SENTENCES',
    'SOUNDEX',
    'SPACE',
    'SPLIT',
    'STR_TO_MAP',
    'SUBSTR',
    'SUBSTRING',
    'TRANSLATE',
    'TRIM',
    'UCASE',
    'UNBASE64',
    'UPPER',
    // masking
    'MASK',
    'MASK_FIRST_N',
    'MASK_HASH',
    'MASK_LAST_N',
    'MASK_SHOW_FIRST_N',
    'MASK_SHOW_LAST_N',
    // misc
    'AES_DECRYPT',
    'AES_ENCRYPT',
    'CRC32',
    'CURRENT_DATABASE',
    'CURRENT_USER',
    'HASH',
    'JAVA_METHOD',
    'LOGGED_IN_USER',
    'MD5',
    'REFLECT',
    'SHA',
    'SHA1',
    'SHA2',
    'SURROGATE_KEY',
    'VERSION',
    // aggregate
    'AVG',
    'COLLECT_LIST',
    'COLLECT_SET',
    'CORR',
    'COUNT',
    'COVAR_POP',
    'COVAR_SAMP',
    'HISTOGRAM_NUMERIC',
    'MAX',
    'MIN',
    'NTILE',
    'PERCENTILE',
    'PERCENTILE_APPROX',
    'REGR_AVGX',
    'REGR_AVGY',
    'REGR_COUNT',
    'REGR_INTERCEPT',
    'REGR_R2',
    'REGR_SLOPE',
    'REGR_SXX',
    'REGR_SXY',
    'REGR_SYY',
    'STDDEV_POP',
    'STDDEV_SAMP',
    'SUM',
    'VAR_POP',
    'VAR_SAMP',
    'VARIANCE',
    // table
    'EXPLODE',
    'INLINE',
    'JSON_TUPLE',
    'PARSE_URL_TUPLE',
    'POSEXPLODE',
    'STACK',
    // https://cwiki.apache.org/confluence/display/Hive/LanguageManual+WindowingAndAnalytics
    'LEAD',
    'LAG',
    'FIRST_VALUE',
    'LAST_VALUE',
    'RANK',
    'ROW_NUMBER',
    'DENSE_RANK',
    'CUME_DIST',
    'PERCENT_RANK',
    'NTILE'
];
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/hive/hive.keywords.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "dataTypes",
    ()=>dataTypes,
    "keywords",
    ()=>keywords
]);
const keywords = [
    // https://cwiki.apache.org/confluence/display/hive/languagemanual+ddl
    // Non-reserved keywords have proscribed meanings in. HiveQL, but can still be used as table or column names
    'ADD',
    'ADMIN',
    'AFTER',
    'ANALYZE',
    'ARCHIVE',
    'ASC',
    'BEFORE',
    'BUCKET',
    'BUCKETS',
    'CASCADE',
    'CHANGE',
    'CLUSTER',
    'CLUSTERED',
    'CLUSTERSTATUS',
    'COLLECTION',
    'COLUMNS',
    'COMMENT',
    'COMPACT',
    'COMPACTIONS',
    'COMPUTE',
    'CONCATENATE',
    'CONTINUE',
    'DATA',
    'DATABASES',
    'DATETIME',
    'DAY',
    'DBPROPERTIES',
    'DEFERRED',
    'DEFINED',
    'DELIMITED',
    'DEPENDENCY',
    'DESC',
    'DIRECTORIES',
    'DIRECTORY',
    'DISABLE',
    'DISTRIBUTE',
    'ELEM_TYPE',
    'ENABLE',
    'ESCAPED',
    'EXCLUSIVE',
    'EXPLAIN',
    'EXPORT',
    'FIELDS',
    'FILE',
    'FILEFORMAT',
    'FIRST',
    'FORMAT',
    'FORMATTED',
    'FUNCTIONS',
    'HOLD_DDLTIME',
    'HOUR',
    'IDXPROPERTIES',
    'IGNORE',
    'INDEX',
    'INDEXES',
    'INPATH',
    'INPUTDRIVER',
    'INPUTFORMAT',
    'ITEMS',
    'JAR',
    'KEYS',
    'KEY_TYPE',
    'LIMIT',
    'LINES',
    'LOAD',
    'LOCATION',
    'LOCK',
    'LOCKS',
    'LOGICAL',
    'LONG',
    'MAPJOIN',
    'MATERIALIZED',
    'METADATA',
    'MINUS',
    'MINUTE',
    'MONTH',
    'MSCK',
    'NOSCAN',
    'NO_DROP',
    'OFFLINE',
    'OPTION',
    'OUTPUTDRIVER',
    'OUTPUTFORMAT',
    'OVERWRITE',
    'OWNER',
    'PARTITIONED',
    'PARTITIONS',
    'PLUS',
    'PRETTY',
    'PRINCIPALS',
    'PROTECTION',
    'PURGE',
    'READ',
    'READONLY',
    'REBUILD',
    'RECORDREADER',
    'RECORDWRITER',
    'RELOAD',
    'RENAME',
    'REPAIR',
    'REPLACE',
    'REPLICATION',
    'RESTRICT',
    'REWRITE',
    'ROLE',
    'ROLES',
    'SCHEMA',
    'SCHEMAS',
    'SECOND',
    'SEMI',
    'SERDE',
    'SERDEPROPERTIES',
    'SERVER',
    'SETS',
    'SHARED',
    'SHOW',
    'SHOW_DATABASE',
    'SKEWED',
    'SORT',
    'SORTED',
    'SSL',
    'STATISTICS',
    'STORED',
    'STREAMTABLE',
    'STRING',
    'TABLES',
    'TBLPROPERTIES',
    'TEMPORARY',
    'TERMINATED',
    'TINYINT',
    'TOUCH',
    'TRANSACTIONS',
    'UNARCHIVE',
    'UNDO',
    'UNIONTYPE',
    'UNLOCK',
    'UNSET',
    'UNSIGNED',
    'URI',
    'USE',
    'UTC',
    'UTCTIMESTAMP',
    'VALUE_TYPE',
    'VIEW',
    'WHILE',
    'YEAR',
    'AUTOCOMMIT',
    'ISOLATION',
    'LEVEL',
    'OFFSET',
    'SNAPSHOT',
    'TRANSACTION',
    'WORK',
    'WRITE',
    'ABORT',
    'KEY',
    'LAST',
    'NORELY',
    'NOVALIDATE',
    'NULLS',
    'RELY',
    'VALIDATE',
    'DETAIL',
    'DOW',
    'EXPRESSION',
    'OPERATOR',
    'QUARTER',
    'SUMMARY',
    'VECTORIZATION',
    'WEEK',
    'YEARS',
    'MONTHS',
    'WEEKS',
    'DAYS',
    'HOURS',
    'MINUTES',
    'SECONDS',
    'TIMESTAMPTZ',
    'ZONE',
    // reserved
    'ALL',
    'ALTER',
    'AND',
    'AS',
    'AUTHORIZATION',
    'BETWEEN',
    'BOTH',
    'BY',
    'CASE',
    'CAST',
    'COLUMN',
    'CONF',
    'CREATE',
    'CROSS',
    'CUBE',
    'CURRENT',
    'CURRENT_DATE',
    'CURRENT_TIMESTAMP',
    'CURSOR',
    'DATABASE',
    'DELETE',
    'DESCRIBE',
    'DISTINCT',
    'DROP',
    'ELSE',
    'END',
    'EXCHANGE',
    'EXISTS',
    'EXTENDED',
    'EXTERNAL',
    'FALSE',
    'FETCH',
    'FOLLOWING',
    'FOR',
    'FROM',
    'FULL',
    'FUNCTION',
    'GRANT',
    'GROUP',
    'GROUPING',
    'HAVING',
    'IF',
    'IMPORT',
    'IN',
    'INNER',
    'INSERT',
    'INTERSECT',
    'INTO',
    'IS',
    'JOIN',
    'LATERAL',
    'LEFT',
    'LESS',
    'LIKE',
    'LOCAL',
    'MACRO',
    'MORE',
    'NONE',
    'NOT',
    'NULL',
    'OF',
    'ON',
    'OR',
    'ORDER',
    'OUT',
    'OUTER',
    'OVER',
    'PARTIALSCAN',
    'PARTITION',
    'PERCENT',
    'PRECEDING',
    'PRESERVE',
    'PROCEDURE',
    'RANGE',
    'READS',
    'REDUCE',
    'REVOKE',
    'RIGHT',
    'ROLLUP',
    'ROW',
    'ROWS',
    'SELECT',
    'SET',
    'TABLE',
    'TABLESAMPLE',
    'THEN',
    'TO',
    'TRANSFORM',
    'TRIGGER',
    'TRUE',
    'TRUNCATE',
    'UNBOUNDED',
    'UNION',
    'UNIQUEJOIN',
    'UPDATE',
    'USER',
    'USING',
    'UTC_TMESTAMP',
    'VALUES',
    'WHEN',
    'WHERE',
    'WINDOW',
    'WITH',
    'COMMIT',
    'ONLY',
    'REGEXP',
    'RLIKE',
    'ROLLBACK',
    'START',
    'CACHE',
    'CONSTRAINT',
    'FOREIGN',
    'PRIMARY',
    'REFERENCES',
    'DAYOFWEEK',
    'EXTRACT',
    'FLOOR',
    'VIEWS',
    'TIME',
    'SYNC',
    // fileTypes
    'TEXTFILE',
    'SEQUENCEFILE',
    'ORC',
    'CSV',
    'TSV',
    'PARQUET',
    'AVRO',
    'RCFILE',
    'JSONFILE',
    'INPUTFORMAT',
    'OUTPUTFORMAT'
];
const dataTypes = [
    // https://cwiki.apache.org/confluence/display/Hive/LanguageManual+Types
    'ARRAY',
    'BIGINT',
    'BINARY',
    'BOOLEAN',
    'CHAR',
    'DATE',
    'DECIMAL',
    'DOUBLE',
    'FLOAT',
    'INT',
    'INTEGER',
    'INTERVAL',
    'MAP',
    'NUMERIC',
    'PRECISION',
    'SMALLINT',
    'STRUCT',
    'TIMESTAMP',
    'VARCHAR'
];
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/mariadb/likeMariaDb.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "postProcess",
    ()=>postProcess
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/lexer/token.js [app-client] (ecmascript)");
;
function postProcess(tokens) {
    return tokens.map((token, i)=>{
        const nextToken = tokens[i + 1] || __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EOF_TOKEN"];
        if (__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isToken"].SET(token) && nextToken.text === '(') {
            // This is SET datatype, not SET statement
            return Object.assign(Object.assign({}, token), {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].RESERVED_FUNCTION_NAME
            });
        }
        const prevToken = tokens[i - 1] || __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EOF_TOKEN"];
        if (__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isToken"].VALUES(token) && prevToken.text === '=') {
            // This is VALUES() function, not VALUES clause
            return Object.assign(Object.assign({}, token), {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].RESERVED_FUNCTION_NAME
            });
        }
        return token;
    });
}
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/mariadb/mariadb.formatter.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "mariadb",
    ()=>mariadb
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/expandPhrases.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$mariadb$2f$likeMariaDb$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/mariadb/likeMariaDb.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$mariadb$2f$mariadb$2e$keywords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/mariadb/mariadb.keywords.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$mariadb$2f$mariadb$2e$functions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/mariadb/mariadb.functions.js [app-client] (ecmascript)");
;
;
;
;
const reservedSelect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'SELECT [ALL | DISTINCT | DISTINCTROW]'
]);
const reservedClauses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    // queries
    'WITH [RECURSIVE]',
    'FROM',
    'WHERE',
    'GROUP BY',
    'HAVING',
    'PARTITION BY',
    'ORDER BY',
    'LIMIT',
    'OFFSET',
    'FETCH {FIRST | NEXT}',
    // Data manipulation
    // - insert:
    'INSERT [LOW_PRIORITY | DELAYED | HIGH_PRIORITY] [IGNORE] [INTO]',
    'REPLACE [LOW_PRIORITY | DELAYED] [INTO]',
    'VALUES',
    'ON DUPLICATE KEY UPDATE',
    // - update:
    'SET',
    // other
    'RETURNING'
]);
const standardOnelineClauses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'CREATE [OR REPLACE] [TEMPORARY] TABLE [IF NOT EXISTS]'
]);
const tabularOnelineClauses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    // - create:
    'CREATE [OR REPLACE] [SQL SECURITY DEFINER | SQL SECURITY INVOKER] VIEW [IF NOT EXISTS]',
    // - update:
    'UPDATE [LOW_PRIORITY] [IGNORE]',
    // - delete:
    'DELETE [LOW_PRIORITY] [QUICK] [IGNORE] FROM',
    // - drop table:
    'DROP [TEMPORARY] TABLE [IF EXISTS]',
    // - alter table:
    'ALTER [ONLINE] [IGNORE] TABLE [IF EXISTS]',
    'ADD [COLUMN] [IF NOT EXISTS]',
    '{CHANGE | MODIFY} [COLUMN] [IF EXISTS]',
    'DROP [COLUMN] [IF EXISTS]',
    'RENAME [TO]',
    'RENAME COLUMN',
    'ALTER [COLUMN]',
    '{SET | DROP} DEFAULT',
    'SET {VISIBLE | INVISIBLE}',
    // - truncate:
    'TRUNCATE [TABLE]',
    // https://mariadb.com/docs/reference/mdb/sql-statements/
    'ALTER DATABASE',
    'ALTER DATABASE COMMENT',
    'ALTER EVENT',
    'ALTER FUNCTION',
    'ALTER PROCEDURE',
    'ALTER SCHEMA',
    'ALTER SCHEMA COMMENT',
    'ALTER SEQUENCE',
    'ALTER SERVER',
    'ALTER USER',
    'ALTER VIEW',
    'ANALYZE',
    'ANALYZE TABLE',
    'BACKUP LOCK',
    'BACKUP STAGE',
    'BACKUP UNLOCK',
    'BEGIN',
    'BINLOG',
    'CACHE INDEX',
    'CALL',
    'CHANGE MASTER TO',
    'CHECK TABLE',
    'CHECK VIEW',
    'CHECKSUM TABLE',
    'COMMIT',
    'CREATE AGGREGATE FUNCTION',
    'CREATE DATABASE',
    'CREATE EVENT',
    'CREATE FUNCTION',
    'CREATE INDEX',
    'CREATE PROCEDURE',
    'CREATE ROLE',
    'CREATE SEQUENCE',
    'CREATE SERVER',
    'CREATE SPATIAL INDEX',
    'CREATE TRIGGER',
    'CREATE UNIQUE INDEX',
    'CREATE USER',
    'DEALLOCATE PREPARE',
    'DESCRIBE',
    'DROP DATABASE',
    'DROP EVENT',
    'DROP FUNCTION',
    'DROP INDEX',
    'DROP PREPARE',
    'DROP PROCEDURE',
    'DROP ROLE',
    'DROP SEQUENCE',
    'DROP SERVER',
    'DROP TRIGGER',
    'DROP USER',
    'DROP VIEW',
    'EXECUTE',
    'EXPLAIN',
    'FLUSH',
    'GET DIAGNOSTICS',
    'GET DIAGNOSTICS CONDITION',
    'GRANT',
    'HANDLER',
    'HELP',
    'INSTALL PLUGIN',
    'INSTALL SONAME',
    'KILL',
    'LOAD DATA INFILE',
    'LOAD INDEX INTO CACHE',
    'LOAD XML INFILE',
    'LOCK TABLE',
    'OPTIMIZE TABLE',
    'PREPARE',
    'PURGE BINARY LOGS',
    'PURGE MASTER LOGS',
    'RELEASE SAVEPOINT',
    'RENAME TABLE',
    'RENAME USER',
    'REPAIR TABLE',
    'REPAIR VIEW',
    'RESET MASTER',
    'RESET QUERY CACHE',
    'RESET REPLICA',
    'RESET SLAVE',
    'RESIGNAL',
    'REVOKE',
    'ROLLBACK',
    'SAVEPOINT',
    'SET CHARACTER SET',
    'SET DEFAULT ROLE',
    'SET GLOBAL TRANSACTION',
    'SET NAMES',
    'SET PASSWORD',
    'SET ROLE',
    'SET STATEMENT',
    'SET TRANSACTION',
    'SHOW',
    'SHOW ALL REPLICAS STATUS',
    'SHOW ALL SLAVES STATUS',
    'SHOW AUTHORS',
    'SHOW BINARY LOGS',
    'SHOW BINLOG EVENTS',
    'SHOW BINLOG STATUS',
    'SHOW CHARACTER SET',
    'SHOW CLIENT_STATISTICS',
    'SHOW COLLATION',
    'SHOW COLUMNS',
    'SHOW CONTRIBUTORS',
    'SHOW CREATE DATABASE',
    'SHOW CREATE EVENT',
    'SHOW CREATE FUNCTION',
    'SHOW CREATE PACKAGE',
    'SHOW CREATE PACKAGE BODY',
    'SHOW CREATE PROCEDURE',
    'SHOW CREATE SEQUENCE',
    'SHOW CREATE TABLE',
    'SHOW CREATE TRIGGER',
    'SHOW CREATE USER',
    'SHOW CREATE VIEW',
    'SHOW DATABASES',
    'SHOW ENGINE',
    'SHOW ENGINE INNODB STATUS',
    'SHOW ENGINES',
    'SHOW ERRORS',
    'SHOW EVENTS',
    'SHOW EXPLAIN',
    'SHOW FUNCTION CODE',
    'SHOW FUNCTION STATUS',
    'SHOW GRANTS',
    'SHOW INDEX',
    'SHOW INDEXES',
    'SHOW INDEX_STATISTICS',
    'SHOW KEYS',
    'SHOW LOCALES',
    'SHOW MASTER LOGS',
    'SHOW MASTER STATUS',
    'SHOW OPEN TABLES',
    'SHOW PACKAGE BODY CODE',
    'SHOW PACKAGE BODY STATUS',
    'SHOW PACKAGE STATUS',
    'SHOW PLUGINS',
    'SHOW PLUGINS SONAME',
    'SHOW PRIVILEGES',
    'SHOW PROCEDURE CODE',
    'SHOW PROCEDURE STATUS',
    'SHOW PROCESSLIST',
    'SHOW PROFILE',
    'SHOW PROFILES',
    'SHOW QUERY_RESPONSE_TIME',
    'SHOW RELAYLOG EVENTS',
    'SHOW REPLICA',
    'SHOW REPLICA HOSTS',
    'SHOW REPLICA STATUS',
    'SHOW SCHEMAS',
    'SHOW SLAVE',
    'SHOW SLAVE HOSTS',
    'SHOW SLAVE STATUS',
    'SHOW STATUS',
    'SHOW STORAGE ENGINES',
    'SHOW TABLE STATUS',
    'SHOW TABLES',
    'SHOW TRIGGERS',
    'SHOW USER_STATISTICS',
    'SHOW VARIABLES',
    'SHOW WARNINGS',
    'SHOW WSREP_MEMBERSHIP',
    'SHOW WSREP_STATUS',
    'SHUTDOWN',
    'SIGNAL',
    'START ALL REPLICAS',
    'START ALL SLAVES',
    'START REPLICA',
    'START SLAVE',
    'START TRANSACTION',
    'STOP ALL REPLICAS',
    'STOP ALL SLAVES',
    'STOP REPLICA',
    'STOP SLAVE',
    'UNINSTALL PLUGIN',
    'UNINSTALL SONAME',
    'UNLOCK TABLE',
    'USE',
    'XA BEGIN',
    'XA COMMIT',
    'XA END',
    'XA PREPARE',
    'XA RECOVER',
    'XA ROLLBACK',
    'XA START'
]);
const reservedSetOperations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'UNION [ALL | DISTINCT]',
    'EXCEPT [ALL | DISTINCT]',
    'INTERSECT [ALL | DISTINCT]',
    'MINUS [ALL | DISTINCT]'
]);
const reservedJoins = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'JOIN',
    '{LEFT | RIGHT} [OUTER] JOIN',
    '{INNER | CROSS} JOIN',
    'NATURAL JOIN',
    'NATURAL {LEFT | RIGHT} [OUTER] JOIN',
    // non-standard joins
    'STRAIGHT_JOIN'
]);
const reservedKeywordPhrases = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'ON {UPDATE | DELETE} [SET NULL | SET DEFAULT]',
    'CHARACTER SET',
    '{ROWS | RANGE} BETWEEN',
    'IDENTIFIED BY'
]);
const reservedDataTypePhrases = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([]);
const mariadb = {
    name: 'mariadb',
    tokenizerOptions: {
        reservedSelect,
        reservedClauses: [
            ...reservedClauses,
            ...standardOnelineClauses,
            ...tabularOnelineClauses
        ],
        reservedSetOperations,
        reservedJoins,
        reservedKeywordPhrases,
        reservedDataTypePhrases,
        supportsXor: true,
        reservedKeywords: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$mariadb$2f$mariadb$2e$keywords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keywords"],
        reservedDataTypes: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$mariadb$2f$mariadb$2e$keywords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dataTypes"],
        reservedFunctionNames: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$mariadb$2f$mariadb$2e$functions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["functions"],
        // TODO: support _ char set prefixes such as _utf8, _latin1, _binary, _utf8mb4, etc.
        stringTypes: [
            '""-qq-bs',
            "''-qq-bs",
            {
                quote: "''-raw",
                prefixes: [
                    'B',
                    'X'
                ],
                requirePrefix: true
            }
        ],
        identTypes: [
            '``'
        ],
        identChars: {
            first: '$',
            rest: '$',
            allowFirstCharNumber: true
        },
        variableTypes: [
            {
                regex: '@@?[A-Za-z0-9_.$]+'
            },
            {
                quote: '""-qq-bs',
                prefixes: [
                    '@'
                ],
                requirePrefix: true
            },
            {
                quote: "''-qq-bs",
                prefixes: [
                    '@'
                ],
                requirePrefix: true
            },
            {
                quote: '``',
                prefixes: [
                    '@'
                ],
                requirePrefix: true
            }
        ],
        paramTypes: {
            positional: true
        },
        lineCommentTypes: [
            '--',
            '#'
        ],
        operators: [
            '%',
            ':=',
            '&',
            '|',
            '^',
            '~',
            '<<',
            '>>',
            '<=>',
            '&&',
            '||',
            '!',
            '*.*'
        ],
        postProcess: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$mariadb$2f$likeMariaDb$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["postProcess"]
    },
    formatOptions: {
        onelineClauses: [
            ...standardOnelineClauses,
            ...tabularOnelineClauses
        ],
        tabularOnelineClauses
    }
};
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/mariadb/mariadb.functions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "functions",
    ()=>functions
]);
const functions = [
    // https://mariadb.com/kb/en/information-schema-sql_functions-table/
    'ADDDATE',
    'ADD_MONTHS',
    'BIT_AND',
    'BIT_OR',
    'BIT_XOR',
    'CAST',
    'COUNT',
    'CUME_DIST',
    'CURDATE',
    'CURTIME',
    'DATE_ADD',
    'DATE_SUB',
    'DATE_FORMAT',
    'DECODE',
    'DENSE_RANK',
    'EXTRACT',
    'FIRST_VALUE',
    'GROUP_CONCAT',
    'JSON_ARRAYAGG',
    'JSON_OBJECTAGG',
    'LAG',
    'LEAD',
    'MAX',
    'MEDIAN',
    'MID',
    'MIN',
    'NOW',
    'NTH_VALUE',
    'NTILE',
    'POSITION',
    'PERCENT_RANK',
    'PERCENTILE_CONT',
    'PERCENTILE_DISC',
    'RANK',
    'ROW_NUMBER',
    'SESSION_USER',
    'STD',
    'STDDEV',
    'STDDEV_POP',
    'STDDEV_SAMP',
    'SUBDATE',
    'SUBSTR',
    'SUBSTRING',
    'SUM',
    'SYSTEM_USER',
    'TRIM',
    'TRIM_ORACLE',
    'VARIANCE',
    'VAR_POP',
    'VAR_SAMP',
    'ABS',
    'ACOS',
    'ADDTIME',
    'AES_DECRYPT',
    'AES_ENCRYPT',
    'ASIN',
    'ATAN',
    'ATAN2',
    'BENCHMARK',
    'BIN',
    'BINLOG_GTID_POS',
    'BIT_COUNT',
    'BIT_LENGTH',
    'CEIL',
    'CEILING',
    'CHARACTER_LENGTH',
    'CHAR_LENGTH',
    'CHR',
    'COERCIBILITY',
    'COLUMN_CHECK',
    'COLUMN_EXISTS',
    'COLUMN_LIST',
    'COLUMN_JSON',
    'COMPRESS',
    'CONCAT',
    'CONCAT_OPERATOR_ORACLE',
    'CONCAT_WS',
    'CONNECTION_ID',
    'CONV',
    'CONVERT_TZ',
    'COS',
    'COT',
    'CRC32',
    'DATEDIFF',
    'DAYNAME',
    'DAYOFMONTH',
    'DAYOFWEEK',
    'DAYOFYEAR',
    'DEGREES',
    'DECODE_HISTOGRAM',
    'DECODE_ORACLE',
    'DES_DECRYPT',
    'DES_ENCRYPT',
    'ELT',
    'ENCODE',
    'ENCRYPT',
    'EXP',
    'EXPORT_SET',
    'EXTRACTVALUE',
    'FIELD',
    'FIND_IN_SET',
    'FLOOR',
    'FORMAT',
    'FOUND_ROWS',
    'FROM_BASE64',
    'FROM_DAYS',
    'FROM_UNIXTIME',
    'GET_LOCK',
    'GREATEST',
    'HEX',
    'IFNULL',
    'INSTR',
    'ISNULL',
    'IS_FREE_LOCK',
    'IS_USED_LOCK',
    'JSON_ARRAY',
    'JSON_ARRAY_APPEND',
    'JSON_ARRAY_INSERT',
    'JSON_COMPACT',
    'JSON_CONTAINS',
    'JSON_CONTAINS_PATH',
    'JSON_DEPTH',
    'JSON_DETAILED',
    'JSON_EXISTS',
    'JSON_EXTRACT',
    'JSON_INSERT',
    'JSON_KEYS',
    'JSON_LENGTH',
    'JSON_LOOSE',
    'JSON_MERGE',
    'JSON_MERGE_PATCH',
    'JSON_MERGE_PRESERVE',
    'JSON_QUERY',
    'JSON_QUOTE',
    'JSON_OBJECT',
    'JSON_REMOVE',
    'JSON_REPLACE',
    'JSON_SET',
    'JSON_SEARCH',
    'JSON_TYPE',
    'JSON_UNQUOTE',
    'JSON_VALID',
    'JSON_VALUE',
    'LAST_DAY',
    'LAST_INSERT_ID',
    'LCASE',
    'LEAST',
    'LENGTH',
    'LENGTHB',
    'LN',
    'LOAD_FILE',
    'LOCATE',
    'LOG',
    'LOG10',
    'LOG2',
    'LOWER',
    'LPAD',
    'LPAD_ORACLE',
    'LTRIM',
    'LTRIM_ORACLE',
    'MAKEDATE',
    'MAKETIME',
    'MAKE_SET',
    'MASTER_GTID_WAIT',
    'MASTER_POS_WAIT',
    'MD5',
    'MONTHNAME',
    'NAME_CONST',
    'NVL',
    'NVL2',
    'OCT',
    'OCTET_LENGTH',
    'ORD',
    'PERIOD_ADD',
    'PERIOD_DIFF',
    'PI',
    'POW',
    'POWER',
    'QUOTE',
    'REGEXP_INSTR',
    'REGEXP_REPLACE',
    'REGEXP_SUBSTR',
    'RADIANS',
    'RAND',
    'RELEASE_ALL_LOCKS',
    'RELEASE_LOCK',
    'REPLACE_ORACLE',
    'REVERSE',
    'ROUND',
    'RPAD',
    'RPAD_ORACLE',
    'RTRIM',
    'RTRIM_ORACLE',
    'SEC_TO_TIME',
    'SHA',
    'SHA1',
    'SHA2',
    'SIGN',
    'SIN',
    'SLEEP',
    'SOUNDEX',
    'SPACE',
    'SQRT',
    'STRCMP',
    'STR_TO_DATE',
    'SUBSTR_ORACLE',
    'SUBSTRING_INDEX',
    'SUBTIME',
    'SYS_GUID',
    'TAN',
    'TIMEDIFF',
    'TIME_FORMAT',
    'TIME_TO_SEC',
    'TO_BASE64',
    'TO_CHAR',
    'TO_DAYS',
    'TO_SECONDS',
    'UCASE',
    'UNCOMPRESS',
    'UNCOMPRESSED_LENGTH',
    'UNHEX',
    'UNIX_TIMESTAMP',
    'UPDATEXML',
    'UPPER',
    'UUID',
    'UUID_SHORT',
    'VERSION',
    'WEEKDAY',
    'WEEKOFYEAR',
    'WSREP_LAST_WRITTEN_GTID',
    'WSREP_LAST_SEEN_GTID',
    'WSREP_SYNC_WAIT_UPTO_GTID',
    'YEARWEEK',
    // CASE expression shorthands
    'COALESCE',
    'NULLIF'
];
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/mariadb/mariadb.keywords.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "dataTypes",
    ()=>dataTypes,
    "keywords",
    ()=>keywords
]);
const keywords = [
    // https://mariadb.com/kb/en/reserved-words/
    'ACCESSIBLE',
    'ADD',
    'ALL',
    'ALTER',
    'ANALYZE',
    'AND',
    'AS',
    'ASC',
    'ASENSITIVE',
    'BEFORE',
    'BETWEEN',
    'BOTH',
    'BY',
    'CALL',
    'CASCADE',
    'CASE',
    'CHANGE',
    'CHECK',
    'COLLATE',
    'COLUMN',
    'CONDITION',
    'CONSTRAINT',
    'CONTINUE',
    'CONVERT',
    'CREATE',
    'CROSS',
    'CURRENT_DATE',
    'CURRENT_ROLE',
    'CURRENT_TIME',
    'CURRENT_TIMESTAMP',
    'CURRENT_USER',
    'CURSOR',
    'DATABASE',
    'DATABASES',
    'DAY_HOUR',
    'DAY_MICROSECOND',
    'DAY_MINUTE',
    'DAY_SECOND',
    'DECLARE',
    'DEFAULT',
    'DELAYED',
    'DELETE',
    'DELETE_DOMAIN_ID',
    'DESC',
    'DESCRIBE',
    'DETERMINISTIC',
    'DISTINCT',
    'DISTINCTROW',
    'DIV',
    'DO_DOMAIN_IDS',
    'DROP',
    'DUAL',
    'EACH',
    'ELSE',
    'ELSEIF',
    'ENCLOSED',
    'ESCAPED',
    'EXCEPT',
    'EXISTS',
    'EXIT',
    'EXPLAIN',
    'FALSE',
    'FETCH',
    'FOR',
    'FORCE',
    'FOREIGN',
    'FROM',
    'FULLTEXT',
    'GENERAL',
    'GRANT',
    'GROUP',
    'HAVING',
    'HIGH_PRIORITY',
    'HOUR_MICROSECOND',
    'HOUR_MINUTE',
    'HOUR_SECOND',
    'IF',
    'IGNORE',
    'IGNORE_DOMAIN_IDS',
    'IGNORE_SERVER_IDS',
    'IN',
    'INDEX',
    'INFILE',
    'INNER',
    'INOUT',
    'INSENSITIVE',
    'INSERT',
    'INTERSECT',
    'INTERVAL',
    'INTO',
    'IS',
    'ITERATE',
    'JOIN',
    'KEY',
    'KEYS',
    'KILL',
    'LEADING',
    'LEAVE',
    'LEFT',
    'LIKE',
    'LIMIT',
    'LINEAR',
    'LINES',
    'LOAD',
    'LOCALTIME',
    'LOCALTIMESTAMP',
    'LOCK',
    'LOOP',
    'LOW_PRIORITY',
    'MASTER_HEARTBEAT_PERIOD',
    'MASTER_SSL_VERIFY_SERVER_CERT',
    'MATCH',
    'MAXVALUE',
    'MINUTE_MICROSECOND',
    'MINUTE_SECOND',
    'MOD',
    'MODIFIES',
    'NATURAL',
    'NOT',
    'NO_WRITE_TO_BINLOG',
    'NULL',
    'OFFSET',
    'ON',
    'OPTIMIZE',
    'OPTION',
    'OPTIONALLY',
    'OR',
    'ORDER',
    'OUT',
    'OUTER',
    'OUTFILE',
    'OVER',
    'PAGE_CHECKSUM',
    'PARSE_VCOL_EXPR',
    'PARTITION',
    'POSITION',
    'PRIMARY',
    'PROCEDURE',
    'PURGE',
    'RANGE',
    'READ',
    'READS',
    'READ_WRITE',
    'RECURSIVE',
    'REF_SYSTEM_ID',
    'REFERENCES',
    'REGEXP',
    'RELEASE',
    'RENAME',
    'REPEAT',
    'REPLACE',
    'REQUIRE',
    'RESIGNAL',
    'RESTRICT',
    'RETURN',
    'RETURNING',
    'REVOKE',
    'RIGHT',
    'RLIKE',
    'ROW_NUMBER',
    'ROWS',
    'SCHEMA',
    'SCHEMAS',
    'SECOND_MICROSECOND',
    'SELECT',
    'SENSITIVE',
    'SEPARATOR',
    'SET',
    'SHOW',
    'SIGNAL',
    'SLOW',
    'SPATIAL',
    'SPECIFIC',
    'SQL',
    'SQLEXCEPTION',
    'SQLSTATE',
    'SQLWARNING',
    'SQL_BIG_RESULT',
    'SQL_CALC_FOUND_ROWS',
    'SQL_SMALL_RESULT',
    'SSL',
    'STARTING',
    'STATS_AUTO_RECALC',
    'STATS_PERSISTENT',
    'STATS_SAMPLE_PAGES',
    'STRAIGHT_JOIN',
    'TABLE',
    'TERMINATED',
    'THEN',
    'TO',
    'TRAILING',
    'TRIGGER',
    'TRUE',
    'UNDO',
    'UNION',
    'UNIQUE',
    'UNLOCK',
    'UNSIGNED',
    'UPDATE',
    'USAGE',
    'USE',
    'USING',
    'UTC_DATE',
    'UTC_TIME',
    'UTC_TIMESTAMP',
    'VALUES',
    'WHEN',
    'WHERE',
    'WHILE',
    'WINDOW',
    'WITH',
    'WRITE',
    'XOR',
    'YEAR_MONTH',
    'ZEROFILL'
];
const dataTypes = [
    // https://mariadb.com/kb/en/data-types/
    'BIGINT',
    'BINARY',
    'BIT',
    'BLOB',
    'CHAR BYTE',
    'CHAR',
    'CHARACTER',
    'DATETIME',
    'DEC',
    'DECIMAL',
    'DOUBLE PRECISION',
    'DOUBLE',
    'ENUM',
    'FIXED',
    'FLOAT',
    'FLOAT4',
    'FLOAT8',
    'INT',
    'INT1',
    'INT2',
    'INT3',
    'INT4',
    'INT8',
    'INTEGER',
    'LONG',
    'LONGBLOB',
    'LONGTEXT',
    'MEDIUMBLOB',
    'MEDIUMINT',
    'MEDIUMTEXT',
    'MIDDLEINT',
    'NATIONAL CHAR',
    'NATIONAL VARCHAR',
    'NUMERIC',
    'PRECISION',
    'REAL',
    'SMALLINT',
    'TEXT',
    'TIMESTAMP',
    'TINYBLOB',
    'TINYINT',
    'TINYTEXT',
    'VARBINARY',
    'VARCHAR',
    'VARCHARACTER',
    'VARYING',
    'YEAR'
];
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/mysql/mysql.formatter.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "mysql",
    ()=>mysql
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/expandPhrases.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$mariadb$2f$likeMariaDb$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/mariadb/likeMariaDb.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$mysql$2f$mysql$2e$keywords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/mysql/mysql.keywords.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$mysql$2f$mysql$2e$functions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/mysql/mysql.functions.js [app-client] (ecmascript)");
;
;
;
;
const reservedSelect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'SELECT [ALL | DISTINCT | DISTINCTROW]'
]);
const reservedClauses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    // queries
    'WITH [RECURSIVE]',
    'FROM',
    'WHERE',
    'GROUP BY',
    'HAVING',
    'WINDOW',
    'PARTITION BY',
    'ORDER BY',
    'LIMIT',
    'OFFSET',
    // Data manipulation
    // - insert:
    'INSERT [LOW_PRIORITY | DELAYED | HIGH_PRIORITY] [IGNORE] [INTO]',
    'REPLACE [LOW_PRIORITY | DELAYED] [INTO]',
    'VALUES',
    'ON DUPLICATE KEY UPDATE',
    // - update:
    'SET'
]);
const standardOnelineClauses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'CREATE [TEMPORARY] TABLE [IF NOT EXISTS]'
]);
const tabularOnelineClauses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    // - create:
    'CREATE [OR REPLACE] [SQL SECURITY DEFINER | SQL SECURITY INVOKER] VIEW [IF NOT EXISTS]',
    // - update:
    'UPDATE [LOW_PRIORITY] [IGNORE]',
    // - delete:
    'DELETE [LOW_PRIORITY] [QUICK] [IGNORE] FROM',
    // - drop table:
    'DROP [TEMPORARY] TABLE [IF EXISTS]',
    // - alter table:
    'ALTER TABLE',
    'ADD [COLUMN]',
    '{CHANGE | MODIFY} [COLUMN]',
    'DROP [COLUMN]',
    'RENAME [TO | AS]',
    'RENAME COLUMN',
    'ALTER [COLUMN]',
    '{SET | DROP} DEFAULT',
    // - truncate:
    'TRUNCATE [TABLE]',
    // https://dev.mysql.com/doc/refman/8.0/en/sql-statements.html
    'ALTER DATABASE',
    'ALTER EVENT',
    'ALTER FUNCTION',
    'ALTER INSTANCE',
    'ALTER LOGFILE GROUP',
    'ALTER PROCEDURE',
    'ALTER RESOURCE GROUP',
    'ALTER SERVER',
    'ALTER TABLESPACE',
    'ALTER USER',
    'ALTER VIEW',
    'ANALYZE TABLE',
    'BINLOG',
    'CACHE INDEX',
    'CALL',
    'CHANGE MASTER TO',
    'CHANGE REPLICATION FILTER',
    'CHANGE REPLICATION SOURCE TO',
    'CHECK TABLE',
    'CHECKSUM TABLE',
    'CLONE',
    'COMMIT',
    'CREATE DATABASE',
    'CREATE EVENT',
    'CREATE FUNCTION',
    'CREATE FUNCTION',
    'CREATE INDEX',
    'CREATE LOGFILE GROUP',
    'CREATE PROCEDURE',
    'CREATE RESOURCE GROUP',
    'CREATE ROLE',
    'CREATE SERVER',
    'CREATE SPATIAL REFERENCE SYSTEM',
    'CREATE TABLESPACE',
    'CREATE TRIGGER',
    'CREATE USER',
    'DEALLOCATE PREPARE',
    'DESCRIBE',
    'DROP DATABASE',
    'DROP EVENT',
    'DROP FUNCTION',
    'DROP FUNCTION',
    'DROP INDEX',
    'DROP LOGFILE GROUP',
    'DROP PROCEDURE',
    'DROP RESOURCE GROUP',
    'DROP ROLE',
    'DROP SERVER',
    'DROP SPATIAL REFERENCE SYSTEM',
    'DROP TABLESPACE',
    'DROP TRIGGER',
    'DROP USER',
    'DROP VIEW',
    'EXECUTE',
    'EXPLAIN',
    'FLUSH',
    'GRANT',
    'HANDLER',
    'HELP',
    'IMPORT TABLE',
    'INSTALL COMPONENT',
    'INSTALL PLUGIN',
    'KILL',
    'LOAD DATA',
    'LOAD INDEX INTO CACHE',
    'LOAD XML',
    'LOCK INSTANCE FOR BACKUP',
    'LOCK TABLES',
    'MASTER_POS_WAIT',
    'OPTIMIZE TABLE',
    'PREPARE',
    'PURGE BINARY LOGS',
    'RELEASE SAVEPOINT',
    'RENAME TABLE',
    'RENAME USER',
    'REPAIR TABLE',
    'RESET',
    'RESET MASTER',
    'RESET PERSIST',
    'RESET REPLICA',
    'RESET SLAVE',
    'RESTART',
    'REVOKE',
    'ROLLBACK',
    'ROLLBACK TO SAVEPOINT',
    'SAVEPOINT',
    'SET CHARACTER SET',
    'SET DEFAULT ROLE',
    'SET NAMES',
    'SET PASSWORD',
    'SET RESOURCE GROUP',
    'SET ROLE',
    'SET TRANSACTION',
    'SHOW',
    'SHOW BINARY LOGS',
    'SHOW BINLOG EVENTS',
    'SHOW CHARACTER SET',
    'SHOW COLLATION',
    'SHOW COLUMNS',
    'SHOW CREATE DATABASE',
    'SHOW CREATE EVENT',
    'SHOW CREATE FUNCTION',
    'SHOW CREATE PROCEDURE',
    'SHOW CREATE TABLE',
    'SHOW CREATE TRIGGER',
    'SHOW CREATE USER',
    'SHOW CREATE VIEW',
    'SHOW DATABASES',
    'SHOW ENGINE',
    'SHOW ENGINES',
    'SHOW ERRORS',
    'SHOW EVENTS',
    'SHOW FUNCTION CODE',
    'SHOW FUNCTION STATUS',
    'SHOW GRANTS',
    'SHOW INDEX',
    'SHOW MASTER STATUS',
    'SHOW OPEN TABLES',
    'SHOW PLUGINS',
    'SHOW PRIVILEGES',
    'SHOW PROCEDURE CODE',
    'SHOW PROCEDURE STATUS',
    'SHOW PROCESSLIST',
    'SHOW PROFILE',
    'SHOW PROFILES',
    'SHOW RELAYLOG EVENTS',
    'SHOW REPLICA STATUS',
    'SHOW REPLICAS',
    'SHOW SLAVE',
    'SHOW SLAVE HOSTS',
    'SHOW STATUS',
    'SHOW TABLE STATUS',
    'SHOW TABLES',
    'SHOW TRIGGERS',
    'SHOW VARIABLES',
    'SHOW WARNINGS',
    'SHUTDOWN',
    'SOURCE_POS_WAIT',
    'START GROUP_REPLICATION',
    'START REPLICA',
    'START SLAVE',
    'START TRANSACTION',
    'STOP GROUP_REPLICATION',
    'STOP REPLICA',
    'STOP SLAVE',
    'TABLE',
    'UNINSTALL COMPONENT',
    'UNINSTALL PLUGIN',
    'UNLOCK INSTANCE',
    'UNLOCK TABLES',
    'USE',
    'XA',
    // flow control
    // 'IF',
    'ITERATE',
    'LEAVE',
    'LOOP',
    'REPEAT',
    'RETURN',
    'WHILE'
]);
const reservedSetOperations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'UNION [ALL | DISTINCT]'
]);
const reservedJoins = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'JOIN',
    '{LEFT | RIGHT} [OUTER] JOIN',
    '{INNER | CROSS} JOIN',
    'NATURAL [INNER] JOIN',
    'NATURAL {LEFT | RIGHT} [OUTER] JOIN',
    // non-standard joins
    'STRAIGHT_JOIN'
]);
const reservedKeywordPhrases = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'ON {UPDATE | DELETE} [SET NULL]',
    'CHARACTER SET',
    '{ROWS | RANGE} BETWEEN',
    'IDENTIFIED BY'
]);
const reservedDataTypePhrases = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([]);
const mysql = {
    name: 'mysql',
    tokenizerOptions: {
        reservedSelect,
        reservedClauses: [
            ...reservedClauses,
            ...standardOnelineClauses,
            ...tabularOnelineClauses
        ],
        reservedSetOperations,
        reservedJoins,
        reservedKeywordPhrases,
        reservedDataTypePhrases,
        supportsXor: true,
        reservedKeywords: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$mysql$2f$mysql$2e$keywords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keywords"],
        reservedDataTypes: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$mysql$2f$mysql$2e$keywords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dataTypes"],
        reservedFunctionNames: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$mysql$2f$mysql$2e$functions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["functions"],
        // TODO: support _ char set prefixes such as _utf8, _latin1, _binary, _utf8mb4, etc.
        stringTypes: [
            '""-qq-bs',
            {
                quote: "''-qq-bs",
                prefixes: [
                    'N'
                ]
            },
            {
                quote: "''-raw",
                prefixes: [
                    'B',
                    'X'
                ],
                requirePrefix: true
            }
        ],
        identTypes: [
            '``'
        ],
        identChars: {
            first: '$',
            rest: '$',
            allowFirstCharNumber: true
        },
        variableTypes: [
            {
                regex: '@@?[A-Za-z0-9_.$]+'
            },
            {
                quote: '""-qq-bs',
                prefixes: [
                    '@'
                ],
                requirePrefix: true
            },
            {
                quote: "''-qq-bs",
                prefixes: [
                    '@'
                ],
                requirePrefix: true
            },
            {
                quote: '``',
                prefixes: [
                    '@'
                ],
                requirePrefix: true
            }
        ],
        paramTypes: {
            positional: true
        },
        lineCommentTypes: [
            '--',
            '#'
        ],
        operators: [
            '%',
            ':=',
            '&',
            '|',
            '^',
            '~',
            '<<',
            '>>',
            '<=>',
            '->',
            '->>',
            '&&',
            '||',
            '!',
            '*.*'
        ],
        postProcess: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$mariadb$2f$likeMariaDb$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["postProcess"]
    },
    formatOptions: {
        onelineClauses: [
            ...standardOnelineClauses,
            ...tabularOnelineClauses
        ],
        tabularOnelineClauses
    }
};
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/mysql/mysql.functions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "functions",
    ()=>functions
]);
const functions = [
    // https://dev.mysql.com/doc/refman/8.0/en/built-in-function-reference.html
    'ABS',
    'ACOS',
    'ADDDATE',
    'ADDTIME',
    'AES_DECRYPT',
    'AES_ENCRYPT',
    // 'AND',
    'ANY_VALUE',
    'ASCII',
    'ASIN',
    'ATAN',
    'ATAN2',
    'AVG',
    'BENCHMARK',
    'BIN',
    'BIN_TO_UUID',
    'BINARY',
    'BIT_AND',
    'BIT_COUNT',
    'BIT_LENGTH',
    'BIT_OR',
    'BIT_XOR',
    'CAN_ACCESS_COLUMN',
    'CAN_ACCESS_DATABASE',
    'CAN_ACCESS_TABLE',
    'CAN_ACCESS_USER',
    'CAN_ACCESS_VIEW',
    'CAST',
    'CEIL',
    'CEILING',
    'CHAR',
    'CHAR_LENGTH',
    'CHARACTER_LENGTH',
    'CHARSET',
    'COALESCE',
    'COERCIBILITY',
    'COLLATION',
    'COMPRESS',
    'CONCAT',
    'CONCAT_WS',
    'CONNECTION_ID',
    'CONV',
    'CONVERT',
    'CONVERT_TZ',
    'COS',
    'COT',
    'COUNT',
    'CRC32',
    'CUME_DIST',
    'CURDATE',
    'CURRENT_DATE',
    'CURRENT_ROLE',
    'CURRENT_TIME',
    'CURRENT_TIMESTAMP',
    'CURRENT_USER',
    'CURTIME',
    'DATABASE',
    'DATE',
    'DATE_ADD',
    'DATE_FORMAT',
    'DATE_SUB',
    'DATEDIFF',
    'DAY',
    'DAYNAME',
    'DAYOFMONTH',
    'DAYOFWEEK',
    'DAYOFYEAR',
    'DEFAULT',
    'DEGREES',
    'DENSE_RANK',
    'DIV',
    'ELT',
    'EXP',
    'EXPORT_SET',
    'EXTRACT',
    'EXTRACTVALUE',
    'FIELD',
    'FIND_IN_SET',
    'FIRST_VALUE',
    'FLOOR',
    'FORMAT',
    'FORMAT_BYTES',
    'FORMAT_PICO_TIME',
    'FOUND_ROWS',
    'FROM_BASE64',
    'FROM_DAYS',
    'FROM_UNIXTIME',
    'GEOMCOLLECTION',
    'GEOMETRYCOLLECTION',
    'GET_DD_COLUMN_PRIVILEGES',
    'GET_DD_CREATE_OPTIONS',
    'GET_DD_INDEX_SUB_PART_LENGTH',
    'GET_FORMAT',
    'GET_LOCK',
    'GREATEST',
    'GROUP_CONCAT',
    'GROUPING',
    'GTID_SUBSET',
    'GTID_SUBTRACT',
    'HEX',
    'HOUR',
    'ICU_VERSION',
    'IF',
    'IFNULL',
    // 'IN',
    'INET_ATON',
    'INET_NTOA',
    'INET6_ATON',
    'INET6_NTOA',
    'INSERT',
    'INSTR',
    'INTERNAL_AUTO_INCREMENT',
    'INTERNAL_AVG_ROW_LENGTH',
    'INTERNAL_CHECK_TIME',
    'INTERNAL_CHECKSUM',
    'INTERNAL_DATA_FREE',
    'INTERNAL_DATA_LENGTH',
    'INTERNAL_DD_CHAR_LENGTH',
    'INTERNAL_GET_COMMENT_OR_ERROR',
    'INTERNAL_GET_ENABLED_ROLE_JSON',
    'INTERNAL_GET_HOSTNAME',
    'INTERNAL_GET_USERNAME',
    'INTERNAL_GET_VIEW_WARNING_OR_ERROR',
    'INTERNAL_INDEX_COLUMN_CARDINALITY',
    'INTERNAL_INDEX_LENGTH',
    'INTERNAL_IS_ENABLED_ROLE',
    'INTERNAL_IS_MANDATORY_ROLE',
    'INTERNAL_KEYS_DISABLED',
    'INTERNAL_MAX_DATA_LENGTH',
    'INTERNAL_TABLE_ROWS',
    'INTERNAL_UPDATE_TIME',
    'INTERVAL',
    'IS',
    'IS_FREE_LOCK',
    'IS_IPV4',
    'IS_IPV4_COMPAT',
    'IS_IPV4_MAPPED',
    'IS_IPV6',
    'IS NOT',
    'IS NOT NULL',
    'IS NULL',
    'IS_USED_LOCK',
    'IS_UUID',
    'ISNULL',
    'JSON_ARRAY',
    'JSON_ARRAY_APPEND',
    'JSON_ARRAY_INSERT',
    'JSON_ARRAYAGG',
    'JSON_CONTAINS',
    'JSON_CONTAINS_PATH',
    'JSON_DEPTH',
    'JSON_EXTRACT',
    'JSON_INSERT',
    'JSON_KEYS',
    'JSON_LENGTH',
    'JSON_MERGE',
    'JSON_MERGE_PATCH',
    'JSON_MERGE_PRESERVE',
    'JSON_OBJECT',
    'JSON_OBJECTAGG',
    'JSON_OVERLAPS',
    'JSON_PRETTY',
    'JSON_QUOTE',
    'JSON_REMOVE',
    'JSON_REPLACE',
    'JSON_SCHEMA_VALID',
    'JSON_SCHEMA_VALIDATION_REPORT',
    'JSON_SEARCH',
    'JSON_SET',
    'JSON_STORAGE_FREE',
    'JSON_STORAGE_SIZE',
    'JSON_TABLE',
    'JSON_TYPE',
    'JSON_UNQUOTE',
    'JSON_VALID',
    'JSON_VALUE',
    'LAG',
    'LAST_DAY',
    'LAST_INSERT_ID',
    'LAST_VALUE',
    'LCASE',
    'LEAD',
    'LEAST',
    'LEFT',
    'LENGTH',
    'LIKE',
    'LINESTRING',
    'LN',
    'LOAD_FILE',
    'LOCALTIME',
    'LOCALTIMESTAMP',
    'LOCATE',
    'LOG',
    'LOG10',
    'LOG2',
    'LOWER',
    'LPAD',
    'LTRIM',
    'MAKE_SET',
    'MAKEDATE',
    'MAKETIME',
    'MASTER_POS_WAIT',
    'MATCH',
    'MAX',
    'MBRCONTAINS',
    'MBRCOVEREDBY',
    'MBRCOVERS',
    'MBRDISJOINT',
    'MBREQUALS',
    'MBRINTERSECTS',
    'MBROVERLAPS',
    'MBRTOUCHES',
    'MBRWITHIN',
    'MD5',
    // 'MEMBER OF',
    'MICROSECOND',
    'MID',
    'MIN',
    'MINUTE',
    'MOD',
    'MONTH',
    'MONTHNAME',
    'MULTILINESTRING',
    'MULTIPOINT',
    'MULTIPOLYGON',
    'NAME_CONST',
    // 'NOT',
    // 'NOT IN',
    // 'NOT LIKE',
    // 'NOT REGEXP',
    'NOW',
    'NTH_VALUE',
    'NTILE',
    'NULLIF',
    'OCT',
    'OCTET_LENGTH',
    // 'OR',
    'ORD',
    'PERCENT_RANK',
    'PERIOD_ADD',
    'PERIOD_DIFF',
    'PI',
    'POINT',
    'POLYGON',
    'POSITION',
    'POW',
    'POWER',
    'PS_CURRENT_THREAD_ID',
    'PS_THREAD_ID',
    'QUARTER',
    'QUOTE',
    'RADIANS',
    'RAND',
    'RANDOM_BYTES',
    'RANK',
    'REGEXP',
    'REGEXP_INSTR',
    'REGEXP_LIKE',
    'REGEXP_REPLACE',
    'REGEXP_SUBSTR',
    'RELEASE_ALL_LOCKS',
    'RELEASE_LOCK',
    'REPEAT',
    'REPLACE',
    'REVERSE',
    'RIGHT',
    'RLIKE',
    'ROLES_GRAPHML',
    'ROUND',
    'ROW_COUNT',
    'ROW_NUMBER',
    'RPAD',
    'RTRIM',
    'SCHEMA',
    'SEC_TO_TIME',
    'SECOND',
    'SESSION_USER',
    'SHA1',
    'SHA2',
    'SIGN',
    'SIN',
    'SLEEP',
    'SOUNDEX',
    'SOUNDS LIKE',
    'SOURCE_POS_WAIT',
    'SPACE',
    'SQRT',
    'ST_AREA',
    'ST_ASBINARY',
    'ST_ASGEOJSON',
    'ST_ASTEXT',
    'ST_BUFFER',
    'ST_BUFFER_STRATEGY',
    'ST_CENTROID',
    'ST_COLLECT',
    'ST_CONTAINS',
    'ST_CONVEXHULL',
    'ST_CROSSES',
    'ST_DIFFERENCE',
    'ST_DIMENSION',
    'ST_DISJOINT',
    'ST_DISTANCE',
    'ST_DISTANCE_SPHERE',
    'ST_ENDPOINT',
    'ST_ENVELOPE',
    'ST_EQUALS',
    'ST_EXTERIORRING',
    'ST_FRECHETDISTANCE',
    'ST_GEOHASH',
    'ST_GEOMCOLLFROMTEXT',
    'ST_GEOMCOLLFROMWKB',
    'ST_GEOMETRYN',
    'ST_GEOMETRYTYPE',
    'ST_GEOMFROMGEOJSON',
    'ST_GEOMFROMTEXT',
    'ST_GEOMFROMWKB',
    'ST_HAUSDORFFDISTANCE',
    'ST_INTERIORRINGN',
    'ST_INTERSECTION',
    'ST_INTERSECTS',
    'ST_ISCLOSED',
    'ST_ISEMPTY',
    'ST_ISSIMPLE',
    'ST_ISVALID',
    'ST_LATFROMGEOHASH',
    'ST_LATITUDE',
    'ST_LENGTH',
    'ST_LINEFROMTEXT',
    'ST_LINEFROMWKB',
    'ST_LINEINTERPOLATEPOINT',
    'ST_LINEINTERPOLATEPOINTS',
    'ST_LONGFROMGEOHASH',
    'ST_LONGITUDE',
    'ST_MAKEENVELOPE',
    'ST_MLINEFROMTEXT',
    'ST_MLINEFROMWKB',
    'ST_MPOINTFROMTEXT',
    'ST_MPOINTFROMWKB',
    'ST_MPOLYFROMTEXT',
    'ST_MPOLYFROMWKB',
    'ST_NUMGEOMETRIES',
    'ST_NUMINTERIORRING',
    'ST_NUMPOINTS',
    'ST_OVERLAPS',
    'ST_POINTATDISTANCE',
    'ST_POINTFROMGEOHASH',
    'ST_POINTFROMTEXT',
    'ST_POINTFROMWKB',
    'ST_POINTN',
    'ST_POLYFROMTEXT',
    'ST_POLYFROMWKB',
    'ST_SIMPLIFY',
    'ST_SRID',
    'ST_STARTPOINT',
    'ST_SWAPXY',
    'ST_SYMDIFFERENCE',
    'ST_TOUCHES',
    'ST_TRANSFORM',
    'ST_UNION',
    'ST_VALIDATE',
    'ST_WITHIN',
    'ST_X',
    'ST_Y',
    'STATEMENT_DIGEST',
    'STATEMENT_DIGEST_TEXT',
    'STD',
    'STDDEV',
    'STDDEV_POP',
    'STDDEV_SAMP',
    'STR_TO_DATE',
    'STRCMP',
    'SUBDATE',
    'SUBSTR',
    'SUBSTRING',
    'SUBSTRING_INDEX',
    'SUBTIME',
    'SUM',
    'SYSDATE',
    'SYSTEM_USER',
    'TAN',
    'TIME',
    'TIME_FORMAT',
    'TIME_TO_SEC',
    'TIMEDIFF',
    'TIMESTAMP',
    'TIMESTAMPADD',
    'TIMESTAMPDIFF',
    'TO_BASE64',
    'TO_DAYS',
    'TO_SECONDS',
    'TRIM',
    'TRUNCATE',
    'UCASE',
    'UNCOMPRESS',
    'UNCOMPRESSED_LENGTH',
    'UNHEX',
    'UNIX_TIMESTAMP',
    'UPDATEXML',
    'UPPER',
    // 'USER',
    'UTC_DATE',
    'UTC_TIME',
    'UTC_TIMESTAMP',
    'UUID',
    'UUID_SHORT',
    'UUID_TO_BIN',
    'VALIDATE_PASSWORD_STRENGTH',
    'VALUES',
    'VAR_POP',
    'VAR_SAMP',
    'VARIANCE',
    'VERSION',
    'WAIT_FOR_EXECUTED_GTID_SET',
    'WAIT_UNTIL_SQL_THREAD_AFTER_GTIDS',
    'WEEK',
    'WEEKDAY',
    'WEEKOFYEAR',
    'WEIGHT_STRING',
    // 'XOR',
    'YEAR',
    'YEARWEEK'
];
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/mysql/mysql.keywords.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "dataTypes",
    ()=>dataTypes,
    "keywords",
    ()=>keywords
]);
const keywords = [
    // https://dev.mysql.com/doc/refman/8.0/en/keywords.html
    'ACCESSIBLE',
    'ADD',
    'ALL',
    'ALTER',
    'ANALYZE',
    'AND',
    'AS',
    'ASC',
    'ASENSITIVE',
    'BEFORE',
    'BETWEEN',
    'BOTH',
    'BY',
    'CALL',
    'CASCADE',
    'CASE',
    'CHANGE',
    'CHECK',
    'COLLATE',
    'COLUMN',
    'CONDITION',
    'CONSTRAINT',
    'CONTINUE',
    'CONVERT',
    'CREATE',
    'CROSS',
    'CUBE',
    'CUME_DIST',
    'CURRENT_DATE',
    'CURRENT_TIME',
    'CURRENT_TIMESTAMP',
    'CURRENT_USER',
    'CURSOR',
    'DATABASE',
    'DATABASES',
    'DAY_HOUR',
    'DAY_MICROSECOND',
    'DAY_MINUTE',
    'DAY_SECOND',
    'DECLARE',
    'DEFAULT',
    'DELAYED',
    'DELETE',
    'DENSE_RANK',
    'DESC',
    'DESCRIBE',
    'DETERMINISTIC',
    'DISTINCT',
    'DISTINCTROW',
    'DIV',
    'DROP',
    'DUAL',
    'EACH',
    'ELSE',
    'ELSEIF',
    'EMPTY',
    'ENCLOSED',
    'ESCAPED',
    'EXCEPT',
    'EXISTS',
    'EXIT',
    'EXPLAIN',
    'FALSE',
    'FETCH',
    'FIRST_VALUE',
    'FOR',
    'FORCE',
    'FOREIGN',
    'FROM',
    'FULLTEXT',
    'FUNCTION',
    'GENERATED',
    'GET',
    'GRANT',
    'GROUP',
    'GROUPING',
    'GROUPS',
    'HAVING',
    'HIGH_PRIORITY',
    'HOUR_MICROSECOND',
    'HOUR_MINUTE',
    'HOUR_SECOND',
    'IF',
    'IGNORE',
    'IN',
    'INDEX',
    'INFILE',
    'INNER',
    'INOUT',
    'INSENSITIVE',
    'INSERT',
    'IN',
    'INTERSECT',
    'INTERVAL',
    'INTO',
    'IO_AFTER_GTIDS',
    'IO_BEFORE_GTIDS',
    'IS',
    'ITERATE',
    'JOIN',
    'JSON_TABLE',
    'KEY',
    'KEYS',
    'KILL',
    'LAG',
    'LAST_VALUE',
    'LATERAL',
    'LEAD',
    'LEADING',
    'LEAVE',
    'LEFT',
    'LIKE',
    'LIMIT',
    'LINEAR',
    'LINES',
    'LOAD',
    'LOCALTIME',
    'LOCALTIMESTAMP',
    'LOCK',
    'LONG',
    'LOOP',
    'LOW_PRIORITY',
    'MASTER_BIND',
    'MASTER_SSL_VERIFY_SERVER_CERT',
    'MATCH',
    'MAXVALUE',
    'MINUTE_MICROSECOND',
    'MINUTE_SECOND',
    'MOD',
    'MODIFIES',
    'NATURAL',
    'NOT',
    'NO_WRITE_TO_BINLOG',
    'NTH_VALUE',
    'NTILE',
    'NULL',
    'OF',
    'ON',
    'OPTIMIZE',
    'OPTIMIZER_COSTS',
    'OPTION',
    'OPTIONALLY',
    'OR',
    'ORDER',
    'OUT',
    'OUTER',
    'OUTFILE',
    'OVER',
    'PARTITION',
    'PERCENT_RANK',
    'PRIMARY',
    'PROCEDURE',
    'PURGE',
    'RANGE',
    'RANK',
    'READ',
    'READS',
    'READ_WRITE',
    'RECURSIVE',
    'REFERENCES',
    'REGEXP',
    'RELEASE',
    'RENAME',
    'REPEAT',
    'REPLACE',
    'REQUIRE',
    'RESIGNAL',
    'RESTRICT',
    'RETURN',
    'REVOKE',
    'RIGHT',
    'RLIKE',
    'ROW',
    'ROWS',
    'ROW_NUMBER',
    'SCHEMA',
    'SCHEMAS',
    'SECOND_MICROSECOND',
    'SELECT',
    'SENSITIVE',
    'SEPARATOR',
    'SET',
    'SHOW',
    'SIGNAL',
    'SPATIAL',
    'SPECIFIC',
    'SQL',
    'SQLEXCEPTION',
    'SQLSTATE',
    'SQLWARNING',
    'SQL_BIG_RESULT',
    'SQL_CALC_FOUND_ROWS',
    'SQL_SMALL_RESULT',
    'SSL',
    'STARTING',
    'STORED',
    'STRAIGHT_JOIN',
    'SYSTEM',
    'TABLE',
    'TERMINATED',
    'THEN',
    'TO',
    'TRAILING',
    'TRIGGER',
    'TRUE',
    'UNDO',
    'UNION',
    'UNIQUE',
    'UNLOCK',
    'UNSIGNED',
    'UPDATE',
    'USAGE',
    'USE',
    'USING',
    'UTC_DATE',
    'UTC_TIME',
    'UTC_TIMESTAMP',
    'VALUES',
    'VIRTUAL',
    'WHEN',
    'WHERE',
    'WHILE',
    'WINDOW',
    'WITH',
    'WRITE',
    'XOR',
    'YEAR_MONTH',
    'ZEROFILL'
];
const dataTypes = [
    // https://dev.mysql.com/doc/refman/8.0/en/data-types.html
    'BIGINT',
    'BINARY',
    'BIT',
    'BLOB',
    'BOOL',
    'BOOLEAN',
    'CHAR',
    'CHARACTER',
    'DATE',
    'DATETIME',
    'DEC',
    'DECIMAL',
    'DOUBLE PRECISION',
    'DOUBLE',
    'ENUM',
    'FIXED',
    'FLOAT',
    'FLOAT4',
    'FLOAT8',
    'INT',
    'INT1',
    'INT2',
    'INT3',
    'INT4',
    'INT8',
    'INTEGER',
    'LONGBLOB',
    'LONGTEXT',
    'MEDIUMBLOB',
    'MEDIUMINT',
    'MEDIUMTEXT',
    'MIDDLEINT',
    'NATIONAL CHAR',
    'NATIONAL VARCHAR',
    'NUMERIC',
    'PRECISION',
    'REAL',
    'SMALLINT',
    'TEXT',
    'TIME',
    'TIMESTAMP',
    'TINYBLOB',
    'TINYINT',
    'TINYTEXT',
    'VARBINARY',
    'VARCHAR',
    'VARCHARACTER',
    'VARYING',
    'YEAR'
];
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/n1ql/n1ql.formatter.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "n1ql",
    ()=>n1ql
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/expandPhrases.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$n1ql$2f$n1ql$2e$functions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/n1ql/n1ql.functions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$n1ql$2f$n1ql$2e$keywords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/n1ql/n1ql.keywords.js [app-client] (ecmascript)");
;
;
;
const reservedSelect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'SELECT [ALL | DISTINCT]'
]);
const reservedClauses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    // queries
    'WITH',
    'FROM',
    'WHERE',
    'GROUP BY',
    'HAVING',
    'WINDOW',
    'PARTITION BY',
    'ORDER BY',
    'LIMIT',
    'OFFSET',
    // Data manipulation
    // - insert:
    'INSERT INTO',
    'VALUES',
    // - update:
    'SET',
    // - merge:
    'MERGE INTO',
    'WHEN [NOT] MATCHED THEN',
    'UPDATE SET',
    'INSERT',
    // other
    'NEST',
    'UNNEST',
    'RETURNING'
]);
const onelineClauses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    // - update:
    'UPDATE',
    // - delete:
    'DELETE FROM',
    // - set schema:
    'SET SCHEMA',
    // https://docs.couchbase.com/server/current/n1ql/n1ql-language-reference/reservedwords.html
    'ADVISE',
    'ALTER INDEX',
    'BEGIN TRANSACTION',
    'BUILD INDEX',
    'COMMIT TRANSACTION',
    'CREATE COLLECTION',
    'CREATE FUNCTION',
    'CREATE INDEX',
    'CREATE PRIMARY INDEX',
    'CREATE SCOPE',
    'DROP COLLECTION',
    'DROP FUNCTION',
    'DROP INDEX',
    'DROP PRIMARY INDEX',
    'DROP SCOPE',
    'EXECUTE',
    'EXECUTE FUNCTION',
    'EXPLAIN',
    'GRANT',
    'INFER',
    'PREPARE',
    'REVOKE',
    'ROLLBACK TRANSACTION',
    'SAVEPOINT',
    'SET TRANSACTION',
    'UPDATE STATISTICS',
    'UPSERT',
    // other
    'LET',
    'SET CURRENT SCHEMA',
    'SHOW',
    'USE [PRIMARY] KEYS'
]);
const reservedSetOperations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'UNION [ALL]',
    'EXCEPT [ALL]',
    'INTERSECT [ALL]'
]);
const reservedJoins = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'JOIN',
    '{LEFT | RIGHT} [OUTER] JOIN',
    'INNER JOIN'
]);
const reservedKeywordPhrases = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    '{ROWS | RANGE | GROUPS} BETWEEN'
]);
const reservedDataTypePhrases = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([]);
const n1ql = {
    name: 'n1ql',
    tokenizerOptions: {
        reservedSelect,
        reservedClauses: [
            ...reservedClauses,
            ...onelineClauses
        ],
        reservedSetOperations,
        reservedJoins,
        reservedKeywordPhrases,
        reservedDataTypePhrases,
        supportsXor: true,
        reservedKeywords: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$n1ql$2f$n1ql$2e$keywords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keywords"],
        reservedDataTypes: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$n1ql$2f$n1ql$2e$keywords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dataTypes"],
        reservedFunctionNames: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$n1ql$2f$n1ql$2e$functions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["functions"],
        // NOTE: single quotes are actually not supported in N1QL,
        // but we support them anyway as all other SQL dialects do,
        // which simplifies writing tests that are shared between all dialects.
        stringTypes: [
            '""-bs',
            "''-bs"
        ],
        identTypes: [
            '``'
        ],
        extraParens: [
            '[]',
            '{}'
        ],
        paramTypes: {
            positional: true,
            numbered: [
                '$'
            ],
            named: [
                '$'
            ]
        },
        lineCommentTypes: [
            '#',
            '--'
        ],
        operators: [
            '%',
            '==',
            ':',
            '||'
        ]
    },
    formatOptions: {
        onelineClauses
    }
};
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/n1ql/n1ql.functions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "functions",
    ()=>functions
]);
const functions = [
    // https://docs.couchbase.com/server/current/n1ql/n1ql-language-reference/functions.html
    'ABORT',
    'ABS',
    'ACOS',
    'ADVISOR',
    'ARRAY_AGG',
    'ARRAY_AGG',
    'ARRAY_APPEND',
    'ARRAY_AVG',
    'ARRAY_BINARY_SEARCH',
    'ARRAY_CONCAT',
    'ARRAY_CONTAINS',
    'ARRAY_COUNT',
    'ARRAY_DISTINCT',
    'ARRAY_EXCEPT',
    'ARRAY_FLATTEN',
    'ARRAY_IFNULL',
    'ARRAY_INSERT',
    'ARRAY_INTERSECT',
    'ARRAY_LENGTH',
    'ARRAY_MAX',
    'ARRAY_MIN',
    'ARRAY_MOVE',
    'ARRAY_POSITION',
    'ARRAY_PREPEND',
    'ARRAY_PUT',
    'ARRAY_RANGE',
    'ARRAY_REMOVE',
    'ARRAY_REPEAT',
    'ARRAY_REPLACE',
    'ARRAY_REVERSE',
    'ARRAY_SORT',
    'ARRAY_STAR',
    'ARRAY_SUM',
    'ARRAY_SYMDIFF',
    'ARRAY_SYMDIFF1',
    'ARRAY_SYMDIFFN',
    'ARRAY_UNION',
    'ASIN',
    'ATAN',
    'ATAN2',
    'AVG',
    'BASE64',
    'BASE64_DECODE',
    'BASE64_ENCODE',
    'BITAND ',
    'BITCLEAR ',
    'BITNOT ',
    'BITOR ',
    'BITSET ',
    'BITSHIFT ',
    'BITTEST ',
    'BITXOR ',
    'CEIL',
    'CLOCK_LOCAL',
    'CLOCK_MILLIS',
    'CLOCK_STR',
    'CLOCK_TZ',
    'CLOCK_UTC',
    'COALESCE',
    'CONCAT',
    'CONCAT2',
    'CONTAINS',
    'CONTAINS_TOKEN',
    'CONTAINS_TOKEN_LIKE',
    'CONTAINS_TOKEN_REGEXP',
    'COS',
    'COUNT',
    'COUNT',
    'COUNTN',
    'CUME_DIST',
    'CURL',
    'DATE_ADD_MILLIS',
    'DATE_ADD_STR',
    'DATE_DIFF_MILLIS',
    'DATE_DIFF_STR',
    'DATE_FORMAT_STR',
    'DATE_PART_MILLIS',
    'DATE_PART_STR',
    'DATE_RANGE_MILLIS',
    'DATE_RANGE_STR',
    'DATE_TRUNC_MILLIS',
    'DATE_TRUNC_STR',
    'DECODE',
    'DECODE_JSON',
    'DEGREES',
    'DENSE_RANK',
    'DURATION_TO_STR',
    // 'E',
    'ENCODED_SIZE',
    'ENCODE_JSON',
    'EXP',
    'FIRST_VALUE',
    'FLOOR',
    'GREATEST',
    'HAS_TOKEN',
    'IFINF',
    'IFMISSING',
    'IFMISSINGORNULL',
    'IFNAN',
    'IFNANORINF',
    'IFNULL',
    'INITCAP',
    'ISARRAY',
    'ISATOM',
    'ISBITSET',
    'ISBOOLEAN',
    'ISNUMBER',
    'ISOBJECT',
    'ISSTRING',
    'LAG',
    'LAST_VALUE',
    'LEAD',
    'LEAST',
    'LENGTH',
    'LN',
    'LOG',
    'LOWER',
    'LTRIM',
    'MAX',
    'MEAN',
    'MEDIAN',
    'META',
    'MILLIS',
    'MILLIS_TO_LOCAL',
    'MILLIS_TO_STR',
    'MILLIS_TO_TZ',
    'MILLIS_TO_UTC',
    'MILLIS_TO_ZONE_NAME',
    'MIN',
    'MISSINGIF',
    'NANIF',
    'NEGINFIF',
    'NOW_LOCAL',
    'NOW_MILLIS',
    'NOW_STR',
    'NOW_TZ',
    'NOW_UTC',
    'NTH_VALUE',
    'NTILE',
    'NULLIF',
    'NVL',
    'NVL2',
    'OBJECT_ADD',
    'OBJECT_CONCAT',
    'OBJECT_INNER_PAIRS',
    'OBJECT_INNER_VALUES',
    'OBJECT_LENGTH',
    'OBJECT_NAMES',
    'OBJECT_PAIRS',
    'OBJECT_PUT',
    'OBJECT_REMOVE',
    'OBJECT_RENAME',
    'OBJECT_REPLACE',
    'OBJECT_UNWRAP',
    'OBJECT_VALUES',
    'PAIRS',
    'PERCENT_RANK',
    'PI',
    'POLY_LENGTH',
    'POSINFIF',
    'POSITION',
    'POWER',
    'RADIANS',
    'RANDOM',
    'RANK',
    'RATIO_TO_REPORT',
    'REGEXP_CONTAINS',
    'REGEXP_LIKE',
    'REGEXP_MATCHES',
    'REGEXP_POSITION',
    'REGEXP_REPLACE',
    'REGEXP_SPLIT',
    'REGEX_CONTAINS',
    'REGEX_LIKE',
    'REGEX_MATCHES',
    'REGEX_POSITION',
    'REGEX_REPLACE',
    'REGEX_SPLIT',
    'REPEAT',
    'REPLACE',
    'REVERSE',
    'ROUND',
    'ROW_NUMBER',
    'RTRIM',
    'SEARCH',
    'SEARCH_META',
    'SEARCH_SCORE',
    'SIGN',
    'SIN',
    'SPLIT',
    'SQRT',
    'STDDEV',
    'STDDEV_POP',
    'STDDEV_SAMP',
    'STR_TO_DURATION',
    'STR_TO_MILLIS',
    'STR_TO_TZ',
    'STR_TO_UTC',
    'STR_TO_ZONE_NAME',
    'SUBSTR',
    'SUFFIXES',
    'SUM',
    'TAN',
    'TITLE',
    'TOARRAY',
    'TOATOM',
    'TOBOOLEAN',
    'TOKENS',
    'TOKENS',
    'TONUMBER',
    'TOOBJECT',
    'TOSTRING',
    'TRIM',
    'TRUNC',
    // 'TYPE', // disabled
    'UPPER',
    'UUID',
    'VARIANCE',
    'VARIANCE_POP',
    'VARIANCE_SAMP',
    'VAR_POP',
    'VAR_SAMP',
    'WEEKDAY_MILLIS',
    'WEEKDAY_STR',
    // type casting
    // not implemented in N1QL, but added here now for the sake of tests
    // https://docs.couchbase.com/server/current/analytics/3_query.html#Vs_SQL-92
    'CAST'
];
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/n1ql/n1ql.keywords.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "dataTypes",
    ()=>dataTypes,
    "keywords",
    ()=>keywords
]);
const keywords = [
    // https://docs.couchbase.com/server/current/n1ql/n1ql-language-reference/reservedwords.html
    'ADVISE',
    'ALL',
    'ALTER',
    'ANALYZE',
    'AND',
    'ANY',
    'ARRAY',
    'AS',
    'ASC',
    'AT',
    'BEGIN',
    'BETWEEN',
    'BINARY',
    'BOOLEAN',
    'BREAK',
    'BUCKET',
    'BUILD',
    'BY',
    'CALL',
    'CASE',
    'CAST',
    'CLUSTER',
    'COLLATE',
    'COLLECTION',
    'COMMIT',
    'COMMITTED',
    'CONNECT',
    'CONTINUE',
    'CORRELATED',
    'COVER',
    'CREATE',
    'CURRENT',
    'DATABASE',
    'DATASET',
    'DATASTORE',
    'DECLARE',
    'DECREMENT',
    'DELETE',
    'DERIVED',
    'DESC',
    'DESCRIBE',
    'DISTINCT',
    'DO',
    'DROP',
    'EACH',
    'ELEMENT',
    'ELSE',
    'END',
    'EVERY',
    'EXCEPT',
    'EXCLUDE',
    'EXECUTE',
    'EXISTS',
    'EXPLAIN',
    'FALSE',
    'FETCH',
    'FILTER',
    'FIRST',
    'FLATTEN',
    'FLUSH',
    'FOLLOWING',
    'FOR',
    'FORCE',
    'FROM',
    'FTS',
    'FUNCTION',
    'GOLANG',
    'GRANT',
    'GROUP',
    'GROUPS',
    'GSI',
    'HASH',
    'HAVING',
    'IF',
    'IGNORE',
    'ILIKE',
    'IN',
    'INCLUDE',
    'INCREMENT',
    'INDEX',
    'INFER',
    'INLINE',
    'INNER',
    'INSERT',
    'INTERSECT',
    'INTO',
    'IS',
    'ISOLATION',
    'JAVASCRIPT',
    'JOIN',
    'KEY',
    'KEYS',
    'KEYSPACE',
    'KNOWN',
    'LANGUAGE',
    'LAST',
    'LEFT',
    'LET',
    'LETTING',
    'LEVEL',
    'LIKE',
    'LIMIT',
    'LSM',
    'MAP',
    'MAPPING',
    'MATCHED',
    'MATERIALIZED',
    'MERGE',
    'MINUS',
    'MISSING',
    'NAMESPACE',
    'NEST',
    'NL',
    'NO',
    'NOT',
    'NTH_VALUE',
    'NULL',
    'NULLS',
    'NUMBER',
    'OBJECT',
    'OFFSET',
    'ON',
    'OPTION',
    'OPTIONS',
    'OR',
    'ORDER',
    'OTHERS',
    'OUTER',
    'OVER',
    'PARSE',
    'PARTITION',
    'PASSWORD',
    'PATH',
    'POOL',
    'PRECEDING',
    'PREPARE',
    'PRIMARY',
    'PRIVATE',
    'PRIVILEGE',
    'PROBE',
    'PROCEDURE',
    'PUBLIC',
    'RANGE',
    'RAW',
    'REALM',
    'REDUCE',
    'RENAME',
    'RESPECT',
    'RETURN',
    'RETURNING',
    'REVOKE',
    'RIGHT',
    'ROLE',
    'ROLLBACK',
    'ROW',
    'ROWS',
    'SATISFIES',
    'SAVEPOINT',
    'SCHEMA',
    'SCOPE',
    'SELECT',
    'SELF',
    'SEMI',
    'SET',
    'SHOW',
    'SOME',
    'START',
    'STATISTICS',
    'STRING',
    'SYSTEM',
    'THEN',
    'TIES',
    'TO',
    'TRAN',
    'TRANSACTION',
    'TRIGGER',
    'TRUE',
    'TRUNCATE',
    'UNBOUNDED',
    'UNDER',
    'UNION',
    'UNIQUE',
    'UNKNOWN',
    'UNNEST',
    'UNSET',
    'UPDATE',
    'UPSERT',
    'USE',
    'USER',
    'USING',
    'VALIDATE',
    'VALUE',
    'VALUED',
    'VALUES',
    'VIA',
    'VIEW',
    'WHEN',
    'WHERE',
    'WHILE',
    'WINDOW',
    'WITH',
    'WITHIN',
    'WORK',
    'XOR'
];
const dataTypes = [];
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/plsql/plsql.formatter.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "plsql",
    ()=>plsql
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/expandPhrases.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/lexer/token.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$plsql$2f$plsql$2e$keywords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/plsql/plsql.keywords.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$plsql$2f$plsql$2e$functions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/plsql/plsql.functions.js [app-client] (ecmascript)");
;
;
;
;
const reservedSelect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'SELECT [ALL | DISTINCT | UNIQUE]'
]);
const reservedClauses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    // queries
    'WITH',
    'FROM',
    'WHERE',
    'GROUP BY',
    'HAVING',
    'PARTITION BY',
    'ORDER [SIBLINGS] BY',
    'OFFSET',
    'FETCH {FIRST | NEXT}',
    'FOR UPDATE [OF]',
    // Data manipulation
    // - insert:
    'INSERT [INTO | ALL INTO]',
    'VALUES',
    // - update:
    'SET',
    // - merge:
    'MERGE [INTO]',
    'WHEN [NOT] MATCHED [THEN]',
    'UPDATE SET',
    // other
    'RETURNING'
]);
const standardOnelineClauses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'CREATE [GLOBAL TEMPORARY | PRIVATE TEMPORARY | SHARDED | DUPLICATED | IMMUTABLE BLOCKCHAIN | BLOCKCHAIN | IMMUTABLE] TABLE'
]);
const tabularOnelineClauses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    // - create:
    'CREATE [OR REPLACE] [NO FORCE | FORCE] [EDITIONING | EDITIONABLE | EDITIONABLE EDITIONING | NONEDITIONABLE] VIEW',
    'CREATE MATERIALIZED VIEW',
    // - update:
    'UPDATE [ONLY]',
    // - delete:
    'DELETE FROM [ONLY]',
    // - drop table:
    'DROP TABLE',
    // - alter table:
    'ALTER TABLE',
    'ADD',
    'DROP {COLUMN | UNUSED COLUMNS | COLUMNS CONTINUE}',
    'MODIFY',
    'RENAME TO',
    'RENAME COLUMN',
    // - truncate:
    'TRUNCATE TABLE',
    // other
    'SET SCHEMA',
    'BEGIN',
    'CONNECT BY',
    'DECLARE',
    'EXCEPT',
    'EXCEPTION',
    'LOOP',
    'START WITH'
]);
const reservedSetOperations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'UNION [ALL]',
    'MINUS',
    'INTERSECT'
]);
const reservedJoins = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'JOIN',
    '{LEFT | RIGHT | FULL} [OUTER] JOIN',
    '{INNER | CROSS} JOIN',
    'NATURAL [INNER] JOIN',
    'NATURAL {LEFT | RIGHT | FULL} [OUTER] JOIN',
    // non-standard joins
    '{CROSS | OUTER} APPLY'
]);
const reservedKeywordPhrases = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'ON {UPDATE | DELETE} [SET NULL]',
    'ON COMMIT',
    '{ROWS | RANGE} BETWEEN'
]);
const reservedDataTypePhrases = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([]);
const plsql = {
    name: 'plsql',
    tokenizerOptions: {
        reservedSelect,
        reservedClauses: [
            ...reservedClauses,
            ...standardOnelineClauses,
            ...tabularOnelineClauses
        ],
        reservedSetOperations,
        reservedJoins,
        reservedKeywordPhrases,
        reservedDataTypePhrases,
        supportsXor: true,
        reservedKeywords: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$plsql$2f$plsql$2e$keywords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keywords"],
        reservedDataTypes: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$plsql$2f$plsql$2e$keywords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dataTypes"],
        reservedFunctionNames: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$plsql$2f$plsql$2e$functions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["functions"],
        stringTypes: [
            {
                quote: "''-qq",
                prefixes: [
                    'N'
                ]
            },
            {
                quote: "q''",
                prefixes: [
                    'N'
                ]
            }
        ],
        // PL/SQL doesn't actually support escaping of quotes in identifiers,
        // but for the sake of simpler testing we'll support this anyway
        // as all other SQL dialects with "identifiers" do.
        identTypes: [
            `""-qq`
        ],
        identChars: {
            rest: '$#'
        },
        variableTypes: [
            {
                regex: '&{1,2}[A-Za-z][A-Za-z0-9_$#]*'
            }
        ],
        paramTypes: {
            numbered: [
                ':'
            ],
            named: [
                ':'
            ]
        },
        operators: [
            '**',
            ':=',
            '%',
            '~=',
            '^=',
            // '..', // Conflicts with float followed by dot (so "2..3" gets parsed as ["2.", ".", "3"])
            '>>',
            '<<',
            '=>',
            '@',
            '||'
        ],
        postProcess
    },
    formatOptions: {
        alwaysDenseOperators: [
            '@'
        ],
        onelineClauses: [
            ...standardOnelineClauses,
            ...tabularOnelineClauses
        ],
        tabularOnelineClauses
    }
};
function postProcess(tokens) {
    let previousReservedToken = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EOF_TOKEN"];
    return tokens.map((token)=>{
        // BY [SET]
        if (__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isToken"].SET(token) && __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isToken"].BY(previousReservedToken)) {
            return Object.assign(Object.assign({}, token), {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].RESERVED_KEYWORD
            });
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isReserved"])(token.type)) {
            previousReservedToken = token;
        }
        return token;
    });
}
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/plsql/plsql.functions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "functions",
    ()=>functions
]);
const functions = [
    // https://docs.oracle.com/cd/B19306_01/server.102/b14200/functions001.htm
    // numeric
    'ABS',
    'ACOS',
    'ASIN',
    'ATAN',
    'ATAN2',
    'BITAND',
    'CEIL',
    'COS',
    'COSH',
    'EXP',
    'FLOOR',
    'LN',
    'LOG',
    'MOD',
    'NANVL',
    'POWER',
    'REMAINDER',
    'ROUND',
    'SIGN',
    'SIN',
    'SINH',
    'SQRT',
    'TAN',
    'TANH',
    'TRUNC',
    'WIDTH_BUCKET',
    // character
    'CHR',
    'CONCAT',
    'INITCAP',
    'LOWER',
    'LPAD',
    'LTRIM',
    'NLS_INITCAP',
    'NLS_LOWER',
    'NLSSORT',
    'NLS_UPPER',
    'REGEXP_REPLACE',
    'REGEXP_SUBSTR',
    'REPLACE',
    'RPAD',
    'RTRIM',
    'SOUNDEX',
    'SUBSTR',
    'TRANSLATE',
    'TREAT',
    'TRIM',
    'UPPER',
    'NLS_CHARSET_DECL_LEN',
    'NLS_CHARSET_ID',
    'NLS_CHARSET_NAME',
    'ASCII',
    'INSTR',
    'LENGTH',
    'REGEXP_INSTR',
    // datetime
    'ADD_MONTHS',
    'CURRENT_DATE',
    'CURRENT_TIMESTAMP',
    'DBTIMEZONE',
    'EXTRACT',
    'FROM_TZ',
    'LAST_DAY',
    'LOCALTIMESTAMP',
    'MONTHS_BETWEEN',
    'NEW_TIME',
    'NEXT_DAY',
    'NUMTODSINTERVAL',
    'NUMTOYMINTERVAL',
    'ROUND',
    'SESSIONTIMEZONE',
    'SYS_EXTRACT_UTC',
    'SYSDATE',
    'SYSTIMESTAMP',
    'TO_CHAR',
    'TO_TIMESTAMP',
    'TO_TIMESTAMP_TZ',
    'TO_DSINTERVAL',
    'TO_YMINTERVAL',
    'TRUNC',
    'TZ_OFFSET',
    // comparison
    'GREATEST',
    'LEAST',
    // conversion
    'ASCIISTR',
    'BIN_TO_NUM',
    'CAST',
    'CHARTOROWID',
    'COMPOSE',
    'CONVERT',
    'DECOMPOSE',
    'HEXTORAW',
    'NUMTODSINTERVAL',
    'NUMTOYMINTERVAL',
    'RAWTOHEX',
    'RAWTONHEX',
    'ROWIDTOCHAR',
    'ROWIDTONCHAR',
    'SCN_TO_TIMESTAMP',
    'TIMESTAMP_TO_SCN',
    'TO_BINARY_DOUBLE',
    'TO_BINARY_FLOAT',
    'TO_CHAR',
    'TO_CLOB',
    'TO_DATE',
    'TO_DSINTERVAL',
    'TO_LOB',
    'TO_MULTI_BYTE',
    'TO_NCHAR',
    'TO_NCLOB',
    'TO_NUMBER',
    'TO_DSINTERVAL',
    'TO_SINGLE_BYTE',
    'TO_TIMESTAMP',
    'TO_TIMESTAMP_TZ',
    'TO_YMINTERVAL',
    'TO_YMINTERVAL',
    'TRANSLATE',
    'UNISTR',
    // largeObject
    'BFILENAME',
    'EMPTY_BLOB,',
    'EMPTY_CLOB',
    // collection
    'CARDINALITY',
    'COLLECT',
    'POWERMULTISET',
    'POWERMULTISET_BY_CARDINALITY',
    'SET',
    // hierarchical
    'SYS_CONNECT_BY_PATH',
    // dataMining
    'CLUSTER_ID',
    'CLUSTER_PROBABILITY',
    'CLUSTER_SET',
    'FEATURE_ID',
    'FEATURE_SET',
    'FEATURE_VALUE',
    'PREDICTION',
    'PREDICTION_COST',
    'PREDICTION_DETAILS',
    'PREDICTION_PROBABILITY',
    'PREDICTION_SET',
    // xml
    'APPENDCHILDXML',
    'DELETEXML',
    'DEPTH',
    'EXTRACT',
    'EXISTSNODE',
    'EXTRACTVALUE',
    'INSERTCHILDXML',
    'INSERTXMLBEFORE',
    'PATH',
    'SYS_DBURIGEN',
    'SYS_XMLAGG',
    'SYS_XMLGEN',
    'UPDATEXML',
    'XMLAGG',
    'XMLCDATA',
    'XMLCOLATTVAL',
    'XMLCOMMENT',
    'XMLCONCAT',
    'XMLFOREST',
    'XMLPARSE',
    'XMLPI',
    'XMLQUERY',
    'XMLROOT',
    'XMLSEQUENCE',
    'XMLSERIALIZE',
    'XMLTABLE',
    'XMLTRANSFORM',
    // encoding
    'DECODE',
    'DUMP',
    'ORA_HASH',
    'VSIZE',
    // nullRelated
    'COALESCE',
    'LNNVL',
    'NULLIF',
    'NVL',
    'NVL2',
    // env
    'SYS_CONTEXT',
    'SYS_GUID',
    'SYS_TYPEID',
    'UID',
    'USER',
    'USERENV',
    // aggregate
    'AVG',
    'COLLECT',
    'CORR',
    'CORR_S',
    'CORR_K',
    'COUNT',
    'COVAR_POP',
    'COVAR_SAMP',
    'CUME_DIST',
    'DENSE_RANK',
    'FIRST',
    'GROUP_ID',
    'GROUPING',
    'GROUPING_ID',
    'LAST',
    'MAX',
    'MEDIAN',
    'MIN',
    'PERCENTILE_CONT',
    'PERCENTILE_DISC',
    'PERCENT_RANK',
    'RANK',
    'REGR_SLOPE',
    'REGR_INTERCEPT',
    'REGR_COUNT',
    'REGR_R2',
    'REGR_AVGX',
    'REGR_AVGY',
    'REGR_SXX',
    'REGR_SYY',
    'REGR_SXY',
    'STATS_BINOMIAL_TEST',
    'STATS_CROSSTAB',
    'STATS_F_TEST',
    'STATS_KS_TEST',
    'STATS_MODE',
    'STATS_MW_TEST',
    'STATS_ONE_WAY_ANOVA',
    'STATS_T_TEST_ONE',
    'STATS_T_TEST_PAIRED',
    'STATS_T_TEST_INDEP',
    'STATS_T_TEST_INDEPU',
    'STATS_WSR_TEST',
    'STDDEV',
    'STDDEV_POP',
    'STDDEV_SAMP',
    'SUM',
    'VAR_POP',
    'VAR_SAMP',
    'VARIANCE',
    // Windowing functions (minus the ones already listed in aggregates)
    // window
    'FIRST_VALUE',
    'LAG',
    'LAST_VALUE',
    'LEAD',
    'NTILE',
    'RATIO_TO_REPORT',
    'ROW_NUMBER',
    // objectReference
    'DEREF',
    'MAKE_REF',
    'REF',
    'REFTOHEX',
    'VALUE',
    // model
    'CV',
    'ITERATION_NUMBER',
    'PRESENTNNV',
    'PRESENTV',
    'PREVIOUS'
];
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/plsql/plsql.keywords.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "dataTypes",
    ()=>dataTypes,
    "keywords",
    ()=>keywords
]);
const keywords = [
    // https://docs.oracle.com/cd/B19306_01/appdev.102/b14261/reservewords.htm
    // 'A',
    'ADD',
    'AGENT',
    'AGGREGATE',
    'ALL',
    'ALTER',
    'AND',
    'ANY',
    'ARROW',
    'AS',
    'ASC',
    'AT',
    'ATTRIBUTE',
    'AUTHID',
    'AVG',
    'BEGIN',
    'BETWEEN',
    'BLOCK',
    'BODY',
    'BOTH',
    'BOUND',
    'BULK',
    'BY',
    'BYTE',
    // 'C',
    'CALL',
    'CALLING',
    'CASCADE',
    'CASE',
    'CHARSET',
    'CHARSETFORM',
    'CHARSETID',
    'CHECK',
    'CLOSE',
    'CLUSTER',
    'CLUSTERS',
    'COLAUTH',
    'COLLECT',
    'COLUMNS',
    'COMMENT',
    'COMMIT',
    'COMMITTED',
    'COMPILED',
    'COMPRESS',
    'CONNECT',
    'CONSTANT',
    'CONSTRUCTOR',
    'CONTEXT',
    'CONVERT',
    'COUNT',
    'CRASH',
    'CREATE',
    'CURRENT',
    'CURSOR',
    'CUSTOMDATUM',
    'DANGLING',
    'DATA',
    'DAY',
    'DECLARE',
    'DEFAULT',
    'DEFINE',
    'DELETE',
    'DESC',
    'DETERMINISTIC',
    'DISTINCT',
    'DROP',
    'DURATION',
    'ELEMENT',
    'ELSE',
    'ELSIF',
    'EMPTY',
    'END',
    'ESCAPE',
    'EXCEPT',
    'EXCEPTION',
    'EXCEPTIONS',
    'EXCLUSIVE',
    'EXECUTE',
    'EXISTS',
    'EXIT',
    'EXTERNAL',
    'FETCH',
    'FINAL',
    'FIXED',
    'FOR',
    'FORALL',
    'FORCE',
    'FORM',
    'FROM',
    'FUNCTION',
    'GENERAL',
    'GOTO',
    'GRANT',
    'GROUP',
    'HASH',
    'HAVING',
    'HEAP',
    'HIDDEN',
    'HOUR',
    'IDENTIFIED',
    'IF',
    'IMMEDIATE',
    'IN',
    'INCLUDING',
    'INDEX',
    'INDEXES',
    'INDICATOR',
    'INDICES',
    'INFINITE',
    'INSERT',
    'INSTANTIABLE',
    'INTERFACE',
    'INTERSECT',
    'INTERVAL',
    'INTO',
    'INVALIDATE',
    'IS',
    'ISOLATION',
    'JAVA',
    'LANGUAGE',
    'LARGE',
    'LEADING',
    'LENGTH',
    'LEVEL',
    'LIBRARY',
    'LIKE',
    'LIKE2',
    'LIKE4',
    'LIKEC',
    'LIMIT',
    'LIMITED',
    'LOCAL',
    'LOCK',
    'LOOP',
    'MAP',
    'MAX',
    'MAXLEN',
    'MEMBER',
    'MERGE',
    'MIN',
    'MINUS',
    'MINUTE',
    'MOD',
    'MODE',
    'MODIFY',
    'MONTH',
    'MULTISET',
    'NAME',
    'NAN',
    'NATIONAL',
    'NATIVE',
    'NEW',
    'NOCOMPRESS',
    'NOCOPY',
    'NOT',
    'NOWAIT',
    'NULL',
    'OBJECT',
    'OCICOLL',
    'OCIDATE',
    'OCIDATETIME',
    'OCIDURATION',
    'OCIINTERVAL',
    'OCILOBLOCATOR',
    'OCINUMBER',
    'OCIRAW',
    'OCIREF',
    'OCIREFCURSOR',
    'OCIROWID',
    'OCISTRING',
    'OCITYPE',
    'OF',
    'ON',
    'ONLY',
    'OPAQUE',
    'OPEN',
    'OPERATOR',
    'OPTION',
    'OR',
    'ORACLE',
    'ORADATA',
    'ORDER',
    'OVERLAPS',
    'ORGANIZATION',
    'ORLANY',
    'ORLVARY',
    'OTHERS',
    'OUT',
    'OVERRIDING',
    'PACKAGE',
    'PARALLEL_ENABLE',
    'PARAMETER',
    'PARAMETERS',
    'PARTITION',
    'PASCAL',
    'PIPE',
    'PIPELINED',
    'PRAGMA',
    'PRIOR',
    'PRIVATE',
    'PROCEDURE',
    'PUBLIC',
    'RAISE',
    'RANGE',
    'READ',
    'RECORD',
    'REF',
    'REFERENCE',
    'REM',
    'REMAINDER',
    'RENAME',
    'RESOURCE',
    'RESULT',
    'RETURN',
    'RETURNING',
    'REVERSE',
    'REVOKE',
    'ROLLBACK',
    'ROW',
    'SAMPLE',
    'SAVE',
    'SAVEPOINT',
    'SB1',
    'SB2',
    'SB4',
    'SECOND',
    'SEGMENT',
    'SELECT',
    'SELF',
    'SEPARATE',
    'SEQUENCE',
    'SERIALIZABLE',
    'SET',
    'SHARE',
    'SHORT',
    'SIZE',
    'SIZE_T',
    'SOME',
    'SPARSE',
    'SQL',
    'SQLCODE',
    'SQLDATA',
    'SQLNAME',
    'SQLSTATE',
    'STANDARD',
    'START',
    'STATIC',
    'STDDEV',
    'STORED',
    'STRING',
    'STRUCT',
    'STYLE',
    'SUBMULTISET',
    'SUBPARTITION',
    'SUBSTITUTABLE',
    'SUBTYPE',
    'SUM',
    'SYNONYM',
    'TABAUTH',
    'TABLE',
    'TDO',
    'THE',
    'THEN',
    'TIME',
    'TIMEZONE_ABBR',
    'TIMEZONE_HOUR',
    'TIMEZONE_MINUTE',
    'TIMEZONE_REGION',
    'TO',
    'TRAILING',
    'TRANSAC',
    'TRANSACTIONAL',
    'TRUSTED',
    'TYPE',
    'UB1',
    'UB2',
    'UB4',
    'UNDER',
    'UNION',
    'UNIQUE',
    'UNSIGNED',
    'UNTRUSTED',
    'UPDATE',
    'USE',
    'USING',
    'VALIST',
    'VALUE',
    'VALUES',
    'VARIABLE',
    'VARIANCE',
    'VARRAY',
    'VIEW',
    'VIEWS',
    'VOID',
    'WHEN',
    'WHERE',
    'WHILE',
    'WITH',
    'WORK',
    'WRAPPED',
    'WRITE',
    'YEAR',
    'ZONE'
];
const dataTypes = [
    // https://www.ibm.com/docs/en/db2/10.5?topic=plsql-data-types
    'ARRAY',
    'BFILE_BASE',
    'BINARY',
    'BLOB_BASE',
    'CHAR VARYING',
    'CHAR_BASE',
    'CHAR',
    'CHARACTER VARYING',
    'CHARACTER',
    'CLOB_BASE',
    'DATE_BASE',
    'DATE',
    'DECIMAL',
    'DOUBLE',
    'FLOAT',
    'INT',
    'INTERVAL DAY',
    'INTERVAL YEAR',
    'LONG',
    'NATIONAL CHAR VARYING',
    'NATIONAL CHAR',
    'NATIONAL CHARACTER VARYING',
    'NATIONAL CHARACTER',
    'NCHAR VARYING',
    'NCHAR',
    'NCHAR',
    'NUMBER_BASE',
    'NUMBER',
    'NUMBERIC',
    'NVARCHAR',
    'PRECISION',
    'RAW',
    'TIMESTAMP',
    'UROWID',
    'VARCHAR',
    'VARCHAR2'
];
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/postgresql/postgresql.formatter.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "postgresql",
    ()=>postgresql
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/expandPhrases.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$postgresql$2f$postgresql$2e$functions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/postgresql/postgresql.functions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$postgresql$2f$postgresql$2e$keywords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/postgresql/postgresql.keywords.js [app-client] (ecmascript)");
;
;
;
const reservedSelect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'SELECT [ALL | DISTINCT]'
]);
const reservedClauses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    // queries
    'WITH [RECURSIVE]',
    'FROM',
    'WHERE',
    'GROUP BY [ALL | DISTINCT]',
    'HAVING',
    'WINDOW',
    'PARTITION BY',
    'ORDER BY',
    'LIMIT',
    'OFFSET',
    'FETCH {FIRST | NEXT}',
    'FOR {UPDATE | NO KEY UPDATE | SHARE | KEY SHARE} [OF]',
    // Data manipulation
    // - insert:
    'INSERT INTO',
    'VALUES',
    'DEFAULT VALUES',
    // - update:
    'SET',
    // other
    'RETURNING'
]);
const standardOnelineClauses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'CREATE [GLOBAL | LOCAL] [TEMPORARY | TEMP | UNLOGGED] TABLE [IF NOT EXISTS]'
]);
const tabularOnelineClauses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    // - create
    'CREATE [OR REPLACE] [TEMP | TEMPORARY] [RECURSIVE] VIEW',
    'CREATE [MATERIALIZED] VIEW [IF NOT EXISTS]',
    // - update:
    'UPDATE [ONLY]',
    'WHERE CURRENT OF',
    // - insert:
    'ON CONFLICT',
    // - delete:
    'DELETE FROM [ONLY]',
    // - drop table:
    'DROP TABLE [IF EXISTS]',
    // - alter table:
    'ALTER TABLE [IF EXISTS] [ONLY]',
    'ALTER TABLE ALL IN TABLESPACE',
    'RENAME [COLUMN]',
    'RENAME TO',
    'ADD [COLUMN] [IF NOT EXISTS]',
    'DROP [COLUMN] [IF EXISTS]',
    'ALTER [COLUMN]',
    'SET DATA TYPE',
    '{SET | DROP} DEFAULT',
    '{SET | DROP} NOT NULL',
    // - truncate:
    'TRUNCATE [TABLE] [ONLY]',
    // other
    'SET SCHEMA',
    '{BEFORE | AFTER | INSTEAD OF} {INSERT | UPDATE [OF] | DELETE | TRUNCATE}',
    '[NOT] DEFERRABLE',
    'INITIALLY {DEFERRED | IMMEDIATE}',
    '[NOT] DEFERRABLE INITIALLY {DEFERRED | IMMEDIATE}',
    // https://www.postgresql.org/docs/14/sql-commands.html
    'ABORT',
    'ALTER AGGREGATE',
    'ALTER COLLATION',
    'ALTER CONVERSION',
    'ALTER DATABASE',
    'ALTER DEFAULT PRIVILEGES',
    'ALTER DOMAIN',
    'ALTER EVENT TRIGGER',
    'ALTER EXTENSION',
    'ALTER FOREIGN DATA WRAPPER',
    'ALTER FOREIGN TABLE',
    'ALTER FUNCTION',
    'ALTER GROUP',
    'ALTER INDEX',
    'ALTER LANGUAGE',
    'ALTER LARGE OBJECT',
    'ALTER MATERIALIZED VIEW',
    'ALTER OPERATOR',
    'ALTER OPERATOR CLASS',
    'ALTER OPERATOR FAMILY',
    'ALTER POLICY',
    'ALTER PROCEDURE',
    'ALTER PUBLICATION',
    'ALTER ROLE',
    'ALTER ROUTINE',
    'ALTER RULE',
    'ALTER SCHEMA',
    'ALTER SEQUENCE',
    'ALTER SERVER',
    'ALTER STATISTICS',
    'ALTER SUBSCRIPTION',
    'ALTER SYSTEM',
    'ALTER TABLESPACE',
    'ALTER TEXT SEARCH CONFIGURATION',
    'ALTER TEXT SEARCH DICTIONARY',
    'ALTER TEXT SEARCH PARSER',
    'ALTER TEXT SEARCH TEMPLATE',
    'ALTER TRIGGER',
    'ALTER TYPE',
    'ALTER USER',
    'ALTER USER MAPPING',
    'ALTER VIEW',
    'ANALYZE',
    'BEGIN',
    'CALL',
    'CHECKPOINT',
    'CLOSE',
    'CLUSTER',
    'COMMENT ON',
    'COMMIT',
    'COMMIT PREPARED',
    'COPY',
    'CREATE ACCESS METHOD',
    'CREATE [OR REPLACE] AGGREGATE',
    'CREATE CAST',
    'CREATE COLLATION',
    'CREATE [DEFAULT] CONVERSION',
    'CREATE DATABASE',
    'CREATE DOMAIN',
    'CREATE EVENT TRIGGER',
    'CREATE EXTENSION',
    'CREATE FOREIGN DATA WRAPPER',
    'CREATE FOREIGN TABLE',
    'CREATE [OR REPLACE] FUNCTION',
    'CREATE GROUP',
    'CREATE [UNIQUE] INDEX',
    'CREATE [OR REPLACE] [TRUSTED] [PROCEDURAL] LANGUAGE',
    'CREATE OPERATOR',
    'CREATE OPERATOR CLASS',
    'CREATE OPERATOR FAMILY',
    'CREATE POLICY',
    'CREATE [OR REPLACE] PROCEDURE',
    'CREATE PUBLICATION',
    'CREATE ROLE',
    'CREATE [OR REPLACE] RULE',
    'CREATE SCHEMA [AUTHORIZATION]',
    'CREATE [TEMPORARY | TEMP | UNLOGGED] SEQUENCE',
    'CREATE SERVER',
    'CREATE STATISTICS',
    'CREATE SUBSCRIPTION',
    'CREATE TABLESPACE',
    'CREATE TEXT SEARCH CONFIGURATION',
    'CREATE TEXT SEARCH DICTIONARY',
    'CREATE TEXT SEARCH PARSER',
    'CREATE TEXT SEARCH TEMPLATE',
    'CREATE [OR REPLACE] TRANSFORM',
    'CREATE [OR REPLACE] [CONSTRAINT] TRIGGER',
    'CREATE TYPE',
    'CREATE USER',
    'CREATE USER MAPPING',
    'DEALLOCATE',
    'DECLARE',
    'DISCARD',
    'DROP ACCESS METHOD',
    'DROP AGGREGATE',
    'DROP CAST',
    'DROP COLLATION',
    'DROP CONVERSION',
    'DROP DATABASE',
    'DROP DOMAIN',
    'DROP EVENT TRIGGER',
    'DROP EXTENSION',
    'DROP FOREIGN DATA WRAPPER',
    'DROP FOREIGN TABLE',
    'DROP FUNCTION',
    'DROP GROUP',
    'DROP IDENTITY',
    'DROP INDEX',
    'DROP LANGUAGE',
    'DROP MATERIALIZED VIEW [IF EXISTS]',
    'DROP OPERATOR',
    'DROP OPERATOR CLASS',
    'DROP OPERATOR FAMILY',
    'DROP OWNED',
    'DROP POLICY',
    'DROP PROCEDURE',
    'DROP PUBLICATION',
    'DROP ROLE',
    'DROP ROUTINE',
    'DROP RULE',
    'DROP SCHEMA',
    'DROP SEQUENCE',
    'DROP SERVER',
    'DROP STATISTICS',
    'DROP SUBSCRIPTION',
    'DROP TABLESPACE',
    'DROP TEXT SEARCH CONFIGURATION',
    'DROP TEXT SEARCH DICTIONARY',
    'DROP TEXT SEARCH PARSER',
    'DROP TEXT SEARCH TEMPLATE',
    'DROP TRANSFORM',
    'DROP TRIGGER',
    'DROP TYPE',
    'DROP USER',
    'DROP USER MAPPING',
    'DROP VIEW',
    'EXECUTE [FUNCTION | PROCEDURE]',
    'EXPLAIN',
    'FETCH',
    'GRANT',
    'IMPORT FOREIGN SCHEMA',
    'LISTEN',
    'LOAD',
    'LOCK',
    'MOVE',
    'NOTIFY',
    'OVERRIDING SYSTEM VALUE',
    'PREPARE',
    'PREPARE TRANSACTION',
    'REASSIGN OWNED',
    'REFRESH MATERIALIZED VIEW',
    'REINDEX',
    'RELEASE SAVEPOINT',
    'RESET [ALL|ROLE|SESSION AUTHORIZATION]',
    'REVOKE',
    'ROLLBACK',
    'ROLLBACK PREPARED',
    'ROLLBACK TO SAVEPOINT',
    'SAVEPOINT',
    'SECURITY LABEL',
    'SELECT INTO',
    'SET CONSTRAINTS',
    'SET ROLE',
    'SET SESSION AUTHORIZATION',
    'SET TRANSACTION',
    'SHOW',
    'START TRANSACTION',
    'UNLISTEN',
    'VACUUM'
]);
const reservedSetOperations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'UNION [ALL | DISTINCT]',
    'EXCEPT [ALL | DISTINCT]',
    'INTERSECT [ALL | DISTINCT]'
]);
const reservedJoins = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'JOIN',
    '{LEFT | RIGHT | FULL} [OUTER] JOIN',
    '{INNER | CROSS} JOIN',
    'NATURAL [INNER] JOIN',
    'NATURAL {LEFT | RIGHT | FULL} [OUTER] JOIN'
]);
const reservedKeywordPhrases = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'PRIMARY KEY',
    'GENERATED {ALWAYS | BY DEFAULT} AS IDENTITY',
    'ON {UPDATE | DELETE} [NO ACTION | RESTRICT | CASCADE | SET NULL | SET DEFAULT]',
    'DO {NOTHING | UPDATE}',
    'AS MATERIALIZED',
    'FOR EACH ROW',
    'OR {INSERT | UPDATE [OF] | DELETE | TRUNCATE}',
    '{ROWS | RANGE | GROUPS} BETWEEN',
    // comparison operator
    'IS [NOT] DISTINCT FROM',
    'NULLS {FIRST | LAST}',
    'WITH ORDINALITY'
]);
const reservedDataTypePhrases = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    // https://www.postgresql.org/docs/current/datatype-datetime.html
    '[TIMESTAMP | TIME] {WITH | WITHOUT} TIME ZONE'
]);
const postgresql = {
    name: 'postgresql',
    tokenizerOptions: {
        reservedSelect,
        reservedClauses: [
            ...reservedClauses,
            ...standardOnelineClauses,
            ...tabularOnelineClauses
        ],
        reservedSetOperations,
        reservedJoins,
        reservedKeywordPhrases,
        reservedDataTypePhrases,
        reservedKeywords: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$postgresql$2f$postgresql$2e$keywords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keywords"],
        reservedDataTypes: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$postgresql$2f$postgresql$2e$keywords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dataTypes"],
        reservedFunctionNames: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$postgresql$2f$postgresql$2e$functions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["functions"],
        nestedBlockComments: true,
        // Preserve pg_dump safety guards as opaque lines.
        lineCommentTypes: [
            '--',
            '\\restrict ',
            '\\unrestrict '
        ],
        extraParens: [
            '[]'
        ],
        underscoresInNumbers: true,
        stringTypes: [
            '$$',
            {
                quote: "''-qq",
                prefixes: [
                    'U&'
                ]
            },
            {
                quote: "''-qq-bs",
                prefixes: [
                    'E'
                ],
                requirePrefix: true
            },
            {
                quote: "''-raw",
                prefixes: [
                    'B',
                    'X'
                ],
                requirePrefix: true
            }
        ],
        identTypes: [
            {
                quote: '""-qq',
                prefixes: [
                    'U&'
                ]
            }
        ],
        identChars: {
            rest: '$'
        },
        paramTypes: {
            numbered: [
                '$'
            ]
        },
        operators: [
            // Arithmetic
            '%',
            '^',
            '|/',
            '||/',
            '@',
            // Assignment
            ':=',
            // Bitwise
            '&',
            '|',
            '#',
            '~',
            '<<',
            '>>',
            // Byte comparison
            '~>~',
            '~<~',
            '~>=~',
            '~<=~',
            // Geometric
            '@-@',
            '@@',
            '##',
            '<->',
            '&&',
            '&<',
            '&>',
            '<<|',
            '&<|',
            '|>>',
            '|&>',
            '<^',
            '>^',
            '?#',
            '?-',
            '?|',
            '?-|',
            '?||',
            '@>',
            '<@',
            '<@>',
            '~=',
            // JSON
            '?',
            '@?',
            '?&',
            '->',
            '->>',
            '#>',
            '#>>',
            '#-',
            // Named function params
            '=>',
            // Network address
            '>>=',
            '<<=',
            // Pattern matching
            '~~',
            '~~*',
            '!~~',
            '!~~*',
            // POSIX RegExp
            '~',
            '~*',
            '!~',
            '!~*',
            // Range/multirange
            '-|-',
            // String concatenation
            '||',
            // Text search
            '@@@',
            '!!',
            '^@',
            // Trigram/trigraph
            '<%',
            '%>',
            '<<%',
            '%>>',
            '<<->',
            '<->>',
            '<<<->',
            '<->>>',
            // Cube
            '~>',
            // Hstore
            '#=',
            // Type cast
            '::',
            ':',
            // Custom operators defined by pgvector extension
            // https://github.com/pgvector/pgvector#querying
            '<#>',
            '<=>',
            '<+>',
            '<~>',
            '<%>',
            // Custom operators: from PostGIS extension
            '&&&',
            '|=|'
        ],
        operatorKeyword: true
    },
    formatOptions: {
        alwaysDenseOperators: [
            '::',
            ':'
        ],
        onelineClauses: [
            ...standardOnelineClauses,
            ...tabularOnelineClauses
        ],
        tabularOnelineClauses
    }
};
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/postgresql/postgresql.functions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "functions",
    ()=>functions
]);
const functions = [
    // https://www.postgresql.org/docs/14/functions.html
    //
    // https://www.postgresql.org/docs/14/functions-math.html
    'ABS',
    'ACOS',
    'ACOSD',
    'ACOSH',
    'ASIN',
    'ASIND',
    'ASINH',
    'ATAN',
    'ATAN2',
    'ATAN2D',
    'ATAND',
    'ATANH',
    'CBRT',
    'CEIL',
    'CEILING',
    'COS',
    'COSD',
    'COSH',
    'COT',
    'COTD',
    'DEGREES',
    'DIV',
    'EXP',
    'FACTORIAL',
    'FLOOR',
    'GCD',
    'LCM',
    'LN',
    'LOG',
    'LOG10',
    'MIN_SCALE',
    'MOD',
    'PI',
    'POWER',
    'RADIANS',
    'RANDOM',
    'ROUND',
    'SCALE',
    'SETSEED',
    'SIGN',
    'SIN',
    'SIND',
    'SINH',
    'SQRT',
    'TAN',
    'TAND',
    'TANH',
    'TRIM_SCALE',
    'TRUNC',
    'WIDTH_BUCKET',
    // https://www.postgresql.org/docs/14/functions-string.html
    'ABS',
    'ASCII',
    'BIT_LENGTH',
    'BTRIM',
    'CHARACTER_LENGTH',
    'CHAR_LENGTH',
    'CHR',
    'CONCAT',
    'CONCAT_WS',
    'FORMAT',
    'INITCAP',
    'LEFT',
    'LENGTH',
    'LOWER',
    'LPAD',
    'LTRIM',
    'MD5',
    'NORMALIZE',
    'OCTET_LENGTH',
    'OVERLAY',
    'PARSE_IDENT',
    'PG_CLIENT_ENCODING',
    'POSITION',
    'QUOTE_IDENT',
    'QUOTE_LITERAL',
    'QUOTE_NULLABLE',
    'REGEXP_MATCH',
    'REGEXP_MATCHES',
    'REGEXP_REPLACE',
    'REGEXP_SPLIT_TO_ARRAY',
    'REGEXP_SPLIT_TO_TABLE',
    'REPEAT',
    'REPLACE',
    'REVERSE',
    'RIGHT',
    'RPAD',
    'RTRIM',
    'SPLIT_PART',
    'SPRINTF',
    'STARTS_WITH',
    'STRING_AGG',
    'STRING_TO_ARRAY',
    'STRING_TO_TABLE',
    'STRPOS',
    'SUBSTR',
    'SUBSTRING',
    'TO_ASCII',
    'TO_HEX',
    'TRANSLATE',
    'TRIM',
    'UNISTR',
    'UPPER',
    // https://www.postgresql.org/docs/14/functions-binarystring.html
    'BIT_COUNT',
    'BIT_LENGTH',
    'BTRIM',
    'CONVERT',
    'CONVERT_FROM',
    'CONVERT_TO',
    'DECODE',
    'ENCODE',
    'GET_BIT',
    'GET_BYTE',
    'LENGTH',
    'LTRIM',
    'MD5',
    'OCTET_LENGTH',
    'OVERLAY',
    'POSITION',
    'RTRIM',
    'SET_BIT',
    'SET_BYTE',
    'SHA224',
    'SHA256',
    'SHA384',
    'SHA512',
    'STRING_AGG',
    'SUBSTR',
    'SUBSTRING',
    'TRIM',
    // https://www.postgresql.org/docs/14/functions-bitstring.html
    'BIT_COUNT',
    'BIT_LENGTH',
    'GET_BIT',
    'LENGTH',
    'OCTET_LENGTH',
    'OVERLAY',
    'POSITION',
    'SET_BIT',
    'SUBSTRING',
    // https://www.postgresql.org/docs/14/functions-matching.html
    'REGEXP_MATCH',
    'REGEXP_MATCHES',
    'REGEXP_REPLACE',
    'REGEXP_SPLIT_TO_ARRAY',
    'REGEXP_SPLIT_TO_TABLE',
    // https://www.postgresql.org/docs/14/functions-formatting.html
    'TO_CHAR',
    'TO_DATE',
    'TO_NUMBER',
    'TO_TIMESTAMP',
    // https://www.postgresql.org/docs/14/functions-datetime.html
    // 'AGE',
    'CLOCK_TIMESTAMP',
    'CURRENT_DATE',
    'CURRENT_TIME',
    'CURRENT_TIMESTAMP',
    'DATE_BIN',
    'DATE_PART',
    'DATE_TRUNC',
    'EXTRACT',
    'ISFINITE',
    'JUSTIFY_DAYS',
    'JUSTIFY_HOURS',
    'JUSTIFY_INTERVAL',
    'LOCALTIME',
    'LOCALTIMESTAMP',
    'MAKE_DATE',
    'MAKE_INTERVAL',
    'MAKE_TIME',
    'MAKE_TIMESTAMP',
    'MAKE_TIMESTAMPTZ',
    'NOW',
    'PG_SLEEP',
    'PG_SLEEP_FOR',
    'PG_SLEEP_UNTIL',
    'STATEMENT_TIMESTAMP',
    'TIMEOFDAY',
    'TO_TIMESTAMP',
    'TRANSACTION_TIMESTAMP',
    // https://www.postgresql.org/docs/14/functions-enum.html
    'ENUM_FIRST',
    'ENUM_LAST',
    'ENUM_RANGE',
    // https://www.postgresql.org/docs/14/functions-geometry.html
    'AREA',
    'BOUND_BOX',
    'BOX',
    'CENTER',
    'CIRCLE',
    'DIAGONAL',
    'DIAMETER',
    'HEIGHT',
    'ISCLOSED',
    'ISOPEN',
    'LENGTH',
    'LINE',
    'LSEG',
    'NPOINTS',
    'PATH',
    'PCLOSE',
    'POINT',
    'POLYGON',
    'POPEN',
    'RADIUS',
    'SLOPE',
    'WIDTH',
    // https://www.postgresql.org/docs/14/functions-net.html
    'ABBREV',
    'BROADCAST',
    'FAMILY',
    'HOST',
    'HOSTMASK',
    'INET_MERGE',
    'INET_SAME_FAMILY',
    'MACADDR8_SET7BIT',
    'MASKLEN',
    'NETMASK',
    'NETWORK',
    'SET_MASKLEN',
    // 'TEXT', // excluded because it's also a data type name
    'TRUNC',
    // https://www.postgresql.org/docs/14/functions-textsearch.html
    'ARRAY_TO_TSVECTOR',
    'GET_CURRENT_TS_CONFIG',
    'JSONB_TO_TSVECTOR',
    'JSON_TO_TSVECTOR',
    'LENGTH',
    'NUMNODE',
    'PHRASETO_TSQUERY',
    'PLAINTO_TSQUERY',
    'QUERYTREE',
    'SETWEIGHT',
    'STRIP',
    'TO_TSQUERY',
    'TO_TSVECTOR',
    'TSQUERY_PHRASE',
    'TSVECTOR_TO_ARRAY',
    'TS_DEBUG',
    'TS_DELETE',
    'TS_FILTER',
    'TS_HEADLINE',
    'TS_LEXIZE',
    'TS_PARSE',
    'TS_RANK',
    'TS_RANK_CD',
    'TS_REWRITE',
    'TS_STAT',
    'TS_TOKEN_TYPE',
    'WEBSEARCH_TO_TSQUERY',
    // https://www.postgresql.org/docs/18/functions-uuid.html
    'GEN_RANDOM_UUID',
    'UUIDV4',
    'UUIDV7',
    'UUID_EXTRACT_TIMESTAMP',
    'UUID_EXTRACT_VERSION',
    // https://www.postgresql.org/docs/14/functions-xml.html
    'CURSOR_TO_XML',
    'CURSOR_TO_XMLSCHEMA',
    'DATABASE_TO_XML',
    'DATABASE_TO_XMLSCHEMA',
    'DATABASE_TO_XML_AND_XMLSCHEMA',
    'NEXTVAL',
    'QUERY_TO_XML',
    'QUERY_TO_XMLSCHEMA',
    'QUERY_TO_XML_AND_XMLSCHEMA',
    'SCHEMA_TO_XML',
    'SCHEMA_TO_XMLSCHEMA',
    'SCHEMA_TO_XML_AND_XMLSCHEMA',
    'STRING',
    'TABLE_TO_XML',
    'TABLE_TO_XMLSCHEMA',
    'TABLE_TO_XML_AND_XMLSCHEMA',
    'XMLAGG',
    'XMLCOMMENT',
    'XMLCONCAT',
    'XMLELEMENT',
    'XMLEXISTS',
    'XMLFOREST',
    'XMLPARSE',
    'XMLPI',
    'XMLROOT',
    'XMLSERIALIZE',
    'XMLTABLE',
    'XML_IS_WELL_FORMED',
    'XML_IS_WELL_FORMED_CONTENT',
    'XML_IS_WELL_FORMED_DOCUMENT',
    'XPATH',
    'XPATH_EXISTS',
    // https://www.postgresql.org/docs/14/functions-json.html
    'ARRAY_TO_JSON',
    'JSONB_AGG',
    'JSONB_ARRAY_ELEMENTS',
    'JSONB_ARRAY_ELEMENTS_TEXT',
    'JSONB_ARRAY_LENGTH',
    'JSONB_BUILD_ARRAY',
    'JSONB_BUILD_OBJECT',
    'JSONB_EACH',
    'JSONB_EACH_TEXT',
    'JSONB_EXTRACT_PATH',
    'JSONB_EXTRACT_PATH_TEXT',
    'JSONB_INSERT',
    'JSONB_OBJECT',
    'JSONB_OBJECT_AGG',
    'JSONB_OBJECT_KEYS',
    'JSONB_PATH_EXISTS',
    'JSONB_PATH_EXISTS_TZ',
    'JSONB_PATH_MATCH',
    'JSONB_PATH_MATCH_TZ',
    'JSONB_PATH_QUERY',
    'JSONB_PATH_QUERY_ARRAY',
    'JSONB_PATH_QUERY_ARRAY_TZ',
    'JSONB_PATH_QUERY_FIRST',
    'JSONB_PATH_QUERY_FIRST_TZ',
    'JSONB_PATH_QUERY_TZ',
    'JSONB_POPULATE_RECORD',
    'JSONB_POPULATE_RECORDSET',
    'JSONB_PRETTY',
    'JSONB_SET',
    'JSONB_SET_LAX',
    'JSONB_STRIP_NULLS',
    'JSONB_TO_RECORD',
    'JSONB_TO_RECORDSET',
    'JSONB_TYPEOF',
    'JSON_AGG',
    'JSON_ARRAY_ELEMENTS',
    'JSON_ARRAY_ELEMENTS_TEXT',
    'JSON_ARRAY_LENGTH',
    'JSON_BUILD_ARRAY',
    'JSON_BUILD_OBJECT',
    'JSON_EACH',
    'JSON_EACH_TEXT',
    'JSON_EXTRACT_PATH',
    'JSON_EXTRACT_PATH_TEXT',
    'JSON_OBJECT',
    'JSON_OBJECT_AGG',
    'JSON_OBJECT_KEYS',
    'JSON_POPULATE_RECORD',
    'JSON_POPULATE_RECORDSET',
    'JSON_STRIP_NULLS',
    'JSON_TO_RECORD',
    'JSON_TO_RECORDSET',
    'JSON_TYPEOF',
    'ROW_TO_JSON',
    'TO_JSON',
    'TO_JSONB',
    'TO_TIMESTAMP',
    // https://www.postgresql.org/docs/14/functions-sequence.html
    'CURRVAL',
    'LASTVAL',
    'NEXTVAL',
    'SETVAL',
    // https://www.postgresql.org/docs/14/functions-conditional.html
    // 'CASE',
    'COALESCE',
    'GREATEST',
    'LEAST',
    'NULLIF',
    // https://www.postgresql.org/docs/14/functions-array.html
    'ARRAY_AGG',
    'ARRAY_APPEND',
    'ARRAY_CAT',
    'ARRAY_DIMS',
    'ARRAY_FILL',
    'ARRAY_LENGTH',
    'ARRAY_LOWER',
    'ARRAY_NDIMS',
    'ARRAY_POSITION',
    'ARRAY_POSITIONS',
    'ARRAY_PREPEND',
    'ARRAY_REMOVE',
    'ARRAY_REPLACE',
    'ARRAY_TO_STRING',
    'ARRAY_UPPER',
    'CARDINALITY',
    'STRING_TO_ARRAY',
    'TRIM_ARRAY',
    'UNNEST',
    // https://www.postgresql.org/docs/14/functions-range.html
    'ISEMPTY',
    'LOWER',
    'LOWER_INC',
    'LOWER_INF',
    'MULTIRANGE',
    'RANGE_MERGE',
    'UPPER',
    'UPPER_INC',
    'UPPER_INF',
    // https://www.postgresql.org/docs/14/functions-aggregate.html
    // 'ANY',
    'ARRAY_AGG',
    'AVG',
    'BIT_AND',
    'BIT_OR',
    'BIT_XOR',
    'BOOL_AND',
    'BOOL_OR',
    'COALESCE',
    'CORR',
    'COUNT',
    'COVAR_POP',
    'COVAR_SAMP',
    'CUME_DIST',
    'DENSE_RANK',
    'EVERY',
    'GROUPING',
    'JSONB_AGG',
    'JSONB_OBJECT_AGG',
    'JSON_AGG',
    'JSON_OBJECT_AGG',
    'MAX',
    'MIN',
    'MODE',
    'PERCENTILE_CONT',
    'PERCENTILE_DISC',
    'PERCENT_RANK',
    'RANGE_AGG',
    'RANGE_INTERSECT_AGG',
    'RANK',
    'REGR_AVGX',
    'REGR_AVGY',
    'REGR_COUNT',
    'REGR_INTERCEPT',
    'REGR_R2',
    'REGR_SLOPE',
    'REGR_SXX',
    'REGR_SXY',
    'REGR_SYY',
    // 'SOME',
    'STDDEV',
    'STDDEV_POP',
    'STDDEV_SAMP',
    'STRING_AGG',
    'SUM',
    'TO_JSON',
    'TO_JSONB',
    'VARIANCE',
    'VAR_POP',
    'VAR_SAMP',
    'XMLAGG',
    // https://www.postgresql.org/docs/14/functions-window.html
    'CUME_DIST',
    'DENSE_RANK',
    'FIRST_VALUE',
    'LAG',
    'LAST_VALUE',
    'LEAD',
    'NTH_VALUE',
    'NTILE',
    'PERCENT_RANK',
    'RANK',
    'ROW_NUMBER',
    // https://www.postgresql.org/docs/14/functions-srf.html
    'GENERATE_SERIES',
    'GENERATE_SUBSCRIPTS',
    // https://www.postgresql.org/docs/14/functions-info.html
    'ACLDEFAULT',
    'ACLEXPLODE',
    'COL_DESCRIPTION',
    'CURRENT_CATALOG',
    'CURRENT_DATABASE',
    'CURRENT_QUERY',
    'CURRENT_ROLE',
    'CURRENT_SCHEMA',
    'CURRENT_SCHEMAS',
    'CURRENT_USER',
    'FORMAT_TYPE',
    'HAS_ANY_COLUMN_PRIVILEGE',
    'HAS_COLUMN_PRIVILEGE',
    'HAS_DATABASE_PRIVILEGE',
    'HAS_FOREIGN_DATA_WRAPPER_PRIVILEGE',
    'HAS_FUNCTION_PRIVILEGE',
    'HAS_LANGUAGE_PRIVILEGE',
    'HAS_SCHEMA_PRIVILEGE',
    'HAS_SEQUENCE_PRIVILEGE',
    'HAS_SERVER_PRIVILEGE',
    'HAS_TABLESPACE_PRIVILEGE',
    'HAS_TABLE_PRIVILEGE',
    'HAS_TYPE_PRIVILEGE',
    'INET_CLIENT_ADDR',
    'INET_CLIENT_PORT',
    'INET_SERVER_ADDR',
    'INET_SERVER_PORT',
    'MAKEACLITEM',
    'OBJ_DESCRIPTION',
    'PG_BACKEND_PID',
    'PG_BLOCKING_PIDS',
    'PG_COLLATION_IS_VISIBLE',
    'PG_CONF_LOAD_TIME',
    'PG_CONTROL_CHECKPOINT',
    'PG_CONTROL_INIT',
    'PG_CONTROL_SYSTEM',
    'PG_CONVERSION_IS_VISIBLE',
    'PG_CURRENT_LOGFILE',
    'PG_CURRENT_SNAPSHOT',
    'PG_CURRENT_XACT_ID',
    'PG_CURRENT_XACT_ID_IF_ASSIGNED',
    'PG_DESCRIBE_OBJECT',
    'PG_FUNCTION_IS_VISIBLE',
    'PG_GET_CATALOG_FOREIGN_KEYS',
    'PG_GET_CONSTRAINTDEF',
    'PG_GET_EXPR',
    'PG_GET_FUNCTIONDEF',
    'PG_GET_FUNCTION_ARGUMENTS',
    'PG_GET_FUNCTION_IDENTITY_ARGUMENTS',
    'PG_GET_FUNCTION_RESULT',
    'PG_GET_INDEXDEF',
    'PG_GET_KEYWORDS',
    'PG_GET_OBJECT_ADDRESS',
    'PG_GET_OWNED_SEQUENCE',
    'PG_GET_RULEDEF',
    'PG_GET_SERIAL_SEQUENCE',
    'PG_GET_STATISTICSOBJDEF',
    'PG_GET_TRIGGERDEF',
    'PG_GET_USERBYID',
    'PG_GET_VIEWDEF',
    'PG_HAS_ROLE',
    'PG_IDENTIFY_OBJECT',
    'PG_IDENTIFY_OBJECT_AS_ADDRESS',
    'PG_INDEXAM_HAS_PROPERTY',
    'PG_INDEX_COLUMN_HAS_PROPERTY',
    'PG_INDEX_HAS_PROPERTY',
    'PG_IS_OTHER_TEMP_SCHEMA',
    'PG_JIT_AVAILABLE',
    'PG_LAST_COMMITTED_XACT',
    'PG_LISTENING_CHANNELS',
    'PG_MY_TEMP_SCHEMA',
    'PG_NOTIFICATION_QUEUE_USAGE',
    'PG_OPCLASS_IS_VISIBLE',
    'PG_OPERATOR_IS_VISIBLE',
    'PG_OPFAMILY_IS_VISIBLE',
    'PG_OPTIONS_TO_TABLE',
    'PG_POSTMASTER_START_TIME',
    'PG_SAFE_SNAPSHOT_BLOCKING_PIDS',
    'PG_SNAPSHOT_XIP',
    'PG_SNAPSHOT_XMAX',
    'PG_SNAPSHOT_XMIN',
    'PG_STATISTICS_OBJ_IS_VISIBLE',
    'PG_TABLESPACE_DATABASES',
    'PG_TABLESPACE_LOCATION',
    'PG_TABLE_IS_VISIBLE',
    'PG_TRIGGER_DEPTH',
    'PG_TS_CONFIG_IS_VISIBLE',
    'PG_TS_DICT_IS_VISIBLE',
    'PG_TS_PARSER_IS_VISIBLE',
    'PG_TS_TEMPLATE_IS_VISIBLE',
    'PG_TYPEOF',
    'PG_TYPE_IS_VISIBLE',
    'PG_VISIBLE_IN_SNAPSHOT',
    'PG_XACT_COMMIT_TIMESTAMP',
    'PG_XACT_COMMIT_TIMESTAMP_ORIGIN',
    'PG_XACT_STATUS',
    'PQSERVERVERSION',
    'ROW_SECURITY_ACTIVE',
    'SESSION_USER',
    'SHOBJ_DESCRIPTION',
    'TO_REGCLASS',
    'TO_REGCOLLATION',
    'TO_REGNAMESPACE',
    'TO_REGOPER',
    'TO_REGOPERATOR',
    'TO_REGPROC',
    'TO_REGPROCEDURE',
    'TO_REGROLE',
    'TO_REGTYPE',
    'TXID_CURRENT',
    'TXID_CURRENT_IF_ASSIGNED',
    'TXID_CURRENT_SNAPSHOT',
    'TXID_SNAPSHOT_XIP',
    'TXID_SNAPSHOT_XMAX',
    'TXID_SNAPSHOT_XMIN',
    'TXID_STATUS',
    'TXID_VISIBLE_IN_SNAPSHOT',
    'USER',
    'VERSION',
    // https://www.postgresql.org/docs/14/functions-admin.html
    'BRIN_DESUMMARIZE_RANGE',
    'BRIN_SUMMARIZE_NEW_VALUES',
    'BRIN_SUMMARIZE_RANGE',
    'CONVERT_FROM',
    'CURRENT_SETTING',
    'GIN_CLEAN_PENDING_LIST',
    'PG_ADVISORY_LOCK',
    'PG_ADVISORY_LOCK_SHARED',
    'PG_ADVISORY_UNLOCK',
    'PG_ADVISORY_UNLOCK_ALL',
    'PG_ADVISORY_UNLOCK_SHARED',
    'PG_ADVISORY_XACT_LOCK',
    'PG_ADVISORY_XACT_LOCK_SHARED',
    'PG_BACKUP_START_TIME',
    'PG_CANCEL_BACKEND',
    'PG_COLLATION_ACTUAL_VERSION',
    'PG_COLUMN_COMPRESSION',
    'PG_COLUMN_SIZE',
    'PG_COPY_LOGICAL_REPLICATION_SLOT',
    'PG_COPY_PHYSICAL_REPLICATION_SLOT',
    'PG_CREATE_LOGICAL_REPLICATION_SLOT',
    'PG_CREATE_PHYSICAL_REPLICATION_SLOT',
    'PG_CREATE_RESTORE_POINT',
    'PG_CURRENT_WAL_FLUSH_LSN',
    'PG_CURRENT_WAL_INSERT_LSN',
    'PG_CURRENT_WAL_LSN',
    'PG_DATABASE_SIZE',
    'PG_DROP_REPLICATION_SLOT',
    'PG_EXPORT_SNAPSHOT',
    'PG_FILENODE_RELATION',
    'PG_GET_WAL_REPLAY_PAUSE_STATE',
    'PG_IMPORT_SYSTEM_COLLATIONS',
    'PG_INDEXES_SIZE',
    'PG_IS_IN_BACKUP',
    'PG_IS_IN_RECOVERY',
    'PG_IS_WAL_REPLAY_PAUSED',
    'PG_LAST_WAL_RECEIVE_LSN',
    'PG_LAST_WAL_REPLAY_LSN',
    'PG_LAST_XACT_REPLAY_TIMESTAMP',
    'PG_LOGICAL_EMIT_MESSAGE',
    'PG_LOGICAL_SLOT_GET_BINARY_CHANGES',
    'PG_LOGICAL_SLOT_GET_CHANGES',
    'PG_LOGICAL_SLOT_PEEK_BINARY_CHANGES',
    'PG_LOGICAL_SLOT_PEEK_CHANGES',
    'PG_LOG_BACKEND_MEMORY_CONTEXTS',
    'PG_LS_ARCHIVE_STATUSDIR',
    'PG_LS_DIR',
    'PG_LS_LOGDIR',
    'PG_LS_TMPDIR',
    'PG_LS_WALDIR',
    'PG_PARTITION_ANCESTORS',
    'PG_PARTITION_ROOT',
    'PG_PARTITION_TREE',
    'PG_PROMOTE',
    'PG_READ_BINARY_FILE',
    'PG_READ_FILE',
    'PG_RELATION_FILENODE',
    'PG_RELATION_FILEPATH',
    'PG_RELATION_SIZE',
    'PG_RELOAD_CONF',
    'PG_REPLICATION_ORIGIN_ADVANCE',
    'PG_REPLICATION_ORIGIN_CREATE',
    'PG_REPLICATION_ORIGIN_DROP',
    'PG_REPLICATION_ORIGIN_OID',
    'PG_REPLICATION_ORIGIN_PROGRESS',
    'PG_REPLICATION_ORIGIN_SESSION_IS_SETUP',
    'PG_REPLICATION_ORIGIN_SESSION_PROGRESS',
    'PG_REPLICATION_ORIGIN_SESSION_RESET',
    'PG_REPLICATION_ORIGIN_SESSION_SETUP',
    'PG_REPLICATION_ORIGIN_XACT_RESET',
    'PG_REPLICATION_ORIGIN_XACT_SETUP',
    'PG_REPLICATION_SLOT_ADVANCE',
    'PG_ROTATE_LOGFILE',
    'PG_SIZE_BYTES',
    'PG_SIZE_PRETTY',
    'PG_START_BACKUP',
    'PG_STAT_FILE',
    'PG_STOP_BACKUP',
    'PG_SWITCH_WAL',
    'PG_TABLESPACE_SIZE',
    'PG_TABLE_SIZE',
    'PG_TERMINATE_BACKEND',
    'PG_TOTAL_RELATION_SIZE',
    'PG_TRY_ADVISORY_LOCK',
    'PG_TRY_ADVISORY_LOCK_SHARED',
    'PG_TRY_ADVISORY_XACT_LOCK',
    'PG_TRY_ADVISORY_XACT_LOCK_SHARED',
    'PG_WALFILE_NAME',
    'PG_WALFILE_NAME_OFFSET',
    'PG_WAL_LSN_DIFF',
    'PG_WAL_REPLAY_PAUSE',
    'PG_WAL_REPLAY_RESUME',
    'SET_CONFIG',
    // https://www.postgresql.org/docs/14/functions-trigger.html
    'SUPPRESS_REDUNDANT_UPDATES_TRIGGER',
    'TSVECTOR_UPDATE_TRIGGER',
    'TSVECTOR_UPDATE_TRIGGER_COLUMN',
    // https://www.postgresql.org/docs/14/functions-event-triggers.html
    'PG_EVENT_TRIGGER_DDL_COMMANDS',
    'PG_EVENT_TRIGGER_DROPPED_OBJECTS',
    'PG_EVENT_TRIGGER_TABLE_REWRITE_OID',
    'PG_EVENT_TRIGGER_TABLE_REWRITE_REASON',
    'PG_GET_OBJECT_ADDRESS',
    // https://www.postgresql.org/docs/14/functions-statistics.html
    'PG_MCV_LIST_ITEMS',
    // cast
    'CAST'
];
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/postgresql/postgresql.keywords.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "dataTypes",
    ()=>dataTypes,
    "keywords",
    ()=>keywords
]);
const keywords = [
    // https://www.postgresql.org/docs/14/sql-keywords-appendix.html
    'ALL',
    'ANALYSE',
    'ANALYZE',
    'AND',
    'ANY',
    'AS',
    'ASC',
    'ASYMMETRIC',
    'AUTHORIZATION',
    'BETWEEN',
    'BINARY',
    'BOTH',
    'CASE',
    'CAST',
    'CHECK',
    'COLLATE',
    'COLLATION',
    'COLUMN',
    'CONCURRENTLY',
    'CONSTRAINT',
    'CREATE',
    'CROSS',
    'CURRENT_CATALOG',
    'CURRENT_DATE',
    'CURRENT_ROLE',
    'CURRENT_SCHEMA',
    'CURRENT_TIME',
    'CURRENT_TIMESTAMP',
    'CURRENT_USER',
    'DAY',
    'DEFAULT',
    'DEFERRABLE',
    'DESC',
    'DISTINCT',
    'DO',
    'ELSE',
    'END',
    'EXCEPT',
    'EXISTS',
    'FALSE',
    'FETCH',
    'FILTER',
    'FOR',
    'FOREIGN',
    'FREEZE',
    'FROM',
    'FULL',
    'GRANT',
    'GROUP',
    'HAVING',
    'HOUR',
    'ILIKE',
    'IN',
    'INITIALLY',
    'INNER',
    'INOUT',
    'INTERSECT',
    'INTO',
    'IS',
    'ISNULL',
    'JOIN',
    'LATERAL',
    'LEADING',
    'LEFT',
    'LIKE',
    'LIMIT',
    'LOCALTIME',
    'LOCALTIMESTAMP',
    'MINUTE',
    'MONTH',
    'NATURAL',
    'NOT',
    'NOTNULL',
    'NULL',
    'NULLIF',
    'OFFSET',
    'ON',
    'ONLY',
    'OR',
    'ORDER',
    'OUT',
    'OUTER',
    'OVER',
    'OVERLAPS',
    'PLACING',
    'PRIMARY',
    'REFERENCES',
    'RETURNING',
    'RIGHT',
    'ROW',
    'SECOND',
    'SELECT',
    'SESSION_USER',
    'SIMILAR',
    'SOME',
    'SYMMETRIC',
    'TABLE',
    'TABLESAMPLE',
    'THEN',
    'TO',
    'TRAILING',
    'TRUE',
    'UNION',
    'UNIQUE',
    'USER',
    'USING',
    'VALUES',
    'VARIADIC',
    'VERBOSE',
    'WHEN',
    'WHERE',
    'WINDOW',
    'WITH',
    'WITHIN',
    'WITHOUT',
    'YEAR'
];
const dataTypes = [
    // https://www.postgresql.org/docs/current/datatype.html
    'ARRAY',
    'BIGINT',
    'BIT',
    'BIT VARYING',
    'BOOL',
    'BOOLEAN',
    'CHAR',
    'CHARACTER',
    'CHARACTER VARYING',
    'DECIMAL',
    'DEC',
    'DOUBLE',
    'ENUM',
    'FLOAT',
    'INT',
    'INTEGER',
    'INTERVAL',
    'NCHAR',
    'NUMERIC',
    'JSON',
    'JSONB',
    'PRECISION',
    'REAL',
    'SMALLINT',
    'TEXT',
    'TIME',
    'TIMESTAMP',
    'TIMESTAMPTZ',
    'UUID',
    'VARCHAR',
    'XML',
    'ZONE'
];
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/redshift/redshift.formatter.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "redshift",
    ()=>redshift
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/expandPhrases.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$redshift$2f$redshift$2e$functions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/redshift/redshift.functions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$redshift$2f$redshift$2e$keywords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/redshift/redshift.keywords.js [app-client] (ecmascript)");
;
;
;
const reservedSelect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'SELECT [ALL | DISTINCT]'
]);
const reservedClauses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    // queries
    'WITH [RECURSIVE]',
    'FROM',
    'WHERE',
    'GROUP BY',
    'HAVING',
    'QUALIFY',
    'PARTITION BY',
    'ORDER BY',
    'LIMIT',
    'OFFSET',
    // Data manipulation
    // - insert:
    'INSERT INTO',
    'VALUES',
    // - update:
    'SET'
]);
const standardOnelineClauses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'CREATE [TEMPORARY | TEMP | LOCAL TEMPORARY | LOCAL TEMP] TABLE [IF NOT EXISTS]'
]);
const tabularOnelineClauses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    // - create:
    'CREATE [OR REPLACE | MATERIALIZED] VIEW',
    // - update:
    'UPDATE',
    // - delete:
    'DELETE [FROM]',
    // - drop table:
    'DROP TABLE [IF EXISTS]',
    // - alter table:
    'ALTER TABLE',
    'ALTER TABLE APPEND',
    'ADD [COLUMN]',
    'DROP [COLUMN]',
    'RENAME TO',
    'RENAME COLUMN',
    'ALTER COLUMN',
    'TYPE',
    'ENCODE',
    // - truncate:
    'TRUNCATE [TABLE]',
    // https://docs.aws.amazon.com/redshift/latest/dg/c_SQL_commands.html
    'ABORT',
    'ALTER DATABASE',
    'ALTER DATASHARE',
    'ALTER DEFAULT PRIVILEGES',
    'ALTER GROUP',
    'ALTER MATERIALIZED VIEW',
    'ALTER PROCEDURE',
    'ALTER SCHEMA',
    'ALTER USER',
    'ANALYSE',
    'ANALYZE',
    'ANALYSE COMPRESSION',
    'ANALYZE COMPRESSION',
    'BEGIN',
    'CALL',
    'CANCEL',
    'CLOSE',
    'COMMIT',
    'COPY',
    'CREATE DATABASE',
    'CREATE DATASHARE',
    'CREATE EXTERNAL FUNCTION',
    'CREATE EXTERNAL SCHEMA',
    'CREATE EXTERNAL TABLE',
    'CREATE FUNCTION',
    'CREATE GROUP',
    'CREATE LIBRARY',
    'CREATE MODEL',
    'CREATE PROCEDURE',
    'CREATE SCHEMA',
    'CREATE USER',
    'DEALLOCATE',
    'DECLARE',
    'DESC DATASHARE',
    'DROP DATABASE',
    'DROP DATASHARE',
    'DROP FUNCTION',
    'DROP GROUP',
    'DROP LIBRARY',
    'DROP MODEL',
    'DROP MATERIALIZED VIEW',
    'DROP PROCEDURE',
    'DROP SCHEMA',
    'DROP USER',
    'DROP VIEW',
    'DROP',
    'EXECUTE',
    'EXPLAIN',
    'FETCH',
    'GRANT',
    'LOCK',
    'PREPARE',
    'REFRESH MATERIALIZED VIEW',
    'RESET',
    'REVOKE',
    'ROLLBACK',
    'SELECT INTO',
    'SET SESSION AUTHORIZATION',
    'SET SESSION CHARACTERISTICS',
    'SHOW',
    'SHOW EXTERNAL TABLE',
    'SHOW MODEL',
    'SHOW DATASHARES',
    'SHOW PROCEDURE',
    'SHOW TABLE',
    'SHOW VIEW',
    'START TRANSACTION',
    'UNLOAD',
    'VACUUM'
]);
const reservedSetOperations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'UNION [ALL]',
    'EXCEPT',
    'INTERSECT',
    'MINUS'
]);
const reservedJoins = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'JOIN',
    '{LEFT | RIGHT | FULL} [OUTER] JOIN',
    '{INNER | CROSS} JOIN',
    'NATURAL [INNER] JOIN',
    'NATURAL {LEFT | RIGHT | FULL} [OUTER] JOIN'
]);
const reservedKeywordPhrases = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    // https://docs.aws.amazon.com/redshift/latest/dg/copy-parameters-data-conversion.html
    'NULL AS',
    // https://docs.aws.amazon.com/redshift/latest/dg/r_CREATE_EXTERNAL_SCHEMA.html
    'DATA CATALOG',
    'HIVE METASTORE',
    // in window specifications
    '{ROWS | RANGE} BETWEEN'
]);
const reservedDataTypePhrases = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([]);
const redshift = {
    name: 'redshift',
    tokenizerOptions: {
        reservedSelect,
        reservedClauses: [
            ...reservedClauses,
            ...standardOnelineClauses,
            ...tabularOnelineClauses
        ],
        reservedSetOperations,
        reservedJoins,
        reservedKeywordPhrases,
        reservedDataTypePhrases,
        reservedKeywords: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$redshift$2f$redshift$2e$keywords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keywords"],
        reservedDataTypes: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$redshift$2f$redshift$2e$keywords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dataTypes"],
        reservedFunctionNames: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$redshift$2f$redshift$2e$functions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["functions"],
        extraParens: [
            '[]'
        ],
        stringTypes: [
            "''-qq"
        ],
        identTypes: [
            `""-qq`
        ],
        identChars: {
            first: '#'
        },
        paramTypes: {
            numbered: [
                '$'
            ]
        },
        operators: [
            '^',
            '%',
            '@',
            '|/',
            '||/',
            '&',
            '|',
            // '#', conflicts with first char of identifier
            '~',
            '<<',
            '>>',
            '||',
            '::'
        ]
    },
    formatOptions: {
        alwaysDenseOperators: [
            '::'
        ],
        onelineClauses: [
            ...standardOnelineClauses,
            ...tabularOnelineClauses
        ],
        tabularOnelineClauses
    }
};
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/redshift/redshift.functions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "functions",
    ()=>functions
]);
const functions = [
    // https://docs.aws.amazon.com/redshift/latest/dg/c_Aggregate_Functions.html
    'ANY_VALUE',
    'APPROXIMATE PERCENTILE_DISC',
    'AVG',
    'COUNT',
    'LISTAGG',
    'MAX',
    'MEDIAN',
    'MIN',
    'PERCENTILE_CONT',
    'STDDEV_SAMP',
    'STDDEV_POP',
    'SUM',
    'VAR_SAMP',
    'VAR_POP',
    // https://docs.aws.amazon.com/redshift/latest/dg/c_Array_Functions.html
    // 'array',
    'array_concat',
    'array_flatten',
    'get_array_length',
    'split_to_array',
    'subarray',
    // https://docs.aws.amazon.com/redshift/latest/dg/c_bitwise_aggregate_functions.html
    'BIT_AND',
    'BIT_OR',
    'BOOL_AND',
    'BOOL_OR',
    // https://docs.aws.amazon.com/redshift/latest/dg/c_conditional_expressions.html
    'COALESCE',
    'DECODE',
    'GREATEST',
    'LEAST',
    'NVL',
    'NVL2',
    'NULLIF',
    // https://docs.aws.amazon.com/redshift/latest/dg/Date_functions_header.html
    'ADD_MONTHS',
    'AT TIME ZONE',
    'CONVERT_TIMEZONE',
    'CURRENT_DATE',
    'CURRENT_TIME',
    'CURRENT_TIMESTAMP',
    'DATE_CMP',
    'DATE_CMP_TIMESTAMP',
    'DATE_CMP_TIMESTAMPTZ',
    'DATE_PART_YEAR',
    'DATEADD',
    'DATEDIFF',
    'DATE_PART',
    'DATE_TRUNC',
    'EXTRACT',
    'GETDATE',
    'INTERVAL_CMP',
    'LAST_DAY',
    'MONTHS_BETWEEN',
    'NEXT_DAY',
    'SYSDATE',
    'TIMEOFDAY',
    'TIMESTAMP_CMP',
    'TIMESTAMP_CMP_DATE',
    'TIMESTAMP_CMP_TIMESTAMPTZ',
    'TIMESTAMPTZ_CMP',
    'TIMESTAMPTZ_CMP_DATE',
    'TIMESTAMPTZ_CMP_TIMESTAMP',
    'TIMEZONE',
    'TO_TIMESTAMP',
    'TRUNC',
    // https://docs.aws.amazon.com/redshift/latest/dg/geospatial-functions.html
    'AddBBox',
    'DropBBox',
    'GeometryType',
    'ST_AddPoint',
    'ST_Angle',
    'ST_Area',
    'ST_AsBinary',
    'ST_AsEWKB',
    'ST_AsEWKT',
    'ST_AsGeoJSON',
    'ST_AsText',
    'ST_Azimuth',
    'ST_Boundary',
    'ST_Collect',
    'ST_Contains',
    'ST_ContainsProperly',
    'ST_ConvexHull',
    'ST_CoveredBy',
    'ST_Covers',
    'ST_Crosses',
    'ST_Dimension',
    'ST_Disjoint',
    'ST_Distance',
    'ST_DistanceSphere',
    'ST_DWithin',
    'ST_EndPoint',
    'ST_Envelope',
    'ST_Equals',
    'ST_ExteriorRing',
    'ST_Force2D',
    'ST_Force3D',
    'ST_Force3DM',
    'ST_Force3DZ',
    'ST_Force4D',
    'ST_GeometryN',
    'ST_GeometryType',
    'ST_GeomFromEWKB',
    'ST_GeomFromEWKT',
    'ST_GeomFromText',
    'ST_GeomFromWKB',
    'ST_InteriorRingN',
    'ST_Intersects',
    'ST_IsPolygonCCW',
    'ST_IsPolygonCW',
    'ST_IsClosed',
    'ST_IsCollection',
    'ST_IsEmpty',
    'ST_IsSimple',
    'ST_IsValid',
    'ST_Length',
    'ST_LengthSphere',
    'ST_Length2D',
    'ST_LineFromMultiPoint',
    'ST_LineInterpolatePoint',
    'ST_M',
    'ST_MakeEnvelope',
    'ST_MakeLine',
    'ST_MakePoint',
    'ST_MakePolygon',
    'ST_MemSize',
    'ST_MMax',
    'ST_MMin',
    'ST_Multi',
    'ST_NDims',
    'ST_NPoints',
    'ST_NRings',
    'ST_NumGeometries',
    'ST_NumInteriorRings',
    'ST_NumPoints',
    'ST_Perimeter',
    'ST_Perimeter2D',
    'ST_Point',
    'ST_PointN',
    'ST_Points',
    'ST_Polygon',
    'ST_RemovePoint',
    'ST_Reverse',
    'ST_SetPoint',
    'ST_SetSRID',
    'ST_Simplify',
    'ST_SRID',
    'ST_StartPoint',
    'ST_Touches',
    'ST_Within',
    'ST_X',
    'ST_XMax',
    'ST_XMin',
    'ST_Y',
    'ST_YMax',
    'ST_YMin',
    'ST_Z',
    'ST_ZMax',
    'ST_ZMin',
    'SupportsBBox',
    // https://docs.aws.amazon.com/redshift/latest/dg/hash-functions.html
    'CHECKSUM',
    'FUNC_SHA1',
    'FNV_HASH',
    'MD5',
    'SHA',
    'SHA1',
    'SHA2',
    // https://docs.aws.amazon.com/redshift/latest/dg/hyperloglog-functions.html
    'HLL',
    'HLL_CREATE_SKETCH',
    'HLL_CARDINALITY',
    'HLL_COMBINE',
    // https://docs.aws.amazon.com/redshift/latest/dg/json-functions.html
    'IS_VALID_JSON',
    'IS_VALID_JSON_ARRAY',
    'JSON_ARRAY_LENGTH',
    'JSON_EXTRACT_ARRAY_ELEMENT_TEXT',
    'JSON_EXTRACT_PATH_TEXT',
    'JSON_PARSE',
    'JSON_SERIALIZE',
    // https://docs.aws.amazon.com/redshift/latest/dg/Math_functions.html
    'ABS',
    'ACOS',
    'ASIN',
    'ATAN',
    'ATAN2',
    'CBRT',
    'CEILING',
    'CEIL',
    'COS',
    'COT',
    'DEGREES',
    'DEXP',
    'DLOG1',
    'DLOG10',
    'EXP',
    'FLOOR',
    'LN',
    'LOG',
    'MOD',
    'PI',
    'POWER',
    'RADIANS',
    'RANDOM',
    'ROUND',
    'SIN',
    'SIGN',
    'SQRT',
    'TAN',
    'TO_HEX',
    'TRUNC',
    // https://docs.aws.amazon.com/redshift/latest/dg/ml-function.html
    'EXPLAIN_MODEL',
    // https://docs.aws.amazon.com/redshift/latest/dg/String_functions_header.html
    'ASCII',
    'BPCHARCMP',
    'BTRIM',
    'BTTEXT_PATTERN_CMP',
    'CHAR_LENGTH',
    'CHARACTER_LENGTH',
    'CHARINDEX',
    'CHR',
    'COLLATE',
    'CONCAT',
    'CRC32',
    'DIFFERENCE',
    'INITCAP',
    'LEFT',
    'RIGHT',
    'LEN',
    'LENGTH',
    'LOWER',
    'LPAD',
    'RPAD',
    'LTRIM',
    'OCTETINDEX',
    'OCTET_LENGTH',
    'POSITION',
    'QUOTE_IDENT',
    'QUOTE_LITERAL',
    'REGEXP_COUNT',
    'REGEXP_INSTR',
    'REGEXP_REPLACE',
    'REGEXP_SUBSTR',
    'REPEAT',
    'REPLACE',
    'REPLICATE',
    'REVERSE',
    'RTRIM',
    'SOUNDEX',
    'SPLIT_PART',
    'STRPOS',
    'STRTOL',
    'SUBSTRING',
    'TEXTLEN',
    'TRANSLATE',
    'TRIM',
    'UPPER',
    // https://docs.aws.amazon.com/redshift/latest/dg/c_Type_Info_Functions.html
    'decimal_precision',
    'decimal_scale',
    'is_array',
    'is_bigint',
    'is_boolean',
    'is_char',
    'is_decimal',
    'is_float',
    'is_integer',
    'is_object',
    'is_scalar',
    'is_smallint',
    'is_varchar',
    'json_typeof',
    // https://docs.aws.amazon.com/redshift/latest/dg/c_Window_functions.html
    'AVG',
    'COUNT',
    'CUME_DIST',
    'DENSE_RANK',
    'FIRST_VALUE',
    'LAST_VALUE',
    'LAG',
    'LEAD',
    'LISTAGG',
    'MAX',
    'MEDIAN',
    'MIN',
    'NTH_VALUE',
    'NTILE',
    'PERCENT_RANK',
    'PERCENTILE_CONT',
    'PERCENTILE_DISC',
    'RANK',
    'RATIO_TO_REPORT',
    'ROW_NUMBER',
    'STDDEV_SAMP',
    'STDDEV_POP',
    'SUM',
    'VAR_SAMP',
    'VAR_POP',
    // https://docs.aws.amazon.com/redshift/latest/dg/r_Data_type_formatting.html
    'CAST',
    'CONVERT',
    'TO_CHAR',
    'TO_DATE',
    'TO_NUMBER',
    'TEXT_TO_INT_ALT',
    'TEXT_TO_NUMERIC_ALT',
    // https://docs.aws.amazon.com/redshift/latest/dg/r_System_administration_functions.html
    'CHANGE_QUERY_PRIORITY',
    'CHANGE_SESSION_PRIORITY',
    'CHANGE_USER_PRIORITY',
    'CURRENT_SETTING',
    'PG_CANCEL_BACKEND',
    'PG_TERMINATE_BACKEND',
    'REBOOT_CLUSTER',
    'SET_CONFIG',
    // https://docs.aws.amazon.com/redshift/latest/dg/r_System_information_functions.html
    'CURRENT_AWS_ACCOUNT',
    'CURRENT_DATABASE',
    'CURRENT_NAMESPACE',
    'CURRENT_SCHEMA',
    'CURRENT_SCHEMAS',
    'CURRENT_USER',
    'CURRENT_USER_ID',
    'HAS_ASSUMEROLE_PRIVILEGE',
    'HAS_DATABASE_PRIVILEGE',
    'HAS_SCHEMA_PRIVILEGE',
    'HAS_TABLE_PRIVILEGE',
    'PG_BACKEND_PID',
    'PG_GET_COLS',
    'PG_GET_GRANTEE_BY_IAM_ROLE',
    'PG_GET_IAM_ROLE_BY_USER',
    'PG_GET_LATE_BINDING_VIEW_COLS',
    'PG_LAST_COPY_COUNT',
    'PG_LAST_COPY_ID',
    'PG_LAST_UNLOAD_ID',
    'PG_LAST_QUERY_ID',
    'PG_LAST_UNLOAD_COUNT',
    'SESSION_USER',
    'SLICE_NUM',
    'USER',
    'VERSION'
];
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/redshift/redshift.keywords.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "dataTypes",
    ()=>dataTypes,
    "keywords",
    ()=>keywords
]);
const keywords = [
    // https://docs.aws.amazon.com/redshift/latest/dg/r_pg_keywords.html
    'AES128',
    'AES256',
    'ALL',
    'ALLOWOVERWRITE',
    'ANY',
    'AS',
    'ASC',
    'AUTHORIZATION',
    'BACKUP',
    'BETWEEN',
    'BINARY',
    'BOTH',
    'CHECK',
    'COLUMN',
    'CONSTRAINT',
    'CREATE',
    'CROSS',
    'DEFAULT',
    'DEFERRABLE',
    'DEFLATE',
    'DEFRAG',
    'DESC',
    'DISABLE',
    'DISTINCT',
    'DO',
    'ENABLE',
    'ENCODE',
    'ENCRYPT',
    'ENCRYPTION',
    'EXPLICIT',
    'FALSE',
    'FOR',
    'FOREIGN',
    'FREEZE',
    'FROM',
    'FULL',
    'GLOBALDICT256',
    'GLOBALDICT64K',
    'GROUP',
    'IDENTITY',
    'IGNORE',
    'ILIKE',
    'IN',
    'INITIALLY',
    'INNER',
    'INTO',
    'IS',
    'ISNULL',
    'LANGUAGE',
    'LEADING',
    'LIKE',
    'LIMIT',
    'LOCALTIME',
    'LOCALTIMESTAMP',
    'LUN',
    'LUNS',
    'MINUS',
    'NATURAL',
    'NEW',
    'NOT',
    'NOTNULL',
    'NULL',
    'NULLS',
    'OFF',
    'OFFLINE',
    'OFFSET',
    'OID',
    'OLD',
    'ON',
    'ONLY',
    'OPEN',
    'ORDER',
    'OUTER',
    'OVERLAPS',
    'PARALLEL',
    'PARTITION',
    'PERCENT',
    'PERMISSIONS',
    'PLACING',
    'PRIMARY',
    'RECOVER',
    'REFERENCES',
    'REJECTLOG',
    'RESORT',
    'RESPECT',
    'RESTORE',
    'SIMILAR',
    'SNAPSHOT',
    'SOME',
    'SYSTEM',
    'TABLE',
    'TAG',
    'TDES',
    'THEN',
    'TIMESTAMP',
    'TO',
    'TOP',
    'TRAILING',
    'TRUE',
    'UNIQUE',
    'USING',
    'VERBOSE',
    'WALLET',
    'WITHOUT',
    // https://docs.aws.amazon.com/redshift/latest/dg/copy-parameters-data-conversion.html
    'ACCEPTANYDATE',
    'ACCEPTINVCHARS',
    'BLANKSASNULL',
    'DATEFORMAT',
    'EMPTYASNULL',
    'ENCODING',
    'ESCAPE',
    'EXPLICIT_IDS',
    'FILLRECORD',
    'IGNOREBLANKLINES',
    'IGNOREHEADER',
    'REMOVEQUOTES',
    'ROUNDEC',
    'TIMEFORMAT',
    'TRIMBLANKS',
    'TRUNCATECOLUMNS',
    // https://docs.aws.amazon.com/redshift/latest/dg/copy-parameters-data-load.html
    'COMPROWS',
    'COMPUPDATE',
    'MAXERROR',
    'NOLOAD',
    'STATUPDATE',
    // https://docs.aws.amazon.com/redshift/latest/dg/copy-parameters-data-format.html
    'FORMAT',
    'CSV',
    'DELIMITER',
    'FIXEDWIDTH',
    'SHAPEFILE',
    'AVRO',
    'JSON',
    'PARQUET',
    'ORC',
    // https://docs.aws.amazon.com/redshift/latest/dg/copy-parameters-authorization.html
    'ACCESS_KEY_ID',
    'CREDENTIALS',
    'ENCRYPTED',
    'IAM_ROLE',
    'MASTER_SYMMETRIC_KEY',
    'SECRET_ACCESS_KEY',
    'SESSION_TOKEN',
    // https://docs.aws.amazon.com/redshift/latest/dg/copy-parameters-file-compression.html
    'BZIP2',
    'GZIP',
    'LZOP',
    'ZSTD',
    // https://docs.aws.amazon.com/redshift/latest/dg/r_COPY-alphabetical-parm-list.html
    'MANIFEST',
    'READRATIO',
    'REGION',
    'SSH',
    // https://docs.aws.amazon.com/redshift/latest/dg/c_Compression_encodings.html
    'RAW',
    'AZ64',
    'BYTEDICT',
    'DELTA',
    'DELTA32K',
    'LZO',
    'MOSTLY8',
    'MOSTLY16',
    'MOSTLY32',
    'RUNLENGTH',
    'TEXT255',
    'TEXT32K',
    // misc
    // CREATE EXTERNAL SCHEMA (https://docs.aws.amazon.com/redshift/latest/dg/r_CREATE_EXTERNAL_SCHEMA.html)
    'CATALOG_ROLE',
    'SECRET_ARN',
    'EXTERNAL',
    // https://docs.aws.amazon.com/redshift/latest/dg/c_choosing_dist_sort.html
    'AUTO',
    'EVEN',
    'KEY',
    'PREDICATE',
    // unknown
    'COMPRESSION'
];
const dataTypes = [
    // https://docs.aws.amazon.com/redshift/latest/dg/r_Character_types.html#r_Character_types-text-and-bpchar-types
    'ARRAY',
    'BIGINT',
    'BPCHAR',
    'CHAR',
    'CHARACTER VARYING',
    'CHARACTER',
    'DECIMAL',
    'INT',
    'INT2',
    'INT4',
    'INT8',
    'INTEGER',
    'NCHAR',
    'NUMERIC',
    'NVARCHAR',
    'SMALLINT',
    'TEXT',
    'VARBYTE',
    'VARCHAR'
];
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/singlestoredb/singlestoredb.formatter.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "singlestoredb",
    ()=>singlestoredb
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/expandPhrases.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$mariadb$2f$likeMariaDb$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/mariadb/likeMariaDb.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$singlestoredb$2f$singlestoredb$2e$keywords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/singlestoredb/singlestoredb.keywords.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$singlestoredb$2f$singlestoredb$2e$functions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/singlestoredb/singlestoredb.functions.js [app-client] (ecmascript)");
;
;
;
;
const reservedSelect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'SELECT [ALL | DISTINCT | DISTINCTROW]'
]);
const reservedClauses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    // queries
    'WITH',
    'FROM',
    'WHERE',
    'GROUP BY',
    'HAVING',
    'PARTITION BY',
    'ORDER BY',
    'LIMIT',
    'OFFSET',
    // Data manipulation
    // - insert:
    'INSERT [IGNORE] [INTO]',
    'VALUES',
    'REPLACE [INTO]',
    'ON DUPLICATE KEY UPDATE',
    // - update:
    'SET',
    // Data definition
    'CREATE [OR REPLACE] [TEMPORARY] PROCEDURE [IF NOT EXISTS]',
    'CREATE [OR REPLACE] [EXTERNAL] FUNCTION'
]);
const standardOnelineClauses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'CREATE [ROWSTORE] [REFERENCE | TEMPORARY | GLOBAL TEMPORARY] TABLE [IF NOT EXISTS]'
]);
const tabularOnelineClauses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    // - create:
    'CREATE VIEW',
    // - update:
    'UPDATE',
    // - delete:
    'DELETE [FROM]',
    // - drop table:
    'DROP [TEMPORARY] TABLE [IF EXISTS]',
    // - alter table:
    'ALTER [ONLINE] TABLE',
    'ADD [COLUMN]',
    'ADD [UNIQUE] {INDEX | KEY}',
    'DROP [COLUMN]',
    'MODIFY [COLUMN]',
    'CHANGE',
    'RENAME [TO | AS]',
    // - truncate:
    'TRUNCATE [TABLE]',
    // https://docs.singlestore.com/managed-service/en/reference/sql-reference.html
    'ADD AGGREGATOR',
    'ADD LEAF',
    'AGGREGATOR SET AS MASTER',
    'ALTER DATABASE',
    'ALTER PIPELINE',
    'ALTER RESOURCE POOL',
    'ALTER USER',
    'ALTER VIEW',
    'ANALYZE TABLE',
    'ATTACH DATABASE',
    'ATTACH LEAF',
    'ATTACH LEAF ALL',
    'BACKUP DATABASE',
    'BINLOG',
    'BOOTSTRAP AGGREGATOR',
    'CACHE INDEX',
    'CALL',
    'CHANGE',
    'CHANGE MASTER TO',
    'CHANGE REPLICATION FILTER',
    'CHANGE REPLICATION SOURCE TO',
    'CHECK BLOB CHECKSUM',
    'CHECK TABLE',
    'CHECKSUM TABLE',
    'CLEAR ORPHAN DATABASES',
    'CLONE',
    'COMMIT',
    'CREATE DATABASE',
    'CREATE GROUP',
    'CREATE INDEX',
    'CREATE LINK',
    'CREATE MILESTONE',
    'CREATE PIPELINE',
    'CREATE RESOURCE POOL',
    'CREATE ROLE',
    'CREATE USER',
    'DEALLOCATE PREPARE',
    'DESCRIBE',
    'DETACH DATABASE',
    'DETACH PIPELINE',
    'DROP DATABASE',
    'DROP FUNCTION',
    'DROP INDEX',
    'DROP LINK',
    'DROP PIPELINE',
    'DROP PROCEDURE',
    'DROP RESOURCE POOL',
    'DROP ROLE',
    'DROP USER',
    'DROP VIEW',
    'EXECUTE',
    'EXPLAIN',
    'FLUSH',
    'FORCE',
    'GRANT',
    'HANDLER',
    'HELP',
    'KILL CONNECTION',
    'KILLALL QUERIES',
    'LOAD DATA',
    'LOAD INDEX INTO CACHE',
    'LOAD XML',
    'LOCK INSTANCE FOR BACKUP',
    'LOCK TABLES',
    'MASTER_POS_WAIT',
    'OPTIMIZE TABLE',
    'PREPARE',
    'PURGE BINARY LOGS',
    'REBALANCE PARTITIONS',
    'RELEASE SAVEPOINT',
    'REMOVE AGGREGATOR',
    'REMOVE LEAF',
    'REPAIR TABLE',
    'REPLACE',
    'REPLICATE DATABASE',
    'RESET',
    'RESET MASTER',
    'RESET PERSIST',
    'RESET REPLICA',
    'RESET SLAVE',
    'RESTART',
    'RESTORE DATABASE',
    'RESTORE REDUNDANCY',
    'REVOKE',
    'ROLLBACK',
    'ROLLBACK TO SAVEPOINT',
    'SAVEPOINT',
    'SET CHARACTER SET',
    'SET DEFAULT ROLE',
    'SET NAMES',
    'SET PASSWORD',
    'SET RESOURCE GROUP',
    'SET ROLE',
    'SET TRANSACTION',
    'SHOW',
    'SHOW CHARACTER SET',
    'SHOW COLLATION',
    'SHOW COLUMNS',
    'SHOW CREATE DATABASE',
    'SHOW CREATE FUNCTION',
    'SHOW CREATE PIPELINE',
    'SHOW CREATE PROCEDURE',
    'SHOW CREATE TABLE',
    'SHOW CREATE USER',
    'SHOW CREATE VIEW',
    'SHOW DATABASES',
    'SHOW ENGINE',
    'SHOW ENGINES',
    'SHOW ERRORS',
    'SHOW FUNCTION CODE',
    'SHOW FUNCTION STATUS',
    'SHOW GRANTS',
    'SHOW INDEX',
    'SHOW MASTER STATUS',
    'SHOW OPEN TABLES',
    'SHOW PLUGINS',
    'SHOW PRIVILEGES',
    'SHOW PROCEDURE CODE',
    'SHOW PROCEDURE STATUS',
    'SHOW PROCESSLIST',
    'SHOW PROFILE',
    'SHOW PROFILES',
    'SHOW RELAYLOG EVENTS',
    'SHOW REPLICA STATUS',
    'SHOW REPLICAS',
    'SHOW SLAVE',
    'SHOW SLAVE HOSTS',
    'SHOW STATUS',
    'SHOW TABLE STATUS',
    'SHOW TABLES',
    'SHOW VARIABLES',
    'SHOW WARNINGS',
    'SHUTDOWN',
    'SNAPSHOT DATABASE',
    'SOURCE_POS_WAIT',
    'START GROUP_REPLICATION',
    'START PIPELINE',
    'START REPLICA',
    'START SLAVE',
    'START TRANSACTION',
    'STOP GROUP_REPLICATION',
    'STOP PIPELINE',
    'STOP REPLICA',
    'STOP REPLICATING',
    'STOP SLAVE',
    'TEST PIPELINE',
    'UNLOCK INSTANCE',
    'UNLOCK TABLES',
    'USE',
    'XA',
    // flow control
    'ITERATE',
    'LEAVE',
    'LOOP',
    'REPEAT',
    'RETURN',
    'WHILE'
]);
const reservedSetOperations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'UNION [ALL | DISTINCT]',
    'EXCEPT',
    'INTERSECT',
    'MINUS'
]);
const reservedJoins = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'JOIN',
    '{LEFT | RIGHT | FULL} [OUTER] JOIN',
    '{INNER | CROSS} JOIN',
    'NATURAL {LEFT | RIGHT} [OUTER] JOIN',
    // non-standard joins
    'STRAIGHT_JOIN'
]);
const reservedKeywordPhrases = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'ON DELETE',
    'ON UPDATE',
    'CHARACTER SET',
    '{ROWS | RANGE} BETWEEN',
    'IDENTIFIED BY'
]);
const reservedDataTypePhrases = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([]);
const singlestoredb = {
    name: 'singlestoredb',
    tokenizerOptions: {
        reservedSelect,
        reservedClauses: [
            ...reservedClauses,
            ...standardOnelineClauses,
            ...tabularOnelineClauses
        ],
        reservedSetOperations,
        reservedJoins,
        reservedKeywordPhrases,
        reservedDataTypePhrases,
        reservedKeywords: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$singlestoredb$2f$singlestoredb$2e$keywords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keywords"],
        reservedDataTypes: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$singlestoredb$2f$singlestoredb$2e$keywords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dataTypes"],
        reservedFunctionNames: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$singlestoredb$2f$singlestoredb$2e$functions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["functions"],
        // TODO: support _binary"some string" prefix
        stringTypes: [
            '""-qq-bs',
            "''-qq-bs",
            {
                quote: "''-raw",
                prefixes: [
                    'B',
                    'X'
                ],
                requirePrefix: true
            }
        ],
        identTypes: [
            '``'
        ],
        identChars: {
            first: '$',
            rest: '$',
            allowFirstCharNumber: true
        },
        variableTypes: [
            {
                regex: '@@?[A-Za-z0-9_$]+'
            },
            {
                quote: '``',
                prefixes: [
                    '@'
                ],
                requirePrefix: true
            }
        ],
        lineCommentTypes: [
            '--',
            '#'
        ],
        operators: [
            '%',
            ':=',
            '&',
            '|',
            '^',
            '~',
            '<<',
            '>>',
            '<=>',
            '&&',
            '||',
            '::',
            '::$',
            '::%',
            ':>',
            '!:>',
            '*.*'
        ],
        postProcess: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$mariadb$2f$likeMariaDb$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["postProcess"]
    },
    formatOptions: {
        alwaysDenseOperators: [
            '::',
            '::$',
            '::%'
        ],
        onelineClauses: [
            ...standardOnelineClauses,
            ...tabularOnelineClauses
        ],
        tabularOnelineClauses
    }
};
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/singlestoredb/singlestoredb.functions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "functions",
    ()=>functions
]);
const functions = [
    // https://docs.singlestore.com/managed-service/en/reference/sql-reference/vector-functions/vector-functions.html
    // https://docs.singlestore.com/managed-service/en/reference/sql-reference/window-functions/window-functions.html
    // https://docs.singlestore.com/managed-service/en/reference/sql-reference/string-functions/string-functions.html
    // https://docs.singlestore.com/managed-service/en/reference/sql-reference/conditional-functions/conditional-functions.html
    // https://docs.singlestore.com/managed-service/en/reference/sql-reference/numeric-functions/numeric-functions.html
    // https://docs.singlestore.com/managed-service/en/reference/sql-reference/geospatial-functions/geospatial-functions.html
    // https://docs.singlestore.com/managed-service/en/reference/sql-reference/json-functions/json-functions.html
    // https://docs.singlestore.com/managed-service/en/reference/sql-reference/information-functions/information-functions.html
    // https://docs.singlestore.com/managed-service/en/reference/sql-reference/aggregate-functions/aggregate-functions.html
    // https://docs.singlestore.com/managed-service/en/reference/sql-reference/time-series-functions/time-series-functions.html
    // https://docs.singlestore.com/managed-service/en/reference/sql-reference/identifier-generation-functions.html
    // https://docs.singlestore.com/managed-service/en/reference/sql-reference/date-and-time-functions/date-and-time-functions.html
    // https://docs.singlestore.com/managed-service/en/reference/sql-reference/distinct-count-estimation-functions.html
    // https://docs.singlestore.com/managed-service/en/reference/sql-reference/full-text-search-functions/full-text-search-functions.html
    // https://docs.singlestore.com/managed-service/en/reference/sql-reference/regular-expression-functions.html
    'ABS',
    'ACOS',
    'ADDDATE',
    'ADDTIME',
    'AES_DECRYPT',
    'AES_ENCRYPT',
    'ANY_VALUE',
    'APPROX_COUNT_DISTINCT',
    'APPROX_COUNT_DISTINCT_ACCUMULATE',
    'APPROX_COUNT_DISTINCT_COMBINE',
    'APPROX_COUNT_DISTINCT_ESTIMATE',
    'APPROX_GEOGRAPHY_INTERSECTS',
    'APPROX_PERCENTILE',
    'ASCII',
    'ASIN',
    'ATAN',
    'ATAN2',
    'AVG',
    'BIN',
    'BINARY',
    'BIT_AND',
    'BIT_COUNT',
    'BIT_OR',
    'BIT_XOR',
    'CAST',
    'CEIL',
    'CEILING',
    'CHAR',
    'CHARACTER_LENGTH',
    'CHAR_LENGTH',
    'CHARSET',
    'COALESCE',
    'COERCIBILITY',
    'COLLATION',
    'COLLECT',
    'CONCAT',
    'CONCAT_WS',
    'CONNECTION_ID',
    'CONV',
    'CONVERT',
    'CONVERT_TZ',
    'COS',
    'COT',
    'COUNT',
    'CUME_DIST',
    'CURDATE',
    'CURRENT_DATE',
    'CURRENT_ROLE',
    'CURRENT_TIME',
    'CURRENT_TIMESTAMP',
    'CURRENT_USER',
    'CURTIME',
    'DATABASE',
    'DATE',
    'DATE_ADD',
    'DATEDIFF',
    'DATE_FORMAT',
    'DATE_SUB',
    'DATE_TRUNC',
    'DAY',
    'DAYNAME',
    'DAYOFMONTH',
    'DAYOFWEEK',
    'DAYOFYEAR',
    'DECODE',
    'DEFAULT',
    'DEGREES',
    'DENSE_RANK',
    'DIV',
    'DOT_PRODUCT',
    'ELT',
    'EUCLIDEAN_DISTANCE',
    'EXP',
    'EXTRACT',
    'FIELD',
    'FIRST',
    'FIRST_VALUE',
    'FLOOR',
    'FORMAT',
    'FOUND_ROWS',
    'FROM_BASE64',
    'FROM_DAYS',
    'FROM_UNIXTIME',
    'GEOGRAPHY_AREA',
    'GEOGRAPHY_CONTAINS',
    'GEOGRAPHY_DISTANCE',
    'GEOGRAPHY_INTERSECTS',
    'GEOGRAPHY_LATITUDE',
    'GEOGRAPHY_LENGTH',
    'GEOGRAPHY_LONGITUDE',
    'GEOGRAPHY_POINT',
    'GEOGRAPHY_WITHIN_DISTANCE',
    'GEOMETRY_AREA',
    'GEOMETRY_CONTAINS',
    'GEOMETRY_DISTANCE',
    'GEOMETRY_FILTER',
    'GEOMETRY_INTERSECTS',
    'GEOMETRY_LENGTH',
    'GEOMETRY_POINT',
    'GEOMETRY_WITHIN_DISTANCE',
    'GEOMETRY_X',
    'GEOMETRY_Y',
    'GREATEST',
    'GROUPING',
    'GROUP_CONCAT',
    'HEX',
    'HIGHLIGHT',
    'HOUR',
    'ICU_VERSION',
    'IF',
    'IFNULL',
    'INET_ATON',
    'INET_NTOA',
    'INET6_ATON',
    'INET6_NTOA',
    'INITCAP',
    'INSERT',
    'INSTR',
    'INTERVAL',
    'IS',
    'IS NULL',
    'JSON_AGG',
    'JSON_ARRAY_CONTAINS_DOUBLE',
    'JSON_ARRAY_CONTAINS_JSON',
    'JSON_ARRAY_CONTAINS_STRING',
    'JSON_ARRAY_PUSH_DOUBLE',
    'JSON_ARRAY_PUSH_JSON',
    'JSON_ARRAY_PUSH_STRING',
    'JSON_DELETE_KEY',
    'JSON_EXTRACT_DOUBLE',
    'JSON_EXTRACT_JSON',
    'JSON_EXTRACT_STRING',
    'JSON_EXTRACT_BIGINT',
    'JSON_GET_TYPE',
    'JSON_LENGTH',
    'JSON_SET_DOUBLE',
    'JSON_SET_JSON',
    'JSON_SET_STRING',
    'JSON_SPLICE_DOUBLE',
    'JSON_SPLICE_JSON',
    'JSON_SPLICE_STRING',
    'LAG',
    'LAST_DAY',
    'LAST_VALUE',
    'LCASE',
    'LEAD',
    'LEAST',
    'LEFT',
    'LENGTH',
    'LIKE',
    'LN',
    'LOCALTIME',
    'LOCALTIMESTAMP',
    'LOCATE',
    'LOG',
    'LOG10',
    'LOG2',
    'LPAD',
    'LTRIM',
    'MATCH',
    'MAX',
    'MD5',
    'MEDIAN',
    'MICROSECOND',
    'MIN',
    'MINUTE',
    'MOD',
    'MONTH',
    'MONTHNAME',
    'MONTHS_BETWEEN',
    'NOT',
    'NOW',
    'NTH_VALUE',
    'NTILE',
    'NULLIF',
    'OCTET_LENGTH',
    'PERCENT_RANK',
    'PERCENTILE_CONT',
    'PERCENTILE_DISC',
    'PI',
    'PIVOT',
    'POSITION',
    'POW',
    'POWER',
    'QUARTER',
    'QUOTE',
    'RADIANS',
    'RAND',
    'RANK',
    'REGEXP',
    'REPEAT',
    'REPLACE',
    'REVERSE',
    'RIGHT',
    'RLIKE',
    'ROUND',
    'ROW_COUNT',
    'ROW_NUMBER',
    'RPAD',
    'RTRIM',
    'SCALAR',
    'SCHEMA',
    'SEC_TO_TIME',
    'SHA1',
    'SHA2',
    'SIGMOID',
    'SIGN',
    'SIN',
    'SLEEP',
    'SPLIT',
    'SOUNDEX',
    'SOUNDS LIKE',
    'SOURCE_POS_WAIT',
    'SPACE',
    'SQRT',
    'STDDEV',
    'STDDEV_POP',
    'STDDEV_SAMP',
    'STR_TO_DATE',
    'SUBDATE',
    'SUBSTR',
    'SUBSTRING',
    'SUBSTRING_INDEX',
    'SUM',
    'SYS_GUID',
    'TAN',
    'TIME',
    'TIMEDIFF',
    'TIME_BUCKET',
    'TIME_FORMAT',
    'TIMESTAMP',
    'TIMESTAMPADD',
    'TIMESTAMPDIFF',
    'TIME_TO_SEC',
    'TO_BASE64',
    'TO_CHAR',
    'TO_DAYS',
    'TO_JSON',
    'TO_NUMBER',
    'TO_SECONDS',
    'TO_TIMESTAMP',
    'TRIM',
    'TRUNC',
    'TRUNCATE',
    'UCASE',
    'UNHEX',
    'UNIX_TIMESTAMP',
    'UPDATEXML',
    'UPPER',
    // 'USER',
    'UTC_DATE',
    'UTC_TIME',
    'UTC_TIMESTAMP',
    'UUID',
    'VALUES',
    'VARIANCE',
    'VAR_POP',
    'VAR_SAMP',
    'VECTOR_SUB',
    'VERSION',
    'WEEK',
    'WEEKDAY',
    'WEEKOFYEAR',
    'YEAR'
];
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/singlestoredb/singlestoredb.keywords.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "dataTypes",
    ()=>dataTypes,
    "keywords",
    ()=>keywords
]);
const keywords = [
    // List of all keywords taken from:
    // https://docs.singlestore.com/managed-service/en/reference/sql-reference/restricted-keywords/list-of-restricted-keywords.html
    // Then filtered down to reserved keywords by running
    // > SELECT * AS <keyword>;
    // for each keyword in that list and observing which of these produce an error.
    'ADD',
    'ALL',
    'ALTER',
    'ANALYZE',
    'AND',
    'AS',
    'ASC',
    'ASENSITIVE',
    'BEFORE',
    'BETWEEN',
    '_BINARY',
    'BOTH',
    'BY',
    'CALL',
    'CASCADE',
    'CASE',
    'CHANGE',
    'CHECK',
    'COLLATE',
    'COLUMN',
    'CONDITION',
    'CONSTRAINT',
    'CONTINUE',
    'CONVERT',
    'CREATE',
    'CROSS',
    'CURRENT_DATE',
    'CURRENT_TIME',
    'CURRENT_TIMESTAMP',
    'CURRENT_USER',
    'CURSOR',
    'DATABASE',
    'DATABASES',
    'DAY_HOUR',
    'DAY_MICROSECOND',
    'DAY_MINUTE',
    'DAY_SECOND',
    'DECLARE',
    'DEFAULT',
    'DELAYED',
    'DELETE',
    'DESC',
    'DESCRIBE',
    'DETERMINISTIC',
    'DISTINCT',
    'DISTINCTROW',
    'DIV',
    'DROP',
    'DUAL',
    'EACH',
    'ELSE',
    'ELSEIF',
    'ENCLOSED',
    'ESCAPED',
    'EXCEPT',
    'EXISTS',
    'EXIT',
    'EXPLAIN',
    'EXTRA_JOIN',
    'FALSE',
    'FETCH',
    'FOR',
    'FORCE',
    'FORCE_COMPILED_MODE',
    'FORCE_INTERPRETER_MODE',
    'FOREIGN',
    'FROM',
    'FULL',
    'FULLTEXT',
    'GRANT',
    'GROUP',
    'HAVING',
    'HEARTBEAT_NO_LOGGING',
    'HIGH_PRIORITY',
    'HOUR_MICROSECOND',
    'HOUR_MINUTE',
    'HOUR_SECOND',
    'IF',
    'IGNORE',
    'IN',
    'INDEX',
    'INFILE',
    'INNER',
    'INOUT',
    'INSENSITIVE',
    'INSERT',
    'IN',
    '_INTERNAL_DYNAMIC_TYPECAST',
    'INTERSECT',
    'INTERVAL',
    'INTO',
    'ITERATE',
    'JOIN',
    'KEY',
    'KEYS',
    'KILL',
    'LEADING',
    'LEAVE',
    'LEFT',
    'LIKE',
    'LIMIT',
    'LINES',
    'LOAD',
    'LOCALTIME',
    'LOCALTIMESTAMP',
    'LOCK',
    'LOOP',
    'LOW_PRIORITY',
    'MATCH',
    'MAXVALUE',
    'MINUS',
    'MINUTE_MICROSECOND',
    'MINUTE_SECOND',
    'MOD',
    'MODIFIES',
    'NATURAL',
    'NO_QUERY_REWRITE',
    'NOT',
    'NO_WRITE_TO_BINLOG',
    'NO_QUERY_REWRITE',
    'NULL',
    'ON',
    'OPTIMIZE',
    'OPTION',
    'OPTIONALLY',
    'OR',
    'ORDER',
    'OUT',
    'OUTER',
    'OUTFILE',
    'OVER',
    'PRIMARY',
    'PROCEDURE',
    'PURGE',
    'RANGE',
    'READ',
    'READS',
    'REFERENCES',
    'REGEXP',
    'RELEASE',
    'RENAME',
    'REPEAT',
    'REPLACE',
    'REQUIRE',
    'RESTRICT',
    'RETURN',
    'REVOKE',
    'RIGHT',
    'RIGHT_ANTI_JOIN',
    'RIGHT_SEMI_JOIN',
    'RIGHT_STRAIGHT_JOIN',
    'RLIKE',
    'SCHEMA',
    'SCHEMAS',
    'SECOND_MICROSECOND',
    'SELECT',
    'SEMI_JOIN',
    'SENSITIVE',
    'SEPARATOR',
    'SET',
    'SHOW',
    'SIGNAL',
    'SPATIAL',
    'SPECIFIC',
    'SQL',
    'SQL_BIG_RESULT',
    'SQL_BUFFER_RESULT',
    'SQL_CACHE',
    'SQL_CALC_FOUND_ROWS',
    'SQLEXCEPTION',
    'SQL_NO_CACHE',
    'SQL_NO_LOGGING',
    'SQL_SMALL_RESULT',
    'SQLSTATE',
    'SQLWARNING',
    'STRAIGHT_JOIN',
    'TABLE',
    'TERMINATED',
    'THEN',
    'TO',
    'TRAILING',
    'TRIGGER',
    'TRUE',
    'UNBOUNDED',
    'UNDO',
    'UNION',
    'UNIQUE',
    'UNLOCK',
    'UPDATE',
    'USAGE',
    'USE',
    'USING',
    'UTC_DATE',
    'UTC_TIME',
    'UTC_TIMESTAMP',
    '_UTF8',
    'VALUES',
    'WHEN',
    'WHERE',
    'WHILE',
    'WINDOW',
    'WITH',
    'WITHIN',
    'WRITE',
    'XOR',
    'YEAR_MONTH',
    'ZEROFILL'
];
const dataTypes = [
    // https://docs.singlestore.com/cloud/reference/sql-reference/data-types/
    'BIGINT',
    'BINARY',
    'BIT',
    'BLOB',
    'CHAR',
    'CHARACTER',
    'DATETIME',
    'DEC',
    'DECIMAL',
    'DOUBLE PRECISION',
    'DOUBLE',
    'ENUM',
    'FIXED',
    'FLOAT',
    'FLOAT4',
    'FLOAT8',
    'INT',
    'INT1',
    'INT2',
    'INT3',
    'INT4',
    'INT8',
    'INTEGER',
    'LONG',
    'LONGBLOB',
    'LONGTEXT',
    'MEDIUMBLOB',
    'MEDIUMINT',
    'MEDIUMTEXT',
    'MIDDLEINT',
    'NATIONAL CHAR',
    'NATIONAL VARCHAR',
    'NUMERIC',
    'PRECISION',
    'REAL',
    'SMALLINT',
    'TEXT',
    'TIME',
    'TIMESTAMP',
    'TINYBLOB',
    'TINYINT',
    'TINYTEXT',
    'UNSIGNED',
    'VARBINARY',
    'VARCHAR',
    'VARCHARACTER',
    'YEAR'
];
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/snowflake/snowflake.formatter.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "snowflake",
    ()=>snowflake
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/expandPhrases.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$snowflake$2f$snowflake$2e$functions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/snowflake/snowflake.functions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$snowflake$2f$snowflake$2e$keywords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/snowflake/snowflake.keywords.js [app-client] (ecmascript)");
;
;
;
const reservedSelect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'SELECT [ALL | DISTINCT]'
]);
const reservedClauses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    // queries
    'WITH [RECURSIVE]',
    'FROM',
    'WHERE',
    'GROUP BY',
    'HAVING',
    'PARTITION BY',
    'ORDER BY',
    'QUALIFY',
    'LIMIT',
    'OFFSET',
    'FETCH [FIRST | NEXT]',
    // Data manipulation
    // - insert:
    'INSERT [OVERWRITE] [ALL INTO | INTO | ALL | FIRST]',
    '{THEN | ELSE} INTO',
    'VALUES',
    // - update:
    'SET',
    'CLUSTER BY',
    '[WITH] {MASKING POLICY | TAG | ROW ACCESS POLICY}',
    'COPY GRANTS',
    'USING TEMPLATE',
    'MERGE INTO',
    'WHEN MATCHED [AND]',
    'THEN {UPDATE SET | DELETE}',
    'WHEN NOT MATCHED THEN INSERT'
]);
const standardOnelineClauses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'CREATE [OR REPLACE] [VOLATILE] TABLE [IF NOT EXISTS]',
    'CREATE [OR REPLACE] [LOCAL | GLOBAL] {TEMP|TEMPORARY} TABLE [IF NOT EXISTS]'
]);
const tabularOnelineClauses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    // - create:
    'CREATE [OR REPLACE] [SECURE] [RECURSIVE] VIEW [IF NOT EXISTS]',
    // - update:
    'UPDATE',
    // - delete:
    'DELETE FROM',
    // - drop table:
    'DROP TABLE [IF EXISTS]',
    // - alter table:
    'ALTER TABLE [IF EXISTS]',
    'RENAME TO',
    'SWAP WITH',
    '[SUSPEND | RESUME] RECLUSTER',
    'DROP CLUSTERING KEY',
    'ADD [COLUMN]',
    'RENAME COLUMN',
    '{ALTER | MODIFY} [COLUMN]',
    'DROP [COLUMN]',
    '{ADD | ALTER | MODIFY | DROP} [CONSTRAINT]',
    'RENAME CONSTRAINT',
    '{ADD | DROP} SEARCH OPTIMIZATION',
    '{SET | UNSET} TAG',
    '{ADD | DROP} ROW ACCESS POLICY',
    'DROP ALL ROW ACCESS POLICIES',
    '{SET | DROP} DEFAULT',
    '{SET | DROP} NOT NULL',
    'SET DATA TYPE',
    'UNSET COMMENT',
    '{SET | UNSET} MASKING POLICY',
    // - truncate:
    'TRUNCATE [TABLE] [IF EXISTS]',
    // other
    // https://docs.snowflake.com/en/sql-reference/sql-all.html
    //
    // 1. run in console on this page: $x('//tbody/tr/*[1]//a/span/text()').map(x => x.nodeValue)
    // 2. delete all lines that contain a sting like '(.*)', they are already covered in the list
    // 3. delete all lines that contain a sting like '<.*>', they are already covered in the list
    // 4. delete all lines that contain '…', they are part of a regex statement that can't be covered here
    // 5. Manually add 'COPY INTO'
    // 6. Remove all lines that are already in `reservedClauses`
    //
    // Steps 1-4 can be combined by the following script in the developer console:
    // $x('//tbody/tr/*[1]//a/span/text()').map(x => x.nodeValue) // Step 1
    //   filter(x => !x.match(/\(.*\)/) && !x.match(/…/) && !x.match(/<.*>/)) // Step 2-4
    'ALTER ACCOUNT',
    'ALTER API INTEGRATION',
    'ALTER CONNECTION',
    'ALTER DATABASE',
    'ALTER EXTERNAL TABLE',
    'ALTER FAILOVER GROUP',
    'ALTER FILE FORMAT',
    'ALTER FUNCTION',
    'ALTER INTEGRATION',
    'ALTER MASKING POLICY',
    'ALTER MATERIALIZED VIEW',
    'ALTER NETWORK POLICY',
    'ALTER NOTIFICATION INTEGRATION',
    'ALTER PIPE',
    'ALTER PROCEDURE',
    'ALTER REPLICATION GROUP',
    'ALTER RESOURCE MONITOR',
    'ALTER ROLE',
    'ALTER ROW ACCESS POLICY',
    'ALTER SCHEMA',
    'ALTER SECURITY INTEGRATION',
    'ALTER SEQUENCE',
    'ALTER SESSION',
    'ALTER SESSION POLICY',
    'ALTER SHARE',
    'ALTER STAGE',
    'ALTER STORAGE INTEGRATION',
    'ALTER STREAM',
    'ALTER TAG',
    'ALTER TASK',
    'ALTER USER',
    'ALTER VIEW',
    'ALTER WAREHOUSE',
    'BEGIN',
    'CALL',
    'COMMIT',
    'COPY INTO',
    'CREATE ACCOUNT',
    'CREATE API INTEGRATION',
    'CREATE CONNECTION',
    'CREATE DATABASE',
    'CREATE EXTERNAL FUNCTION',
    'CREATE EXTERNAL TABLE',
    'CREATE FAILOVER GROUP',
    'CREATE FILE FORMAT',
    'CREATE FUNCTION',
    'CREATE INTEGRATION',
    'CREATE MANAGED ACCOUNT',
    'CREATE MASKING POLICY',
    'CREATE MATERIALIZED VIEW',
    'CREATE NETWORK POLICY',
    'CREATE NOTIFICATION INTEGRATION',
    'CREATE PIPE',
    'CREATE PROCEDURE',
    'CREATE REPLICATION GROUP',
    'CREATE RESOURCE MONITOR',
    'CREATE ROLE',
    'CREATE ROW ACCESS POLICY',
    'CREATE SCHEMA',
    'CREATE SECURITY INTEGRATION',
    'CREATE SEQUENCE',
    'CREATE SESSION POLICY',
    'CREATE SHARE',
    'CREATE STAGE',
    'CREATE STORAGE INTEGRATION',
    'CREATE STREAM',
    'CREATE TAG',
    'CREATE TASK',
    'CREATE USER',
    'CREATE WAREHOUSE',
    'DELETE',
    'DESCRIBE DATABASE',
    'DESCRIBE EXTERNAL TABLE',
    'DESCRIBE FILE FORMAT',
    'DESCRIBE FUNCTION',
    'DESCRIBE INTEGRATION',
    'DESCRIBE MASKING POLICY',
    'DESCRIBE MATERIALIZED VIEW',
    'DESCRIBE NETWORK POLICY',
    'DESCRIBE PIPE',
    'DESCRIBE PROCEDURE',
    'DESCRIBE RESULT',
    'DESCRIBE ROW ACCESS POLICY',
    'DESCRIBE SCHEMA',
    'DESCRIBE SEQUENCE',
    'DESCRIBE SESSION POLICY',
    'DESCRIBE SHARE',
    'DESCRIBE STAGE',
    'DESCRIBE STREAM',
    'DESCRIBE TABLE',
    'DESCRIBE TASK',
    'DESCRIBE TRANSACTION',
    'DESCRIBE USER',
    'DESCRIBE VIEW',
    'DESCRIBE WAREHOUSE',
    'DROP CONNECTION',
    'DROP DATABASE',
    'DROP EXTERNAL TABLE',
    'DROP FAILOVER GROUP',
    'DROP FILE FORMAT',
    'DROP FUNCTION',
    'DROP INTEGRATION',
    'DROP MANAGED ACCOUNT',
    'DROP MASKING POLICY',
    'DROP MATERIALIZED VIEW',
    'DROP NETWORK POLICY',
    'DROP PIPE',
    'DROP PROCEDURE',
    'DROP REPLICATION GROUP',
    'DROP RESOURCE MONITOR',
    'DROP ROLE',
    'DROP ROW ACCESS POLICY',
    'DROP SCHEMA',
    'DROP SEQUENCE',
    'DROP SESSION POLICY',
    'DROP SHARE',
    'DROP STAGE',
    'DROP STREAM',
    'DROP TAG',
    'DROP TASK',
    'DROP USER',
    'DROP VIEW',
    'DROP WAREHOUSE',
    'EXECUTE IMMEDIATE',
    'EXECUTE TASK',
    'EXPLAIN',
    'GET',
    'GRANT OWNERSHIP',
    'GRANT ROLE',
    'INSERT',
    'LIST',
    'MERGE',
    'PUT',
    'REMOVE',
    'REVOKE ROLE',
    'ROLLBACK',
    'SHOW COLUMNS',
    'SHOW CONNECTIONS',
    'SHOW DATABASES',
    'SHOW DATABASES IN FAILOVER GROUP',
    'SHOW DATABASES IN REPLICATION GROUP',
    'SHOW DELEGATED AUTHORIZATIONS',
    'SHOW EXTERNAL FUNCTIONS',
    'SHOW EXTERNAL TABLES',
    'SHOW FAILOVER GROUPS',
    'SHOW FILE FORMATS',
    'SHOW FUNCTIONS',
    'SHOW GLOBAL ACCOUNTS',
    'SHOW GRANTS',
    'SHOW INTEGRATIONS',
    'SHOW LOCKS',
    'SHOW MANAGED ACCOUNTS',
    'SHOW MASKING POLICIES',
    'SHOW MATERIALIZED VIEWS',
    'SHOW NETWORK POLICIES',
    'SHOW OBJECTS',
    'SHOW ORGANIZATION ACCOUNTS',
    'SHOW PARAMETERS',
    'SHOW PIPES',
    'SHOW PRIMARY KEYS',
    'SHOW PROCEDURES',
    'SHOW REGIONS',
    'SHOW REPLICATION ACCOUNTS',
    'SHOW REPLICATION DATABASES',
    'SHOW REPLICATION GROUPS',
    'SHOW RESOURCE MONITORS',
    'SHOW ROLES',
    'SHOW ROW ACCESS POLICIES',
    'SHOW SCHEMAS',
    'SHOW SEQUENCES',
    'SHOW SESSION POLICIES',
    'SHOW SHARES',
    'SHOW SHARES IN FAILOVER GROUP',
    'SHOW SHARES IN REPLICATION GROUP',
    'SHOW STAGES',
    'SHOW STREAMS',
    'SHOW TABLES',
    'SHOW TAGS',
    'SHOW TASKS',
    'SHOW TRANSACTIONS',
    'SHOW USER FUNCTIONS',
    'SHOW USERS',
    'SHOW VARIABLES',
    'SHOW VIEWS',
    'SHOW WAREHOUSES',
    'TRUNCATE MATERIALIZED VIEW',
    'UNDROP DATABASE',
    'UNDROP SCHEMA',
    'UNDROP TABLE',
    'UNDROP TAG',
    'UNSET',
    'USE DATABASE',
    'USE ROLE',
    'USE SCHEMA',
    'USE SECONDARY ROLES',
    'USE WAREHOUSE'
]);
const reservedSetOperations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'UNION [ALL]',
    'MINUS',
    'EXCEPT',
    'INTERSECT'
]);
const reservedJoins = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    '[INNER] JOIN',
    '[NATURAL] {LEFT | RIGHT | FULL} [OUTER] JOIN',
    '{CROSS | NATURAL} JOIN'
]);
const reservedKeywordPhrases = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    '{ROWS | RANGE} BETWEEN',
    'ON {UPDATE | DELETE} [SET NULL | SET DEFAULT]'
]);
const reservedDataTypePhrases = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([]);
const snowflake = {
    name: 'snowflake',
    tokenizerOptions: {
        reservedSelect,
        reservedClauses: [
            ...reservedClauses,
            ...standardOnelineClauses,
            ...tabularOnelineClauses
        ],
        reservedSetOperations,
        reservedJoins,
        reservedKeywordPhrases,
        reservedDataTypePhrases,
        reservedKeywords: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$snowflake$2f$snowflake$2e$keywords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keywords"],
        reservedDataTypes: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$snowflake$2f$snowflake$2e$keywords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dataTypes"],
        reservedFunctionNames: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$snowflake$2f$snowflake$2e$functions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["functions"],
        stringTypes: [
            '$$',
            `''-qq-bs`
        ],
        identTypes: [
            '""-qq'
        ],
        variableTypes: [
            // for accessing columns at certain positons in the table
            {
                regex: '[$][1-9]\\d*'
            },
            // identifier style syntax
            {
                regex: '[$][_a-zA-Z][_a-zA-Z0-9$]*'
            }
        ],
        extraParens: [
            '[]'
        ],
        identChars: {
            rest: '$'
        },
        lineCommentTypes: [
            '--',
            '//'
        ],
        operators: [
            // Modulo
            '%',
            // Type cast
            '::',
            // String concat
            '||',
            // Generators: https://docs.snowflake.com/en/sql-reference/functions/generator.html#generator
            '=>',
            // Assignment https://docs.snowflake.com/en/sql-reference/snowflake-scripting/let
            ':=',
            // Lambda: https://docs.snowflake.com/en/user-guide/querying-semistructured#lambda-expressions
            '->'
        ],
        propertyAccessOperators: [
            ':'
        ]
    },
    formatOptions: {
        alwaysDenseOperators: [
            '::'
        ],
        onelineClauses: [
            ...standardOnelineClauses,
            ...tabularOnelineClauses
        ],
        tabularOnelineClauses
    }
};
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/snowflake/snowflake.functions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "functions",
    ()=>functions
]);
const functions = [
    // https://docs.snowflake.com/en/sql-reference-functions.html
    //
    // https://docs.snowflake.com/en/sql-reference/functions-all.html
    // 1. run in console on this page: $x('//tbody/tr/*[1]//a/span/text()').map(x => x.nodeValue)
    // 2. split all lines that contain ',' or '/' into multiple lines
    // 3. remove all '— Deprecated' parts from the strings
    // 4. delete all strings that end with '<object_type>', they are already covered in the list
    // 5. remove all strings that contain '[', they are operators not functions
    // 6. fix all values that contain '*'
    // 7. delete operatos ':', '::', '||'
    //
    // Steps 1-5 can be combined by the following script in the developer console:
    // $x('//tbody/tr/*[1]//a/span/text()').map(x => x.nodeValue) // Step 1
    //   .map(x => x.split(x.includes(',') ? ',' : '/')).flat().map(x => x.trim()) // Step 2
    //   .map(x => x.replace('— Deprecated', '')) // Step 3
    //   .filter(x => !x.endsWith('<object_type>')) // Step 4
    //   .filter(x => !x.includes('[')) // Step 5
    'ABS',
    'ACOS',
    'ACOSH',
    'ADD_MONTHS',
    'ALL_USER_NAMES',
    'ANY_VALUE',
    'APPROX_COUNT_DISTINCT',
    'APPROX_PERCENTILE',
    'APPROX_PERCENTILE_ACCUMULATE',
    'APPROX_PERCENTILE_COMBINE',
    'APPROX_PERCENTILE_ESTIMATE',
    'APPROX_TOP_K',
    'APPROX_TOP_K_ACCUMULATE',
    'APPROX_TOP_K_COMBINE',
    'APPROX_TOP_K_ESTIMATE',
    'APPROXIMATE_JACCARD_INDEX',
    'APPROXIMATE_SIMILARITY',
    'ARRAY_AGG',
    'ARRAY_APPEND',
    'ARRAY_CAT',
    'ARRAY_COMPACT',
    'ARRAY_CONSTRUCT',
    'ARRAY_CONSTRUCT_COMPACT',
    'ARRAY_CONTAINS',
    'ARRAY_INSERT',
    'ARRAY_INTERSECTION',
    'ARRAY_POSITION',
    'ARRAY_PREPEND',
    'ARRAY_SIZE',
    'ARRAY_SLICE',
    'ARRAY_TO_STRING',
    'ARRAY_UNION_AGG',
    'ARRAY_UNIQUE_AGG',
    'ARRAYS_OVERLAP',
    'AS_ARRAY',
    'AS_BINARY',
    'AS_BOOLEAN',
    'AS_CHAR',
    'AS_VARCHAR',
    'AS_DATE',
    'AS_DECIMAL',
    'AS_NUMBER',
    'AS_DOUBLE',
    'AS_REAL',
    'AS_INTEGER',
    'AS_OBJECT',
    'AS_TIME',
    'AS_TIMESTAMP_LTZ',
    'AS_TIMESTAMP_NTZ',
    'AS_TIMESTAMP_TZ',
    'ASCII',
    'ASIN',
    'ASINH',
    'ATAN',
    'ATAN2',
    'ATANH',
    'AUTO_REFRESH_REGISTRATION_HISTORY',
    'AUTOMATIC_CLUSTERING_HISTORY',
    'AVG',
    'BASE64_DECODE_BINARY',
    'BASE64_DECODE_STRING',
    'BASE64_ENCODE',
    'BIT_LENGTH',
    'BITAND',
    'BITAND_AGG',
    'BITMAP_BIT_POSITION',
    'BITMAP_BUCKET_NUMBER',
    'BITMAP_CONSTRUCT_AGG',
    'BITMAP_COUNT',
    'BITMAP_OR_AGG',
    'BITNOT',
    'BITOR',
    'BITOR_AGG',
    'BITSHIFTLEFT',
    'BITSHIFTRIGHT',
    'BITXOR',
    'BITXOR_AGG',
    'BOOLAND',
    'BOOLAND_AGG',
    'BOOLNOT',
    'BOOLOR',
    'BOOLOR_AGG',
    'BOOLXOR',
    'BOOLXOR_AGG',
    'BUILD_SCOPED_FILE_URL',
    'BUILD_STAGE_FILE_URL',
    'CASE',
    'CAST',
    'CBRT',
    'CEIL',
    'CHARINDEX',
    'CHECK_JSON',
    'CHECK_XML',
    'CHR',
    'CHAR',
    'COALESCE',
    'COLLATE',
    'COLLATION',
    'COMPLETE_TASK_GRAPHS',
    'COMPRESS',
    'CONCAT',
    'CONCAT_WS',
    'CONDITIONAL_CHANGE_EVENT',
    'CONDITIONAL_TRUE_EVENT',
    'CONTAINS',
    'CONVERT_TIMEZONE',
    'COPY_HISTORY',
    'CORR',
    'COS',
    'COSH',
    'COT',
    'COUNT',
    'COUNT_IF',
    'COVAR_POP',
    'COVAR_SAMP',
    'CUME_DIST',
    'CURRENT_ACCOUNT',
    'CURRENT_AVAILABLE_ROLES',
    'CURRENT_CLIENT',
    'CURRENT_DATABASE',
    'CURRENT_DATE',
    'CURRENT_IP_ADDRESS',
    'CURRENT_REGION',
    'CURRENT_ROLE',
    'CURRENT_SCHEMA',
    'CURRENT_SCHEMAS',
    'CURRENT_SECONDARY_ROLES',
    'CURRENT_SESSION',
    'CURRENT_STATEMENT',
    'CURRENT_TASK_GRAPHS',
    'CURRENT_TIME',
    'CURRENT_TIMESTAMP',
    'CURRENT_TRANSACTION',
    'CURRENT_USER',
    'CURRENT_VERSION',
    'CURRENT_WAREHOUSE',
    'DATA_TRANSFER_HISTORY',
    'DATABASE_REFRESH_HISTORY',
    'DATABASE_REFRESH_PROGRESS',
    'DATABASE_REFRESH_PROGRESS_BY_JOB',
    'DATABASE_STORAGE_USAGE_HISTORY',
    'DATE_FROM_PARTS',
    'DATE_PART',
    'DATE_TRUNC',
    'DATEADD',
    'DATEDIFF',
    'DAYNAME',
    'DECODE',
    'DECOMPRESS_BINARY',
    'DECOMPRESS_STRING',
    'DECRYPT',
    'DECRYPT_RAW',
    'DEGREES',
    'DENSE_RANK',
    'DIV0',
    'EDITDISTANCE',
    'ENCRYPT',
    'ENCRYPT_RAW',
    'ENDSWITH',
    'EQUAL_NULL',
    'EXP',
    'EXPLAIN_JSON',
    'EXTERNAL_FUNCTIONS_HISTORY',
    'EXTERNAL_TABLE_FILES',
    'EXTERNAL_TABLE_FILE_REGISTRATION_HISTORY',
    'EXTRACT',
    'EXTRACT_SEMANTIC_CATEGORIES',
    'FACTORIAL',
    'FILTER',
    'FIRST_VALUE',
    'FLATTEN',
    'FLOOR',
    'GENERATE_COLUMN_DESCRIPTION',
    'GENERATOR',
    'GET',
    'GET_ABSOLUTE_PATH',
    'GET_DDL',
    'GET_IGNORE_CASE',
    'GET_OBJECT_REFERENCES',
    'GET_PATH',
    'GET_PRESIGNED_URL',
    'GET_RELATIVE_PATH',
    'GET_STAGE_LOCATION',
    'GETBIT',
    'GREATEST',
    'GREATEST_IGNORE_NULLS',
    'GROUPING',
    'GROUPING_ID',
    'HASH',
    'HASH_AGG',
    'HAVERSINE',
    'HEX_DECODE_BINARY',
    'HEX_DECODE_STRING',
    'HEX_ENCODE',
    'HLL',
    'HLL_ACCUMULATE',
    'HLL_COMBINE',
    'HLL_ESTIMATE',
    'HLL_EXPORT',
    'HLL_IMPORT',
    'HOUR',
    'MINUTE',
    'SECOND',
    'IDENTIFIER',
    'IFF',
    'IFNULL',
    'ILIKE',
    'ILIKE ANY',
    'INFER_SCHEMA',
    'INITCAP',
    'INSERT',
    'INVOKER_ROLE',
    'INVOKER_SHARE',
    'IS_ARRAY',
    'IS_BINARY',
    'IS_BOOLEAN',
    'IS_CHAR',
    'IS_VARCHAR',
    'IS_DATE',
    'IS_DATE_VALUE',
    'IS_DECIMAL',
    'IS_DOUBLE',
    'IS_REAL',
    'IS_GRANTED_TO_INVOKER_ROLE',
    'IS_INTEGER',
    'IS_NULL_VALUE',
    'IS_OBJECT',
    'IS_ROLE_IN_SESSION',
    'IS_TIME',
    'IS_TIMESTAMP_LTZ',
    'IS_TIMESTAMP_NTZ',
    'IS_TIMESTAMP_TZ',
    'JAROWINKLER_SIMILARITY',
    'JSON_EXTRACT_PATH_TEXT',
    'KURTOSIS',
    'LAG',
    'LAST_DAY',
    'LAST_QUERY_ID',
    'LAST_TRANSACTION',
    'LAST_VALUE',
    'LEAD',
    'LEAST',
    'LEFT',
    'LENGTH',
    'LEN',
    'LIKE',
    'LIKE ALL',
    'LIKE ANY',
    'LISTAGG',
    'LN',
    'LOCALTIME',
    'LOCALTIMESTAMP',
    'LOG',
    'LOGIN_HISTORY',
    'LOGIN_HISTORY_BY_USER',
    'LOWER',
    'LPAD',
    'LTRIM',
    'MATERIALIZED_VIEW_REFRESH_HISTORY',
    'MD5',
    'MD5_HEX',
    'MD5_BINARY',
    'MD5_NUMBER — Obsoleted',
    'MD5_NUMBER_LOWER64',
    'MD5_NUMBER_UPPER64',
    'MEDIAN',
    'MIN',
    'MAX',
    'MINHASH',
    'MINHASH_COMBINE',
    'MOD',
    'MODE',
    'MONTHNAME',
    'MONTHS_BETWEEN',
    'NEXT_DAY',
    'NORMAL',
    'NTH_VALUE',
    'NTILE',
    'NULLIF',
    'NULLIFZERO',
    'NVL',
    'NVL2',
    'OBJECT_AGG',
    'OBJECT_CONSTRUCT',
    'OBJECT_CONSTRUCT_KEEP_NULL',
    'OBJECT_DELETE',
    'OBJECT_INSERT',
    'OBJECT_KEYS',
    'OBJECT_PICK',
    'OCTET_LENGTH',
    'PARSE_IP',
    'PARSE_JSON',
    'PARSE_URL',
    'PARSE_XML',
    'PERCENT_RANK',
    'PERCENTILE_CONT',
    'PERCENTILE_DISC',
    'PI',
    'PIPE_USAGE_HISTORY',
    'POLICY_CONTEXT',
    'POLICY_REFERENCES',
    'POSITION',
    'POW',
    'POWER',
    'PREVIOUS_DAY',
    'QUERY_ACCELERATION_HISTORY',
    'QUERY_HISTORY',
    'QUERY_HISTORY_BY_SESSION',
    'QUERY_HISTORY_BY_USER',
    'QUERY_HISTORY_BY_WAREHOUSE',
    'RADIANS',
    'RANDOM',
    'RANDSTR',
    'RANK',
    'RATIO_TO_REPORT',
    'REGEXP',
    'REGEXP_COUNT',
    'REGEXP_INSTR',
    'REGEXP_LIKE',
    'REGEXP_REPLACE',
    'REGEXP_SUBSTR',
    'REGEXP_SUBSTR_ALL',
    'REGR_AVGX',
    'REGR_AVGY',
    'REGR_COUNT',
    'REGR_INTERCEPT',
    'REGR_R2',
    'REGR_SLOPE',
    'REGR_SXX',
    'REGR_SXY',
    'REGR_SYY',
    'REGR_VALX',
    'REGR_VALY',
    'REPEAT',
    'REPLACE',
    'REPLICATION_GROUP_REFRESH_HISTORY',
    'REPLICATION_GROUP_REFRESH_PROGRESS',
    'REPLICATION_GROUP_REFRESH_PROGRESS_BY_JOB',
    'REPLICATION_GROUP_USAGE_HISTORY',
    'REPLICATION_USAGE_HISTORY',
    'REST_EVENT_HISTORY',
    'RESULT_SCAN',
    'REVERSE',
    'RIGHT',
    'RLIKE',
    'ROUND',
    'ROW_NUMBER',
    'RPAD',
    'RTRIM',
    'RTRIMMED_LENGTH',
    'SEARCH_OPTIMIZATION_HISTORY',
    'SEQ1',
    'SEQ2',
    'SEQ4',
    'SEQ8',
    'SERVERLESS_TASK_HISTORY',
    'SHA1',
    'SHA1_HEX',
    'SHA1_BINARY',
    'SHA2',
    'SHA2_HEX',
    'SHA2_BINARY',
    'SIGN',
    'SIN',
    'SINH',
    'SKEW',
    'SOUNDEX',
    'SPACE',
    'SPLIT',
    'SPLIT_PART',
    'SPLIT_TO_TABLE',
    'SQRT',
    'SQUARE',
    'ST_AREA',
    'ST_ASEWKB',
    'ST_ASEWKT',
    'ST_ASGEOJSON',
    'ST_ASWKB',
    'ST_ASBINARY',
    'ST_ASWKT',
    'ST_ASTEXT',
    'ST_AZIMUTH',
    'ST_CENTROID',
    'ST_COLLECT',
    'ST_CONTAINS',
    'ST_COVEREDBY',
    'ST_COVERS',
    'ST_DIFFERENCE',
    'ST_DIMENSION',
    'ST_DISJOINT',
    'ST_DISTANCE',
    'ST_DWITHIN',
    'ST_ENDPOINT',
    'ST_ENVELOPE',
    'ST_GEOGFROMGEOHASH',
    'ST_GEOGPOINTFROMGEOHASH',
    'ST_GEOGRAPHYFROMWKB',
    'ST_GEOGRAPHYFROMWKT',
    'ST_GEOHASH',
    'ST_GEOMETRYFROMWKB',
    'ST_GEOMETRYFROMWKT',
    'ST_HAUSDORFFDISTANCE',
    'ST_INTERSECTION',
    'ST_INTERSECTS',
    'ST_LENGTH',
    'ST_MAKEGEOMPOINT',
    'ST_GEOM_POINT',
    'ST_MAKELINE',
    'ST_MAKEPOINT',
    'ST_POINT',
    'ST_MAKEPOLYGON',
    'ST_POLYGON',
    'ST_NPOINTS',
    'ST_NUMPOINTS',
    'ST_PERIMETER',
    'ST_POINTN',
    'ST_SETSRID',
    'ST_SIMPLIFY',
    'ST_SRID',
    'ST_STARTPOINT',
    'ST_SYMDIFFERENCE',
    'ST_UNION',
    'ST_WITHIN',
    'ST_X',
    'ST_XMAX',
    'ST_XMIN',
    'ST_Y',
    'ST_YMAX',
    'ST_YMIN',
    'STAGE_DIRECTORY_FILE_REGISTRATION_HISTORY',
    'STAGE_STORAGE_USAGE_HISTORY',
    'STARTSWITH',
    'STDDEV',
    'STDDEV_POP',
    'STDDEV_SAMP',
    'STRIP_NULL_VALUE',
    'STRTOK',
    'STRTOK_SPLIT_TO_TABLE',
    'STRTOK_TO_ARRAY',
    'SUBSTR',
    'SUBSTRING',
    'SUM',
    'SYSDATE',
    'SYSTEM$ABORT_SESSION',
    'SYSTEM$ABORT_TRANSACTION',
    'SYSTEM$AUTHORIZE_PRIVATELINK',
    'SYSTEM$AUTHORIZE_STAGE_PRIVATELINK_ACCESS',
    'SYSTEM$BEHAVIOR_CHANGE_BUNDLE_STATUS',
    'SYSTEM$CANCEL_ALL_QUERIES',
    'SYSTEM$CANCEL_QUERY',
    'SYSTEM$CLUSTERING_DEPTH',
    'SYSTEM$CLUSTERING_INFORMATION',
    'SYSTEM$CLUSTERING_RATIO ',
    'SYSTEM$CURRENT_USER_TASK_NAME',
    'SYSTEM$DATABASE_REFRESH_HISTORY ',
    'SYSTEM$DATABASE_REFRESH_PROGRESS',
    'SYSTEM$DATABASE_REFRESH_PROGRESS_BY_JOB ',
    'SYSTEM$DISABLE_BEHAVIOR_CHANGE_BUNDLE',
    'SYSTEM$DISABLE_DATABASE_REPLICATION',
    'SYSTEM$ENABLE_BEHAVIOR_CHANGE_BUNDLE',
    'SYSTEM$ESTIMATE_QUERY_ACCELERATION',
    'SYSTEM$ESTIMATE_SEARCH_OPTIMIZATION_COSTS',
    'SYSTEM$EXPLAIN_JSON_TO_TEXT',
    'SYSTEM$EXPLAIN_PLAN_JSON',
    'SYSTEM$EXTERNAL_TABLE_PIPE_STATUS',
    'SYSTEM$GENERATE_SAML_CSR',
    'SYSTEM$GENERATE_SCIM_ACCESS_TOKEN',
    'SYSTEM$GET_AWS_SNS_IAM_POLICY',
    'SYSTEM$GET_PREDECESSOR_RETURN_VALUE',
    'SYSTEM$GET_PRIVATELINK',
    'SYSTEM$GET_PRIVATELINK_AUTHORIZED_ENDPOINTS',
    'SYSTEM$GET_PRIVATELINK_CONFIG',
    'SYSTEM$GET_SNOWFLAKE_PLATFORM_INFO',
    'SYSTEM$GET_TAG',
    'SYSTEM$GET_TAG_ALLOWED_VALUES',
    'SYSTEM$GET_TAG_ON_CURRENT_COLUMN',
    'SYSTEM$GET_TAG_ON_CURRENT_TABLE',
    'SYSTEM$GLOBAL_ACCOUNT_SET_PARAMETER',
    'SYSTEM$LAST_CHANGE_COMMIT_TIME',
    'SYSTEM$LINK_ACCOUNT_OBJECTS_BY_NAME',
    'SYSTEM$MIGRATE_SAML_IDP_REGISTRATION',
    'SYSTEM$PIPE_FORCE_RESUME',
    'SYSTEM$PIPE_STATUS',
    'SYSTEM$REVOKE_PRIVATELINK',
    'SYSTEM$REVOKE_STAGE_PRIVATELINK_ACCESS',
    'SYSTEM$SET_RETURN_VALUE',
    'SYSTEM$SHOW_OAUTH_CLIENT_SECRETS',
    'SYSTEM$STREAM_GET_TABLE_TIMESTAMP',
    'SYSTEM$STREAM_HAS_DATA',
    'SYSTEM$TASK_DEPENDENTS_ENABLE',
    'SYSTEM$TYPEOF',
    'SYSTEM$USER_TASK_CANCEL_ONGOING_EXECUTIONS',
    'SYSTEM$VERIFY_EXTERNAL_OAUTH_TOKEN',
    'SYSTEM$WAIT',
    'SYSTEM$WHITELIST',
    'SYSTEM$WHITELIST_PRIVATELINK',
    'TAG_REFERENCES',
    'TAG_REFERENCES_ALL_COLUMNS',
    'TAG_REFERENCES_WITH_LINEAGE',
    'TAN',
    'TANH',
    'TASK_DEPENDENTS',
    'TASK_HISTORY',
    'TIME_FROM_PARTS',
    'TIME_SLICE',
    'TIMEADD',
    'TIMEDIFF',
    'TIMESTAMP_FROM_PARTS',
    'TIMESTAMPADD',
    'TIMESTAMPDIFF',
    'TO_ARRAY',
    'TO_BINARY',
    'TO_BOOLEAN',
    'TO_CHAR',
    'TO_VARCHAR',
    'TO_DATE',
    'DATE',
    'TO_DECIMAL',
    'TO_NUMBER',
    'TO_NUMERIC',
    'TO_DOUBLE',
    'TO_GEOGRAPHY',
    'TO_GEOMETRY',
    'TO_JSON',
    'TO_OBJECT',
    'TO_TIME',
    'TIME',
    'TO_TIMESTAMP',
    'TO_TIMESTAMP_LTZ',
    'TO_TIMESTAMP_NTZ',
    'TO_TIMESTAMP_TZ',
    'TO_VARIANT',
    'TO_XML',
    'TRANSLATE',
    'TRIM',
    'TRUNCATE',
    'TRUNC',
    'TRUNC',
    'TRY_BASE64_DECODE_BINARY',
    'TRY_BASE64_DECODE_STRING',
    'TRY_CAST',
    'TRY_HEX_DECODE_BINARY',
    'TRY_HEX_DECODE_STRING',
    'TRY_PARSE_JSON',
    'TRY_TO_BINARY',
    'TRY_TO_BOOLEAN',
    'TRY_TO_DATE',
    'TRY_TO_DECIMAL',
    'TRY_TO_NUMBER',
    'TRY_TO_NUMERIC',
    'TRY_TO_DOUBLE',
    'TRY_TO_GEOGRAPHY',
    'TRY_TO_GEOMETRY',
    'TRY_TO_TIME',
    'TRY_TO_TIMESTAMP',
    'TRY_TO_TIMESTAMP_LTZ',
    'TRY_TO_TIMESTAMP_NTZ',
    'TRY_TO_TIMESTAMP_TZ',
    'TYPEOF',
    'UNICODE',
    'UNIFORM',
    'UPPER',
    'UUID_STRING',
    'VALIDATE',
    'VALIDATE_PIPE_LOAD',
    'VAR_POP',
    'VAR_SAMP',
    'VARIANCE',
    'VARIANCE_SAMP',
    'VARIANCE_POP',
    'WAREHOUSE_LOAD_HISTORY',
    'WAREHOUSE_METERING_HISTORY',
    'WIDTH_BUCKET',
    'XMLGET',
    'YEAR',
    'YEAROFWEEK',
    'YEAROFWEEKISO',
    'DAY',
    'DAYOFMONTH',
    'DAYOFWEEK',
    'DAYOFWEEKISO',
    'DAYOFYEAR',
    'WEEK',
    'WEEK',
    'WEEKOFYEAR',
    'WEEKISO',
    'MONTH',
    'QUARTER',
    'ZEROIFNULL',
    'ZIPF'
];
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/snowflake/snowflake.keywords.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "dataTypes",
    ()=>dataTypes,
    "keywords",
    ()=>keywords
]);
const keywords = [
    // https://docs.snowflake.com/en/sql-reference/reserved-keywords.html
    //
    // run in console on this page: $x('//tbody/tr/*[1]/p/text()').map(x => x.nodeValue)
    'ACCOUNT',
    'ALL',
    'ALTER',
    'AND',
    'ANY',
    'AS',
    'BETWEEN',
    'BY',
    'CASE',
    'CAST',
    'CHECK',
    'COLUMN',
    'CONNECT',
    'CONNECTION',
    'CONSTRAINT',
    'CREATE',
    'CROSS',
    'CURRENT',
    'CURRENT_DATE',
    'CURRENT_TIME',
    'CURRENT_TIMESTAMP',
    'CURRENT_USER',
    'DATABASE',
    'DELETE',
    'DISTINCT',
    'DROP',
    'ELSE',
    'EXISTS',
    'FALSE',
    'FOLLOWING',
    'FOR',
    'FROM',
    'FULL',
    'GRANT',
    'GROUP',
    'GSCLUSTER',
    'HAVING',
    'ILIKE',
    'IN',
    'INCREMENT',
    'INNER',
    'INSERT',
    'INTERSECT',
    'INTO',
    'IS',
    'ISSUE',
    'JOIN',
    'LATERAL',
    'LEFT',
    'LIKE',
    'LOCALTIME',
    'LOCALTIMESTAMP',
    'MINUS',
    'NATURAL',
    'NOT',
    'NULL',
    'OF',
    'ON',
    'OR',
    'ORDER',
    'ORGANIZATION',
    'QUALIFY',
    'REGEXP',
    'REVOKE',
    'RIGHT',
    'RLIKE',
    'ROW',
    'ROWS',
    'SAMPLE',
    'SCHEMA',
    'SELECT',
    'SET',
    'SOME',
    'START',
    'TABLE',
    'TABLESAMPLE',
    'THEN',
    'TO',
    'TRIGGER',
    'TRUE',
    'TRY_CAST',
    'UNION',
    'UNIQUE',
    'UPDATE',
    'USING',
    'VALUES',
    'VIEW',
    'WHEN',
    'WHENEVER',
    'WHERE',
    'WITH',
    // These are definitely keywords, but haven't found a definite list in the docs
    'COMMENT'
];
const dataTypes = [
    'NUMBER',
    'DECIMAL',
    'NUMERIC',
    'INT',
    'INTEGER',
    'BIGINT',
    'SMALLINT',
    'TINYINT',
    'BYTEINT',
    'FLOAT',
    'FLOAT4',
    'FLOAT8',
    'DOUBLE',
    'DOUBLE PRECISION',
    'REAL',
    'VARCHAR',
    'CHAR',
    'CHARACTER',
    'STRING',
    'TEXT',
    'BINARY',
    'VARBINARY',
    'BOOLEAN',
    'DATE',
    'DATETIME',
    'TIME',
    'TIMESTAMP',
    'TIMESTAMP_LTZ',
    'TIMESTAMP_NTZ',
    'TIMESTAMP',
    'TIMESTAMP_TZ',
    'VARIANT',
    'OBJECT',
    'ARRAY',
    'GEOGRAPHY',
    'GEOMETRY'
];
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/spark/spark.formatter.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "spark",
    ()=>spark
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/expandPhrases.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/lexer/token.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$spark$2f$spark$2e$keywords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/spark/spark.keywords.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$spark$2f$spark$2e$functions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/spark/spark.functions.js [app-client] (ecmascript)");
;
;
;
;
// http://spark.apache.org/docs/latest/sql-ref-syntax.html
const reservedSelect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'SELECT [ALL | DISTINCT]'
]);
const reservedClauses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    // queries
    'WITH',
    'FROM',
    'WHERE',
    'GROUP BY',
    'HAVING',
    'WINDOW',
    'PARTITION BY',
    'ORDER BY',
    'SORT BY',
    'CLUSTER BY',
    'DISTRIBUTE BY',
    'LIMIT',
    // Data manipulation
    // - insert:
    'INSERT [INTO | OVERWRITE] [TABLE]',
    'VALUES',
    // - insert overwrite directory:
    //   https://spark.apache.org/docs/latest/sql-ref-syntax-dml-insert-overwrite-directory.html
    'INSERT OVERWRITE [LOCAL] DIRECTORY',
    // - load:
    //   https://spark.apache.org/docs/latest/sql-ref-syntax-dml-load.html
    'LOAD DATA [LOCAL] INPATH',
    '[OVERWRITE] INTO TABLE'
]);
const standardOnelineClauses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'CREATE [EXTERNAL] TABLE [IF NOT EXISTS]'
]);
const tabularOnelineClauses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    // - create:
    'CREATE [OR REPLACE] [GLOBAL TEMPORARY | TEMPORARY] VIEW [IF NOT EXISTS]',
    // - drop table:
    'DROP TABLE [IF EXISTS]',
    // - alter table:
    'ALTER TABLE',
    'ADD COLUMNS',
    'DROP {COLUMN | COLUMNS}',
    'RENAME TO',
    'RENAME COLUMN',
    'ALTER COLUMN',
    // - truncate:
    'TRUNCATE TABLE',
    // other
    'LATERAL VIEW',
    'ALTER DATABASE',
    'ALTER VIEW',
    'CREATE DATABASE',
    'CREATE FUNCTION',
    'DROP DATABASE',
    'DROP FUNCTION',
    'DROP VIEW',
    'REPAIR TABLE',
    'USE DATABASE',
    // Data Retrieval
    'TABLESAMPLE',
    'PIVOT',
    'TRANSFORM',
    'EXPLAIN',
    // Auxiliary
    'ADD FILE',
    'ADD JAR',
    'ANALYZE TABLE',
    'CACHE TABLE',
    'CLEAR CACHE',
    'DESCRIBE DATABASE',
    'DESCRIBE FUNCTION',
    'DESCRIBE QUERY',
    'DESCRIBE TABLE',
    'LIST FILE',
    'LIST JAR',
    'REFRESH',
    'REFRESH TABLE',
    'REFRESH FUNCTION',
    'RESET',
    'SHOW COLUMNS',
    'SHOW CREATE TABLE',
    'SHOW DATABASES',
    'SHOW FUNCTIONS',
    'SHOW PARTITIONS',
    'SHOW TABLE EXTENDED',
    'SHOW TABLES',
    'SHOW TBLPROPERTIES',
    'SHOW VIEWS',
    'UNCACHE TABLE'
]);
const reservedSetOperations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'UNION [ALL | DISTINCT]',
    'EXCEPT [ALL | DISTINCT]',
    'INTERSECT [ALL | DISTINCT]'
]);
const reservedJoins = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'JOIN',
    '{LEFT | RIGHT | FULL} [OUTER] JOIN',
    '{INNER | CROSS} JOIN',
    'NATURAL [INNER] JOIN',
    'NATURAL {LEFT | RIGHT | FULL} [OUTER] JOIN',
    // non-standard-joins
    '[LEFT] {ANTI | SEMI} JOIN',
    'NATURAL [LEFT] {ANTI | SEMI} JOIN'
]);
const reservedKeywordPhrases = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'ON DELETE',
    'ON UPDATE',
    'CURRENT ROW',
    '{ROWS | RANGE} BETWEEN'
]);
const reservedDataTypePhrases = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([]);
const spark = {
    name: 'spark',
    tokenizerOptions: {
        reservedSelect,
        reservedClauses: [
            ...reservedClauses,
            ...standardOnelineClauses,
            ...tabularOnelineClauses
        ],
        reservedSetOperations,
        reservedJoins,
        reservedKeywordPhrases,
        reservedDataTypePhrases,
        supportsXor: true,
        reservedKeywords: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$spark$2f$spark$2e$keywords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keywords"],
        reservedDataTypes: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$spark$2f$spark$2e$keywords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dataTypes"],
        reservedFunctionNames: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$spark$2f$spark$2e$functions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["functions"],
        extraParens: [
            '[]'
        ],
        stringTypes: [
            "''-bs",
            '""-bs',
            {
                quote: "''-raw",
                prefixes: [
                    'R',
                    'X'
                ],
                requirePrefix: true
            },
            {
                quote: '""-raw',
                prefixes: [
                    'R',
                    'X'
                ],
                requirePrefix: true
            }
        ],
        identTypes: [
            '``'
        ],
        identChars: {
            allowFirstCharNumber: true
        },
        variableTypes: [
            {
                quote: '{}',
                prefixes: [
                    '$'
                ],
                requirePrefix: true
            }
        ],
        operators: [
            '%',
            '~',
            '^',
            '|',
            '&',
            '<=>',
            '==',
            '!',
            '||',
            '->'
        ],
        postProcess
    },
    formatOptions: {
        onelineClauses: [
            ...standardOnelineClauses,
            ...tabularOnelineClauses
        ],
        tabularOnelineClauses
    }
};
function postProcess(tokens) {
    return tokens.map((token, i)=>{
        const prevToken = tokens[i - 1] || __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EOF_TOKEN"];
        const nextToken = tokens[i + 1] || __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EOF_TOKEN"];
        // [WINDOW](...)
        if (__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isToken"].WINDOW(token) && nextToken.type === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].OPEN_PAREN) {
            // This is a function call, treat it as a reserved function name
            return Object.assign(Object.assign({}, token), {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].RESERVED_FUNCTION_NAME
            });
        }
        // TODO: deprecate this once ITEMS is merged with COLLECTION
        if (token.text === 'ITEMS' && token.type === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].RESERVED_KEYWORD) {
            if (!(prevToken.text === 'COLLECTION' && nextToken.text === 'TERMINATED')) {
                // this is a word and not COLLECTION ITEMS
                return Object.assign(Object.assign({}, token), {
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].IDENTIFIER,
                    text: token.raw
                });
            }
        }
        return token;
    });
}
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/spark/spark.functions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "functions",
    ()=>functions
]);
const functions = [
    // http://spark.apache.org/docs/latest/sql-ref-functions.html
    //
    // http://spark.apache.org/docs/latest/sql-ref-functions-builtin.html#aggregate-functions
    // 'ANY',
    'APPROX_COUNT_DISTINCT',
    'APPROX_PERCENTILE',
    'AVG',
    'BIT_AND',
    'BIT_OR',
    'BIT_XOR',
    'BOOL_AND',
    'BOOL_OR',
    'COLLECT_LIST',
    'COLLECT_SET',
    'CORR',
    'COUNT',
    'COUNT',
    'COUNT',
    'COUNT_IF',
    'COUNT_MIN_SKETCH',
    'COVAR_POP',
    'COVAR_SAMP',
    'EVERY',
    'FIRST',
    'FIRST_VALUE',
    'GROUPING',
    'GROUPING_ID',
    'KURTOSIS',
    'LAST',
    'LAST_VALUE',
    'MAX',
    'MAX_BY',
    'MEAN',
    'MIN',
    'MIN_BY',
    'PERCENTILE',
    'PERCENTILE',
    'PERCENTILE_APPROX',
    'SKEWNESS',
    // 'SOME',
    'STD',
    'STDDEV',
    'STDDEV_POP',
    'STDDEV_SAMP',
    'SUM',
    'VAR_POP',
    'VAR_SAMP',
    'VARIANCE',
    // http://spark.apache.org/docs/latest/sql-ref-functions-builtin.html#window-functions
    'CUME_DIST',
    'DENSE_RANK',
    'LAG',
    'LEAD',
    'NTH_VALUE',
    'NTILE',
    'PERCENT_RANK',
    'RANK',
    'ROW_NUMBER',
    // http://spark.apache.org/docs/latest/sql-ref-functions-builtin.html#array-functions
    'ARRAY',
    'ARRAY_CONTAINS',
    'ARRAY_DISTINCT',
    'ARRAY_EXCEPT',
    'ARRAY_INTERSECT',
    'ARRAY_JOIN',
    'ARRAY_MAX',
    'ARRAY_MIN',
    'ARRAY_POSITION',
    'ARRAY_REMOVE',
    'ARRAY_REPEAT',
    'ARRAY_UNION',
    'ARRAYS_OVERLAP',
    'ARRAYS_ZIP',
    'FLATTEN',
    'SEQUENCE',
    'SHUFFLE',
    'SLICE',
    'SORT_ARRAY',
    // http://spark.apache.org/docs/latest/sql-ref-functions-builtin.html#map-functions
    'ELEMENT_AT',
    'ELEMENT_AT',
    'MAP_CONCAT',
    'MAP_ENTRIES',
    'MAP_FROM_ARRAYS',
    'MAP_FROM_ENTRIES',
    'MAP_KEYS',
    'MAP_VALUES',
    'STR_TO_MAP',
    // http://spark.apache.org/docs/latest/sql-ref-functions-builtin.html#date-and-timestamp-functions
    'ADD_MONTHS',
    'CURRENT_DATE',
    'CURRENT_DATE',
    'CURRENT_TIMESTAMP',
    'CURRENT_TIMESTAMP',
    'CURRENT_TIMEZONE',
    'DATE_ADD',
    'DATE_FORMAT',
    'DATE_FROM_UNIX_DATE',
    'DATE_PART',
    'DATE_SUB',
    'DATE_TRUNC',
    'DATEDIFF',
    'DAY',
    'DAYOFMONTH',
    'DAYOFWEEK',
    'DAYOFYEAR',
    'EXTRACT',
    'FROM_UNIXTIME',
    'FROM_UTC_TIMESTAMP',
    'HOUR',
    'LAST_DAY',
    'MAKE_DATE',
    'MAKE_DT_INTERVAL',
    'MAKE_INTERVAL',
    'MAKE_TIMESTAMP',
    'MAKE_YM_INTERVAL',
    'MINUTE',
    'MONTH',
    'MONTHS_BETWEEN',
    'NEXT_DAY',
    'NOW',
    'QUARTER',
    'SECOND',
    'SESSION_WINDOW',
    'TIMESTAMP_MICROS',
    'TIMESTAMP_MILLIS',
    'TIMESTAMP_SECONDS',
    'TO_DATE',
    'TO_TIMESTAMP',
    'TO_UNIX_TIMESTAMP',
    'TO_UTC_TIMESTAMP',
    'TRUNC',
    'UNIX_DATE',
    'UNIX_MICROS',
    'UNIX_MILLIS',
    'UNIX_SECONDS',
    'UNIX_TIMESTAMP',
    'WEEKDAY',
    'WEEKOFYEAR',
    'WINDOW',
    'YEAR',
    // http://spark.apache.org/docs/latest/sql-ref-functions-builtin.html#json-functions
    'FROM_JSON',
    'GET_JSON_OBJECT',
    'JSON_ARRAY_LENGTH',
    'JSON_OBJECT_KEYS',
    'JSON_TUPLE',
    'SCHEMA_OF_JSON',
    'TO_JSON',
    // http://spark.apache.org/docs/latest/api/sql/index.html
    'ABS',
    'ACOS',
    'ACOSH',
    'AGGREGATE',
    'ARRAY_SORT',
    'ASCII',
    'ASIN',
    'ASINH',
    'ASSERT_TRUE',
    'ATAN',
    'ATAN2',
    'ATANH',
    'BASE64',
    'BIN',
    'BIT_COUNT',
    'BIT_GET',
    'BIT_LENGTH',
    'BROUND',
    'BTRIM',
    'CARDINALITY',
    'CBRT',
    'CEIL',
    'CEILING',
    'CHAR_LENGTH',
    'CHARACTER_LENGTH',
    'CHR',
    'CONCAT',
    'CONCAT_WS',
    'CONV',
    'COS',
    'COSH',
    'COT',
    'CRC32',
    'CURRENT_CATALOG',
    'CURRENT_DATABASE',
    'CURRENT_USER',
    'DEGREES',
    // 'E',
    'ELT',
    'EXP',
    'EXPM1',
    'FACTORIAL',
    'FIND_IN_SET',
    'FLOOR',
    'FORALL',
    'FORMAT_NUMBER',
    'FORMAT_STRING',
    'FROM_CSV',
    'GETBIT',
    'HASH',
    'HEX',
    'HYPOT',
    'INITCAP',
    'INLINE',
    'INLINE_OUTER',
    'INPUT_FILE_BLOCK_LENGTH',
    'INPUT_FILE_BLOCK_START',
    'INPUT_FILE_NAME',
    'INSTR',
    'ISNAN',
    'ISNOTNULL',
    'ISNULL',
    'JAVA_METHOD',
    'LCASE',
    'LEFT',
    'LENGTH',
    'LEVENSHTEIN',
    'LN',
    'LOCATE',
    'LOG',
    'LOG10',
    'LOG1P',
    'LOG2',
    'LOWER',
    'LPAD',
    'LTRIM',
    'MAP_FILTER',
    'MAP_ZIP_WITH',
    'MD5',
    'MOD',
    'MONOTONICALLY_INCREASING_ID',
    'NAMED_STRUCT',
    'NANVL',
    'NEGATIVE',
    'NVL',
    'NVL2',
    'OCTET_LENGTH',
    'OVERLAY',
    'PARSE_URL',
    'PI',
    'PMOD',
    'POSEXPLODE',
    'POSEXPLODE_OUTER',
    'POSITION',
    'POSITIVE',
    'POW',
    'POWER',
    'PRINTF',
    'RADIANS',
    'RAISE_ERROR',
    'RAND',
    'RANDN',
    'RANDOM',
    'REFLECT',
    'REGEXP_EXTRACT',
    'REGEXP_EXTRACT_ALL',
    'REGEXP_LIKE',
    'REGEXP_REPLACE',
    'REPEAT',
    'REPLACE',
    'REVERSE',
    'RIGHT',
    'RINT',
    'ROUND',
    'RPAD',
    'RTRIM',
    'SCHEMA_OF_CSV',
    'SENTENCES',
    'SHA',
    'SHA1',
    'SHA2',
    'SHIFTLEFT',
    'SHIFTRIGHT',
    'SHIFTRIGHTUNSIGNED',
    'SIGN',
    'SIGNUM',
    'SIN',
    'SINH',
    'SOUNDEX',
    'SPACE',
    'SPARK_PARTITION_ID',
    'SPLIT',
    'SQRT',
    'STACK',
    'SUBSTR',
    'SUBSTRING',
    'SUBSTRING_INDEX',
    'TAN',
    'TANH',
    'TO_CSV',
    'TRANSFORM_KEYS',
    'TRANSFORM_VALUES',
    'TRANSLATE',
    'TRIM',
    'TRY_ADD',
    'TRY_DIVIDE',
    'TYPEOF',
    'UCASE',
    'UNBASE64',
    'UNHEX',
    'UPPER',
    'UUID',
    'VERSION',
    'WIDTH_BUCKET',
    'XPATH',
    'XPATH_BOOLEAN',
    'XPATH_DOUBLE',
    'XPATH_FLOAT',
    'XPATH_INT',
    'XPATH_LONG',
    'XPATH_NUMBER',
    'XPATH_SHORT',
    'XPATH_STRING',
    'XXHASH64',
    'ZIP_WITH',
    // cast
    'CAST',
    // Shorthand functions to use in place of CASE expression
    'COALESCE',
    'NULLIF'
];
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/spark/spark.keywords.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "dataTypes",
    ()=>dataTypes,
    "keywords",
    ()=>keywords
]);
const keywords = [
    // https://deepkb.com/CO_000013/en/kb/IMPORT-fbfa59f0-2bf1-31fe-bb7b-0f9efe9932c6/spark-sql-keywords
    'ADD',
    'AFTER',
    'ALL',
    'ALTER',
    'ANALYZE',
    'AND',
    'ANTI',
    'ANY',
    'ARCHIVE',
    'AS',
    'ASC',
    'AT',
    'AUTHORIZATION',
    'BETWEEN',
    'BOTH',
    'BUCKET',
    'BUCKETS',
    'BY',
    'CACHE',
    'CASCADE',
    'CAST',
    'CHANGE',
    'CHECK',
    'CLEAR',
    'CLUSTER',
    'CLUSTERED',
    'CODEGEN',
    'COLLATE',
    'COLLECTION',
    'COLUMN',
    'COLUMNS',
    'COMMENT',
    'COMMIT',
    'COMPACT',
    'COMPACTIONS',
    'COMPUTE',
    'CONCATENATE',
    'CONSTRAINT',
    'COST',
    'CREATE',
    'CROSS',
    'CUBE',
    'CURRENT',
    'CURRENT_DATE',
    'CURRENT_TIME',
    'CURRENT_TIMESTAMP',
    'CURRENT_USER',
    'DATA',
    'DATABASE',
    'DATABASES',
    'DAY',
    'DBPROPERTIES',
    'DEFINED',
    'DELETE',
    'DELIMITED',
    'DESC',
    'DESCRIBE',
    'DFS',
    'DIRECTORIES',
    'DIRECTORY',
    'DISTINCT',
    'DISTRIBUTE',
    'DIV',
    'DROP',
    'ESCAPE',
    'ESCAPED',
    'EXCEPT',
    'EXCHANGE',
    'EXISTS',
    'EXPORT',
    'EXTENDED',
    'EXTERNAL',
    'EXTRACT',
    'FALSE',
    'FETCH',
    'FIELDS',
    'FILTER',
    'FILEFORMAT',
    'FIRST',
    'FIRST_VALUE',
    'FOLLOWING',
    'FOR',
    'FOREIGN',
    'FORMAT',
    'FORMATTED',
    'FULL',
    'FUNCTION',
    'FUNCTIONS',
    'GLOBAL',
    'GRANT',
    'GROUP',
    'GROUPING',
    'HOUR',
    'IF',
    'IGNORE',
    'IMPORT',
    'IN',
    'INDEX',
    'INDEXES',
    'INNER',
    'INPATH',
    'INPUTFORMAT',
    'INTERSECT',
    'INTO',
    'IS',
    'ITEMS',
    'KEYS',
    'LAST',
    'LAST_VALUE',
    'LATERAL',
    'LAZY',
    'LEADING',
    'LEFT',
    'LIKE',
    'LINES',
    'LIST',
    'LOCAL',
    'LOCATION',
    'LOCK',
    'LOCKS',
    'LOGICAL',
    'MACRO',
    'MATCHED',
    'MERGE',
    'MINUTE',
    'MONTH',
    'MSCK',
    'NAMESPACE',
    'NAMESPACES',
    'NATURAL',
    'NO',
    'NOT',
    'NULL',
    'NULLS',
    'OF',
    'ONLY',
    'OPTION',
    'OPTIONS',
    'OR',
    'ORDER',
    'OUT',
    'OUTER',
    'OUTPUTFORMAT',
    'OVER',
    'OVERLAPS',
    'OVERLAY',
    'OVERWRITE',
    'OWNER',
    'PARTITION',
    'PARTITIONED',
    'PARTITIONS',
    'PERCENT',
    'PLACING',
    'POSITION',
    'PRECEDING',
    'PRIMARY',
    'PRINCIPALS',
    'PROPERTIES',
    'PURGE',
    'QUERY',
    'RANGE',
    'RECORDREADER',
    'RECORDWRITER',
    'RECOVER',
    'REDUCE',
    'REFERENCES',
    'RENAME',
    'REPAIR',
    'REPLACE',
    'RESPECT',
    'RESTRICT',
    'REVOKE',
    'RIGHT',
    'RLIKE',
    'ROLE',
    'ROLES',
    'ROLLBACK',
    'ROLLUP',
    'ROW',
    'ROWS',
    'SCHEMA',
    'SECOND',
    'SELECT',
    'SEMI',
    'SEPARATED',
    'SERDE',
    'SERDEPROPERTIES',
    'SESSION_USER',
    'SETS',
    'SHOW',
    'SKEWED',
    'SOME',
    'SORT',
    'SORTED',
    'START',
    'STATISTICS',
    'STORED',
    'STRATIFY',
    'SUBSTR',
    'SUBSTRING',
    'TABLE',
    'TABLES',
    'TBLPROPERTIES',
    'TEMPORARY',
    'TERMINATED',
    'THEN',
    'TO',
    'TOUCH',
    'TRAILING',
    'TRANSACTION',
    'TRANSACTIONS',
    'TRIM',
    'TRUE',
    'TRUNCATE',
    'UNARCHIVE',
    'UNBOUNDED',
    'UNCACHE',
    'UNIQUE',
    'UNKNOWN',
    'UNLOCK',
    'UNSET',
    'USE',
    'USER',
    'USING',
    'VIEW',
    'WINDOW',
    'YEAR',
    // other
    'ANALYSE',
    'ARRAY_ZIP',
    'COALESCE',
    'CONTAINS',
    'CONVERT',
    'DAYS',
    'DAY_HOUR',
    'DAY_MINUTE',
    'DAY_SECOND',
    'DECODE',
    'DEFAULT',
    'DISTINCTROW',
    'ENCODE',
    'EXPLODE',
    'EXPLODE_OUTER',
    'FIXED',
    'GREATEST',
    'GROUP_CONCAT',
    'HOURS',
    'HOUR_MINUTE',
    'HOUR_SECOND',
    'IFNULL',
    'LEAST',
    'LEVEL',
    'MINUTE_SECOND',
    'NULLIF',
    'OFFSET',
    'ON',
    'OPTIMIZE',
    'REGEXP',
    'SEPARATOR',
    'SIZE',
    'TYPE',
    'TYPES',
    'UNSIGNED',
    'VARIABLES',
    'YEAR_MONTH'
];
const dataTypes = [
    // https://spark.apache.org/docs/latest/sql-ref-datatypes.html
    'ARRAY',
    'BIGINT',
    'BINARY',
    'BOOLEAN',
    'BYTE',
    'CHAR',
    'DATE',
    'DEC',
    'DECIMAL',
    'DOUBLE',
    'FLOAT',
    'INT',
    'INTEGER',
    'INTERVAL',
    'LONG',
    'MAP',
    'NUMERIC',
    'REAL',
    'SHORT',
    'SMALLINT',
    'STRING',
    'STRUCT',
    'TIMESTAMP_LTZ',
    'TIMESTAMP_NTZ',
    'TIMESTAMP',
    'TINYINT',
    'VARCHAR'
];
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/sql/sql.formatter.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sql",
    ()=>sql
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/expandPhrases.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$sql$2f$sql$2e$functions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/sql/sql.functions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$sql$2f$sql$2e$keywords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/sql/sql.keywords.js [app-client] (ecmascript)");
;
;
;
const reservedSelect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'SELECT [ALL | DISTINCT]'
]);
const reservedClauses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    // queries
    'WITH [RECURSIVE]',
    'FROM',
    'WHERE',
    'GROUP BY [ALL | DISTINCT]',
    'HAVING',
    'WINDOW',
    'PARTITION BY',
    'ORDER BY',
    'LIMIT',
    'OFFSET',
    'FETCH {FIRST | NEXT}',
    // Data manipulation
    // - insert:
    'INSERT INTO',
    'VALUES',
    // - update:
    'SET'
]);
const standardOnelineClauses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'CREATE [GLOBAL TEMPORARY | LOCAL TEMPORARY] TABLE'
]);
const tabularOnelineClauses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    // - create:
    'CREATE [RECURSIVE] VIEW',
    // - update:
    'UPDATE',
    'WHERE CURRENT OF',
    // - delete:
    'DELETE FROM',
    // - drop table:
    'DROP TABLE',
    // - alter table:
    'ALTER TABLE',
    'ADD COLUMN',
    'DROP [COLUMN]',
    'RENAME COLUMN',
    'RENAME TO',
    'ALTER [COLUMN]',
    '{SET | DROP} DEFAULT',
    'ADD SCOPE',
    'DROP SCOPE {CASCADE | RESTRICT}',
    'RESTART WITH',
    // - truncate:
    'TRUNCATE TABLE',
    // other
    'SET SCHEMA'
]);
const reservedSetOperations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'UNION [ALL | DISTINCT]',
    'EXCEPT [ALL | DISTINCT]',
    'INTERSECT [ALL | DISTINCT]'
]);
const reservedJoins = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'JOIN',
    '{LEFT | RIGHT | FULL} [OUTER] JOIN',
    '{INNER | CROSS} JOIN',
    'NATURAL [INNER] JOIN',
    'NATURAL {LEFT | RIGHT | FULL} [OUTER] JOIN'
]);
const reservedKeywordPhrases = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'ON {UPDATE | DELETE} [SET NULL | SET DEFAULT]',
    '{ROWS | RANGE} BETWEEN'
]);
const reservedDataTypePhrases = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([]);
const sql = {
    name: 'sql',
    tokenizerOptions: {
        reservedSelect,
        reservedClauses: [
            ...reservedClauses,
            ...standardOnelineClauses,
            ...tabularOnelineClauses
        ],
        reservedSetOperations,
        reservedJoins,
        reservedKeywordPhrases,
        reservedDataTypePhrases,
        reservedKeywords: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$sql$2f$sql$2e$keywords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keywords"],
        reservedDataTypes: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$sql$2f$sql$2e$keywords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dataTypes"],
        reservedFunctionNames: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$sql$2f$sql$2e$functions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["functions"],
        stringTypes: [
            {
                quote: "''-qq-bs",
                prefixes: [
                    'N',
                    'U&'
                ]
            },
            {
                quote: "''-raw",
                prefixes: [
                    'X'
                ],
                requirePrefix: true
            }
        ],
        identTypes: [
            `""-qq`,
            '``'
        ],
        paramTypes: {
            positional: true
        },
        operators: [
            '||'
        ]
    },
    formatOptions: {
        onelineClauses: [
            ...standardOnelineClauses,
            ...tabularOnelineClauses
        ],
        tabularOnelineClauses
    }
};
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/sql/sql.functions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "functions",
    ()=>functions
]);
const functions = [
    // https://jakewheat.github.io/sql-overview/sql-2008-foundation-grammar.html#_6_9_set_function_specification
    'GROUPING',
    // https://jakewheat.github.io/sql-overview/sql-2008-foundation-grammar.html#_6_10_window_function
    'RANK',
    'DENSE_RANK',
    'PERCENT_RANK',
    'CUME_DIST',
    'ROW_NUMBER',
    // https://jakewheat.github.io/sql-overview/sql-2008-foundation-grammar.html#_6_27_numeric_value_function
    'POSITION',
    'OCCURRENCES_REGEX',
    'POSITION_REGEX',
    'EXTRACT',
    'CHAR_LENGTH',
    'CHARACTER_LENGTH',
    'OCTET_LENGTH',
    'CARDINALITY',
    'ABS',
    'MOD',
    'LN',
    'EXP',
    'POWER',
    'SQRT',
    'FLOOR',
    'CEIL',
    'CEILING',
    'WIDTH_BUCKET',
    // https://jakewheat.github.io/sql-overview/sql-2008-foundation-grammar.html#_6_29_string_value_function
    'SUBSTRING',
    'SUBSTRING_REGEX',
    'UPPER',
    'LOWER',
    'CONVERT',
    'TRANSLATE',
    'TRANSLATE_REGEX',
    'TRIM',
    'OVERLAY',
    'NORMALIZE',
    'SPECIFICTYPE',
    // https://jakewheat.github.io/sql-overview/sql-2008-foundation-grammar.html#_6_31_datetime_value_function
    'CURRENT_DATE',
    'CURRENT_TIME',
    'LOCALTIME',
    'CURRENT_TIMESTAMP',
    'LOCALTIMESTAMP',
    // https://jakewheat.github.io/sql-overview/sql-2008-foundation-grammar.html#_6_38_multiset_value_function
    // SET serves multiple roles: a SET() function and a SET keyword e.g. in UPDATE table SET ...
    // multiset
    // 'SET', (disabled for now)
    // https://jakewheat.github.io/sql-overview/sql-2008-foundation-grammar.html#_10_9_aggregate_function
    'COUNT',
    'AVG',
    'MAX',
    'MIN',
    'SUM',
    // 'EVERY',
    // 'ANY',
    // 'SOME',
    'STDDEV_POP',
    'STDDEV_SAMP',
    'VAR_SAMP',
    'VAR_POP',
    'COLLECT',
    'FUSION',
    'INTERSECTION',
    'COVAR_POP',
    'COVAR_SAMP',
    'CORR',
    'REGR_SLOPE',
    'REGR_INTERCEPT',
    'REGR_COUNT',
    'REGR_R2',
    'REGR_AVGX',
    'REGR_AVGY',
    'REGR_SXX',
    'REGR_SYY',
    'REGR_SXY',
    'PERCENTILE_CONT',
    'PERCENTILE_DISC',
    // CAST is a pretty complex case, involving multiple forms:
    // - CAST(col AS int)
    // - CAST(...) WITH ...
    // - CAST FROM int
    // - CREATE CAST(mycol AS int) WITH ...
    'CAST',
    // Shorthand functions to use in place of CASE expression
    'COALESCE',
    'NULLIF',
    // Non-standard functions that have widespread support
    'ROUND',
    'SIN',
    'COS',
    'TAN',
    'ASIN',
    'ACOS',
    'ATAN'
];
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/sql/sql.keywords.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "dataTypes",
    ()=>dataTypes,
    "keywords",
    ()=>keywords
]);
const keywords = [
    // https://jakewheat.github.io/sql-overview/sql-2008-foundation-grammar.html#reserved-word
    'ALL',
    'ALLOCATE',
    'ALTER',
    'ANY',
    'ARE',
    'AS',
    'ASC',
    'ASENSITIVE',
    'ASYMMETRIC',
    'AT',
    'ATOMIC',
    'AUTHORIZATION',
    'BEGIN',
    'BETWEEN',
    'BOTH',
    'BY',
    'CALL',
    'CALLED',
    'CASCADED',
    'CAST',
    'CHECK',
    'CLOSE',
    'COALESCE',
    'COLLATE',
    'COLUMN',
    'COMMIT',
    'CONDITION',
    'CONNECT',
    'CONSTRAINT',
    'CORRESPONDING',
    'CREATE',
    'CROSS',
    'CUBE',
    'CURRENT',
    'CURRENT_CATALOG',
    'CURRENT_DEFAULT_TRANSFORM_GROUP',
    'CURRENT_PATH',
    'CURRENT_ROLE',
    'CURRENT_SCHEMA',
    'CURRENT_TRANSFORM_GROUP_FOR_TYPE',
    'CURRENT_USER',
    'CURSOR',
    'CYCLE',
    'DEALLOCATE',
    'DAY',
    'DECLARE',
    'DEFAULT',
    'DELETE',
    'DEREF',
    'DESC',
    'DESCRIBE',
    'DETERMINISTIC',
    'DISCONNECT',
    'DISTINCT',
    'DROP',
    'DYNAMIC',
    'EACH',
    'ELEMENT',
    'END-EXEC',
    'ESCAPE',
    'EVERY',
    'EXCEPT',
    'EXEC',
    'EXECUTE',
    'EXISTS',
    'EXTERNAL',
    'FALSE',
    'FETCH',
    'FILTER',
    'FOR',
    'FOREIGN',
    'FREE',
    'FROM',
    'FULL',
    'FUNCTION',
    'GET',
    'GLOBAL',
    'GRANT',
    'GROUP',
    'HAVING',
    'HOLD',
    'HOUR',
    'IDENTITY',
    'IN',
    'INDICATOR',
    'INNER',
    'INOUT',
    'INSENSITIVE',
    'INSERT',
    'INTERSECT',
    'INTO',
    'IS',
    'LANGUAGE',
    'LARGE',
    'LATERAL',
    'LEADING',
    'LEFT',
    'LIKE',
    'LIKE_REGEX',
    'LOCAL',
    'MATCH',
    'MEMBER',
    'MERGE',
    'METHOD',
    'MINUTE',
    'MODIFIES',
    'MODULE',
    'MONTH',
    'NATURAL',
    'NEW',
    'NO',
    'NONE',
    'NOT',
    'NULL',
    'NULLIF',
    'OF',
    'OLD',
    'ON',
    'ONLY',
    'OPEN',
    'ORDER',
    'OUT',
    'OUTER',
    'OVER',
    'OVERLAPS',
    'PARAMETER',
    'PARTITION',
    'PRECISION',
    'PREPARE',
    'PRIMARY',
    'PROCEDURE',
    'RANGE',
    'READS',
    'REAL',
    'RECURSIVE',
    'REF',
    'REFERENCES',
    'REFERENCING',
    'RELEASE',
    'RESULT',
    'RETURN',
    'RETURNS',
    'REVOKE',
    'RIGHT',
    'ROLLBACK',
    'ROLLUP',
    'ROW',
    'ROWS',
    'SAVEPOINT',
    'SCOPE',
    'SCROLL',
    'SEARCH',
    'SECOND',
    'SELECT',
    'SENSITIVE',
    'SESSION_USER',
    'SET',
    'SIMILAR',
    'SOME',
    'SPECIFIC',
    'SQL',
    'SQLEXCEPTION',
    'SQLSTATE',
    'SQLWARNING',
    'START',
    'STATIC',
    'SUBMULTISET',
    'SYMMETRIC',
    'SYSTEM',
    'SYSTEM_USER',
    'TABLE',
    'TABLESAMPLE',
    'THEN',
    'TIMEZONE_HOUR',
    'TIMEZONE_MINUTE',
    'TO',
    'TRAILING',
    'TRANSLATION',
    'TREAT',
    'TRIGGER',
    'TRUE',
    'UESCAPE',
    'UNION',
    'UNIQUE',
    'UNKNOWN',
    'UNNEST',
    'UPDATE',
    'USER',
    'USING',
    'VALUE',
    'VALUES',
    'WHENEVER',
    'WINDOW',
    'WITHIN',
    'WITHOUT',
    'YEAR'
];
const dataTypes = [
    // https://jakewheat.github.io/sql-overview/sql-2008-foundation-grammar.html#_6_1_data_type
    'ARRAY',
    'BIGINT',
    'BINARY LARGE OBJECT',
    'BINARY VARYING',
    'BINARY',
    'BLOB',
    'BOOLEAN',
    'CHAR LARGE OBJECT',
    'CHAR VARYING',
    'CHAR',
    'CHARACTER LARGE OBJECT',
    'CHARACTER VARYING',
    'CHARACTER',
    'CLOB',
    'DATE',
    'DEC',
    'DECIMAL',
    'DOUBLE',
    'FLOAT',
    'INT',
    'INTEGER',
    'INTERVAL',
    'MULTISET',
    'NATIONAL CHAR VARYING',
    'NATIONAL CHAR',
    'NATIONAL CHARACTER LARGE OBJECT',
    'NATIONAL CHARACTER VARYING',
    'NATIONAL CHARACTER',
    'NCHAR LARGE OBJECT',
    'NCHAR VARYING',
    'NCHAR',
    'NCLOB',
    'NUMERIC',
    'SMALLINT',
    'TIME',
    'TIMESTAMP',
    'VARBINARY',
    'VARCHAR'
];
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/sqlite/sqlite.formatter.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sqlite",
    ()=>sqlite
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/expandPhrases.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$sqlite$2f$sqlite$2e$functions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/sqlite/sqlite.functions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$sqlite$2f$sqlite$2e$keywords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/sqlite/sqlite.keywords.js [app-client] (ecmascript)");
;
;
;
const reservedSelect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'SELECT [ALL | DISTINCT]'
]);
const reservedClauses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    // queries
    'WITH [RECURSIVE]',
    'FROM',
    'WHERE',
    'GROUP BY',
    'HAVING',
    'WINDOW',
    'PARTITION BY',
    'ORDER BY',
    'LIMIT',
    'OFFSET',
    // Data manipulation
    // - insert:
    'INSERT [OR ABORT | OR FAIL | OR IGNORE | OR REPLACE | OR ROLLBACK] INTO',
    'REPLACE INTO',
    'VALUES',
    // - update:
    'SET',
    // other:
    'RETURNING'
]);
const standardOnelineClauses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'CREATE [TEMPORARY | TEMP] TABLE [IF NOT EXISTS]'
]);
const tabularOnelineClauses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    // - create:
    'CREATE [TEMPORARY | TEMP] VIEW [IF NOT EXISTS]',
    // - update:
    'UPDATE [OR ABORT | OR FAIL | OR IGNORE | OR REPLACE | OR ROLLBACK]',
    // - insert:
    'ON CONFLICT',
    // - delete:
    'DELETE FROM',
    // - drop table:
    'DROP TABLE [IF EXISTS]',
    // - alter table:
    'ALTER TABLE',
    'ADD [COLUMN]',
    'DROP [COLUMN]',
    'RENAME [COLUMN]',
    'RENAME TO',
    // - set schema
    'SET SCHEMA'
]);
const reservedSetOperations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'UNION [ALL]',
    'EXCEPT',
    'INTERSECT'
]);
// joins - https://www.sqlite.org/syntax/join-operator.html
const reservedJoins = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'JOIN',
    '{LEFT | RIGHT | FULL} [OUTER] JOIN',
    '{INNER | CROSS} JOIN',
    'NATURAL [INNER] JOIN',
    'NATURAL {LEFT | RIGHT | FULL} [OUTER] JOIN'
]);
const reservedKeywordPhrases = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'ON {UPDATE | DELETE} [SET NULL | SET DEFAULT]',
    '{ROWS | RANGE | GROUPS} BETWEEN',
    'DO UPDATE'
]);
const reservedDataTypePhrases = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([]);
const sqlite = {
    name: 'sqlite',
    tokenizerOptions: {
        reservedSelect,
        reservedClauses: [
            ...reservedClauses,
            ...standardOnelineClauses,
            ...tabularOnelineClauses
        ],
        reservedSetOperations,
        reservedJoins,
        reservedKeywordPhrases,
        reservedDataTypePhrases,
        reservedKeywords: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$sqlite$2f$sqlite$2e$keywords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keywords"],
        reservedDataTypes: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$sqlite$2f$sqlite$2e$keywords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dataTypes"],
        reservedFunctionNames: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$sqlite$2f$sqlite$2e$functions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["functions"],
        stringTypes: [
            "''-qq",
            {
                quote: "''-raw",
                prefixes: [
                    'X'
                ],
                requirePrefix: true
            }
        ],
        identTypes: [
            `""-qq`,
            '``',
            '[]'
        ],
        // https://www.sqlite.org/lang_expr.html#parameters
        // Note: the $-prefixed form follows Tcl variable syntax and may include
        // one or more "::"-separated suffixes and an optional "(...)" trailer.
        paramTypes: {
            positional: true,
            numbered: [
                '?'
            ],
            named: [
                ':',
                '@'
            ],
            custom: [
                {
                    regex: String.raw`\$[a-zA-Z_][a-zA-Z0-9_]*(?:::[a-zA-Z_][a-zA-Z0-9_]*)*(?:\([^)]*\))?`,
                    key: (v)=>v.slice(1)
                }
            ]
        },
        operators: [
            '%',
            '~',
            '&',
            '|',
            '<<',
            '>>',
            '==',
            '->',
            '->>',
            '||'
        ]
    },
    formatOptions: {
        onelineClauses: [
            ...standardOnelineClauses,
            ...tabularOnelineClauses
        ],
        tabularOnelineClauses
    }
};
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/sqlite/sqlite.functions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "functions",
    ()=>functions
]);
const functions = [
    // https://www.sqlite.org/lang_corefunc.html
    'ABS',
    'CHANGES',
    'CHAR',
    'COALESCE',
    'FORMAT',
    'GLOB',
    'HEX',
    'IFNULL',
    'IIF',
    'INSTR',
    'LAST_INSERT_ROWID',
    'LENGTH',
    'LIKE',
    'LIKELIHOOD',
    'LIKELY',
    'LOAD_EXTENSION',
    'LOWER',
    'LTRIM',
    'NULLIF',
    'PRINTF',
    'QUOTE',
    'RANDOM',
    'RANDOMBLOB',
    'REPLACE',
    'ROUND',
    'RTRIM',
    'SIGN',
    'SOUNDEX',
    'SQLITE_COMPILEOPTION_GET',
    'SQLITE_COMPILEOPTION_USED',
    'SQLITE_OFFSET',
    'SQLITE_SOURCE_ID',
    'SQLITE_VERSION',
    'SUBSTR',
    'SUBSTRING',
    'TOTAL_CHANGES',
    'TRIM',
    'TYPEOF',
    'UNICODE',
    'UNLIKELY',
    'UPPER',
    'ZEROBLOB',
    // https://www.sqlite.org/lang_aggfunc.html
    'AVG',
    'COUNT',
    'GROUP_CONCAT',
    'MAX',
    'MIN',
    'SUM',
    'TOTAL',
    // https://www.sqlite.org/lang_datefunc.html
    'DATE',
    'TIME',
    'DATETIME',
    'JULIANDAY',
    'UNIXEPOCH',
    'STRFTIME',
    // https://www.sqlite.org/windowfunctions.html#biwinfunc
    'row_number',
    'rank',
    'dense_rank',
    'percent_rank',
    'cume_dist',
    'ntile',
    'lag',
    'lead',
    'first_value',
    'last_value',
    'nth_value',
    // https://www.sqlite.org/lang_mathfunc.html
    'ACOS',
    'ACOSH',
    'ASIN',
    'ASINH',
    'ATAN',
    'ATAN2',
    'ATANH',
    'CEIL',
    'CEILING',
    'COS',
    'COSH',
    'DEGREES',
    'EXP',
    'FLOOR',
    'LN',
    'LOG',
    'LOG',
    'LOG10',
    'LOG2',
    'MOD',
    'PI',
    'POW',
    'POWER',
    'RADIANS',
    'SIN',
    'SINH',
    'SQRT',
    'TAN',
    'TANH',
    'TRUNC',
    // https://www.sqlite.org/json1.html
    'JSON',
    'JSON_ARRAY',
    'JSON_ARRAY_LENGTH',
    'JSON_ARRAY_LENGTH',
    'JSON_EXTRACT',
    'JSON_INSERT',
    'JSON_OBJECT',
    'JSON_PATCH',
    'JSON_REMOVE',
    'JSON_REPLACE',
    'JSON_SET',
    'JSON_TYPE',
    'JSON_TYPE',
    'JSON_VALID',
    'JSON_QUOTE',
    'JSON_GROUP_ARRAY',
    'JSON_GROUP_OBJECT',
    'JSON_EACH',
    'JSON_TREE',
    // cast
    'CAST'
];
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/sqlite/sqlite.keywords.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "dataTypes",
    ()=>dataTypes,
    "keywords",
    ()=>keywords
]);
const keywords = [
    // https://www.sqlite.org/lang_keywords.html
    // Note: The keywords listed on that URL are not all reserved keywords.
    // We'll need to clean up this list to only include reserved keywords.
    'ABORT',
    'ACTION',
    'ADD',
    'AFTER',
    'ALL',
    'ALTER',
    'AND',
    'ARE',
    'ALWAYS',
    'ANALYZE',
    'AS',
    'ASC',
    'ATTACH',
    'AUTOINCREMENT',
    'BEFORE',
    'BEGIN',
    'BETWEEN',
    'BY',
    'CASCADE',
    'CASE',
    'CAST',
    'CHECK',
    'COLLATE',
    'COLUMN',
    'COMMIT',
    'CONFLICT',
    'CONSTRAINT',
    'CREATE',
    'CROSS',
    'CURRENT',
    'CURRENT_DATE',
    'CURRENT_TIME',
    'CURRENT_TIMESTAMP',
    'DATABASE',
    'DEFAULT',
    'DEFERRABLE',
    'DEFERRED',
    'DELETE',
    'DESC',
    'DETACH',
    'DISTINCT',
    'DO',
    'DROP',
    'EACH',
    'ELSE',
    'END',
    'ESCAPE',
    'EXCEPT',
    'EXCLUDE',
    'EXCLUSIVE',
    'EXISTS',
    'EXPLAIN',
    'FAIL',
    'FILTER',
    'FIRST',
    'FOLLOWING',
    'FOR',
    'FOREIGN',
    'FROM',
    'FULL',
    'GENERATED',
    'GLOB',
    'GROUP',
    'HAVING',
    'IF',
    'IGNORE',
    'IMMEDIATE',
    'IN',
    'INDEX',
    'INDEXED',
    'INITIALLY',
    'INNER',
    'INSERT',
    'INSTEAD',
    'INTERSECT',
    'INTO',
    'IS',
    'ISNULL',
    'JOIN',
    'KEY',
    'LAST',
    'LEFT',
    'LIKE',
    'LIMIT',
    'MATCH',
    'MATERIALIZED',
    'NATURAL',
    'NO',
    'NOT',
    'NOTHING',
    'NOTNULL',
    'NULL',
    'NULLS',
    'OF',
    'OFFSET',
    'ON',
    'ONLY',
    'OPEN',
    'OR',
    'ORDER',
    'OTHERS',
    'OUTER',
    'OVER',
    'PARTITION',
    'PLAN',
    'PRAGMA',
    'PRECEDING',
    'PRIMARY',
    'QUERY',
    'RAISE',
    'RANGE',
    'RECURSIVE',
    'REFERENCES',
    'REGEXP',
    'REINDEX',
    'RELEASE',
    'RENAME',
    'REPLACE',
    'RESTRICT',
    'RETURNING',
    'RIGHT',
    'ROLLBACK',
    'ROW',
    'ROWS',
    'SAVEPOINT',
    'SELECT',
    'SET',
    'TABLE',
    'TEMP',
    'TEMPORARY',
    'THEN',
    'TIES',
    'TO',
    'TRANSACTION',
    'TRIGGER',
    'UNBOUNDED',
    'UNION',
    'UNIQUE',
    'UPDATE',
    'USING',
    'VACUUM',
    'VALUES',
    'VIEW',
    'VIRTUAL',
    'WHEN',
    'WHERE',
    'WINDOW',
    'WITH',
    'WITHOUT'
];
const dataTypes = [
    // SQLite allows any word as a data type, e.g. CREATE TABLE foo (col1 madeupname(123));
    // Here we just list some common ones as SQL Formatter
    // is only able to detect a predefined list of data types.
    // https://www.sqlite.org/stricttables.html
    // https://www.sqlite.org/datatype3.html
    'ANY',
    'ARRAY',
    'BLOB',
    'CHARACTER',
    'DECIMAL',
    'INT',
    'INTEGER',
    'NATIVE CHARACTER',
    'NCHAR',
    'NUMERIC',
    'NVARCHAR',
    'REAL',
    'TEXT',
    'VARCHAR',
    'VARYING CHARACTER'
];
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/tidb/tidb.formatter.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "tidb",
    ()=>tidb
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/expandPhrases.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$mariadb$2f$likeMariaDb$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/mariadb/likeMariaDb.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$tidb$2f$tidb$2e$keywords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/tidb/tidb.keywords.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$tidb$2f$tidb$2e$functions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/tidb/tidb.functions.js [app-client] (ecmascript)");
;
;
;
;
const reservedSelect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'SELECT [ALL | DISTINCT | DISTINCTROW]'
]);
const reservedClauses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    // queries
    'WITH [RECURSIVE]',
    'FROM',
    'WHERE',
    'GROUP BY',
    'HAVING',
    'WINDOW',
    'PARTITION BY',
    'ORDER BY',
    'LIMIT',
    'OFFSET',
    // Data manipulation
    // - insert:
    'INSERT [LOW_PRIORITY | DELAYED | HIGH_PRIORITY] [IGNORE] [INTO]',
    'REPLACE [LOW_PRIORITY | DELAYED] [INTO]',
    'VALUES',
    'ON DUPLICATE KEY UPDATE',
    // - update:
    'SET'
]);
const standardOnelineClauses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'CREATE [TEMPORARY] TABLE [IF NOT EXISTS]'
]);
const tabularOnelineClauses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    // https://docs.pingcap.com/tidb/stable/sql-statement-create-view
    'CREATE [OR REPLACE] [SQL SECURITY DEFINER | SQL SECURITY INVOKER] VIEW [IF NOT EXISTS]',
    // https://docs.pingcap.com/tidb/stable/sql-statement-update
    'UPDATE [LOW_PRIORITY] [IGNORE]',
    // https://docs.pingcap.com/tidb/stable/sql-statement-delete
    'DELETE [LOW_PRIORITY] [QUICK] [IGNORE] FROM',
    // https://docs.pingcap.com/tidb/stable/sql-statement-drop-table
    'DROP [TEMPORARY] TABLE [IF EXISTS]',
    // https://docs.pingcap.com/tidb/stable/sql-statement-alter-table
    'ALTER TABLE',
    'ADD [COLUMN]',
    '{CHANGE | MODIFY} [COLUMN]',
    'DROP [COLUMN]',
    'RENAME [TO | AS]',
    'RENAME COLUMN',
    'ALTER [COLUMN]',
    '{SET | DROP} DEFAULT',
    // https://docs.pingcap.com/tidb/stable/sql-statement-truncate
    'TRUNCATE [TABLE]',
    // https://docs.pingcap.com/tidb/stable/sql-statement-alter-database
    'ALTER DATABASE',
    // https://docs.pingcap.com/tidb/stable/sql-statement-alter-instance
    'ALTER INSTANCE',
    'ALTER RESOURCE GROUP',
    'ALTER SEQUENCE',
    // https://docs.pingcap.com/tidb/stable/sql-statement-alter-user
    'ALTER USER',
    'ALTER VIEW',
    'ANALYZE TABLE',
    'CHECK TABLE',
    'CHECKSUM TABLE',
    'COMMIT',
    'CREATE DATABASE',
    'CREATE INDEX',
    'CREATE RESOURCE GROUP',
    'CREATE ROLE',
    'CREATE SEQUENCE',
    'CREATE USER',
    'DEALLOCATE PREPARE',
    'DESCRIBE',
    'DROP DATABASE',
    'DROP INDEX',
    'DROP RESOURCE GROUP',
    'DROP ROLE',
    'DROP TABLESPACE',
    'DROP USER',
    'DROP VIEW',
    'EXPLAIN',
    'FLUSH',
    // https://docs.pingcap.com/tidb/stable/sql-statement-grant-privileges
    'GRANT',
    'IMPORT TABLE',
    'INSTALL COMPONENT',
    'INSTALL PLUGIN',
    'KILL',
    'LOAD DATA',
    'LOCK INSTANCE FOR BACKUP',
    'LOCK TABLES',
    'OPTIMIZE TABLE',
    'PREPARE',
    'RELEASE SAVEPOINT',
    'RENAME TABLE',
    'RENAME USER',
    'REPAIR TABLE',
    'RESET',
    'REVOKE',
    'ROLLBACK',
    'ROLLBACK TO SAVEPOINT',
    'SAVEPOINT',
    'SET CHARACTER SET',
    'SET DEFAULT ROLE',
    'SET NAMES',
    'SET PASSWORD',
    'SET RESOURCE GROUP',
    'SET ROLE',
    'SET TRANSACTION',
    'SHOW',
    'SHOW BINARY LOGS',
    'SHOW BINLOG EVENTS',
    'SHOW CHARACTER SET',
    'SHOW COLLATION',
    'SHOW COLUMNS',
    'SHOW CREATE DATABASE',
    'SHOW CREATE TABLE',
    'SHOW CREATE USER',
    'SHOW CREATE VIEW',
    'SHOW DATABASES',
    'SHOW ENGINE',
    'SHOW ENGINES',
    'SHOW ERRORS',
    'SHOW EVENTS',
    'SHOW GRANTS',
    'SHOW INDEX',
    'SHOW MASTER STATUS',
    'SHOW OPEN TABLES',
    'SHOW PLUGINS',
    'SHOW PRIVILEGES',
    'SHOW PROCESSLIST',
    'SHOW PROFILE',
    'SHOW PROFILES',
    'SHOW STATUS',
    'SHOW TABLE STATUS',
    'SHOW TABLES',
    'SHOW TRIGGERS',
    'SHOW VARIABLES',
    'SHOW WARNINGS',
    // https://docs.pingcap.com/tidb/stable/sql-statement-table
    'TABLE',
    'UNINSTALL COMPONENT',
    'UNINSTALL PLUGIN',
    'UNLOCK INSTANCE',
    'UNLOCK TABLES',
    // https://docs.pingcap.com/tidb/stable/sql-statement-use
    'USE'
]);
const reservedSetOperations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'UNION [ALL | DISTINCT]'
]);
const reservedJoins = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'JOIN',
    '{LEFT | RIGHT} [OUTER] JOIN',
    '{INNER | CROSS} JOIN',
    'NATURAL [INNER] JOIN',
    'NATURAL {LEFT | RIGHT} [OUTER] JOIN',
    // non-standard joins
    'STRAIGHT_JOIN'
]);
const reservedKeywordPhrases = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'ON {UPDATE | DELETE} [SET NULL]',
    'CHARACTER SET',
    '{ROWS | RANGE} BETWEEN',
    'IDENTIFIED BY'
]);
const reservedDataTypePhrases = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([]);
const tidb = {
    name: 'tidb',
    tokenizerOptions: {
        reservedSelect,
        reservedClauses: [
            ...reservedClauses,
            ...standardOnelineClauses,
            ...tabularOnelineClauses
        ],
        reservedSetOperations,
        reservedJoins,
        reservedKeywordPhrases,
        reservedDataTypePhrases,
        supportsXor: true,
        reservedKeywords: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$tidb$2f$tidb$2e$keywords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keywords"],
        reservedDataTypes: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$tidb$2f$tidb$2e$keywords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dataTypes"],
        reservedFunctionNames: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$tidb$2f$tidb$2e$functions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["functions"],
        // TODO: support _ char set prefixes such as _utf8, _latin1, _binary, _utf8mb4, etc.
        stringTypes: [
            '""-qq-bs',
            {
                quote: "''-qq-bs",
                prefixes: [
                    'N'
                ]
            },
            {
                quote: "''-raw",
                prefixes: [
                    'B',
                    'X'
                ],
                requirePrefix: true
            }
        ],
        identTypes: [
            '``'
        ],
        identChars: {
            first: '$',
            rest: '$',
            allowFirstCharNumber: true
        },
        variableTypes: [
            {
                regex: '@@?[A-Za-z0-9_.$]+'
            },
            {
                quote: '""-qq-bs',
                prefixes: [
                    '@'
                ],
                requirePrefix: true
            },
            {
                quote: "''-qq-bs",
                prefixes: [
                    '@'
                ],
                requirePrefix: true
            },
            {
                quote: '``',
                prefixes: [
                    '@'
                ],
                requirePrefix: true
            }
        ],
        paramTypes: {
            positional: true
        },
        lineCommentTypes: [
            '--',
            '#'
        ],
        operators: [
            '%',
            ':=',
            '&',
            '|',
            '^',
            '~',
            '<<',
            '>>',
            '<=>',
            '->',
            '->>',
            '&&',
            '||',
            '!',
            '*.*'
        ],
        postProcess: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$mariadb$2f$likeMariaDb$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["postProcess"]
    },
    formatOptions: {
        onelineClauses: [
            ...standardOnelineClauses,
            ...tabularOnelineClauses
        ],
        tabularOnelineClauses
    }
};
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/tidb/tidb.functions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "functions",
    ()=>functions
]);
const functions = [
    // https://docs.pingcap.com/tidb/stable/sql-statement-show-builtins
    // https://docs.pingcap.com/tidb/stable/functions-and-operators-overview
    // + MySQL aggregate functions: https://dev.mysql.com/doc/refman/8.0/en/aggregate-functions.html
    // + MySQL window functions: https://dev.mysql.com/doc/refman/8.0/en/window-functions-usage.html
    'ABS',
    'ACOS',
    'ADDDATE',
    'ADDTIME',
    'AES_DECRYPT',
    'AES_ENCRYPT',
    // 'AND',
    'ANY_VALUE',
    'ASCII',
    'ASIN',
    'ATAN',
    'ATAN2',
    'AVG',
    'BENCHMARK',
    'BIN',
    'BIN_TO_UUID',
    'BIT_AND',
    'BIT_COUNT',
    'BIT_LENGTH',
    'BIT_OR',
    'BIT_XOR',
    'BITAND',
    'BITNEG',
    'BITOR',
    'BITXOR',
    'CASE',
    'CAST',
    'CEIL',
    'CEILING',
    'CHAR_FUNC',
    'CHAR_LENGTH',
    'CHARACTER_LENGTH',
    'CHARSET',
    'COALESCE',
    'COERCIBILITY',
    'COLLATION',
    'COMPRESS',
    'CONCAT',
    'CONCAT_WS',
    'CONNECTION_ID',
    'CONV',
    'CONVERT',
    'CONVERT_TZ',
    'COS',
    'COT',
    'COUNT',
    'CRC32',
    'CUME_DIST',
    'CURDATE',
    'CURRENT_DATE',
    'CURRENT_RESOURCE_GROUP',
    'CURRENT_ROLE',
    'CURRENT_TIME',
    'CURRENT_TIMESTAMP',
    'CURRENT_USER',
    'CURTIME',
    'DATABASE',
    'DATE',
    'DATE_ADD',
    'DATE_FORMAT',
    'DATE_SUB',
    'DATEDIFF',
    'DAY',
    'DAYNAME',
    'DAYOFMONTH',
    'DAYOFWEEK',
    'DAYOFYEAR',
    'DECODE',
    'DEFAULT_FUNC',
    'DEGREES',
    'DENSE_RANK',
    'DES_DECRYPT',
    'DES_ENCRYPT',
    'DIV',
    'ELT',
    'ENCODE',
    'ENCRYPT',
    'EQ',
    'EXP',
    'EXPORT_SET',
    'EXTRACT',
    'FIELD',
    'FIND_IN_SET',
    'FIRST_VALUE',
    'FLOOR',
    'FORMAT',
    'FORMAT_BYTES',
    'FORMAT_NANO_TIME',
    'FOUND_ROWS',
    'FROM_BASE64',
    'FROM_DAYS',
    'FROM_UNIXTIME',
    'GE',
    'GET_FORMAT',
    'GET_LOCK',
    'GETPARAM',
    'GREATEST',
    'GROUP_CONCAT',
    'GROUPING',
    'GT',
    'HEX',
    'HOUR',
    'IF',
    'IFNULL',
    'ILIKE',
    // 'IN',
    'INET6_ATON',
    'INET6_NTOA',
    'INET_ATON',
    'INET_NTOA',
    'INSERT_FUNC',
    'INSTR',
    'INTDIV',
    'INTERVAL',
    'IS_FREE_LOCK',
    'IS_IPV4',
    'IS_IPV4_COMPAT',
    'IS_IPV4_MAPPED',
    'IS_IPV6',
    'IS_USED_LOCK',
    'IS_UUID',
    'ISFALSE',
    'ISNULL',
    'ISTRUE',
    'JSON_ARRAY',
    'JSON_ARRAYAGG',
    'JSON_ARRAY_APPEND',
    'JSON_ARRAY_INSERT',
    'JSON_CONTAINS',
    'JSON_CONTAINS_PATH',
    'JSON_DEPTH',
    'JSON_EXTRACT',
    'JSON_INSERT',
    'JSON_KEYS',
    'JSON_LENGTH',
    'JSON_MEMBEROF',
    'JSON_MERGE',
    'JSON_MERGE_PATCH',
    'JSON_MERGE_PRESERVE',
    'JSON_OBJECT',
    'JSON_OBJECTAGG',
    'JSON_OVERLAPS',
    'JSON_PRETTY',
    'JSON_QUOTE',
    'JSON_REMOVE',
    'JSON_REPLACE',
    'JSON_SEARCH',
    'JSON_SET',
    'JSON_STORAGE_FREE',
    'JSON_STORAGE_SIZE',
    'JSON_TYPE',
    'JSON_UNQUOTE',
    'JSON_VALID',
    'LAG',
    'LAST_DAY',
    'LAST_INSERT_ID',
    'LAST_VALUE',
    'LASTVAL',
    'LCASE',
    'LE',
    'LEAD',
    'LEAST',
    'LEFT',
    'LEFTSHIFT',
    'LENGTH',
    'LIKE',
    'LN',
    'LOAD_FILE',
    'LOCALTIME',
    'LOCALTIMESTAMP',
    'LOCATE',
    'LOG',
    'LOG10',
    'LOG2',
    'LOWER',
    'LPAD',
    'LT',
    'LTRIM',
    'MAKE_SET',
    'MAKEDATE',
    'MAKETIME',
    'MASTER_POS_WAIT',
    'MAX',
    'MD5',
    'MICROSECOND',
    'MID',
    'MIN',
    'MINUS',
    'MINUTE',
    'MOD',
    'MONTH',
    'MONTHNAME',
    'MUL',
    'NAME_CONST',
    'NE',
    'NEXTVAL',
    'NOT',
    'NOW',
    'NTH_VALUE',
    'NTILE',
    'NULLEQ',
    'OCT',
    'OCTET_LENGTH',
    'OLD_PASSWORD',
    // 'OR',
    'ORD',
    'PASSWORD_FUNC',
    'PERCENT_RANK',
    'PERIOD_ADD',
    'PERIOD_DIFF',
    'PI',
    'PLUS',
    'POSITION',
    'POW',
    'POWER',
    'QUARTER',
    'QUOTE',
    'RADIANS',
    'RAND',
    'RANDOM_BYTES',
    'RANK',
    'REGEXP',
    'REGEXP_INSTR',
    'REGEXP_LIKE',
    'REGEXP_REPLACE',
    'REGEXP_SUBSTR',
    'RELEASE_ALL_LOCKS',
    'RELEASE_LOCK',
    'REPEAT',
    'REPLACE',
    'REVERSE',
    'RIGHT',
    'RIGHTSHIFT',
    'ROUND',
    'ROW_COUNT',
    'ROW_NUMBER',
    'RPAD',
    'RTRIM',
    'SCHEMA',
    'SEC_TO_TIME',
    'SECOND',
    'SESSION_USER',
    'SETVAL',
    'SETVAR',
    'SHA',
    'SHA1',
    'SHA2',
    'SIGN',
    'SIN',
    'SLEEP',
    'SM3',
    'SPACE',
    'SQRT',
    'STD',
    'STDDEV',
    'STDDEV_POP',
    'STDDEV_SAMP',
    'STR_TO_DATE',
    'STRCMP',
    'SUBDATE',
    'SUBSTR',
    'SUBSTRING',
    'SUBSTRING_INDEX',
    'SUBTIME',
    'SUM',
    'SYSDATE',
    'SYSTEM_USER',
    'TAN',
    'TIDB_BOUNDED_STALENESS',
    'TIDB_CURRENT_TSO',
    'TIDB_DECODE_BINARY_PLAN',
    'TIDB_DECODE_KEY',
    'TIDB_DECODE_PLAN',
    'TIDB_DECODE_SQL_DIGESTS',
    'TIDB_ENCODE_SQL_DIGEST',
    'TIDB_IS_DDL_OWNER',
    'TIDB_PARSE_TSO',
    'TIDB_PARSE_TSO_LOGICAL',
    'TIDB_ROW_CHECKSUM',
    'TIDB_SHARD',
    'TIDB_VERSION',
    'TIME',
    'TIME_FORMAT',
    'TIME_TO_SEC',
    'TIMEDIFF',
    'TIMESTAMP',
    'TIMESTAMPADD',
    'TIMESTAMPDIFF',
    'TO_BASE64',
    'TO_DAYS',
    'TO_SECONDS',
    'TRANSLATE',
    'TRIM',
    'TRUNCATE',
    'UCASE',
    'UNARYMINUS',
    'UNCOMPRESS',
    'UNCOMPRESSED_LENGTH',
    'UNHEX',
    'UNIX_TIMESTAMP',
    'UPPER',
    // 'USER',
    'UTC_DATE',
    'UTC_TIME',
    'UTC_TIMESTAMP',
    'UUID',
    'UUID_SHORT',
    'UUID_TO_BIN',
    'VALIDATE_PASSWORD_STRENGTH',
    'VAR_POP',
    'VAR_SAMP',
    'VARIANCE',
    'VERSION',
    'VITESS_HASH',
    'WEEK',
    'WEEKDAY',
    'WEEKOFYEAR',
    'WEIGHT_STRING',
    // 'XOR',
    'YEAR',
    'YEARWEEK'
];
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/tidb/tidb.keywords.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "dataTypes",
    ()=>dataTypes,
    "keywords",
    ()=>keywords
]);
const keywords = [
    // https://docs.pingcap.com/tidb/stable/keywords
    'ADD',
    'ALL',
    'ALTER',
    'ANALYZE',
    'AND',
    'ARRAY',
    'AS',
    'ASC',
    'BETWEEN',
    'BOTH',
    'BY',
    'CALL',
    'CASCADE',
    'CASE',
    'CHANGE',
    'CHECK',
    'COLLATE',
    'COLUMN',
    'CONSTRAINT',
    'CONTINUE',
    'CONVERT',
    'CREATE',
    'CROSS',
    'CURRENT_DATE',
    'CURRENT_ROLE',
    'CURRENT_TIME',
    'CURRENT_TIMESTAMP',
    'CURRENT_USER',
    'CURSOR',
    'DATABASE',
    'DATABASES',
    'DAY_HOUR',
    'DAY_MICROSECOND',
    'DAY_MINUTE',
    'DAY_SECOND',
    'DEFAULT',
    'DELAYED',
    'DELETE',
    'DESC',
    'DESCRIBE',
    'DISTINCT',
    'DISTINCTROW',
    'DIV',
    'DOUBLE',
    'DROP',
    'DUAL',
    'ELSE',
    'ELSEIF',
    'ENCLOSED',
    'ESCAPED',
    'EXCEPT',
    'EXISTS',
    'EXIT',
    'EXPLAIN',
    'FALSE',
    'FETCH',
    'FOR',
    'FORCE',
    'FOREIGN',
    'FROM',
    'FULLTEXT',
    'GENERATED',
    'GRANT',
    'GROUP',
    'GROUPS',
    'HAVING',
    'HIGH_PRIORITY',
    'HOUR_MICROSECOND',
    'HOUR_MINUTE',
    'HOUR_SECOND',
    'IF',
    'IGNORE',
    'ILIKE',
    'IN',
    'INDEX',
    'INFILE',
    'INNER',
    'INOUT',
    'INSERT',
    'INTERSECT',
    'INTERVAL',
    'INTO',
    'IS',
    'ITERATE',
    'JOIN',
    'KEY',
    'KEYS',
    'KILL',
    'LEADING',
    'LEAVE',
    'LEFT',
    'LIKE',
    'LIMIT',
    'LINEAR',
    'LINES',
    'LOAD',
    'LOCALTIME',
    'LOCALTIMESTAMP',
    'LOCK',
    'LONG',
    'LOW_PRIORITY',
    'MATCH',
    'MAXVALUE',
    'MINUTE_MICROSECOND',
    'MINUTE_SECOND',
    'MOD',
    'NATURAL',
    'NOT',
    'NO_WRITE_TO_BINLOG',
    'NULL',
    'OF',
    'ON',
    'OPTIMIZE',
    'OPTION',
    'OPTIONALLY',
    'OR',
    'ORDER',
    'OUT',
    'OUTER',
    'OUTFILE',
    'OVER',
    'PARTITION',
    'PRIMARY',
    'PROCEDURE',
    'RANGE',
    'READ',
    'RECURSIVE',
    'REFERENCES',
    'REGEXP',
    'RELEASE',
    'RENAME',
    'REPEAT',
    'REPLACE',
    'REQUIRE',
    'RESTRICT',
    'REVOKE',
    'RIGHT',
    'RLIKE',
    'ROW',
    'ROWS',
    'SECOND_MICROSECOND',
    'SELECT',
    'SET',
    'SHOW',
    'SPATIAL',
    'SQL',
    'SQLEXCEPTION',
    'SQLSTATE',
    'SQLWARNING',
    'SQL_BIG_RESULT',
    'SQL_CALC_FOUND_ROWS',
    'SQL_SMALL_RESULT',
    'SSL',
    'STARTING',
    'STATS_EXTENDED',
    'STORED',
    'STRAIGHT_JOIN',
    'TABLE',
    'TABLESAMPLE',
    'TERMINATED',
    'THEN',
    'TO',
    'TRAILING',
    'TRIGGER',
    'TRUE',
    'TiDB_CURRENT_TSO',
    'UNION',
    'UNIQUE',
    'UNLOCK',
    'UNSIGNED',
    'UNTIL',
    'UPDATE',
    'USAGE',
    'USE',
    'USING',
    'UTC_DATE',
    'UTC_TIME',
    'UTC_TIMESTAMP',
    'VALUES',
    'VIRTUAL',
    'WHEN',
    'WHERE',
    'WHILE',
    'WINDOW',
    'WITH',
    'WRITE',
    'XOR',
    'YEAR_MONTH',
    'ZEROFILL'
];
const dataTypes = [
    // https://docs.pingcap.com/tidb/stable/data-type-overview
    'BIGINT',
    'BINARY',
    'BIT',
    'BLOB',
    'BOOL',
    'BOOLEAN',
    'CHAR',
    'CHARACTER',
    'DATE',
    'DATETIME',
    'DEC',
    'DECIMAL',
    'DOUBLE PRECISION',
    'DOUBLE',
    'ENUM',
    'FIXED',
    'INT',
    'INT1',
    'INT2',
    'INT3',
    'INT4',
    'INT8',
    'INTEGER',
    'LONGBLOB',
    'LONGTEXT',
    'MEDIUMBLOB',
    'MEDIUMINT',
    'MIDDLEINT',
    'NATIONAL CHAR',
    'NATIONAL VARCHAR',
    'NUMERIC',
    'PRECISION',
    'SMALLINT',
    'TEXT',
    'TIME',
    'TIMESTAMP',
    'TINYBLOB',
    'TINYINT',
    'TINYTEXT',
    'VARBINARY',
    'VARCHAR',
    'VARCHARACTER',
    'VARYING',
    'YEAR'
];
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/transactsql/transactsql.formatter.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "transactsql",
    ()=>transactsql
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/expandPhrases.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$transactsql$2f$transactsql$2e$functions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/transactsql/transactsql.functions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$transactsql$2f$transactsql$2e$keywords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/transactsql/transactsql.keywords.js [app-client] (ecmascript)");
;
;
;
const reservedSelect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'SELECT [ALL | DISTINCT]'
]);
const reservedClauses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    // queries
    'WITH',
    'INTO',
    'FROM',
    'WHERE',
    'GROUP BY',
    'HAVING',
    'WINDOW',
    'PARTITION BY',
    'ORDER BY',
    'OFFSET',
    'FETCH {FIRST | NEXT}',
    'FOR {BROWSE | XML | JSON}',
    'OPTION',
    // Data manipulation
    // - insert:
    'INSERT [INTO]',
    'VALUES',
    // - update:
    'SET',
    // - merge:
    'MERGE [INTO]',
    'WHEN [NOT] MATCHED [BY TARGET | BY SOURCE] [THEN]',
    'UPDATE SET'
]);
const standardOnelineClauses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'CREATE TABLE'
]);
const tabularOnelineClauses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    // - create:
    'CREATE [OR ALTER] [MATERIALIZED] VIEW',
    // - update:
    'UPDATE',
    'WHERE CURRENT OF',
    // - delete:
    'DELETE [FROM]',
    // - drop table:
    'DROP TABLE [IF EXISTS]',
    // - alter table:
    'ALTER TABLE',
    'ADD',
    'DROP COLUMN [IF EXISTS]',
    'ALTER COLUMN',
    // - truncate:
    'TRUNCATE TABLE',
    // indexes
    'CREATE [UNIQUE] [CLUSTERED] INDEX',
    // databases
    'CREATE DATABASE',
    'ALTER DATABASE',
    'DROP DATABASE [IF EXISTS]',
    // functions/procedures
    'CREATE [OR ALTER] [PARTITION] {FUNCTION | PROCEDURE | PROC}',
    'ALTER [PARTITION] {FUNCTION | PROCEDURE | PROC}',
    'DROP [PARTITION] {FUNCTION | PROCEDURE | PROC} [IF EXISTS]',
    // other statements
    'GO',
    'USE',
    // https://docs.microsoft.com/en-us/sql/t-sql/statements/statements?view=sql-server-ver15
    'ADD SENSITIVITY CLASSIFICATION',
    'ADD SIGNATURE',
    'AGGREGATE',
    'ANSI_DEFAULTS',
    'ANSI_NULLS',
    'ANSI_NULL_DFLT_OFF',
    'ANSI_NULL_DFLT_ON',
    'ANSI_PADDING',
    'ANSI_WARNINGS',
    'APPLICATION ROLE',
    'ARITHABORT',
    'ARITHIGNORE',
    'ASSEMBLY',
    'ASYMMETRIC KEY',
    'AUTHORIZATION',
    'AVAILABILITY GROUP',
    'BACKUP',
    'BACKUP CERTIFICATE',
    'BACKUP MASTER KEY',
    'BACKUP SERVICE MASTER KEY',
    'BEGIN CONVERSATION TIMER',
    'BEGIN DIALOG CONVERSATION',
    'BROKER PRIORITY',
    'BULK INSERT',
    'CERTIFICATE',
    'CLOSE MASTER KEY',
    'CLOSE SYMMETRIC KEY',
    'COLUMN ENCRYPTION KEY',
    'COLUMN MASTER KEY',
    'COLUMNSTORE INDEX',
    'CONCAT_NULL_YIELDS_NULL',
    'CONTEXT_INFO',
    'CONTRACT',
    'CREDENTIAL',
    'CRYPTOGRAPHIC PROVIDER',
    'CURSOR_CLOSE_ON_COMMIT',
    'DATABASE',
    'DATABASE AUDIT SPECIFICATION',
    'DATABASE ENCRYPTION KEY',
    'DATABASE HADR',
    'DATABASE SCOPED CONFIGURATION',
    'DATABASE SCOPED CREDENTIAL',
    'DATABASE SET',
    'DATEFIRST',
    'DATEFORMAT',
    'DEADLOCK_PRIORITY',
    'DENY',
    'DENY XML',
    'DISABLE TRIGGER',
    'ENABLE TRIGGER',
    'END CONVERSATION',
    'ENDPOINT',
    'EVENT NOTIFICATION',
    'EVENT SESSION',
    'EXECUTE AS',
    'EXTERNAL DATA SOURCE',
    'EXTERNAL FILE FORMAT',
    'EXTERNAL LANGUAGE',
    'EXTERNAL LIBRARY',
    'EXTERNAL RESOURCE POOL',
    'EXTERNAL TABLE',
    'FIPS_FLAGGER',
    'FMTONLY',
    'FORCEPLAN',
    'FULLTEXT CATALOG',
    'FULLTEXT INDEX',
    'FULLTEXT STOPLIST',
    'GET CONVERSATION GROUP',
    'GET_TRANSMISSION_STATUS',
    'GRANT',
    'GRANT XML',
    'IDENTITY_INSERT',
    'IMPLICIT_TRANSACTIONS',
    'INDEX',
    'LANGUAGE',
    'LOCK_TIMEOUT',
    'LOGIN',
    'MASTER KEY',
    'MESSAGE TYPE',
    'MOVE CONVERSATION',
    'NOCOUNT',
    'NOEXEC',
    'NUMERIC_ROUNDABORT',
    'OFFSETS',
    'OPEN MASTER KEY',
    'OPEN SYMMETRIC KEY',
    'PARSEONLY',
    'PARTITION SCHEME',
    'QUERY_GOVERNOR_COST_LIMIT',
    'QUEUE',
    'QUOTED_IDENTIFIER',
    'RECEIVE',
    'REMOTE SERVICE BINDING',
    'REMOTE_PROC_TRANSACTIONS',
    'RESOURCE GOVERNOR',
    'RESOURCE POOL',
    'RESTORE',
    'RESTORE FILELISTONLY',
    'RESTORE HEADERONLY',
    'RESTORE LABELONLY',
    'RESTORE MASTER KEY',
    'RESTORE REWINDONLY',
    'RESTORE SERVICE MASTER KEY',
    'RESTORE VERIFYONLY',
    'REVERT',
    'REVOKE',
    'REVOKE XML',
    'ROLE',
    'ROUTE',
    'ROWCOUNT',
    'RULE',
    'SCHEMA',
    'SEARCH PROPERTY LIST',
    'SECURITY POLICY',
    'SELECTIVE XML INDEX',
    'SEND',
    'SENSITIVITY CLASSIFICATION',
    'SEQUENCE',
    'SERVER AUDIT',
    'SERVER AUDIT SPECIFICATION',
    'SERVER CONFIGURATION',
    'SERVER ROLE',
    'SERVICE',
    'SERVICE MASTER KEY',
    'SETUSER',
    'SHOWPLAN_ALL',
    'SHOWPLAN_TEXT',
    'SHOWPLAN_XML',
    'SIGNATURE',
    'SPATIAL INDEX',
    'STATISTICS',
    'STATISTICS IO',
    'STATISTICS PROFILE',
    'STATISTICS TIME',
    'STATISTICS XML',
    'SYMMETRIC KEY',
    'SYNONYM',
    'TABLE',
    'TABLE IDENTITY',
    'TEXTSIZE',
    'TRANSACTION ISOLATION LEVEL',
    'TRIGGER',
    'TYPE',
    'UPDATE STATISTICS',
    'USER',
    'WORKLOAD GROUP',
    'XACT_ABORT',
    'XML INDEX',
    'XML SCHEMA COLLECTION'
]);
const reservedSetOperations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'UNION [ALL]',
    'EXCEPT',
    'INTERSECT'
]);
const reservedJoins = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'JOIN',
    '{LEFT | RIGHT | FULL} [OUTER] JOIN',
    '{INNER | CROSS} JOIN',
    // non-standard joins
    '{CROSS | OUTER} APPLY'
]);
const reservedKeywordPhrases = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'ON {UPDATE | DELETE} [SET NULL | SET DEFAULT]',
    '{ROWS | RANGE} BETWEEN'
]);
const reservedDataTypePhrases = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([]);
const transactsql = {
    name: 'transactsql',
    tokenizerOptions: {
        reservedSelect,
        reservedClauses: [
            ...reservedClauses,
            ...standardOnelineClauses,
            ...tabularOnelineClauses
        ],
        reservedSetOperations,
        reservedJoins,
        reservedKeywordPhrases,
        reservedDataTypePhrases,
        reservedKeywords: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$transactsql$2f$transactsql$2e$keywords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keywords"],
        reservedDataTypes: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$transactsql$2f$transactsql$2e$keywords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dataTypes"],
        reservedFunctionNames: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$transactsql$2f$transactsql$2e$functions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["functions"],
        nestedBlockComments: true,
        stringTypes: [
            {
                quote: "''-qq",
                prefixes: [
                    'N'
                ]
            },
            '{}'
        ],
        identTypes: [
            `""-qq`,
            '[]'
        ],
        identChars: {
            first: '#@',
            rest: '#@$'
        },
        paramTypes: {
            named: [
                '@'
            ],
            quoted: [
                '@'
            ]
        },
        operators: [
            '%',
            '&',
            '|',
            '^',
            '~',
            '!<',
            '!>',
            '+=',
            '-=',
            '*=',
            '/=',
            '%=',
            '|=',
            '&=',
            '^=',
            '::',
            ':'
        ],
        propertyAccessOperators: [
            '..'
        ]
    },
    formatOptions: {
        alwaysDenseOperators: [
            '::'
        ],
        onelineClauses: [
            ...standardOnelineClauses,
            ...tabularOnelineClauses
        ],
        tabularOnelineClauses
    }
};
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/transactsql/transactsql.functions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "functions",
    ()=>functions
]);
const functions = [
    // https://docs.microsoft.com/en-us/sql/t-sql/functions/functions?view=sql-server-ver15
    // aggregate
    'APPROX_COUNT_DISTINCT',
    'AVG',
    'CHECKSUM_AGG',
    'COUNT',
    'COUNT_BIG',
    'GROUPING',
    'GROUPING_ID',
    'MAX',
    'MIN',
    'STDEV',
    'STDEVP',
    'SUM',
    'VAR',
    'VARP',
    // analytic
    'CUME_DIST',
    'FIRST_VALUE',
    'LAG',
    'LAST_VALUE',
    'LEAD',
    'PERCENTILE_CONT',
    'PERCENTILE_DISC',
    'PERCENT_RANK',
    'Collation - COLLATIONPROPERTY',
    'Collation - TERTIARY_WEIGHTS',
    // configuration
    '@@DBTS',
    '@@LANGID',
    '@@LANGUAGE',
    '@@LOCK_TIMEOUT',
    '@@MAX_CONNECTIONS',
    '@@MAX_PRECISION',
    '@@NESTLEVEL',
    '@@OPTIONS',
    '@@REMSERVER',
    '@@SERVERNAME',
    '@@SERVICENAME',
    '@@SPID',
    '@@TEXTSIZE',
    '@@VERSION',
    // conversion
    'CAST',
    'CONVERT',
    'PARSE',
    'TRY_CAST',
    'TRY_CONVERT',
    'TRY_PARSE',
    // cryptographic
    'ASYMKEY_ID',
    'ASYMKEYPROPERTY',
    'CERTPROPERTY',
    'CERT_ID',
    'CRYPT_GEN_RANDOM',
    'DECRYPTBYASYMKEY',
    'DECRYPTBYCERT',
    'DECRYPTBYKEY',
    'DECRYPTBYKEYAUTOASYMKEY',
    'DECRYPTBYKEYAUTOCERT',
    'DECRYPTBYPASSPHRASE',
    'ENCRYPTBYASYMKEY',
    'ENCRYPTBYCERT',
    'ENCRYPTBYKEY',
    'ENCRYPTBYPASSPHRASE',
    'HASHBYTES',
    'IS_OBJECTSIGNED',
    'KEY_GUID',
    'KEY_ID',
    'KEY_NAME',
    'SIGNBYASYMKEY',
    'SIGNBYCERT',
    'SYMKEYPROPERTY',
    'VERIFYSIGNEDBYCERT',
    'VERIFYSIGNEDBYASYMKEY',
    // cursor
    '@@CURSOR_ROWS',
    '@@FETCH_STATUS',
    'CURSOR_STATUS',
    // dataType
    'DATALENGTH',
    'IDENT_CURRENT',
    'IDENT_INCR',
    'IDENT_SEED',
    'IDENTITY',
    'SQL_VARIANT_PROPERTY',
    // datetime
    '@@DATEFIRST',
    'CURRENT_TIMESTAMP',
    'CURRENT_TIMEZONE',
    'CURRENT_TIMEZONE_ID',
    'DATEADD',
    'DATEDIFF',
    'DATEDIFF_BIG',
    'DATEFROMPARTS',
    'DATENAME',
    'DATEPART',
    'DATETIME2FROMPARTS',
    'DATETIMEFROMPARTS',
    'DATETIMEOFFSETFROMPARTS',
    'DAY',
    'EOMONTH',
    'GETDATE',
    'GETUTCDATE',
    'ISDATE',
    'MONTH',
    'SMALLDATETIMEFROMPARTS',
    'SWITCHOFFSET',
    'SYSDATETIME',
    'SYSDATETIMEOFFSET',
    'SYSUTCDATETIME',
    'TIMEFROMPARTS',
    'TODATETIMEOFFSET',
    'YEAR',
    'JSON',
    'ISJSON',
    'OPENJSON',
    'JSON_VALUE',
    'JSON_QUERY',
    'JSON_MODIFY',
    // mathematical
    'ABS',
    'ACOS',
    'ASIN',
    'ATAN',
    'ATN2',
    'CEILING',
    'COS',
    'COT',
    'DEGREES',
    'EXP',
    'FLOOR',
    'LOG',
    'LOG10',
    'PI',
    'POWER',
    'RADIANS',
    'RAND',
    'ROUND',
    'SIGN',
    'SIN',
    'SQRT',
    'SQUARE',
    'TAN',
    'CHOOSE',
    'GREATEST',
    'IIF',
    'LEAST',
    // metadata
    '@@PROCID',
    'APP_NAME',
    'APPLOCK_MODE',
    'APPLOCK_TEST',
    'ASSEMBLYPROPERTY',
    'COL_LENGTH',
    'COL_NAME',
    'COLUMNPROPERTY',
    'DATABASEPROPERTYEX',
    'DB_ID',
    'DB_NAME',
    'FILE_ID',
    'FILE_IDEX',
    'FILE_NAME',
    'FILEGROUP_ID',
    'FILEGROUP_NAME',
    'FILEGROUPPROPERTY',
    'FILEPROPERTY',
    'FILEPROPERTYEX',
    'FULLTEXTCATALOGPROPERTY',
    'FULLTEXTSERVICEPROPERTY',
    'INDEX_COL',
    'INDEXKEY_PROPERTY',
    'INDEXPROPERTY',
    'NEXT VALUE FOR',
    'OBJECT_DEFINITION',
    'OBJECT_ID',
    'OBJECT_NAME',
    'OBJECT_SCHEMA_NAME',
    'OBJECTPROPERTY',
    'OBJECTPROPERTYEX',
    'ORIGINAL_DB_NAME',
    'PARSENAME',
    'SCHEMA_ID',
    'SCHEMA_NAME',
    'SCOPE_IDENTITY',
    'SERVERPROPERTY',
    'STATS_DATE',
    'TYPE_ID',
    'TYPE_NAME',
    'TYPEPROPERTY',
    // ranking
    'DENSE_RANK',
    'NTILE',
    'RANK',
    'ROW_NUMBER',
    'PUBLISHINGSERVERNAME',
    // security
    'CERTENCODED',
    'CERTPRIVATEKEY',
    'CURRENT_USER',
    'DATABASE_PRINCIPAL_ID',
    'HAS_DBACCESS',
    'HAS_PERMS_BY_NAME',
    'IS_MEMBER',
    'IS_ROLEMEMBER',
    'IS_SRVROLEMEMBER',
    'LOGINPROPERTY',
    'ORIGINAL_LOGIN',
    'PERMISSIONS',
    'PWDENCRYPT',
    'PWDCOMPARE',
    'SESSION_USER',
    'SESSIONPROPERTY',
    'SUSER_ID',
    'SUSER_NAME',
    'SUSER_SID',
    'SUSER_SNAME',
    'SYSTEM_USER',
    'USER',
    'USER_ID',
    'USER_NAME',
    // string
    'ASCII',
    'CHARINDEX',
    'CONCAT',
    'CONCAT_WS',
    'DIFFERENCE',
    'FORMAT',
    'LEFT',
    'LEN',
    'LOWER',
    'LTRIM',
    'PATINDEX',
    'QUOTENAME',
    'REPLACE',
    'REPLICATE',
    'REVERSE',
    'RIGHT',
    'RTRIM',
    'SOUNDEX',
    'SPACE',
    'STR',
    'STRING_AGG',
    'STRING_ESCAPE',
    'STUFF',
    'SUBSTRING',
    'TRANSLATE',
    'TRIM',
    'UNICODE',
    'UPPER',
    // system
    '$PARTITION',
    '@@ERROR',
    '@@IDENTITY',
    '@@PACK_RECEIVED',
    '@@ROWCOUNT',
    '@@TRANCOUNT',
    'BINARY_CHECKSUM',
    'CHECKSUM',
    'COMPRESS',
    'CONNECTIONPROPERTY',
    'CONTEXT_INFO',
    'CURRENT_REQUEST_ID',
    'CURRENT_TRANSACTION_ID',
    'DECOMPRESS',
    'ERROR_LINE',
    'ERROR_MESSAGE',
    'ERROR_NUMBER',
    'ERROR_PROCEDURE',
    'ERROR_SEVERITY',
    'ERROR_STATE',
    'FORMATMESSAGE',
    'GET_FILESTREAM_TRANSACTION_CONTEXT',
    'GETANSINULL',
    'HOST_ID',
    'HOST_NAME',
    'ISNULL',
    'ISNUMERIC',
    'MIN_ACTIVE_ROWVERSION',
    'NEWID',
    'NEWSEQUENTIALID',
    'ROWCOUNT_BIG',
    'SESSION_CONTEXT',
    'XACT_STATE',
    // statistical
    '@@CONNECTIONS',
    '@@CPU_BUSY',
    '@@IDLE',
    '@@IO_BUSY',
    '@@PACK_SENT',
    '@@PACKET_ERRORS',
    '@@TIMETICKS',
    '@@TOTAL_ERRORS',
    '@@TOTAL_READ',
    '@@TOTAL_WRITE',
    'TEXTPTR',
    'TEXTVALID',
    // trigger
    'COLUMNS_UPDATED',
    'EVENTDATA',
    'TRIGGER_NESTLEVEL',
    'UPDATE',
    // Shorthand functions to use in place of CASE expression
    'COALESCE',
    'NULLIF'
];
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/transactsql/transactsql.keywords.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "dataTypes",
    ()=>dataTypes,
    "keywords",
    ()=>keywords
]);
const keywords = [
    // https://docs.microsoft.com/en-us/sql/t-sql/language-elements/reserved-keywords-transact-sql?view=sql-server-ver15
    // standard
    'ADD',
    'ALL',
    'ALTER',
    'AND',
    'ANY',
    'AS',
    'ASC',
    'AUTHORIZATION',
    'BACKUP',
    'BEGIN',
    'BETWEEN',
    'BREAK',
    'BROWSE',
    'BULK',
    'BY',
    'CASCADE',
    'CHECK',
    'CHECKPOINT',
    'CLOSE',
    'CLUSTERED',
    'COALESCE',
    'COLLATE',
    'COLUMN',
    'COMMIT',
    'COMPUTE',
    'CONSTRAINT',
    'CONTAINS',
    'CONTAINSTABLE',
    'CONTINUE',
    'CONVERT',
    'CREATE',
    'CROSS',
    'CURRENT',
    'CURRENT_DATE',
    'CURRENT_TIME',
    'CURRENT_TIMESTAMP',
    'CURRENT_USER',
    'CURSOR',
    'DATABASE',
    'DBCC',
    'DEALLOCATE',
    'DECLARE',
    'DEFAULT',
    'DELETE',
    'DENY',
    'DESC',
    'DISK',
    'DISTINCT',
    'DISTRIBUTED',
    'DROP',
    'DUMP',
    'ERRLVL',
    'ESCAPE',
    'EXEC',
    'EXECUTE',
    'EXISTS',
    'EXIT',
    'EXTERNAL',
    'FETCH',
    'FILE',
    'FILLFACTOR',
    'FOR',
    'FOREIGN',
    'FREETEXT',
    'FREETEXTTABLE',
    'FROM',
    'FULL',
    'FUNCTION',
    'GOTO',
    'GRANT',
    'GROUP',
    'HAVING',
    'HOLDLOCK',
    'IDENTITY',
    'IDENTITYCOL',
    'IDENTITY_INSERT',
    'IF',
    'IN',
    'INDEX',
    'INNER',
    'INSERT',
    'INTERSECT',
    'INTO',
    'IS',
    'JOIN',
    'KEY',
    'KILL',
    'LEFT',
    'LIKE',
    'LINENO',
    'LOAD',
    'MERGE',
    'NOCHECK',
    'NONCLUSTERED',
    'NOT',
    'NULL',
    'NULLIF',
    'OF',
    'OFF',
    'OFFSETS',
    'ON',
    'OPEN',
    'OPENDATASOURCE',
    'OPENQUERY',
    'OPENROWSET',
    'OPENXML',
    'OPTION',
    'OR',
    'ORDER',
    'OUTER',
    'OVER',
    'PERCENT',
    'PIVOT',
    'PLAN',
    'PRIMARY',
    'PRINT',
    'PROC',
    'PROCEDURE',
    'PUBLIC',
    'RAISERROR',
    'READ',
    'READTEXT',
    'RECONFIGURE',
    'REFERENCES',
    'REPLICATION',
    'RESTORE',
    'RESTRICT',
    'RETURN',
    'REVERT',
    'REVOKE',
    'RIGHT',
    'ROLLBACK',
    'ROWCOUNT',
    'ROWGUIDCOL',
    'RULE',
    'SAVE',
    'SCHEMA',
    'SECURITYAUDIT',
    'SELECT',
    'SEMANTICKEYPHRASETABLE',
    'SEMANTICSIMILARITYDETAILSTABLE',
    'SEMANTICSIMILARITYTABLE',
    'SESSION_USER',
    'SET',
    'SETUSER',
    'SHUTDOWN',
    'SOME',
    'STATISTICS',
    'SYSTEM_USER',
    'TABLE',
    'TABLESAMPLE',
    'TEXTSIZE',
    'THEN',
    'TO',
    'TOP',
    'TRAN',
    'TRANSACTION',
    'TRIGGER',
    'TRUNCATE',
    'TRY_CONVERT',
    'TSEQUAL',
    'UNION',
    'UNIQUE',
    'UNPIVOT',
    'UPDATE',
    'UPDATETEXT',
    'USE',
    'USER',
    'VALUES',
    'VIEW',
    'WAITFOR',
    'WHERE',
    'WHILE',
    'WITH',
    'WITHIN GROUP',
    'WRITETEXT',
    // https://learn.microsoft.com/en-us/sql/t-sql/queries/output-clause-transact-sql?view=sql-server-ver16#action
    '$ACTION'
];
const dataTypes = [
    // https://learn.microsoft.com/en-us/sql/t-sql/data-types/data-types-transact-sql?view=sql-server-ver15
    'BINARY',
    'BIT',
    'CHAR',
    'CHAR',
    'CHARACTER',
    'DATE',
    'DATETIME2',
    'DATETIMEOFFSET',
    'DEC',
    'DECIMAL',
    'DOUBLE',
    'FLOAT',
    'INT',
    'INTEGER',
    'NATIONAL',
    'NCHAR',
    'NUMERIC',
    'NVARCHAR',
    'PRECISION',
    'REAL',
    'SMALLINT',
    'TIME',
    'TIMESTAMP',
    'VARBINARY',
    'VARCHAR'
];
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/trino/trino.formatter.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "trino",
    ()=>trino
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/expandPhrases.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$trino$2f$trino$2e$functions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/trino/trino.functions.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$trino$2f$trino$2e$keywords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/trino/trino.keywords.js [app-client] (ecmascript)");
;
;
;
const reservedSelect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'SELECT [ALL | DISTINCT]'
]);
// https://github.com/trinodb/trino/blob/432d2897bdef99388c1a47188743a061c4ac1f34/core/trino-parser/src/main/antlr4/io/trino/sql/parser/SqlBase.g4#L41
const reservedClauses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    // queries
    'WITH [RECURSIVE]',
    'FROM',
    'WHERE',
    'GROUP BY [ALL | DISTINCT]',
    'HAVING',
    'WINDOW',
    'PARTITION BY',
    'ORDER BY',
    'LIMIT',
    'OFFSET',
    'FETCH {FIRST | NEXT}',
    // Data manipulation
    // - insert:
    'INSERT INTO',
    'VALUES',
    // - update:
    'SET',
    // MATCH_RECOGNIZE
    'MATCH_RECOGNIZE',
    'MEASURES',
    'ONE ROW PER MATCH',
    'ALL ROWS PER MATCH',
    'AFTER MATCH',
    'PATTERN',
    'SUBSET',
    'DEFINE'
]);
const standardOnelineClauses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'CREATE TABLE [IF NOT EXISTS]'
]);
const tabularOnelineClauses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    // - create:
    'CREATE [OR REPLACE] [MATERIALIZED] VIEW',
    // - update:
    'UPDATE',
    // - delete:
    'DELETE FROM',
    // - drop table:
    'DROP TABLE [IF EXISTS]',
    // - alter table:
    'ALTER TABLE [IF EXISTS]',
    'ADD COLUMN [IF NOT EXISTS]',
    'DROP COLUMN [IF EXISTS]',
    'RENAME COLUMN [IF EXISTS]',
    'RENAME TO',
    'SET AUTHORIZATION [USER | ROLE]',
    'SET PROPERTIES',
    'EXECUTE',
    // - truncate:
    'TRUNCATE TABLE',
    // other
    'ALTER SCHEMA',
    'ALTER MATERIALIZED VIEW',
    'ALTER VIEW',
    'CREATE SCHEMA',
    'CREATE ROLE',
    'DROP SCHEMA',
    'DROP MATERIALIZED VIEW',
    'DROP VIEW',
    'DROP ROLE',
    // Auxiliary
    'EXPLAIN',
    'ANALYZE',
    'EXPLAIN ANALYZE',
    'EXPLAIN ANALYZE VERBOSE',
    'USE',
    'DESCRIBE INPUT',
    'DESCRIBE OUTPUT',
    'REFRESH MATERIALIZED VIEW',
    'RESET SESSION',
    'SET SESSION',
    'SET PATH',
    'SET TIME ZONE',
    'SHOW GRANTS',
    'SHOW CREATE TABLE',
    'SHOW CREATE SCHEMA',
    'SHOW CREATE VIEW',
    'SHOW CREATE MATERIALIZED VIEW',
    'SHOW TABLES',
    'SHOW SCHEMAS',
    'SHOW CATALOGS',
    'SHOW COLUMNS',
    'SHOW STATS FOR',
    'SHOW ROLES',
    'SHOW CURRENT ROLES',
    'SHOW ROLE GRANTS',
    'SHOW FUNCTIONS',
    'SHOW SESSION'
]);
// https://github.com/trinodb/trino/blob/432d2897bdef99388c1a47188743a061c4ac1f34/core/trino-parser/src/main/antlr4/io/trino/sql/parser/SqlBase.g4#L231-L235
// https://github.com/trinodb/trino/blob/432d2897bdef99388c1a47188743a061c4ac1f34/core/trino-parser/src/main/antlr4/io/trino/sql/parser/SqlBase.g4#L288-L291
const reservedSetOperations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'UNION [ALL | DISTINCT] [CORRESPONDING]',
    'EXCEPT [ALL | DISTINCT] [CORRESPONDING]',
    'INTERSECT [ALL | DISTINCT] [CORRESPONDING]'
]);
// https://github.com/trinodb/trino/blob/432d2897bdef99388c1a47188743a061c4ac1f34/core/trino-parser/src/main/antlr4/io/trino/sql/parser/SqlBase.g4#L299-L313
const reservedJoins = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    'JOIN',
    '{LEFT | RIGHT | FULL} [OUTER] JOIN',
    '{INNER | CROSS} JOIN',
    'NATURAL [INNER] JOIN',
    'NATURAL {LEFT | RIGHT | FULL} [OUTER] JOIN'
]);
const reservedKeywordPhrases = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([
    '{ROWS | RANGE | GROUPS} BETWEEN',
    // comparison operator
    'IS [NOT] DISTINCT FROM',
    // https://trino.io/docs/current/language/types.html#timestamp-p-with-time-zone
    '[TIMESTAMP | TIME] {WITH | WITHOUT} TIME ZONE'
]);
const reservedDataTypePhrases = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$expandPhrases$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandPhrases"])([]);
const trino = {
    name: 'trino',
    tokenizerOptions: {
        reservedSelect,
        reservedClauses: [
            ...reservedClauses,
            ...standardOnelineClauses,
            ...tabularOnelineClauses
        ],
        reservedSetOperations,
        reservedJoins,
        reservedKeywordPhrases,
        reservedDataTypePhrases,
        reservedKeywords: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$trino$2f$trino$2e$keywords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keywords"],
        reservedDataTypes: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$trino$2f$trino$2e$keywords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dataTypes"],
        reservedFunctionNames: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$languages$2f$trino$2f$trino$2e$functions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["functions"],
        // Trino also supports {- ... -} parenthesis.
        // The formatting of these currently works out as a result of { and -
        // not getting a space added in-between.
        // https://trino.io/docs/current/sql/match-recognize.html#row-pattern-syntax
        extraParens: [
            '[]',
            '{}'
        ],
        // https://trino.io/docs/current/language/types.html#string
        // https://trino.io/docs/current/language/types.html#varbinary
        stringTypes: [
            {
                quote: "''-qq",
                prefixes: [
                    'U&'
                ]
            },
            {
                quote: "''-raw",
                prefixes: [
                    'X'
                ],
                requirePrefix: true
            }
        ],
        // https://trino.io/docs/current/language/reserved.html
        identTypes: [
            '""-qq'
        ],
        paramTypes: {
            positional: true
        },
        operators: [
            '%',
            '->',
            '=>',
            ':',
            '||',
            // Row pattern syntax
            '|',
            '^',
            '$'
        ]
    },
    formatOptions: {
        onelineClauses: [
            ...standardOnelineClauses,
            ...tabularOnelineClauses
        ],
        tabularOnelineClauses
    }
};
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/trino/trino.functions.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "functions",
    ()=>functions
]);
const functions = [
    // https://github.com/trinodb/trino/tree/432d2897bdef99388c1a47188743a061c4ac1f34/docs/src/main/sphinx/functions
    // rg '^\.\. function::' ./docs/src/main/sphinx/functions | cut -d' ' -f 3 | cut -d '(' -f 1 | sort | uniq
    // rg '\* ' ./docs/src/main/sphinx/functions/list-by-topic.rst | grep    '\* :func:' | cut -d'`' -f 2
    // rg '\* ' ./docs/src/main/sphinx/functions/list-by-topic.rst | grep -v '\* :func:'
    // grep -e '^- ' ./docs/src/main/sphinx/functions/list.rst | grep  -e '^- :func:' | cut -d'`' -f2
    // grep -e '^- ' ./docs/src/main/sphinx/functions/list.rst | grep -ve '^- :func:'
    'ABS',
    'ACOS',
    'ALL_MATCH',
    'ANY_MATCH',
    'APPROX_DISTINCT',
    'APPROX_MOST_FREQUENT',
    'APPROX_PERCENTILE',
    'APPROX_SET',
    'ARBITRARY',
    'ARRAYS_OVERLAP',
    'ARRAY_AGG',
    'ARRAY_DISTINCT',
    'ARRAY_EXCEPT',
    'ARRAY_INTERSECT',
    'ARRAY_JOIN',
    'ARRAY_MAX',
    'ARRAY_MIN',
    'ARRAY_POSITION',
    'ARRAY_REMOVE',
    'ARRAY_SORT',
    'ARRAY_UNION',
    'ASIN',
    'ATAN',
    'ATAN2',
    'AT_TIMEZONE',
    'AVG',
    'BAR',
    'BETA_CDF',
    'BING_TILE',
    'BING_TILES_AROUND',
    'BING_TILE_AT',
    'BING_TILE_COORDINATES',
    'BING_TILE_POLYGON',
    'BING_TILE_QUADKEY',
    'BING_TILE_ZOOM_LEVEL',
    'BITWISE_AND',
    'BITWISE_AND_AGG',
    'BITWISE_LEFT_SHIFT',
    'BITWISE_NOT',
    'BITWISE_OR',
    'BITWISE_OR_AGG',
    'BITWISE_RIGHT_SHIFT',
    'BITWISE_RIGHT_SHIFT_ARITHMETIC',
    'BITWISE_XOR',
    'BIT_COUNT',
    'BOOL_AND',
    'BOOL_OR',
    'CARDINALITY',
    'CAST',
    'CBRT',
    'CEIL',
    'CEILING',
    'CHAR2HEXINT',
    'CHECKSUM',
    'CHR',
    'CLASSIFY',
    'COALESCE',
    'CODEPOINT',
    'COLOR',
    'COMBINATIONS',
    'CONCAT',
    'CONCAT_WS',
    'CONTAINS',
    'CONTAINS_SEQUENCE',
    'CONVEX_HULL_AGG',
    'CORR',
    'COS',
    'COSH',
    'COSINE_SIMILARITY',
    'COUNT',
    'COUNT_IF',
    'COVAR_POP',
    'COVAR_SAMP',
    'CRC32',
    'CUME_DIST',
    'CURRENT_CATALOG',
    'CURRENT_DATE',
    'CURRENT_GROUPS',
    'CURRENT_SCHEMA',
    'CURRENT_TIME',
    'CURRENT_TIMESTAMP',
    'CURRENT_TIMEZONE',
    'CURRENT_USER',
    'DATE',
    'DATE_ADD',
    'DATE_DIFF',
    'DATE_FORMAT',
    'DATE_PARSE',
    'DATE_TRUNC',
    'DAY',
    'DAY_OF_MONTH',
    'DAY_OF_WEEK',
    'DAY_OF_YEAR',
    'DEGREES',
    'DENSE_RANK',
    'DOW',
    'DOY',
    'E',
    'ELEMENT_AT',
    'EMPTY_APPROX_SET',
    'EVALUATE_CLASSIFIER_PREDICTIONS',
    'EVERY',
    'EXP',
    'EXTRACT',
    'FEATURES',
    'FILTER',
    'FIRST_VALUE',
    'FLATTEN',
    'FLOOR',
    'FORMAT',
    'FORMAT_DATETIME',
    'FORMAT_NUMBER',
    'FROM_BASE',
    'FROM_BASE32',
    'FROM_BASE64',
    'FROM_BASE64URL',
    'FROM_BIG_ENDIAN_32',
    'FROM_BIG_ENDIAN_64',
    'FROM_ENCODED_POLYLINE',
    'FROM_GEOJSON_GEOMETRY',
    'FROM_HEX',
    'FROM_IEEE754_32',
    'FROM_IEEE754_64',
    'FROM_ISO8601_DATE',
    'FROM_ISO8601_TIMESTAMP',
    'FROM_ISO8601_TIMESTAMP_NANOS',
    'FROM_UNIXTIME',
    'FROM_UNIXTIME_NANOS',
    'FROM_UTF8',
    'GEOMETRIC_MEAN',
    'GEOMETRY_FROM_HADOOP_SHAPE',
    'GEOMETRY_INVALID_REASON',
    'GEOMETRY_NEAREST_POINTS',
    'GEOMETRY_TO_BING_TILES',
    'GEOMETRY_UNION',
    'GEOMETRY_UNION_AGG',
    'GREATEST',
    'GREAT_CIRCLE_DISTANCE',
    'HAMMING_DISTANCE',
    'HASH_COUNTS',
    'HISTOGRAM',
    'HMAC_MD5',
    'HMAC_SHA1',
    'HMAC_SHA256',
    'HMAC_SHA512',
    'HOUR',
    'HUMAN_READABLE_SECONDS',
    'IF',
    'INDEX',
    'INFINITY',
    'INTERSECTION_CARDINALITY',
    'INVERSE_BETA_CDF',
    'INVERSE_NORMAL_CDF',
    'IS_FINITE',
    'IS_INFINITE',
    'IS_JSON_SCALAR',
    'IS_NAN',
    'JACCARD_INDEX',
    'JSON_ARRAY_CONTAINS',
    'JSON_ARRAY_GET',
    'JSON_ARRAY_LENGTH',
    'JSON_EXISTS',
    'JSON_EXTRACT',
    'JSON_EXTRACT_SCALAR',
    'JSON_FORMAT',
    'JSON_PARSE',
    'JSON_QUERY',
    'JSON_SIZE',
    'JSON_VALUE',
    'KURTOSIS',
    'LAG',
    'LAST_DAY_OF_MONTH',
    'LAST_VALUE',
    'LEAD',
    'LEARN_CLASSIFIER',
    'LEARN_LIBSVM_CLASSIFIER',
    'LEARN_LIBSVM_REGRESSOR',
    'LEARN_REGRESSOR',
    'LEAST',
    'LENGTH',
    'LEVENSHTEIN_DISTANCE',
    'LINE_INTERPOLATE_POINT',
    'LINE_INTERPOLATE_POINTS',
    'LINE_LOCATE_POINT',
    'LISTAGG',
    'LN',
    'LOCALTIME',
    'LOCALTIMESTAMP',
    'LOG',
    'LOG10',
    'LOG2',
    'LOWER',
    'LPAD',
    'LTRIM',
    'LUHN_CHECK',
    'MAKE_SET_DIGEST',
    'MAP',
    'MAP_AGG',
    'MAP_CONCAT',
    'MAP_ENTRIES',
    'MAP_FILTER',
    'MAP_FROM_ENTRIES',
    'MAP_KEYS',
    'MAP_UNION',
    'MAP_VALUES',
    'MAP_ZIP_WITH',
    'MAX',
    'MAX_BY',
    'MD5',
    'MERGE',
    'MERGE_SET_DIGEST',
    'MILLISECOND',
    'MIN',
    'MINUTE',
    'MIN_BY',
    'MOD',
    'MONTH',
    'MULTIMAP_AGG',
    'MULTIMAP_FROM_ENTRIES',
    'MURMUR3',
    'NAN',
    'NGRAMS',
    'NONE_MATCH',
    'NORMALIZE',
    'NORMAL_CDF',
    'NOW',
    'NTH_VALUE',
    'NTILE',
    'NULLIF',
    'NUMERIC_HISTOGRAM',
    'OBJECTID',
    'OBJECTID_TIMESTAMP',
    'PARSE_DATA_SIZE',
    'PARSE_DATETIME',
    'PARSE_DURATION',
    'PERCENT_RANK',
    'PI',
    'POSITION',
    'POW',
    'POWER',
    'QDIGEST_AGG',
    'QUARTER',
    'RADIANS',
    'RAND',
    'RANDOM',
    'RANK',
    'REDUCE',
    'REDUCE_AGG',
    'REGEXP_COUNT',
    'REGEXP_EXTRACT',
    'REGEXP_EXTRACT_ALL',
    'REGEXP_LIKE',
    'REGEXP_POSITION',
    'REGEXP_REPLACE',
    'REGEXP_SPLIT',
    'REGRESS',
    'REGR_INTERCEPT',
    'REGR_SLOPE',
    'RENDER',
    'REPEAT',
    'REPLACE',
    'REVERSE',
    'RGB',
    'ROUND',
    'ROW_NUMBER',
    'RPAD',
    'RTRIM',
    'SECOND',
    'SEQUENCE',
    'SHA1',
    'SHA256',
    'SHA512',
    'SHUFFLE',
    'SIGN',
    'SIMPLIFY_GEOMETRY',
    'SIN',
    'SKEWNESS',
    'SLICE',
    'SOUNDEX',
    'SPATIAL_PARTITIONING',
    'SPATIAL_PARTITIONS',
    'SPLIT',
    'SPLIT_PART',
    'SPLIT_TO_MAP',
    'SPLIT_TO_MULTIMAP',
    'SPOOKY_HASH_V2_32',
    'SPOOKY_HASH_V2_64',
    'SQRT',
    'STARTS_WITH',
    'STDDEV',
    'STDDEV_POP',
    'STDDEV_SAMP',
    'STRPOS',
    'ST_AREA',
    'ST_ASBINARY',
    'ST_ASTEXT',
    'ST_BOUNDARY',
    'ST_BUFFER',
    'ST_CENTROID',
    'ST_CONTAINS',
    'ST_CONVEXHULL',
    'ST_COORDDIM',
    'ST_CROSSES',
    'ST_DIFFERENCE',
    'ST_DIMENSION',
    'ST_DISJOINT',
    'ST_DISTANCE',
    'ST_ENDPOINT',
    'ST_ENVELOPE',
    'ST_ENVELOPEASPTS',
    'ST_EQUALS',
    'ST_EXTERIORRING',
    'ST_GEOMETRIES',
    'ST_GEOMETRYFROMTEXT',
    'ST_GEOMETRYN',
    'ST_GEOMETRYTYPE',
    'ST_GEOMFROMBINARY',
    'ST_INTERIORRINGN',
    'ST_INTERIORRINGS',
    'ST_INTERSECTION',
    'ST_INTERSECTS',
    'ST_ISCLOSED',
    'ST_ISEMPTY',
    'ST_ISRING',
    'ST_ISSIMPLE',
    'ST_ISVALID',
    'ST_LENGTH',
    'ST_LINEFROMTEXT',
    'ST_LINESTRING',
    'ST_MULTIPOINT',
    'ST_NUMGEOMETRIES',
    'ST_NUMINTERIORRING',
    'ST_NUMPOINTS',
    'ST_OVERLAPS',
    'ST_POINT',
    'ST_POINTN',
    'ST_POINTS',
    'ST_POLYGON',
    'ST_RELATE',
    'ST_STARTPOINT',
    'ST_SYMDIFFERENCE',
    'ST_TOUCHES',
    'ST_UNION',
    'ST_WITHIN',
    'ST_X',
    'ST_XMAX',
    'ST_XMIN',
    'ST_Y',
    'ST_YMAX',
    'ST_YMIN',
    'SUBSTR',
    'SUBSTRING',
    'SUM',
    'TAN',
    'TANH',
    'TDIGEST_AGG',
    'TIMESTAMP_OBJECTID',
    'TIMEZONE_HOUR',
    'TIMEZONE_MINUTE',
    'TO_BASE',
    'TO_BASE32',
    'TO_BASE64',
    'TO_BASE64URL',
    'TO_BIG_ENDIAN_32',
    'TO_BIG_ENDIAN_64',
    'TO_CHAR',
    'TO_DATE',
    'TO_ENCODED_POLYLINE',
    'TO_GEOJSON_GEOMETRY',
    'TO_GEOMETRY',
    'TO_HEX',
    'TO_IEEE754_32',
    'TO_IEEE754_64',
    'TO_ISO8601',
    'TO_MILLISECONDS',
    'TO_SPHERICAL_GEOGRAPHY',
    'TO_TIMESTAMP',
    'TO_UNIXTIME',
    'TO_UTF8',
    'TRANSFORM',
    'TRANSFORM_KEYS',
    'TRANSFORM_VALUES',
    'TRANSLATE',
    'TRIM',
    'TRIM_ARRAY',
    'TRUNCATE',
    'TRY',
    'TRY_CAST',
    'TYPEOF',
    'UPPER',
    'URL_DECODE',
    'URL_ENCODE',
    'URL_EXTRACT_FRAGMENT',
    'URL_EXTRACT_HOST',
    'URL_EXTRACT_PARAMETER',
    'URL_EXTRACT_PATH',
    'URL_EXTRACT_PORT',
    'URL_EXTRACT_PROTOCOL',
    'URL_EXTRACT_QUERY',
    'UUID',
    'VALUES_AT_QUANTILES',
    'VALUE_AT_QUANTILE',
    'VARIANCE',
    'VAR_POP',
    'VAR_SAMP',
    'VERSION',
    'WEEK',
    'WEEK_OF_YEAR',
    'WIDTH_BUCKET',
    'WILSON_INTERVAL_LOWER',
    'WILSON_INTERVAL_UPPER',
    'WITH_TIMEZONE',
    'WORD_STEM',
    'XXHASH64',
    'YEAR',
    'YEAR_OF_WEEK',
    'YOW',
    'ZIP',
    'ZIP_WITH',
    // https://trino.io/docs/current/sql/match-recognize.html#row-pattern-recognition-expressions
    'CLASSIFIER',
    'FIRST',
    'LAST',
    'MATCH_NUMBER',
    'NEXT',
    'PERMUTE',
    'PREV'
];
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/languages/trino/trino.keywords.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "dataTypes",
    ()=>dataTypes,
    "keywords",
    ()=>keywords
]);
const keywords = [
    // https://github.com/trinodb/trino/blob/432d2897bdef99388c1a47188743a061c4ac1f34/core/trino-parser/src/main/antlr4/io/trino/sql/parser/SqlBase.g4#L858-L1128
    'ABSENT',
    'ADD',
    'ADMIN',
    'AFTER',
    'ALL',
    'ALTER',
    'ANALYZE',
    'AND',
    'ANY',
    'AS',
    'ASC',
    'AT',
    'AUTHORIZATION',
    'BERNOULLI',
    'BETWEEN',
    'BOTH',
    'BY',
    'CALL',
    'CASCADE',
    'CASE',
    'CATALOGS',
    'COLUMN',
    'COLUMNS',
    'COMMENT',
    'COMMIT',
    'COMMITTED',
    'CONDITIONAL',
    'CONSTRAINT',
    'COPARTITION',
    'CREATE',
    'CROSS',
    'CUBE',
    'CURRENT',
    'CURRENT_PATH',
    'CURRENT_ROLE',
    'DATA',
    'DEALLOCATE',
    'DEFAULT',
    'DEFINE',
    'DEFINER',
    'DELETE',
    'DENY',
    'DESC',
    'DESCRIBE',
    'DESCRIPTOR',
    'DISTINCT',
    'DISTRIBUTED',
    'DOUBLE',
    'DROP',
    'ELSE',
    'EMPTY',
    'ENCODING',
    'END',
    'ERROR',
    'ESCAPE',
    'EXCEPT',
    'EXCLUDING',
    'EXECUTE',
    'EXISTS',
    'EXPLAIN',
    'FALSE',
    'FETCH',
    'FINAL',
    'FIRST',
    'FOLLOWING',
    'FOR',
    'FROM',
    'FULL',
    'FUNCTIONS',
    'GRANT',
    'GRANTED',
    'GRANTS',
    'GRAPHVIZ',
    'GROUP',
    'GROUPING',
    'GROUPS',
    'HAVING',
    'IGNORE',
    'IN',
    'INCLUDING',
    'INITIAL',
    'INNER',
    'INPUT',
    'INSERT',
    'INTERSECT',
    'INTERVAL',
    'INTO',
    'INVOKER',
    'IO',
    'IS',
    'ISOLATION',
    'JOIN',
    'JSON',
    'JSON_ARRAY',
    'JSON_OBJECT',
    'KEEP',
    'KEY',
    'KEYS',
    'LAST',
    'LATERAL',
    'LEADING',
    'LEFT',
    'LEVEL',
    'LIKE',
    'LIMIT',
    'LOCAL',
    'LOGICAL',
    'MATCH',
    'MATCHED',
    'MATCHES',
    'MATCH_RECOGNIZE',
    'MATERIALIZED',
    'MEASURES',
    'NATURAL',
    'NEXT',
    'NFC',
    'NFD',
    'NFKC',
    'NFKD',
    'NO',
    'NONE',
    'NOT',
    'NULL',
    'NULLS',
    'OBJECT',
    'OF',
    'OFFSET',
    'OMIT',
    'ON',
    'ONE',
    'ONLY',
    'OPTION',
    'OR',
    'ORDER',
    'ORDINALITY',
    'OUTER',
    'OUTPUT',
    'OVER',
    'OVERFLOW',
    'PARTITION',
    'PARTITIONS',
    'PASSING',
    'PAST',
    'PATH',
    'PATTERN',
    'PER',
    'PERMUTE',
    'PRECEDING',
    'PRECISION',
    'PREPARE',
    'PRIVILEGES',
    'PROPERTIES',
    'PRUNE',
    'QUOTES',
    'RANGE',
    'READ',
    'RECURSIVE',
    'REFRESH',
    'RENAME',
    'REPEATABLE',
    'RESET',
    'RESPECT',
    'RESTRICT',
    'RETURNING',
    'REVOKE',
    'RIGHT',
    'ROLE',
    'ROLES',
    'ROLLBACK',
    'ROLLUP',
    'ROW',
    'ROWS',
    'RUNNING',
    'SCALAR',
    'SCHEMA',
    'SCHEMAS',
    'SECURITY',
    'SEEK',
    'SELECT',
    'SERIALIZABLE',
    'SESSION',
    'SET',
    'SETS',
    'SHOW',
    'SKIP',
    'SOME',
    'START',
    'STATS',
    'STRING',
    'SUBSET',
    'SYSTEM',
    'TABLE',
    'TABLES',
    'TABLESAMPLE',
    'TEXT',
    'THEN',
    'TIES',
    'TIME',
    'TIMESTAMP',
    'TO',
    'TRAILING',
    'TRANSACTION',
    'TRUE',
    'TYPE',
    'UESCAPE',
    'UNBOUNDED',
    'UNCOMMITTED',
    'UNCONDITIONAL',
    'UNION',
    'UNIQUE',
    'UNKNOWN',
    'UNMATCHED',
    'UNNEST',
    'UPDATE',
    'USE',
    'USER',
    'USING',
    'UTF16',
    'UTF32',
    'UTF8',
    'VALIDATE',
    'VALUE',
    'VALUES',
    'VERBOSE',
    'VIEW',
    'WHEN',
    'WHERE',
    'WINDOW',
    'WITH',
    'WITHIN',
    'WITHOUT',
    'WORK',
    'WRAPPER',
    'WRITE',
    'ZONE'
];
const dataTypes = [
    // https://github.com/trinodb/trino/blob/432d2897bdef99388c1a47188743a061c4ac1f34/core/trino-main/src/main/java/io/trino/metadata/TypeRegistry.java#L131-L168
    // or https://trino.io/docs/current/language/types.html
    'BIGINT',
    'INT',
    'INTEGER',
    'SMALLINT',
    'TINYINT',
    'BOOLEAN',
    'DATE',
    'DECIMAL',
    'REAL',
    'DOUBLE',
    'HYPERLOGLOG',
    'QDIGEST',
    'TDIGEST',
    'P4HYPERLOGLOG',
    'INTERVAL',
    'TIMESTAMP',
    'TIME',
    'VARBINARY',
    'VARCHAR',
    'CHAR',
    'ROW',
    'ARRAY',
    'MAP',
    'JSON',
    'JSON2016',
    'IPADDRESS',
    'GEOMETRY',
    'UUID',
    'SETDIGEST',
    'JONIREGEXP',
    'RE2JREGEXP',
    'LIKEPATTERN',
    'COLOR',
    'CODEPOINTS',
    'FUNCTION',
    'JSONPATH'
];
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/lexer/NestedComment.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NestedComment",
    ()=>NestedComment
]);
const START = /\/\*/uy; // matches: /*
const ANY_CHAR = /[\s\S]/uy; // matches single character
const END = /\*\//uy; // matches: */
class NestedComment {
    constructor(){
        this.lastIndex = 0;
    }
    exec(input) {
        let result = '';
        let match;
        let nestLevel = 0;
        if (match = this.matchSection(START, input)) {
            result += match;
            nestLevel++;
        } else {
            return null;
        }
        while(nestLevel > 0){
            if (match = this.matchSection(START, input)) {
                result += match;
                nestLevel++;
            } else if (match = this.matchSection(END, input)) {
                result += match;
                nestLevel--;
            } else if (match = this.matchSection(ANY_CHAR, input)) {
                result += match;
            } else {
                return null;
            }
        }
        return [
            result
        ];
    }
    matchSection(regex, input) {
        regex.lastIndex = this.lastIndex;
        const matches = regex.exec(input);
        if (matches) {
            this.lastIndex += matches[0].length;
        }
        return matches ? matches[0] : null;
    }
}
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/lexer/Tokenizer.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Tokenizer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/lexer/token.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$regexFactory$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/lexer/regexFactory.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$TokenizerEngine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/lexer/TokenizerEngine.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$regexUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/lexer/regexUtil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$NestedComment$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/lexer/NestedComment.js [app-client] (ecmascript)");
;
;
;
;
;
;
class Tokenizer {
    constructor(cfg, dialectName){
        this.cfg = cfg;
        this.dialectName = dialectName;
        this.rulesBeforeParams = this.buildRulesBeforeParams(cfg);
        this.rulesAfterParams = this.buildRulesAfterParams(cfg);
    }
    tokenize(input, paramTypesOverrides) {
        const rules = [
            ...this.rulesBeforeParams,
            ...this.buildParamRules(this.cfg, paramTypesOverrides),
            ...this.rulesAfterParams
        ];
        const tokens = new __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$TokenizerEngine$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](rules, this.dialectName).tokenize(input);
        return this.cfg.postProcess ? this.cfg.postProcess(tokens) : tokens;
    }
    // These rules can be cached as they only depend on
    // the Tokenizer config options specified for each SQL dialect
    buildRulesBeforeParams(cfg) {
        var _a, _b, _c;
        return this.validRules([
            {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].DISABLE_COMMENT,
                regex: /(\/\* *sql-formatter-disable *\*\/[\s\S]*?(?:\/\* *sql-formatter-enable *\*\/|$))/uy
            },
            {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].BLOCK_COMMENT,
                regex: cfg.nestedBlockComments ? new __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$NestedComment$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NestedComment"]() : /(\/\*[^]*?\*\/)/uy
            },
            {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].LINE_COMMENT,
                regex: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$regexFactory$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lineComment"]((_a = cfg.lineCommentTypes) !== null && _a !== void 0 ? _a : [
                    '--'
                ])
            },
            {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].QUOTED_IDENTIFIER,
                regex: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$regexFactory$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"](cfg.identTypes)
            },
            {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].NUMBER,
                regex: cfg.underscoresInNumbers ? /(?:0x[0-9a-fA-F_]+|0b[01_]+|(?:-\s*)?(?:[0-9_]*\.[0-9_]+|[0-9_]+(?:\.[0-9_]*)?)(?:[eE][-+]?[0-9_]+(?:\.[0-9_]+)?)?)(?![\w\p{Alphabetic}])/uy : /(?:0x[0-9a-fA-F]+|0b[01]+|(?:-\s*)?(?:[0-9]*\.[0-9]+|[0-9]+(?:\.[0-9]*)?)(?:[eE][-+]?[0-9]+(?:\.[0-9]+)?)?)(?![\w\p{Alphabetic}])/uy
            },
            // RESERVED_KEYWORD_PHRASE and RESERVED_DATA_TYPE_PHRASE  is matched before all other keyword tokens
            // to e.g. prioritize matching "TIMESTAMP WITH TIME ZONE" phrase over "WITH" clause.
            {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].RESERVED_KEYWORD_PHRASE,
                regex: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$regexFactory$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["reservedWord"]((_b = cfg.reservedKeywordPhrases) !== null && _b !== void 0 ? _b : [], cfg.identChars),
                text: toCanonical
            },
            {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].RESERVED_DATA_TYPE_PHRASE,
                regex: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$regexFactory$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["reservedWord"]((_c = cfg.reservedDataTypePhrases) !== null && _c !== void 0 ? _c : [], cfg.identChars),
                text: toCanonical
            },
            {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CASE,
                regex: /CASE\b/iuy,
                text: toCanonical
            },
            {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].END,
                regex: /END\b/iuy,
                text: toCanonical
            },
            {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].BETWEEN,
                regex: /BETWEEN\b/iuy,
                text: toCanonical
            },
            {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].LIMIT,
                regex: cfg.reservedClauses.includes('LIMIT') ? /LIMIT\b/iuy : undefined,
                text: toCanonical
            },
            {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].RESERVED_CLAUSE,
                regex: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$regexFactory$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["reservedWord"](cfg.reservedClauses, cfg.identChars),
                text: toCanonical
            },
            {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].RESERVED_SELECT,
                regex: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$regexFactory$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["reservedWord"](cfg.reservedSelect, cfg.identChars),
                text: toCanonical
            },
            {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].RESERVED_SET_OPERATION,
                regex: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$regexFactory$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["reservedWord"](cfg.reservedSetOperations, cfg.identChars),
                text: toCanonical
            },
            {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].WHEN,
                regex: /WHEN\b/iuy,
                text: toCanonical
            },
            {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ELSE,
                regex: /ELSE\b/iuy,
                text: toCanonical
            },
            {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].THEN,
                regex: /THEN\b/iuy,
                text: toCanonical
            },
            {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].RESERVED_JOIN,
                regex: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$regexFactory$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["reservedWord"](cfg.reservedJoins, cfg.identChars),
                text: toCanonical
            },
            {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].AND,
                regex: /AND\b/iuy,
                text: toCanonical
            },
            {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].OR,
                regex: /OR\b/iuy,
                text: toCanonical
            },
            {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].XOR,
                regex: cfg.supportsXor ? /XOR\b/iuy : undefined,
                text: toCanonical
            },
            ...cfg.operatorKeyword ? [
                {
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].OPERATOR,
                    regex: /OPERATOR *\([^)]+\)/iuy
                }
            ] : [],
            {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].RESERVED_FUNCTION_NAME,
                regex: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$regexFactory$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["reservedWord"](cfg.reservedFunctionNames, cfg.identChars),
                text: toCanonical
            },
            {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].RESERVED_DATA_TYPE,
                regex: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$regexFactory$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["reservedWord"](cfg.reservedDataTypes, cfg.identChars),
                text: toCanonical
            },
            {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].RESERVED_KEYWORD,
                regex: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$regexFactory$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["reservedWord"](cfg.reservedKeywords, cfg.identChars),
                text: toCanonical
            }
        ]);
    }
    // These rules can also be cached as they only depend on
    // the Tokenizer config options specified for each SQL dialect
    buildRulesAfterParams(cfg) {
        var _a, _b;
        return this.validRules([
            {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].VARIABLE,
                regex: cfg.variableTypes ? __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$regexFactory$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["variable"](cfg.variableTypes) : undefined
            },
            {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].STRING,
                regex: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$regexFactory$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"](cfg.stringTypes)
            },
            {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].IDENTIFIER,
                regex: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$regexFactory$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["identifier"](cfg.identChars)
            },
            {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].DELIMITER,
                regex: /[;]/uy
            },
            {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].COMMA,
                regex: /[,]/y
            },
            {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].OPEN_PAREN,
                regex: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$regexFactory$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parenthesis"]('open', cfg.extraParens)
            },
            {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CLOSE_PAREN,
                regex: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$regexFactory$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parenthesis"]('close', cfg.extraParens)
            },
            {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].OPERATOR,
                regex: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$regexFactory$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["operator"]([
                    // standard operators
                    '+',
                    '-',
                    '/',
                    '>',
                    '<',
                    '=',
                    '<>',
                    '<=',
                    '>=',
                    '!=',
                    ...(_a = cfg.operators) !== null && _a !== void 0 ? _a : []
                ])
            },
            {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ASTERISK,
                regex: /[*]/uy
            },
            {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].PROPERTY_ACCESS_OPERATOR,
                regex: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$regexFactory$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["operator"]([
                    '.',
                    ...(_b = cfg.propertyAccessOperators) !== null && _b !== void 0 ? _b : []
                ])
            }
        ]);
    }
    // These rules can't be blindly cached as the paramTypesOverrides object
    // can differ on each invocation of the format() function.
    buildParamRules(cfg, paramTypesOverrides) {
        var _a, _b, _c, _d, _e;
        // Each dialect has its own default parameter types (if any),
        // but these can be overriden by the user of the library.
        const paramTypes = {
            named: (paramTypesOverrides === null || paramTypesOverrides === void 0 ? void 0 : paramTypesOverrides.named) || ((_a = cfg.paramTypes) === null || _a === void 0 ? void 0 : _a.named) || [],
            quoted: (paramTypesOverrides === null || paramTypesOverrides === void 0 ? void 0 : paramTypesOverrides.quoted) || ((_b = cfg.paramTypes) === null || _b === void 0 ? void 0 : _b.quoted) || [],
            numbered: (paramTypesOverrides === null || paramTypesOverrides === void 0 ? void 0 : paramTypesOverrides.numbered) || ((_c = cfg.paramTypes) === null || _c === void 0 ? void 0 : _c.numbered) || [],
            positional: typeof (paramTypesOverrides === null || paramTypesOverrides === void 0 ? void 0 : paramTypesOverrides.positional) === 'boolean' ? paramTypesOverrides.positional : (_d = cfg.paramTypes) === null || _d === void 0 ? void 0 : _d.positional,
            custom: (paramTypesOverrides === null || paramTypesOverrides === void 0 ? void 0 : paramTypesOverrides.custom) || ((_e = cfg.paramTypes) === null || _e === void 0 ? void 0 : _e.custom) || []
        };
        return this.validRules([
            {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].NAMED_PARAMETER,
                regex: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$regexFactory$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parameter"](paramTypes.named, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$regexFactory$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["identifierPattern"](cfg.paramChars || cfg.identChars)),
                key: (v)=>v.slice(1)
            },
            {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].QUOTED_PARAMETER,
                regex: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$regexFactory$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parameter"](paramTypes.quoted, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$regexFactory$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringPattern"](cfg.identTypes)),
                key: (v)=>(({ tokenKey, quoteChar })=>tokenKey.replace(new RegExp((0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$regexUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["escapeRegExp"])('\\' + quoteChar), 'gu'), quoteChar))({
                        tokenKey: v.slice(2, -1),
                        quoteChar: v.slice(-1)
                    })
            },
            {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].NUMBERED_PARAMETER,
                regex: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$regexFactory$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parameter"](paramTypes.numbered, '[0-9]+'),
                key: (v)=>v.slice(1)
            },
            {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].POSITIONAL_PARAMETER,
                regex: paramTypes.positional ? /[?]/y : undefined
            },
            ...paramTypes.custom.map((customParam)=>{
                var _a;
                return {
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CUSTOM_PARAMETER,
                    regex: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$regexUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["patternToRegex"])(customParam.regex),
                    key: (_a = customParam.key) !== null && _a !== void 0 ? _a : (v)=>v
                };
            })
        ]);
    }
    // filters out rules for token types whose regex is undefined
    validRules(rules) {
        return rules.filter((rule)=>Boolean(rule.regex));
    }
}
/**
 * Converts keywords (and keyword sequences) to canonical form:
 * - in uppercase
 * - single spaces between words
 */ const toCanonical = (v)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["equalizeWhitespace"])(v.toUpperCase());
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/lexer/TokenizerEngine.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TokenizerEngine
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$lineColFromIndex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/lexer/lineColFromIndex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$regexUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/lexer/regexUtil.js [app-client] (ecmascript)");
;
;
class TokenizerEngine {
    constructor(rules, dialectName){
        this.rules = rules;
        this.dialectName = dialectName;
        this.input = ''; // The input SQL string to process
        this.index = 0; // Current position in string
    }
    /**
     * Takes a SQL string and breaks it into tokens.
     * Each token is an object with type and value.
     *
     * @param {string} input - The SQL string
     * @returns {Token[]} output token stream
     */ tokenize(input) {
        this.input = input;
        this.index = 0;
        const tokens = [];
        let token;
        // Keep processing the string until end is reached
        while(this.index < this.input.length){
            // skip any preceding whitespace
            const precedingWhitespace = this.getWhitespace();
            if (this.index < this.input.length) {
                // Get the next token and the token type
                token = this.getNextToken();
                if (!token) {
                    throw this.createParseError();
                }
                tokens.push(Object.assign(Object.assign({}, token), {
                    precedingWhitespace
                }));
            }
        }
        return tokens;
    }
    createParseError() {
        const text = this.input.slice(this.index, this.index + 10);
        const { line, col } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$lineColFromIndex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lineColFromIndex"])(this.input, this.index);
        return new Error(`Parse error: Unexpected "${text}" at line ${line} column ${col}.\n${this.dialectInfo()}`);
    }
    dialectInfo() {
        if (this.dialectName === 'sql') {
            return `This likely happens because you're using the default "sql" dialect.\n` + `If possible, please select a more specific dialect (like sqlite, postgresql, etc).`;
        } else {
            return `SQL dialect used: "${this.dialectName}".`;
        }
    }
    getWhitespace() {
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$regexUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WHITESPACE_REGEX"].lastIndex = this.index;
        const matches = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$regexUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WHITESPACE_REGEX"].exec(this.input);
        if (matches) {
            // Advance current position by matched whitespace length
            this.index += matches[0].length;
            return matches[0];
        }
        return undefined;
    }
    getNextToken() {
        for (const rule of this.rules){
            const token = this.match(rule);
            if (token) {
                return token;
            }
        }
        return undefined;
    }
    // Attempts to match token rule regex at current position in input
    match(rule) {
        rule.regex.lastIndex = this.index;
        const matches = rule.regex.exec(this.input);
        if (matches) {
            const matchedText = matches[0];
            const token = {
                type: rule.type,
                raw: matchedText,
                text: rule.text ? rule.text(matchedText) : matchedText,
                start: this.index
            };
            if (rule.key) {
                token.key = rule.key(matchedText);
            }
            // Advance current position by matched token length
            this.index += matchedText.length;
            return token;
        }
        return undefined;
    }
}
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/lexer/disambiguateTokens.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "disambiguateTokens",
    ()=>disambiguateTokens
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/lexer/token.js [app-client] (ecmascript)");
;
function disambiguateTokens(tokens) {
    return tokens.map(propertyNameKeywordToIdent).map(keywordAliasAfterAs).map(funcNameToIdent).map(dataTypeToParameterizedDataType).map(identToArrayIdent).map(dataTypeToArrayKeyword);
}
const propertyNameKeywordToIdent = (token, i, tokens)=>{
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isReserved"])(token.type)) {
        const prevToken = prevNonCommentToken(tokens, i);
        if (prevToken && prevToken.type === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].PROPERTY_ACCESS_OPERATOR) {
            return Object.assign(Object.assign({}, token), {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].IDENTIFIER,
                text: token.raw
            });
        }
        const nextToken = nextNonCommentToken(tokens, i);
        if (nextToken && nextToken.type === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].PROPERTY_ACCESS_OPERATOR) {
            return Object.assign(Object.assign({}, token), {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].IDENTIFIER,
                text: token.raw
            });
        }
    }
    return token;
};
/**
 * Some dialects allow reserved words as aliases, as in `SELECT id AS set FROM tbl`.
 * Such a word is tokenized as a RESERVED_* token, which the parser then treats as
 * the start of a clause. Directly after AS it can only be an alias name, so we
 * convert it to IDENTIFIER.
 *
 * Only the token types that cannot legitimately follow AS are converted, leaving
 * `CREATE TABLE t AS SELECT ...` and `PREPARE foo AS UPDATE ...` working.
 */ const keywordAliasAfterAs = (token, i, tokens)=>{
    if (canBeAliasAfterAs(token)) {
        const prevToken = prevNonCommentToken(tokens, i);
        if (prevToken && isAsKeyword(prevToken)) {
            return Object.assign(Object.assign({}, token), {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].IDENTIFIER,
                text: token.raw
            });
        }
    }
    return token;
};
const isAsKeyword = (token)=>token.type === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].RESERVED_KEYWORD && token.text === 'AS';
const canBeAliasAfterAs = (token)=>token.type === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].RESERVED_SET_OPERATION || token.type === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].RESERVED_JOIN || token.type === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].LIMIT || token.type === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].BETWEEN || token.type === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].CASE || token.type === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].END || token.type === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].WHEN || token.type === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ELSE || token.type === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].THEN || token.type === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].AND || token.type === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].OR || token.type === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].XOR || token.type === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].RESERVED_CLAUSE && token.text === 'SET';
const funcNameToIdent = (token, i, tokens)=>{
    if (token.type === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].RESERVED_FUNCTION_NAME) {
        const nextToken = nextNonCommentToken(tokens, i);
        if (!nextToken || !isOpenParen(nextToken)) {
            return Object.assign(Object.assign({}, token), {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].IDENTIFIER,
                text: token.raw
            });
        }
    }
    return token;
};
const dataTypeToParameterizedDataType = (token, i, tokens)=>{
    if (token.type === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].RESERVED_DATA_TYPE) {
        const nextToken = nextNonCommentToken(tokens, i);
        if (nextToken && isOpenParen(nextToken)) {
            return Object.assign(Object.assign({}, token), {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].RESERVED_PARAMETERIZED_DATA_TYPE
            });
        }
    }
    return token;
};
const identToArrayIdent = (token, i, tokens)=>{
    if (token.type === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].IDENTIFIER) {
        const nextToken = nextNonCommentToken(tokens, i);
        if (nextToken && isOpenBracket(nextToken)) {
            return Object.assign(Object.assign({}, token), {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ARRAY_IDENTIFIER
            });
        }
    }
    return token;
};
const dataTypeToArrayKeyword = (token, i, tokens)=>{
    if (token.type === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].RESERVED_DATA_TYPE) {
        const nextToken = nextNonCommentToken(tokens, i);
        if (nextToken && isOpenBracket(nextToken)) {
            return Object.assign(Object.assign({}, token), {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].ARRAY_KEYWORD
            });
        }
    }
    return token;
};
const prevNonCommentToken = (tokens, index)=>nextNonCommentToken(tokens, index, -1);
const nextNonCommentToken = (tokens, index, dir = 1)=>{
    let i = 1;
    while(tokens[index + i * dir] && isComment(tokens[index + i * dir])){
        i++;
    }
    return tokens[index + i * dir];
};
const isOpenParen = (t)=>t.type === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].OPEN_PAREN && t.text === '(';
const isOpenBracket = (t)=>t.type === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].OPEN_PAREN && t.text === '[';
const isComment = (t)=>t.type === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].BLOCK_COMMENT || t.type === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].LINE_COMMENT;
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/lexer/lineColFromIndex.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Determines line and column number of character index in source code.
 */ __turbopack_context__.s([
    "lineColFromIndex",
    ()=>lineColFromIndex
]);
function lineColFromIndex(source, index) {
    const lines = source.slice(0, index).split(/\n/);
    return {
        line: lines.length,
        col: lines[lines.length - 1].length + 1
    };
}
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/lexer/regexFactory.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "identifier",
    ()=>identifier,
    "identifierPattern",
    ()=>identifierPattern,
    "lineComment",
    ()=>lineComment,
    "operator",
    ()=>operator,
    "parameter",
    ()=>parameter,
    "parenthesis",
    ()=>parenthesis,
    "quotePatterns",
    ()=>quotePatterns,
    "reservedWord",
    ()=>reservedWord,
    "string",
    ()=>string,
    "stringPattern",
    ()=>stringPattern,
    "variable",
    ()=>variable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$regexUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/lexer/regexUtil.js [app-client] (ecmascript)");
;
;
const lineComment = (lineCommentTypes)=>new RegExp(`(?:${lineCommentTypes.map(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$regexUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["escapeRegExp"]).join('|')}).*?(?=\r\n|\r|\n|$)`, 'uy');
const parenthesis = (kind, extraParens = [])=>{
    const index = kind === 'open' ? 0 : 1;
    const parens = [
        '()',
        ...extraParens
    ].map((pair)=>pair[index]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$regexUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["patternToRegex"])(parens.map(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$regexUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["escapeRegExp"]).join('|'));
};
const operator = (operators)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$regexUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["patternToRegex"])(`${(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sortByLengthDesc"])(operators).map(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$regexUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["escapeRegExp"]).join('|')}`);
// Negative lookahead to avoid matching a keyword that's actually part of identifier,
// which can happen when identifier allows word-boundary characters inside it.
//
// For example "SELECT$ME" should be tokenized as:
// - ["SELECT$ME"] when $ is allowed inside identifiers
// - ["SELECT", "$", "ME"] when $ can't be part of identifiers.
const rejectIdentCharsPattern = ({ rest, dashes })=>rest || dashes ? `(?![${rest || ''}${dashes ? '-' : ''}])` : '';
const reservedWord = (reservedKeywords, identChars = {})=>{
    if (reservedKeywords.length === 0) {
        return /^\b$/u;
    }
    const avoidIdentChars = rejectIdentCharsPattern(identChars);
    const reservedKeywordsPattern = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sortByLengthDesc"])(reservedKeywords).map(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$regexUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["escapeRegExp"]).join('|').replace(/ /gu, '\\s+');
    return new RegExp(`(?:${reservedKeywordsPattern})${avoidIdentChars}\\b`, 'iuy');
};
const parameter = (paramTypes, pattern)=>{
    if (!paramTypes.length) {
        return undefined;
    }
    const typesRegex = paramTypes.map(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$regexUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["escapeRegExp"]).join('|');
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$regexUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["patternToRegex"])(`(?:${typesRegex})(?:${pattern})`);
};
const buildQStringPatterns = ()=>{
    const specialDelimiterMap = {
        '<': '>',
        '[': ']',
        '(': ')',
        '{': '}'
    };
    // base pattern for special delimiters, left must correspond with right
    const singlePattern = "{left}(?:(?!{right}').)*?{right}";
    // replace {left} and {right} with delimiters, collect as array
    const patternList = Object.entries(specialDelimiterMap).map(([left, right])=>singlePattern.replace(/{left}/g, (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$regexUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["escapeRegExp"])(left)).replace(/{right}/g, (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$regexUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["escapeRegExp"])(right)));
    const specialDelimiters = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$regexUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["escapeRegExp"])(Object.keys(specialDelimiterMap).join(''));
    // standard pattern for common delimiters, ignores special delimiters
    const standardDelimiterPattern = String.raw`(?<tag>[^\s${specialDelimiters}])(?:(?!\k<tag>').)*?\k<tag>`;
    // constructs final pattern by joining all cases
    const qStringPattern = `[Qq]'(?:${standardDelimiterPattern}|${patternList.join('|')})'`;
    return qStringPattern;
};
const quotePatterns = {
    // - backtick quoted (using `` to escape)
    '``': '(?:`[^`]*`)+',
    // - Transact-SQL square bracket quoted (using ]] to escape)
    '[]': String.raw`(?:\[[^\]]*\])(?:\][^\]]*\])*`,
    // double-quoted
    '""-qq': String.raw`(?:"[^"]*")+`,
    '""-bs': String.raw`(?:"[^"\\]*(?:\\.[^"\\]*)*")`,
    '""-qq-bs': String.raw`(?:"[^"\\]*(?:\\.[^"\\]*)*")+`,
    '""-raw': String.raw`(?:"[^"]*")`,
    // single-quoted
    "''-qq": String.raw`(?:'[^']*')+`,
    "''-bs": String.raw`(?:'[^'\\]*(?:\\.[^'\\]*)*')`,
    "''-qq-bs": String.raw`(?:'[^'\\]*(?:\\.[^'\\]*)*')+`,
    "''-raw": String.raw`(?:'[^']*')`,
    // PostgreSQL dollar-quoted
    '$$': String.raw`(?<tag>\$\w*\$)[\s\S]*?\k<tag>`,
    // BigQuery '''triple-quoted''' (using \' to escape)
    "'''..'''": String.raw`'''[^\\]*?(?:\\.[^\\]*?)*?'''`,
    // BigQuery """triple-quoted""" (using \" to escape)
    '""".."""': String.raw`"""[^\\]*?(?:\\.[^\\]*?)*?"""`,
    // Hive and Spark variables: ${name}
    '{}': String.raw`(?:\{[^\}]*\})`,
    // Oracle q'' strings: q'<text>' q'|text|' ...
    "q''": buildQStringPatterns()
};
const singleQuotePattern = (quoteTypes)=>{
    if (typeof quoteTypes === 'string') {
        return quotePatterns[quoteTypes];
    } else if ('regex' in quoteTypes) {
        return quoteTypes.regex;
    } else {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$regexUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["prefixesPattern"])(quoteTypes) + quotePatterns[quoteTypes.quote];
    }
};
const variable = (varTypes)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$regexUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["patternToRegex"])(varTypes.map((varType)=>'regex' in varType ? varType.regex : singleQuotePattern(varType)).join('|'));
const stringPattern = (quoteTypes)=>quoteTypes.map(singleQuotePattern).join('|');
const string = (quoteTypes)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$regexUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["patternToRegex"])(stringPattern(quoteTypes));
const identifier = (specialChars = {})=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$regexUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["patternToRegex"])(identifierPattern(specialChars));
const identifierPattern = ({ first, rest, dashes, allowFirstCharNumber } = {})=>{
    // Unicode letters, diacritical marks and underscore
    const letter = '\\p{Alphabetic}\\p{Mark}_';
    // Numbers 0..9, plus various unicode numbers
    const number = '\\p{Decimal_Number}';
    const firstChars = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$regexUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["escapeRegExp"])(first !== null && first !== void 0 ? first : '');
    const restChars = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$regexUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["escapeRegExp"])(rest !== null && rest !== void 0 ? rest : '');
    const pattern = allowFirstCharNumber ? `[${letter}${number}${firstChars}][${letter}${number}${restChars}]*` : `[${letter}${firstChars}][${letter}${number}${restChars}]*`;
    return dashes ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$regexUtil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withDashes"])(pattern) : pattern;
};
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/lexer/regexUtil.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Escapes regex special chars
__turbopack_context__.s([
    "WHITESPACE_REGEX",
    ()=>WHITESPACE_REGEX,
    "escapeRegExp",
    ()=>escapeRegExp,
    "patternToRegex",
    ()=>patternToRegex,
    "prefixesPattern",
    ()=>prefixesPattern,
    "toCaseInsensitivePattern",
    ()=>toCaseInsensitivePattern,
    "withDashes",
    ()=>withDashes
]);
const escapeRegExp = (string)=>string.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
const WHITESPACE_REGEX = /\s+/uy;
const patternToRegex = (pattern)=>new RegExp(`(?:${pattern})`, 'uy');
const toCaseInsensitivePattern = (prefix)=>prefix.split('').map((char)=>/ /gu.test(char) ? '\\s+' : `[${char.toUpperCase()}${char.toLowerCase()}]`).join('');
const withDashes = (pattern)=>pattern + '(?:-' + pattern + ')*';
const prefixesPattern = ({ prefixes, requirePrefix })=>`(?:${prefixes.map(toCaseInsensitivePattern).join('|')}${requirePrefix ? '' : '|'})`;
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/lexer/token.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** Token type enum for all possible Token categories */ __turbopack_context__.s([
    "EOF_TOKEN",
    ()=>EOF_TOKEN,
    "TokenType",
    ()=>TokenType,
    "createEofToken",
    ()=>createEofToken,
    "isLogicalOperator",
    ()=>isLogicalOperator,
    "isReserved",
    ()=>isReserved,
    "isToken",
    ()=>isToken,
    "testToken",
    ()=>testToken
]);
var TokenType;
(function(TokenType) {
    TokenType["QUOTED_IDENTIFIER"] = "QUOTED_IDENTIFIER";
    TokenType["IDENTIFIER"] = "IDENTIFIER";
    TokenType["STRING"] = "STRING";
    TokenType["VARIABLE"] = "VARIABLE";
    TokenType["RESERVED_DATA_TYPE"] = "RESERVED_DATA_TYPE";
    TokenType["RESERVED_PARAMETERIZED_DATA_TYPE"] = "RESERVED_PARAMETERIZED_DATA_TYPE";
    TokenType["RESERVED_KEYWORD"] = "RESERVED_KEYWORD";
    TokenType["RESERVED_FUNCTION_NAME"] = "RESERVED_FUNCTION_NAME";
    TokenType["RESERVED_KEYWORD_PHRASE"] = "RESERVED_KEYWORD_PHRASE";
    TokenType["RESERVED_DATA_TYPE_PHRASE"] = "RESERVED_DATA_TYPE_PHRASE";
    TokenType["RESERVED_SET_OPERATION"] = "RESERVED_SET_OPERATION";
    TokenType["RESERVED_CLAUSE"] = "RESERVED_CLAUSE";
    TokenType["RESERVED_SELECT"] = "RESERVED_SELECT";
    TokenType["RESERVED_JOIN"] = "RESERVED_JOIN";
    TokenType["ARRAY_IDENTIFIER"] = "ARRAY_IDENTIFIER";
    TokenType["ARRAY_KEYWORD"] = "ARRAY_KEYWORD";
    TokenType["CASE"] = "CASE";
    TokenType["END"] = "END";
    TokenType["WHEN"] = "WHEN";
    TokenType["ELSE"] = "ELSE";
    TokenType["THEN"] = "THEN";
    TokenType["LIMIT"] = "LIMIT";
    TokenType["BETWEEN"] = "BETWEEN";
    TokenType["AND"] = "AND";
    TokenType["OR"] = "OR";
    TokenType["XOR"] = "XOR";
    TokenType["OPERATOR"] = "OPERATOR";
    TokenType["COMMA"] = "COMMA";
    TokenType["ASTERISK"] = "ASTERISK";
    TokenType["PROPERTY_ACCESS_OPERATOR"] = "PROPERTY_ACCESS_OPERATOR";
    TokenType["OPEN_PAREN"] = "OPEN_PAREN";
    TokenType["CLOSE_PAREN"] = "CLOSE_PAREN";
    TokenType["LINE_COMMENT"] = "LINE_COMMENT";
    TokenType["BLOCK_COMMENT"] = "BLOCK_COMMENT";
    // Text between /* sql-formatter-disable */ and /* sql-formatter-enable */
    TokenType["DISABLE_COMMENT"] = "DISABLE_COMMENT";
    TokenType["NUMBER"] = "NUMBER";
    TokenType["NAMED_PARAMETER"] = "NAMED_PARAMETER";
    TokenType["QUOTED_PARAMETER"] = "QUOTED_PARAMETER";
    TokenType["NUMBERED_PARAMETER"] = "NUMBERED_PARAMETER";
    TokenType["POSITIONAL_PARAMETER"] = "POSITIONAL_PARAMETER";
    TokenType["CUSTOM_PARAMETER"] = "CUSTOM_PARAMETER";
    TokenType["DELIMITER"] = "DELIMITER";
    TokenType["EOF"] = "EOF";
})(TokenType = TokenType || (TokenType = {}));
const createEofToken = (index)=>({
        type: TokenType.EOF,
        raw: '«EOF»',
        text: '«EOF»',
        start: index
    });
const EOF_TOKEN = createEofToken(Infinity);
const testToken = (compareToken)=>(token)=>token.type === compareToken.type && token.text === compareToken.text;
const isToken = {
    ARRAY: testToken({
        text: 'ARRAY',
        type: TokenType.RESERVED_DATA_TYPE
    }),
    BY: testToken({
        text: 'BY',
        type: TokenType.RESERVED_KEYWORD
    }),
    SET: testToken({
        text: 'SET',
        type: TokenType.RESERVED_CLAUSE
    }),
    STRUCT: testToken({
        text: 'STRUCT',
        type: TokenType.RESERVED_DATA_TYPE
    }),
    WINDOW: testToken({
        text: 'WINDOW',
        type: TokenType.RESERVED_CLAUSE
    }),
    VALUES: testToken({
        text: 'VALUES',
        type: TokenType.RESERVED_CLAUSE
    })
};
const isReserved = (type)=>type === TokenType.RESERVED_DATA_TYPE || type === TokenType.RESERVED_KEYWORD || type === TokenType.RESERVED_FUNCTION_NAME || type === TokenType.RESERVED_KEYWORD_PHRASE || type === TokenType.RESERVED_DATA_TYPE_PHRASE || type === TokenType.RESERVED_CLAUSE || type === TokenType.RESERVED_SELECT || type === TokenType.RESERVED_SET_OPERATION || type === TokenType.RESERVED_JOIN || type === TokenType.ARRAY_KEYWORD || type === TokenType.CASE || type === TokenType.END || type === TokenType.WHEN || type === TokenType.ELSE || type === TokenType.THEN || type === TokenType.LIMIT || type === TokenType.BETWEEN || type === TokenType.AND || type === TokenType.OR || type === TokenType.XOR;
const isLogicalOperator = (type)=>type === TokenType.AND || type === TokenType.OR || type === TokenType.XOR;
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/parser/LexerAdapter.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LexerAdapter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$lineColFromIndex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/lexer/lineColFromIndex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/lexer/token.js [app-client] (ecmascript)");
;
;
class LexerAdapter {
    constructor(tokenize){
        this.tokenize = tokenize;
        this.index = 0;
        this.tokens = [];
        this.input = '';
    }
    reset(chunk, _info) {
        this.input = chunk;
        this.index = 0;
        this.tokens = this.tokenize(chunk);
    }
    next() {
        return this.tokens[this.index++];
    }
    save() {}
    formatError(token) {
        const { line, col } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$lineColFromIndex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lineColFromIndex"])(this.input, token.start);
        return `Parse error at token: ${token.text} at line ${line} column ${col}`;
    }
    has(name) {
        return name in __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"];
    }
}
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/parser/ast.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NodeType",
    ()=>NodeType
]);
var NodeType;
(function(NodeType) {
    NodeType["statement"] = "statement";
    NodeType["clause"] = "clause";
    NodeType["set_operation"] = "set_operation";
    NodeType["function_call"] = "function_call";
    NodeType["parameterized_data_type"] = "parameterized_data_type";
    NodeType["array_subscript"] = "array_subscript";
    NodeType["property_access"] = "property_access";
    NodeType["parenthesis"] = "parenthesis";
    NodeType["between_predicate"] = "between_predicate";
    NodeType["case_expression"] = "case_expression";
    NodeType["case_when"] = "case_when";
    NodeType["case_else"] = "case_else";
    NodeType["limit_clause"] = "limit_clause";
    NodeType["all_columns_asterisk"] = "all_columns_asterisk";
    NodeType["literal"] = "literal";
    NodeType["identifier"] = "identifier";
    NodeType["keyword"] = "keyword";
    NodeType["data_type"] = "data_type";
    NodeType["parameter"] = "parameter";
    NodeType["operator"] = "operator";
    NodeType["comma"] = "comma";
    NodeType["line_comment"] = "line_comment";
    NodeType["block_comment"] = "block_comment";
    NodeType["disable_comment"] = "disable_comment";
})(NodeType = NodeType || (NodeType = {}));
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/parser/createParser.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createParser",
    ()=>createParser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$nearley$2f$lib$2f$nearley$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/nearley/lib/nearley.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$disambiguateTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/lexer/disambiguateTokens.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$grammar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/parser/grammar.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$LexerAdapter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/parser/LexerAdapter.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/lexer/token.js [app-client] (ecmascript)");
;
;
;
;
;
const { Parser: NearleyParser, Grammar } = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$nearley$2f$lib$2f$nearley$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"];
function createParser(tokenizer) {
    let paramTypesOverrides = {};
    const lexer = new __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$LexerAdapter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]((chunk)=>[
            ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$disambiguateTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["disambiguateTokens"])(tokenizer.tokenize(chunk, paramTypesOverrides)),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createEofToken"])(chunk.length)
        ]);
    const parser = new NearleyParser(Grammar.fromCompiled(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$grammar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]), {
        lexer
    });
    return {
        parse: (sql, paramTypes)=>{
            // share paramTypesOverrides with Tokenizer
            paramTypesOverrides = paramTypes;
            const { results } = parser.feed(sql);
            if (results.length === 1) {
                return results[0];
            } else if (results.length === 0) {
                // Ideally we would report a line number where the parser failed,
                // but I haven't found a way to get this info from Nearley :(
                throw new Error('Parse error: Invalid SQL');
            } else {
                throw new Error(`Parse error: Ambiguous grammar\n${JSON.stringify(results, undefined, 2)}`);
            }
        }
    };
}
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/parser/grammar.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$LexerAdapter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/parser/LexerAdapter.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$ast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/parser/ast.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/lexer/token.js [app-client] (ecmascript)");
// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
function id(d) {
    return d[0];
}
;
;
;
// The lexer here is only to provide the has() method,
// that's used inside the generated grammar definition.
// A proper lexer gets passed to Nearley Parser constructor.
const lexer = new __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$LexerAdapter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]((chunk)=>[]);
// Used for unwrapping grammar rules like:
//
//   rule -> ( foo | bar | baz )
//
// which otherwise produce single element nested inside two arrays
const unwrap = ([[el]])=>el;
const toKeywordNode = (token)=>({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$ast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].keyword,
        tokenType: token.type,
        text: token.text,
        raw: token.raw
    });
const toDataTypeNode = (token)=>({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$ast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].data_type,
        text: token.text,
        raw: token.raw
    });
const materializeExpressionList = (expressions)=>{
    const result = [];
    for(let current = expressions; current; current = current.previous){
        result.push(current.value);
    }
    result.reverse();
    return result;
};
const addComments = (node, { leading, trailing })=>{
    if (leading === null || leading === void 0 ? void 0 : leading.length) {
        node = Object.assign(Object.assign({}, node), {
            leadingComments: leading
        });
    }
    if (trailing === null || trailing === void 0 ? void 0 : trailing.length) {
        node = Object.assign(Object.assign({}, node), {
            trailingComments: trailing
        });
    }
    return node;
};
const addCommentsToArray = (nodes, { leading, trailing })=>{
    if (leading === null || leading === void 0 ? void 0 : leading.length) {
        const [first, ...rest] = nodes;
        nodes = [
            addComments(first, {
                leading
            }),
            ...rest
        ];
    }
    if (trailing === null || trailing === void 0 ? void 0 : trailing.length) {
        const lead = nodes.slice(0, -1);
        const last = nodes[nodes.length - 1];
        nodes = [
            ...lead,
            addComments(last, {
                trailing
            })
        ];
    }
    return nodes;
};
;
;
;
;
const grammar = {
    Lexer: lexer,
    ParserRules: [
        {
            "name": "main$ebnf$1",
            "symbols": []
        },
        {
            "name": "main$ebnf$1",
            "symbols": [
                "main$ebnf$1",
                "statement"
            ],
            "postprocess": (d)=>d[0].concat([
                    d[1]
                ])
        },
        {
            "name": "main",
            "symbols": [
                "main$ebnf$1"
            ],
            "postprocess": ([statements])=>{
                const last = statements[statements.length - 1];
                if (last && !last.hasSemicolon) {
                    // we have fully parsed the whole file
                    // discard the last statement when it's empty
                    return last.children.length > 0 ? statements : statements.slice(0, -1);
                } else {
                    // parsing still in progress, do nothing
                    return statements;
                }
            }
        },
        {
            "name": "statement$subexpression$1",
            "symbols": [
                lexer.has("DELIMITER") ? {
                    type: "DELIMITER"
                } : DELIMITER
            ]
        },
        {
            "name": "statement$subexpression$1",
            "symbols": [
                lexer.has("EOF") ? {
                    type: "EOF"
                } : EOF
            ]
        },
        {
            "name": "statement",
            "symbols": [
                "expressions_or_clauses",
                "statement$subexpression$1"
            ],
            "postprocess": ([children, [delimiter]])=>({
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$ast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].statement,
                    children: materializeExpressionList(children),
                    hasSemicolon: delimiter.type === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$lexer$2f$token$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenType"].DELIMITER
                })
        },
        {
            "name": "expressions_or_clauses",
            "symbols": [
                "expression_list"
            ],
            "postprocess": id
        },
        {
            "name": "expressions_or_clauses",
            "symbols": [
                "expressions_or_clauses",
                "clause"
            ],
            "postprocess": ([previous, value])=>({
                    previous,
                    value
                })
        },
        {
            "name": "expression_list",
            "symbols": [],
            "postprocess": ()=>undefined
        },
        {
            "name": "expression_list",
            "symbols": [
                "expression_list",
                "free_form_sql"
            ],
            "postprocess": ([previous, value])=>({
                    previous,
                    value
                })
        },
        {
            "name": "clause$subexpression$1",
            "symbols": [
                "limit_clause"
            ]
        },
        {
            "name": "clause$subexpression$1",
            "symbols": [
                "select_clause"
            ]
        },
        {
            "name": "clause$subexpression$1",
            "symbols": [
                "other_clause"
            ]
        },
        {
            "name": "clause$subexpression$1",
            "symbols": [
                "set_operation"
            ]
        },
        {
            "name": "clause",
            "symbols": [
                "clause$subexpression$1"
            ],
            "postprocess": unwrap
        },
        {
            "name": "limit_clause$ebnf$1$subexpression$1$ebnf$1",
            "symbols": [
                "free_form_sql"
            ]
        },
        {
            "name": "limit_clause$ebnf$1$subexpression$1$ebnf$1",
            "symbols": [
                "limit_clause$ebnf$1$subexpression$1$ebnf$1",
                "free_form_sql"
            ],
            "postprocess": (d)=>d[0].concat([
                    d[1]
                ])
        },
        {
            "name": "limit_clause$ebnf$1$subexpression$1",
            "symbols": [
                lexer.has("COMMA") ? {
                    type: "COMMA"
                } : COMMA,
                "limit_clause$ebnf$1$subexpression$1$ebnf$1"
            ]
        },
        {
            "name": "limit_clause$ebnf$1",
            "symbols": [
                "limit_clause$ebnf$1$subexpression$1"
            ],
            "postprocess": id
        },
        {
            "name": "limit_clause$ebnf$1",
            "symbols": [],
            "postprocess": ()=>null
        },
        {
            "name": "limit_clause",
            "symbols": [
                lexer.has("LIMIT") ? {
                    type: "LIMIT"
                } : LIMIT,
                "_",
                "expression_chain_",
                "limit_clause$ebnf$1"
            ],
            "postprocess": ([limitToken, _, exp1, optional])=>{
                if (optional) {
                    const [comma, exp2] = optional;
                    return {
                        type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$ast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].limit_clause,
                        limitKw: addComments(toKeywordNode(limitToken), {
                            trailing: _
                        }),
                        offset: exp1,
                        count: exp2
                    };
                } else {
                    return {
                        type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$ast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].limit_clause,
                        limitKw: addComments(toKeywordNode(limitToken), {
                            trailing: _
                        }),
                        count: exp1
                    };
                }
            }
        },
        {
            "name": "select_clause$subexpression$1",
            "symbols": [
                "all_columns_asterisk",
                "expression_list"
            ]
        },
        {
            "name": "select_clause$subexpression$1",
            "symbols": [
                "asteriskless_free_form_sql",
                "expression_list"
            ]
        },
        {
            "name": "select_clause",
            "symbols": [
                lexer.has("RESERVED_SELECT") ? {
                    type: "RESERVED_SELECT"
                } : RESERVED_SELECT,
                "select_clause$subexpression$1"
            ],
            "postprocess": ([nameToken, [exp, expressions]])=>({
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$ast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].clause,
                    nameKw: toKeywordNode(nameToken),
                    // Nearley completes every prefix; only materialize the surviving clause's children.
                    get children () {
                        return [
                            exp,
                            ...materializeExpressionList(expressions)
                        ];
                    }
                })
        },
        {
            "name": "select_clause",
            "symbols": [
                lexer.has("RESERVED_SELECT") ? {
                    type: "RESERVED_SELECT"
                } : RESERVED_SELECT
            ],
            "postprocess": ([nameToken])=>({
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$ast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].clause,
                    nameKw: toKeywordNode(nameToken),
                    children: []
                })
        },
        {
            "name": "all_columns_asterisk",
            "symbols": [
                lexer.has("ASTERISK") ? {
                    type: "ASTERISK"
                } : ASTERISK
            ],
            "postprocess": ()=>({
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$ast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].all_columns_asterisk
                })
        },
        {
            "name": "other_clause",
            "symbols": [
                lexer.has("RESERVED_CLAUSE") ? {
                    type: "RESERVED_CLAUSE"
                } : RESERVED_CLAUSE,
                "expression_list"
            ],
            "postprocess": ([nameToken, children])=>({
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$ast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].clause,
                    nameKw: toKeywordNode(nameToken),
                    get children () {
                        return materializeExpressionList(children);
                    }
                })
        },
        {
            "name": "set_operation",
            "symbols": [
                lexer.has("RESERVED_SET_OPERATION") ? {
                    type: "RESERVED_SET_OPERATION"
                } : RESERVED_SET_OPERATION,
                "expression_list"
            ],
            "postprocess": ([nameToken, children])=>({
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$ast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].set_operation,
                    nameKw: toKeywordNode(nameToken),
                    get children () {
                        return materializeExpressionList(children);
                    }
                })
        },
        {
            "name": "expression_chain_$ebnf$1",
            "symbols": [
                "expression_with_comments_"
            ]
        },
        {
            "name": "expression_chain_$ebnf$1",
            "symbols": [
                "expression_chain_$ebnf$1",
                "expression_with_comments_"
            ],
            "postprocess": (d)=>d[0].concat([
                    d[1]
                ])
        },
        {
            "name": "expression_chain_",
            "symbols": [
                "expression_chain_$ebnf$1"
            ],
            "postprocess": id
        },
        {
            "name": "expression_chain$ebnf$1",
            "symbols": []
        },
        {
            "name": "expression_chain$ebnf$1",
            "symbols": [
                "expression_chain$ebnf$1",
                "_expression_with_comments"
            ],
            "postprocess": (d)=>d[0].concat([
                    d[1]
                ])
        },
        {
            "name": "expression_chain",
            "symbols": [
                "expression",
                "expression_chain$ebnf$1"
            ],
            "postprocess": ([expr, chain])=>[
                    expr,
                    ...chain
                ]
        },
        {
            "name": "andless_expression_chain$ebnf$1",
            "symbols": []
        },
        {
            "name": "andless_expression_chain$ebnf$1",
            "symbols": [
                "andless_expression_chain$ebnf$1",
                "_andless_expression_with_comments"
            ],
            "postprocess": (d)=>d[0].concat([
                    d[1]
                ])
        },
        {
            "name": "andless_expression_chain",
            "symbols": [
                "andless_expression",
                "andless_expression_chain$ebnf$1"
            ],
            "postprocess": ([expr, chain])=>[
                    expr,
                    ...chain
                ]
        },
        {
            "name": "expression_with_comments_",
            "symbols": [
                "expression",
                "_"
            ],
            "postprocess": ([expr, _])=>addComments(expr, {
                    trailing: _
                })
        },
        {
            "name": "_expression_with_comments",
            "symbols": [
                "_",
                "expression"
            ],
            "postprocess": ([_, expr])=>addComments(expr, {
                    leading: _
                })
        },
        {
            "name": "_andless_expression_with_comments",
            "symbols": [
                "_",
                "andless_expression"
            ],
            "postprocess": ([_, expr])=>addComments(expr, {
                    leading: _
                })
        },
        {
            "name": "free_form_sql$subexpression$1",
            "symbols": [
                "asteriskless_free_form_sql"
            ]
        },
        {
            "name": "free_form_sql$subexpression$1",
            "symbols": [
                "asterisk"
            ]
        },
        {
            "name": "free_form_sql",
            "symbols": [
                "free_form_sql$subexpression$1"
            ],
            "postprocess": unwrap
        },
        {
            "name": "asteriskless_free_form_sql$subexpression$1",
            "symbols": [
                "asteriskless_andless_expression"
            ]
        },
        {
            "name": "asteriskless_free_form_sql$subexpression$1",
            "symbols": [
                "logic_operator"
            ]
        },
        {
            "name": "asteriskless_free_form_sql$subexpression$1",
            "symbols": [
                "comma"
            ]
        },
        {
            "name": "asteriskless_free_form_sql$subexpression$1",
            "symbols": [
                "comment"
            ]
        },
        {
            "name": "asteriskless_free_form_sql$subexpression$1",
            "symbols": [
                "other_keyword"
            ]
        },
        {
            "name": "asteriskless_free_form_sql",
            "symbols": [
                "asteriskless_free_form_sql$subexpression$1"
            ],
            "postprocess": unwrap
        },
        {
            "name": "expression$subexpression$1",
            "symbols": [
                "andless_expression"
            ]
        },
        {
            "name": "expression$subexpression$1",
            "symbols": [
                "logic_operator"
            ]
        },
        {
            "name": "expression",
            "symbols": [
                "expression$subexpression$1"
            ],
            "postprocess": unwrap
        },
        {
            "name": "andless_expression$subexpression$1",
            "symbols": [
                "asteriskless_andless_expression"
            ]
        },
        {
            "name": "andless_expression$subexpression$1",
            "symbols": [
                "asterisk"
            ]
        },
        {
            "name": "andless_expression",
            "symbols": [
                "andless_expression$subexpression$1"
            ],
            "postprocess": unwrap
        },
        {
            "name": "asteriskless_andless_expression$subexpression$1",
            "symbols": [
                "atomic_expression"
            ]
        },
        {
            "name": "asteriskless_andless_expression$subexpression$1",
            "symbols": [
                "between_predicate"
            ]
        },
        {
            "name": "asteriskless_andless_expression$subexpression$1",
            "symbols": [
                "case_expression"
            ]
        },
        {
            "name": "asteriskless_andless_expression",
            "symbols": [
                "asteriskless_andless_expression$subexpression$1"
            ],
            "postprocess": unwrap
        },
        {
            "name": "atomic_expression$subexpression$1",
            "symbols": [
                "array_subscript"
            ]
        },
        {
            "name": "atomic_expression$subexpression$1",
            "symbols": [
                "function_call"
            ]
        },
        {
            "name": "atomic_expression$subexpression$1",
            "symbols": [
                "property_access"
            ]
        },
        {
            "name": "atomic_expression$subexpression$1",
            "symbols": [
                "parenthesis"
            ]
        },
        {
            "name": "atomic_expression$subexpression$1",
            "symbols": [
                "curly_braces"
            ]
        },
        {
            "name": "atomic_expression$subexpression$1",
            "symbols": [
                "square_brackets"
            ]
        },
        {
            "name": "atomic_expression$subexpression$1",
            "symbols": [
                "operator"
            ]
        },
        {
            "name": "atomic_expression$subexpression$1",
            "symbols": [
                "identifier"
            ]
        },
        {
            "name": "atomic_expression$subexpression$1",
            "symbols": [
                "parameter"
            ]
        },
        {
            "name": "atomic_expression$subexpression$1",
            "symbols": [
                "literal"
            ]
        },
        {
            "name": "atomic_expression$subexpression$1",
            "symbols": [
                "data_type"
            ]
        },
        {
            "name": "atomic_expression$subexpression$1",
            "symbols": [
                "keyword"
            ]
        },
        {
            "name": "atomic_expression",
            "symbols": [
                "atomic_expression$subexpression$1"
            ],
            "postprocess": unwrap
        },
        {
            "name": "array_subscript",
            "symbols": [
                lexer.has("ARRAY_IDENTIFIER") ? {
                    type: "ARRAY_IDENTIFIER"
                } : ARRAY_IDENTIFIER,
                "_",
                "square_brackets"
            ],
            "postprocess": ([arrayToken, _, brackets])=>({
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$ast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].array_subscript,
                    array: addComments({
                        type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$ast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].identifier,
                        quoted: false,
                        text: arrayToken.text
                    }, {
                        trailing: _
                    }),
                    parenthesis: brackets
                })
        },
        {
            "name": "array_subscript",
            "symbols": [
                lexer.has("ARRAY_KEYWORD") ? {
                    type: "ARRAY_KEYWORD"
                } : ARRAY_KEYWORD,
                "_",
                "square_brackets"
            ],
            "postprocess": ([arrayToken, _, brackets])=>({
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$ast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].array_subscript,
                    array: addComments(toKeywordNode(arrayToken), {
                        trailing: _
                    }),
                    parenthesis: brackets
                })
        },
        {
            "name": "function_call",
            "symbols": [
                lexer.has("RESERVED_FUNCTION_NAME") ? {
                    type: "RESERVED_FUNCTION_NAME"
                } : RESERVED_FUNCTION_NAME,
                "_",
                "parenthesis"
            ],
            "postprocess": ([nameToken, _, parens])=>({
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$ast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].function_call,
                    nameKw: addComments(toKeywordNode(nameToken), {
                        trailing: _
                    }),
                    parenthesis: parens
                })
        },
        {
            "name": "parenthesis",
            "symbols": [
                {
                    "literal": "("
                },
                "expressions_or_clauses",
                {
                    "literal": ")"
                }
            ],
            "postprocess": ([open, children, close])=>({
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$ast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].parenthesis,
                    children: materializeExpressionList(children),
                    openParen: "(",
                    closeParen: ")"
                })
        },
        {
            "name": "curly_braces",
            "symbols": [
                {
                    "literal": "{"
                },
                "expression_list",
                {
                    "literal": "}"
                }
            ],
            "postprocess": ([open, children, close])=>({
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$ast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].parenthesis,
                    children: materializeExpressionList(children),
                    openParen: "{",
                    closeParen: "}"
                })
        },
        {
            "name": "square_brackets",
            "symbols": [
                {
                    "literal": "["
                },
                "expression_list",
                {
                    "literal": "]"
                }
            ],
            "postprocess": ([open, children, close])=>({
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$ast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].parenthesis,
                    children: materializeExpressionList(children),
                    openParen: "[",
                    closeParen: "]"
                })
        },
        {
            "name": "property_access$subexpression$1",
            "symbols": [
                "identifier"
            ]
        },
        {
            "name": "property_access$subexpression$1",
            "symbols": [
                "array_subscript"
            ]
        },
        {
            "name": "property_access$subexpression$1",
            "symbols": [
                "all_columns_asterisk"
            ]
        },
        {
            "name": "property_access$subexpression$1",
            "symbols": [
                "parameter"
            ]
        },
        {
            "name": "property_access",
            "symbols": [
                "atomic_expression",
                "_",
                lexer.has("PROPERTY_ACCESS_OPERATOR") ? {
                    type: "PROPERTY_ACCESS_OPERATOR"
                } : PROPERTY_ACCESS_OPERATOR,
                "_",
                "property_access$subexpression$1"
            ],
            "postprocess": // Allowing property to be <array_subscript> is currently a hack.
            // A better way would be to allow <property_access> on the left side of array_subscript,
            // but we currently can't do that because of another hack that requires
            // %ARRAY_IDENTIFIER on the left side of <array_subscript>.
            ([object, _1, dot, _2, [property]])=>{
                return {
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$ast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].property_access,
                    object: addComments(object, {
                        trailing: _1
                    }),
                    operator: dot.text,
                    property: addComments(property, {
                        leading: _2
                    })
                };
            }
        },
        {
            "name": "between_predicate",
            "symbols": [
                lexer.has("BETWEEN") ? {
                    type: "BETWEEN"
                } : BETWEEN,
                "_",
                "andless_expression_chain",
                "_",
                lexer.has("AND") ? {
                    type: "AND"
                } : AND,
                "_",
                "andless_expression"
            ],
            "postprocess": ([betweenToken, _1, expr1, _2, andToken, _3, expr2])=>({
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$ast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].between_predicate,
                    betweenKw: toKeywordNode(betweenToken),
                    expr1: addCommentsToArray(expr1, {
                        leading: _1,
                        trailing: _2
                    }),
                    andKw: toKeywordNode(andToken),
                    expr2: [
                        addComments(expr2, {
                            leading: _3
                        })
                    ]
                })
        },
        {
            "name": "case_expression$ebnf$1",
            "symbols": [
                "expression_chain_"
            ],
            "postprocess": id
        },
        {
            "name": "case_expression$ebnf$1",
            "symbols": [],
            "postprocess": ()=>null
        },
        {
            "name": "case_expression$ebnf$2",
            "symbols": []
        },
        {
            "name": "case_expression$ebnf$2",
            "symbols": [
                "case_expression$ebnf$2",
                "case_clause"
            ],
            "postprocess": (d)=>d[0].concat([
                    d[1]
                ])
        },
        {
            "name": "case_expression",
            "symbols": [
                lexer.has("CASE") ? {
                    type: "CASE"
                } : CASE,
                "_",
                "case_expression$ebnf$1",
                "case_expression$ebnf$2",
                lexer.has("END") ? {
                    type: "END"
                } : END
            ],
            "postprocess": ([caseToken, _, expr, clauses, endToken])=>({
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$ast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].case_expression,
                    caseKw: addComments(toKeywordNode(caseToken), {
                        trailing: _
                    }),
                    endKw: toKeywordNode(endToken),
                    expr: expr || [],
                    clauses
                })
        },
        {
            "name": "case_clause",
            "symbols": [
                lexer.has("WHEN") ? {
                    type: "WHEN"
                } : WHEN,
                "_",
                "expression_chain_",
                lexer.has("THEN") ? {
                    type: "THEN"
                } : THEN,
                "_",
                "expression_chain_"
            ],
            "postprocess": ([whenToken, _1, cond, thenToken, _2, expr])=>({
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$ast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].case_when,
                    whenKw: addComments(toKeywordNode(whenToken), {
                        trailing: _1
                    }),
                    thenKw: addComments(toKeywordNode(thenToken), {
                        trailing: _2
                    }),
                    condition: cond,
                    result: expr
                })
        },
        {
            "name": "case_clause",
            "symbols": [
                lexer.has("ELSE") ? {
                    type: "ELSE"
                } : ELSE,
                "_",
                "expression_chain_"
            ],
            "postprocess": ([elseToken, _, expr])=>({
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$ast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].case_else,
                    elseKw: addComments(toKeywordNode(elseToken), {
                        trailing: _
                    }),
                    result: expr
                })
        },
        {
            "name": "comma$subexpression$1",
            "symbols": [
                lexer.has("COMMA") ? {
                    type: "COMMA"
                } : COMMA
            ]
        },
        {
            "name": "comma",
            "symbols": [
                "comma$subexpression$1"
            ],
            "postprocess": ([[token]])=>({
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$ast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].comma
                })
        },
        {
            "name": "asterisk$subexpression$1",
            "symbols": [
                lexer.has("ASTERISK") ? {
                    type: "ASTERISK"
                } : ASTERISK
            ]
        },
        {
            "name": "asterisk",
            "symbols": [
                "asterisk$subexpression$1"
            ],
            "postprocess": ([[token]])=>({
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$ast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].operator,
                    text: token.text
                })
        },
        {
            "name": "operator$subexpression$1",
            "symbols": [
                lexer.has("OPERATOR") ? {
                    type: "OPERATOR"
                } : OPERATOR
            ]
        },
        {
            "name": "operator",
            "symbols": [
                "operator$subexpression$1"
            ],
            "postprocess": ([[token]])=>({
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$ast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].operator,
                    text: token.text
                })
        },
        {
            "name": "identifier$subexpression$1",
            "symbols": [
                lexer.has("IDENTIFIER") ? {
                    type: "IDENTIFIER"
                } : IDENTIFIER
            ]
        },
        {
            "name": "identifier$subexpression$1",
            "symbols": [
                lexer.has("QUOTED_IDENTIFIER") ? {
                    type: "QUOTED_IDENTIFIER"
                } : QUOTED_IDENTIFIER
            ]
        },
        {
            "name": "identifier$subexpression$1",
            "symbols": [
                lexer.has("VARIABLE") ? {
                    type: "VARIABLE"
                } : VARIABLE
            ]
        },
        {
            "name": "identifier",
            "symbols": [
                "identifier$subexpression$1"
            ],
            "postprocess": ([[token]])=>({
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$ast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].identifier,
                    quoted: token.type !== "IDENTIFIER",
                    text: token.text
                })
        },
        {
            "name": "parameter$subexpression$1",
            "symbols": [
                lexer.has("NAMED_PARAMETER") ? {
                    type: "NAMED_PARAMETER"
                } : NAMED_PARAMETER
            ]
        },
        {
            "name": "parameter$subexpression$1",
            "symbols": [
                lexer.has("QUOTED_PARAMETER") ? {
                    type: "QUOTED_PARAMETER"
                } : QUOTED_PARAMETER
            ]
        },
        {
            "name": "parameter$subexpression$1",
            "symbols": [
                lexer.has("NUMBERED_PARAMETER") ? {
                    type: "NUMBERED_PARAMETER"
                } : NUMBERED_PARAMETER
            ]
        },
        {
            "name": "parameter$subexpression$1",
            "symbols": [
                lexer.has("POSITIONAL_PARAMETER") ? {
                    type: "POSITIONAL_PARAMETER"
                } : POSITIONAL_PARAMETER
            ]
        },
        {
            "name": "parameter$subexpression$1",
            "symbols": [
                lexer.has("CUSTOM_PARAMETER") ? {
                    type: "CUSTOM_PARAMETER"
                } : CUSTOM_PARAMETER
            ]
        },
        {
            "name": "parameter",
            "symbols": [
                "parameter$subexpression$1"
            ],
            "postprocess": ([[token]])=>({
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$ast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].parameter,
                    key: token.key,
                    text: token.text
                })
        },
        {
            "name": "literal$subexpression$1",
            "symbols": [
                lexer.has("NUMBER") ? {
                    type: "NUMBER"
                } : NUMBER
            ]
        },
        {
            "name": "literal$subexpression$1",
            "symbols": [
                lexer.has("STRING") ? {
                    type: "STRING"
                } : STRING
            ]
        },
        {
            "name": "literal",
            "symbols": [
                "literal$subexpression$1"
            ],
            "postprocess": ([[token]])=>({
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$ast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].literal,
                    text: token.text
                })
        },
        {
            "name": "keyword$subexpression$1",
            "symbols": [
                lexer.has("RESERVED_KEYWORD") ? {
                    type: "RESERVED_KEYWORD"
                } : RESERVED_KEYWORD
            ]
        },
        {
            "name": "keyword$subexpression$1",
            "symbols": [
                lexer.has("RESERVED_KEYWORD_PHRASE") ? {
                    type: "RESERVED_KEYWORD_PHRASE"
                } : RESERVED_KEYWORD_PHRASE
            ]
        },
        {
            "name": "keyword$subexpression$1",
            "symbols": [
                lexer.has("RESERVED_JOIN") ? {
                    type: "RESERVED_JOIN"
                } : RESERVED_JOIN
            ]
        },
        {
            "name": "keyword",
            "symbols": [
                "keyword$subexpression$1"
            ],
            "postprocess": ([[token]])=>toKeywordNode(token)
        },
        {
            "name": "data_type$subexpression$1",
            "symbols": [
                lexer.has("RESERVED_DATA_TYPE") ? {
                    type: "RESERVED_DATA_TYPE"
                } : RESERVED_DATA_TYPE
            ]
        },
        {
            "name": "data_type$subexpression$1",
            "symbols": [
                lexer.has("RESERVED_DATA_TYPE_PHRASE") ? {
                    type: "RESERVED_DATA_TYPE_PHRASE"
                } : RESERVED_DATA_TYPE_PHRASE
            ]
        },
        {
            "name": "data_type",
            "symbols": [
                "data_type$subexpression$1"
            ],
            "postprocess": ([[token]])=>toDataTypeNode(token)
        },
        {
            "name": "data_type",
            "symbols": [
                lexer.has("RESERVED_PARAMETERIZED_DATA_TYPE") ? {
                    type: "RESERVED_PARAMETERIZED_DATA_TYPE"
                } : RESERVED_PARAMETERIZED_DATA_TYPE,
                "_",
                "parenthesis"
            ],
            "postprocess": ([nameToken, _, parens])=>({
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$ast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].parameterized_data_type,
                    dataType: addComments(toDataTypeNode(nameToken), {
                        trailing: _
                    }),
                    parenthesis: parens
                })
        },
        {
            "name": "logic_operator$subexpression$1",
            "symbols": [
                lexer.has("AND") ? {
                    type: "AND"
                } : AND
            ]
        },
        {
            "name": "logic_operator$subexpression$1",
            "symbols": [
                lexer.has("OR") ? {
                    type: "OR"
                } : OR
            ]
        },
        {
            "name": "logic_operator$subexpression$1",
            "symbols": [
                lexer.has("XOR") ? {
                    type: "XOR"
                } : XOR
            ]
        },
        {
            "name": "logic_operator",
            "symbols": [
                "logic_operator$subexpression$1"
            ],
            "postprocess": ([[token]])=>toKeywordNode(token)
        },
        {
            "name": "other_keyword$subexpression$1",
            "symbols": [
                lexer.has("WHEN") ? {
                    type: "WHEN"
                } : WHEN
            ]
        },
        {
            "name": "other_keyword$subexpression$1",
            "symbols": [
                lexer.has("THEN") ? {
                    type: "THEN"
                } : THEN
            ]
        },
        {
            "name": "other_keyword$subexpression$1",
            "symbols": [
                lexer.has("ELSE") ? {
                    type: "ELSE"
                } : ELSE
            ]
        },
        {
            "name": "other_keyword$subexpression$1",
            "symbols": [
                lexer.has("END") ? {
                    type: "END"
                } : END
            ]
        },
        {
            "name": "other_keyword",
            "symbols": [
                "other_keyword$subexpression$1"
            ],
            "postprocess": ([[token]])=>toKeywordNode(token)
        },
        {
            "name": "_$ebnf$1",
            "symbols": []
        },
        {
            "name": "_$ebnf$1",
            "symbols": [
                "_$ebnf$1",
                "comment"
            ],
            "postprocess": (d)=>d[0].concat([
                    d[1]
                ])
        },
        {
            "name": "_",
            "symbols": [
                "_$ebnf$1"
            ],
            "postprocess": ([comments])=>comments
        },
        {
            "name": "comment",
            "symbols": [
                lexer.has("LINE_COMMENT") ? {
                    type: "LINE_COMMENT"
                } : LINE_COMMENT
            ],
            "postprocess": ([token])=>({
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$ast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].line_comment,
                    text: token.text,
                    precedingWhitespace: token.precedingWhitespace
                })
        },
        {
            "name": "comment",
            "symbols": [
                lexer.has("BLOCK_COMMENT") ? {
                    type: "BLOCK_COMMENT"
                } : BLOCK_COMMENT
            ],
            "postprocess": ([token])=>({
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$ast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].block_comment,
                    text: token.text,
                    precedingWhitespace: token.precedingWhitespace
                })
        },
        {
            "name": "comment",
            "symbols": [
                lexer.has("DISABLE_COMMENT") ? {
                    type: "DISABLE_COMMENT"
                } : DISABLE_COMMENT
            ],
            "postprocess": ([token])=>({
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$parser$2f$ast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeType"].disable_comment,
                    text: token.text,
                    precedingWhitespace: token.precedingWhitespace
                })
        }
    ],
    ParserStart: "main"
};
const __TURBOPACK__default__export__ = grammar;
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/sqlFormatter.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "format",
    ()=>format,
    "formatDialect",
    ()=>formatDialect,
    "supportedDialects",
    ()=>supportedDialects
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$allDialects$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/allDialects.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$dialect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/dialect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Formatter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/formatter/Formatter.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$validateConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/validateConfig.js [app-client] (ecmascript)");
var __rest = ("TURBOPACK compile-time value", void 0) && ("TURBOPACK compile-time value", void 0).__rest || function(s, e) {
    var t = {};
    for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") for(var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++){
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
};
;
;
;
;
const dialectNameMap = {
    bigquery: 'bigquery',
    clickhouse: 'clickhouse',
    db2: 'db2',
    db2i: 'db2i',
    duckdb: 'duckdb',
    hive: 'hive',
    mariadb: 'mariadb',
    mysql: 'mysql',
    n1ql: 'n1ql',
    plsql: 'plsql',
    postgresql: 'postgresql',
    redshift: 'redshift',
    spark: 'spark',
    sqlite: 'sqlite',
    sql: 'sql',
    tidb: 'tidb',
    trino: 'trino',
    transactsql: 'transactsql',
    tsql: 'transactsql',
    singlestoredb: 'singlestoredb',
    snowflake: 'snowflake'
};
const supportedDialects = Object.keys(dialectNameMap);
const defaultOptions = {
    tabWidth: 2,
    useTabs: false,
    keywordCase: 'preserve',
    identifierCase: 'preserve',
    dataTypeCase: 'preserve',
    functionCase: 'preserve',
    indentStyle: 'standard',
    logicalOperatorNewline: 'before',
    expressionWidth: 50,
    linesBetweenQueries: 1,
    denseOperators: false,
    newlineBeforeSemicolon: false
};
const format = (query, cfg = {})=>{
    if (typeof cfg.language === 'string' && !supportedDialects.includes(cfg.language)) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$validateConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConfigError"](`Unsupported SQL dialect: ${cfg.language}`);
    }
    const canonicalDialectName = dialectNameMap[cfg.language || 'sql'];
    return formatDialect(query, Object.assign(Object.assign({}, cfg), {
        dialect: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$allDialects$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[canonicalDialectName]
    }));
};
const formatDialect = (query, _a)=>{
    var { dialect } = _a, cfg = __rest(_a, [
        "dialect"
    ]);
    if (typeof query !== 'string') {
        throw new Error('Invalid query argument. Expected string, instead got ' + typeof query);
    }
    const options = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$validateConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateConfig"])(Object.assign(Object.assign({}, defaultOptions), cfg));
    return new __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$formatter$2f$Formatter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$sql$2d$formatter$2f$dist$2f$esm$2f$dialect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createDialect"])(dialect), options).format(query);
};
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/utils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "dedupe",
    ()=>dedupe,
    "equalizeWhitespace",
    ()=>equalizeWhitespace,
    "isMultiline",
    ()=>isMultiline,
    "last",
    ()=>last,
    "maxLength",
    ()=>maxLength,
    "sortByLengthDesc",
    ()=>sortByLengthDesc
]);
const dedupe = (arr)=>[
        ...new Set(arr)
    ];
const last = (arr)=>arr[arr.length - 1];
const sortByLengthDesc = (strings)=>strings.sort((a, b)=>b.length - a.length || a.localeCompare(b));
const maxLength = (strings)=>strings.reduce((max, cur)=>Math.max(max, cur.length), 0);
const equalizeWhitespace = (s)=>s.replace(/\s+/gu, ' ');
const isMultiline = (text)=>/\n/.test(text);
}),
"[project]/frontend-nextjs/node_modules/sql-formatter/dist/esm/validateConfig.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConfigError",
    ()=>ConfigError,
    "validateConfig",
    ()=>validateConfig
]);
class ConfigError extends Error {
}
function validateConfig(cfg) {
    const removedOptions = [
        'multilineLists',
        'newlineBeforeOpenParen',
        'newlineBeforeCloseParen',
        'aliasAs',
        'commaPosition',
        'tabulateAlias'
    ];
    for (const optionName of removedOptions){
        if (optionName in cfg) {
            throw new ConfigError(`${optionName} config is no more supported.`);
        }
    }
    if (cfg.expressionWidth <= 0) {
        throw new ConfigError(`expressionWidth config must be positive number. Received ${cfg.expressionWidth} instead.`);
    }
    if (cfg.params && !validateParams(cfg.params)) {
        // eslint-disable-next-line no-console
        console.warn('WARNING: All "params" option values should be strings.');
    }
    if (cfg.paramTypes && !validateParamTypes(cfg.paramTypes)) {
        throw new ConfigError('Empty regex given in custom paramTypes. That would result in matching infinite amount of parameters.');
    }
    return cfg;
}
function validateParams(params) {
    const paramValues = params instanceof Array ? params : Object.values(params);
    return paramValues.every((p)=>typeof p === 'string');
}
function validateParamTypes(paramTypes) {
    if (paramTypes.custom && Array.isArray(paramTypes.custom)) {
        return paramTypes.custom.every((p)=>p.regex !== '');
    }
    return true;
}
}),
]);

//# sourceMappingURL=1yvi_07tgaqm._.js.map