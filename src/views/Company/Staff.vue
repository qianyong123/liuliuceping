<template>
    <div class="staff">
        <div class="staff-top">
            <div class="staff-top_left">
                <i class="el-icon-rank"></i>
                <span style="margin-left:5px;">人员</span>              
                <div class="staff-top_input">
                    <el-input
                        style="width:250px;"
                        placeholder="输入员工姓名"
                        v-model="seekStaff"
                    >
                        </el-input>
                    <i class="el-icon-search" @click="$emit('searchCust',seekStaff)"></i>
                </div>
            </div>
          
            <div>
                <el-button @click="newStaffMessage" type="primary" plain>新建人员</el-button>
                <!-- <el-button @click="inviteVisible=true" type="primary" plain>一键邀请</el-button> -->
            </div>
        </div>
        <!-- <el-button  @click="branckVisible=true" type="primary" style="width:150px;height:40px;margin:20px 0 0 20px;" plain>设置部门负责人</el-button> -->
        <div class="staff-main">    
            <div class="staff-branchs">
                <div class="staff-branch-1" @mouseover="mouseoverBranch(1)" @mouseout="mouseoutBranch">
                    <img src="/static/img/u1181.png" alt="">
                    <div  style="margin-left:20px;">
                        <h3>{{firmBranch}}</h3>
                        <p v-if="firmparentId!=0">部门名称</p>
                        <p v-else>公司名称</p>
                    </div>                  
                    <!-- <div @click="saomaVisible=true" v-show="iszheban==1" class="staff-branch_zheban">
                        <i class="el-icon-rank"></i>
                        扫码快速加入
                    </div> -->
                </div>
                <div  class="staff-branch-1 staff-branch-2" @mouseover="mouseoverBranch(2)" @mouseout="mouseoutBranch">
                    <img src="/static/img/mine.png" alt="">
                    <div style="margin-left:20px;">
                        <h3 v-if="departmentManager!=''">{{departmentManager}}</h3>
                        <p v-else>- -</p>
                        <p v-if="firmparentId!=0">部门负责人</p>
                         <p v-else>公司负责人</p>
                    </div>
                     <!-- <div @click="branckVisible=true" v-show="iszheban==2" class="staff-branch_zheban">
                        <i class="el-icon-setting"></i>设置部门负责人
                    </div> -->
                </div>
                <div  class="staff-branch-1" @mouseover="mouseoverBranch(3)" @mouseout="mouseoutBranch">
                    <img src="/static/img/mine.png" alt="">
                    <div style="margin-left:20px;">
                        <h3 v-if="dutypeName!=''">{{dutypeName}}</h3>
                        <p v-else>- -</p>
                        <p>分管领导</p>
                    </div>              
                    <!-- <div v-show="iszheban==3" class="staff-branch_zheban">
                        <i class="el-icon-setting"></i>
                        设置部门领导
                    </div> -->
                </div>
            </div>
            <div @click="visible=false" style="flex:1;">
                  <el-table
                    ref="multipleTable"
                    :data="custList"
                    tooltip-effect="dark"
                    style="width: 100%;min-height:300px;"
                    @cell-mouse-enter='enterTable'
                    @cell-mouse-leave='leaveTable'
                    @selection-change="handleSelectionChange">   
                        <el-table-column
                        type="index"
                        width="20">
                        </el-table-column>                                                     
                        <el-table-column
                        type="selection"
                        >
                        </el-table-column>                               
                                    
                            <el-table-column
                        prop="name"
                        label="姓名"
                        >
                        </el-table-column>

                        <el-table-column
                        prop="jobNmber"
                        label="工号"                       
                        >
                         <template slot-scope="scope">
                            <p v-if="(scope.row).jobNmber!=''" style="font-size:12px;">{{(scope.row).jobNmber}}</p>  
                            <p v-else style="font-size:12px;">- -</p>                        
                        </template>
                        </el-table-column>
                
                        <el-table-column
                        prop="postName"
                        label="岗位"
                        width="170px"
                        >
                        <template slot-scope="scope">
                            <p  style="font-size:12px;">{{(scope.row) | postName}}</p>                        
                        </template>
                        </el-table-column>

                        <el-table-column
                        prop="username"
                        label="手机"
                        width="140px"
                        >
                        </el-table-column>

                        <el-table-column
                        prop="userState"
                        label="状态"       
                        >
                        <template slot-scope="scope">
                            <p v-if="(scope.row).userState==1" style="font-size:12px;">正常</p>
                            <span v-if="(scope.row).userState==2" class="diaocha">尚未激活</span>
                            <p v-if="(scope.row).userState==3" style="font-size:12px;">离职</p>
                            <p v-if="(scope.row).userState==4" style="font-size:12px;">锁定</p>
                        </template>
                        </el-table-column>
                                                                    
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-popover
                                placement="left"
                                width="100"
                                v-model="visible"   
                                v-if="(scope.row).userId==iscaozuo"                     
                                trigger="manual">
                                <div>
                                    <p
                                    v-for="(item,index) in caozuo"
                                    :key="index"
                                    class="staff-caozuo"
                                    @click="caozuoStatus(index+1,scope.row)"                            
                                    >
                                        {{item}}
                                    </p>                               
                                </div>
                        
                                <!-- <el-button slot="reference">click 激活</el-button> -->
                                <i  slot="reference" @click.stop="oncaozuo(scope.$index, scope.row)" class="el-icon-more" style="font-size:24px;"></i>                            
                                </el-popover>
                            <i v-else class="el-icon-more" style="font-size:24px;"></i>    
                            </template>
                        </el-table-column>                      
                    
                </el-table>
                <el-pagination
                v-if="StaffAmout>0"
                style="margin-top:20px;"
                @current-change="handleStaff"
                :pager-count='5'
                :page-size='page'
                :current-page='currentpage'
                background
                layout="prev, pager, next"
                :total="StaffAmout">
                </el-pagination>
            </div>
        </div>
        <!-- 新建人员弹框 -->
        <el-dialog
            :title="firmStaff"
            :visible.sync="newStaffVisible"
            width="600px"
            >
            <div 
            class="firm-register_message"
            v-for="(item,index) in newstaff"
            :key="index"
            @click="hidebranchPos"
            >
                <p>{{item.text}}</p>
                <div v-if="firmStaff=='新建人员'">
                    <el-input
                    v-if="item.type=='number'"
                    :placeholder="'请输入'+item.text"
                    v-model="newsStaff[index]"
                    style="width:300px;"
                    clearable>
                    </el-input>
                </div>
                <div v-else-if="firmStaff=='编辑人员'">
                    <p v-if="item.type=='number'" style="width:100%;padding:0;margin:0;">
                        {{newsStaff[index]}}
                        <span style="font-size:12px;margin-left:10px;color:#ccc;">无法修改手机号，可以重新新建人员!</span>
                    </p>
                    <!-- <el-input
                    v-if="item.type=='number'"
                    :placeholder="'请输入'+item.text"
                    v-model="newsStaff[index]"
                    style="width:300px;"
                    clearable>
                    </el-input> -->
                </div>
                <el-input
                v-if="item.type==1"
                :placeholder="'请输入'+item.text"
                v-model="newsStaff[index]"
                style="width:300px;"
                clearable>
                </el-input>         
                <div v-if="item.type==5" class="set-branch" @click.stop="showBranch" style="width:217px; cursor: pointer;">
                    <span>{{pitchBrachName| branchName2}}</span>
                    <i class="el-icon-arrow-down" style="color:#ccc;font-size:14px;"></i>
                    <div v-show="isshowBranchs" class="branchPost" style="width:300px;left:-1px;">
                        <el-tree 
                            style="width:100%;padding:20px;" 
                            :data="data2" :props="defaultProps"
                              default-expand-all
                             @node-click="branchNodeClick"></el-tree>
                    </div>
                </div>     
                <el-select v-if="item.type==2" v-model="setBranch"   @change="onZhuPost" placeholder="请选择主岗">
                    <el-option
                    v-for="(post,postindex) in options1"
                    :key="postindex"
                    @change="onZhuPost(post)"
                    :label="post.name"
                    :value="post.postId">
                    </el-option>
                </el-select>
                <div class="set-branch" v-if="item.type==3">
                    <!-- <p style="width:100%;text-align:left;margin-right:10px;line-height:26px;">手电筒色色软通，他而是同时他s </p> -->
                    <div class="set-branch_2">
                        <span 
                        v-for="(item2,index2) in setBranch2List"
                        :key="index2"
                        >
                            {{item2.postName}}
                             <i @click="deleteFuPost(index2)" style="font-size:12px;" class="el-icon-error"></i>
                        </span>
                    </div>
                    <span>
                        <i @click.stop="onfubrnch" class="el-icon-plus"></i>
                        <!-- <i class="el-icon-circle-close-outline"></i> -->
                    </span>
                    <div v-show="isbranchPost" class="branchPost">
                        <div>
                            <p style="border-bottom:1px solid #ccc;width:100%; text-align:left;padding-left:20px;border-right:1px solid #ccc;">部门</p>
                            <el-tree 
                            style="width:300px;min-height:300px;padding:20px;border-right:1px solid #ccc;" 
                            :data="data2" :props="defaultProps"
                              default-expand-all
                             @node-click="postNodeClick"></el-tree>
                        </div>
                        <div style="width:260px;">
                            <p style="border-bottom:1px solid #ccc;width:100%; text-align:left;padding-left:20px;">岗位</p>
                            <ul>
                           <li 
                           v-for="(item3,index3) in optionsbranch"
                           :key="index3"
                           @click="addFuPost(item3)"
                           >
                                {{item3.name}}
                           </li>
                            </ul>
                        </div>
                      
                    </div>                            
                </div>
               
                <el-date-picker
                    v-model="times"
                    type="date"
                     v-if="item.type==4"
                    placeholder="选择日期">
                    </el-date-picker>
            </div>
            <p v-if="isnewcuowu" style="color:#f00;font-size:12px;margin-left:100px;">{{newcuowu}}</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="newStaffVisible = false">取 消</el-button>
                <el-button type="primary" @click="newMessage">保存</el-button>
            </span>
        </el-dialog>

        <!-- 一键邀请弹框 -->
        <el-dialog
        title="一键邀请"
        :visible.sync="inviteVisible"
        width="600px"
        >
        <div style="margin-left:100px;height:100px">
             <h3>短信激活</h3>
            <p style="margin-top:20px;color:#ccc;">发送短信邀请用户注册管事通账号并同意加入我公司</p>
        </div>      
        <span slot="footer" class="dialog-footer">
            <el-button @click="inviteVisible = false">取 消</el-button>
            <el-button type="primary" @click="inviteVisible = false">确 定</el-button>
        </span>
        </el-dialog>
        <!-- 扫描二维码加入部门 -->
        <el-dialog
            :title="firmBranch"
            :visible.sync="saomaVisible"
             width="600px"
            >
           <div style="min-height:200px;padding-left:100px;">
               <img style="height:200px;margin-bottom:20px;" src="/static/img/u1181.png" alt="">
               <p style="color:#ccc;padding-left:20px;">扫码二维码快速加入部门</p>
           </div>
            <span slot="footer" class="dialog-footer">
                <!-- <el-button @click="saomaVisible = false">关闭</el-button> -->
                <el-button type="primary" @click="saomaVisible = false">关闭</el-button>
            </span>
            </el-dialog>
        <!-- 设置部门负责人 -->
         <el-dialog
            title="设置直接领导"
            :visible.sync="branckVisible"
            width="450px"
            >      
             <div style="height:120px; display: flex;justify-content:center;align-items: center;">
                 <p style="margin-right:10px;">直接领导：</p>
                 <el-select v-focus  v-model="setLead" filterable placeholder="输入关键字搜索">
                    <el-option
                    v-for="item in custList"
                    :key="item.userId"
                    automatic-dropdown
                    :label="item.name"
                    :value="item.userId">
                    </el-option>
                </el-select>
             </div>             
            <span slot="footer" class="dialog-footer">
                <el-button @click="branckVisible = false">取 消</el-button>
                <el-button type="primary" @click="setMananers">保存</el-button>
            </span>
        </el-dialog>

          <!-- 设置岗位 -->

    </div>
