import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'

  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  //注册一级路由
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue'),
    children: [
      //管理员注册
      {
        path: 'registeredadministrator',
        name: 'registeredadministrator',
        component: () => import('../components/registeredadministrator/registeredadministrator.vue'),
      },
      //商家注册
      {
        path: 'registeredbusinesses',
        name: 'registeredbusinesses',
        component: () => import('../components/registeredbusinesses/registeredbusinesses.vue'),
      },
    ]
  },
  {
    path: '/system',
    name: 'system',
    component: () => import('../views/System.vue'),
    
    children: [{
      // 店铺管理
      path: 'merchantstores',
      name: 'merchantstores',
      component: () => import('../views/merchant_Stores.vue')
    },
    //平台管理的门店管理
    {
      path: "PlatformManagedStore",
      name: "PlatformManagedStore",
      component: () => import("../components/PlatformManagedStore/PlatformManagedStore.vue")
    },

    // 商品管理
    {
      path: "commodity",
      name: "commodity",
      component: () => import("../views/commodity/Commodity.vue")
    },
      //权限生气
      {
        path:"jurisdiction",
        name:"jurisdiction",
        component: () => import('../components/jurisdiction/jurisdiction.vue'),
      },
      //管理员管理
         {
          path: 'administrator',
          name: 'administrator',
          component: () => import('../components/Administrator/Administrator.vue'),
        },
        //用户管理
        {
          path: 'usercontrol',
          name: 'usercontrol',
          component: () => import('../components/usercontrol/usercontrol.vue'),
          
        },
        //个人中心
        {
          path: 'persons',
          name: 'persons',
          component: () => import('../components/APPLICATION/APPLICATION.vue'),
          
        },
        // 店铺商品
        {
          path: 'shopscommdity/:id/:name',
          name: 'shopscommdity',
          component: () => import('../views/shops_commdity/shops_commdity.vue'),
        },

  ]

  },
]

const router = new VueRouter({
  routes
})

export default router
