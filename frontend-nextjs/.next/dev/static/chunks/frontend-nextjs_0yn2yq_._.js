(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/frontend-nextjs/app/platform/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Platform
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$usePipeline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/lib/usePipeline.ts [app-client] (ecmascript)");
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
const TONE = {
    Built: "good",
    Partial: "accent",
    Shadow: "neutral",
    Planned: "warn"
};
const LAYERS = [
    {
        name: "Experience",
        items: [
            {
                title: "Spec workspace",
                body: "Spec, logic walkthrough, review and code in one screen",
                status: "Built"
            },
            {
                title: "Clinical modules",
                body: "Starting templates per spec type",
                status: "Built"
            },
            {
                title: "Spec library",
                body: "History of specs and generation runs",
                status: "Built"
            },
            {
                title: "Review console",
                body: "Diff, comments and programmer sign-off",
                status: "Planned"
            }
        ]
    },
    {
        name: "API and orchestration",
        items: [
            {
                title: "FastAPI service",
                body: "Tenant-scoped REST API",
                status: "Built"
            },
            {
                title: "LangGraph orchestrator",
                body: "Rules, retrieval, generation and guardrails as one graph",
                status: "Built"
            },
            {
                title: "Authentication and roles",
                body: "SSO and role-based access",
                status: "Planned"
            },
            {
                title: "Job queue",
                body: "Long runs outside the request",
                status: "Planned"
            }
        ]
    },
    {
        name: "Intelligence",
        items: [
            {
                title: "Tier 1 rules",
                body: "Deterministic patterns bound before any model call",
                status: "Built"
            },
            {
                title: "Claude reasoning",
                body: "Forced tool-use steps for understanding and generation",
                status: "Built"
            },
            {
                title: "Precedent retrieval",
                body: "Verified examples as few-shot context",
                status: "Built"
            },
            {
                title: "ML tier",
                body: "Classifier observing in shadow mode only",
                status: "Shadow"
            }
        ]
    },
    {
        name: "Platform",
        items: [
            {
                title: "Relational store",
                body: "SQLite locally, Postgres through DATABASE_URL",
                status: "Partial"
            },
            {
                title: "Masking and audit",
                body: "Identifier masking and a database audit trail",
                status: "Partial"
            },
            {
                title: "Kubernetes manifests",
                body: "Deployment, service and ingress",
                status: "Built"
            },
            {
                title: "Object storage",
                body: "Specs, runs and exports as files",
                status: "Planned"
            }
        ]
    }
];
const LANGS = [
    "cql",
    "sql",
    "sas",
    "r",
    "python"
];
function Cell({ t }) {
    if (!t) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "text-muted",
        children: "-"
    }, void 0, false, {
        fileName: "[project]/frontend-nextjs/app/platform/page.tsx",
        lineNumber: 55,
        columnNumber: 18
    }, this);
    if (t.coverage === "rules_only") return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
        tone: "accent",
        title: t.detail,
        children: "Rules only"
    }, void 0, false, {
        fileName: "[project]/frontend-nextjs/app/platform/page.tsx",
        lineNumber: 56,
        columnNumber: 43
    }, this);
    if (t.status === "verified" || t.status === "built") return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
        tone: "good",
        title: t.detail,
        children: "Verified"
    }, void 0, false, {
        fileName: "[project]/frontend-nextjs/app/platform/page.tsx",
        lineNumber: 57,
        columnNumber: 63
    }, this);
    if (t.status === "unverified_beta") return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
        tone: "warn",
        title: t.detail,
        children: "Unverified"
    }, void 0, false, {
        fileName: "[project]/frontend-nextjs/app/platform/page.tsx",
        lineNumber: 58,
        columnNumber: 46
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
        title: t.detail,
        children: "Unavailable"
    }, void 0, false, {
        fileName: "[project]/frontend-nextjs/app/platform/page.tsx",
        lineNumber: 59,
        columnNumber: 10
    }, this);
}
_c = Cell;
function Platform() {
    _s();
    const { tenantId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$workspace$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])();
    const targets = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$usePipeline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTargets"])();
    const health = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "health",
            tenantId
        ],
        queryFn: {
            "Platform.useQuery[health]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getHealth"])(tenantId)
        }["Platform.useQuery[health]"]
    });
    const all = targets.data?.targets ?? [];
    const edc = Array.from(new Map(all.map((t)=>[
            t.edcSystem,
            t.edcLabel
        ])).entries());
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mx-auto max-w-6xl space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-xl font-semibold tracking-tight",
                        children: "Platform"
                    }, void 0, false, {
                        fileName: "[project]/frontend-nextjs/app/platform/page.tsx",
                        lineNumber: 72,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 max-w-2xl text-sm text-muted",
                        children: "How Spec2Code is put together and what is real today. Status labels come from the repository, not from the roadmap."
                    }, void 0, false, {
                        fileName: "[project]/frontend-nextjs/app/platform/page.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend-nextjs/app/platform/page.tsx",
                lineNumber: 71,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                        title: "Solution architecture",
                        hint: "One pipeline serves every spec type and every output language.",
                        right: health.data ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                            tone: "good",
                            children: "API online"
                        }, void 0, false, {
                            fileName: "[project]/frontend-nextjs/app/platform/page.tsx",
                            lineNumber: 82,
                            columnNumber: 32
                        }, this) : health.isError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                            tone: "bad",
                            children: "API offline"
                        }, void 0, false, {
                            fileName: "[project]/frontend-nextjs/app/platform/page.tsx",
                            lineNumber: 82,
                            columnNumber: 89
                        }, this) : null
                    }, void 0, false, {
                        fileName: "[project]/frontend-nextjs/app/platform/page.tsx",
                        lineNumber: 79,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3 p-4",
                        children: LAYERS.map((layer)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid gap-3 md:grid-cols-[150px_1fr]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "pt-2 text-xs font-semibold uppercase tracking-wide text-muted",
                                        children: layer.name
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/app/platform/page.tsx",
                                        lineNumber: 87,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-4",
                                        children: layer.items.map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "rounded-lg border border-line p-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-start justify-between gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-sm font-medium",
                                                                children: i.title
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend-nextjs/app/platform/page.tsx",
                                                                lineNumber: 92,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                tone: TONE[i.status],
                                                                children: i.status
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend-nextjs/app/platform/page.tsx",
                                                                lineNumber: 93,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/frontend-nextjs/app/platform/page.tsx",
                                                        lineNumber: 91,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-1 text-xs text-muted",
                                                        children: i.body
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend-nextjs/app/platform/page.tsx",
                                                        lineNumber: 95,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, i.title, true, {
                                                fileName: "[project]/frontend-nextjs/app/platform/page.tsx",
                                                lineNumber: 90,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/app/platform/page.tsx",
                                        lineNumber: 88,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, layer.name, true, {
                                fileName: "[project]/frontend-nextjs/app/platform/page.tsx",
                                lineNumber: 86,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/frontend-nextjs/app/platform/page.tsx",
                        lineNumber: 84,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend-nextjs/app/platform/page.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                        title: "Output languages",
                        hint: "Straight from the backend registry. Unverified targets need an explicit confirmation before they run."
                    }, void 0, false, {
                        fileName: "[project]/frontend-nextjs/app/platform/page.tsx",
                        lineNumber: 105,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-x-auto p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                className: "w-full min-w-[520px] text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            className: "text-left text-xs text-muted",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "pb-2 font-medium",
                                                    children: "EDC system"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend-nextjs/app/platform/page.tsx",
                                                    lineNumber: 110,
                                                    columnNumber: 17
                                                }, this),
                                                LANGS.map((l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "pb-2 font-medium uppercase",
                                                        children: l
                                                    }, l, false, {
                                                        fileName: "[project]/frontend-nextjs/app/platform/page.tsx",
                                                        lineNumber: 112,
                                                        columnNumber: 19
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend-nextjs/app/platform/page.tsx",
                                            lineNumber: 109,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/app/platform/page.tsx",
                                        lineNumber: 108,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                        children: edc.map(([id, label])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                className: "border-t border-line",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "py-2 pr-3 font-medium",
                                                        children: label
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend-nextjs/app/platform/page.tsx",
                                                        lineNumber: 119,
                                                        columnNumber: 19
                                                    }, this),
                                                    LANGS.map((l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "py-2",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Cell, {
                                                                t: all.find((t)=>t.edcSystem === id && t.language === l)
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend-nextjs/app/platform/page.tsx",
                                                                lineNumber: 121,
                                                                columnNumber: 50
                                                            }, this)
                                                        }, l, false, {
                                                            fileName: "[project]/frontend-nextjs/app/platform/page.tsx",
                                                            lineNumber: 121,
                                                            columnNumber: 21
                                                        }, this))
                                                ]
                                            }, id, true, {
                                                fileName: "[project]/frontend-nextjs/app/platform/page.tsx",
                                                lineNumber: 118,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/app/platform/page.tsx",
                                        lineNumber: 116,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend-nextjs/app/platform/page.tsx",
                                lineNumber: 107,
                                columnNumber: 11
                            }, this),
                            targets.isError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-3 text-xs text-bad",
                                children: String(targets.error)
                            }, void 0, false, {
                                fileName: "[project]/frontend-nextjs/app/platform/page.tsx",
                                lineNumber: 127,
                                columnNumber: 31
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend-nextjs/app/platform/page.tsx",
                        lineNumber: 106,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend-nextjs/app/platform/page.tsx",
                lineNumber: 104,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend-nextjs/app/platform/page.tsx",
        lineNumber: 70,
        columnNumber: 5
    }, this);
}
_s(Platform, "VpebQscaOWc26+lDrlNLshwSBmo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$workspace$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$usePipeline$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTargets"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
_c1 = Platform;
var _c, _c1;
__turbopack_context__.k.register(_c, "Cell");
__turbopack_context__.k.register(_c1, "Platform");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend-nextjs/lib/usePipeline.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePipeline",
    ()=>usePipeline,
    "useTargets",
    ()=>useTargets
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$workspace$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/lib/workspace.tsx [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function useTargets(studyId = "") {
    _s();
    const { tenantId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$workspace$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])();
    const sid = studyId.trim();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "targets",
            tenantId,
            sid
        ],
        queryFn: {
            "useTargets.useQuery": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTargets"])(tenantId, sid)
        }["useTargets.useQuery"]
    });
}
_s(useTargets, "lxwjQkC80C5FH8yOT2mHgRGxPVo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$workspace$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function usePipeline() {
    _s1();
    const ws = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$workspace$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])();
    const { spec, tenantId, allowUnverified, review: reviewResult, setError, setTab } = ws;
    const targets = useTargets(spec.studyId);
    const cell = targets.data?.targets.find((t)=>t.edcSystem === spec.edcSystem && t.language === spec.language);
    const readyToSubmit = Boolean(spec.reportId.trim() && spec.description.trim());
    const busy = Object.values(ws.stages).some((s)=>s === "running");
    let blockReason = null;
    if (!readyToSubmit) blockReason = "Add a report ID and description first.";
    else if (!cell) blockReason = targets.isError ? "The target list could not be loaded." : "Loading targets";
    else if (!cell.available && !cell.optInRequired) blockReason = cell.detail;
    else if (cell.optInRequired && !allowUnverified) blockReason = "Confirm that this target is an unverified draft to continue.";
    const canGenerate = blockReason === null;
    // Each stage moves the user to its tab when it starts, so the page follows the run.
    const guard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "usePipeline.useCallback[guard]": async (stage, fn)=>{
            setError(null);
            setTab(stage);
            ws.setStage(stage, "running");
            try {
                return await fn();
            } catch (e) {
                ws.setStage(stage, "error");
                setError(e instanceof Error ? e.message : String(e));
                throw e;
            }
        }
    }["usePipeline.useCallback[guard]"], [
        ws,
        setError,
        setTab
    ]);
    const understand = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "usePipeline.useCallback[understand]": ()=>guard("understand", {
                "usePipeline.useCallback[understand]": async ()=>{
                    ws.setUnderstanding(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["understandSpec"])(spec, tenantId));
                    ws.setStage("understand", "done");
                }
            }["usePipeline.useCallback[understand]"])
    }["usePipeline.useCallback[understand]"], [
        guard,
        spec,
        tenantId,
        ws
    ]);
    const review = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "usePipeline.useCallback[review]": ()=>guard("review", {
                "usePipeline.useCallback[review]": async ()=>{
                    const r = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["reviewSpec"])(spec, tenantId);
                    ws.setReview(r);
                    ws.setStage("review", r.readiness === "needs_revision" ? "blocked" : "done");
                    return r;
                }
            }["usePipeline.useCallback[review]"])
    }["usePipeline.useCallback[review]"], [
        guard,
        spec,
        tenantId,
        ws
    ]);
    const generate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "usePipeline.useCallback[generate]": (specId)=>guard("generate", {
                "usePipeline.useCallback[generate]": async ()=>{
                    ws.setResult(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateCode"])(spec, specId ?? reviewResult?.specId ?? "", allowUnverified, tenantId));
                    ws.setStage("generate", "done");
                }
            }["usePipeline.useCallback[generate]"])
    }["usePipeline.useCallback[generate]"], [
        guard,
        spec,
        allowUnverified,
        tenantId,
        ws,
        reviewResult
    ]);
    /** Runs every stage. A review that needs revision pauses the run; generation then needs an explicit click. */ const runAll = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "usePipeline.useCallback[runAll]": async ()=>{
            ws.resetResults();
            try {
                await understand();
                const r = await review();
                if (r.readiness === "needs_revision") return;
                await generate(r.specId);
            } catch  {
            /* the failing stage has already recorded its error */ }
        }
    }["usePipeline.useCallback[runAll]"], [
        understand,
        review,
        generate,
        ws
    ]);
    return {
        busy,
        cell,
        canGenerate,
        blockReason,
        readyToSubmit,
        understand,
        review,
        generate,
        runAll
    };
}
_s1(usePipeline, "X0K88Y3nd93UGU9jlhDGW8bt96A=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$workspace$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        useTargets
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=frontend-nextjs_0yn2yq_._.js.map