</template>

<script>
import {getTrees} from '@/js/formatTree.js'
import { formatDate } from '@/js/date.js'
import bus from '@/js/bus.js'
import { 
    createUser,
    deleteUser,
    dimissionUser,
    setMananer,
    getUserinfo,
    listPost,
    ediUserinfo,
    selectUserInfo,
    setUserLeader
 } from '@/axios/api'
    export default {
        props:[
            'data2',
            'firmBranch',
            'companyId',
            'departmentID',
            'custList',
            'StaffAmout',
            'setMananer',
            'departmentManager',
            'dutypeName',
            'firmparentId'
        ],
        name:'Staff',
        data(){
            return{
                seekStaff:'',
                iszheban:0,
                visible:false,
                iscaozuo:1,
                newStaffVisible:false,
                postId:'',//岗位id
                page:10,//显示人员条数
                currentpage:1,//当前的页码

                //新建人员
                newsStaff:['','','',''],
                ediuserId:'',
                setBranch2:'', //副岗
                departmentId:'',//选副岗部门的id
                pitchBrachName:'',//选主岗选中的部门
                pitchBrachId:'',//选主岗选中的id
                setBranch2List:[
                    
                ],
                times:'',
                isshowBranchs:false,//显示部门
                setBranch:'',   //主岗
                isSetPost:false, //显示部门岗位
                newcuowu:'',//错误
                isnewcuowu:false,//错误
                isbranchPost:false,//副岗框
                firmStaff:'新建人员',//新建弹框title            
                     
                 defaultProps: {
                children: 'children',
                label: 'name'
                },
                optionsbranch: [
                    {
                    id: '1',
                    name: '黄金糕'
                    }, {
                    id: '2',
                    name: '双皮奶'
                    }, {
                    id: '3',
                    name: '蚵仔煎'
                    }, {
                    id: '4',
                    name: '龙须面'
                    }, {
                    id: '5',
                    name: '北京烤鸭'
                    },
                                   
                    ],
                //邀请
                inviteVisible:false,
                //设置直接领导
                branckVisible:false,
                setLead:'',
                MananerUserId:'',//操作选中人员id
                //设置人员岗位
                setPostVisible:false,
                //扫码加入部门
                saomaVisible:false,
                options: [
                    {
                    value: '选项1',
                    label: '黄金糕'
                    }, {
                    value: '选项2',
                    label: '双皮奶'
                    }, {
                    value: '选项3',
                    label: '蚵仔煎'
                    }, {
                    value: '选项4',
                    label: '龙须面'
                    }, {
                    value: '选项5',
                    label: '北京烤鸭'
                    },                  
                    ],
                value8: '',

                newstaff:[
                    {text:'姓名',type:1},
                    {text:'手机',type:'number'},
                    {text:'邮箱',type:1},
                    {text:'工号',type:1},
                    {text:'部门',type:5},
                    {text:'主岗',type:2},                   
                    {text:'副岗',type:3},
                    {text:'入职时间',type:4},
                                    
                ],
               
                options1: [{
                    value: '1',
                    label: '黄金糕'
                    }, {
                    value: '2',
                    label: '双皮奶'
                    }, {
                    value: '3',
                    label: '蚵仔煎'
                    }, {
                    value: '4',
                    label: '龙须面'
                    }, {
                    value: '5',
                    label: '北京烤鸭'
                }],
                caozuo:[
                    // '设置岗位',
                    '编辑',
                    '离职',
                    '删除',
                    '直接领导'
                ],
                 tableData3: [ ],
                    multipleSelection: []
            }
        },
        methods:{
            //新建部门人员
            newStaffMessage(){
                this.newsStaff=['','','']
                this.setBranch=''
                this.setBranch2=''
                this.setBranch2List=[]
                this.newStaffVisible=true
                this.isnewcuowu=false
                this.pitchBrachName=this.firmBranch//默认部门名字
                this.departmentId=this.departmentID//副岗默认部门id
                console.log(this.departmentID)
                this.pitchBrachId=this.departmentID//主岗默认部门id
                this.firmStaff='新建人员'
                this.times=new Date()
                this.stafflistPost(this.departmentID,1)
                this.stafflistPost(this.departmentID,2)
            },
            //查询新建人员主岗位
            stafflistPost(departmentId,type){
                 listPost({
                       departmentId
                  }).then(res=>{
                      console.log('岗位列表',res)
                        if(res.status==200&&res.data.success==true){
                        
                        if(res.data.data!=null){
                            if(type==1){
                                 this.options1=res.data.data
                                 let postIds=res.data.data.filter((data)=>{
                                     return data.postId==this.setBranch
                                 })
                                 if(postIds.length>0){
                                     return
                                 }else{
                                     this.setBranch=''
                                 }
                            }
                            else if(type==2){
                               this.optionsbranch=res.data.data
                            }
                           
                        }
                    }
                  })
            },
            //设置部门
            showBranch(){
                this.isshowBranchs=!this.isshowBranchs
            },
            //新建人员副岗
            onfubrnch(){
               this.isbranchPost=!this.isbranchPost
            },
            //删除副岗
            deleteFuPost(id){
                this.setBranch2List.splice(id,1)
            },
            //添加副岗
            addFuPost(item){
                let names= this.setBranch2List.filter( data=>{
                     return data.postName==item.name
                 })
                 if(names.length>0){
                     return
                 }
                 else
                 this.setBranch2List.push({departmentId:this.departmentId,postId:item.postId,postName:item.name,isMain:2})
            },
            //隐藏副岗框
            hidebranchPos(){
                 this.isbranchPost=false
                  this.isshowBranchs=false
            },
            //点击新建人员里面主岗部门
            branchNodeClick(data) {
                    // console.log(data);
                    this.pitchBrachName=data.name
                    this.pitchBrachId=data.department_id
                    this.isshowBranchs=false
                    this.stafflistPost(data.department_id,1)
            },
            //选中新建人员主岗
            onZhuPost(){
                console.log(this.setBranch)
            },
             //点击新建人员副岗部门显示岗位
            postNodeClick(data) {
                    this.departmentId=data.department_id
                    console.log(data);
                     this.stafflistPost(data.department_id,2)
                    // this.pitchBrachName=data.name
                    // this.pitchBrachId=data.department_id
                    // this.isshowBranchs=false
            },
            handleNodeClick(data){
                  console.log(data);
            },
       
            //保存新建人员
             newMessage(){
             
                let time=formatDate(this.times,'yyyy-MM-dd')
                let zhubranch={departmentId:this.pitchBrachId,postId:this.setBranch,name:this.pitchBrachName,isMain:1}
                console.log(this.newsStaff,this.setBranch2List,this.pitchBrachId,this.setBranch)
                let number=/^1[3456789]\d{9}$/,
                    name=/^[a-zA-Z_\u4e00-\u9fa5]{1,8}$/,
                    text=/^[\w]{2,16}$/;
                    if(number.test(this.newsStaff[1])&&name.test(this.newsStaff[0])){
                        // this.$message({
                        //         message: '新建人员成功',
                        //         type:'success',
                        //         center: true
                        //         }); 
                        this.isnewcuowu=false
                        this.newStaffVisible=false
                        this.setBranch2List.push(zhubranch)
                        if( this.firmStaff=='新建人员'){
                              createUser({
                            companyId:this.companyId,
                            username:this.newsStaff[1],
                            name:this.newsStaff[0],
                            email:this.newsStaff[2],
                            jobNumber:this.newsStaff[3],
                            hireDate:time,
                             branchPostList:this.setBranch2List          
                            }).then(res=>{
                                console.log('新建人员',res)
                                if(res.status==200&&res.data.success==true){
                                    bus.$emit('branchCust')
                                    this.$message({
                                            type: 'success',
                                            message: '新建成功',
                                            center: true
                                        });                         
                                }else{
                                    this.$message({
                                            message:'新建失败',
                                            center: true
                                        });
                                }
                            })
                        }
                        else if(this.firmStaff=='编辑人员'){
                             ediUserinfo({
                                companyId:this.companyId,
                                username:this.newsStaff[1],
                                name:this.newsStaff[0],
                                jobNumber:this.newsStaff[3],
                                hireDate:time,
                                userId:this.ediuserId,
                                branchPostList:this.setBranch2List   
                             }).then(res=>{
                                console.log('修改人员信息',res)
                                  if(res.status==200&&res.data.success==true){
                                    bus.$emit('branchCust')
                                    this.$message({
                                            type: 'success',
                                            message: '修改成功',
                                            center: true
                                        });                         
                                }else{
                                    this.$message({
                                            message:'修改失败',
                                            center: true
                                        });
                                }
                            })
                        }
                       
                       
                    }
                    else if(!number.test(this.newsStaff[0])){
                        this.isnewcuowu=true
                        this.newcuowu='请输入11位手机号码'
                    }
                    else if(!name.test(this.newsStaff[1])){
                        this.isnewcuowu=true
                        this.newcuowu='请输入正确的姓名'
                    }
                    else if(!text.test(this.newsStaff[2])){
                        this.isnewcuowu=true
                        this.newcuowu='请输入正确的格式'
                    }
                   
             },
             //设置直接领导
             setMananers(){
                  this.branckVisible=false
                 setUserLeader({
                    LeaderId:this.setLead,
                    userId:this.MananerUserId
                 }).then(res=>{
                     console.log('设置直接领导',res)
                     if(res.status==200){
                         if(res.data.success==true){
                            // bus.$emit('setBranchMananer') 
                            this.$message({
                                    type: 'success',
                                    message: '设置成功!',
                                center: true
                                }); 
                            //    this.MananerUserId=''
                         }else{
                             this.$message({
                                    message:res.data.message,
                                    center: true
                                }); 
                         }
                                           
                     }
                 })
             },
            //鼠标移入
            mouseoverBranch(val){
                this.iszheban=val
            },
            //鼠标移出
            mouseoutBranch(){
                 this.iszheban=0
            },
            //选人员
            handleSelectionChange(val) {
                this.multipleSelection = val;
                console.log(val)
            },
            //显示操作
            oncaozuo(index,row){
                // console.log(index,row)
                 this.visible=true
                 this.iscaozuo=row.userId
                 this.MananerUserId=row.userId
                 console.log(row)
            },
            //人员操作
            caozuoStatus(index,row){
                this.visible=false  
                // if(index==1){
                //     this.setPostVisible=true
                // } 
                if(index==1){
                    getUserinfo({ userId:row.userId}).then(res=>{
                        console.log('获取人员信息',res)
                        if(res.status==200&&res.data.success==true){
                            this.newsStaff=[res.data.data.name,res.data.data.username,res.data.data.email!=undefined?res.data.data:'',res.data.data.job_number]
                            this.setBranch=res.data.data.postId //主岗ID
                            // this.setBranch2=res.data.data.postName//主岗名字
                            this.setBranch2List=res.data.data.deputyPost
                            var d=new Date(res.data.data.hire_date)
                            let t = d.getTime(d)
                            let tt=new Date(t)
                            this.times=tt       
                            this.newStaffVisible=true
                            this.isnewcuowu=false
                            this.pitchBrachName=res.data.data.departmentName//默认部门名字           
                            this.pitchBrachId=res.data.data.departmentId//主岗默认部门id
                            this.stafflistPost(res.data.data.departmentId,1)
                            this.stafflistPost(res.data.data.departmentId,2)
                        }else{
                         this.$message({                          
                            message: '获取人员信息失败',
                            center: true
                            });
                        }
                    })
                    this.ediuserId=row.userId
                    this.newStaffVisible=true
                    this.firmStaff='编辑人员'
                }
                else if(index==2){
                     this.$confirm('你确定要将该人员设为离职吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                         dimissionUser({
                            companyId:this.companyId,
                            userId:row.userId
                        }).then(res=>{
                            console.log('离职人员',res)
                            if(res.status==200&&res.data.success==true){
                                bus.$emit('branchCust')
                                this.$message({
                                type: 'success',
                                message: '离职成功!',
                                center: true
                                });
                            }
                           
                        })
                       
                    }).catch(() => {
                        console.log('取消离职')        
                    });
                }
                  else if(index==3){
                    this.$confirm('你确定要将该人员删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        console.log(row)
                        deleteUser({
                            companyId:this.companyId,
                            userId:row.userId
                        }).then(res=>{
                            console.log('删除人员',res)
                            if(res.status==200&&res.data.success==true){
                            let departmentId=sessionStorage.getItem('departmentId')
                               this.$message({
                                    type: 'success',
                                    message: '删除成功!',
                                    center: true
                                });
                                bus.$emit('branchCust')
                                if(row.name==this.departmentManager||row.name==this.dutypeName){
                                    bus.$emit('allBranchs',this.companyId)
                                    console.log(this.companyId)
                                }                             
                            }
                        })
                    }).catch(() => {
                        console.log('取消删除')        
                    });
                }
                else if(index==4){
                    this.branckVisible=true
                }
                console.log(index,row)
            },
            //鼠标移到单元格
            enterTable(val){
                // console.log(val)
                this.visible=false   
                this.iscaozuo=val.userId
            },
            //鼠标移出单元格
            leaveTable(){
                // this.iscaozuo=9988
            },
            setPost(){
                this.setPostVisible=false
            },
            //岗位id
            getpostid(postId){
                this.postId=postId
                console.log('岗位id',postId)
            },
            //分页显示人员
            handleStaff(val){
                this.currentpage=val
                console.log(val)
                 bus.$emit('branchCust',this.postId,val)
            }
        },
        filters:{
            branchName(name){
                let names=name
                if(name.length>8){
                    names=name.slice(0,8)+'..'
                }
                return names
               
            },
             branchName2(name){
                let names=name
                if(name.length>10){
                    names=name.slice(0,10)+'..'
                }
                return names
               
            },
            postName(name){
                let names=''            
                    if(name.postName!=''){
                        names=name.postName
                    }else{
                        names='- -'
                    }
                
                return names
            }
        },
        mounted() {
              bus.$on('getpostid',(postId)=>{
                  this.getpostid(postId)
              })
        },
        directives: {//自动获取焦点
            focus: {
                // 指令的定义
                inserted: function (el) {
                el.focus()
                }
            },
        }
    }
