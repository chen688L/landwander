import request from '@/utils/request';

export function dictTypeValue(params){
    return request({
        url:'/dict/dictLandValue2',
        method: "GET",
        params
    })
}

export function checkAlltype(params){
    return request({
        url:'/dict/checkAlltype',
        method: "GET",
        params
    })
}

export function checkLandFs(params){
    return request({
        url:'/dict/checkLandFs',
        method: "GET",
        params
    })
}

export function dictType(params){
    return request({
        url:'/dict/dictLandType',
        method: "GET",
        params
    })
}


export function insertType(params){
    return request({
        url:'/dict/insertType',
        method: "GET",
        params
    })
}
export function updateType(data){
    return request({
        url:'/dict/updateType',
        method: "POST",
        data
    })
}
export function deleteType(params){
    return request({
        url:'/dict/deleteType',
        method: "GET",
        params
    })
}



export function insertFs(params){
    return request({
        url:'/dict/insertFs',
        method: "GET",
        params
    })
}
export function updateFs(data){
    return request({
        url:'/dict/updateFs',
        method: "POST",
        data
    })
}
export function deleteFs(params){
    return request({
        url:'/dict/deleteFs',
        method: "GET",
        params
    })
}