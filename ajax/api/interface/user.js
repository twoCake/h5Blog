// 关于用户的全部接口请求都封装在这
import ajax from "../../http.js";

// 用户登录
export const user_login = data => ajax({
	name:"user_login",
	data
})

// 发送验证码
export const get_code = data => ajax({
	name:"get_code",
	data
})

// 关注或取消关注作者
export const update_follow_author = data => ajax({
	name:"update_follow_author",
	data
})

// 点赞
export const update_compliments = data => ajax({
	name:"update_compliments",
	data
})

// 获取用户自己的所有收藏文章
export const get_follow_article = data => ajax({
	name:"get_follow_article",
	data
})

// 关注的作者
export const get_follow_author = data => ajax({
	name:"get_follow_author",
	data
})

// 获取我的文章
export const get_my_article = data => ajax({
	name:"get_my_article",
	data
})