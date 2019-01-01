<template>
    <div class="mp-wenjuan">
        <div v-if="isquestionnaire">
            <el-table
                v-if="loading2"
                v-loading="loading2"
                element-loading-text="加载中..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.9)"
                id="loding"
                :data="question">
            </el-table>
            <div>
                <h3 style="color:#09f;text-align: center;">{{paperTitle}}</h3>
                <p class="mp-state">{{paperComment}}</p>
            </div> 
            <p style="font-size:12px;color:#09f;margin-bottom:20px;">
            温馨提示：* 表示必答题 
            </p>                
            <ul style="min-height:2rem;">
                <li 
                v-for="(item,index) in question"
                :key="index"
                :id="'anchor-'+index"
                class="mp-li"
                
                >
                    <div>
                        <h3 v-if="item.questionRequired==1" style="position: relative;line-height:24px;">
                            <span style="color:#f00;position: absolute;top:0px;left:-10px;">*</span>{{index+1}}.&nbsp;{{item.questionTitle}}
                        </h3>
                        <h3 style="position: relative;line-height:24px;" v-else>{{index+1}}.&nbsp;{{item.questionTitle}}</h3>
                        <div v-if="'meida'===item.border" style="color:#f00;margin-top:10px;">请你答题</div>
                        <p>{{item.questionComment}}</p>
                    </div>
                    <div>
                        <div v-if="'3'==item.questionType" style="margin-bottom:10px;">
                            <div>                                
                                <el-input
                                type="textarea"
                                autosize
                                placeholder="请输入内容"
                                style="height:40px;"
                                v-model="gap[index]">
                                </el-input>
                            </div>
                            
                        </div>
                        <div class="mp-select" v-else>
                                <el-radio-group v-model="radio2[index]" v-if="'1'==item.questionType" style="width:100%">
                                <div 
                                    v-for="(radi,index2) in item.option"
                                    :key="index2"                               
                                    style="border-bottom:1px solid #ccc;padding:10px;"                                                             
                                >
                                    <div v-if="'2'==radi.optionType">
                                        <el-radio :label="index2">{{radi.optionName}}</el-radio>
                                        <el-input style="width:100%;margin-top:10px" v-model="rest_text[index]" placeholder="请输入内容"></el-input>
                                    </div>
                                    <el-radio v-else  :label="index2">{{radi.optionName}}</el-radio>                                      
                                </div>                                                                     
                            </el-radio-group>

                            <el-checkbox-group v-if="'2'==item.questionType"  v-model="input2[index]" style="width:100%">
                                <div
                                v-for="(checked,chindex) in item.option"
                                :key="chindex" 
                                style="border-bottom: 1px solid #ccc;font-size:12px;padding:10px;"                                                                
                                >
                                    <div v-if="'2'==checked.optionType">
                                        <el-checkbox  :label="chindex">{{checked.optionName}}</el-checkbox>
                                        <el-input style="width:100%;margin-top:10px" v-model="rest_text[index]" placeholder="请输入内容"></el-input>
                                    </div>
                                    <el-checkbox v-else  :label="chindex">{{checked.optionName}}</el-checkbox>
                                </div>                                  
                            </el-checkbox-group>
                        </div>
                    
                    </div>
                </li>
                <li v-if="question.length<1" style="text-align:center;line-height:200px;">
                   问卷内容为空
                </li>
            </ul>

            <!-- 分页 -->
            <el-pagination
            v-if="isshow"
            :pagerCount="5"
            :pageSize='20'
            layout="prev, pager, next"
            :total="counts">

            </el-pagination>
            <div class="mp-submit">               
                <el-button @click="onSubmit" style="height:46px;"  type="primary">提交问卷</el-button>               
            </div>
            <div class="mp-submit2">               
                <el-button @click="onSubmit" style="height:46px;"  v-show="issubmit" type="primary">提交问卷</el-button>               
            </div>
        </div>
        <div v-else style="margin-top:50px;">
            问卷已经过期
        </div>
    </div>
</template>

