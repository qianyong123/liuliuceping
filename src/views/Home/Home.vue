<template>
    <div class="home">
        <hader></hader>
        <div class="content">         
            <!-- <navs></navs> -->
            <div class="main-content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import Hader from '@/components/Hader.vue';
import Navs from '@/components/Navs.vue';
    export default {
        name:"Home",
        components:{
            Hader,
            Navs
        },
        data(){
            return{

            }
        },
        created() {
             
        },
    }
</script>

<style lang="scss" scoped>
    .home{
        // padding:20px;
        height: 100%;
        width: 100%;
    }
    .content{
        display: flex;
        // padding: 20px;
        width: 100%;
        height: 100%;
        
    }
    .main-content{
        flex:1;
        width: 100%;
        height: 100%;
        padding-top: 60px;      
         box-sizing: border-box;
    }
</style>






