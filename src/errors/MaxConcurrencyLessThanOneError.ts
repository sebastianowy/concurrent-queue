import { ConcurrentQueueError } from './ConcurrentQueueError';

export class MaxConcurrencyLessThanOneError extends ConcurrentQueueError {
  constructor(given: number) {
    super(`Max concurrency cannot be less than 1, ${given} given`);
  }
}