<script>
    import { getRuestionnaire,MPsaveRadio,MPsaveMulti,MPsaveFill,MPsubmitPaper,getPaper} from "@/axios/api.js"
    import { formatDate } from '@/js/date.js'
    export default {
        name:'MPdajuan',
        data(){
            return {
                paperTitle:'问卷标题',
                paperComment:'这是说明',
                counts:0,
                isshow:false,
                issubmit:false,
                loading2:true,
                isquestionnaire:true,
                border:'meida',
                paperId:'',
                userId:'',
                textarea2:'',
                gread:['111'],
                textState:['这是说明'],
                textTitle:['这是说明'],
                question:[
                     
                ],
                input2:[
                  
                ],           
                radio2:[],
                rest_text:[],
                gap:[],
                anchor:[]                         
            }
        },
        computed:{
            
        },
        methods:{

        //点击提交问卷
            onSubmit(){
                console.log(this.input2)
                console.log(this.radio2)
                console.log(this.gap)
                //分数
                let optionValue=0
                this.anchor=[]
                //查询那些题没有答
                this.question.forEach((data,index)=>{
                    if(data.questionRequired==1){
                        if(data.questionType==1){
                            if(this.radio2[index]===''){                             
                               this.question[index].border='meida'  
                               this.anchor.push(`#anchor-${index}`)                                                    
                            }else{
                                this.question[index].border='' 
                            }                         
                        }
                        else if(data.questionType==2){
                            if(this.input2[index].length===0){
                                this.question[index].border='meida'
                                  this.anchor.push(`#anchor-${index}`)
                               
                            }else{
                                this.question[index].border='' 
                            }     
                        }
                        else if(data.questionType==3){
                            if(this.gap[index]===''){
                                this.question[index].border='meida'  
                                this.anchor.push(`#anchor-${index}`)                             
                                
                            }else{
                                this.question[index].border='' 
                            }      
                        }
                    }
                })   

                //锚点
                if(this.anchor.length>0){
                    let anchor = this.$el.querySelector(this.anchor[0]) 
                    // document.documentElement.scrollTop = anchor.offsetTop
                    anchor.scrollIntoView()
                }              
             
                console.log(this.question)
                let radio=[],
                    checked=[],
                    gap=[];
              
            //统计答案
                //单选
                 this.radio2.forEach((data,index)=>{
                     if(data===''){
                         return;
                     }
                     else{
                         let answerContent='';
                         if(this.question[index].option[data].optionType==2){
                             answerContent=this.rest_text[index]                       
                         }
                        radio.push({
                            paperId:this.paperId,
                            questionId:this.question[index].questionId,
                            optionId:this.question[index].option[data].optionId,
                            answerContent,
                            createId:this.userId,
                        })
                      
                     }
                 })
                //多选
                this.input2.forEach((data,index)=>{
                     if(data.length===0){
                         return;
                     }else{
                        var optionId=[],
                            answerContent=[];
                         data.forEach((data2)=>{
                            optionId.push(this.question[index].option[data2].optionId)
                            if(this.question[index].option[data2].optionType==2){
                                answerContent.push(this.rest_text[index])
                            }else{
                                answerContent.push('')
                            }
                         })                                           
                          checked.push({
                            paperId:this.paperId,
                             questionId:this.question[index].questionId,
                             optionId: optionId.join(","),
                             answerContent:answerContent.join(","),
                             createId:this.userId,
                         })
                     }
                 })
                //填空
                this.gap.forEach((data,index)=>{
                      if(data===''){
                         return;
                     }
                     else{                   
                        gap.push({
                            paperId:this.paperId,
                            questionId:this.question[index].questionId,
                            // optionId:this.question[index].option[0].optionId,
                            answerContent:this.gap[index],
                            createId:this.userId,
                        })
                      
                     }
                })
              
                //问题全部答完提交
                if(this.anchor.length==0){
                    //  this.$message.error('你还有问题没有作答!');                   
                    console.log(radio)
                    console.log(checked)
                    console.log(gap)
                    //  单选
                   
                         MPsaveRadio(radio).then(res=>{
                            if(res.status=200&&res.data.success===true){
                                console.log('单选提交成功')
                                   //多选                           
                                    MPsaveMulti(checked).then(res=>{
                                        if(res.status=200&&res.data.success===true){
                                            console.log('多选提交成功')
                                            //填空                                      
                                                MPsaveFill(gap).then(res=>{
                                                    if(res.status=200&&res.data.success===true){                         
                                                        console.log('填空提交成功')
                                                        //提交问卷
                                                        MPsubmitPaper({
                                                                paperId:this.paperId,
                                                                createId:this.userId
                                                            }).then(res=>{
                                                                console.log(res) 
                                                                if(res.status=200&&res.data.success===true){
                                                                    this.$router.push('/m/MPresult')
                                                                }else{
                                                                    alert('提交失败') 
                                                                                            
                                                                }                         
                                                            })
                                                    }
                                                })
                                            
                                        }
                                    })
                                
                            }
                        })
                    
                                  
                 
                     
                    //  if(radio_status==true&&checked_status==true&&gap_status==true){
                    //      console.log('dfs')
                        
                    //  }
                     
                               
                }
                //  console.log(optionValue)
            },
            //监听滚动条事件
            handleScroll(){     
                console.log('dg')         
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
                console.log(clientHeight+scrollTop,scrollHeight)
            },       
        },
        mounted() {  
             //监听滚动条事件
            window.addEventListener('scroll', this.handleScroll) 
            //获取问卷id和用户id
            let paperId=this.$route.params.id,             
                userId=this.$route.params.userId;  
                //获取问卷类容
                getPaper({
                    paperId
                }).then(res=>{
                    if(res.status==200){
                        if(res.data.data==null||res.data.data=={}){
                           this.isquestionnaire=false
                    }else{                         
                            this.loading2=false
                            this.paperTitle=res.data.data.paperTitle
                            this.paperComment=res.data.data.paperComment
                            this.question=res.data.data.question
                            this.paperId=paperId
                            // this.counts=res.data.question.length
                            //  if(this.counts>20){
                            //      this.isshow=true
                            //  }
                            res.data.data.question.forEach((data)=>{
                                this.input2.push([])
                                this.radio2.push('')  
                                this.gap.push('')  
                                this.rest_text.push('')                  
                            })                        
                        }
                    }
                    console.log(res)
                })
                this.paperId=paperId
                if(userId=='123'){
                    //产生随机数函数   
                    let randomId=''             
                        for(var i=0;i<16;i++){
                            randomId+=Math.floor(Math.random()*10);
                        }    
                    userId=randomId
                }
                this.userId=userId
                  
        },
    }
