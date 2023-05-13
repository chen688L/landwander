/**
 * 判断数据类型
 * @param {*} data 数据
 * @returns
 */
export const queryDataType = (data = "") =>
    Object.prototype.toString.call(data).slice(8, -1);

/**
 * 获取月天数
 */
export const getMonthLastDay = (year, month) =>
    new Date(year, month, 0).getDate();

/**
 * 格式化日期时间
 * @param {*} date：需格式化的日期
 * @param {*} fmt：格式化后的格式
 * @returns
 */
export const formatDate = (date, fmt = "yyyy-MM-dd hh:mm:ss") => {
    if (!date) return "";
    date = typeof date == "object" ? date : new Date(date);
    let weeks = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    const o = {
        "M+": date.getMonth() + 1, // 月份
        "W+": weeks[date.getDay()], //周
        "A+": date.getHours() <= 12 ? "上午" : "下午",
        "d+": date.getDate(), // 日
        "h+": date.getHours(), // 时
        "m+": date.getMinutes(), // 分
        "s+": date.getSeconds(), // 秒
        "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
        S: date.getMilliseconds(), // 毫秒
    };

    if (/(y+)/.test(fmt))
        fmt = fmt.replace(
            RegExp.$1,
            (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
            );
    }

    return fmt;
};

/**
 * 计算年龄
 * @param {*} data: 出生日期
 */
export const getAges = (data) => {
    const birthday = new Date(data).getFullYear();
    const newYear = new Date().getFullYear();
    return newYear - birthday;
};

/**
 * 手机号脱敏
 * @param {*} data: 手机号
 */
export const toPhoneNone4 = (data) => {
    const res = data.replace(/(\d{3})\d*(\d{4})/, "$1****$2");
    return res;
};

/**
 * 邮箱脱敏
 * @param {*} email: 邮箱
 */
export const toEmailNone4 = (email) => {
    return email.replace(/(.{0,3}).*@(.*)/, "$1***@$2");
};

/**
 * 获取本地存储
 * @param {*} key: 键名
 */
export const getLocalStorage = (key) => {
    // let storage = window.localStorage.getItem(key);
    return uni.getStorageSync(key);
};

/**
 * 设置本地存储
 * @param {*} key: 键名
 * @param {*} value: 值
 */
export const setLocalStorage = (key, value) => {
    // let storage = window.localStorage;
    // storage.setItem(key, JSON.stringify(value));
    uni.getStorageSync(key, value);
};


// 根据开始结束时间计算天数
export const DateDiff = (sDate1, sDate2) => {
    var oDate1, oDate2, iDays;
    oDate1 = new Date(sDate1).getTime();
    oDate2 = new Date(sDate2).getTime();
    iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24);
    return iDays;
}
