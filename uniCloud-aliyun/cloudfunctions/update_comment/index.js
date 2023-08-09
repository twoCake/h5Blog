'use strict';
const db = uniCloud.database();
const dbCmd = db.command;
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {
		content,
		articleId,
		userId,
		comment_id="",
		reply_id = "",
		is_reply = false
	} = event;
	// 获取用户信息
	let user = await db.collection("user").doc(userId).get();
	user = user.data[0];
	const article = await db.collection("article").doc(articleId).get();
	const comments = article.data[0].comments;
	let commentObj = {
		comment_id: generatedId(5), // 生成唯一的id
		comment_content: content,
		create_time: Date.now(),
		is_reply,
		replyArr:[],
		author:{
			author_id:user._id,
			author_name:user.author_name,
			avatar:user.avatar,
			professional:user.professional
		}
	};
	// 表示是单独的发布评论,而非回复指定的评论
	if(comment_id === ""){
		commentObj.replyArr = [];
		commentObj = dbCmd.unshift(commentObj);
	}else{
		// 获取当前的评论的集合,在此集合里面找到指定的那一条评论,修改他的replyArr属性
		let commentAuthor = null;
		let commentIndex = comments.findIndex(item=>item.comment_id === comment_id);
		
		if(is_reply){
			commentAuthor = comments[commentIndex].replyArr.find(item=>item.comment_id === reply_id).author.author_name;
		}else{
			commentAuthor = comments.find(item=>item.comment_id === comment_id).author.author_name;
		}
		
		
		commentObj.to = commentAuthor;
		commentObj = {
			[commentIndex]:{
				replyArr:dbCmd.unshift(commentObj)
			}
		}
	}
	// 更改文章的信息
	await db.collection("article").doc(articleId).update({
		comments:commentObj
	});
	// 生成id的方法
	function generatedId(number) {
		return Number(Math.random().toString().substr(3, number) + Date.now()).toString(36);
	}
	
	//返回数据给客户端
	return {
		code:0,
		data:{
			msg:"添加数据成功"
		}
	}
};