</script>

<style lang="scss">
    
    .mp-wenjuan{
        width: 100%;
        // height: 100%;
        padding:30px 0.2rem;
        font-size:14px;
        position: relative;
        background: #fff;
        // overflow: auto;
        .mp-state{
            margin:20px 0;
            line-height:25px;
            border-bottom:1px dashed #ccc;
            padding-bottom:20px;
        }
        .mp-li{
            margin-bottom:20px;
            width: 100%;
            background: #fff;
            .mp-select{
                border: 1px solid #ccc; 
                 border-bottom:0; 
                 border-radius:4px;               
            }
            p{
                line-height:25px; 
                padding:10px 0;             
            } 
            .el-radio{
                padding-left:14px;
            }       
            .el-radio__input{
                position:absolute;
                top: 3px;
                left: 0px;
            }
          span{
                // width: 100%;
                word-break:normal;
                display:inline-block;
                white-space:pre-wrap;
                line-height: 20px;
            }
            .el-checkbox{
                padding-left:14px;
            }
            .el-checkbox__input{
                position:absolute;
                top: 3px;
                left: 0px;
            }
            //inout里面的删除
            .el-input__suffix{
                display: flex;
                justify-content: center;
                align-items: center;
            }
            
            .el-input__inner{
            height: 30px;
            line-height: 30px;
            }
        }
        .mp-submit{   
            width:100%;         
            margin-top:30px;
            .el-button{
               width:100%;            
            }
        }
        .mp-submit2{
            position: fixed;         
            bottom:5px;
            left:0;
            right: 0;
            margin: auto;
            z-index: 999;
            width:2.8rem;
            .el-button{
               width:100%;          
            }
        }
        .el-pager li {
            min-width:0.2rem;
        }
        .li-border{
            border: 1px solid #f00;        
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
    }
    // .el-message--error,.el-message{
    //         width: 100%;
    //         padding:0 0.3rem;
    //         height:0.4rem ;
    //         line-height:0.4rem;
    //         top: 0;
    //     }
   
</style>