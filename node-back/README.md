# Node.js를 사용한 Back Server 구현

## Project 실행
```
node app.js
```

## 사용 모듈 및 버전

- express : 4.18.2
- mysql2 : 2.3.3
- sequelize : 6.28.0
- sequelize-cli : 6.5.2
- cors : 2.8.5
- fs: 0.0.1-security
- multer : 1.4.5-lts.1

## End Point

- 기본 URL : http://127.0.0.1:52273:/content
- 글 작성 : POST /write
  - Request
    - Body : boardnum(게시판 번호), writer(작성자), title(글 제목), text(글 내용), imagecnt(업로드한 이미지 수)
  - Response : HttpStatus(200/404), message
- 게시글 리스트 : POST /boardlist, POST /boardlistcnt
  - Request
    - Path Variable : 게시판 번호
    - Parameter : 페이지 번호
  - Response : 글 리스트, 해당 게시판 글 갯수
- 게시글 조회 : POST /content
  - Request
    - Parameter : 게시글 ID
  - Response : 해당 게시글에 대한 정보
- 게시글 수정 : POST /edit
  - Request
    - Parameter : 게시글 ID
    - Body : 게시글의 새 내용
  - Response : HttpStatus(200/404), message
- 게시글 삭제 : POST /delete
  - Request
      - Parameter : 게시글 ID
  - Response : HttpStatus(200/404), message
- 검색 : POST /search
  - Request
    - Body : searchOption(제목/작성자)
    - Parameter : 검색 키워드
  - Response : 조회된 게시글, 조회된 게시글 개수
  - 검색은 페이징 구현 X
- 이미지 저장 : POST /imagesave
  - Request : 이미지 리스트
  - Response : HttpStatus(200/404), message