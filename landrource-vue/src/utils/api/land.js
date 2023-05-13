import request from '@/utils/request';

export function addland(data){
    return request({
        url:'/land/addland',
        method: "POST",
        data,
    })
}

export function addlandimg(data){
    return request({
        url:'/land/addlandimg',
        method: "POST",
        data
    })
}

export function checkland(params){
    return request({
        url:'/land/checkland',
        method: "GET",
        params
    })
}

export function checkByLid(params){
    return request({
        url:'/land/checkLandByLid',
        method: "GET",
        params
    })
}

export function checklandnum(params){
    return request({
        url:'/land/checklandnum',
        method: "GET",
        params
    })
}

export function clandPass(params){
    return request({
        url:'/land/clandPass',
        method: "GET",
        params
    })
}

export function landPassNum(params){
    return request({
        url:'/land/landPassNum',
        method: "GET",
        params
    })
}

export function checkimgsBylid(params){
    return request({
        url:'/imgs/checkimgsBylid',
        method: "GET",
        params
    })
}

export function deleteLand(params){
    return request({
        url:'/land/deland',
        params
    })
}


export function LandTypeDays(params){
    return request({
        url:'/land/LandSevenDays',
        params
    })
}

export function updateLand(data){
    return request({
        url:'/land/updateLand',
        method: "POST",
        data,
    })
}

export function checkLocation(params){
    return request({
        url:'/location/checkLocation',
        params
    })
}