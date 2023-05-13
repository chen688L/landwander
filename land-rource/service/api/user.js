export default {
    user: {
        login: {
            url: "/users/login",
        },
		updateUserInfo: {
		    url: "/users/updateUserInfo",
			method:"POST",
		},
        // 注册
        register: {
            url: "/users/reg",
        },
        // 修改个人信息
        updateUser: {
            url: "/users/updateUser",
        },
		change_pwd: {
            url: "/users/change_pwd",
			method:"GET",
        },
		findByuid: {
		    url: "/users/findByuid",
			method:"GET",
		},
    },
};
