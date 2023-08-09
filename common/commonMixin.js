import {
	mapState,
	mapMutations
} from "vuex";
export default {
	install(Vue) {
		Vue.mixin({
			methods: {
				// 检查用户是否登录的方法
				checkedIsLogin() {
					return new Promise((resolve, reject) => {
						if (this.userInfo) {
							// 如果vuex中存储了用户信息，则说明用户是登录了的，则给他一个完成的promise
							resolve();
						} else {
							reject();
							// 表示用户未登录，则跳转至登录界面
							uni.navigateTo({
								url: "/pages/userInfo/login/login"
							})
						}
					})
				},
				...mapMutations(["updateUserInfo"]),
			},
			computed: {
				...mapState(["userInfo"])
			},
		})
	}
}
