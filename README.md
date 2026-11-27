# my-next-app

Next.js(App Router)로 같은 할 일 앱을 세 가지 방식으로 만든 예제입니다. 할 일 데이터는 연습용 API [JSONPlaceholder](https://jsonplaceholder.typicode.com/)에서 받습니다.

| 주소 | 방식 | 할 일을 받는 곳 |
|---|---|---|
| `/todo-route` | Route API | 화면(클라이언트 컴포넌트)이 내 앱의 `/api/todos`에 요청하고, Route Handler(`app/api/todos`)가 서버에서 JSONPlaceholder에 요청 |
| `/todo-server` | 서버 컴포넌트 | 서버 컴포넌트가 서버에서 받아 HTML에 담아 보냄. 추가 · 완료 · 삭제는 Server Actions(`app/todo-server/actions.ts`) |
| `/todo-client` | 클라이언트 컴포넌트 | `"use client"` 화면이 커스텀 훅(`app/todo-client/hooks/useTodos.ts`)으로 브라우저에서 바로 요청 |

## 실행

```bash
npm install
npm run dev
```

주소는 http://localhost:3000 입니다. 배포용 빌드로 실행할 때는 `npm run build`로 빌드한 뒤 `npm run start`로 켭니다.

## 알아 둘 것

- JSONPlaceholder는 쓰기 요청(POST · PUT · DELETE)에 성공한 것처럼 답하지만 실제로 저장하지 않습니다. 안내 문서에는 「The resource is not really created on the server, but the response is faked as if.」라고 적혀 있습니다.
  - 그래서 서버 컴포넌트 방식은 추가 · 완료 · 삭제 뒤 목록을 서버에서 다시 받으면 원래 목록으로 돌아갑니다.
- JSONPlaceholder는 새 할 일에 늘 `id: 201`을 돌려주고, 201번은 고칠 수 없습니다(PUT 404).
  - 그래서 Route API · 클라이언트 컴포넌트 방식은 새 할 일에 화면에서 쓸 임시 번호를 붙이고, 새 할 일의 완료 표시는 화면에서만 바꿉니다.

## 판

Next.js 16.4.6 · React 19.3.0 · TypeScript · Tailwind CSS 4. 2026년 11월 27일 Next.js 15.4.6에서 올렸습니다. 그 전 판은 `npm run build`가 타입 검사에서 멈췄고, `npm audit`에 보안 경고가 있었습니다.
