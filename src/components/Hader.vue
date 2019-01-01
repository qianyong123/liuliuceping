<template>

  <div class="hader">
      <div class="hader-left">
          <div class="logo">
            <img  src="/static/img/u57.png" alt="logo">
          </div>
          <div class="frim-name">问卷测评</div>
          <!-- <a class="qiehuan">[切换]</a> -->
      </div>
      <div>
          <ul class="navs_ul">
                <router-link 
                tag="li"
                v-for="itme in navs"
                :key="itme.id"
                :to="itme.path"
               :class="{libcg:bcg==itme.id}"
                >
                <div style="height:60px;"  @click="Libcg(itme.id)">
                    {{itme.title}}
                </div>             
                </router-link>
            </ul>
      </div>
      <div class="hader-right" @mouseenter="enteruser"  @mouseleave="leaveuser">
          <div class="head">
            <img style="width:40px;" src="/static/img/header-img.png" alt="头像"/>
          </div>
          <div class="name">{{username}}</div>
          <!-- <div @click="quit" class="qiehuan">退出</div> -->
          <ul class="userMsessage" v-show="isuser">
              <router-link 
              v-for="item in userMsessage"
              :key="item.id"
              tag="li"
              :to="item.path">
                <div @click="quit(item.id)">
                  <img :src="item.icon" alt="">
                  <span style="margin-left:10px;"> {{item.text}}</span>               
                </div>              
              </router-link>
          </ul>
      </div>

  </div>
</template>

<script>
import bus from '@/js/bus.js'
  export default {
    data() {
      return {
          username:'13000000000',
          bcg:1,
          isuser:false,
          navs:[
                {id:1,path:'/home',title:'我的问卷'},
                {id:2,path:'/bank',title:'问卷模板'},
                {id:3,path:'/set',title:'扩展中心'},
                // {id:4,path:'/help',title:'帮助中心'}
          ],
          userMsessage:[
            // {id:1,icon:'/static/img/u389.png',text:'游客',path:'/'},
            {id:2,icon:'/static/img/u372.png',text:'基本资料',path:'/UserData'},
            {id:3,icon:'/static/img/u372.png',text:'我的积分',path:'/Integral'},
            {id:4,icon:'/static/img/u376.png',text:'企业管理',path:'/firm'},
            // {id:5,icon:'/static/img/u376.png',text:'账号安全',path:'/'},
            {id:6,icon:'/static/img/u384.png',text:'退出',path:'/login'},
          ]
      }
    },
    methods:{
        quit(id){
          if(id==6){
             this.$store.commit('del_token');
             this.$router.push('/login');  
          }             
        },
        Libcg(id){//点击切换边框
            this.bcg=id;
            sessionStorage.setItem('bagId',this.bcg)
        },
        //显示用户信息
        enteruser(){
          this.isuser=true
        },
        //隐藏用户信息
        leaveuser(){
          this.isuser=false
        },
        //隐藏边框
        leaveBorder(){
          this.bcg=55;
        }
    },
    created() {
      let username=localStorage.getItem('username')
      if(username){
          this.username=username
      }
      bus.$on('leaveBorder',this.leaveBorder)
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '@/stylecss/main.scss';
  .hader{
    background: #fff;
    width: 100%;
    height: 60px;
    display:flex;
    justify-content:space-between;
    align-items: center;
    padding:0 20px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    border-bottom:1px solid #ccc;
    .qiehuan{
        // color: #ccc;
        &:hover{
          color: #f00;
        }
      }
    .hader-left{
      display: flex;
      align-items: center;
      color: #fff;
      cursor: pointer;
      .logo{
        width: 40px;
        height: 40px;
        img{
          width: 100%;
          height: auto;
        }
      }
      .frim-name{
        margin: 0 10px;
      }
      
    }
    .hader-right{
      height: 60px;
      // width: 165px;
      display: flex;
      align-items: center;
      clear: #fff;
      position: relative;
      cursor: pointer;
      .name{
        margin: 0 10px;
      }
      .userMsessage{
        position: absolute;
        background: #fff;
        border: 1px solid #ccc;
        color: #000;
        font-size: 14px;
        top:59px;
        right: 0px;
        width: 165px;
        border-bottom: 0;
        div{
          height: 45px;
          border-bottom: 1px solid #ccc;
          padding:0 10px;
          display: flex;
          align-items: center;
          &:hover{
            background: rgb(242, 242, 242);
          }
        }
      }
    }
     .navs_ul{
          display: flex;
        li{
            height: 60px;
            text-align:center;
            line-height: 60px;
            box-sizing: border-box;
            margin-right:20px;
            padding:0 20px;
            cursor: pointer;
            &:hover{
               border-bottom:4px solid $bcg;
               color: $bcg;                  
            }
        }
         .libcg{
           border-bottom:4px solid $bcg;   
            color: $bcg;    
        }
      }
  }
</style>

