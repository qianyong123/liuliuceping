<template>               
            <div class="property">
                <div v-show="bcg==1">                   
                    <div class="prop-title">  
                        <i class="el-icon-picture-outline"></i>                      
                        <span>属性</span>
                    </div>
                   
                    <!-- <div class="property-text">
                        <p>所属维度</p>
                        <el-input v-model="input" placeholder="请输入内容"></el-input>
                    </div> -->
                    <div class="property-fengzhi">
                        <!-- <p>题目选项</p>
                        <div> 
                            <span class="span-fen">是否统计分值</span>
                             <el-radio v-model="radio" label="1">是</el-radio>
                             <el-radio style="margin-left:10px;" v-model="radio" label="2">否</el-radio>
                        </div> -->
                        
                        <div v-if="questionProperty" style="margin-bottom:10px;"> 
                             <div class="property-text">
                                <p>题目类型</p>
                                <div style="cursor: pointer;">
                                    <el-dropdown trigger="click">
                                        <span class="el-dropdown-link">
                                            {{typeProperty}}<i class="el-icon-arrow-down el-icon--right"></i>
                                        </span>
                                        <el-dropdown-menu slot="dropdown" >
                                            <el-dropdown-item
                                                v-for="itemType in titleType"
                                                :key="itemType.id"
                                            @click.native="$emit('toggleType',itemType.text,itemType.id)"
                                            >   
                                                {{itemType.text}}
                                            </el-dropdown-item> 
                                        </el-dropdown-menu>
                                    </el-dropdown>
                                    <el-checkbox v-if="paperType!='2'" v-model="questionRequired[dedactId]">必答</el-checkbox>                                                 
                                </div>                      
                            </div>
                            <div v-if="paperType=='2'" class="property-text" style="height:120px;">
                                <p>所属维度</p>
                                <el-select v-model="currenDimensionality" placeholder="请选择维度">
                                    <el-option
                                    v-for="(item,index) in dimensionalityList"
                                    :key="index"
                                    :label="item.groupName"
                                     @click.native="$emit('dimensionality',item)"
                                    :value="item.groupId">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="property-text"  style="min-height:180px;">
                                <p>选项分值</p>
                                <el-input style="margin-bottom:10px;"
                                v-for="(item,index) in mains" 
                                :key="index" 
                                v-model="gread[dedactId][index]"
                                placeholder="请输入分数"></el-input>   
                            </div>
                                                
                        </div>
                        <div v-else style="padding:20px;">
                            <div v-if="paperType=='2'">
                                <el-button style="width:100%;margin-bottom:20px;" type="primary" @click="showDimensionality">新建维度</el-button>
                                <div>
                                    <div 
                                    v-for="(item,index) in dimensionalityList"
                                    class="DimensionalityList"
                                    :key="index">
                                        <h4>{{item.groupName}}</h4>
                                        <p v-if="item.groupComment!=''">{{item.groupComment}}</p>
                                        <p v-else style="color:#ccc;text-align:center">维度说明为空</p>
                                        <i class="el-icon-edit-outline" @click="eidDimensionality(item)"></i>
                                    </div>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>
                <div v-show="bcg==2">                   
                    <div class="prop-title">
                        <i class="el-icon-time"></i>                      
                        <span>统计</span>
                    </div>
                    <div  class="model-table">
                        <!-- <el-button @click="$emit('saveTemplate')" style="width:200px;margin:20px 0;" :plain="true" type="primary">存为模板</el-button> -->
                         <el-table
                            :data="tableData"
                            border
                            style="width: 100%;margin-top:20px;"
                            >
                            <el-table-column
                            prop="text"
                            label="类别"
                           >
                            </el-table-column>
                            <el-table-column
                            prop="count"
                            label="数量"
                           >
                            </el-table-column>                          
                        </el-table>
                    </div>
                    <div v-if="paperType=='2'" class="model-table">
                        <el-table
                        :data="groupList"
                        border
                        style="width: 100%; margin-top: 20px">
                        <el-table-column
                            prop="groupName"
                            label="维度">
                        </el-table-column>                   
                        <el-table-column
                            prop="amount"
                            label="数量">
                        </el-table-column>                    
                        </el-table>
                    </div>
                </div>
                <div v-show="bcg==3">                   
                    <div class="prop-title">                        
                        <i class="el-icon-date"></i>                      
                        <span>设置</span>
                    </div>
                    <div v-if="paperType=='2'" style="width:100%;padding:0 20px;">
                        <div>
                            <div class="objectAdd">
                                <h3>权重分配</h3>
                                <p v-if="showredactWeight" @click="showredactWeight=false">修改</p>
                                <p v-else @click="redactWeightss">保存修改</p>
                            </div>
                            <div class="objectTable" style="width:100%">
                                <el-table
                                    :data="organizationList"
                                    style="width:100%"
                                >
                                    <el-table-column
                                    prop="label"
                                    label="组织关系">
                                    </el-table-column>
                                    <el-table-column
                                    prop="percentValue"
                                    label="权重比例">
                                        <template slot-scope="scope">
                                            <span v-if="showredactWeight">{{scope.row.percentValue}}%</span>
                                            <el-input v-else style="width:70px;" v-model="organizationList[(scope.$index)].percentValue" placeholder="数字"></el-input>                             
                                        </template>
                                    </el-table-column>
                                
                                </el-table>
                                <div class="amout">
                                    <p style="  line-height: 22px;">提示：权重的总和应当为100%</p>            
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 新建维度弹框 -->
                <el-dialog
                :title="dimensionalityTitle"
                :visible.sync="newDimensionality"
                width="550px"
                >
               <div class="dimensionalityMain">
                   <div class="newDimensionality">
                       <span>维度名称</span>
                       <el-input style="width:260px;margin-left:10px;" v-model="groupName" placeholder="请输入名称"></el-input>
                   </div>
                   <!-- <div class="newDimensionality">
                       <span>标准分值</span>
                       <el-input style="width:260px;margin-left:10px;" v-model="dimensionalityValue" placeholder="请输入分值"></el-input>
                   </div> -->
                   <div class="newDimensionality">
                       <span>维度说明</span>
                      <el-input
                        type="textarea"
                        style="width:260px;margin-left:10px;font-size: 12px;" 
                        :autosize="{ minRows: 2, maxRows: 4}"
                        placeholder="请输入说明"
                        v-model="groupComment">
                        </el-input>
                   </div>
               </div>
                <span v-if="dimensionalityTitle=='新建维度'" slot="footer" class="dialog-footer">
                    <el-button @click="newDimensionality = false">取 消</el-button>
                    <el-button type="primary" @click="saveDimensionality">确 定</el-button>
                </span>
                 <span v-else slot="footer" class="dialog-footer">
                     <el-button @click="newDimensionality = false">取 消</el-button>
                    <el-button @click="deleteDimensionality">删除维度</el-button>
                    <el-button type="primary" @click="redactDimensionality">编辑保存</el-button>
                </span>
                </el-dialog>
            </div>                 
