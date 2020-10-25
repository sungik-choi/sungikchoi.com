<section id ="title">

<h1>최성익<span lang="en" id="eng-title">Sungik Choi</span></h1>
<!-- <span id="time">Updated <time datetime="2020-10-26">2020.10.26</time></span> -->

</section>

<section id="introduce">

<p>디자인을 전공했지만, 웹 프로덕트를 만드는 일에 재미를 느껴 프론트엔드 개발자의 길을 걷는 중입니다. 좋은 교육기관에서 웹 프론트엔드 개발, 함께 일하는 방식을 배웠습니다.</p>

<p>아름다운 UI, 인터랙션 디자인을 좋아합니다. 기술과 예술은 하나라고 생각합니다.</p>

- Github : <a href="https://github.com/sungik-choi" target="_blank">github.com/sungik-choi</a>
- Blog : <a href="https://sungikchoi.com" target="_blank">sungikchoi.com</a>
- Email : <a href="mailto:sungik.dev@gmail.com" target="_blank">sungik.dev@gmail.com</a>

</section>

---

<section id="project">

<h2>Project</h2>

<h3>Gatsby Starter Apple</h3>

| 제목       | 내용                                                                                                   |
| ---------- | ------------------------------------------------------------------------------------------------------ |
| **Github** | <a href="https://github.com/sungik-choi/gatsby-starter-apple" target="_blank">gatsby-starter-apple</a> |
| **Period** | 2020.08 ~ *Current*                                                                                    |
| **Skill**  | React.js, Gatsby.js, GraphQL, styled-components, canvas, Netlify                                       |

- React기반의 정적 사이트 생성기인 Gatsby로 제작한 블로그 스타터 템플릿 
- 현재 블로그에 사용 중. 다른 사람도 사용하기 쉽게 템플릿으로 만들어 오픈소스로 배포
- 별도의 UI Framework를 사용하지 않고 직접 UI 디자인 / CSS 스타일링
- Lighthouse 100점 (Desktop 기준)
- 웹 접근성
  - HTML5 시맨틱 마크업
  - 필요한 부분에 `aria-` 속성 사용
  - 키보드로 모든 기능을 사용할 수 있도록 구현
- 모바일 버거 메뉴 구현
  - 토글 상태에 따른 애니메이션 구현
  - 메뉴가 오픈된 상태일 때 Focus Trapping 및 스크롤 제한 기능 구현
  - 메뉴가 오픈된 상태일 때만 키보드로 접근 가능: `MediaQueryList` 객체의 `change` 이벤트와 `tabindex` 를 통해 구현
  - 메뉴를 Esc키로 닫을 수 있도록 구현
