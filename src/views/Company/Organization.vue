<template>
    <div class="Organization" @click="onOrganization">
        <div class="newNav">
            <p style="cursor: pointer;" @click="returns">
                <i class="el-icon-back" style="font-size:20px;margin-right:10px;"></i>
                <span>企业管理</span>
            </p>   
             <div class="analyze-cut">
                    <div class="analyze_type">
                          <div 
                            v-for="(item,index) in templateCut"
                            :key="index"
                            @click="onTemplateBtn(index)"
                            :class="{ cutbcg:bcg==index,btnBorder:0==index }"                      
                            class="messge_btn">
                                <span>{{item.text}}</span>
                            </div> 
                    </div>
                </div>
            <div style="width:20px;"></div>
        </div>       
        <div v-show="isOrganization" class="Organization-main">
            <div class="Organization-branch">
                <div class="branch-top">
                    <div>
                        <i class="el-icon-rank"></i>
                        <span>部门</span>
                    </div>                 
                    <el-popover
                    placement="right"
                    width="200"               
                    v-model="newFirmvisible">
                    <el-input v-model="fenFirmName" placeholder="请输入公司名字"></el-input>
                    <div style="text-align: right; margin-top:10px">
                        <el-button size="mini" type="text" @click="newFirmvisible = false">取消</el-button>
                        <el-button type="primary" size="mini" @click="newFirmvisible = false">确定</el-button>
                    </div>
                        <!-- <el-button slot="reference" type="primary" plain>新建分公司</el-button> -->
                    </el-popover>
                </div>
                <!-- :default-expanded-keys='[0]'   draggable-->
                <el-tree
                    style="padding:20px;"
                    :data="data2"
                    node-key="department_id"
                    default-expand-all                  
                   
                    @node-drop="handleDrop"
                    @node-drag-enter="handleDragEnter"
                    @node-click="handleNodeClick"
                    @node-drag-over="handleNodeOver"
                    :props="defaultProps"
                    :allow-drop="allowDrop"
                    :allow-drag="allowDrag">
                    <div class="custom-tree-node" 
                    @mouseover="enterBrach(data)" 
                    @mouseout="leveBrach(data)"
                    slot-scope="{ node, data }" >
                        <span class="branch-name">                     
                            <!-- <span>
                                <i
                                    type="text"
                                    size="mini"
                                    class="el-icon-edit-outline"
                                >                      
                                </i>
                            </span> -->
                            <span>
                                <i
                                    type="text"
                                    size="mini"
                                    class="el-icon-message"
                                >                      
                                </i>
                            </span>                  
                           
                            <span style="margin-left:5px;">{{ data.name | branchName }}</span>
                        </span>
                         <el-input 
                            v-focus
                            @keyup.enter.native="saveBranch(data)" 
                            @click.stop.native
                            v-show="isinput==data.department_id" v-model="input" 
                            class="branch_input"
                            placeholder="部门名称/回车"></el-input>
                        <p v-show="iscaozuo==data.department_id">
                            <i
                                type="text"
                                size="mini"
                                class="el-icon-edit-outline"
                                @click="redact(data)"
                            >                      
                            </i>
                            <i
                                type="text"
                                size="mini"
                                class="el-icon-circle-plus-outline"
                                v-if="data.feng!=2"
                                @click.stop="append(data)">                      
                            </i>
                            <i
                                type="text"
                                size="mini"
                                class="el-icon-circle-close-outline"
                                v-if="data.parent_id!=0"
                                @click.stop="remove(node, data)">
                    
                            </i>
                        </p>
                    </div>
                </el-tree>
            </div>
            <staff 
            :data2='data2'
            :firmBranch='firmBranch'
            :companyId='companyId'
            :custList='custList'
            :StaffAmout='StaffAmout'
            :departmentManager='departmentManager'
            :dutypeName='dutypeName'
            :departmentID='departmentID'
            :firmparentId='firmparentId'
            @searchCust='searchCust'
            ></staff>
            <post
            :companyId='companyId'
            :postList='postList'
            :departmentID='departmentID'
            ></post>
        </div>
        <firm-message v-show="ismessage"></firm-message>

        <!-- 编辑弹框 -->
        <el-dialog
            title="编辑部门"
            :visible.sync="redactBranchVisible"
            width="600px">
            <div style="padding: 0 60px;">
                <div class="redactBranch" v-if="redactBranch.parent_id!=0">
                    <p>部门名称</p>
                    <el-input v-model="redactBranch.name" placeholder="请输入内容"></el-input>
                </div>
                <div class="redactBranch redactBranch2" v-if="redactBranch.parent_id!=0"> 
                    <p>上级部门</p>
                    <p class="redactBranch-p1" @click="isshowBranchs=!isshowBranchs">{{redactBranch.parent_name}}</p>
                    <i class="el-icon-arrow-down" style="color:#ccc;font-size:14px;"></i>
                    <div v-show="isshowBranchs" class="branchPost2">
                        <el-tree 
                            style="width:100%;padding:20px;" 
                            :data="data2" :props="defaultProps"
                              default-expand-all
                             @node-click="branchNodeClick"></el-tree>
                    </div>
                </div>
                <div class="redactBranch">
                    <p>部门负责人</p>
                     <el-select style="width:100%;height:40px;" v-model="MananerUserId" filterable placeholder="输入关键字搜索">
                        <el-option
                        v-for="item in custList"
                        :key="item.userId"
                        automatic-dropdown
                        :label="item.name"
                        :value="item.userId">
                        </el-option>
                    </el-select>
                </div>
                <div class="redactBranch redactBranch3"> 
                    <p>分管领导</p>
                     <p class="redactBranch-p1" @click="isbranchStaff=!isbranchStaff">
                         {{redactBranch.dutypeName}}
                        <i class="el-icon-arrow-down" style="color:#ccc;font-size:14px;"></i>
                     </p>
                    <!-- <p class="redactBranch-p1" @click="isshowBranchs=!isshowBranchs">{{redactBranch.parent_name}}</p> -->
                    <div v-show="isbranchStaff" class="branchStaff">
                        <div class="staff-top_left">
                            <!-- <i class="el-icon-rank"></i> -->
                            <span>人员</span>              
                            <div class="staff-top_input">
                                <el-input
                                    style="width:250px;"
                                    placeholder="输入姓名"
                                    v-model="seekStaff"
                                >
                                    </el-input>
                                <i class="el-icon-search" @click="searchCust2"></i>
                            </div>
                        </div>
                        <div style="display: flex;width:500px;min-height:300px;">
                            <div>
                                <p style="border-bottom:1px solid #ccc;width:100%; text-align:left;padding-left:20px;border-right:1px solid #ccc;">部门</p>
                                <el-tree 
                                style="width:300px;height:300px;padding:20px;border-right:1px solid #ccc;overflow: auto;" 
                                :data="data2" :props="defaultProps"
                                default-expand-all
                                @node-click="staffNodeClick"></el-tree>
                            </div>
                            <div style="width:200px;">
                                <p style="border-bottom:1px solid #ccc;width:100%; text-align:left;padding-left:20px;">人员</p>
                                <ul>
                                    <li 
                                    v-for="(item3,index3) in optionstsff"
                                    :key="index3"
                                    @click="addStaff(item3)"
                                    >
                                            {{item3.name}}
                                    </li>
                                </ul>
                            </div>
                        </div>
                 
                      
                    </div> 
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="redactBranchVisible = false">取 消</el-button>
                <el-button type="primary" @click="editdepartment">保存</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import FirmMessage from './FirmMessage'
