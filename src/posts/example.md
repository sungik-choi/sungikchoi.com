---
title: "콜 스택, 콜백 큐, 이벤트 루프"
tag: "JavaScript"
date: "2020-08-11 15:00:00 +09:00"
desc: "비동기 프로그래밍의 기초에 대해 간단하게 정리해봅니다."
thumbnail: "https://i1.wp.com/9to5mac.com/wp-content/uploads/sites/6/2020/06/Appearance.png?w=663&h=663&crop=1&quality=82&strip=all&ssl=1"
---

---

| 값         |                  의미                  |   기본값 |
| ---------- | :------------------------------------: | -------: |
| `static`   |     유형(기준) 없음 / 배치 불가능      | `static` |
| `relative` |       요소 자신을 기준으로 배치        |          |
| `absolute` | 위치 상 부모(조상)요소를 기준으로 배치 |          |
| `fixed`    |      브라우저 창을 기준으로 배치       |          |

## 자바스크립트는 싱글 스레드 언어

![Javascript Event Loop Visual Representation](https://img.velog.io/post-images/jakeseo_me/37657cb0-4975-11e9-b570-3dfe666b85e0/JavascriptEventLoop1.png?w=1024)

자바스크립트는 1개의 스레드로 동작한다. 즉, 1개의 `Call Stack`을 가지고 있다. 스택이 1개만 있기 때문에, 1번에 1개의 작업만 실행할 수 있다. 이러한 특성때문에, 실행 시간이 오래 걸리는 작업이 있다면 다음 작업의 실행이 지연되는 `blocking`이 발생할 수 있다.

자바스크립트에서는 이를 비동기 처리로 해결할 수 있다. 이는 음식점에서, 줄을 서서 기다리지 않도록 전화번호를 받아서 자리가 나면 전화를 해주는 상황과 비슷하다.

1. 인터프리터가 비동기 함수를 만나면, 즉시 `Call Stack`에서 지워버린다.
2. 이 비동기 함수는 `Web API`로 넘어간다.
3. 비동기 함수는 `Web API`에 담겨있다가, 타이머나 로드 등이 완료되면 `Callback Queue`로 보내진다.
4. `Event Loop`는 `Call Stack`과 `Callback Queue` 사이에서 `Call Stack`이 비어있는지 주시한다.
5. 모든 함수의 실행이 완료되고 `Call Stack`이 비워지면, `Event Loop`는 `Callback Queue`에 담겨있는 함수들을 먼저 들어온 순서대로 `Call Stack`으로 넘겨준다.

## Call Stack (호출 스택)

![Call Stack](https://img.velog.io/post-images/jakeseo_me/fc418e50-456c-11e9-83dd-8359947fc569/callstack.gif?w=1024)

> 호출 스택은 여러 함수들(functions)을 호출하는 스크립트에서 해당 위치를 추적하는 인터프리터 (웹 브라우저의 자바스크립트 인터프리터같은)를 위한 메커니즘입니다. 현재 어떤 함수가 동작하고있는 지, 그 함수 내에서 어떤 함수가 동작하는 지, 다음에 어떤 함수가 호출되어야하는 지 등을 제어합니다. [MDN](https://developer.mozilla.org/ko/docs/Glossary/Call_stack)

1. 자바스크립트가 함수를 호출하면 인터프리터는 이를 호출 스택에 추가한 다음 함수를 실행합니다.
2. 해당 함수에 의해 호출되는 모든 함수는 호출 스택에 추가되고 호출이 도달하는 위치에서 실행합니다.
3. 메인 함수가 끝나면 인터프리터는 스택을 제거하고 메인 코드 목록에서 중단된 실행을 다시 시작합니다.
4. 스택이 할당된 공간보다 많은 공간을 차지하면 `stack overflow` 에러가 발생합니다.

![Error Stack Trace](https://img.velog.io/post-images/jakeseo_me/ce05cad0-472c-11e9-b667-3db1122c69c1/failedStack.png?w=1024)

### Stack overflow

![stack overflow](https://img.velog.io/post-images/jakeseo_me/4be3ee00-472d-11e9-991d-a3c0d2a4a33c/ChromeStackOverFlow.png?w=1024)

## Heap

> 오브젝트(객체)들은 힙 내부에 할당됩니다. 힙은 거의 구조화되지 않은 영역(unstructured)의 메모리입니다. 변수와 객체들의 모든 메모리 할당이 여기서 일어나게 됩니다.

## Callback Queue

> JavaScript 런타임은 처리 할 메시지 목록인 메시지 대기열을 사용합니다.  

메세지 대기열 = `Callback Queue`

> 각 메시지에는 메시지를 처리하기 위해 호출되는 관련 함수가 있습니다. event loop 중 어떤 시점에서 런타임은 대기열에서 가장 오래된 메시지부터 처리하기 시작합니다. 그렇게하기 위해, 메시지는 큐에서 제거되고 해당 기능이 메시지를 입력 매개 변수로 호출됩니다. 언제나 그렇듯이, 함수를 호출하면 그 함수의 사용을 위한 새로운 스택 프레임이 생성됩니다.

선입선출 방식으로 콜백 큐에 들어있는 함수들을 호출한다. 함수를 호출하면 새롭게 `Call Stack` 에 쌓인다.

> 함수의 처리는 스택이 다시 비워 질 때까지 계속됩니다. 이벤트 루프는 큐의 다음 메시지를 처리합니다(존재할 경우).

## Event Loop

> `Event loop`는 그 구현 방식 때문에 붙은 이름이며 보통 다음과 유사합니다 :

```js
while(queue.waitForMessage()){
  queue.processNextMessage();
}
```

> `queue.waitForMessage()` 함수는 현재 아무 메시지도 없다면 새로운 메시지 도착을 동기적으로 기다립니다.

## 참고 자료

- [YouTube: What the heck is the event loop anyway?](https://www.youtube.com/watch?v=8aGhZQkoFbQ&feature=youtu.be)  
- [자바스크립트 개발자라면 알아야 할 33가지 개념 - 콜 스택](https://velog.io/@jakeseo_me/2019-03-15-2303-%EC%9E%91%EC%84%B1%EB%90%A8-rmjta5a3xh)
- [동시성 모델과 이벤트 루프](https://developer.mozilla.org/ko/docs/Web/JavaScript/EventLoop)
