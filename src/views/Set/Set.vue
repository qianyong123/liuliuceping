<template>
        <div class="setBox">          
           <div class="setMain">
              
                <div class="block">
                    <!-- <span class="demonstration">默认 Hover 指示器触发</span> -->
                    <el-carousel height="200px">
                    <el-carousel-item v-for="item in 4" :key="item">
                        <h3>{{ item }}</h3>
                    </el-carousel-item>
                    </el-carousel>
                    <div class="setType">
                           <div 
                           v-for="setType in setlist" 
                           class="setType-item"
                           @click="onsetType(setType)"
                           :key="setType.id">
                                {{setType.name}}
                           </div>
                    </div>
                </div>
                <div class="paperTypeBox">
                    <div 
                    v-for="(item,index) in setlist2 "
                    :key="item.id"
                    class="paperType"
                    @click="onbuyPaper(index)"
                    >
                        <img :src="item.img">
                        <h3>{{item.name}}</h3>
                        <p>{{item.text}}</p>
                        <div class="paperType-status" v-if="item.id==0">
                           <img src="/static/img/u2411.png" alt="">
                           <p style=" transform:rotate(-40deg);">免费使用</p>
                        </div>
                        <div v-if="item.id==1" class="paperType-status">
                            <img src="/static/img/u2217.png" alt="">
                           <p style=" transform:rotate(-40deg);color:#fff;">已经启用</p>
                        </div>
                    </div>
                </div>
           </div>
             <!-- 编辑关联部门 -->
        <el-dialog
            title="编辑关联部门"
            :visible.sync="relevanceBrach"
            width="700px">
            <div class="setBrach">
                <div class="setBrach-p1">
                    <p>选择主部门</p>
                     <el-select v-model="mainBranch" placeholder="请选择主部门">
                        <el-option
                        v-for="item in allBranchList"
                        :key="item.department_id"
                        :label="item.name"
                        :value="item.department_id">
                        </el-option>
                    </el-select>
                </div>
                <div class="setBrach-p1">
                    <p>选择关联部门</p>
                     <el-select style="width:80%" v-model="setRelevanceBrach" multiple placeholder="请选择关联部门">
                    <el-option
                    v-for="item in allBranchList"
                    :key="item.department_id"
                    :label="item.name"
                    :value="item.department_id">
                    </el-option>
                    </el-select>
                </div>
                <div style="margin:20px 0;">
                     <el-table
                    :data="RelevanceBrachList"
                    border
                    style="width: 100%"
                    >                                   
                        <el-table-column
                        prop="name"
                        width="150px"
                        label="部门">
                        </el-table-column>
                        <el-table-column
                        prop="correlationName"
                        label="关联部门">
                        </el-table-column>
                        <el-table-column
                        label="操作"
                        width="60">
                         <template slot-scope="scope">
                            <i 
                            @click="deleteDeputyManagers((scope.row))"
                            class="el-icon-error" 
                            style="font-size:18px;color:#ccc;cursor: pointer;"></i>                                
                        </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="relevanceBrach=false">关闭</el-button>
                <el-button type="primary" @click="setDeputyManagers">保存</el-button>
            </span>
        </el-dialog>
               <!-- 购买问卷弹框-->
        <el-dialog       
            :visible.sync="buyPaper"
            width="700px">
            <div class="buyPapers">
                <div>
                   <img src="/static/img/u2389.png" alt="">
                </div>
                <div style="margin-left:20px;padding-top:30px;">
                   <h3>{{setlist2[buyid].name}}</h3>
                   <p style="margin:15px 0;">
                       <span style="font-size:18px;color:#f00;margin-right:10px;">￥{{setlist2[buyid].price}}元</span>
                       <span style="text-decoration:line-through">￥{{setlist2[buyid].deleteprice}}元</span>
                    </p>
                   <p>{{setlist2[buyid].amout}}人正在使用</p>
                   <p style="margin-top:20px;padding-top:20px; border-top: 1px solid rgb(105, 92, 92);line-height: 20px;">{{setlist2[buyid].text}}</p>
                   <el-button style="margin-top:40px;width:200px;" type="primary">立即购买</el-button>
                </div>
            </div>
           
        </el-dialog>
        </div>
</template>

