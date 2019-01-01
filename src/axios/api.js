// import axios from "axios"
import qs from 'qs'
import service from './request'


//登录
export const requestLogin = data => { 
    return service({url: '/login',method: 'post',data:qs.stringify(data)}) 
};

//注册
export const Register = data => { 
    return service({url: '/nl/register',method: 'post',data:qs.stringify(data)}) 
};

//短信验证
export const SendCode = data => { 
    return service({url: '/nl/send_code',method: 'post',data:qs.stringify(data)}) 
};

//修改密码
export const PasswordReset = data => { 
    return service({url: '/nl/password_reset',method: 'post',data:qs.stringify(data)}) 
};



//我的问卷列表（问卷首页）
export const myQusetioniner= data => { 
    return service({url: '/my/paper_condition',method: 'post',data:qs.stringify(data)}) 
};
//删除问卷（问卷首页）/my/paper_count
export const delete_paper= data => { 
    return service({url: '/my/delete_paper',method: 'post',data:qs.stringify(data)}) 
};
//问卷状态数量统计（问卷首页）
export const paper_count= data => { 
    return service({url: '/my/paper_count',method: 'post',data:qs.stringify(data)}) 
};

//清楚问卷数据（问卷首页）
export const deletePaperData= data => { 
    return service({url: '/my/delete_data',method: 'post',data:qs.stringify(data)}) 
};
//新建问卷
export const getNews= data => { 
    return service({url: '/new_paper',method: 'post',data:qs.stringify(data)}) 
};
//获取问卷全部类容
export const getRuestionnaire= data => { 
    return service({url: '/nl/paper_info',method: 'post',data})
};
//修改问卷标题 说明
export const updateRuestionnaire= data => { 
    return service({url: '/update_paper',method: 'post',data})
 };
 //新建问题
 export const newRuestion= data => { 
    return service({url: '/save_question',method: 'post',data})
 };
 //修改保存问题
 export const updateRuestion= data => { 
    return service({url: '/update_question',method: 'post',data})
 };
//删除问题
export const deleteRuestion= data => { 
    return service({url: '/delete_question',method: 'post',data:qs.stringify(data)})
 };
 //发布 生成二维码/my/collection_info
 export const publishPaper= data => { 
    return service({url: '/publish_paper',method: 'post',data:qs.stringify(data)})
 };


//我的模板
// 模板类别
export const templateType= data => { 
    return service({url: '/template/select_template_type',method: 'post',data:qs.stringify(data)})
 };
 // 引用问卷模板
export const quoteTemplate= data => { 
    return service({url: '/template/quote_template',method: 'post',data:qs.stringify(data)})
 };
  // 搜索问卷模板
export const selectTemplateName= data => { 
    return service({url: '/template/select_template_name',method: 'post',data:qs.stringify(data)})
 };
 //预览问卷模板类容
 export const previewPaper= data => { 
    return service({url: '/template/select_template_paper_info',method: 'post',data:qs.stringify(data)})
 };
//点击类别获取问卷
  export const templateCategoryList= data => { 
    return service({url: '/template/template_category_list',method: 'post',data:qs.stringify(data)})
 };





 //统计页面  信息收集
 export const collectionInfo= data => { 
    return service({url: 'my/collection_info',method: 'post',data:qs.stringify(data)})
 };
//统计页面  答题数据
  export const basicChart= data => { 
    return service({url: 'report/basic_chart',method: 'post',data:qs.stringify(data)})
 };
 //统计页面 提交状态统计
 export const submitCount= data => { 
    return service({url: 'report/submit_count',method: 'post',data:qs.stringify(data)})
 };




//企业管理
//注册公司/company/delete_company
 export const createCompany= data => { 
    return service({url: '/company/create_company',method: 'post',data})
 };
 //切换公司
 export const companySwitch= data => { 
    return service({url: '/company/switch',method: 'post',data:qs.stringify(data)})
 };
//设置默认公司
  export const defaultCompany= data => { 
    return service({url: '/company/default',method: 'post',data:qs.stringify(data)})
 };
 //注销公司
 export const deleteCompany= data => { 
    return service({url: '/company/delete_company',method: 'post',data:qs.stringify(data)})
 };
 //查询公司信息
 export const selectCompanyInfo= data => { 
    return service({url: '/company/select_company_info',method: 'post',data:qs.stringify(data)})
 };
//修改公司信息
  export const editCompany= data => { 
    return service({url: '/company/edit_company',method: 'post',data})
 };
 //获取所有公司
 export const allCompany= data => { 
    return service({url: '/user/user_all_company',method: 'post',data})
 };
  //查询所有部门
  export const allBranch = data => { 
    return service({url: '/department/department_tree',method: 'post',data:qs.stringify(data)})
 };
