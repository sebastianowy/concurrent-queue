import { ConcurrentQueueFactory } from "./ConcurrentQueueFactory";
import { IConcurrentQueueFactory } from "./interfaces/IConcurrentQueueFactory";
import { IConcurrentQueue, IConcurrentQueueParams } from "./interfaces/IConcurrentQueue";
import { ConcurrentQueue } from "./ConcurrentQueue";

const createConcurrentQueue = (params: IConcurrentQueueParams) => {
    const factory = new ConcurrentQueueFactory();
    return factory.createConcurrentQueue(params);
};

export { createConcurrentQueue, ConcurrentQueue, IConcurrentQueue, IConcurrentQueueParams };
export { ConcurrentQueueFactory, IConcurrentQueueFactory };

export default createConcurrentQueue;
