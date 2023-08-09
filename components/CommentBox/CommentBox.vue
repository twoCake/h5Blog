<template>
	<view class="comment-box-container">
		<view class="comment-header">
			<view class="comment-header-logo">
				<!-- 头像 -->
				<image :src="commentData.author.avatar" mode="aspectFill"></image>
			</view>
			<view class="comment-header-info">
				<view class="title" v-if="!commentData.is_reply">
					{{commentData.author.author_name}}
				</view>
				<view class="title" v-else>
					{{commentData.author.author_name}}
					<text class="reply-text">回复-></text>
					{{commentData.to}}
				</view>
				<view class="">
					<!-- 这是第三方库，用于得出回复的时间 -->
					<uni-dateformat :date="commentData.create_time" format="yyyy-MM-dd hh:mm:ss"></uni-dateformat>
				</view>
			</view>
		</view>
		<!-- 评论内容 -->
		<view class="comment-content">
			<view class="">
				{{commentData.comment_content}}
			</view>
			<view class="comment-info">
				<view class="comment-button" @click="commentReply({comment:commentData,isReply})">
					回复
				</view>
			</view>
			<!-- 判断是否有子回复,如果有则调用组件自身进行渲染 -->
			<view class="comment-reply-list" v-for="item in commentData.replyArr" :key="item.comment_id">
				<CommentBox :commentData="item" @commentReply="commentReply" :isReply="true" ></CommentBox>
			</view>
		</view>
	</view>
</template>

<script>
	// 调用自己
	import CommentBox from "@/components/CommentBox/CommentBox.vue";
	export default {
		name: "CommentBox",
		props: {
			commentData: Object,
			isReply:{
				type:Boolean,
				default:false
			},
		},
		data() {
			return {

			};
		},
		methods: {
			// 回复评论
			commentReply(obj) {
				if(obj.isReply){
					// 扩展和调整属性
					obj.comment.reply_id = obj.comment.comment_id;
					obj.comment.comment_id = this.commentData.comment_id;
				}
				this.$emit("commentReply", obj)
			},
		},
	}
</script>

<style lang="scss">
	@import "./css/CommentBox.scss";
</style>