import Post from './Post'
import Staff from './Staff'
import {
    newDepartment,
    editDepartment,
    deleteDepartment ,
    allBranch,
    departmentIdCust,
    setPostMananer,
    listPost,
    selectUserInfo
} from '@/axios/api'
import {getTrees} from '@/js/formatTree.js'
import bus from '@/js/bus.js'
let id = 1000;
    export default {
        name:'Organization',
        components:{
            FirmMessage,
            Post,
            Staff
        },
        data(){
            return{
                input:'',
                isinput:'',
                caozuo:'',
                iscaozuo:1,
                firmparentId:'',//上级部门id
                seekStaff:'',//查询人员
                redactBranch:{},//编辑部门
                isshowBranchs:false,//所有部门
                redactBranchVisible:false,//编辑弹框
                isbranchStaff:false,//部门人员
                StaffAmout:0,//部门人员数量
                custList:[],//部门人员岗位
                newFirmvisible:false,//分公司
                fenFirmName:'',//分公司名字
                firmName:'',//公司名字
                firmBranch:'',//当前页面的部门
                departmentID:'',//当前页面的部门id
                departmentManager:'',//部门负责人
                MananerUserId:'',//部门负责人id
                dutypeId:'',//分管领导id
                dutypeName:'',//分管领导人
                postList:[],//部门岗位
                optionstsff:[],//设置分管领导人员
                isOrganization:true,
                ismessage:false,
                tabPosition:'组织架构',
                bcg:0,
                companyId:'',
                templateCut:[
                    {img:'/static/img/u186.png',text:'组织架构'},
                    {img:'/static/img/u182.png',text:'企业信息'}               
                ],
             
                //公司部门
                data2: [],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                
                list:[
                {id: 1, name: '超级管理', parent_id: 0},
                {id: 2, name: '用户管理', parent_id: 1},
                {id: 3, name: '部门管理', parent_id: 1},
                {id: 4, name: '日志管理', parent_id: 1},
                {id: 5, name: '操作用户', parent_id: 2},
                {id: 6, name: '查看用户', parent_id: 2},
                {id: 7, name: '用户新增', parent_id: 5},
                {id: 8, name: '用户删除', parent_id: 5},
                {id: 9, name: '用户修改', parent_id: 5},
                {id: 10, name: '操控部门', parent_id: 3},
                {id: 11, name: '查看部门', parent_id: 3},
                {id: 12, name: '部门新增', parent_id: 10},
                {id: 13, name: '部门删除', parent_id: 10},
                {id: 14, name: '部门修改', parent_id: 10},
                {id: 15, name: '日志查看', parent_id: 4},
                {id: 16, name: '日志导出', parent_id: 4}
                ],
                result:null,
            }
        },
           directives: {//自动获取焦点
            focus: {
                // 指令的定义
                inserted: function (el) {
                el.focus()
                }
            }
        },
        methods:{
        
            // handleClick(data,event){
            //    this.iscaozuo=data.id
            // },
            //拖拽时判定目标节点能否被放置
            allowDrop(draggingNode, dropNode, type) {
                //  console.log(draggingNode,dropNode,type)
                if (dropNode.data.parent_id ==0||dropNode.data.name === '沸腾鱼色图') {
                return false;
                } else{
                    return true
                }
            },
            //判断节点能否被拖拽
            allowDrag(draggingNode) {
                return draggingNode.data.name.indexOf('沸腾鱼色图') === -1;
                console.log(draggingNode)
            },
            //拖拽成功完成时触发的事件
             handleDrop(draggingNode, dropNode, dropType, ev) {
               if(dropType!='inner'){
                  let name= dropNode.parent.data.name
                  console.log(name)
               }else{
                   let name= dropNode.data.name
                  console.log(name)
               }
                // console.log(dropNode.data.name,this.firmName)
                // console.log('当前拖拽的部门',draggingNode,dropType)
                // console.log('拖拽后的部门',dropNode)
            },
            //拖拽进入其他节点时触发的事件
            handleDragEnter(draggingNode, dropNode, ev) {
                console.log(' enter: ',draggingNode, dropNode);
            },
            //在拖拽节点时触发的事件
            handleNodeOver(draggingNode, dropNode, ev){
                //  console.log('over: ',draggingNode, dropNode);
            },
            //设置上级部门
            branchNodeClick(data){
                console.log(data)
                this.isshowBranchs=false
                this.redactBranch.parent_id=data.department_id
                this.redactBranch.parent_name=data.name       
            },
            //根据编辑部门查人
            staffNodeClick(data){
                // console.log('根据部门查人',data)
                      departmentIdCust({
                      companyId:this.companyId,
                      departmentId: data.department_id,
                      postId:''
                  }).then(res=>{
                      console.log('编辑部门人员',res)
                      if(res.status==200&&res.data.success==true){
                          if(res.data.data.length>0||res.data.data!=null){
                             this.optionstsff=res.data.data
                          }
                      } 
                  })
            },
            //搜索分管领导人员
            searchCust2(){
                if(this.seekStaff!=''||this.seekStaff!=null){
                     selectUserInfo({
                    name:this.seekStaff
                    }).then(res=>{               
                        console.log('搜索分管领导人员',res)
                        if(res.status==200&&res.data.success==true){
                            if(res.data.data.length>0||res.data.data!=null){
                                this.optionstsff=res.data.data
                            }else{
                                    this.$message({
                                        message: '没有该人员',
                                        center: true
                                    });
                            }
                        } 
                    })
                }else{
                    this.$message({
                        message: '姓名不能空',
                        center: true
                    });
                }
               
            },
            //搜索公司人员
            searchCust(seekStaff){
                if(seekStaff!=''||seekStaff!=null){
                     selectUserInfo({
                    name:seekStaff
                    }).then(res=>{               
                        console.log('搜索公司人员',res)
                        if(res.status==200&&res.data.success==true){
                            if(res.data.data.length>0||res.data.data!=null){
                                this.custList=res.data.data
                            }else{
                                    this.$message({
                                        message: '没有该人员',
                                        center: true
                                    });
                            }
                        } 
                    })
                }else{
                      this.$message({
                        message: '姓名不能空',
                        center: true
                    });
                }
               
            },
            //设置分管领导
            addStaff(item){
                console.log(item)
                this.redactBranch.dutypeId=item.userId
                this.isbranchStaff=false
                this.redactBranch.dutypeName=item.name
            },
            //返回企业管理
            returns(){
                this.$router.push('/firm')
            },
            //添加
            append(data) {
            // console.log(data)
            this.input=''
            this.isinput=data.department_id
            this.caozuo='2'
             this.iscaozuo='cz'
            },
            //删除
            remove(node, data) {   
                  this.$confirm('你确定要删除该部门吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                         deleteDepartment({
                            companyId:data.company_id,
                            departmentId:data.department_id
                        }).then(res=>{                       
                            if(res.status==200&&res.data.success==true){
                                 console.log('删除部门',res)
                                  this.$message({
                                    type: 'success',
                                    message: '删除成功',
                                    center: true
                                });
                                this.allBranchs(data.company_id)
                            }else{
                                   this.$message({
                                    message: '删除失败',
                                    center: true
                                });
                            }
                        })  
                  
                    })
                       
                // const parent = node.parent;
                // const children = parent.data.children || parent.data;
                // const index = children.findIndex(d => d.id === data.id);
                // children.splice(index, 1);
            },
            //编辑
            redact(data){
                // console.log(data)
                this.caozuo='1'
                // this.isinput=data.department_id
                // this.input=data.name
                // this.iscaozuo='cz'
                this.redactBranchVisible=true
                this.redactBranch=data
                this.MananerUserId=data.department_manager_id

                console.log(this.custList)
            },
            //保存编辑部门
            editdepartment(){
                editDepartment({
                    departmentId:this.departmentID,
                    departmentName: this.redactBranch.name,
                    parentId: this.redactBranch.parent_id,
                    departmentManagerId:this.MananerUserId,
                    deputyManagerId	:this.redactBranch.dutypeId
                    }).then(res=>{
                        console.log('编辑保存部门',res)
                       if(res.status==200&&res.data.success==true){
                            this.allBranchs(this.companyId)
                            this.redactBranchVisible=false
                              this.$message({
                                    type: 'success',
                                    message: '保存成功',
                                    center: true
                                });
                        }else{
                             this.$message({         
                                    message: '保存失败',
                                    center: true
                                });
                        }
                    })
            },
            //回车
            saveBranch(data){
                console.log(data)
                let sortNumber=1
                let length=0;
                if(data.children.length>0){
                    length=data.children.length-1
                    sortNumber=Number(data.children[length].sort_number)+1
                    // console.log(sortNumber)
                }
                if(this.caozuo==1){
                    this.isinput='cz'
                    editDepartment({
                    companyId:data.company_id,
                     departmentId:data.department_id,
                     name:this.input
                    }).then(res=>{
                        console.log('编辑',res)
                       if(res.status==200){
                            this.allBranchs(data.company_id)

                        }
                    })
                }else{
                     if(this.input==''){
                        this.input='子部门'
                    }                                
                    newDepartment({
                        companyId:data.company_id,
                        parentId:data.department_id,
                        name:this.input,
                        sortNumber
                    }).then(res=>{
                        console.log('添加',res)
                        this.isinput='cz'
                        this.iscaozuo=data.department_id
                        if(res.status==200){
                            this.allBranchs(data.company_id)
                        }
                    })
                
                }
              
            },
            //切换头部的 tab
             onTemplateBtn(id){
                this.bcg=id
                if(id==0){            
                    this.isOrganization=true
                    this.ismessage=false
                }
                else if(id==1){    
                     this.isOrganization=false
                     this.ismessage=true
                }             
            },
            //鼠标移入部门
            enterBrach(data){
                this.iscaozuo=data.department_id
                // if(this.isinput==''){
                // this.iscaozuo=data.department_id
                // }
            },
            //鼠标移出部门
            leveBrach(data){
                this.iscaozuo='zc'
            },
            //点击整个组织架构页面
            onOrganization(){
                this.isinput=''
            },
            //查询部门人员岗位
            branchCust(postId,val){
                 departmentIdCust({
                    companyId:this.companyId,
                    departmentId:this.departmentID,
                    postId:postId,
                    pageSize:'10',
                    pageNo:val
                  }).then(res=>{
                      console.log('部门人员岗位',res)
                      if(res.status==200&&res.data.success==true){
                          if(res.data.data.length>0||res.data.data!=null){
                             this.custList=res.data.data
                            //  this.optionstsff=res.data.data
                             this.StaffAmout=res.data.data.length
                          }
                      } 
                  })
               
            },
            //查询部门岗位
            setBranchMananer(){

                listPost({
                       departmentId: this.departmentID,
                  }).then(res=>{
                      console.log('岗位列表',res)
                        if(res.status==200&&res.data.success==true){
                        
                        if(res.data.data!=null){
                            this.postList=res.data.data
                        }
                    }
                  })
            },
            //点击当前部门
            handleNodeClick(data){
                this.firmBranch=data.name
                this.departmentID=data.department_id
                this.departmentManager=data.department_manager_name
                this.dutypeName=data.dutypeName
                this.dutypeId=data.dutypeId
                this.firmparentId=data.parent_id
                this.branchCust()
                this.setBranchMananer()
                sessionStorage.setItem('departmentId',data.department_id)
                console.log(data)
            },
            //渲染全部部门
            allBranchs(companyId){
                allBranch({
                    companyId
                }).then(res=>{
                    console.log('所有部门',res)
                    if(res.status==200&&res.data.success==true){
                        let list= getTrees(res.data.data,0)
                        this.data2=list
                        list.forEach(item=>{
                            if(item.parent_id==0){
                                this.firmBranch=item.name
                                this.firmName=item.name
                                this.departmentID=item.department_id
                                this.dutypeName=item.dutypeName
                                this.departmentManager=item.department_manager_name
                                this.firmparentId=item.parent_id
                               this.branchCust()
                               this.setBranchMananer()
                               sessionStorage.setItem('departmentId',item.department_id)
                            }
                        })
                    }
                })
            }
        } ,
        filters:{
            branchName(name){
                let names=name
                if(name.length>4){
                    names=name.slice(0,4)+'..'
                }
                return names
               
            },
        },
        created() {
            
        },
        mounted() {
            let companyId=this.$route.params.companyId   
            if(companyId!=undefined||companyId!=null){
                sessionStorage.setItem('companyId',companyId)
            }else{
                 companyId=sessionStorage.getItem('companyId')
            }  
            this.companyId=companyId
            this.allBranchs(companyId)
            bus.$on('branchCust',(postId,val)=>{
                this.branchCust(postId,val)
            })
             bus.$on('allBranchs',(companyId)=>{
                this.allBranchs(companyId)
            })
            bus.$on('setBranchMananer',this.setBranchMananer)
           console.log('公司id',companyId)
        },            
    }
