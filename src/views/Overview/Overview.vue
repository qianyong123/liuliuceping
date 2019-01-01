<template>
        <div class="myQusetioniner">          
            <div class="myQusetioniner-screen">
                <div class="screen_top">
                    <div>
                        <img src="/static/img/u53.png">
                        <span style="margin-left:10px;">筛选</span>
                    </div>                
                    <el-button @click="newQusetioniner" type="primary" size="small">新建问卷</el-button>
                </div>
                <div class="screen_seek">
                    <el-input
                    placeholder="搜索问卷（标题）"
                    v-model="paperTitle">
                    </el-input>
                    <i @click="screenPaper" class="el-icon-search"></i>
                </div>
                <div>
                    <div class="screen-condition">
                        <p>发布状态</p>
                        <el-checkbox-group v-model="paperState">                         
                            <el-checkbox 
                            v-for="(item,index) in publishState2"
                            :key="item.id"
                            :label="index+1"
                            @change='screenPaper'
                            >{{item.text}}</el-checkbox>                                                                                                           -->
                        </el-checkbox-group>
                        <span class="amount">{{paperCounts.paperState1}}</span>
                        <span class="amount" style="left:230px;">{{paperCounts.paperState2}}</span>
                        <span class="amount" style="top:75px;">{{paperCounts.paperState3}}</span>
                    </div>
                    <div class="screen-condition">
                        <p>发布范围</p>
                        <el-checkbox-group v-model="isOpen">      
                            <el-checkbox 
                                v-for="(item,index) in publishScope2"
                                :key="item.id"
                                :label="index+1"
                                @change='screenPaper'
                            >{{item.text}}</el-checkbox>    
                        </el-checkbox-group>                    
                        <span class="amount">{{paperCounts.isOpen1}}</span>
                        <span class="amount" style="left:230px;">{{paperCounts.isOpen2}}</span>
                    
                    </div>
                    <div class="screen-condition">
                        <p>问卷类型</p>
                        <el-checkbox-group  v-model="paperType">  
                         <el-checkbox 
                            v-for="(item,index) in qusetionTypes2"
                            :key="item.id"
                            :label="index+1"
                            @change='screenPaper'
                            >{{item.text}}</el-checkbox>      
                        </el-checkbox-group>                
                        <span class="amount">{{paperCounts.paperType1}}</span>
                        <span class="amount" style="left:230px;">{{paperCounts.paperType2}}</span>
                        <span class="amount" style="top:75px;">{{paperCounts.paperType3}}</span>
                        <span class="amount" style="left:230px;top:75px;">{{paperCounts.paperType4}}</span>
                    </div>
                </div>
            </div>
            <div class="myQusetioniner-template"  @click="ismore(9988)">
                <div class="template-top">
                    <!-- <el-button style="background:rgb(22, 155, 213);" @click="newQusetioniner" type="primary" size="small">新建问卷</el-button> -->
                    <div class="template-top_type">
                        <div 
                        v-for="(item,index) in templateCut"
                        :key="index"
                        @click="onTemplateBtn(index)"
                        :class="{ cutbcg:bcg==index,btnBorder:1==index }"                      
                        class="template-top_btn">
                            <span>{{item.text}}</span>
                        </div>                     
                    </div>
                </div>
                <!-- 网格模板 -->
                <gd-templat 
                v-if="paperAmount!=0"
                v-show="isGdTemplate"
                :ismores='ismores'
                :template='template'
                @onskip='onskip'
                @onMore='onMore'
                @ismore='ismore'></gd-templat>
                <!-- 列表模板 -->
                <list-templat 
                v-if="paperAmount!=0"
                v-show="isListTemplate"
                :ismores='ismores'
                :template2='template2'
                :paperAmount='paperAmount'
                @onskip='onskip'
                @onMore='onMore'
                @ismore='ismore'></list-templat>
                <div v-if="paperAmount==0" style="flex:1;display: flex;justify-content:center;align-items:center;"> 
                    <h1 style="color:#ccc;">没有问卷</h1>
                </div>
            </div>
            <!-- 发布弹框 -->
                 <el-dialog                 
                    :visible.sync="fabuVisible"
                    title=""
                    width="780px"
                    >
                    <div class="fabu-title">
                        <h2>问卷连接</h2>
                        <span>问卷暂停回收，连接仅提供预览，答题结果不会记录</span>
                    </div>
                    <div class="fabu-main">
                         <img id="fabufoo" :src="img" alt="">                                       
                        <div class="fabu-right">
                            <div>
                                <span class="fabu-url">{{questionUrl}}</span>
                                <el-button 
                                v-clipboard:copy="questionUrl"                                
                                v-clipboard:success="onCopy"
                                v-clipboard:error="onError"  
                                type="primary"                        
                                >复制</el-button>
                                <!-- <el-button @click="openwenjuan">打开</el-button>  -->
                            </div>
                            <div style="overflow: hidden;display: flex;">
                                <el-button style="margin-top:20px" @click="downs" type="primary">下载二维码</el-button>
                                <!-- <div>                  
                                    <img class="qusetionStare" src="/static/img/weixin.png" alt="">
                                    <img class="qusetionStare" src="/static/img/QQ2.png" alt="">
                                    <img class="qusetionStare" src="/static/img/kongjian.png" alt="">
                                    <img class="qusetionStare" src="/static/img/weibo.png" alt="">
                                </div> -->
                            </div>
                        </div> 
                     </div> 
                    <span slot="footer" class="dialog-footer">
                        <!-- <el-button @click="fabuVisible = false">取 消</el-button> -->
                        <el-button type="primary" @click="fabuVisible = false">关闭</el-button>
                    </span>
                </el-dialog>
        </div>
