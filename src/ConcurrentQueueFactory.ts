import { IConcurrentQueueFactory } from './interfaces/IConcurrentQueueFactory';
import { IConcurrentQueue, IConcurrentQueueParams } from './interfaces/IConcurrentQueue';
import { ConcurrentQueue } from './ConcurrentQueue';

export class ConcurrentQueueFactory implements IConcurrentQueueFactory {
  public createConcurrentQueue(params: IConcurrentQueueParams): IConcurrentQueue {
    return new ConcurrentQueue(params);
  }
}
