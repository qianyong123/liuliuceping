<template>
    <div class="Integral-box">
        <div class="Integral">
            <!-- <div style="padding:0 20px;">
                <h4>积分信息</h4>
            </div> -->
            <div class="myIntegral">
                <div class="myIntegral-amout">
                    <p>我的积分</p>
                    <span style="margin-top:50px;">100</span>
                </div>
                <div class="Integral-introduce">
                    <p>积分介绍</p>
                </div>
            </div>
            <div class="IntegralDetail">
                <p>最近积分明细</p>
                 <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="date"
                    label="日期"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="收入/支出"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="详细说明">
                </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                     tableData: [{
                    date: '2016-05-02',
                    name: '6',
                    address: '购买360问卷赠送'
                }, {
                    date: '2016-05-04',
                    name: '6',
                    address: '购买360问卷赠送'
                }, {
                    date: '2016-05-01',
                    name: '8',
                    address: '购买360问卷赠送'
                }, {
                    date: '2016-05-03',
                    name: '9',
                    address: '购买360问卷赠送'
                }]
            }
        }
    }
</script>

<style  lang="scss" scoped>
.Integral-box{
    width:100%;
    height:100%;
    background: #ebedf0;
    .Integral{
        width: 800px;
        height:100%;
        padding-top: 80px;
        margin:0 auto;
        // background: #fff;
        .myIntegral{
            display: flex;
            height: 200px;
            width: 100%;
        background: #fff;

            // border-top: 1px solid #ccc;
            // border-bottom: 1px solid #ccc;
            // border-radius: 4px;
            .myIntegral-amout{
                border-right: 1px solid #ccc;
                width: 200px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
            .Integral-introduce{
                flex: 1;
                display: flex;
                // flex-direction: column;
                justify-content: center;
                align-items: center
            }
        }
        .IntegralDetail{
            // border-top: 1px solid #ccc;
            // border-bottom: 1px solid #ccc; 
        background: #fff;
            margin-top: 40px;
            min-height: 300px;
            padding:0 20px;
               p{
                    // background: #ebedf0;
                    line-height: 40px;
                    padding:0 10px;
                    font-size: 14px;
                    font-weight: 600;
               }
        }
    }
}
    
</style>