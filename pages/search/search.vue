<template>
	<view class="search-container">
		<!-- 搜索导航栏引入 -->
		<NavBar :isSearch="isSearch" :parentVal="parentVal" @updateVal="updateVal" @sendSearchData="sendSearchData">
		</NavBar>
		<!-- 搜索的容器 -->
		<view class="search-warpper" v-if="isShowHistory">
			<!-- 没有进行搜索操作 -->
			<view class="search-history-container">
				<!-- 头部 -->
				<view class="search-header">
					<text class="history-search">搜索历史</text>
					<text class="history-clean" @click="cleanAllHistory" :style="{color:historyList.length?'#30b33a':'#ddd'}">清空</text>
				</view>
				<!-- 内容部分 -->
				<view class="search-history-content" v-if="historyList.length">
					<view class="history-item" v-for="(item,index) in historyList" :key="index" @click="openHistory(item)">
						{{item}}
					</view>
				</view>
				<!-- 如果没有内容 -->
				<view class="no-data" v-else>
					当前暂无搜索历史
				</view>
			</view>
		</view>
		<!-- 进行了搜索操作 -->
		<view class="search-list-container" v-else>
			<!-- 如果搜索到了相关数据 -->
			<List-item v-if="searchList.length" :isShowLoadMore="false" :articleList="searchList"
				@saveSearchHistory="saveSearchHistory"></List-item>
			<!-- 没有搜索到相关数据 -->
			<view class="no-data" v-else>
				没有搜索到相关数据
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations,
		mapState
	} from "vuex";
	export default {
		data() {
			return {
				isSearch: true,
				parentVal: "",
				searchList: [],
				isShowHistory: true,
			};
		},
		methods: {
			// 子组件通知父组件进行搜索内容的查询
			async sendSearchData() {
				this.isShowHistory = false;
				// 当搜索框内为空的时候,不进行搜索
				if (!this.parentVal) {
					this.isShowHistory = true;
					this.searchList = [];
					return;
				}
				const {
					articleList
				} = await this.$http.get_search_data({
					searchVal: this.parentVal
				});
				this.searchList = articleList;
			},
			// 子组件的数据更新了,要求父组件进行同步更新
			updateVal(val) {
				this.parentVal = val
			},
			// 保存历史记录
			saveSearchHistory() {
				this.setHistory(this.parentVal)
			},
			// 清空历史记录
			cleanAllHistory() {
				if(!this.historyList.length) return
				uni.showModal({
					title: "提示",
					content: "确认清空所有的历史记录吗？",
					success: (resp) => {
						if (resp.confirm) {
							this.cleanHistory();
						}
					},
				})
			},
			// 点击了任一历史记录，就同步使用搜索框进行搜索操作
			openHistory(val){
				this.parentVal = val;
				this.sendSearchData();
			},
			...mapMutations(["setHistory", "cleanHistory"])
		},
		computed: {
			...mapState(["historyList"])
		},
	}
</script>

<style lang="scss">
	@import "./css/search.scss";
</style>
