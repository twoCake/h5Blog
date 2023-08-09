<template>
	<view class="commentList-container">
		<view class="comment-content-container" v-for="item in commentList" :key="item.comment_id">
			<CommentBox :commentData="item" @commentReply="commentReply"></CommentBox>
		</view>
		<uni-load-more v-if="commentList.length===0 || commentList.length>4" :status="loading" :contentText="{
			contentdown: '',
			contentrefresh: '',
			contentnomore: '没有更多评论了'
		}"></uni-load-more>
		<!-- 写评论组件 -->
		<CommentMasker :showPopup="showPopup" @closeCommentMasker="showPopup=$event" @sendCommentData="sendCommentData"
			:isClearCommentsVal="isClearCommentsVal">
		</CommentMasker>
	</view>
</template>

<script>
	export default {
		onLoad(e) {
			this.articleId = e.articleId;
			this.getCommentList();
		},
		// 监听滚轮到底部就触发的事件函数
		onReachBottom() {
			if (this.loading === "noMore") return;
			// 到达底部之后，就继续加载下一页的数据至底部
			this.page++;
			this.getCommentList();
		},
		data() {
			return {
				articleId: "", //文章id
				commentList: [], //存储评论的列表
				pageSize: 5,
				page: 1,
				loading: 'loading',
				showPopup: false,
				isClearCommentsVal: false, //是否清空子组件的文本内容
				replyData: {},
			};
		},
		methods: {
			async getCommentList() {
				const listArr = await this.$http.get_comments({
					articleId: this.articleId,
					pageSize: this.pageSize,
					page: this.page,
				})
				// 处理特殊情况
				if (listArr.length === 0) {
					// 表示云服务器没有更多数据了，那么就不再发送请求
					this.loading = "noMore";
				}
				// 深拷贝
				let oldList = JSON.parse(JSON.stringify(this.commentList));
				oldList.push(...listArr)
				this.commentList = oldList;
			},
			// 回复评论
			commentReply(data) {
				this.replyData = {
					comment_id: data.comment.comment_id,
					is_reply: data.isReply
				};
				data.comment.reply_id && (this.replyData.reply_id = data.comment.reply_id)
				this.openCommentMasker();
			},
			async openCommentMasker() {
				// 判断是否是登录状态，如果是则展示评论组件；否则跳转到登录页面
				await this.checkedIsLogin(); //commonMixin
				this.showPopup = true;
				this.isClearCommentsVal = false; //告诉子组件不要动文本内容
			},
			async sendCommentData(content) {
				// 发送评论的网络请求
				const {
					msg
				} = await this.$http.update_comment({
					userId: this.userInfo._id,
					articleId: this.articleId,
					content,
					...this.replyData
				});
				uni.showToast({
					title: msg,
					icon: "none"
				});
				this.showPopup = false;
				this.isClearCommentsVal = true; //告诉子组件清空文本内容
				// 修改评论的内容之后,进行评论列表的更新
				this.replyData = {};
				this.page = 1;
				this.commentList = [];
				this.loading = "loading";
				this.getCommentList();
			},
		},
	}
</script>

<style lang="scss">
	.comment-content-container {
		padding: 0 30rpx;
		border-bottom: 1rpx solid #bbb;
	}
</style>
