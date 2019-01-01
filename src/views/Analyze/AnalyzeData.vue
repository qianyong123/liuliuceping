<template>
<div style="width:100%;">
    <div 
    class="AnalyzeData" 
     v-for="(item,index) in qusetionData"
     :key="index"
    >
        <h3 style="line-height:24px;">{{index+1}}.{{item.question_title}}</h3>
        <p style="line-height:30px;">{{item.question_comment}}</p>
        <div style="margin-top:20px;"  v-show="item.question_type==1||item.question_type==2">
            <div class="analyze-cut2">
                <div class="analyze_type2">                              
                    <p 
                    @click="$emit('onBar',index)"
                    class="messge_btn2"
                    :class="{ cutbcg:1==item.chart1}" 
                    style="border-right:1px solid #ccc">柱状图</p>
                    <p 
                    @click="$emit('onBarType',index)"
                    class="messge_btn2"
                    :class="{ cutbcg:2==item.chart2}" 
                    style="border-right:1px solid #ccc">条形图</p>
                    <p 
                    @click="$emit('onPie',index)"
                    :class="{ cutbcg:3==item.chart3}" 
                    class="messge_btn2">饼图</p>
                </div>
                <!-- <el-button type="primary" plain>下载图片</el-button> 'BarType-'+index-->
            </div>
            <div @mouseover="$emit('mouseoverBar',index)">
                <div v-show="item.chart1==1" :id="'Bar-'+index" style="width:650px;min-height:400px;"></div>
                <div v-show="item.chart2==2" :id="'BarType-'+index" style="width:650px;min-height:400px;padding:10px;"></div>
                <div v-show="item.chart3==3" :id="'pie-'+index" style="width:650px;min-height:400px;padding-left:20px;"></div>            
            </div>
            <el-table
                :data="item.option_list"
                style="width:100%;margin-top:20px;">
                <el-table-column
                    prop="option_name"
                    label="选项"
                    >
                </el-table-column>
                <el-table-column
                    prop="answer_count"
                    label="选择次数"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="answer_percent"
                    width="180"
                    label="答案占比">
                </el-table-column>
            </el-table>
        </div>
        <div v-show="item.question_type==3" style="padding-left:12px;">
            <div class="analyze-cut2" style="height:50px;border-top:1px solid #ccc;border-bottom:1px solid #ccc;margin-top:10px;">
                <p>问题答案</p>
                <!-- <el-button @click="downdata" type="primary" plain>下载数据</el-button> -->
            </div>
            <div style="padding-top:20px;">
                <p 
                id="data" 
                v-for="(item2,index2) in item.answer_content_list"
                :key="index2"
                style="line-height:26px;width:100%;">
                   {{index2+1}}. {{item2.answer_content}}
                </p>
            </div>
            
        </div>
        <p style="line-height:48px;border-bottom:1px solid #ebeef5;color:14px;padding:0 12px;">答题次数:&nbsp;&nbsp;{{item.answer_count}}</p>
    </div>
</div>
</template>

<script>
    export default {
        props:['qusetionData','chartBcg'],
        data(){
            return{
                isBarType:true,
                isBar:true,
                ispie:true,
                tableData: [{
                    date: '选项1',
                    name: '8',
                    address: '60%'
                }, {
                    date: '选项2',
                    name: '10',
                    address: '10%'
                }, {
                    date: '选项3',
                    name: '20',
                    address: '20%'
                }, {
                    date: '选项4',
                    name: '15',
                    address: '10%'
                }],
              
            }
        },
        methods:{    
            downdata(){
               console.log('tyd')
            }
        },
        mounted() {
            // this.$nextTick(function(){})
          
            this.isBar=false
            this.ispie=false
        },
    }
</script>

<style lang="scss">
    .AnalyzeData{
        font-size: 14px;
        margin-top:30px;
        width:70%;
        min-height: 200px;
        .analyze-cut2{
            width: 100%;
            height: 40px;
            // border-bottom: 1px solid #ccc;
            display: flex;
            justify-content:space-between;
            align-items: center;
            .analyze_type2{
                height:40px;
                border: 1px solid #ccc;
                border-radius: 4px;
                // width: 160px;
                display: flex;
                font-size: 14px;
                .messge_btn2{
                    width:80px;
                    height:40px;
                    text-align: center;
                    line-height:40px;          
                    cursor: pointer; 
                    // &:hover{
                    //     color:rgb(22, 155, 213);
                    // }                                                
                }
                .cutbcg{
                        background: #409EFF;
                        color: #fff;
                    }              
            }
         }
    }
  
</style>