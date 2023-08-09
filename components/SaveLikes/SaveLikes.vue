<template>
	<view class="save-likes" @click.stop="changeSaveStatus">
		<uni-icons :type="isSave?'heart-filled':'heart'" color="#ff6600" :size="size"></uni-icons>
	</view>
</template>

<script>
	export default {
		name:"SaveLikes",
		data() {
			return {
				
			};
		},
		props:{
			item:Object,
			size:{
				type:String,
				default:"20"
			}
		},
		methods: {
			// 用户点击了收藏
			async changeSaveStatus() {
				// 判断用户是否登录
				// commonMixin
				await this.checkedIsLogin();
				// 全局的事件监听，只要点了小红心，就会立即同步更新“关注”界面的文章状态
				const {msg,newUserInfo} = await this.$http.update_save_like({
					articleId:this.item._id,
					userId:this.userInfo._id
				});
				uni.showToast({
					title:msg,
					icon:"none"
				})
				this.updateUserInfo({...this.userInfo,...newUserInfo});
				uni.$emit("updateArticle")
			}
		},
		computed:{
			isSave(){
				return this.userInfo && this.userInfo.article_likes_ids.includes(this.item._id);
			}
		},
	}
</script>

<style lang="scss">

</style>