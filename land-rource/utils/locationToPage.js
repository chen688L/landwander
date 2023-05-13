/*
 * @Descripttion: 封装跳转页面方法
 * @version:
 * @Author: HongWeiMing
 * @Date: 2022-01-28 17:22:41
 * @LastEditors: HongWeiMing
 * @LastEditTime: 2022-01-28 22:04:36
 */

export const locationToPage = (url = "", type = "") => {
    if (!url) return false;

    const pages = getCurrentPages(); // 获取当前页面栈实例

    const currentPageRoute = `/${pages[pages.length - 1].route}`; // 获取当前页面的route

    // 只跳转至当前页面栈不存在的页面
    if (currentPageRoute.indexOf(url.split("?")[0]) < 0) {
        if (type === "redirect") {
            uni.redirectTo({url});
        } else if (type === "switchTab") {
            uni.switchTab({url});
        } else {
            uni.navigateTo({url});
        }
    }
};
