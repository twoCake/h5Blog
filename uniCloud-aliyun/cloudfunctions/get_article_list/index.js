'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {
		classify,
		page = 1,
		pageSize = 10
	} = event;
	let matchObj = {};
	if (classify !== "全部") {
		matchObj = {
			classify
		}
	}
	const list = await db.collection("article")
	.aggregate()   //使用聚合的方式进行数据的获取
	.match(matchObj)   //根据匹配条件进行数据返回
	.project({   
		content: 0
	})
	.skip(pageSize*(page-1))   //第一页的数据是从0开始的
	.limit(pageSize)     //每页返回多少条数据
	.end();
	
	// 返回当前匹配的选项里的数据总数
	const {total} = await db.collection("article").where(matchObj).count();
	return {
		code: 0,
		msg: "数据获取成功",
		data: {
			articleList:list.data,
			total
		}
	}
};
