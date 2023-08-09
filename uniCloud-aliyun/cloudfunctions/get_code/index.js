'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {phone} = event;
	// 创建一个随机数
	const randomNumber = Math.random().toString().substring(2,6);
	//返回数据给客户端
	return event
};
