<template>
        <div class="bankBox">          
            <div class="bankMall">
                <div class="bankType">
                    <div class="bankType-top">
                        <i class="el-icon-document"></i>
                        <span style="margin-left:10px;font-size:18px;">模板分类</span>
                    </div>
                    <ul class="bankType-main">
                        <li 
                        v-for="item in bankTypeList"
                        :key="item.item_type"
                        :class="{bankTypeBcg:bankTypeBcg==item.item_type}"
                        @click="onbankType(item.item_type)">
                            {{item.item_name}}
                        </li>
                    </ul>
                </div>
                <div class="bankMain">                   
                   <div class="bankSseek">
                       <el-input
                        placeholder="请输入模板标题"
                        v-model="bankName"
                        style="width:260px;"
                        clearable>
                        </el-input>
                        <el-button @click="selectTemplate" type="primary" >搜索</el-button>
                   </div>
                   <div>
                        <div class="bankMain-list" v-for="(item,index) in bankList" :key="index">
                            <p @click="linkPreview(item)">{{item.paper_title}}</p>
                            <div style="font-size:12px;color: #828282;margin-top:15px;">
                                <span style="margin-left:0;">{{item.paper_type| paperType}}</span>
                                <span>引用次数100次</span>
                                <span>所需金币{{item.cost_point_value}}</span>
                                <span>共{{item.question_count}}题</span>
                            </div>
                        </div>                                            
                   </div>
                    <el-pagination
                    class="pageCount"
                    @current-change="handleCurrentChange"
                    :pager-count='5'
                    :page-size='pageSize'
                    :current-page='currentpage'
                    background
                    layout="prev, pager, next"
                    :total='paperAmount'>
                    </el-pagination>
                </div>
            </div>
        </div>
</template>

<script>
import { templateType,templateCategoryList,quoteTemplate,selectTemplateName,previewPaper} from '@/axios/api'
    export default {
        name:"Bank",
        data(){
            return{
                bankTypeBcg:'1',
                bankName:'',
                pageSize:6,
                currentpage:1,
                paperAmount:10,
                bankTypeList:[
                    {item_type:1,item_name:'调查问卷'},                
                ],
                bankList:[

                ]
            }
        },
        filters:{
            paperType(type){
                let name=''
                if(type==1){
                    name='调查问卷'
                }
                else if(type==2){
                    name='360测评'
                }
                else if(type==2){
                    name='投票统计'
                }
                else if(type==2){
                    name='活动报名'
                }
                return name
            }
        },
        methods:{
            onbankType(id){
                this.bankTypeBcg=id
                this.templateCategoryLists(1)
            },
            //预览问卷
            linkPreview(item){
                previewPaper({templatePaperId:item.template_paper_id,paperType:item.paper_type}).then(res=>{
                    console.log('预览模板',res)
                    if(res.status==200&&res.data.success==true){
                        sessionStorage.setItem('paperTeplate',JSON.stringify(res.data.data))
                        this.$router.push({
                            name:'preview',
                            params:{
                                bank:'1'
                            }
                        })
                    }
                })
              
            },
            //搜索模板
            selectTemplate(){
                if(this.bankName==''){                  
                       this.$message({                          
                            message: '模板标题不能为空',
                            center: true
                            });                     
                }else{
                    selectTemplateName({paperTitle:this.bankName}).then(res=>{
                        console.log('搜索模板',res)
                        if(res.status==200&&res.data.success==true){
                            this.bankList=res.data.data  
                            this.paperAmount=res.data.data.length                
                        }else{
                            this.$message({                          
                            message: res.data.message,
                            center: true
                            }); 
                        }
                    })
                }
                
            },
            //点击分页
             handleCurrentChange(val){
                this.currentpage=val
                this.templateCategoryLists(val)
            },
            //问卷类别
            templateTypes(){
                templateType().then(res=>{
                    console.log('模板类别',res)
                    if(res.status==200&&res.data.success==true){
                        this.bankTypeList=res.data.data  
                                    
                    }
                })
            },
            //类别模板
            templateCategoryLists(val){
                templateCategoryList({
                    itemType:this.bankTypeBcg,
                    pageSize:this.pageSize,
                    pageNo:val
                }).then(res=>{
                    console.log('类别模板',res)
                    if(res.status==200&&res.data.success==true){
                       this.bankList=res.data.data    
                        this.paperAmount=res.data.data.length             
                    }
                })
            }
        },
        created() {
            this.templateTypes()
            this.templateCategoryLists(1)
        },
    }
</script>

<style lang="scss" scoped>
    .bankBox{
        .bankMall{
            width: 1000px;
            height: 642px;
            margin: 60px auto;
            border: 1px solid #ccc;
            border-radius: 6px;
            display: flex;
            overflow: auto;
            position: relative;
            .bankType{
                width: 260px;
                height: 100%;
                background-color: #f7f8f9;
                border-right: 1px solid #ccc;
                .bankType-top{
                    font-size: 22px;
                    border-bottom: 1px solid #ccc;
                    width: 100%;
                    height: 100px;
                    display: flex;
                    align-items: center;
                    color: #333333;
                    padding:0 30px;
                }
                .bankType-main{
                    min-height: 300px;
                    li{
                        line-height: 50px;
                        font-size: 16px;
                        padding:0 30px;
                        color: #808080;
                        cursor: pointer;
                         border-bottom: 1px solid #f7f8f9;
                        &:hover{
                            background: #fff;
                            color: #09f;
                        }
                    }
                    .bankTypeBcg{
                        background: #fff;
                        color: #09f;
                    }
                }
            }

            .bankMain{
                flex: 1;
                padding: 30px;
                position: relative;
                .bankSseek{
                    width: 100%;
                    height: 70px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .bankMain-list{
                    height: 80px;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    border-bottom: 1px dashed #dedfe0;
                    &:hover{
                        cursor: pointer;

                            p{
                                color: #09f;

                            }
                        }               
                    span{
                        margin: 0 5px;
                    }
                }
                .pageCount{
                    position: absolute;
                    left: 20px;
                    bottom: 12px;
                }
            }
           
        }
    }
   
</style>






