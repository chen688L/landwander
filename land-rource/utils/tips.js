/*
 * @Description:
 * @Version: 2.0
 * @Author: Chun
 * @Date: 2022-02-13 16:21:35
 * @LastEditors: Chun
 * @LastEditTime: 2022-02-13 16:36:03
 */
// 加载框
export default class Tips {
    /**
     * 显示loading
     */
    static showLoading(title = "加载中...") {
        if (this.isLoading) return false;

        this.isLoading = true;

        uni.showLoading({
            title,
            mask: true,
        });
    }

    /**
     * 隐藏loading
     */
    static hideLoading() {
        if (this.isLoading) {
            this.isLoading = false;

            uni.hideLoading();
        }
    }

    /**
     * 消息提示框
     */
    static toast(message = "", options = {}) {
        uni.showToast({
            ...{
                title: message,
                icon: "none",
                image: "",
                mask: false,
                duration: 2000,
            },
            ...options,
        });
    }
}
