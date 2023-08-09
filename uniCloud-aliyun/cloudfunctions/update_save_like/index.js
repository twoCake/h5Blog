'use strict';
const db = uniCloud.database();
const dbCmd = db.command;
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {
		userId,
		articleId
	} = event;
	const userInfo = await db.collection("user").doc(userId).get();
	// 获取到云端数据中的收藏偏好
	const articleIds = userInfo.data[0].article_likes_ids
	let articleArr = null;
	// 收藏或取消收藏的提示语
	let msg = null;
	// 判断该云端数据中的article_likes_ids是否有值（收藏过），或没值（没收藏过）
	if (articleIds.includes(articleId)) {
		// 证明已经收藏过该文章了，进行删除操作
		articleArr = dbCmd.pull(articleId);
		// 取消收藏成功！
		msg = "取消收藏😧";
	} else {
		// 证明还没收藏过此文章，进行删除操作
		articleArr = dbCmd.addToSet(articleId);
		msg = "收藏成功😍";
	}
	await db.collection("user").doc(userId).update({
		article_likes_ids:articleArr
	})
	// 重新获取云端的用户信息偏好
	const updateUserInfo = await db.collection("user").doc(userId).get();
	return {
		code: 0,
		data:{
			msg,
			newUserInfo:updateUserInfo.data[0]
		}
	}
};
