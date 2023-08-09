export default {
	updateUserInfo(state, userInfo) {
		// 将用户登录成功之后的数据在本地存储一份
		uni.setStorageSync("userInfo", userInfo)
		// 再在vuex中存储一份
		state.userInfo = userInfo;
	},
	// 修改历史记录存储
	setHistory(state, val) {
		let list = state.historyList;
		// 如果历史记录有值,每个值有至少一个,则跳过.否则加上此搜索记录(去重)
		if ((list.length > 0) && list.includes(val)) return
		list.unshift(val);
		uni.setStorageSync("historyList", list)
		// 再在vuex中存储一份
		state.historyList = list;
	},
	// 删除所有的历史记录
	cleanHistory(state){
		// 删除本地存储中的历史记录
		uni.removeStorageSync("historyList")
		// 删除vuex中的历史记录
		state.historyList = [];
	},
	// 设置导航栏选项卡
	setLabelList(state, labelList) {
		// 将用户登录成功之后的数据在本地存储一份
		uni.setStorageSync("labelList", labelList)
		// 再在vuex中存储一份
		state.labelList = labelList;
	},
}
