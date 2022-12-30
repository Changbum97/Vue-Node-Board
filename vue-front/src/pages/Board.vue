<template>
  <v-app>
    <v-app-bar app color="red" dark>
      <v-spacer></v-spacer>
      <v-app-bar-title>
        <div align="center" :style="{fontSize:'xx-large'} ">게시판 {{$route.params.id}}</div>
        <!-- params를 받아올 때는 $route.params.id,
        		query를 받아올 때는 $route.query.id 이런 형식으로 받아옴 -->
      </v-app-bar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" md="4"></v-col>
          <v-col cols="12" md="2">
            <v-btn color="cyan" @click="movetomain"
                   :style="{height:'50px', width:'170px', fontWeight:'bold', fontSize:'large'}">홈으로</v-btn>
          </v-col>
          <v-col cols="12" md="2">
            <v-btn color="pink accent-1" @click="movetowrite"
                   :style="{height:'50px', width:'170px', fontWeight:'bold', fontSize:'large'}">글작성</v-btn>
          </v-col>
          <v-col cols="12" md="2"></v-col>
          <v-col cols="12" md="2">
            <div :style="{fontSize:'x-large', marginTop: '7px'}">글갯수 : {{cnt}}개</div>
            <!-- 현재 게시판 총 글갯수 = cnt -->
          </v-col>
        </v-row>
        <v-row>
          <v-simple-table style="width: 100%;">
            <thead>
            <tr style="font-weight: bolder;">
              <td style="width:20%; font-size: x-large;">작성자</td>
              <td style="width:50%; font-size: x-large;">제목</td>
              <td style="width:30%; font-size: x-large;">작성일</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in contentlist" :key="item.id" @click="movetocontent(item.id)">
              <td>{{item.writer}}</td>
              <td>{{item.title}}</td>
              <td>{{item.createdAt.split('T')[0]}}</td>
              <!-- Sequelize의 createdAt, updatedAt의 날짜 형식이 '2021-12-10T12:38:52.000Z' 이런 식이여서
                       split('T')[0]을 통해 날짜만 표시 -->
            </tr>
            </tbody>
          </v-simple-table>
        </v-row>
        <v-row style="padding-top: 20px;">
          <v-spacer/>
          <v-btn width="10px" @click="movetopreviouspage">  	<!-- 이전페이지로 이동 -->
            <v-icon color="red" large> mdi-arrow-left-bold-outline </v-icon>
          </v-btn>
          <div style="margin-top: 5px; margin-right: 10px; margin-left: 10px;">
            {{$route.query.page}}/{{totalpage}} page</div>
          <!-- 위와 같이 해줌으로서 '현재페이지/총페이지 page' 식으로 나타냄 -->
          <v-btn width="10px" @click="movetonextpage">  	<!-- 다음페이지로 이동 -->
            <v-icon color="red" large> mdi-arrow-right-bold-outline </v-icon>
          </v-btn>
          <v-spacer/>
        </v-row>
      </v-container>

    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios'		// backend와 axios 통신을 위해 필요

export default {
  data(){
    return {
      contentlist: [],			// 현재 게시판과 페이지에 맞는 글 리스트들
      cnt: 0,				// 현재 게시판의 총 글 개수
    }
  },
  computed: {			// computed는 계산 목적으로 사용된다고 보면 됨
    totalpage(){
      if(this.cnt == 0) {		// 현재 게시판 글 갯수가 0개일때 총 페이지가 0이 되는거 방지
        return 1;
      }else {
        return Math.ceil(this.cnt/10);	// (글 갯수/10)한 후 올림 연산을 통해 총 페이지 계산
      }
    }
  },
  mounted() {			// mounted는 페이지가 켜질때 실행됨, 페이지가 켜질때 글 리스트들을 db에서 불러옴
    axios({				// 게시글 작성자, 제목, 작성일 가져오기
      url: "http://127.0.0.1:52273/content/boardlist/",
      method: "POST",
      data: {				// back서버에 현재 게시판번호와 페이지번호를 넘겨줘야 해당하는 글 리스트 불러올 수 있음
        boardnum: this.$route.params.id,
        page: this.$route.query.page,
      },
    }).then(res => {
      this.contentlist = res.data;
    }).catch(err => {
      alert(err);
    });
    axios({				// 현재 게시판 글 개수 가져오기
      url: "http://127.0.0.1:52273/content/boardlistcnt/",
      method: "POST",
      data: {
        boardnum: this.$route.params.id,
      },
    }).then(res => {
      this.cnt = res.data;
    }).catch(err => {
      alert(err);
    });
  },

  methods: {
    movetomain() {
      window.location.href="/"
    },
    movetowrite() {
      window.location.href = window.location.pathname + 'write'
      // window.location.pathname이 현재 주소를 의미
      // 여기다 write를 붙여주면 글 작성 페이지로 라우팅 되게 됨
    },
    movetocontent(id) {		// 클릭된 글의 id를 받아와야 라우팅할때 보낼 수 있음
      window.location.href = window.location.pathname + 'content?id=' + id
    },
    movetopreviouspage(){
      if(this.$route.query.page == 1) {
        alert('첫번째 페이지입니다!');
      } else {
        var pp = parseInt(this.$route.query.page) - 1;
        window.location.href = window.location.pathname + '?page=' + pp
      }
    },
    movetonextpage(){
      if(this.$route.query.page == Math.ceil(this.cnt/10)) {
        alert('마지막 페이지입니다!');
      } else{
        var pp = parseInt(this.$route.query.page) + 1;
        window.location.href = window.location.pathname + '?page=' + pp
      }
    },
  },
};
</script>

<style scoped>
.tr,td {
  border: 1px solid;
  text-align: center;
}
</style>