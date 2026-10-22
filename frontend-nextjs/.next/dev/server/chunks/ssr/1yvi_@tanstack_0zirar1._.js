module.exports = [
"[project]/frontend-nextjs/node_modules/@tanstack/query-core/build/modern/mutationObserver.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MutationObserver",
    ()=>MutationObserver
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/@tanstack/query-core/build/modern/utils.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$subscribable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/@tanstack/query-core/build/modern/subscribable.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$notifyManager$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/@tanstack/query-core/build/modern/notifyManager.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$mutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/@tanstack/query-core/build/modern/mutation.js [app-ssr] (ecmascript)");
;
;
;
;
//#region src/mutationObserver.ts
/**
* Observes a single mutation and derives a `MutationObserverResult` from it.
* A framework hook like `useMutation` creates one `MutationObserver` per hook
* call, keeps it stable across re-renders, calls `setOptions` when the options
* passed to the hook change, subscribes to it to re-render on updates, and
* reads `getCurrentResult()` for the value to return. Calling `mutate()`
* builds a new underlying `Mutation` in the `MutationCache` and executes it.
* @example
* ```ts
* const observer = new MutationObserver(queryClient, {
*   mutationFn: (variables: { title: string }) => addPost(variables),
* })
* ```
*/ var MutationObserver = class extends __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$subscribable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Subscribable"] {
    #client;
    #currentResult = void 0;
    #currentMutation;
    #mutateOptions;
    constructor(client, options){
        super();
        this.#client = client;
        this.setOptions(options);
        this.bindMethods();
        this.#updateResult();
    }
    /**
	* Binds the methods of the result (`mutate` and `reset`) to the observer, so they keep working when
	* destructured from it.
	*/ bindMethods() {
        this.mutate = this.mutate.bind(this);
        this.reset = this.reset.bind(this);
    }
    /**
	* Updates the observer's options.
	*
	* If the new `mutationKey` differs from the previous one (and both were
	* defined), the observer is reset, detaching it from the mutation it was
	* observing. Otherwise, if the currently observed mutation is still
	* `pending`, its options are updated in place as well.
	* @param options - The new mutation observer options. They are defaulted with {@link
	* QueryClient#defaultMutationOptions} before being applied.
	* @example
	* ```ts
	* observer.setOptions({
	*   mutationFn: (variables: { title: string }) => addPost(variables),
	*   onSuccess: (data) => console.log(data),
	* })
	* ```
	*/ setOptions(options) {
        const prevOptions = this.options;
        this.options = this.#client.defaultMutationOptions(options);
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shallowEqualObjects"])(this.options, prevOptions)) this.#client.getMutationCache().notify({
            type: "observerOptionsUpdated",
            mutation: this.#currentMutation,
            observer: this
        });
        if (prevOptions?.mutationKey && this.options.mutationKey && (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hashKey"])(prevOptions.mutationKey) !== (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hashKey"])(this.options.mutationKey)) this.reset();
        else if (this.#currentMutation?.state.status === "pending") this.#currentMutation.setOptions(this.options);
    }
    onSubscribe() {
        if (this.listeners.size === 1 && this.#currentMutation) {
            this.#currentMutation.addObserver(this);
            this.#updateResult();
        }
    }
    onUnsubscribe() {
        if (!this.hasListeners()) this.#currentMutation?.removeObserver(this);
    }
    /**
	* Updates the observer's result when the observed mutation changes, and notifies its listeners.
	* @internal
	* @param action - The action that updated the observed mutation, passed on to the observer's
	* callbacks.
	*/ onMutationUpdate(action) {
        this.#updateResult();
        this.#notify(action);
    }
    /**
	* Returns the observer's current result, derived from the observed
	* mutation's state (or the default, `idle` state if no mutation has been
	* built yet, e.g. before the first `mutate()` call or after `reset()`).
	* @returns The observer's latest result.
	*/ getCurrentResult() {
        return this.#currentResult;
    }
    /**
	* Detaches the observer from the mutation it is currently observing (if
	* any) and resets the observed result back to its default, `idle` state.
	*
	* This does not cancel an in-flight mutation; the mutation itself keeps
	* running to completion and its own callbacks still fire, but this
	* observer stops reflecting its state and a subsequent `mutate()` call
	* will build a brand new mutation.
	* @see {@link MutationObserver#mutate}
	* @example
	* ```ts
	* observer.reset()
	* ```
	*/ reset() {
        this.#currentMutation?.removeObserver(this);
        this.#currentMutation = void 0;
        this.#updateResult();
        this.#notify();
    }
    /**
	* Builds a new `Mutation` in the `MutationCache` using the observer's
	* current options, detaches this observer from any previously observed
	* mutation, attaches it to the new one, and executes it with the given
	* variables.
	*
	* The optional per-call `options` (`onSuccess`/`onError`/`onSettled`) are
	* invoked once the mutation settles, in addition to any callbacks defined
	* on the observer's own options.
	* @param variables - The variables passed to the `mutationFn`.
	* @param options - Per-call `onSuccess`, `onError`, and `onSettled` callbacks.
	* @returns A promise that resolves with the mutation's data, or rejects with its error.
	* @example
	* ```ts
	* await observer.mutate(
	*   { title: 'New post' },
	*   { onSuccess: (data) => console.log(data) },
	* )
	* ```
	*/ mutate(variables, options) {
        this.#mutateOptions = options;
        this.#currentMutation?.removeObserver(this);
        this.#currentMutation = this.#client.getMutationCache().build(this.#client, this.options);
        this.#currentMutation.addObserver(this);
        return this.#currentMutation.execute(variables);
    }
    #updateResult() {
        const state = this.#currentMutation?.state ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$mutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDefaultState"])();
        this.#currentResult = {
            ...state,
            isPending: state.status === "pending",
            isSuccess: state.status === "success",
            isError: state.status === "error",
            isIdle: state.status === "idle",
            mutate: this.mutate,
            reset: this.reset
        };
    }
    #notify(action) {
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$notifyManager$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["notifyManager"].batch(()=>{
            const mutateOptions = this.#mutateOptions;
            if (mutateOptions && this.hasListeners()) {
                const variables = this.#currentResult.variables;
                const onMutateResult = this.#currentResult.context;
                const context = {
                    client: this.#client,
                    meta: this.options.meta,
                    mutationKey: this.options.mutationKey
                };
                if (action?.type === "success") {
                    try {
                        mutateOptions.onSuccess?.(action.data, variables, onMutateResult, context);
                    } catch (e) {
                        Promise.reject(e);
                    }
                    try {
                        mutateOptions.onSettled?.(action.data, null, variables, onMutateResult, context);
                    } catch (e) {
                        Promise.reject(e);
                    }
                } else if (action?.type === "error") {
                    try {
                        mutateOptions.onError?.(action.error, variables, onMutateResult, context);
                    } catch (e) {
                        Promise.reject(e);
                    }
                    try {
                        mutateOptions.onSettled?.(void 0, action.error, variables, onMutateResult, context);
                    } catch (e) {
                        Promise.reject(e);
                    }
                }
            }
            this.listeners.forEach((listener)=>{
                listener(this.#currentResult);
            });
        });
    }
};
;
}),
"[project]/frontend-nextjs/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useMutation",
    ()=>useMutation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$mutationObserver$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/@tanstack/query-core/build/modern/mutationObserver.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/@tanstack/query-core/build/modern/utils.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$notifyManager$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-nextjs/node_modules/@tanstack/query-core/build/modern/notifyManager.js [app-ssr] (ecmascript)");
