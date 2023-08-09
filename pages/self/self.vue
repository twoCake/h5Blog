<template>
	<view class="self-container">
		<view class="my-header" v-if="userInfo">
			<view class="my-header-background">
				<image :src="userInfo.avatar" mode="aspectFill"></image>
			</view>
			<view class="my-header-top">
				<view class="my-header-logo-box">
					<image :src="userInfo.avatar" mode="aspectFill"></image>
				</view>
				<text class="user-name">{{userInfo.author_name}}</text>
			</view>
			<view class="my-header-info">
				<view class="my-header-info-box">
					<text class="my-header-info-title">被关注</text>
					<text>{{userInfo.follow_count}}</text>
				</view>
				<view class="my-header-info-box">
					<text class="my-header-info-title">粉丝</text>
					<text>{{userInfo.fans_count}}</text>
				</view>
				<view class="my-header-info-box">
					<text class="my-header-info-title">积分</text>
					<text>{{userInfo.integral_count?userInfo.integral_count:0}}</text>
				</view>
			</view>
		</view>
		<!-- 内容区域 -->
		<view class="my-content">
			<view class="my-content-list" v-if="!userInfo" @click="gotoLogin">
				<view class="my-content-list-title">
					<image src="/static/img/icon_user.png" class="company-logo" mode="aspectFill"></image>
					<text>你还没登录，想啥呢🤔</text>
				</view>
				<uni-icons type="arrowright" size="14" color="#666"> </uni-icons>
			</view>
			<view class="my-content-list" @click="gotoMyArticlePage">
				<view class="my-content-list-title">
					<uni-icons type="contact" class="icons" size="14" color="#666"> </uni-icons>
					<text>我的文章</text>
				</view>
				<uni-icons type="arrowright"> </uni-icons>
			</view>
			<button v-if="userInfo" type="warn" class="sign-out" @click="signOut">退出登录</button>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			// 推出登录，同时清除store中的用户数据
			signOut() {
				uni.showModal({
					title: '🫣',
					content: '您确定要退出吗？',
					success: (res) => {
						if (res.confirm) {
							this.$store.commit("updateUserInfo", null)
							uni.navigateTo({
								url: "/pages/index/index"
							})
						}
					}
				});
			},
			// 跳转到登录页面
			gotoLogin() {
				uni.navigateTo({
					url: "pages/userInfo/login/login"
				})
			},
			// 跳转到我的文章页面
			gotoMyArticlePage(){
				uni.navigateTo({
					url: "/pages/myArticle/myArticle"
				})
			},
		},
	}
</script>

<style lang="scss">
	@import "./css/self.scss";
</style>
