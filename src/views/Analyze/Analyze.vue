<template>
        <div class="analyze">
             <newnav></newnav>
            <div class="analyze-left">
                <div class="analyze-recycle ">
                    <img src="/static/img/u1054.png" alt="">
                    <span style="padding-left:10px;">回收状况</span>
                </div>
                <div class="analyze-left—steta">
                    <h3>{{answer_total}}</h3>
                    <p>总共答题人数（人）</p>
                </div>
                <div class="analyze-left—steta">
                    <h3>{{submit_total}}</h3>
                    <p>总共提交人数（人）</p>
                </div>
                <!-- <div class="analyze-left—steta">
                    <h3>50</h3>
                    <p>有效回收（份）</p>
                </div>
                <div class="analyze-left—steta">
                    <h3>50</h3>
                    <p>回收率（%）</p>
                </div> -->
            </div>
            <div class="analyze-qusetion">
                <div class="analyze-cut" v-if="paperType==1">
                    <div class="analyze_type">
                          <div 
                            v-for="(item,index) in templateCut"
                            :key="index"
                            @click="onTemplateBtn(index)"
                            :class="{ cutbcg:bcg==index,btnBorder:0==index }"                      
                            class="messge_btn">
                                <span>{{item.text}}</span>
                            </div> 
                    </div>
                </div>
                 <div class="analyze-cut" v-if="isisanalyzeGeren">
                    <div class="analyze_type">
                          <div 
                            v-for="(item,index) in templateCut2"
                            :key="index"
                            @click="onTemplateBtn2(index)"
                            :class="{ cutbcg:bcg==index,btnBorder:0==index }"                      
                            class="messge_btn">
                                <span>{{item.text}}</span>
                            </div> 
                    </div>
                </div>
                <div style=" flex:1;overflow: auto;">               
                    <div class="analyze-main_top">
                        <div>
                            <el-button v-if="paperType==1" style="background-color: #d3a307;border:1px solid #d3a307;"  size="mini" type="warning">调查问卷</el-button>
                            <el-button v-else-if="paperType==2" style="background-color: rgb(102, 102, 204);border:1px solid rgb(102, 102, 204);"   size="mini" type="warning">360测评</el-button>
                            <el-button v-else-if="paperType==3" style="background-color: rgb(255, 153, 102);;border:1px solid rgb(255, 153, 102);"  size="mini" type="warning">投票统计</el-button>
                            <el-button v-else-if="paperType==4" style="background-color: rgb(51, 153, 102);border:1px solid rgb(51, 153, 102);"  size="mini" type="warning">活动报名</el-button>
                            <span style="margin-left:10px;">{{paperTitle}}</span>
                        </div>
                        <div>
                            <!-- <el-button type="primary" plain>打印</el-button> -->
                            <!-- <el-button type="primary" plain>导出</el-button> -->
                             <el-button v-if="isisanalyzeGeren" @click="fanhuiAnalyze" type="primary" plain>返回统计</el-button>
                        </div>
                    </div>
                    <div v-show="!isisanalyzeGeren">
                        <div style="padding:20px 50px;flex:1;" v-if="paperType==2">
                            <div id="leida1" style="width:650px;min-height:450px;"></div>
                            <analyze-leibu></analyze-leibu>
                        </div>
                    </div>
                    <analyze-geren style="padding:20px 50px;flex:1;"  v-if="isisanalyzeGeren2"></analyze-geren>                
                    <div v-show="isanalyze" style="padding:20px 50px 0 50px;flex:1;position: relative;">                           
                        <analyze-data
                        :qusetionData='qusetionData'
                        :chartBcg='chartBcg'
                        @onBarType='onBarType'
                        @onBar='onBar'
                        @onPie='onPie'
                        @mouseoverBar='mouseoverBar'
                        ></analyze-data>
                        <el-table
                            v-if="loading2"
                            v-loading="loading2"
                            element-loading-text="加载中..."
                            element-loading-spinner="el-icon-loading"
                            element-loading-background="rgba(0, 0, 0, 0.9)"
                            id="loding"
                            :data="qusetionData">
                        </el-table>
                    </div>
                    <div v-show="ismessge" style="padding:30px 50px 0 50px; ">
                        <user-data
                        :userdata='userdata'
                        ></user-data>
                    </div>
                </div>
            </div>
        </div>       