"use client";
;
;
;
//#region src/useMutation.ts
/**
* Unlike queries, mutations are typically used to create/update/delete data or perform server side-effects.
* `useMutation` is the hook for that.
* @param options - The {@link UseMutationOptions} to use — everything you can pass to `useMutation`.
* @param queryClient - Use this to use a custom `QueryClient`. Otherwise, the one from the nearest context will
* be used.
* @returns `mutate`/`mutateAsync` also accept per-call `onSuccess`/`onError`/`onSettled` callbacks as a second
* argument, useful for triggering call-site side effects (e.g. navigation) without coupling them to the shared
* mutation definition. Hook-level callbacks (passed to `options`) fire for every mutation; per-call callbacks
* fire only for the latest call you've made, and only while the component is still mounted — unmounting before
* the mutation settles removes the subscription and prevents them from firing.
* @throws {Error} The mutation error, when `throwOnError` is `true` or returns `true` for it, so that it is
* thrown to the nearest error boundary.
* @see {@link mutationOptions} to share these options across multiple `useMutation` call sites, or to look
* the mutation up elsewhere via its `mutationKey` (e.g. with `useMutationState`).
* @example
* ```tsx
* import { useMutation, useQueryClient } from '@tanstack/react-query'
*
* function AddTodo() {
*   const queryClient = useQueryClient()
*
*   const addMutation = useMutation({
*     mutationFn: addTodo,
*     onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
*   })
*
*   return (
*     <button
*       onClick={() =>
*         addMutation.mutate('Item', {
*           onError: (error) => console.error('Failed to add item:', error),
*         })
*       }
*     >
*       Add
*     </button>
*   )
* }
* ```
* @example
* Rendering the mutation's own state, rather than just firing it off:
* ```tsx
* import { useMutation, useQueryClient } from '@tanstack/react-query'
*
* function AddTodo() {
*   const queryClient = useQueryClient()
*
*   const addMutation = useMutation({
*     mutationFn: addTodo,
*     onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
*   })
*
*   return (
*     <div>
*       {addMutation.isPending ? (
*         'Adding todo...'
*       ) : (
*         <>
*           {addMutation.isError ? (
*             <div>An error occurred: {addMutation.error.message}</div>
*           ) : null}
*           <button onClick={() => addMutation.mutate('Item')}>Add</button>
*         </>
*       )}
*     </div>
*   )
* }
* ```
* @example
* Optimistic update via `onMutate`, rolling back on `onError`:
* ```tsx
* import { useMutation, useQueryClient } from '@tanstack/react-query'
*
* function AddTodo() {
*   const queryClient = useQueryClient()
*
*   const addMutation = useMutation({
*     mutationFn: addTodo,
*     onMutate: async (newTodo) => {
*       await queryClient.cancelQueries({ queryKey: ['todos'] })
*       const previousTodos = queryClient.getQueryData<Array<string>>(['todos'])
*
*       queryClient.setQueryData<Array<string>>(['todos'], (old) => [
*         ...(old ?? []),
*         newTodo,
*       ])
*
*       // Passed to `onError` as `onMutateResult` if the mutation fails.
*       return { previousTodos }
*     },
*     onError: (_err, _newTodo, onMutateResult) => {
*       queryClient.setQueryData(['todos'], onMutateResult?.previousTodos)
*     },
*     onSettled: () => {
*       queryClient.invalidateQueries({ queryKey: ['todos'] })
*     },
*   })
*
*   return (
*     <button onClick={() => addMutation.mutate('Item')}>Add</button>
*   )
* }
* ```
* @example
* Callbacks passed per call to `mutate` only fire for the last call — `mutateAsync` gives you a
* promise per call instead, so you can wait for all of them when they succeed:
* ```tsx
* import { useMutation, useQueryClient } from '@tanstack/react-query'
*
* function AddTodos() {
*   const queryClient = useQueryClient()
*
*   const addMutation = useMutation({
*     mutationFn: addTodo,
*     onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
*   })
*
*   async function handleAddAll(todos: Array<string>) {
*     try {
*       await Promise.all(todos.map((todo) => addMutation.mutateAsync(todo)))
*     } catch (error) {
*       console.error('Failed to add todos:', error)
*     }
*   }
*
*   return (
*     <button onClick={() => handleAddAll(['Todo 1', 'Todo 2', 'Todo 3'])}>
*       Add all
*     </button>
*   )
* }
* ```
* @example
* If some of the mutations above can fail independently of the others, and you want to know which ones
* did — rather than losing that information the moment the first one rejects — swap `Promise.all` for
* `Promise.allSettled`:
* ```tsx
* import { useMutation, useQueryClient } from '@tanstack/react-query'
*
* function AddTodos() {
*   const queryClient = useQueryClient()
*
*   const addMutation = useMutation({
*     mutationFn: addTodo,
*     onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
*   })
*
*   async function handleAddAll(todos: Array<string>) {
*     const addResults = await Promise.allSettled(
*       todos.map((todo) => addMutation.mutateAsync(todo)),
*     )
*
*     addResults.forEach((addResult, index) => {
*       if (addResult.status === 'rejected') {
*         console.error(`Failed to add "${todos[index]}":`, addResult.reason)
*       }
*     })
*   }
*
*   return (
*     <button onClick={() => handleAddAll(['Todo 1', 'Todo 2', 'Todo 3'])}>
*       Add all
*     </button>
*   )
* }
* ```
*/ function useMutation(options, queryClient) {
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])(queryClient);
    const [observer] = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](()=>new __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$mutationObserver$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MutationObserver"](client, options));
    __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        observer.setOptions(options);
    }, [
        observer,
        options
    ]);
    const result = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSyncExternalStore"](__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"]((onStoreChange)=>observer.subscribe(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$notifyManager$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["notifyManager"].batchCalls(onStoreChange)), [
        observer
    ]), ()=>observer.getCurrentResult(), ()=>observer.getCurrentResult());
    const mutate = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"]((...args)=>{
        observer.mutate(args[0], args[1]).catch(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["noop"]);
    }, [
        observer
    ]);
    if (result.error && (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$nextjs$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shouldThrowError"])(observer.options.throwOnError, [
        result.error
    ])) throw result.error;
    return {
        ...result,
        mutate,
        mutateAsync: result.mutate
    };
}
;
}),
];

//# sourceMappingURL=1yvi_%40tanstack_0zirar1._.js.map