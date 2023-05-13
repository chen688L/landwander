import request from '@/utils/request';

export function checkReport(params){
    return request({
        url:'/report/checkReport',
        method: "GET",
        params
    })
}

export function insertReport(data){
    return request({
        url:'/report/insertReport',
        method: "POST",
        data
    })
}
export function updateReport(data){
    return request({
        url:'/report/updateReport',
        method: "POST",
        data
    })
}
export function deleteReport(params){
    return request({
        url:'/report/deleteReport',
        method: "GET",
        params
    })
}

export function getReportNum(params){
    return request({
        url:'/report/getReportNum',
        method: "GET",
        params
    })
}