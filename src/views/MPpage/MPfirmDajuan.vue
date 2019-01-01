<template>
    <div class="firmPreview">
        
        <div v-if="ispaper==1" style="text-align:center;line-height:50px;">
                {{hint}}
        </div>
        <div  v-else-if="ispaper==2">  
            <el-table
                v-if="loading2"
                v-loading="loading2"
                element-loading-text="加载中..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.9)"
                id="loding"
                :data="groupQuestion">
            </el-table> 
            <div class="main-top2">
                <h3>{{ paperTitle}}</h3>
                <p>{{paperComment}}</p>
                <div class="main-top_border">

                </div>
            </div>
            <div 
                v-for="(grouplist,index) in groupQuestion"
                v-if="grouplist.groupName!='无维度'"
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
                    :id="'anchor-'+index+index2"
                    >
                        <h4 v-if="qusetion.questionType==1">{{index,index2,groupQuestion| qusetionAmout}}. {{qusetion.questionTitle}}（单选题）</h4>
                        <h4 v-else-if="qusetion.questionType==2">{{index2+1 }}. {{qusetion.questionTitle}}（多选题）</h4>
                        <h4 v-else-if="qusetion.questionType==3">{{index2+1}}. {{qusetion.questionTitle}}（填空题）</h4>
                        <p>{{qusetion.questionComment}}</p>
                         <div v-if="'meida'===qusetion.border" style="color:#f00;margin-top:10px;">请你答题</div>
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
                                <div style="width:70px;" class="username">{{user.name|optionNames}}</div>
                            <el-radio-group class="option-radio"  v-if="qusetion.questionType==1" v-model="radio2[index][index2][index4]">
                                <div 
                                v-for="(option,optionindex) in qusetion.option"
                                    :key="optionindex"
                                class="option-list">
                                        <el-radio  
                                        style="width:14px;"                                          
                                        :label="option.optionId"
                                        ><span v-show="showoption">{{optionindex}}</span></el-radio>   
                                    </div>                         
                                </el-radio-group>
                                <el-checkbox-group 
                                    class="option-radio"
                                    v-if="qusetion.questionType==2" 
                                    v-model="checkboxGroup1[index][index2][index4]">
                                    <div  
                                    class="option-list"
                                    v-for="(city,cityindex) in  qusetion.option"
                                    :key="cityindex"
                                    >                                  
                                        <el-checkbox
                                            style="width:14px;"
                                            :label="city.optionId" 
                                            >
                                            <span v-show="showoption">{{city}}</span>
                                        </el-checkbox>
                                    </div>
                                </el-checkbox-group>
                                <!-- <p 
                                v-if="qusetion.questionType==2"
                                v-for="(option,index) in qusetion.option"
                                :key="index"
                                ><span class="radio checkd"></span></p> -->
                                <div 
                                    v-if="qusetion.questionType==3"   
                                    style="margin:0 10px;width:100%;"                  
                                    ><el-input                             
                                    style="width:100%;font-size:14px;"
                                    placeholder="请输入内容"
                                    v-model="input[index][index2][index4]"
                                    >
                                    </el-input>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <p style="margin-top:50px;text-align:center;" v-if="groupQuestion.length==0">
                    没有问题
                </p>
                <el-button @click="onSubmit" style="height:46px;width:100%"  type="primary">提交问卷</el-button>  
                <div class="mp-submit2">               
                    <el-button @click="onSubmit" style="height:46px;"  v-show="issubmit" type="primary">提交问卷</el-button>               
                </div>
            </div>
    </div>
</template>

