export abstract class ConcurrentQueueError extends Error {
  constructor(message: string) {
    super(message);
  }
}
