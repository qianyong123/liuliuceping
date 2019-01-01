<template>
    <div class="firm">
        <div class="firm-register">
              <el-button @click="showRegister" style="width:200px;">企业注册</el-button>
        </div>
        <ul>
            <li 
            v-for="item in allFirm"
            :key="item.companyId"
            @mouseout="onmouseout(item.companyId)"
            @mouseover="onmouseover(item.companyId)">
                <p class="firm-p1"></p>
                <div>
                    <p>{{item.name}}</p>
                    <p class="firm-p2">
                        <span>{{options1[item.industryType-1].label}}</span>
                        <span style="margin:0 10px">私营企业</span>
                        <span>{{options3[item.scaleType-1].label}}</span>                    
                    </p>
                    <p v-if="isshow==item.companyId" class="defaultFirm" @click="setDefaultFirm(item.companyId)">设为默认公司</p>
                    <p v-else class="defaultFirm"></p> 
                </div>
                <p v-if="isshow==item.companyId" class="firm-p3" @click="onmanage(item.companyId)">管理</p> 
                <p v-else class="firm-p3"></p>   
                <p class="firm-img"></p>        
            </li>
        </ul>
        <!-- 企业注册弹框 -->
        <el-dialog
        title="企业注册"
        :visible.sync="centerDialogVisible"
        width="550px"
        >
        <div>
            <div class="firm-register_message">
                <p>企业名称</p>
                <el-input
                placeholder="请输入企业名称"
                v-model="name"
                 style="width:300px;"
                clearable>
                </el-input>
            </div>
            <div class="firm-register_message">
                <p>所属行业</p>
                <template>
                <el-select v-model="industryType" placeholder="请选择所属行业">
                    <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                </template>
            </div>
            <!-- <div class="firm-register_message">
                <p>企业性质</p>
                <template>
                <el-select v-model="firmTature" placeholder="请选择企业性质">
                    <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                </template>
            </div> -->
            <div class="firm-register_message">
                <p>企业规模</p>
                <template>
                <el-select v-model="scaleType" placeholder="请选择企业规模">
                    <el-option
                    v-for="item in options3"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                </template>
            </div>
            <div class="firm-register_message">
                <p>公司地址</p>      
                <el-input
                placeholder="请输入公司地址"
                style="width:300px;"
                v-model="address"
                clearable>
                </el-input>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="registerFirm">注册</el-button>
            <el-button @click="centerDialogVisible = false">取 消</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
