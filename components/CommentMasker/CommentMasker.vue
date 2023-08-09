<template>
	<view class="commentMasker-container">
		<uni-popup ref="popup" :mask-click="false" type="bottom">
			<!-- 内容区域 -->
			<view class="popup-wrapper">
				<view class="popup-header">
					<view class="popup-header-item" @click="closeCommentMasker">
						取消
					</view>
					<view class="popup-header-item" @click="sendCommentData" :style="{color:commentsVal.length?'#000000':'#6666'}">
						发布
					</view>
				</view>
				<view class="popup-content">
					<textarea class="popup-content-textarea" v-model.trim="commentsVal" placeholder="请输入评论内容" maxlength="300"/>
					<view class="popup-content-count">
						{{commentsVal.length}}/300
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		name: "CommentMasker",
		props: {
			showPopup: Boolean,
			isClearCommentsVal:Boolean,
		},
		watch: {
			// 监听父组件传来的showPopup来控制组件的展示或隐藏
			showPopup(newVal) {
				newVal ? this.$refs.popup.open() : this.$refs.popup.close()
			},
			isClearCommentsVal(newVal){
				if(newVal){
					this.commentsVal = "";
				}
			}
		},
		data() {
			return {
				commentsVal:"",
			};
		},
		methods: {
			// 关闭评论组件
			closeCommentMasker() {
				// 通知父组件，去关闭他
				this.$emit("closeCommentMasker",false);
			},
			// 通知父组件进行评论内容的发送
			sendCommentData(){
				// 判断文本内容是否合法
				if(!this.commentsVal){
					uni.showToast({
						title:"评论的内容不可为空！",
						icon:'none'
					})
					return
				}
				this.$emit("sendCommentData",this.commentsVal);
				// 只要将评论的内容通过网络请求发送给了云端进行存储，那么就清空文本的内容
			},
		},
	}
</script>

<style lang="scss">
.popup-wrapper{
	background-color: #fff;
	.popup-header{
		@include flex();
		font-size: 28rpx;
		color: #6666;
		border-bottom: 1rpx solid #f5f5f5;
		.popup-header-item{
			height: 100rpx;
			line-height: 100rpx;
			padding: 0 30rpx;
		}
	}
	.popup-content{
		width: 100%;
		padding: 30rpx;
		box-sizing: border-box;
		.popup-content-textarea{
			height: 400rpx;
			width: 100%;
		}
		.popup-content-count{
			@include flex(flex-end);
			font-size: 24rpx;
			color: #aaa;
		}
	}
}
</style>
