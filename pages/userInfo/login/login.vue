<template>
	<view class="login-container">
		<image class="banner-bg" src="../../../static/img/login_bg.png"></image>
		<view class="login-nav">
			<view class="nav-item" @click="changeLoginType('account')" :class="{'active':type==='account'}">账号登录</view>
			<view class="nav-item" @click="changeLoginType('phone')" :class="{'active':type==='phone'}">手机号登录</view>
		</view>
		<!-- form表单 -->
		<uni-forms class="form" ref="form" :modelValue="formData">
			<view class="info" v-if="type==='account'">
				<uni-forms-item label="账号" name="loginName">
					<input type="text" class="form-input" placeholder-class="placeholder" placeholder="请输入账号"
						v-model="formData.loginName">
				</uni-forms-item>
				<uni-forms-item label="密码" name="password">
					<input type="password" class="form-input" placeholder-class="placeholder" placeholder="请输入密码"
						v-model="formData.password">
				</uni-forms-item>
			</view>
			<view class="info" v-else>
				<uni-forms-item label="手机号" name="phone">
					<input type="text" class="form-input" placeholder-class="placeholder" placeholder="请输入手机号"
						v-model="formData.phone">
				</uni-forms-item>
				<uni-forms-item label="验证码" name="vCode">
					<input type="text" class="form-input" placeholder-class="placeholder" placeholder="请输入验证码"
						v-model="formData.vCode">
					<SendCode @getForm="getForm"></SendCode>
				</uni-forms-item>
			</view>
			<button class="login-btn" @click="userLoginSubmit">立即登录</button>
		</uni-forms>
	</view>
</template>

<script>
	export default {
		onReady() {
			this.$refs.form.setRules(this.userRules);
		},
		data() {
			return {
				type: "account", //登录类型
				formData: {
					loginName: "",
					password: "",
					phone: "",
					vCode: "",
				},
			};
		},
		methods: {
			// 登录类型改变
			changeLoginType(type) {
				if (type === "account") {
					this.type = "account";
				} else {
					this.type = "phone";
				}
				// 切换登录类型后，清空验证的信息（红色字体）
				this.$refs.form.clearValidate([]);
			},
			// 用户点击了 “立即登录” 之后
			async userLoginSubmit() {
				const resp = await this.$refs.form.validate();
				// 发送数据到后端
				this.sendUserInfo({
					...resp,
					type: this.type
				})
			},
			// 开始发送数据
			async sendUserInfo(obj) {
				const userInfo = await this.$http.user_login(obj);
				// 获取到了用户信息userInfo，由于这个数据后面可能会在许多场景使用，所以我们考虑将此数据存在vuex中。uniapp是安装了vuex的，我们只需创建vuex的indexjs文件就可以
				this.updateUserInfo(userInfo); //updateUserInfo在mixin中

				if (userInfo) {
					uni.showToast({
						title: "用户登录成功",
						icon: "none"
					});
					// 显示“用户登录成功”之后，跳转到原页面
					setTimeout(() => {
						// #ifdef H5
						uni.switchTab({
							url: "/pages/index/index"
						})
						// #endif
						// #ifndef H5
						uni.navigateBack();
						// #endif
					}, 1500)
				}
			},
			// 向验证码组件（子组件）发送form表单数据
			getForm(callback) {
				callback && callback(this.$refs.form)
			},

		},
	}
</script>

<style lang="scss" scoped>
	@import "css/login.scss";

	page {
		background-color: #f5f5f5;
	}
</style>
