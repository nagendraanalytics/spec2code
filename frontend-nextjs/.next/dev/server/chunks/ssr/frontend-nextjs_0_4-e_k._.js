module.exports = [
"[project]/frontend-nextjs/app/studies/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StudiesPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$database$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Database$3e$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/database.mjs [app-ssr] (ecmascript) <export default as Database>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/loader-circle.mjs [app-ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/plus.mjs [app-ssr] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/lib/api.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$useStudies$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/lib/useStudies.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$workspace$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/lib/workspace.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/components/ui/primitives.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$studies$2f$StudyDetail$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/components/studies/StudyDetail.tsx [app-ssr] (ecmascript)");
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
function StudiesPage() {
    const { tenantId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$workspace$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWorkspace"])();
    const qc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    const studies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$useStudies$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStudies"])();
    const edcs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "edc",
            tenantId
        ],
        queryFn: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getEdcSystems"])(tenantId)
    });
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [adding, setAdding] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [id, setId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [ta, setTa] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [sponsor, setSponsor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [edc, setEdc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("veeva");
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const list = studies.data ?? [];
    const active = list.find((s)=>s.studyId === selected) ?? null;
    async function create() {
        setBusy(true);
        setError(null);
        try {
            const s = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createStudy"])(id.trim(), name.trim(), edc, tenantId, ta.trim(), sponsor.trim());
            await qc.invalidateQueries({
                queryKey: [
                    "studies"
                ]
            });
            setSelected(s.studyId);
            setAdding(false);
            setId("");
            setName("");
            setTa("");
            setSponsor("");
        } catch (e) {
            setError(e instanceof Error ? e.message : String(e));
        } finally{
            setBusy(false);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mx-auto max-w-[1300px] space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-xl font-semibold tracking-tight",
                        children: "Study setup"
                    }, void 0, false, {
                        fileName: "[project]/frontend-nextjs/app/studies/page.tsx",
                        lineNumber: 52,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-sm text-muted",
                        children: "Load a study's metadata once (items, visits, code lists), then pick the study for a single listing or a whole batch. Generated code then uses the study's real form and item names."
                    }, void 0, false, {
                        fileName: "[project]/frontend-nextjs/app/studies/page.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend-nextjs/app/studies/page.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-5 lg:grid-cols-[300px_minmax(0,1fr)]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                        className: "self-start",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                                title: `Studies (${list.length})`,
                                right: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "secondary",
                                    onClick: ()=>setAdding((v)=>!v),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                            size: 15,
                                            "aria-hidden": true
                                        }, void 0, false, {
                                            fileName: "[project]/frontend-nextjs/app/studies/page.tsx",
                                            lineNumber: 60,
                                            columnNumber: 130
                                        }, this),
                                        " New"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend-nextjs/app/studies/page.tsx",
                                    lineNumber: 60,
                                    columnNumber: 65
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/frontend-nextjs/app/studies/page.tsx",
                                lineNumber: 60,
                                columnNumber: 11
                            }, this),
                            adding && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3 border-b border-line bg-surface2 p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Field"], {
                                        label: "Study ID",
                                        hint: "Letters, numbers, dot, dash or underscore.",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            value: id,
                                            onChange: (e)=>setId(e.target.value),
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["inputCls"],
                                            placeholder: "e.g. MK-1234-001"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend-nextjs/app/studies/page.tsx",
                                            lineNumber: 64,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/app/studies/page.tsx",
                                        lineNumber: 63,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Field"], {
                                        label: "Name (optional)",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            value: name,
                                            onChange: (e)=>setName(e.target.value),
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["inputCls"]
                                        }, void 0, false, {
                                            fileName: "[project]/frontend-nextjs/app/studies/page.tsx",
                                            lineNumber: 66,
                                            columnNumber: 46
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/app/studies/page.tsx",
                                        lineNumber: 66,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Field"], {
                                        label: "Sponsor (optional)",
                                        hint: "Selects which sponsor knowledge applies to this study.",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            value: sponsor,
                                            onChange: (e)=>setSponsor(e.target.value),
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["inputCls"],
                                            placeholder: "e.g. Merck"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend-nextjs/app/studies/page.tsx",
                                            lineNumber: 68,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/app/studies/page.tsx",
                                        lineNumber: 67,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Field"], {
                                        label: "Therapeutic area (optional)",
                                        hint: "Selects which TA knowledge applies to this study.",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            value: ta,
                                            onChange: (e)=>setTa(e.target.value),
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["inputCls"],
                                            placeholder: "e.g. Oncology"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend-nextjs/app/studies/page.tsx",
                                            lineNumber: 71,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/app/studies/page.tsx",
                                        lineNumber: 70,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Field"], {
                                        label: "EDC system",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: edc,
                                            onChange: (e)=>setEdc(e.target.value),
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["inputCls"],
                                            "aria-label": "EDC system",
                                            children: (edcs.data?.edcSystems ?? [
                                                {
                                                    id: "veeva",
                                                    label: "Veeva Vault CDMS"
                                                }
                                            ]).map((e)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: e.id,
                                                    children: e.label
                                                }, e.id, false, {
                                                    fileName: "[project]/frontend-nextjs/app/studies/page.tsx",
                                                    lineNumber: 75,
                                                    columnNumber: 103
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/frontend-nextjs/app/studies/page.tsx",
                                            lineNumber: 74,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/app/studies/page.tsx",
                                        lineNumber: 73,
                                        columnNumber: 15
                                    }, this),
                                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-bad",
                                        role: "alert",
                                        children: error
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/app/studies/page.tsx",
                                        lineNumber: 78,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "primary",
                                        className: "w-full",
                                        onClick: create,
                                        disabled: busy || !id.trim(),
                                        children: [
                                            busy && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                size: 15,
                                                className: "animate-spin",
                                                "aria-hidden": true
                                            }, void 0, false, {
                                                fileName: "[project]/frontend-nextjs/app/studies/page.tsx",
                                                lineNumber: 80,
                                                columnNumber: 26
                                            }, this),
                                            " Create study"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend-nextjs/app/studies/page.tsx",
                                        lineNumber: 79,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend-nextjs/app/studies/page.tsx",
                                lineNumber: 62,
                                columnNumber: 13
                            }, this),
                            list.length === 0 && !adding ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col items-center gap-2 px-6 py-10 text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid h-11 w-11 place-items-center rounded-2xl bg-accentsoft text-accent",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$database$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Database$3e$__["Database"], {
                                            size: 20,
                                            "aria-hidden": true
                                        }, void 0, false, {
                                            fileName: "[project]/frontend-nextjs/app/studies/page.tsx",
                                            lineNumber: 86,
                                            columnNumber: 104
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/app/studies/page.tsx",
                                        lineNumber: 86,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-muted",
                                        children: "No studies yet. Create one, then upload its metadata."
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/app/studies/page.tsx",
                                        lineNumber: 87,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend-nextjs/app/studies/page.tsx",
                                lineNumber: 85,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "divide-y divide-line",
                                children: list.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setSelected(s.studyId),
                                            className: `w-full px-4 py-2.5 text-left hover:bg-surface2 ${s.studyId === selected ? "bg-accentsoft" : ""}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "truncate font-mono text-xs font-semibold",
                                                            children: s.studyId
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend-nextjs/app/studies/page.tsx",
                                                            lineNumber: 95,
                                                            columnNumber: 23
                                                        }, this),
                                                        s.counts ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                            tone: "good",
                                                            children: [
                                                                "v",
                                                                s.activeVersion
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/frontend-nextjs/app/studies/page.tsx",
                                                            lineNumber: 96,
                                                            columnNumber: 35
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                            tone: "warn",
                                                            children: "No metadata"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend-nextjs/app/studies/page.tsx",
                                                            lineNumber: 96,
                                                            columnNumber: 83
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend-nextjs/app/studies/page.tsx",
                                                    lineNumber: 94,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "truncate text-xs text-muted",
                                                    children: [
                                                        edcs.data?.edcSystems.find((e)=>e.id === s.edcSystem)?.label ?? s.edcSystem,
                                                        s.counts ? ` · ${s.counts.items} items` : ""
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend-nextjs/app/studies/page.tsx",
                                                    lineNumber: 98,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend-nextjs/app/studies/page.tsx",
                                            lineNumber: 93,
                                            columnNumber: 19
                                        }, this)
                                    }, s.studyId, false, {
                                        fileName: "[project]/frontend-nextjs/app/studies/page.tsx",
                                        lineNumber: 92,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/frontend-nextjs/app/studies/page.tsx",
                                lineNumber: 90,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend-nextjs/app/studies/page.tsx",
                        lineNumber: 59,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-w-0",
                        children: active ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$studies$2f$StudyDetail$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            studyId: active.studyId,
                            edc: edcs.data?.edcSystems.find((e)=>e.id === active.edcSystem),
                            onDeleted: ()=>setSelected("")
                        }, active.studyId, false, {
                            fileName: "[project]/frontend-nextjs/app/studies/page.tsx",
                            lineNumber: 108,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "px-6 py-16 text-center text-sm text-muted",
                                children: "Select a study to manage its metadata, or create a new one."
                            }, void 0, false, {
                                fileName: "[project]/frontend-nextjs/app/studies/page.tsx",
                                lineNumber: 110,
                                columnNumber: 19
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/frontend-nextjs/app/studies/page.tsx",
                            lineNumber: 110,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/frontend-nextjs/app/studies/page.tsx",
                        lineNumber: 106,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend-nextjs/app/studies/page.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend-nextjs/app/studies/page.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, this);
}
}),
"[project]/frontend-nextjs/components/studies/StudyDetail.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StudyDetail
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/triangle-alert.mjs [app-ssr] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/circle-check.mjs [app-ssr] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/info.mjs [app-ssr] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/loader-circle.mjs [app-ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/trash.mjs [app-ssr] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/upload.mjs [app-ssr] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/circle-x.mjs [app-ssr] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/lib/api.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$workspace$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/lib/workspace.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/components/ui/primitives.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$studies$2f$StudyModelSettings$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/components/studies/StudyModelSettings.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
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
const SEV_ICON = {
    error: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
        size: 14,
        className: "mt-0.5 shrink-0 text-bad",
        "aria-hidden": true
    }, void 0, false, {
        fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
        lineNumber: 20,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0)),
    warning: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
        size: 14,
        className: "mt-0.5 shrink-0 text-warn",
        "aria-hidden": true
    }, void 0, false, {
        fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
        lineNumber: 21,
        columnNumber: 12
    }, ("TURBOPACK compile-time value", void 0)),
    info: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
        size: 14,
        className: "mt-0.5 shrink-0 text-accent",
        "aria-hidden": true
    }, void 0, false, {
        fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
        lineNumber: 22,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0))
};
function Checks({ checks }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
        className: "space-y-1.5",
        children: checks.map((c, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                className: "flex gap-2 text-xs",
                children: [
                    SEV_ICON[c.severity],
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            c.text,
                            c.count != null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-muted",
                                children: [
                                    " (",
                                    c.count,
                                    ")"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                lineNumber: 31,
                                columnNumber: 45
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                        lineNumber: 31,
                        columnNumber: 11
                    }, this)
                ]
            }, i, true, {
                fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                lineNumber: 29,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
function StudyDetail({ studyId, edc, onDeleted }) {
    const { tenantId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$workspace$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWorkspace"])();
    const qc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    const fileRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [carryOver, setCarryOver] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [notes, setNotes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [last, setLast] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [q, setQ] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const study = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "study",
            studyId,
            tenantId
        ],
        queryFn: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getStudy"])(studyId, tenantId)
    });
    const d = study.data;
    const items = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "study-items",
            studyId,
            tenantId,
            d?.activeVersion,
            form,
            q
        ],
        queryFn: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getStudyItems"])(studyId, tenantId, {
                form,
                q
            }),
        enabled: !!d?.activeVersion
    });
    const refresh = ()=>Promise.all([
            qc.invalidateQueries({
                queryKey: [
                    "studies"
                ]
            }),
            qc.invalidateQueries({
                queryKey: [
                    "study",
                    studyId
                ]
            }),
            qc.invalidateQueries({
                queryKey: [
                    "study-items",
                    studyId
                ]
            }),
            qc.invalidateQueries({
                queryKey: [
                    "targets"
                ]
            })
        ]);
    async function upload(files) {
        if (!files.length) return;
        setBusy(true);
        setError(null);
        setLast(null);
        try {
            const encoded = await Promise.all(files.map(async (f)=>({
                    name: f.name,
                    data: await toBase64(f)
                })));
            const r = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uploadMetadata"])(studyId, encoded, carryOver, notes, tenantId);
            setLast({
                messages: r.messages,
                checks: r.checks,
                version: r.version.version
            });
            setNotes("");
            setForm("");
            await refresh();
        } catch (e) {
            setError(e instanceof Error ? e.message : String(e));
        } finally{
            setBusy(false);
            if (fileRef.current) fileRef.current.value = "";
        }
    }
    async function activate(v) {
        setError(null);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["activateVersion"])(studyId, v, tenantId);
            await refresh();
        } catch (e) {
            setError(e instanceof Error ? e.message : String(e));
        }
    }
    async function remove() {
        if (!window.confirm(`Delete study ${studyId} and all of its metadata versions? Finished batch runs keep their results.`)) return;
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["deleteStudy"])(studyId, tenantId);
            await refresh();
            onDeleted();
        } catch (e) {
            setError(e instanceof Error ? e.message : String(e));
        }
    }
    if (study.isLoading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        className: "p-6 text-sm text-muted",
        children: "Loading"
    }, void 0, false, {
        fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
        lineNumber: 105,
        columnNumber: 31
    }, this);
    if (!d) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        className: "rounded-lg bg-badsoft p-3 text-sm text-bad",
        children: String(study.error ?? "Study not found")
    }, void 0, false, {
        fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
        lineNumber: 106,
        columnNumber: 18
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                        title: `${d.studyId}${d.name ? `: ${d.name}` : ""}`,
                        hint: `${edc?.label ?? d.edcSystem}${edc ? ` · ${edc.vendor}` : ""}`,
                        right: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "ghost",
                            onClick: remove,
                            title: "Delete this study",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                    size: 15,
                                    "aria-hidden": true
                                }, void 0, false, {
                                    fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                    lineNumber: 114,
                                    columnNumber: 85
                                }, this),
                                " Delete"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                            lineNumber: 114,
                            columnNumber: 18
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                        lineNumber: 111,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4 p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block max-w-sm text-xs font-medium text-muted",
                                children: [
                                    "Therapeutic area",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        defaultValue: d.ta ?? "",
                                        placeholder: "e.g. Oncology",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["inputCls"],
                                        "aria-label": "Therapeutic area",
                                        onBlur: async (e)=>{
                                            if (e.target.value.trim() !== (d.ta ?? "")) {
                                                try {
                                                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["patchStudy"])(studyId, {
                                                        ta: e.target.value
                                                    }, tenantId);
                                                    await refresh();
                                                } catch (x) {
                                                    setError(x instanceof Error ? x.message : String(x));
                                                }
                                            }
                                        }
                                    }, d.ta ?? "", false, {
                                        fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                        lineNumber: 118,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "mt-1 block font-normal",
                                        children: "Selects which therapeutic-area knowledge and rules apply to this study."
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                        lineNumber: 120,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                lineNumber: 117,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block max-w-sm text-xs font-medium text-muted",
                                children: [
                                    "Sponsor",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        defaultValue: d.sponsor ?? "",
                                        placeholder: "e.g. Merck",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["inputCls"],
                                        "aria-label": "Sponsor",
                                        onBlur: async (e)=>{
                                            if (e.target.value.trim() !== (d.sponsor ?? "")) {
                                                try {
                                                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["patchStudy"])(studyId, {
                                                        sponsor: e.target.value
                                                    }, tenantId);
                                                    await refresh();
                                                } catch (x) {
                                                    setError(x instanceof Error ? x.message : String(x));
                                                }
                                            }
                                        }
                                    }, `sp-${d.sponsor ?? ""}`, false, {
                                        fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                        lineNumber: 123,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "mt-1 block font-normal",
                                        children: "Selects which sponsor knowledge and rules apply to this study."
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                        lineNumber: 125,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                lineNumber: 122,
                                columnNumber: 11
                            }, this),
                            d.counts ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-2 text-xs",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                        tone: "good",
                                        children: [
                                            "Active: version ",
                                            d.activeVersion
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                        lineNumber: 129,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                        children: [
                                            d.counts.items,
                                            " items"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                        lineNumber: 130,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                        children: [
                                            d.counts.forms,
                                            " forms"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                        lineNumber: 131,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                        children: [
                                            d.counts.visits,
                                            " visits"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                        lineNumber: 132,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                        children: [
                                            d.counts.codelists,
                                            " code lists"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                        lineNumber: 133,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                lineNumber: 128,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "rounded-lg bg-warnsoft p-3 text-xs text-warn",
                                children: "No metadata yet. Upload the study's item list below to ground generated code in real form and item names."
                            }, void 0, false, {
                                fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                lineNumber: 136,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-lg border border-dashed border-line p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                ref: fileRef,
                                                type: "file",
                                                multiple: true,
                                                accept: ".csv,.xlsx,.xlsm",
                                                className: "hidden",
                                                id: "meta-files",
                                                onChange: (e)=>void upload(Array.from(e.target.files ?? []))
                                            }, void 0, false, {
                                                fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                                lineNumber: 141,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "primary",
                                                onClick: ()=>fileRef.current?.click(),
                                                disabled: busy,
                                                children: [
                                                    busy ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                        size: 15,
                                                        className: "animate-spin",
                                                        "aria-hidden": true
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                                        lineNumber: 143,
                                                        columnNumber: 25
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                                        size: 15,
                                                        "aria-hidden": true
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                                        lineNumber: 143,
                                                        columnNumber: 86
                                                    }, this),
                                                    "Upload metadata files"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                                lineNumber: 142,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-muted",
                                                children: "CSV or Excel. Items, visits and code lists are told apart by their column headings, so one workbook or several files both work."
                                            }, void 0, false, {
                                                fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                                lineNumber: 146,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                        lineNumber: 140,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "mt-3 flex items-start gap-2 text-xs",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "checkbox",
                                                className: "mt-0.5 h-4 w-4 accent-[var(--accent)]",
                                                checked: carryOver,
                                                onChange: (e)=>setCarryOver(e.target.checked)
                                            }, void 0, false, {
                                                fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                                lineNumber: 149,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Keep visits and code lists from the previous version when this upload does not include them"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                                lineNumber: 150,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                        lineNumber: 148,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: notes,
                                        onChange: (e)=>setNotes(e.target.value),
                                        placeholder: "Version note (optional), e.g. Amendment 3 CRF changes",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["inputCls"],
                                        "aria-label": "Version note"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                        lineNumber: 152,
                                        columnNumber: 13
                                    }, this),
                                    edc && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-3 text-[11px] leading-relaxed text-muted",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-medium",
                                                children: [
                                                    edc.label,
                                                    " export:"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                                lineNumber: 155,
                                                columnNumber: 17
                                            }, this),
                                            " ",
                                            edc.export_hint,
                                            " Column matching is based on general knowledge of common export layouts and has not been tested against real ",
                                            edc.label,
                                            " exports, so check the matched columns reported after each upload."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                        lineNumber: 154,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                lineNumber: 139,
                                columnNumber: 11
                            }, this),
                            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "rounded-lg bg-badsoft p-3 text-sm text-bad",
                                role: "alert",
                                children: error
                            }, void 0, false, {
                                fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                lineNumber: 160,
                                columnNumber: 21
                            }, this),
                            last && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3 rounded-lg bg-surface2 p-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "flex items-center gap-1.5 text-sm font-medium",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                size: 15,
                                                className: "text-good",
                                                "aria-hidden": true
                                            }, void 0, false, {
                                                fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                                lineNumber: 163,
                                                columnNumber: 76
                                            }, this),
                                            " Saved as version ",
                                            last.version
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                        lineNumber: 163,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "space-y-1 text-xs text-muted",
                                        children: last.messages.map((m, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: m.text
                                            }, i, false, {
                                                fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                                lineNumber: 164,
                                                columnNumber: 89
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                        lineNumber: 164,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Checks, {
                                        checks: last.checks
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                        lineNumber: 165,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                lineNumber: 162,
                                columnNumber: 13
                            }, this),
                            !last && d.checks && d.checks.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Checks, {
                                checks: d.checks
                            }, void 0, false, {
                                fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                lineNumber: 168,
                                columnNumber: 56
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                        lineNumber: 116,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                lineNumber: 110,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$studies$2f$StudyModelSettings$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                studyId: studyId,
                tenantId: tenantId,
                value: d.modelConfig ?? null
            }, JSON.stringify(d.modelConfig ?? null), false, {
                fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                lineNumber: 172,
                columnNumber: 7
            }, this),
            d.versionList.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                        title: "Versions",
                        hint: "Each upload is a new version. Runs pin the version they used, so older results stay explainable."
                    }, void 0, false, {
                        fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                        lineNumber: 176,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "divide-y divide-line",
                        children: d.versionList.map((v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "flex flex-wrap items-center gap-3 px-4 py-2.5 text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-semibold",
                                        children: [
                                            "v",
                                            v.version
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                        lineNumber: 180,
                                        columnNumber: 17
                                    }, this),
                                    v.active && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                        tone: "good",
                                        children: "Active"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                        lineNumber: 181,
                                        columnNumber: 30
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-muted",
                                        children: [
                                            v.counts.items,
                                            " items · ",
                                            v.counts.forms,
                                            " forms",
                                            v.counts.carriedOver?.length ? ` · kept ${v.counts.carriedOver.join(", ")}` : ""
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                        lineNumber: 182,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "min-w-0 flex-1 truncate text-xs text-muted",
                                        children: v.notes || v.sourceFiles.join(", ")
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                        lineNumber: 183,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs tabular-nums text-muted",
                                        children: v.createdAt ? new Date(v.createdAt).toLocaleDateString() : ""
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                        lineNumber: 184,
                                        columnNumber: 17
                                    }, this),
                                    !v.active && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "secondary",
                                        onClick: ()=>void activate(v.version),
                                        children: "Make active"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                        lineNumber: 185,
                                        columnNumber: 31
                                    }, this)
                                ]
                            }, v.version, true, {
                                fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                lineNumber: 179,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                        lineNumber: 177,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                lineNumber: 175,
                columnNumber: 9
            }, this),
            d.activeVersion && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                        title: "Forms and items",
                        hint: `Active version ${d.activeVersion}`
                    }, void 0, false, {
                        fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                        lineNumber: 194,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-4 p-4 md:grid-cols-[220px_minmax(0,1fr)]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "max-h-80 space-y-0.5 overflow-y-auto text-sm",
                                "aria-label": "Forms",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setForm(""),
                                            className: `w-full rounded-md px-2 py-1 text-left ${form === "" ? "bg-accentsoft font-medium text-accent" : "hover:bg-surface2"}`,
                                            children: "All forms"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                            lineNumber: 198,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                        lineNumber: 197,
                                        columnNumber: 15
                                    }, this),
                                    items.data?.forms.map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setForm(f.form),
                                                className: `flex w-full items-center justify-between gap-2 rounded-md px-2 py-1 text-left ${form === f.form ? "bg-accentsoft font-medium text-accent" : "hover:bg-surface2"}`,
                                                title: f.label,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "truncate font-mono text-xs",
                                                        children: f.form
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                                        lineNumber: 203,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[11px] text-muted",
                                                        children: f.items
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                                        lineNumber: 203,
                                                        columnNumber: 81
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                                lineNumber: 202,
                                                columnNumber: 19
                                            }, this)
                                        }, f.form, false, {
                                            fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                            lineNumber: 201,
                                            columnNumber: 17
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                lineNumber: 196,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "min-w-0 space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: q,
                                        onChange: (e)=>setQ(e.target.value),
                                        placeholder: "Search item, label or form",
                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["inputCls"]} mt-0`,
                                        "aria-label": "Search items"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                        lineNumber: 209,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "max-h-80 overflow-auto rounded-lg border border-line",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                            className: "w-full text-left text-xs",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                    className: "sticky top-0 bg-surface2 text-muted",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "px-3 py-2 font-medium",
                                                                children: "Form"
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                                                lineNumber: 212,
                                                                columnNumber: 78
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "px-3 py-2 font-medium",
                                                                children: "Item"
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                                                lineNumber: 212,
                                                                columnNumber: 125
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "px-3 py-2 font-medium",
                                                                children: "Label"
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                                                lineNumber: 212,
                                                                columnNumber: 172
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "px-3 py-2 font-medium",
                                                                children: "Type"
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                                                lineNumber: 212,
                                                                columnNumber: 220
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                                        lineNumber: 212,
                                                        columnNumber: 74
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                                    lineNumber: 212,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                    className: "divide-y divide-line",
                                                    children: [
                                                        items.data?.items.map((i, n)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "px-3 py-1.5 font-mono",
                                                                        children: i.form
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                                                        lineNumber: 215,
                                                                        columnNumber: 60
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "px-3 py-1.5 font-mono",
                                                                        children: i.item
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                                                        lineNumber: 215,
                                                                        columnNumber: 111
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "px-3 py-1.5",
                                                                        children: i.label
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                                                        lineNumber: 215,
                                                                        columnNumber: 162
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "px-3 py-1.5 text-muted",
                                                                        children: i.data_type
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                                                        lineNumber: 215,
                                                                        columnNumber: 204
                                                                    }, this)
                                                                ]
                                                            }, `${i.form}.${i.item}.${n}`, true, {
                                                                fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                                                lineNumber: 215,
                                                                columnNumber: 23
                                                            }, this)),
                                                        items.data && items.data.items.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                colSpan: 4,
                                                                className: "px-3 py-6 text-center text-muted",
                                                                children: "Nothing matches."
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                                                lineNumber: 217,
                                                                columnNumber: 73
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                                            lineNumber: 217,
                                                            columnNumber: 69
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                                    lineNumber: 213,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                            lineNumber: 211,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                        lineNumber: 210,
                                        columnNumber: 15
                                    }, this),
                                    items.data?.total != null && items.data.total > items.data.items.length && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[11px] text-muted",
                                        children: [
                                            "Showing ",
                                            items.data.items.length,
                                            " of ",
                                            items.data.total,
                                            ". Narrow with a form or search."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                        lineNumber: 221,
                                        columnNumber: 91
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                                lineNumber: 208,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                        lineNumber: 195,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
                lineNumber: 193,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend-nextjs/components/studies/StudyDetail.tsx",
        lineNumber: 109,
        columnNumber: 5
    }, this);
}
}),
"[project]/frontend-nextjs/components/studies/StudyModelSettings.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StudyModelSettings
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
/*
 * StudyModelSettings -- per-study "Generation model" card for the Study setup page.
 * Mounted in StudyDetail.tsx between the study card and the Versions card.
 *
 * Needs (not in the codebase yet):
 *   "@/lib/types"  : ModelConfig, ProviderInfo, and `modelConfig?: ModelConfig | null` on the study type
 *   "@/lib/api"    : getModelProviders(tenantId) -> { providers: ProviderInfo[] }
 *                    patchStudy(studyId, { modelConfig }, tenantId)   (existing function; backend must accept modelConfig)
 *
 *   export type ModelConfig = {
 *     provider: "claude" | "gemini" | "gpt";
 *     model?: string;
 *     maxTokens?: number;
 *     stepModels?: Record<string, { provider?: string; model?: string }>;
 *   };
 *   export type ProviderInfo = {
 *     id: "claude" | "gemini" | "gpt";
 *     label: string;
 *     enabled: boolean;        // allowed on this deployment (CQLGEN_ALLOWED_PROVIDERS)
 *     keyConfigured: boolean;  // the server has the API key; keys never reach the browser
 *     models: { id: string; label: string }[];   // suggestions only
 *     note?: string;           // e.g. "Testing only - not approved for client data"
 *   };
 *
 * The backend maps stepModels -> step_models and maxTokens -> max_tokens, runs
 * validate_model_config(), and returns its message as the error text.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/lucide-react/dist/esm/icons/loader-circle.mjs [app-ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/lib/api.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/components/ui/primitives.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
const STEPS = [
    {
        id: "domains",
        label: "Domains"
    },
    {
        id: "columns",
        label: "Columns"
    },
    {
        id: "joins",
        label: "Joins"
    },
    {
        id: "filters",
        label: "Filters"
    },
    {
        id: "edge_cases",
        label: "Edge cases"
    },
    {
        id: "self_check",
        label: "Self-check"
    },
    {
        id: "synthesis",
        label: "Synthesis (final CQL)"
    }
];
// Shown when the server's provider list can't be loaded (for example the endpoint is not deployed yet).
// The server still validates the choice on save.
const FALLBACK_PROVIDERS = [
    {
        id: "claude",
        label: "Claude",
        enabled: true,
        keyConfigured: true,
        models: []
    },
    {
        id: "gemini",
        label: "Gemini",
        enabled: true,
        keyConfigured: true,
        models: []
    },
    {
        id: "gpt",
        label: "GPT",
        enabled: true,
        keyConfigured: true,
        models: []
    }
];
function StudyModelSettings({ studyId, tenantId, value }) {
    const qc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    const providers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "model-providers",
            tenantId
        ],
        queryFn: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getModelProviders"])(tenantId)
    });
    const list = providers.data?.providers?.length ? providers.data.providers : FALLBACK_PROVIDERS;
    const [provider, setProvider] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(value?.provider ?? "claude");
    const [model, setModel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(value?.model ?? "");
    const [steps, setSteps] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>Object.fromEntries(Object.entries(value?.stepModels ?? {}).map(([k, v])=>[
                k,
                {
                    provider: v.provider ?? "",
                    model: v.model ?? ""
                }
            ])));
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [saved, setSaved] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const current = list.find((p)=>p.id === provider);
    function buildConfig() {
        const stepModels = {};
        for (const [step, row] of Object.entries(steps)){
            if (!row.provider && !row.model.trim()) continue;
            stepModels[step] = {
                ...row.provider ? {
                    provider: row.provider
                } : {},
                ...row.model.trim() ? {
                    model: row.model.trim()
                } : {}
            };
        }
        return {
            provider: provider,
            ...model.trim() ? {
                model: model.trim()
            } : {},
            ...Object.keys(stepModels).length ? {
                stepModels
            } : {}
        };
    }
    const cfg = buildConfig();
    const dirty = JSON.stringify(cfg) !== JSON.stringify(value ?? {
        provider: "claude"
    });
    function setStep(step, patch) {
        setSaved(false);
        setSteps((s)=>({
                ...s,
                [step]: {
                    provider: "",
                    model: "",
                    ...s[step],
                    ...patch
                }
            }));
    }
    async function save() {
        setError(null);
        setSaved(false);
        // A step on a different provider needs its own model id (ids don't carry across providers).
        for (const [step, row] of Object.entries(steps)){
            if (row.provider && row.provider !== provider && !row.model.trim()) {
                setError(`Step "${step}" uses a different provider, so it needs its own model id.`);
                return;
            }
        }
        setBusy(true);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["patchStudy"])(studyId, {
                modelConfig: cfg
            }, tenantId);
            await Promise.all([
                qc.invalidateQueries({
                    queryKey: [
                        "studies"
                    ]
                }),
                qc.invalidateQueries({
                    queryKey: [
                        "study",
                        studyId
                    ]
                })
            ]);
            setSaved(true);
        } catch (e) {
            setError(e instanceof Error ? e.message : String(e));
        } finally{
            setBusy(false);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                title: "Generation model",
                hint: "Which AI model generates code for this study. Runs record the model they used, so changing it later does not alter past results.",
                right: current ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                    tone: current.keyConfigured ? "good" : "warn",
                    children: current.label
                }, void 0, false, {
                    fileName: "[project]/frontend-nextjs/components/studies/StudyModelSettings.tsx",
                    lineNumber: 138,
                    columnNumber: 26
                }, this) : undefined
            }, void 0, false, {
                fileName: "[project]/frontend-nextjs/components/studies/StudyModelSettings.tsx",
                lineNumber: 135,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4 p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-4 sm:grid-cols-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-xs font-medium text-muted",
                                children: [
                                    "Provider",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: provider,
                                        onChange: (e)=>{
                                            setProvider(e.target.value);
                                            setModel("");
                                            setSaved(false);
                                        },
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["inputCls"],
                                        "aria-label": "Provider",
                                        children: list.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: p.id,
                                                disabled: !p.enabled || !p.keyConfigured,
                                                children: [
                                                    p.label,
                                                    !p.enabled ? " (not enabled)" : !p.keyConfigured ? " (no API key on server)" : ""
                                                ]
                                            }, p.id, true, {
                                                fileName: "[project]/frontend-nextjs/components/studies/StudyModelSettings.tsx",
                                                lineNumber: 150,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/components/studies/StudyModelSettings.tsx",
                                        lineNumber: 143,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend-nextjs/components/studies/StudyModelSettings.tsx",
                                lineNumber: 142,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-xs font-medium text-muted",
                                children: [
                                    "Model",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: model,
                                        onChange: (e)=>{
                                            setModel(e.target.value);
                                            setSaved(false);
                                        },
                                        list: `models-${provider}`,
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["inputCls"],
                                        placeholder: provider === "claude" ? "Default model" : "Model id (required)",
                                        "aria-label": "Model"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/components/studies/StudyModelSettings.tsx",
                                        lineNumber: 158,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("datalist", {
                                        id: `models-${provider}`,
                                        children: (current?.models ?? []).map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: m.id,
                                                children: m.label
                                            }, m.id, false, {
                                                fileName: "[project]/frontend-nextjs/components/studies/StudyModelSettings.tsx",
                                                lineNumber: 167,
                                                columnNumber: 51
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/components/studies/StudyModelSettings.tsx",
                                        lineNumber: 166,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "mt-1 block font-normal",
                                        children: "Pick a suggestion or type a model id."
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/components/studies/StudyModelSettings.tsx",
                                        lineNumber: 169,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend-nextjs/components/studies/StudyModelSettings.tsx",
                                lineNumber: 157,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend-nextjs/components/studies/StudyModelSettings.tsx",
                        lineNumber: 141,
                        columnNumber: 9
                    }, this),
                    providers.isError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "rounded-lg bg-warnsoft p-3 text-xs text-warn",
                        role: "alert",
                        children: [
                            "Could not load the provider list (",
                            providers.error instanceof Error ? providers.error.message : String(providers.error),
                            "). Showing all providers; the server checks your choice when you save."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend-nextjs/components/studies/StudyModelSettings.tsx",
                        lineNumber: 174,
                        columnNumber: 11
                    }, this),
                    current?.note && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "rounded-lg bg-warnsoft p-3 text-xs text-warn",
                        role: "note",
                        children: current.note
                    }, void 0, false, {
                        fileName: "[project]/frontend-nextjs/components/studies/StudyModelSettings.tsx",
                        lineNumber: 179,
                        columnNumber: 27
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("details", {
                        className: "rounded-lg border border-line",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("summary", {
                                className: "cursor-pointer select-none px-3 py-2 text-sm font-medium",
                                children: "Advanced: different model for specific steps"
                            }, void 0, false, {
                                fileName: "[project]/frontend-nextjs/components/studies/StudyModelSettings.tsx",
                                lineNumber: 182,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2 border-t border-line p-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-muted",
                                        children: 'Leave a step on "Same as study" to use the model above.'
                                    }, void 0, false, {
                                        fileName: "[project]/frontend-nextjs/components/studies/StudyModelSettings.tsx",
                                        lineNumber: 184,
                                        columnNumber: 13
                                    }, this),
                                    STEPS.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid items-center gap-2 sm:grid-cols-[150px_150px_minmax(0,1fr)]",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm",
                                                    children: s.label
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend-nextjs/components/studies/StudyModelSettings.tsx",
                                                    lineNumber: 187,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    value: steps[s.id]?.provider ?? "",
                                                    onChange: (e)=>setStep(s.id, {
                                                            provider: e.target.value
                                                        }),
                                                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["inputCls"]} mt-0`,
                                                    "aria-label": `${s.label} provider`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "",
                                                            children: "Same as study"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend-nextjs/components/studies/StudyModelSettings.tsx",
                                                            lineNumber: 194,
                                                            columnNumber: 19
                                                        }, this),
                                                        list.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: p.id,
                                                                disabled: !p.enabled || !p.keyConfigured,
                                                                children: p.label
                                                            }, p.id, false, {
                                                                fileName: "[project]/frontend-nextjs/components/studies/StudyModelSettings.tsx",
                                                                lineNumber: 196,
                                                                columnNumber: 21
                                                            }, this))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend-nextjs/components/studies/StudyModelSettings.tsx",
                                                    lineNumber: 188,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    value: steps[s.id]?.model ?? "",
                                                    onChange: (e)=>setStep(s.id, {
                                                            model: e.target.value
                                                        }),
                                                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["inputCls"]} mt-0`,
                                                    placeholder: "Model id (optional)",
                                                    "aria-label": `${s.label} model`
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend-nextjs/components/studies/StudyModelSettings.tsx",
                                                    lineNumber: 199,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, s.id, true, {
                                            fileName: "[project]/frontend-nextjs/components/studies/StudyModelSettings.tsx",
                                            lineNumber: 186,
                                            columnNumber: 15
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend-nextjs/components/studies/StudyModelSettings.tsx",
                                lineNumber: 183,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend-nextjs/components/studies/StudyModelSettings.tsx",
                        lineNumber: 181,
                        columnNumber: 9
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "rounded-lg bg-badsoft p-3 text-sm text-bad",
                        role: "alert",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/frontend-nextjs/components/studies/StudyModelSettings.tsx",
                        lineNumber: 211,
                        columnNumber: 19
                    }, this),
                    saved && !error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-good",
                        role: "status",
                        children: "Saved. New runs for this study will use this model."
                    }, void 0, false, {
                        fileName: "[project]/frontend-nextjs/components/studies/StudyModelSettings.tsx",
                        lineNumber: 212,
                        columnNumber: 29
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$components$2f$ui$2f$primitives$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "primary",
                        onClick: save,
                        disabled: busy || !dirty,
                        children: [
                            busy && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                size: 15,
                                className: "animate-spin",
                                "aria-hidden": true
                            }, void 0, false, {
                                fileName: "[project]/frontend-nextjs/components/studies/StudyModelSettings.tsx",
                                lineNumber: 215,
                                columnNumber: 20
                            }, this),
                            " Save model"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend-nextjs/components/studies/StudyModelSettings.tsx",
                        lineNumber: 214,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend-nextjs/components/studies/StudyModelSettings.tsx",
                lineNumber: 140,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend-nextjs/components/studies/StudyModelSettings.tsx",
        lineNumber: 134,
        columnNumber: 5
    }, this);
}
}),
"[project]/frontend-nextjs/lib/useStudies.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useStudies",
    ()=>useStudies
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/lib/api.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$workspace$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/lib/workspace.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
function useStudies() {
    const { tenantId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$workspace$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWorkspace"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "studies",
            tenantId
        ],
        queryFn: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["listStudies"])(tenantId)
    });
}
}),
];

//# sourceMappingURL=frontend-nextjs_0_4-e_k._.js.map