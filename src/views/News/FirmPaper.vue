<template>
    <div class="groupQuestions">
        <div 
         v-loading="loading"
        v-for="(grouplist,index) in groupQuestion"
        :key="index"
        class="grouplist"
        >
            <div class="grouptitle" v-if="grouplist.question.length>0">
                <h3>{{grouplist.groupName}}</h3>
                <p>{{grouplist.groupComment}}</p>
            </div>
            <div 
            v-for="(qusetion,index2) in grouplist.question"
            :key="index2"
            class="groupqusetion"
            >
                <h4 v-if="qusetion.questionType==1">{{index,index2,groupQuestion| qusetionAmout}}. {{qusetion.questionTitle}}（单选题）</h4>
                <h4 v-else-if="qusetion.questionType==2">{{index,index2,groupQuestion| qusetionAmout}}. {{qusetion.questionTitle}}（多选题）</h4>
                <h4 v-else-if="qusetion.questionType==3">{{index,index2,groupQuestion| qusetionAmout}}. {{qusetion.questionTitle}}（填空题）</h4>
                <p>{{qusetion.questionComment}}</p>
                <div class="groupmain">
                    <div class="groupoption">
                        <p 
                        v-for="(option,index) in qusetion.option"
                        :key="index"
                        >{{option.optionName | optionNames}}</p>
                        <p  v-if="qusetion.questionType==3" style="padding:0;margin-left:20px;" >选项内容为空</p>
                    </div>
                    <div 
                    class="groupoption-name"
                    v-for="(user,index4) in userList"
                    :key="index4"
                    >
                        <span class="name">{{user.name|optionNames}}</span>
                        <p 
                        v-if="qusetion.questionType==1"
                        v-for="(option,index) in qusetion.option"
                        :key="index"
                        ><span class="radio"></span></p>
                        <p 
                        v-if="qusetion.questionType==2"
                        v-for="(option,index) in qusetion.option"
                        :key="index"
                        ><span class="radio checkd"></span></p>
                        <div 
                            v-if="qusetion.questionType==3"   
                            style="margin-left:20px;"                  
                            ><el-input
                            type="textarea"
                            :rows="1"
                            placeholder="请输入内容"                         
                            >
                            </el-input>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      
    </div>
</template>

<script>
    export default {
        props:['groupQuestion','userList','nogroupQuestion','loading'],
        data(){
            return{
                xuhao:'tgdr'
            }
        },
        filters:{
            optionNames(name){
                let names=''
                if(name.length>5){
                    names=name.slice(0,5)
                }else{
                    names=name
                }
                return names
            },
           qusetionAmout(index,index2,groupQuestion){
                let amout=0  
                let length=0            
                if(index==0){
                    amout=index2+1
                }else{
                    for(let i=0;i<index;i++){
                       length+=groupQuestion[i].question.length
                    }
                    amout=length+index2+1
                }
                return amout
            }
        },
        mounted() {
            sessionStorage.removeItem('amout')
        },
        destroyed() {
            sessionStorage.removeItem('amout')
        },
    }
</script>

<style lang="scss" scoped>
           .grouptitle{
                min-height:40px;
                border:1px solid #ccc;
                background: rgb(242, 242, 242);
                border-radius: 4px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                padding:10px;
                h3{
                    line-height:30px;
                }
              
            }
        .grouplist{
            margin-bottom: 20px;
              p{
                    font-size: 14px;
                    line-height: 20px;        
                }
         
            .groupqusetion{
                margin-top: 20px;
                h4{
                     line-height: 22px;
                }
                .groupmain{
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    min-height: 80px;
                    margin-top: 10px;
                      .groupoption{
                        display: flex;
                        width: 100%;
                        font-size: 14px;
                        height: 40px;
                        align-items: center;
                        background: rgb(242, 242, 242);
                        border-bottom: 1px solid #ccc;
                        padding-left:120px;
                        p{
                            width:100px;
                            padding:0 10px;
                            text-align: center;
                            margin: 0;
                        }
                        
                    }
                    .groupoption-name{
                        min-height: 40px;
                        border-bottom: 1px solid #ccc;
                        display: flex;
                        align-items: center;
                        p{
                           
                            width: 100px;
                            text-align: center;
                            padding:0 10px;
                            .radio{
                                 display: inline-block;
                                width: 16px;
                                height: 16px;
                                border-radius:50%;
                                border: 1px solid #ccc;
                                padding: 0;
                            }
                            .checkd{
                                border-radius:0;
                            }
                            .textarea{
                                display: inline-block;
                                height: 40px;
                                width:200px;
                                border: 1px solid #ccc;
                            }
                        }
                        .name{
                            display: inline-block;
                            width:120px;
                            text-align: center;
                            padding:0 5px;
                        }
                      
                    }
                    .groupoption-name:last-child{border:0};
                }   
              
            }
        }
    
</style>