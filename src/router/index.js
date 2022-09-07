import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store"
Vue.use(VueRouter)
console.log(store);
export const IndexRoutes=[
  {
    meta: {
      title: "菜单管理"
    },
    path: "menu",
    component: () => import("../pages/menu/menu.vue"),
   
  },
  {
    meta: {
      title: "角色管理"
    },
    path: "role",
    component: () => import("../pages/role/role.vue")
   
  },
  {
    meta: {
      title: "管理员管理"
    },
    path: "manage",
    component: () => import("../pages/manage/manage.vue")
    ,
   
  }, {
    meta: {
      title: "商品分类"
    },
    path: "cate",
    component: () => import("../pages/cate/cate.vue")
    ,
 
  },
  {
    meta: {
      title: "商品规格"
    },
    path: "specs",
    component: () => import("../pages/specs/specs.vue")
    ,
   
  },
  {
    meta: {
      title: "商品管理"
    },
    path: "goods",
    component: () => import("../pages/goods/goods.vue")
    ,
   
  },
  {
    meta: {
      title: "轮播图管理"
    },
    path: "banner",
    component: () => import("../pages/banner/banner.vue")
  
  }, {
    meta: {
      title: "会员管理"
    },
    path: "vip",
    component: () => import("../pages/vip/vip.vue")
    ,
  
  },
  {
    meta: {
      title: "秒杀活动"
    },
    path: "seckill",
    component: () => import("../pages/seckill/seckill.vue")
    ,
   
  }
]
//循环IndexRoutes,给每一项添加beforeEnter
IndexRoutes.forEach(item=>{
  item.beforeEnter=(to,from,next)=>{
    // 如果userInfo.menus_url 中包含了 '/menu',就next(),否则next('/')
    // let userInfo=store.getters.userInfo;
    let {getters:{userInfo}}=store
    if(userInfo.menus_url.includes("/"+item.path)){
      next()
    }else{
      next("/")
    }
  }
})

const routes = [{
    path: "/login",
    component: () => import("../pages/login/login.vue")
  },
  {
    path: "/",
    component: () => import("../pages/index/index.vue"),
    children: [{
        path: "",
        component: () => import("../pages/home/home.vue")
      },
      ...IndexRoutes
    ]
  },
]

const router = new VueRouter({
  routes
})


//全局前置守卫
router.beforeEach((to,from,next)=>{
  //如果要去登录或者注册  则可以进入
  console.log("全局前置守卫");

  if(to.path==="/login"){
    next()
    return;
  }
  //不是登录 判断是不是登录了
  let is=sessionStorage.getItem("userInfo")
  if(is){
    next()
    return
  }
  next("/login")

})
export default router