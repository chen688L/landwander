import Tips from "../utils/tips";

import {
	queryDataType
} from "../utils/utils";

// 请求封装
const {
	productIP
} = require("./config.js");

let API_ROOT = "";

/* #ifndef H5 */
API_ROOT = process.env.NODE_ENV !== "development" ? productIP : productIP;
/* #endif */

/* #ifdef H5 */
API_ROOT = process.env.NODE_ENV === "development" ? "/api" : productIP;
/* #endif */

export default ({
	url = "",
	method = "POST",
	dataType = "json"
}) => {
	return (data = {}, hideLoading = false, header, timeout = 30000) => {
		return new Promise((resolve, reject) => {
			if (!hideLoading) Tips.showLoading();

			// 获取token
			const token = uni.getStorageSync("sr_tkn") ?
				uni.getStorageSync("sr_tkn") :
				"";

			// 所有参数
			let options = {
				...{
					method,
					data,
					dataType,
				},
				header: {
					...header,
					"content-type": "application/json",
					"Authorization": token,
					// "Authorization": "Bearer " + token,
				},
				url: API_ROOT + url,
				timeout,
			};

			// 登录接口不需要带token
			if (url.includes("/users/login") || url.includes("/users/reg")) {
				delete options.header.Authorization;
			}
			// get请求方式
			if (method !== "GET" && dataType === "form")
				options.header["content-type"] = "application/x-www-form-urlencoded";

			// post请求方式 数据加密
			if (
				method === "POST"
			) {
				options.header["content-type"] === "application/json"
			}
			uni.request({
				...options,
				success: (res) => {
				  let data = res.data
				  resolve(data);
				},
				complete: () => {
					if (!hideLoading) Tips.hideLoading();
				},
			});
		});
	};
};
