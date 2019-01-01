<template>
        <div class="navs">
            <ul class="navs_ul">
                <router-link 
                tag="li"
                v-for="itme in navs"
                :key="itme.id"
                :to="itme.path"
               
               :class="{libcg:bcg==itme.id}"
                >
                <div style="height: 60px;width: 60px;"  @click="Libcg(itme.id)">
                    {{itme.title}}
                </div>             
                </router-link>
            </ul>
        </div>
</template>

<script>
// import  {requestToken}  from '@/api/api.js';
    export default {
        name:"Login",
        data(){
            return{
                navs:[
                    {id:1,path:'/overview',title:'概览'},
                    {id:2,path:'/news',title:'新建'},
                    {id:3,path:'/analyze',title:'分析'},
                    {id:4,path:'/bank',title:'卷库'},
                    {id:5,path:'/set',title:'设置'},
                    {id:6,path:'/help',title:'帮助'}
                ],
                bcg:2
            }
        },
        methods:{
            Libcg(id){//点击换背景色
                this.bcg=id;
                sessionStorage.setItem('bagId',this.bcg)
            },
           
        },
        mounted() {
          let id=sessionStorage.getItem('bagId');
          if(id){
              this.bcg=id;
          } ;            
        },
        created() {
                   
        },
    }
</script>

<style lang="scss" scoped>
  .navs{
      width:500px;
      height:60px;
      background-color:#f3f0f0e5;
      color: rgba(17, 15, 15, 0.747);
      position: fixed;
      top:0px;
      left:50%;
      margin-right:250px;
      z-index: 9999;
      .navs_ul{
          display: flex;
        li{
            height: 60px;
            width: 60px;
            border-bottom: 1px solid #ccc;
            text-align:center;
            line-height: 60px;
            box-sizing: border-box;
            &:hover{
                background: #b9ccca;
                color: #09f;
                        
            }
        }
      }
     
      .libcg{
          background: #b9ccca;
          color: #09f; 
      }
  }
</style>






