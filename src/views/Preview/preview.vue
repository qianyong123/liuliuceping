<template>
    <div>
        <!-- <new-nav></new-nav> -->
          <div v-loading="loading"  class="main-previwe">
                    <div class="main-top2">
                        <h3>{{ paperTitle}}</h3>
                        <p>{{paperComment}}</p>
                        <div class="main-top_border">

                        </div>
                        <div >
                             <el-button 
                              class="useTemplate"
                            v-if="bank=='1'"
                            @click="redactBank"                        
                            type="warning">使用模板</el-button> 
                        </div>
                    </div>
                                      
                    <ul v-if="paperType==1" class="main-content_box2">
                        <li 
                        v-for="(item,index) in question"
                        :key="index"
                        >
                            <!-- <div v-if="'创建所属维度'==item.type">
                                     <h2>{{item.title}}</h2>                              
                            </div> -->
                            <div>                          
                                <p v-if="item.questionRequired==1">{{index+1}}、{{item.questionTitle}}&nbsp;(必答)</p>
                                <p v-else>{{index+1}}、{{item.questionTitle}}</p>                                
                                <p style="padding-left:24px;">{{item.questionComment}}</p>
                            </div>
                            
                            <div class="news-text" style="padding-left:24px;">
                                <div v-if="'3'==item.questionType" style="margin-bottom:10px;">
                                     <div>
                                           <el-input
                                            type="textarea"
                                            autosize
                                            placeholder="请输入内容"
                                            v-model="textarea2[index]">
                                            </el-input>
                                    </div>                                
                                </div>                                                                                             
                                <div v-else>
                                    <el-radio-group v-model="radio2[index]" v-if="'1'==item.questionType">
                                        <div 
                                            v-for="(radi,index2) in item.option"
                                            :key="index2"                                                                           
                                        >
                                            <div style="margin-bottom:10px; display: flex;align-items: center;" v-if="'2'==radi.optionType">
                                                <el-radio :label="index2">{{radi.optionName}}</el-radio>
                                                <el-input style="margin-left:10px;width:300px;" placeholder="请输入内容" clearable></el-input>
                                            </div>
                                            <el-radio v-else  :label="index2">{{radi.optionName}}</el-radio>                                      
                                        </div>                                                                     
                                    </el-radio-group>

                                    <el-checkbox-group v-else v-model="checkedCities[index]">
                                        <div
                                        v-for="(checked,chindex) in item.option"
                                        :key="chindex"                                  
                                        >
                                            <div style="margin-bottom:10px; display: flex;align-items: center;" v-if="'2'==checked.optionType">
                                                <el-checkbox  :label="chindex">{{checked.optionName}}</el-checkbox>
                                                <el-input style="margin-left:10px;width:300px;"  placeholder="请输入内容" clearable></el-input>
                                            </div>
                                            <el-checkbox v-else  :label="chindex">{{checked.optionName}}</el-checkbox>
                                        </div>                                  
                                    </el-checkbox-group>
                                </div>
                               
                            </div>
                        </li>
                    </ul>
                    <company-paper 
                    v-else-if="paperType=='2'" 
                    :groupQuestion='groupQuestion'
                    :userList='userList'
                    :paperTitle='paperTitle'
                    :paperComment='paperComment'
                    ></company-paper>
                </div>
        
              
    </div>
</template>

