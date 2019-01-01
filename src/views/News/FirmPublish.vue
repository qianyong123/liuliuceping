<template>
    <div class="firmPublish">
        <div>           
            <h3 style="margin-bottom:15px;">有效时间</h3>
            <div>
            <el-radio v-model="value1" label="1" border>指定时间</el-radio>
            <el-radio v-model="value1" label="2" border>长期有效</el-radio>
            </div>
        </div>  
        <div style="display:flex;margin-top:15px;">
            
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
         <!-- <el-button @click="relevanceBrach=true" style="width:200px;margin-top:20px;" type="primary">设置关联部门</el-button> -->
        <div style="margin-top:30px;">
            <div class="objectAdd">
                <h3>测评对象</h3>
                <el-button @click="addcepingStaff" style="width:100px;margin-left:20px;" type="primary">添加</el-button>
                <!-- <p  @click="addcepingStaff">添加</p> -->
            </div>
            <div class="objectTable">
                <el-table
                    :data="AppraisalCustlimit"
                    style="width: 100%"
                >
                    <el-table-column
                    type="index"
                    label="序号"
                    width="50">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="姓名">
                    </el-table-column>
                    <el-table-column
                    prop="departmentName"
                    label="部门">
                    </el-table-column>
                    <el-table-column
                    prop="postName"
                    label="岗位">
                    </el-table-column>
                    <el-table-column
                    prop="rankName"
                    label="职级">
                    </el-table-column>
                </el-table>
                <div class="amout">
                    <p>共{{stafftotal}}条数据</p>
                    <el-pagination
                    background
                    :pager-count='5'
                    :page-size='StaffPageSize'
                     :current-page='cepingCurrentpage'
                     @current-change="selectcepingStaff"
                    layout="prev, pager, next"
                    :total="stafftotal">
                    </el-pagination>
                </div>
            </div>
        </div>
         <div class="objectAdd" style="margin:30px 0;">
                <h3>答卷人员</h3>
                <!-- <el-button  @click="addStaffVisible=true" style="width:100px;margin-left:20px;" type="primary">筛选</el-button> -->
                <p style="margin-left:20px;">筛选</p>
            <el-button @click="setClientPassword=true" style="width:200px;margin-left:20px;" type="primary">查看客户登录密码</el-button>
            </div>
         <div class="screenCust">
            <div>
                <p style="margin-bottom:20px;">选择与测评对象的组织关系</p>
                <div>
                    <el-checkbox-group v-model="checkboxGroup5" size="small">
                        <el-checkbox
                        v-for="text in objetCheck"
                        :key="text.id"
                        @change="onObjetCheck(text)"
                        :label="text.id" border>{{text.name}}</el-checkbox>
                    </el-checkbox-group>
                </div>
            </div>
    
            <p style="margin:20px 0;">是否启用关联部门</p>
            <div>
                <el-radio v-model="relationBranch" label="1" border>启用</el-radio>
                <el-radio v-model="relationBranch" label="2" border>不启用</el-radio>
            </div>
            <p style="margin:20px 0;">指定部门参与</p>
            <div>
                <el-select style="width:50%" v-model="branchList" multiple placeholder="请选择部门">
                    <el-option
                    v-for="item in allBranchList"
                    :key="item.department_id"
                    :label="item.name"
                    :value="item.department_id">
                    </el-option>
                </el-select>
            </div>
            <el-button @click="selectAnswerStaff" type="primary" style="width:120px;margin-top:20px;">确定选中</el-button>   
        </div>
        <p style="margin:20px 0;">已选择答卷人员</p> 
        <div class="objectTable">
            <el-table
                :data="answerStaffList"
                style="width: 100%"
                @cell-mouse-enter="enteranswerStaff"
                @cell-mouse-leave="leaveanswerStaff"
            >
                <el-table-column
                type="index"
                label="序号"
                width="50">
                </el-table-column>
                <el-table-column
                prop="name"
                label="姓名">
                </el-table-column>
                <el-table-column
                v-for="(tables,tableindex) in organizationList"
                :key="tableindex"
                :prop="tables.prop"
                :label="tables.label">
                 <template slot-scope="scope">
                     <div>
                        <span   style="font-size:12px;">{{ tables,(scope.row) | organizationObject}}</span>  
                        <span>
                              <i 
                            v-if="answerUserId==(scope.row).userId" 
                            @click="redactAnswerStaff(tables,(scope.row))" 
                            class="el-icon-edit-outline" style="color:#09f;cursor: pointer;"></i> 
                        </span>                      
                     </div>                                   
                </template>
                </el-table-column>
            </el-table>
            <div class="amout">
                <p>共{{answerstafftotal}}条数据</p>
                <el-pagination
                background
                :pager-count='5'
                :page-size='StaffPageSize'
                :current-page='answerCurrentpage'
                layout="prev, pager, next" 
                 @current-change="selectAnswerUserList"
                :total="answerstafftotal">
                </el-pagination>
            </div>
        </div>
        <!-- <div style="margin-top:30px;">
            <div class="objectAdd">
                <h3>权重分配</h3>
                <p v-if="showredactWeight" @click="showredactWeight=false">修改</p>
                <p v-else @click="redactWeights">保存修改</p>
            </div>
            <div class="objectTable" style="width:300px;">
                <el-table
                    :data="organizationList"
                    style="width:300px"
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
                             <el-input v-else style="width:100px;" v-model="organizationList[(scope.$index)].percentValue" placeholder="请输入数字"></el-input>                             
                        </template>
                    </el-table-column>
                 
                </el-table>
                <div class="amout">
                    <p>提示：权重的总和应当为100%</p>            
                </div>
            </div>
        </div> -->
        
         <el-button @click="onFabu360" type="primary" style="width:200px;margin:30px 0;">立即发布</el-button>   
         <!-- 选测评对象弹框 -->
         <el-dialog
            title="添加测评对象"
            :visible.sync="cepingVisible"
            width="800px"
            >
            <div class="cepingVisible">
                <div class="screenStaff">
                   <p class="selectedStaff-top">
                       <span>条件筛选</span>  
                        <span class="selectedStaff-clear" @click="allStaff">全选</span>                   
                   </p>
                   <div class="screenCondition">
                         <el-select @change="selectRank" style="width:150px" v-model="screenRank" placeholder="请选择职级">
                            <el-option
                            v-for="item in allRankList"
                            :key="item.rankId"
                            :label="item.name"
                            :value="item.rankId">
                            </el-option>
                        </el-select>
                         <el-select @change="selectBranch" style="width:150px" v-model="screenBranch" placeholder="请选择部门">
                            <el-option
                            v-for="item in allBranchList"
                            :key="item.department_id"
                            :label="item.name"
                            :value="item.department_id">
                            </el-option>
                        </el-select>
                        <el-select @change="selectPost" style="width:150px" v-model="screenPost" placeholder="请选择岗位">
                            <el-option
                            v-for="item in allPostList"
                            :key="item.postId"
                            :label="item.name"
                            :value="item.postId">
                            </el-option>
                        </el-select>                   
                   </div>
                    <el-table
                        :data="tableData3"
                        style="width: 100%"
                        height="350"
                        @row-click="handleSelectionChange">
                      <el-table-column
                        type="index"
                        width="60">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="姓名"
                       >
                        </el-table-column>  
                        <!-- <el-table-column
                        type="selection"
                        style=""
                        width="60">
                        </el-table-column>                  -->
                       
                    </el-table>
                </div>
                <div class="selectedStaff">
                    <p class="selectedStaff-top">
                       <span>已选人员</span>
                       <span class="selectedStaff-clear" @click="clearStall">清空</span>
                   </p>
                  <ul class="boxStaffList">
                      <li 
                      class="StaffList"
                      v-for="(staff,staffIndex) in testStaff"
                      :key="staffIndex"
                      >
                          <span>{{staff.name}}</span>
                          <i @click="deleteStaff(staffIndex)" class="el-icon-error"></i>
                      </li>
                  </ul>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelDeleteCepin">取 消</el-button>
                <el-button type="primary" @click="saveStaffList">保存</el-button>
            </span>
        </el-dialog>
        <!-- 编辑答卷人员 -->
        <el-dialog
            title="编辑答卷人员"
            :visible.sync="redactStaffVisible"
            width="650px">
            <el-button v-if="redactStaffLabel=='其他'" style="margin-bottom:10px;" type="primary" @click="addRestVisible">添加人员</el-button>
            <div class="redactStaff">
                <p>{{redactStaffLabel}}人员</p>
                <span 
                v-for="(redactStaff,redactStaffindex) in redactAnswerStaffList"
                class="redactStaff-span"
                :key="redactStaff.userId">
                    <span>{{redactStaff.name}}</span>
                    <i @click="deleteAnswerStaff(redactStaff,redactStaffindex)" style="margin-left:5px;" class="el-icon-error"></i>
                </span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="canceldeleteAnswerStaff">取 消</el-button>
                <el-button v-if="redactStaffLabel=='其他'" type="primary" @click="saveBuyUser">保存</el-button>
                <el-button v-else type="primary" @click="deleteAnswerUsers">保存编辑</el-button>
            </span>
        </el-dialog>
           <!-- 添加答卷人员 -->
        <el-dialog
            title="添加答卷人员"
            :visible.sync="addStaffVisible"
            width="600px">
            <div class="redactStaff">
                   <div class="screenCust">
                        <div>
                            <p style="margin-bottom:20px;border:0;">选择与测评对象的组织关系</p>
                            <div style="border:0;padding:0 20px;">
                                <el-checkbox-group v-model="checkboxGroup5" size="small">
                                    <el-checkbox
                                    v-for="text in objetCheck"
                                    :key="text.id"
                                    @change="onObjetCheck(text)"
                                    :label="text.id" border>{{text.name}}</el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </div>
                
                        <p style="margin:20px 0;border:0;">是否启用关联部门</p>
                        <div style="border:0;padding:0 20px;">
                            <el-radio v-model="relationBranch" label="1" border>启用</el-radio>
                            <el-radio v-model="relationBranch" label="2" border>不启用</el-radio>
                        </div>
                         <p style="margin:20px 0;">指定部门参与</p>
                        <div style="padding:0 20px;">
                            <el-select style="width:80%" v-model="branchList" multiple placeholder="请选择部门">
                                <el-option
                                v-for="item in allBranchList"
                                :key="item.department_id"
                                :label="item.name"
                                :value="item.department_id">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addStaffVisible=false">取 消</el-button>
                <el-button type="primary" @click="selectAnswerStaff">保存</el-button>
            </span>
        </el-dialog>
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
          <!-- 客户登录密码 -->
        <el-dialog
            title="客户登录密码"
            :visible.sync="setClientPassword"
            width="600px">
            <div class="redactStaff">
                <!-- <p>
                    <span style="width:100px;">客户</span>
                    <span  style="width:100px;">密码</span>
                    <span>被评人</span>
                </p> -->
                <div>
                    <el-table
                    :data="ClientList"
                    style="width: 100%"
                    >                                   
                        <el-table-column
                        prop="customerName"
                        width="100px"
                        label="客户姓名">
                        </el-table-column>
                        <el-table-column
                        prop="visit_password"
                        width="100px"
                        label="密码">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="被评人">
                         <!-- <template slot-scope="scope">
                                                         
                        </template> -->
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button  @click="setClientPassword=false">关闭</el-button>
                <el-button type="primary" @click="saveClientPassword">导出</el-button>
            </span>
        </el-dialog>
         <!-- 其他人员弹框 -->
         <el-dialog
            title="添加答卷人员"
            :visible.sync="restVisible"
            width="800px"
            >
            <div class="cepingVisible">
                <div class="screenStaff">
                   <p class="selectedStaff-top">
                       <span>条件筛选</span>  
                        <span class="selectedStaff-clear" @click="allStaff('rest')">全选</span>                   
                   </p>
                   <div class="screenCondition">
                         <el-select @change="selectRank" style="width:150px" v-model="screenRank" placeholder="请选择职级">
                            <el-option
                            v-for="item in allRankList"
                            :key="item.rankId"
                            :label="item.name"
                            :value="item.rankId">
                            </el-option>
                        </el-select>
                         <el-select @change="selectBranch" style="width:150px" v-model="screenBranch" placeholder="请选择部门">
                            <el-option
                            v-for="item in allBranchList"
                            :key="item.department_id"
                            :label="item.name"
                            :value="item.department_id">
                            </el-option>
                        </el-select>
                        <el-select @change="selectPost" style="width:150px" v-model="screenPost" placeholder="请选择岗位">
                            <el-option
                            v-for="item in allPostList"
                            :key="item.postId"
                            :label="item.name"
                            :value="item.postId">
                            </el-option>
                        </el-select>                   
                   </div>
                    <el-table
                        :data="tableData3"
                        style="width: 100%"
                        height="350"
                        @row-click="handleSelectionChange">
                      <el-table-column
                        type="index"
                        width="60">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="姓名"
                       >
                        </el-table-column>  
                        <!-- <el-table-column
                        type="selection"
                        style=""
                        width="60">
                        </el-table-column>                  -->
                       
                    </el-table>
                </div>
                <div class="selectedStaff">
                    <p class="selectedStaff-top">
                       <span>已选人员</span>
                       <span class="selectedStaff-clear" @click="clearStall">清空</span>
                   </p>
                  <ul class="boxStaffList">
                      <li 
                      class="StaffList"
                      v-for="(staff,staffIndex) in restList"
                      :key="staffIndex"
                      >
                          <span>{{staff.name}}</span>
                          <i @click="deleteStaff(staffIndex)" class="el-icon-error"></i>
                      </li>
                  </ul>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelDeleteCepin">取 消</el-button>
                <el-button type="primary" @click="restStaffList">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {formatDate} from '@/js/date.js' 