//新建部门
export const newDepartment= data => { 
    return service({url: '/department/new_department',method: 'post',data})
 };
//编辑部门
export const editDepartment= data => { 
    return service({url: '/department/edit_department',method: 'post',data:qs.stringify(data)})
 };
//删除部门/user/create_user
export const deleteDepartment= data => { 
    return service({url: '/department/delete_department',method: 'post',data})
 };
//设置部门负责人
export const setMananer= data => { 
    return service({url: '/department/set_Mananer',method: 'post',data:qs.stringify(data)})
 };
 //根据部门岗位查询员工
export const departmentIdCust= data => { 
    return service({url: '/department/departmentId_cust',method: 'post',data:qs.stringify(data)})
 };
 //获取部门下岗位和部门负责人
export const setPostMananer= data => { 
    return service({url: '/department/departmentId_post',method: 'post',data:qs.stringify(data)})
 };
 //新建岗位
export const newPost= data => { 
    return service({url: '/company/new_post',method: 'post',data:qs.stringify(data)})
 };
 //修改岗位
export const editPost= data => { 
    return service({url: '/company/edit_post',method: 'post',data:qs.stringify(data)})
 };
//删除岗位/company/list_post
export const deletePost= data => { 
    return service({url: '/company/delete_post',method: 'post',data:qs.stringify(data)})
 };
//岗位列表
export const listPost= data => { 
    return service({url: '/company/list_post',method: 'post',data:qs.stringify(data)})
 };
//新建人员
export const createUser= data => { 
    return service({url: '/user/create_user',method: 'post',data})
 };
 //搜索人员
 export const selectUserInfo= data => { 
     return service({url: '/user/select_user_info',method: 'post',data:qs.stringify(data)})
  };
 //获取人员信息/user/edit_user
export const getUserinfo= data => { 
    return service({url: '/user/user_info',method: 'post',data:qs.stringify(data)})
 };
 //修改人员信息
export const ediUserinfo= data => { 
    return service({url: '/user/edit_user',method: 'post',data})
 };
 //删除人员
export const deleteUser= data => { 
    return service({url: '/user/delete_user',method: 'post',data:qs.stringify(data)})
 };
 //离职人员/user/set_user_leader
export const dimissionUser= data => { 
    return service({url: '/user/dimission_user',method: 'post',data:qs.stringify(data)})
 };
 //设置直接领导
export const setUserLeader= data => { 
    return service({url: '/user/set_user_leader',method: 'post',data:qs.stringify(data)})
 };
//新建职级
export const newRank= data => { 
    return service({url: '/company/new_rank',method: 'post',data:qs.stringify(data)})
 };
//职级列表
export const listRank= data => { 
    return service({url: '/company/list_rank',method: 'post',data:qs.stringify(data)})
 };
//删除职级
export const deleteRank= data => { 
    return service({url: '/company/delete_rank',method: 'post',data:qs.stringify(data)})
 };
//修改职级
export const editRank= data => { 
    return service({url: '/company/edit_rank',method: 'post',data:qs.stringify(data)})
 };


//360问卷
//新建维度
export const newGroup= data => { 
    return service({url: '/group/new_group',method: 'post',data:qs.stringify(data)})
 };
//维度列表
export const selectAllGroup= data => { 
    return service({url: '/group/select_all_group',method: 'post',data:qs.stringify(data)})
 };
//删除维度
export const deleteGroup= data => { 
    return service({url: '/group/delete_group',method: 'post',data:qs.stringify(data)})
 };
//修改维度
export const editGroup= data => { 
    return service({url: '/group/edit_group',method: 'post',data:qs.stringify(data)})
 };
//获取360问卷内容
export const getTszPaper= data => { 
    return service({url: '/nl/paper/get_360_paper',method: 'post',data:qs.stringify(data)})
 };
 //360筛选测评对象
export const selectAppraisalUserr= data => { 
    return service({url: '/360/select_appraisal_user',method: 'post',data:qs.stringify(data)})
 };
//360保存测评对象
export const saveAppraisaluser= data => { 
    return service({url: `/360/save_appraisal_user/${data.paperId}`,method: 'post',data:data.appraisalCust})
 };
//获取360测评对象列表
export const selectAppraisalList= data => { 
    return service({url: '/360/select_appraisal_list',method: 'post',data:qs.stringify(data)})
 };
 //360问卷-选择答卷人
