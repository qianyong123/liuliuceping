<template>
    <div class="listTemplate">
        <div class="listTemplate-main">
            <div>
                <div 
                v-for="(item,indexs) in template2"
                class="listTemplate-text"
                @click="onqusetion(item,indexs)"
                :class="{'listTemplate-border':indexs!=8,qusetionBcg:qusetionBcgs==indexs}"
                :key="indexs">
                    <div>
                        <p style="line-height:34px;">
                            <!-- <span>#12378{{indexs}}</span> -->
                            <span>{{item.paperTitle}}</span>
                        </p>
                        <div style="display: flex;">
                            <!-- <el-button style="background-color: #d3a307;border:1px solid rgb(211, 163, 7);" v-if="item.paperType==1" size="mini" type="warning">调查问卷</el-button>
                            <el-button style="background-color: rgb(102, 102, 204);border:1px solid rgb(102, 102, 204);" v-else-if="item.paperType==2" size="mini" type="warning">360测评</el-button>
                            <el-button style="background-color: rgb(255, 153, 102);;border:1px solid rgb(255, 153, 102);" v-else-if="item.paperType==3" size="mini" type="warning">投票统计</el-button>
                            <el-button style="background-color: rgb(51, 153, 102);border:1px solid rgb(51, 153, 102);" v-else-if="item.paperType==4" size="mini" type="warning">活动报名</el-button> -->
                            <div class="listTemplate-state">
                                <span>类型：{{item.paperType | paperType}}</span>
                                <span v-if="item.paperState==1">状态：已发布</span>
                                <span v-else-if="item.paperState==2">状态：未发布</span>
                                <span v-else-if="item.paperState==3">状态：已结束</span>
                                <span>回收：{{item.count}}</span>
                                <span>创建时间：{{item.createTime | times}}</span>
                            </div>
                        
                        </div>
                    </div>
                    <div>
                        <div class="listTemplate-caozuo">
                            <p 
                            v-for="(item2,index2) in caozuoimg"
                            :key="index2"
                             @click="$emit('onskip',index2,item)">
                                <img :src="item2.img" alt="">
                                <span>{{item2.title}}</span>
                            </p>
                            <p>
                            <i style="font-size:20px;" @click.stop="$emit('ismore',indexs)" class="el-icon-more"></i>
                            </p>
                        </div>
                        <div v-show="ismores==indexs" class="more_caozuo">
                            <p  
                            v-for="(text,index3) in more"
                                @click="$emit('onMore',item,text)"
                            :key="index3">{{text}}</p>
                        </div>
                    </div>
                </div>       
            </div>
            <div class="listfooter">
                <div>
                    <img src="/static/img/u318.png" alt="">
                    <span style="margin-left:5px;">共{{paperAmount}}份问卷</span>
                </div>
                <div>
                    <el-pagination
                    @current-change="handleCurrentChange"
                    :pager-count='5'
                    :page-size='page'
                    :current-page='currentpage'
                    background
                    layout="prev, pager, next"
                    :total='paperAmount'>
                    </el-pagination>
                </div>
            </div>
        </div>
        <!-- <div class="qsetion-details">
            <div class="details-top">
                <el-button type="primary" round  style="background:#8462F6;border-color: #8462F6;" size="small">调查问卷</el-button>
                <div>
                    <span></span>
                    <span>已发布</span>
                </div>
            </div>
            <div>
                <h3 style="line-height:24px;">{{qusetion.paperTitle}}</h3>
                <div class="qusetion-time">
                    <p>发布范围：{{qusetion.isOpen | isOpens}}</p>
                    <p>有效时间：12-12 16:30 至 12-30 17:00</p>
                </div>
                <div class="qusetion-text">
                    <p>在您填写评估问卷之前，请阅读问卷说明：</p> 
                    <p> 1、360度调查是一种用于评估个人领导和管理技巧的方法和机制；</p>     
                    <p>  2、问卷共包括二个部分：即能力评估、素质评估；</p>     
                    <p> 3、本次评估为匿名评估，请客观填写问卷，每个问题只选一项；</p>            
                    <p>4、您的评估和反馈是人力资源部制定2016年下半年度中高层管理人员的培训计划的依据。</p>   
                    <p>非常感谢您抽出时间填写问卷！</p>
                </div>
                <div class="qusetion-caozuo">
                    <div v-for="item in caozuo" :key="item.id" class="item">
                        <i :class="item.icon" style="font-size:20px;color:#8462F6;cursor: pointer;"></i>
                        <span>{{item.name}}</span>
                    </div>
                </div>
                <div class="qusetion-caozuo">
                    <div v-for="item in caozuo2" :key="item.id" class="item">
                        <i :class="item.icon" style="font-size:20px;color:#8462F6;cursor: pointer;"></i>
                        <span>{{item.name}}</span>
                    </div>
                </div>
                <div class="deleteQusetion">删除问卷</div>
            </div>
        </div> -->
    </div>
</template>

