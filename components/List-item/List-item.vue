<template>
	<view class="list-scroll-container">
		<scroll-view class="list-scroll" scroll-y="true" @scrolltolower="loadMore">
			<view>
				<List-card class="List-card" v-for="item in articleList" :key="item._id" :item="item"
					@saveSearchHistory="$emit('saveSearchHistory')"></List-card>
			</view>
			<uni-load-more :status="loadData.loading?loadData.loading:'loading'"
				v-if="isShowLoadMore && articleList &&(articleList.length === 0 ||articleList.length>4)" :contentText="{
								contentdown: '',
								contentrefresh: '',
								contentnomore: '没有更多文章了'
							}">
			</uni-load-more>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: "List-item",
		props: {
			articleList: {
				type: Array
			},
			loadData: {
				type: Object,
				default () {
					return {
						loading: "loading"
					}
				}
			},
			isShowLoadMore: {
				type: Boolean,
				default: true
			}
		},

		methods: {
			// 监测到scroll是否到达最底部，如果到达最底部，则通知父组件加载更多数据
			loadMore() {
				this.$emit("loadMore")
			},
		},
	}
</script>

<style lang="scss">
	.list-scroll-container {
		height: 100%;

		.list-scroll {
			overflow: hidden;
			height: 100%;
			box-sizing: border-box;

			.List-card {
				padding: 20rpx 10rpx;
			}
		}
	}
</style>