export const selectAnswerUser= data => { 
    return service({url: '/360/insert_evaluation_user',method: 'post',data})
 };
 //360答卷人员列表
 export const getAnswerUserList= data => { 
    return service({url: '/360/select_evaluation_user',method: 'post',data:qs.stringify(data)})
 };
 //360查询客户登录密码
export const selectCustomer= data => { 
    return service({url: `/360/select_customer`,method: 'post',data:qs.stringify(data)})
 };
//360客户登录
export const clietLogin= data => { 
    return service({url: `/nl/360/customer_validate_password`,method: 'post',data:qs.stringify(data)})
 };
  //360删除答卷人员
  export const deleteAnswerUser= data => { 
    return service({url: '/360/delete_evaluation_user',method: 'post',data})
 };
  //360添加其他答卷人员
  export const insertOther= data => { 
    return service({url: '/360/insert_other',method: 'post',data})
 };
 //设置360权重
 export const setWeight= data => { 
    return service({url: '/paper360/set_weight',method: 'post',data})
 };
  //360修改权重
  export const updateWeighList= data => { 
    return service({url: '/paper360/update_weight',method: 'post',data})
 };
 //360权重列表/department/set_deputy_manager/{departmentId}
 export const getWeighList= data => { 
    return service({url: '/paper360/select_weight',method: 'post',data:qs.stringify(data)})
 };
 //360关联部门列表
export const getDeputyManagerList= data => { 
    return service({url: `/department/select_correlation_departmentList`,method: 'post',data:qs.stringify(data)})
 };
  //360删除关联部门
export const deleteDeputyManager= data => { 
    return service({url: `/department/delete_correlation_department`,method: 'post',data:qs.stringify(data)})
 };
//360设置关联部门
export const setDeputyManager= data => { 
    return service({url: `/department/set_correlation_department?departmentId=${data.departmentId}&paperId=${ data.paperId}`,method: 'post',data:data.list})
 };





//360判断是否可以答卷
export const userPaperState= data => { 
    return service({url: `/nl/360/user_paper_state`,method: 'post',data:qs.stringify(data)})
 };
 //360手机端答卷内容
export const selectPaperInfo= data => { 
    return service({url: `/nl/360/select_paper_info`,method: 'post',data:qs.stringify(data)})
 };
//360手机端答卷保存单选
export const nlsanSaveRadio= data => { 
    return service({url: `/nl/360/save_radio_customer`,method: 'post',data})
 };
 //360手机端答卷保存多选
export const nlsanSavMultiSelect= data => { 
    return service({url: `/nl/360/save_multi_select_customer`,method: 'post',data})
 };
 //360手机端答卷保存填空
export const nlsanSaveFill= data => { 
    return service({url: `/nl/360/save_fill_customer`,method: 'post',data})
 };
 //360手机端答卷提交问卷
export const nlsanSubmitPaperr= data => { 
    return service({url: `/nl/360/submit_paper_customer`,method: 'post',data:qs.stringify(data)})
 };


 //360手机端答卷保存单选
export const sanSaveRadio= data => { 
    return service({url: `/360/save_radio`,method: 'post',data})
 };
 //360手机端答卷保存多选
export const sanSavMultiSelect= data => { 
    return service({url: `/360/save_multi_select`,method: 'post',data})
 };
 //360手机端答卷保存填空
export const sanSaveFill= data => { 
    return service({url: `/360/save_fill`,method: 'post',data})
 };
 //360手机端答卷提交问卷
export const sanSubmitPaperr= data => { 
    return service({url: `/360/submit_paper`,method: 'post',data:qs.stringify(data)})
 };


//查看问卷有效时间
export const getPaper= data => { 
    return service({url: '/nl/get_paper',method: 'post',data:qs.stringify(data)})
};
//  手机端收集用户信息
 export const MPuserinfo= data => { 
    return service({url: '/nl/is_info',method: 'post',data:qs.stringify(data)})
 };

 //  手机端保存用户信息
 export const MPsaveinfo= data => { 
    return service({url: '/nl/save_info',method: 'post',data:qs.stringify(data)})
 };

  //  手机端保存问卷（单选题）
  export const MPsaveRadio= data => { 
    return service({url: '/nl/save_radio',method: 'post',data})
 };

  //  手机端保存问卷（多选题）
  export const MPsaveMulti= data => { 
    return service({url: '/nl/save_multi_select',method: 'post',data})
 };

  //  手机端保存问卷（填空题）/nl/submit_paper
  export const MPsaveFill= data => { 
    return service({url: '/nl/save_fill',method: 'post',data})
 };

  //  手机端提交问卷
  export const MPsubmitPaper= data => { 
    return service({url: '/nl/submit_paper',method: 'post',data:qs.stringify(data)})
 };