<template>
    <div class="m-userinfo">
        <div style="padding:30px 0;">
            <h3 style="color:#09f;text-align: center;padding-bottom:20px;">{{paperTitle}}</h3>
            <p class="m-state" style="">{{paperComment}}</p> 
        </div>
        <div style="min-height:1rem;">
            <div
            v-for="(item,index) in collections"
            :key="index"
            style="margin-bottom:20px;display:flex;align-items: center;"
            >
                <h4>{{item}}</h4>
                <div v-if="item!='性别'" style="flex:1">
                    <el-input
                    :placeholder="'请输入'+item"
                    v-model="mainModel[index]"          
                    clearable>
                    </el-input>
                </div>
            
                <div v-else>
                    <el-radio v-model="mainModel[index]" label="1">男</el-radio>
                    <el-radio v-model="mainModel[index]" label="2">女</el-radio>
                </div>
            
            </div>
        </div>       
         <div v-show="iscuowu" class="mp-cuowu">{{msg}}</div>
         <el-button @click="onBtn" style="width:100%" type="primary">开始答卷</el-button>
    </div>
</template>

<script>
import { MPuserinfo,MPsaveinfo} from '@/axios/api'
    export default {
        data(){
            return {
                collections:['姓名','手机'],
                mainModel:[],             
                radio:'1',
                paperTitle:'这是标题',
                paperComment:'这是说明这是说明这是说明',
                msg:'',
                id:'trd',      
                mainModel2:[],
                paperId:'',
                iscuowu:false,

                name:'',//姓名
                gender:'',//性别
                phoneNumber:'',//手机
                postName:'',//岗位
                companyName:''//公司
            }
        },
        methods:{
            //点击开始答卷
            onBtn(){
                let number=/^1[3456789]\d{9}$/,
                    name=/^[\u4e00-\u9fa5]{1,5}$/,
                    text=/^[\w\u4e00-\u9fa5]{1,16}$/;
                this.mainModel2=[]

                // this.collections.forEach((data,index)=>{
                //        if(data=='手机'){
                //            if(number.test(this.mainModel[index])){
                //               this.mainModel2.push(1)
                //            }else{
                //               this.mainModel2.push(0)
                //            }                    
                //         }
                //    })
                // this.mainModel.forEach((data,index)=>{
                //     if(name.test(data)){
                //         this.mainModel2.push(1)
                       
                //     }else{
                //          this.mainModel2.push(0)
                //     }
                // }) 

                this.collections.forEach((data,index)=>{
                        if(data=='姓名'){
                            this.name=this.mainModel[index]
                             if(name.test(this.mainModel[index])){
                                    this.mainModel2.push(1)

                                }else{
                                    this.mainModel2.push(0)
                                     this.msg='请填写正确姓名!'  
                                }
                        }                     
                        else if(data=='手机'){
                            this.phoneNumber=this.mainModel[index]
                             if(number.test(this.mainModel[index])){
                                    this.mainModel2.push(1)
                                
                                }else{
                                    this.mainModel2.push(0)
                                     this.msg='请填写正确的手机号码!' 
                                }
                        }
                        else if(data=='性别'){
                            this.gender=this.mainModel[index]
                             if(text.test(this.mainModel[index])){
                                    this.mainModel2.push(1)
                                
                                }else{
                                    this.mainModel2.push(0)
                                     this.msg='请填写正确的信息!' 
                                }
                        }
                         else if(data=='职位'){
                            this.postName=this.mainModel[index]
                              if(text.test(this.mainModel[index])){
                                    this.mainModel2.push(1)
                                
                                }else{
                                    this.mainModel2.push(0)
                                     this.msg='请填写正确的信息!' 
                                }
                        }
                        else if(data=='公司'){
                            this.companyName=this.mainModel[index]
                              if(text.test(this.mainModel[index])){
                                    this.mainModel2.push(1)
                                
                                }else{
                                    this.mainModel2.push(0)
                                     this.msg='请填写正确的信息!' 
                                }
                        }
                    })
                if(this.mainModel2.indexOf(0)==-1){                  
                   
                    MPsaveinfo({
                        paperId:this.paperId,
                        name:this.name,
                        gender:this.gender,
                        phoneNumber:this.phoneNumber,
                        companyName:this.companyName,
                        postName:this.postName
                    }).then(res=>{
                        console.log(res)
                        if(res.status==200&&res.data.success===true){
                            if(res.data.data.userPaperState=='2'){
                                   this.$router.push(`/m/MPdajuan/${this.paperId}/${res.data.data.userId}`)
                            }else{
                                  this.$message.error('你已经提交过问卷了！');  
                            }
                            
                        }
                       
                    })
                } 
                else{
                     this.iscuowu=true                
                }        
            }
        },
        created() {
            let paperId=this.$route.params.id
            this.paperId=paperId          
            MPuserinfo({
                paperId
            }).then(res=>{
                console.log(res)
                if(res.status==200&&res.data.success===true){
                    if(res.data.data.collections.length>0){
                        let collections=res.data.data.collections.split(',')
                        collections.forEach(()=>{
                            this.mainModel.push('')
                        })
                        this.collections=collections
                        this.paperComment=res.data.data.paperComment
                        this.paperTitle=res.data.data.paperTitle
                        console.log(res.data.data.collections.length)
                    }else{
                        this.$router.push(`/m/MPdajuan/${this.paperId}/123`)
                        console.log('dajuan')
                    }
                   
                }
            })
        },
    }
</script>

<style lang="scss">
    .m-userinfo{
        padding:0 0.3rem;
        background: #fff;
        h4{
            color: #09f;
            // margin-bottom: 20px;   
            margin-right:0.1rem;   
        }
    }
     .mp-cuowu{
        color: #d81e06;
        font-size: 12px;
        text-align: left;    
        height: 40px;
        line-height: 40px;      
    }
    .m-state{
        border-bottom:1px dashed #ccc;
        padding-bottom:20px;
        font-size:14px;
        line-height: 25px;
        margin: 0;
    }
    .el-message--error,.el-message{
        width: 100%;
        padding: 0 30px;
        height: 40px;
        line-height: 40px;
        top: 0;
    } 
</style>