</template>

<script>
    import {newGroup,selectAllGroup,deleteGroup,editGroup} from '@/axios/api'
    import bus from '@/js/bus.js'
    export default {
        name:"Property",
        props:[
            'bcg',
            'mains',
            'gread',
            'dedactId',
            'tableData',
            'typeProperty',
            'titleType',
            'questionProperty',
            'questionRequired',
            'paperType',
            'paperId',
            'groupList'
            // 'currenDimensionality'
        ],
        data(){
            return{
                checked:false,
                input:'',
                radio:'1',
                fengshu:'',
                //维度
                dimensionalityTitle:'',
                newDimensionality:false,
                currenDimensionality:'',//当前维度
                groupName:'',
                dimensionalityValue:'',
                dimensionalityList:[],
                groupComment:'',
                groupId	:'',//编辑维度id
                 tableData6: [
                     {
                    name: '个人能力',
                    amount1: '单选题',
                    amount2: '3',
                    },
                    {
                    name: '个人能力',
                    amount1: '多选题',
                    amount2: '3',
                    },
                
                ],
                //360权重
                showredactWeight:true,
                organizationList:[]
            }
        },
       methods:{
           //维度弹框
           showDimensionality(){
               this.newDimensionality=true
               this.dimensionalityTitle='新建维度'
                 this.groupName=''
                   this.dimensionalityValue=''
                   this.groupComment=''
           },
           //新建维度
           saveDimensionality(){
               if(this.groupName==''){
                     this.$message({
                        message: '维度名称不能为空',
                        center: true
                        });
               }else{
                   let groupNumber=1
                   if(this.dimensionalityList.length>0){
                       let length=this.dimensionalityList.length-1
                       groupNumber=Number(this.dimensionalityList[length].groupNumber)+1
                   }   
                   newGroup({
                       paperId:this.paperId,
                       groupName:this.groupName,
                       groupComment:this.groupComment,
                       groupNumber
                   }).then(res=>{
                       console.log('新建维度',res)
                       if(res.status==200&&res.data.success==true){
                           this.groupLists(this.paperId)
                       }
                   })              
                //    this.dimensionalityList.push({name:this.groupName,value:this.dimensionalityValue,messgae:this.groupComment})
                   this.newDimensionality=false
                 
                   console.log(this.dimensionalityList)
               }
           },
           //维度列表
           groupLists(paperId){
                selectAllGroup({ paperId:paperId}).then(res=>{
                    console.log('维度列表',res)
                    if(res.status==200&&res.data.success==true){
                        this.dimensionalityList=res.data.data
                    }
                })
           },
           //编辑维度弹框
           eidDimensionality(item){
                this.newDimensionality=true
               this.dimensionalityTitle='编辑维度'
               this.groupName=item.groupName
               this.groupComment=item.groupComment
               this.groupId	=item.groupId	
            //    this.dimensionalityList.splice(item.index,1)
           },
            //删除维度
            deleteDimensionality(){
                 this.$confirm('你确定要删除该维度吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        deleteGroup({
                            paperId:this.paperId,
                            groupId: this.groupId	
                        }).then(res=>{
                            this.newDimensionality=false
                            if(res.status==200&&res.data.success==true){   
                                 this.groupLists(this.paperId)                           
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
                       
                    }).catch(()=>{
                         this.newDimensionality=false
                    })
            },
            //编辑保存维度
            redactDimensionality(){
                editGroup({
                    paperId:this.paperId,
                    groupId: this.groupId,
                    groupName:this.groupName,
                    groupComment:this.groupComment	
                }).then(res=>{
                    console.log('编辑保存维度',res)
                     if(res.status==200&&res.data.success==true){    
                          this.groupLists(this.paperId)                          
                            this.$message({
                                type: 'success',
                                message: '保存成功!',
                                center:true
                            });
                        }else{
                                this.$message({
                                message:res.data.message,
                                center:true
                            });
                        }
                })
                this.newDimensionality=false
            },
            //当前问题所属维度
            optionDimensionality(groupId){
                this.currenDimensionality=groupId
                console.log(groupId)
            },
            organizationLists(list){
                this.organizationList=list
            },
            //保存修改权重比例
            redactWeightss(){
                let value=0
                let zzvalue=/^[0-9]{0,3}$/
                this.organizationList.forEach(data=>{
                    if(zzvalue.test(data.percentValue)){
                        value+=Number(data.percentValue)
                    }
                })
                if(value==100){
                    this.showredactWeight=!this.showredactWeight
                }
                bus.$emit('redactWeights',this.organizationList)
            }
       },
       mounted() {
            let paperProperty=JSON.parse(sessionStorage.getItem('paperProperty'))
            if(paperProperty!=undefined){
                 this.groupLists(paperProperty.paperId)
            }
            bus.$on('optionDimensionality',(groupId)=>{
                this.optionDimensionality(groupId)
            })
             bus.$on('organizationLists',(list)=>{
                this.organizationLists(list)
            })
       },
    }
