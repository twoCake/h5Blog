<template>
	<view>
		<view v-if="articleList.length">
			<List-card v-for="item in articleList" :key="item._id" :item="item"></List-card>
		</view>
		<view class="no-data" v-else>
			暂无发布过的文章
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			this.getMyArticle();
		},
		data() {
			return {
				articleList: [],
			}
		},
		methods: {
			async getMyArticle() {
				const list = await this.$http.get_my_article({
					userId: this.userInfo._id
				});
				this.articleList = list;
			},
		},
	}
</script>

<style lang="scss">
	.no-data {
		height: 400rpx;
		line-height: 400rpx;
		width: 100%;
		text-align: center;
		font-size: 28rpx;
		color: #666;
	}
</style>
