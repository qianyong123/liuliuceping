<template>
    <div class="showTemplate">
        <!-- <div 
            v-for="(items,indexs) in template"
            :key="indexs"
            class="myTemplate" 
            @mouseenter="TPenter(indexs)"
            @mouseleave="TPleave(indexs)">
            <span v-if="items.paperType==1" class="diaocha" style="border:1px solid rgb(211, 163, 7);">调查问卷</span>
            <span style="background-color: rgb(102, 102, 204);border:1px solid rgb(102, 102, 204);" v-else-if="items.paperType==2" class="diaocha">360测评</span>
            <span style="background-color: rgb(255, 153, 102);;border:1px solid rgb(255, 153, 102);" v-else-if="items.paperType==3" class="diaocha">投票统计</span>
            <span style="background-color: rgb(51, 153, 102);border:1px solid rgb(51, 153, 102);" v-else-if="items.paperType==4" class="diaocha">活动报名</span>
            <p style="height:70px;line-height:20px;overflow: hidden;">{{items.paperTitle}}</p>                    
           
            <div v-if="iscaozuoImg==indexs" class="myTemplate-caozuo">
                <div class="myTemplate-caozuo caozuoimg">
                    <el-tooltip v-for="(item,index) in caozuoimg" :key="index" class="item" effect="dark" :content="item.title" placement="bottom-start">
                        <img                                
                        :src="item.img"
                        @mouseenter="imgenter(index)" 
                        @mouseleave="imgleave()"
                        @click="$emit('onskip',index,items)"
                        > 
                    </el-tooltip>                                                         
                </div>
                <el-tooltip class="item" effect="dark" content="更多" placement="top-start">
                    <i style="color:#ccc;font-size:20px;" @click.stop="$emit('ismore',indexs)" class="el-icon-more"></i>
                </el-tooltip>
            </div>
            <p v-else style="line-height:40px;display: flex;justify-content:space-between;">
                <span>{{items.createTime | times}}</span>
                <span v-if="items.paperState==1">已发布</span>
                <span v-else-if="items.paperState==2">未发布</span>
                <span v-else-if="items.paperState==3">已结束</span>
            </p>
                                
            <div v-show="ismores==indexs" class="more_caozuo">
                <p 
                v-for="(text,index2) in more"
                :key="index2"
                @click="$emit('onMore',items,text)">{{text}}</p>
            </div>                                  
        </div> -->
        答题记录
    </div>
</template>

<script>
import {formatDate} from '@/js/date.js'
    export default {
        name:'GdTemplat',
        props:['ismores','template'],
        data(){
            return{
                iscaozuoImg:9988,   //显示更多      
                caozuoimg:[
                    { img:'/static/img/u198.png',title:'编辑'},
                    { img:'/static/img/u199.png',title:'发布'},
                    { img:'/static/img/u197.png',title:'统计'},
                ],                 
                caozuoimg2:[
                    { img:'/static/img/u198_mouseOver.png'},
                    { img:'/static/img/u199_mouseOver.png'},
                    { img:'/static/img/u197_mouseOver.png'},
                ],
                 //更多
                more:[
                    '预览',
                    // '复制',
                    // '导出问卷',
                    '删除',                 
                    '清除数据'
                ],
            }
        },
        filters:{
            times(time){
                let date=new Date(time)
              return formatDate(date,'yyyy-MM-dd')
            }
        },
        methods:{
            //鼠标移入模板
            TPenter(id){
                this.iscaozuoImg=id        
            },
            //鼠标移出模板
            TPleave(id){
                this.iscaozuoImg=9988
            },
            //鼠标移入模板操作img
            imgenter(id){
                this.caozuoimg[id].img=this.caozuoimg2[id].img
            },
            //鼠标移出模板操作img
            imgleave(){
                this.caozuoimg=[
                    { img:'/static/img/u198.png',title:'编辑'},
                    { img:'/static/img/u199.png',title:'发布'},
                    { img:'/static/img/u197.png',title:'统计'}
                ]
            },
           
        }
    }
</script>

<style lang="scss">
      .showTemplate{
        background: #F5F7FA;
        flex: 1;        
        font-size: 14px;
        padding:20px 0;
        overflow: auto;
        .myTemplate{
            width: 236px;
            height: 160px;
            border: 1px solid #09f;
            border-radius: 4px;
            background: #fff;
            position: relative;
            float: left;
            margin:0 0 20px 20px;             
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding:0 20px;
            .more_caozuo{
                position: absolute;
                top:150px;
                right:-20px;
                background: #fff;
                border:1px solid #ccc;
                border-radius: 4px;
                border-bottom: 0;
                width: 100px;
                z-index:100;
                p{
                    line-height: 30px;
                    text-align: center;
                    border-bottom:1px solid #ccc;
                    cursor: pointer;
                    &:hover{
                        background: #409EFF;
                        color: #fff;
                    }
                }
            }
            .myTemplate-caozuo{
                width: 100%;
                height: 40px;
                display: flex;
                justify-content: space-between;
                align-items: center;                                 
                img{
                    width: 16px;
                    cursor: pointer;
                }
                
                
            }           
            .caozuoimg{
                width: 80px;
                cursor: pointer;
            }
            .diaocha{
                background: rgb(211, 163, 7);
                color: #fff;
                width:70px;
                height: 24px;
                line-height: 24px;
                text-align: center;            
            }
          }
        }
</style>