import bus from '@/js/bus.js'
import { 
    listRank,
    allBranch,
    selectAppraisalUserr,
    listPost,
    selectAppraisalList,
    saveAppraisaluser,
    selectAnswerUser,
    getAnswerUserList,
    getWeighList,
    setWeight,
    updateWeighList,
    deleteAnswerUser,
    publishPaper,
    setDeputyManager,
    getDeputyManagerList,
    deleteDeputyManager,
    selectCustomer,
    insertOther
} from '@/axios/api'
    export default {
        props:['paperId'],
        data(){
            return{
               value1:'1' ,
               startTime:'',
               endTime:'',
               date1:'',
               date2:'',
               setClientPassword:false,
               ClientList:[
                   {visit_password: "16408", name: "张三", customerName: "李四"}            
               ],
               redactWeightinput:[],
               restVisible:false,//其他弹框
               updateUserId:'',//编辑答卷人员 当前修改测评人员id
               answerUserId:'',//鼠标移入答卷人员id
               NaNAnswerUserList:'1',//答卷人员为空时隐藏修改图标
               showredactWeight:true,//修改权重比例
               stafftotal:2,//测评人员总数
               answerstafftotal:2,//答卷人员总数
               cepingVisible:false,//添加测评对象弹框
               redactStaffVisible:false,//编辑答卷人员弹框
               addStaffVisible:false,//添加答卷人员弹框
               relevanceBrach:false,//编辑关联部门
               redactStaffLabel:'',//编辑人员弹框label
               deleteStaffList:[],//删除答卷人员列表
               screenBranch:'',//筛选部门
               screenPost:'',//筛选岗位
               screenRank:'',//筛选职级
              checkboxGroup5:[],//选择与测评对象的组织关系
              testStaff:[],//选中的测评人员
              allBranchList:[],//所有部门
              allRankList:[],//所有职级
              allPostList:[],//部门岗位
              StaffPageSize:8,//测评对象单页数量
              cepingCurrentpage:1,//测评对象当前的页码
              answerCurrentpage:1,//答卷人员当前的页码
              redactAnswerStaffList:[],//编辑答卷人员
              deleteAnswerStaffList:[],//删除答卷人员
              objetCheck:[
                  {id:1,name:'上级'},
                  {id:2,name:'同级'},
                  {id:3,name:'下级'},
                  {id:4,name:'自己'},
                  {id:5,name:'客户'},
                   {id:6,name:'其他'},
                ],
                organizationList:[
                    // {label:'上级',prop:'name'},
                    // {label:'下级',prop:'name'},
                    // {label:'同级',prop:'name'},
                ],//答卷人员与测评对象的组织关系
               tableData3:[ //分页list测评对象
                   {
                    userId:1,
                    name: '王小',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                    }, {
                        userId:2,
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                    },                              
               ],
               AppraisalCustAll:[],//全部测评对象
               AppraisalCustlimit:[],//分页测评对象
               answerStaffList:[],//答卷人员list
               relationBranch:'2',//是否启动关联部门
               restList:[],//其他答卷人员
                branchList:[],//选择测评的部门
                mainBranch:'',//主部门
                setRelevanceBrach:[],//关联部门
                RelevanceBrachList:[],//关联部门列表
                  branch: [],
                  isselectAnswerStaff:''
            }
        },
        filters:{
            organizationObject(label,row){
                // console.log(label,row)
                let name=''
                if(label.label=='上级'&&row.under.length>0){
                    if(row.under.length>1){
                        name=`${row.under[0].name}..`
                    }
                    else{
                         name=`${row.under[0].name}`
                    }
                }
               else if(label.label=='下级'&&row.sub.length>0){
                       if(row.sub.length>1){
                        name=`${row.sub[0].name}..`
                    }
                    else{
                         name=`${row.sub[0].name}`
                    }
                }
                else if(label.label=='同级'&&row.both.length>0){
                     if(row.both.length>1){
                        name=`${row.both[0].name}..`
                    }
                    else{
                         name=`${row.both[0].name}`
                    }
                }
                 else if(label.label=='自己'&&row.my.length>0){
                    if(row.my.length>1){
                        name=`${row.my[0].name}..`
                    }
                    else{
                         name=`${row.my[0].name}`
                    }
                }
                else if(label.label=='客户'&&row.cust.length>0){
                    if(row.cust.length>1){
                        name=`${row.cust[0].name}..`
                    }
                    else{
                         name=`${row.cust[0].name}`
                    }
                }
                else if(label.label=='其他'&&row.other.length>0){//other
                    if(row.other.length>1){
                        name=`${row.other[0].name}..`
                    }
                    else{
                         name=`${row.other[0].name}`
                    }
                }
                else{
                    name='- -'
                }
                return name
            }
        },
        methods:{
            publishPapers(){
                //调用发布接口 
                    publishPaper({
                    questionUrl:`http://wj.gst70.cn/#/m/MPlogin/${this.paperId}`,
                    paperId:this.paperId,
                    startTime:this.startTime,
                    endTime:this.endTime,
                    isOpen:'2',
                    userInfo:''
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
                        questionUrl:`http://wj.gst70.cn/#/m/MPlogin/${this.paperId}`
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
            },
            //发布
            onFabu360(){
                let value=0             
                let zzvalue=/^[0-9]{0,3}$/
                this.organizationList.forEach(data=>{
                    if(zzvalue.test(data.percentValue)){
                        value+=Number(data.percentValue)
                    }
                })
                if(value!=100){
                    this.$message.error('权重比例的总和必须为100%')  
                    return 
                }
                if(this.value1=='1'){
                    if(this.date1!=''&&this.date2!=''){
                        let date1=this.date1,
                            date2=this.date2;
                        this.startTime=formatDate(date1, 'yyyy-MM-dd hh:mm')
                        this.endTime=formatDate(date2, 'yyyy-MM-dd hh:mm')                                                                                               
                        this.publishPapers()
                    }else{
                         this.$message.error('请选择有效时间')   
                    }
                }else{
                    this.endTime=''
                    this.publishPapers()
                }
               
            },
            // 导出excle的2个方法
                export2Excel(){
                    require.ensure([], () => {
                        const { export_json_to_excel } = require('@/vendor/Export2Excel');
                        const tHeader = [ '客户姓名', '密码', '被评人'];
                        const filterVal = ['name', 'password', 'answerstafft'];
                        const list = this.ClientList;
                        const data = this.formatJson(filterVal, list);
                        export_json_to_excel(tHeader, data, '客户列表excel');
                    })
                    },
                    formatJson(filterVal, jsonData){
                    return jsonData.map(v => filterVal.map(j => v[j]))
                },

            //导出客户密码
            saveClientPassword(){
                this.setClientPassword=false
                this.export2Excel()
            },
            //客户密码列表
            selectCustomers(){
                selectCustomer({paperId:this.paperId}).then(res=>{
                    console.log('客户密码',res)
                    if(res.status==200&&res.data.success==true){
                        this.ClientList=res.data.data
                    }
                })
            },
            //确定筛选其他人员弹框
            restStaffList(){
                let obj2={}
                let restList=this.restList.concat(this.redactAnswerStaffList)
                this.restVisible=false
                this.getAppraisalList(1)  
                 restList = restList.reduce(function(item, next) {
                obj2[next.userId] ? '' : obj2[next.userId] = true && item.push(next);
                return item;
                }, []);
                 this.redactAnswerStaffList=restList
            },
            //添加其他人员
            addRestVisible(){
                this.restVisible=true
                this.restList=[]
                this.screenRank=''
                this.screenBranch=''
                this.screenPost=''
                this.tableData3=[]
            },
            //选择与测评对象的组织关系
            onObjetCheck(item){
                console.log(this.checkboxGroup5)
                // this.cepingVisible=true
            },
            //设置关联部门
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
            //点击添加测评人
            addcepingStaff(){
                this.cepingVisible=true
                this.tableData3=[]
                this.screenRank=''
                this.screenBranch=''
                this.screenPost=''
                this.getAppraisalList(1)
            },
            //职级筛选
            selectRank(val){
                console.log(val)
                this.screenRank=val
                this.selectAppraisalUserrs()
            },
            //部门筛选
            selectBranch(val){
                console.log(val)
                this.screenBranch=val
                listPost({departmentId:val}).then(res=>{
                    console.log('岗位',res)
                     if(res.status==200&&res.data.success==true){
                        this.allPostList=res.data.data
                        this.screenPost=''
                    }               
                })
                this.selectAppraisalUserrs()
            },
            //岗位筛选
            selectPost(val){
                  console.log(val)
                this.screenPost=val
                this.selectAppraisalUserrs()
            },
            //根据条件查询公司人员
            selectAppraisalUserrs(){
                selectAppraisalUserr({
                    departmentId:this.screenBranch,
                    postId: this.screenPost,
                    rankId: this.screenRank
                }).then(res=>{
                  console.log('选择被测人员',res)
                   if(res.status==200&&res.data.success==true){
                       this.tableData3=res.data.data
                    }  
                })
            },
            //添加测评人员列表
            handleSelectionChange(row) {
                let list=this.testStaff.filter((data)=>{ return data.userId==row.userId})
                let rest=this.restList.filter((data)=>{ return data.userId==row.userId})
                if(list.length==0){
                    this.testStaff.push(row)                
                }
                if(rest.length==0){               
                    this.restList.push(row)         
                }
            },
            //删除测评人员
            deleteStaff(index){
                this.testStaff.splice(index,1)
                this.restList.splice(index,1)
            },
            //取消编辑测评人员
            cancelDeleteCepin(){
                this.cepingVisible=false  
                this.restVisible=false
                this.getAppraisalList(1)  
            },
            //清楚全部人员
            clearStall(){
                 this.testStaff=[]
                  this.restList=[]
            },
            //选中全部人员
            allStaff(type){
                // let allList=this.tableData3.filter(data=>{return data.userId!=})
                let allList=this.tableData3.concat(this.testStaff)
                let rest=this.tableData3.concat(this.restList)
                let obj={}
                let obj2={}
               allList = allList.reduce(function(item, next) {
                obj[next.userId] ? '' : obj[next.userId] = true && item.push(next);
                return item;
                }, []);
                rest = rest.reduce(function(item, next) {
                obj2[next.userId] ? '' : obj2[next.userId] = true && item.push(next);
                return item;
                }, []);
                this.testStaff=allList
                this.restList=rest
                console.log(allList)
                console.log(rest)
            },
            //保存测评人员
            saveStaffList(){
                saveAppraisaluser({paperId:this.paperId,appraisalCust:this.testStaff}).then(res=>{
                    console.log('保存测评人员',res)
                    if(res.status==200&&res.data.success==true){  
                        this.cepingVisible=false                   
                        this.getAppraisalList(1)
                        this.isselectAnswerStaff='1'
                    }else{
                           this.$message({         
                                message:res.data.message,
                                center: true
                            });
                    }
                })
            },
            //360测评对象列表
            getAppraisalList(val){
                selectAppraisalList({
                    paperId:this.paperId,
                    pageSize:this.StaffPageSize,
                    pageNo:val
                }).then(res=>{
                    console.log('360测评对象列表',res)
                    if(res.status==200&&res.data.success==true){
                        this.AppraisalCustlimit=res.data.data.AppraisalCustlimit
                        this.AppraisalCustAll=res.data.data.AppraisalCustAll
                        this.stafftotal=res.data.total
                        this.testStaff=res.data.data.AppraisalCustlimit   
                        if(this.isselectAnswerStaff=='1'){
                            this.selectAnswerStaff()
                        }                 
                    } 
              
                })
            },
            //360选择答卷人员
            selectAnswerStaff(){
                this.addStaffVisible=false
                selectAnswerUser({
                    paperId:this.paperId,
                    userList:this.AppraisalCustAll,
                    correlationType:this.relationBranch,
                    evaluationRelationType:this.checkboxGroup5.join(','),
                    specifyDepartmentList:this.branchList
                }).then(res=>{
                    console.log('选择答卷人员',res)
                    if(res.status==200&&res.data.success==true){
                        //   this.$message({
                        //         message:'保存成功',
                        //         type:'success',
                        //         center:true
                        //     })
                        let organizationList=[]
                        this.checkboxGroup5.forEach(data=>{ 
                            let name=this.objetCheck[data-1].name
                            console.log(name)
                          organizationList.push({label:name,prop:'name',paperId:this.paperId,evaluationRelationType:data,percentValue:'10'})
                        })
                       this.getAnswerUserLists(1)
                        this.setWeights(organizationList)
                        this.selectCustomers()
                    }
                })
            },
            //360答卷人员列表
            getAnswerUserLists(val){
                getAnswerUserList({
                    paperId:this.paperId,
                    pageSize:this.StaffPageSize,
                    pageNo:val
                }).then(res=>{
                     console.log('答卷人员列表',res)
                     if(res.status==200&&res.data.success==true){
                         this.answerStaffList=res.data.data
                         this.answerstafftotal=res.data.data.length
                     }
                })
            },
         
            //鼠标移入答卷人员单元格
            enteranswerStaff(row, column){
                // console.log(row, column)
                this.answerUserId=row.userId
            },
            //鼠标移出答卷人员单元格
            leaveanswerStaff(row, column){
                    // console.log(row, column)
                    this.answerUserId=''
            },
            //设置360权重
            setWeights(list){
                setWeight(list).then(res=>{
                    console.log('设置360权重',res)
                     if(res.status==200&&res.data.success==true){
                        this.getWeighLists()
                     }
                })
            },
            //360权重列表
            getWeighLists(){
                getWeighList({paperId:this.paperId}).then(res=>{
                    console.log('权重列表',res)
                    // this.$store.commit('organizationList',res.data.data)
                    if(res.status==200&&res.data.success==true){
                        this.organizationList=[]
                         this.checkboxGroup5=[]
                        res.data.data.forEach(data=>{ 
                            let name=this.objetCheck[Number(data.evaluationRelationType)-1].name
                            this.checkboxGroup5.push(Number(data.evaluationRelationType))
                          this.organizationList.push({
                              label:name,
                              prop:'name',
                              evaluationRelationType:data.evaluationRelationType,
                              percentValue:data.percentValue,
                              paperId:this.paperId
                              })
                        })
                         bus.$emit('organizationLists',this.organizationList)
                        console.log(  this.checkboxGroup5)
                     }
                })
            },
            //修改权重比例
            redactWeights(list){
                this.organizationList=list
                let value=0
                let zzvalue=/^[0-9]{0,3}$/
                list.forEach(data=>{
                    if(zzvalue.test(data.percentValue)){
                        value+=Number(data.percentValue)
                    }
                })
                if(value==100){
                    updateWeighList(list).then(res=>{
                        // console.log('修改权重',res)
                        if(res.status==200&&res.data.success==true){
                            this.showredactWeight=!this.showredactWeight
                            this.$message({
                                message:'修改成功',
                                type:'success',
                                center:true
                            })
                             console.log('修改权重',res)
                            return
                        }else{
                            this.$message({
                                message:res.data.message,
                                center:true
                            }) 
                            return
                        }
                    })
                }else{
                     this.$message.error('权重比例的总和必须为100%') 
                    
                }
                 return
            },
            //编辑答卷人员
            redactAnswerStaff(tables,row){
                this.redactStaffVisible=true
                this.redactStaffLabel=tables.label
                this.deleteAnswerStaffList=[]
                if(tables.label=='上级'){
                    this.redactAnswerStaffList=row.under
                    this.updateUserId=row.userId
                }
                else if(tables.label=='下级'){
                     this.redactAnswerStaffList=row.sub
                     this.updateUserId=row.userId
                }
                else if(tables.label=='同级'){
                     this.redactAnswerStaffList=row.both
                     this.updateUserId=row.userId
                }
                else if(tables.label=='自己'){
                     this.redactAnswerStaffList=row.my
                     this.updateUserId=row.userId
                }
                else if(tables.label=='客户'){
                     this.redactAnswerStaffList=row.cust
                     this.updateUserId=row.userId
                }
                else if(tables.label=='其他'){
                     this.redactAnswerStaffList=row.other
                     this.restList=row.other
                     this.updateUserId=row.userId
                }
               
                console.log('编辑答卷人员',tables,row)
            },
            //删除答卷人员
            deleteAnswerStaff(item,index){
                console.log(item,index)
                if( this.redactStaffLabel=='其他'){
                    this.restList.splice(index,1)
                    this.redactAnswerStaffList.splice(index,1)
                }else{
                    this.redactAnswerStaffList.splice(index,1)
                    this.deleteAnswerStaffList.push(item)
                }
                 console.log(this.restList)
            },
            //取消删除答卷人员
            canceldeleteAnswerStaff(){
                 this.redactStaffVisible=false
                 this.getAnswerUserLists(1)
            },
            //编辑保存答卷人员
            deleteAnswerUsers(){

                if(this.deleteAnswerStaffList.length>0){
                    this.deleteAnswerStaffList.forEach((data,index)=>{
                        this.deleteAnswerStaffList[index].paperId=this.paperId
                        this.deleteAnswerStaffList[index].appraisalUserId=this.updateUserId
                    })
                }              
                deleteAnswerUser(this.deleteAnswerStaffList).then(res=>{
                    console.log('删除答卷人员',res)
                    if(res.status==200&&res.data.success==true){
                         this.$message({
                                message:'保存人员成功',
                                type:'success',
                                center:true
                            })
                             this.getAnswerUserLists(1)
                    }else{
                        this.$message({
                                message:res.data.message,
                                center:true
                            })
                    }
                })
                 this.redactStaffVisible=false
            },
            //保存其他人员
            saveBuyUser(){
                if(this.restList.length>0){
                    this.restList.forEach((data,index)=>{
                        this.restList[index].paperId=this.paperId
                        this.restList[index].appraisalUserId=this.updateUserId
                    })
                } 
                this.restVisible=false
                console.log(this.restList)
                insertOther( this.restList).then(res=>{
                    if(res.status==200&&res.data.success==true){
                        console.log('保存其他人员',res)  
                        this.$message({
                                message:'保存人员成功',
                                type:'success',
                                center:true
                            })   
                        this.getAnswerUserLists(1)
                        this.redactStaffVisible=false                 
                    }else{
                         this.$message({
                                message:res.data.message,
                                center:true
                            })
                    }

                })
            },
            //分页查询测评对象
            selectcepingStaff(val){
                this.cepingCurrentpage=val
                this.getAppraisalList(val)
                console.log(val)
            },
            //分页查询答卷人员
            selectAnswerUserList(val){
                this.answerCurrentpage=val
                this.getAnswerUserLists(val)
                console.log(val)
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
             //所有职级
            allRank(){
                listRank().then(res=>{
                    console.log('职级',res)
                    if(res.status==200&&res.data.success==true){
                        this.allRankList=res.data.data
                    }
                })
            }
        },
        mounted() {
            this.date1=new Date()
            this.getWeighLists()
            this.allBranchs()
            this.allRank()
            this.getAppraisalList(1)
            this.getAnswerUserLists(1)  
            this.getDeputyManagerLists()  
             this.selectCustomers()      
            bus.$on('redactWeights',(list)=>{
                this.redactWeights(list)
            })
        },
    }
</script>

<style lang="scss">
    .firmPublish{
        width: 100%;
        p{
           font-size: 14px; 
        }
        .objectAdd{
            display: flex;
            align-items: center;
            margin: 15px 0;
            p{
                color: #09f;
                font-size: 14px;
                margin-left: 20px;
                // cursor: pointer;
                // &:hover{
                //     color:#F4C108; 
                // }
            }
            h3{
                margin: 0;
            }
        }
        .objectTable{
            border:1px solid #ebeef5;
            border-bottom: 0;
            .amout{
                height: 48px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px;
                 border-bottom: 1px solid #ebeef5;
            }
        }
        .screenCust{    
            border: 1px solid #ccc;
            padding: 20px;
        }
        .cepingVisible{
            width: 100%;
            min-height:400px;
            display: flex;
            justify-content: center;
            p{
                line-height: 40px;
                background: rgb(242, 242, 242);
                padding:0 20px;
                border-bottom: 1px solid #ccc;
            }
            .screenStaff{
                border: 1px solid #ccc;
                width: 510px;
                .screenCondition{
                    height: 60px;
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                    align-items: center;
                     border-bottom: 1px solid #ccc;
                     padding:0 20px;
                }
            }
             .selectedStaff-top{
                    width: 100%;
                    height: 40px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                .selectedStaff-clear{
                    color: #09f;
                    cursor: pointer;
                    }
                }
            .selectedStaff{
                border: 1px solid #ccc;
                width: 200px;
                margin-left: 20px;
               
               
                .boxStaffList{
                    width: 100%;
                    height:410px;
                    overflow: auto;
                }
               
                .StaffList{
                    width: 100%;
                    padding:0 20px;
                    height: 40px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid #ccc;
                    &:hover{
                        background: rgb(242, 242, 242);
                    }
                    i{
                        font-size: 16px;
                        color: #ccc;
                        cursor: pointer;
                    }
                }
                //  .StaffList:nth-child(10){border:0};
            }
        }
        //编辑答卷人家弹框
        .redactStaff{
            width: 100%;
            height: 350px;
            overflow: auto;
            border: 1px solid #ccc;
            p{
                line-height: 40px;
                border-bottom: 1px solid #ccc;
                background: rgb(242, 242, 242);
                margin-bottom: 20px;
                padding:0 20px;
            }
            span{
                display: inline-block;
            }
            .redactStaff-span{
                padding: 5px 6px;
                border: 1px solid #ccc;
                border-radius: 3px;
                margin-left: 20px;
                margin-bottom: 10px;
                i{
                    cursor: pointer;
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
        // .el-table .cell{
        //     padding-left:20px;
        // }
    }
    
</style>