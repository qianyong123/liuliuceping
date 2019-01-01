import axios from "axios"
import store from '@/store.js'
import router from '@/router'


/****** 创建axios实例 ******/
const service = axios.create({
    baseURL:` http://wj.gst70.cn/api`, //api的base_url
    //  timeout:5000 , // 请求超时时间
})

// 添加请求拦截器
service.interceptors.request.use(config => {
   
    //判断是否存在token，如果存在将每个页面header都添加token
    // let token=store.state.token;
    let token=localStorage.getItem('token')
    if(token){
      config.headers.common['Authorization']=`${token}`
      
    }
     
    return config;
    }, error => {
    // 对请求错误做些什么
    return Promise.reject(error);
    });
     
    // http response 拦截器
    
    service.interceptors.response.use(
      response => {     
        return response;
      },
      error => {
      if (error.response) {
      switch (error.response.status) {
          case 401:
            store.commit('del_token');
            router.replace({
            path: '/login',
            query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
            });
            break;
          case 400:
            alert('请求错误(400)');
            break;
          case 403:
            alert('拒绝访问(403)') ;
            break;
          case 404:
            alert('没有找到你访问的路径(404)') ;
            break;
          case 408:
            alert('请求超时(408)') ;
            break;
          case 500:
            alert('内部服务器错误(500)') ;
            break;
          case 501:
            alert('501服务未实现') ;
            break;
          case 502:
            alert('502网络错误') ;
            break;
          case 503:
            alert('服务不可用(503)') ;
            break;
          case 504:
            alert('网络超时(504)');
            break;
          case 505:
            alert('HTTP版本不受支持(505)');
            break;
        }
      }
      return Promise.reject(error.response.data)
    
  })

  export default service;