<script>
import newNav from '@/components/newNav'
import { getRuestionnaire,getTszPaper,quoteTemplate} from "@/axios/api.js"
import CompanyPaper from './CompanyPaper'
    export default {
        components:{
            newNav,
            CompanyPaper
        },
        data(){
            return{
                paperTitle:'问卷标题',
                paperComment:'这是说明',
                loading:true,
                bank:'2',
                groupQuestion:[],//360问卷
                userList:[],
                question:[
                     
                ],
                paperType:'1',
                paperId:'',
                radio2:[],
                checkedCities:[],
                textarea2:[]
            }
        },
        methods:{
            //使用模板
            redactBank(){
                quoteTemplate({templatePaperId:this.paperId}).then(res=>{
                        console.log('引用模板',res)
                        if(res.status==200&&res.data.success==true){
                              this.$message({
                                    type: 'success',
                                    message: '购买成功!'
                                });
                                this.$router.push('/')
                        }
                })
               
            }
        },
        destroyed() {
            sessionStorage.removeItem('paperProperty')
            sessionStorage.removeItem('paperTeplate')
        },
        mounted() {
            let bank=this.$route.params.bank  
            if(bank){
                sessionStorage.setItem('bank',bank)
                this.bank=bank
            } else{
               bank=sessionStorage.getItem('bank')
                  this.bank=bank
            }
            
            let paperProperty=JSON.parse(sessionStorage.getItem('paperProperty'))
            let paperTeplate=JSON.parse(sessionStorage.getItem('paperTeplate'))
            if(paperProperty){                       
                this.paperType=paperProperty.paperType
                this.paperId=paperProperty.paperId
                console.log(paperProperty)             
                if(paperProperty.paperType=='1'){
                    getRuestionnaire({
                        paperId:paperProperty.paperId
                    }).then(res=>{
                        console.log(res)
                        if(res.status==200&&res.data.success===true){
                            this.paperTitle=res.data.data.paperTitle
                            this.paperComment=res.data.data.paperComment
                            this.question=res.data.data.question
                            res.data.data.question.forEach((data)=>{
                                this.checkedCities.push([])
                                this.radio2.push('')  
                                this.textarea2.push('')  
                            })
                            this.loading=false
                        }
                    })  
                }
                else if(paperProperty.paperType=='2'){
                        //获取360问卷内容 
                    getTszPaper({paperId:paperProperty.paperId}).then(res=>{
                        console.log('获取360问卷内容',res)
                        if(res.status==200&&res.data.success==true){
                            this.groupQuestion=res.data.data.groupQuestion
                            this.paperTitle=res.data.data.paperTitle
                            this.paperComment=res.data.data.paperComment
                            this.userList=res.data.data.userList
                             this.loading=false
                        }
                    })
                }
            }else{
                 this.loading=false
            }
            if(paperTeplate){
                this.paperType=paperTeplate.paperType
                this.paperId=paperTeplate.templatePaperId
                if(paperTeplate.paperType=='1'){
                    console.log('调查问卷预览',paperTeplate)
                    this.paperTitle=paperTeplate.paperTitle
                    this.paperComment=paperTeplate.paperComment
                    this.question=paperTeplate.question
                    paperTeplate.question.forEach((data)=>{
                                this.checkedCities.push([])
                                this.radio2.push('')  
                                this.textarea2.push('')  
                            })
                            this.loading=false
                }
                else if(paperTeplate.paperType=='2'){
                    console.log('360问卷预览',paperTeplate)
                    this.groupQuestion=paperTeplate.groupQuestion
                    this.paperTitle=paperTeplate.paperTitle
                    this.paperComment=paperTeplate.paperComment
                    this.userList=paperTeplate.userList
                    this.loading=false
                }
            }          
        },
         created() {
            //  this.$store.commit('headerName','返回我的问卷')
        },
    }
</script>

<style lang="scss">
      .main-previwe{
            width:800px;
            height: 100%;
            padding-top:40px;
            margin: 0 auto;
            overflow: auto;
            
            .main-top2{
                 margin-bottom: 20px;
                    h3{
                        text-align: center;
                        padding:20px 0; 
                        color: #09f;
                    }
                    p{
                        line-height: 25px;
                    }
                    .useTemplate{
                    width: 150px;
                    height: 40px;
                    position:fixed;
                    // top:80px;
                    left: 0;
                    right: 0;
                    bottom:20px;
                    margin: auto;
                    // margin-left:400px;
                }
            }
            .main-top_border{
                margin-top: 30px;
                height: 20px;
                border-top:1px solid #ccc;
                border-bottom:1px solid #ccc;                   
            }
           
            .main-content_box2{
                width: 100%;
                background: #fff;
                height: 100%;
                
                li{
                    margin-bottom:10px;
                }
                p{
                    line-height: 30px;
                }
                .news-text{
                    margin-top:10px;
                    div{
                        line-height: 30px;
                            .el-radio{
                            padding-left:15px;
                        }
                        .el-input__inner{
                            height: 30px;
                            line-height: 30px;
                        }
                        .el-radio__input{
                            position:absolute;
                            top: 3px;
                            left: 0px;
                        }
                        span{
                                word-break:normal;
                            display:inline-block;
                            white-space:pre-wrap;
                            line-height: 20px;                                   
                        }
                        .el-checkbox{
                            padding-left:15px;
                        }
                        .el-checkbox__input{
                            position:absolute;
                            top: 3px;
                            left: 0px;
                        }
                    }
                }
            }
        }
</style>