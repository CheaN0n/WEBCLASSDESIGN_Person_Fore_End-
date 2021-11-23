import Vue from 'vue'
import Router from 'vue-router'
// import Test from '../views/test.vue'
import homepage from '../views/stulogin.vue'
import tealogin from '../views/tealogin.vue'
import stuinfo from '../views/info.vue'
import selectclass from '../views/selectclass.vue'
import myselect from '../views/myselect.vue'
import stuhomepage from '../views/stuhomepage.vue'
import gradecheck from '../views/gradecheck.vue'
import enterclass from '../views/enterclass.vue'
import entergrade from '../views/entergrade.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: homepage
    },
    {
      path: '/tealogin',
      name: 'tealogin',
      component: tealogin
    },
    {
      path: '/stuinfo',
      name: 'info',
      component: stuinfo
    },
    {
      path: '/selectclass',
      name: 'selectclass',
      component: selectclass
    },
    {
      path: '/myselect',
      name: 'myselect',
      component: myselect
    },
    {
      path: '/stuhomepage',
      name: 'stuhomepage',
      component: stuhomepage
    },
    {
      path: '/gradecheck',
      name: 'gradecheck',
      component: gradecheck
    },
    {
      path: '/enterclass',
      name: 'enterclass',
      component: enterclass
    },
    {
      path: '/entergrade',
      name: 'entergrade',
      component: entergrade
    },
      ]
})
