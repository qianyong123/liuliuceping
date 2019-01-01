<template>
    <div class="register">
         <div class="register-main" v-if="isrequest">
             <h2 class="register-main_top">用户注册</h2>
             <div style="padding:40px 100px;">            
                 <el-input
                    placeholder="手机号码"
                    v-model="username"
                    clearable>
                 </el-input>   
                 <div style=" display:flex;margin:30px 0;">
                    <el-input
                        placeholder="短信验证码"
                        v-model="code"
                        clearable>
                    </el-input>
                    <el-button v-if="code2" @click="getCode"  type="primary">获取验证码</el-button>
                    <el-button v-else>{{times}}秒再次获取</el-button>
                 </div>
                <!-- <el-input
                    placeholder="姓名"
                    v-model="name"   
                    style="margin-bottom:30px;"             
                    clearable>
                </el-input> -->
                 <el-input
                    placeholder="登录密码 8~20位字母或数字"
                    v-model="password" 
                    type='password'                
                    clearable>
                 </el-input>
                 <div style="margin-top:30px;">
                    <el-checkbox v-model="checked"></el-checkbox>
                    <span style="font-size:12px;margin-left:5px;">我也阅读并同意《管事通使用协议》</span>
                 </div>
                 <p v-if="iscuowu" class="register-cuowu"><i class="el-icon-warning" style="font-size:16px;margin-right:5px;"></i>{{msg}}</p>
                 <p v-else class="register-cuowu"></p>
                 <el-button @click="onRegister" style="width:100%;" type="primary">注册</el-button>
                 <el-button @click="returnLogin" class="return-login">已有管事通账号，立即登录</el-button>                
             </div>
         </div>
         <div class="register-main" style="padding:0 50px;height:450px;" v-else>
             <h2 class="register-main_top" style="border:0;color:#48b868;">注册成功</h2>
             <div class="register-succeed">
                <p>尊敬的用户<span style="color:#09f;margin:0 5px;">{{name}}</span>,你好</p>
                <p style="text-indent:28px;">欢迎注册管事通账号，我们会为你提供后续的一系列服务!欢迎注册管事通账号，我们会为你提供后续的一系列服务!</p>
                <p style="text-align:right;">管事通团队</p>              
             </div>
             <p style="text-align:center;line-height: 30px;">{{second}}秒后将立即跳转到登录页面，或者你也可以直接立即前往</p>
             <p @click="returnLogin" style="text-align:center;line-height: 30px;color:#09f;cursor: pointer;">点击跳转到登录页面</p>
         </div>
    </div>
</template>

<script>
import { Register,SendCode,PasswordReset} from '@/axios/api.js'
    export default {
        name:'Register',
        data(){
            return {
                username:'',
                password:'',
                code:'',
                msg:'',
                name:'',
                times:60,
                second:20,
                second:200,
                code2:true,
                iscuowu:false,
                checked:false,
                isrequest:true
            }
        },
        methods:{
            //注册
            onRegister(){
                let username=this.username,
                    code=this.code,
                    password=this.password,
                    name=/^1[3456789]\d{9}$/,
                    names=/^[\w\u4e00-\u9fa5]{2,8}$/,
                    codes=/^\w{1,6}$/,
                    pass=/^\w{8,20}$/;
                    if(name.test(username)&&pass.test(password)&&this.checked&&codes.test(code)){
                        Register({
                            code,
                            username,
                            password
                        }).then(res=>{
                            console.log(res)
                            if(res.status==200&&res.data.success===true){
                                this.isrequest=false
                                this.iscuowu=false
                                let clearTime=setInterval(()=>{
                                    this.second--
                                    if(this.second==0){                              
                                        clearInterval(clearTime)
                                        this.$router.push('/login')
                                    }
                                },1000)
                            }else{
                                 this.msg=res.data.message
                            }
                        })
                      
                    }
                    else if(!name.test(username)||username==''){
                        this.msg='请输入正确的手机号码'
                        this.iscuowu=true
                    }                
                    else if(!pass.test(password)||password==''){
                        this.msg='请输入8~20位密码,字母或数字'
                         this.iscuowu=true
                    }
                    else if(!this.checked){
                        this.msg='你还没有阅读管事通使用协议'
                         this.iscuowu=true
                    }
                    else if(!codes.test(code)||code==''){
                        this.msg='验证码错误'
                         this.iscuowu=true
                    }
                    
                
            },
            //返回登录
            returnLogin(){
                this.$router.push('/login')
            },
            //获取验证码
             getCode(){
                 let name=/^1[3456789]\d{9}$/;
                 if(!name.test(this.username)){
                    this.msg='请输入正确的手机号码'
                    this.iscuowu=true
                 }else{
                    this.code2=false
                    this.times=60
                    this.iscuowu=false
                    let clearTime=setInterval(()=>{
                        this.times--
                        if(this.times==0){
                            this.code2=true
                            clearInterval(clearTime)
                        }
                    },1000)
                    SendCode({
                        username:this.username,
                        type:'Register'
                    }).then(res=>{
                        console.log(res)
                    })
                 }
            }
        }
    }
</script>

<style lang="scss">
    .register{
        width: 100%;
        height: 100%;
        background: #F5F7FA;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;       
        input{
            height: 48px;
            line-height: 48px;
        }   
        button{
            height: 48px;
        }  
        .register-main{
            width: 600px;
            height: 600px;
            background: #fff;
            border-radius: 4px;
            position: relative;
            .register-main_top{
                height: 80px;
                line-height: 80px;
                text-align: center;
                color:#2f3640;
                border-bottom: 1px solid #ccc;
            }
            .register-cuowu{
                margin: 0;
                padding: 0;
                color: #f00;
                font-size: 12px;
                height: 40px;
                line-height:40px;
                text-align: left;
            }
            .return-login{
            margin:20px 0 !important;
            width: 100%;
            
            }
        }
       .register-succeed{
           margin:30px 0 ;
           border: 1px solid #ccc;
           border-radius: 4px;
           padding: 30px;  
           p{
               line-height: 30px;
           }
       }
    }
</style>