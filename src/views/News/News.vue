<template>
    <div class="news" v-loading="loading2">  
        <!-- 新建导航 -->
        <newnav></newnav>
        <!-- 题型         -->
        <types        
            @pushText='pushText'
            @deleteTemplate='deleteTemplate'
            :templates='templates' 
            @applyTemplate='applyTemplate'    
        >
        </types>

        <!-- <div class="main">内容</div>  -->         
        <div class="main">
            <div class="main-hader">
                <div class="main-title">
                    <div 
                    v-for="item in title"
                    :key='item.id'
                    :class="{yulang:item.class==yulang,bcgColor:item.id==bcg}"
                    @click="bcgColor(item.id)"
                    >
                        {{item.name}}
                    </div>
                </div>
            </div>               
            <div id="main-content">
                <!-- 编辑 -->
                <div v-show="bcg==1" class="main-redact">
                    <div class="main-top top_border"  @click="mainTOP">
                        <div style="background:#F5F7FA;padding:20px 30px;">
                             <h3 style="color:#09f;" v-if="h2show" >{{ paperTitle}}</h3>
                             <p style="border-bottom:1px dashed #ccc;padding-bottom:20px; " v-if="pshow" >{{paperComment}}</p> 
                        </div>                                        
                    </div>
                    <ul class="main-content_box">
                        <li 
                        v-for='(item,index) in question'
                        :key='index'
                        :id="'qusetion-'+index"
                        @click="onShowText(index,item)"
                        :class="{liBorder:isCaozuo==index}"
                        >
                            
                            <div v-if="'创建所属维度'!=item.questionType">
                                <p>
                                    <span>题目</span> 
                                    <!-- <span v-else>题目</span> -->
                                    <el-input
                                    placeholder="请输入题目"
                                    v-model="textTitle[index]"
                                    :value='item.questionTitle'                
                                    >  
                                    </el-input>
                                    <!-- <span v-else class="optionName">{{textTitle[index]}}</span>                                      -->
                                    <b class="sort-id">{{index+1}}.</b>
                                </p>
                                <p>
                                    <span>说明</span>
                                    <el-input
                                    placeholder="请输入说明"
                                    v-model="textState[index]"
                                    :value='item.questionComment'
                                   >
                                    </el-input>
                                </p>
                            </div>
                            <p v-if="'3'==item.questionType">
                                <span></span>
                                <span  class="main-tiankong"></span>  
                            </p>                    
                            <div v-if="'1'==item.questionType||'2'==item.questionType">
                                <p 
                                v-for='(item2,index2) in item.option'
                                :key='index2'
                                >
                                    <i v-if="'1'==item.questionType" class="yuandian"></i>
                                    <i v-else class="yuandian check"></i>
                                    <el-input
                                    placeholder="请输入选项类容"
                                    v-model="inputList[index][index2]"
                                    :disabled="'2'==item2.optionType"                                     
                                    >
                                    </el-input>
                                    
                                    <i class="el-icon-circle-close-outline deletOption" v-show="isCaozuo==index" @click="deletOption(index,index2)"></i>
                                </p>
                            </div>
                            <div class="text_caozuo" v-show="isCaozuo==index" v-on:click.stop>
                                <div class="caozuo-span" v-if="'1'==item.questionType||'2'==item.questionType">
                                    <span @click="addOption(index)">新增选项</span>
                                    <span  @click="redactText(index)">快速编辑</span>
                                    <span v-if="paperType!='2'" @click="qitaOption(index)">其他项</span>
                                </div>
                                <div>
                                    <el-button @click="deletType(index,item.questionId)" size="mini">删除</el-button>
                                    <el-button @click="concel(index)" size="mini">取消</el-button>
                                    <el-button type="primary" size="mini" v-on:click.stop @click="confirm(index,item)">保存</el-button>
                                </div>
                            </div> 
                            <div v-show="isCaozuo!=index" class="option-zheban"></div>        
                        </li>
                    </ul>
                </div>

             <!-- 快速编辑弹框 --> 
                <el-dialog title="每行代表一个选项,可以添加多个选项" :visible.sync="dialogTextarea">
                    <textarea class="text-redact" v-model="textareaValue"></textarea>
                    <div slot="footer" class="dialog-footer">
                            <el-button @click="clearTextarea">取 消</el-button>
                            <el-button type="primary" @click="onTextarea()">确 定</el-button>
                    </div>
                </el-dialog>
            <!-- 编辑头部弹框-->
                 <el-dialog   :visible.sync="topTextarea" width="600px">
                     <div style="padding:0 50px;">
                          <h3 style="margin-bottom:20px;">标题</h3>
                           <el-input
                            type="textarea"
                            autosize
                            placeholder="请输入内容"
                            style="width:100%;height:40px;margin-bottom:20px;"
                            v-model=" paperTitle">
                            </el-input>
                          <!-- <textarea style="width:100%;height:40px;margin-bottom:20px;" v-model="textareaValue"></textarea> -->
                     </div>
                     <div style="padding:0 50px;">
                         <h3  style="margin-bottom:20px;">说明</h3>
                         <el-input
                            type="textarea"
                            :autosize="{ minRows: 2, maxRows: 4}"
                            placeholder="请输入内容"
                            v-model="paperComment">
                            </el-input>
                     </div>
                   
                    <div slot="footer" class="dialog-footer">
                            <el-button @click="onCancle">取 消</el-button>
                            <el-button type="primary" @click="MainTopFrim">确 定</el-button>
                    </div>
                </el-dialog>
            <!-- 存为模板弹框 -->
                <el-dialog
                title="模板也存在"
                :visible.sync="centerDialogVisible"
                width="30%"
                center>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">保存修改模板</el-button>
                    <el-button type="primary" @click="centerDialogVisible = false">存为新模板</el-button>
                </span>
                </el-dialog>

            <!-- 发布弹框 -->
                <el-dialog                 
                    :visible.sync="fabuVisible"
                    width="750px"
                    >
                    <h2 style="text-align:center;margin-bottom:20px;color:#4CAF50;">发布成功</h2>
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
                        <el-button type="primary" @click="closeFabu">关闭</el-button>
                    </span>
                </el-dialog>

             <!-- 预览 -->
                <div v-show="bcg==2" class="main-previwe">
                    <div class="main-top2" style="width:100%;">
                        <h3>{{ paperTitle}}</h3>
                        <p>{{paperComment}}</p>
                        <div class="main-top_border">

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
                                           >
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
                    <firm-paper  
                    v-if="paperType==2"
                     style="padding:20px 0;"
                    :groupQuestion='groupQuestion'
                    :nogroupQuestion='groupQuestion'
                    :loading='loading'
                    :userList='userList'></firm-paper>
                </div>
                <!-- 发布 -->
                <div v-show="bcg==3" class="main-fabu">
                    <div v-if="paperType==1">
                      
                         <div style="margin:30px 0;">
                             <!-- <el-switch
                                    v-model="value1"
                                    active-color="#09f"
                                    inactive-color="#dcdfe6">
                                    </el-switch> -->
                             <h3 style="margin-bottom:20px;">有效时间</h3>
                             <div>
                                <el-radio v-model="value1" label="1" border>指定时间</el-radio>
                                <el-radio v-model="value1" label="2" border>长期有效</el-radio>
                            </div>
                             <!-- <p style="color:#ccc;font-size:12px;margin-top:5px;">说明：不设置有效时间，问卷一直都能答卷</p> -->
                        </div>  
                        <div style="display:flex;">
                            
                            <div class="block">
                                <el-date-picker
                                v-model="date1"
                                type="datetime"
                                placeholder="选择开始时间">
                                </el-date-picker>
                            </div>
                            <div style="width:100px;text-align: center;margin:10px 0;">至</div>
                            <div class="block">
                                <el-date-picker
                                v-model="date2"
                                type="datetime"
                                placeholder="选择结束时间">
                                </el-date-picker>
                            </div>                      
                        </div> 
                        <div style="margin:30px 0;display:flex;">
                            <el-switch
                                    v-model="value2"
                                    active-color="#09f"
                                    inactive-color="#dcdfe6">
                                    </el-switch>
                            <h3 style="margin:0 5px;">公开问卷</h3>
                            <p style="color:#ccc;font-size:12px;margin-top:5px;">说明：非公开问卷需要用户登录的情况下才能答卷</p>
                        </div>                     
                        <div style="width:80%">
                            <!-- <h3 style="margin:30px 0;">信息收集</h3>                                            -->
                            <div style="margin:30px 0;border:1px solid #ccc;font-size:14px;"> 
                                <div class="main-fabu_message" style="line-height:40px;border-bottom:1px solid #ccc;padding-left:20px">
                                    <p>公开问卷时，收集用户以下信息</p>
                                    <!-- <el-switch
                                    v-model="value2"
                                    active-color="#09f"
                                    inactive-color="#dcdfe6">
                                    </el-switch> -->
                                </div>
                                <div v-if="value2" style="padding:10px 20px;display: flex;">
                                    <!-- <el-checkbox style="margin-right: 30px;" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>                          -->
                                    <el-checkbox-group v-model="checkedCities2" @change="handleCheckedCitiesChange">
                                            <el-checkbox
                                            v-for="city  in cities"
                                            :disabled="city=='姓名'||city=='手机'"
                                            :label="city" 
                                            :key="city">{{city}}</el-checkbox>
                                    </el-checkbox-group>
                                </div> 
                                <div v-else style="padding:10px 20px;display: flex;">
                                    <!-- <el-checkbox style="margin-right: 30px;" disabled :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>                           -->
                                    <el-checkbox-group v-model="checkedCities2" @change="handleCheckedCitiesChange">
                                            <el-checkbox disabled v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                                    </el-checkbox-group>
                                </div>                                         
                            </div>                         
                        </div>                               
                        <el-button @click="onFabu" type="primary" style="width:200px;margin-top:20px;">立即发布</el-button>                                     
                    </div>
                    <div v-else-if="paperType==2">
                        <firm-publish :paperId='paperId'></firm-publish>
                    </div>
                </div>
            </div>
        </div> 
        <!-- 属性 -->
        <property 
        :bcg='bcg' 
        :mains='mains' 
        :gread='gread'
        :dedactId='dedactId'
        :tableData='tableData'
        :typeProperty='typeProperty'
        :titleType='titleType'
        :paperType='paperType'
        :paperId='paperId'
        :questionProperty='questionProperty'
        :questionRequired='questionRequired'
        :currenDimensionality='currenDimensionality'
        :groupList='groupList'
        @saveTemplate='saveTemplate'
        @toggleType='toggleType'   
        @dimensionality='dimensionality'    
        ></property>   
    </div>
