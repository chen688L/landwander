import request from '@/utils/request';


// 上传单张图片
export function upload(data){
    return request({
        url:'/upload/avater',
        method: "POST",
        headers: { 'Content-Type': 'multipart/form-data' },
        data
    })
}

// 上传文件
export function fileUpload(data){
    return request({
        url:'/upload/fileUpload',
        method: "POST",
        headers: { 'Content-Type': 'multipart/form-data' },
        data
    })
}


// 获取上传到七牛云的token
export function fileUpload2(params){
    return request({
        url:'/qiniu/createUploadToken',
        method: "GET",
       params
    })
}


// 将上传到七牛的图片连接上传到后端数据库
export function uploadByQiniu(params){
    return request({
        url:'/upload/uploadByQiniu',
        method: "GET",
       params
    })
}


// 删除上传文件
export function fileDelete(data){
    return request({
        url:'/upload/fileDelete',
        method: "POST",
        headers: { 'Content-Type': 'multipart/form-data' },
        data
    })
}



export function pictures(params){
    return request({
        url:'/upload/pictures',
        params
    })
}


// 查询上传文件
export function checkFile(params){
    return request({
        url:'/upload/checkFile',
        params
    })
}

// 查询上传图片数量
export function picNum(params){
    return request({
        url:'/upload/picturesNum',
        params
    })
}


// 查询删除文件数量
export function FileNum(params){
    return request({
        url:'/upload/checkFileNum',
        params
    })
}



export function downexcel(params){
    return request({
        url:'/excel/download',
        responseType: 'blob',
        method: "POST",
        params
    })
}

export function excel(data){
    return request({
        url:'/excel/upload',
        method: "POST",
        headers: { 'Content-Type': 'multipart/form-data' },
        data
    })
}