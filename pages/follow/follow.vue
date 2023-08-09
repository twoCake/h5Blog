<template>
	<view class="follow-container">
		<view class="follow-tab">
			<view class="follow-tab-box">
				<view class="follow-tab-item" :class="{active:currentIndex === 0}" @click="currentIndex=0">
					文章
				</view>
				<view class="follow-tab-item" :class="{active:currentIndex === 1}" @click="currentIndex=1">
					作者
				</view>
			</view>
		</view>
		<!-- 内容区域 -->
		<view class="follow-list-container">
			<swiper class="follow-list-swiper" :current="currentIndex" @change="currentIndex = $event.detail.current">
				<swiper-item>
					<!-- 文章列表组件 -->
					<List-item :articleList="articleList" :isShowLoadMore="false" v-if="articleList.length"></List-item>
					<view class="no-data" v-else>
						暂无收藏文章>_< </view>
				</swiper-item>
				<swiper-item>
					<AuthorList :authorList="authorList" v-if="authorList.length"></AuthorList>
					<view class="no-data" v-else>
						暂无关注作者>_< </view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			this.getFollowArticleList();
			this.getAuthorList();
			// 对收藏的文章和关注的作者做一个全局的事件监听
			uni.$on("updateArticle", () => {
				this.getFollowArticleList("noLoading");
			})
			uni.$on("updateAuthor", () => {
				this.getAuthorList("noLoading");
			})
		},
		data() {
			return {
				currentIndex: 0,
				articleList: [],
				authorList: [],
			};
		},
		methods: {
			// 获取收藏文章的方法
			async getFollowArticleList(isLoading) {
				const listArr = await this.$http.get_follow_article({
					userId: this.userInfo._id,
					isLoading
				})
				this.articleList = listArr;
			},
			// 获取收藏的作者列表
			async getAuthorList(isLoading) {
				const listArr = await this.$http.get_follow_author({
					userId: this.userInfo._id,
					isLoading
				})
				this.authorList = listArr;
			},
		},
	}
</script>

<style lang="scss">
	@import "./css/follow.scss";
</style>
