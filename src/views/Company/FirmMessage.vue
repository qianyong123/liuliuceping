<template>
    <div class="firm-message">
         <div>
            <el-button @click="onAmend(1)" v-if="isamend" type="primary" plain style="margin:20px 20px;width：100px;">修改信息</el-button>
            <el-button @click="onAmend(2)" v-else type="primary" plain style="margin:20px 20px;width：100px;">保存修改</el-button>
            <div class="firm-message_p1">
                 <b>企业logo</b>
                 <p class="firm-logo">
                     <i class="el-icon-plus"></i>
                 </p>
             </div>
             <p>
                 <b>企业名称</b>
                 <span  v-if="isamend">{{name}}</span>
                 <el-input
                 v-else
                placeholder="请输入企业名称"
                style="width:300px;"
                v-model="name"
                clearable>
                </el-input>
             </p>
              <!-- <p>
                 <b>简称</b>
                 <span  v-if="isamend">{{nameAbbr}}</span>
                <el-input
                v-else
                placeholder="请输入简称"
                style="width:300px;"
                v-model="nameAbbr"
                clearable>
                </el-input>
             </p> -->
              <p>
                 <b>所属行业</b>
                 <span  v-if="isamend">{{industryType_1}}</span>
                <template v-else >
                <el-select v-model="industryType" placeholder="请选择企业规模">
                    <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                </template>
             </p>
              <!-- <p>
                 <b>企业性质</b>
                 <span  v-if="isamend">{{value4_1}}</span>
                <template v-else >
                <el-select v-model="value4" placeholder="请选择企业规模">
                    <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                </template>
             </p> -->
              <p>
                 <b>企业规模</b>
                 <span  v-if="isamend">{{scaleType_1}}</span>
                <template v-else >
                <el-select v-model="scaleType" placeholder="请选择企业规模">
                    <el-option
                    v-for="item in options3"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                </template>
             </p>
              <p>
                 <b>联系电话</b>
                 <span  v-if="isamend">{{contactMobile}}</span>
                <el-input
                v-else
                placeholder="请输入联系电话"
                style="width:300px;"
                v-model="contactMobile"
                clearable>
                </el-input>
             </p>
              <p>
                 <b>企业邮箱</b>
                 <span  v-if="isamend">{{contactEmail}}</span>
                <el-input
                v-else
                placeholder="请输入企业邮箱"
                style="width:300px;"
                v-model="contactEmail"
                clearable>
                </el-input>
             </p>
              <p>
                <b>地址</b>
                <span  v-if="isamend">{{address}}</span>
                <el-input
                v-else
                placeholder="请输入地址"
                style="width:300px;"
                v-model="address"
                clearable>
                </el-input>
             </p>
              <div style="margin:20px 0;">
                <el-button @click="deleteFirm" style="margin-right:20px;" type="primary" plain>注销企业</el-button>
                 <span>注销企业后将无法恢复原有的数据，请谨慎操作!</span>
            </div>
         </div>
        
    </div>
</template>

<script>
import {deleteCompany,editCompany,selectCompanyInfo} from '@/axios/api'
    export default {
        name:"FirmMessage",
        data(){
            return{
                isamend:true,
                companyId:'',//公司id
                name:'四川正汇通企业管理有限公司',
                nameAbbr:'正汇通',
                industryType:'1',
                industryType_1:'互联网IT',
                value4:'2',
                value4_1:'国有企业',
                scaleType:'3',
                scaleType_1:'50~100人',
                contactMobile:'028-86556666',
                contactEmail:'zhenghuitong@163.com',
                address:'汇都总部园',
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
            //切换修改、保存
            onAmend(id){
               
                if(id==2){
                    this.isamend=!this.isamend
                    editCompany({
                        companyId:this.companyId,
                        name:this.name,               
                        scaleType:this.scaleType,
                        industryType:this.industryType,
                        address:this.address,
                        contactName:'',
                        contactMobile:this.contactMobile,
                        contactEmail:this.contactEmail
                    }).then(res=>{
                        console.log(res)
                    })
                    let industryType=Number(this.industryType)-1,
                        scaleType=Number(this.scaleType)-1,
                        value4=Number(this.value4)-1;
                    this.industryType_1=this.options1[industryType].label
                    this.scaleType_1=this.options3[scaleType].label
                    this.value4_1=this.options2[value4].label
                }
                else
                     this.isamend=!this.isamend
            },
            //注销公司
            deleteFirm(){
                 this.$confirm('确定要注销企业吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        deleteCompany({
                            companyId:this.companyId
                        }).then(res=>{
                            console.log(res)
                            if(res.status==200&&res.data.success==true){
                                this.$router.push('/firm')
                                this.$message({
                                        message: '注销成功',
                                        type:'success',
                                        center: true
                                        }); 
                            }
                        }).catch(() => {
                            console.log('取消注销')        
                        });
                  
                    })
                
            }
        },
        mounted() {
            this.companyId=sessionStorage.getItem('companyId')
            selectCompanyInfo({
                companyId: this.companyId
            }).then(res=>{
                console.log('公司信息',res)
                if(res.status==200&&res.data.success==true&&res.data.data!=null){
                    //   let industryType=Number(this.industryType)-1,
                    //     scaleType=Number(this.scaleType)-1,
                    //     value4=Number(this.value4)-1;
                    this.industryType_1=this.options1[res.data.data.industryType-1].label
                    this.scaleType_1=this.options3[res.data.data.scaleType-1].label

                    this.industryType=res.data.data.industryType
                    this.scaleType=res.data.data.scaleType
                    this.address=res.data.data.address
                    this.name=res.data.data.name
                    this.contactEmail=res.data.data.contactEmail
                    // this.contactName=res.data.data.contactName
                    this.contactMobile=res.data.data.contactMobile
                    // this.contactEmail=res.data.data.contactEmail
                    // this.value4_1=this.options2[value4].label
                }   
            })
        },
    }
</script>

<style lang="scss">
    .firm-message{
        flex: 1;
        overflow: auto;
        display: flex;
        justify-content: center;  
        padding:30px;
        font-size: 14px;
        p{
            border-bottom: 1px solid #ccc;
            line-height: 80px;
            width:600px;
            padding:0 20px;
        }
        b{
            display: inline-block;
            width: 100px;  
            font-weight:500;  
            //  text-align: right;        
        }
        .firm-message_p1{
            height:150px;
            display: flex;
            align-items: center;
            border-bottom: 1px solid #ccc;
            padding:0 20px;
            font-size: 14px;
            .firm-logo{
                display:flex;
                width: 100px;
                height: 100px;
                border: 1px solid #ccc;
                border-radius:6px;
                justify-content: center;
                align-items: center;
                cursor: pointer;
            }
        }
    }
</style>