</template>

<script>
import Types from './Types'
import Property from './Property'
import FirmPaper from './FirmPaper'
import FirmPublish from './FirmPublish'
import newnav from '@/components/newNav'
import { formatDate } from '@/js/date.js'
import { 
    getNews,
    updateRuestionnaire,
    getRuestionnaire,
    newRuestion,
    updateRuestion,
    deleteRuestion,
    publishPaper,
    getTszPaper,
    selectAllGroup
} from '@/axios/api.js'
import axios from 'axios'
import qs from 'qs'
 import bus from '@/js/bus.js'
const cityOptions = ['姓名','手机','公司','职位','性别'];
    export default {
        name:"News",
        components:{
                   Types,                   
                   Property,
                   newnav,
                   FirmPaper,
                   FirmPublish
                },
        data(){
            return{
                //发布页面收集用户信息
                checkAll: false,
                checkedCities2: ['姓名','手机'],
                cities: cityOptions,
                isIndeterminate: true,
                paperState:'2', //问卷是否发布
                value1:'1',
                value2:true,
                questionRequired:[
                      
                ],
                questionProperty:false,
                img:'',
                fabuVisible:false,
                questionUrl:`http://wj.gst70.cn/#/m/MPdajuan/123456`,

               bcg:1,
               loading:true,
               loading2:true,
               isCaozuo:'cz',
               radio2:['111'],
               checkedCities:[
                   []
               ],
               checkedId:0,
               textarea3:'',
               textarea2:'',
               rest_text:'',
               radio7:'1',
               date1:null,
               date2:null,
               mainId:0,
               textLength:1,            
               types:'单选题',
               typeProperty:'单选题',
               centerDialogVisible:false,   

                paperType:'',//问卷类型
                currenDimensionality:'',//所属维度
                groupList:[{groupName:'维度',amount:0}],//维度列表
                groupQuestion:[],//360问卷内容
                userList:[],//被测评的人员
                nogroupQuestion:[],//没有维度的问题
               questionComment:'这是说明',//问题题目
               questionTitle:'这是题目',//问题说明
               titleType:[
                   {
                       text:'单选题',
                       id:1
                   },
                   {
                       text:'多选题',
                       id:2
                   },
                   {
                       text:'填空题',
                       id:3
                   },
                   
               ],
               tableData: [{
                    text: '题目总数',
                    count:0,
                    }                  
                ],
                templates:[
                    
                ],
                paperId:'',//问卷id
                questionId:'',//问题id
               question:[//当前题库
                  
               ],
               //当前编辑数据             
                inputList:[
                               
                ],              
                textTitle:[],
                textState:[],
                //main
                isshow:'ture',
                mains:[
                    
                ],//选题的分数
                gread:[
                   
                ],//绑定选题的分数
                focusState:'ture',//input自动聚焦
                yulang:'yulang',//头部预览边框
                h2show:'ture',//标题
                pshow:'ture',//说明
                disabled:'disabled',//添加其他项
                dialogTextarea: false,//快速编辑弹框
                topTextarea:false,//头部弹框
                textareaValue:'',//弹框内容
                dedactId:0,//当前题的id
                textareaArr:'',//编辑对话框类容
                paperComment:'这里是问卷说明这里是问卷说明这里是问卷说明',//问卷说明
                paperTitle:'问卷题目',//问卷名字          
                title:[
                    {id:1,name:'编辑',},
                    {id:2,name:'预览',class:'yulang'},
                    {id:3,name:'发布'},
                ],
                anchors:``,//锚点
            }
        },
        methods:{

            //新建问卷
            newsQuestion(paperType){
                  getNews({
                      paperType	
                  }).then(res=>{
                      if(res.status==200&&res.data.success===true){
                        this.loading2=false
                        this.paperId=res.data.data.paperId
                        sessionStorage.setItem('paperProperty',JSON.stringify(res.data.data))
                        // sessionStorage.setItem('paperId',res.data.data.paperId)
                        console.log(res)
                          this.sessionStorage();     //本地会话存储
                      }
                  
                })
            },
            
            //存为模板
            saveTemplate(){
                // this.templates.push(this.paperTitle)
                //  this.$message({
                //     message: '模板保存成功',
                //     type: 'success'
                // });
                // this.centerDialogVisible=true
                
            },
            //删除模板
            deleteTemplate(id){
                this.templates.splice(id,1)
                console.log(id)
            },
            //渲染模板
            applyTemplate(){
                
                
            },
            //获取360问卷内容
            getTszPapers(){
                getTszPaper({paperId:this.paperId}).then(res=>{
                    console.log('获取360问卷内容',res)
                    if(res.status==200&&res.data.success==true){                     
                        this.groupQuestion=res.data.data.groupQuestion
                        this.userList=res.data.data.userList
                        this.nogroupQuestion=res.data.data.question
                        this.loading=false
                        this.groupList=[]
                        res.data.data.groupQuestion.forEach((datas,index)=>{
                            if(datas.question.length>0){
                            this.groupList.push({groupName:datas.groupName,amount:datas.question.length})
                            }
                        })
                    }
                })
            },
            //main头部切换
             bcgColor(id){
                this.bcg=id;
                if(id==1){
                     this.typesCount();
                }
                else if(id==2&&this.paperType==2){
                    this.getTszPapers()
                }
            },         
            open2() {//删除问题对话框
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                        console.log('删除成功!')       
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });  
                    console.log('已取消删除')        
                });
        },
        //删除一题
         deletType(id,questionId){
            // this.open2()
                deleteRuestion({
                     paperId:this.paperId,
                     questionId
                }).then(res=>{
                    console.log(res)
                    if(res.status==200&&res.data.success==true){
                        this.question.splice(id,1);
                        this.inputList.splice(id,1)
                        this.gread.splice(id,1)
                        this.mains=[]
                        this.radio2.splice(id,1)
                        this.checkedCities[id].splice(id,1)
                        this.typesCount();//筛选题型数量
                        this.sessionStorage();//本地会话存储                           
                        this.questionProperty=false //问题属性
                        this.questionRequired.splice(id,1)
                        this.isCaozuo='cz'
                       this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                    }else{
                         this.$message.error('删除失败');
                    }
                })
                  
            },
         
            //添加一题
            pushText(id){
                if(this.isCaozuo=='cz'){
                      //添加一题接口
                    newRuestion({
                        paperId:this.paperId,
                        questionType:id+1,
                        groupId	:this.currenDimensionality
                    }).then(res=>{
                        if(res.status==200&&res.data.success==true){
                                console.log('添加问题',res)
                                this.questionId=res.data.data.questionId
                                this.question.push(res.data.data)
                                this.inputList.push(['选项','选项',])  
                                this.gread.push([0,0,])  
                                this.mains=res.data.data.option              
                                this.radio2.push(111) 
                                this.checkedCities.push([]) 
                                this.typesCount();//筛选题型数量                                                         
                                this.textTitle.push('一个新问题')
                                this.textState.push('')                                   
                                this.sessionStorage();//本地会话存储
                                this.questionRequired.push(true)
                                this.isCaozuo=this.question.length-1
                                this.questionProperty=true
                                let length=this.question.length-1
                                if(length>=0){
                                    setTimeout(()=>{
                                        var anchor = this.$el.querySelector(`#qusetion-${length}`) 
                                        anchor.scrollIntoView()
                                    },100)
                                    
                                }                        
                               
                                if(res.data.data.questionType=='1'){
                                    this.mains=this.question[id].option;
                                    this.typeProperty='单选题' 
                                }
                                else if(res.data.data.questionType=='2'){
                                        this.mains=this.question[id].option;
                                        this.typeProperty='多选题' 
                                    }
                                else if(res.data.data.questionType=='3'){
                                    this.mains=[]
                                    this.typeProperty='填空题' 
                                }
                            }                       
                        })
                }else{             
                      this.$message('你还没有保存修改');
                }

            },        
            addOption(id){//添加一项
                let optionLength= this.question[id].option.length-1,
                    optionNumber=this.question[id].option[optionLength].optionNumber+1;
               this.inputList[id].push('选项')
               this.question[id].option.push( {optionName:'选项',optionType:'1',optionValue:'0',optionNumber:optionNumber})
                this.mains=this.question[id].option;
                this.gread[id].push(0)//属性分数
                console.log(optionNumber)
           },
             qitaOption(id){//添加其他项
                let optionType=1;
                this.question[id].option.forEach((data,index)=>{
                        if(data.optionType==2){
                            optionType=2;
                            this.$message('你已经有其他项了')                        
                            return;
                        }
                })
                if(optionType==1){
                    let optionLength= this.question[id].option.length-1,
                        optionNumber=this.question[id].option[optionLength].optionNumber+1;
                    this.inputList[id].push('其他项');
                    this.question[id].option.push({optionName:'其他项',optionType:'2',optionValue:'0',optionNumber:optionNumber})
                    this.mains=this.question[id].option;
                    this.gread[id].push(0)
                }
              
           },        
           deletOption(id,id2){//删除一项
             if(this.question[id].option.length<2){
                   this.$message({
                            message:'最少保留一项',
                            center:true
                        });
                        return
               }
                this.inputList[id].splice(id2,1)//绑定选题类容
                this.question[id].option.splice(id2,1)
                this.mains=this.question[id].option;//选题类容
                this.gread[id].splice(id2,1)//属性分数
           },

        //确认保存修改
           confirm(id,item){
               console.log('当前问题',item)
               if(this.question[id].option.length>5&&this.paperType=='2'){
                   this.$message({
                            message:'最多保留五项！',
                            center:true
                        });
                        return
               }
                if(item.questionType=='1'||item.questionType=='2'){
                    let texts=this.inputList[id],
                        greads=this.gread[id];
                    for(let i=0;i<texts.length;i++){
                        this.question[id].option[i].optionName=texts[i]
                        this.question[id].option[i].optionValue=greads[i]                           
                    } 
                }    
                let questionRequired=this.questionRequired[id]?1:2
                this.question[id].questionTitle=this.textTitle[id]
                this.question[id].questionComment=this.textState[id]
                this.question[id].questionRequired=questionRequired
                this.question[id].groupId=this.currenDimensionality   
                this.isCaozuo='cz';  
                this.sessionStorage();//本地会话存储   
                this.questionProperty=false //问题属性                                                 
                
                updateRuestion({
                     paperId:this.paperId,
                     questionId:item.questionId,
                     questionType:item.questionType,
                     questionComment:this.textState[id],
                     questionTitle:this.textTitle[id],
                     questionRequired,
                     option: this.question[id].option ,
                     groupId:this.currenDimensionality              
                }).then(res=>{
                    console.log('保存问题',res)
                    if(res.status==200&&res.data.success==true){                                         
                       
                        this.$message({
                            message: '保存修改成功',
                            type: 'success'
                        });
                    }else{
                       this.$message.error('保存修改失败');
                    }
                })
                 
            },

        //点击选中问题类容
           onShowText(id,item){ 
               console.log(item)
             if(this.isCaozuo=='cz'){              
                    this.isCaozuo=id; 
                    this.dedactId=id;  //当前问题id
                    this.questionProperty=true    //问题属性 
                    bus.$emit('optionDimensionality', item.groupId)
                    this.currenDimensionality=item.groupId
                      if(item.questionType=='1'){
                        this.mains=this.question[id].option;
                        this.typeProperty='单选题' 
                    }
                        else if(item.questionType=='2'){
                            this.mains=this.question[id].option;
                            this.typeProperty='多选题' 
                        }
                        else if(item.questionType=='3'){
                            this.mains=[]
                            this.typeProperty='填空题' 
                        }
             }else{
                 if( this.isCaozuo!==id){
                     this.$message('你还没有保存修改');
                 }else{    
                    bus.$emit('optionDimensionality',item.groupId)  
                     this.currenDimensionality=item.groupId           
                    if(item.questionType=='1'){
                        this.mains=this.question[id].option;
                        this.typeProperty='单选题' 
                    }
                        else if(item.questionType=='2'){
                            this.mains=this.question[id].option;
                            this.typeProperty='多选题' 
                        }
                        else if(item.questionType=='3'){
                            this.mains=[]
                            this.typeProperty='填空题' 
                        }
                         this.dedactId=id;  //当前问题id
                         this.questionProperty=true    //问题属性 
                 }

                //  console.log(this.isCaozuo,id)
             }                                  
           },   
        //取消当前编辑
           concel(id){ 
                var sessionText2=sessionStorage.getItem('sessionText')
                    sessionText2=JSON.parse(sessionText2)
                this.question=sessionText2.question;
                this.inputList=sessionText2.input2;
                this.textTitle=sessionText2.textTitle;
                this.textState=sessionText2.textState;
                this.mains=sessionText2.mains;
                this.gread=sessionText2.gread                         
              console.log(sessionText2)
               this.typesCount();
               this.isCaozuo='cz'
                this.questionProperty=false //问题属性
           },

           //快速编辑弹框

           clearTextarea(){//清楚弹框里面的额内容
                this.dialogTextarea=false;
           },

           redactText(id){//快速编辑
                this.dialogTextarea=true;
                let inputList=this.inputList[id]
                let option=''
                if(inputList.length>0){
                    inputList.forEach(data=>{
                        option+=data+'\n'
                    })
                }
                console.log(option)
                 this.textareaValue=option;
           },

            onTextarea(){//获取对话框的类容
                this.dialogTextarea=false;
                let arr=this.textareaValue,  
                    gread=[] ,
                    option=[] ,  
                    inputList=[],
                    str=arr.split("\n");              
                // this.inputList[this.dedactId]=this.inputList[this.dedactId].concat(str); 
                // this.inputList[this.dedactId]=str;  
                console.log(str)                         
                for(let i=0;i<str.length;i++){
                    if(str[i]!=''){
                        gread.push(0) 
                        option.push({optionName:str[i],optionType:'1',optionValue:'0',optionNumber:i+1})
                        inputList.push(str[i])
                    }                     
                    }
                this.gread[this.dedactId]=gread
                this.mains=option
                this.question[this.dedactId].option=option
                this.inputList[this.dedactId]=inputList
           } ,
        //本地会话存储
            sessionStorage(){
                    let sessionText={
                        paperComment:this.paperComment,
                        paperTitle:this.paperTitle,
                        question:this.question,
                        input2:this.inputList,
                        textTitle:this.textTitle,
                        textState:this.textState,
                        mains:this.mains,
                        gread:this.gread,
                        checkedCities:this.checkedCities,
                        radio2:this.radio2
                    }
                sessionStorage.setItem('sessionText',JSON.stringify(sessionText));
            },

            //点击问卷头部
            mainTOP(){
                this.topTextarea=true;
                const mainTops={
                    paperComment:this.paperComment,
                    paperTitle:this.paperTitle
                }
                sessionStorage.setItem('mainTops',JSON.stringify(mainTops))
            },

            //修改问卷头部
            MainTopFrim(){
                this.topTextarea=false;  
                updateRuestionnaire({
                    paperComment:this.paperComment,
                    paperTitle:this.paperTitle,
                    paperId:this.paperId
                }).then(res=>{
                    // console.log(res)
                     if(res.status=='200'&&res.data.success==true){                       
                            //   this.get_Ruestionnair()
                     } 
                })      
            },

            //取消编辑问卷头部
            onCancle(){
                 this.topTextarea=false;
                 const mainTops=JSON.parse(sessionStorage.getItem('mainTops'))
                 this.paperComment=mainTops.paperComment
                 this.paperTitle=mainTops.paperTitle
            },
           titleShow(){
               this.h2show=false;
                this.focusState ='ture';
           },
           posShow(){
               this.pshow=false;
           },
           h2input(){
                this.h2show='ture';
               
           },
           posinput(){
               this.pshow='ture';
           },  


            //改变题型
            toggleType(Type,id){
                 this.typeProperty=Type
                 this.question[this.dedactId].questionType=id
                 if(Type=='单选题'||Type=='多选题'){
                 
                     this.mains=this.question[this.dedactId].option
                 }
                 else if(Type=='填空题'){
                   
                     this.mains=[]
                     this.gread[this.dedactId]=[0,0]
                 }
                 this.typesCount();//筛选题型数量
                //  this.sessionStorage()//存本地
            },
            //所属维度
            dimensionality(item){               
                this.currenDimensionality=item.groupId
                console.log(this.currenDimensionality)
            },
            //维度列表
            groupLists(paperId){
                selectAllGroup({ paperId:paperId}).then(res=>{
                    console.log('维度列表',res)
                    if(res.status==200&&res.data.success==true){
                        // this.groupList=res.data.data
                    }
                })
           },
            //筛选题型的数量
            typesCount(){
                   this.tableData=[{
                        text: '题目总数',
                        count:0,
                    }]
                   this.tableData[0].count=this.question.length//题目总数                   
                    var text=this.question;
                    var radioCuont=0,
                        tiankong=0,
                        checkedCuont=0;
                    text.forEach(function(data){
                        if(data.questionType=='1'){
                            radioCuont+=1                          
                        }
                        else if(data.questionType=='2'){
                            checkedCuont+=1
                        }
                        else if(data.questionType=='3'){
                            tiankong+=1
                        }
                       
                    })

                if(radioCuont>0){ //单选
                    this.tableData.push({
                        text: '单选题',
                        count:radioCuont,
                    })                  
                }
                if(checkedCuont>0){ //多选
                    this.tableData.push({
                        text: '多选题',
                        count:checkedCuont,
                    })                  
                }
                 if(tiankong>0){ //填空
                    this.tableData.push({
                        text: '填空题',
                        count:tiankong,
                    })                  
                } 
            },

     //发布
            onFabu(){             
                var date1=this.date1,
                    date2=this.date2,
                    startTime='',
                    endTime='';
                    console.log(this.value1)
                    if(this.value1=='1'){
                        if(date1==null||date2==null){
                            this.$message.error('请选择有效时间')                         
                        } else{
                             startTime=formatDate(date1, 'yyyy-MM-dd hh:mm')
                             endTime=formatDate(date2, 'yyyy-MM-dd hh:mm')
                               var userInfo=this.checkedCities2.join(',')                                                                                                   
                                //调用发布接口 收集用户信息 
                                        publishPaper({
                                        questionUrl:`http://wj.gst70.cn/#/m/MPuserinfo/${this.paperId}`,
                                        paperId:this.paperId,
                                        startTime,
                                        endTime,
                                        isOpen:this.radio7,
                                        userInfo:this.value2?userInfo:''
                                    }).then(res=>{
                                    console.log(res)
                                    if(res.status==200){
                                        this.$message({
                                            message: '发布成功',
                                            type:'success',
                                            center: true
                                            });                            
                                        let publishPaper={ 
                                            img:`data:image/jpeg;base64,${res.data.data.base64}`,
                                            fabuVisible:true,
                                            questionUrl:`http://wj.gst70.cn/#/m/MPuserinfo/${this.paperId}`
                                        }
                                        // sessionStorage.setItem('publishPaper',JSON.stringify(publishPaper))
                                        setTimeout(()=>{
                                            this.$router.push({
                                                name:'home',
                                                params:{
                                                    publishPaper
                                                }
                                            })
                                        },1000)
                                    }
                                    
                                })      
                        }                  
                    }else{
                        
                        var userInfo=this.checkedCities2.join(',')                                                     
                                                
                        //调用发布接口 收集用户信息 
                                 publishPaper({
                                questionUrl:`http://wj.gst70.cn/#/m/MPuserinfo/${this.paperId}`,
                                paperId:this.paperId,
                                startTime,
                                endTime,
                                isOpen:this.radio7,
                                userInfo:this.value2?userInfo:''
                            }).then(res=>{
                            console.log(res)
                            if(res.status==200&&res.data.success==true){
                                this.$message({
                                    message: '发布成功',
                                    type:'success',
                                    center: true
                                    });                            
                                let publishPaper={ 
                                     img:`data:image/jpeg;base64,${res.data.data.base64}`,
                                    fabuVisible:true,
                                    questionUrl:`http://wj.gst70.cn/#/m/MPuserinfo/${this.paperId}`
                                 }
                                // sessionStorage.setItem('publishPaper',JSON.stringify(publishPaper))
                                setTimeout(()=>{
                                    this.$router.push({
                                        name:'home',
                                        params:{
                                            publishPaper
                                        }
                                    })
                                },1000)
                            }else{
                                 this.$message({
                                    message: res.data.message,
                                    center: true
                                    });  
                            }
                            
                        })                                                           
                      
                 }
                                  
            }, 
            //日期  
             handleCheckAllChange(val) {
                this.checkedCities2= val ? cityOptions : [];
                this.isIndeterminate = false;
            },
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.cities.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
            } ,
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
            //打开问卷网址
            // openwenjuan(){
            //     this.$router.push(`/m/MPdajuan/${this.paperId}`)
            // }
            closeFabu(){
                this.fabuVisible=false
                this.$router.push('/')
            },
         
        },
    //    directives: {//自动获取焦点
    //         focus: {
    //             // 指令的定义
    //             inserted: function (el) {
    //             el.focus()
    //             }
    //         }
    //     },
        watch:{
                
        },
        created() {
            this.$store.commit('headerName',' 退出新建')
        },
        destroyed() {
            sessionStorage.removeItem('paperProperty')  
        },
      
       mounted() {  
            let paperType=this.$route.params.paperType
            let paperId=this.$route.params.paperId
            if(paperId==undefined||paperType==undefined){
               let paperProperty=JSON.parse(sessionStorage.getItem('paperProperty'))
                if(paperProperty!=undefined){
                    paperType=paperProperty.paperType
                    paperId=paperProperty.paperId
                    this.paperId=paperId
                }   
                console.log(paperProperty)          
            }
            this.paperType=paperType
            let data=new Date()
            var inputList2=[],
                gread2=[];
               this.date1=data
           if(paperId==undefined||paperId==null){
            //新建问卷
                this.newsQuestion(paperType); 
           }else{
                this.paperId=paperId
               getRuestionnaire({
                   paperId
               }).then(res=>{
                   console.log('问卷内容',res)
                   if(res.status==200&&res.data.success==true){
                       this.loading2=false
                       this.paperType=res.data.data.paperType
                        this.question=res.data.data.question
                        this.paperTitle=res.data.data.paperTitle
                        this.paperComment=res.data.data.paperComment
                        this.paperId=res.data.data.paperId
                        this.paperState=res.data.data.paperState
                        // console.log(this.question)
                         res.data.data.question.forEach(data1=>{   
                             inputList2=[]  
                             gread2=[]                
                                data1.option.forEach(data2=>{
                                    inputList2.push(data2.optionName)
                                    gread2.push(data2.optionValue)
                                })     
                                this.inputList.push(inputList2)  
                                this.gread.push(gread2) 
                                this.radio2.push(111) 
                                this.checkedCities.push([]) 
                                this.textTitle.push(data1.questionTitle)
                                this.textState.push(data1.questionComment) 

                                data1.questionRequired==1?
                                this.questionRequired.push(true):                                                                                           
                                this.questionRequired.push(false)      
                        })
                        this.typesCount();//筛选题型数量                                                         
                        this.sessionStorage();//本地会话存储    
                   }
               })
           }
           
             
                 
       },
    }
