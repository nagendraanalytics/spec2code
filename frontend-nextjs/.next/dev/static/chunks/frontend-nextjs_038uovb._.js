(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/frontend-nextjs/app/knowledge/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>KnowledgePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$workspace$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/lib/workspace.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$knowledge$2f$LibraryTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/components/knowledge/LibraryTab.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$knowledge$2f$PublicTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/components/knowledge/PublicTab.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$knowledge$2f$RagTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/components/knowledge/RagTab.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$knowledge$2f$ReviewTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/components/knowledge/ReviewTab.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$knowledge$2f$RulesTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/components/knowledge/RulesTab.tsx [app-client] (ecmascript)");
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
;
function KnowledgePage() {
    _s();
    const { tenantId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$workspace$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])();
    const [tab, setTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("library");
    const queue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "kb",
            "review",
            tenantId
        ],
        queryFn: {
            "KnowledgePage.useQuery[queue]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["kbReviewQueue"])(tenantId)
        }["KnowledgePage.useQuery[queue]"]
    });
    const waiting = (queue.data?.sources.length ?? 0) + (queue.data?.rules.length ?? 0);
    const tabs = [
        {
            id: "library",
            label: "Library"
        },
        {
            id: "globals",
            label: "Globals"
        },
        {
            id: "sponsor",
            label: "Sponsor knowledge"
        },
        {
            id: "report",
            label: "Report knowledge"
        },
        {
            id: "ta",
            label: "TA knowledge"
        },
        {
            id: "public",
            label: "Public sources"
        },
        {
            id: "rules",
            label: "Rules"
        },
        {
            id: "rag",
            label: "RAG store"
        },
        {
            id: "review",
            label: "Review queue",
            badge: waiting
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mx-auto max-w-[1300px] space-y-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-xl font-semibold tracking-tight",
                        children: "Knowledge"
                    }, void 0, false, {
                        fileName: "[project]/frontend-nextjs/app/knowledge/page.tsx",
                        lineNumber: 28,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-sm text-muted",
                        children: "Standards, protocols, EDC references, SAS programs and history, in any common format. Everything starts as a draft and is only used after a programmer approves it. Studies and metadata live in Study setup."
                    }, void 0, false, {
                        fileName: "[project]/frontend-nextjs/app/knowledge/page.tsx",
                        lineNumber: 29,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend-nextjs/app/knowledge/page.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                role: "tablist",
                "aria-label": "Knowledge sections",
                className: "flex flex-wrap gap-1 border-b border-line",
                children: tabs.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        role: "tab",
                        "aria-selected": tab === t.id,
                        onClick: ()=>setTab(t.id),
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("-mb-px flex items-center gap-2 border-b-2 px-4 py-2 text-sm", tab === t.id ? "border-accent font-medium text-accent" : "border-transparent text-muted hover:text-ink"),
                        children: [
                            t.label,
                            !!t.badge && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "rounded-full bg-warnsoft px-1.5 text-[11px] font-semibold text-warn",
                                children: t.badge
                            }, void 0, false, {
                                fileName: "[project]/frontend-nextjs/app/knowledge/page.tsx",
                                lineNumber: 38,
                                columnNumber: 27
                            }, this)
                        ]
                    }, t.id, true, {
                        fileName: "[project]/frontend-nextjs/app/knowledge/page.tsx",
                        lineNumber: 35,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/frontend-nextjs/app/knowledge/page.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            tab === "library" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$knowledge$2f$LibraryTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                mode: "all"
            }, void 0, false, {
                fileName: "[project]/frontend-nextjs/app/knowledge/page.tsx",
                lineNumber: 42,
                columnNumber: 29
            }, this),
            tab === "globals" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$knowledge$2f$LibraryTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                mode: "global"
            }, void 0, false, {
                fileName: "[project]/frontend-nextjs/app/knowledge/page.tsx",
                lineNumber: 43,
                columnNumber: 29
            }, this),
            tab === "sponsor" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$knowledge$2f$LibraryTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                mode: "sponsor"
            }, void 0, false, {
                fileName: "[project]/frontend-nextjs/app/knowledge/page.tsx",
                lineNumber: 44,
                columnNumber: 29
            }, this),
            tab === "report" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$knowledge$2f$LibraryTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                mode: "report"
            }, void 0, false, {
                fileName: "[project]/frontend-nextjs/app/knowledge/page.tsx",
                lineNumber: 45,
                columnNumber: 28
            }, this),
            tab === "ta" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$knowledge$2f$LibraryTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                mode: "ta"
            }, void 0, false, {
                fileName: "[project]/frontend-nextjs/app/knowledge/page.tsx",
                lineNumber: 46,
                columnNumber: 24
            }, this),
            tab === "public" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$knowledge$2f$PublicTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/frontend-nextjs/app/knowledge/page.tsx",
                lineNumber: 47,
                columnNumber: 28
            }, this),
            tab === "rules" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$knowledge$2f$RulesTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/frontend-nextjs/app/knowledge/page.tsx",
                lineNumber: 48,
                columnNumber: 27
            }, this),
            tab === "rag" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$knowledge$2f$RagTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/frontend-nextjs/app/knowledge/page.tsx",
                lineNumber: 49,
                columnNumber: 25
            }, this),
            tab === "review" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$knowledge$2f$ReviewTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/frontend-nextjs/app/knowledge/page.tsx",
                lineNumber: 50,
                columnNumber: 28
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend-nextjs/app/knowledge/page.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_s(KnowledgePage, "8xLvt1pczPkyQHByWO9YxvdkzeU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$workspace$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
_c = KnowledgePage;
var _c;
__turbopack_context__.k.register(_c, "KnowledgePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend-nextjs/components/knowledge/LibraryTab.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LibraryTab
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/search.mjs [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$workspace$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/lib/workspace.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/components/ui/primitives.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/lib/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$knowledge$2f$SourceDrawer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/components/knowledge/SourceDrawer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$knowledge$2f$UploadPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/components/knowledge/UploadPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$knowledge$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/components/knowledge/shared.tsx [app-client] (ecmascript)");
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
;
function LibraryTab({ mode }) {
    _s();
    const { tenantId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$workspace$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])();
    const stats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "kb",
            "stats",
            tenantId
        ],
        queryFn: {
            "LibraryTab.useQuery[stats]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["kbStats"])(tenantId)
        }["LibraryTab.useQuery[stats]"]
    });
    const [ta, setTa] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [docType, setDocType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [scope, setScope] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [q, setQ] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const tas = stats.data?.tas ?? [];
    const sponsors = stats.data?.sponsors ?? [];
    const reports = stats.data?.reports ?? [];
    const byRef = mode === "ta" || mode === "sponsor" || mode === "report";
    const fixedScope = mode === "all" ? null : mode;
    const effScope = mode === "all" ? scope : mode;
    const listQ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "kb",
            "sources",
            tenantId,
            effScope,
            byRef ? ta : "",
            status,
            docType,
            q
        ],
        queryFn: {
            "LibraryTab.useQuery[listQ]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["kbSources"])(tenantId, {
                    scope: effScope,
                    scopeRef: byRef ? ta : "",
                    status,
                    docType,
                    q
                })
        }["LibraryTab.useQuery[listQ]"]
    });
    const list = listQ.data ?? [];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("datalist", {
                id: "kb-tas",
                children: tas.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                        value: t
                    }, t, false, {
                        fileName: "[project]/frontend-nextjs/components/knowledge/LibraryTab.tsx",
                        lineNumber: 38,
                        columnNumber: 45
                    }, this))
            }, void 0, false, {
                fileName: "[project]/frontend-nextjs/components/knowledge/LibraryTab.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("datalist", {
                id: "kb-sponsors",
                children: sponsors.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                        value: t
                    }, t, false, {
                        fileName: "[project]/frontend-nextjs/components/knowledge/LibraryTab.tsx",
                        lineNumber: 39,
                        columnNumber: 55
                    }, this))
            }, void 0, false, {
                fileName: "[project]/frontend-nextjs/components/knowledge/LibraryTab.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("datalist", {
                id: "kb-reports",
                children: reports.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                        value: t
                    }, t, false, {
                        fileName: "[project]/frontend-nextjs/components/knowledge/LibraryTab.tsx",
                        lineNumber: 40,
                        columnNumber: 53
                    }, this))
            }, void 0, false, {
                fileName: "[project]/frontend-nextjs/components/knowledge/LibraryTab.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this),
            mode === "report" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                        title: "Report",
                        hint: "Knowledge for one report: the SAS program it is being migrated from, notes and supporting documents. Every report is stored in the vector index and found by similarity to the spec being generated, whatever its Report ID. The ID only ranks a report higher when it is the spec's own. Other reports' material reaches the prompt only if it is clearly similar, labelled as a precedent."
                    }, void 0, false, {
                        fileName: "[project]/frontend-nextjs/components/knowledge/LibraryTab.tsx",
                        lineNumber: 43,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center gap-2 p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: ta,
                                onChange: (e)=>setTa(e.target.value),
                                placeholder: "Report ID, e.g. RID002",
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"]} mt-0 max-w-xs`,
                                "aria-label": "Report ID",
                                list: "kb-reports"
                            }, void 0, false, {
                                fileName: "[project]/frontend-nextjs/components/knowledge/LibraryTab.tsx",
                                lineNumber: 45,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-muted",
                                children: [
                                    reports.length,
                                    " report",
                                    reports.length === 1 ? "" : "s",
                                    " have knowledge. Reports get here when a programmer confirms a result as a verified precedent in the Workspace, when you upload files with a Report ID, or with the report import script. Running a report on its own does not store it."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend-nextjs/components/knowledge/LibraryTab.tsx",
                                lineNumber: 46,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend-nextjs/components/knowledge/LibraryTab.tsx",
                        lineNumber: 44,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend-nextjs/components/knowledge/LibraryTab.tsx",
                lineNumber: 42,
                columnNumber: 9
            }, this),
            mode === "sponsor" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                        title: "Sponsor",
                        hint: "Knowledge that applies only to studies of this sponsor: its SAS programs, conventions, SOPs and listing standards. A study picks its sponsor in Study setup. Names match ignoring case."
                    }, void 0, false, {
                        fileName: "[project]/frontend-nextjs/components/knowledge/LibraryTab.tsx",
                        lineNumber: 52,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center gap-2 p-4",
                        children: [
                            sponsors.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setTa(t),
                                    className: `rounded-full border px-3 py-1 text-sm ${ta === t ? "border-accent bg-accentsoft text-accent" : "border-line hover:bg-surface2"}`,
                                    children: t
                                }, t, false, {
                                    fileName: "[project]/frontend-nextjs/components/knowledge/LibraryTab.tsx",
                                    lineNumber: 55,
                                    columnNumber: 15
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: ta,
                                onChange: (e)=>setTa(e.target.value),
                                placeholder: sponsors.length ? "or type a new sponsor" : "Type a sponsor, e.g. Merck",
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"]} mt-0 max-w-xs`,
                                "aria-label": "Sponsor",
                                list: "kb-sponsors"
                            }, void 0, false, {
                                fileName: "[project]/frontend-nextjs/components/knowledge/LibraryTab.tsx",
                                lineNumber: 57,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend-nextjs/components/knowledge/LibraryTab.tsx",
                        lineNumber: 53,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend-nextjs/components/knowledge/LibraryTab.tsx",
                lineNumber: 51,
                columnNumber: 9
            }, this),
            mode === "ta" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                        title: "Therapeutic area",
                        hint: "Knowledge that applies only to studies in this area. A study picks its area in Study setup."
                    }, void 0, false, {
                        fileName: "[project]/frontend-nextjs/components/knowledge/LibraryTab.tsx",
                        lineNumber: 63,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center gap-2 p-4",
                        children: [
                            tas.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setTa(t),
                                    className: `rounded-full border px-3 py-1 text-sm ${ta === t ? "border-accent bg-accentsoft text-accent" : "border-line hover:bg-surface2"}`,
                                    children: t
                                }, t, false, {
                                    fileName: "[project]/frontend-nextjs/components/knowledge/LibraryTab.tsx",
                                    lineNumber: 66,
                                    columnNumber: 15
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: ta,
                                onChange: (e)=>setTa(e.target.value),
                                placeholder: tas.length ? "or type a new area" : "Type an area, e.g. Oncology",
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"]} mt-0 max-w-xs`,
                                "aria-label": "Therapeutic area",
                                list: "kb-tas"
                            }, void 0, false, {
                                fileName: "[project]/frontend-nextjs/components/knowledge/LibraryTab.tsx",
                                lineNumber: 68,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend-nextjs/components/knowledge/LibraryTab.tsx",
                        lineNumber: 64,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend-nextjs/components/knowledge/LibraryTab.tsx",
                lineNumber: 62,
                columnNumber: 9
            }, this),
            (!byRef || ta.trim()) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$knowledge$2f$UploadPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                scope: fixedScope,
                scopeRef: ta.trim(),
                defaultDocType: ""
            }, void 0, false, {
                fileName: "[project]/frontend-nextjs/components/knowledge/LibraryTab.tsx",
                lineNumber: 72,
                columnNumber: 33
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                        title: `${mode === "report" ? ta ? `${ta} knowledge` : "Report knowledge" : mode === "sponsor" ? ta ? `${ta} knowledge` : "Sponsor knowledge" : mode === "ta" ? ta ? `${ta} knowledge` : "Therapeutic-area knowledge" : mode === "global" ? "Global knowledge" : "All sources"} (${list.length})`,
                        hint: "Only approved sources are used in retrieval."
                    }, void 0, false, {
                        fileName: "[project]/frontend-nextjs/components/knowledge/LibraryTab.tsx",
                        lineNumber: 75,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center gap-2 border-b border-line p-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative w-full sm:w-64",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                        size: 14,
                                        className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted",
                                        "aria-hidden": true
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/components/knowledge/LibraryTab.tsx",
                                        lineNumber: 81,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: q,
                                        onChange: (e)=>setQ(e.target.value),
                                        placeholder: "Search title or file",
                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"]} mt-0 py-1.5 pl-8`,
                                        "aria-label": "Search sources"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/components/knowledge/LibraryTab.tsx",
                                        lineNumber: 82,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend-nextjs/components/knowledge/LibraryTab.tsx",
                                lineNumber: 80,
                                columnNumber: 11
                            }, this),
                            mode === "all" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: scope,
                                onChange: (e)=>setScope(e.target.value),
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"]} mt-0 w-auto py-1.5`,
                                "aria-label": "Scope filter",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "",
                                        children: "All scopes"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/components/knowledge/LibraryTab.tsx",
                                        lineNumber: 86,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "global",
                                        children: "Global"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/components/knowledge/LibraryTab.tsx",
                                        lineNumber: 86,
                                        columnNumber: 51
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "sponsor",
                                        children: "Sponsor"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/components/knowledge/LibraryTab.tsx",
                                        lineNumber: 86,
                                        columnNumber: 89
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "ta",
                                        children: "Therapeutic area"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/components/knowledge/LibraryTab.tsx",
                                        lineNumber: 86,
                                        columnNumber: 129
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "study",
                                        children: "Study"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/components/knowledge/LibraryTab.tsx",
                                        lineNumber: 86,
                                        columnNumber: 173
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "report",
                                        children: "Report"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/components/knowledge/LibraryTab.tsx",
                                        lineNumber: 86,
                                        columnNumber: 209
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend-nextjs/components/knowledge/LibraryTab.tsx",
                                lineNumber: 85,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: docType,
                                onChange: (e)=>setDocType(e.target.value),
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"]} mt-0 w-auto py-1.5`,
                                "aria-label": "Type filter",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "",
                                        children: "All types"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/components/knowledge/LibraryTab.tsx",
                                        lineNumber: 90,
                                        columnNumber: 13
                                    }, this),
                                    Object.keys(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DOC_TYPE_LABEL"]).map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: d,
                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DOC_TYPE_LABEL"][d]
                                        }, d, false, {
                                            fileName: "[project]/frontend-nextjs/components/knowledge/LibraryTab.tsx",
                                            lineNumber: 91,
                                            columnNumber: 68
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend-nextjs/components/knowledge/LibraryTab.tsx",
                                lineNumber: 89,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: status,
                                onChange: (e)=>setStatus(e.target.value),
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"]} mt-0 w-auto py-1.5`,
                                "aria-label": "Status filter",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "",
                                        children: "Any status"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/components/knowledge/LibraryTab.tsx",
                                        lineNumber: 94,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "draft",
                                        children: "Draft"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/components/knowledge/LibraryTab.tsx",
                                        lineNumber: 94,
                                        columnNumber: 49
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "approved",
                                        children: "Approved"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/components/knowledge/LibraryTab.tsx",
                                        lineNumber: 94,
                                        columnNumber: 85
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "retired",
                                        children: "Retired"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/components/knowledge/LibraryTab.tsx",
                                        lineNumber: 94,
                                        columnNumber: 127
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend-nextjs/components/knowledge/LibraryTab.tsx",
                                lineNumber: 93,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend-nextjs/components/knowledge/LibraryTab.tsx",
                        lineNumber: 79,
                        columnNumber: 9
                    }, this),
                    listQ.isError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "p-4 text-sm text-bad",
                        children: String(listQ.error)
                    }, void 0, false, {
                        fileName: "[project]/frontend-nextjs/components/knowledge/LibraryTab.tsx",
                        lineNumber: 97,
                        columnNumber: 27
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "divide-y divide-line",
                        children: [
                            list.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setOpen(s.id),
                                        className: "flex w-full flex-wrap items-center gap-3 px-4 py-2.5 text-left hover:bg-surface2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "min-w-0 flex-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "block truncate text-sm font-medium",
                                                        children: s.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend-nextjs/components/knowledge/LibraryTab.tsx",
                                                        lineNumber: 103,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "block truncate text-xs text-muted",
                                                        children: [
                                                            s.filename,
                                                            " · ",
                                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$knowledge$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fmtSize"])(s.sizeBytes),
                                                            " · ",
                                                            s.chunks,
                                                            " chunks",
                                                            s.standardVersion ? ` · ${s.standardVersion}` : ""
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/frontend-nextjs/components/knowledge/LibraryTab.tsx",
                                                        lineNumber: 104,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend-nextjs/components/knowledge/LibraryTab.tsx",
                                                lineNumber: 102,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DOC_TYPE_LABEL"][s.docType]
                                            }, void 0, false, {
                                                fileName: "[project]/frontend-nextjs/components/knowledge/LibraryTab.tsx",
                                                lineNumber: 106,
                                                columnNumber: 17
                                            }, this),
                                            mode !== "global" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                tone: "accent",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$knowledge$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scopeLabel"])(s.scope, s.scopeRef)
                                            }, void 0, false, {
                                                fileName: "[project]/frontend-nextjs/components/knowledge/LibraryTab.tsx",
                                                lineNumber: 107,
                                                columnNumber: 39
                                            }, this),
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$knowledge$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extractBadge"])(s),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$knowledge$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatusBadge"], {
                                                status: s.status
                                            }, void 0, false, {
                                                fileName: "[project]/frontend-nextjs/components/knowledge/LibraryTab.tsx",
                                                lineNumber: 109,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend-nextjs/components/knowledge/LibraryTab.tsx",
                                        lineNumber: 101,
                                        columnNumber: 15
                                    }, this)
                                }, s.id, false, {
                                    fileName: "[project]/frontend-nextjs/components/knowledge/LibraryTab.tsx",
                                    lineNumber: 100,
                                    columnNumber: 13
                                }, this)),
                            list.length === 0 && !listQ.isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "px-4 py-10 text-center text-sm text-muted",
                                children: byRef && !ta ? `Choose or type a ${mode === "report" ? "report ID" : mode === "sponsor" ? "sponsor" : "therapeutic area"} to see and add its knowledge.` : "Nothing here yet. Add documents above."
                            }, void 0, false, {
                                fileName: "[project]/frontend-nextjs/components/knowledge/LibraryTab.tsx",
                                lineNumber: 113,
                                columnNumber: 53
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend-nextjs/components/knowledge/LibraryTab.tsx",
                        lineNumber: 98,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend-nextjs/components/knowledge/LibraryTab.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$knowledge$2f$SourceDrawer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: open,
                onClose: ()=>setOpen(null)
            }, void 0, false, {
                fileName: "[project]/frontend-nextjs/components/knowledge/LibraryTab.tsx",
                lineNumber: 116,
                columnNumber: 16
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend-nextjs/components/knowledge/LibraryTab.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
_s(LibraryTab, "9wN5E8MVPX+wbs74bM4xqD+7Knc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$workspace$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
_c = LibraryTab;
var _c;
__turbopack_context__.k.register(_c, "LibraryTab");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend-nextjs/components/knowledge/PublicTab.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PublicTab
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
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
const SCOPE = {
    global: "Global",
    sponsor: "Sponsor",
    ta: "Therapeutic area",
    study: "Study",
    report: "Report"
};
const ACCESS = {
    open: [
        "good",
        "Open access"
    ],
    login: [
        "bad",
        "Needs a login"
    ],
    check: [
        "warn",
        "Terms to check"
    ]
};
function PublicTab() {
    _s();
    const { tenantId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$workspace$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])();
    const qc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "kb",
            "catalog",
            tenantId
        ],
        queryFn: {
            "PublicTab.useQuery[q]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["kbCatalog"])(tenantId)
        }["PublicTab.useQuery[q]"]
    });
    const [picked, setPicked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [results, setResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [note, setNote] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const fetchIt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "PublicTab.useMutation[fetchIt]": (ids)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["kbCatalogFetch"])(ids, tenantId, ({
                    "PublicTab.useMutation[fetchIt]": ()=>{
                        try {
                            return localStorage.getItem("s2c.reviewer") ?? "";
                        } catch  {
                            return "";
                        }
                    }
                })["PublicTab.useMutation[fetchIt]"]())
        }["PublicTab.useMutation[fetchIt]"],
        onSuccess: {
            "PublicTab.useMutation[fetchIt]": (r)=>{
                setResults({
                    "PublicTab.useMutation[fetchIt]": (p)=>({
                            ...p,
                            ...Object.fromEntries(r.results.map({
                                "PublicTab.useMutation[fetchIt]": (x)=>[
                                        x.id,
                                        x
                                    ]
                            }["PublicTab.useMutation[fetchIt]"]))
                        })
                }["PublicTab.useMutation[fetchIt]"]);
                setNote(r.note);
                setPicked({});
                qc.invalidateQueries({
                    queryKey: [
                        "kb"
                    ]
                });
            }
        }["PublicTab.useMutation[fetchIt]"]
    });
    const entries = q.data?.entries ?? [];
    const fetchable = entries.filter((e)=>e.kind === "file" && !e.inLibrary);
    const chosen = Object.keys(picked).filter((k)=>picked[k]);
    const row = (e)=>{
        const r = results[e.id];
        const [tone, label] = ACCESS[e.access];
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
            className: "space-y-1 px-4 py-3 text-sm",
            "data-testid": "catalog-row",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-wrap items-center gap-2",
                    children: [
                        e.kind === "file" && !e.inLibrary && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "checkbox",
                            checked: !!picked[e.id],
                            onChange: (ev)=>setPicked({
                                    ...picked,
                                    [e.id]: ev.target.checked
                                }),
                            "aria-label": `Select ${e.title}`
                        }, void 0, false, {
                            fileName: "[project]/frontend-nextjs/components/knowledge/PublicTab.tsx",
                            lineNumber: 39,
                            columnNumber: 49
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-medium",
                            children: e.title
                        }, void 0, false, {
                            fileName: "[project]/frontend-nextjs/components/knowledge/PublicTab.tsx",
                            lineNumber: 40,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                            tone: tone,
                            children: label
                        }, void 0, false, {
                            fileName: "[project]/frontend-nextjs/components/knowledge/PublicTab.tsx",
                            lineNumber: 41,
                            columnNumber: 11
                        }, this),
                        e.kind === "file" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                            tone: "accent",
                            children: "Fetched by the app"
                        }, void 0, false, {
                            fileName: "[project]/frontend-nextjs/components/knowledge/PublicTab.tsx",
                            lineNumber: 42,
                            columnNumber: 32
                        }, this) : e.kind === "pack" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                            children: "Built from GitHub, then uploaded"
                        }, void 0, false, {
                            fileName: "[project]/frontend-nextjs/components/knowledge/PublicTab.tsx",
                            lineNumber: 42,
                            columnNumber: 102
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                            children: "Download by hand, then upload"
                        }, void 0, false, {
                            fileName: "[project]/frontend-nextjs/components/knowledge/PublicTab.tsx",
                            lineNumber: 42,
                            columnNumber: 152
                        }, this),
                        e.inLibrary && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                            tone: "good",
                            children: "In your library"
                        }, void 0, false, {
                            fileName: "[project]/frontend-nextjs/components/knowledge/PublicTab.tsx",
                            lineNumber: 43,
                            columnNumber: 27
                        }, this),
                        e.scopeRef && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                            children: [
                                SCOPE[e.scope],
                                ": ",
                                e.scopeRef
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend-nextjs/components/knowledge/PublicTab.tsx",
                            lineNumber: 44,
                            columnNumber: 26
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend-nextjs/components/knowledge/PublicTab.tsx",
                    lineNumber: 38,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xs text-muted",
                    children: e.note
                }, void 0, false, {
                    fileName: "[project]/frontend-nextjs/components/knowledge/PublicTab.tsx",
                    lineNumber: 46,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xs text-muted",
                    children: [
                        e.url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            className: "text-accent underline",
                            href: e.url,
                            target: "_blank",
                            rel: "noreferrer",
                            children: e.url
                        }, void 0, false, {
                            fileName: "[project]/frontend-nextjs/components/knowledge/PublicTab.tsx",
                            lineNumber: 48,
                            columnNumber: 20
                        }, this) : "No link verified. Search for the title.",
                        " · ",
                        e.verified ? "Link read from an official page" : "Link not verified",
                        ": ",
                        e.verifiedHow
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend-nextjs/components/knowledge/PublicTab.tsx",
                    lineNumber: 47,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xs text-muted",
                    children: [
                        "Terms: ",
                        e.licence
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend-nextjs/components/knowledge/PublicTab.tsx",
                    lineNumber: 51,
                    columnNumber: 9
                }, this),
                r && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: r.ok ? "text-xs text-good" : "text-xs text-bad",
                    children: r.ok ? r.duplicate ? "Already in the library (same file)." : `Stored as a draft (${r.chunks} chunks).` : r.error
                }, void 0, false, {
                    fileName: "[project]/frontend-nextjs/components/knowledge/PublicTab.tsx",
                    lineNumber: 52,
                    columnNumber: 15
                }, this)
            ]
        }, e.id, true, {
            fileName: "[project]/frontend-nextjs/components/knowledge/PublicTab.tsx",
            lineNumber: 37,
            columnNumber: 7
        }, this);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "max-w-3xl text-sm text-muted",
                children: "Public reference material for all listing types. The app fetches the open files itself, from the machine it runs on, which needs internet access. Everything else is listed with where to get it. Fetched files are drafts: review and approve them in the Review queue. Your own studies' protocols and metadata are private and never come from here."
            }, void 0, false, {
                fileName: "[project]/frontend-nextjs/components/knowledge/PublicTab.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            q.isError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "rounded-lg bg-badsoft p-3 text-sm text-bad",
                children: String(q.error)
            }, void 0, false, {
                fileName: "[project]/frontend-nextjs/components/knowledge/PublicTab.tsx",
                lineNumber: 62,
                columnNumber: 21
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        onClick: ()=>setPicked(Object.fromEntries(fetchable.map((e)=>[
                                    e.id,
                                    true
                                ]))),
                        children: [
                            "Select all fetchable (",
                            fetchable.length,
                            ")"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend-nextjs/components/knowledge/PublicTab.tsx",
                        lineNumber: 64,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "primary",
                        disabled: !chosen.length || fetchIt.isPending,
                        onClick: ()=>fetchIt.mutate(chosen),
                        children: fetchIt.isPending ? "Fetching" : `Fetch ${chosen.length || "selected"}`
                    }, void 0, false, {
                        fileName: "[project]/frontend-nextjs/components/knowledge/PublicTab.tsx",
                        lineNumber: 65,
                        columnNumber: 9
                    }, this),
                    fetchIt.isError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm text-bad",
                        children: String(fetchIt.error)
                    }, void 0, false, {
                        fileName: "[project]/frontend-nextjs/components/knowledge/PublicTab.tsx",
                        lineNumber: 66,
                        columnNumber: 29
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend-nextjs/components/knowledge/PublicTab.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this),
            note && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "rounded-lg bg-goodsoft p-2 text-sm text-good",
                children: note
            }, void 0, false, {
                fileName: "[project]/frontend-nextjs/components/knowledge/PublicTab.tsx",
                lineNumber: 68,
                columnNumber: 16
            }, this),
            [
                "global",
                "sponsor",
                "ta",
                "study",
                "report"
            ].map((sc)=>{
                const list = entries.filter((e)=>e.scope === sc);
                return list.length === 0 ? null : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                            title: SCOPE[sc]
                        }, void 0, false, {
                            fileName: "[project]/frontend-nextjs/components/knowledge/PublicTab.tsx",
                            lineNumber: 73,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            className: "divide-y divide-line",
                            children: list.map(row)
                        }, void 0, false, {
                            fileName: "[project]/frontend-nextjs/components/knowledge/PublicTab.tsx",
                            lineNumber: 74,
                            columnNumber: 13
                        }, this)
                    ]
                }, sc, true, {
                    fileName: "[project]/frontend-nextjs/components/knowledge/PublicTab.tsx",
                    lineNumber: 72,
                    columnNumber: 11
                }, this);
            }),
            q.data && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-muted",
                children: [
                    "Allowed download hosts: ",
                    q.data.hosts.join(", "),
                    ". Add others with SPEC2CODE_FETCH_HOSTS."
                ]
            }, void 0, true, {
                fileName: "[project]/frontend-nextjs/components/knowledge/PublicTab.tsx",
                lineNumber: 78,
                columnNumber: 18
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend-nextjs/components/knowledge/PublicTab.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
_s(PublicTab, "MlV46Ol/k+grRenXMkFbCefVA5A=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$workspace$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
_c = PublicTab;
var _c;
__turbopack_context__.k.register(_c, "PublicTab");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend-nextjs/components/knowledge/RagTab.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RagTab
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/triangle-alert.mjs [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/loader-circle.mjs [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/refresh-cw.mjs [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/search.mjs [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$workspace$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/lib/workspace.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$useStudies$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/lib/useStudies.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/components/ui/primitives.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/lib/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$knowledge$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/components/knowledge/shared.tsx [app-client] (ecmascript)");
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
function RagTab() {
    _s();
    const { tenantId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$workspace$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])();
    const qc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    const studies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$useStudies$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStudies"])();
    const stats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "kb",
            "stats",
            tenantId
        ],
        queryFn: {
            "RagTab.useQuery[stats]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["kbStats"])(tenantId)
        }["RagTab.useQuery[stats]"]
    });
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [studyId, setStudyId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [ta, setTa] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [edc, setEdc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [types, setTypes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [topK, setTopK] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(5);
    const [drafts, setDrafts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [res, setRes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [note, setNote] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    async function run() {
        setBusy("search");
        setError(null);
        try {
            setRes(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["kbSearch"])({
                query,
                studyId,
                ta,
                edcSystem: edc,
                docTypes: types,
                topK,
                includeUnapproved: drafts
            }, tenantId));
        } catch (e) {
            setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$knowledge$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["errText"])(e));
        } finally{
            setBusy("");
        }
    }
    async function reindex() {
        setBusy("reindex");
        setError(null);
        setNote(null);
        try {
            const r = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["kbReindex"])(tenantId);
            setNote(`Re-embedded ${r.chunks} chunks with ${r.backend}.`);
            await qc.invalidateQueries({
                queryKey: [
                    "kb"
                ]
            });
        } catch (e) {
            setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$knowledge$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["errText"])(e));
        } finally{
            setBusy("");
        }
    }
    const s = stats.data;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                        title: "RAG store",
                        hint: "The searchable index behind approved knowledge. Use the tester to see exactly what a run would retrieve and why anything was left out.",
                        right: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "secondary",
                            onClick: reindex,
                            disabled: busy !== "",
                            children: [
                                busy === "reindex" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                    size: 15,
                                    className: "animate-spin",
                                    "aria-hidden": true
                                }, void 0, false, {
                                    fileName: "[project]/frontend-nextjs/components/knowledge/RagTab.tsx",
                                    lineNumber: 46,
                                    columnNumber: 109
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                    size: 15,
                                    "aria-hidden": true
                                }, void 0, false, {
                                    fileName: "[project]/frontend-nextjs/components/knowledge/RagTab.tsx",
                                    lineNumber: 46,
                                    columnNumber: 170
                                }, this),
                                " Reindex"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend-nextjs/components/knowledge/RagTab.tsx",
                            lineNumber: 46,
                            columnNumber: 18
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/frontend-nextjs/components/knowledge/RagTab.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3 p-4",
                        children: [
                            s && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-2 text-xs",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                        children: [
                                            s.sources,
                                            " sources"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend-nextjs/components/knowledge/RagTab.tsx",
                                        lineNumber: 50,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                        children: [
                                            s.chunks,
                                            " chunks"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend-nextjs/components/knowledge/RagTab.tsx",
                                        lineNumber: 50,
                                        columnNumber: 49
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                        tone: "good",
                                        children: [
                                            s.byStatus.approved ?? 0,
                                            " approved"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend-nextjs/components/knowledge/RagTab.tsx",
                                        lineNumber: 51,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                        tone: "warn",
                                        children: [
                                            s.byStatus.draft ?? 0,
                                            " draft"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend-nextjs/components/knowledge/RagTab.tsx",
                                        lineNumber: 51,
                                        columnNumber: 77
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                        tone: "accent",
                                        children: [
                                            "Embeddings: ",
                                            s.embedBackend
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend-nextjs/components/knowledge/RagTab.tsx",
                                        lineNumber: 52,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend-nextjs/components/knowledge/RagTab.tsx",
                                lineNumber: 49,
                                columnNumber: 13
                            }, this),
                            s?.lexicalOnly && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "flex gap-2 rounded-lg bg-warnsoft p-3 text-xs text-warn",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                        size: 14,
                                        className: "mt-0.5 shrink-0",
                                        "aria-hidden": true
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/components/knowledge/RagTab.tsx",
                                        lineNumber: 57,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Retrieval currently matches shared words, not meaning, because no embedding model is configured. Set SPEC2CODE_EMBED_MODEL to a local sentence-transformers model and press Reindex for semantic matching."
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/components/knowledge/RagTab.tsx",
                                        lineNumber: 58,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend-nextjs/components/knowledge/RagTab.tsx",
                                lineNumber: 56,
                                columnNumber: 13
                            }, this),
                            note && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "rounded-lg bg-goodsoft p-3 text-xs text-good",
                                children: note
                            }, void 0, false, {
                                fileName: "[project]/frontend-nextjs/components/knowledge/RagTab.tsx",
                                lineNumber: 61,
                                columnNumber: 20
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend-nextjs/components/knowledge/RagTab.tsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend-nextjs/components/knowledge/RagTab.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                        title: "Retrieval tester"
                    }, void 0, false, {
                        fileName: "[project]/frontend-nextjs/components/knowledge/RagTab.tsx",
                        lineNumber: 66,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3 p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                value: query,
                                onChange: (e)=>setQuery(e.target.value),
                                rows: 3,
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"],
                                placeholder: "Paste a spec's logic or ask a question, e.g. how are deleted forms handled",
                                "aria-label": "Query"
                            }, void 0, false, {
                                fileName: "[project]/frontend-nextjs/components/knowledge/RagTab.tsx",
                                lineNumber: 68,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-xs font-medium text-muted",
                                        children: [
                                            "Study",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: studyId,
                                                onChange: (e)=>setStudyId(e.target.value),
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"],
                                                "aria-label": "Study",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "",
                                                        children: "No study"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend-nextjs/components/knowledge/RagTab.tsx",
                                                        lineNumber: 72,
                                                        columnNumber: 17
                                                    }, this),
                                                    studies.data?.map((x)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: x.studyId,
                                                            children: [
                                                                x.studyId,
                                                                x.ta || x.sponsor ? ` (${[
                                                                    x.sponsor,
                                                                    x.ta
                                                                ].filter(Boolean).join(" · ")})` : ""
                                                            ]
                                                        }, x.studyId, true, {
                                                            fileName: "[project]/frontend-nextjs/components/knowledge/RagTab.tsx",
                                                            lineNumber: 73,
                                                            columnNumber: 43
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend-nextjs/components/knowledge/RagTab.tsx",
                                                lineNumber: 71,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend-nextjs/components/knowledge/RagTab.tsx",
                                        lineNumber: 70,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-xs font-medium text-muted",
                                        children: [
                                            "Therapeutic area (overrides the study's)",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                value: ta,
                                                onChange: (e)=>setTa(e.target.value),
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"],
                                                list: "kb-tas",
                                                placeholder: "optional"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend-nextjs/components/knowledge/RagTab.tsx",
                                                lineNumber: 77,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend-nextjs/components/knowledge/RagTab.tsx",
                                        lineNumber: 76,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-xs font-medium text-muted",
                                        children: [
                                            "EDC system id",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                value: edc,
                                                onChange: (e)=>setEdc(e.target.value),
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"],
                                                placeholder: "e.g. rave"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend-nextjs/components/knowledge/RagTab.tsx",
                                                lineNumber: 80,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend-nextjs/components/knowledge/RagTab.tsx",
                                        lineNumber: 79,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-xs font-medium text-muted",
                                        children: [
                                            "Results",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                min: 1,
                                                max: 50,
                                                value: topK,
                                                onChange: (e)=>setTopK(Number(e.target.value) || 5),
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"]
                                            }, void 0, false, {
                                                fileName: "[project]/frontend-nextjs/components/knowledge/RagTab.tsx",
                                                lineNumber: 83,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend-nextjs/components/knowledge/RagTab.tsx",
                                        lineNumber: 82,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend-nextjs/components/knowledge/RagTab.tsx",
                                lineNumber: 69,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("datalist", {
                                id: "kb-tas",
                                children: (s?.tas ?? []).map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: t
                                    }, t, false, {
                                        fileName: "[project]/frontend-nextjs/components/knowledge/RagTab.tsx",
                                        lineNumber: 86,
                                        columnNumber: 60
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/frontend-nextjs/components/knowledge/RagTab.tsx",
                                lineNumber: 86,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center gap-3 text-xs",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        multiple: true,
                                        value: types,
                                        onChange: (e)=>setTypes(Array.from(e.target.selectedOptions).map((o)=>o.value)),
                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"]} mt-0 h-20 w-56`,
                                        "aria-label": "Document types",
                                        children: Object.keys(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DOC_TYPE_LABEL"]).map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: d,
                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DOC_TYPE_LABEL"][d]
                                            }, d, false, {
                                                fileName: "[project]/frontend-nextjs/components/knowledge/RagTab.tsx",
                                                lineNumber: 89,
                                                columnNumber: 70
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/components/knowledge/RagTab.tsx",
                                        lineNumber: 88,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-muted",
                                        children: "Hold Ctrl to pick several types, or leave empty for all."
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/components/knowledge/RagTab.tsx",
                                        lineNumber: 91,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "flex items-center gap-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "checkbox",
                                                className: "h-4 w-4 accent-[var(--accent)]",
                                                checked: drafts,
                                                onChange: (e)=>setDrafts(e.target.checked)
                                            }, void 0, false, {
                                                fileName: "[project]/frontend-nextjs/components/knowledge/RagTab.tsx",
                                                lineNumber: 92,
                                                columnNumber: 58
                                            }, this),
                                            " Include drafts"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend-nextjs/components/knowledge/RagTab.tsx",
                                        lineNumber: 92,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "primary",
                                        className: "ml-auto",
                                        onClick: run,
                                        disabled: busy !== "" || !query.trim(),
                                        children: [
                                            busy === "search" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                size: 15,
                                                className: "animate-spin",
                                                "aria-hidden": true
                                            }, void 0, false, {
                                                fileName: "[project]/frontend-nextjs/components/knowledge/RagTab.tsx",
                                                lineNumber: 93,
                                                columnNumber: 134
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                                size: 15,
                                                "aria-hidden": true
                                            }, void 0, false, {
                                                fileName: "[project]/frontend-nextjs/components/knowledge/RagTab.tsx",
                                                lineNumber: 93,
                                                columnNumber: 195
                                            }, this),
                                            " Search"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend-nextjs/components/knowledge/RagTab.tsx",
                                        lineNumber: 93,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend-nextjs/components/knowledge/RagTab.tsx",
                                lineNumber: 87,
                                columnNumber: 11
                            }, this),
                            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "rounded-lg bg-badsoft p-3 text-sm text-bad",
                                role: "alert",
                                children: error
                            }, void 0, false, {
                                fileName: "[project]/frontend-nextjs/components/knowledge/RagTab.tsx",
                                lineNumber: 95,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend-nextjs/components/knowledge/RagTab.tsx",
                        lineNumber: 67,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend-nextjs/components/knowledge/RagTab.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, this),
            res && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                        title: `Retrieved (${res.results.length} of ${res.candidates} eligible chunks)`,
                        hint: `Therapeutic area used: ${res.ta || "none"} · embeddings ${res.backend}`
                    }, void 0, false, {
                        fileName: "[project]/frontend-nextjs/components/knowledge/RagTab.tsx",
                        lineNumber: 101,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3 p-4",
                        children: [
                            res.warning && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "rounded-lg bg-warnsoft p-3 text-xs text-warn",
                                children: res.warning
                            }, void 0, false, {
                                fileName: "[project]/frontend-nextjs/components/knowledge/RagTab.tsx",
                                lineNumber: 103,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "space-y-2",
                                children: [
                                    res.results.map((h, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "rounded-lg border border-line p-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mb-1 flex flex-wrap items-center gap-2 text-xs",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-semibold",
                                                            children: [
                                                                i + 1,
                                                                ". ",
                                                                h.title
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/frontend-nextjs/components/knowledge/RagTab.tsx",
                                                            lineNumber: 108,
                                                            columnNumber: 21
                                                        }, this),
                                                        h.heading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                            children: h.heading
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend-nextjs/components/knowledge/RagTab.tsx",
                                                            lineNumber: 109,
                                                            columnNumber: 35
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                            tone: "accent",
                                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$knowledge$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scopeLabel"])(h.scope, h.scopeRef)
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend-nextjs/components/knowledge/RagTab.tsx",
                                                            lineNumber: 110,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DOC_TYPE_LABEL"][h.docType]
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend-nextjs/components/knowledge/RagTab.tsx",
                                                            lineNumber: 111,
                                                            columnNumber: 21
                                                        }, this),
                                                        h.status !== "approved" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                            tone: "warn",
                                                            children: h.status
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend-nextjs/components/knowledge/RagTab.tsx",
                                                            lineNumber: 112,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "ml-auto tabular-nums text-muted",
                                                            title: `vector ${h.vectorScore}, keyword ${h.keywordScore}`,
                                                            children: [
                                                                "score ",
                                                                h.score.toFixed(3)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/frontend-nextjs/components/knowledge/RagTab.tsx",
                                                            lineNumber: 113,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend-nextjs/components/knowledge/RagTab.tsx",
                                                    lineNumber: 107,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "whitespace-pre-wrap text-xs leading-relaxed text-muted",
                                                    children: h.text.length > 700 ? h.text.slice(0, 700) + "…" : h.text
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend-nextjs/components/knowledge/RagTab.tsx",
                                                    lineNumber: 115,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, h.chunkId, true, {
                                            fileName: "[project]/frontend-nextjs/components/knowledge/RagTab.tsx",
                                            lineNumber: 106,
                                            columnNumber: 17
                                        }, this)),
                                    res.results.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: "py-6 text-center text-sm text-muted",
                                        children: "Nothing approved and in scope matches this query."
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/components/knowledge/RagTab.tsx",
                                        lineNumber: 118,
                                        columnNumber: 44
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend-nextjs/components/knowledge/RagTab.tsx",
                                lineNumber: 104,
                                columnNumber: 13
                            }, this),
                            res.excluded.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("details", {
                                className: "rounded-lg bg-surface2 p-3 text-xs",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("summary", {
                                        className: "cursor-pointer font-medium",
                                        children: [
                                            "Left out (",
                                            res.excluded.length,
                                            " sources) and why"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend-nextjs/components/knowledge/RagTab.tsx",
                                        lineNumber: 122,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "mt-2 space-y-1",
                                        children: res.excluded.map((e)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-medium",
                                                        children: e.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend-nextjs/components/knowledge/RagTab.tsx",
                                                        lineNumber: 123,
                                                        columnNumber: 94
                                                    }, this),
                                                    " ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-muted",
                                                        children: [
                                                            "(",
                                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$knowledge$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scopeLabel"])(e.scope, e.scopeRef),
                                                            "): ",
                                                            e.reason
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/frontend-nextjs/components/knowledge/RagTab.tsx",
                                                        lineNumber: 123,
                                                        columnNumber: 141
                                                    }, this)
                                                ]
                                            }, e.sourceId, true, {
                                                fileName: "[project]/frontend-nextjs/components/knowledge/RagTab.tsx",
                                                lineNumber: 123,
                                                columnNumber: 73
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/components/knowledge/RagTab.tsx",
                                        lineNumber: 123,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend-nextjs/components/knowledge/RagTab.tsx",
                                lineNumber: 121,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend-nextjs/components/knowledge/RagTab.tsx",
                        lineNumber: 102,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend-nextjs/components/knowledge/RagTab.tsx",
                lineNumber: 100,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend-nextjs/components/knowledge/RagTab.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
_s(RagTab, "BIiaM72siGezFbkOEQeVeSRqX/E=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$workspace$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$useStudies$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStudies"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
_c = RagTab;
var _c;
__turbopack_context__.k.register(_c, "RagTab");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend-nextjs/components/knowledge/ReviewTab.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ReviewTab
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/circle-check.mjs [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardCheck$3e$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/clipboard-check.mjs [app-client] (ecmascript) <export default as ClipboardCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$workspace$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/lib/workspace.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/components/ui/primitives.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/lib/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$knowledge$2f$SourceDrawer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/components/knowledge/SourceDrawer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$knowledge$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/components/knowledge/shared.tsx [app-client] (ecmascript)");
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
function ReviewTab() {
    _s();
    const { tenantId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$workspace$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])();
    const qc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "kb",
            "review",
            tenantId
        ],
        queryFn: {
            "ReviewTab.useQuery[q]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["kbReviewQueue"])(tenantId)
        }["ReviewTab.useQuery[q]"]
    });
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const done = ()=>qc.invalidateQueries({
            queryKey: [
                "kb"
            ]
        });
    const approveSource = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "ReviewTab.useMutation[approveSource]": (id)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["kbAction"])(id, "approve", tenantId)
        }["ReviewTab.useMutation[approveSource]"],
        onSuccess: done,
        onError: {
            "ReviewTab.useMutation[approveSource]": (e)=>setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$knowledge$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["errText"])(e))
        }["ReviewTab.useMutation[approveSource]"]
    });
    const approveRule = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "ReviewTab.useMutation[approveRule]": (id)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ruleAction"])(id, "approve", tenantId)
        }["ReviewTab.useMutation[approveRule]"],
        onSuccess: done,
        onError: {
            "ReviewTab.useMutation[approveRule]": (e)=>setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$knowledge$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["errText"])(e) + " Open the Rules tab to see which tests fail.")
        }["ReviewTab.useMutation[approveRule]"]
    });
    const d = q.data;
    const empty = d && d.sources.length === 0 && d.rules.length === 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                        title: "Review queue",
                        hint: "Nothing here influences a run until a programmer approves it. Open a source to check what was read before approving."
                    }, void 0, false, {
                        fileName: "[project]/frontend-nextjs/components/knowledge/ReviewTab.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "m-4 rounded-lg bg-badsoft p-3 text-sm text-bad",
                        role: "alert",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/frontend-nextjs/components/knowledge/ReviewTab.tsx",
                        lineNumber: 32,
                        columnNumber: 19
                    }, this),
                    empty && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col items-center gap-2 px-6 py-12 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid h-11 w-11 place-items-center rounded-2xl bg-goodsoft text-good",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                    size: 20,
                                    "aria-hidden": true
                                }, void 0, false, {
                                    fileName: "[project]/frontend-nextjs/components/knowledge/ReviewTab.tsx",
                                    lineNumber: 35,
                                    columnNumber: 98
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/frontend-nextjs/components/knowledge/ReviewTab.tsx",
                                lineNumber: 35,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-muted",
                                children: "Nothing is waiting for review."
                            }, void 0, false, {
                                fileName: "[project]/frontend-nextjs/components/knowledge/ReviewTab.tsx",
                                lineNumber: 36,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend-nextjs/components/knowledge/ReviewTab.tsx",
                        lineNumber: 34,
                        columnNumber: 11
                    }, this),
                    d && d.sources.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "border-b border-line px-4 py-2 text-xs font-semibold uppercase tracking-wide text-muted",
                                children: [
                                    "Documents (",
                                    d.sources.length,
                                    ")"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend-nextjs/components/knowledge/ReviewTab.tsx",
                                lineNumber: 41,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "divide-y divide-line",
                                children: d.sources.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: "flex flex-wrap items-center gap-3 px-4 py-2.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setOpen(s.id),
                                                className: "min-w-0 flex-1 text-left",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "block truncate text-sm font-medium",
                                                        children: s.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend-nextjs/components/knowledge/ReviewTab.tsx",
                                                        lineNumber: 46,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "block truncate text-xs text-muted",
                                                        children: [
                                                            s.filename,
                                                            " · ",
                                                            s.chunks,
                                                            " chunks · ",
                                                            s.docTypeReason
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/frontend-nextjs/components/knowledge/ReviewTab.tsx",
                                                        lineNumber: 47,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend-nextjs/components/knowledge/ReviewTab.tsx",
                                                lineNumber: 45,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DOC_TYPE_LABEL"][s.docType]
                                            }, void 0, false, {
                                                fileName: "[project]/frontend-nextjs/components/knowledge/ReviewTab.tsx",
                                                lineNumber: 49,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                tone: "accent",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$knowledge$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scopeLabel"])(s.scope, s.scopeRef)
                                            }, void 0, false, {
                                                fileName: "[project]/frontend-nextjs/components/knowledge/ReviewTab.tsx",
                                                lineNumber: 49,
                                                columnNumber: 61
                                            }, this),
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$knowledge$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extractBadge"])(s),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "secondary",
                                                onClick: ()=>setOpen(s.id),
                                                children: "Inspect"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend-nextjs/components/knowledge/ReviewTab.tsx",
                                                lineNumber: 50,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "primary",
                                                disabled: s.extractStatus !== "ok" || approveSource.isPending,
                                                onClick: ()=>{
                                                    setError(null);
                                                    approveSource.mutate(s.id);
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardCheck$3e$__["ClipboardCheck"], {
                                                        size: 15,
                                                        "aria-hidden": true
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend-nextjs/components/knowledge/ReviewTab.tsx",
                                                        lineNumber: 51,
                                                        columnNumber: 172
                                                    }, this),
                                                    " Approve"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend-nextjs/components/knowledge/ReviewTab.tsx",
                                                lineNumber: 51,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, s.id, true, {
                                        fileName: "[project]/frontend-nextjs/components/knowledge/ReviewTab.tsx",
                                        lineNumber: 44,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/frontend-nextjs/components/knowledge/ReviewTab.tsx",
                                lineNumber: 42,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend-nextjs/components/knowledge/ReviewTab.tsx",
                        lineNumber: 40,
                        columnNumber: 11
                    }, this),
                    d && d.rules.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "border-y border-line px-4 py-2 text-xs font-semibold uppercase tracking-wide text-muted",
                                children: [
                                    "Rules (",
                                    d.rules.length,
                                    ")"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend-nextjs/components/knowledge/ReviewTab.tsx",
                                lineNumber: 59,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "divide-y divide-line",
                                children: d.rules.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: "flex flex-wrap items-center gap-3 px-4 py-2.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "min-w-0 flex-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "block truncate text-sm font-medium",
                                                        children: r.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend-nextjs/components/knowledge/ReviewTab.tsx",
                                                        lineNumber: 64,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "block truncate text-xs text-muted",
                                                        children: [
                                                            r.actionType.replace("_", " "),
                                                            " · ",
                                                            r.appliesTo.join(", "),
                                                            " · ",
                                                            r.tests.length,
                                                            " test",
                                                            r.tests.length === 1 ? "" : "s"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/frontend-nextjs/components/knowledge/ReviewTab.tsx",
                                                        lineNumber: 65,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend-nextjs/components/knowledge/ReviewTab.tsx",
                                                lineNumber: 63,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                tone: "accent",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$knowledge$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scopeLabel"])(r.scope, r.scopeRef)
                                            }, void 0, false, {
                                                fileName: "[project]/frontend-nextjs/components/knowledge/ReviewTab.tsx",
                                                lineNumber: 67,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "primary",
                                                disabled: approveRule.isPending,
                                                onClick: ()=>{
                                                    setError(null);
                                                    approveRule.mutate(r.id);
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardCheck$3e$__["ClipboardCheck"], {
                                                        size: 15,
                                                        "aria-hidden": true
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend-nextjs/components/knowledge/ReviewTab.tsx",
                                                        lineNumber: 68,
                                                        columnNumber: 140
                                                    }, this),
                                                    " Approve"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend-nextjs/components/knowledge/ReviewTab.tsx",
                                                lineNumber: 68,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, r.id, true, {
                                        fileName: "[project]/frontend-nextjs/components/knowledge/ReviewTab.tsx",
                                        lineNumber: 62,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/frontend-nextjs/components/knowledge/ReviewTab.tsx",
                                lineNumber: 60,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend-nextjs/components/knowledge/ReviewTab.tsx",
                        lineNumber: 58,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend-nextjs/components/knowledge/ReviewTab.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$knowledge$2f$SourceDrawer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: open,
                onClose: ()=>setOpen(null)
            }, void 0, false, {
                fileName: "[project]/frontend-nextjs/components/knowledge/ReviewTab.tsx",
                lineNumber: 75,
                columnNumber: 16
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend-nextjs/components/knowledge/ReviewTab.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
_s(ReviewTab, "0J2ohPAeYaMUs+21joGq40D3Wfw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$workspace$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
_c = ReviewTab;
var _c;
__turbopack_context__.k.register(_c, "ReviewTab");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend-nextjs/components/knowledge/RulesTab.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RulesTab
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/triangle-alert.mjs [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/circle-check.mjs [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flask$2d$conical$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FlaskConical$3e$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/flask-conical.mjs [app-client] (ecmascript) <export default as FlaskConical>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/loader-circle.mjs [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/plus.mjs [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/trash.mjs [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/circle-x.mjs [app-client] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$workspace$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/lib/workspace.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$useStudies$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/lib/useStudies.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/components/ui/primitives.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$knowledge$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/components/knowledge/shared.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
const AGENTS = [
    "extract",
    "understand",
    "review",
    "generate"
];
const ACTIONS = [
    {
        id: "prompt",
        label: "Add an instruction to the agent",
        field: "text",
        hint: "Instruction text the agent should follow"
    },
    {
        id: "guardrail",
        label: "Add a guardrail check",
        field: "text",
        hint: "What the generated code must satisfy"
    },
    {
        id: "pattern",
        label: "Bind a Tier 1 pattern",
        field: "pattern",
        hint: "Name of the pattern or SQL building block"
    },
    {
        id: "name_map",
        label: "Map one name to another",
        field: "from",
        hint: "Name to replace"
    }
];
const csv = (v)=>(v ?? []).join(", ");
const list = (s)=>s.split(/[,\n]/).map((x)=>x.trim()).filter(Boolean);
const blank = {
    name: "",
    description: "",
    scope: "global",
    scopeRef: "",
    appliesTo: [
        "generate"
    ],
    edc: "",
    listingTypes: "",
    forms: "",
    language: "",
    textPattern: "",
    actionType: "prompt",
    actionMain: "",
    actionTo: "",
    priority: 100,
    evidenceSourceId: "",
    evidenceNote: "",
    tests: []
};
const fromRule = (r)=>{
    const a = ACTIONS.find((x)=>x.id === r.actionType);
    return {
        name: r.name,
        description: r.description,
        scope: r.scope,
        scopeRef: r.scopeRef,
        appliesTo: r.appliesTo,
        edc: csv(r.condition.edcSystem),
        listingTypes: csv(r.condition.listingType),
        forms: csv(r.condition.forms),
        language: csv(r.condition.language),
        textPattern: r.condition.textPattern ?? "",
        actionType: r.actionType,
        actionMain: r.action[a.field] ?? "",
        actionTo: r.action.to ?? "",
        priority: r.priority,
        evidenceSourceId: r.evidenceSourceId ?? "",
        evidenceNote: r.evidenceNote,
        tests: r.tests.map((t)=>({
                logic: t.spec.logic ?? "",
                edcSystem: t.spec.edcSystem ?? "",
                expect: t.expect
            }))
    };
};
function toDraft(f) {
    const a = ACTIONS.find((x)=>x.id === f.actionType);
    const condition = {};
    if (list(f.edc).length) condition.edcSystem = list(f.edc);
    if (list(f.listingTypes).length) condition.listingType = list(f.listingTypes);
    if (list(f.forms).length) condition.forms = list(f.forms);
    if (list(f.language).length) condition.language = list(f.language);
    if (f.textPattern.trim()) condition.textPattern = f.textPattern.trim();
    return {
        name: f.name,
        description: f.description,
        scope: f.scope,
        scopeRef: f.scopeRef,
        appliesTo: f.appliesTo,
        condition,
        actionType: f.actionType,
        action: {
            [a.field]: f.actionMain,
            ...f.actionType === "name_map" ? {
                to: f.actionTo
            } : {}
        },
        priority: f.priority,
        evidenceSourceId: f.evidenceSourceId || null,
        evidenceNote: f.evidenceNote,
        tests: f.tests.filter((t)=>t.logic.trim()).map((t)=>({
                spec: {
                    logic: t.logic,
                    ...t.edcSystem ? {
                        edcSystem: t.edcSystem
                    } : {}
                },
                expect: t.expect
            }))
    };
}
function RulesTab() {
    _s();
    const { tenantId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$workspace$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])();
    const qc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    const rules = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "kb",
            "rules",
            tenantId
        ],
        queryFn: {
            "RulesTab.useQuery[rules]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["listRules"])(tenantId)
        }["RulesTab.useQuery[rules]"]
    });
    const sources = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "kb",
            "sources",
            tenantId,
            "",
            "",
            "approved",
            "",
            ""
        ],
        queryFn: {
            "RulesTab.useQuery[sources]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["kbSources"])(tenantId, {
                    status: "approved"
                })
        }["RulesTab.useQuery[sources]"]
    });
    const [editing, setEditing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(blank);
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [tests, setTests] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [back, setBack] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const patch = (p)=>setForm((f)=>({
                ...f,
                ...p
            }));
    const refresh = ()=>qc.invalidateQueries({
            queryKey: [
                "kb"
            ]
        });
    function open(r) {
        setEditing(r ? r.id : "new");
        setForm(r ? fromRule(r) : blank);
        setError(null);
        setTests(null);
        setBack(null);
    }
    async function guard(label, fn) {
        setBusy(label);
        setError(null);
        try {
            return await fn();
        } catch (e) {
            setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$knowledge$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["errText"])(e));
            const b = e.body;
            if (b?.tests) setTests(b.tests);
        } finally{
            setBusy("");
        }
    }
    async function save() {
        const r = await guard("save", ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveRule"])(editing === "new" ? null : editing, toDraft(form), tenantId));
        if (r) {
            await refresh();
            setEditing(r.id);
            setForm(fromRule(r));
        }
    }
    const act = (id)=>({
            approve: async ()=>{
                const r = await guard("approve", ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ruleAction"])(id, "approve", tenantId));
                if (r) {
                    setTests(r.testResults ?? null);
                    await refresh();
                }
            },
            retire: async ()=>{
                await guard("retire", ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ruleAction"])(id, "retire", tenantId));
                await refresh();
            },
            restore: async ()=>{
                await guard("restore", ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ruleAction"])(id, "restore", tenantId));
                await refresh();
            }
        });
    const current = rules.data?.find((r)=>r.id === editing);
    const a = ACTIONS.find((x)=>x.id === form.actionType);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "rounded-lg bg-warnsoft p-3 text-xs text-warn",
                children: [
                    "Approved rules are added to the prompts of the chosen agents only when a run has ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: "Use approved knowledge"
                    }, void 0, false, {
                        fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                        lineNumber: 100,
                        columnNumber: 90
                    }, this),
                    " switched on. Instruction, name-map and guardrail rules are given to the model as instructions; a guardrail rule is a requirement the model is told to meet, ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: "not a check run on the generated code"
                    }, void 0, false, {
                        fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                        lineNumber: 100,
                        columnNumber: 286
                    }, this),
                    ". Tier 1 pattern rules are recorded but not yet executed."
                ]
            }, void 0, true, {
                fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                lineNumber: 99,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-5 lg:grid-cols-[360px_minmax(0,1fr)]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: "self-start",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                title: `Rules (${rules.data?.length ?? 0})`,
                                right: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "secondary",
                                    onClick: ()=>open(null),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                            size: 15,
                                            "aria-hidden": true
                                        }, void 0, false, {
                                            fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                            lineNumber: 104,
                                            columnNumber: 130
                                        }, this),
                                        " New"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                    lineNumber: 104,
                                    columnNumber: 75
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                lineNumber: 104,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "max-h-[560px] divide-y divide-line overflow-y-auto",
                                children: [
                                    rules.data?.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>open(r),
                                                className: `w-full px-4 py-2.5 text-left hover:bg-surface2 ${editing === r.id ? "bg-accentsoft" : ""}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "truncate text-sm font-medium",
                                                                children: r.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                                lineNumber: 109,
                                                                columnNumber: 76
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$knowledge$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatusBadge"], {
                                                                status: r.status
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                                lineNumber: 109,
                                                                columnNumber: 138
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                        lineNumber: 109,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "truncate text-xs text-muted",
                                                        children: [
                                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$knowledge$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scopeLabel"])(r.scope, r.scopeRef),
                                                            " · ",
                                                            r.actionType.replace("_", " "),
                                                            " · ",
                                                            r.appliesTo.join(", ")
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                        lineNumber: 110,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                lineNumber: 108,
                                                columnNumber: 17
                                            }, this)
                                        }, r.id, false, {
                                            fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                            lineNumber: 107,
                                            columnNumber: 15
                                        }, this)),
                                    rules.data?.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: "px-4 py-8 text-center text-sm text-muted",
                                        children: "No rules yet."
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                        lineNumber: 114,
                                        columnNumber: 42
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                lineNumber: 105,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                        lineNumber: 103,
                        columnNumber: 9
                    }, this),
                    editing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                title: editing === "new" ? "New rule" : `Edit rule (version ${current?.version ?? ""})`,
                                hint: "When the condition matches a spec in this scope, the action applies to the chosen agents.",
                                right: current && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$knowledge$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatusBadge"], {
                                    status: current.status
                                }, void 0, false, {
                                    fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                    lineNumber: 121,
                                    columnNumber: 33
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                lineNumber: 120,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4 p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid gap-3 sm:grid-cols-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-xs font-medium text-muted sm:col-span-2",
                                                children: [
                                                    "Name",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        value: form.name,
                                                        onChange: (e)=>patch({
                                                                name: e.target.value
                                                            }),
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"]
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                        lineNumber: 124,
                                                        columnNumber: 91
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                lineNumber: 124,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-xs font-medium text-muted",
                                                children: [
                                                    "Applies to",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        value: form.scope,
                                                        onChange: (e)=>patch({
                                                                scope: e.target.value
                                                            }),
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"],
                                                        "aria-label": "Rule scope",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "global",
                                                                children: "Global"
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                                lineNumber: 127,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "sponsor",
                                                                children: "One sponsor"
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                                lineNumber: 127,
                                                                columnNumber: 59
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "ta",
                                                                children: "One therapeutic area"
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                                lineNumber: 127,
                                                                columnNumber: 103
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "study",
                                                                children: "One study"
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                                lineNumber: 127,
                                                                columnNumber: 151
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "report",
                                                                children: "One report"
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                                lineNumber: 127,
                                                                columnNumber: 191
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                        lineNumber: 126,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                lineNumber: 125,
                                                columnNumber: 17
                                            }, this),
                                            form.scope !== "global" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-xs font-medium text-muted",
                                                children: [
                                                    form.scope === "report" ? "Report ID" : form.scope === "sponsor" ? "Sponsor" : form.scope === "ta" ? "Therapeutic area" : "Study ID",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        value: form.scopeRef,
                                                        onChange: (e)=>patch({
                                                                scopeRef: e.target.value
                                                            }),
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"]
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                        lineNumber: 130,
                                                        columnNumber: 235
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                lineNumber: 130,
                                                columnNumber: 45
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                        lineNumber: 123,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("fieldset", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("legend", {
                                                className: "text-xs font-medium text-muted",
                                                children: "Agents the rule binds to"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                lineNumber: 132,
                                                columnNumber: 25
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-1 flex flex-wrap gap-3 text-sm",
                                                children: AGENTS.map((g)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "flex items-center gap-1.5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "checkbox",
                                                                className: "h-4 w-4 accent-[var(--accent)]",
                                                                checked: form.appliesTo.includes(g),
                                                                onChange: (e)=>patch({
                                                                        appliesTo: e.target.checked ? [
                                                                            ...form.appliesTo,
                                                                            g
                                                                        ] : form.appliesTo.filter((x)=>x !== g)
                                                                    })
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                                lineNumber: 135,
                                                                columnNumber: 74
                                                            }, this),
                                                            g
                                                        ]
                                                    }, g, true, {
                                                        fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                        lineNumber: 135,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                lineNumber: 133,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                        lineNumber: 132,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("fieldset", {
                                        className: "rounded-lg border border-line p-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("legend", {
                                                className: "px-1 text-xs font-medium text-muted",
                                                children: "When (all that are filled in must match)"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                lineNumber: 140,
                                                columnNumber: 71
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid gap-3 sm:grid-cols-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-xs text-muted",
                                                        children: [
                                                            "EDC systems",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                value: form.edc,
                                                                onChange: (e)=>patch({
                                                                        edc: e.target.value
                                                                    }),
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"],
                                                                placeholder: "veeva, rave"
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                                lineNumber: 142,
                                                                columnNumber: 74
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                        lineNumber: 142,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-xs text-muted",
                                                        children: [
                                                            "Output languages",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                value: form.language,
                                                                onChange: (e)=>patch({
                                                                        language: e.target.value
                                                                    }),
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"],
                                                                placeholder: "cql, sas"
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                                lineNumber: 143,
                                                                columnNumber: 79
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                        lineNumber: 143,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-xs text-muted",
                                                        children: [
                                                            "Listing types",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                value: form.listingTypes,
                                                                onChange: (e)=>patch({
                                                                        listingTypes: e.target.value
                                                                    }),
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"],
                                                                placeholder: "teae, ae_listing"
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                                lineNumber: 144,
                                                                columnNumber: 76
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                        lineNumber: 144,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-xs text-muted",
                                                        children: [
                                                            "Forms mentioned in the spec",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                value: form.forms,
                                                                onChange: (e)=>patch({
                                                                        forms: e.target.value
                                                                    }),
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"],
                                                                placeholder: "DS01, AE"
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                                lineNumber: 145,
                                                                columnNumber: 90
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                        lineNumber: 145,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-xs text-muted sm:col-span-2",
                                                        children: [
                                                            "Text pattern (regular expression)",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                value: form.textPattern,
                                                                onChange: (e)=>patch({
                                                                        textPattern: e.target.value
                                                                    }),
                                                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"]} font-mono`,
                                                                placeholder: "deleted|erroneous"
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                                lineNumber: 146,
                                                                columnNumber: 110
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                        lineNumber: 146,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                lineNumber: 141,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                        lineNumber: 140,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid gap-3 sm:grid-cols-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-xs font-medium text-muted",
                                                children: [
                                                    "Then",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        value: form.actionType,
                                                        onChange: (e)=>patch({
                                                                actionType: e.target.value
                                                            }),
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"],
                                                        "aria-label": "Action type",
                                                        children: ACTIONS.map((x)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: x.id,
                                                                children: x.label
                                                            }, x.id, false, {
                                                                fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                                lineNumber: 152,
                                                                columnNumber: 41
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                        lineNumber: 151,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                lineNumber: 150,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-xs font-medium text-muted",
                                                children: [
                                                    "Priority (higher wins when equally specific)",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "number",
                                                        value: form.priority,
                                                        onChange: (e)=>patch({
                                                                priority: Number(e.target.value) || 0
                                                            }),
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"]
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                        lineNumber: 155,
                                                        columnNumber: 117
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                lineNumber: 155,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-xs font-medium text-muted sm:col-span-2",
                                                children: [
                                                    a.hint,
                                                    form.actionType === "prompt" || form.actionType === "guardrail" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                        value: form.actionMain,
                                                        onChange: (e)=>patch({
                                                                actionMain: e.target.value
                                                            }),
                                                        rows: 3,
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"]
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                        lineNumber: 158,
                                                        columnNumber: 23
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        value: form.actionMain,
                                                        onChange: (e)=>patch({
                                                                actionMain: e.target.value
                                                            }),
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"]
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                        lineNumber: 159,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                lineNumber: 156,
                                                columnNumber: 17
                                            }, this),
                                            form.actionType === "name_map" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-xs font-medium text-muted sm:col-span-2",
                                                children: [
                                                    "Replace with",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        value: form.actionTo,
                                                        onChange: (e)=>patch({
                                                                actionTo: e.target.value
                                                            }),
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"]
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                        lineNumber: 161,
                                                        columnNumber: 134
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                lineNumber: 161,
                                                columnNumber: 52
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                        lineNumber: 149,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid gap-3 sm:grid-cols-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-xs font-medium text-muted",
                                                children: [
                                                    "Evidence (approved source)",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        value: form.evidenceSourceId,
                                                        onChange: (e)=>patch({
                                                                evidenceSourceId: e.target.value
                                                            }),
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"],
                                                        "aria-label": "Evidence source",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "",
                                                                children: "None"
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                                lineNumber: 166,
                                                                columnNumber: 21
                                                            }, this),
                                                            sources.data?.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: s.id,
                                                                    children: s.title
                                                                }, s.id, false, {
                                                                    fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                                    lineNumber: 166,
                                                                    columnNumber: 77
                                                                }, this))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                        lineNumber: 165,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                lineNumber: 164,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-xs font-medium text-muted",
                                                children: [
                                                    "Evidence note",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        value: form.evidenceNote,
                                                        onChange: (e)=>patch({
                                                                evidenceNote: e.target.value
                                                            }),
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"],
                                                        placeholder: "e.g. section 4.2 of the SDTM IG"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                        lineNumber: 169,
                                                        columnNumber: 86
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                lineNumber: 169,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                        lineNumber: 163,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("fieldset", {
                                        className: "rounded-lg border border-line p-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("legend", {
                                                className: "px-1 text-xs font-medium text-muted",
                                                children: "Example tests (an approval needs them all to pass)"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                lineNumber: 171,
                                                columnNumber: 71
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                className: "space-y-2",
                                                children: form.tests.map((t, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        className: "grid gap-2 sm:grid-cols-[1fr_120px_130px_auto]",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                value: t.logic,
                                                                onChange: (e)=>patch({
                                                                        tests: form.tests.map((x, j)=>j === i ? {
                                                                                ...x,
                                                                                logic: e.target.value
                                                                            } : x)
                                                                    }),
                                                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"]} mt-0`,
                                                                placeholder: "Spec logic text",
                                                                "aria-label": `Test ${i + 1} logic`
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                                lineNumber: 175,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                value: t.edcSystem,
                                                                onChange: (e)=>patch({
                                                                        tests: form.tests.map((x, j)=>j === i ? {
                                                                                ...x,
                                                                                edcSystem: e.target.value
                                                                            } : x)
                                                                    }),
                                                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"]} mt-0`,
                                                                placeholder: "EDC (optional)",
                                                                "aria-label": `Test ${i + 1} EDC`
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                                lineNumber: 176,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                value: t.expect,
                                                                onChange: (e)=>patch({
                                                                        tests: form.tests.map((x, j)=>j === i ? {
                                                                                ...x,
                                                                                expect: e.target.value
                                                                            } : x)
                                                                    }),
                                                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"]} mt-0`,
                                                                "aria-label": `Test ${i + 1} expectation`,
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "fires",
                                                                        children: "should fire"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                                        lineNumber: 178,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "not_fires",
                                                                        children: "should not fire"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                                        lineNumber: 178,
                                                                        columnNumber: 67
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                                lineNumber: 177,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>patch({
                                                                        tests: form.tests.filter((_, j)=>j !== i)
                                                                    }),
                                                                "aria-label": `Remove test ${i + 1}`,
                                                                className: "rounded-lg p-2 text-muted hover:bg-surface2",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                    size: 15
                                                                }, void 0, false, {
                                                                    fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                                    lineNumber: 180,
                                                                    columnNumber: 194
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                                lineNumber: 180,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, i, true, {
                                                        fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                        lineNumber: 174,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                lineNumber: 172,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "ghost",
                                                className: "mt-2",
                                                onClick: ()=>patch({
                                                        tests: [
                                                            ...form.tests,
                                                            {
                                                                logic: "",
                                                                edcSystem: "",
                                                                expect: "fires"
                                                            }
                                                        ]
                                                    }),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                        size: 14,
                                                        "aria-hidden": true
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                        lineNumber: 184,
                                                        columnNumber: 155
                                                    }, this),
                                                    " Add test"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                lineNumber: 184,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                        lineNumber: 171,
                                        columnNumber: 15
                                    }, this),
                                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "rounded-lg bg-badsoft p-3 text-sm text-bad",
                                        role: "alert",
                                        children: error
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                        lineNumber: 187,
                                        columnNumber: 25
                                    }, this),
                                    tests && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "space-y-1 rounded-lg bg-surface2 p-3 text-xs",
                                        children: tests.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: "flex items-start gap-2",
                                                children: [
                                                    t.passed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                        size: 14,
                                                        className: "mt-0.5 text-good",
                                                        "aria-hidden": true
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                        lineNumber: 190,
                                                        columnNumber: 98
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                                        size: 14,
                                                        className: "mt-0.5 text-bad",
                                                        "aria-hidden": true
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                        lineNumber: 190,
                                                        columnNumber: 168
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            "Test ",
                                                            t.n,
                                                            ": expected ",
                                                            t.expect.replace("_", " "),
                                                            ", ",
                                                            t.fired ? "it fired" : "it did not fire",
                                                            " (",
                                                            t.why,
                                                            ")"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                        lineNumber: 190,
                                                        columnNumber: 230
                                                    }, this)
                                                ]
                                            }, t.n, true, {
                                                fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                lineNumber: 190,
                                                columnNumber: 37
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                        lineNumber: 189,
                                        columnNumber: 17
                                    }, this),
                                    back && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "rounded-lg bg-surface2 p-3 text-xs",
                                        children: [
                                            "This rule would fire for ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: back.fired
                                            }, void 0, false, {
                                                fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                lineNumber: 193,
                                                columnNumber: 99
                                            }, this),
                                            " of ",
                                            back.checked,
                                            " specs in the Spec library",
                                            back.examples.length ? `, for example ${back.examples.slice(0, 8).join(", ")}` : "",
                                            "."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                        lineNumber: 193,
                                        columnNumber: 24
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "primary",
                                                onClick: save,
                                                disabled: busy !== "",
                                                children: [
                                                    busy === "save" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                        size: 15,
                                                        className: "animate-spin",
                                                        "aria-hidden": true
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                        lineNumber: 195,
                                                        columnNumber: 101
                                                    }, this),
                                                    " Save rule"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                lineNumber: 195,
                                                columnNumber: 17
                                            }, this),
                                            current && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "secondary",
                                                onClick: async ()=>{
                                                    const r = await guard("tests", ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ruleTests"])(current.id, tenantId));
                                                    if (r) setTests(r.results);
                                                },
                                                disabled: busy !== "",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flask$2d$conical$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FlaskConical$3e$__["FlaskConical"], {
                                                        size: 15,
                                                        "aria-hidden": true
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                        lineNumber: 196,
                                                        columnNumber: 205
                                                    }, this),
                                                    " Run saved tests"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                lineNumber: 196,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "secondary",
                                                onClick: async ()=>{
                                                    const r = await guard("back", ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ruleBacktest"])(toDraft(form), tenantId));
                                                    if (r) setBack(r);
                                                },
                                                disabled: busy !== "",
                                                children: "Back-test on the Spec library"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                lineNumber: 197,
                                                columnNumber: 17
                                            }, this),
                                            current && current.status !== "approved" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "secondary",
                                                onClick: act(current.id).approve,
                                                disabled: busy !== "",
                                                children: "Approve"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                lineNumber: 198,
                                                columnNumber: 62
                                            }, this),
                                            current?.status === "approved" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "secondary",
                                                onClick: act(current.id).retire,
                                                disabled: busy !== "",
                                                children: "Retire"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                lineNumber: 199,
                                                columnNumber: 52
                                            }, this),
                                            current?.status === "retired" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "secondary",
                                                onClick: act(current.id).restore,
                                                disabled: busy !== "",
                                                children: "Back to draft"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                lineNumber: 200,
                                                columnNumber: 51
                                            }, this),
                                            current && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "ghost",
                                                className: "ml-auto",
                                                onClick: async ()=>{
                                                    if (window.confirm("Delete this rule?")) {
                                                        await guard("delete", ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteRule"])(current.id, tenantId));
                                                        setEditing(null);
                                                        await refresh();
                                                    }
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                        size: 15,
                                                        "aria-hidden": true
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                        lineNumber: 201,
                                                        columnNumber: 242
                                                    }, this),
                                                    " Delete"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                lineNumber: 201,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                        lineNumber: 194,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[11px] text-muted",
                                        children: "Saving an approved rule creates a new version that needs approval again. The back-test uses the specs stored in this app, not your full spec corpus."
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                        lineNumber: 203,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                lineNumber: 122,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                        lineNumber: 119,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "px-6 py-16 text-center text-sm text-muted",
                            children: "Select a rule to edit it, or create a new one."
                        }, void 0, false, {
                            fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                            lineNumber: 207,
                            columnNumber: 17
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                        lineNumber: 207,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                lineNumber: 102,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DryRun, {}, void 0, false, {
                fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                lineNumber: 210,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
        lineNumber: 98,
        columnNumber: 5
    }, this);
}
_s(RulesTab, "SD0K8BZiBtBdKwfMXWiBzCzo4B8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$workspace$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
_c = RulesTab;
function DryRun() {
    _s1();
    const { tenantId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$workspace$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])();
    const studies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$useStudies$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStudies"])();
    const [logic, setLogic] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [studyId, setStudyId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [edc, setEdc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [lang, setLang] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [drafts, setDrafts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [fired, setFired] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [ta, setTa] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    async function run() {
        setBusy(true);
        setError(null);
        try {
            const r = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ruleDryRun"])({
                spec: {
                    logic,
                    description: logic
                },
                studyId,
                edcSystem: edc,
                language: lang,
                includeDraft: drafts
            }, tenantId);
            setFired(r.fired);
            setTa(r.ta);
        } catch (e) {
            setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$knowledge$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["errText"])(e));
        } finally{
            setBusy(false);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                title: "Dry run",
                hint: "Paste a spec's text and see which rules would fire for it, most specific first."
            }, void 0, false, {
                fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                lineNumber: 235,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-3 p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                        value: logic,
                        onChange: (e)=>setLogic(e.target.value),
                        rows: 3,
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"],
                        placeholder: "Paste the spec's logic or description",
                        "aria-label": "Spec text for dry run"
                    }, void 0, false, {
                        fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                        lineNumber: 237,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-3 sm:grid-cols-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: studyId,
                                onChange: (e)=>setStudyId(e.target.value),
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"]} mt-0`,
                                "aria-label": "Dry run study",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "",
                                        children: "No study"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                        lineNumber: 239,
                                        columnNumber: 138
                                    }, this),
                                    studies.data?.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: s.studyId,
                                            children: s.studyId
                                        }, s.studyId, false, {
                                            fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                            lineNumber: 239,
                                            columnNumber: 198
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                lineNumber: 239,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: edc,
                                onChange: (e)=>setEdc(e.target.value),
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"]} mt-0`,
                                placeholder: "EDC system id"
                            }, void 0, false, {
                                fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                lineNumber: 240,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: lang,
                                onChange: (e)=>setLang(e.target.value),
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"]} mt-0`,
                                placeholder: "Output language"
                            }, void 0, false, {
                                fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                lineNumber: 241,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "flex items-center gap-1.5 text-xs",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "checkbox",
                                        className: "h-4 w-4 accent-[var(--accent)]",
                                        checked: drafts,
                                        onChange: (e)=>setDrafts(e.target.checked)
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                        lineNumber: 242,
                                        columnNumber: 64
                                    }, this),
                                    " Include drafts"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                lineNumber: 242,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                        lineNumber: 238,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "primary",
                        onClick: run,
                        disabled: busy || !logic.trim(),
                        children: [
                            busy && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                size: 15,
                                className: "animate-spin",
                                "aria-hidden": true
                            }, void 0, false, {
                                fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                lineNumber: 244,
                                columnNumber: 91
                            }, this),
                            " Run"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                        lineNumber: 244,
                        columnNumber: 9
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "rounded-lg bg-badsoft p-3 text-sm text-bad",
                        role: "alert",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                        lineNumber: 245,
                        columnNumber: 19
                    }, this),
                    fired && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "divide-y divide-line rounded-lg border border-line",
                        children: [
                            fired.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    className: "space-y-0.5 px-3 py-2 text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-medium",
                                                    children: r.name
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                    lineNumber: 250,
                                                    columnNumber: 68
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                    tone: "accent",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$knowledge$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scopeLabel"])(r.scope, r.scopeRef)
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                    lineNumber: 250,
                                                    columnNumber: 113
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                    children: r.actionType.replace("_", " ")
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                    lineNumber: 250,
                                                    columnNumber: 175
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$knowledge$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatusBadge"], {
                                                    status: r.status
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                    lineNumber: 250,
                                                    columnNumber: 222
                                                }, this),
                                                r.overriddenBy && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                    tone: "warn",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                                            size: 11,
                                                            "aria-hidden": true
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                            lineNumber: 251,
                                                            columnNumber: 57
                                                        }, this),
                                                        " Overridden by ",
                                                        r.overriddenBy
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                                    lineNumber: 251,
                                                    columnNumber: 38
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                            lineNumber: 250,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs text-muted",
                                            children: [
                                                "Matched: ",
                                                r.why,
                                                ta ? ` · TA: ${ta}` : ""
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                            lineNumber: 252,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, r.id, true, {
                                    fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                    lineNumber: 249,
                                    columnNumber: 15
                                }, this)),
                            fired.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "px-3 py-6 text-center text-sm text-muted",
                                children: "No rule fires for this spec."
                            }, void 0, false, {
                                fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                                lineNumber: 255,
                                columnNumber: 36
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                        lineNumber: 247,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
                lineNumber: 236,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend-nextjs/components/knowledge/RulesTab.tsx",
        lineNumber: 234,
        columnNumber: 5
    }, this);
}
_s1(DryRun, "YNbDhJVaUHJasPj3JRI5lCQA6Bg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$workspace$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$useStudies$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStudies"]
    ];
});
_c1 = DryRun;
var _c, _c1;
__turbopack_context__.k.register(_c, "RulesTab");
__turbopack_context__.k.register(_c1, "DryRun");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend-nextjs/components/knowledge/SourceDrawer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SourceDrawer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/trash.mjs [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/x.mjs [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$workspace$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/lib/workspace.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/components/ui/primitives.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/lib/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$knowledge$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/components/knowledge/shared.tsx [app-client] (ecmascript)");
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
function SourceDrawer({ id, onClose }) {
    _s();
    const { tenantId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$workspace$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])();
    const qc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "kb",
            "source",
            id,
            tenantId
        ],
        queryFn: {
            "SourceDrawer.useQuery[q]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["kbSource"])(id, tenantId)
        }["SourceDrawer.useQuery[q]"]
    });
    const s = q.data;
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const refresh = ()=>qc.invalidateQueries({
            queryKey: [
                "kb"
            ]
        });
    const run = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "SourceDrawer.useMutation[run]": async (fn)=>fn()
        }["SourceDrawer.useMutation[run]"],
        onSuccess: refresh,
        onError: {
            "SourceDrawer.useMutation[run]": (e)=>setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$knowledge$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["errText"])(e))
        }["SourceDrawer.useMutation[run]"]
    });
    const act = (a)=>{
        setError(null);
        run.mutate(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["kbAction"])(id, a, tenantId));
    };
    const patch = (p)=>{
        setError(null);
        run.mutate(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["kbPatch"])(id, p, tenantId));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-30 flex justify-end bg-black/40",
        onClick: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            role: "dialog",
            "aria-label": "Source details",
            className: "flex h-full w-full max-w-3xl flex-col border-l border-line bg-surface shadow-xl",
            onClick: (e)=>e.stopPropagation(),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-start gap-3 border-b border-line p-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "min-w-0 flex-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "truncate text-base font-semibold",
                                    children: s?.title ?? "Loading"
                                }, void 0, false, {
                                    fileName: "[project]/frontend-nextjs/components/knowledge/SourceDrawer.tsx",
                                    lineNumber: 32,
                                    columnNumber: 13
                                }, this),
                                s && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-1 flex flex-wrap items-center gap-2 text-xs text-muted",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$knowledge$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatusBadge"], {
                                            status: s.status
                                        }, void 0, false, {
                                            fileName: "[project]/frontend-nextjs/components/knowledge/SourceDrawer.tsx",
                                            lineNumber: 35,
                                            columnNumber: 17
                                        }, this),
                                        " ",
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$knowledge$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extractBadge"])(s),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                s.filename,
                                                " · ",
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$knowledge$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fmtSize"])(s.sizeBytes),
                                                " · ",
                                                s.chunks,
                                                " chunks"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend-nextjs/components/knowledge/SourceDrawer.tsx",
                                            lineNumber: 36,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend-nextjs/components/knowledge/SourceDrawer.tsx",
                                    lineNumber: 34,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend-nextjs/components/knowledge/SourceDrawer.tsx",
                            lineNumber: 31,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            "aria-label": "Close",
                            className: "rounded-lg p-1.5 text-muted hover:bg-surface2",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                size: 18
                            }, void 0, false, {
                                fileName: "[project]/frontend-nextjs/components/knowledge/SourceDrawer.tsx",
                                lineNumber: 40,
                                columnNumber: 114
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/frontend-nextjs/components/knowledge/SourceDrawer.tsx",
                            lineNumber: 40,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend-nextjs/components/knowledge/SourceDrawer.tsx",
                    lineNumber: 30,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "min-h-0 flex-1 space-y-4 overflow-y-auto p-4",
                    children: [
                        q.isError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "rounded-lg bg-badsoft p-3 text-sm text-bad",
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$knowledge$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["errText"])(q.error)
                        }, void 0, false, {
                            fileName: "[project]/frontend-nextjs/components/knowledge/SourceDrawer.tsx",
                            lineNumber: 43,
                            columnNumber: 25
                        }, this),
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "rounded-lg bg-badsoft p-3 text-sm text-bad",
                            role: "alert",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/frontend-nextjs/components/knowledge/SourceDrawer.tsx",
                            lineNumber: 44,
                            columnNumber: 21
                        }, this),
                        s?.extractNote && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "rounded-lg bg-surface2 p-3 text-xs text-muted",
                            children: s.extractNote
                        }, void 0, false, {
                            fileName: "[project]/frontend-nextjs/components/knowledge/SourceDrawer.tsx",
                            lineNumber: 45,
                            columnNumber: 30
                        }, this),
                        s && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap gap-2",
                                    children: [
                                        s.status !== "approved" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "primary",
                                            onClick: ()=>act("approve"),
                                            disabled: run.isPending,
                                            children: "Approve for use"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend-nextjs/components/knowledge/SourceDrawer.tsx",
                                            lineNumber: 49,
                                            columnNumber: 45
                                        }, this),
                                        s.status === "approved" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "secondary",
                                            onClick: ()=>act("retire"),
                                            disabled: run.isPending,
                                            children: "Retire"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend-nextjs/components/knowledge/SourceDrawer.tsx",
                                            lineNumber: 50,
                                            columnNumber: 45
                                        }, this),
                                        s.status === "retired" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "secondary",
                                            onClick: ()=>act("restore"),
                                            disabled: run.isPending,
                                            children: "Back to draft"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend-nextjs/components/knowledge/SourceDrawer.tsx",
                                            lineNumber: 51,
                                            columnNumber: 44
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "ghost",
                                            className: "ml-auto",
                                            onClick: async ()=>{
                                                if (window.confirm("Delete this source and its chunks?")) {
                                                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["kbDelete"])(id, tenantId).catch((e)=>setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$knowledge$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["errText"])(e)));
                                                    await refresh();
                                                    onClose();
                                                }
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                    size: 15,
                                                    "aria-hidden": true
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend-nextjs/components/knowledge/SourceDrawer.tsx",
                                                    lineNumber: 53,
                                                    columnNumber: 19
                                                }, this),
                                                " Delete"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend-nextjs/components/knowledge/SourceDrawer.tsx",
                                            lineNumber: 52,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend-nextjs/components/knowledge/SourceDrawer.tsx",
                                    lineNumber: 48,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid gap-3 sm:grid-cols-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-xs font-medium text-muted",
                                            children: [
                                                "Title",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    defaultValue: s.title,
                                                    onBlur: (e)=>e.target.value !== s.title && patch({
                                                            title: e.target.value
                                                        }),
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"]
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend-nextjs/components/knowledge/SourceDrawer.tsx",
                                                    lineNumber: 58,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend-nextjs/components/knowledge/SourceDrawer.tsx",
                                            lineNumber: 57,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-xs font-medium text-muted",
                                            children: [
                                                "Document type",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    value: s.docType,
                                                    onChange: (e)=>patch({
                                                            docType: e.target.value
                                                        }),
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"],
                                                    children: Object.keys(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DOC_TYPE_LABEL"]).map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: d,
                                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DOC_TYPE_LABEL"][d]
                                                        }, d, false, {
                                                            fileName: "[project]/frontend-nextjs/components/knowledge/SourceDrawer.tsx",
                                                            lineNumber: 62,
                                                            columnNumber: 76
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend-nextjs/components/knowledge/SourceDrawer.tsx",
                                                    lineNumber: 61,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "mt-1 block font-normal",
                                                    children: s.docTypeReason
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend-nextjs/components/knowledge/SourceDrawer.tsx",
                                                    lineNumber: 64,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend-nextjs/components/knowledge/SourceDrawer.tsx",
                                            lineNumber: 60,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-xs font-medium text-muted",
                                            children: [
                                                "Applies to",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    value: s.scope,
                                                    onChange: (e)=>patch({
                                                            scope: e.target.value,
                                                            scopeRef: e.target.value === "global" ? "" : s.scopeRef
                                                        }),
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"],
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "global",
                                                            children: "Global"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend-nextjs/components/knowledge/SourceDrawer.tsx",
                                                            lineNumber: 68,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "sponsor",
                                                            children: "One sponsor"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend-nextjs/components/knowledge/SourceDrawer.tsx",
                                                            lineNumber: 68,
                                                            columnNumber: 59
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "ta",
                                                            children: "One therapeutic area"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend-nextjs/components/knowledge/SourceDrawer.tsx",
                                                            lineNumber: 68,
                                                            columnNumber: 103
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "study",
                                                            children: "One study"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend-nextjs/components/knowledge/SourceDrawer.tsx",
                                                            lineNumber: 68,
                                                            columnNumber: 151
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "report",
                                                            children: "One report"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend-nextjs/components/knowledge/SourceDrawer.tsx",
                                                            lineNumber: 68,
                                                            columnNumber: 191
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend-nextjs/components/knowledge/SourceDrawer.tsx",
                                                    lineNumber: 67,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend-nextjs/components/knowledge/SourceDrawer.tsx",
                                            lineNumber: 66,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-xs font-medium text-muted",
                                            children: [
                                                s.scope === "global" ? "Limit to EDC system id (optional)" : s.scope === "report" ? "Report ID" : s.scope === "sponsor" ? "Sponsor" : s.scope === "ta" ? "Therapeutic area" : "Study ID",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    defaultValue: s.scopeRef,
                                                    onBlur: (e)=>e.target.value !== s.scopeRef && patch({
                                                            scopeRef: e.target.value
                                                        }),
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"]
                                                }, s.scope + s.scopeRef, false, {
                                                    fileName: "[project]/frontend-nextjs/components/knowledge/SourceDrawer.tsx",
                                                    lineNumber: 72,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend-nextjs/components/knowledge/SourceDrawer.tsx",
                                            lineNumber: 71,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-xs font-medium text-muted",
                                            children: [
                                                "Standard version",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    defaultValue: s.standardVersion,
                                                    onBlur: (e)=>e.target.value !== s.standardVersion && patch({
                                                            standardVersion: e.target.value
                                                        }),
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"]
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend-nextjs/components/knowledge/SourceDrawer.tsx",
                                                    lineNumber: 75,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend-nextjs/components/knowledge/SourceDrawer.tsx",
                                            lineNumber: 74,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-xs font-medium text-muted",
                                            children: [
                                                "Licence or source note",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    defaultValue: s.licenseNote,
                                                    onBlur: (e)=>e.target.value !== s.licenseNote && patch({
                                                            licenseNote: e.target.value
                                                        }),
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"]
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend-nextjs/components/knowledge/SourceDrawer.tsx",
                                                    lineNumber: 78,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend-nextjs/components/knowledge/SourceDrawer.tsx",
                                            lineNumber: 77,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend-nextjs/components/knowledge/SourceDrawer.tsx",
                                    lineNumber: 56,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[11px] text-muted",
                                    children: "Changing the scope or type of an approved source sends it back to draft, because it changes what retrieval would return."
                                }, void 0, false, {
                                    fileName: "[project]/frontend-nextjs/components/knowledge/SourceDrawer.tsx",
                                    lineNumber: 81,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "mb-2 text-sm font-semibold",
                                            children: [
                                                "What was read (",
                                                s.preview.length,
                                                " of ",
                                                s.chunks,
                                                " chunks shown)"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend-nextjs/components/knowledge/SourceDrawer.tsx",
                                            lineNumber: 83,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            className: "space-y-2",
                                            children: [
                                                s.preview.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        className: "rounded-lg border border-line p-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "mb-1 flex flex-wrap items-center gap-2 text-[11px] text-muted",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: [
                                                                            "#",
                                                                            c.position + 1
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/frontend-nextjs/components/knowledge/SourceDrawer.tsx",
                                                                        lineNumber: 88,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    c.heading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                        children: c.heading
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/frontend-nextjs/components/knowledge/SourceDrawer.tsx",
                                                                        lineNumber: 88,
                                                                        columnNumber: 69
                                                                    }, this),
                                                                    Object.entries(c.meta ?? {}).map(([k, v])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            children: [
                                                                                k,
                                                                                ": ",
                                                                                String(v)
                                                                            ]
                                                                        }, k, true, {
                                                                            fileName: "[project]/frontend-nextjs/components/knowledge/SourceDrawer.tsx",
                                                                            lineNumber: 89,
                                                                            columnNumber: 71
                                                                        }, this))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/frontend-nextjs/components/knowledge/SourceDrawer.tsx",
                                                                lineNumber: 87,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "whitespace-pre-wrap text-xs leading-relaxed",
                                                                children: c.text
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend-nextjs/components/knowledge/SourceDrawer.tsx",
                                                                lineNumber: 91,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, c.id, true, {
                                                        fileName: "[project]/frontend-nextjs/components/knowledge/SourceDrawer.tsx",
                                                        lineNumber: 86,
                                                        columnNumber: 21
                                                    }, this)),
                                                s.preview.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    className: "py-6 text-center text-sm text-muted",
                                                    children: "No text was read from this file."
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend-nextjs/components/knowledge/SourceDrawer.tsx",
                                                    lineNumber: 94,
                                                    columnNumber: 46
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend-nextjs/components/knowledge/SourceDrawer.tsx",
                                            lineNumber: 84,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend-nextjs/components/knowledge/SourceDrawer.tsx",
                                    lineNumber: 82,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[11px] text-muted",
                                    children: [
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$knowledge$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scopeLabel"])(s.scope, s.scopeRef),
                                        " · embedded with ",
                                        s.embedBackend || "n/a",
                                        s.approvedBy ? ` · approved by ${s.approvedBy}` : ""
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend-nextjs/components/knowledge/SourceDrawer.tsx",
                                    lineNumber: 97,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend-nextjs/components/knowledge/SourceDrawer.tsx",
                            lineNumber: 47,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend-nextjs/components/knowledge/SourceDrawer.tsx",
                    lineNumber: 42,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/frontend-nextjs/components/knowledge/SourceDrawer.tsx",
            lineNumber: 29,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/frontend-nextjs/components/knowledge/SourceDrawer.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_s(SourceDrawer, "fsiPnurZKx3eCvYPBl6LOUJs7Ws=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$workspace$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
_c = SourceDrawer;
var _c;
__turbopack_context__.k.register(_c, "SourceDrawer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend-nextjs/components/knowledge/UploadPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>UploadPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/circle-check.mjs [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$up$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileUp$3e$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/file-up.mjs [app-client] (ecmascript) <export default as FileUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/loader-circle.mjs [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/circle-x.mjs [app-client] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$workspace$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/lib/workspace.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/components/ui/primitives.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/lib/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$knowledge$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/components/knowledge/shared.tsx [app-client] (ecmascript)");
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
function UploadPanel({ scope, scopeRef = "", defaultDocType = "" }) {
    _s();
    const { tenantId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$workspace$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])();
    const qc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [pickScope, setPickScope] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("global");
    const [pickRef, setPickRef] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [docType, setDocType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaultDocType);
    const [version, setVersion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [license, setLicense] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [results, setResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const eff = scope ?? pickScope;
    const effRef = scope ? scopeRef : eff === "global" ? "" : pickRef;
    const needsRef = eff !== "global" && !effRef.trim();
    async function upload(files) {
        if (!files.length) return;
        setBusy(true);
        setError(null);
        setResults(null);
        try {
            const encoded = await Promise.all(files.map(async (f)=>({
                    name: f.name,
                    data: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$knowledge$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toBase64"])(f)
                })));
            const r = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["kbUpload"])(encoded, {
                scope: eff,
                scopeRef: effRef.trim(),
                docType,
                standardVersion: version,
                licenseNote: license
            }, tenantId);
            setResults(r.results);
        } catch (e) {
            setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$knowledge$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["errText"])(e));
            const body = e.body;
            if (body?.results) setResults(body.results);
        } finally{
            setBusy(false);
            if (ref.current) ref.current.value = "";
            await Promise.all([
                qc.invalidateQueries({
                    queryKey: [
                        "kb"
                    ]
                })
            ]);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                title: "Add documents",
                hint: "PDF, Word, Excel, CSV, text, Markdown, HTML, SAS, JSON or XML. Uploads start as drafts and are not used until a person approves them."
            }, void 0, false, {
                fileName: "[project]/frontend-nextjs/components/knowledge/UploadPanel.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-3 p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
                        children: [
                            scope === null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-xs font-medium text-muted",
                                        children: [
                                            "Applies to",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: pickScope,
                                                onChange: (e)=>setPickScope(e.target.value),
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"],
                                                "aria-label": "Scope",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "global",
                                                        children: "Global (all studies)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend-nextjs/components/knowledge/UploadPanel.tsx",
                                                        lineNumber: 61,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "sponsor",
                                                        children: "One sponsor"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend-nextjs/components/knowledge/UploadPanel.tsx",
                                                        lineNumber: 62,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "ta",
                                                        children: "One therapeutic area"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend-nextjs/components/knowledge/UploadPanel.tsx",
                                                        lineNumber: 63,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "study",
                                                        children: "One study"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend-nextjs/components/knowledge/UploadPanel.tsx",
                                                        lineNumber: 64,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "report",
                                                        children: "One report"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend-nextjs/components/knowledge/UploadPanel.tsx",
                                                        lineNumber: 65,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend-nextjs/components/knowledge/UploadPanel.tsx",
                                                lineNumber: 60,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend-nextjs/components/knowledge/UploadPanel.tsx",
                                        lineNumber: 59,
                                        columnNumber: 15
                                    }, this),
                                    eff !== "global" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-xs font-medium text-muted",
                                        children: [
                                            eff === "report" ? "Report ID" : eff === "sponsor" ? "Sponsor" : eff === "ta" ? "Therapeutic area" : "Study ID",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                value: pickRef,
                                                onChange: (e)=>setPickRef(e.target.value),
                                                list: eff === "ta" ? "kb-tas" : eff === "sponsor" ? "kb-sponsors" : eff === "report" ? "kb-reports" : undefined,
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"],
                                                placeholder: eff === "report" ? "e.g. RID002" : eff === "sponsor" ? "e.g. Merck" : eff === "ta" ? "e.g. Oncology" : "e.g. MK-1234-001"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend-nextjs/components/knowledge/UploadPanel.tsx",
                                                lineNumber: 70,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend-nextjs/components/knowledge/UploadPanel.tsx",
                                        lineNumber: 69,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend-nextjs/components/knowledge/UploadPanel.tsx",
                                lineNumber: 58,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-xs font-medium text-muted",
                                children: [
                                    "Document type",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: docType,
                                        onChange: (e)=>setDocType(e.target.value),
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"],
                                        "aria-label": "Document type",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: "Detect from content"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend-nextjs/components/knowledge/UploadPanel.tsx",
                                                lineNumber: 77,
                                                columnNumber: 15
                                            }, this),
                                            Object.keys(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DOC_TYPE_LABEL"]).map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: d,
                                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DOC_TYPE_LABEL"][d]
                                                }, d, false, {
                                                    fileName: "[project]/frontend-nextjs/components/knowledge/UploadPanel.tsx",
                                                    lineNumber: 78,
                                                    columnNumber: 70
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend-nextjs/components/knowledge/UploadPanel.tsx",
                                        lineNumber: 76,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend-nextjs/components/knowledge/UploadPanel.tsx",
                                lineNumber: 75,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-xs font-medium text-muted",
                                children: [
                                    "Standard version (optional)",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: version,
                                        onChange: (e)=>setVersion(e.target.value),
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"],
                                        placeholder: "e.g. SDTM IG 3.4"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/components/knowledge/UploadPanel.tsx",
                                        lineNumber: 82,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend-nextjs/components/knowledge/UploadPanel.tsx",
                                lineNumber: 81,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-xs font-medium text-muted",
                                children: [
                                    "Licence or source note (optional)",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: license,
                                        onChange: (e)=>setLicense(e.target.value),
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"],
                                        placeholder: "e.g. CDISC member licence"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/components/knowledge/UploadPanel.tsx",
                                        lineNumber: 85,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend-nextjs/components/knowledge/UploadPanel.tsx",
                                lineNumber: 84,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend-nextjs/components/knowledge/UploadPanel.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                ref: ref,
                                type: "file",
                                multiple: true,
                                accept: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$knowledge$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ACCEPT"],
                                className: "hidden",
                                "aria-label": "Choose knowledge files",
                                onChange: (e)=>void upload(Array.from(e.target.files ?? []))
                            }, void 0, false, {
                                fileName: "[project]/frontend-nextjs/components/knowledge/UploadPanel.tsx",
                                lineNumber: 89,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "primary",
                                onClick: ()=>ref.current?.click(),
                                disabled: busy || needsRef,
                                children: [
                                    busy ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                        size: 15,
                                        className: "animate-spin",
                                        "aria-hidden": true
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/components/knowledge/UploadPanel.tsx",
                                        lineNumber: 91,
                                        columnNumber: 21
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$up$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileUp$3e$__["FileUp"], {
                                        size: 15,
                                        "aria-hidden": true
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/components/knowledge/UploadPanel.tsx",
                                        lineNumber: 91,
                                        columnNumber: 82
                                    }, this),
                                    " Choose files"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend-nextjs/components/knowledge/UploadPanel.tsx",
                                lineNumber: 90,
                                columnNumber: 11
                            }, this),
                            needsRef && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-muted",
                                children: [
                                    "Enter the ",
                                    eff === "report" ? "report ID" : eff === "sponsor" ? "sponsor" : eff === "ta" ? "therapeutic area" : "study ID",
                                    " first."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend-nextjs/components/knowledge/UploadPanel.tsx",
                                lineNumber: 93,
                                columnNumber: 24
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[11px] text-muted",
                                children: "Only upload content you are licensed to keep. Masking of sponsor-confidential text is not applied to the library itself."
                            }, void 0, false, {
                                fileName: "[project]/frontend-nextjs/components/knowledge/UploadPanel.tsx",
                                lineNumber: 94,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend-nextjs/components/knowledge/UploadPanel.tsx",
                        lineNumber: 88,
                        columnNumber: 9
                    }, this),
                    error && !results && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "rounded-lg bg-badsoft p-3 text-sm text-bad",
                        role: "alert",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/frontend-nextjs/components/knowledge/UploadPanel.tsx",
                        lineNumber: 96,
                        columnNumber: 31
                    }, this),
                    results && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "divide-y divide-line rounded-lg border border-line text-sm",
                        children: results.map((r, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "flex items-start gap-2 px-3 py-2",
                                children: [
                                    r.error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                        size: 15,
                                        className: "mt-0.5 shrink-0 text-bad",
                                        "aria-hidden": true
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/components/knowledge/UploadPanel.tsx",
                                        lineNumber: 101,
                                        columnNumber: 28
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                        size: 15,
                                        className: "mt-0.5 shrink-0 text-good",
                                        "aria-hidden": true
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/components/knowledge/UploadPanel.tsx",
                                        lineNumber: 101,
                                        columnNumber: 101
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "truncate font-medium",
                                                children: r.name
                                            }, void 0, false, {
                                                fileName: "[project]/frontend-nextjs/components/knowledge/UploadPanel.tsx",
                                                lineNumber: 103,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-muted",
                                                children: [
                                                    r.error ?? (r.duplicate ? r.note : `${r.chunks} chunk${r.chunks === 1 ? "" : "s"} · ${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DOC_TYPE_LABEL"][r.docType ?? "other"]} (${r.docTypeReason}) · saved as draft`),
                                                    !r.error && !r.duplicate && r.note ? ` · ${r.note}` : ""
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend-nextjs/components/knowledge/UploadPanel.tsx",
                                                lineNumber: 104,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend-nextjs/components/knowledge/UploadPanel.tsx",
                                        lineNumber: 102,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/frontend-nextjs/components/knowledge/UploadPanel.tsx",
                                lineNumber: 100,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/frontend-nextjs/components/knowledge/UploadPanel.tsx",
                        lineNumber: 98,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend-nextjs/components/knowledge/UploadPanel.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend-nextjs/components/knowledge/UploadPanel.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
_s(UploadPanel, "s0XZo0V82Q6WeMQCrSWoHKCDbjw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$workspace$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"]
    ];
});
_c = UploadPanel;
var _c;
__turbopack_context__.k.register(_c, "UploadPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend-nextjs/components/knowledge/shared.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ACCEPT",
    ()=>ACCEPT,
    "STATUS_LABEL",
    ()=>STATUS_LABEL,
    "STATUS_TONE",
    ()=>STATUS_TONE,
    "StatusBadge",
    ()=>StatusBadge,
    "errText",
    ()=>errText,
    "extractBadge",
    ()=>extractBadge,
    "fmtSize",
    ()=>fmtSize,
    "scopeLabel",
    ()=>scopeLabel,
    "toBase64",
    ()=>toBase64
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/components/ui/primitives.tsx [app-client] (ecmascript)");
;
;
async function toBase64(file) {
    const bytes = new Uint8Array(await file.arrayBuffer());
    let bin = "";
    for(let i = 0; i < bytes.length; i += 0x8000)bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
    return btoa(bin);
}
const ACCEPT = ".pdf,.docx,.doc,.rtf,.odt,.xlsx,.csv,.txt,.md,.html,.htm,.sas,.sql,.json,.xml";
const STATUS_TONE = {
    draft: "warn",
    approved: "good",
    retired: "neutral"
};
const STATUS_LABEL = {
    draft: "Draft: not used",
    approved: "Approved",
    retired: "Retired"
};
const StatusBadge = ({ status })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
        tone: STATUS_TONE[status],
        children: STATUS_LABEL[status]
    }, void 0, false, {
        fileName: "[project]/frontend-nextjs/components/knowledge/shared.tsx",
        lineNumber: 16,
        columnNumber: 66
    }, ("TURBOPACK compile-time value", void 0));
_c = StatusBadge;
const scopeLabel = (scope, ref)=>scope === "global" ? ref ? `Global · ${ref}` : "Global" : scope === "report" ? `Report · ${ref}` : scope === "sponsor" ? `Sponsor · ${ref}` : scope === "ta" ? `TA · ${ref}` : `Study · ${ref}`;
const fmtSize = (n)=>n < 1024 ? `${n} B` : n < 1048576 ? `${(n / 1024).toFixed(0)} KB` : `${(n / 1048576).toFixed(1)} MB`;
function extractBadge(s) {
    if (s.extractStatus === "ok") return null;
    const label = s.extractStatus === "needs_ocr" ? "Needs OCR" : s.extractStatus === "empty" ? "Empty" : "Unreadable";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
        tone: "bad",
        title: s.extractNote,
        children: label
    }, void 0, false, {
        fileName: "[project]/frontend-nextjs/components/knowledge/shared.tsx",
        lineNumber: 26,
        columnNumber: 10
    }, this);
}
const errText = (e)=>e instanceof Error ? e.message : String(e);
var _c;
__turbopack_context__.k.register(_c, "StatusBadge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend-nextjs/lib/types.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DOC_TYPE_LABEL",
    ()=>DOC_TYPE_LABEL
]);
const DOC_TYPE_LABEL = {
    standard: "Standard (CDISC, SDTM, ADaM)",
    protocol: "Protocol",
    spec: "Specification",
    sas_program: "SAS program",
    history: "History",
    edc_guide: "EDC system reference",
    listing_standard: "Standard listing",
    other: "Other"
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend-nextjs/lib/useStudies.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useStudies",
    ()=>useStudies
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$workspace$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/lib/workspace.tsx [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function useStudies() {
    _s();
    const { tenantId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$workspace$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "studies",
            tenantId
        ],
        queryFn: {
            "useStudies.useQuery": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["listStudies"])(tenantId)
        }["useStudies.useQuery"]
    });
}
_s(useStudies, "lxwjQkC80C5FH8yOT2mHgRGxPVo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$workspace$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=frontend-nextjs_038uovb._.js.map