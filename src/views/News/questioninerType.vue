<template>
    <div class="questioninerType">
        <new-nav></new-nav>
        <div class="questioninerType-main">
            <div class="main-type">
               <h2 style="text-align:center;">调查问卷</h2>
               <p>
                   这是问卷说明这是问卷说明这是问卷说明这是问卷说明这是问卷说明这是问卷说明这是问卷说明这是问
                   卷说明这是问卷说明这是问卷说明这是问卷说明这是问卷说明这是问卷说明这是问卷说明这是问卷说明
                </p>
                <el-button @click="newQusetioniner(1)" style="width:100%" type="primary">创建问卷</el-button>
            </div>
            <div class="main-type">
               <h2 style="text-align:center;">360问卷</h2>
               <p>
                   这是问卷说明这是问卷说明这是问卷说明这是问卷说明这是问卷说明这是问卷说明这是问卷说明这是问
                   卷说明这是问卷说明这是问卷说明这是问卷说明这是问卷说明这是问卷说明这是问卷说明这是问卷说明
                </p>
                <el-button @click="newQusetioniner(2)" style="width:100%" type="primary">创建问卷</el-button>
            </div>
            <div class="main-type">
               <h2 style="text-align:center;">其他类型</h2>
               <p>
                   这是问卷说明这是问卷说明这是问卷说明这是问卷说明这是问卷说明这是问卷说明这是问卷说明这是问
                   卷说明这是问卷说明这是问卷说明这是问卷说明这是问卷说明这是问卷说明这是问卷说明这是问卷说明
                </p>
                <el-button style="width:100%" type="primary">创建问卷</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import newNav from '@/components/newNav'
    export default {
        components:{
            newNav
        },
        data(){
            return{

            }
        },
        methods:{
            newQusetioniner(paperType){
                this.$router.push({
                    name:'news',
                    params:{
                        paperType
                    }
                })
            }
        },
        created() {
             this.$store.commit('headerName','选择问卷类型')
        },
    }
</script>

<style lang="scss">
    .questioninerType{
        width: 100%;
        height: 100%;
        padding-top:60px;
        display: flex;
        justify-content: center;
        align-items: center;
        .questioninerType-main{
            display: flex;         
            height: 400px;
            justify-content: space-between;
            font-size: 14px;
            .main-type{
                width: 270px;
                margin-right:50px;
                border: 1px solid #ccc;
                border-radius:6px;
                padding: 20px;
                display:flex;
                flex-direction: column;
                justify-content: space-around;
                p{
                    line-height: 20px;
                   
                }
            }
        }
    }
</style>