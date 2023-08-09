// 首页的全部接口请求都封装在这
import ajax from "../../http.js";

// 导航栏
export const get_label_list = data => ajax({
	name:"get_label_list",
	data
})
//文章
export const get_article_list = data => ajax({
	name:"get_article_list",
	data
})
//文章的收藏
export const update_save_like = data => ajax({
	name:"update_save_like",
	data
})
//获取搜索的文章内容
export const get_search_data = data => ajax({
	name:"get_search_data",
	data
})
// 修改的用户的标签喜好
export const update_label_list = data => ajax({
	name:"update_label_list",
	data
})
// 获取文章的详情
export const get_article_detail = data => ajax({
	name:"get_article_detail",
	data
})
//	修改文章的评论内容
export const update_comment = data => ajax({
	name:"update_comment",
	data
})
// 获取文章的评论列表
export const get_comments = data => ajax({
	name:"get_comments",
	data
})
