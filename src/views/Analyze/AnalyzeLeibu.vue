<template>
    <div>
        <p style="margin:20px 0;">
            <span>人数统计：3人</span>
            <span style="margin-left:20px;">平均得分：8.5</span>
        </p>
        <el-table
        :data="tableData"
        border
        style="width: 100%">
            <el-table-column
                prop="name"
                label="姓名"
                width="120">
            </el-table-column>
            <el-table-column
                prop="brach"
                label="部门"
                >
            </el-table-column>
            <el-table-column
                prop="post"
                label="岗位">
            </el-table-column>
            <el-table-column
                prop="zhiji"
                label="职级"
                >
            </el-table-column>
            <el-table-column
                prop="value"
                label="平均分"
                >
            </el-table-column>
            <el-table-column
                prop="geren"          
                label="个人">
                <template slot-scope="scope">
                    <span @click="gerenAnalyze(scope.row)" class="geren">{{ scope.row.geren }}</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import bus from '@/js/bus.js'
    export default {
        data(){
            return{
                tableData: [
                    {
                    name: '王小虎',
                    brach:'技术部',
                    post:'销售员',
                    zhiji:'经理',
                    value:'8.5',
                    geren:'个人评测报告',
                }, 
                    {
                    name: '王虎',
                    brach:'技术部',
                    post:'销售员',
                    zhiji:'经理',
                    value:'9',
                    geren:'个人评测报告',
                }, 
                    {
                    name: '王小',
                    brach:'技术部',
                    post:'销售员',
                    zhiji:'经理',
                    value:'10',
                    geren:'个人评测报告',
                }, 
                ]
            }
        },
        methods:{
            gerenAnalyze(row){
                console.log(row)
                bus.$emit('analyzeGeren2',row)
            }
        }
    }
</script>

<style lang="scss">
    .geren{
        cursor: pointer;
        &:hover{
            color:aqua;
        }
    }
</style>