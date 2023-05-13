// 整合所有请求方法
import {
    regUser,
    checkUser,
    getUserNum,
    updatePwd,
    login,
    updateUser,
    addUser,
    deleteUser,
    search,
    searchNum,
    updateAvater,
    checkStatus,
    sevenDaysUser,
    checkChatNum
} from '@/utils/api/user';

import { 
    upload, 
    pictures, 
    picNum, 
    fileUpload,
    fileDelete,
    checkFile,
    FileNum,
    excel,
    downexcel,
    fileUpload2,
    uploadByQiniu
 } from '@/utils/api/upload';

import {
    addland,
    checkland,
    checkByLid,
    checklandnum,
    checkimgsBylid,
    deleteLand,
    LandTypeDays,
    clandPass,
    landPassNum,
    updateLand,
    checkLocation,
} from '@/utils/api/land';

import {
    checkDemand,
    deleteDemand,
    getDemandNum,
} from '@/utils/api/demand';

import { 
    checkNews,
    addNews,
    deleteNews,
    updateNews,
 } from '@/utils/api/news';

 import { 
    checkRole,
    addRole,
    deleteRole,
    updateRole,
    getRoleNum
 } from '@/utils/api/role';

 import { 
    checkRecord,
    addRecord,
    deleteRecord,
    checkRecordNum,
    updateRecord
 } from '@/utils/api/records';

 import { 
    dictTypeValue,
    dictType,
    checkAlltype,
    deleteType,
    updateType,
    insertType,
    insertFs,
    updateFs,
    deleteFs,
    checkLandFs
 } from '@/utils/api/dict';

 import { 
    insertReport,
    updateReport,
    deleteReport,
    checkReport,
    getReportNum
 } from '@/utils/api/report';


let apis = {
    regUser, //注册
    checkUser, //分页查询用户
    getUserNum, //用户总数
    sevenDaysUser,
    updatePwd,
    upload,
    pictures,
    picNum,
    login,
    addUser,
    deleteUser,
    updateUser,
    search,
    searchNum,
    updateAvater,
    fileUpload,
    fileDelete,
    checkStatus,
    addland,
    checkland,
    deleteLand,
    checklandnum,
    checkimgsBylid,
    checkDemand,
    deleteDemand,
    getDemandNum,
    checkNews,
    addNews,
    updateNews,
    deleteNews,

    checkChatNum,

    dictTypeValue,
    checkAlltype,
    dictType,
    deleteType,
    updateType,
    insertType,
    insertFs,
    updateFs,
    deleteFs,
    checkLandFs,

    checkRole,
    addRole,
    deleteRole,
    updateRole,
    getRoleNum,
    LandTypeDays,
    checkByLid,
    clandPass,
    landPassNum,
    updateLand,
    checkFile,
    FileNum,
    excel,
    downexcel,
    checkLocation,
    fileUpload2,
    uploadByQiniu,

    insertReport,
    updateReport,
    deleteReport,
    checkReport,
    getReportNum,

    checkRecord,
    addRecord,
    deleteRecord,
    checkRecordNum,
    updateRecord
}

export default apis;