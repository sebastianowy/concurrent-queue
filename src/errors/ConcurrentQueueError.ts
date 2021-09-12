export abstract class ConcurrentQueueError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ConcurrentQueueError.prototype);
  }
}
