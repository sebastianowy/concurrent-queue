import { IPromiseReject, IPromiseResolve } from './IPromise';

export interface IConcurrentQueue {
  add<TResult>(callback: IConcurrentQueueTaskCallback<TResult>): Promise<TResult>;
}

export interface IConcurrentQueueParams {
  maxConcurrency?: number;
}

export interface IConcurrentQueueTask<TResult = TDefaultResult> {
  callback: IConcurrentQueueTaskCallback<TResult>;
  resolve: IPromiseResolve<TResult>;
  reject: IPromiseReject;
}

export type IConcurrentQueueTaskCallback<TResult> = () => Promise<TResult>;

type TDefaultResult = unknown;
