import Vue from 'vue'
import Router from 'vue-router'
function loadView(level, component) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/${level}/${component}.vue`)
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      components:{
		  default:loadView('views','header'),
		  main:loadView('views','main'),
		  sidebar:loadView('views','sidebar')
	  }
    },
  ]
})
