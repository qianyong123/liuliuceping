<template>

        <div class="mp-login">
            <div class="mp-form"> 
                <h3 style="color:#09f;">用户登录</h3>         
                
                    <el-input style="height:48px" v-model="username" placeholder="请输入用户名"></el-input>
               
                    <el-input style="height:48px;margin:10px 0;" type="password" v-model="password" placeholder="请输入密码"></el-input>
                          
                <div class="mp-cuowu">{{msg}}</div>
            
                <el-button type="primary" @click="onsubmit" style="width:100%;margin-top: 20px;">登录</el-button>
                <div class="mp-form-handle">
                    <router-link :to="`/m/MPbuyLogin/${paperId}`">客户登录</router-link>
                </div>
            </div>
        </div>  
</template>

<script>
import { requestLogin } from "@/axios/api.js"
    export default {
        data(){
            return{
                username:'',
                password:'',
                msg:'',
                paperId:''
            }
        },
        methods:{
           onsubmit(){
                   let name=/^1[3456789]\d{9}$/,
                    pass=/^\w{6,18}$/,             
                    username=this.username,
                    password=this.password;
                if(name.test(username)&&pass.test(password)){
                    this.msg='';
                    requestLogin({
                        username,
                        password
                    }).then(res=>{
                        console.log(res)
                    if(res.status=='200'&&res.data.success==true){                     
                    localStorage.setItem('token',res.data.sid)
                    let token=localStorage.getItem('token')
                    // alert(token)
                    this.$router.push({
                        name:'MPfirmDajuan',
                        params:{
                            paperId:this.paperId,
                            userId:''
                        }
                    })
                    }                   
                })     
            } 
                if(!name.test(username)||username==''){
                    this.msg='请输入11位的手机号码!';
                } 
                else if(!pass.test(password)||password==''){
                    this.msg='请输入6-18位密码!';
                }
           }
        },
        created() {
            this.paperId=this.$route.params.paperId
            console.log( '问卷id',this.paperId)
        //    let token= localStorage.getItem('token')
        //    if(token){
        //         this.$router.push({
        //             name:'MPfirmDajuan',
        //             params:{
        //                 paperId:this.paperId
        //             }
        //         })
        //    }
        },
        mounted() {
          
        },
    }
</script>

<style lang="scss" scoped>
    .mp-login{
        width: 100%;
        height: 100%;
        // background: rgb(242, 242, 242);
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding:0 0.2rem;
        .mp-form{
           margin-bottom: 100px;
        }
        h3{
            line-height: 80px;
            text-align: center;
        }
       .mp-form-handle{
        font-size: 14px;
        width: 100%;
        display: flex;
        justify-content:center;
        margin-top: 30px;
        a{
            text-decoration: none;
            color:#09f;
        }
        a:hover{
            color: rgb(9, 143, 87);
        }
    }
    }
    .mp-cuowu{
        color: #d81e06;
        font-size: 12px;
        text-align: left;              
    }

</style>