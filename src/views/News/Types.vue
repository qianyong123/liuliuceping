<template>               
        <div class="types">
            <el-collapse v-model="activeName" accordion>
                <el-collapse-item class="title" name='1'>
                    <template slot="title">
                    <i class="header-icon el-icon-tickets" style="padding:5px;"></i>自由新建
                    <!-- <el-button v-on:click.stop style="float:right;margin-top:10px;margin-right:10px;" type="info" plain size="mini">导入</el-button> -->
                    </template>
                    <div class="types-name">
                        <el-button class="types-name_item" icon="el-icon-star-on" type="primary" plain                        
                        v-for="(item,index) in types"
                        :key='index'
                        @click="$emit('pushText',index)"                      
                        >
                            {{item}}
                        </el-button>
                     
                    </div>  
                </el-collapse-item>
                <el-collapse-item class="title title2" name='2'>
                    <template slot="title" >
                        <i class="header-icon el-icon-menu" style="padding:5px;"></i>我的模板
                    </template>
                    <div v-if="0==templates.length" style="min-height:100px;text-align:center;line-height:100px;">模板为空</div>
                    <div class="types-name" v-else>
                        <div 
                        v-for="(item,index) in templates"
                        :key="index"
                        style="width:100%;display: flex;align-items: center;justify-content: space-between"
                        >
                            <el-button @click="$emit('applyTemplate')" class="types-name_item2" type="primary" plain>{{item}}</el-button>  
                            <i @click="$emit('deleteTemplate',index)" style="font-size:25px;color:#ccc;" class="el-icon-circle-close-outline"></i>
                        </div>                                         
                    </div>
                </el-collapse-item>
                    
            </el-collapse>
        </div>         
</template>

<script>
    export default {
        name:"Types",
        props:['templates'],
        data(){
            return{
                activeName:'1',
                types:[
                    '单选题',
                    '多选题',
                    '填空题',                                                   
                ],
               
            }
        },
        methods:{
            textType(index){
                console.log(index);
            }
        }
    }
</script>

<style lang="scss"> 
        .types{
            flex:0.2;
            border-right:1px solid #ccc;

            .title{
                min-height:60px;
                border-bottom: 1px solid #ccc;
                display: flex;
                flex-direction: column;
                justify-content: center;
                padding: 0 10px; 
                .el-collapse-item__wrap{
                height: 100%;
                overflow: auto; 
              }              
            }
          .title2{
              border-top: 1px solid #ccc;
              margin-bottom:30px;
            
              .el-collapse-item__wrap{
                height: 100%;
                overflow: auto; 
              }
          }
           .types-name{
               display: flex;
               flex-direction: column;
               align-items: center;
               margin-top: 10px;
               padding:0 30px;
               box-sizing: border-box;               
               .types-name_item{
                //    width:200px;
                    width: 100%;
                   margin:10px 0;
                   text-align:left;
               }
               .types-name_item2{
                    width:80%;
                   margin:10px 0;
                   height: 60px;
               }
           }
        }
        .el-collapse-item__header{             
                border:0!important;
        }
        .el-collapse{
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
</style>






