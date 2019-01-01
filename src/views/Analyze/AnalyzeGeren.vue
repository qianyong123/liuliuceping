<template>
    <div>
        <p style="margin:20px 0;">张三  个人评测</p>
        <div id="leida2" style="width:650px;min-height:450px;"></div>
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
        </el-table>
    </div>
</template>

<script>
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
             //雷达图
            leida2(){
                let option = {
                    // title: {
                    //     text: '基础雷达图'
                    // },
                    tooltip: {},
                    // legend: {
                    //     data: ['预算分配（Allocated Budget）',]
                    // },
                    radar: {
                        // shape: 'circle',
                        name: {
                            textStyle: {
                                color: '#fff',
                                backgroundColor: '#999',
                                borderRadius: 3,
                                padding: [3, 5]
                        }
                        },
                        indicator: [
                        { name: '销售', max: 6500},
                        { name: '管理', max: 16000},
                        { name: '信息技术', max: 30000},
                        { name: '客服', max: 38000},
                        { name: '研发', max: 52000},
                        { name: '市场', max: 25000}
                        ]
                    },
                    series: [{
                        name: '预算 vs 开销（Budget vs spending）',
                        type: 'radar',
                        // areaStyle: {normal: {}},
                        data : [
                            {
                                value : [4300, 10000, 28000, 35000, 50000, 19000],
                                // name : '预算分配（Allocated Budget）'
                            },
                            // {
                            //     value : [5000, 14000, 28000, 31000, 42000, 21000],
                            //     name : '实际开销（Actual Spending）'
                            // }
                        ]
                    }]
                };
                 let myChart2 =this.$echarts.init(document.getElementById('leida2'));
                 myChart2.setOption(option);
            },
        },
        mounted() {
            this.leida2()
        },
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