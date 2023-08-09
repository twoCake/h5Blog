<template>
	<swiper class="swiper-container" :current="activeIndex" @change="changeSwiper">
		<swiper-item v-for="(item,index) in labelList" :key="item._id">
			<view class="swiper-item">
				<List-item :loadData="loadData[index]" :articleList="articleData[index]" @loadMore="loadMoreData"></List-item>
			</view>
		</swiper-item>
	</swiper>
</template>

<script>
	export default {
		name: "Article",
		props: {
			labelList:Array,
			activeIndex:Number
		},
		data() {
			return {
				articleData: {},
				loadData:{},  
				pageSize:6,   //每页显示几条数据
			}
		},
		created() {
			// 如果本地存储中有导航栏的数据，那么就获得本地存储中的导航栏数据
			this.labelList.length && this.getArticleList(this.activeIndex);
		},
		watch: {
			labelList(newVal,oldVal) {
				if(JSON.stringify(newVal) === JSON.stringify(oldVal)) return;
				this.articleData =  {};
				this.loadData =  {};
				this.getArticleList(this.activeIndex);
			}
		},
		
		methods: {
			// 在顶部不同的导航切换，会执行相应逻辑
			changeSwiper(e) {
				const {
					current
				} = e.detail;
				this.$emit("changeSwiper", current);
				// 在不同的文章类型之间切换，那么就携带文章名去获取数据
				// 分情况去请求（迎合缓存）
				if (!this.articleData[current] || !this.articleData[current].length) {
					this.getArticleList(current);
				}
			},
			// 获取文章数据
			async getArticleList(number) {
				// 指定每一个分类里面的页数信息
				if(!this.loadData[number]){
					this.loadData[number] = {
						page:1,
						loading:"loading",
						total:0
					}
				}
				
				const {articleList,total} = await this.$http.get_article_list({
					classify: this.labelList[number].name,
					page:this.loadData[number].page,
					pageSize:this.pageSize
				});
				// 将数据缓存起来，减少服务器压力
				// 初始化一个数组，该数组用于追加每一次请求的数据结果
				let oldList = this.articleData[number] || [];  
				oldList.push(...articleList);
				this.$set(this.articleData, number, oldList);
				this.loadData[number].total = total;
			},
			// 检测到子组件传来的消息->scroll已经到达底部，则需要加载更多数据
			loadMoreData(){
				// 检测是否是已经加载了全部的数据
				if(this.loadData[this.activeIndex].total === this.articleData[this.activeIndex].length){
					// 将loadData中的loading改为"没有更多数据了"
					this.loadData[this.activeIndex] = {
						...this.loadData[this.activeIndex],
						...{loading:"noMore"}
					}
					// 由于上面的代码是修改了对象内部，不会引起vue的检测，所以使用vue的强制刷新。
					this.$forceUpdate()
					return
				}
				
				this.loadData[this.activeIndex].page++;
				this.getArticleList(this.activeIndex);
			}
		},
	}
</script>

<style lang="scss">
	.swiper-container {
		height: 100%;

		.swiper-item {
			height: 100%;
			overflow: hidden;
		}
	}
</style>
