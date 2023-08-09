<template>
	<view class="nav-bar">
		<view class="nav-bar-top">
			<!-- 一个垫片，专门处理多端的导航栏的问题 -->
			<view :style="{height:statusHeight+'rpx'}"></view>
			<!-- 当组件作为搜索界面使用时，展示回退按钮 -->
			<view class="return-icon" :style="{top:statusHeight+'rpx'}" v-if="isSearch" @click="returnArticleList">
				<uni-icons type="back" size="22" color="#fff"></uni-icons>
			</view>
			<view @click="gotoSearchPage" class="nav-bar-content"
				:style="{marginRight:marginRight+'rpx',marginLeft:isSearch?'20rpx':''}">
				<uni-icons type="search" color="#999"></uni-icons>
				<view class="tips" v-if="!isSearch">请输入关键词进行搜索</view>
				<input type="text" v-else class="search-input" placeholder="请输入关键词进行搜索" v-model.trim="searchVal" confirm-type="搜索" @confirm="changeInput">
			</view>
		</view>
		<!-- 垫片 -->
		<view :style="{height:statusHeight+80+'rpx'}"></view>
	</view>
</template>

<script>
	export default {
		name: "NavBar",
		props: {
			isSearch: {
				type: Boolean,
				default: false
			},
			parentVal:String,
			
		},
		mounted() {
			this.getSystem();
		},
		data() {
			return {
				// 默认的顶部导航栏高度
				statusHeight: 20,
				marginRight: 0
			};
		},
		methods: {
			// 动态获取顶部导航栏的高度
			getSystem() {
				const systemInfo = uni.getSystemInfoSync();
				systemInfo.statusBarHeight && (this.statusHeight = systemInfo.statusBarHeight * 2);
				// 判断设备如果是微信（微信存在胶囊按钮），则需要单独处理
				// #ifdef MP-WEIXIN
				const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
				this.statusHeight = menuButtonInfo.top * 2;
				this.marginRight = menuButtonInfo.width * 2;
				// #endif
			},
			// 点击之后跳转到搜索页面
			gotoSearchPage() {
				if (this.isSearch) return;
				uni.navigateTo({
					url: "/pages/search/search"
				})
			},
			// 返回文章列表界面
			returnArticleList() {
				// 如果是h5页面，在搜索页面刷新了，那么就无法回退到我们想要去的文章列表页面，而小程序却不会有这种情况
				// 那么就需要判断运行环境
				// #ifdef H5
				uni.switchTab({
					url: "/pages/index/index"
				});
				// #endif
				// #ifndef H5
				uni.navigateBack();
				// #endif
			},
			// 通知父组件进行搜索内容的查询
			changeInput(){
				this.$emit("sendSearchData")
			},
		},
		computed:{
			// 数据的双向绑定
			searchVal:{
				get() {
					// 在读取searchVal时,运行该函数
					return this.parentVal;
				},
				set(val) {
					// 在尝试修改searchVal时,运行该函数
					this.$emit("updateVal",val);
					// 如果将搜索框内的内容全部清空了
					if(!val){
						this.$emit("sendSearchData");
					}
				}
			}
		},
	}
</script>

<style lang="scss">
	@import "./css/navBar.scss";
</style>
