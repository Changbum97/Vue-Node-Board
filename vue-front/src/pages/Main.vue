<template>
  <v-app>
    <v-app-bar app color="red" dark>
      <v-spacer></v-spacer>
      <v-app-bar-title>
        <div align="center" :style="{fontSize:'xx-large'} ">메인화면</div>
      </v-app-bar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" md="3"></v-col>
          <v-col cols="12" md="2" align="center">
            <v-btn color="light-green" @click="movetoboard1"
                   :style="{height:'50px', width:'170px', fontWeight:'bold', fontSize:'large'}">게시판1</v-btn>
          </v-col>
          <v-col cols="12" md="2" align="center">
            <v-btn color="yellow" @click="movetoboard2"
                   :style="{height:'50px', width:'170px', fontWeight:'bold', fontSize:'large'}">게시판2</v-btn>
          </v-col>
          <v-col cols="12" md="2" align="center">
            <v-btn color="orange" type="submit" @click="movetoboard3"
                   :style="{height:'50px', width:'170px', fontWeight:'bold', fontSize:'large'}">게시판3</v-btn>
          </v-col>
          <v-col cols="12" md="3"></v-col>
        </v-row>

        <!-- 검색 기능 -->
        <v-row :style="{marginTop: '50px'}">
          <v-col cols="12" md="2" />
          <v-col cols="12" md="2">
            <v-select
                :items="searchoption"
                v-model="searchoptionselected"
                :style="{width:'90px', marginLeft:'90px'}" />
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field v-model="searchkeyword" dense outlined label="검색키워드"
                          full-width :style="{marginTop:'10px'}"/>
          </v-col>
          <v-col cols="12" md="1">
            <v-btn @click="searchstart" :style="{marginTop:'10px'}">검색</v-btn>
          </v-col>
          <v-col cols="12" md="3" />
        </v-row>
        <v-row v-if="searchfinish===true" :style="{marginTop:'0px'}">
          <v-col cols="12" md="5"/>
          <v-col cols="12" md="2">
            <div style="font-size: x-large">검색결과 : {{searchcnt}} 개</div>
          </v-col>
          <v-col cols="12" md="5"/>
        </v-row>
        <!-- 여기서부터는 게시판 페이지와 거의 일치, 검색완료시에만 표가 나타나게 했고, 게시판 번호 표시 -->
        <v-row v-if="searchfinish===true">
          <v-simple-table style="width: 100%;">
            <thead>
            <tr style="font-weight: bolder;">
              <td style="width:10%; font-size: x-large;">게시판</td>
              <td style="width:20%; font-size: x-large;">작성자</td>
              <td style="width:50%; font-size: x-large;">제목</td>
              <td style="width:20%; font-size: x-large;">작성일</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in contentlist" :key="item.id" @click="movetocontent(item.boardnum, item.id)">
              <td>{{item.boardnum}}</td>
              <td>{{item.writer}}</td>
              <td>{{item.title}}</td>
              <td>{{item.createdAt.split('T')[0]}}</td>
            </tr>
            </tbody>
          </v-simple-table>
        </v-row>
      </v-container>

    </v-main>
    <v-footer min-height="50px" color="white"/>
  </v-app>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      searchkeyword: '',            // 검색키워드
      searchfinish: false,          // 검색완료시 true로 바뀌고, 이때부터 표 생성
      searchoption: ['제목','작성자'], // 검색옵션
      searchoptionselected: '제목',  // 검색옵션값 받아오기, 기본값은 제목으로 지정
      searchcnt: 0,                 // 검색된 게시글 갯수
      contentlist: [],              // 게시글 리스트
    }
  },
  methods: {
    movetoboard1(){
      window.location.href='/board/1/?page=1'	// 페이지 이동시 params로 게시판 구분, query로 페이지 구분
    },
    movetoboard2(){
      window.location.href='/board/2/?page=1'
    },
    movetoboard3(){
      window.location.href='/board/3/?page=1'
    },

    movetocontent(boardnum, id) {	// 검색된 게시글 클릭시 해당 게시글로 이동
      window.location.href = 'http://127.0.0.1:8080/board/' + boardnum + '/content?id=' + id
    },
    searchstart(){			// 검색버튼 눌렀을때 실행
      if(this.searchkeyword == '') {
        alert('키워드가 없습니다!');
      } else {
        axios({
          url: "http://127.0.0.1:52273/content/search/",
          method: "POST",
          data: {		// 선택된 검색옵션과 검색키워드 넘겨줌
            searchoption: this.searchoptionselected,
            searchkeyword: this.searchkeyword,
          },
        }).then(res => {
          this.contentlist = res.data;
          this.searchcnt = this.contentlist[Object.keys(this.contentlist).length-1].cnt;
          this.contentlist.pop();
          alert('검색완료!');
          this.searchfinish = true;
          this.searchkeyword = '';
        }).catch(err => {
          alert(err);
        });
      }
    }
  },
};
</script>