</template>

<script>
import newnav from '@/components/newNav'
import AnalyzeData from './AnalyzeData'
import userData from './userData'
import AnalyzeLeibu from './AnalyzeLeibu'
import AnalyzeGeren from './AnalyzeGeren'
import bus from '@/js/bus.js'
import { basicChart,submitCount } from '@/axios/api'
    export default {
        name:"Analyze",
        components:{
            newnav,
            AnalyzeData,
            userData,
            AnalyzeLeibu,
            AnalyzeGeren
        },
        data(){
            return{
                loading2:true,
                tabPosition:'top',
                isanalyze:true,
                ismessge:false,
                Barindex:0,
                userdata:[],
                paperId:'',
                paperType:'1',
                paperTitle:'这是问卷题目',
                answer_total: 100, // 总共答题人数
                submit_total: 10 ,// 总共提交人数
                
                bcg:0,
                chartBcg:1,
                isisanalyzeGeren:false,
                isisanalyzeGeren2:false,
                templateCut:[
                    {img:'/static/img/u186.png',text:'答题统计'},
                    {img:'/static/img/u182.png',text:'信息收集'}               
                ],
                 templateCut2:[
                    {img:'/static/img/u186.png',text:'数据总览'},
                    {img:'/static/img/u182.png',text:'答题统计'}               
                ],
                qusetionData:[
                ]
            }
        },
        methods:{
          
             //切换渲染模板的方式 
            onTemplateBtn(id){
                this.bcg=id
                if(id==0){            
                    this.isanalyze=true
                    this.ismessge=false
                }
                else if(id==1){    
                     this.isanalyze=false
                     this.ismessge=true
                }             
            },
            onTemplateBtn2(id){
                this.bcg=id
                if(id==0){            
                    this.isanalyze=false
                    this.isisanalyzeGeren2=true
                }
                else if(id==1){    
                    this.isanalyze=true
                    this.isisanalyzeGeren2=false           
                    setTimeout(()=>{
                          this.Analyze(this.paperId)
                     },500)
                }             
            },
            //返回统计
            fanhuiAnalyze(){
                this.isisanalyzeGeren2=false
                 this.isisanalyzeGeren=false
                this.isanalyze=false
            },
            //360个人
            analyzeGeren2(id){
                console.log(id)
                this.isisanalyzeGeren=true
                this.isisanalyzeGeren2=true               
            },
            //鼠标mouseoverBar移柱状入图表
            mouseoverBar(index){
                this.Barindex=index
                console.log(index)
            },
             onBarType(id){      
                this.qusetionData[id].chart1=5
                this.qusetionData[id].chart2=2
                this.qusetionData[id].chart3=5
                this.chartBcg=2
            },
            onBar(id){
                // this.isBarType=false
                // this.isBar=true
                // this.ispie=false
                this.qusetionData[id].chart1=1
                this.qusetionData[id].chart2=5
                this.qusetionData[id].chart3=5
                this.chartBcg=1
                // this.Bar()
            },
            onPie(id){
                this.qusetionData[id].chart1=5
                this.qusetionData[id].chart2=5
                this.qusetionData[id].chart3=3
                this.chartBcg=3
                // this.pie()
            },
             //条形
            BarType(){
               var realDatas = [4,5];
               var index=[];
                let tooltipData=[]
                // let myChart =this.$echarts.init(document.getElementById('BarType-0'));
                let option = {
                    // title: {
                    //     // text: 'ECharts 条形图',
                    //     subtext: '选中率'
                    // },
                    tooltip: {
                        // trigger: 'axis',
                        // axisPointer: {
                        //     type: 'shadow'
                        // },
                          formatter:(realData)=>{    
                           console.log(tooltipData,realData)                                                                     
                                return tooltipData[ this.Barindex][realData.dataIndex]+ "<br />"+'人数：'+realData.data
                            }
                         
                    },
                    toolbox: {//保存为图
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    // legend: {
                    //     data: ['2011年']
                    // },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value',
                        boundaryGap: [0, 0.01]
                    },
                    yAxis: {
                        type: 'category',
                        data: ['选项1','选项2','选项3','选项4',]                                            
                    },
                    series: [
                        {
                            name: '人数',
                            type: 'bar',
                            data: [20, 60, 80, 100],
                            label: {
                                normal: {
                                    show: true,
                                    position: 'right',
                                    textStyle: {
                                        color: '#000'
                                    },
                                    formatter:function(realData){ 
                                        // console.log(realData)                                                                        
                                       return realDatas[realData.dataIndex]
                                    }
                                }
                            },
                        },
                        
                    ]
                };
                let tooltipData2=[]
                let seriesData=[],    //人数
                    yAxisData=[];           //选项
                this.qusetionData.forEach((data,index)=>{
                    // console.log(data)
                    seriesData=[]   
                    yAxisData=[]; 
                    realDatas = [];
                    tooltipData2=[]
                    let bartype=document.getElementById('BarType-'+index)
                        data.option_list.forEach((data2,index2)=>{
                            if(data2.option_name.length>6){
                               let name= data2.option_name.slice(0,6)
                               yAxisData.push(name+"..")
                            }else{
                                yAxisData.push(data2.option_name)
                            }
                            seriesData.push(data2.answer_count)
                            realDatas.push([data2.answer_percent])
                            tooltipData2.push( data2.option_name)
                            // console.log(realDatas)
                            // console.log(data2)
                        })
                    option.series[0].data=seriesData
                    option.yAxis.data=yAxisData
                    tooltipData.push(tooltipData2) 
                    let myChart =this.$echarts.init(bartype);
                    // 使用刚指定的配置项和数据显示图表。
                    myChart.setOption(option);
                })
                // 使用刚指定的配置项和数据显示图表。
                // myChart.setOption(option);
            },
              //柱状图
            Bar(){
                //     // 基于准备好的dom，初始化echarts实例
            //    let myChart =this.$echarts.init(document.getElementById('Bar'));
                let realDatas=[]
                let tooltipData=[]
                let seriesData=[],    //人数
                    yAxisData=[];         //选项
                // 指定图表的配置项和数据
                let option = {
                    // title: {
                    //     text: 'ECharts 柱状图'
                    // },
                    tooltip: {
                       formatter:(realData)=>{    
                        //    console.log(tooltipData,realData)                                                                     
                                return tooltipData[ this.Barindex][realData.dataIndex]+ "<br />"+'人数：'+realData.data
                            }
                         
                    },
                    toolbox: {//保存为图
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    // legend: {
                    //     data:['销量']
                    // },
                    xAxis: {
                         data: ['选项1','选项2','选项3','选项4',]
                    },
                    yAxis: {}                    
                    ,
                    series: [{
                        name: '人数',
                        type: 'bar',
                        data: [20, 60, 36, 100,],
                        label: {
                                normal: {
                                    show: true,
                                    position: 'top',
                                    textStyle: {
                                        color: '#000'
                                    },
                                    formatter:function(realData){                                                                         
                                       return realDatas[realData.dataIndex]
                                    }
                                }
                            },
                    }]
                };
               let tooltipData2=[]
                this.qusetionData.forEach((data,index)=>{
                    seriesData=[]    //选项
                    yAxisData=[] 
                    realDatas = []
                    tooltipData2=[]
                    // tooltipData=[]
                   let myChart1=this.$echarts.init(document.getElementById('Bar-'+index));
                       data.option_list.forEach((data2)=>{
                           tooltipData2.push(data2.option_name)
                              if(data2.option_name.length>4){
                               let name= data2.option_name.slice(0,4)
                               yAxisData.push(name+"..")
                            }else{
                                yAxisData.push(data2.option_name)
                            }
                            seriesData.push(data2.answer_count)
                             realDatas.push([data2.answer_percent])
                        })
                    option.series[0].data=seriesData
                    option.xAxis.data=yAxisData
                    tooltipData.push(tooltipData2)                     
                    // 使用刚指定的配置项和数据显示图表。
                    myChart1.setOption(option);
                })
                // 使用刚指定的配置项和数据显示图表。
                // myChart.setOption(option);
            },
            //饼状图

            pie(){
                // 基于准备好的dom，初始化echarts实例
                // let myChart =this.$echarts.init(document.getElementById('pie-0'));
                // 指定图表的配置项和数据
                let tooltipData=[]
                let option = {
                    // title : {
                    //     text: 'gst问卷',
                    //     subtext: '答卷数据',
                    //     x:'center'
                    // },
                    tooltip : {
                        // trigger: 'item',
                        // formatter: "{a} <br/>{b} : {c} ({d}%)"
                         formatter:(realData)=>{    
                           console.log(tooltipData,realData)                                                                     
                                return tooltipData[ this.Barindex][realData.dataIndex].name+ "<br />"+'人数：'+realData.value
                            }
                         
                    },
                    toolbox: {//保存为图
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    // legend: {
                    //     orient: 'vertical',
                    //     left: 'left',
                    //     data: ['直接访问','邮件营销','联盟广告','视频广告']
                    // },
                    series : [
                        {
                            name: '人数',
                            type: 'pie',
                            radius : '55%',
                            center: ['40%', '50%'],
                            data:[
                                {value:85, name:'选项1'},
                                {value:31, name:'选项2'},
                                {value:24, name:'选项3'},
                                {value:15, name:'选项4'},                           
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                },
                               
                            }
                        }
                    ]
                }
                let seriesData=[]
                let tooltipData2=[]
                 this.qusetionData.forEach((data,index)=>{
                     seriesData=[]
                     tooltipData2=[]
                   let myChart2 =this.$echarts.init(document.getElementById('pie-'+index));
                   data.option_list.forEach((data2)=>{
                         if(data2.option_name.length>6){
                               let name= data2.option_name.slice(0,6)
                                seriesData.push({ value:data2.answer_count,name:name+data2.answer_percent})
                            }else{
                                seriesData.push({ value:data2.answer_count,name:data2.option_name+data2.answer_percent})
                            }
                            tooltipData2.push({ value:data2.answer_count,name:data2.option_name+data2.answer_percent})
                   })                 
                     option.series[0].data=seriesData
                     tooltipData.push(tooltipData2)
                    // 使用刚指定的配置项和数据显示图表。
                    myChart2.setOption(option);
                })
            },
            //雷达图
            leida(){
                let option = {
                    // title: {
                    //     text: '基础雷达图'
                    // },
                    tooltip: {},
                    legend: {
                        x: 'left',
                        orient: 'vertical',
                        data: [                           
                             '张三', '李四'
                            ]
                    },
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
                                name : '张三'
                            },
                            {
                                value : [5000, 14000, 28000, 31000, 42000, 21000],
                                name : '李四'
                            },
                           
                        ]
                    }]
                };
                 let myChart2 =this.$echarts.init(document.getElementById('leida1'));
                 myChart2.setOption(option);
            },
            charts(){
                this.qusetionData.forEach((data,index)=>{
                    this.qusetionData[index].chart2=5
                    this.qusetionData[index].chart3=5
                })
            },
            //统计数据
            Analyze(paperId){

                basicChart({
                    paperId
                }).then(res=>{
                    console.log(res)
                    if(res.status==200){
                        if(res.data.success==true&&res.data.data.length>0&&res.data.data!=null){
                            console.log('成功')
                            let qusetionData=res.data.data
                            res.data.data.forEach((data,index)=>{
                                 qusetionData[index].chart1='1'
                                 qusetionData[index].chart2='2'
                                 qusetionData[index].chart3='3'
                            })   
                            this.qusetionData=qusetionData                      
                            setTimeout(()=>{
                                this.BarType()
                                this.Bar();
                                this.pie();
                                this.loading2=false
                                this.charts();
                                this.leida()
                                
                            },500)
                            
                        }
                    }
                })
            }
        },
       mounted() {
        let paperProperty=this.$route.params.paperProperty
         bus.$on('analyzeGeren2',(id)=>{
            this.analyzeGeren2(id)
        })
        if(paperProperty!=undefined||paperProperty!=null){
             sessionStorage.setItem('paperProperty',JSON.stringify(paperProperty))
        }else{
            paperProperty=JSON.parse(sessionStorage.getItem('paperProperty'))  
        }
        console.log(paperProperty.paperId)
        if(paperProperty!=undefined||paperProperty!=null){
            this.paperType=paperProperty.paperType
            this.paperTitle=paperProperty.paperTitle
            this.paperId=paperProperty.paperId
            // this.$router.replace(_url);
            if(paperProperty.paperType==2){
               this.isanalyze=false
                  setTimeout(()=>{                              
                    this.loading2=false                 
                    this.leida()
                    
                },600)
            }
            else if(paperProperty.paperType==1){
                this.Analyze(paperProperty.paperId)
            }
            //统计状态
            submitCount({
                paperId:paperProperty.paperId
            }).then(res=>{
                console.log(res)
                if(res.status==200&&res.data.success==true){
                    this.answer_total=res.data.data.answer_total
                    this.submit_total=res.data.data.submit_total
                }
            })
        }   
       
      
       },
       destroyed() {
           sessionStorage.removeItem('paperProperty')    
       },
       created() {
            this.$store.commit('headerName','退出统计')
       },
    }
