<template>
    <div style="width:100%;">
        <div v-if="collections2.length!=0">
            <div style="width:100%;min-height:200px;">
                  <el-table
                        :data="userinfo"                  
                        style="width:100%;"> 
                        <el-table-column
                        type="index"
                        width="50">
                        </el-table-column>                  
                        <el-table-column
                            v-for="(item,index) in collections2"
                            :key="index"            
                            :prop="item.prop"
                            :label="item.label"
                            width="180">
                        </el-table-column>         
                    </el-table>
            </div>
          
            <div style="margin-top:30px;">
                    <el-pagination
                    @current-change="handleCurrentChange"
                    :pager-count='5'
                    :page-size='page'
                    :current-page='currentpage'
                    background
                    layout="total,prev, pager, next"
                    :total='amout'>
                    </el-pagination>
            </div>
        </div>
        <div v-else style="min-height:100px;line-height:100px;">
            没有收集信息
        </div>
    </div>
</template>

<script>
import { collectionInfo } from '@/axios/api'
    export default {
        props:[],
        data(){
            return{
                amout:80,
                currentpage:1,
                page:10,
                paperId:'',
                start:1,
                collections2:[],
                userinfo: []
            }
        },
        methods:{
            pageCount(e){
              if(e.target.tagName=='LI'){
                  console.log(e.target.innerHTML)
              }   
            // console.log(this.currentpage)   
          },
          handleCurrentChange(val){
            this.currentpage=val
            this.collectionInfos(val)
              console.log(val)
          },
          collectionInfos(val){
               collectionInfo({
                    paperId:this.paperId,
                    pageSize:'10',
                    pageNo:val
                }).then(res=>{
                    console.log(res)
                    if(res.status==200&&res.data.success==true){
                      if(res.data.data.userinfo==null||res.data.data.userinfo==undefined){
                          return
                      }else{
                          let collections=res.data.data.collections.split(',')
                            let collections2=[]
                            collections.forEach(data=>{
                                if(data=='姓名'){
                                    collections2.push({prop:'name',label:data})
                                }
                                else if(data=='手机'){
                                    collections2.push({prop:'phoneNumber',label:data})
                                }
                                else if(data=='公司'){
                                    collections2.push({prop:'companyName',label:data})
                                }
                                else if(data=='职位'){
                                    collections2.push({prop:'postName',label:data})
                                }
                                else if(data=='性别'){
                                    collections2.push({prop:'gender',label:data})
                                }
                            }) 
                            this.collections2=collections2
                            this.userinfo=res.data.data.userinfo
                            this.amout=res.data.total
                      }
                        
                    }   
                })
          }
        },
        mounted() {  
            let paperProperty=this.$route.params.paperProperty
            if(paperProperty!=undefined||paperProperty!=null){
                sessionStorage.setItem('paperProperty',JSON.stringify(paperProperty))
            }else{
                paperProperty=JSON.parse(sessionStorage.getItem('paperProperty'))  
            }
            this.paperId=paperProperty.paperId
            this.collectionInfos(1);
        },
        
    }
</script>

<style lang="scss" scoped>

</style>