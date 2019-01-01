<template>
    <div class="m-result">
        <div class="succeed">
            <div>
                <i class="el-icon-success"></i>
                <p style="margin-top:20px;line-height: 26px;">你已完成本次答卷，感谢你的帮助与支持</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{

            }
        },
        //监听当前页面返回事件
	    beforeRouteLeave(to, from, next) {
	    	//next方法传true或者不传为默认历史返回，传false为不执行历史回退
            next(false);
            window.addEventListener("popstate",function(e) {
            WeixinJSBridge.call('closeWindow');

            },false)
            window.history.go(-1);
            window.history.back();
        }
    }
</script>

<style lang="scss" scoped>
    .m-result{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        padding:0.2rem;
        .succeed{
            margin-top: 100px;
            div{
                 display: flex;
                justify-content: center;
                flex-direction: column;
                align-items: center;
            }
            i{
                font-size:30px;
                color:rgb(82, 175, 59);
            }
        }
    }
</style>