</template>

<script>
import GdTemplat from './GdTemplat'
import ListTemplat from './ListTemplat'
import {
    myQusetioniner,
    delete_paper,
    paper_count,
    deletePaperData,
    publishPaper,
    updateRuestionnaire
    } from '@/axios/api.js'
import bus from '@/js/bus.js'
    export default {
        name:"Overview",
        components:{
            GdTemplat,
            ListTemplat
        },
        data(){
            return{
                bcg:0,  //切换渲染模板按钮背景色
                isGdTemplate:false,    //渲染网格模板
                isListTemplate:true, //渲染列表模板
                ismores:9988,   //显示操作图
                paperTitle:'',    //筛选搜索问卷标题
                paperState:[],    //发布状态
                isOpen:[],    //发布范围
                paperType:[],    //问卷类型
                paperAmount:1, //问卷数量
                start:1, //页码
                templateCut:[
                    {img:'/static/img/u186.png',text:'我的问卷'},
                    {img:'/static/img/u182.png',text:'答题记录'}               
                ],
                template:[], //我的问卷网格
                template2:[],  //我的问卷列表  
                //筛选
                publishState2:[
                    {id:1,text:'已发布'},
                    {id:2,text:'未发布'},
                    {id:3,text:'已结束'},
                ],
                publishScope2:[
                    {id:1,text:'公开问卷'},
                    {id:2,text:'内部问卷'},
                ],
                qusetionTypes2:[
                    {id:1,text:'调查问卷'},
                    {id:2,text:'360测评'},
                    {id:3,text:'投票统计'},
                    {id:4,text:'活动报名'},
                ],
                 paperCounts:{}, //问卷状态数量

                 //发布
                  img:'',
                  fabuVisible:false,
                  questionUrl:''

            }         
        },
         methods:{
            //切换渲染模板的方式 
            onTemplateBtn(id){
                this.bcg=id
                if(id==0){
                    // this.templateCut[0].img='/static/img/u186.png'
                    // this.templateCut[1].img='/static/img/u182.png'
                    this.isGdTemplate=false
                    this.isListTemplate=true
                }
                else if(id==1){
                    //  this.templateCut[0].img='/static/img/u358.png'
                    //  this.templateCut[1].img='/static/img/u354.png'
                     this.isListTemplate=false
                     this.isGdTemplate=true
                }             
            },
            //新建问卷
            newQusetioniner(){
                this.$router.push('/questioninerType')
            },
             //显示模板里面更多
            ismore(id){
                this.ismores=id
                // console.log(id)
            },
            //点击操作img
           onskip(id,paperProperty){
               if(id==0){
                      console.log(paperProperty)
                    if(paperProperty.paperState==1){
                        this.$confirm('你修改问卷时，问卷会暂停发布，你需在修改完后再次发布问卷才可继续进行收集，原问卷链接不会改变?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                        }).then(() => {
                            sessionStorage.setItem('paperProperty',JSON.stringify(paperProperty))
                            updateRuestionnaire({
                                 paperId:paperProperty.paperId,
                                 paperState:'2'
                            }).then(res=>{
                                console.log('修改问卷状态',res)
                            })
                            this.$router.push({
                                name:'news',
                                params:{
                                    paperId:paperProperty.paperId,
                                    paperType:paperProperty.paperType                  
                                }
                            })
                        })
                    }else{
                        sessionStorage.setItem('paperProperty',JSON.stringify(paperProperty))
                            this.$router.push({
                                name:'news',
                                params:{
                                    paperId:paperProperty.paperId,
                                     paperType:paperProperty.paperType                    
                                }
                            })                      
                    }
               
                    
                }
                 else if(id==1){
                     console.log(paperProperty)
                        //调用发布接口 收集用户信息 MPuserinfo
                        if(paperProperty.paperState==1){
                            let questionUrl=``
                            if(paperProperty.paperType==1){
                                 questionUrl=`http://wj.gst70.cn/#/m/MPuserinfo/${paperProperty.paperId}`
                            }
                            else if(paperProperty.paperType==2){
                                 questionUrl=`http://wj.gst70.cn/#/m/MPlogin/${paperProperty.paperId}`
                            }
                              publishPaper({
                            questionUrl,
                            paperId:paperProperty.paperId,
                            startTime:paperProperty.startTime,
                            endTime:paperProperty.endTime,
                            isOpen:paperProperty.isOpen,
                            userInfo:paperProperty.collections
                            }).then(res=>{
                            if(res.status==200){                                   
                                    this.img=`data:image/jpeg;base64,${res.data.data.base64}`
                                    this.fabuVisible=true
                                    this.questionUrl=questionUrl
                                }
                                
                            })  
                        }else{
                            sessionStorage.setItem('paperProperty',JSON.stringify(paperProperty))
                            this.$router.push({
                                name:'news',
                                params:{
                                    paperId:paperProperty.paperId,
                                    paperType:paperProperty.paperType,               
                                }
                            })    
                        }
                         
                }
                else if(id==2){
                   this.$router.push({
                       name:'analyze',
                       params:{
                           paperProperty
                       }
                   })
                   sessionStorage.setItem('paperProperty',JSON.stringify(paperProperty))
                }
                
           },
            //我的问卷网格
           myPaper(){
                myQusetioniner({
                    paperTitle:'',
                    paperType:'',
                    paperState:'',
                    isOpen:'',
                    pageSize:'',
                    pageNo:''
                }).then(res=>{
                    console.log('我的问卷',res)
                    if(res.status==200&&res.data.success==true){                    
                            this.template=res.data.data
                            this.paperAmount=res.data.data.length                                      
                    }
                })
           },
            //我的问卷列表
           myPaper2(val){
                myQusetioniner({
                    paperTitle:'',
                    paperType:'',
                    paperState:'',
                    isOpen:'',
                    pageSize:'9',
                    pageNo:val
                }).then(res=>{
                    // console.log(res)
                    if(res.status==200&&res.data.success==true){                     
                            this.template2=res.data.data
                            // this.paperAmount=res.data.data.length                      
                        
                    }
                })
           },
           //点击更多item.paperId
           onMore(paperProperty,text){
                if(text=='删除'){
                    //删除问卷
                     this.$confirm('此操作将永久删除该问卷, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                        }).then(() => {
                            delete_paper({
                                paperId:paperProperty.paperId
                            }).then(res=>{
                                // console.log(res)
                                if(res.status==200&&res.data.success==true){
                                     this.$message({
                                            type: 'success',
                                            message: '删除成功!'
                                        });
                                         this.myPaper()
                                        if(this.template2.length<2){
                                            if(this.paperAmount==1){
                                                this.myPaper2(1)
                                            }else{
                                                 this.myPaper2(this.start-1)
                                            }
                                        }else{
                                            this.myPaper2(this.start)
                                        }     
                                        this.paperCount()
                                }else{
                                    this.$message.error('删除失败')    
                                }   
                            })
                        })
                   
                }
                else if(text=='预览'){             
                   sessionStorage.setItem('paperProperty',JSON.stringify(paperProperty))
                     this.$router.push({
                        name:'preview',
                        params:{
                            bank:'2'
                        }
                    })
                }   
                else if(text=='清除数据'){
                        console.log(paperProperty)
                     if(paperProperty.isOpen==''){

                        this.$alert('你的问卷还没有发布，暂时还没有答卷数据', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                console.log('没数据')
                                }
                            });                      
                        }else{
                            this.$confirm('此操作将永久清除该问卷答题数据, 是否继续?', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                                }).then(() => {
                            
                                    deletePaperData({
                                        paperId:paperProperty.paperId,
                                        isOpen:paperProperty.isOpen,
                                        paperType:paperProperty.paperType
                                    }).then(res=>{
                                        console.log(res)
                                        if(res.status==200&&res.data.success==true){
                                            this.$message({
                                                    type: 'success',
                                                    message: '清除成功!'
                                                });
                                                // this.myPaper()
                                                // this.myPaper2(this.start)                                         
                                                // this.paperCount()
                                        }else{
                                            this.$message.error('清除失败')    
                                        }   
                                    })
                            
                                
                                })
                        }
                }
           },
           //状态筛选问卷
           screenPaper(){
            let paperType=(this.paperType).join(","),
                paperState=(this.paperState).join(","),
                isOpen=(this.isOpen).join(","),
                paperTitle=this.paperTitle;
                myQusetioniner({
                   paperTitle,
                    paperType,
                    paperState,
                    isOpen,
                    limit:'',
                    start:''
                }).then(res=>{
                    console.log(res)
                    if(res.status==200&&res.data.success==true){                    
                            this.template=res.data.data
                            this.template2=res.data.data
                            this.paperAmount=res.data.data.length                                      
                    }
                })
           },
           //问卷各状态数量
           paperCount(){
               paper_count().then(res=>{
                   console.log('问卷数量',res)
                   if(res.status==200&&res.data.success==true){
                       this.paperCounts=res.data.data
                   }
               })
           },  
           //发布
            //下载二维码
            downs(){
                //必须同源才能下载
                var alink = document.createElement("a");
                alink.href = this.img;
                alink.download = "questionnaire"; //图片名
                alink.click();

            },
            //复制问卷网址
            onCopy: function (e) {
                 this.$message({
                        type: 'success',
                        message: '复制成功!'
                    });
            },
            onError: function (e) {
                 this.$message.error('复制失败');
            },
    },        
    created() {
            this.myPaper()
            this.myPaper2(1)
            this.paperCount()
            bus.$on('myPaper',this.myPaper)
            bus.$on('paperCount',this.paperCount)
            bus.$on('myPaper2',(val)=>{
                this.start=val
                this.myPaper2(val)
            })
        //    let publishPaper=JSON.parse(sessionStorage.getItem('publishPaper'))
        let publishPaper=this.$route.params.publishPaper
            console.log(publishPaper)
           if(publishPaper){
                this.img=publishPaper.img
                this.fabuVisible=publishPaper.fabuVisible
                this.questionUrl=publishPaper.questionUrl
           }
           
        }
    }
