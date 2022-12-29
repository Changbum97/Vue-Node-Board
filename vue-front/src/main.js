import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'

Vue.config.productionTip = false
Vue.use(VueRouter);

import MainPage from './pages/Main.vue'
import BoardPage from './pages/Board.vue'
import WritePage from './pages/Write.vue'
import ContentPage from './pages/Content.vue'

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      // 메인 페이지
      path:'/',
      component: MainPage,
    }, {
      // 게시판 1,2,3 구분
      path: '/board/:boardId',
      component: BoardPage,
    }, {
      // 글 작성 페이지
      path: '/board/:id/write',
      component: WritePage,
    }, {
      // 글 내용 보는 페이지
      path: '/board/:id/content',
      component: ContentPage,
    }
  ]
});

new Vue({
  vuetify,
  render: h => h(App),
  router,
}).$mount('#app')