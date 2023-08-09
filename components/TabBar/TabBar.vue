<template>
	<view class="tab">
		<scroll-view scroll-x="true" class="tab-scroll" :scroll-with-animation="true" :scroll-into-view="currentIndex">
			<view class="tab-scroll-box">
				<view class="tab-scroll-item" :class="{active:activeIndex===index}" v-for="(item,index) in labelList"
					:key="item._id" @click="changeActiveIndex(index)" :id="`item${index}`">
					{{item.name}}
				</view>
			</view>
		</scroll-view>
		<view class="tab-icon" @click="gotoLabelAdmin">
			<uni-icons type="gear" size="26" color="#999"></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		name: "TabBar",
		data() {
			return {
				currentIndex: "item0",
			};
		},
		watch: {
			// 监视activeIndex值，如果改变，就通知导航栏也进行相应的动画移动
			activeIndex(index) {
				this.currentIndex = `item${index}`
			}
		},
		props: ["labelList", "activeIndex"],
		methods: {
			changeActiveIndex(index) {
				this.$emit("changeActiveIndex", index)
			},
			// 去到标签管理页面
			async gotoLabelAdmin() {
				// 检测是否登录，如果登录了则可以正常进入到标签管理页面。
				await this.checkedIsLogin();
				uni.navigateTo({
					url: "/pages/labelAdmin/labelAdmin"
				})
			},
		},
	}
</script>

<style lang="scss">
	@import "css/tabBar.scss";
</style>
