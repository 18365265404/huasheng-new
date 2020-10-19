// 接口汇总
//服务器地址
const server = 'http://47.100.237.163:8061/'; //正式地址
// const server = 'http://192.168.1.98:8061/'; //本地崇阳地址



// 七牛
const qiniuH='https://picture.huashengwt.com/'//正式地址
// const qiniuH='http://test.huashenghl.com/' //本地崇阳地址

// 登录
const scLogin = 'SystemApi/login'; 
// 登出
const scLogout = 'SystemApi/logout'; 


// 轮播图type字典
const scSelectByDictionary = 'SystemApi/selectByDictionary'; //查询

// 折现统计图
const scSelectByBrokenLine = 'SystemApi/selectByBrokenLine'; //查询

// 今日数据统计
const scSelectByBrokenLine2 = 'SystemApi/selectByBrokenLine2'; //查询

// 城市
const scSelectAllCity = 'SystemApi/selectAllCity'; //查询不分页

const scSelectByCity = 'SystemApi/selectByCity'; //查询
const scInsertByCity = 'SystemApi/insertByCity'; //添加
const scUpdateByCity = 'SystemApi/updateByCity'; //修改 
const scDeleteByCity = 'SystemApi/deleteByCity'; //删除

// banner
const scSelectByCarousel = 'SystemApi/selectByCarousel'; //查询
const scInsertByCarousel = 'SystemApi/insertByCarousel'; //添加
const scUpdateByCarousel = 'SystemApi/updateByCarousel'; //修改
const scDeleteByCarousel = 'SystemApi/deleteByCarousel'; //删除

// 首页素材

const scSelectByPaper = 'SystemApi/selectByPaper'; //查询
const scInsertByPaper = 'SystemApi/insertByPaper'; //添加
const scUpdateByPaper = 'SystemApi/updateByPaper'; //修改
const scDeleteByPaper = 'SystemApi/deleteByPaper'; //

// 套系

const scSelectBySesm = 'SystemApi/selectBySesm'; //查询
const scInsertBySesm = 'SystemApi/insertBySesm'; //添加
const scUpdateBySesm = 'SystemApi/updateBySesm'; //修改
const scDeleteBySesm = 'SystemApi/deleteBySesm'; //删除


// 婚礼案例

const scSelectByWeddingCase = 'SystemApi/selectByWeddingCase'; //查询
const scInsertByWeddingCase = 'SystemApi/insertByWeddingCase'; //添加
const scUpdateByWeddingCase = 'SystemApi/updateByWeddingCase'; //修改
const scDeleteByWeddingCase = 'SystemApi/deleteByWeddingCase'; //删除

// 婚礼案例详情

const scSelectByWeddingCaseDetails = 'SystemApi/selectByWeddingCaseDetails'; //查询
const scInsertByWeddingCaseDetails = 'SystemApi/insertByWeddingCaseDetails'; //添加
const scUpdateByWeddingCaseDetails = 'SystemApi/updateByWeddingCaseDetails'; //修改
const scDeleteByWeddingCaseDetails = 'SystemApi/deleteByWeddingCaseDetails'; //删除




// 其他宴

const scSelectByOtherParty = 'SystemApi/selectByOtherParty'; //查询
const scInsertByOtherParty = 'SystemApi/insertByOtherParty'; //添加
const scUpdateByOtherParty = 'SystemApi/updateByOtherParty'; //修改
const scDeleteByOtherParty = 'SystemApi/deleteByOtherParty'; //

// 在线看店

const scSelectByOws = 'SystemApi/selectByOws'; //查询
const scInsertByOws = 'SystemApi/insertByOws'; //添加
const scUpdateByOws = 'SystemApi/updateByOws'; //修改
const scDeleteByOws = 'SystemApi/deleteByOws'; //删除


// 公司简介

const scSelectByCompanyProfile = 'SystemApi/selectByCompanyProfile'; //查询
const scInsertByCompanyProfile = 'SystemApi/insertByCompanyProfile'; //添加
const scUpdateByCompanyProfile = 'SystemApi/updateByCompanyProfile'; //修改
const scDeleteByCompanyProfile = 'SystemApi/deleteByCompanyProfile'; //删除

// 服务团队

const scSelectByServiceTeam = 'SystemApi/selectByServiceTeam'; //查询
const scInsertByServiceTeam = 'SystemApi/insertByServiceTeam'; //添加
const scUpdateByServiceTeam = 'SystemApi/updateByServiceTeam'; //修改
const scDeleteByServiceTeam = 'SystemApi/deleteByServiceTeam'; //删除


// 婚礼菜系

const scSelectByWeddingCuisines = 'SystemApi/selectByWeddingCuisines'; //查询
const scInsertByWeddingCuisines = 'SystemApi/insertByWeddingCuisines'; //添加
const scUpdateByWeddingCuisines = 'SystemApi/updateByWeddingCuisines'; //修改
const scDeleteByWeddingCuisines = 'SystemApi/deleteByWeddingCuisines'; //删除

const scSelectAllSesm = 'SystemApi/selectAllSesm'; //婚礼菜系菜系名

// 联系我们

