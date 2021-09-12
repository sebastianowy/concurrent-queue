import { ConcurrentQueue } from '.';

describe('ConcurrentQueue', () => {
  it('should create concurrent queue instance', () => {
    const instance = new ConcurrentQueue();
    expect(instance).toBeInstanceOf(ConcurrentQueue);
  });

  it('should resolve task to exact value resolved in callback', () => {
    const instance = new ConcurrentQueue();
    const value = { one: 'test' };
    const taskPromise = instance.add(async () => value);
    expect(taskPromise).resolves.toBe(value);
  });
});
