import { IConcurrentQueue, IConcurrentQueueParams } from './IConcurrentQueue';

export interface IConcurrentQueueFactory {
  createConcurrentQueue(params: IConcurrentQueueParams): IConcurrentQueue;
}