import { createCompany,allCompany,companySwitch,defaultCompany} from '@/axios/api'
    export default {
        name:'Firm',
        data(){
            return{
                isshow:false,
                centerDialogVisible:false,
                name:'',//公司名称
                address:'',//公司地址
                industryType:'',//公司类型
                firmTature:'',//公司性质
                scaleType:'',//公司规模
                allFirm:[],//所有企业
                options1: [{
                    value: '1',
                    label: '互联网IT'
                    }, {
                    value: '2',
                    label: '金融'
                    }, {
                    value: '3',
                    label: '房地产/建筑'
                    }, {
                    value: '4',
                    label: '贸易/零售/物流'
                    }, {
                    value: '5',
                    label: '教育/传媒/广告'
                },
                {
                    value: '6',
                    label: '服务业'
                },
                {
                    value: '7',
                    label: '市场/销售'
                },
                {
                    value: '8',
                    label: '人事/财务/行政'
                    },
                ],
                options2: [{
                    value: '1',
                    label: '私有企业'
                    }, {
                    value: '2',
                    label: '国有企业'
                    }, {
                    value: '3',
                    label: '集体所有制企业'
                    },
                     {
                    value: '4',
                    label: '联营企业'
                    },
                     {
                    value: '5',
                    label: '三资企业'
                    },
                     {
                    value: '6',
                    label: '其他企业'
                    },
                ],
                options3: [{
                    value: '1',
                    label: '20人以下'
                    }, {
                    value: '2',
                    label: '20~50人'
                    }, {
                    value: '3',
                    label: '50~100人'
                    }, {
                    value: '4',
                    label: '100~200人'
                    }, 
                    {
                    value: '5',
                    label: '200~300人'
                    },
                    {
                    value: '6',
                    label: '300人以上'
                    }],
            }
        },
        methods:{
            onmouseout(companyId){//鼠标移出
                this.isshow='yc'
            },
            onmouseover(companyId){//鼠标移入
                this.isshow=companyId
            },
            //管理
            onmanage(companyId){
                companySwitch({companyId}).then(res=>{
                    console.log('切换公司',res)
                    if(res.status==200&&res.data.success==true){
                          this.$router.push({
                            name:'Organization',
                            params:{
                                companyId
                            }
                        })
                    }else{
                         this.$message({                          
                            message: '你没有管理员权限',
                            center: true
                        });
                    }
                })
              
            },
            //设置默认公司
            setDefaultFirm(companyId){
                 this.$confirm('你是要将该公司设为默认公司吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    // type: 'warning'
                    }).then(()=>{
                            defaultCompany({companyId}).then(res=>{
                            console.log('设置默认公司',res)
                            if(res.status==200&&res.data.success==true){
                                this.$message({
                                            type: 'success',
                                            message: '设置成功',
                                            center: true
                                        });
                            }else{
                                this.$message({                          
                                    message: '设置失败',
                                    center: true
                                });
                            }
                        })
                    })
              
            },
            //显示注册弹框
            showRegister(){
                 this.centerDialogVisible=true
                 this.name=''
                 this.scaleType=''
                 this.industryType=''
                 this.firmTature=''
                 this.address=''
            },
            //注册公司createCompany
            registerFirm(){
                if(this.name==''||this.scaleType==''||this.industryType==''||this.address==''){
                       this.$message('类容不能为空')
                }
                else{
                    createCompany({
                    name:this.name,
                    nameAbbr:'',
                    scaleType:this.scaleType,
                    industryType:this.industryType,
                    firmTature:this.firmTature,
                    address:this.address,
                    contactName:'',
                    contactMobile:'',
                    contactEmail:''
                }).then(res=>{
                        console.log(res)
                        if(res.status==200&&res.data.success==true){
                               allCompany().then(res=>{
                                console.log("所有公司",res)
                                if(res.status==200&&res.data.success==true){
                                    if(res.data.data!=null&&res.data.data.length>0){
                                        this.allFirm=res.data.data
                               
                                    }               
                                }
                            })
                        this.centerDialogVisible=false
                            this.$message({
                                message: '注册成功',
                                type:'success',
                                center: true
                                }); 

                        }   
                    })
                }   
              
            }
        },
        mounted() {
            allCompany().then(res=>{
                console.log("所有公司",res)
                if(res.status==200&&res.data.success==true){
                    if(res.data.data!=null&&res.data.data.length>0){
                          this.allFirm=res.data.data
                          
                    }               
                }
            })
        },
    }
</script>

<style lang="scss">
    .firm{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        .firm-register{
            width: 100%;
            height: 140px;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid #ccc;
            background-color: rgb(242, 242, 242);
        }
        ul{
            font-size: 14px;
            flex: 1;
            padding:30px 100px;
            overflow: auto;
            li{
                min-width: 470px;
                height: 100px;
                border: 1px solid #ccc;
                border-radius: 6px;
                display: flex;
                justify-content:space-between;
                align-items: center;
                float: left;
                margin-left: 20px;   
                position: relative;       
            }
            .firm-p1{
                width: 60px;height: 60px;
                border-radius: 50%;
                border: 1px solid #ccc;
                margin:0 20px;
                position: relative;
                z-index: 10;
            }
            .firm-p2{
                color: rgb(153, 153, 153);
                margin-top: 10px;
            }
            .firm-p3{
                color: #09f;
                cursor: pointer;
                line-height: 98px;
                width: 80px;
                margin-left: 20px;
                text-align: center;
                border-left: 1px solid #ccc;
                 background-color: rgb(242, 242, 242);
            }
           .defaultFirm{
               margin-top: 10px;
               font-size: 12px;
               height: 12px;
               color: #09f;
            //    color: rgb(153, 153, 153);
               cursor: pointer;
            //    &:hover{
            //        color:#09f;
            //    }
           }
            .firm-img{
                position:absolute;
                top:0;
                left: 0;
                width: 40px;
                height: 40px;
                background: url('/static/img/u1112.png') no-repeat;
            }
        }
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
        .el-dialog{
            width: 600px;
        }
        .firm-register_message{
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            p{
                width: 90px;
                line-height: 40px;
            }
        }
    }
</style>