</script>

<style lang="scss">
    .analyze{
        padding-top:60px;
        display:flex;
        height: 100%;
        width: 100%;
        .analyze-left{
            width: 279px;
            height: 100%;
            border-right: 1px solid #ccc;
            .analyze-recycle{
                height: 60px;
                display:flex;
                padding:0 20px;
                align-items: center;
                border-bottom: 1px solid #ccc;
            }
            .analyze-left—steta{
                height:120px;
                width:100%;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                p{
                    padding-top: 20px;
                }
            }
        }
        .analyze-qusetion{
            flex: 1;
            display:flex;
            flex-direction: column;
            // overflow: auto;
            .analyze-cut{
                width: 100%;
                height: 60px;
                border-bottom: 1px solid #ccc;
                display: flex;
                justify-content: center;
                align-items: center;
                .analyze_type{
                    height: 32px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    width: 160px;
                    display: flex;
                    font-size: 14px;
                    .messge_btn{
                        width:80px;
                        height: 32px;
                        display: flex;
                        align-items: center;
                        justify-content:center;           
                        cursor: pointer; 
                        // &:hover{
                        //     color:rgb(22, 155, 213);
                        // }                                                
                    }
                    .cutbcg{
                            background: #409EFF;
                            color: #fff;
                        } 
                    .btnBorder{
                        border-right: 1px solid #ccc;
                    }
                }
            }
            .analyze-main_top{
                display: flex;
                width: 100%;
                height: 100px;
                justify-content: space-between;
                align-items: center;
                padding:0 30px;
                border-bottom: 1px solid #ccc;
                font-size: 14px;
                .diaocha{
                    background: rgb(211, 163, 7);
                    color: #fff;
                    display: inline-block;
                    width:70px;                  
                    height: 24px;
                    line-height: 24px;
                    text-align: center;
                    margin-right:10px;
                }
            }
          .analyze-option{
            //   display: flex;
            //   flex-direction: column;
            //   align-items: center;
          }
        }
       
    }
    #loding{
    position: fixed;
    width:80px; 
    height:80px;
    font-size:12px;
    top:0;
    left:0; 
    right: 0;
    bottom: 0;       
    z-index: 999;
    margin:auto;
    border-radius:4px;
    .el-loading-text{
        color: #fff;
        font-size:12px;
        margin-top:5px;
    }
        .el-icon-loading{
        font-size:30px;
        color: #fff;
    } 
    .el-loading-spinner{
        top: 20%;
        margin: 0;
    }
}
</style>






