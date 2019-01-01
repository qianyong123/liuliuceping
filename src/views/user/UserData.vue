<template>
    <div class="userdata">
        <div class="userdata-main">
            <div class="header">
                <p>用户头像</p>
                <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
             
            </div>
            <ul>
                <li 
                v-for="(item,index) in data"
                :key="index">
                    <p class="text">{{item}}</p>
                    <el-radio-group v-if="1==index" v-model="input[index]">
                        <el-radio :label="1">男</el-radio>
                        <el-radio :label="2">女</el-radio>
                    </el-radio-group>
                    <el-input v-if="0==index||4==index" v-model="input[index]" placeholder="请输入内容"></el-input>
                    <el-date-picker
                        v-if="2==index"
                        v-model="dataTime"
                        type="date"
                        placeholder="选择日期 1990-01-01">
                        </el-date-picker>
                    <el-select v-if="3==index" v-model="value" placeholder="请选择">
                        <el-option
                        v-for="item in xueli"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>  
                    <el-select v-if="5==index" v-model="value2" placeholder="请选择">
                        <el-option
                        v-for="item in face"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>  
                     <el-radio-group v-if="6==index" v-model="input[index]">
                        <el-radio :label="1">未婚</el-radio>
                        <el-radio :label="2">已婚</el-radio>
                    </el-radio-group>                                  
                </li>
            </ul>
            
            <el-button @click="save" style="margin-top:30px;" type="primary">保存修改</el-button>
        </div>
        <!-- <calendar></calendar> -->
    </div>
</template>

<script>
// import Calendar from 'vue-calendar-component';
import { formatDate } from '@/js/date.js'
import bus from '@/js/bus.js'
    export default {
        name:'UserData',
        components:{
         
        },
        data(){
            return{
                input:['','','','','','',''],
                data:[
                    '用户名',
                    '性别',
                    '出生日期',
                    '学历',
                    '毕业院校',
                    '政治面貌',
                    '婚姻状况'
                ],
                xueli:[
                    {value:'初中',label:'初中'},
                    {value:'高中',label:'高中'},
                    {value:'大专',label:'大专'},
                    {value:'本科',label:'本科'},
                    {value:'硕士',label:'硕士'},
                    {value:'博士',label:'博士'}
                ],
                 face:[
                    {value:'团员',label:'团员'},
                    {value:'党员',label:'党员'},
                    {value:'其他',label:'其他'},                
                ],
                value:'',
                value2:'',
                dataTime:'1990-01-01',
                imageUrl:''
            }
        },
        methods:{
           save(){
               console.log(this.input)
               console.log(this.value,this.value2)
               console.log(this.dataTime)
              let data=formatDate(this.dataTime,'yyyy-MM-dd')
              console.log(data)
           },
           handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
                console.log( this.imageUrl)
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }
        },
        created() {
            bus.$emit('leaveBorder')
        },
    }
</script>

<style lang="scss" >
    .userdata{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        font-size: 14px;
        span{
            display: inline-block;
        }
        .userdata-main{
            margin-top: 50px;
            // border: 1px solid #ccc;
            // padding: 20px;
        }
        .header{
            display: flex;
            align-content: center;
            div{
                width: 80px;
                height: 80px;
                text-align: center;
                line-height: 80px;
                border: 1px solid #ccc;
                border-radius: 6px;
                color: #ccc;
                font-size: 20px;
                cursor: pointer;
                span{
                    font-weight: 600;
                }
            }
            p{
                line-height: 80px;
                margin-right: 20px;
            }
        }
        li{
            display: flex;
            height: 40px;
            align-items: center;
            width: 300px;
            margin-top: 20px;       
            .text{
                min-width:60px;
                text-align: right;
                margin-right: 20px;
            }
        }
        //头像
         .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
        }
        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 80px;
            height: 80px;
            line-height: 80px;
            text-align: center;
        }
        .avatar {
            width: 80px;
            height: 80px;
            display: block;
        }
    }
</style>