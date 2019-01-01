<template>
    <div style="height: 100%;width: 100%;">
        <div class="login">
            <div class="login-header">
                    <img  src="/static/img/u57.png" alt="logo">
                    <div style="margin-left:20px;">问卷测评</div>
            </div>
            <div class="form"> 
                <p class="login-top">用户登录</p>
                <div style="padding:0 30px;">
                    <el-form>
                        <el-form-item>
                            <el-input v-model="username" placeholder="请输入用户名"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input type="password" v-model="password" placeholder="请输入密码"></el-input>
                        </el-form-item>          
                    </el-form>              
                    <p v-if="iscuowu" class="login-cuowu"><i class="el-icon-warning" style="font-size:14px;margin-right:5px;"></i>{{msg}}</p>
                    <p v-else class="login-cuowu"></p>
                    <!-- <p v-else class="cuowu"></p> -->
                    <el-button type="primary" @click="onsubmit" style="width:100%;">登录</el-button> 
                    <div class="form-handle">
                        <router-link to='/Register'>注册账号</router-link>
                        <router-link to='/ResetPassword'>忘记密码？</router-link>
                    </div>
                
                </div>                          
            </div> 
            <div class="login-footer">
                <div class="login-footer_main">
                    <p class="p1">
                        <span>问题反馈</span>
                        <span style="margin:0 15px;">联系我们</span>
                        <span>帮助中心</span>
                    </p>
                    <p style="color:rgb(204, 204, 204);">©2017 Gst70.com  四川正汇通企业管理有限公司  版权所有  蜀ICP备13007859号-3</p>
                </div>
            </div>            
        </div> 
    </div>      
</template>

<script>
import { setCookie } from '@/js/util.js'
// import { requestLogin } from '@/api/api.js'
import store from '@/store.js'
import { requestLogin } from '@/axios/api.js'
import service from '@/axios/request.js'

    export default {
        name:"Login",
        data(){
            return{               
                username: '',
                password: '',   
                msg:'' ,
                iscuowu:false        
            }
        },
        methods:{
            onsubmit(){
                let name=/^1[3456789]\d{9}$/,
                    pass=/^\w{8,20}$/,             
                    username=this.username,
                    password=this.password;
                if(name.test(username)&&pass.test(password)){
                    this.msg='';
                    this.iscuowu=false
                    requestLogin({
                        username:this.username,
                        password:this.password
                    }).then(res=>{
                        console.log(res)
                    if(res.status=='200'){
                        if(res.data.success==true){
                           store.commit('set_token',res.data.sid);
                           localStorage.setItem('username',this.username)
                            this.$router.push('/')
                        }else{
                             this.msg=res.data.message;
                             this.iscuowu=true
                        }
                        
                    }                   
                })     
            } 
                if(!name.test(username)||username==''){
                    this.msg='用户名请输入11位的手机号码';
                    this.iscuowu=true
                } 
                else if(!pass.test(password)||password==''){
                    this.msg='密码请输入8~20位字母或数字';
                    this.iscuowu=true
                }                                         
            }
        },
        created() {                 
        },
    }
</script>

<style lang="scss">
    .login{
        height: 100%;
        width: 100%;
        background:url('/static/img/login2.jpg') no-repeat center center;
        background-size:100%;
       display:flex;
       flex-direction: column;
       align-items:flex-end;
       justify-content:space-between;
    }
    .login-header{
        height: 60px;
        width: 100%;
        background: #fff;
        display:flex;
        align-items: center;
        padding: 0 20px;
    }
    .login-footer{
        height: 150px;
        width:100%;
        background: #fff;
        z-index:100;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        .p1{
            text-align: center;
            margin-bottom: 20px;
            color:rgb(22, 155, 213);
            cursor: pointer;
            span{
                &:hover{
                color: #f00;
                }
            }
            
        }
    }
  .form{
    width:350px;  
    min-height: 380px;
    background: #fff;
    text-align: center;
    border: 1px solid #ccc;
    margin-right:200px;
    .login-top{
            text-align: center;
            line-height: 60px;
            font-size:20px;
            border-bottom: 1px solid #ccc;
        }
    .el-form-item{
        margin: 0;
        margin-top: 20px;
    }
   input{
       height: 48px;
       line-height: 48px;

   }
   button{
       height: 48px;
   }
    .form-handle{
        font-size: 12px;
        width: 100%;
        display: flex;
        justify-content:space-between;
        margin-top: 30px;
        a{
            text-decoration: none;
            color:#09f;
        }
        a:hover{
            color: rgb(9, 143, 87);
        }
    }
    .login-cuowu{
        margin: 0;
        padding: 0;
        color: #f00;
        font-size: 12px;
        text-align: left;
        height: 40px;  
        line-height: 40px;     
    }
  }
</style>






