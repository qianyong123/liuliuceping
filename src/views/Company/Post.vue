<template>
    <div class="firm-post">
        <div class="post-top">
             <div>
                    <i class="el-icon-rank"></i>
                    <span>岗位</span>
                </div>
             <el-button @click="onrankVisible" type="primary" plain>职级</el-button>
        </div>
        <div style="padding:20px;">
            <el-button  @click="onbranchVisible" type="primary" plain style="width:100%;margin-bottom:20px;">新建岗位</el-button>
            <div>
                <div 
                class="firm-allPost"             
                v-for="post in postList"
                :key="post.postId"
                @mouseover="postover(post.postId)"
                @click="clickPost(post.postId)"
                @mouseout="postout"
                >
                    <span>
                        <!-- <span>1</span> -->
                        <span style="margin-left:10px;">{{post.name}}</span>
                    </span>  
                    <div>
                        <!-- <span v-if="ispostNumber!=post.postId" class="postNumber">{{post.userNum}}</span> -->
                        <i class="el-icon-edit-outline" @click="postCaozuo(post)"></i>                     
                    </div>                                  
                </div>
            </div>
        </div>
         <!-- 新建岗位弹框 -->
        <el-dialog
            title="新建岗位"
             width="450px"
            :visible.sync="branchVisible">
            <div class="firm-register_message">
                <p>岗位</p>
                <el-input
                placeholder="请输入岗位名称"
                v-model="postName"
                style="width:217px;"
                clearable>
                </el-input>
            </div>
             <div class="firm-register_message">
                <p>职级</p>
                <template>
                    <el-select v-model="valuerankId" placeholder="请选择职级">
                        <el-option
                        v-for="item in rankList"
                        :key="item.value"
                        :label="item.name"
                        :value="item.rankId">
                        </el-option>
                    </el-select>
                </template>
             </div>
               
            <span slot="footer" class="dialog-footer">
                <el-button @click="branchVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveNewPost">保存</el-button>
            </span>
        </el-dialog>
         <!-- 编辑岗位弹框 -->
        <el-dialog
            title="编辑岗位"
             width="450px"
            :visible.sync="RdactPostVisible">
            <div class="firm-register_message">
                <p>岗位</p>
                <el-input
                placeholder="请输入岗位名称"
                v-model="postName"
                style="width:217px;"
                clearable>
                </el-input>
            </div>
             <div class="firm-register_message">
                <p>职级</p>
                <template>
                    <el-select v-model="valuerankId" placeholder="请选择职级">
                        <el-option
                        v-for="item in rankList"
                        :key="item.value"
                        :label="item.name"
                        :value="item.rankId">
                        </el-option>
                    </el-select>
                </template>
             </div>
               
            <span slot="footer" class="dialog-footer">
                <el-button @click.stop="deletePosts">删除岗位</el-button>
                <el-button type="primary" @click="saveRdactPost">保存编辑</el-button>
            </span>
        </el-dialog>
        <!-- 职级弹框 -->
         <el-dialog
            title="职级管理"
            width="500px"
            :visible.sync="rankVisible">      
             <div class="firm-register_post">
                <p @click="addRank">添加职级</p>
               <ul>
                   <li 
                   v-for="(item,index) in rankList"
                   class="firm-rank"                
                   :class="{rankborder:rankList.length==index}"
                   @click="onRank(index)"
                   :key="index">
                       <el-input  style="width:70px;margin-right:10px;" v-model="rankList[index].sortNumber" placeholder="序号"></el-input>
                       <el-input style="width:214px;margin-right:5px;" v-model="item.name" placeholder="请输入职级名称"></el-input>
                       <div v-if="postIndex==index" style="display: flex;align-items: center;">
                            <i @click="saveRank(item)" class="el-icon-success" style="color:rgba(48, 152, 94, 0.8);"></i>
                            <i @click="deleteRank(item,index)" class="el-icon-error" style="color:rgba(203, 54, 31, 0.8);"></i>
                       </div>
                      
                   </li>
               </ul>
             </div>
               
            <span slot="footer" class="dialog-footer">
                <!-- <el-button @click="rankVisible = false">完成</el-button> -->
                <el-button type="primary" @click="rankVisible = false">关闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {newRank,listRank,deleteRank,editRank,newPost,deletePost,editPost} from '@/axios/api'
