<template>
    <div class="newNav">
        <p style="cursor: pointer;" @click="returns">
            返回首页
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
                username:'15000000000'
            }
        },
        methods:{
            returns(){
                this.$router.push('/home')
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
        },
    }
</script>

<style lang="scss" scoped>
    .newNav{
        width:100%;
        height:60px;
        background:#09f;
        color: #fff;
        position: absolute;
        top:0;
        left: 0;
        padding:0 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .name{
            display:flex;
            height: 60px;
            align-items: center;
        }
    }
</style>