</script>

<style lang="scss">
   
        .property{
            flex: 0.2;
            // background: rgb(17, 139, 27);
            color: #000;
            overflow: auto;
            .prop-title{
                height: 61px;
                border-bottom: 1px solid #ccc;
                display: flex;
                align-items: center;
                padding:0 20px;
                span{
                    margin-left: 10px;                   
                }
            }
            .property-text{
                width: 100%;
                min-height:100px;            
                font-size: 14px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                border-bottom: 1px solid #ccc;
                padding:20px ;
                p{
                    line-height: 20px;
                    padding-bottom: 10px;
                }
                .el-dropdown-link{
                    margin-right: 20px;
                }
            }
            .property-fengzhi{
                min-height: 200px;
                // padding:20px 20px 0 20px;
                font-size: 14px;
                p{
                    line-height: 20px;
                    padding-bottom: 10px;
                }
                .span-fen{
                    margin-right: 20px;
                }  
                .DimensionalityList{
                    border: 1px solid #ccc;
                    margin-bottom: 20px;
                    border-radius: 4px;
                    position: relative;
                    h4{
                        width: 100%;
                        padding:10px 30px 10px 20px;
                        background: rgb(242, 242, 242);
                        line-height: 20px;
                        font-size: 16px;                        
                    }
                    p{
                        border-top: 1px solid #ccc;
                        min-height: 50px;
                        padding:10px 20px;
                        font-size: 14px;
                    }
                    i{
                        position: absolute;
                        font-size: 18px;
                        color: #09f;
                        top: 12px;
                        right:10px;
                        cursor: pointer;
                    }
                }           
            }
            //统计
            .model-table{
                width: 100%;
                display: flex;
                flex-direction: column;
                // align-items: center;
                // justify-content: center;
                box-sizing: border-box;
                padding:0 20px;
                .cell{
                     text-align:center !important;
                }
            }
            .el-dialog__body{
                    padding:0;
                   
                }   
                //设置
            .objectAdd{
                display: flex;
                align-items: center;
                margin:20px 0;
                p{
                    color: #09f;
                    font-size: 14px;
                    margin-left: 20px;
                    cursor: pointer;
                    &:hover{
                        color:#F4C108; 
                    }
                }
                h3{
                    margin: 0;
                }
            }
            .objectTable{
                border:1px solid #ebeef5;
                border-bottom: 0;
                 background: rgb(242, 242, 242);
                .amout{
                    height: 48px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 10px;
                    border-bottom: 1px solid #ebeef5;
                }
            }
      
        }
        
        //维度弹框
        .dimensionalityMain{
             padding:30px 0;
             border-top: 1px solid #ccc;
             border-bottom: 1px solid #ccc;  
              .newDimensionality{
                width: 100%;
                min-height:40px;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-bottom:20px;   
                font-size: 14px;                 
                    
            }
           
        }
        
</style>






