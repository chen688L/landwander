// 整合所有请求方法

import uniRequest from "./uniRequest";

const $ajax = {};

// require.context 用于遍历导入指定目录下得文件
const contexts = require.context("./api/", true, /\.js$/);
contexts.keys().map((item) => {
    const moduleEntity = contexts(item).default;

    Object.keys(moduleEntity).map((i) => {
        if (!$ajax[i]) $ajax[i] = {};

        for (const enityKey in moduleEntity[i]) {
            $ajax[i][enityKey] = uniRequest({
                ...moduleEntity[i][enityKey],
            });
        }
    });
});

export default $ajax;
