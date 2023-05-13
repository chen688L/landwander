import request from '@/utils/request';

export function checkRecord(params){
    return request({
        url:'/record/check',
        method: "GET",
        params
    })
}

export function addRecord(params){
    return request({
        url:'/record/add',
        method: "GET",
        params,
    })
}

export function checkRecordNum(params){
    return request({
        url:'/record/checkNum',
        method: "GET",
        params,
    })
}

export function deleteRecord(params){
    return request({
        url:'/record/delete',
        params
    })
}

export function updateRecord(params){
    return request({
        url:'/record/update',
        params
    })
}