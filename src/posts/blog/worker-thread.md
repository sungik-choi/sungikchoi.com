---
title: "Node.js Worker Threads"
category: "JavaScript"
date: "2020-01-19 15:00:00 +09:00"
desc: "'Understanding Worker Threads in Node.js' 번역"
thumbnail: "./images/galaxy.jpg"
alt: ""
---

워커 스레드를 공부해보려고 하는데, 한국어로 된 자료가 거의 없었습니다. 어쩔 수 없이(?) 부족한 영어 실력이지만, 있는 힘껏 [Understanding Worker Threads in Node.js](https://nodesource.com/blog/worker-threads-nodejs) 글을 번역해봤습니다.

## Node.js 의 Worker Thread 이해하기

워커를 이해하기 위해서는, 우선 어떻게 Node.js 가 이루어져 있는지를 이해하는게 필수입니다.

Node.js가 시작되면, 다음이 실행됩니다.

- 하나의 프로세스
- 하나의 스레드
- 하나의 이벤트 루프
- 하나의 js 엔진 인스턴스
- 하나의 노드js 인스턴스

**하나의 프로세스**: 어디서든 접근 가능한 전역 객체이자 그 순간 실행되고 있는 것들의 정보를 가지고 있는 프로세스입니다.

**하나의 스레드**: 단일 스레드는 주어진 프로세스에서 오직 한 번에 하나의 명령만이 실행된다는 뜻입니다.

**하나의 이벤트 루프**: 노드를 이해하기 위해 가장 중요한 부분 중 하나입니다. 이는 자바스크립트가 단일 스레드라는 사실에도 불구하고, 언제든 가능한 callback, promise, async/await 를 통해 시스템 커널에 작업을 offload 하게 합니다. 이로서 노드가 비동기식, 비차단 I/O 의 특성을 가집니다.

**하나의 js 엔진 인스턴스**: js 코드를 실행하는 컴퓨터 프로그램입니다.

**하나의 노드js 인스턴스**: 노드js 코드를 실행하는 컴퓨터 프로그램입니다.

즉, 노드는 단일 스레드에서 실행되고, 이벤트 루프에는 한 번에 하나의 프로세스만 발생합니다. 하나의 코드, 하나의 실행, (코드는 병렬로 실행되지 않습니다). 이 점은 매우 유용한데, 왜냐하면 당신이 동시성 문제에 대한 걱정 없이 자바스크립트를 사용하는 방법을 단순하게 만들어주기 때문입니다.

자바스크립트가 이러한 접근 방식으로 개발되어진 이유는 자바스크립트가 처음에 클라이언트측 인터랙션을 위해 만들어졌기 때문입니다(웹페이지 인터랙션이나, 유효성 검사같은). 이는 멀티 스레딩의 복잡성을 필요로 하지 않습니다.

그러나 모든 것과 마찬가지로 단점도 있습니다. 만약 인 메모리에서 발생하는 대규모 데이터 세트의 복잡한 계산같은 CPU 자원을 많이 사용하는 코드가 있으면, 이 코드가 다른 프로세스가 실행되는걸 차단할 수도 있습니다. 마찬가지로, CPU 자원을 많이 사용하는 코드가 있는 서버에 요청하는 경우, 이 코드가 이벤트 루프를 차단하고 다른 요청들이 처리되지 않게 할 수도 있습니다.

메인 이벤트 루프가 특정 함수가 끝날 때까지 기다려야 하는 경우, 이 함수는 'blocking' 으로 간주됩니다. 'non-blocking' 함수는 메인 이벤트 루프가 시작되는 즉시 진행되며, 일반적으로 'callback'을 호출하여 메인 루프가 완료되면 alert 합니다.

> *황금률: 이벤트 루프를 block 하지 마세요. 이벤트 루프가 계속 실행되게 하고 주의를 기울이세요. 그리고 동기식 네트워크, 무한 루프와 같이 스레드를 차단할 수 있는 것은 피하세요.*

CPU 작업과 I/O 작업을 구분하는 게 중요합니다. 앞에서 말했듯이, **Node.js 코드는 병렬로 실행되지 않습니다.** 오직 I/O 작업만 비동기식으로 실행되므로, 병렬로 실행됩니다.

그래서 워커 스레드는 I/O 집약적인 일에는 별로 효과적이지 못한데, 왜냐하면 비동기적 I/O 작업이 워커가 하는 것보다 더 효율적이기 때문입니다. 워커의 가장 중요한 목표는 I/O 작업이 아닌 CPU 집약적인 작업의 퍼포먼스를 향상시키는 겁니다.

## 몇가지 솔루션

또한 CPU 집약적인 작업을 위한 솔루션들이 이미 있습니다. 클러스터 API와 같은 다중 프로세스는 CPU가 최적으로 사용되게 합니다.

이 방법은 프로세스를 분리할 수 있는 장점이 있기 때문에, 한 프로세스에서 문제가 생겨도 다른 프로세스에는 영향을 미치지 않습니다. 또한 안정적이고 동일한 API도 가지고 있습니다. 그러나, 이것은 공유 메모리를 희생하는걸 의미하고, 데이터 통신은 JSON을 통해서만 이루어집니다.

## 자바스크립트와 노드js가 절대 스레드를 가질 수 없는 이유

그래서 사람들은 노드.js 코어에 새 모듈을 추가하면, 스레드를 만들고 동기화 할 수 있어 CPU 집약 작업의 문제를 해결할 수 있지 않을까 생각했습니다.

음, 안됩니다. 스레드가 추가되면, 언어 자체의 특성이 바뀝니다. 사용 가능한 클래스 또는 함수 세트로 스레드를 추가하는 건 불가능합니다. 멀티 스레딩을 지원하는 언어(자바같은)에서는, "동기화"와 같은 키워드를 사용하면 여러 스레드를 동기화 할 수 있습니다.

또한 일부 숫자 유형은 atomic하지 않습니다. 이 말은 만약 그들을 동기화하지 않으면, 두 개의 스레드가 변수의 값을 변경하게 되고, 그 결과 두 스레드가 변수에 접근한 후에 변수는 먼저 한 스레드에 의해 값이 바뀌고, 다시 다른 스레드에 의해 값이 변경되게 되어서 유효한 값을 가지지 못하게 됩니다. 예를 들어 자바스크립트에서 0.1과 0.2를 더한 값은 17 자릿수를 가집니다.(최대 자릿수)

```js
var x = 0.1 + 0.2; *// x will be 0.30000000000000004*
```

그러나 부동 소수점 산술이 항상 100% 정확한 것은 아닙니다. 따라서 스레드가 동기화되지 않으면, 워커의 사용으로 소수점 하나가 변경돼서 동일하지 않은 숫자가 출력될 수도 있습니다.

## 최고의 솔루션

CPU 퍼포먼스를 위한 최고의 솔루션은 워커 스레드입니다. 브라우저는 오랫동안 워커에 대한 개념을 가지고 있었습니다.

- 하나의 프로세스
- 하나의 스레드
- 하나의 이벤트 루프
- 하나의 js 엔진 인스턴스
- 하나의 node.js 인스턴스

대신, 워커 스레드는 아래와 같은 특징을 가집니다.

- 하나의 프로세스
- **여러개의 스레드**
- **스레드 별** 하나의 이벤트 루프
- **스레드 별** 하나의 js 엔진 인스턴스
- **스레드 별** 하나의 node.js 인스턴스

아래와 같은 이미지로 표현할 수 있습니다.

![worker-threads](https://images.ctfassets.net/hspc7zpa5cvq/20h5efXHT4bQbuf44mdq2H/a40944191d031217a9169b17a8ef35d6/worker-diagram_2x__1_.jpg)

`worker_threads` 모듈은 자바스크립트를 병렬로 실행하는 스레드를 사용할 수 있습니다.

아래와 같이 접근합니다.

```js
const worker = require('worker_threads');
```

Node.js 10 부터 워커 스레드를 사용할 수 있었지만, 아직은 실험 단계에 있습니다. *(13.6.0 버전 기준 실험 단계에서 벗어난 걸로 보입니다.)*

이상적인 점은 동일한 프로세스 내에 Node.js 인스턴스를 가지는 것입니다. 워커 스레드를 사용하면, 특정 포인트에서 스레드가 종료될 수 있고, 이는 꼭 부모 프로세스의 종료가 아니어도 됩니다. 워커가 없을 때 워커가 할당하는 리소스는 메모리 누수가 되고 우리는 그걸 원하지 않습니다. 우리는 노드js가 그 자체를 내장하고, 노드js에게 새로운 스레드를 만든 후, 그 스레드 안에 새로운 노드js 인스턴스를 만드는 기능을 부여하고 싶습니다. 이는 본질적으로 동일한 프로세스 내에서 독립적인 스레드를 실행합니다.

### 워커 스레드를 특별하게 만드는 이유

- `ArrayBuffers`: 한 스레드에서 다른 스레드로 메모리를 전송하는 방법
- `SharedArrayBuffer`: 어떤 스레드에서도 접근할 수 있습니다. 스레드간에 메모리를 공유할 수 있게 해줍니다(이진 데이터로 제한됩니다).
- `Atomics`: 사용가능합니다. js에서 몇 가지 프로세스를 동시에, 보다 효율적으로 수행할 수 있게 해주고, 조건 변수를 구현할 수 있게 도와줍니다.
- `MessagePort`: 서로 다른 스레드간의 통신을 위해 사용됩니다. 구조화된 데이터, 메모리 영역 및 다른 MessagePorts를 다른 워커들 간에 전송할 때 사용될 수 있습니다.
- `MessageControl`: 서로 다른 스레드 간의 통신에 사용되는 비동기식 양방향 통신 채널을 나타냅니다.
- `WorkerData`: startup 데이터를 전달하기 위해 사용됩니다. 워커 생성자에게 전달된 데이터의 복제본이 포함된 임의의 js 값입니다. `postMessage()`를 사용하는 것처럼 데이터가 복제됩니다.

### API

- `const { worker, parentPort } = require('worker_threads')` -> `worker` 클래스는 독립적인 자바스크립트 실행 스레드를 의미하고, `parentPort`는 메세지 포트의 인스턴스입니다.
- `new Worker(filename)` 이나 `new Worker(code, {eval: true})` -> 워커를 시작하는 두 가지 메인 방법입니다(파일명을 넘기거나, 실행하고자 하는 코드를 작성하거나). 실제 제작시 파일명을 사용하는 편이 권장됩니다.
- `worker.on('message')`, `worker.postMessage(data)`-> 다른 스레드간 메세지를 주고받을 때 사용합니다.
- `parentPort.on('message')`, `parentPort.postMessage(data)`-> `parentPort.postMessage(data)` 를 통해 보내진 메세지는 `worker.on('message')` 를 사용한 부모 스레드에서 사용 가능합니다. 그리고 `worker.postMessage(data)` 를 사용한 부모 스레드로부터 보내진 메세지는 `parentPort.on('message')` 를 사용한 스레드에서 사용 가능합니다.

## 예제

```js
const { Worker } = require('worker_threads');
const worker = new Worker(`
const { parentPort } = require('worker_threads');
parentPort.once('message',
message => parentPort.postMessage({ pong: message }));
`, { eval: true });

worker.on('message', message => console.log(message));
worker.postMessage('ping');
$ node --experimental-worker test.js
{ pong: ‘ping’ }
```

이 코드가 근본적으로 하는 일은 새로운 워커를 사용하여 새 스레드를 만드는 일인데, 워커 내부의 코드가 `parentPort` 에게서 메세지를 수신하고, 메세지를 수신하면 다시 메인 스레드에 메세지를 보냅니다.

다른 예제입니다.

```js
const {
 Worker, isMainThread, parentPort, workerData
} = require('worker_threads');

if (isMainThread) {
 module.exports = function parseJSAsync(script) {
 return new Promise((resolve, reject) => {
 const worker = new Worker(filename, {
 workerData: script
});

worker.on('message', resolve);
worker.on('error', reject);
worker.on('exit', (code) => {
 if (code !== 0)
 reject(new Error(`Worker stopped with exit code ${code}`));
  });
 });
};
} else {
 const { parse } = require('some-js-parsing-library');
 const script = workerData;
 parentPort.postMessage(parse(script));
}
```

- `Worker`: 독립 자바스크립트 실행 스레드를 나타내는 클래스입니다.
- `isMainThread`: 코드가 워커 스레드 내부에서 실행되고 있지 않은 경우 참을 반환합니다.
- `parentPort`: 이 스레드가 워커로 생성된 경우 부모 스레드와의 통신을 허용하는 MessagePort가 됩니다.
- `workerData`: 이 스레드의 워커 생성자에게 전달된 데이터의 복제본이 포함된 임의의 js 값입니다. 이런 종류의 작업을 실제로 사용할 때는, 워커 pool을 대신 사용하세요. 그렇지 않으면 워커를 만드는 데 드는 비용이 이득을 초과할 가능성이 있습니다.