const scSelectByContactUs = 'SystemApi/selectByContactUs'; //查询
const scInsertByContactUs = 'SystemApi/insertByContactUs'; //添加
const scUpdateByContactUs = 'SystemApi/updateByContactUs'; //修改
const scDeleteByContactUs = 'SystemApi/deleteByContactUs'; //删除

// 底部栏

const scSelectByPageFooting = 'SystemApi/selectByPageFooting'; //查询
const scInsertByPageFooting = 'SystemApi/insertByPageFooting'; //添加
const scUpdateByPageFooting = 'SystemApi/updateByPageFooting'; //修改
const scDeleteByPageFooting = 'SystemApi/deleteByPageFooting'; //删除

// 其它宴详情

const scSelectByOtherPartyDetails = 'SystemApi/selectByOtherPartyDetails'; //查询
const scInsertByOtherPartyDetails = 'SystemApi/insertByOtherPartyDetails'; //添加
const scUpdateByOtherPartyDetails = 'SystemApi/updateByOtherPartyDetails'; //修改
const scDeleteByOtherPartyDetails = 'SystemApi/deleteByOtherPartyDetails'; //删除

export default{

    server:server,

    
    qiniuH:qiniuH,

    scLogin:scLogin,

    scLogout:scLogout,

    scSelectByDictionary:scSelectByDictionary,

    scSelectAllCity:scSelectAllCity,
    scSelectByCity:scSelectByCity,
    scInsertByCity:scInsertByCity,
    scUpdateByCity:scUpdateByCity,
    scDeleteByCity:scDeleteByCity,

    scSelectByCarousel:scSelectByCarousel,
    scInsertByCarousel:scInsertByCarousel,
    scUpdateByCarousel:scUpdateByCarousel,
    scDeleteByCarousel:scDeleteByCarousel,

    scSelectByPaper:scSelectByPaper,
    scInsertByPaper:scInsertByPaper,
    scUpdateByPaper:scUpdateByPaper,
    scDeleteByPaper:scDeleteByPaper,
    
    scSelectBySesm:scSelectBySesm,
    scInsertBySesm:scInsertBySesm,
    scUpdateBySesm:scUpdateBySesm,
    scDeleteBySesm:scDeleteBySesm,

    scSelectByWeddingCase:scSelectByWeddingCase,
    scInsertByWeddingCase:scInsertByWeddingCase,
    scUpdateByWeddingCase:scUpdateByWeddingCase,
    scDeleteByWeddingCase:scDeleteByWeddingCase,

    scSelectByWeddingCaseDetails:scSelectByWeddingCaseDetails,
    scInsertByWeddingCaseDetails:scInsertByWeddingCaseDetails,
    scUpdateByWeddingCaseDetails:scUpdateByWeddingCaseDetails,
    scDeleteByWeddingCaseDetails:scDeleteByWeddingCaseDetails,

    scSelectByOtherParty:scSelectByOtherParty,
    scInsertByOtherParty:scInsertByOtherParty,
    scUpdateByOtherParty:scUpdateByOtherParty,
    scDeleteByOtherParty:scDeleteByOtherParty,

    scSelectByOws:scSelectByOws,
    scInsertByOws:scInsertByOws,
    scUpdateByOws:scUpdateByOws,
    scDeleteByOws:scDeleteByOws,

    scSelectByCompanyProfile:scSelectByCompanyProfile,
    scInsertByCompanyProfile:scInsertByCompanyProfile,
    scUpdateByCompanyProfile:scUpdateByCompanyProfile,
    scDeleteByCompanyProfile:scDeleteByCompanyProfile,

    scSelectByServiceTeam:scSelectByServiceTeam,
    scInsertByServiceTeam:scInsertByServiceTeam,
    scUpdateByServiceTeam:scUpdateByServiceTeam,
    scDeleteByServiceTeam:scDeleteByServiceTeam,

    scSelectByWeddingCuisines:scSelectByWeddingCuisines,
    scInsertByWeddingCuisines:scInsertByWeddingCuisines,
    scUpdateByWeddingCuisines:scUpdateByWeddingCuisines,
    scDeleteByWeddingCuisines:scDeleteByWeddingCuisines,

    scSelectAllSesm:scSelectAllSesm,

    scSelectByContactUs:scSelectByContactUs,
    scInsertByContactUs:scInsertByContactUs,
    scUpdateByContactUs:scUpdateByContactUs,
    scDeleteByContactUs:scDeleteByContactUs,

    scSelectByPageFooting:scSelectByPageFooting,
    scInsertByPageFooting:scInsertByPageFooting,
    scUpdateByPageFooting:scUpdateByPageFooting,
    scDeleteByPageFooting:scDeleteByPageFooting,

    scSelectByOtherPartyDetails:scSelectByOtherPartyDetails,
    scInsertByOtherPartyDetails:scInsertByOtherPartyDetails,
    scUpdateByOtherPartyDetails:scUpdateByOtherPartyDetails,
    scDeleteByOtherPartyDetails:scDeleteByOtherPartyDetails,

    scSelectByBrokenLine:scSelectByBrokenLine,
    scSelectByBrokenLine2:scSelectByBrokenLine2
}