<script>
import { 
    getRuestionnaire,
    getTszPaper,
    userPaperState,
    selectPaperInfo,
    sanSaveRadio,
    sanSavMultiSelect,
    sanSaveFill,
    sanSubmitPaperr,
    nlsanSaveRadio,
    nlsanSavMultiSelect,
    nlsanSaveFill,
    nlsanSubmitPaperr
    } from "@/axios/api.js"
    export default {
        props:[],
        data(){
            return{
                groupQuestion:[],//问题
                userList:[],//测评人员
                paperComment:'',
                paperTitle:'',
                radio2:[],
                checkboxGroup1:[],
                input:[],
                showoption:false,
                paperId:'',
                ispaper:'1',
                hint:'',
                loading2:true,
                issubmit:false,
                userId:'',
                answerType:''
            }
        },
        destroyed() {
            sessionStorage.removeItem('amout')
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
        methods:{
            //提交问卷
            onSubmit(){
                let anchor=[]
                    //判断未作答的问题
                    this.groupQuestion.forEach((data,index)=>{
                        data.question.forEach((data2,index2)=>{                         
                                if(data2.questionType=='1'){
                                    this.radio2[index][index2].forEach((data4,index4)=>{
                                        if(data4==''){
                                            this.groupQuestion[index].question[index2].border='meida'
                                            anchor.push(`#anchor-${index}${index2}`)
                                        }else{
                                             this.groupQuestion[index].question[index2].border=0
                                        }
                                    })
                                } 
                                else if(data2.questionType=='2'){
                                    this.checkboxGroup1[index][index2].forEach((data4,index4)=>{
                                        if(data4.length==0){
                                            this.groupQuestion[index].question[index2].border='meida'
                                            anchor.push(`#anchor-${index}${index2}`) 
                                        }else{
                                             this.groupQuestion[index].question[index2].border=0
                                        }
                                    })
                                }  
                                else if(data2.questionType=='3'){
                                    this.input[index][index2].forEach((data4,index4)=>{
                                        if(data4==''){
                                            this.groupQuestion[index].question[index2].border='meida'
                                            anchor.push(`#anchor-${index}${index2}`)    
                                        }else{
                                             this.groupQuestion[index].question[index2].border=0
                                        }
                                    })
                                } 
                            
                        })
                    })

                console.log(anchor)
               
                //统计答案
                let radio=[],
                    checkd=[],
                    input=[];
                if(anchor.length==0){                               
                    //单选
                    this.radio2.forEach((data,index)=>{
                        data.forEach((data2,index2)=>{
                            data2.forEach((data3,index3)=>{
                                if(data3==''){
                                    return
                                }
                                else{
                                  radio.push({
                                      paperId:this.paperId,
                                      questionId:this.groupQuestion[index].question[index2].questionId,
                                      optionId:data3,
                                      appraisalUserId:this.userList[index3].appraisalUserId,
                                      evaluationUserId:this.userId
                                  })
                                }
                            })
                        })
                    }) 
                    //多选
                    this.checkboxGroup1.forEach((data,index)=>{
                        data.forEach((data2,index2)=>{
                            data2.forEach((data3,index3)=>{
                                if(data3.length==0){
                                    return
                                }
                                else{
                                  checkd.push({
                                      paperId:this.paperId,
                                      questionId:this.groupQuestion[index].question[index2].questionId,
                                      optionId:data3.join(','),
                                      appraisalUserId:this.userList[index3].appraisalUserId,
                                      evaluationUserId:this.userId
                                  })
                                }
                            })
                        })
                    })  
                    //填空
                    this.input.forEach((data,index)=>{
                        data.forEach((data2,index2)=>{
                            data2.forEach((data3,index3)=>{
                                if(data3==''){
                                    return
                                }
                                else{
                                  input.push({
                                      paperId:this.paperId,
                                      questionId:this.groupQuestion[index].question[index2].questionId,
                                      answerContent:data3,
                                      appraisalUserId:this.userList[index3].appraisalUserId,
                                      evaluationUserId:this.userId
                                  })
                                }
                            })
                        })
                    })  
                    if(this.answerType==1){                  
                    //保存单选                              
                        sanSaveRadio(radio).then(res=>{
                            console.log('保存单选',res)
                            if(res.status==200&&res.data.success==true){
                                //保存多选                            
                                    sanSavMultiSelect(checkd).then(res=>{
                                        console.log('保存多选',res)
                                        if(res.status==200&&res.data.success==true){
                                            //保存填空                                         
                                                sanSaveFill(input).then(res=>{
                                                console.log('保存填空',res)
                                                if(res.status==200&&res.data.success==true){
                                                    //提交问卷
                                                    sanSubmitPaperr({paperId:this.paperId,evaluationUserId:this.userId}).then(res=>{
                                                        console.log('提交360问卷',res)
                                                        if(res.status==200&&res.data.success==true){
                                                            this.$router.push('/m/MPresult')
                                                        }else{
                                                            alert('提交失败')
                                                        }
                                                    })
                                                    
                                                }else{
                                                    alert('提交失败')
                                                }
                                            })
                                             
                                         
                                        }else{
                                            alert('提交失败')
                                        }
                                    })
                                
                             
                            }else{
                                alert('提交失败')
                            }
                        })
                    }
                     else  if(this.answerType==2){                  
                    //保存单选                              
                        nlsanSaveRadio(radio).then(res=>{
                            console.log('保存单选',res)
                            if(res.status==200&&res.data.success==true){
                                //保存多选                            
                                    nlsanSavMultiSelect(checkd).then(res=>{
                                        console.log('保存多选',res)
                                        if(res.status==200&&res.data.success==true){
                                            //保存填空                                         
                                                nlsanSaveFill(input).then(res=>{
                                                console.log('保存填空',res)
                                                if(res.status==200&&res.data.success==true){
                                                    //提交问卷
                                                    nlsanSubmitPaperr({paperId:this.paperId,evaluationUserId:this.userId}).then(res=>{
                                                        console.log('提交360问卷',res)
                                                        if(res.status==200&&res.data.success==true){
                                                            this.$router.push('/m/MPresult')
                                                        }else{
                                                            alert('提交失败')
                                                        }
                                                    })
                                                    
                                                }else{
                                                    alert('提交失败')
                                                }
                                            })
                                             
                                         
                                        }else{
                                            alert('提交失败')
                                        }
                                    })
                                
                             
                            }else{
                                alert('提交失败')
                            }
                        })
                    }
                                   
                }else{
                     let anchors= this.$el.querySelector(anchor[0]) 
                    // document.documentElement.scrollTop = anchor.offsetTop
                    anchors.scrollIntoView()
                }
                        console.log('单选答案',radio)
                        console.log('多选答案',checkd)
                        console.log('填空答案',input)
            },
            //监听滚动条事件
            handleScrolls(){     
                let clientHeight=document.body.clientHeight||document.documentElement.clientHeight,
                    scrollTop=window.scrollY,
                    scrollHeight=document.documentElement.scrollHeight;
                    if(clientHeight+scrollTop>=scrollHeight-100){
                        this.issubmit=false;
                        // this.loading2=true
                    }else{
                        this.issubmit=true;
                        this.loading2=false
                    }
                // console.log(clientHeight+scrollTop,scrollHeight)
            }, 
        },
        mounted() {
             //监听滚动条事件
            window.addEventListener('scroll', this.handleScrolls) 
        },
        created() {
            sessionStorage.removeItem('amout')
              let paperId=this.$route.params.paperId
              let userId=this.$route.params.userId
              let token=localStorage.getItem('token')
            //   alert(token)
            if(paperId==undefined){
                    this.hint='你没有权限答卷'
                    return
              }
            if(paperId){
                this.paperId=paperId
                this.userId=userId
                sessionStorage.setItem('paperId',paperId)
                sessionStorage.setItem('userId',userId)
            }else{
                paperId=sessionStorage.getItem('paperId')
                userId=sessionStorage.getItem('userId')
                this.paperId=paperId
                this.userId=userId
            }
            userPaperState({paperId,userId}).then(res=>{
                console.log('判断是否可以答卷',res)
                if(res.status==200&&res.data.success==true){
                    if(res.data.data.paperState!=1){
                        this.hint='问卷不存在'
                    }
                    else if(res.data.data.time!=1){
                         this.hint='问卷未开始或已结束'
                    }
                    else if(res.data.data.isHave!=1){
                         this.hint='你没有权限答卷'
                    }
                     else if(res.data.data.submit!=2){
                         this.hint='你已经提交过问卷'
                    }
                    else if(res.data.data.paperState==1&&res.data.data.time==1&&res.data.data.isHave==1&&res.data.data.submit==2){
                        this.ispaper=2
                    }
                }
            })
            //    //获取360问卷内容 
                selectPaperInfo({paperId,userId}).then(res=>{
                    console.log('获取360问卷内容',res)
                    if(res.status==200&&res.data.success==true){
                        this.userId=res.data.data.evaluationId
                        this.answerType=res.data.data.answerType
                        this.groupQuestion=res.data.data.groupQuestion
                        this.paperTitle=res.data.data.paperTitle
                        this.paperComment=res.data.data.paperComment
                        this.userList=res.data.data.userList
                        this.loading2=false
                        this.groupQuestion.forEach((data,index)=>{
                            this.radio2.push([])
                            this.checkboxGroup1.push([])
                            this.input.push([])
                            data.question.forEach((data2,index2)=>{
                                this.radio2[index].push([])
                                this.checkboxGroup1[index].push([])
                                this.input[index].push([])
                                this.userList.forEach((list,index3)=>{
                                    this.checkboxGroup1[index][index2].push([])
                                    this.radio2[index][index2].push('')
                                     this.input[index][index2].push('')
                                })
                            })
                        })            
                    }
                })
               
        },
      
    }
</script>

<style lang="scss" scoped>
    .firmPreview{
        width:100%;
        // height: 100%;
        padding:0.2rem 0.1rem;
        margin: 0 auto;
        // overflow: auto;
        .main-top2{
            margin-bottom: 20px;
            h3{
                text-align: center;
                padding:20px 0; 
                color: #09f;
            }
            p{
                line-height: 22px;
                font-size: 14px;
            }
        }
        .main-top_border{
            height: 20px;
            border-bottom:1px dashed #ccc;              
        }
            #loding{
            position: fixed;
            width:0.8rem; 
            height:0.8rem;
            font-size:0.12rem;
            top:0;
            left:0; 
            right: 0;
            bottom: 0;       
            z-index: 999;
            margin:auto;
            border-radius:0.04rem;
            .el-loading-text{
                color: #fff;
                font-size:0.12rem;
                margin-top:0.05rem;
            }
             .el-icon-loading{
                font-size:0.3rem;
                color: #fff;
            } 
            .el-loading-spinner{
                top: 20%;
                margin: 0;
            }
        }
        .mp-submit2{
            position: fixed;         
            bottom:5px;
            left:0;
            right: 0;
            margin: auto;
            z-index: 999;
            width:3rem;
            .el-button{
               width:100%;          
            }
        }
    }
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
            min-height: 300px;
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
                        min-height: 40px;
                        align-items: center;
                        justify-content: space-between;
                        background: rgb(242, 242, 242);
                        border-bottom: 1px solid #ccc;
                        padding:5px 0 5px 60px;
                        p{
                            flex: 1;
                            padding:0 5px;
                            text-align: center;
                            margin: 0;
                        }
                        
                    }
                      .username{
                            font-size: 14px;
                            width:60px;
                            text-align: center;
                            padding:0 5px;
                        }
                    .groupoption-name{
                        min-height:50px;
                        border-bottom: 1px solid #ccc;
                        display: flex;
                        align-items: center;
                        padding:5px 0;
                        .option-radio{
                            display: flex;
                            width: 100%;
                            justify-content: space-between;
                            align-content: center;
                            // margin-left:1px;
                        }
                        .option-list{
                            flex:1;
                            display: flex;
                            justify-content:center;
                            align-content: center;
                            // margin-left:15px;
                        }
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
                      
                      
                    }
                    .groupoption-name:last-child{border:0};
                }   
              
            }
        }
</style>