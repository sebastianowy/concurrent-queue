import { MaxConcurrencyLessThanOneError } from './errors/MaxConcurrencyLessThanOneError';
import {
  IConcurrentQueue,
  IConcurrentQueueParams,
  IConcurrentQueueTask,
  IConcurrentQueueTaskCallback,
} from './interfaces/IConcurrentQueue';
import { IPromiseReject, IPromiseResolve } from './interfaces/IPromise';

export class ConcurrentQueue implements IConcurrentQueue {
  private static readonly _DEFAULT_MAX_CONCURRENCY: number = 1;
  private readonly _maxConcurrency: number;
  private readonly _tasks: IConcurrentQueueTask[];
  private _pendingTasksCount: number;

  constructor(params?: IConcurrentQueueParams) {
    this._maxConcurrency = this.getMaxConcurrency(params);
    this._pendingTasksCount = 0;
    this._tasks = [];
  }

  public add<TResult>(callback: IConcurrentQueueTaskCallback<TResult>): Promise<TResult> {
    if (this._pendingTasksCount < this._maxConcurrency) {
      return this.runCallback(callback);
    }

    return this.queueCallback(callback);
  }

  private queueCallback<TResult>(callback: IConcurrentQueueTaskCallback<TResult>): Promise<TResult> {
    return new Promise((resolve: IPromiseResolve<TResult>, reject: IPromiseReject): void => {
      this._tasks.push({ callback, resolve, reject });
    });
  }

  private async dequeueNextTask<TResult>(): Promise<void> {
    if (this._pendingTasksCount >= this._maxConcurrency) {
      return;
    }

    const task: IConcurrentQueueTask<unknown> | undefined = this._tasks.shift();

    if (!task) {
      return;
    }

    try {
      const result: TResult = (await this.runCallback(task.callback)) as TResult;
      task.resolve(result);
    } catch (error) {
      task.reject(error);
    }
  }

  private async runCallback<TResult>(callback: IConcurrentQueueTaskCallback<TResult>): Promise<TResult> {
    this._pendingTasksCount++;
    try {
      const result: TResult = await callback();
      return result;
    } catch (error) {
      throw error;
    } finally {
      this._pendingTasksCount--;
      this.dequeueNextTask();
    }
  }

  private getMaxConcurrency(params: IConcurrentQueueParams): number {
    const maxConcurrency: number = params?.maxConcurrency ?? ConcurrentQueue._DEFAULT_MAX_CONCURRENCY;
    if (maxConcurrency < 1) {
      throw new MaxConcurrencyLessThanOneError(maxConcurrency);
    }
    return maxConcurrency;
  }
}
