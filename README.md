# Project Query Cache

- 전유영
- 2023.07.16 ~ 2023.07.19
- :bulb: 07.21 REFACTORED:
  1. Home 의 `useEffect` 코드 기능별 분리 및 `let` 키워드 변수 제거
  2. 불필요한 boolean return 제거
- :bulb: 08.22 FIXED:
  - Debouncing 을 적용하여 배포 시 API 호출 문제 해결
    - 사용자 타이핑 속도에 비해 서버 응답 속도가 늦기 때문에 `setCachedItem` 실행 타이밍에서 문제 발생
    - 개발자도구의 네트워크 설정을 이용해 테스트 할 것

## 배포 주소

- [https://project-query-cache-549505992e1e.herokuapp.com/](https://project-query-cache-549505992e1e.herokuapp.com/)

## 실행 방법

1. git bash 에서 아래 명령어 실행

```bash
git clone https://github.com/PollyGotACracker/project-query-cache.git
```

2. VSCode 에서 프로젝트를 열고 `npm install`, `npm run dev` 실행
   - `start` 명령어는 heroku 배포 시 ts 파일을 node 환경에서 실행
3. 터미널 log 의 local 주소 ctrl + 클릭

## 실행 화면

![caching](https://github.com/PollyGotACracker/project-query-cache/assets/92136750/c0866539-0336-4635-97ad-27402002400f)

## 사용한 라이브러리

- TypeScript, axios, styled-components
- json-server : Fake REST API
- concurrently, cross-env, ts-node : Run scripts

## 구현 사항

### 예제 사이트 탐구

- [한국임상정보](https://clinicaltrialskorea.com/)

- 검색창에 타이핑할 때마다 API 호출. 약간의 delay 적용
- 캐싱된 데이터 표시:

  - 이전에 입력했던 검색어를 다시 입력할 때
  - 입력된 검색어를 한 글자씩 지울 때
  - 탭을 켜놓은 상태에서 시간이 충분히 지난 뒤 이전에 입력했던 검색어를 다시 입력했을 때

- 캐싱된 데이터 삭제:

  - 경로 이동
  - 페이지 새로고침

- 최근 검색어 삭제: 페이지를 완전히 닫았을 때

### API 호출별로 로컬 캐싱

- `useCacheData` custom hook 을 생성하여 캐싱된 데이터에서 값을 찾을 수 없을 경우 API 를 호출하도록 했습니다.
- 각 검색어의 데이터는 `[key: string]: { data: T[] | [], expires: Date }` 의 객체 형태로 저장됩니다.  
  key 는 사용자가 입력한 검색어, `data` 는 추천 검색어 목록, `expires` 는 만료 시간으로 hour 단위로 설정할 수 있습니다.
- Expire time 은 `setInterval` 을 사용하여 1분 간격으로 전체 데이터를 순회하는 방법으로 구현했습니다.  
  저장된 데이터를 얕은 복사 후, 각 검색어의 `expires` 값과 현재 시간을 비교하여 만료 기간이 지난 객체를 `delete` 하여 변경된 값을 재할당합니다.
- 검색어가 새로 입력되었거나, 설정한 만료 시간인 1시간이 지났을 경우에만 개발자 도구 콘솔에서 `calling api` 가 찍힙니다.

### API 호출 횟수를 줄이는 전략

- 사용자가 검색어를 타이핑하는 중에 자음이나 모음만 입력했을 때도 불필요하게 API가 호출되고 있다고 생각했습니다.  
  그래서 입력된 문자가 모두 유효할 경우(완성형 한글, 영어 대소문자, 공백 허용)에만 요청하도록 정규표현식을 사용했습니다.

```js
const isCompletedText = /^[\uAC00-\uD7A3|A-Z|a-z|\s]*$/.test(inputValue);
```

### 키보드로 추천 검색어 이동

- input 에 포커스되어 있는 상태에서 키보드의 Tab 키를 누르면  
  검색 버튼, 각 검색어 리스트를 차례로 포커스하도록 `tabIndex` 를 설정했습니다.

### 최근 검색어 구현

- `sessionStorage` 에 배열로 저장하여 페이지를 닫았을 때 데이터를 삭제하도록 했습니다.  
  스토리지 저장 메서드는 input enter, 검색 버튼 click, 추천 검색어 항목 클릭 시 호출됩니다.  
  input 의 값이 문자열이 아니거나, 중복 값인 경우 저장되지 않도록 했습니다.
