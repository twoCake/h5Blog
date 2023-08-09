<template>
	<view class="article-detail-container">
		<view class="detail-title">{{articleData.title}}</view>
		<view class="detail-header">
			<view class="detail-logo">
				<image :src="articleData.author.avatar" mode="aspectFill"></image>
			</view>
			<view class="detail-header-content">
				<view class="detail-header-content-title">{{articleData.author.author_name}}</view>
				<view class="detail-header-content-info">
					<text>{{articleData.create_time}}</text>
					<text>{{articleData.browse_count}}次浏览</text>
					<text>{{articleData.thumbs_up_count}}赞</text>
				</view>
			</view>
			<button type="default" class="detail-header-button" @click="followAuthor"
				:style="{backgroundColor:isFollowAuthor?'#f25037':'#ccc'}">
				{{isFollowAuthor?"已关注":"关注"}}
			</button>
		</view>
		<!-- 正文内容，使用富文本渲染html -->
		<view class="detail-content-container">
			<view class="detail-html">
				<u-parse :content="content" />
			</view>
			<!-- 评论内容的部分 -->
			<view class="detail-comment">
				<view class="comment-title">
					最新评论
				</view>
				<view class="comment-content-container" v-for="item in commentList" :key="item.comment_id">
					<CommentBox :commentData="item" @commentReply="commentReply"></CommentBox>
				</view>
				<view class="no-data" v-if="!commentList.length">
					暂无评论
				</view>
			</view>
		</view>
		<!-- 评论 -->
		<view class="detail-bottom">
			<view class="input-container" @click="openCommentMasker">
				<text>谈谈你的看法</text>
				<uni-icons type="compose" size="16" color="#f07373"></uni-icons>
			</view>
			<view class="detail-bottom-icons">
				<view class="detail-bottom-icon-box" @click="goCommentPage">
					<uni-icons type="chat" size="22" color="#f07373"></uni-icons>
				</view>
				<!-- 收藏 -->
				<SaveLikes class="detail-bottom-icon-box" size="22" :item="articleData"></SaveLikes>
				<!-- 点赞 -->
				<view class="detail-bottom-icon-box" @click="updateCompliments">
					<uni-icons :type="isCompliments?'hand-up-filled':'hand-up'" size="22" color="#f07373"></uni-icons>
				</view>
			</view>
		</view>
		<!-- 写评论组件 -->
		<CommentMasker :showPopup="showPopup" @closeCommentMasker="showPopup=$event" @sendCommentData="sendCommentData"
			:isClearCommentsVal="isClearCommentsVal">
		</CommentMasker>
	</view>
</template>

<script>
	// 引入第三方富文本解析库
	import uParse from '@/components/gaoyia-parse/parse.vue'
	import marked from 'marked'
	export default {
		onLoad(e) {
			// 获取上层组件传来的详细信息（不包括文章主体）
			this.articleData = this.$Router.currentRoute.query;
			// 获取文章主体
			this.getArticleDetail();
			// 初始化获取评论列表
			this.getCommentList();
		},
		components: {
			uParse
		},
		data() {
			return {
				articleData: null,
				showPopup: false, //控制popup组件的展示和隐藏
				isClearCommentsVal: false, //是否清空子组件的文本内容
				commentList: [],
				replyData: {},
			};
		},
		methods: {
			async getArticleDetail() {
				const resp = await this.$http.get_article_detail({
					article_id: this.articleData._id
				})
				this.articleData = resp;
			},
			// 展示popup组件
			async openCommentMasker() {
				// 判断是否是登录状态，如果是则展示评论组件；否则跳转到登录页面
				await this.checkedIsLogin(); //commonMixin
				this.showPopup = true;
				this.isClearCommentsVal = false; //告诉子组件不要动文本内容
			},
			// 发送评论的内容给云端进行存储
			async sendCommentData(content) {
				const {
					msg
				} = await this.$http.update_comment({
					userId: this.userInfo._id,
					articleId: this.articleData._id,
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
				this.replyData = {}
				this.getCommentList();
			},
			// 获取文章的评论列表
			async getCommentList() {
				const listArr = await this.$http.get_comments({
					articleId: this.articleData._id
				})
				this.commentList = listArr;
			},
			// 处理评论回复
			commentReply(data) {
				this.replyData = {
					comment_id: data.comment.comment_id,
					is_reply: data.isReply
				};
				data.comment.reply_id && (this.replyData.reply_id = data.comment.reply_id)
				this.openCommentMasker();
			},
			// 关注或取消关注作者
			async followAuthor() {
				// 检查用户是否是登录状态
				await this.checkedIsLogin();
				try {
					const {
						msg
					} = await this.$http.update_follow_author({
						authorId: this.articleData.author.id,
						userId: this.userInfo._id
					});
					uni.showToast({
						title: msg,
						icon: "none"
					})
					// 收藏   改变store和本地存储中用户存储的状态
					let followIds = [...this.userInfo.author_likes_ids];
					if (followIds.includes(this.articleData.author.id)) {
						followIds = followIds.filter(item => item !== this.articleData.author.id);
					} else {
						followIds.push(this.articleData.author.id);
					}
					this.updateUserInfo({
						...this.userInfo,
						author_likes_ids: followIds
					})
					// 同步更新“关注”tabBar关注作者的列表
					uni.$emit("updateAuthor")
				} catch (e) {
					uni.showToast({
						title: "不能关注自己!",
						icon: "none"
					})
				}
			},
			// 点赞
			async updateCompliments() {
				const {
					msg
				} = await this.$http.update_compliments({
					articleId: this.articleData._id,
					userId: this.userInfo._id
				})
				uni.showToast({
					title: msg,
					icon: "none"
				})
				// 点赞   改变store和本地存储中用户存储的状态
				let thumbsArr = [...this.userInfo.thumbs_up_article_ids];
				if (thumbsArr.includes(this.articleData._id)) {
					thumbsArr = thumbsArr.filter(item => item !== this.articleData._id);
					// 同步修改文章的点赞数
					this.articleData.thumbs_up_count -= 1;
				} else {
					thumbsArr.push(this.articleData._id);
					// 同步修改文章的点赞数
					this.articleData.thumbs_up_count += 1;
				}
				this.updateUserInfo({
					...this.userInfo,
					thumbs_up_article_ids: thumbsArr
				})
			},
			// 去往评论页面
			goCommentPage() {
				uni.navigateTo({
					url: `/pages/commentList/commentList?articleId=${this.articleData._id}`
				})
			},
		},
		computed: {
			content() {
				return this.articleData.content ? marked(this.articleData.content) : null
			},
			// 是否关注作者
			isFollowAuthor() {
				return this.userInfo && this.userInfo.author_likes_ids.includes(this.articleData.author.id)
			},
			// 是否对文章进行点赞
			isCompliments() {
				return this.userInfo && this.userInfo.thumbs_up_article_ids.includes(this.articleData._id)
			}
		},
	}
</script>

<style lang="scss">
	@import "./css/articleDetail.scss";
</style>
