<template>
	<!-- 具有三种图片展示：根据后端数据传来的mode来进行切换 -->
	<view class="list-card-container">
		<!-- 基础卡片 -->
		<view class="list-card" v-if="item.mode==='base'" @click="goArticleDetail">
			<view class="list-card-img">
				<image :src="item.cover[0]?item.cover[0]:whichBgImg1" mode="aspectFill"></image>
			</view>
			<view class="list-card-content">
				<view class="list-card-content-title">
					<text>{{item.title}}</text>
					<SaveLikes :item="item"></SaveLikes>
				</view>
				<view class="list-card-content-desc">
					<view class="article-type">
						{{item.classify}}
					</view>
					<view class="browse-count">
						{{item.browse_count}}次浏览
					</view>
				</view>
			</view>
		</view>
		<!-- 多图模式卡片 -->
		<view class="list-card2" v-if="item.mode==='column'" @click="goArticleDetail">
			<view class="list-card2-top">
				<text>{{item.title}}</text>
				<SaveLikes :item="item"></SaveLikes>
			</view>
			<view class="list-card2-imgs">
				<view class="img">
					<image :src="item.cover[0]?item.cover[0]:whichBgImg1" mode="aspectFill"></image>
				</view>
				<view class="img">
					<image :src="item.cover[1]?item.cover[1]:whichBgImg2" mode="aspectFill"></image>
				</view>
				<view class="img">
					<image :src="item.cover[2]?item.cover[2]:whichBgImg3" mode="aspectFill"></image>
				</view>
			</view>
			<view class="list-card2-desc">
				<view class="article-type">
					{{item.classify}}
				</view>
				<view class="browse-count">
					{{item.browse_count}}次浏览
				</view>
			</view>
		</view>
		<!-- 大图模式卡片 -->
		<view class="list-card3" v-if="item.mode==='image'" @click="goArticleDetail">
			<view class="list-card3-bigImg">
				<!-- 假装有图片 -->
				<image :src="item.cover[0]?item.cover[0]:whichBgImg1" mode="aspectFill"></image>
			</view>
			<view class="list-card3-middle">
				<text>{{item.title}}</text>
				<SaveLikes :item="item"></SaveLikes>
			</view>
			<view class="list-card3-desc">
				<view class="article-type">
					{{item.classify}}
				</view>
				<view class="browse-count">
					{{item.browse_count}}次浏览
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "List-card",
		props: ["item"],
		data() {
			return {
				bgImg: ['/static/img/logo.jpeg', '/static/img/logo2.jpeg', '/static/img/logo3.jpeg',
					'/static/img/logo4.jpeg', '/static/img/logo5.jpeg', '/static/img/logo6.jpeg',
					'/static/img/logo7.jpeg', '/static/img/logo8.jpeg', '/static/img/logo9.jpeg',
					'/static/img/logo10.jpeg', '/static/img/logo11.jpeg', '/static/img/logo12.jpeg',
					'/static/img/logo13.jpeg', '/static/img/logo14.jpeg', '/static/img/logo15.jpeg',
					'/static/img/logo16.jpeg', '/static/img/logo17.jpeg', '/static/img/logo18.jpeg',
					'/static/img/logo19.jpeg', '/static/img/logo20.jpeg', '/static/img/logo21.jpeg',
					'/static/img/logo22.jpeg', '/static/img/logo23.jpeg', '/static/img/logo24.jpeg',
					'/static/img/logo25.jpeg', '/static/img/logo26.jpeg'
				]
			}
		},
		computed: {
			whichBgImg1() {
				return this.bgImg[Math.floor(Math.random() * this.bgImg.length)]
			},
			whichBgImg2() {
				return this.bgImg[Math.floor(Math.random() * this.bgImg.length)]
			},
			whichBgImg3() {
				return this.bgImg[Math.floor(Math.random() * this.bgImg.length)]
			},

		},
		methods: {
			goArticleDetail() {
				const {
					_id,
					title,
					author,
					create_time,
					thumbs_up_count,
					browse_count
				} = this.item;
				const params = {
					_id,
					title,
					author,
					create_time,
					thumbs_up_count,
					browse_count
				};
				// 跳转到详情页面
				// uni.navigateTo({
				// 	url:`/pages/articleDetail/articleDetail?params=${JSON.stringify(params)}`
				// });
				this.$Router.push({
					path: "/pages/articleDetail/articleDetail",
					query: params
				})
				// 发送收藏事件
				this.$emit("saveSearchHistory")
			}
		},
	}
</script>

<style lang="scss">
	@import "css/list-card.scss";
</style>
