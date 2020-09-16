---
title: "Call Stack, Callback Queue"
tag: "JavaScript"
date: "2020-08-07 15:00:00 +09:00"
desc: "비동기 프로그래밍의 기초에 대해 간단하게 정리해봅니다."
thumbnail: "../images/galaxy.jpg"
alt: "우주 사진"
---

## 개요

캘리포니아 쿠퍼티노 — Apple은 오늘 165개국의 음악 팬들에게 제공되는 Apple Music의 두 개의 새로운 라이브 글로벌 라디오 서비스를 발표했다. 오늘부터 대표 글로벌 라디오 채널인 Beats 1은 Apple Music 1으로 명칭이 변경되며, 두 개의 추가 라디오 채널도 시작되는데, 80년대, 90년대 및 2000년대의 인기곡들을 방송하는 Apple Music Hits와 컨트리 뮤직에 초점을 맞춘 Apple Music Country가 그것이다.

2005년 Apple Music이 시작된 이후, Beats 1은 깊이 있는 양질의 아티스트 인터뷰, 그 어느 곳보다 많은 글로벌 독점 방송 및 최초 공개, 그리고 매년 문화를 움직이고 화제를 모으는 순간들을 만들어 온 색다른 프로그램들을 일관되게 제공하면서 전 세계에서 가장 많이 청취하는 라디오 채널 중 하나로 성장해 왔다. 진화를 거듭하면서, Beats 1은 아티스트 커뮤니티와 자연스레 신뢰를 구축했으며 사람에 의한 선곡과 탐색을 지지해왔는데, 이러한 접근 방식은 세 개의 채널에서도 변함없이 이어질 예정이다.

Apple Music, Beats 및 인터내셔널 콘텐츠 담당 부사장인 올리버 슈셔(Oliver Schusser)는 “지난 5년간, 음악 문화에 의미있는 순간마다 Beats 1이 함께 했다. Beats 1은 사람에 의한 선곡을 전면에 내세우고 음악계에서 가장 혁신적이고, 존경 받으며 사랑받는 이들의 독점 방송을 통해 청취자들을 끌어들였다”며 “이제, Apple Music 라디오는 모든 장르의 아티스트들이 자신의 팬들과 함께 음악에 대해 이야기하고, 제작하며 공유할 수 있는 비교불가의 글로벌 플랫폼을 제공한다. 이것은 단지 시작에 불과하다. 우리는 계속해서 라이브 라디오에 투자하고 전 세계의 청취자들이 자신이 사랑하는 음악과 이어질 수 있는 기회를 만들어갈 것이다”고 밝혔다.

## Beats 1, 이제 Apple Music 1으로 명칭 변경

![](./../images/icon.png)

로스앤젤레스, 뉴욕, 내쉬빌 및 런던에 최첨단 스튜디오를 갖춘 Apple Music 1은 팝 문화에 대한 담론 및 아티스트가 주도하는 편성의 중심이자 전 세계의 아티스트들이 새로운 음악을 공개하고, 화제를 터뜨리며, 자신의 팬과 직접 소통할 수 있는 글로벌 무대이다. Apple Music 1은 주축을 이루는 진행자들인 제인 로우(Zane Lowe), 에브로 다든(Ebro Darden), 브룩 리스(Brooke Reese), 도티(Dotty), 하누만 웰치(Hanuman Welch), 매트 윌킨슨(Matt Wilkinson), 나데스카(Nadeska), 레베카 주드(Rebecca Judd) 및 트래비스 밀스(Travis Mills)에 의해 주도되지만, 액션 브론슨(Action Bronson), 빌리 아일리시(Billie Eilish), 엘튼 존(Elton John), 조 케이(Joe Kay), 릴 웨인(Lil Wayne), 프랭크 오션(Frank Ocean), 빈스 스테이플스(Vince Staples) 및 더 위켄드(The Weeknd) 등 유명 음악인들이 참여하는 방송 라인업 및 에이치(Aitch), 커윈 프로스트(Kerwin Frost), 하임(HAIM), 레이디 가가(Lady Gaga), 나일 로저스(Nile Rodgers), 트래비스 스콧(Travis Scott), 찰리 슬로스(Charlie Sloth), 영 M.A(Young M.A) 등이 진행하는 새로운 방송도 제공한다.

Apple Music 1은 또한 J 발빈 (J Balvin)의 새로운 방송 및 청취자들의 인기를 얻고 있는 “¡Dale Play! with Sandra Peña”와 “La Fórmula Radio with El Guru”를 포함, 활기찬 전 세계 라틴 음악을 소개하는 프로그램들과 최고의 아프리카 현지 음악 및 아티스트들을 선보이는 “Africa Now Radio with Cuppy”도 편성되어 있다.

Apple Music의 글로벌 크리에이티브 디렉터이자 진행자인 제인 로우(Zane Lowe)는 “Apple Music은 고향과도 같다. 아티스트의 고향이자, 팬들의 고향이며, 훌륭한 음악들의 고향이다”라며 “나는 지나치리만큼 음악만 생각하는 사람이다. 나는 가장 흥미진진한 신인 아티스트들을 찾아내 이들의 음악을 우리 시대의 가장 중요한 대표적인 아티스트들과 함께 방송하는 것을 좋아하는데, 훌륭한 음악은 차이가 없고 Apple Music 팬들은 그저 훌륭한 음악을 듣고 싶어하기 때문이다. 이것은 곧 Apple Music 라디오가 지향하는 것이다”라고 말했다.

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
