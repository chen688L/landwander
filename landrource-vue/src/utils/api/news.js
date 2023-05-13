import request from '@/utils/request';

export function checkNews(params){
    return request({
        url:'/news/check',
        method: "GET",
        params
    })
}

export function addNews(data){
    return request({
        url:'/news/addNews',
        method: "POST",
        data,
    })
}

export function updateNews(data){
    return request({
        url:'/news/updateNews',
        method: "POST",
        data,
    })
}

export function deleteNews(params){
    return request({
        url:'/news/deleteNews',
        params
    })
}