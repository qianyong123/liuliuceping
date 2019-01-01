import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'


import store from '@/store.js'
import Home from '@/views/Home/Home';//主页
import Login from '@/views/Login';//登录
import NotFound from '@/components/NotFound';//404页面
import Register from '@/views/Register';//注册
import ResetPassword from '@/views/ResetPassword';//修改密码


// 导航路由
const Overview=()=>import('@/views/Overview/Overview')//我的问卷
const Bank=()=>import('@/views/Bank/Bank')//问卷模板
const Sets=()=>import('@/views/Set/Set')//功能扩展
const Help=()=>import('@/views/Help/Help')//帮助中心


const News=()=>import('@/views/News/News')//新建
const Analyze=()=>import('@/views/Analyze/Analyze')//分析
const questioninerType=()=>import('@/views/News/questioninerType')//问卷类型
const preview=()=>import('@/views/Preview/preview')//预览


//账号管理及设置
const UserData=()=>import('@/views/user/UserData')//基本资料
const Integral=()=>import('@/views/user/Integral')//积分

//公司
const Firm=()=>import('@/views/Company/Firm')//公司组织架构
const Organization=()=>import('@/views/Company/Organization')//公司组织架构


//手机端
const MPdajuans=()=>import('@/views/MPpage/MPdajuan');//答卷
const MPlogin=()=>import('@/views/MPpage/MPlogin');//登录
const MPuserinfo=()=>import('@/views/MPpage/MPuserinfo');//填写用户信息
const MPresult=()=>import('@/views/MPpage/MPresult');//返回答卷结果
const MPfirmDajuan=()=>import('@/views/MPpage/MPfirmDajuan');//返回答卷结果
const MPbuyLogin=()=>import('@/views/MPpage/MPbuyLogin');//客户登录


Vue.use(Router)

 const router= new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      meta: {
        title: '',
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      redirect:'/home',  
      component: Home,
      children:[
        {path: 'home',name: 'home',component: Overview,props:true},
        {path: 'UserData',name: 'UserData',component: UserData,props:true},
        {path: 'firm',name: 'firm',component: Firm,props:true},
        {path: '/preview',name: 'preview',component: preview,props:true},
        {path: 'bank',name: 'bank',component: Bank,props:true},
        {path: 'set',name: 'set',component: Sets,props:true},
        {path: 'help',name: 'help',component: Help,props:true},
        {path: 'Integral',name: 'Integral',component: Integral,props:true},
      ]
    },
    //统计
    {path: '/analyze',name: 'analyze',component: Analyze,props:true},

    //问卷类型
    {path: '/questioninerType',name: 'questioninerType',component: questioninerType,props:true},

    //预览
    // {path: '/preview',name: 'preview',component: preview,props:true},

    //公司组织架构
    {path: '/Organization',name: 'Organization',component: Organization,props:true},

    {
      path:"",
      redirect:'/home',    
    },
    //新建
    {
      path:"/news",
      name: 'news',     
      component: News,    
    },
    //登录
    {
      path:"/login",
      name: 'Login',     
      component: Login,
      props:true
    },
    //注册
    {
      path:"/Register",
      name: 'Register',     
      component: Register,
      props:true
    },
    //重置密码
    {
      path:"/ResetPassword",
      name: 'ResetPassword',     
      component: ResetPassword,
      props:true
    },

    
    //手机端
    {
      path:"/m/MPdajuan/:id/:userId",
      name: 'MPdajuan',     
      component: MPdajuans,
      props:true
    },
    // 360答卷
    {
      path:"/m/MPfirmDajuan",
      name: 'MPfirmDajuan',     
      component: MPfirmDajuan,
      props:true
    },
    {
      path:"/m/MPlogin/:paperId",
      name: 'MPlogin',     
      component: MPlogin,
      props:true
    },
    {
      path:"/m/MPbuyLogin/:paperId",
      name: 'MPbuyLogin',     
      component: MPbuyLogin,
      props:true
    },
    {
      path:"/m/MPuserinfo/:id",
      name: 'MPuserinfo',     
      component: MPuserinfo,
      props:true
    },
    {
      path:"/m/MPresult",
      name: 'MPresult',     
      component: MPresult,
      props:true
    },

    {
      path:"/404",
      component:NotFound
    },
    {
      path:"*",
      redirect:"/404"
    },
    {
      path:"",
      redirect:"/"
    },
  ]
})


// 页面刷新时，重新赋值token
if (localStorage.getItem('token')) {
    store.commit('set_token', localStorage.getItem('token'))
  }
  
router.beforeEach((to, from, next) => {
  let token=localStorage.getItem('token');
  if (to.matched.some(record => record.meta.requireAuth)){  // 判断该路由是否需要登录权限
    if (token) { 
      next();
      // if(to.matched[1].name=='news'){
      //   sessionStorage.setItem('bagId',2)
      // } 
    }
    else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    next();
  }
});




export default router
