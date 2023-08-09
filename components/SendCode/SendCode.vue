<template>
	<view class="sendCode-container">
		<view class="vCode-btn" @click="getForm">{{runTime?`${time}秒后重新获取`:"获取验证码"}}</view>
	</view>
</template>

<script>
	export default {
		name: "SendCode",
		data() {
			return {
				timeId: null, //计时器的标识
				time: 60,
				runTime: false, //绝对是显示“获取验证码”还是 显示倒计时
			};
		},
		// 不支持小程序
		// props:["form"],
		methods: {
			getForm() {
				// 如果短信验证码在倒计时，则说明已经向后端请求过数据了，就不必再请求数据
				if(this.runTime) return;
				this.$emit("getForm", this.sendCode);
			},
			// 获取手机验证码
			async sendCode(vDom) {
				const {
					phone
				} = await vDom.validateField(['phone']);

				if (phone) {
					uni.showToast({
						title: "验证码已发送，请留意手机短信",
						icon: "none"
					});
					// 定时器
					this.runTime = true;
					this.timeRunning();
					// 发送数据请求云函数（验证码）
					const resp = await this.$http.get_code({phone})
				}
			},
			timeRunning() {
				clearInterval(this.timeId);
				this.timeId = setInterval(() => {
					if(this.time===1){
						clearInterval(this.timeId);
						this.timeId = null;
						this.time = 60;
						this.runTime = false;
						return 
					}
					this.time--;
				}, 1000)
			}
		},
		// 当切换到其他组件时（即此组件销毁），做收尾工作
		beforeDestroy() {
			clearInterval(this.timeId);
			this.timeId = null;
			this.runTime = false;
			this.time = 60;
		},
	}
</script>

<style lang="scss">
	.sendCode-container {
		flex-shrink: 0;
		margin-right: 20rpx;
		position: relative;

		.vCode-btn {
			background-color: $base-color;
			color: #fff;
			padding: 20rpx;
			border-radius: 10rpx;
			opacity: 0.8;
		}
	}
</style>
