<template>
    <div class="newNav">
        <p style="cursor: pointer;" @click="returns">
            <i class="el-icon-back" style="font-size:20px;margin-right:10px;"></i>
            <span>{{name}}</span>
        </p>  
        <!-- <div class="name">
            <img style="width:40px;margin-right:10px;" src="/static/img/header-img.png" alt="头像"/>
            <span>{{username}}</span>
        </div> -->
    </div>
</template>

<script>
    export default {
        name:"newNav",
        data(){
            return{
                bcgs:1,
                name:'',
                username:'15000000000'
            }
        },
        methods:{
            returns(){
                this.$router.push('/')
            },
            onNav(id){
                this.bcgs=id
            }
        },
        mounted() {
          let username=localStorage.getItem('username')
          if(username){
              this.username=username
          }
         this.name= this.$store.state.headerName
        },
        
    }
</script>

<style lang="scss" scoped>
    .newNav{
        width:100%;
        height:60px;
        background:#09f;
        color: #fff;
        position:fixed;
        top:0;
        left: 0;
        padding:0 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 999;
        .name{
            display:flex;
            height: 60px;
            align-items: center;
        }
    }
</style>