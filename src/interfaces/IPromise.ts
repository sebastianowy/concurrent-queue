export type IPromiseResolve<TResult> = (value?: TResult | PromiseLike<TResult>) => void;
export type IPromiseReject = (reason?: Error) => void;
