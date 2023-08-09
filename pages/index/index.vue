<template>
	<view class="home-container">
		<NavBar></NavBar>
		<TabBar :labelList="labelList" :activeIndex="activeIndex" @changeActiveIndex="changeActiveIndex"></TabBar>
		<Article class="article" :labelList="labelList" :activeIndex="activeIndex" @changeSwiper="changeSwiper">
		</Article>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from "vuex";
	export default {
		data() {
			return {
				activeIndex: 0, //当前显示页面的索引
			}
		},
		mounted() {
			this.initLabelList();
		},
		methods: {
			async initLabelList() {
				// 如果本地存储中有labelList，则不必要初始化 
				if (this.labelList.length) return
				const labelList = await this.$http.get_label_list();
				this.setLabelList([{
					name: "全部"
				}, ...labelList])
			},
			// 处理TabBar组件的emit事件
			changeActiveIndex(index) {
				this.activeIndex = index;
			},
			// 处理Article组件的emit事件
			changeSwiper(current) {
				this.activeIndex = current;
			},
			...mapMutations(["setLabelList"])
		},
		computed: {
			// ...mapState(["labelList"])
			labelList() {
				if (this.userInfo) {
					// 说明用户已经登录了
					this.activeIndex = 0;
					return [...this.$store.state.labelList.slice(0, 1), ...this.$store.state.labelList.filter(item => this
						.userInfo.label_ids.includes(item._id))]
				} else {
					// 用户尚未登录
					return this.$store.state.labelList
				}
			},
		},
	}
</script>

<style lang="scss">
	page {
		display: flex;
		height: 100%;
	}

	.home-container {
		flex: 1;
		overflow: hidden;
		box-sizing: border-box;
		@include flex(flex-start, column);
		align-items: inherit;

		.article {
			flex: 1;
			box-sizing: border-box;
		}
	}
</style>
