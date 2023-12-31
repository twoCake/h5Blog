'use strict';
const db = uniCloud.database();
const dbCmd = db.command;
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {article_id} = event;
	
	// 进入了文章详情页，则表示浏览了一次，那么该文章的浏览次数就加一
	await db.collection("article").update({
		browse_count:dbCmd.inc(1)
	})
	
	const articleList = await db.collection("article")
	.aggregate()
	.match({
		_id:article_id
	})
	.project({
		comments:0
	})
	.end();
	
	//返回数据给客户端
	return {
		code:0,
		msg:"文章获取成功",
		data:articleList.data[0]
	}
};