- 다이내믹 테마 구현 ([관련 블로그 포스트](https://www.sungikchoi.com/blog/gatsby-dark-mode/))
  - `prefers-color-scheme` 미디어 속성을 사용해 사용자 선호 테마 적용
  - `localStorage` 를 사용해 테마 설정 저장
  - `CSS var()` 를 사용해 테마별 스타일 변수 분리
  - `iframe` 내부의 댓글 플러그인, 코드 하이라이트 플러그인까지 함께 테마 적용
- `Intersection Observer` 를 사용한 인피니티 스크롤 기능 구현
  - 좋지 못한 UX라고 생각하기에, 추후 일반적인 페이지네이션으로 변경 예정
- HTML canvas를 사용한 [404 페이지 제작](https://www.sungikchoi.com/404)

### 이슈 트래커 서비스

| 제목       | 내용                                                                                                     |
| ---------- | -------------------------------------------------------------------------------------------------------- |
| **Github** | <a href="https://github.com/sungik-choi/issue-tracker-project" target="_blank">issue-tracker-project</a> |
| **Period** | 3 WEEK (2020.06.08 ~ 2020.06.26)                                                                         |
| **Skill**  | React.js, Material UI, Webpack, React Router                                                             |

- Github Issue를 바탕으로 제작한 이슈 트래커 서비스
- 이슈 목록 화면, 레이블 목록 화면을 맡아 구현
- 페어 프로그래밍과 [상호 코드 리뷰](https://github.com/codesquad-member-2020/issue-tracker-05/pull/38)
- PropTypes를 새로 배워 사용하며 [페어와 기술 공유](https://github.com/codesquad-member-2020/issue-tracker-05/wiki/%5BFE%5D-PropTypes-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)
- CRA를 사용하지 않고 직접 웹팩 빌드 환경 설정
  - babel, eslint, prettier, dev-server, dotenv 등
  - webpack-merge로 dev, prod 설정 분리
  - alias 절대 경로 설정
- 짧은 기간 동안 Material UI를 학습해서 사용
  - 추가적인 스타일링에 프레임워크에서 제공하는 `useStyle`, `makeStyles` 사용
- React Context API + useReducer를 통한 상태관리
- 재사용 가능한 컴포넌트를 별도 디렉토리에 분리해서 관리
- Cookie와 JWT Token을 사용해 OAuth 인증 구현

<!-- ### 숙소예약 서비스

| 제목       | 내용                                                                                                                      |
| ---------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Github** | <a href="https://github.com/sungik-choi/airbnb-project" target="_blank">https://github.com/sungik-choi/airbnb-project</a> |
| **Period** | *3WEEK* (2020.05.18 ~ 2020.06.05)                                                                                         |
| **Skill**  | React.js, Webpack, React Router, styled-components                                                                        |

- 에어비앤비 UI를 바탕으로 제작한 숙소예약 서비스
- 시간을 정해두고 드라이버 & 네비게이터를 바꿔가며 페어 프로그래밍
- CRA를 사용하지 않고 직접 웹팩 빌드 환경 설정
- Context API + useReducer 로 상태관리
-->

### 온라인 야구 게임

| 제목       | 내용                                                                                           |
| ---------- | ---------------------------------------------------------------------------------------------- |
| **Github** | <a href="https://github.com/sungik-choi/baseball-project" target="_blank">baseball-project</a> |
| **Period** | 2 WEEK (2020.05.04 ~ 2020.05.15)                                                               |
| **Skill**  | React.js, styled-components, Webpack, React Router, canvas                                     |

- 온라인 1:1 대결 야구 게임 서비스
- 원활한 페어 프로그래밍을 위해 Adobe Xd로 UI를 직접 디자인하고, Zeplin을 통해 페어와 공유
- React Context API + useReducer를 통한 상태관리
- CSS Image Sprite와 animation steps를 사용해 캐릭터 애니메이션 구현
- 라우팅 이동 간 트랜지션 애니메이션 구현
- HTML canvas로 게임판 구현

### TODO 리스트 서비스

| 제목       | 내용                                                                                   |
| ---------- | -------------------------------------------------------------------------------------- |
| **Github** | <a href="https://github.com/sungik-choi/todo-project" target="_blank">todo-project</a> |
| **Period** | 2 WEEK (2020.04.06 ~ 2020.04.17)                                                       |
| **Skill**  | JavaScript, TypeScript, Webpack, Tailwind CSS                                          |

- Github Project Page의 칸반 보드를 바탕으로 제작한 할 일 관리 프로젝트
- 별도의 프레임워크 없이 Vanilla JavaScript(TypeScript)로 구현
- Tailwind CSS를 새로 학습해서 짧은 기간 안에 적용, 스타일 모듈화
- [드래그 앤드 드롭 기능 API 없이 직접 구현](https://github.com/sungik-choi/todo-project/blob/dev/FE/src/ts/components/dragAndDrop.ts)
  - `mousedown`, `mousemove`, `mouseup`, `mouseover` 이벤트 사용
  - `cloneNode()`, `insertBefore()` 메서드를 사용해서 할 일 카드를 복제, 다른 컬럼으로 옮길 수 있도록 구현
  - 마우스 포지션을 계산해, 카드 리스트의 맨 끝으로 카드를 옮기는 경우도 자연스럽게 보이도록 구현
- [사이드 메뉴 구현](https://github.com/sungik-choi/todo-project/blob/dev/FE/src/ts/components/sidemenu.ts)
  - 사용자 로그 리스트가 저장되는 사이드 메뉴
  - 직전의 로그 배열과 새로운 로그 배열을 비교, 새로 생긴 로그들을 애니메이션과 함께 업데이트되도록 구현
  - `insertAdjacentHTML()` 메서드를 사용해 새로운 로그 엘리먼트를 생성
- 사용자의 관점에서 UX 디테일을 신경 쓰려고 노력
  - textarea가 나타날 때 focus가 해당 엘리먼트로 향하도록 구현
  - 카드 hover 시 마우스 포인터가 move 포인터로 바뀌기 등

</section>

---

<section id="skill">

<h2>Skill</h2>

- JavaScript
- React.js
- HTML
- CSS
- UI/UX Design

</section>

---

<section id="education">

<h2>Education</h2>

### 코드스쿼드

2020.01 ~ 2020.07 | 웹 프론트엔드 마스터즈코스 수료

### 건국대학교 커뮤니케이션디자인학과

2012.03 ~ 2019.02 | 학사 졸업

</section>
