---
title: "Fetch API"
category: "JavaScript"
date: "2020-02-25 15:00:00 +09:00"
desc: "Fetch API 개념정리"
thumbnail: "./images/galaxy.jpg"
alt: ""
---


> Fetch의 핵심은 인터페이스의 추상화입니다. HTTP Request, Response, Headers, Body의 Payload, 그리고 비동기 리소스 Request의 초기화를 위한global fetch메서드가 이 대상입니다. HTTP의 주요 컴포넌트가 자바스크립트 오브젝트로써 추상화되어있기 때문에 다른 API에서 이러한 기능들을 사용하기 쉽게 해줍니다.
>
> (...) fetch()를 불러들이는 경우, 취득할 리소스를 반드시 인수로 지정하지 않으면 안됩니다. 읽어들인 뒤,  **fetch()는 `Promise객체`를 반환합니다.** 리퀘스트가 성공하든 실패하든 해당 리퀘스트 통신에 대한 `Response객체`가 취득됩니다. fetch()의 두번째 인수는 초기화에 사용되는 객체를 정의하고 있습니다. 이 인수는 기입하지 않아도 함수의 동작에 문제가 없습니다. (...)

fetch()는 XMLHttpRequest처럼 네트워크 요청을 가능하게 만들어준다. 가장 큰 차이점은 Fetch API는 Promise를 활용한다는 점이다. Promise는 API를 깔끔하고 심플하게 만들어주고, 콜백 지옥을 피할 수 있게 해준다.

### XHLHttpRequest

```js
function reqListener() {
  var data = JSON.parse(this.responseText);
  console.log(data);
}

function reqError(err) {
  console.log('Fetch Error :-S', err);
}

var oReq = new XMLHttpRequest();
oReq.onload = reqListener;
oReq.onerror = reqError;
oReq.open('get', './api/some.json', true);
oReq.send();
```

### Fetch

```js
fetch('./api/some.json')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        console.log(data);
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
```

```js
fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json())
  .then(json => console.log(json))
// expected
// {userId: 1, id: 1, title: "delectus aut autem", completed: false}
```

### Use POST Method

```js
var url = 'https://example.com/profile';
var data = {username: 'example'};

fetch(url, {
  method: 'POST', // or 'PUT'
  body: JSON.stringify(data), // data can be `string` or {object}!
  headers:{
    'Content-Type': 'application/json'
  }
}).then(res => res.json())
.then(response => console.log('Success:', JSON.stringify(response)))
.catch(error => console.error('Error:', error));

// expected
// Success: {"userId":"Ed","id":201}
```

네트워크 탭에서 `Request Method: POST` 로 표시됨

## Reference

- <https://developers.google.com/web/updates/2015/03/introduction-to-fetch>
- <https://developer.mozilla.org/ko/docs/Web/API/Fetch_API>
