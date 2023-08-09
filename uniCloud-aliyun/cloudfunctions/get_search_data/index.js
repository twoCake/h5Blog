'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {searchVal} = event;
	const list = await db.collection("article")
	.aggregate()   //使用聚合的方式进行数据的获取
	.match({title:new RegExp(searchVal)})   //根据匹配条件进行数据返回
	.project({   
		content: 0
	})
	.end();
	return {
		code: 0,
		msg: "数据获取成功",
		data:{
			articleList:list.data,
		}
	}
};
