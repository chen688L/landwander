import request from '@/utils/request';

export function checkDemand(params){
    return request({
        url:'/demand/checks',
        method: "GET",
        params
    })
}

export function addDemand(params){
    return request({
        url:'/demand/pictures',
        params
    })
}


export function deleteDemand(params){
    return request({
        url:'/demand/delete',
        params
    })
}
export function getDemandNum(params){
    return request({
        url:'/demand/getNum',
        method:'GET',
        params
    })
}