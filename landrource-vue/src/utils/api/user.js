import request from '@/utils/request';

export function checkUser(params){
    return request({
        url:'/users/checkAlluser',
        params
    })
}
export function checkStatus(params){
    return request({
        url:'/users/searchstus',
        method:'GET',
        params
    })
}
export function login(data){
    return request({
        url:'/users/login',
        method:'POST',
        data
    })
}

export function regUser(params){
    return request({
        url:'/users/reg',
        method:'POST',
        params
    })
}

export function addUser(params){
    return request({
        url:'/users/addUser',
        method:'POST',
        params
    })
}

export function deleteUser(params){
    return request({
        url:'/users/deleteUser',
        method:'GET',
        params
    })
}

export function updateUser(data){
    return request({
        url:'/users/updateUser',
        method:'POST',
        data
    })
}
export function updateAvater(params){
    return request({
        url:'/users/upAvater',
        method:'GET',
        params
    })
}

export function updatePwd(params){
    return request({
        url:'/users/change_pwd',
        method:'POST',
        params
    })
}

export function getUserNum(params){
    return request({
        url:'/users/userNum',
        method:'GET',
        params
    })
}

export function search(params){
    return request({
        url:'/users/search',
        method:'GET',
        params
    })
}

export function searchNum(params){
    return request({
        url:'/users/searchNum',
        method:'GET',
        params
    })
}

export function sevenDaysUser(params){
    return request({
        url:'/users/sevenDaysUser',
        method:'GET',
        params
    })
}

export function checkChatNum(params){
    return request({
        url:'/chat/checkNum',
        method:'GET',
        params
    })
}
