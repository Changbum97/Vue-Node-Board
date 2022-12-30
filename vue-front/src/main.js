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
      path:'/',				// 메인 페이지
      component: MainPage,
    }, {
      path: '/board/:id',			// 게시판 1,2,3 구분
      component: BoardPage,
    }, {
      path: '/board/:id/write',		// 글 작성 페이지
      component: WritePage,
    }, {
      path: '/board/:id/content',		// 글 내용 보는 페이지
      component: ContentPage,
    }
  ]
});

new Vue({
  vuetify,
  render: h => h(App),
  router,
}).$mount('#app')