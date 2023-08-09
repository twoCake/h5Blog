// router.js
import {
	RouterMount,
	createRouter
} from 'uni-simple-router';
import store from "./store/index.js";

const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,
	routes: [...ROUTES]
});
//全局路由前置守卫
router.beforeEach((to, from, next) => {
	if (to.meta.needLogin && !store.state.userInfo) {
		// 需要登录
		next({
			name:"login",  //跳转到login登录界面
			NAVTYPE:"push",  //跳转到普通界面，新开的界面保留历史记录栈
		});
	} else {
		next();
	}

});

export {
	router,
	RouterMount
}
