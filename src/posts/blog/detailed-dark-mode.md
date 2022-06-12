---
title: '디테일 높은 다크모드 구현하기'
category: 'CSS'
date: '2022-06-12'
desc: '다크모드를 구현하면서 얻게 된 팁들을 공유합니다.'
thumbnail: './images/detailed-dark-mode/thumbnail.jpg'
alt: 'Laptop screen under dark background'
---

다크모드를 단순히 색상 변경 정도로만 생각할 수 있지만 사실 꽤 챙겨볼 수 있는 디테일들이 많다. 최근 업무를 통해 다크모드를 구현하면서 얻게 된 팁들을 공유해본다.

> 이 포스트는 프로젝트에 React 라이브러리를 사용한다는 가정하에 작성되어 있으며, 디자인에 관한 내용은 다루지 않는다.

## `ThemeProvider` 대신 CSS Variable을 사용하기

`styled-components` 나 `emotion` 같은 CSS-in-JS를 사용하고 있다면 아마 테마 구현을 위해 `ThemeProvider` 라는 [Context](https://ko.reactjs.org/docs/context.html#gatsby-focus-wrapper)를 사용하고 있을 확률이 높다. ([이전 포스트](https://www.sungikchoi.com/blog/gatsby-dark-mode/)에서도 `ThemeProvider` 를 통해 다크모드를 구현했다)

```tsx
const Box = styled.div`
  color: ${props => props.theme.color};
`

render(
  <ThemeProvider theme={{ color: 'mediumseagreen' }}>
    <Box>I'm mediumseagreen!</Box>
  </ThemeProvider>
)
```

대신 CSS Variable을 사용하자.

```tsx
const Box = styled.div`
  color: var(--bg-primary-color);
`

render(
  <Box>I'm mediumseagreen!</Box>
)
```

첫 번째 이유로, 런타임에서 성능상 이득을 볼 수 있다. 다크모드를 구현한다면 `ThemeProvider` 의 Context value(`theme`)에 새로운 객체를 넘겨주는 식으로 구현하게 될 텐데, 이 경우 기존 `theme` 객체가 바뀌며 Context를 소비하는 모든 컴포넌트에서 리렌더링과 재계산이 이루어지게 된다.

`ThemeProvider` 대신 CSS Variable을 사용하면 브라우저의 스타일 재계산은 이루어지겠지만, React 상에서 상태 변경은 없으므로 성능에 이점을 가져갈 수 있다. 즉, 사용자에게 더 빠른 속도로 피드백을 제공할 수 있다는 뜻이다. 그 외에도 **CSS-in-JS로 구현되지 않은 곳에서도 변수를 참조할 수 있다**는 강력한 장점이 있기에 웬만하면 CSS Variable을 사용하는 편이 좋겠다.

> 나의 경우 회사 프로젝트에 SCSS로 스타일링된 레거시 컴포넌트가 대단히 많았었는데, CSS Variable을 사용하면서 적은 마이그레이션 비용으로 단번에 다크모드를 추가할 수 있었다.

### References

아래 링크를 참고해보면 더 좋을 거 같다.

- [Use CSS Variables instead of React Context](https://epicreact.dev/css-variables/) : 상세한 이유와 구현, 성능 측정까지 정말 잘 작성되어 있다.
- [Chakra UI - CSS Variables](https://chakra-ui.com/docs/styled-system/features/css-variables) : 왜 Chakra UI에서 CSS Variable로 토큰 구현 방식을 변경했는지 살펴보자.

## 다른 트랜지션 지속시간을 가진 컴포넌트들에 일관적인 스타일 적용하기

미려한 경험을 위해 컴포넌트 스타일에 트랜지션을 적용하는 경우가 많다.

```tsx
const FooButton = styled.div`
  color: var(--bg-color-red);
  transition: color 300ms;
  &:hover {
    color: var(--bg-color-red-light);
  }
`
```

프로젝트의 사이즈가 커지고 다양한 디자인이 추가될수록 컴포넌트별로 각기 다른 트랜지션 지속시간(`transition-duration`)을 가지게 된다. 디자인 시스템을 통해 사용할 수 있는 트랜지션 값에 제한을 걸더라도, 결국 가짓수가 늘어나는 걸 피할 수는 없다.

```tsx
const BarButton = styled.div`
  color: var(--bg-color-red);
  transition: color 500ms;
  &:hover {
    color: var(--bg-color-red-light);
  }
`
```

이런 경우 한 화면에 다양한 트랜지션 지속시간을 가진 컴포넌트가 존재한다면, 테마 변경 시 각기 다른 컴포넌트의 색상이 전부 미묘하게 다른 시간 동안 변경된다. 취향일 수도 있지만, 나는 이것이 일관적인 경험을 제공하지 않고 제품의 디테일 면에서 좋지 않다고 생각했다. 수천 개의 컴포넌트가 존재하는 거대한 프로젝트에서 이 점을 어떻게 해결할 수 있을까 고민하다가, 글로벌 스타일을 통해 테마 변경 시간 동안 스타일을 오버라이드하는 방식으로 쉽게 해결할 수 있었다.

```tsx
import { createGlobalStyle } from 'styled-components'

/* 테마 변경을 담당하는 컴포넌트에서 아래 className을 사용한다. */
export const NO_TRANSITION_CLASS_NAME = 'no-transition'

const GlobalStyle = createGlobalStyle`
  /* 모든 컴포넌트의 색상에 대한 트랜지션 지속시간을 0초로 만든다. */
  /* 원한다면, 지속 시간을 추가할 수도 있다. */
  .${NO_TRANSITION_CLASS_NAME} * {
    transition: background-color 0s, color 0s !important;
  }
`
```

> `NO_TRANSITION_CLASS_NAME` 을 root Element에 class name을 추가했다가 제거하는 방향으로 구현했다. 자세한 구현은 회사 블로그 혹은 별도의 포스트로 만들어보려고 한다.

## Safari 15 `theme-color`

2021년, Safari 15에 `theme-color` 가 추가됐다. [2014년](https://developer.chrome.com/blog/support-for-theme-color-in-chrome-39-for-android/)에 이미 안드로이드 크롬에 추가된 기능이긴 하지만, 대부분 적용되지 않은 경우가 많을 거 같다. 사파리의 경우엔 미디어쿼리를 지원하기 때문에, 컬러 스키마별 다른 색상을 적용할 수 있다.

![Safari 15 Theme color](https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/06/Screen-Shot-2021-06-11-at-8.22.55-AM.png?w=1658&ssl=1)

사파리의 브라우저 이용률은 절반 이상을 차지하는 압도적인 크롬에 이어 2위로, 약 20% 정도이다. 적지 않은 사용자들이 이용하는 브라우저이므로, 충분히 챙겨볼 만한 디테일이라고 생각한다.

## 맺으며

'[신은 디테일에 있다](https://medium.com/@buzzusborne/god-is-in-the-details-bc3a9a9a5d88)' 라고 한다. 제품을 개발하는 데 있어서 너무 디테일에만 집착해서도 안 되겠지만, (기능이 잘 동작한다는 전제하에) 정말 멋진 제품인지 아닌지를 판가름하는 건 제품 속에 숨은 작은 디테일들이 아닐까.