import bus from '@/js/bus.js'
    export default {
        name:'Staff',
        props:['companyId','postList','departmentID'],
        data(){
            return{
                 //新建岗位
                branchVisible:false,//新建岗位
                RdactPostVisible:false,//编辑岗位
                ispostNumber:'ll',
                postIndex:0,
                postName:'',
                postId:'',
                valuerankId:'',//职级id
                options1: [{
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
                }],
                //职级,
                rankVisible:false,
                rankList:[                  
                
                ]
            }
        },
        methods:{
            //添加职级
            addRank(){
                let sortNumber=this.rankList.length+1
                this.rankList.push( {sortNumber:'',name:''})
               
            },
            //点击职级
            onrankVisible(){
                this.rankVisible=true
                this.ranklists()
            },
            //点击新建岗位
            onbranchVisible(){
                this.branchVisible=true
                this.ranklists()
                this.postName=''
                this.valuerankId=''
            },
            //点击inpit显示操作
            onRank(index){
                this.postIndex=index
            },
            //职级列表
            ranklists(){
                listRank().then(res=>{
                    console.log('职级列表',res)
                    if(res.status==200&&res.data.success==true){
                        this.rankList=res.data.data
                    }
                })
            },
            //保存职级
            saveRank(item){
                console.log(item)
                let name=item.name,
                    sortNumber=item.sortNumber,
                    rankId=item.rankId,
                    Numbers=/^[\d]{1,5}$/,
                    names=/^[\w_\u4e00-\u9fa5]{1,10}$/;
                
                if(!Numbers.test(sortNumber)){
                     this.$message({
                    message: '请输入序号1~5位数字',
                    center: true
                    });
                }
                else if(!names.test(name)){
                     this.$message({
                    message: '请输入职级名称1~10位',
                    type: 'warning',
                    center: true
                    });
                }
                else if(Numbers.test(sortNumber)&&names.test(name)){
                    console.log(item.rankId)
                    if(item.rankId==undefined||item.rankId==null){
                          //新建职级
                        newRank({
                            name,
                            sortNumber
                        }).then(res=>{
                            console.log('新建职级',res)
                            if(res.status==200){
                                if(res.data.success==true){
                                    this.$message({
                                        message: '保存成功',
                                        type: 'success',
                                        center: true
                                        });
                                this.ranklists()
                                this.postIndex='ll'
                                }else{
                                    this.$message({
                                        message: '保存失败',                               
                                        center: true
                                        });
                                }
                            }
                        })
                    }else{
                        //修改职级
                        editRank({
                            name,
                            sortNumber,
                            rankId:item.rankId
                        }).then(res=>{
                            console.log('修改职级',res)
                            if(res.status==200){
                                if(res.data.success==true){
                                    this.$message({
                                        message: '保存成功',
                                        type: 'success',
                                        center: true
                                        });
                                this.ranklists()
                                this.postIndex='ll'
                                }else{
                                    this.$message({
                                        message: '保存失败',                               
                                        center: true
                                        });
                                }
                            }
                        })
                    }              
                  
                }
              
            },
            //删除职级
            deleteRank(item,index){
                if(item.rankId==undefined||item.rankId==null){
                    this.rankList.splice(index,1)
                }else{
                     this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                        }).then(() => {
                            deleteRank({
                                rankId:item.rankId
                            }).then(res=>{
                                console.log('删除职级',res)
                                if(res.status==200&&res.data.success==true){
                                    this.$message({
                                            message: '删除成功',
                                            type: 'success',
                                            center: true
                                            });
                                    this.ranklists()
                                        this.postIndex='ll'
                                }else{
                                    this.$message({
                                            message: '删除失败',                               
                                            center: true
                                            });
                                }
                            })
                        }).catch(() => {
                             console.log('取消删除')
                        });
                
                }
            },
            //新建岗位
            saveNewPost(){
                if(this.postName!=''&&this.postName.length<11){
                    newPost({
                    name:this.postName,
                    departmentId:this.departmentID,
                    rankId:this.valuerankId
                    }).then(res=>{
                        console.log('保存岗位',res)
                        if(res.status==200&&res.data.success==true){
                            this.branchVisible=false
                            bus.$emit('setBranchMananer')
                            this.postName=''
                            this.valuerankId=''
                            this.$message({
                                message: '保存成功',
                                type: 'success',
                                center: true
                                });
                        }else{
                            this.$message({
                                message: '保存失败',
                                center: true
                                });
                        }
                    })
                }
                else if(this.postName==''){
                    this.$message({
                        message: '岗位不能为空',
                        center: true
                        });
                }
                else if(this.postName.length>10){
                    this.$message({
                        message: '请输入1~10位岗位名称',
                        center: true
                        });
                }
            },
            //保存编辑岗位
            saveRdactPost(){
                 console.log(this.postName)
                editPost({
                    postId:this.postId,
                    departmentId:this.departmentID,
                    rankId: this.valuerankId,
                    name:this.postName
                }).then(res=>{
                    console.log('保存编辑岗位',res)
                      if(res.status==200&&res.data.success==true){
                                this.RdactPostVisible=false
                                bus.$emit('setBranchMananer')
                                 bus.$emit('branchCust')
                                this.$message({
                                        message: '保存成功',
                                        type: 'success',
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
            //编辑岗位弹框
            postCaozuo(post){
                this.ranklists()
                this.postId=post.postId
                this.postName=post.name
                this.valuerankId=post.rankId
                this.RdactPostVisible=true
                console.log(post)
            },
            //根据部门岗位查询人员
            clickPost(postId){
                 bus.$emit('getpostid',postId)
                 bus.$emit('branchCust',postId,'1')
            },
            //删除岗位
            deletePosts(){
                //  this.RdactPostVisible=false
                 this.$confirm('你确定要删除该岗位吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                        }).then(() => {

                            deletePost({postId:this.postId}).then(res=>{
                                console.log('删除岗位',res)
                                if(res.status==200&&res.data.success==true){
                                    this.RdactPostVisible=false
                                bus.$emit('setBranchMananer')
                                this.$message({
                                        message: '删除成功',
                                        type: 'success',
                                        center: true
                                        });
                                }else{
                                    this.$message({
                                        message: '删除失败,岗位下面还有人员',
                                        center: true
                                        });
                                }
                            })
                      
                        }).catch(() => {
                           console.log('取消删除')         
                    });
              
            },
            //鼠标移入岗位
            postover(id){
                this.ispostNumber=id
            },
             //鼠标移出岗位
           postout(){
               this.ispostNumber='ll'
           }
        },
        mounted() {
            // this.ranklists()
        },
    }
</script>

<style lang="scss">
    .firm-post{
        //  width: 280px;
        //  height: 100%;
         overflow: auto;
        flex: 0.2;
        .post-top{
            height: 60px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding:0 20px;
            border-bottom: 1px solid #ccc;         
        }
        .firm-allPost{
            width:100%;
            height: 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding:0 10px;
            margin-bottom: 10px;
            position: relative;
            border: 1px solid #ccc;
            border-radius: 4px;
            cursor: pointer;
            &:hover{
                 border: 1px solid rgb(0, 153, 204);
            }
            .postNumber{
                display:inline-block;
                font-size: 12px;
                padding:6px 10px;
                border-radius:50%;
                // color: #fff;
                background: rgb(242, 242, 242);;
            }
        }
    }
    //新建岗位
    .el-dialog__header{
            border-bottom: 1px solid #ccc;
            padding:20px;
            // position: relative;
        }
        .el-dialog__footer{
            border-top: 1px solid #ccc;
            padding:20px 50px;
        }
        .el-dialog__body{
            padding:30px 50px;
        }
     .firm-register_post{
            // display: flex;
            // align-items: center;
            margin-bottom: 20px;
            height:400px;
            width: 100%;
            border: 1px solid #ccc;
            overflow: auto;
            p{
                // text-align: right;
                width: 100%;
                margin-right: 20px;
                line-height: 40px;
                border-bottom: 1px solid #ccc;
                padding-left: 20px;
                background: rgb(242, 242, 242);
                color: rgb(22, 155, 213);
                cursor: pointer;
            }
            .firm-rank{
                display: flex;
                align-items: center;
                padding:10px 20px;
                border-bottom:1px solid #ccc;
            }
            .rankborder{
                border: 0;
            }
            i{
                margin-left: 10px;
                font-size: 20px;
                cursor: pointer;
            }
        }
       
</style>