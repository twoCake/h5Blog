'use strict';
const db = uniCloud.database();
const dbCmd = db.command;
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {userId,authorId} = event;
	const user = await db.collection("user").doc(userId).get();
	const authorLikeIds = user.data[0].author_likes_ids;
	let returnMsg = "";
	let author_ids = null;
	//返回数据给客户端
	if(authorLikeIds.includes(authorId)){
		author_ids = dbCmd.pull(authorId)
		returnMsg="已取消关注😫"
	}else{
		author_ids = dbCmd.addToSet(authorId)
		returnMsg="关注成功🥰"
	}
	await db.collection("user").doc(userId).update({
		author_likes_ids:author_ids
	});
	return {
		code:0,
		data:{
			msg:returnMsg
		}
	}
};