</script>

<style lang="scss">
        .el-message{
                width:300px;
            }
        .news{
                display: flex;
                height: 100%;  
                position: relative; 
                padding-top: 60px;     
                .el-dialog__header{
                    border-bottom: 0;
                }
                .el-dialog__footer{
                    border-top:0;
                }        
            }
        .text-redact{//编辑
            width:100%;
            height: 300px;
        }
       
        .main{
            flex:0.6;
            border-right:1px solid #ccc;
            display: flex;
            flex-direction: column;
            color: #000;
           
            .bcgColor{
                    background: #09f;
                    color: #fff;                  
                }
            .main-hader{
                width: 100%;
                height: 60px;
                display: flex;
                justify-content: center;
                align-items: center;
                 .main-title{               
                    width: 240px;
                    height: 30px;
                    display: flex;
                    font-size: 12px;
                    border-radius: 4px;
                    cursor: pointer;  
                    border: 1px solid #ccc;             
                    div{
                        flex: 1;
                        display: flex;
                        justify-content: center;
                        align-items: center;                                        
                   }
                    
                    .yulang{
                        border-left:1px solid #ccc;
                        border-right:1px solid #ccc;
                    }
                }
            }
            .main-tiankong{
                height:40px;
                width:100%;
                border:1px solid #ccc;
                margin-bottom: 10px;
                border-radius:4px;
            }
            #main-content{
                flex: 1;
                border-top: 1px solid #ccc;              
                overflow:scroll;              
                .main-redact{
                    width: 100%;
                    min-height: 100%;
                    padding:20px 30px;
                    background: #F5F7FA; 
                      //inout里面的删除
                    .el-input__suffix{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }                
                }               
                .main-top{
                   text-align: center;
                   padding:1px;
                   &:hover{
                       background: #09f; 
                   }                              
                   h3{
                       margin-bottom: 20px;
                   }
                   .main-text{
                       margin-bottom: 40px;
                       text-align: center;
                       font-weight: 600;
                       font-size:16px; 
                       line-height: 30px;
                       width: 400px;                 
                   }
                   p{
                       line-height: 25px;
                       text-align: left;
                   }
                }

                .main-top2{
                    padding:0 40px;
                    h3{
                        text-align: center;
                        padding:20px 0; 
                        color: #09f;
                    }
                    p{
                        line-height: 25px;
                    }
                }
                .main-top_border{
                    margin-top: 30px;
                    height: 20px;
                    border-top:1px solid #ccc;
                    border-bottom:1px solid #ccc;                   
                }
                .main-content_box{
                    margin-top: 30px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 100%;
                    padding:20px 0;                 
                    li{
                        width: 100%;
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        // align-items: center;
                        padding:20px 20px 10px 30px;
                        margin-bottom: 20px;                      
                        background: #fff; 
                        position: relative;
                        .option-zheban{
                            width: 100%;
                            height: 100%;
                            position: absolute;
                            top: 0;
                            left: 0;
                            z-index: 999;
                            background: rgba($color: #fff, $alpha:0.1)
                        }                
                        .text_caozuo{
                            display: flex;
                            width:90%;
                            padding-top: 20px;
                            justify-content: space-between;
                            align-items: center;
                            border-top:1px solid #ccc;
                            cursor: pointer;  
                            .caozuo-span{
                                color: #09f;
                            }                         
                            span{
                                padding:10px;
                                // color:#09f;
                                font-size: 14px;  
                                // &:hover{
                                //     color: rgb(9, 143, 87);
                                // }                       
                            }
                            .el-button{
                                height: 40px;
                                width: 70px;
                                // padding-bottom: 10px;
                                span{ 
                                     padding:0px;                             
                                    // line-height:6px;
                                }
                            }
                        }
                         span{
                            display:inline-block;
                            min-width: 40px;
                        }
                    }
                   .liBorder{
                       border:1px solid #09f;
                   }
                    p{
                        display: flex;
                        align-items: center;
                        justify-content: space-around;
                        width:90%;
                        margin-bottom:10px;
                        position: relative;
                        span{
                            display: inline-block;
                        }
                        .deletOption{
                            position: absolute;
                            top:7px;
                            right:-40px;
                            font-size:25px;
                            color: #ccc;
                            cursor: pointer;
                        }
                        .sort-id{
                            position: absolute;
                            top: 12px;
                            left: -20px;
                        }
                        .optionName{
                            width: 100%;
                            line-height:40px;
                            padding:0 20px;
                        }
                    }
                     .yuandian{
                        width: 16px;
                        height: 16px;
                        border-radius:50%;
                        background: rgb(236, 232, 232);
                        margin-right: 24px;
                        opacity: 0.5;
                    }
                   .check{
                    border-radius:0;
                       border:1px solid #ccc;
                   }
                }
               
            }
             //预览
                .main-previwe{
                    width: 100%;
                    padding:20px 30px;
                    overflow: auto;
                    .main-content_box2{
                        width: 100%;
                        padding:20px 40px;
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
       
     
    
</style>






