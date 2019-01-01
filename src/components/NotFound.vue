<template>
    <div class="cuowu">
        <div class="fanhui">
            <img src="/static/img/404.jpg">
            <p class="p1">这个页面,神秘失踪了...</p>
            <!-- <p>不如<a href="/news">返回首页</a></p> -->
        </div>
       <!-- <el-radio-group v-model="radio2">
        <el-radio
        v-for="(item,index) in radio"
        :key="index"
         :label=index>
            <span></span>
         </el-radio>      
    </el-radio-group>
     <el-popover
    placement="top"
  
    width="200"
    trigger="click"
    content="这是一段内容">
    <el-button slot="reference">click</el-button>
  </el-popover> -->
    </div>
</template>

<script>
    export default({
        name:"NonFode",
        data(){
            return{
                radio2:2,
                radio:[1,2,3],
                 visible: false
            }
        },
        mounted() {
            
        },
    });
</script>

<style lang="scss">
    .cuowu{           
            text-align: center;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            padding-bottom: 200px;
        .fanhui{
            
            p{
                font-size: 16px;
                color: #666;
                line-height: 24px;
                margin: 0 0 8px;
            }
            img{
                width:1.5rem; 
                margin-bottom: 20px;              
            }
        }
    }
</style>

