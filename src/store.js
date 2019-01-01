
import Vue from 'vue'
import Vuex from 'vuex'
 
 
Vue.use(Vuex)
 
export default new Vuex.Store({
    state:{
        token:'',
        headerName:'返回首页',
        organizationList:[]
        },
        mutations:{
            //存token到localstorage里面
            set_token(state, token) {
                state.token = token
                localStorage.token = token
            },
            //从localstorage里面删除token
            del_token(state) {
                state.token = ''
                localStorage.removeItem('token')
            },
            //公用头部的名字
            headerName(state,name){
                state.headerName = name
            },
            //360问卷权重列表
            organizationList(state,list){
                state.organizationList = list
            }
    }
})
