'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
	const {
		loginName,
		password,
		phone,
		type
	} = event;
	const {affectedDocs,data} = await db.collection("user")
		.aggregate()
		.match(type === "account" ? {
			loginName,
			password
		} : {
			phone
		})
		.end();
	//返回数据给客户端
	if (affectedDocs) {
		return {
			code: 0,
			msg: "获取用户信息成功",
			data: data[0]
		}
	} else {
		return {
			code: 1,
			msg: type === 'account' ? "获取用户信息失败，请检查用户名或密码" : "手机号或验证码有误"
		}
	}
};
