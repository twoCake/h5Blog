'use strict';
const db = uniCloud.database();
const dbCmd = db.command;
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {userId,articleId} = event;
	const userList = await db.collection("user").doc(userId).get();
	const thumbs_up_article_ids = userList.data[0].thumbs_up_article_ids;
	
	// 处理用户的点赞
	let tempArr = null;
	let returnMsg = "";
	let thumbsNumber = null;
	//返回数据给客户端
	if(thumbs_up_article_ids.includes(articleId)){
		tempArr = dbCmd.pull(articleId)
		returnMsg="取消点赞🤔️";
		thumbsNumber = -1;
	}else{
		tempArr = dbCmd.addToSet(articleId)
		returnMsg="已点赞👍️";
		thumbsNumber = 1;
	}
	await db.collection("user").doc(userId).update({
		thumbs_up_article_ids:tempArr
	});
	
	// 处理文章的点赞
	
	await db.collection("article").doc(articleId).update({
		thumbs_up_count:dbCmd.inc(thumbsNumber)
	});
	
	
	//返回数据给客户端
	return {
		code:0,
		data:{
			msg:returnMsg
		}
	}
};
