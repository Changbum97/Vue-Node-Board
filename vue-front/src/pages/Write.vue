<template>
  <v-app>
    <v-app-bar app color="red" dark>
      <v-spacer></v-spacer>
      <v-app-bar-title>
        <div align="center" :style="{fontSize:'xx-large'} ">게시판 {{$route.params.id}} 글쓰기</div>
      </v-app-bar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" md="1">
            <v-btn color="cyan" @click="movetomain"
                   :style="{height:'50px', width:'90px', fontWeight:'bold', fontSize:'large'}">홈으로</v-btn>
          </v-col>
          <v-col cols="12" md="10">
            <v-card>
              <v-form ref="form" @submit.prevent="onSubmitForm">
                <v-text-field v-model="writer" dense outlined label="작성자" style="width: 300px; margin-left: 100px; padding-top: 20px;"
                              :rules="[v => !!v || '작성자는 필수입니다.']"></v-text-field>
                <!-- rules를 통해 작성자와 제목을 안 쓰면 제출 못하게끔 함 -->
                <v-text-field v-model="title" dense outlined label="제목" style="width: 500px; margin-left: 100px;"
                              :rules="[v => !!v || '제목은 필수입니다.']"></v-text-field>
                <v-textarea v-model="text" label="내용" outlined rows="13" style="width: 730px; margin-left: 100px;"></v-textarea>
                <v-btn width="100px" style="margin-left: 600px; margin-bottom:30px;" @click="moveback">취소</v-btn>
                <v-btn width="100px" style="margin-left: 30px; margin-bottom:30px;" type="submit">제출</v-btn>
              </v-form>
            </v-card>
          </v-col>
          <v-col cols="12" md="1"/>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios'

export default {
  data(){
    return {
      writer: '',
      title: '',
      text: '',
    }
  },
  methods: {
    onSubmitForm(){
      if(this.$refs.form.validate()) {		// 위에 써준 rules를 만족하면 실행
        axios({
          url: "http://127.0.0.1:52273/content/write/",
          method: "POST",
          data: {
            boardnum: this.$route.params.id,
            writer: this.writer,
            title: this.title,
            text: this.text,
          },
        }).then(res => {
          alert(res.data.message);
          window.history.back();
        }).catch(err => {
          alert(err);
        });
      }
    },
    moveback() {
      window.history.back();
    },
    movetomain() {
      window.location.href='/';
    },
  },
};

</script>