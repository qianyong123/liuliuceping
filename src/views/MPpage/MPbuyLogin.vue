<template>

        <div class="mp-login">
            <div class="mp-form">       
               
                <el-input style="width:100%;" type="password" v-model="password" placeholder="请输入密码"></el-input>
                <div class="mp-cuowu">{{msg}}</div>              
                <el-button type="primary" @click="onsubmit" style="width:100%;">登录</el-button>
               
            </div>
        </div>  
</template>

<script>
import { requestLogin,clietLogin } from "@/axios/api.js"
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
                    pass=/^\w{4,6}$/,             
                    username=this.username,
                    password=this.password;
                if(pass.test(password)){
                    this.msg='';
                    clietLogin({
                        password,
                        paperId:this.paperId
                    }).then(res=>{
                        console.log('客户登录',res)
                        if(res.status=='200'&&res.data.success==true){                                               
                        this.$router.push({
                            name:'MPfirmDajuan',
                            params:{
                                paperId:this.paperId,
                                userId:res.data.data
                            }
                        })
                    } else{
                        this.msg=res.data.message
                    }                 
                })     
            }              
                else if(!pass.test(password)||password==''){
                    this.msg='请输入2~6位密码!';
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
        justify-content: center;
        align-items: center;
        padding:0 0.3rem;
       .mp-form{
            width: 100%;
       }
      
    }
    .mp-cuowu{
        color: #d81e06;
        font-size: 12px;
        text-align: left;   
        margin: 15px 0;           
    }

</style>