</script>

<style lang="scss">
    .staff{
       flex:0.6;
       border-right:1px solid #ccc; 
       display: flex;
       flex-direction: column;
        //新建弹框
      .el-dialog__header{
            border-bottom: 1px solid #ccc;
            padding:20px 50px;
        }
        .el-dialog__footer{
            border-top: 1px solid #ccc;
            padding:20px 50px;
        }
        .el-dialog__body{
            padding:30px 50px;
        }
    }
    .staff-top{
        height: 60px;
        border-bottom: 1px solid #ccc;
        display: flex;
        padding:0 20px;
         justify-content:space-between;
        align-items: center;
        .staff-top_left{
             display: flex;
            justify-content:space-between;
            align-items: center;
        }
        .staff-top_input{
            position: relative;
            margin:0 30px;
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
    .staff-main{
        padding: 20px;
        flex:1;
        display: flex;
        flex-direction: column;
        overflow: auto;
        .staff-branchs{
            width:100%;
            min-height: 100px;     
            display:flex;  
            border: 1px solid #ccc;
            border-radius: 4px;
            margin-bottom: 20px;
            font-size: 14px;
            .staff-branch-1{              
                flex: 1;         
                display: flex;          
                align-items: center;
                position: relative; 
                padding-left: 20px;
                h3{
                    line-height: 22px;
                }
                p{
                    margin-top: 10px;
                }
                .staff-branch_zheban{
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    top:0;
                    left: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: #fff;
                    background:rgba($color: #000000, $alpha:0.4);
                    i{
                        font-size:30px;
                        margin-right: 10px;
                    }
                }
            }
            .staff-branch-2{
                border-left: 1px solid #ccc;
                 border-right: 1px solid #ccc;
            }
         
        }
        .diaocha{
            display: inline-block;
            background:#f56c6c;
            color: #fff;
            width:70px;
            height: 24px;
            line-height: 24px;
            text-align: center;   
            cursor: pointer;   
            border-radius: 4px;   
            font-size: 12px;
        }

    }
    .staff-caozuo{
            font-size: 14px;
            line-height:26px;
            text-align: center;
            // border-bottom: 1px solid #ccc;
            cursor: pointer;
            &:hover{
                background: rgba(0, 0, 0,0.1)
            }
        }
   
     .firm-register_message{
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            p{
                width:80px;
                text-align: right;
                margin-right: 20px;
                line-height: 40px;
            }
            .set-branch{
                min-height: 40px;
                border-radius: 4px;
                border: 1px solid #ccc;
                width:300px;
                padding:0 10px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                position: relative;
                span{
                    display: inline-block;
                    // overflow: hidden;
                    // line-height: 40px;
                   
                }
                .set-branch_2{
                    min-height: 40px;
                    width:250px;
                    border-right: 1px solid #ccc;
                    // position:absolute;
                    // top: 0px;
                    // left: 0px;
                    display: flex;
                    align-items: center;
                    flex-wrap :wrap;
                    span{
                        border: 1px solid #ccc;
                        border-radius: 3px;
                        padding:5px 5px 5px 10px;
                        font-size: 12px;
                        margin:5px 3px;
                    }
                }
                i{
                    font-weight: 800px;
                    font-size: 20px;
                    cursor: pointer;
                }
                .branchPost{
                    display: flex;
                    position:absolute;
                    // min-width: 500px;
                    height:350px;
                    border: 1px solid #ccc;
                    background: #fff;
                    z-index: 999;
                    top: 50px;
                    left: -130px;
                    overflow: auto;
                    ul{
                        padding: 20px;
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
                }
            }
        }
    
</style>