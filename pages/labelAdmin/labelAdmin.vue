<template>
	<view class="label-container">
		<view class="label-box">
			<view class="label-header">
				<view class="label-title">我的标签</view>
				<view class="label-edit" @click="changeEditStatus">{{isEdit?"完成":"编辑"}}</view>
			</view>
			<view class="label-content">
				<view class="label-content-item" v-for="item in selfLabelList" :key="item._id">
					{{item.name}}
					<uni-icons type="clear" size="20" color="red" v-if="isEdit" @click="deleteLabelItem(item)">
					</uni-icons>
				</view>
				<view class="no-data" v-if="!selfLabelList.length">
					当前没有数据
				</view>
			</view>
		</view>
		<!-- 标签推荐 -->
		<view class="label-box">
			<view class="label-header">
				<view class="label-title">
					标签推荐
				</view>
			</view>
			<view class="label-content">
				<view class="label-content-item" v-for="item in recommendLabelList" :key="item._id"
					@click="changeSelfLabelList(item)">
					{{item.name}}
				</view>
				<view class="no-data" v-if="!recommendLabelList.length">
					当前没有数据
				</view>
			</view>
		</view>
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
				isEdit: false,
				labelIds: [],
			};
		},
		watch: {
			userInfo: {
				immediate: true,
				handler(newVal, oldVal) {
					this.labelIds = this.userInfo.label_ids;
				},
			},
		},
		methods: {
			// 调整编辑的状态
			changeEditStatus() {
				// 如果是“完成”，点击之后，则运行updateLabel函数发送网络请求
				this.isEdit && this.updateLabel();
				this.isEdit = !this.isEdit;
			},
			// 发送网络请求，将修改的信息发送给云后端
			async updateLabel() {
				// 需要获取两个值 
				// 1.用户的id（告诉后端修改标签的人是谁？保存这个人的修改信息）
				// 2.标签修改后的信息
				const label_ids = this.selfLabelList.map(item => item._id);
				const {msg} = await this.$http.update_label_list({
					label_ids,
					userId: this.userInfo._id
				});
				uni.showToast({
					title:msg,
					icon:"none"
				});
				this.updateUserInfo({...this.userInfo,label_ids})
			},
			// 用户点击了“编辑”按钮，开始导航栏的设置操作
			changeSelfLabelList(item) {
				if (!this.isEdit) return
				this.labelIds.push(item._id)
			},
			// 用户在“编辑”状态下点击了删除标签的操作
			deleteLabelItem(item) {
				this.labelIds = this.labelIds.filter(id => id !== item._id)
			},
			...mapMutations(["updateUserInfo"])
		},
		computed: {
			...mapState(["labelList"]),
			selfLabelList() {
				return this.labelList.filter(item => this.labelIds.includes(item._id))
			},
			recommendLabelList() {
				return this.labelList.filter(item => !this.labelIds.includes(item._id) && item._id)
			},
		},
	}
</script>

<style lang="scss">
	@import "css/labelAdmin.scss";
</style>
