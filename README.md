<h1 align="center" style="border-bottom: none;">Concurrent Queue</h1>
<h3 align="center">Helps to organize promises execution</h3>
<p align="center">
  <a href="https://www.npmjs.com/package/@sebastianowy/concurrent-queue"><img alt="npm latest version" src="https://img.shields.io/npm/v/@sebastianowy/concurrent-queue/latest.svg"></a>
  <a href="https://github.com/sebastianowy/concurrent-queue/actions?query=workflow%3ATest+branch%3Amain"><img alt="Build states" src="https://github.com/sebastianowy/concurrent-queue/workflows/Test/badge.svg"></a>
  <a href="https://github.com/semantic-release/semantic-release"><img alt="semantic-release" src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg"></a>
</p>

## Installation

```bash
npm install --save @sebastianowy/concurrent-queue
# or
yarn add @sebastianowy/concurrent-queue
```

## Usage

### Examples

- examples with timeouts

```js
import { createConcurrentQueue } from '@sebastianowy/concurrent-queue';

const queue = createConcurrentQueue({
    maxConcurrency: 2,
});

const firstResult = queue.add(() => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({name: 'First', date: new Date()});
        }, 1000)
    })
});

const secondResult = queue.add(() => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({name: 'Second', date: new Date()});
        }, 1000)
    })
});

const thirdResult = queue.add(() => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({name: 'Third', date: new Date()});
        }, 1000)
    })
});

firstResult.then((result) => console.log(result));
secondResult.then((result) => console.log(result));
thirdResult.then((result) => console.log(result));
```

will produce:

```bash
{ name: 'First', date: 2021-09-12T19:23:10.048Z }
{ name: 'Second', date: 2021-09-12T19:23:10.057Z }
# notice 1-second delay, third task was waiting for first and second tasks to resolve
{ name: 'Third', date: 2021-09-12T19:23:11.050Z }
```

- example with heavy requests (every request takes 10 seconds to respond)

```ts
import { ConcurrentQueue } from "@sebastianowy/concurrent-queue";
import { default as fetch } from 'node-fetch';

const queue = new ConcurrentQueue({
    maxConcurrency: 3,
});

const someFunctionsToRun = Array.from(
    { length: 8 },
    (_, i) => () =>
        fetch(`https://reqres.in/api/users/${(i + 1)}?delay=10`)
            .then(response => response.json())
            .then(user =>
                console.log({ email: user.data.email, date: new Date() })),
);

const allTasks = someFunctionsToRun.map(someFunction => 
    queue.add(() => someFunction()))

Promise.all(allTasks).then(() => console.log({ date: new Date() });
```

will produce:

```bash
{ email: 'george.bluth@reqres.in', date: 2021-09-12T19:42:04.970Z }
{ email: 'janet.weaver@reqres.in', date: 2021-09-12T19:42:04.975Z }
{ email: 'emma.wong@reqres.in', date: 2021-09-12T19:42:04.981Z }
# notice 10-second delay after every 3 tasks
{ email: 'tracey.ramos@reqres.in', date: 2021-09-12T19:42:15.144Z }
{ email: 'charles.morris@reqres.in', date: 2021-09-12T19:42:15.154Z }
{ email: 'eve.holt@reqres.in', date: 2021-09-12T19:42:15.159Z }
# another 10-second delay
{ email: 'michael.lawson@reqres.in', date: 2021-09-12T19:42:25.315Z }
{ email: 'lindsay.ferguson@reqres.in', date: 2021-09-12T19:42:25.315Z }
# all tasks done
{ date: 2021-09-12T19:42:25.327Z }
```
### Creating instance

- by default factory function

    ```ts
    import { createConcurrentQueue } from "@sebastianowy/concurrent-queue";

    const queue = createConcurrentQueue({
        maxConcurrency: 2,
    });
    ```

- by constructor

    ```ts
    import { ConcurrentQueue } from "@sebastianowy/concurrent-queue";

    const queue = new ConcurrentQueue({
        maxConcurrency: 2,
    });
    ```

- by factory

    ```ts
    import { ConcurrentQueueFactory } from "@sebastianowy/concurrent-queue";

    const queueFactory = new ConcurrentQueueFactory();
    const queue = queueFactory.createConcurrentQueue({
        maxConcurrency: 2,
    });
    ```
