# 중고가전 상품 사이트 2022.04 ~ 2022.05  

> 중고가전 매장 내 상품 소개 및 목록을 보여주는 사이트 [반응형 웹]

<br/>

## 📖 목차

- [구현기능](#-구현-기능)
- [기술스택](#-기술-스택)

</br>

## 🚀 구현 기능
### 로그인
![ezgif com-gif-maker](https://user-images.githubusercontent.com/30553624/204290764-1335833b-f9c7-4ee5-b80e-acd3b8f85a37.gif)
<br/>
회원은 관리자만 있으며, 해당 계정만 로그인 가능합니다.

<br/>

### 업체 소개
![ezgif com-gif-maker (1)](https://user-images.githubusercontent.com/30553624/204290960-698d13cf-fc16-4d73-a322-0e872d78e563.gif)

<br/>

### 제품 목록
![ezgif com-gif-maker (2)](https://user-images.githubusercontent.com/30553624/204291358-2deed6ac-4812-4e1c-8d89-91c37f4aea1b.gif)
<br/>
추천제품은 carousel 로 구현했으며, 제품 목록은 카테고리에 맞는 제품을 보여줍니다.

<br/>

### 검색
![ezgif com-gif-maker (3)](https://user-images.githubusercontent.com/30553624/204291892-e1c25138-c6f1-4322-9a85-74c379be3f26.gif)
<br/>
Header 의 오른쪽 search 아이콘을 클릭하면 검색창이 나타납니다. 검색어를 입력하면 검색어에 해당하는 제품들을 보여줍니다.

<br/>

### 제품 소개
![ezgif com-gif-maker (4)](https://user-images.githubusercontent.com/30553624/204291984-142d406b-24f8-4a98-be85-bbc1e9e54a82.gif)
<br/>
제품사진 및 소개글을 볼 수 있습니다.

<br/>


### 관리자
![ezgif com-gif-maker (5)](https://user-images.githubusercontent.com/30553624/204292146-09446076-f95a-4a83-9532-c19da6604436.gif)
<br/>
관리자로 로그인시 사용가능한 페이지입니다. react-chart를 이용해 방문자 통계를 보여줍니다. html 에디터는 react-draft-wysiwyg 를 사용하여 구현했습니다.
- 방문자 통계
- 제품 보기
- 제품 작성
- 제품 수정
- 제품 삭제

<br/>

## ✏ 기술 스택 
- FrontEnd (TypeScript | React | Redux-Toolkit | Redux-Query | Material-UI)
- BackEnd (TypeScript | Express.js | TypeORM | MariaDB)
