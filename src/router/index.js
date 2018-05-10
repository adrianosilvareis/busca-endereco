import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import VueTheMask from 'vue-the-mask'

Vue.use(Router)
Vue.use(VueTheMask)

export default new Router({
  routes: [
    {
      path: '/endereco',
      name: 'cad',
      component: HelloWorld
    },
    {
      path: '/endereco/:end',
      name: 'edit',
      component: HelloWorld
    }
  ]
})
