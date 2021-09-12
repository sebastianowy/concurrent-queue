import { ConcurrentQueueFactory } from './ConcurrentQueueFactory';
import { IConcurrentQueueFactory } from './interfaces/IConcurrentQueueFactory';
import { IConcurrentQueue, IConcurrentQueueParams } from './interfaces/IConcurrentQueue';
import { ConcurrentQueue } from './ConcurrentQueue';
import { ConcurrentQueueError } from './errors/ConcurrentQueueError';
import { MaxConcurrencyLessThanOneError } from './errors/MaxConcurrencyLessThanOneError';

const createConcurrentQueue = (params: IConcurrentQueueParams): IConcurrentQueue => {
  const factory = new ConcurrentQueueFactory();
  return factory.createConcurrentQueue(params);
};

export { createConcurrentQueue, ConcurrentQueue, IConcurrentQueue, IConcurrentQueueParams };
export { ConcurrentQueueFactory, IConcurrentQueueFactory };
export { ConcurrentQueueError, MaxConcurrencyLessThanOneError };

export default createConcurrentQueue;