<script>
import {
    setDeputyManager,
    getDeputyManagerList,
    deleteDeputyManager ,
    listPost,
    selectAppraisalUserrs,
    allBranch
} from "@/axios/api"
    export default {
        name:"Set",
        data(){
            return{
                relevanceBrach:false,
                mainBranch:'',
                setRelevanceBrach:[],
                RelevanceBrachList:[],
                allBranchList:[],
                buyPaper:false,
                setlist:[
                   {id:1,name:'关联部门'},
                    {id:2,name:'新增功能1'},
                    {id:3,name:'新增功能2'},
                    {id:4,name:'新增功能3'}
                ],
                buyid:0,
                setlist2:[
                   {id:0,name:'360测评',img:'/static/img/u2377.png',text:'给部门之间建立关系，便于在360测评中快速定位相关答卷人员。',amout:'11546',price:'98',deleteprice:'120',},
                    {id:1,name:'内部问卷',img:'/static/img/u2377.png',text:'针对企业内部发放的问卷，可以使用组织架构指定企业内部员工作为答卷人。',amout:'145454',price:'112',deleteprice:'150',},
                    {id:2,name:'公开问卷',img:'/static/img/u2377.png',text:'给部门之间建立关系，便于在360测评中快速定位相关答卷人员。',amout:'1245455',price:'99',deleteprice:'190',},
                    {id:3,name:'调查问卷',img:'/static/img/u2377.png',text:'针对企业内部发放的问卷，可以使用组织架构指定企业内部员工作为答卷人。',amout:'13566',price:'88',deleteprice:'160',},                 
                ],
            }
        },
        methods:{
            onsetType(type){
                if(type.id==1){
                    this.relevanceBrach=true
                }
            },
            //点击问卷类型
            onbuyPaper(id){
                this.buyPaper=true
                this.buyid=id
                console.log(id)
            },
            //保存关联部门
           setDeputyManagers(){
                console.log(this.mainBranch,this.paperId)
                console.log(this.setRelevanceBrach)
               let setRelevanceBrach= this.setRelevanceBrach.filter(data=>{
                    return data!=this.mainBranch
                })
                 console.log(setRelevanceBrach)
                setDeputyManager({
                    departmentId:this.mainBranch,
                    list:setRelevanceBrach
                    }).then(res=>{
                    console.log('保存关联部门',res)
                    this.mainBranch=''
                    this.setRelevanceBrach=[]
                    if(res.status==200&&res.data.success==true){
                        this.$message({
                            type: 'success',
                            message: '设置成功!',
                            center:true
                        });
                        this.getDeputyManagerLists()
                    }else{
                          this.$message({
                            message: '设置失败',
                            center:true
                        });
                    }
                })
            },
            //关联部门列表
            getDeputyManagerLists(){
                getDeputyManagerList().then(res=>{
                    console.log('关联部门列表',res)
                    if(res.status==200&&res.data.success==true){                      
                        this.RelevanceBrachList=res.data.data
                    }
                    
                })
            },
               //所有部门
            allBranchs(){
                allBranch().then(res=>{
                    console.log('所有部门',res)
                    if(res.status==200&&res.data.success==true){
                        this.allBranchList=res.data.data
                    }
                })
            },
              //删除关联部门
            deleteDeputyManagers(row){
                console.log(row)
                    this.$confirm('你确定要删除该关联部门吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        deleteDeputyManager({
                            departmentId:row.department_id,
                        }).then(res=>{
                            console.log('删除关联部门',res)
                             if(res.status==200&&res.data.success==true){   
                                 this.getDeputyManagerLists()               
                                 this.$message({
                                    type: 'success',
                                    message: '删除成功!',
                                    center:true
                                });
                            }else{
                                  this.$message({
                                    message:res.data.message,
                                    center:true
                                });
                            }
                         })
                  
                    }).catch(() => {
                        console.log('取消删除关联部门')      
                    });
                
            },       
         
        },
        mounted() {
            this.getDeputyManagerLists()
            this.allBranchs()
        },
    }
</script>

<style lang="scss" scoped>
    .setBox{
       width: 100%;
       min-height:100%;
       background: rgb(242, 242, 242);
        .setMain{
            width: 760px;
            min-height:600px;
            margin:0 auto;
            padding:20px 0;
            
        }
        .block{
            border: 1px solid rgb(105, 92, 92);
            .setType{
                min-height:140px;
                width: 100%;
                padding: 10px;
                border-top: 1px solid rgb(105, 92, 92);
                display: flex;   
                justify-content:space-between;
                align-items: center;   
                background: #fff;
                .setType-item{
                    width:170px;
                    height:140px;
                    border: 1px solid rgb(105, 92, 92);
                    display: flex;   
                    justify-content:center;
                    align-items: center;  
                    cursor: pointer;
                    &:hover{
                        background: #09f;
                         border: 1px solid #09f;
                         color: #fff;
                    }
                }       
            }
        }
        .paperTypeBox{
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            .paperType{
                width:370px;
                height: 280px;  
                border: 1px solid rgb(105, 92, 92);
                padding: 20px;
                margin-top: 20px;
                background: #fff;
                position: relative;
                cursor: pointer;
                h3{
                    margin: 20px 0;
                }
                p{
                    font-size: 14px;
                    line-height: 24px;
                }
                .paperType-status{
                    position: absolute;
                    top:-1px;
                    left:-1px;
                    p{
                        position: absolute;
                        top:17px;
                        left:4px;
                        font-size: 12px;
                        color: rgb(19, 17, 17);
                    }
                }
            }
        }
   
    }
   //设置关联部门
        .setBrach{
            width: 100%;
            min-height: 300px;
            max-height: 500px;
            border: 1px solid #ccc;
            padding:20px;
            overflow: auto;
            .setBrach-p1{
                display: flex;
                width: 100%;
                height: 60px;
                align-items: center;
                p{
                    width: 100px;
                }
            }
        }
        //购买问卷
        .buyPapers{
            width: 100%;
            min-height: 400px;
            display: flex;
            span{
                display:inline-block;
            }
        }
    .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
    text-align: center;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
</style>