</script>

<style lang="scss">
@import '@/stylecss/main.scss';
    .Organization{
        padding:60px 0 0 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        .Organization-main{
            flex: 1;
            overflow: auto;
            display: flex;
            .Organization-branch{
                // width: 320px;
                // height: 100%;
                flex: 0.2;
                border-right: 1px solid #ccc;
                .branch-top{
                    height: 60px;
                    width: 100%;
                    padding:0 20px;
                    border-bottom: 1px solid #ccc;
                    line-height: 60px;
                    display: flex;
                    justify-content:space-between;
                    align-items: center;
                }
                .custom-tree-node{
                    width: 100%;
                    height: 30px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    position: relative;
                    i{
                        font-size: 20px;
                    }
                     .branch_input{
                        position: absolute;
                        top: 0px;
                        left: 0px;
                        z-index: 999;
                        width: 120px;
                            .el-input__inner{
                               height: 30px;
                               line-height: 30px;
                           }
                    }  
                   
                }
                .branch-name{
                    display: inline-block;
                    // min-width: 100px;
                    height: 30px;
                    display: flex;
                    // justify-content: space-between;
                    align-items: center;
                    overflow: hidden;                 
                }
            }
        }
        .el-tree-node__content{
                height: 30px;
            } 
    //    .el-input__inner{
    //        height: 30px;
    //        line-height: 30px;
    //    }
        .newNav{
            width:100%;
            height:60px;
            background-color:rgb(242, 242, 242);;
            position:fixed;
            top:0;
            left: 0;
            padding:0 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            z-index: 999;   
            border-bottom: 1px solid #ccc;    
        }
          .analyze-cut{
                min-width:100px;
                height: 60px;
                display: flex;
                justify-content: center;
                align-items: center;
                .analyze_type{
                    height: 32px;
                    border-radius: 4px;
                    width: 160px;
                    display: flex;
                    font-size: 14px;
                     border: 1px solid  #ccc;
                    .messge_btn{
                        width:80px;
                        height: 32px;
                        display: flex;
                        align-items: center;
                        justify-content:center;           
                        cursor: pointer;                                                                    
                    }
                    .cutbcg{
                            background-color: $bcg;
                            color:#fff;
                        } 
                    .btnBorder{
                        border-right: 1px solid $bcg;
                    }
                }
            }

        .redactBranch{
            display: flex;
            margin-bottom: 10px;
            position: relative;
            p{
                font-size: 14px;
                width: 120px;
                line-height: 40px;
            }
            .redactBranch-p1{
                width: 100%;
                border:1px solid #dcdfe6;
                border-radius: 4px;
                padding:0 20px;
                margin-left: 2px;
                cursor: pointer;
            
            }
        
           
        }
        .redactBranch2{
             position: relative;
               .branchPost2{
                    display: flex;
                    position:absolute;
                    min-width:282px;
                    height:350px;
                    border: 1px solid #ccc;
                    background: #fff;
                    z-index: 999;
                    top: 50px;
                    left:90px;
                    overflow: auto;           
                }
                    i{
                position: absolute;
                top: 13px;
                right:10px;
            }
        }   
        .redactBranch3{
            position: relative;
            i{
                    position: absolute;
                    top: 13px;
                    right:10px;
                    }
            .branchStaff{
                // display: flex;
                position:absolute;
                width:500px;
                min-height:350px;
                border: 1px solid #ccc;
                background: #fff;
                z-index: 999;
                top: 50px;
                left:-30px;
                // overflow: auto; 
                ul{
                    padding: 20px;
                    width:200px;
                    height:300px;
                    overflow: auto;
                    li{
                        line-height:30px;
                        // padding:0 20px;
                        // border-bottom: 1px solid #ccc;
                        cursor: pointer;
                        &:hover{
                            background: rgb(242, 242, 242);;
                        }
                    }
                }  
                .staff-top_left{
                    height: 60px;
                    width: 100%;
                    display: flex;
                    padding:0 20px;
                    // justify-content:space-between;
                    align-items: center;
                    border-bottom:1px solid #ccc;
                }
                .staff-top_input{
                    position: relative;
                    margin:0 20px;
                    i{
                        position: absolute;
                        top: 12px;
                        right:10px;
                        color: #ccc;
                        cursor: pointer;
                    
                    }
                }
                .el-input__inner{
                    padding-left:20px;
                    padding-right:30px;
                }
            }
           
        }    
    }
</style>