</script>

<style lang="scss">
@import '@/stylecss/main.scss';
  .myQusetioniner{
     width: 100%;
     height: 100%;
     display: flex;
       .el-dialog__header{
            border-bottom: 0;
        }
        .el-dialog__footer{
            border-top:0;
        }
    //筛选
    .myQusetioniner-screen{
        width: 280px;
        height: 100%;
        // flex: 0.1;
        border-right: 1px solid #ccc;       
        .screen_top{
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #ccc;
            padding:0 20px;
        }
        .screen_seek{
            height: 60px;
            padding:0 20px;
            display: flex;
            align-items: center;
            border-bottom: 1px solid #ccc;
            position: relative;
            .el-input__inner{
                padding:0 30px 0 15px;
            }
            i{
                position: absolute;
                height: 40px;
                width: 30px;
                display: flex;
                justify-content: center;
                align-items: center;
                top: 10px;
                right: 20px;
                cursor: pointer;              
            }
        }
        .screen-condition{
            width:100%;
            padding:20px;
            border-bottom: 1px solid #ccc;
            min-height:100px;
            font-size: 14px;
            position: relative;
            p{
                height: 25px;
            }
            .el-checkbox{
                margin: 0;
                width: 119px;
                margin-bottom: 10px;
            }
            .amount{
                position: absolute;
                display: inline-block;
                top:46px;
                left:108px;
                border-radius: 50%;
                background:$bcg;
                color: #fff;
                font-size: 12px;
                min-height: 20px;
                min-width: 20px;
                text-align: center;
                line-height: 20px;
            }
            
        }
    }
    //渲染模板
    .myQusetioniner-template{
        flex:1;
        display: flex;
        flex-direction: column;
        .template-top{
            height: 60px;
            width: 100%;
            border-bottom: 1px solid #ccc;   
            display: flex;
            justify-content:space-between;
            align-items: center;
            .template-top_type{
                height: 60px;
                // border-bottom: 1px solid #ccc;
                min-width: 160px;
                display: flex;
                .template-top_btn{
                    width:186px;
                    display: flex;
                    align-items: center;
                    justify-content:center;
                    padding:0 10px;
                    cursor: pointer;
                    // color:$bcg;
                    // &:hover{
                    //     background:rgba(204, 204, 204, 0.5);
                    // }                                                    
                }
                .cutbcg{
                        background: #fff;
                        color: $bcg;
                        border-bottom:1px solid #fff;
                    } 
                .btnBorder{
                    border-right: 1px solid #ccc;
                    border-left: 1px solid #ccc;
                }
            }
        }
    }
     //发布
        .main-fabu{
            width: 100%;
            height: 100%;
            padding:40px 60px;
            h3{
                margin-bottom: 20px;
                color:#334252;
            }                           
            .main-fabu_message{
                line-height:40px;
                border-bottom:1px solid #ccc;
                padding:0 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
        }
        .fabu-title{
            display: flex;
            align-items: center;
            padding-left:22px;
            
            h2{
                padding-right: 20px;
            }
            span{
                color: #ccc;
            }
        }
        .fabu-main{
            display: flex;
            
        }
        .fabu-right{
            flex: 1;
            margin-top: 25px;
            .fabu-url{
                padding: 10px;
                border: 1px solid #ccc;
                border-radius: 4px;
                font-size: 14px;
            }
            .qusetionStare{
                width:40px;
                margin-top:20px;
                margin-left:10px;
                border: 1px solid #ccc;
                border-radius: 4px;
                padding: 5px;
                cursor: pointer;
            }
        }
  }
  .el-message--success{
        width: 400px !important;  
        height: 50px !important;
        line-height: 50px !important;
        margin: 0 auto !important;
    }
     .el-message--error{
        width: 400px !important;  
        height: 50px !important;
        line-height: 50px !important;
        margin: 0 auto !important;
    }
    .el-message--info{
        width: 400px !important;  
        height: 50px !important;
        line-height: 50px !important;
        margin: 0 auto !important;
    }
</style>






