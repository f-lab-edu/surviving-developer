# Surviving Developer

면접 질문에 대한 답을 연습하기 위해 랜덤 질문을 받아볼 수 있는 프로젝트

## 기능

- 면접 질문 하기
  1. 모달 위에 면접 질문이 나타난다.
  2. 질문 밑에는 textarea가 나타난다.
  3. textarea에 면접 답변을 남길 수 있다.
  4. 정답보기 버튼을 클릭하면 정답이 나타난다.
  5. 제출 버튼을 클릭하면 DB에 저장 된다.
- 면접 질문 관리
  1. 질문과 질문에 따른 답을 등록할 수 있다.
  2. 등록한 질문을 볼 수 있다.
  3. 등록한 질문을 선택해 수정할 수 있다.
  4. 등록한 질문을 선택해 삭제할 수 있다.

---

## 목표

### 환경 세팅

- webpack 설정
  - entry, output
  - loader (babel 포함)
  - dev server
- eslint, prettier 세팅

### Page Initialize 구현

※ indexedDB를 활용 (렌더링과 상관없이 script를 먼저 불러와 아래 작업을 절차대로 진행)

1. 질문지 DB json 파일을 기본 내장
2. indexedDB connection
3. 면접 질문 DB version 확인
4. version이 다르다면 json 파일 파싱 및 DB 업데이트
5. 모든 과정이 끝날 때까지 loading spinner가 존재

### 라우터 구현

- History API 사용
- 상태관리
- 매인 페이지와 관리 페이지 라우터 연결
- 모달 연결

<br/>

---

## 커밋 컨벤션

|    prefix    | description                                                  | Icon |
| :----------: | ------------------------------------------------------------ | :--: |
|     Feat     | 새로운 기능 추가                                             |  ✨   |
|     Fix      | 버그 수정                                                    |  🐛   |
|   Refactor   | 리팩토링                                                     |  ♻️   |
|    Design    | CSS 등 사용자 UI 디자인 변경                                 |  💄   |
|    Style     | 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우            |  🎨   |
|     Test     | 테스트(테스트 코드 추가, 수정, 삭제, 비즈니스 로직에 변경이 없는 경우) |  ✅   |
|    Chore     | 기타 변경사항(빌드 스크립트 수정, assets image, 패키지 매니저 등) |  💚   |
|     Init     | 프로젝트 초기 생성                                           |  🎉   |
|    Rename    | 파일 혹은 폴더명 수정하거나 옮기는 경우                      |  🚚   |
|    Remove    | 파일을 삭제하는 작업만 수행하는 경우                         |  🔥   |
|     Docs     | 문서 추가/수정                                               |  📝   |
| Bump version | 버전 업데이트                                                |  🔖   |

## 커밋 규칙

1. 제목은 최대 50글자 넘지 않기
2. 마침표 및 특수기호 사용x
3. 첫 글자 대문자, 명령문 사용
4. 개조식 구문으로 작성(간결하고 요점적인 서술) -> 어떻게 보다는 '무엇을', '왜' 변경했는지에 대해 작성

[참고](https://github.com/RomuloOliveira/commit-messages-guide/blob/master/README_ko-KR.md)

## 개발 프로세스

1. 이슈에 사용할 Labeling -> 커밋 컨벤션에 따라
2. 이슈 등록
3. 이슈 번호로 브랜치 생성
4. projects 현황판에 등록
5. 브랜치에서 작업
6. 커밋 규칙과 컨벤션에 따라 커밋 메시지 작성
7. PR