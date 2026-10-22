(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/frontend-nextjs/components/shell/Sidebar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NAV",
    ()=>NAV,
    "default",
    ()=>Sidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/book-open.mjs [app-client] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$blocks$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Blocks$3e$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/blocks.mjs [app-client] (ecmascript) <export default as Blocks>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$database$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Database$3e$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/database.mjs [app-client] (ecmascript) <export default as Database>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$code$2d$corner$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileCode2$3e$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/file-code-corner.mjs [app-client] (ecmascript) <export default as FileCode2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flask$2d$conical$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FlaskConical$3e$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/flask-conical.mjs [app-client] (ecmascript) <export default as FlaskConical>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2d$clock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/rotate-ccw-clock.mjs [app-client] (ecmascript) <export default as History>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/layers.mjs [app-client] (ecmascript) <export default as Layers>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$network$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Network$3e$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/network.mjs [app-client] (ecmascript) <export default as Network>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$panel$2d$left$2d$close$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PanelLeftClose$3e$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/panel-left-close.mjs [app-client] (ecmascript) <export default as PanelLeftClose>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$panel$2d$left$2d$open$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PanelLeftOpen$3e$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/panel-left-open.mjs [app-client] (ecmascript) <export default as PanelLeftOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$workspace$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/lib/workspace.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const NAV = [
    {
        href: "/",
        label: "Workspace",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$code$2d$corner$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileCode2$3e$__["FileCode2"]
    },
    {
        href: "/batch/",
        label: "Batch runs",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__["Layers"]
    },
    {
        href: "/studies/",
        label: "Study setup",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$database$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Database$3e$__["Database"]
    },
    {
        href: "/synthetic/",
        label: "Synthetic data",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flask$2d$conical$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FlaskConical$3e$__["FlaskConical"]
    },
    {
        href: "/knowledge/",
        label: "Knowledge",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"]
    },
    {
        href: "/modules/",
        label: "Clinical modules",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$blocks$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Blocks$3e$__["Blocks"]
    },
    {
        href: "/library/",
        label: "Spec library",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2d$clock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__["History"]
    },
    {
        href: "/platform/",
        label: "Platform",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$network$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Network$3e$__["Network"]
    }
];
function Sidebar() {
    _s();
    const path = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])() ?? "/";
    const { sidebarCollapsed: c, toggleSidebar } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$workspace$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])();
    const active = (href)=>href === "/" ? path === "/" : path.startsWith(href.replace(/\/$/, ""));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("sticky top-0 hidden h-screen shrink-0 flex-col border-r border-line bg-surface transition-[width] duration-200 md:flex", c ? "w-[68px]" : "w-60"),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("flex items-center py-5", c ? "justify-center px-0" : "gap-3 px-5"),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "brand-mark grid h-9 w-9 shrink-0 place-items-center rounded-xl text-sm font-bold text-white",
                        children: "S2C"
                    }, void 0, false, {
                        fileName: "[project]/frontend-nextjs/components/shell/Sidebar.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this),
                    !c && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-[15px] font-semibold tracking-tight",
                                children: "Spec2Code"
                            }, void 0, false, {
                                fileName: "[project]/frontend-nextjs/components/shell/Sidebar.tsx",
                                lineNumber: 35,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-[11px] text-muted",
                                children: "Clinical spec to code"
                            }, void 0, false, {
                                fileName: "[project]/frontend-nextjs/components/shell/Sidebar.tsx",
                                lineNumber: 36,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend-nextjs/components/shell/Sidebar.tsx",
                        lineNumber: 34,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend-nextjs/components/shell/Sidebar.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "flex flex-col gap-1 px-3",
                "aria-label": "Main",
                children: NAV.map(({ href, label, icon: Icon })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: href,
                        title: c ? label : undefined,
                        "aria-label": label,
                        "aria-current": active(href) ? "page" : undefined,
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("relative flex items-center rounded-lg py-2 text-sm transition", c ? "justify-center px-0" : "gap-3 px-3", active(href) ? "bg-accentsoft font-medium text-accent" : "text-muted hover:bg-surface2 hover:text-ink"),
                        children: [
                            active(href) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "absolute left-0 top-1.5 h-[calc(100%-12px)] w-[3px] rounded-r bg-accent",
                                "aria-hidden": true
                            }, void 0, false, {
                                fileName: "[project]/frontend-nextjs/components/shell/Sidebar.tsx",
                                lineNumber: 55,
                                columnNumber: 30
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                size: 18,
                                "aria-hidden": true
                            }, void 0, false, {
                                fileName: "[project]/frontend-nextjs/components/shell/Sidebar.tsx",
                                lineNumber: 56,
                                columnNumber: 13
                            }, this),
                            !c && label
                        ]
                    }, href, true, {
                        fileName: "[project]/frontend-nextjs/components/shell/Sidebar.tsx",
                        lineNumber: 43,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/frontend-nextjs/components/shell/Sidebar.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-auto space-y-2 p-3",
                children: [
                    !c && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "px-2 text-[11px] leading-relaxed text-muted",
                        children: "Generated code is a draft until a programmer signs it off."
                    }, void 0, false, {
                        fileName: "[project]/frontend-nextjs/components/shell/Sidebar.tsx",
                        lineNumber: 63,
                        columnNumber: 16
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: toggleSidebar,
                        "aria-label": c ? "Expand sidebar" : "Collapse sidebar",
                        title: c ? "Expand sidebar" : "Collapse sidebar",
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("flex w-full items-center rounded-lg py-2 text-sm text-muted transition hover:bg-surface2 hover:text-ink", c ? "justify-center" : "gap-3 px-3"),
                        children: [
                            c ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$panel$2d$left$2d$open$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PanelLeftOpen$3e$__["PanelLeftOpen"], {
                                size: 18
                            }, void 0, false, {
                                fileName: "[project]/frontend-nextjs/components/shell/Sidebar.tsx",
                                lineNumber: 73,
                                columnNumber: 16
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$panel$2d$left$2d$close$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PanelLeftClose$3e$__["PanelLeftClose"], {
                                size: 18
                            }, void 0, false, {
                                fileName: "[project]/frontend-nextjs/components/shell/Sidebar.tsx",
                                lineNumber: 73,
                                columnNumber: 46
                            }, this),
                            !c && "Collapse"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend-nextjs/components/shell/Sidebar.tsx",
                        lineNumber: 64,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend-nextjs/components/shell/Sidebar.tsx",
                lineNumber: 62,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend-nextjs/components/shell/Sidebar.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
_s(Sidebar, "uifes90h1eb6GUrrCtE/8B0yUpc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$workspace$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"]
    ];
});
_c = Sidebar;
var _c;
__turbopack_context__.k.register(_c, "Sidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend-nextjs/components/shell/Topbar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Topbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$shell$2f$Sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/components/shell/Sidebar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/moon.mjs [app-client] (ecmascript) <export default as Moon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$panel$2d$left$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PanelLeft$3e$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/panel-left.mjs [app-client] (ecmascript) <export default as PanelLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/sun.mjs [app-client] (ecmascript) <export default as Sun>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$workspace$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/lib/workspace.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/components/ui/primitives.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
function Topbar() {
    _s();
    const { tenantId, setTenantId, theme, toggleTheme, toggleSidebar } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$workspace$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])();
    const path = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])() ?? "/";
    const health = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "health",
            tenantId
        ],
        queryFn: {
            "Topbar.useQuery[health]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getHealth"])(tenantId)
        }["Topbar.useQuery[health]"],
        refetchInterval: 30000
    });
    const status = health.isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
        children: "Checking API"
    }, void 0, false, {
        fileName: "[project]/frontend-nextjs/components/shell/Topbar.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this) : health.isError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
        tone: "bad",
        title: String(health.error),
        children: "API offline"
    }, void 0, false, {
        fileName: "[project]/frontend-nextjs/components/shell/Topbar.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this) : health.data?.modelKeyConfigured ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
        tone: "good",
        children: "API online"
    }, void 0, false, {
        fileName: "[project]/frontend-nextjs/components/shell/Topbar.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
        tone: "warn",
        title: "Set ANTHROPIC_API_KEY on the server",
        children: "Model key missing"
    }, void 0, false, {
        fileName: "[project]/frontend-nextjs/components/shell/Topbar.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "sticky top-0 z-10 flex items-center gap-3 border-b border-line bg-bg/85 px-4 py-3 backdrop-blur md:px-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: toggleSidebar,
                className: "hidden h-8 w-8 place-items-center rounded-lg border border-line bg-surface text-muted hover:text-ink md:grid",
                "aria-label": "Toggle sidebar",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$panel$2d$left$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PanelLeft$3e$__["PanelLeft"], {
                    size: 15
                }, void 0, false, {
                    fileName: "[project]/frontend-nextjs/components/shell/Topbar.tsx",
                    lineNumber: 35,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/frontend-nextjs/components/shell/Topbar.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: "/",
                className: "text-sm font-semibold md:hidden",
                children: "Spec2Code"
            }, void 0, false, {
                fileName: "[project]/frontend-nextjs/components/shell/Topbar.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ml-auto flex items-center gap-3",
                children: [
                    status,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "flex items-center gap-2 text-xs text-muted",
                        children: [
                            "Tenant",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                defaultValue: tenantId,
                                onBlur: (e)=>setTenantId(e.target.value),
                                onKeyDown: (e)=>e.key === "Enter" && e.target.blur(),
                                className: "w-28 rounded-md border border-line bg-surface px-2 py-1 font-mono text-xs text-ink",
                                "aria-label": "Tenant id"
                            }, tenantId, false, {
                                fileName: "[project]/frontend-nextjs/components/shell/Topbar.tsx",
                                lineNumber: 42,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend-nextjs/components/shell/Topbar.tsx",
                        lineNumber: 40,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: toggleTheme,
                        className: "grid h-8 w-8 place-items-center rounded-lg border border-line bg-surface text-muted hover:text-ink",
                        "aria-label": theme === "dark" ? "Switch to light theme" : "Switch to dark theme",
                        children: theme === "dark" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__["Sun"], {
                            size: 15
                        }, void 0, false, {
                            fileName: "[project]/frontend-nextjs/components/shell/Topbar.tsx",
                            lineNumber: 56,
                            columnNumber: 31
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__["Moon"], {
                            size: 15
                        }, void 0, false, {
                            fileName: "[project]/frontend-nextjs/components/shell/Topbar.tsx",
                            lineNumber: 56,
                            columnNumber: 51
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/frontend-nextjs/components/shell/Topbar.tsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend-nextjs/components/shell/Topbar.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "absolute inset-x-0 top-full flex gap-1 overflow-x-auto border-b border-line bg-bg px-3 py-2 md:hidden",
                "aria-label": "Main",
                children: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$shell$2f$Sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NAV"].map(({ href, label })=>{
                    const on = href === "/" ? path === "/" : path.startsWith(href.replace(/\/$/, ""));
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: href,
                        "aria-current": on ? "page" : undefined,
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("whitespace-nowrap rounded-full px-3 py-1.5 text-xs", on ? "bg-accentsoft font-medium text-accent" : "text-muted"),
                        children: label
                    }, href, false, {
                        fileName: "[project]/frontend-nextjs/components/shell/Topbar.tsx",
                        lineNumber: 63,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/frontend-nextjs/components/shell/Topbar.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend-nextjs/components/shell/Topbar.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
_s(Topbar, "m0TW8QBx4xJjEwnj8Jm9w+FZqOw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$workspace$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
_c = Topbar;
var _c;
__turbopack_context__.k.register(_c, "Topbar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend-nextjs/components/ui/primitives.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Badge",
    ()=>Badge,
    "Button",
    ()=>Button,
    "Card",
    ()=>Card,
    "CardHeader",
    ()=>CardHeader,
    "Field",
    ()=>Field,
    "inputCls",
    ()=>inputCls
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
;
;
const TONE = {
    neutral: "bg-surface2 text-muted border-line",
    good: "bg-goodsoft text-good border-transparent",
    warn: "bg-warnsoft text-warn border-transparent",
    bad: "bg-badsoft text-bad border-transparent",
    accent: "bg-accentsoft text-accent border-transparent"
};
function Badge({ tone = "neutral", children, title }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        title: title,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("inline-flex items-center gap-1 whitespace-nowrap rounded-full border px-2 py-0.5 text-[11px] font-medium", TONE[tone]),
        children: children
    }, void 0, false, {
        fileName: "[project]/frontend-nextjs/components/ui/primitives.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
_c = Badge;
function Card({ className, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("rounded-xl border border-line bg-surface", className),
        children: children
    }, void 0, false, {
        fileName: "[project]/frontend-nextjs/components/ui/primitives.tsx",
        lineNumber: 25,
        columnNumber: 10
    }, this);
}
_c1 = Card;
function CardHeader({ title, hint, right }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-start justify-between gap-3 border-b border-line px-4 py-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-sm font-semibold",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/frontend-nextjs/components/ui/primitives.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this),
                    hint && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-0.5 text-xs text-muted",
                        children: hint
                    }, void 0, false, {
                        fileName: "[project]/frontend-nextjs/components/ui/primitives.tsx",
                        lineNumber: 33,
                        columnNumber: 18
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend-nextjs/components/ui/primitives.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            right
        ]
    }, void 0, true, {
        fileName: "[project]/frontend-nextjs/components/ui/primitives.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
_c2 = CardHeader;
function Button({ variant = "secondary", className, ...rest }) {
    const base = "inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-45";
    const v = {
        primary: "bg-accent text-accentink hover:brightness-110",
        secondary: "border border-line bg-surface hover:bg-surface2",
        ghost: "text-muted hover:bg-surface2 hover:text-ink",
        warn: "bg-warn text-white hover:brightness-110"
    }[variant];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(base, v, className),
        ...rest
    }, void 0, false, {
        fileName: "[project]/frontend-nextjs/components/ui/primitives.tsx",
        lineNumber: 50,
        columnNumber: 10
    }, this);
}
_c3 = Button;
function Field({ label, hint, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
        className: "block",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-xs font-medium text-muted",
                children: label
            }, void 0, false, {
                fileName: "[project]/frontend-nextjs/components/ui/primitives.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            children,
            hint && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "mt-1 block text-[11px] text-muted",
                children: hint
            }, void 0, false, {
                fileName: "[project]/frontend-nextjs/components/ui/primitives.tsx",
                lineNumber: 58,
                columnNumber: 16
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend-nextjs/components/ui/primitives.tsx",
        lineNumber: 55,
        columnNumber: 5
    }, this);
}
_c4 = Field;
const inputCls = "mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm placeholder:text-muted/70 focus:border-accent";
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "Badge");
__turbopack_context__.k.register(_c1, "Card");
__turbopack_context__.k.register(_c2, "CardHeader");
__turbopack_context__.k.register(_c3, "Button");
__turbopack_context__.k.register(_c4, "Field");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend-nextjs/lib/api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "API_BASE",
    ()=>API_BASE,
    "activateVersion",
    ()=>activateVersion,
    "cancelBatch",
    ()=>cancelBatch,
    "createBatch",
    ()=>createBatch,
    "createStudy",
    ()=>createStudy,
    "deleteBatch",
    ()=>deleteBatch,
    "deleteRule",
    ()=>deleteRule,
    "deleteStudy",
    ()=>deleteStudy,
    "downloadBatch",
    ()=>downloadBatch,
    "extractSpec",
    ()=>extractSpec,
    "generateCode",
    ()=>generateCode,
    "getBatch",
    ()=>getBatch,
    "getBatchItem",
    ()=>getBatchItem,
    "getEdcSystems",
    ()=>getEdcSystems,
    "getHealth",
    ()=>getHealth,
    "getModelProviders",
    ()=>getModelProviders,
    "getModules",
    ()=>getModules,
    "getStudy",
    ()=>getStudy,
    "getStudyItems",
    ()=>getStudyItems,
    "getTargets",
    ()=>getTargets,
    "importHistory",
    ()=>importHistory,
    "kbAction",
    ()=>kbAction,
    "kbCatalog",
    ()=>kbCatalog,
    "kbCatalogFetch",
    ()=>kbCatalogFetch,
    "kbDelete",
    ()=>kbDelete,
    "kbFromListings",
    ()=>kbFromListings,
    "kbPatch",
    ()=>kbPatch,
    "kbReindex",
    ()=>kbReindex,
    "kbReviewQueue",
    ()=>kbReviewQueue,
    "kbSearch",
    ()=>kbSearch,
    "kbSource",
    ()=>kbSource,
    "kbSources",
    ()=>kbSources,
    "kbStats",
    ()=>kbStats,
    "kbUpload",
    ()=>kbUpload,
    "listBatches",
    ()=>listBatches,
    "listReviews",
    ()=>listReviews,
    "listRules",
    ()=>listRules,
    "listRuns",
    ()=>listRuns,
    "listSpecs",
    ()=>listSpecs,
    "listStudies",
    ()=>listStudies,
    "parseFiles",
    ()=>parseFiles,
    "patchStudy",
    ()=>patchStudy,
    "retryBatch",
    ()=>retryBatch,
    "reviewSpec",
    ()=>reviewSpec,
    "ruleAction",
    ()=>ruleAction,
    "ruleBacktest",
    ()=>ruleBacktest,
    "ruleDryRun",
    ()=>ruleDryRun,
    "ruleTests",
    ()=>ruleTests,
    "runPreflight",
    ()=>runPreflight,
    "savePrecedent",
    ()=>savePrecedent,
    "saveRule",
    ()=>saveRule,
    "scanServerFolder",
    ()=>scanServerFolder,
    "synApprove",
    ()=>synApprove,
    "synDelete",
    ()=>synDelete,
    "synDownload",
    ()=>synDownload,
    "synEdit",
    ()=>synEdit,
    "synGenerate",
    ()=>synGenerate,
    "synGet",
    ()=>synGet,
    "synList",
    ()=>synList,
    "synReopen",
    ()=>synReopen,
    "synRunSql",
    ()=>synRunSql,
    "synRuns",
    ()=>synRuns,
    "synTestpack",
    ()=>synTestpack,
    "synUploadResult",
    ()=>synUploadResult,
    "understandSpec",
    ()=>understandSpec,
    "uploadMetadata",
    ()=>uploadMetadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/frontend-nextjs/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const API_BASE = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_BASE ?? "http://127.0.0.1:8002";
async function request(path, tenantId, init) {
    let res;
    try {
        res = await fetch(`${API_BASE}${path}`, {
            ...init,
            headers: {
                "Content-Type": "application/json",
                "X-Tenant-Id": tenantId,
                ...init?.headers ?? {}
            }
        });
    } catch  {
        throw new Error(`Cannot reach the Spec2Code API at ${API_BASE}. Is the backend running?`);
    }
    const body = await res.json().catch(()=>({}));
    if (!res.ok) throw new Error(body.error ?? `Request failed (${res.status})`);
    return body;
}
const post = (path, tenantId, body)=>request(path, tenantId, {
        method: "POST",
        body: JSON.stringify(body)
    });
const getHealth = (tenantId)=>request("/api/health", tenantId);
const getModules = (tenantId)=>request("/api/modules", tenantId);
const getTargets = (tenantId, studyId = "")=>request(`/api/targets${studyId ? `?studyId=${encodeURIComponent(studyId)}` : ""}`, tenantId);
const getEdcSystems = (tenantId)=>request("/api/edc-systems", tenantId);
const getModelProviders = (tenantId)=>request("/api/llm-providers", tenantId);
const extractSpec = (rawText, tenantId)=>post("/api/extract", tenantId, {
        rawText
    });
const understandSpec = (spec, tenantId)=>post("/api/understand", tenantId, spec);
const reviewSpec = (spec, tenantId)=>post("/api/review", tenantId, spec);
const generateCode = (spec, specId, allowUnverified, tenantId)=>{
    const q = new URLSearchParams({
        force_generate: "true",
        allow_unverified: String(allowUnverified)
    });
    if (specId) q.set("spec_id", specId);
    return post(`/api/generate?${q.toString()}`, tenantId, spec);
};
const savePrecedent = (spec, code, notes, tenantId)=>post("/api/precedents", tenantId, {
        spec_id: spec.reportId,
        description: spec.description,
        logic: spec.logic,
        report_scenarios: spec.reportScenarios,
        column_heading: spec.columnHeading,
        cql: code,
        notes
    });
const listSpecs = (tenantId)=>request("/api/specs", tenantId);
const listReviews = (specId, tenantId)=>request(`/api/specs/${specId}/reviews`, tenantId);
const importHistory = (files, dryRun, tenantId)=>post("/api/specs/import", tenantId, {
        files,
        dryRun
    });
const listRuns = (specId, tenantId)=>request(`/api/specs/${specId}/runs`, tenantId);
const parseFiles = (files, tenantId)=>post("/api/batch/parse", tenantId, {
        files
    });
const scanServerFolder = (path, recursive, tenantId)=>post("/api/batch/scan", tenantId, {
        path,
        recursive
    });
const createBatch = (name, options, items, tenantId)=>post("/api/batch", tenantId, {
        name,
        options,
        items
    });
const listBatches = (tenantId)=>request("/api/batch", tenantId);
const getBatch = (id, tenantId)=>request(`/api/batch/${id}`, tenantId);
const getBatchItem = (id, itemId, tenantId)=>request(`/api/batch/${id}/items/${itemId}`, tenantId);
const cancelBatch = (id, tenantId)=>post(`/api/batch/${id}/cancel`, tenantId, {});
const retryBatch = (id, tenantId, itemIds, generateAnyway = false)=>post(`/api/batch/${id}/retry`, tenantId, {
        itemIds: itemIds ?? null,
        generateAnyway
    });
const deleteBatch = (id, tenantId)=>request(`/api/batch/${id}`, tenantId, {
        method: "DELETE"
    });
async function downloadBatch(id, name, tenantId) {
    const res = await fetch(`${API_BASE}/api/batch/${id}/download`, {
        headers: {
            "X-Tenant-Id": tenantId
        }
    });
    if (!res.ok) throw new Error(`Download failed (${res.status})`);
    const url = URL.createObjectURL(await res.blob());
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name.replace(/[^A-Za-z0-9._-]+/g, "_") || "batch"}.zip`;
    a.click();
    URL.revokeObjectURL(url);
}
const listStudies = (tenantId)=>request("/api/studies", tenantId);
const getStudy = (id, tenantId)=>request(`/api/studies/${encodeURIComponent(id)}`, tenantId);
const createStudy = (studyId, name, edcSystem, tenantId, ta = "", sponsor = "")=>post("/api/studies", tenantId, {
        studyId,
        name,
        edcSystem,
        ta,
        sponsor
    });
const deleteStudy = (id, tenantId)=>request(`/api/studies/${encodeURIComponent(id)}`, tenantId, {
        method: "DELETE"
    });
async function uploadMetadata(id, files, carryOver, notes, tenantId) {
    let res;
    try {
        res = await fetch(`${API_BASE}/api/studies/${encodeURIComponent(id)}/metadata`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Tenant-Id": tenantId
            },
            body: JSON.stringify({
                files,
                carryOver,
                notes
            })
        });
    } catch  {
        throw new Error(`Cannot reach the Spec2Code API at ${API_BASE}. Is the backend running?`);
    }
    const body = await res.json().catch(()=>({}));
    if (!res.ok) {
        const b = body;
        throw new Error([
            b.error ?? `Upload failed (${res.status})`,
            ...(b.messages ?? []).map((m)=>m.text)
        ].join(" "));
    }
    return body;
}
const activateVersion = (id, version, tenantId)=>post(`/api/studies/${encodeURIComponent(id)}/versions/${version}/activate`, tenantId, {});
const getStudyItems = (id, tenantId, opts = {})=>{
    const q = new URLSearchParams();
    if (opts.version) q.set("version", String(opts.version));
    if (opts.form) q.set("form", opts.form);
    if (opts.q) q.set("q", opts.q);
    return request(`/api/studies/${encodeURIComponent(id)}/items?${q.toString()}`, tenantId);
};
const runPreflight = (studyId, listings, tenantId)=>post("/api/preflight", tenantId, {
        studyId,
        listings
    });
// ---- Knowledge base ---------------------------------------------------------
/** Failures that carry details (per-file results, failed tests) are thrown with them attached. */ async function detailed(path, tenantId, init) {
    let res;
    try {
        res = await fetch(`${API_BASE}${path}`, {
            ...init,
            headers: {
                "Content-Type": "application/json",
                "X-Tenant-Id": tenantId,
                ...init?.headers ?? {}
            }
        });
    } catch  {
        throw new Error(`Cannot reach the Spec2Code API at ${API_BASE}. Is the backend running?`);
    }
    const body = await res.json().catch(()=>({}));
    if (!res.ok) {
        const e = new Error(body.error ?? `Request failed (${res.status})`);
        e.body = body;
        throw e;
    }
    return body;
}
const send = (method, path, tenantId, body)=>detailed(path, tenantId, {
        method,
        body: body === undefined ? undefined : JSON.stringify(body)
    });
const kbStats = (t)=>request("/api/knowledge/stats", t);
const kbSources = (t, f = {})=>{
    const q = new URLSearchParams();
    Object.entries(f).forEach(([k, v])=>v && q.set(k, v));
    return request(`/api/knowledge/sources?${q.toString()}`, t);
};
const kbSource = (id, t)=>request(`/api/knowledge/sources/${id}`, t);
const kbUpload = (files, meta, t)=>send("POST", "/api/knowledge/sources", t, {
        files,
        ...meta
    });
const kbFromListings = (body, t)=>send("POST", "/api/knowledge/from-listings", t, body);
const kbPatch = (id, patch, t)=>send("PATCH", `/api/knowledge/sources/${id}`, t, patch);
const kbAction = (id, action, t)=>send("POST", `/api/knowledge/sources/${id}/${action}`, t, {});
const kbDelete = (id, t)=>send("DELETE", `/api/knowledge/sources/${id}`, t);
const kbSearch = (body, t)=>send("POST", "/api/knowledge/search", t, body);
const kbReindex = (t)=>send("POST", "/api/knowledge/reindex", t, {});
const kbReviewQueue = (t)=>request("/api/knowledge/review-queue", t);
const listRules = (t)=>request("/api/rules", t);
const saveRule = (id, rule, t)=>send(id ? "PUT" : "POST", id ? `/api/rules/${id}` : "/api/rules", t, rule);
const ruleAction = (id, action, t)=>send("POST", `/api/rules/${id}/${action}`, t, {});
const ruleTests = (id, t)=>send("POST", `/api/rules/${id}/run-tests`, t, {});
const deleteRule = (id, t)=>send("DELETE", `/api/rules/${id}`, t);
const ruleDryRun = (body, t)=>send("POST", "/api/rules/dry-run", t, body);
const ruleBacktest = (rule, t)=>send("POST", "/api/rules/backtest", t, {
        rule
    });
const patchStudy = (id, patch, t)=>send("PATCH", `/api/studies/${encodeURIComponent(id)}`, t, patch);
// ---- Synthetic data -------------------------------------------------------
const asUser = (reviewer)=>reviewer ? {
        headers: {
            "X-User-Id": reviewer
        }
    } : {};
const synList = (t, f = {})=>{
    const q = new URLSearchParams();
    Object.entries(f).forEach(([k, v])=>v && q.set(k, v));
    return request(`/api/synthetic${q.size ? `?${q}` : ""}`, t);
};
const synGet = (id, t)=>request(`/api/synthetic/${id}`, t);
const synGenerate = (body, t, reviewer = "")=>request("/api/synthetic/generate", t, {
        method: "POST",
        body: JSON.stringify(body),
        ...asUser(reviewer)
    });
const synEdit = (id, body, t)=>request(`/api/synthetic/${id}`, t, {
        method: "PATCH",
        body: JSON.stringify(body)
    });
const synApprove = (id, acknowledgeGaps, t, reviewer)=>detailed(`/api/synthetic/${id}/approve`, t, {
        method: "POST",
        body: JSON.stringify({
            acknowledgeGaps
        }),
        ...asUser(reviewer)
    });
const synReopen = (id, t)=>request(`/api/synthetic/${id}/reopen`, t, {
        method: "POST",
        body: "{}"
    });
const synDelete = (id, t)=>request(`/api/synthetic/${id}`, t, {
        method: "DELETE"
    });
async function synDownload(id, format, t, name) {
    const res = await fetch(`${API_BASE}/api/synthetic/${id}/export?format=${format}`, {
        headers: {
            "X-Tenant-Id": t
        }
    });
    if (!res.ok) throw new Error(`Export failed (${res.status})`);
    const url = URL.createObjectURL(await res.blob());
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name}.${format}`;
    a.click();
    URL.revokeObjectURL(url);
}
const synRuns = (id, t)=>request(`/api/synthetic/${id}/runs`, t);
const synRunSql = (id, code, t, reviewer = "")=>request(`/api/synthetic/${id}/runs/sql`, t, {
        method: "POST",
        body: JSON.stringify({
            code
        }),
        ...asUser(reviewer)
    });
const synUploadResult = (id, file, language, code, t, reviewer = "")=>request(`/api/synthetic/${id}/runs/upload`, t, {
        method: "POST",
        body: JSON.stringify({
            files: [
                file
            ],
            language,
            code
        }),
        ...asUser(reviewer)
    });
async function synTestpack(id, language, t, name) {
    const res = await fetch(`${API_BASE}/api/synthetic/${id}/testpack?language=${encodeURIComponent(language)}`, {
        headers: {
            "X-Tenant-Id": t
        }
    });
    if (!res.ok) throw new Error(`Test pack failed (${res.status})`);
    const url = URL.createObjectURL(await res.blob());
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name}.zip`;
    a.click();
    URL.revokeObjectURL(url);
}
const kbCatalog = (t)=>request("/api/knowledge/catalog", t);
const kbCatalogFetch = (ids, t, reviewer = "")=>request("/api/knowledge/catalog/fetch", t, {
        method: "POST",
        body: JSON.stringify({
            ids
        }),
        ...reviewer ? {
            headers: {
                "X-User-Id": reviewer
            }
        } : {}
    });
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend-nextjs/lib/workspace.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EMPTY_SPEC",
    ()=>EMPTY_SPEC,
    "WorkspaceProvider",
    ()=>WorkspaceProvider,
    "useWorkspace",
    ()=>useWorkspace
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/@tanstack/query-core/build/modern/queryClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
const EMPTY_SPEC = {
    reportId: "",
    description: "",
    columnHeading: "",
    logic: "",
    reportScenarios: "",
    sorting: "",
    specTemplate: "merck_cdisc_report_library",
    edcSystem: "veeva",
    language: "cql",
    studyId: "",
    specType: "edc_cdm_listing",
    listingType: "",
    useKnowledge: false,
    objectType: "view",
    tsqlCompat: "conservative"
};
const IDLE = {
    understand: "idle",
    review: "idle",
    generate: "idle"
};
const Ctx = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
const useWorkspace = ()=>{
    _s();
    const v = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(Ctx);
    if (!v) throw new Error("useWorkspace outside provider");
    return v;
};
_s(useWorkspace, "vseRKStixtRCAgA7lJDFgCF8qLI=");
const store = {
    get (key) {
        try {
            return window.localStorage.getItem(key);
        } catch  {
            return null;
        }
    },
    set (key, value) {
        try {
            window.localStorage.setItem(key, value);
        } catch  {
        /* storage can be unavailable; the app works without it */ }
    }
};
function WorkspaceProvider({ children }) {
    _s1();
    const [queryClient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "WorkspaceProvider.useState": ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueryClient"]({
                defaultOptions: {
                    queries: {
                        retry: false,
                        refetchOnWindowFocus: false
                    }
                }
            })
    }["WorkspaceProvider.useState"]);
    const [tenantId, setTenant] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("default");
    const [theme, setTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("light");
    const [sidebarCollapsed, setSidebarCollapsed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [spec, setSpec] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(EMPTY_SPEC);
    const [allowUnverified, setAllowUnverified] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [stages, setStages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(IDLE);
    const [understanding, setUnderstanding] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [review, setReview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [result, setResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [tab, setTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("spec");
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WorkspaceProvider.useEffect": ()=>{
            const t = store.get("s2c_tenant");
            if (t) setTenant(t);
            setSidebarCollapsed(store.get("s2c_sidebar") === "collapsed");
            const th = store.get("s2c_theme");
            const initial = th === "dark" || th === "light" ? th : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
            setTheme(initial);
            const draft = store.get("s2c_spec");
            if (draft) {
                try {
                    setSpec({
                        ...EMPTY_SPEC,
                        ...JSON.parse(draft)
                    });
                } catch  {
                /* ignore a corrupt draft */ }
            }
        }
    }["WorkspaceProvider.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WorkspaceProvider.useEffect": ()=>{
            document.documentElement.dataset.theme = theme;
        }
    }["WorkspaceProvider.useEffect"], [
        theme
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WorkspaceProvider.useEffect": ()=>{
            store.set("s2c_spec", JSON.stringify(spec));
        }
    }["WorkspaceProvider.useEffect"], [
        spec
    ]);
    const resetResults = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WorkspaceProvider.useCallback[resetResults]": ()=>{
            setStages(IDLE);
            setUnderstanding(null);
            setReview(null);
            setResult(null);
            setError(null);
        }
    }["WorkspaceProvider.useCallback[resetResults]"], []);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "WorkspaceProvider.useMemo[value]": ()=>({
                tenantId,
                setTenantId: ({
                    "WorkspaceProvider.useMemo[value]": (v)=>{
                        const n = v.trim() || "default";
                        setTenant(n);
                        store.set("s2c_tenant", n);
                    }
                })["WorkspaceProvider.useMemo[value]"],
                sidebarCollapsed,
                toggleSidebar: ({
                    "WorkspaceProvider.useMemo[value]": ()=>setSidebarCollapsed({
                            "WorkspaceProvider.useMemo[value]": (c)=>{
                                store.set("s2c_sidebar", c ? "open" : "collapsed");
                                return !c;
                            }
                        }["WorkspaceProvider.useMemo[value]"])
                })["WorkspaceProvider.useMemo[value]"],
                theme,
                toggleTheme: ({
                    "WorkspaceProvider.useMemo[value]": ()=>setTheme({
                            "WorkspaceProvider.useMemo[value]": (t)=>{
                                const n = t === "light" ? "dark" : "light";
                                store.set("s2c_theme", n);
                                return n;
                            }
                        }["WorkspaceProvider.useMemo[value]"])
                })["WorkspaceProvider.useMemo[value]"],
                spec,
                // A listing type belongs to one spec type, so changing the spec type clears it.
                patchSpec: ({
                    "WorkspaceProvider.useMemo[value]": (p)=>setSpec({
                            "WorkspaceProvider.useMemo[value]": (s)=>({
                                    ...s,
                                    ...p.specType && p.specType !== s.specType ? {
                                        listingType: ""
                                    } : {},
                                    ...p
                                })
                        }["WorkspaceProvider.useMemo[value]"])
                })["WorkspaceProvider.useMemo[value]"],
                loadSpec: ({
                    "WorkspaceProvider.useMemo[value]": (s)=>{
                        setSpec({
                            ...EMPTY_SPEC,
                            ...s
                        });
                        resetResults();
                        setTab("spec");
                    }
                })["WorkspaceProvider.useMemo[value]"],
                loadModule: ({
                    "WorkspaceProvider.useMemo[value]": (m)=>{
                        setSpec({
                            ...EMPTY_SPEC,
                            ...m.example_spec,
                            specType: m.id
                        });
                        resetResults();
                        setTab("spec");
                    }
                })["WorkspaceProvider.useMemo[value]"],
                allowUnverified,
                setAllowUnverified,
                stages,
                setStage: ({
                    "WorkspaceProvider.useMemo[value]": (k, v)=>setStages({
                            "WorkspaceProvider.useMemo[value]": (s)=>({
                                    ...s,
                                    [k]: v
                                })
                        }["WorkspaceProvider.useMemo[value]"])
                })["WorkspaceProvider.useMemo[value]"],
                understanding,
                setUnderstanding,
                review,
                setReview,
                result,
                setResult,
                resetResults,
                tab,
                setTab,
                error,
                setError
            })
    }["WorkspaceProvider.useMemo[value]"], [
        tenantId,
        theme,
        sidebarCollapsed,
        spec,
        allowUnverified,
        stages,
        understanding,
        review,
        result,
        resetResults,
        tab,
        error
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueryClientProvider"], {
        client: queryClient,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Ctx.Provider, {
            value: value,
            children: children
        }, void 0, false, {
            fileName: "[project]/frontend-nextjs/lib/workspace.tsx",
            lineNumber: 183,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/frontend-nextjs/lib/workspace.tsx",
        lineNumber: 182,
        columnNumber: 5
    }, this);
}
_s1(WorkspaceProvider, "syuro1cq4sX+/NecGpJWdDralrU=");
_c = WorkspaceProvider;
var _c;
__turbopack_context__.k.register(_c, "WorkspaceProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=frontend-nextjs_1bleft-._.js.map