import request from '@/utils/request';

export function checkRole(params){
    return request({
        url:'/role/check',
        method: "GET",
        params
    })
}

export function getRoleNum(params){
    return request({
        url:'/role/roleNum',
        method:'GET',
        params
    })
}

export function addRole(params){
    return request({
        url:'/role/add',
        method: "GET",
        params,
    })
}

export function updateRole(data){
    return request({
        url:'/role/update',
        method: "POST",
        data,
    })
}

export function deleteRole(params){
    return request({
        url:'/role/delete',
        params
    })
}