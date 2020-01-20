import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    meta: {
      title: "五四互娱"
    },
    component: () => import('../views/home')
  },
  {
    path:'/excellent',
    name:'excellent',
    meta:{
      title:'全场最优秀着装',
      auth :true
    },
    component:()=> import('../views/excellent')
  },
  {
    path:'/special',
    name:'special',
    meta:{
      title:'全场最个性着装',
      auth :true
    },
    component:()=> import('../views/special')
  },
  {
    path:'/login',
    name:'login',
    meta:{
      title:'登录'
    },
    component:()=>import('../views/login')
  },
  {
    path:'/selection',
    name:'selection',
    meta:{
      auth :true
    },
    component:()=>import('../views/selection')
  },
  {
    path:'/result',
    name:'result',
    meta:{
      auth :true
    },
    component:()=>import('../views/result')
  }
];


const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to,from,next) => {
  let uId = localStorage.getItem('uId');
  if(to.matched.some( m => m.meta.auth)){
    if(uId) {
      next()
    }else{
      next({path:'/login',query:{ redirect: to.fullPath} });
    }
  }else{
      next()
  }
});

export default router;
