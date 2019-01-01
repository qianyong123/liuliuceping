<template>
    <div class="resetPassword">
        <div class="resetPassword-main">
            <h2 class="resetPassword-main_top">重置密码</h2>
            <div style="padding:50px 100px;">
                <el-steps :active="active" finish-status="success">
                    <el-step title="手机验证"></el-step>
                    <el-step title="重置密码"></el-step>
                    <el-step title="重置成功"></el-step>
                </el-steps>
                <div style="padding:30px 80px">
                    <div v-if="isusername">
                        <el-input
                            placeholder="手机号码"
                            v-model="username"
                            clearable>
                        </el-input>   
                        <div style=" display:flex;margin-top:30px;">
                            <el-input
                                placeholder="短信验证码"
                                v-model="note"
                                clearable>
                            </el-input>
                            <el-button v-if="code" @click="getCodes"  type="primary">获取验证码</el-button>
                            <el-button v-else>{{times}}秒再次获取</el-button>
                        </div>
                    </div>  
                    <div v-if="ispassword">
                        <h4 style="margin-bottom:20px;color:#2f3640;">新密码</h4>
                        <el-input
                            placeholder="8~20位字母或数字"
                            v-model="password"
                            type='password'
                            clearable>
                        </el-input> 
                        <h4 style="margin:20px 0;color:#2f3640;">确认密码</h4>
                        <el-input
                            placeholder="确认密码"
                            v-model="password2"
                             type='password'
                            clearable>
                        </el-input> 
                    </div> 
                    <p v-if="iscuowu" class="resetPassword-cuowu"><i class="el-icon-warning" style="font-size:16px;margin-right:5px;"></i>{{msg}}</p>
                    <p v-else class="resetPassword-cuowu"></p>
                    <div class="succeed" v-if="issucceed">
                        <i style="color:#67c23a;font-size:30px;" class="el-icon-success"></i>
                         <p style="padding-top:20px;">重置密码成功,请记住您的新密码!</p>  
                    </div>                               
                    <el-button v-if="isbtn" style="width:100%;height: 48px;" type="primary" @click="next">{{text}}</el-button>
                    <el-button v-if="isbtn2" style="width:100%;height: 48px;" type="primary" @click="next2">{{text}}</el-button>
                    <el-button v-if="islogin" @click="returnLogin" class="return-login">返回登录</el-button>
                </div>
            </div>          
        </div>
    </div>
</template>

<script>
import { SendCode,PasswordReset} from '@/axios/api.js'
    export default {
        name:'ResetPassword',
        data(){
            return{
                active:1,
                msg:'',
                username:'',
                password:'',
                password2:'',
                note:'',
                text:'下一步',
                times:60,
                code:true,
                islogin:true,
                isbtn:true,
                isbtn2:false,
                isusername:true,
                ispassword:false,
                issucceed:false,
                iscuowu:false
            }
        },
        methods:{
            //点击下一步
             next() { 
                let name=/^1[3456789]\d{9}$/,              
                    username=this.username;
                 if(name.test(username)){
                     
                    this.active++            
                    this.text='重置密码'
                    this.islogin=false
                    this.isusername=false
                    this.ispassword=true
                    this.isbtn=false
                    this.isbtn2=true
                    this.msg=''
                    this.iscuowu=false
                 } 
                 else if(!name.test(username)){
                     this.msg='请输入正确的手机号码'
                     this.iscuowu=true                  
                 }            
               
            },
            //点击重置密码
            next2(){
                   
                let pass=/^\w{8,20}$/,                             
                    password=this.password,
                    password2=this.password2;
               if(pass.test(password)&&password==password2){
                   PasswordReset({
                         code:this.note,
                         username:this.username,
                         password:this.password
                     }).then(res=>{
                         console.log(res)
                     })
                    this.active++
                    this.isbtn=false
                    this.ispassword=false
                    this.isbtn2=false
                    this.islogin=true 
                    this.issucceed=true
                    this.msg=''
                    this.iscuowu=false
               }
               else if(!pass.test(password)){
                   this.msg='请输入8~20位新密码，字母或数字'
                    this.iscuowu=true
               }
               else if(!password==password2){
                   this.msg='两次密码输入不一致'
                    this.iscuowu=true
               }
            },
             returnLogin(){
                this.$router.push('/login')
            },
            //获取验证码
             getCodes(){
                 let name=/^1[3456789]\d{9}$/;
                 if(!name.test(this.username)){
                    this.msg='请输入正确的手机号码'
                    this.iscuowu=true
                 }else{
                     SendCode({
                         username:this.username,
                         type:'PasswordReset'
                     }).then(res=>{
                         console.log(res)
                     })
                    this.code=false
                    this.iscuowu=false
                    this.times=60
                    let clearTime=setInterval(()=>{
                        this.times--
                        if(this.times==0){
                            this.code=true
                            clearInterval(clearTime)
                        }
                    },1000)
                 }
            }
        }
    }
</script>

<style lang="scss">
    .resetPassword{
        width: 100%;
        height: 100%;
        background: #F5F7FA;
        display: flex;
        justify-content: center;
        align-items: center;
        .resetPassword-main{
            width: 800px;
            height: 600px;   
            background: #fff;
            border-radius: 4px;
            input{
                height: 48px;
                line-height: 48px;
            }
            .resetPassword-main_top{
                height: 80px;
                line-height: 80px;
                text-align: center;
                color:#2f3640;
                border-bottom: 1px solid #ccc;
            }
             .resetPassword-cuowu{
                margin: 0;
                padding: 0;
                color: #f00;
                font-size: 12px;
                height: 50px;
                line-height: 50px;
                text-align: left;
            }
            .succeed{
                margin-bottom: 40px;
                width:100%;
                font-size:18px;
                text-align: center;
            }
            .return-login{
                margin:20px 0 !important;
                width: 100%;
                height: 48px;
            }
        }
       
    }
</style>