<script>
import { myQusetioniner ,delete_paper} from '@/axios/api.js'
import {formatDate} from '@/js/date.js'
import bus from '@/js/bus.js'
    export default {
        name:"ListTemplat",
        props:['ismores','paperAmount','template2'],
        data(){
            return{              
                // amout:108, 
                page:8,   
                currentpage:1,
                qusetionBcgs:'8899',
                // paperAmount:2,
                // template2:[],   
                qusetion:{},
                start:'1'   ,
                //更多
                more:[
                    '预览',
                    // '复制',
                    '删除',
                    // '导出问卷',
                    '清除数据'
                ],
                caozuoimg:[
                    { img:'/static/img/u198.png',title:'编辑'},
                    { img:'/static/img/u199.png',title:'发布'},
                    { img:'/static/img/u197.png',title:'统计'},
                ],  
                caozuo:[
                    {id:1,icon:'el-icon-view',name:'预览'},
                    {id:2,icon:'el-icon-menu',name:'统计'},
                    {id:3,icon:'el-icon-edit-outline',name:'分析'},                  
                ] ,
                  caozuo2:[                 
                    {id:4,icon:'el-icon-edit',name:'编辑'},
                    {id:5,icon:'el-icon-refresh',name:'复制'},
                    {id:6,icon:'el-icon-bell',name:'发布'},
                ]             
            }
        },
        methods:{
         
            handleCurrentChange(val){
                this.currentpage=val
                bus.$emit('myPaper2',val)
            },
            onqusetion(item,index){
                this.qusetionBcgs=index
                this.qusetion=item
            },
            //我的问卷列表
           myPaper2(val){
                myQusetioniner({
                    paperTitle:'',
                    paperType:'',
                    paperState:'',
                    isOpen:'',
                    pageSize:'8',
                    pageNo:val
                }).then(res=>{
                    // console.log(res)
                    if(res.status==200&&res.data.success==true){   
                        if(res.data.data.length>0){
                            // this.template2=res.data.data
                            // this.paperAmount=res.data.data.length                      
                            // this.qusetion= this.template2[0]
                        }                  
                            
                    }
                })
           },
        },
        filters:{
            times(time){
                let date=new Date(time)
              return formatDate(date,'yyyy-MM-dd')
            },
            paperType(type){
                let name=''
                if(type==1){
                    name='调查问卷'
                }
                else if(type==2){
                    name='360测评'
                }
                else if(type==3){
                    name='投票统计'
                }
                  else if(type==4){
                    name='活动服务'
                }
                return name
            },
            isOpens(isopen){
                let name=''
                if(isopen==''){
                    name='公开问卷'
                }
                else if(isopen==1){
                     name='公开问卷'
                }
                else if(isopen==2){
                     name='内部问卷'
                }
                return name
            }
        },
       
        mounted() {
            this.myPaper2()
            // console.log(this.template2)
            // this.qusetion=this.template2[0]
        },
    }
</script>

<style lang="scss">
@import '@/stylecss/main.scss';
    .listTemplate{
         height: 100%;
         width: 100%;
         display: flex;
         flex: 1;
        //  flex-direction: column;
        //  justify-content: space-between;
         font-size: 14px;
         .qsetion-details{
             flex: 0.4;
             padding:30px;
             overflow: auto;
             .details-top{
                 display: flex;
                 justify-content: space-between;
                 margin-bottom: 24px;
             }
             .qusetion-time{
                 margin: 20px 0;
                 p{
                    height:16px;
                    font-size:12px;        
                    font-weight:400;
                    line-height:16px;
                    color:rgba(144,147,153,1);
                 }
             }
             .qusetion-text{
                 padding-bottom:20px;
                 border-bottom: 1px solid rgba(230,230,230,1);
                 p{
                     line-height:24px;
                    color:rgba(96,98,102,1);
                    font-size:14px;
                 }
             }
             .qusetion-caozuo{
                 width: 100%;
                 display: flex;
                 height:100px;
                 .item{
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    color:rgba(51,51,51,1);
                    align-items: center;
                    span{
                        display: inline-block;
                        margin-top: 10px;
                        font-size:14px;
                        color:rgba(51,51,51,1); 
                    }
                 }
             }
             .deleteQusetion{
                 width:160px;
                height:40px;
                line-height: 40px;
                text-align: center;
                font-size: 14px;
                background:rgba(255,255,255,1);
                border:1px solid rgba(230,230,230,1);
                opacity:1;
                border-radius:4px;
                margin: 20px auto;
                color:rgba(192,196,204,1);
                cursor: pointer;
             }
         }
         .listTemplate-main{
            flex:1; 
             display: flex;
         flex-direction: column;
         justify-content: space-between;
            overflow:auto; 
            border-right: 1px solid #ccc;
            .listTemplate-border{
               border-bottom:1px solid #ccc;
            }        
           .listTemplate-text{
               display: flex;
               justify-content: space-between;
               padding:0 30px;
               min-height: 80px;
               width:100%;
               align-items:center;
               position: relative;
               &:hover{
                   background:#C1D8EF;
               }
             
               .listTemplate-state{
                   margin-left:0px;
                   width:400px;
                   font-size: 12px;
                   color:rgba(144,147,153,1);
                   display: flex;
                   align-items: center;
                   justify-content: space-between;
               }
                .more_caozuo{
                position: absolute;
                top:58px;
                right:15px;
                background: #fff;
                border:1px solid #ccc;
                border-radius: 4px;
                border-bottom: 0;
                width: 100px;
                z-index:100;
                p{
                    line-height: 30px;
                    text-align: center;
                    border-bottom:1px solid #ccc;
                    cursor: pointer;
                     &:hover{
                        background: $bcg;
                        color: #fff;
                    }              
                }
            }
            }
            .qusetionBcg{
                     background:#C1D8EF;
               }
            .listTemplate-caozuo{
                display: flex;
                justify-content: space-between;
                align-items: center;
                width:300px;
                height: 100%;
                // padding-right: 20px;
                p{
                    cursor: pointer;
                   color:rgba(51,51,51,1); 
                }
            }
         }
         .listfooter{
            height:98px;
            width: 100%;
            border: 1px solid #ccc;
             border-left: 0;
             display: flex;
             justify-content: space-between;
             align-items:center;
             padding:0 20px;
             font-size: 14px;
             
            //  margin-bottom: 20px;
         }
     } 
    
</style>