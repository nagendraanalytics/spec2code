(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/frontend-nextjs/app/synthetic/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Synthetic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$workspace$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/lib/workspace.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/components/ui/primitives.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$studies$2f$StudyPicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/components/studies/StudyPicker.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$synthetic$2f$SetDetail$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/components/synthetic/SetDetail.tsx [app-client] (ecmascript)");
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
const CONCURRENCY = 3;
function readLocal(k) {
    try {
        return localStorage.getItem(k) ?? "";
    } catch  {
        return "";
    }
}
function Synthetic() {
    _s();
    const { tenantId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$workspace$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])();
    const qc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    const [reviewer, setReviewer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Synthetic.useEffect": ()=>setReviewer(readLocal("s2c.reviewer"))
    }["Synthetic.useEffect"], []);
    const saveReviewer = (v)=>{
        setReviewer(v);
        try {
            localStorage.setItem("s2c.reviewer", v);
        } catch  {}
    };
    const [source, setSource] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("library");
    const [batchId, setBatchId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [picked, setPicked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [studyId, setStudyId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [useKnowledge, setUseKnowledge] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [progress, setProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const specs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "specs",
            tenantId
        ],
        queryFn: {
            "Synthetic.useQuery[specs]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["listSpecs"])(tenantId)
        }["Synthetic.useQuery[specs]"],
        enabled: source === "library"
    });
    const batches = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "batches",
            tenantId
        ],
        queryFn: {
            "Synthetic.useQuery[batches]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["listBatches"])(tenantId)
        }["Synthetic.useQuery[batches]"]
    });
    const batch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "batch",
            batchId,
            tenantId
        ],
        queryFn: {
            "Synthetic.useQuery[batch]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBatch"])(batchId, tenantId)
        }["Synthetic.useQuery[batch]"],
        enabled: source === "batch" && !!batchId
    });
    const sets = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "synlist",
            tenantId
        ],
        queryFn: {
            "Synthetic.useQuery[sets]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["synList"])(tenantId)
        }["Synthetic.useQuery[sets]"]
    });
    const latest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Synthetic.useMemo[latest]": ()=>{
            const m = new Map();
            (sets.data ?? []).filter({
                "Synthetic.useMemo[latest]": (s)=>s.status !== "retired"
            }["Synthetic.useMemo[latest]"]).forEach({
                "Synthetic.useMemo[latest]": (s)=>m.set(s.reportId, s)
            }["Synthetic.useMemo[latest]"]);
            return m;
        }
    }["Synthetic.useMemo[latest]"], [
        sets.data
    ]);
    const targets = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Synthetic.useMemo[targets]": ()=>{
            if (source === "library") return (specs.data ?? []).map({
                "Synthetic.useMemo[targets]": (s)=>({
                        key: s.id,
                        label: s.reportId,
                        body: {
                            specId: s.id
                        }
                    })
            }["Synthetic.useMemo[targets]"]);
            return (batch.data?.items ?? []).filter({
                "Synthetic.useMemo[targets]": (i)=>i.reportId
            }["Synthetic.useMemo[targets]"]).map({
                "Synthetic.useMemo[targets]": (i)=>({
                        key: i.id,
                        label: i.reportId,
                        body: {
                            batchId,
                            batchItemId: i.id
                        }
                    })
            }["Synthetic.useMemo[targets]"]);
        }
    }["Synthetic.useMemo[targets]"], [
        source,
        specs.data,
        batch.data,
        batchId
    ]);
    const chosen = targets.filter((t)=>picked[t.key]);
    const run = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "Synthetic.useMutation[run]": async (list)=>{
                setProgress({
                    done: 0,
                    total: list.length,
                    failed: []
                });
                const queue = [
                    ...list
                ];
                const worker = {
                    "Synthetic.useMutation[run].worker": async ()=>{
                        for(let t = queue.shift(); t; t = queue.shift()){
                            try {
                                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["synGenerate"])({
                                    ...t.body,
                                    studyId,
                                    useKnowledge
                                }, tenantId, reviewer);
                            } catch (e) {
                                setProgress({
                                    "Synthetic.useMutation[run].worker": (p)=>p && {
                                            ...p,
                                            failed: [
                                                ...p.failed,
                                                {
                                                    label: t.label,
                                                    error: e instanceof Error ? e.message : String(e)
                                                }
                                            ]
                                        }
                                }["Synthetic.useMutation[run].worker"]);
                            }
                            setProgress({
                                "Synthetic.useMutation[run].worker": (p)=>p && {
                                        ...p,
                                        done: p.done + 1
                                    }
                            }["Synthetic.useMutation[run].worker"]);
                            qc.invalidateQueries({
                                queryKey: [
                                    "synlist"
                                ]
                            });
                        }
                    }
                }["Synthetic.useMutation[run].worker"];
                await Promise.all(Array.from({
                    length: Math.min(CONCURRENCY, list.length)
                }, worker));
            }
        }["Synthetic.useMutation[run]"]
    });
    const toggleAll = (on)=>setPicked(Object.fromEntries(targets.map((t)=>[
                t.key,
                on
            ])));
    const shownSets = (sets.data ?? []).filter((s)=>!status || s.status === status);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mx-auto max-w-5xl space-y-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-start gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-xl font-semibold tracking-tight",
                                children: "Synthetic data"
                            }, void 0, false, {
                                fileName: "[project]/frontend-nextjs/app/synthetic/page.tsx",
                                lineNumber: 78,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 max-w-2xl text-sm text-muted",
                                children: "Build test data from a listing's logic, check the expected include and exclude outcome for each condition, correct what is wrong, and sign it off. Works for one listing or a whole batch. Use it to review the logic before, or after, code is generated."
                            }, void 0, false, {
                                fileName: "[project]/frontend-nextjs/app/synthetic/page.tsx",
                                lineNumber: 79,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend-nextjs/app/synthetic/page.tsx",
                        lineNumber: 77,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "text-xs font-medium text-muted",
                        children: [
                            "Reviewer name",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"],
                                style: {
                                    width: "11rem"
                                },
                                value: reviewer,
                                onChange: (e)=>saveReviewer(e.target.value),
                                placeholder: "needed to sign off",
                                "aria-label": "Reviewer name"
                            }, void 0, false, {
                                fileName: "[project]/frontend-nextjs/app/synthetic/page.tsx",
                                lineNumber: 84,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend-nextjs/app/synthetic/page.tsx",
                        lineNumber: 83,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend-nextjs/app/synthetic/page.tsx",
                lineNumber: 76,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                        title: "Generate",
                        hint: "One model call per listing, three at a time. A new run of a listing becomes the next version and retires the old one."
                    }, void 0, false, {
                        fileName: "[project]/frontend-nextjs/app/synthetic/page.tsx",
                        lineNumber: 89,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3 p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: source === "library" ? "primary" : "secondary",
                                        onClick: ()=>{
                                            setSource("library");
                                            setPicked({});
                                        },
                                        children: "Library specs"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/app/synthetic/page.tsx",
                                        lineNumber: 92,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: source === "batch" ? "primary" : "secondary",
                                        onClick: ()=>{
                                            setSource("batch");
                                            setPicked({});
                                        },
                                        children: "A batch"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/app/synthetic/page.tsx",
                                        lineNumber: 93,
                                        columnNumber: 13
                                    }, this),
                                    source === "batch" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"],
                                        style: {
                                            width: "auto",
                                            marginTop: 0
                                        },
                                        value: batchId,
                                        onChange: (e)=>{
                                            setBatchId(e.target.value);
                                            setPicked({});
                                        },
                                        "aria-label": "Batch",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: "Choose a batch"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend-nextjs/app/synthetic/page.tsx",
                                                lineNumber: 96,
                                                columnNumber: 17
                                            }, this),
                                            (batches.data ?? []).map((b)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: b.id,
                                                    children: [
                                                        b.name || b.id.slice(0, 8),
                                                        " (",
                                                        b.counts.total,
                                                        " listings)"
                                                    ]
                                                }, b.id, true, {
                                                    fileName: "[project]/frontend-nextjs/app/synthetic/page.tsx",
                                                    lineNumber: 97,
                                                    columnNumber: 50
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend-nextjs/app/synthetic/page.tsx",
                                        lineNumber: 95,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend-nextjs/app/synthetic/page.tsx",
                                lineNumber: 91,
                                columnNumber: 11
                            }, this),
                            targets.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-muted",
                                children: source === "batch" ? batchId ? "This batch has no extracted listings." : "Choose a batch." : "No specs in the library yet."
                            }, void 0, false, {
                                fileName: "[project]/frontend-nextjs/app/synthetic/page.tsx",
                                lineNumber: 102,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3 text-xs",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "text-accent underline",
                                                onClick: ()=>toggleAll(true),
                                                children: "Select all"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend-nextjs/app/synthetic/page.tsx",
                                                lineNumber: 106,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "text-accent underline",
                                                onClick: ()=>toggleAll(false),
                                                children: "None"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend-nextjs/app/synthetic/page.tsx",
                                                lineNumber: 107,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-muted",
                                                children: [
                                                    chosen.length,
                                                    " selected"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend-nextjs/app/synthetic/page.tsx",
                                                lineNumber: 108,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend-nextjs/app/synthetic/page.tsx",
                                        lineNumber: 105,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "max-h-56 divide-y divide-line overflow-auto rounded-lg border border-line text-sm",
                                        "data-testid": "syn-targets",
                                        children: targets.map((t)=>{
                                            const cur = latest.get(t.label);
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: "flex items-center gap-3 px-3 py-1.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "checkbox",
                                                        checked: !!picked[t.key],
                                                        onChange: (e)=>setPicked({
                                                                ...picked,
                                                                [t.key]: e.target.checked
                                                            }),
                                                        "aria-label": `Select ${t.label}`
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend-nextjs/app/synthetic/page.tsx",
                                                        lineNumber: 115,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-mono text-xs",
                                                        children: t.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend-nextjs/app/synthetic/page.tsx",
                                                        lineNumber: 116,
                                                        columnNumber: 23
                                                    }, this),
                                                    cur ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                tone: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$synthetic$2f$SetDetail$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STATUS"][cur.status][0],
                                                                children: [
                                                                    __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$synthetic$2f$SetDetail$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STATUS"][cur.status][1],
                                                                    " v",
                                                                    cur.version
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/frontend-nextjs/app/synthetic/page.tsx",
                                                                lineNumber: 117,
                                                                columnNumber: 32
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs text-muted",
                                                                children: [
                                                                    cur.coverage.covered,
                                                                    "/",
                                                                    cur.coverage.total,
                                                                    " conditions covered"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/frontend-nextjs/app/synthetic/page.tsx",
                                                                lineNumber: 117,
                                                                columnNumber: 114
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/frontend-nextjs/app/synthetic/page.tsx",
                                                        lineNumber: 117,
                                                        columnNumber: 30
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs text-muted",
                                                        children: "no synthetic data yet"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend-nextjs/app/synthetic/page.tsx",
                                                        lineNumber: 117,
                                                        columnNumber: 226
                                                    }, this)
                                                ]
                                            }, t.key, true, {
                                                fileName: "[project]/frontend-nextjs/app/synthetic/page.tsx",
                                                lineNumber: 114,
                                                columnNumber: 21
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/app/synthetic/page.tsx",
                                        lineNumber: 110,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend-nextjs/app/synthetic/page.tsx",
                                lineNumber: 104,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid gap-3 sm:grid-cols-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$studies$2f$StudyPicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        value: studyId,
                                        onChange: setStudyId,
                                        noneLabel: "No study (use the listing's own, if any)",
                                        label: "Study for field names"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/app/synthetic/page.tsx",
                                        lineNumber: 125,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "flex items-center gap-2 text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "checkbox",
                                                checked: useKnowledge,
                                                onChange: (e)=>setUseKnowledge(e.target.checked)
                                            }, void 0, false, {
                                                fileName: "[project]/frontend-nextjs/app/synthetic/page.tsx",
                                                lineNumber: 126,
                                                columnNumber: 64
                                            }, this),
                                            "Use approved knowledge"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend-nextjs/app/synthetic/page.tsx",
                                        lineNumber: 126,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend-nextjs/app/synthetic/page.tsx",
                                lineNumber: 124,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "primary",
                                disabled: !chosen.length || run.isPending,
                                onClick: ()=>run.mutate(chosen),
                                children: run.isPending ? "Generating" : `Generate for ${chosen.length || "selected"} listing${chosen.length === 1 ? "" : "s"}`
                            }, void 0, false, {
                                fileName: "[project]/frontend-nextjs/app/synthetic/page.tsx",
                                lineNumber: 128,
                                columnNumber: 11
                            }, this),
                            progress && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm",
                                "data-testid": "syn-progress",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: [
                                            progress.done,
                                            " of ",
                                            progress.total,
                                            " done",
                                            progress.failed.length ? `, ${progress.failed.length} failed` : "",
                                            "."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend-nextjs/app/synthetic/page.tsx",
                                        lineNumber: 133,
                                        columnNumber: 15
                                    }, this),
                                    progress.failed.map((f, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-bad",
                                            children: [
                                                f.label,
                                                ": ",
                                                f.error
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/frontend-nextjs/app/synthetic/page.tsx",
                                            lineNumber: 134,
                                            columnNumber: 46
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend-nextjs/app/synthetic/page.tsx",
                                lineNumber: 132,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend-nextjs/app/synthetic/page.tsx",
                        lineNumber: 90,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend-nextjs/app/synthetic/page.tsx",
                lineNumber: 88,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$synthetic$2f$SetDetail$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: open,
                reviewer: reviewer,
                onClose: ()=>setOpen(null)
            }, open, false, {
                fileName: "[project]/frontend-nextjs/app/synthetic/page.tsx",
                lineNumber: 140,
                columnNumber: 16
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                        title: "Sets",
                        right: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"],
                            style: {
                                width: "auto",
                                marginTop: 0
                            },
                            value: status,
                            onChange: (e)=>setStatus(e.target.value),
                            "aria-label": "Status",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "",
                                    children: "All statuses"
                                }, void 0, false, {
                                    fileName: "[project]/frontend-nextjs/app/synthetic/page.tsx",
                                    lineNumber: 145,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "draft",
                                    children: "Draft"
                                }, void 0, false, {
                                    fileName: "[project]/frontend-nextjs/app/synthetic/page.tsx",
                                    lineNumber: 145,
                                    columnNumber: 51
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "reviewed",
                                    children: "Reviewed"
                                }, void 0, false, {
                                    fileName: "[project]/frontend-nextjs/app/synthetic/page.tsx",
                                    lineNumber: 145,
                                    columnNumber: 87
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "retired",
                                    children: "Retired"
                                }, void 0, false, {
                                    fileName: "[project]/frontend-nextjs/app/synthetic/page.tsx",
                                    lineNumber: 145,
                                    columnNumber: 129
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend-nextjs/app/synthetic/page.tsx",
                            lineNumber: 144,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/frontend-nextjs/app/synthetic/page.tsx",
                        lineNumber: 143,
                        columnNumber: 9
                    }, this),
                    shownSets.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "p-6 text-center text-sm text-muted",
                        children: "No synthetic data yet."
                    }, void 0, false, {
                        fileName: "[project]/frontend-nextjs/app/synthetic/page.tsx",
                        lineNumber: 147,
                        columnNumber: 35
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "divide-y divide-line",
                        "data-testid": "syn-sets",
                        children: shownSets.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "flex flex-wrap items-center gap-2 px-4 py-2.5 text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-mono text-xs font-semibold",
                                        children: s.reportId
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/app/synthetic/page.tsx",
                                        lineNumber: 151,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                        children: [
                                            "v",
                                            s.version
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend-nextjs/app/synthetic/page.tsx",
                                        lineNumber: 151,
                                        columnNumber: 86
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                        tone: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$synthetic$2f$SetDetail$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STATUS"][s.status][0],
                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$synthetic$2f$SetDetail$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STATUS"][s.status][1]
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/app/synthetic/page.tsx",
                                        lineNumber: 152,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-muted",
                                        children: [
                                            s.caseCount,
                                            " cases (",
                                            s.include,
                                            " include, ",
                                            s.exclude,
                                            " exclude) · ",
                                            s.coverage.covered,
                                            "/",
                                            s.coverage.total,
                                            " conditions covered"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend-nextjs/app/synthetic/page.tsx",
                                        lineNumber: 153,
                                        columnNumber: 17
                                    }, this),
                                    s.coverage.uncovered.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                        tone: "warn",
                                        children: [
                                            s.coverage.uncovered.length,
                                            " gap",
                                            s.coverage.uncovered.length === 1 ? "" : "s"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend-nextjs/app/synthetic/page.tsx",
                                        lineNumber: 154,
                                        columnNumber: 53
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex-1"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/app/synthetic/page.tsx",
                                        lineNumber: 155,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "ghost",
                                        onClick: ()=>setOpen(s.id),
                                        children: "Open"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/app/synthetic/page.tsx",
                                        lineNumber: 156,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, s.id, true, {
                                fileName: "[project]/frontend-nextjs/app/synthetic/page.tsx",
                                lineNumber: 150,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/frontend-nextjs/app/synthetic/page.tsx",
                        lineNumber: 148,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend-nextjs/app/synthetic/page.tsx",
                lineNumber: 142,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend-nextjs/app/synthetic/page.tsx",
        lineNumber: 75,
        columnNumber: 5
    }, this);
}
_s(Synthetic, "vBJIf0dL6BXUACUw4+7k8N677rE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$workspace$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
_c = Synthetic;
var _c;
__turbopack_context__.k.register(_c, "Synthetic");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend-nextjs/components/studies/StudyPicker.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StudyPicker
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$useStudies$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/lib/useStudies.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/components/ui/primitives.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const PROVIDER_LABEL = {
    claude: "Claude",
    gemini: "Gemini",
    gpt: "GPT"
};
function StudyPicker({ value, onChange, noneLabel = "No study (names come from the spec only)", label = "Study", showBadge = true }) {
    _s();
    const studies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$useStudies$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStudies"])();
    const list = studies.data ?? [];
    const current = list.find((s)=>s.studyId === value);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                value: value,
                onChange: (e)=>onChange(e.target.value),
                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"],
                "aria-label": label,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                        value: "",
                        children: noneLabel
                    }, void 0, false, {
                        fileName: "[project]/frontend-nextjs/components/studies/StudyPicker.tsx",
                        lineNumber: 29,
                        columnNumber: 9
                    }, this),
                    value && !current && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                        value: value,
                        children: [
                            value,
                            " (no metadata loaded)"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend-nextjs/components/studies/StudyPicker.tsx",
                        lineNumber: 30,
                        columnNumber: 31
                    }, this),
                    list.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                            value: s.studyId,
                            children: [
                                s.studyId,
                                s.name ? `: ${s.name}` : ""
                            ]
                        }, s.studyId, true, {
                            fileName: "[project]/frontend-nextjs/components/studies/StudyPicker.tsx",
                            lineNumber: 32,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/frontend-nextjs/components/studies/StudyPicker.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            showBadge && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-1.5 flex flex-wrap items-center gap-2 text-[11px] text-muted",
                children: [
                    current?.counts ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                        tone: "good",
                        children: [
                            "Metadata v",
                            current.activeVersion,
                            " · ",
                            current.counts.items,
                            " items · ",
                            current.counts.forms,
                            " forms"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend-nextjs/components/studies/StudyPicker.tsx",
                        lineNumber: 40,
                        columnNumber: 13
                    }, this) : value ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                        tone: "warn",
                        children: "No metadata loaded for this study"
                    }, void 0, false, {
                        fileName: "[project]/frontend-nextjs/components/studies/StudyPicker.tsx",
                        lineNumber: 42,
                        columnNumber: 13
                    }, this) : null,
                    current && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                        children: [
                            "Model: ",
                            PROVIDER_LABEL[current.modelConfig?.provider ?? "claude"] ?? current.modelConfig?.provider,
                            current.modelConfig?.model ? ` · ${current.modelConfig.model}` : ""
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend-nextjs/components/studies/StudyPicker.tsx",
                        lineNumber: 45,
                        columnNumber: 13
                    }, this),
                    studies.isError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-bad",
                        children: [
                            "Could not load studies: ",
                            studies.error instanceof Error ? studies.error.message : String(studies.error)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend-nextjs/components/studies/StudyPicker.tsx",
                        lineNumber: 51,
                        columnNumber: 13
                    }, this) : list.length === 0 && !studies.isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "No studies yet."
                    }, void 0, false, {
                        fileName: "[project]/frontend-nextjs/components/studies/StudyPicker.tsx",
                        lineNumber: 53,
                        columnNumber: 13
                    }, this) : null,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/studies/",
                        className: "text-accent hover:underline",
                        children: "Study setup"
                    }, void 0, false, {
                        fileName: "[project]/frontend-nextjs/components/studies/StudyPicker.tsx",
                        lineNumber: 55,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend-nextjs/components/studies/StudyPicker.tsx",
                lineNumber: 38,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend-nextjs/components/studies/StudyPicker.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
_s(StudyPicker, "M83IzfdUSNh5LZ6U4p6HNIrhLGg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$useStudies$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStudies"]
    ];
});
_c = StudyPicker;
var _c;
__turbopack_context__.k.register(_c, "StudyPicker");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend-nextjs/components/synthetic/RunPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RunPanel
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
async function toBase64(file) {
    const bytes = new Uint8Array(await file.arrayBuffer());
    let bin = "";
    for(let i = 0; i < bytes.length; i += 0x8000)bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
    return btoa(bin);
}
const Q = {
    TP: "good",
    TN: "good",
    FP: "bad",
    FN: "bad"
};
function Result({ run }) {
    const c = run.counts;
    const wrong = (c.FP ?? 0) + (c.FN ?? 0);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-2 rounded-lg border border-line p-3 text-xs",
        "data-testid": "syn-run",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                        tone: run.status === "could_not_execute" ? "warn" : "accent",
                        children: run.status === "executed" ? "Executed here (SQLite)" : run.status === "uploaded" ? `Uploaded${run.language ? ` (${run.language.toUpperCase()})` : ""}` : "Could not execute"
                    }, void 0, false, {
                        fileName: "[project]/frontend-nextjs/components/synthetic/RunPanel.tsx",
                        lineNumber: 25,
                        columnNumber: 9
                    }, this),
                    run.status !== "could_not_execute" && (wrong === 0 && (c.not_judged ?? 0) === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                        tone: "good",
                        children: "All cases match"
                    }, void 0, false, {
                        fileName: "[project]/frontend-nextjs/components/synthetic/RunPanel.tsx",
                        lineNumber: 26,
                        columnNumber: 92
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                        tone: "bad",
                        children: [
                            wrong,
                            " mismatch",
                            wrong === 1 ? "" : "es"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend-nextjs/components/synthetic/RunPanel.tsx",
                        lineNumber: 26,
                        columnNumber: 137
                    }, this)),
                    run.stale && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                        tone: "warn",
                        title: "The cases were edited after this run",
                        children: "Stale"
                    }, void 0, false, {
                        fileName: "[project]/frontend-nextjs/components/synthetic/RunPanel.tsx",
                        lineNumber: 27,
                        columnNumber: 23
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-muted",
                        children: [
                            "v",
                            run.setVersion,
                            " · ",
                            run.createdAt ? new Date(run.createdAt).toLocaleString() : "",
                            run.sourceName ? ` · ${run.sourceName}` : "",
                            run.createdBy ? ` · ${run.createdBy}` : ""
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend-nextjs/components/synthetic/RunPanel.tsx",
                        lineNumber: 28,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend-nextjs/components/synthetic/RunPanel.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            run.error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-bad",
                children: run.error
            }, void 0, false, {
                fileName: "[project]/frontend-nextjs/components/synthetic/RunPanel.tsx",
                lineNumber: 30,
                columnNumber: 21
            }, this),
            run.status !== "could_not_execute" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-muted",
                        children: [
                            run.rowsReturned,
                            " rows returned. TP ",
                            c.TP ?? 0,
                            " · TN ",
                            c.TN ?? 0,
                            " · FP ",
                            c.FP ?? 0,
                            " · FN ",
                            c.FN ?? 0,
                            c.not_judged ? ` · ${c.not_judged} not judged` : ""
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend-nextjs/components/synthetic/RunPanel.tsx",
                        lineNumber: 33,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "divide-y divide-line rounded-lg border border-line",
                        children: run.results.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "flex flex-wrap items-center gap-2 px-2 py-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-mono",
                                        children: r.caseId
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/components/synthetic/RunPanel.tsx",
                                        lineNumber: 37,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                        tone: r.expectation === "include" ? "good" : "bad",
                                        children: r.expectation
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/components/synthetic/RunPanel.tsx",
                                        lineNumber: 38,
                                        columnNumber: 17
                                    }, this),
                                    r.quadrant ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                        tone: Q[r.quadrant],
                                        children: r.quadrant
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/components/synthetic/RunPanel.tsx",
                                        lineNumber: 39,
                                        columnNumber: 31
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                        tone: "warn",
                                        children: "not judged"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/components/synthetic/RunPanel.tsx",
                                        lineNumber: 39,
                                        columnNumber: 82
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: r.quadrant === "FP" || r.quadrant === "FN" || !r.quadrant ? "text-bad" : "text-muted",
                                        children: r.detail || (r.quadrant ? "matches" : "")
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/components/synthetic/RunPanel.tsx",
                                        lineNumber: 40,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, r.caseId, true, {
                                fileName: "[project]/frontend-nextjs/components/synthetic/RunPanel.tsx",
                                lineNumber: 36,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/frontend-nextjs/components/synthetic/RunPanel.tsx",
                        lineNumber: 34,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend-nextjs/components/synthetic/RunPanel.tsx",
                lineNumber: 32,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend-nextjs/components/synthetic/RunPanel.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
_c = Result;
function RunPanel({ set, reviewer }) {
    _s();
    const { tenantId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$workspace$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])();
    const qc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    const runs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "synruns",
            set.id,
            tenantId
        ],
        queryFn: {
            "RunPanel.useQuery[runs]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["synRuns"])(set.id, tenantId)
        }["RunPanel.useQuery[runs]"]
    });
    const [code, setCode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [lang, setLang] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("cql");
    const [err, setErr] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const file = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const done = ()=>{
        setErr(null);
        qc.invalidateQueries({
            queryKey: [
                "synruns",
                set.id,
                tenantId
            ]
        });
    };
    const fail = (e)=>setErr(e instanceof Error ? e.message : String(e));
    const sql = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "RunPanel.useMutation[sql]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["synRunSql"])(set.id, code, tenantId, reviewer)
        }["RunPanel.useMutation[sql]"],
        onSuccess: done,
        onError: fail
    });
    const upload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "RunPanel.useMutation[upload]": async (f)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["synUploadResult"])(set.id, {
                    name: f.name,
                    data: await toBase64(f)
                }, lang, "", tenantId, reviewer)
        }["RunPanel.useMutation[upload]"],
        onSuccess: done,
        onError: fail
    });
    const issues = set.keyIssues;
    const sharedN = Object.keys(issues.shared).length;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-3",
        "data-testid": "syn-runpanel",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs font-medium text-muted",
                children: "Run against code"
            }, void 0, false, {
                fileName: "[project]/frontend-nextjs/components/synthetic/RunPanel.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, this),
            set.status !== "reviewed" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "rounded-lg bg-warnsoft p-2 text-xs text-warn",
                children: "This set is not signed off yet. A result is only as reliable as the expectations it is compared with."
            }, void 0, false, {
                fileName: "[project]/frontend-nextjs/components/synthetic/RunPanel.tsx",
                lineNumber: 71,
                columnNumber: 37
            }, this),
            (issues.noKey.length > 0 || sharedN > 0) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "rounded-lg bg-warnsoft p-2 text-xs text-warn",
                children: [
                    issues.noKey.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            "Cases with no subject ID: ",
                            issues.noKey.join(", "),
                            ". "
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend-nextjs/components/synthetic/RunPanel.tsx",
                        lineNumber: 74,
                        columnNumber: 39
                    }, this),
                    sharedN > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            "Subject IDs used by more than one case: ",
                            Object.keys(issues.shared).join(", "),
                            ". "
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend-nextjs/components/synthetic/RunPanel.tsx",
                        lineNumber: 75,
                        columnNumber: 27
                    }, this),
                    "These cases cannot be judged. Give each case its own subject IDs."
                ]
            }, void 0, true, {
                fileName: "[project]/frontend-nextjs/components/synthetic/RunPanel.tsx",
                lineNumber: 73,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-3 md:grid-cols-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2 rounded-lg border border-line p-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-medium",
                                children: "SQL: run here"
                            }, void 0, false, {
                                fileName: "[project]/frontend-nextjs/components/synthetic/RunPanel.tsx",
                                lineNumber: 81,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-muted",
                                children: [
                                    "Runs in a throwaway read-only SQLite database. Empty values load as NULL. Leave the box empty to use the newest SQL stored for ",
                                    set.reportId,
                                    '. SQL written for another database may not run unchanged, and that is reported as "could not execute", not as a failure.'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend-nextjs/components/synthetic/RunPanel.tsx",
                                lineNumber: 82,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"]} font-mono text-xs`,
                                rows: 5,
                                value: code,
                                onChange: (e)=>setCode(e.target.value),
                                placeholder: "SELECT SubjectId FROM AE WHERE ...",
                                "aria-label": "SQL to run"
                            }, void 0, false, {
                                fileName: "[project]/frontend-nextjs/components/synthetic/RunPanel.tsx",
                                lineNumber: 83,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "primary",
                                disabled: sql.isPending,
                                onClick: ()=>sql.mutate(),
                                children: sql.isPending ? "Running" : "Run SQL"
                            }, void 0, false, {
                                fileName: "[project]/frontend-nextjs/components/synthetic/RunPanel.tsx",
                                lineNumber: 84,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend-nextjs/components/synthetic/RunPanel.tsx",
                        lineNumber: 80,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2 rounded-lg border border-line p-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-medium",
                                children: "CQL, SAS and others: run in the real system"
                            }, void 0, false, {
                                fileName: "[project]/frontend-nextjs/components/synthetic/RunPanel.tsx",
                                lineNumber: 87,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-muted",
                                children: "These cannot run here. Download the test pack, load the data and run the code in your system (Veeva, SAS), then upload the CSV it returns. The comparison is the same."
                            }, void 0, false, {
                                fileName: "[project]/frontend-nextjs/components/synthetic/RunPanel.tsx",
                                lineNumber: 88,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"],
                                        style: {
                                            width: "auto",
                                            marginTop: 0
                                        },
                                        value: lang,
                                        onChange: (e)=>setLang(e.target.value),
                                        "aria-label": "Language of the code",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "cql",
                                                children: "CQL"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend-nextjs/components/synthetic/RunPanel.tsx",
                                                lineNumber: 91,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "sas",
                                                children: "SAS"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend-nextjs/components/synthetic/RunPanel.tsx",
                                                lineNumber: 91,
                                                columnNumber: 47
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "r",
                                                children: "R"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend-nextjs/components/synthetic/RunPanel.tsx",
                                                lineNumber: 91,
                                                columnNumber: 79
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "python",
                                                children: "Python"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend-nextjs/components/synthetic/RunPanel.tsx",
                                                lineNumber: 91,
                                                columnNumber: 107
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "sql",
                                                children: "SQL"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend-nextjs/components/synthetic/RunPanel.tsx",
                                                lineNumber: 91,
                                                columnNumber: 145
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "tsql",
                                                children: "T-SQL"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend-nextjs/components/synthetic/RunPanel.tsx",
                                                lineNumber: 91,
                                                columnNumber: 177
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend-nextjs/components/synthetic/RunPanel.tsx",
                                        lineNumber: 90,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["synTestpack"])(set.id, lang, tenantId, `${set.reportId}_testpack_v${set.version}`).catch(fail),
                                        children: "Download test pack"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/components/synthetic/RunPanel.tsx",
                                        lineNumber: 93,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        ref: file,
                                        type: "file",
                                        accept: ".csv",
                                        className: "hidden",
                                        "data-testid": "syn-upload",
                                        onChange: (e)=>e.target.files?.[0] && upload.mutate(e.target.files[0])
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/components/synthetic/RunPanel.tsx",
                                        lineNumber: 94,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        disabled: upload.isPending,
                                        onClick: ()=>file.current?.click(),
                                        children: upload.isPending ? "Reading" : "Upload result CSV"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/components/synthetic/RunPanel.tsx",
                                        lineNumber: 95,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend-nextjs/components/synthetic/RunPanel.tsx",
                                lineNumber: 89,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend-nextjs/components/synthetic/RunPanel.tsx",
                        lineNumber: 86,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend-nextjs/components/synthetic/RunPanel.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, this),
            err && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "rounded-lg bg-badsoft p-2 text-sm text-bad",
                children: err
            }, void 0, false, {
                fileName: "[project]/frontend-nextjs/components/synthetic/RunPanel.tsx",
                lineNumber: 99,
                columnNumber: 15
            }, this),
            (runs.data ?? []).map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Result, {
                    run: r
                }, r.id, false, {
                    fileName: "[project]/frontend-nextjs/components/synthetic/RunPanel.tsx",
                    lineNumber: 100,
                    columnNumber: 37
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/frontend-nextjs/components/synthetic/RunPanel.tsx",
        lineNumber: 69,
        columnNumber: 5
    }, this);
}
_s(RunPanel, "XSTfwHY3yxItcyMUDX5XgUN7dQQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$workspace$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
_c1 = RunPanel;
var _c, _c1;
__turbopack_context__.k.register(_c, "Result");
__turbopack_context__.k.register(_c1, "RunPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend-nextjs/components/synthetic/SetDetail.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "STATUS",
    ()=>STATUS,
    "default",
    ()=>SetDetail
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$workspace$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/lib/workspace.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/components/ui/primitives.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$synthetic$2f$RunPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/components/synthetic/RunPanel.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const STATUS = {
    draft: [
        "warn",
        "Draft"
    ],
    reviewed: [
        "good",
        "Reviewed"
    ],
    retired: [
        "neutral",
        "Retired"
    ]
};
function Tables({ c }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-2",
        children: c.tables.map((t, i)=>{
            const cols = Array.from(new Set(t.rows.flatMap((r)=>Object.keys(r))));
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "overflow-auto rounded-lg border border-line",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "border-b border-line bg-surface2 px-2 py-1 font-mono text-[11px]",
                        children: t.form || "(form)"
                    }, void 0, false, {
                        fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                        lineNumber: 20,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                        className: "w-full text-[11px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: cols.map((k)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-2 py-1 text-left font-medium text-muted",
                                            children: k
                                        }, k, false, {
                                            fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                                            lineNumber: 22,
                                            columnNumber: 43
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                                    lineNumber: 22,
                                    columnNumber: 22
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                                lineNumber: 22,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                children: t.rows.map((r, j)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        className: "border-t border-line",
                                        children: cols.map((k)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-2 py-1 font-mono",
                                                children: r[k] ?? ""
                                            }, k, false, {
                                                fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                                                lineNumber: 23,
                                                columnNumber: 106
                                            }, this))
                                    }, j, false, {
                                        fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                                        lineNumber: 23,
                                        columnNumber: 44
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                                lineNumber: 23,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                        lineNumber: 21,
                        columnNumber: 13
                    }, this)
                ]
            }, i, true, {
                fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                lineNumber: 19,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
_c = Tables;
function SetDetail({ id, reviewer, onClose }) {
    _s();
    const { tenantId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$workspace$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"])();
    const qc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "syn",
            id,
            tenantId
        ],
        queryFn: {
            "SetDetail.useQuery[q]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["synGet"])(id, tenantId)
        }["SetDetail.useQuery[q]"]
    });
    const [err, setErr] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [filter, setFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("all");
    const refresh = (d)=>{
        if (d) qc.setQueryData([
            "syn",
            id,
            tenantId
        ], d);
        qc.invalidateQueries({
            queryKey: [
                "synlist"
            ]
        });
    };
    const fail = (e)=>setErr(e instanceof Error ? e.message : String(e));
    const edit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "SetDetail.useMutation[edit]": (cases)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["synEdit"])(id, {
                    cases
                }, tenantId)
        }["SetDetail.useMutation[edit]"],
        onSuccess: {
            "SetDetail.useMutation[edit]": (d)=>{
                setErr(null);
                refresh(d);
            }
        }["SetDetail.useMutation[edit]"],
        onError: fail
    });
    const sign = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "SetDetail.useMutation[sign]": async ()=>{
                try {
                    return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["synApprove"])(id, false, tenantId, reviewer);
                } catch (e) {
                    const body = e.body;
                    if (body?.coverage && window.confirm(`These conditions are not fully covered: ${body.coverage.uncovered.join(", ") || "(cases with no condition)"}.\n\nSign off with the gaps acknowledged?`)) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["synApprove"])(id, true, tenantId, reviewer);
                    throw e;
                }
            }
        }["SetDetail.useMutation[sign]"],
        onSuccess: {
            "SetDetail.useMutation[sign]": (d)=>{
                setErr(null);
                refresh(d);
            }
        }["SetDetail.useMutation[sign]"],
        onError: fail
    });
    const reopen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "SetDetail.useMutation[reopen]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["synReopen"])(id, tenantId)
        }["SetDetail.useMutation[reopen]"],
        onSuccess: refresh,
        onError: fail
    });
    const del = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "SetDetail.useMutation[del]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["synDelete"])(id, tenantId)
        }["SetDetail.useMutation[del]"],
        onSuccess: {
            "SetDetail.useMutation[del]": ()=>{
                refresh();
                onClose();
            }
        }["SetDetail.useMutation[del]"],
        onError: fail
    });
    if (q.isLoading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        className: "p-4 text-sm text-muted",
        children: "Loading"
    }, void 0, false, {
        fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
        lineNumber: 60,
        columnNumber: 27
    }, this);
    if (q.isError || !q.data) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        className: "p-4 text-sm text-bad",
        children: String(q.error)
    }, void 0, false, {
        fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
        lineNumber: 61,
        columnNumber: 36
    }, this);
    const d = q.data;
    const cases = d.cases ?? [];
    const locked = d.status === "retired";
    const [tone, label] = STATUS[d.status];
    const change = (cid, patch)=>edit.mutate(cases.map((c)=>c.id === cid ? {
                ...c,
                ...patch
            } : c));
    const shown = cases.filter((c)=>filter === "all" || (filter === "boundary" ? c.boundary : filter.startsWith("c:") ? c.conditionId === filter.slice(2) : c.expectation === filter));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-4 p-4",
            "data-testid": "syn-detail",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-wrap items-center gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-mono text-sm font-semibold",
                            children: d.reportId
                        }, void 0, false, {
                            fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                            lineNumber: 73,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                            children: [
                                "v",
                                d.version
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                            lineNumber: 74,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                            tone: tone,
                            children: label
                        }, void 0, false, {
                            fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                            lineNumber: 75,
                            columnNumber: 11
                        }, this),
                        d.edited && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                            tone: "accent",
                            children: "Edited"
                        }, void 0, false, {
                            fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                            lineNumber: 76,
                            columnNumber: 24
                        }, this),
                        d.usedKnowledge && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                            tone: "accent",
                            children: "Knowledge used"
                        }, void 0, false, {
                            fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                            lineNumber: 77,
                            columnNumber: 31
                        }, this),
                        d.reviewedBy && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xs text-muted",
                            children: [
                                "signed off by ",
                                d.reviewedBy
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                            lineNumber: 78,
                            columnNumber: 28
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "flex-1"
                        }, void 0, false, {
                            fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                            lineNumber: 79,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "ghost",
                            onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["synDownload"])(id, "csv", tenantId, `${d.reportId}_synthetic_v${d.version}`).catch(fail),
                            children: "CSV"
                        }, void 0, false, {
                            fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                            lineNumber: 80,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "ghost",
                            onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["synDownload"])(id, "json", tenantId, `${d.reportId}_synthetic_v${d.version}`).catch(fail),
                            children: "JSON"
                        }, void 0, false, {
                            fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                            lineNumber: 81,
                            columnNumber: 11
                        }, this),
                        d.status === "reviewed" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            onClick: ()=>reopen.mutate(),
                            children: "Reopen"
                        }, void 0, false, {
                            fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                            lineNumber: 82,
                            columnNumber: 39
                        }, this),
                        d.status === "draft" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "primary",
                            disabled: !reviewer || sign.isPending,
                            title: reviewer ? "" : "Enter your reviewer name above first",
                            onClick: ()=>sign.mutate(),
                            children: "Sign off"
                        }, void 0, false, {
                            fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                            lineNumber: 83,
                            columnNumber: 36
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "ghost",
                            onClick: ()=>window.confirm(`Delete ${d.reportId} v${d.version}?`) && del.mutate(),
                            children: "Delete"
                        }, void 0, false, {
                            fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                            lineNumber: 84,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "ghost",
                            onClick: onClose,
                            children: "Close"
                        }, void 0, false, {
                            fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                            lineNumber: 85,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                    lineNumber: 72,
                    columnNumber: 9
                }, this),
                err && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "rounded-lg bg-badsoft p-2 text-sm text-bad",
                    children: err
                }, void 0, false, {
                    fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                    lineNumber: 87,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "rounded-lg bg-warnsoft p-2 text-xs text-warn",
                    children: "Synthetic data built from the spec's wording by a model. It shows what the logic should do. It is not a run against real data, and a reviewer should correct any case whose expectation is wrong."
                }, void 0, false, {
                    fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                    lineNumber: 88,
                    columnNumber: 9
                }, this),
                d.summary && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm",
                    children: d.summary
                }, void 0, false, {
                    fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                    lineNumber: 91,
                    columnNumber: 23
                }, this),
                (d.openQuestions?.length ?? 0) > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rounded-lg border border-line p-3 text-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs font-medium text-muted",
                            children: "Open questions for the spec author"
                        }, void 0, false, {
                            fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                            lineNumber: 94,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            className: "mt-1 list-disc pl-5",
                            children: d.openQuestions.map((o, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    children: o
                                }, i, false, {
                                    fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                                    lineNumber: 95,
                                    columnNumber: 81
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                            lineNumber: 95,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                    lineNumber: 93,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mb-1 text-xs font-medium text-muted",
                            children: [
                                "Logic coverage: ",
                                d.coverage.covered,
                                " of ",
                                d.coverage.total,
                                " conditions have both an include and an exclude case"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                            lineNumber: 100,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            className: "divide-y divide-line rounded-lg border border-line text-xs",
                            "data-testid": "syn-coverage",
                            children: d.coverage.conditions.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    className: "flex flex-wrap items-start gap-2 px-3 py-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono",
                                            children: c.id
                                        }, void 0, false, {
                                            fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                                            lineNumber: 104,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "min-w-0 flex-1",
                                            children: c.text
                                        }, void 0, false, {
                                            fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                                            lineNumber: 105,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                            tone: "good",
                                            children: [
                                                c.include,
                                                " include"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                                            lineNumber: 106,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                            tone: "bad",
                                            children: [
                                                c.exclude,
                                                " exclude"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                                            lineNumber: 106,
                                            columnNumber: 63
                                        }, this),
                                        c.boundary > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                            children: [
                                                c.boundary,
                                                " boundary"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                                            lineNumber: 106,
                                            columnNumber: 127
                                        }, this),
                                        c.gap ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                            tone: "warn",
                                            children: c.gap
                                        }, void 0, false, {
                                            fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                                            lineNumber: 107,
                                            columnNumber: 26
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                            tone: "good",
                                            children: "covered"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                                            lineNumber: 107,
                                            columnNumber: 63
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "text-accent underline",
                                            onClick: ()=>setFilter(`c:${c.id}`),
                                            children: "cases"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                                            lineNumber: 108,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, c.id, true, {
                                    fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                                    lineNumber: 103,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                            lineNumber: 101,
                            columnNumber: 11
                        }, this),
                        d.coverage.orphanCases.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-1 text-xs text-warn",
                            children: [
                                "Cases not tied to a listed condition: ",
                                d.coverage.orphanCases.join(", ")
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                            lineNumber: 112,
                            columnNumber: 49
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                    lineNumber: 99,
                    columnNumber: 9
                }, this),
                d.status !== "retired" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$synthetic$2f$RunPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    set: d,
                    reviewer: reviewer
                }, void 0, false, {
                    fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                    lineNumber: 115,
                    columnNumber: 36
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs font-medium text-muted",
                            children: [
                                "Cases (",
                                shown.length,
                                " of ",
                                cases.length,
                                ")"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                            lineNumber: 118,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"],
                            style: {
                                width: "auto",
                                marginTop: 0
                            },
                            value: filter,
                            onChange: (e)=>setFilter(e.target.value),
                            "aria-label": "Filter cases",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "all",
                                    children: "All"
                                }, void 0, false, {
                                    fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                                    lineNumber: 120,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "include",
                                    children: "Include"
                                }, void 0, false, {
                                    fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                                    lineNumber: 120,
                                    columnNumber: 45
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "exclude",
                                    children: "Exclude"
                                }, void 0, false, {
                                    fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                                    lineNumber: 120,
                                    columnNumber: 85
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "boundary",
                                    children: "Boundary only"
                                }, void 0, false, {
                                    fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                                    lineNumber: 120,
                                    columnNumber: 125
                                }, this),
                                d.coverage.conditions.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: `c:${c.id}`,
                                        children: [
                                            "Condition ",
                                            c.id
                                        ]
                                    }, c.id, true, {
                                        fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                                        lineNumber: 121,
                                        columnNumber: 47
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                            lineNumber: 119,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                    lineNumber: 117,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                    className: "space-y-3",
                    children: shown.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            className: "space-y-2 rounded-lg border border-line p-3 text-xs",
                            "data-testid": "syn-case",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono",
                                            children: c.id
                                        }, void 0, false, {
                                            fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                                            lineNumber: 128,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-muted",
                                            children: [
                                                "tests ",
                                                c.conditionId || "?"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                                            lineNumber: 128,
                                            columnNumber: 58
                                        }, this),
                                        c.boundary && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                            children: "boundary"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                                            lineNumber: 129,
                                            columnNumber: 32
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "flex-1"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                                            lineNumber: 130,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            disabled: locked,
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"],
                                            style: {
                                                width: "auto",
                                                marginTop: 0
                                            },
                                            value: c.expectation,
                                            "aria-label": `Expectation for ${c.id}`,
                                            onChange: (e)=>change(c.id, {
                                                    expectation: e.target.value
                                                }),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "include",
                                                    children: "Should be included"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                                                    lineNumber: 133,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "exclude",
                                                    children: "Should be excluded"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                                                    lineNumber: 133,
                                                    columnNumber: 70
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                                            lineNumber: 131,
                                            columnNumber: 17
                                        }, this),
                                        !locked && cases.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "ghost",
                                            onClick: ()=>edit.mutate(cases.filter((x)=>x.id !== c.id)),
                                            children: "Remove"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                                            lineNumber: 135,
                                            columnNumber: 49
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                                    lineNumber: 127,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm",
                                    children: c.scenario
                                }, void 0, false, {
                                    fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                                    lineNumber: 137,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-muted",
                                    children: c.rationale
                                }, void 0, false, {
                                    fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                                    lineNumber: 138,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tables, {
                                    c: c
                                }, void 0, false, {
                                    fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                                    lineNumber: 139,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    disabled: locked,
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"],
                                    defaultValue: c.note,
                                    placeholder: "Reviewer note",
                                    "aria-label": `Note for ${c.id}`,
                                    onBlur: (e)=>e.target.value !== c.note && change(c.id, {
                                            note: e.target.value
                                        })
                                }, void 0, false, {
                                    fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                                    lineNumber: 140,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, c.id, true, {
                            fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                            lineNumber: 126,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
                    lineNumber: 124,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
            lineNumber: 71,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/frontend-nextjs/components/synthetic/SetDetail.tsx",
        lineNumber: 70,
        columnNumber: 5
    }, this);
}
_s(SetDetail, "TY14ezyL3Z8eul0i/2NjBbZr91k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$workspace$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkspace"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
_c1 = SetDetail;
var _c, _c1;
__turbopack_context__.k.register(_c, "Tables");
__turbopack_context__.k.register(_c1, "SetDetail");
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

//# sourceMappingURL=frontend-nextjs_1anhfit._.js.map